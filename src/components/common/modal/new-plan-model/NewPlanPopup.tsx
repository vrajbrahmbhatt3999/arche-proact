import { FC, useState, useEffect } from 'react'
import styles from './newPlanPopup.module.scss'
import { CloseIcon, SearchIcon } from '../../svg-components'
import { colors } from '../../../../constants/color'
import Divider from '../../divider/Divider'
import {
  blockInvalidCharacter,
  disableArrowKey,
  handleCalculateTotalAmountServices,
  handleKeyDown,
  trimValue,
} from '../../../../utils/utils'
import Button from '../../button/Button'
import { useForm } from 'react-hook-form'
import { Cols, ICreateNewPlan } from '../../../../interfaces/interfaces'
import { newPlanValidators } from '../../../../form-validators/newPlanValidators'
import {
  PLAN_AMOUNT,
  PLAN_TOTAL_AMOUNT,
  PLAN_NAME,
  TOTAL_AMOUNT,
  NO_OF_SESSION,
} from '../../../../constants/constant'
import { failure } from '../../../../constants/data'
import { setMessage } from '../../../../redux/features/toast/toastSlice'
import { useAppDispatch, useAppSelector } from '../../../../hooks'

import { requestGenerator } from '../../../../utils/payloadGenerator'
import Pagination from '../../pagination/Pagination'

import Loader from '../../spinner/Loader'
import TableV3 from '../../table/tableV3/TableV3'
import {
  Column,
  TableOptions,
  useGlobalFilter,
  useSortBy,
  useTable,
} from 'react-table'
import {
  createNewMasterPlan,
  getAllTreatmentServices,
  updateMasterPlan,
} from '../../../../redux/features/treatmentPlans/treatmentPlansAsyncActions'
import { newPlanTableHeaderData } from '../../../../constants/table-data/newPlanTableHeader'
import {
  CREATE_MASTER_PLAN_TYPE,
  GET_ALL_TREATMENT_SERVICES,
  UPDATE_MASTER_PLAN_TYPE,
} from '../../../../constants/asyncActionsType'
import {
  setSelectedServiceForPlanArr,
  setServicesForPlan,
} from '../../../../redux/features/treatmentPlans/treatmentPlansSlice'
import SmartSearch from '../../smart-search/SmartSearch'

interface INewPlanModel {
  handleClose?: any
  setModelOpenClose?: any
  handleOpen?: any
  handleRowClick?: any
  popData?: any
  handleYes?: any
}

const NewPlan: FC<INewPlanModel> = ({
  handleClose,
  handleOpen,
  handleRowClick,
  popData,
  handleYes,
}) => {
  const dispatch = useAppDispatch()
  const { isLoading, serviceListData, selectedServicesForPlan } =
    useAppSelector((state) => state.treatmentPlans)

  const [dataPerPage, setDataPerPage] = useState<number>(10)
  const [totalPage, setTotalPage] = useState<number>(0)
  const [pageIndex, setPageIndex] = useState<number>(1)
  const [searchTest, setSearchTest] = useState('')
  const [isSmartSearchDisable, setIsSmartSearchDisable] =
    useState<boolean>(true)
  const pageIndexArray = () => {
    let pageIndexOptions = []
    for (let i = 1; i <= totalPage; i++) {
      pageIndexOptions.push(i)
    }
    return pageIndexOptions
  }
  const pageIndexOptions = pageIndexArray()

  useEffect(() => {
    let requestData = {
      search: searchTest,
      page: pageIndex,
      pageSize: dataPerPage,
      order_by: { name: 1 },
    }
    dispatch(getAllTreatmentServices(requestGenerator(requestData))).then(
      (e) => {
        if (e.type === `${GET_ALL_TREATMENT_SERVICES}/fulfilled`)
          setIsSmartSearchDisable(false)
        setTotalPage(e?.payload?.lastPage)
      }
    )
  }, [pageIndex, dataPerPage])

  const data: any = serviceListData

  const columns: Column<Cols>[] = newPlanTableHeaderData
  const options: TableOptions<Cols> = {
    data,
    columns,
  }

  const {
    state,
    // @ts-ignore
    setGlobalFilter,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(options, useGlobalFilter, useSortBy)
  // @ts-ignore
  const { globalFilter } = state

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ICreateNewPlan>({})

  const total_amount = handleCalculateTotalAmountServices(
    selectedServicesForPlan
  ).amount
  const total_sessions = handleCalculateTotalAmountServices(
    selectedServicesForPlan
  ).total_sessions
  console.log(
    'selected services',
    selectedServicesForPlan,
    total_amount,
    total_sessions
  )
  const onSubmit = async (data: ICreateNewPlan) => {
    if (selectedServicesForPlan && selectedServicesForPlan?.length > 0) {
      const services = selectedServicesForPlan?.map((item: any) => {
        return {
          id: item?._id,
          sessions: Number(item?.sessions),
        }
      })
      if (popData?._id) {
        const payload = {
          id: popData?._id,
          data: {
            ...data,
            [TOTAL_AMOUNT]: total_amount,
            [NO_OF_SESSION]: total_sessions,
            service_ids: services,
          },
        }
        dispatch(updateMasterPlan(requestGenerator(payload))).then((e) => {
          if (e.type === `${UPDATE_MASTER_PLAN_TYPE}/fulfilled`) {
            handleClose()
            // setModelOpenClose(false)
            if (handleYes) {
              handleYes()
            }
            dispatch(setServicesForPlan([]))
            dispatch(setSelectedServiceForPlanArr([]))
          }
        })
      } else {
        const payload = {
          ...data,
          service_ids: services,
          [TOTAL_AMOUNT]: total_amount,
          [NO_OF_SESSION]: total_sessions,
        }
        dispatch(createNewMasterPlan(requestGenerator(payload))).then((e) => {
          if (e.type === `${CREATE_MASTER_PLAN_TYPE}/fulfilled`) {
            handleClose()
            // setModelOpenClose(false)
            dispatch(setServicesForPlan([]))
            dispatch(setSelectedServiceForPlanArr([]))
          }
        })
      }
    } else {
      dispatch(
        setMessage({
          message: 'Please select services for plan',
          type: failure,
        })
      )
    }
  }

  const handleSearch = () => {
    setPageIndex(1)
    let requestData = {
      search: searchTest,
      page: pageIndex,
      pageSize: dataPerPage,
      order_by: { name: 1 },
    }
    dispatch(getAllTreatmentServices(requestGenerator(requestData))).then(
      (e) => {
        if (e.type === `${GET_ALL_TREATMENT_SERVICES}/fulfilled`)
          setIsSmartSearchDisable(false)
        setTotalPage(e?.payload?.lastPage)
      }
    )
  }

  useEffect(() => {
    if (popData) {
      reset(popData)
    }
  }, [popData])

  useEffect(() => {
    return () => {
      dispatch(setServicesForPlan([]))
      dispatch(setSelectedServiceForPlanArr([]))
    }
  }, [])
  useEffect(() => {
    setValue(TOTAL_AMOUNT, total_amount)
    setValue(NO_OF_SESSION, total_sessions)
  }, [total_amount, total_sessions])
  return (
    <>
      {isLoading && <Loader />}
      <div
        className={styles.notesPopupContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <CloseIcon
          customClass={styles.closeIconStyle}
          fillColor={colors.green1}
          handleClick={() => handleClose()}
        />
        <div className={styles.notesContainer}>
          <p className={styles.title}>
            {popData?._id ? 'Edit Plan' : 'Create New Plan'}
          </p>
          <Divider customClass={styles.dividerStyle} />

          <div className={styles.searchContainer}>
            <div className={styles.search}>
              <input
                className={styles.searchInput}
                type="text"
                placeholder="Search"
                value={searchTest}
                onChange={(e) => {
                  trimValue(e)
                  setSearchTest(e.target.value)
                  if (e.target.value.length === 0) {
                    setIsSmartSearchDisable(true)
                    setGlobalFilter('')
                    let requestData = {
                      search: '',
                      page: pageIndex,
                      pageSize: dataPerPage,
                      order_by: { name: 1 },
                    }
                    dispatch(
                      getAllTreatmentServices(requestGenerator(requestData))
                    ).then((result) => {
                      setTotalPage(result.payload.lastPage)
                    })
                  }
                }}
              />
              <div
                className={styles.searchButton}
                onClick={() => handleSearch()}
              >
                <SearchIcon fillColor={colors.white1} />
              </div>
              <SmartSearch
                placeHolder={'Smart Search'}
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
                isDisable={isSmartSearchDisable}
                customClassInput={styles.smartSearchInput}
              />
            </div>
          </div>
          <div className={styles.mainContainer}>
            <TableV3
              getTableProps={getTableProps}
              getTableBodyProps={getTableBodyProps}
              headerGroups={headerGroups}
              rows={rows}
              prepareRow={prepareRow}
              handleOpen={handleOpen}
              handleRowClick={handleRowClick}
            />

            {serviceListData && serviceListData?.length > 0 && (
              <Pagination
                setDataPerPage={setDataPerPage}
                pageIndexOptions={pageIndexOptions}
                pageIndex={pageIndex}
                setPageIndex={setPageIndex}
              />
            )}
            <Divider customClass={styles.greyDivider} />
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.fieldContainer}>
                <div className={styles.labelField}>
                  <label className={styles.labelText}>Total Amount</label>
                  <input
                    type="number"
                    className={styles.inputStyle}
                    // value={total_amount}
                    {...register(PLAN_TOTAL_AMOUNT)}
                    disabled={true}
                  />
                </div>
                <div className={styles.labelField}>
                  <label className={styles.labelText}>
                    Plan Amount <span className="asterick">*</span>
                  </label>
                  <div>
                    <input
                      type="number"
                      className={styles.inputStyle}
                      placeholder="Enter Plan Amount"
                      {...register(PLAN_AMOUNT, newPlanValidators[PLAN_AMOUNT])}
                      onChange={(e) => trimValue(e)}
                      onKeyDown={(e: any) => {
                        disableArrowKey(e)
                        blockInvalidCharacter(e)
                      }}
                      onWheel={(e: any) => {
                        e.target.blur()
                      }}
                    />
                    {errors[PLAN_AMOUNT] && (
                      <p className="errorText" style={{ marginLeft: '10px' }}>
                        {errors[PLAN_AMOUNT].message as any}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.fieldContainer}>
                <div className={styles.labelField}>
                  <label className={styles.labelText}>
                    Plan Name<span className="asterick">*</span>
                  </label>
                  <div>
                    <input
                      type="text"
                      placeholder="Enter Plan Name"
                      className={styles.inputStyle}
                      {...register(PLAN_NAME, newPlanValidators[PLAN_NAME])}
                      onChange={(e) => trimValue(e)}
                    />
                    {errors[PLAN_NAME] && (
                      <p className="errorText" style={{ marginLeft: '10px' }}>
                        {errors[PLAN_NAME].message}
                      </p>
                    )}
                  </div>
                </div>
                <div className={styles.labelField}>
                  <label className={styles.labelText}>
                    No of Sessions.<span className="asterick">*</span>
                  </label>
                  <div>
                    <input
                      type="number"
                      className={styles.inputStyle}
                      value={total_sessions}
                      {...register(NO_OF_SESSION)}
                      onChange={(e) => trimValue(e)}
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div className={styles.btnStyle}>
                <Button title="Save" type="submit" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default NewPlan

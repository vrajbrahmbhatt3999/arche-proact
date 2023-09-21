import { FC, useEffect, useState } from 'react'
import Button from '../../../components/common/button/Button'
import styles from './manageCategoryValues.module.scss'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { assignTagData, masterValuesdata } from '../../../constants/data'
import { requestGenerator } from '../../../utils/payloadGenerator'
import {
  addAllMasterValue,
  getAllMasterValue,
  updatMasterValue,
  updateStatusValue,
} from '../../../redux/features/master-value/MasterValueAsyncActions'
import { useLocation } from 'react-router-dom'
import { MASTER_VALUE_LABEL, MASTER_VALUE } from '../../../constants/constant'
import { IAssignValue, IMaterValues } from '../../../interfaces/interfaces'
import { SubmitHandler, useForm } from 'react-hook-form'
import { dataURI, trimValue } from '../../../utils/utils'
import Popup from '../../../components/common/popup/Popup'
import ManageAssignTagModal from '../../../components/common/modal/manage-assigntag-modal/ManageAssignTagModal'
import TableV2 from '../../../components/common/table/tableV2/TableV2'
import Loader from '../../../components/common/spinner/Loader'
import { clearState } from '../../../redux/features/master-value/MasterValueSlice'
import Pagination from '../../../components/common/pagination/Pagination'
import { masterValuesValidators } from '../../../form-validators/masterValuesValidators'
interface IManageAssignTag {}

const ManageCategoryValues: FC<IManageAssignTag> = ({}) => {
  // use state
  const [toggleData, setToggleData] = useState({})
  const [confirm, setConfirm] = useState<boolean>(false)
  const [dataPerPage, setDataPerPage] = useState<number>(10)
  const [totalPage, setTotalPage] = useState<number>(0)
  const [pageIndex, setPageIndex] = useState<number>(1)
  const [searchValue, setSearchValue] = useState('')

  // use location
  const location = useLocation()

  // use dispatch
  const dispatch = useAppDispatch()

  // use selector
  const { isLoading, getAllMasterValueData, getAllMasterValueDataReducer } =
    useAppSelector((state) => state.masterValue)

  // use effect
  useEffect(() => {
    const alldata = {
      category_id: location?.state?.id?._id,
      page: pageIndex,
      pageSize: dataPerPage,
      search: searchValue,
    }
    dispatch(getAllMasterValue(requestGenerator(alldata))).then((result) =>
      setTotalPage(result.payload.lastPage)
    )
    handleReset(false)
  }, [dispatch, dataPerPage, pageIndex])

  // handle reset
  const handleReset = (resetLabel?: boolean) => {
    setValue(MASTER_VALUE, '')
    resetLabel && setValue(MASTER_VALUE_LABEL, '')
    dispatch(clearState())
  }

  // use form
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<IMaterValues>({})

  const onSubmit: SubmitHandler<IMaterValues> = (data) => {
    if (getAllMasterValueDataReducer._id) {
      const masterInit = {
        id: getAllMasterValueDataReducer?._id,
        data: {
          category_id: getAllMasterValueDataReducer?.category_id?._id,
          value: data.name,
        },
      }
      dispatch(updatMasterValue(requestGenerator(masterInit))).then((e) => {
        if (e.type === 'masterValueSlice/updatMasterValue/fulfilled') {
          const alldata = {
            category_id: location?.state?.id?._id,
            page: pageIndex,
            pageSize: dataPerPage,
            search: searchValue,
          }
          dispatch(getAllMasterValue(requestGenerator(alldata))).then(
            (result) => setTotalPage(result.payload.lastPage)
          )
          handleReset(false)
        } else {
        }
      })
    } else {
      const masterInit = {
        category_id: location.state.id._id,
        value: data.name,
      }
      dispatch(addAllMasterValue(requestGenerator(masterInit))).then((e) => {
        if (e.type === 'masterValueSlice/addAllMasterValue/fulfilled') {
          const alldata = {
            category_id: location?.state?.id?._id,
            page: pageIndex,
            pageSize: dataPerPage,
            search: searchValue,
          }
          dispatch(getAllMasterValue(requestGenerator(alldata))).then(
            (result) => setTotalPage(result.payload.lastPage)
          )
          handleReset(false)
        } else {
        }
      })
    }
  }

  // convert file object to data_uri
  console.log('category', location)
  useEffect(() => {
    if (location?.state?.id?.category_name) {
      setValue(MASTER_VALUE_LABEL, location?.state?.id?.category_name)
    }
  }, [location?.state?.id?.category_name])
  // toggle modal
  const handleDataClick = (item: any) => {
    const toggleData = {
      id: item?._id,
      data: {
        is_active: !item.is_active,
      },
    }
    dispatch(updateStatusValue(requestGenerator(toggleData))).then((e) => {
      if (e.type === 'masterValueSlice/updateStatusValue/fulfilled') {
        const alldata = {
          category_id: location?.state?.id?._id,
          page: pageIndex,
          pageSize: dataPerPage,
          search: searchValue,
        }
        dispatch(getAllMasterValue(requestGenerator(alldata))).then((result) =>
          setTotalPage(result.payload.lastPage)
        )
        handleReset(false)
      } else {
      }
    })
  }

  // update value when click on edit button
  useEffect(() => {
    setValue(MASTER_VALUE, getAllMasterValueDataReducer?.value)
  }, [getAllMasterValueDataReducer])

  // clear state while we can move on another page
  useEffect(() => {
    return () => {
      dispatch(clearState())
    }
  }, [])

  // function for creating Page Index Array
  const pageIndexArray = () => {
    let pageIndexOptions = []
    for (let i = 1; i <= totalPage; i++) {
      pageIndexOptions.push(i)
    }
    return pageIndexOptions
  }
  const pageIndexOptions = pageIndexArray()
  return (
    <>
      {isLoading && <Loader />}
      {confirm && (
        <Popup
          popData={toggleData}
          Children={ManageAssignTagModal}
          handleClose={() => setConfirm(false)}
        />
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.mainContainer}>
          <div className={styles.appointmentStatusInputMain}>
            <div className={styles.appointmanetInput}>
              <label htmlFor="" className={styles.appointmentLable}>
                Category <span className="asterick">*</span>
              </label>
              <input
                type="text"
                className={styles.inputSearchContainer}
                {...register(
                  MASTER_VALUE_LABEL,
                  masterValuesValidators[MASTER_VALUE_LABEL]
                )}
                placeholder="Enter Category"
                disabled
                onChange={(e) => trimValue(e)}
              />
              <div className={styles.errorContainer}>
                <span className={styles.extraSpan}></span>
                {errors[MASTER_VALUE_LABEL] && (
                  <p className="dashboardFormError">
                    {errors[MASTER_VALUE_LABEL].message as any}
                  </p>
                )}
              </div>
            </div>
            <div className={styles.appointmanetInput}>
              <label
                htmlFor=""
                className={styles.appointmentLable}
                style={{ marginLeft: '20px' }}
              >
                Value <span className="asterick">*</span>
              </label>
              <input
                type="text"
                className={styles.inputSearchContainer}
                {...register(
                  MASTER_VALUE,
                  masterValuesValidators[MASTER_VALUE]
                )}
                placeholder="Enter Value"
                onChange={(e) => trimValue(e)}
              />
              <div className={styles.errorContainer}>
                <span className={styles.extraSpan}></span>
                {errors[MASTER_VALUE] && (
                  <p className="dashboardFormError">
                    {errors[MASTER_VALUE].message as any}
                  </p>
                )}
              </div>
            </div>
            {/* <div className={styles.appointmanetInput}>
              <div className={styles.inputAttechments}>
                <label htmlFor="" className={styles.appointmentLables}>
                  Icon
                </label>
                <AttachFiles
                  attachmentContainerCustomClass={
                    styles.attachmentContainerCustomClass
                  }
                  register={register}
                  fileKey={MASTER_VALUE_LABEL}
                  id={MASTER_VALUE_LABEL}
                  fileList={iconFiles}
                  validation={
                    iconFiles?.data_uri?.length > 0
                      ? {}
                      : assigntagValidators[MASTER_VALUE_LABEL]
                  }
                />
              </div>
              <div className={styles.errorContainers}>
                <span className={styles.extraSpan}></span>
                {errors[MASTER_VALUE_LABEL] && (
                  <p className="dashboardFormError">
                    {errors[MASTER_VALUE_LABEL].message as any}
                  </p>
                )}
              </div>
            </div> */}
          </div>
          <div className={styles.buttonMainColor}>
            <Button
              title={getAllMasterValueDataReducer?._id ? 'Update' : 'Add'}
              type="submit"
              customClass={styles.addBUtton}
            />
          </div>
          <div className={styles.tableContainer}>
            <div className={styles.tableContainer}>
              {getAllMasterValueData?.length > 0 ? (
                <TableV2
                  tableHeaderData={masterValuesdata}
                  tableRowData={getAllMasterValueData}
                  handleClick={handleDataClick}
                />
              ) : (
                ''
              )}
            </div>
          </div>
          {getAllMasterValueData && getAllMasterValueData.length !== 0 ? (
            <Pagination
              setDataPerPage={setDataPerPage}
              pageIndexOptions={pageIndexOptions}
              pageIndex={pageIndex}
              setPageIndex={setPageIndex}
            />
          ) : (
            ''
          )}
        </div>
      </form>
    </>
  )
}

export default ManageCategoryValues

import { FC, useState, useEffect } from 'react'
import styles from './viewplanmodal.module.scss'
import { CloseIcon, SearchIcon } from '../../svg-components'
import { colors } from '../../../../constants/color'

import { Cols } from '../../../../interfaces/interfaces'

import { useAppDispatch, useAppSelector } from '../../../../hooks'

import { requestGenerator } from '../../../../utils/payloadGenerator'

import Loader from '../../spinner/Loader'
import TableV3 from '../../table/tableV3/TableV3'
import {
  Column,
  TableOptions,
  useGlobalFilter,
  useSortBy,
  useTable,
} from 'react-table'
import SmartSearch from '../../smart-search/SmartSearch'
import {
  viewPlanModalData,
  viewPlanModalHeaderData,
} from '../../../../constants/table-data/viewPlanModalPopupData'
import Popup from '../../popup/Popup'
import ViewServiceModal from './view-services-modal/ViewServicesModal'
import { getAllTreatmentPlans } from '../../../../redux/features/treatmentPlans/treatmentPlansAsyncActions'
import Pagination from '../../pagination/Pagination'
import NewPlan from '../new-plan-model/NewPlanPopup'
import Divider from '../../divider/Divider'
import { trimValue } from '../../../../utils/utils'
import {
  clearTreatmentData,
  setSelectedServiceForPlanArr,
} from '../../../../redux/features/treatmentPlans/treatmentPlansSlice'

interface IViewPlan {
  handleClose?: any
  setModelOpenClose?: any
  handleOpen?: any
  handleRowClick?: any
}

const ViewPlanModal: FC<IViewPlan> = ({
  handleClose,
  setModelOpenClose,
  handleOpen,
  handleRowClick,
}) => {
  const dispatch = useAppDispatch()

  const [dataPerPage, setDataPerPage] = useState<number>(10)
  const [totalPage, setTotalPage] = useState<number>(0)
  const [pageIndex, setPageIndex] = useState<number>(1)
  const [searchTest, setSearchTest] = useState('')
  const [showDescriptionModal, setShowDescriptionModal] =
    useState<boolean>(false)
  const [isSmartSearchDisable, setIsSmartSearchDisable] =
    useState<boolean>(true)
  const [serviceData, setServiceData] = useState<any>(null)
  const [newPlanPopupData, setNewPlanPopupData] = useState<any>({})
  const [newPlanModal, setNewPlanModal] = useState<boolean>(false)
  const pageIndexArray = () => {
    let pageIndexOptions = []
    for (let i = 1; i <= totalPage; i++) {
      pageIndexOptions.push(i)
    }
    return pageIndexOptions
  }
  const pageIndexOptions = pageIndexArray()

  const { predefinedPlanData, isLoading, isStatusValueUpdated } =
    useAppSelector((state) => state.treatmentPlans)
  const data: Cols[] = predefinedPlanData
  const columns: Column<Cols>[] = viewPlanModalHeaderData
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

  const handleSearch = () => {
    setPageIndex(1)
    let requestData = {
      search: searchTest,
      page: pageIndex,
      pageSize: 10,
    }
    dispatch(getAllTreatmentPlans(requestGenerator(requestData))).then(
      (result) => {
        setIsSmartSearchDisable(false)
        setTotalPage(result.payload.lastPage)
      }
    )
  }

  const handleDescriptionModal = (data: any) => {
    setShowDescriptionModal(!showDescriptionModal)
    setServiceData(data)
  }
  const handleNewModal = (plan: any) => {
    let tempArr: any = []
    tempArr =
      plan?.service_ids && plan?.service_ids?.length > 0
        ? plan?.service_ids?.map((item: any) => {
            return {
              ...item,
              session_amount: item?.price * item?.sessions,
            }
          })
        : []
    dispatch(setSelectedServiceForPlanArr(tempArr))
    setNewPlanPopupData(plan)
    setNewPlanModal(!newPlanModal)
  }

  const getAllTreatementPlan = () => {
    let requestData = {
      page: pageIndex,
      pageSize: dataPerPage,
    }
    dispatch(getAllTreatmentPlans(requestGenerator(requestData))).then(
      (result) => setTotalPage(result.payload.lastPage)
    )
  }

  useEffect(() => {
    let requestData = {
      search: searchTest,
      page: pageIndex,
      pageSize: dataPerPage,
    }
    dispatch(getAllTreatmentPlans(requestGenerator(requestData))).then(
      (result) => setTotalPage(result.payload.lastPage)
    )
  }, [pageIndex, dataPerPage])

  useEffect(() => {
    if (showDescriptionModal === false) {
      setServiceData({})
    }
  }, [showDescriptionModal])
  useEffect(() => {
    let requestData = {
      search: searchTest,
      page: pageIndex,
      pageSize: dataPerPage,
    }
    if (isStatusValueUpdated === true) {
      dispatch(getAllTreatmentPlans(requestGenerator(requestData))).then(
        (result) => setTotalPage(result.payload.lastPage)
      )
    }
  }, [isStatusValueUpdated])
  useEffect(() => {
    return () => {
      dispatch(clearTreatmentData())
    }
  }, [])
  return (
    <>
      {isLoading && <Loader />}
      {showDescriptionModal && (
        <Popup
          Children={ViewServiceModal}
          handleClose={handleDescriptionModal}
          popData={serviceData}
        />
      )}
      {newPlanModal && (
        <Popup
          Children={NewPlan}
          handleClose={() => setNewPlanModal(false)}
          popData={newPlanPopupData}
          handleYes={getAllTreatementPlan}
        />
      )}
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
          <p className={styles.title}>View Plans</p>
          <Divider customClass={styles.dividerStyle} />
          {/* <div className={styles.searchButton} onClick={handleSearch}>
            <SearchIcon fillColor={colors.white1} />
          </div> */}
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
                      getAllTreatmentPlans(requestGenerator(requestData))
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
              <div className={styles.smartSearch}>
                <SmartSearch
                  placeHolder={'Smart Search'}
                  globalFilter={globalFilter}
                  setGlobalFilter={setGlobalFilter}
                  isDisable={isSmartSearchDisable}
                  customClassInput={styles.smartSearchInput}
                />
              </div>
            </div>
          </div>

          <div className={styles.tableContainer}>
            <TableV3
              getTableProps={getTableProps}
              getTableBodyProps={getTableBodyProps}
              headerGroups={headerGroups}
              rows={rows}
              prepareRow={prepareRow}
              handleOpen={handleOpen}
              handleRowClick={handleDescriptionModal}
              handleClick={(plan: any) => handleNewModal(plan)}
            />

            <Pagination
              setDataPerPage={setDataPerPage}
              pageIndexOptions={pageIndexOptions}
              pageIndex={pageIndex}
              setPageIndex={setPageIndex}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default ViewPlanModal

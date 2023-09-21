import React, { useState, useEffect } from 'react'
import Popup from '../../../components/common/popup/Popup'
import MobileAppAppointmentModal from './mobile-app-appointment-modal/MobileAppAppointmentModal'
import DescriptionModal from '../../../components/common/modal/description-modal/DescriptionModal'
import StatusConfirmationPopupV2 from '../../../components/common/modal/status-confirmation-popup/status-confirmation-popupV2/StatusConfirmationPopupV2'
import { mobileConfigTableHeaderData } from '../../../constants/data'
import {
  getAllAppointment,
  updateStatusAppointment,
} from '../../../redux/features/mobile_app_configuration/mobileAppConfigurationAsyncActions'
import { UPDATE_STATUS_APPOINTMENT } from '../../../constants/asyncActionsType'
import { getAllAppoinmentPayloadData } from '../../../redux/features/mobile_app_configuration/mobileAppConfigurationSlice'
import { requestGenerator } from '../../../utils/payloadGenerator'
import { useAppDispatch, useAppSelector } from '../../../hooks/index'
import Table from './mobile-app-appointment-table/Table'
import Search from '../../../components/common/search/Search'
import SmartSearch from '../../../components/common/smart-search/SmartSearch'
import Pagination from '../../../components/common/pagination/Pagination'
import Button from '../../../components/common/button/Button'
import Loader from '../../../components/common/spinner/Loader'
import {
  Column,
  TableOptions,
  useGlobalFilter,
  useSortBy,
  useTable,
} from 'react-table'
import { MobileConfigCols } from '../../../interfaces/interfaces'
import { trimValue } from '../../../utils/utils'
import { SearchIcon } from '../../../components/common/svg-components'
import { colors } from '../../../constants/color'
import styles from './mobileAppAppointment.module.scss'

const MobileAppAppointment = () => {
  const dispatch = useAppDispatch()
  const { isLoading, allAppointmentsData, getAllAppointPaylod } =
    useAppSelector((state) => state.mobileAppConfig)

  // React Table define
  const data: MobileConfigCols[] = allAppointmentsData
  const columns: Column<MobileConfigCols>[] = mobileConfigTableHeaderData
  const options: TableOptions<MobileConfigCols> = {
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

  // Define state variables
  const [showMobileAppAppointment, setShowMobileAppAppointment] =
    useState<boolean>(false)
  const [showDescriptionModal, setShowDescriptionModal] =
    useState<boolean>(false)
  const [showStatusConfirmationModal, setShowStatusConfirmationModal] =
    useState<boolean>(false)
  const [editAppointmentData, setEditAppointmentData] = useState<any>({})
  const [togglePayloadData, setTogglePayloadData] = useState<any>({})
  const [descriptionText, setDescriptionText] = useState<string>('')
  const [mobileAppSearch, setMobileAppSearch] = useState<string>('')
  const [isSmartSearchDisable, setIsSmartSearchDisable] =
    useState<boolean>(true)
  const [dataPerPage, setDataPerPage] = useState<number>(10)
  const [totalPage, setTotalPage] = useState<number>(0)
  const [pageIndex, setPageIndex] = useState<number>(1)

  // function for creating Page Index Array
  const pageIndexArray = () => {
    let pageIndexOptions = []
    for (let i = 1; i <= totalPage; i++) {
      pageIndexOptions.push(i)
    }
    return pageIndexOptions
  }
  const pageIndexOptions = pageIndexArray()

  // Api call for Get All Appointments
  useEffect(() => {
    let payloadData = {
      page: pageIndex,
      pageSize: dataPerPage,
      search: mobileAppSearch,
    }
    dispatch(getAllAppoinmentPayloadData(payloadData))
    dispatch(getAllAppointment(requestGenerator(payloadData))).then((result) =>
      setTotalPage(result.payload.lastPage)
    )
  }, [dispatch, dataPerPage, pageIndex])

  // Function for Modal and API
  const handleAppointmentModal = () => {
    setShowMobileAppAppointment((prevState) => !prevState)
    setEditAppointmentData({})
  }

  const handleEditAppointmentModal = () => {
    setShowMobileAppAppointment((prevState) => !prevState)
  }

  const handleStatusConfirmationModal = (statusData: any) => {
    setShowStatusConfirmationModal((prevState) => !prevState)
    if (Object.values(statusData).length > 0) {
      const payloadRequestObject = {
        id: statusData._id,
        data: {
          is_active: !statusData.is_active,
        },
      }
      setTogglePayloadData(payloadRequestObject)
    }
  }

  const handleStatusConfirmationModalClose = () => {
    setShowStatusConfirmationModal((prevState) => !prevState)
    setTogglePayloadData({})
  }

  const handleStatusConfirmationAPICall = () => {
    dispatch(updateStatusAppointment(requestGenerator(togglePayloadData))).then(
      (e) => {
        if (e.type === `${UPDATE_STATUS_APPOINTMENT}/fulfilled`) {
          // reset();
          dispatch(getAllAppointment(requestGenerator(getAllAppointPaylod)))
          handleStatusConfirmationModalClose()
        }
      }
    )
  }

  const handleDescriptionModal = () => {
    setShowDescriptionModal((prevState) => !prevState)
  }

  const editAppointmentById = (editAppointmentObject: any) => {
    console.log("Edit Fun")
    if (Object.values(editAppointmentObject).length > 0) {
      setEditAppointmentData(editAppointmentObject)
      handleEditAppointmentModal()
    }
  }

  const handleViewDescription = (description: any) => {
    setDescriptionText(description)
    handleDescriptionModal()
  }

  const handleSearch = () => {
    setPageIndex(1)
    if (mobileAppSearch?.length > 0) {
      let payloadData = {
        page: pageIndex,
        pageSize: dataPerPage,
        search: mobileAppSearch,
      }
      dispatch(getAllAppoinmentPayloadData(payloadData))
      dispatch(getAllAppointment(requestGenerator(payloadData))).then(
        (result) => {
          setIsSmartSearchDisable(false)
          setTotalPage(result.payload.lastPage)
        }
      )
    }
  }

  return (
    <>
      {showMobileAppAppointment && (
        <Popup
          Children={MobileAppAppointmentModal}
          handleClose={handleAppointmentModal}
          popData={editAppointmentData}
        />
      )}
      {showDescriptionModal && (
        <Popup
          Children={DescriptionModal}
          handleClose={handleDescriptionModal}
          heading={'Description'}
          message={descriptionText}
        />
      )}
      {showStatusConfirmationModal && (
        <Popup
          Children={StatusConfirmationPopupV2}
          handleClose={handleStatusConfirmationModalClose}
          handleSubmit={handleStatusConfirmationAPICall}
          message={
            'Are you sure you want to change the selected Appointment status?'
          }
        />
      )}
      {isLoading && <Loader />}
      <div className={styles.appointmentMainContainer}>
        <div className={styles.searchBtnContainer}>
          <div className={styles.searchContainer}>
            <div className={styles.searchFieldContainer}>
              <label htmlFor={'title'} className={styles.searchLabel}>
                Title
              </label>
              <input
                className={styles.searchInput}
                type="text"
                placeholder="Search By Title"
                value={mobileAppSearch}
                onChange={(e) => {
                  trimValue(e)
                  setMobileAppSearch(e.target.value)
                  if (e.target.value.length === 0) {
                    setIsSmartSearchDisable(true)
                    setGlobalFilter('')
                    let payloadData = {
                      page: pageIndex,
                      pageSize: dataPerPage,
                      search: '',
                    }
                    dispatch(
                      getAllAppointment(requestGenerator(payloadData))
                    ).then((result) => {
                      setTotalPage(result.payload.lastPage)
                    })
                  }
                }}
              />
            </div>
            <div className={styles.searchButton} onClick={handleSearch}>
              <SearchIcon fillColor={colors.white1} />
            </div>
            {/* <Search
              placeHolder={"Search"}
              setSearchMedicalCenter={setMobileAppSearch}
            /> */}
            <SmartSearch
              placeHolder={'Smart Search'}
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
              isDisable={isSmartSearchDisable}
            />
          </div>
          <Button
            title={'Add Appointment Type'}
            customClass={styles.btnContainer}
            type="button"
            handleClick={handleAppointmentModal}
          />
        </div>
        <div className={styles.tableContainer}>
          <Table
            // tableHeaderData={mobileConfigTableHeaderData}
            // tableRowData={allAppointmentsData}
            handleEditAppointment={editAppointmentById}
            handleViewDescription={handleViewDescription}
            handleStatusConfirmationModal={handleStatusConfirmationModal}
            getTableProps={getTableProps}
            getTableBodyProps={getTableBodyProps}
            headerGroups={headerGroups}
            rows={rows}
            prepareRow={prepareRow}
          />
        </div>
        {allAppointmentsData?.length > 0 && (
          <Pagination
            setDataPerPage={setDataPerPage}
            pageIndexOptions={pageIndexOptions}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
          />
        )}
      </div>
    </>
  )
}

export default MobileAppAppointment

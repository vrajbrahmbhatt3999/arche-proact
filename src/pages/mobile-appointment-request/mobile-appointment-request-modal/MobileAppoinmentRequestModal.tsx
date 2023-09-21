import React, { FC, useState, useEffect, useRef } from 'react'
import Search from '../../../components/common/search/Search'
import SmartSearch from '../../../components/common/smart-search/SmartSearch'
import {
  CloseIcon,
  DropDownIcon,
  DropDownArrowIcon,
  SearchIcon,
} from '../../../components/common/svg-components'
import TableV3 from '../../../components/common/table/tableV3/TableV3'
import {
  Column,
  TableOptions,
  useGlobalFilter,
  useSortBy,
  useTable,
} from 'react-table'
import { mobileAppointmentHeaderData } from '../../../constants/table-data/mobileAppointmentTableData'
import { Cols } from '../../../interfaces/interfaces'
import { colors } from '../../../constants/color'
import Pagination from '../../../components/common/pagination/Pagination'
import { requestGenerator } from '../../../utils/payloadGenerator'
import { useAppDispatch, useAppSelector } from '../../../hooks/index'
import { getAllMobileAppointment } from '../../../redux/features/mobile-appointment-request/mobileAppointmentRequestAsyncActions'
import {
  setAllMobileAppointmentPayloadData,
  setBranchId,
} from '../../../redux/features/mobile-appointment-request/mobileAppointmentRequestSlice'
import Loader from '../../../components/common/spinner/Loader'
import styles from './mobileAppoinmentRequestModal.module.scss'
import { trimValue } from '../../../utils/utils'
import ReloadButton from '../../../components/common/reload-button/ReloadButton'

interface IMobileAppointmentRequestModal {
  handleClose: (e?: React.MouseEvent<HTMLElement>) => void
  handleSubmit?: (e?: React.MouseEvent<HTMLElement>) => void
  handleOpen?: any
}

const MobileAppoinmentRequestModal: FC<IMobileAppointmentRequestModal> = ({
  handleClose,
  handleSubmit,
  handleOpen,
}) => {
  const dispatch = useAppDispatch()
  const { isLoading, mobileAppointmentReqeustData } = useAppSelector(
    (state) => state.mobileAppointmentRequest
  )
  const { branchData } = useAppSelector((state) => state.login)
  // console.log("branchData", branchData?.branches);
  const branchRef = useRef<any>()
  const appointmentTypeRef = useRef<any>()
  const statusRef = useRef<any>()

  // React Table define
  const data: Cols[] = mobileAppointmentReqeustData
  const columns: Column<Cols>[] = mobileAppointmentHeaderData
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

  // Define state variables
  const [mobileAppointmentSearch, setMobileAppointmentSearch] =
    useState<string>('')
  const [doctorSearch, setDoctorSearch] = useState<string>('')
  const [patientSearch, setPatientSearch] = useState<string>('')
  const [branch, setBranch] = useState<string>(branchData?.branches?.[0]?._id)
  // console.log("branch", branch);
  const [showBranchArrow, setBranchArrow] = useState<boolean>(false)
  const [mobileAppointmentType, setMobileAppointmentType] = useState<string>('')
  const [MobileAppointmentStatus, setMobileAppointmentStatus] =
    useState<string>('')
  const [showAppointmentTypeArrow, setAppointmentTypeArrow] =
    useState<boolean>(false)
  const [reoladDate, setReloadDate] = useState<any>(new Date())
  const [showStatusArrow, setStatusArrow] = useState<boolean>(false)
  const [isSmartSearchDisable, setIsSmartSearchDisable] =
    useState<boolean>(true)
  const [dataPerPage, setDataPerPage] = useState<number>(10)
  const [totalPage, setTotalPage] = useState<number>(0)
  const [pageIndex, setPageIndex] = useState<number>(1)
  useState<boolean>(false)

  // function for creating Page Index Array
  const pageIndexArray = () => {
    let pageIndexOptions = []
    for (let i = 1; i <= totalPage; i++) {
      pageIndexOptions.push(i)
    }
    return pageIndexOptions
  }
  const pageIndexOptions = pageIndexArray()

  const handleBranchArrow = () => {
    setBranchArrow((prevState) => !prevState)
  }

  const handleAppointmentTypeArrow = () => {
    setAppointmentTypeArrow((prevState) => !prevState)
  }

  const handleStatusArrow = () => {
    setStatusArrow((prevState) => !prevState)
  }

  const handleBranchChange = (event: any) => {
    setBranch(event?.target.value)
  }

  const handleAppointmentTypeChange = (event: any) => {
    setMobileAppointmentType(event?.target.value)
  }

  const handleAppointmentStatusChange = (event: any) => {
    setMobileAppointmentStatus(event?.target.value)
  }
  // console.log("mobileAppointmentType", mobileAppointmentType);
  // console.log("MobileAppointmentStatus", MobileAppointmentStatus);

  // code for when we click on dropdown outside
  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (
        showAppointmentTypeArrow &&
        appointmentTypeRef.current &&
        !appointmentTypeRef.current.contains(e.target)
      ) {
        setAppointmentTypeArrow(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside)
    }
  }, [showAppointmentTypeArrow])

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (
        showStatusArrow &&
        statusRef.current &&
        !statusRef.current.contains(e.target)
      ) {
        setStatusArrow(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside)
    }
  }, [showStatusArrow])

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (
        showBranchArrow &&
        branchRef.current &&
        !branchRef.current.contains(e.target)
      ) {
        setBranchArrow(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside)
    }
  }, [showBranchArrow])

  // Api call for Get All Mobile Appointments
  useEffect(() => {
    if (branchData?.branches?.length > 0) {
      let payloadData = {
        branch_id: branch,
        doctor: doctorSearch,
        patient: patientSearch,
        type: mobileAppointmentType,
        status: MobileAppointmentStatus,
        page: pageIndex,
        pageSize: dataPerPage,
      }

      // console.log("payloadData", payloadData);

      dispatch(setAllMobileAppointmentPayloadData(payloadData))
      dispatch(getAllMobileAppointment(requestGenerator(payloadData))).then(
        (result) => setTotalPage(result.payload.lastPage)
      )
    }
  }, [
    dispatch,
    dataPerPage,
    pageIndex,
    mobileAppointmentType,
    MobileAppointmentStatus,
    branchData,
    branch,
  ])

  // set branch id in redux
  useEffect(() => {
    dispatch(setBranchId(branch))
  }, [dispatch, branch])

  const handleSearch = () => {
    if (
      branchData?.branches?.length > 0 &&
      (doctorSearch?.length > 0 || patientSearch?.length > 0)
    ) {
      let payloadData = {
        branch_id: branch,
        doctor: doctorSearch,
        patient: patientSearch,
        type: mobileAppointmentType,
        status: MobileAppointmentStatus,
        page: pageIndex,
        pageSize: dataPerPage,
      }
      // console.log("payloadData", payloadData);

      dispatch(setAllMobileAppointmentPayloadData(payloadData))
      dispatch(getAllMobileAppointment(requestGenerator(payloadData))).then(
        (result) => {
          setIsSmartSearchDisable(false)
          setTotalPage(result.payload.lastPage)
        }
      )
    }
  }

  const handleReloadButton = () => {
    if (branchData?.branches?.length > 0) {
      let payloadData = {
        branch_id: branch,
        doctor: '',
        patient: '',
        type: '',
        status: '',
        page: pageIndex,
        pageSize: dataPerPage,
      }
      // console.log("payloadData", payloadData);

      dispatch(getAllMobileAppointment(requestGenerator(payloadData))).then(
        (result) => setTotalPage(result.payload.lastPage)
      )
      setReloadDate(new Date())
      setMobileAppointmentStatus('')
      setBranch(branchData?.branches?.[0]?._id)
      setMobileAppointmentType('')
      setDoctorSearch('')
      setPatientSearch('')
      // setMobileAppointmentSearch("");
    }
  }

  // console.log("mobileAppointmentType", mobileAppointmentType);
  return (
    <>
      {isLoading && <Loader />}

      <div
        className={styles.mobileAppointmentRequestModalContainer}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <CloseIcon
          customClass={styles.closeIconStyle}
          fillColor={colors.green1}
          handleClick={() => {
            handleClose()
          }}
        />
        <h1 className={styles.mobileAppointmentModalHeading}>
          Mobile Appointment Request
        </h1>
        <hr className={styles.mobileAppointmentDivider} />
        <div className={styles.mobileAppointmentContainer}>
          <div className={styles.searchReloadIconContainer}>
            <div className={styles.searchIconContainer}>
              <div className={styles.searchFieldContainer}>
                <label htmlFor={'doctor'} className={styles.searchLabel}>
                  Doctor
                </label>
                <input
                  className={styles.searchInput}
                  type="text"
                  value={doctorSearch}
                  onChange={(e) => {
                    trimValue(e)
                    setDoctorSearch(e.target.value)
                    if (
                      e.target.value.length === 0 &&
                      patientSearch.length === 0
                    ) {
                      setIsSmartSearchDisable(true)
                      setGlobalFilter('')
                      let payloadData = {
                        branch_id: branchData?.branches?.[0]?._id,
                        doctor: '',
                        patient: '',
                        type: '',
                        status: '',
                        page: pageIndex,
                        pageSize: dataPerPage,
                      }
                      // console.log("payloadData", payloadData);

                      dispatch(
                        getAllMobileAppointment(requestGenerator(payloadData))
                      ).then((result) => setTotalPage(result.payload.lastPage))

                      setMobileAppointmentStatus('')
                      setMobileAppointmentType('')
                      setBranch(branchData?.branches?.[0]?._id)
                    }
                  }}
                />
              </div>
              <div className={styles.searchFieldContainer}>
                <label htmlFor={'patient'} className={styles.searchLabel}>
                  Patient
                </label>
                <input
                  className={styles.searchInput}
                  type="text"
                  value={patientSearch}
                  onChange={(e) => {
                    trimValue(e)
                    setPatientSearch(e.target.value)
                    if (
                      e.target.value.length === 0 &&
                      doctorSearch.length === 0
                    ) {
                      setIsSmartSearchDisable(true)
                      setGlobalFilter('')
                      let payloadData = {
                        branch_id: branchData?.branches?.[0]?._id,
                        doctor: '',
                        patient: '',
                        type: '',
                        status: '',
                        page: pageIndex,
                        pageSize: dataPerPage,
                      }
                      // console.log("payloadData", payloadData);

                      dispatch(
                        getAllMobileAppointment(requestGenerator(payloadData))
                      ).then((result) => setTotalPage(result.payload.lastPage))

                      setMobileAppointmentStatus('')
                      setMobileAppointmentType('')
                      setBranch(branchData?.branches?.[0]?._id)
                    }
                  }}
                />
              </div>
              <div className={styles.searchButton} onClick={handleSearch}>
                <SearchIcon fillColor={colors.white1} />
              </div>
              <SmartSearch
                placeHolder={'Smart Search'}
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
                customClassInput={styles.mobileAppointmentSearch}
                isDisable={isSmartSearchDisable}
              />
            </div>
            <ReloadButton
              customClass={styles.mobileAppointmentReloadButton}
              handleClick={handleReloadButton}
              reoladDate={reoladDate}
            />
          </div>
          <div className={styles.dropDownContainer}>
            <div className={styles.formFieldContainer}>
              <div className={styles.inputFieldContainer}>
                <label htmlFor={'branch'} className={styles.formStatusLabel}>
                  Branch
                </label>
                <select
                  className={styles.branchDropDownField}
                  onClick={handleBranchArrow}
                  ref={branchRef}
                  onChange={handleBranchChange}
                  value={branch}
                >
                  {branchData?.branches?.map((singleBranch: any) => (
                    <option value={singleBranch?._id}>
                      {singleBranch?.name}
                    </option>
                  ))}
                </select>
                {showBranchArrow ? (
                  <DropDownArrowIcon
                    fillColor="#797979"
                    customClass={styles.downArrowStyle}
                  />
                ) : (
                  <DropDownIcon
                    fillColor="#797979"
                    customClass={styles.downArrowStyle}
                  />
                )}
              </div>
            </div>
            <div className={styles.formFieldContainer}>
              <div className={styles.inputFieldContainer}>
                <label
                  htmlFor={'appointment_type'}
                  className={styles.formAppointmentLabel}
                >
                  Appointment Type
                </label>
                <select
                  className={styles.inputField}
                  onClick={handleAppointmentTypeArrow}
                  ref={appointmentTypeRef}
                  onChange={handleAppointmentTypeChange}
                  value={mobileAppointmentType}
                >
                  <option value="">Select</option>
                  <option value="AUDIO">Audio</option>
                  <option value="CHAT">Chat</option>
                  <option value="VIDEO">Video</option>
                  <option value="INPERSON">InPerson</option>
                </select>
                {showAppointmentTypeArrow ? (
                  <DropDownArrowIcon
                    fillColor="#797979"
                    customClass={styles.downArrowStyle}
                  />
                ) : (
                  <DropDownIcon
                    fillColor="#797979"
                    customClass={styles.downArrowStyle}
                  />
                )}
              </div>
            </div>
            <div className={styles.formFieldContainer}>
              <div className={styles.inputFieldContainer}>
                <label htmlFor={'status'} className={styles.formStatusLabel}>
                  Status
                </label>
                <select
                  className={styles.inputField}
                  onClick={handleStatusArrow}
                  ref={statusRef}
                  onChange={handleAppointmentStatusChange}
                  value={MobileAppointmentStatus}
                >
                  <option value="">Select</option>
                  <option value="PENDING">Pending</option>
                  <option value="WAITINGLIST">Waiting List</option>
                  <option value="SCHEDULED">Confirmed</option>
                  <option value="CANCELLED">Cancel</option>
                </select>
                {showStatusArrow ? (
                  <DropDownArrowIcon
                    fillColor="#797979"
                    customClass={styles.downArrowStyle}
                  />
                ) : (
                  <DropDownIcon
                    fillColor="#797979"
                    customClass={styles.downArrowStyle}
                  />
                )}
              </div>
            </div>
          </div>
          <div className={styles.tableContainer}>
            <TableV3
              // tableHeaderData={userListTableHeaderData}
              // tableRowData={allUsersData}
              handleClick={handleSubmit}
              handleOpen={handleOpen}
              getTableProps={getTableProps}
              getTableBodyProps={getTableBodyProps}
              headerGroups={headerGroups}
              rows={rows}
              prepareRow={prepareRow}
              active={false}
            />
          </div>
          {mobileAppointmentReqeustData?.length > 0 && (
            <Pagination
              setDataPerPage={setDataPerPage}
              pageIndexOptions={pageIndexOptions}
              pageIndex={pageIndex}
              setPageIndex={setPageIndex}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default MobileAppoinmentRequestModal

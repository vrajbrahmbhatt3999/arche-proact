import React, { useEffect, useState } from 'react'
import styles from './dentistAppointmentDashboard.module.scss'
import TableV2 from '../../../components/common/table/tableV2/TableV2'
import { dentistAppointmentHeaderData } from '../../../constants/table-data/dentistDashboardAootData'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { getAllDentistAppointmentLists } from '../../../redux/features/dentist-dashboard/dentistDashboardAsyncActions'
import { requestGenerator } from '../../../utils/payloadGenerator'
import Pagination from '../../../components/common/pagination/Pagination'
import DentistTodo from '../dentist-todo/DentistTodo'
import AddTodoModal from '../../../components/common/modal/add-todo-modal/AddTodoModal'
import Loader from '../../../components/common/spinner/Loader'
import Popup from '../../../components/common/popup/Popup'
import DentistMedicalNews from '../dentist-medical-news/DentistMedicalNews'
import MedicalNewsModal from '../../../components/common/modal/medical-news-modal/MedicalNewsModal'
import DentistList from '../dentist-list/DentistList'
import DropDownGroup from '../../../components/common/dropdown/dropDown-group/DropDownGroup'
import { trimValue } from '../../../utils/utils'
import { SearchButton } from '../../../components/common/svg-components'
import AddReminderModal from '../../../components/common/modal/add-reminder-modal/AddReminderModal'
import Button from '../../../components/common/button/Button'
import { diagnosisStatusData, optionData } from '../../../constants/data'
import StaffChat from '../../whatsapp/staff-chat/StaffChat'
import { getAllNotificationList } from '../../../redux/features/app-notifications/appNotificationAsyncActions'
import { clearTodoState } from '../../../redux/features/receptionist/receptionistSlice'
import { clearPatientMedicineData } from '../../../redux/features/diagnosis/diagnosisSlice'
import { clearDiagnosisId } from '../../../redux/features/dentist-diagnosis/dentistDiagnosisSlice'
import moment from 'moment'

interface IDentistAppProps {}
const DentistAppointmentDashboard: React.FunctionComponent<
IDentistAppProps
> = () => {
  const dispatch = useAppDispatch()
  const { isLoading,dentistAppointmentList, dentistListDataObject } =
    useAppSelector((state) => state?.dentist)
  const { userData } = useAppSelector((state) => state.login)

  const branchDataList = useAppSelector(
    (state) => state.login?.branchData?.branches
  )

  const [dataPerPage, setDataPerPage] = useState<number>(10)
  const [totalPage, setTotalPage] = useState<number>(0)
  const [pageIndex, setPageIndex] = useState<any>(1)
  const [showAddModal, setShowAddModal] = useState<boolean>(false)
  const [addModalData, setAddModalData] = useState({})
  const [showAddReminderModal, setShowAddReminderModal] = useState<boolean>(false)
  const [addReminderModalData, setAddReminderModalData] = useState({})
  const [showNewsModal, setShowNewsModal] = useState<boolean>(false)
  const [newsModalData, setNewsModalData] = useState({})
  const [branchFilter, setBranchFilter] = useState<any>({})
  const [statusFilter, setStatusFilter] = useState<any>({})
  let currentDate = moment(new Date()).format('YYYY-MM-DD')
  const [diagnosisFilter, setDiagnosisFilter] = useState<any>({})
  const [searchDate, setSearchDate] = useState<any>(currentDate)
  const [selectedOption, setSelectedOption] = useState('')
  // pagination function
  const pageIndexArray = () => {
    let pageIndexOptions = []
    for (let i = 1; i <= totalPage; i++) {
      pageIndexOptions.push(i)
    }
    return pageIndexOptions
  }
  const pageIndexOptions = pageIndexArray()

  useEffect(() => {
    dispatch(getAllNotificationList(requestGenerator({})))
  }, [])

  // add modal close
  const handleModalClose = () => {
    setShowAddModal(false)
    setAddModalData({})
    setAddReminderModalData({})
  }
  // handleAddModal
  const handleAddModal = () => {
    setShowAddModal(!showAddModal)
    setAddModalData({})
    setAddReminderModalData({})
  }
  // add reminder modal close
  const handleReminderModalClose = () => {
    setShowAddReminderModal(false)
    setAddModalData({})
    setAddReminderModalData({})
  }
  useEffect(() => {
    return () => {
      dispatch(clearTodoState())
    }
  }, [!showAddReminderModal])

  // handleAddReminderModal
  const handleAddReminderModal = () => {
    setShowAddReminderModal(!showAddReminderModal)
  }
  // medical news modal close
  const handleNewsModalClose = () => {
    setShowNewsModal(false)
    setNewsModalData({})
  }
  // handleNewsModal
  const handleNewsModal = (item: any) => {
    setShowNewsModal(!showAddModal)
    setNewsModalData(item)
  }
  const handleOptionChange = (event: any) => {
    setPageIndex(1)
    setSelectedOption(event.target.value)
    if (event.target.value === 'today') {
      const today = new Date()
      const year = today.getFullYear()
      const month = String(today.getMonth() + 1).padStart(2, '0')
      const day = String(today.getDate()).padStart(2, '0')
      const formattedDate = `${year}-${month}-${day}`
      setSearchDate(formattedDate)
    }
  }
  const dateFormat = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')
    const formattedDate = `${year}-${month}-${day}`
    return formattedDate
  }
  let checkDate = dateFormat()
  const getMonthRange = (dateString = '') => {
    const date = dateString ? new Date(dateString) : new Date()
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0') as any

    const startOfMonth = `${year}-${month}-01`
    const endOfMonth = `${year}-${month}-${new Date(year, month, 0).getDate()}`

    return `${startOfMonth} - ${endOfMonth}`
  } 

  const getWeekRange = (dateString = '') => {
    let date
    if (dateString) {
      date = new Date(dateString)
    } else {
      date = new Date()
    }
    const dayOfWeek = date.getDay()

    // Calculate the difference between the selected date and the closest Sunday
    const diff = date.getDate() - dayOfWeek

    // Set the start of the week as Sunday
    const startOfWeek = new Date(date.setDate(diff))
    // console.log("startof week ", startOfWeek);
    // Set the end of the week as Saturday
    const endOfWeek = new Date(date.setDate(date.getDate() + 6))
    // console.log("endOfWeek  ", endOfWeek);

    // Format the start and end dates
    const startDateString = startOfWeek.toISOString().slice(0, 10)
    const endDateString = endOfWeek.toISOString().slice(0, 10)

    return `${startDateString} - ${endDateString}`
  }

  const getDateRange = () => {
    const today = new Date()
    const nextWeek = new Date()
    nextWeek.setDate(today.getDate() + 7)

    switch (selectedOption) {
      case 'weekly':
        let we = getWeekRange(searchDate)
        return we
      case 'monthly':
        let mm = getMonthRange(searchDate)
        return mm
      default:
        return ''
    }
  }

  const dateStrings = getDateRange().split(' - ')
  const newStartDate = dateStrings[0]
  const newEndDate = dateStrings[1]

  const handleChangeDropdownBranch = (selectedOption: any) => {
    setBranchFilter(selectedOption)
  }
  const handleChangeDropdownStatus = (selectedOption: any) => {
    setStatusFilter(selectedOption)
  }

  const handleChangeDropdownDiagnosis = (selectedOption: any) => {
    setDiagnosisFilter(selectedOption)
  }

  const handleSearch = () => {
    // setPageIndex(1);

    let reqData = {
      patient: '',
      dentist: '',
      fileNo: '',
      diagnosis_stage:
        diagnosisFilter?.value === '' ? '' : diagnosisFilter?.value,
      status: statusFilter?.value === 'All status' ? '' : statusFilter?.value,
      branch_name:
        branchFilter?.name === 'All branches' ? '' : branchFilter?.name,
      date: searchDate ? searchDate : '',
      range: {
        fromDate: newStartDate,
        toDate: newEndDate,
      },
      page: pageIndex,
      pageSize: dataPerPage,
    }

    if (
      searchDate !== '' ||
      selectedOption !== '' ||
      Object.keys(branchFilter).length !== 0 ||
      Object.keys(statusFilter).length !== 0 ||
      Object.keys(diagnosisFilter).length !== 0 ||
      searchDate !== '' ||
      selectedOption !== '' ||
      Object.keys(branchFilter).length > 0 ||
      Object.keys(statusFilter).length > 0 ||
      Object.keys(diagnosisFilter).length > 0
    ) {
      dispatch(getAllDentistAppointmentLists(requestGenerator(reqData))).then(
        (result) => {
          setTotalPage(result.payload.lastPage)
        }
      )
    }
  }

  const dateChange = (e: any) => {
    trimValue(e)
    setSearchDate(e.target.value)
    setSelectedOption(' ')
    setPageIndex(1)
  }
  useEffect(() => {
    console.log('useEffect called')
    let reqPayload = {
      patient: '',
      doctor:'',
      fileNo: '',
      status: statusFilter?.value === '' ? '' : statusFilter?.value,
      branch_name:
        branchFilter?.name === 'All branches' ? '' : branchFilter?.name,
      // date: searchDate,
      date: currentDate,
      range: {
        fromDate: newStartDate,
        toDate: newEndDate,
      },
      diagnosis_stage:
        diagnosisFilter?.value === '' ? '' : diagnosisFilter?.value,
      page: pageIndex,
      pageSize: dataPerPage,
    }
    dispatch(getAllDentistAppointmentLists(requestGenerator(reqPayload))).then(
      (result:any) => {
        setTotalPage(result.payload.lastPage)
      }
    )
  }, [dispatch, pageIndex, dataPerPage])
  // Rest of the component code
  useEffect(() => {
    dispatch(clearPatientMedicineData())
    dispatch(clearDiagnosisId())
  }, [])

  return (
    <>
      {isLoading && <Loader />}
      {showAddModal && (
        <Popup
          Children={AddTodoModal}
          popData={addModalData}
          handleClose={() => handleModalClose()}
          setModelOpenClose={setShowAddModal}
        />
      )}

      {showAddReminderModal && (
        <Popup
          Children={AddReminderModal}
          popData={addReminderModalData}
          handleClose={() => handleReminderModalClose()}
          setModelOpenClose={setShowAddReminderModal}
        />
      )}
      {showNewsModal && (
        <Popup
          Children={MedicalNewsModal}
          popData={newsModalData}
          handleClose={() => handleNewsModalClose()}
        />
      )}
      <div className={styles.mainContainer}>
        {/* <div className={styles.filterMainContainer}> */}
          <div className={styles.dateFilterContainer}>
            <input
              type="date"
              className={styles.inputField}
              value={searchDate}
              onChange={(e) => {
                dateChange(e)
              }}
            />

            <select
              className={styles.selectContainer}
              onChange={handleOptionChange}
              value={selectedOption}
            >
              <option value="Select">Select </option>
              <option value="today">Today</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>

            <DropDownGroup
              dropdownInitialState="Select status"
              dropwnInitialValueOption="All status"
              dropDownData={optionData}
              branchDropdownInitialState="Select branch"
              branchDropwnInitialValueOption="All branches"
              branchDropDownData={branchDataList}
              diagnosisDropdownInitialState="Diagnosis status"
              diagnosisDropwnInitialValueOption="All"
              diagnosisDropDownData={diagnosisStatusData}
              branchFilter={branchFilter}
              setBranchFilter={setBranchFilter}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              diagnosisFilter={diagnosisFilter}
              setDiagnosisFilter={setDiagnosisFilter}
              handleChangeDropdownStatus={handleChangeDropdownStatus}
              handleChangeDropdownBranch={handleChangeDropdownBranch}
              handleChangeDropdownDiagnosis={handleChangeDropdownDiagnosis}
            />

            <SearchButton
              handleClick={() => {
                handleSearch()
              }}
              customClass={styles.searchIconStyle}
            />
           <div className={styles.ipdContainer}>
            <Button title="IPD" customClass={styles.buttonIPDStyle} />
          </div>
          </div>
         
        {/* </div> */}

        <div className={styles.container}>
          <div className={styles.titleContainer}>
            <div className={styles.titleStyle}>Appointments</div>
          </div>

          <div className={styles.tableContainer}>
            <TableV2
              tableHeaderData={dentistAppointmentHeaderData}
              tableRowData={dentistAppointmentList}
            />
             
            {dentistAppointmentList?.length < 9 &&
            dentistListDataObject?.lastPage === 1 &&
            dentistListDataObject?.nextPage === 0 &&
            dentistListDataObject?.previousPage === 0 ? (
              ' '
            ) : (
              <Pagination
                setDataPerPage={setDataPerPage}
                pageIndexOptions={pageIndexOptions}
                pageIndex={pageIndex}
                setPageIndex={setPageIndex}
              />
            )}
          </div>
        </div>
        <div className={styles.chat} id="chat">
          <span className={styles.chatText}>Staff Chat</span>
          <StaffChat />
        </div>

        <div className={styles.staffInfoContainer}>
          <DentistTodo
            showAddModal={showAddModal}
            setShowAddModal={setShowAddModal}
            addModalData={addModalData}
            setAddModalData={setAddModalData}
            handleAddModal={handleAddModal}
            showAddReminderModal={showAddReminderModal}
            setShowAddReminderModal={setShowAddReminderModal}
            addReminderModalData={addReminderModalData}
            setAddReminderModalData={setAddReminderModalData}
            handleAddReminderModal={handleAddReminderModal}
          />

          <DentistMedicalNews
            showNewsModal={showNewsModal}
            setShowNewsModal={setShowNewsModal}
            newsModalData={newsModalData}
            setNewsModalData={setNewsModalData}
            handleNewsModal={handleNewsModal}
          />
        </div>

        <div>
          <DentistList />
        </div>
      </div>
    </>
  )
}
export default DentistAppointmentDashboard

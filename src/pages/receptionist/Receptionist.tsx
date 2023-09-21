import React, { FC, useEffect, useState } from 'react'
import TableV2 from '../../components/common/table/tableV2/TableV2'
import {
  medicalCenterUpdateData,
  // searchModalRowData,
  // toDoData1,
} from '../../constants/data'
import { todayAppointmentHeaderData } from '../../constants/table-data/todayAppointmentData'
import { requestGenerator } from '../../utils/payloadGenerator'
import styles from './receptionist.module.scss'
import Loader from '../../components/common/spinner/Loader'
import {
  AlarmIcon,
  OfflineDoctorIcon,
  OnlineDoctorIcon,
  RatingStarIcon,
  TodoCheckIcon,
  TodoUnCheckIcon,
} from '../../components/common/svg-components'

import Divider from '../../components/common/divider/Divider'
import { Link } from 'react-router-dom'
import Popup from '../../components/common/popup/Popup'
import AddTodoModal from '../../components/common/modal/add-todo-modal/AddTodoModal'
import Button from '../../components/common/button/Button'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import {
  deleteTodoList,
  getAllDoctorList,
  getAllMedicalCenterNews,
  getAllTodoList,
  updateTodoList,
} from '../../redux/features/receptionist/receptionistAsyncActions'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { getAllTodayPatient } from '../../redux/features/appointment/appointmentAsyncActions'
import Pagination from '../../components/common/pagination/Pagination'
import { getPatientBranchList } from '../../redux/features/patient-emr/patient/patientAsyncAction'
import { doctorListData } from '../../constants/data'
import moment from 'moment'
import { handleBirthDateChange } from '../../utils/utils'
import { getAllDoctors } from '../../redux/features/appointments/bookingAppointmentAsyncActions'
import { AVAILABLE_SLOT } from '../../constants/bookingConfirmationConstatnt'
import MedicalNewsModal from '../../components/common/modal/medical-news-modal/MedicalNewsModal'
import { socket } from '../../socket'
import Whatsapp from '../whatsapp/staff-chat/StaffChat'
import { sortBy } from 'lodash'
import StaffChat from '../whatsapp/staff-chat/StaffChat'
import AddReminderModal from '../../components/common/modal/add-reminder-modal/AddReminderModal'
import { getAllNotificationList } from '../../redux/features/app-notifications/appNotificationAsyncActions'

const Receptionist: FC = () => {
  const dispatch = useAppDispatch()
  const {
    isLoading,
    todayAppointmentData,
    todayAppointmentDoctorData,
    todayAppointmentInfo,
    stsUpdt,
  } = useAppSelector((state) => state.appointment)
  const { loading, todoListData, medicalCenterNewsData, doctorListData } =
    useAppSelector((state) => state.receptionist)
  // const { doctorData } = useAppSelector((state) => state.appointments);
  // console.log("doctorListData>>>>>", doctorListData);
  // console.log("doctorListData>>>>>", doctorListData);
  // console.log('medicalCenterNewsData>>>>>', medicalCenterNewsData)
  const [showAddModal, setShowAddModal] = useState<boolean>(false)
  const [addModalData, setAddModalData] = useState({})
  const [showNewsModal, setShowNewsModal] = useState<boolean>(false)
  const [newsModalData, setNewsModalData] = useState({})
  const animatedComponents = makeAnimated()
  const [selectedOption, setSelectedOption] = useState<any>({
    value: '',
    label: '',
  })
  const [dataPerPage, setDataPerPage] = useState<number>(10)
  const [totalPage, setTotalPage] = useState<number>(0)
  const [pageIndex, setPageIndex] = useState<number>(1)

  const { patientBranchList, emrLoader } = useAppSelector(
    (state) => state.patient
  )
  const [showAddReminderModal, setShowAddReminderModal] =
    useState<boolean>(false)
  const [addReminderModalData, setAddReminderModalData] = useState({})
  const { branchData } = useAppSelector((state) => state.login)

  // const socketConnection = async () => {
  //   await socket.emit("join", {}, (isJoined: any) => {
  //     if (isJoined) {
  //       console.log("join data", isJoined);
  //     }
  //   });
  // };
  // useEffect(() => {
  //   socketConnection();
  // }, []);
  // console.log("todayAppointmentData", todayAppointmentData);
  // console.log("filteredDoctors>>>>>>", todayAppointmentDoctorData);
  // console.log("patientBranchList", patientBranchList?.branches[0]._id);
  // let branche = patientBranchList?.branches;
  let branche = branchData?.branches
  // console.log("todayAppointmentInfo>>>>", todayAppointmentInfo);

  let branch_id = branche && branche.length > 0 && branche[0]?._id

  useEffect(() => {
    // let data = {
    //   page: 1,
    // };
    dispatch(getAllDoctorList(requestGenerator({})))
  }, [dispatch])

  useEffect(() => {
    dispatch(getAllNotificationList(requestGenerator({})))
  }, [])

  useEffect(() => {
    dispatch(getAllMedicalCenterNews(requestGenerator({})))
  }, [dispatch])

  const pageIndexArray = () => {
    let pageIndexOptions = []
    for (let i = 1; i <= totalPage; i++) {
      pageIndexOptions.push(i)
    }
    return pageIndexOptions
  }

  const pageIndexOptions = pageIndexArray()

  const [val, setVal] = useState('')
  const [branch, setBranch] = useState(branch_id)

  // console.log("branch", branch_id);

  useEffect(() => {
    if (branch_id !== undefined) {
      let data = {
        page: pageIndex,
        pageSize: dataPerPage,
        // branch_id: '6440c1d6f5baa851cd18a2f8',
        doctor_id: val,
        branch_id: branch === undefined ? branch_id : branch,
      }
      dispatch(getAllTodayPatient(requestGenerator(data))).then((result) => {
        // console.log("total page>>", result?.payload);
        setTotalPage(result?.payload?.todaysAppointments?.lastPage)
      })
    }
  }, [dispatch, pageIndex, dataPerPage, branch, branch_id])

  // useEffect(() => {
  //   dispatch(getPatientBranchList(requestGenerator({})));
  // }, [dispatch]);

  console.log('branch', branch)

  const handleSelectChange = (e: any) => {
    // console.log("option>>>", e.target.value);
    setVal(e.target.value)
    let option = e.target.value
    if (option !== '' && branch_id !== undefined) {
      // setSelectedOption(option);
      let data = {
        // page: pageIndex,
        pageSize: dataPerPage,

        // branch_id: '6440c1d6f5baa851cd18a2f8',
        branch_id: branch === undefined ? branch_id : branch,
        doctor_id: option,
        // doctor_id: option?.value,
      }
      dispatch(getAllTodayPatient(requestGenerator(data))).then((result) =>
        setTotalPage(result?.payload?.todaysAppointments?.lastPage)
      )
    }
    if (option === '') {
      let data = {
        page: pageIndex,
        pageSize: dataPerPage,
        // branch_id: '6440c1d6f5baa851cd18a2f8',
        branch_id: branch === undefined ? branch_id : branch,
        doctor_id: '',
      }
      dispatch(getAllTodayPatient(requestGenerator(data))).then((result) =>
        setTotalPage(result?.payload?.todaysAppointments?.lastPage)
      )
    }
  }

  const customStyles = {
    option: (provided: any) => ({
      ...provided,
      padding: '10px',
    }),
    optionHover: (provided: any) => ({
      ...provided,

      margin: '0px !important',
    }),
  }

  // add modal close
  const handleModalClose = () => {
    setShowAddModal(false)
    setAddModalData({})
  }
  // handleAddModal
  const handleAddModal = () => {
    setShowAddModal(!showAddModal)
    setAddModalData({})
  }
  useEffect(() => {
    let payloadData = {
      page: 0,
      pageSize: 0,
      search: '',
      is_active: true,
    }
    dispatch(getAllTodoList(requestGenerator(payloadData)))
  }, [dispatch])

  // handleReadTodo
  const handleReadTodo = (item: any) => {
    // console.log("read todo");
    let payloadData = {
      page: 0,
      pageSize: 0,
      search: '',
      is_active: true,
    }
    let id = item?._id

    dispatch(
      updateTodoList(
        requestGenerator({
          id,
          data: {
            title: item?.title,
            description: item?.description,
            priority: item?.priority,
            status: 'DONE',
          },
        })
      )
    ).then((e) => {
      if (e.type === 'receptionist/updateTodoList/fulfilled') {
        dispatch(getAllTodoList(requestGenerator(payloadData)))
      }
    })
  }

  // handleUnReadTodo
  const handleUnReadTodo = (item: any) => {
    // console.log("un read todo");
    let payloadData = {
      page: 0,
      pageSize: 0,
      search: '',
      is_active: true,
    }
    let id = item?._id

    dispatch(
      updateTodoList(
        requestGenerator({
          id,
          data: {
            title: item?.title,
            description: item?.description,
            priority: item?.priority,
            status: 'ACTIVE',
          },
        })
      )
    ).then((e) => {
      if (e.type === 'receptionist/updateTodoList/fulfilled') {
        dispatch(getAllTodoList(requestGenerator(payloadData)))
      }
    })
  }

  // handleEditModal
  const handleEditModal = (item: any) => {
    setShowAddModal(!showAddModal)
    setAddModalData(item)
  }

  // handleDeleteModal
  const handleDeleteModal = (item: any) => {
    // console.log("item handleDeleteModal", item);
    let payloadData = {
      page: 0,
      pageSize: 0,
      search: '',
      is_active: true,
    }
    let deletPayloadData = {
      id: item?._id,
      data: {
        is_active: !item?.is_active,
      },
    }
    dispatch(deleteTodoList(requestGenerator(deletPayloadData))).then((e) => {
      if (e.type === 'receptionist/deleteTodoList/fulfilled') {
        dispatch(getAllTodoList(requestGenerator(payloadData)))
      }
    })
  }

  // covert utc format to time
  const handleLoginTime = (timestamp: any) => {
    const time = moment(timestamp).utcOffset(0, true).format('h:mm A')
    console.log('time', time)
    return time
  }

  const handleDate = (formatedDate: any) => {
    const utcFormatDate = moment(formatedDate).format('DD')
    return utcFormatDate
  }
  const handleMonth = (formatedDate: any) => {
    const utcFormatDate = moment(formatedDate).format('MMM')
    return utcFormatDate
  }

  // medical news modal close
  const handleNewsModalClose = () => {
    setShowNewsModal(false)
    setNewsModalData({})
  }
  // handleNewsModal
  const handleNewsModal = (item: any) => {
    // console.log("item:", item);
    setShowNewsModal(!showAddModal)
    setNewsModalData(item)
  }

  let myArray =
    todayAppointmentDoctorData &&
    todayAppointmentDoctorData?.length > 0 &&
    todayAppointmentDoctorData

  let vNew =
    todayAppointmentDoctorData &&
    todayAppointmentDoctorData?.length > 0 &&
    [...myArray].sort((a, b) => (a.dcts > b.dcts ? 1 : -1))

  const sortedData = sortBy(myArray, [(item) => item.dcts.charAt(0)])

  // console.log('sortedData', sortedData)
  // add reminder modal close
  const handleReminderModalClose = () => {
    setShowAddReminderModal(false)
  }
  // handleAddReminderModal
  const handleAddReminderModal = () => {
    setShowAddReminderModal(!showAddReminderModal)
  }

  // handleReminderModal
  const handleReminderModal = (item: any) => {
    setShowAddReminderModal(!showAddModal)
    setAddReminderModalData(item)
  }
  return (
    <>
      {/* {isLoading && loading && <Loader />} */}
      {loading && <Loader />}
      {isLoading && <Loader />}
      {emrLoader && <Loader />}
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
      <div className={styles.receptionistContainer}>
        <div className={styles.todayAppointmentHeader}>
          <p className={styles.title}>Today's Appointments</p>
          <div className={styles.branchFilterContainer}>
            <div className={styles.filterContainer}>
              <p className={styles.filterText}>Branch</p>
              <select
                className={styles.selectContainer}
                value={branch}
                onChange={(e) => {
                  setBranch(e.target.value)
                  // console.log("e.target.value", e.target.value);
                }}
              >
                {branche &&
                  branche.length > 0 &&
                  branche.map((item: any, i: number) => {
                    return (
                      <option value={item?._id} key={i}>
                        {item?.name}
                      </option>
                    )
                  })}
              </select>
            </div>
            <div className={styles.filterContainer}>
              <p className={styles.filterText}>Filter</p>
              <select
                name="Select All"
                className={styles.selectContainer}
                onChange={handleSelectChange}
                value={val}
              >
                <option value=""> All Doctors</option>
                {vNew &&
                  vNew.length > 0 &&
                  vNew.map((item: any, i: number) => {
                    return (
                      <option value={item?._id} key={i}>
                        {item?.dcts}
                      </option>
                    )
                  })}
              </select>
            </div>
          </div>
        </div>
        <div className={styles.tableContainer}>
          <TableV2
            tableHeaderData={todayAppointmentHeaderData}
            tableRowData={todayAppointmentData}
          />
          {todayAppointmentData?.length > 0 && (
            <Pagination
              setDataPerPage={setDataPerPage}
              pageIndexOptions={pageIndexOptions}
              pageIndex={pageIndex}
              setPageIndex={setPageIndex}
            />
          )}
          {/* {todayAppointmentData?.length <= 10 &&
          todayAppointmentInfo?.lastPage === 1 &&
          todayAppointmentInfo?.nextPage === 0 &&
          todayAppointmentInfo?.previousPage === 0 ? (
            ' '
          ) : (
            <Pagination
              setDataPerPage={setDataPerPage}
              pageIndexOptions={pageIndexOptions}
              pageIndex={pageIndex}
              setPageIndex={setPageIndex}
            />
          )} */}
        </div>
        <div className={styles.chat} id="chat">
          <span className={styles.chatText}>Staff Chat</span>
          <StaffChat />
        </div>
        <div className={styles.staffInfoContainer}>
          {/* todo container */}
          <div className={styles.todoContainer}>
            <div className={styles.todoHeaderContainer}>
              <p className={styles.todoTitle}>To-Do List</p>
              <p
                className={styles.addNewStyle}
                onClick={() => handleAddModal()}
              >
                Add New
              </p>
            </div>

            <div className={styles.mainContainerTodo}>
              <div className={styles.container}>
                {todoListData.length > 0 ? (
                  todoListData?.map((item: any, i: any) => {
                    return (
                      <React.Fragment key={i}>
                        <div className={styles.notifyContainer}>
                          {item?.status === 'ACTIVE' ? (
                            <div
                              className={styles.unReadStyle}
                              // onClick={() => {
                              //   item?.title === "Remarks Notification"
                              //     ? handleReadNotificationRemark(item)
                              //     : handleReadNotification(item);
                              // }}
                            >
                              <div className={styles.titleStatusContainer}>
                                <div
                                  className={styles.titleStatusStyleContainer}
                                >
                                  <div>
                                    <TodoUnCheckIcon
                                      customClass={styles.iconStyle}
                                      handleClick={() => handleReadTodo(item)}
                                    />
                                  </div>

                                  <div
                                    style={{
                                      width: '100%',
                                      padding: '0px 10px 0px 0px',
                                    }}
                                  >
                                    <h5 className={styles.titleStyle}>
                                      {item?.title}
                                    </h5>
                                  </div>
                                </div>

                                <div className={styles.alarmPriorityContainer}>
                                  <div
                                    className={
                                      styles.priorityListStyleContainer
                                    }
                                  >
                                    {item?.priority === 'MEDIUM' ? (
                                      <div
                                        className={styles.mediumPriorityStyle}
                                      >
                                        Medium
                                      </div>
                                    ) : item?.priority === 'HIGH' ? (
                                      <div className={styles.highPriorityStyle}>
                                        High
                                      </div>
                                    ) : item?.priority === 'LOW' ? (
                                      <div className={styles.lowPriorityStyle}>
                                        Low
                                      </div>
                                    ) : (
                                      ''
                                    )}
                                  </div>
                                  <AlarmIcon
                                    customClass={styles.alarmIcon}
                                    handleClick={() =>
                                      handleReminderModal(item)
                                    }
                                  />
                                </div>
                              </div>
                              <p className={styles.textStyle}>
                                {item?.description}
                              </p>

                              <div className={styles.buttonContainer}>
                                <Button
                                  title="Edit"
                                  customClass={styles.editButtonStyle}
                                  handleClick={() => handleEditModal(item)}
                                />
                                <Button
                                  title="Delete"
                                  customClass={styles.deleteButtonStyle}
                                  handleClick={() => handleDeleteModal(item)}
                                />
                              </div>
                            </div>
                          ) : (
                            <div className={styles.isReadStyle}>
                              <div className={styles.titleStatusContainer}>
                                <div
                                  className={styles.titleStatusStyleContainer}
                                >
                                  <div>
                                    <TodoCheckIcon
                                      customClass={styles.iconStyle}
                                      handleClick={() => handleUnReadTodo(item)}
                                    />
                                  </div>
                                  <div
                                    style={{
                                      width: '100%',
                                      padding: '0px 10px 0px 0px',
                                    }}
                                  >
                                    <h5 className={styles.titleStyle}>
                                      {item?.title}
                                    </h5>
                                  </div>
                                </div>
                                <div className={styles.alarmPriorityContainer}>
                                  <div
                                    className={
                                      styles.priorityListStyleContainer
                                    }
                                  >
                                    {item?.priority === 'MEDIUM' ? (
                                      <div
                                        className={styles.mediumPriorityStyle}
                                      >
                                        Medium
                                      </div>
                                    ) : item?.priority === 'HIGH' ? (
                                      <div className={styles.highPriorityStyle}>
                                        High
                                      </div>
                                    ) : item?.priority === 'LOW' ? (
                                      <div className={styles.lowPriorityStyle}>
                                        Low
                                      </div>
                                    ) : (
                                      ''
                                    )}
                                  </div>
                                </div>
                              </div>
                              <p className={styles.textStyle}>
                                {item?.description}
                              </p>
                            </div>
                          )}

                          {i !== todoListData?.length - 1 && (
                            <Divider customClass={styles.divider} />
                          )}
                        </div>
                      </React.Fragment>
                    )
                  })
                ) : (
                  <p className={styles.noRecordTextStyle}>No task available</p>
                )}
              </div>
            </div>
          </div>
          {/* medicalCenter news container  */}
          <div className={styles.medicalCenterContainer}>
            <div className={styles.medicalCenterHeaderContainer}>
              <p className={styles.medicalCenterTitle}>Medical Center News</p>
            </div>
            <div className={styles.medicalCenterMainContainer}>
              <div className={styles.container}>
                {medicalCenterNewsData.length > 0 ? (
                  medicalCenterNewsData?.map((item: any, index: number) => {
                    return (
                      <React.Fragment key={index}>
                        <div className={styles.mcUpdatecontainer}>
                          <div className={styles.datecontainer}>
                            <div className={styles.dateStyleText}>
                              {handleDate(item?.updatedAt)}
                            </div>
                            <h4 className={styles.monthStyleText}>
                              {handleMonth(item?.updatedAt)}
                            </h4>
                          </div>
                          <div className={styles.updatenewscontainer}>
                            <p className={styles.title}>{item?.title}</p>
                            <p className={styles.description}>
                              {/* {item?.description} */}
                              {item?.description.length > 100
                                ? item?.description.slice(0, 100) + '...'
                                : item?.description}
                            </p>
                            <p className={styles.linkStyle}>
                              {item?.description.length > 100 ? (
                                <p
                                  onClick={() => {
                                    handleNewsModal(item)
                                  }}
                                  className={styles.linkStyle}
                                >
                                  Read More
                                </p>
                              ) : (
                                ''
                              )}
                            </p>
                          </div>
                        </div>
                      </React.Fragment>
                    )
                  })
                ) : (
                  <p className={styles.noRecordTextStyle}>No news found</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.doctorMainContainer}>
          <p className={styles.doctortitle}>Doctor</p>
          <div className={styles.doctorContainer}>
            {doctorListData.length > 0 ? (
              doctorListData?.map((item: any, index: number) => {
                return (
                  <React.Fragment key={index}>
                    <div className={styles.container}>
                      {/* <div className={styles.activeDocContainer}>
                        {item?.is_active === true ? (
                          <OnlineDoctorIcon />
                        ) : (
                          <OfflineDoctorIcon />
                        )}
                      </div> */}
                      <div className={styles.imageContainer}>
                        <img
                          src={item?.profile_pic}
                          style={{
                            width: '100%',
                            height: ' 84px',
                            borderRadius: '10px',
                          }}
                          alt=""
                        />
                      </div>
                      <div className={styles.doctorDetailsContainer}>
                        <div className={styles.ratingStyle}>
                          <span>
                            <RatingStarIcon />
                          </span>
                          <p className={styles.ratingTextStyle}>
                            {item?.avg_rating}
                          </p>
                        </div>
                        <p className={styles.doctorNameStyle}>
                          {item?.doctor_name}
                        </p>
                        <p className={styles.loginTimeStyle}>
                          <span className={styles.loginTextStyle}>
                            Login Time -
                          </span>
                          <span
                            style={{
                              fontWeight: '600',
                              fontSize: '12px',
                              paddingLeft: '5px',
                            }}
                          >
                            {item?.last_login
                              ? handleLoginTime(item?.last_login)
                              : 'NA'}
                          </span>
                        </p>
                      </div>
                    </div>
                  </React.Fragment>
                )
              })
            ) : (
              <p className={styles.noRecordTextStyle}>No doctor found</p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Receptionist

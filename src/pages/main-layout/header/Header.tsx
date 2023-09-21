import { FC, useRef } from 'react'
import styles from './header.module.scss'
import profileIcon from '../../../assets/images/profileIcon.png'
import {
  CalanderIcon,
  // NotificationIcon,
  TranslationIcon,
  QrcodeImg,
  NotificationNewIcon,
  TagPatientIcon,
  FormIcon,
  KpiRevenueIcon,
  StaffChatMessageIcon,
  ReportsIcons,
} from '../../../components/common/svg-components'
import { colors } from '../../../constants/color'
import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { MyRoutes } from '../../../components/app/routes/routeData'
import LogoutModal from '../../../components/common/modal/logout-modal/LogoutModal'
import PatientActivityLogModal from '../../../pages/patient-activity-log/patient-activity-log-modal/PatientActivityLogModal'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import HeaderMenu from '../../../components/header-menu/HeaderMenu'
import Popup from '../../../components/common/popup/Popup'
import { ReportsMenuData, appointMenuData } from '../../../constants/data'
import { IAppointmenuHeaderMenu } from '../../../interfaces/interfaces'
import QrCodeModal from '../../../components/common/modal/qr-code-modal/QrCodeModal'
import ViewAppointmentPopup from '../../../components/common/modal/view-appointment-popup/ViewAppointmentPopup'
import proactlatestlogo from '../../../assets/images/proactlatestlogo.png'
import NotificationModal from '../../../components/common/modal/notification-modal/NotificationModal'
import usePermissions from '../../../hooks/usePermissions'
import TaggedPatientModal from '../../../components/common/tagged-patient-model/TaggedPatientModal'
import TagsListModal from '../../../components/common/modal/tags_list_modal/TagsListModal'
import FormBuilderNameListModal from '../../../components/common/modal/form-builder-nameList-modal/FormBuilderNameListModal'
import PreviewFormDialog from '../../create-new-forms/preview-form-dialog/PreviewFormDialog'
import InsurancePlanPopup from '../../../components/common/modal/insurance-plan-popup/InsurancePlanPopup'
import SelectImage from '../../../assets/images/Default Image.png'
import Select from 'react-select'
import { setActiveRole } from '../../../redux/features/login/loginSlice'
import { getSideBarData } from '../../../redux/features/login/loginAsynActions'
import { requestGenerator } from '../../../utils/payloadGenerator'
import LaboratoryReportModal from '../../../components/common/modal/laboratory-report-modal/LaboratoryReportModal'
import ViewReportModal from '../../../components/common/modal/laboratory-report-modal/view-report/ViewReportModal'
import ViewLabReportNotes from '../../../components/common/modal/laboratory-report-modal/view-lab-notes-popup'
import { CustomModal } from '../../../components/common/custom-modal/modal'
import RadiologyReportModal from '../../../components/common/modal/radiology-report-modal/RadiologyReportModal'
import ViewRadiologyReportModal from '../../../components/common/modal/radiology-report-modal/view-report/ViewReportModal'
import ViewLRadiologyReportNotes from '../../../components/common/modal/radiology-report-modal/view-radiology-notes-popup'
import KPIRevenueModal from '../../../components/common/modal/kpi-revenue/KPIRevenue'
import TranslationMenu from '../../../components/common/translation-menu/TranslationMenu'

interface Iheader {}
const Header: FC<Iheader> = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const location = useLocation()
  const state = useLocation().state
  const { userData, branchData, activeRole } = useAppSelector(
    (state) => state.login
  )
  const [pageTitle, setPageTitle] = useState<string>('Proact')
  const { notificationListData } = useAppSelector(
    (state) => state.notifications
  )
  const [translationMenu, settranslationMenu] = useState<boolean>(false)
  const [kpiRevenue, setKPIRevenue] = useState<boolean>(false)

  const [showPatientActivityLog, setShowPatientActivityLog] =
    useState<boolean>(false)
  const [showQrcodeModal, setShowQrcodeModal] = useState<boolean>(false)
  const [logoutModal, setLogoutModal] = useState<boolean>(false)
  const [notificationModalOpen, setNotificationModalOpen] =
    useState<boolean>(false)
  const [taggedPatientModal, setTaggedPatientModal] = useState<boolean>(false)
  const [showSymptomsModal, setShowSymptomsModal] = useState<boolean>(false)
  const [symptomsPopupData, setSymptomsPopupData] = useState<any>({})
  const [showFormModal, setShowFormModal] = useState<boolean>(false)
  const { routeData, sidebar } = usePermissions()
  useState<boolean>(false)
  // const [notificationCount, setNotificationCount] = useState(true)
  const [appointmentMenu, setAppointmentMenu] = useState<boolean>(false)
  const [viewAppointment, setViewAppointment] = useState<boolean>(false)
  const [reportMenu, setreportMenu] = useState<boolean>(false)

  const [laboratoryReportPopup, setLaboratoryReportPopup] =
    useState<boolean>(false)
  const [viewPopup, setViewPopup] = useState<boolean>(false)
  const [radiologyReportPopup, setradiologyReportPopup] =
    useState<boolean>(false)

  // const [viewPopup, setViewPopup] = useState<boolean>(false);
  const [viewRadiologyReportPopup, setViewRadiologyReportPopup] =
    useState(false)
  // const [appointmentLog, setAppointmentLog] = useState<boolean>(false)
  // const [actionLog, setActionLog] = useState<boolean>(false)
  // const [statusSummary, setStatusSummary] = useState<boolean>(false)
  const [chatNotification, setChatNotification] = useState<any>(0)
  const [selectedFormDetails, setSelectedFormDetails] = useState<any>()
  const [showPreviewFormDialog, setShowPreviewFormDialog] =
    useState<boolean>(false)
  const [showPlan, setShowPlan] = useState(false)

  const [roleOptions, setRoleOptions] = useState([])
  const scrollToSection = (event: any, sectionId: any) => {
    event.preventDefault()
    const section: any = document.getElementById(sectionId)
    section.scrollIntoView({ behavior: 'smooth' })
  }
  const [labReport, setLabReport] = useState([])
  const [radiologyReport, setRadiologyReport] = useState([])
  const [showNotes, setShowNotes] = useState(false)
  const [radiologyShowNotes, setRadiologyShowNotes] = useState(false)
  const [items, setItems] = useState({})
  const [radiologyItems, setRadiologyItems] = useState({})

  const findActiveRoute = useCallback(
    (routes: MyRoutes[], pathname: string): void => {
      routes.forEach((item) => {
        if (pathname === item.location) {
          setPageTitle(item.header)
        }
        if (item.children.length > 0) {
          findActiveRoute(item.children, pathname)
        }
      })
    },
    []
  )

  // Find the active route based on the current location

  useEffect(() => {
    findActiveRoute(routeData || [], location.pathname)
  }, [findActiveRoute, location])

  const handleOpenModal = () => {
    setLogoutModal(!logoutModal)
    setNotificationModalOpen(false)
    setTaggedPatientModal(false)
    setShowFormModal(false)
    settranslationMenu(false)
  }

  // open close notification modal
  const handleOpenNotificationModal = () => {
    setNotificationModalOpen(!notificationModalOpen)
    setLogoutModal(false)
    setTaggedPatientModal(false)
    setShowFormModal(false)
    settranslationMenu(false)
  }

  const handlePatientActivityModal = () => {
    setShowPatientActivityLog((prevState) => !prevState)
  }
  const handleQrcodeModal = () => {
    setShowQrcodeModal((prevState) => !prevState)
  }

  const handleTaggedPatientModalOpen = () => {
    setTaggedPatientModal(!taggedPatientModal)
    setLogoutModal(false)
    setNotificationModalOpen(false)
    setShowFormModal(false)
    settranslationMenu(false)
  }

  const handleSymptomsModalOpen = (item: any) => {
    const popupDataPayload = {
      diag_apt_date: item?.appointment_date,
      diag_symptom_tags: item?.symptom_tags,
    }
    setShowSymptomsModal(!showSymptomsModal)
    setSymptomsPopupData(popupDataPayload)
  }

  const symptomsModalClose = () => {
    setSymptomsPopupData({})
    setShowSymptomsModal((prevState) => !prevState)
  }

  const handleFormModalOpen = () => {
    setShowFormModal(!showFormModal)
    setTaggedPatientModal(false)
    setLogoutModal(false)
    setNotificationModalOpen(false)
    setLogoutModal(false)
    settranslationMenu(false)
  }

  const ref = useRef<any>()
  const notificationRef = useRef<any>()
  const viewAppointmentRef = useRef<any>()
  const laboratoryRef = useRef<any>()
  const formRef = useRef<any>()
  const translationRef = useRef<any>()
  const kpiRef = useRef<any>()
  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (logoutModal && ref.current && !ref.current.contains(e.target)) {
        setLogoutModal(false)
      }
    }
    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside)
    }
  }, [logoutModal])

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (
        notificationModalOpen &&
        notificationRef.current &&
        !notificationRef.current.contains(e.target)
      ) {
        setNotificationModalOpen(false)
      }
    }
    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside)
    }
  }, [notificationModalOpen])

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (
        appointmentMenu &&
        viewAppointmentRef.current &&
        !viewAppointmentRef.current.contains(e.target)
      ) {
        setAppointmentMenu(false)
      }
    }
    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside)
    }
  }, [appointmentMenu])

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (
        reportMenu &&
        laboratoryRef.current &&
        !laboratoryRef.current.contains(e.target)
      ) {
        setreportMenu(false)
      }
    }
    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside)
    }
  }, [reportMenu])

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (
        showFormModal &&
        formRef.current &&
        !formRef.current.contains(e.target)
      ) {
        setShowFormModal(false)
      }
    }
    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside)
    }
  }, [showFormModal])

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (
        translationMenu &&
        translationRef.current &&
        !translationRef.current.contains(e.target)
      ) {
        settranslationMenu(false)
      }
    }
    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside)
    }
  }, [translationMenu])

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (kpiRevenue && kpiRef.current && !kpiRef.current.contains(e.target)) {
        setKPIRevenue(false)
      }
    }
    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside)
    }
  }, [kpiRevenue])

  const handleAppOpen = () => {
    setAppointmentMenu(!appointmentMenu)
  }
  const handleNavigate = (item: IAppointmenuHeaderMenu) => {
    if (item.navigate) {
      navigate(item.navigate, { state: { notRenderSidebar: true } })
    } else {
      setViewAppointment(true)
    }
    setAppointmentMenu(false)
  }
  const handleRadiologyReportPopup = () => {
    setradiologyReportPopup(true)
  }
  const handleReport = (item: IAppointmenuHeaderMenu) => {
    if (item.onPopupOpen) {
      setradiologyReportPopup(true)
    } else {
      setLaboratoryReportPopup(true)
    }
    setreportMenu(false)
  }
  const handleReportOpen = () => {
    setreportMenu(!reportMenu)
  }
  const handleNavigateToHome = () => {
    // const { navigateTo } = navigateAfterLogin(userData?.role)

    navigate(sidebar[0]?.navigate ? sidebar[0]?.navigate : '/notfound')
  }

  //**No Show Chat Count in Header */
  // async function emitMessageCount() {
  //   await socket.emit('getMessageCount', {}, (getMessageCountRes: any) => {
  //     let count = getMessageCountRes?.msgCount
  //     setChatNotification(count)

  //     // setNotificationCount(count);
  //   })
  // }
  // useEffect(() => {
  //   if (socket) {
  //     let i = 0
  //     socket.on('messageCount', function (msgCount: any) {
  //       let count = msgCount?.msgCount
  //       if (i > 1) {
  //         setChatNotification(count)
  //         // setNotificationCount(count);
  //       }
  //       i = i + 1
  //     })
  //   }
  // }, [socket])

  const handlePreviewFormDialogClose = (_element: any) => {
    setShowPreviewFormDialog(false)
    setSelectedFormDetails('')
  }

  // set active role and dropdown options

  useEffect(() => {
    if (branchData?.rolesArray && branchData?.rolesArray?.length > 0) {
      let roles = branchData?.rolesArray?.map((item: any) => ({
        label: item.name,
        value: item._id,
      }))
      setRoleOptions(roles)
      dispatch(setActiveRole(roles[0]))
    }
  }, [branchData?.rolesArray])
  return (
    <>
      <PreviewFormDialog
        open={showPreviewFormDialog}
        selectedFormDetails={selectedFormDetails}
        handleClose={handlePreviewFormDialogClose}
      />

      {showPatientActivityLog && (
        <Popup
          Children={PatientActivityLogModal}
          handleClose={handlePatientActivityModal}
        />
      )}
      {showQrcodeModal && (
        <Popup Children={QrCodeModal} handleClose={handleQrcodeModal} />
      )}
      {viewAppointment && (
        <Popup
          Children={ViewAppointmentPopup}
          handleClose={() => setViewAppointment(false)}
          setModelOpenClose={setViewAppointment}
          // handleStatusSummary={() => setStatusSummary(true)}
        />
      )}
      {laboratoryReportPopup && (
        <Popup
          Children={LaboratoryReportModal}
          handleClose={() => setLaboratoryReportPopup(false)}
          handleOpen={(item: any) => (setViewPopup(true), setLabReport(item))}
          setModelOpenClose={setLaboratoryReportPopup}
        />
      )}
      {viewPopup && (
        <Popup
          Children={ViewReportModal}
          handleClose={() => setViewPopup(false)}
          setModelOpenClose={setViewPopup}
          popData={labReport}
          handleOpen={(item: any) => (setShowNotes(true), setItems(item))}
          // handleStatusSummary={() => setStatusSummary(true)}
        />
      )}
      {showNotes && (
        <Popup
          Children={ViewLabReportNotes}
          handleClose={() => setShowNotes(false)}
          popData={items}
        />
      )}
      {/* {radiologyReportPopup && (
        <Popup
          Children={RadiologyReportModal}
          handleClose={() => setradiologyReportPopup(false)}
          handleOpen={(item: any) => (
            setViewRadiologyReportPopup(true), setRadiologyReport(item)
          )}
          setModelOpenClose={setLaboratoryReportPopup}
        />
      )} */}

      <CustomModal
        title="Radiology Reports"
        showModal={radiologyReportPopup}
        closeModal={() => setradiologyReportPopup(false)}
        width="60%"
        height="600px"
      >
        <RadiologyReportModal
          handleOpen={(item: any) => (
            setViewRadiologyReportPopup(true), setRadiologyReport(item)
          )}
        />
      </CustomModal>

      {/* kpi revenue popup */}
      <CustomModal
        title="KPI | Revenue"
        showModal={kpiRevenue}
        closeModal={() => setKPIRevenue(false)}
        width="90%"
        // height="800px"
        customModalClass={styles.kpiModal}
      >
        <KPIRevenueModal />
      </CustomModal>
      {viewRadiologyReportPopup && (
        <Popup
          Children={ViewRadiologyReportModal}
          handleClose={() => setViewRadiologyReportPopup(false)}
          setModelOpenClose={setViewRadiologyReportPopup}
          handleOpen={(item: any) => (
            setRadiologyShowNotes(true), setRadiologyItems(item)
          )}
          popData={radiologyReport}
          // handleStatusSummary={() => setStatusSummary(true)}
        />
      )}
      {radiologyShowNotes && (
        <Popup
          Children={ViewLRadiologyReportNotes}
          handleClose={() => setRadiologyShowNotes(false)}
          popData={radiologyItems}
        />
      )}
      {/* tagged Patient Modal */}
      {taggedPatientModal && (
        <Popup
          Children={TaggedPatientModal}
          handleClose={handleTaggedPatientModalOpen}
          handleOpen={handleSymptomsModalOpen}
        />
      )}
      {/* tagged Patient symptoms Modal */}
      {showSymptomsModal && (
        <Popup
          Children={TagsListModal}
          handleClose={symptomsModalClose}
          popData={symptomsPopupData}
          heading={'Symptoms'}
        />
      )}
      {/* Form Modal
      {showFormModal && (
        <Popup
          Children={FormBuilderNameListModal}
          handleClose={handleFormModalOpen}
        />
      )} */}

      {showPlan && (
        <Popup
          Children={InsurancePlanPopup}
          handleClose={() => setShowPlan(false)}
        />
      )}

      <div className={styles.headerWithLogo}>
        {state?.notRenderSidebar && (
          <div className={styles.sidebarContainer}>
            <img
              src={proactlatestlogo}
              alt="proact_logo"
              className={styles.logoStyle}
              onClick={() => handleNavigateToHome()}
            />
          </div>
        )}

        <div className={styles.mainContainer}>
          <div className={styles.headerContainer}>
            <div className={styles.roleTitleContainer}>
              <Select
                // className={styles.selectInputField}
                isSearchable={true}
                value={activeRole}
                // isClearable={true}
                options={roleOptions}
                maxMenuHeight={200}
                closeMenuOnSelect={true}
                placeholder="Select Role"
                onChange={(e: any) => {
                  dispatch(setActiveRole(e))
                  dispatch(
                    getSideBarData(requestGenerator({ role_id: e?.value }))
                  )
                }}
              />
              <p className={styles.headerText}>{pageTitle}</p>
            </div>

            <div className={styles.branchContainer}>
              <p className={styles.titleText}>Medical Center</p>
              <p className={styles.mcName}>{userData?.mc_name}</p>
            </div>
            <div className={styles.profileContainer}>
              {/* <p className={styles.title}>Forms</p> */}
              {userData && userData?.role === 'MC_ADMIN' ? null : userData &&
                userData?.role === 'DOCTOR' ? (
                <>
                  <div
                    className={styles.appointmentContainer}
                    onClick={handleTaggedPatientModalOpen}
                  >
                    <TagPatientIcon />
                    <span className={styles.appointmentName}>
                      Tagged Patients
                    </span>
                  </div>
                  <div
                    className={styles.appointmentContainer}
                    onClick={handleFormModalOpen}
                  >
                    <div>
                      <FormIcon />
                      <span className={styles.appointmentName}>Forms</span>
                    </div>
                    {showFormModal && (
                      <FormBuilderNameListModal
                        formBuilderRef={formRef}
                        handleOpen={setShowPreviewFormDialog}
                        selectField={setSelectedFormDetails}
                        handleClose={setShowFormModal}
                        handleInsurancePlan={() => {
                          setShowPlan(true)
                          setShowFormModal(false)
                        }}
                      />
                    )}
                  </div>
                  <div
                    className={styles.appointmentContainer}
                    onClick={() => setKPIRevenue(!kpiRevenue)}
                  >
                    <KpiRevenueIcon />
                    <span className={styles.appointmentName}>
                      KPI | Revenue
                    </span>
                  </div>
                </>
              ) : (
                ''
              )}
              {/* <p className={styles.title}>Forms</p> */}
              {userData && userData?.role === 'RECEPTIONIST' && (
                <>
                  <div
                    className={styles.appointmentContainer}
                    onClick={() => handleAppOpen()}
                  >
                    <div className={styles.inlineItems}>
                      <CalanderIcon fillColor={colors.green1} />
                      <span className={styles.appointmentName}>
                        Appointment
                      </span>
                    </div>
                    {appointmentMenu && (
                      <HeaderMenu
                        menuData={appointMenuData}
                        handleClick={(item) => handleNavigate(item)}
                        viewRef={viewAppointmentRef}
                      />
                    )}
                  </div>
                  <div
                    className={styles.appointmentContainer}
                    onClick={handleReportOpen}
                  >
                    <div className={styles.inlineItems}>
                      <ReportsIcons />
                      <span className={styles.appointmentName}>Reports</span>
                    </div>
                    {reportMenu && (
                      <HeaderMenu
                        menuData={ReportsMenuData}
                        handleClick={(onPopupOpen) => handleReport(onPopupOpen)}
                        viewRef={laboratoryRef}
                      />
                    )}
                  </div>
                  <div
                    className={styles.appointmentContainer}
                    onClick={handleFormModalOpen}
                  >
                    <div className={styles.inlineItems}>
                      <FormIcon />
                      <span className={styles.appointmentName}>Forms</span>
                    </div>
                    {showFormModal && (
                      <FormBuilderNameListModal
                        formBuilderRef={formRef}
                        handleOpen={setShowPreviewFormDialog}
                        selectField={setSelectedFormDetails}
                        handleClose={setShowFormModal}
                        handleInsurancePlan={() => {
                          setShowPlan(true)
                          setShowFormModal(false)
                        }}
                      />
                    )}
                  </div>
                  <div
                    className={styles.appointmentContainer}
                    onClick={handlePatientActivityModal}
                  >
                    <div className={styles.inlineItems}>
                      <CalanderIcon fillColor={colors.green1} />
                      <span className={styles.appointmentName}>
                        Patient Activity Log
                      </span>
                    </div>
                  </div>
                </>
              )}
              {userData && userData?.role === 'MC_ADMIN' && (
                <div
                  className={styles.qrcodeContainer}
                  onClick={handleQrcodeModal}
                >
                  <div className={styles.qrcodeImg}>
                    <QrcodeImg />
                  </div>
                  <div className={styles.qrcodeText}>
                    <span>Get QR code</span>
                  </div>
                </div>
              )}

              <div className={styles.profileTranslationContainer}>
                {location.pathname === '/doctor' ||
                location.pathname === '/receptionist' ? (
                  <>
                    <a href="#chat" onClick={(e) => scrollToSection(e, 'chat')}>
                      <StaffChatMessageIcon />
                    </a>

                    {chatNotification > 0 && (
                      <div
                        className={
                          chatNotification
                            ? styles.chatNotificationCount
                            : styles.disable
                        }
                      >
                        {chatNotification}
                      </div>
                    )}
                  </>
                ) : (
                  ''
                )}
                <div className={styles.translactionMenuContainer}>
                  <TranslationIcon
                    fillColor={colors.grey2}
                    handleClick={() => settranslationMenu(!translationMenu)}
                  />
                  {translationMenu && (
                    <TranslationMenu translationRef={translationRef} />
                  )}
                </div>
                <div className={styles.notiifcationConatiner}>
                  {notificationListData?.notificationCount > 0 ? (
                    <div
                      className={styles.circle}
                      onClick={handleOpenNotificationModal}
                    >
                      <p className={styles.countTextStyle}>
                        {notificationListData?.notificationCount > 99
                          ? notificationListData?.notificationCount + '+'
                          : notificationListData?.notificationCount}
                      </p>
                    </div>
                  ) : (
                    ''
                  )}
                  <NotificationNewIcon
                    customClass={styles.notiifcationIconStyle}
                    handleClick={handleOpenNotificationModal}
                    iconRef={notificationRef}
                  />
                </div>

                <img
                  ref={ref}
                  src={
                    branchData?.profile_pic
                      ? branchData?.profile_pic
                      : SelectImage
                  }
                  alt="profile_img"
                  onClick={handleOpenModal}
                  className={styles.profileIconStyle}
                />
              </div>
            </div>
          </div>
          {/* {appointmentMenu && (
            <HeaderMenu
              menuData={appointMenuData}
              handleClick={(item) => handleNavigate(item)}
              viewRef={viewAppointmentRef}
            />
          )} */}

          {logoutModal && <LogoutModal logoutRef={ref} />}
          {notificationModalOpen && (
            <NotificationModal
              setNotificationModalOpen={setNotificationModalOpen}
              notiRef={notificationRef}
            />
          )}
          {/* {showFormModal && (
            <FormBuilderNameListModal
              formBuilderRef={formRef}
              handleOpen={setShowPreviewFormDialog}
              selectField={setSelectedFormDetails}
              handleClose={setShowFormModal}
              handleInsurancePlan={() => {
                setShowPlan(true)
                setShowFormModal(false)
              }}
            />
          )} */}
        </div>
      </div>
    </>
  )
}

export default Header

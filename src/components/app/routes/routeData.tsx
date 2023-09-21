import { ReactElement } from 'react'
import MainLayout from '../../../pages/main-layout/MainLayout'
import Login from '../../../pages/login/Login'
import AuthWrapper from './AuthWrapper'
import LandingPage from '../../common/landing-page/LandingPage'
import ForgotPassword from '../../../pages/login/forgot-password/ForgotPassword'
import OtpVerfication from '../../../pages/login/otp-verfication/OtpVerfication'
import RecoveryPassword from '../../../pages/login/recovery-password/RecoveryPassword'
import NotFound from '../../common/not-found/NotFound'
import MobileAppConfigLayout from '../../../pages/mobileapp-configuraion/MobileAppConfigLayout'
import MobileAppAppointment from '../../../pages/mobileapp-configuraion/mobile-app-appointment/MobileAppAppointment'
import MobileAppNews from '../../../pages/mobileapp-configuraion/mobile-app-news/MobileAppNews'
import ManageUsersLayout from '../../../pages/manage-users/ManageUsersLayout'
import ManageUsers from '../../../pages/manage-users/manage-user-grid/ManageUsers'
import MasterTableManagementLayout from '../../../pages/master-table-management/MasterTableManagementLayout'
import ManageUserGroupsLayout from '../../../pages/manage-usergroups/ManageUserGroupsLayout'
import DashboardLayout from '../../../pages/dashboard/DashboardLayout'
import CreateUsers from '../../../pages/manage-users/create-user/CreateUsers'
import MedicalCenterDepartment from '../../../pages/dashboard/department/MedicalCenterDepartment'
import MedicalCenterBranch from '../../../pages/dashboard/branch/MedicalCenterBranch'
import BranchList from '../../../pages/dashboard/branch/branch-list/BranchList'
import CreateUserPrimary from '../../../pages/manage-users/create-user/create-user-primary/CreateUserPrimary'
import CreateUserSecondary from '../../../pages/manage-users/create-user/create-user-secondary/CreateUserSecondary'
import UserGroupList from '../../../pages/manage-usergroups/usergrouplist/UserGroupList'
import ManageBranch from '../../../pages/dashboard/branch/manage-branch/ManageBranch'
import DepartmentList from '../../../pages/dashboard/department/department-list/DepartmentList'
import ManageDepartment from '../../../pages/dashboard/department/manage-department/ManageDepartment'
import ManageSpecialities from '../../../pages/dashboard/department/manage-specialities/ManageSpecialities'
import ManageUserGroup from '../../../pages/manage-usergroups/usergrouplist/manage-usergroup/ManageUsergroup'
import MasterTableCategory from '../../../pages/master-table-management/master-table-category/MasterTableCategory'
import PrimaryUserGroup from '../../../pages/manage-usergroups/usergrouplist/manage-usergroup/primary/PrimaryUsergroup'
import SecondaryUsergroup from '../../../pages/manage-usergroups/usergrouplist/manage-usergroup/secondary/SecondaryUsergroup'
import MasterTableCategoryValue from '../../../pages/master-table-management/master-table-category-value/MasterTableCategoryValue'
import PatientActivityLog from '../../../pages/patient-activity-log/PatientActivityLog'
import PatientEmrLayout from '../../../pages/patient-emr/PatientEmrLayout'
import PatientEmrDashboard from '../../../pages/patient-emr/patient-emr-dashboard/PatientEmrDashboard'
import BookingSchedularFunctional from '../../../pages/appointment/BookingFunctional'
import BookingSchedular from '../../../pages/appointment/BookingSchedular'
import ShareQuestionEmail from '../../../pages/patient-emr/share-question-email/ShareQuestionEmail'
import SubmitQuestionnaireLayout from '../../../pages/submit-questionnaire/submit-questionnaire-layout/SubmitQuestionnaireLayout'
import SubmitQuestionnaireForm from '../../../pages/submit-questionnaire/submit-questionnaire-form/SubmitQuestionnaireForm'
import QuestionnaireSubmit from '../../../pages/submit-questionnaire/questionnaire-submit/QuestionnaireSubmit'
import Receptionist from '../../../pages/receptionist/Receptionist'
import SubmitOtp from '../../../pages/submit-otp/SubmitOtp'
import BookingSchedularv2 from '../../../pages/appointment/BookingFunctionV2'
import MainSchedular from '../../../pages/appointment/SchedularMainLayout'
import MobileAppointmentRequest from '../../../pages/mobile-appointment-request/MobileAppointmentRequest'
import AdminModuleScreens from '../../../pages/admin-module-screens/AdminModuleScreens'
import DoctorAppointmentDashboard from '../../../pages/doctor-dashboard/doctor-appointments/DoctorAppointmentDashboard'
import DoctorDiagnosisLayout from '../../../pages/doctor-diagnosis/DoctorDiagnosisLayout'
import DiagnosisForm from '../../../pages/doctor-diagnosis/diagnosis/diagnosis-form/DiagnosisForm'
import Medication from '../../../pages/doctor-diagnosis/medication/Medication'
import Referral from '../../../pages/doctor-diagnosis/referal/Referral'
import TreatmentPlanList from '../../../pages/doctor-diagnosis/treatment/treatment-plan-list/TreatmentPlanList'
import CreateNewFormsLayout from '../../../pages/create-new-forms/CreateNewFormsLayout'
import CreateNewFormList from '../../../pages/create-new-forms/create-new-form-list/CreateNewFormList'
import CreateNewFormBuilder from '../../../pages/create-new-forms/create-new-form-builder/CreateNewFormBuilder'
import Request from '../../../pages/doctor-diagnosis/request/Request'
import Invoice from '../../../pages/doctor-diagnosis/invoice/Invoice'
import CoomingSoon from '../../../pages/coming-soon/CoomingSoon'
import PharmacyLayout from '../../../pages/pharmacy/PharmacyLayout'
import PharmacyInfoForm from '../../../pages/pharmacy/pharmacy-info/PharmacyInfoForm'
import JobLayout from '../../../pages/job/JobLayout'
import CreateJobs from '../../../pages/job/create-jobs/CreateJobs'
import ViewJobs from '../../../pages/job/view-jobs/ViewJobs'
import LabRequestLayout from '../../../pages/lab-request/LabRequestLayout'
import LabRequest from '../../../pages/lab-request/labRequest/LabRequest'
import InvoiceLayout from '../../../pages/invoice/InvoiceLayout'
import InvoiceInformation from '../../../pages/invoice/invoice-information/InvoiceInformation'
import InvoiceServices from '../../../pages/invoice/invoice-services/InvoiceServices'
import InvoicePayment from '../../../pages/invoice/invoice-payment/InvoicePayment'
import MainStoreLayout from '../../../pages/mainstore/MainStoreLayout'
import MainStore from '../../../pages/mainstore/mainstore/MainStore'
import BranchStore from '../../../pages/branchstore/branchstore/BranchStore'
import BranchStoreLayout from '../../../pages/branchstore/BranchStoreLayout'
import RequestLayout from '../../../pages/request/RequestLayout'

export interface MyRoutes {
  path: string
  element: ReactElement<any, any>
  children: MyRoutes[]
  header: string
  location?: string
  roles?: string[]
  id?: string | number
}

export const mcAdminRoutes: MyRoutes[] = [
  {
    path: '/',
    element: <LandingPage />,
    children: [
      {
        path: '',
        element: <Login />,
        children: [],
        header: '',
        location: '/',
      },
      {
        path: 'forgotpassword',
        element: <ForgotPassword />,
        children: [],
        header: '',
        location: '/forgotpassword',
      },
      {
        path: 'otpverfication',
        element: <OtpVerfication />,
        children: [],
        header: '',
        location: '/otpverfication',
      },
      {
        path: 'resetpassword',
        element: <RecoveryPassword />,
        children: [],
        header: '',
        location: '/resetpassword',
      },
    ],
    header: '',
    location: '/',
  },
  {
    path: 'submitquestionnairelayout',
    element: <SubmitQuestionnaireLayout />,
    children: [
      {
        path: '',
        element: <SubmitQuestionnaireForm />,
        children: [],
        header: '',
        location: '/submitquestionnairelayout',
      },
      {
        path: 'questionnairesubmit',
        element: <QuestionnaireSubmit />,
        children: [],
        header: '',
        location: '/submitquestionnairelayout/questionnairesubmit',
      },
    ],
    header: '',
    location: '/submitquestionnairelayout',
  },
  {
    path: 'submitotp',
    element: <SubmitOtp />,
    children: [],
    header: '',
    location: '/submitotp',
  },
  {
    path: '/*',
    element: (
      <AuthWrapper>
        <MainLayout />
      </AuthWrapper>
    ),
    children: [
      {
        path: 'mobileappconfiguration/*',
        element: <MobileAppConfigLayout />,
        children: [
          // {
          //   path: '',
          //   element: <MobileAppConfigLayout />,
          //   children: [],
          //   header: 'Mobile App Configurations',
          //   location: '/mobileappconfiguration',
          //   roles: ['Super Admin'],
          // },
          {
            path: 'appointment',
            element: <MobileAppAppointment />,
            children: [],
            header: 'Mobile App Configurations',
            location: '/mobileappconfiguration/appointment',
            roles: ['MC Admin'],
          },
          {
            path: 'news',
            element: <MobileAppNews />,
            children: [],
            header: 'Mobile App Configurations',
            location: '/mobileappconfiguration/news',
            roles: ['MC Admin'],
          },
        ],
        header: 'Mobile App Configurations',
        location: '/mobileappconfiguration',
        roles: ['MC Admin'],
      },

      {
        path: 'manageusers/*',
        element: <ManageUsersLayout />,
        children: [
          {
            path: '',
            element: <ManageUsers />,
            children: [],
            header: 'Manage Staff',
            location: '/manageusers',
            roles: ['MC Admin'],
          },
          {
            path: 'createusers/*',
            element: <CreateUsers />,
            children: [
              {
                path: 'primary',
                element: <CreateUserPrimary />,
                children: [],
                header: 'Manage Staff',
                location: '/manageusers/createusers/primary',
                roles: ['Super Admin'],
              },
              {
                path: 'secondary',
                element: <CreateUserSecondary />,
                children: [],
                header: 'Manage Staff',
                location: '/manageusers/createusers/secondary',
                roles: ['Super Admin'],
              },
            ],
            header: 'Add Medical Center Users',
            location: '/manageusers/createusers',
            roles: ['Super Admin'],
          },
        ],
        header: 'Manage Staff',
        location: '/manageusers',
        roles: ['MC Admin'],
      },
      {
        path: 'mastertablemanage/*',
        element: <MasterTableManagementLayout />,
        children: [
          {
            path: '',
            element: <MasterTableManagementLayout />,
            children: [],
            header: 'Manage Master Tables - Manage Category',
            location: '/mastertablemanage',
            roles: ['MC Admin'],
          },
          {
            path: 'managecategory',
            element: <MasterTableCategory />,
            children: [],
            header: 'Manage Master Tables - Manage Category',
            location: '/managecategory',
            roles: ['MC Admin'],
          },
          {
            path: 'managecategoryvalue',
            element: <MasterTableCategoryValue />,
            children: [],
            header: 'Manage Master Tables - Manage Category Value',
            location: '/managecategoryvalue',
            roles: ['MC Admin'],
          },
        ],
        header: 'Manage Master Tables',
        location: '/mastertablemanage/managecategory',
        roles: ['MC Admin'],
      },
      {
        path: 'usergroups/*',
        element: <ManageUserGroupsLayout />,
        children: [
          {
            path: '',
            element: <UserGroupList />,
            children: [],
            header: 'Manage Usergroups',
            location: '/usergroups',
            roles: ['MC Admin'],
          },
          {
            path: 'manageusergroups/*',
            element: <ManageUserGroup />,
            children: [
              {
                path: 'primary',
                element: <PrimaryUserGroup />,
                children: [],
                header: 'Manage Usergroup',
                location: '/manageusergroups/usergroups',
                roles: ['MC Admin'],
              },
              {
                path: 'secondary',
                element: <SecondaryUsergroup />,
                children: [],
                header: 'Manage Usergroup',
                location: '/manageusergroups/usergroups/secondary',
                roles: ['MC Admin'],
              },
            ],
            header: 'Manage Usergroup',
            location: '/usergroups/manageusergroups',
            roles: ['MC Admin'],
          },
        ],
        header: 'Manage Usergroups',
        location: '/usergroup',
        roles: ['MC Admin'],
      },
      {
        path: 'medicalcenter/*',
        element: <DashboardLayout />,
        children: [
          {
            path: 'branch',
            element: <MedicalCenterBranch />,
            children: [
              {
                path: '',
                element: <BranchList />,
                children: [],
                header: 'Manage Medical Center Setup',
                location: '/medicalcenter/branch',
                roles: ['Medical Center Admin'],
              },
              {
                path: 'managebranch',
                element: <ManageBranch />,
                children: [],
                header: 'Manage Medical Center Setup',
                location: '/medicalcenter/branch/managebranch',
                roles: ['Medical Center Admin'],
              },
            ],
            header: 'Manage Medical Center Setup',
            location: '/medicalcenter/branch',
            roles: ['Medical Center Admin'],
          },
          {
            path: 'department',
            element: <MedicalCenterDepartment />,
            children: [
              {
                path: '',
                element: <DepartmentList />,
                children: [],
                header: 'Manage Medical Center Setup',
                location: '/medicalcenter/department',
                roles: ['Medical Center Admin'],
              },
              {
                path: 'managedepartment',
                element: <ManageDepartment />,
                children: [],
                header: 'Manage Medical Center Setup',
                location: '/medicalcenter/department/managedepartment',
                roles: ['Medical Center Admin'],
              },
              {
                path: 'managespecialities',
                element: <ManageSpecialities />,
                children: [],
                header: 'Manage Medical Center Setup',
                location: '/medicalcenter/department/managespecialities',
                roles: ['Medical Center Admin'],
              },
            ],
            header: 'Manage Medical Center Setup',
            location: '/medicalcenter/department',
            roles: ['Medical Center Admin'],
          },
        ],
        header: 'Medical Center - Branch Setup',
        location: '/medicalcenter/branch',
        roles: ['Super Admin'],
      },

      {
        path: '*',
        element: <NotFound />,
        children: [],
        header: 'Page Not Found',
        roles: ['MC Admin'],
      },
      {
        path: 'notfound',
        element: <NotFound />,
        children: [],
        header: 'Page Not Found',
        roles: ['MC Admin'],
      },
      {
        path: 'notpermitted',
        element: <NotFound />,
        children: [],
        header: 'Page Not Found',
        roles: ['MC Admin'],
      },
      {
        path: 'modules/*',
        element: <AdminModuleScreens />,
        children: [
          // {
          //   path: "",
          //   element: <ManageUsers />,
          //   children: [],
          //   header: "Manage Staff",
          //   location: "/manageusers",
          //   roles: ["MC Admin"],
          // },
          // {
          //   path: "modules/*",
          //   element: <AdminModuleScreens />,
          //   children: [
          //     // {
          //     //   path: "primary",
          //     //   element: <CreateUserPrimary />,
          //     //   children: [],
          //     //   header: "Manage Staff",
          //     //   location: "/manageusers/createusers/primary",
          //     //   roles: ["Super Admin"],
          //     // },
          //     // {
          //     //   path: "secondary",
          //     //   element: <CreateUserSecondary />,
          //     //   children: [],
          //     //   header: "Manage Staff",
          //     //   location: "/manageusers/createusers/secondary",
          //     //   roles: ["Super Admin"],
          //     // },
          //   ],
          //   header: "Modules",
          //   location: "/modules",
          //   roles: ["Super Admin"],
          // },
        ],
        header: 'Modules',
        location: '/modules',
        roles: ['MC Admin'],
      },
      // {
      //   path: "mobileappointmentrequest/*",
      //   element: <MobileAppointmentRequest />,
      //   children: [],
      //   header: "Mobile Appointment Request",
      //   location: "/mobileappointmentrequest",
      //   roles: ["MC Admin"],
      // },
    ],
    header: 'Home',
    roles: ['MC Admin'],
  },
]
export const receptionistRoutes: MyRoutes[] = [
  {
    path: '/',
    element: <LandingPage />,
    children: [
      {
        path: '',
        element: <Login />,
        children: [],
        header: '',
        location: '/',
      },
      {
        path: 'forgotpassword',
        element: <ForgotPassword />,
        children: [],
        header: '',
        location: '/forgotpassword',
      },
      {
        path: 'otpverfication',
        element: <OtpVerfication />,
        children: [],
        header: '',
        location: '/otpverfication',
      },
      {
        path: 'resetpassword',
        element: <RecoveryPassword />,
        children: [],
        header: '',
        location: '/resetpassword',
      },
    ],
    header: '',
    location: '/',
  },
  {
    path: 'submitquestionnairelayout',
    element: <SubmitQuestionnaireLayout />,
    children: [
      {
        path: '',
        element: <SubmitQuestionnaireForm />,
        children: [],
        header: '',
        location: '/submitquestionnairelayout',
      },
      {
        path: 'questionnairesubmit',
        element: <QuestionnaireSubmit />,
        children: [],
        header: '',
        location: '/submitquestionnairelayout/questionnairesubmit',
      },
    ],
    header: '',
    location: '/submitquestionnairelayout',
  },
  {
    path: 'submitotp',
    element: <SubmitOtp />,
    children: [],
    header: '',
    location: '/submitotp',
  },
  {
    path: '/*',
    element: (
      <AuthWrapper>
        <MainLayout />
      </AuthWrapper>
    ),
    children: [
      {
        path: 'patientemr/*',
        element: <PatientEmrLayout />,
        children: [
          {
            path: '',
            element: <PatientEmrDashboard />,
            children: [],
            header: 'Patient EMR Dashboard',
            location: '/patientemr',
            roles: ['MC Admin'],
          },
          {
            path: 'sharequestionnaireemail',
            element: <ShareQuestionEmail />,
            children: [],
            header: 'Patient Emr Dashboard',
            location: 'patientemr/sharequestionnaireemail',
            roles: ['MC Admin'],
          },
        ],
        header: 'Patient Emr Dashboard',
        location: '/patientemr',
        roles: ['MC Admin'],
      },
      {
        path: 'bookingappointment/*',
        element: <MainSchedular />,
        children: [
          {
            path: '',
            element: <BookingSchedularFunctional />,
            children: [],
            header: 'Patient Emr Dashboard',
            location: 'patientemr/sharequestionnaireemail',
            roles: ['MC Admin'],
          },
        ],
        header: 'Manage Appointments',
        location: '/bookingappointment',
        roles: ['Recessepnoist'],
      },
      {
        path: 'receptionist/*',
        element: <Receptionist />,
        children: [],
        header: 'Receptionist',
        location: '/receptionist',
        roles: ['Receptionist'],
      },

      // receptionist invoice
      {
        path: 'invoice/*',
        element: <InvoiceLayout />,
        children: [
          {
            path: '',
            element: <InvoiceLayout />,
            children: [],
            header: 'Invoice',
            location: '/invoice/information',
            roles: ['Super Admin'],
          },
          {
            path: 'information',
            element: <InvoiceInformation />,
            children: [],
            header: 'Invoice',
            location: '/invoice/information',
            roles: ['Super Admin'],
          },
          {
            path: 'services',
            element: <InvoiceServices />,
            children: [],
            header: 'Invoice - Services',
            location: '/invoice/services',
            roles: ['Super Admin'],
          },
          {
            path: 'payment',
            element: <InvoicePayment />,
            children: [],
            header: 'Invoice - Payment',
            location: '/invoice/payment',
            roles: ['Super Admin'],
          },
        ],
        header: 'Invoice',
        location: '/invoice',
        roles: ['Super Admin'],
      },

      // lab, radiology routes
      {
        path: 'job/*',
        element: <JobLayout />,
        children: [
          {
            path: '',
            element: <JobLayout />,
            children: [],
            header: 'Job',
            location: '/job/createjobs',
            roles: ['Super Admin'],
          },
          {
            path: 'createjobs',
            element: <CreateJobs />,
            children: [],
            header: 'Job',
            location: '/job/createjobs',
            roles: ['Super Admin'],
          },
          {
            path: 'viewJobs',
            element: <ViewJobs />,
            children: [],
            header: 'Lab Request',
            location: '/job/viewJobs',
            roles: ['Super Admin'],
          },
        ],
        header: 'Job',
        location: '/job',
        roles: ['Super Admin'],
      },
      {
        path: 'labrequest/*',
        element: <LabRequestLayout />,
        children: [
          {
            path: '',
            element: <LabRequest />,
            children: [],
            header: 'Lab Request',
            location: '/labrequest',
            roles: ['Super Admin'],
          },
        ],
        header: 'Lab Request',
        location: '/labrequest',
        roles: ['Super Admin'],
      },
      // {
      //   path: 'invoice/*',
      //   element: <InvoiceLayout />,
      //   children: [
      //     {
      //       path: '',
      //       element: <Invoice />,
      //       children: [],
      //       header: 'Invoice',
      //       location: '/Invoice',
      //       roles: ['Super Admin'],
      //     },
      //   ],
      //   header: 'Invoice',
      //   location: '/invoice',
      //   roles: ['Super Admin'],
      // },

      // {
      //   path: 'configuration/*',
      //   element: <ConfigurationLayout />,
      //   children: [
      //     {
      //       path: '',
      //       element: <Configuration />,
      //       children: [],
      //       header: 'Configuration',
      //       location: '/configuration',
      //       roles: ['Super Admin'],
      //     },
      //   ],
      //   header: 'Configuration',
      //   location: '/configuration',
      //   roles: ['Super Admin'],
      // },
      {
        path: '*',
        element: <NotFound />,
        children: [],
        header: 'Page Not Found',
        roles: ['MC Admin'],
      },
      {
        path: 'notfound',
        element: <NotFound />,
        children: [],
        header: 'Page Not Found',
        roles: ['MC Admin'],
      },
      {
        path: 'notpermitted',
        element: <NotFound />,
        children: [],
        header: 'Page Not Found',
        roles: ['MC Admin'],
      },
    ],
    header: 'Home',
    roles: ['MC Admin'],
  },
]

// Doctor Routes
export const doctorRoutes: MyRoutes[] = [
  {
    path: '/',
    element: <LandingPage />,
    children: [
      {
        path: '',
        element: <Login />,
        children: [],
        header: '',
        location: '/',
      },
      {
        path: 'forgotpassword',
        element: <ForgotPassword />,
        children: [],
        header: '',
        location: '/forgotpassword',
      },
      {
        path: 'otpverfication',
        element: <OtpVerfication />,
        children: [],
        header: '',
        location: '/otpverfication',
      },
      {
        path: 'resetpassword',
        element: <RecoveryPassword />,
        children: [],
        header: '',
        location: '/resetpassword',
      },
    ],
    header: '',
    location: '/',
  },
  {
    path: 'submitquestionnairelayout',
    element: <SubmitQuestionnaireLayout />,
    children: [
      {
        path: '',
        element: <SubmitQuestionnaireForm />,
        children: [],
        header: '',
        location: '/submitquestionnairelayout',
      },
      {
        path: 'questionnairesubmit',
        element: <QuestionnaireSubmit />,
        children: [],
        header: '',
        location: '/submitquestionnairelayout/questionnairesubmit',
      },
    ],
    header: '',
    location: '/submitquestionnairelayout',
  },
  {
    path: 'submitotp',
    element: <SubmitOtp />,
    children: [],
    header: '',
    location: '/submitotp',
  },
  {
    path: '/*',
    element: (
      <AuthWrapper>
        <MainLayout />
      </AuthWrapper>
    ),
    children: [
      {
        path: 'doctor/*',
        element: <DoctorAppointmentDashboard />,
        children: [],
        header: 'Doctor',
        location: '/doctor',
        roles: ['DOCTOR'],
      },
      {
        path: 'patientdiagnosis/*',
        element: <DoctorDiagnosisLayout />,
        children: [
          {
            path: 'diagnosis',
            element: <DiagnosisForm />,
            children: [],
            header: 'Diagnosis',
            location: '/diagnosis',
            roles: ['DOCTOR'],
          },
          {
            path: 'medication',
            element: <Medication />,
            children: [],
            header: 'Doctor Diagnosis',
            location: '/diagnosis/medication',
            roles: ['DOCTOR'],
          },
          {
            path: 'request',
            element: <Request />,
            children: [],
            header: 'Request',
            location: '/request',
            roles: ['DOCTOR'],
          },
          {
            path: 'referral',
            element: <Referral />,
            children: [],
            header: 'Doctor',
            location: '/referral',
            roles: ['DOCTOR'],
          },
          {
            path: 'request',
            element: <Request />,
            children: [],
            header: 'Doctor Diagnosis',
            location: '/request',
            roles: ['DOCTOR'],
          },
          {
            path: 'referral',
            element: <Referral />,
            children: [],
            header: 'Doctor',
            location: '/referral',
            roles: ['DOCTOR'],
          },
          {
            path: 'treatment',
            element: <TreatmentPlanList />,
            children: [],
            header: 'Treatment',
            location: '/treatment',
            roles: ['DOCTOR'],
          },
          {
            path: 'invoices',
            element: <Invoice />,
            children: [],
            header: 'Doctor',
            location: '/invoices',
            roles: ['DOCTOR'],
          },
        ],
        header: 'Doctor Diagnosis',
        location: '/diagnosis',
        roles: ['DOCTOR'],
      },
      {
        path: 'formBuilder/*',
        element: <CreateNewFormsLayout />,
        children: [
          {
            path: '',
            element: <CreateNewFormList />,
            children: [],
            header: 'Create New Forms',
            location: '',
            roles: ['DOCTOR'],
          },
          {
            path: 'createNewFormBuilder',
            element: <CreateNewFormBuilder />,
            children: [],
            header: ' Create New Form Builder',
            location: '/createNewFormBuilder',
            roles: ['DOCTOR'],
          },
          {
            path: '*',
            element: <NotFound />,
            children: [],
            header: 'Page Not Found',
            roles: ['DOCTOR'],
          },
        ],
        header: ' Create New Forms',
        location: '/formBuilder',
        roles: ['DOCTOR'],
      },
      {
        path: 'ipd/*',
        element: <CoomingSoon />,
        children: [],
        header: 'IPD',
        location: '/ipd',
        roles: ['DOCTOR'],
      },
      {
        path: 'patientemr/*',
        element: <PatientEmrLayout />,
        children: [
          {
            path: '',
            element: <PatientEmrDashboard />,
            children: [],
            header: 'Patient EMR Dashboard',
            location: '/patientemr',
            roles: ['MC Admin'],
          },
          {
            path: 'sharequestionnaireemail',
            element: <ShareQuestionEmail />,
            children: [],
            header: 'Patient Emr Dashboard',
            location: 'patientemr/sharequestionnaireemail',
            roles: ['MC Admin'],
          },
        ],
        header: 'Patient Emr Dashboard',
        location: '/patientemr',
        roles: ['MC Admin'],
      },
      {
        path: 'receptionist/*',
        element: <Receptionist />,
        children: [],
        header: 'Receptionist',
        location: '/receptionist',
        roles: ['Receptionist'],
      },
      // {
      //   path: "mobileappointmentrequest/*",
      //   element: <MobileAppointmentRequest />,
      //   children: [],
      //   header: "Mobile Appointment Request",
      //   location: "/mobileappointmentrequest",
      //   roles: ["MC Admin"],
      // },
      {
        path: 'pharmacy/*',
        element: <PharmacyLayout />,
        children: [
          {
            path: 'pharmacy-info',
            element: <PharmacyInfoForm />,
            children: [],
            header: 'pos',
            location: '/pharmacy/pharmacy-info',
            roles: ['Pharmacy Salesperson'],
          },
        ],
        header: 'pos',
        location: '/pharmacy',
        roles: ['Pharmacy Salesperson'],
      },
    ],
    header: 'Home',
    roles: ['MC Admin'],
  },
]

export const inventoryRoutesData: MyRoutes[] = [
  {
    path: "/",
    element: <LandingPage />,
    children: [
      {
        path: "",
        element: <Login />,
        children: [],
        header: "",
        location: "/",
      },
      {
        path: "forgotpassword",
        element: <ForgotPassword />,
        children: [],
        header: "",
        location: "/forgotpassword",
      },
      {
        path: "otpverfication",
        element: <OtpVerfication />,
        children: [],
        header: "",
        location: "/otpverfication",
      },
      {
        path: "resetpassword",
        element: <RecoveryPassword />,
        children: [],
        header: "",
        location: "/resetpassword",
      },
    ],
    header: "",
    location: "/",
  },
  {
    path: "/*",
    element: (
      <AuthWrapper>
        <MainLayout />
      </AuthWrapper>
    ),
    // children: [
    //   {
    //     path: 'job/*',
    //     element: <JobLayout />,
    //     children: [
    //       {
    //         path: '',
    //         element: <JobLayout />,
    //         children: [],
    //         header: 'Job',
    //         location: '/job/createjobs',
    //         roles: ['Super Admin'],
    //       },
    //       {
    //         path: 'createjobs',
    //         element: <CreateJobs />,
    //         children: [],
    //         header: 'Job',
    //         location: '/job/createjobs',
    //         roles: ['Super Admin'],
    //       },
    //       {
    //         path: 'viewJobs',
    //         element: <ViewJobs />,
    //         children: [],
    //         header: 'View Job',
    //         location: '/job/viewJobs',
    //         roles: ['Super Admin'],
    //       },
          
    //     ],
    //     header: 'Job',
    //     location: '/job',
    //     roles: ['Super Admin'],
    //   },
    //   {
    //     path: 'labrequest/*',
    //     element: <LabRequestLayout />,
    //     children: [
    //       {
    //         path: '',
    //         element: <LabRequest />,
    //         children: [],
    //         header: 'Lab Request',
    //         location: '/labrequest',
    //         roles: ['Super Admin'],
    //       },
    //     ],
    //     header: 'Lab Request',
    //     location: '/labrequest',
    //     roles: ['Super Admin'],
    //   },
    //   {
    //     path: 'invoice/*',
    //     element: <InvoiceLayout />,
    //     children: [
    //       {
    //         path: '',
    //         element: <Invoice />,
    //         children: [],
    //         header: 'Invoice',
    //         location: '/Invoice',
    //         roles: ['Super Admin'],
    //       },
    //     ],
    //     header: 'Invoice',
    //     location: '/invoice',
    //     roles: ['Super Admin'],
    //   },

    //   {
    //     path: 'configuration/*',
    //     element: <ConfigurationLayout />,
    //     children: [
    //       {
    //         path: '',
    //         element: <Configuration />,
    //         children: [],
    //         header: 'Configuration',
    //         location: '/configuration',
    //         roles: ['Super Admin'],
    //       },
         
    //     ],
    //     header: 'Configuration',
    //     location: '/configuration',
    //     roles: ['Super Admin'],
    //   },
    // ],

    children: [
      {
        path: 'request/*',
        element: <RequestLayout />,
        children: [
          {
            path: '',
            element: <Request />,
            children: [],
            header: 'Request',
            location: '/request',
            roles: ['Super Admin'],
          },
        
        
          
        ],
        header: 'request',
        location: '/request',
        roles: ['Super Admin'],
      },
      {
        path: 'branchstore/*',
        element: <BranchStoreLayout />,
        children: [
          {
            path: '',
            element: <BranchStore />,
            children: [],
            header: 'Branch Store',
            location: '/branchstore',
            roles: ['Super Admin'],
          },
        ],
        header: 'Lab Request',
        location: '/labrequest',
        roles: ['Super Admin'],
      },
      {
        path: 'mainstore/*',
        element: <MainStoreLayout />,
        children: [
          {
            path: '',
            element: <MainStore />,
            children: [],
            header: 'Main Store',
            location: '/mainstore',
            roles: ['Super Admin'],
          },
        ],
        header: 'Mainstore',
        location: '/mainstore',
        roles: ['Super Admin'],
      },

      // {
      //   path: 'purchaseinvoice/*',
      //   element: <PurchaseInvoiceLayout />,
      //   children: [
      //     {
      //       path: '',
      //       element: <PurchaseInvoiceLayout />,
      //       children: [],
      //       header: 'Purchase Invoice',
      //       location: '/purchaseinvoice',
      //       roles: ['Super Admin'],
      //     },
         
      //   ],
      //   header: 'Purchase Invoice',
      //   location: '/purchaseinvoice',
      //   roles: ['Super Admin'],
      // },
    ],
    header: 'Home',
    roles: ['INVENTORY_MANAGEMENT'],
  },
];

export const publicRoutes: MyRoutes[] = [
  {
    path: '/',
    element: <LandingPage />,
    children: [
      {
        path: '',
        element: <Login />,
        children: [],
        header: '',
        location: '/',
      },
      {
        path: 'forgotpassword',
        element: <ForgotPassword />,
        children: [],
        header: '',
        location: '/forgotpassword',
      },
      {
        path: 'otpverfication',
        element: <OtpVerfication />,
        children: [],
        header: '',
        location: '/otpverfication',
      },
      {
        path: 'resetpassword',
        element: <RecoveryPassword />,
        children: [],
        header: '',
        location: '/resetpassword',
      },
    ],
    header: '',
    location: '/',
  },
  {
    path: 'submitquestionnairelayout',
    element: <SubmitQuestionnaireLayout />,
    children: [
      {
        path: '',
        element: <SubmitQuestionnaireForm />,
        children: [],
        header: '',
        location: '/submitquestionnairelayout',
      },
      {
        path: 'questionnairesubmit',
        element: <QuestionnaireSubmit />,
        children: [],
        header: '',
        location: '/submitquestionnairelayout/questionnairesubmit',
      },
    ],
    header: '',
    location: '/submitquestionnairelayout',
  },


  
  {
    path: 'submitotp',
    element: <SubmitOtp />,
    children: [],
    header: '',
    location: '/submitotp',
  },
  {
    path: 'notfound',
    element: <NotFound />,
    children: [],
    header: '',
    location: '/submnotfounditotp',
  },
  {
    path: '*',
    element: <NotFound />,
    children: [],
    header: '',
    location: '/submnotfounditotp',
  },
]

export const routes: MyRoutes[] = [
  {
    path: '/',
    element: <LandingPage />,
    children: [
      {
        path: '',
        element: <Login />,
        children: [],
        header: '',
        location: '/',
      },
      {
        path: 'forgotpassword',
        element: <ForgotPassword />,
        children: [],
        header: '',
        location: '/forgotpassword',
      },
      {
        path: 'otpverfication',
        element: <OtpVerfication />,
        children: [],
        header: '',
        location: '/otpverfication',
      },
      {
        path: 'resetpassword',
        element: <RecoveryPassword />,
        children: [],
        header: '',
        location: '/resetpassword',
      },
    ],
    header: '',
    location: '/',
  },
  {
    path: 'submitquestionnairelayout',
    element: <SubmitQuestionnaireLayout />,
    children: [
      {
        path: '',
        element: <SubmitQuestionnaireForm />,
        children: [],
        header: '',
        location: '/submitquestionnairelayout',
      },
      {
        path: 'questionnairesubmit',
        element: <QuestionnaireSubmit />,
        children: [],
        header: '',
        location: '/submitquestionnairelayout/questionnairesubmit',
      },
    ],
    header: '',
    location: '/submitquestionnairelayout',
  },
  {
    path: 'submitotp',
    element: <SubmitOtp />,
    children: [],
    header: '',
    location: '/submitotp',
  },
  {
    path: '/*',
    element: (
      // <MainLayout />
      <AuthWrapper>
        <MainLayout />
      </AuthWrapper>
    ),
    children: [
      {
        path: 'mobileappconfiguration/*',
        element: <MobileAppConfigLayout />,
        children: [
          // {
          //   path: '',
          //   element: <MobileAppConfigLayout />,
          //   children: [],
          //   header: 'Mobile App Configurations',
          //   location: '/mobileappconfiguration',
          //   roles: ['Super Admin'],
          // },
          {
            path: 'appointment',
            element: <MobileAppAppointment />,
            children: [],
            header: 'Mobile App Configurations',
            location: '/mobileappconfiguration/appointment',
            roles: ['MC Admin'],
          },
          {
            path: 'news',
            element: <MobileAppNews />,
            children: [],
            header: 'Mobile App Configurations',
            location: '/mobileappconfiguration/news',
            roles: ['MC Admin'],
          },
        ],
        header: 'Mobile App Configurations',
        location: '/mobileappconfiguration',
        roles: ['MC Admin'],
      },
      {
        path: 'manageusers/*',
        element: <ManageUsersLayout />,
        children: [
          {
            path: '',
            element: <ManageUsers />,
            children: [],
            header: 'Manage Staff',
            location: '/manageusers',
            roles: ['MC Admin'],
          },
          {
            path: 'createusers/*',
            element: <CreateUsers />,
            children: [
              {
                path: 'primary',
                element: <CreateUserPrimary />,
                children: [],
                header: 'Manage Staff',
                location: '/manageusers/createusers/primary',
                roles: ['Super Admin'],
              },
              {
                path: 'secondary',
                element: <CreateUserSecondary />,
                children: [],
                header: 'Manage Staff',
                location: '/manageusers/createusers/secondary',
                roles: ['Super Admin'],
              },
            ],
            header: 'Add Medical Center Users',
            location: '/manageusers/createusers',
            roles: ['Super Admin'],
          },
        ],
        header: 'Manage Staff',
        location: '/manageusers',
        roles: ['MC Admin'],
      },
      {
        path: 'mastertablemanage/*',
        element: <MasterTableManagementLayout />,
        children: [
          {
            path: '',
            element: <MasterTableManagementLayout />,
            children: [],
            header: 'Manage Master Tables - Manage Category',
            location: '/mastertablemanage',
            roles: ['MC Admin'],
          },
          {
            path: 'managecategory',
            element: <MasterTableCategory />,
            children: [],
            header: 'Manage Master Tables - Manage Category',
            location: '/managecategory',
            roles: ['MC Admin'],
          },
          {
            path: 'managecategoryvalue',
            element: <MasterTableCategoryValue />,
            children: [],
            header: 'Manage Master Tables - Manage Category Value',
            location: '/managecategoryvalue',
            roles: ['MC Admin'],
          },
        ],
        header: 'Manage Master Tables',
        location: '/mastertablemanage/managecategory',
        roles: ['MC Admin'],
      },
      {
        path: 'usergroups/*',
        element: <ManageUserGroupsLayout />,
        children: [
          {
            path: '',
            element: <UserGroupList />,
            children: [],
            header: 'Manage Usergroups',
            location: '/usergroups',
            roles: ['MC Admin'],
          },
          {
            path: 'manageusergroups/*',
            element: <ManageUserGroup />,
            children: [
              {
                path: 'primary',
                element: <PrimaryUserGroup />,
                children: [],
                header: 'Manage Usergroup',
                location: '/manageusergroups/usergroups',
                roles: ['MC Admin'],
              },
              {
                path: 'secondary',
                element: <SecondaryUsergroup />,
                children: [],
                header: 'Manage Usergroup',
                location: '/manageusergroups/usergroups/secondary',
                roles: ['MC Admin'],
              },
            ],
            header: 'Manage Usergroup',
            location: '/usergroups/manageusergroups',
            roles: ['MC Admin'],
          },
        ],
        header: 'Manage Usergroups',
        location: '/usergroup',
        roles: ['MC Admin'],
      },
      {
        path: 'medicalcenter/*',
        element: <DashboardLayout />,
        children: [
          {
            path: 'branch',
            element: <MedicalCenterBranch />,
            children: [
              {
                path: '',
                element: <BranchList />,
                children: [],
                header: 'Manage Medical Center Setup',
                location: '/medicalcenter/branch',
                roles: ['Medical Center Admin'],
              },
              {
                path: 'managebranch',
                element: <ManageBranch />,
                children: [],
                header: 'Manage Medical Center Setup',
                location: '/medicalcenter/branch/managebranch',
                roles: ['Medical Center Admin'],
              },
            ],
            header: 'Manage Medical Center Setup',
            location: '/medicalcenter/branch',
            roles: ['Medical Center Admin'],
          },
          {
            path: 'department',
            element: <MedicalCenterDepartment />,
            children: [
              {
                path: '',
                element: <DepartmentList />,
                children: [],
                header: 'Manage Medical Center Setup',
                location: '/medicalcenter/department',
                roles: ['Medical Center Admin'],
              },
              {
                path: 'managedepartment',
                element: <ManageDepartment />,
                children: [],
                header: 'Manage Medical Center Setup',
                location: '/medicalcenter/department/managedepartment',
                roles: ['Medical Center Admin'],
              },
              {
                path: 'managespecialities',
                element: <ManageSpecialities />,
                children: [],
                header: 'Manage Medical Center Setup',
                location: '/medicalcenter/department/managespecialities',
                roles: ['Medical Center Admin'],
              },
            ],
            header: 'Manage Medical Center Setup',
            location: '/medicalcenter/department',
            roles: ['Medical Center Admin'],
          },
        ],
        header: 'Medical Center - Branch Setup',
        location: '/medicalcenter/branch',
        roles: ['Super Admin'],
      },
      {
        path: '*',
        element: <NotFound />,
        children: [],
        header: 'Page Not Found',
        roles: ['MC Admin'],
      },
      {
        path: 'notfound',
        element: <NotFound />,
        children: [],
        header: 'Page Not Found',
        roles: ['MC Admin'],
      },
      {
        path: 'notpermitted',
        element: <NotFound />,
        children: [],
        header: 'Page Not Found',
        roles: ['MC Admin'],
      },

      // patientEMR
      {
        path: 'patientemr/*',
        element: <PatientEmrLayout />,
        children: [
          {
            path: '',
            element: <PatientEmrDashboard />,
            children: [],
            header: 'Patient EMR Dashboard',
            location: '/patientemr',
            roles: ['MC Admin'],
          },
          {
            path: 'sharequestionnaireemail',
            element: <ShareQuestionEmail />,
            children: [],
            header: 'Patient Emr Dashboard',
            location: 'patientemr/sharequestionnaireemail',
            roles: ['MC Admin'],
          },
        ],
        header: 'Patient Emr Dashboard',
        location: '/patientemr',
        roles: ['MC Admin'],
      },
      {
        path: 'bookingappointment/*',
        element: <MainSchedular />,
        children: [
          {
            path: '',
            element: <BookingSchedularFunctional />,
            children: [],
            header: 'Patient Emr Dashboard',
            location: 'patientemr/sharequestionnaireemail',
            roles: ['MC Admin'],
          },
        ],
        header: 'Manage Appointments',
        location: '/bookingappointment',
        roles: ['Recessepnoist'],
      },
      // {
      //   path: "patientactivitylog/*",
      //   element: <PatientActivityLog />,
      //   children: [],
      //   header: "Patient Activity Log",
      //   location: "/patientactivitylog",
      //   roles: ["MC Admin"],
      // },

      {
        path: 'modules/*',
        element: <AdminModuleScreens />,
        children: [
          // {
          //   path: "",
          //   element: <ManageUsers />,
          //   children: [],
          //   header: "Manage Staff",
          //   location: "/manageusers",
          //   roles: ["MC Admin"],
          // },
          // {
          //   path: "modules/*",
          //   element: <AdminModuleScreens />,
          //   children: [
          //     // {
          //     //   path: "primary",
          //     //   element: <CreateUserPrimary />,
          //     //   children: [],
          //     //   header: "Manage Staff",
          //     //   location: "/manageusers/createusers/primary",
          //     //   roles: ["Super Admin"],
          //     // },
          //     // {
          //     //   path: "secondary",
          //     //   element: <CreateUserSecondary />,
          //     //   children: [],
          //     //   header: "Manage Staff",
          //     //   location: "/manageusers/createusers/secondary",
          //     //   roles: ["Super Admin"],
          //     // },
          //   ],
          //   header: "Modules",
          //   location: "/modules",
          //   roles: ["Super Admin"],
          // },
        ],
        header: 'Modules',
        location: '/modules',
        roles: ['MC Admin'],
      },
      {
        path: 'patientactivitylog/*',
        element: <PatientActivityLog />,
        children: [],
        header: 'Patient Activity Log',
        location: '/patientactivitylog',
        roles: ['MC Admin'],
      },
      {
        path: 'receptionist/*',
        element: <Receptionist />,
        children: [],
        header: 'Receptionist',
        location: '/receptionist',
        roles: ['Receptionist'],
      },
      {
        path: 'mobileappointmentrequest/*',
        element: <MobileAppointmentRequest />,
        children: [],
        header: 'Mobile Appointment Request',
        location: '/mobileappointmentrequest',
        roles: ['MC Admin'],
      },
    ],
    header: 'Home',
    roles: ['MC Admin'],
  },
]

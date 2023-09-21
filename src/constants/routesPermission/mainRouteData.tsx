import { MyRoutes } from '../../components/app/routes/routeData'
import LandingPage from '../../components/common/landing-page/LandingPage'
import Login from '../../pages/login/Login'
import ForgotPassword from '../../pages/login/forgot-password/ForgotPassword'
import OtpVerfication from '../../pages/login/otp-verfication/OtpVerfication'
import RecoveryPassword from '../../pages/login/recovery-password/RecoveryPassword'
import SubmitQuestionnaireLayout from '../../pages/submit-questionnaire/submit-questionnaire-layout/SubmitQuestionnaireLayout'
import SubmitQuestionnaireForm from '../../pages/submit-questionnaire/submit-questionnaire-form/SubmitQuestionnaireForm'
import QuestionnaireSubmit from '../../pages/submit-questionnaire/questionnaire-submit/QuestionnaireSubmit'
import SubmitOtp from '../../pages/submit-otp/SubmitOtp'
import AuthWrapper from '../../components/app/routes/AuthWrapper'
import MainLayout from '../../pages/main-layout/MainLayout'
import MobileAppConfigLayout from '../../pages/mobileapp-configuraion/MobileAppConfigLayout'
import MobileAppAppointment from '../../pages/mobileapp-configuraion/mobile-app-appointment/MobileAppAppointment'
import MobileAppNews from '../../pages/mobileapp-configuraion/mobile-app-news/MobileAppNews'
import ManageUsersLayout from '../../pages/manage-users/ManageUsersLayout'
import ManageUsers from '../../pages/manage-users/manage-user-grid/ManageUsers'
import CreateUsers from '../../pages/manage-users/create-user/CreateUsers'
import CreateUserPrimary from '../../pages/manage-users/create-user/create-user-primary/CreateUserPrimary'
import CreateUserSecondary from '../../pages/manage-users/create-user/create-user-secondary/CreateUserSecondary'
import MasterTableManagementLayout from '../../pages/master-table-management/MasterTableManagementLayout'
import MasterTableCategory from '../../pages/master-table-management/master-table-category/MasterTableCategory'
import MasterTableCategoryValue from '../../pages/master-table-management/master-table-category-value/MasterTableCategoryValue'
import ManageUserGroupsLayout from '../../pages/manage-usergroups/ManageUserGroupsLayout'
import UserGroupList from '../../pages/manage-usergroups/usergrouplist/UserGroupList'
import ManageUserGroup from '../../pages/manage-usergroups/usergrouplist/manage-usergroup/ManageUsergroup'
import PrimaryUserGroup from '../../pages/manage-usergroups/usergrouplist/manage-usergroup/primary/PrimaryUsergroup'
import SecondaryUsergroup from '../../pages/manage-usergroups/usergrouplist/manage-usergroup/secondary/SecondaryUsergroup'
import DashboardLayout from '../../pages/dashboard/DashboardLayout'
import MedicalCenterBranch from '../../pages/dashboard/branch/MedicalCenterBranch'
import BranchList from '../../pages/dashboard/branch/branch-list/BranchList'
import ManageBranch from '../../pages/dashboard/branch/manage-branch/ManageBranch'
import MedicalCenterDepartment from '../../pages/dashboard/department/MedicalCenterDepartment'
import DepartmentList from '../../pages/dashboard/department/department-list/DepartmentList'
import ManageDepartment from '../../pages/dashboard/department/manage-department/ManageDepartment'
import ManageSpecialities from '../../pages/dashboard/department/manage-specialities/ManageSpecialities'
import NotFound from '../../components/common/not-found/NotFound'
import PatientEmrLayout from '../../pages/patient-emr/PatientEmrLayout'
import PatientEmrDashboard from '../../pages/patient-emr/patient-emr-dashboard/PatientEmrDashboard'
import ShareQuestionEmail from '../../pages/patient-emr/share-question-email/ShareQuestionEmail'
import MainSchedular from '../../pages/appointment/SchedularMainLayout'
import BookingSchedularFunctional from '../../pages/appointment/BookingFunctional'
import Receptionist from '../../pages/receptionist/Receptionist'
import InvoiceLayout from '../../pages/invoice/InvoiceLayout'
import InvoiceInformation from '../../pages/invoice/invoice-information/InvoiceInformation'
import InvoiceServices from '../../pages/invoice/invoice-services/InvoiceServices'
import InvoicePayment from '../../pages/invoice/invoice-payment/InvoicePayment'
import ReceiptLayout from '../../pages/receipt/ReceiptLayout'
import Receipt from '../../pages/receipt/receipt-landing-page/Receipt'
import CreateNewFormsLayout from '../../pages/create-new-forms/CreateNewFormsLayout'
import CreateNewFormList from '../../pages/create-new-forms/create-new-form-list/CreateNewFormList'
import CreateNewFormBuilder from '../../pages/create-new-forms/create-new-form-builder/CreateNewFormBuilder'
import Invoice from '../../pages/doctor-diagnosis/invoice/Invoice'
import TreatmentPlanList from '../../pages/doctor-diagnosis/treatment/treatment-plan-list/TreatmentPlanList'
import Referral from '../../pages/doctor-diagnosis/referal/Referral'
import Request from '../../pages/doctor-diagnosis/request/Request'
import Medication from '../../pages/doctor-diagnosis/medication/Medication'
import DiagnosisForm from '../../pages/doctor-diagnosis/diagnosis/diagnosis-form/DiagnosisForm'
import DoctorDiagnosisLayout from '../../pages/doctor-diagnosis/DoctorDiagnosisLayout'
import DoctorAppointmentDashboard from '../../pages/doctor-dashboard/doctor-appointments/DoctorAppointmentDashboard'
import LabRequestLayout from '../../pages/lab-request/LabRequestLayout'
import LabRequest from '../../pages/lab-request/labRequest/LabRequest'
import LabInvoiceLayout from '../../pages/lab-invoice/LabInvoiceLayout'
import LabInformation from '../../pages/lab-invoice/lab-information/LabInformation'
import LabServices from '../../pages/lab-invoice/lab-services/LabServices'
import Configuration from '../../pages/configuration/Configuration'
import JobLayout from '../../pages/job/JobLayout'
import CreateJobs from '../../pages/job/create-jobs/CreateJobs'
import ViewJobs from '../../pages/job/view-jobs/ViewJobs'
import RadiologyJobLayout from '../../pages/radiology-jobs/JobLayout'
import RadioLogyRequestLayout from '../../pages/radiology-request/RadioLogyRequestLayout'
import RadiologyInvoiceLayout from '../../pages/radiology-invoice/RadiologyInvoiceLayout'
import RadiologyConfiguration from '../../pages/radiology-configuration/RadiologyConfiguration'
import RadiologyInvoicePayment from '../../pages/radiology-invoice/radiology-invoice-payment/RadiologyInvoicePayment'
import RadiologyInvoiceService from '../../pages/radiology-invoice/radiology-invoice-service/RadiologyInvoiceService'
import RadiologyInvoiceInformation from '../../pages/radiology-invoice/radiology-invoice-information/RadiologyInvoiceInformation'
import RadiologyRequest from '../../pages/radiology-request/radioLogyRequest/RadioLogyRequest'
import RadiologyCreateJobs from '../../pages/radiology-jobs/create-jobs/CreateJobs'
import RadiologyViewJobs from '../../pages/radiology-jobs/view-jobs/ViewJobs'
import ManageMasterTableNewtLayout from '../../pages/manageMasterTable-New/ManageMasterTableNewLayout'
import InsuranceMaster from '../../pages/insurance-master/InsuranceMaster'
import OnGoingClaims from '../../pages/insurance/ongoing-claims/onGoingClaims'
import Services from '../../pages/PatientEmrServices/service-landing-page/Service'
import ManageMasterNew from '../../pages/manageMasterTable-New/manageMasterNew/ManageMasterNew'
import ManageAppoinmentStatus from '../../pages/manageMasterTable-New/manageAppoinmentStatus/ManageAppoinmentStatus'
import ManageCategoryValues from '../../pages/manageMasterTable-New/MasterCategoryValues/ManageCategoryValues'
import ManageAssignTag from '../../pages/manageMasterTable-New/manageAssignTag/ManageAssignTag'
import LabPayment from '../../pages/lab-invoice/lab-payment/LabPayment'
import RequestLayout from '../../pages/request/RequestLayout'
import BranchStoreLayout from '../../pages/branchstore/BranchStoreLayout'
import BranchStore from '../../pages/branchstore/branchstore/BranchStore'
import MainStoreLayout from '../../pages/mainstore/MainStoreLayout'
import MainStore from '../../pages/mainstore/mainstore/MainStore'
import PurchaseInvoiceLayout from '../../pages/purchase-invoice/PurchaseInvoiceLayout'
import PurchaseInvoice from '../../pages/purchase-invoice/purchase-invoice/PurchaseInvoice'
import InventoryRequest from '../../pages/request/request/Request'
import DentistAppointmentDashboard from '../../pages/dentist-dashboard/dentist-appointments/DentistAppointmentDashboard'
import DentistDiagnosisLayout from '../../pages/dentist-diagnosis/DentistDiagnosisLayout'
import Dental from '../../pages/dentist-diagnosis/dental/Dental'
import DentalDiagnosisForm from '../../pages/dentist-diagnosis/diagnosis/diagnosis-form/DiagnosisForm'
import DentalMedication from '../../pages/dentist-diagnosis/medication/Medication'
import DentalRequest from '../../pages/dentist-diagnosis/request/Request'
import DentalReferral from '../../pages/dentist-diagnosis/referal/Referral'
import DentalTreatmentPlanList from '../../pages/dentist-diagnosis/treatment/treatment-plan-list/TreatmentPlanList'
import UnitTypeMainLayout from '../../pages/unit-type-master/UnitTypeMainLayout'
import MedicalCenterWard from '../../pages/dashboard/ward/MedicalCenterWard'
import WardList from '../../pages/dashboard/ward/ward-list/WardList'
import ManageWard from '../../pages/dashboard/ward/manage-ward/ManageWard'
import ManageRoom from '../../pages/dashboard/room/manage-room/ManageRoom'
import RoomList from '../../pages/dashboard/room/room-list/RoomList'
import ManageBed from '../../pages/dashboard/bed/manage-bed/ManageBed'
import BedList from '../../pages/dashboard/bed/bed-list/BedList'
import ManageInventoryUnitType from '../../pages/manageMasterTable-New/manageInventoryUnitType/ManageInventoryUnitType'
import InventoryMasterTableLayout from '../../pages/admin-inventory-master/InventoryMasterTableLayout'
import InventoryMasterTable from '../../pages/admin-inventory-master/InventoryMasterTable'
import InventoryItemTableLayout from '../../pages/inventory-item-master/InventoryItemMasterTableLayout'
import InventoryItemTable from '../../pages/inventory-item-master/InventoryItemMasterTable'

import AddNewSuplier from '../../pages/admin-inventory-master/add-new-supplier/AddNewSuplier'
import AddNewItem from '../../pages/inventory-item-master/add-new-item/AddNewItem';

export const commonRoutes: any[] = [
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
]

export const authRoutes: any[] = [
  {
    path: '/*',
    element: (
      <AuthWrapper>
        <MainLayout />
      </AuthWrapper>
    ),
    children: [
      // mc admin routes
      {
        id: '64ec82affbe2e6b90cbe0121',
        path: 'mobileappconfiguration/*',
        element: <MobileAppConfigLayout />,
        children: [
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
        id: '64dde270bc74631d4f42cb20',
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
        id: '64ec8294fbe2e6b90cbe011f',
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
        id: '64ec8294fbe2e6b90cbe011f',
        path: 'mastertablemanagenew/*',
        element: <ManageMasterTableNewtLayout />,
        children: [
          {
            path: '',
            element: <ManageMasterTableNewtLayout />,
            children: [],
            header: 'Manage Master Tables - Manage Category',
            location: '/mastertablemanagenew',
            roles: ['MC Admin'],
          },
          {
            path: 'managemasternew',
            element: <ManageMasterNew />,
            children: [],
            header: 'Manage Master Tables  - Manage Category',
            location: '/mastertablemanagenew/managemasternew',
            roles: ['MC Admin'],
          },
          {
            path: 'manageappoinmentstatus',
            element: <ManageAppoinmentStatus />,
            children: [],
            header: 'Manage Master Tables - Appoinment Status',
            location: '/mastertablemanagenew/manageappoinmentstatus',
            roles: ['MC Admin'],
          },
          {
            path: 'managecategoryvalues',
            element: <ManageCategoryValues />,
            children: [],
            header: 'Manage Master Tables - Manage Category Value',
            location: '/mastertablemanagenew/managecategoryvalues',
            roles: ['MC Admin'],
          },
          {
            path: 'manageassigntag',
            element: <ManageAssignTag />,
            children: [],
            header: 'Manage Master Tables - Manage Assign Tag',
            location: '/mastertablemanagenew/manageassigntag',
            roles: ['MC Admin'],
          },
          {
            path: 'manageinventorytype',
            element: <ManageInventoryUnitType />,
            children: [],
            header: 'Manage Master Tables - Manage Inventory Type',
            location: '/mastertablemanagenew/manageinventorytype',
            roles: ['MC Admin'],
          },
        ],
        header: 'Manage Master Tables',
        location: '/mastertablemanage',
        roles: ['MC Admin'],
      },
      {
        id: '64dde263bc74631d4f42cb1d',
        path: 'usergroups/*',
        element: <ManageUserGroupsLayout />,
        children: [
          {
            path: '',
            element: <UserGroupList />,
            children: [],
            header: 'Manage User Roles',
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
                header: 'Manage User Roles',
                location: '/manageusergroups/usergroups',
                roles: ['MC Admin'],
              },
              {
                path: 'secondary',
                element: <SecondaryUsergroup />,
                children: [],
                header: 'Manage User Roles',
                location: '/manageusergroups/usergroups/secondary',
                roles: ['MC Admin'],
              },
            ],
            header: 'Manage User Roles',
            location: '/usergroups/manageusergroups',
            roles: ['MC Admin'],
          },
        ],
        header: 'Manage User Roles',
        location: '/usergroup',
        roles: ['MC Admin'],
      },
      {
        id: '64ec823efbe2e6b90cbe0119',
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
          {
            path: 'ward',
            element: <MedicalCenterWard />,
            children: [
              {
                path: '',
                element: <WardList />,
                children: [],
                header: 'Manage Medical Center Setup',
                location: '/medicalcenter/ward',
                roles: ['Medical Center Admin'],
              },
              {
                path: 'manageward',
                element: <ManageWard />,
                children: [],
                header: 'Manage Medical Center Setup',
                location: '/medicalcenter/ward/manageward',
                roles: ['Medical Center Admin'],
              },
            ],
            header: 'Manage Medical Center Setup',
            location: '/medicalcenter/ward',
            roles: ['Medical Center Admin'],
          },
          {
            path: 'room',
            element: <MedicalCenterWard />,
            children: [
              {
                path: '',
                element: <RoomList />,
                children: [],
                header: 'Manage Medical Center Setup',
                location: '/medicalcenter/room',
                roles: ['Medical Center Admin'],
              },
              {
                path: 'manageroom',
                element: <ManageRoom />,
                children: [],
                header: 'Manage Medical Center Setup',
                location: '/medicalcenter/room/manageroom',
                roles: ['Medical Center Admin'],
              },
            ],
            header: 'Manage Medical Center Setup',
            location: '/medicalcenter/room',
            roles: ['Medical Center Admin'],
          },
          {
            path: 'bed',
            element: <MedicalCenterWard />,
            children: [
              {
                path: '',
                element: <BedList />,
                children: [],
                header: 'Manage Medical Center Setup',
                location: '/medicalcenter/bed',
                roles: ['Medical Center Admin'],
              },
              {
                path: 'managebed',
                element: <ManageBed />,
                children: [],
                header: 'Manage Medical Center Setup',
                location: '/medicalcenter/bed/managebed',
                roles: ['Medical Center Admin'],
              },
            ],
            header: 'Manage Medical Center Setup',
            location: '/medicalcenter/bed',
            roles: ['Medical Center Admin'],
          },
        ],
        header: 'Medical Center - Branch Setup',
        location: '/medicalcenter/branch',
        roles: ['Super Admin'],
      },
      {
        id: '64ec82c3fbe2e6b90cbe0123',
        path: 'insurancemaster',
        element: <InsuranceMaster />,
        children: [],
        header: 'Insurance Masters',
        location: '/insurancemaster',
        roles: ['Medical Center Admin'],
      },
      {
        id: '64ec82ddfbe2e6b90cbe0125',
        path: 'ongoing-claims',
        element: <OnGoingClaims />,
        children: [],
        header: 'Insurance Claims',
        location: '/ongoing-claims',
        roles: ['Medical Center Admin'],
      },
      {
        id: '64ec82f7fbe2e6b90cbe0127',
        path: 'services',
        element: <Services />,
        children: [],
        header: 'Services Masters',
        location: '/services',
        roles: ['Medical Center Admin'],
      },
      {
        id: '65092ff2d6c0459b02e12aca',
        path: 'inventorymastertable/*',
        element: <InventoryMasterTableLayout />,
        children: [
          {
            path: '',
            element: <InventoryMasterTable />,
            children: [],
            header: 'Inventory Master Tables',
            location: '/inventorymastertable',
            roles: ['Medical Center Admin'],
          },
          {
            path: 'addnewsuplier',
            element: <AddNewSuplier />,
            children: [],
            header: 'Add New Supplier',
            location: '/addnewsuplier',
            roles: ['Medical Center Admin'],
          },
        ],
        header: 'Inventory Master Tables',
        location: '/inventorymastertable',
        roles: ['Medical Center Admin'],
      },
      {
        id: '650ab220fcec2f5ae2369bb7',
        path: 'inventoryitemtable/*',
        element: <InventoryItemTableLayout />,
        children: [
          {
            path: '',
            element: <InventoryItemTable />,
            children: [],
            header: 'Inventory Item Tables',
            location: '/inventoryitemtable',
            roles: ['Medical Center Admin'],
          },
          {
            path: 'addnewitem',
            element: <AddNewItem />,
            children: [],
            header: 'Add New Item',
            location: '/addnewitem',
            roles: ['Medical Center Admin'],
          }
        ],
        header: 'Inventory Item Tables',
        location: '/inventoryitemtable',
        roles: ['Medical Center Admin'],
      },
      // Unit Type Master
      {
        id: '64fea6ad2188af776a01978c',
        path: 'unitTypeMap/*',
        element: <UnitTypeMainLayout />,
        children: [],
        header: 'Unit Type Master',
        location: '/unitTypeMap',
        roles: ['Medical Center Admin'],
      },

      // receptionist routes
      {
        id: '64d603683d33b619b0974b0b',
        path: 'receptionist/*',
        element: <Receptionist />,
        children: [],
        header: 'Receptionist',
        location: '/receptionist',
        roles: ['Receptionist'],
      },
      {
        id: '64d603d595887b2e44e7dc6a',
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
        id: '64f1c2d6f9cd64565fef48bc',
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
        id: '64d603683d33b619b0974b0b',
        path: 'receptionist/*',
        element: <Receptionist />,
        children: [],
        header: 'Receptionist',
        location: '/receptionist',
        roles: ['Receptionist'],
      },
      {
        id: '64d603fa95887b2e44e7dc6c',
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
      {
        id: '64d6041c95887b2e44e7dc6e',
        path: 'receipt/*',
        element: <ReceiptLayout />,
        children: [
          {
            path: '',
            element: <Receipt />,
            children: [],
            header: 'Receipt',
            location: '/receipt',
            roles: ['Receptionist'],
          },
        ],
        header: 'Receipt',
        location: '/receipt',
        roles: ['Receptionist'],
      },
      // doctor routes
      {
        id: '64d6044495887b2e44e7dc70',
        path: 'doctor/*',
        element: <DoctorAppointmentDashboard />,
        children: [],
        header: 'Doctor',
        location: '/doctor',
        roles: ['DOCTOR'],
      },
      {
        id: '64d6044d95887b2e44e7dc72',
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
        id: '64d6045d95887b2e44e7dc74',
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
      // lab routes
      {
        id: '64ec83c8fbe2e6b90cbe012f',
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
            roles: ['LAB_SUPERVISOR'],
          },
          {
            path: 'viewJobs',
            element: <ViewJobs />,
            children: [],
            header: 'View Jobs',
            location: '/job/viewJobs',
            roles: ['Super Admin'],
          },
        ],
        header: 'Job',
        location: '/job/createjobs',
        roles: ['LAB_SUPERVISOR'],
      },
      {
        id: '64ec83e0fbe2e6b90cbe0131',
        path: 'request/*',
        element: <LabRequestLayout />,
        children: [
          {
            path: '',
            element: <LabRequest />,
            children: [],
            header: 'Lab Request',
            location: '/request',
            roles: ['LAB_SUPERVISOR'],
          },
        ],
        header: 'Lab Request',
        location: '/request',
        roles: ['LAB_SUPERVISOR'],
      },
      {
        id: '64ec83fcfbe2e6b90cbe0133',
        path: 'invoice/*',
        element: <LabInvoiceLayout />,
        children: [
          {
            path: '',
            element: <LabInvoiceLayout />,
            children: [],
            header: 'LabInvoice',
            location: '/invoice/labinformation',
            roles: ['Super Admin'],
          },
          {
            path: 'labinformation',
            element: <LabInformation />,
            children: [],
            header: 'LabInvoice',
            location: '/invoice/labinformation',
            roles: ['Super Admin'],
          },
          {
            path: 'labservices',
            element: <LabServices />,
            children: [],
            header: 'Lab Services',
            location: '/invoice/labservices',
            roles: ['Super Admin'],
          },
          {
            path: 'labpayment',
            element: <LabPayment />,
            children: [],
            header: 'Lab Payment',
            location: '/labinvoice/labpayment',
            roles: ['Super Admin'],
          },
        ],
        header: 'Lab',
        location: '/invoice',
        roles: ['Super Admin'],
      },
      {
        id: '64ec842bfbe2e6b90cbe0135',
        path: 'configuration/*',
        element: <Configuration />,
        children: [],
        header: 'Configuration',
        location: '/configuration',
        roles: ['LAB_SUPERVISOR'],
      },

      // Radiology Routes
      {
        id: '64ec844bfbe2e6b90cbe0137',
        path: 'radiology-job/*',
        element: <RadiologyJobLayout />,
        children: [
          {
            path: '',
            element: <RadiologyJobLayout />,
            children: [],
            header: 'Job',
            location: '/radiology-job/createjobs',
            roles: ['Super Admin'],
          },
          {
            path: 'createjobs',
            element: <RadiologyCreateJobs />,
            children: [],
            header: 'Job',
            location: '/radiology-job/createjobs',
            roles: ['Super Admin'],
          },
          {
            path: 'viewJobs',
            element: <RadiologyViewJobs />,
            children: [],
            header: 'View Job',
            location: '/radiology-job/viewJobs',
            roles: ['Super Admin'],
          },
        ],
        header: 'Job',
        location: '/job',
        roles: ['RADIOLOGY_SUPERVISOR'],
      },
      {
        id: '64edb9fe537f7a84f0c11fec',
        path: 'radiology-request/*',
        element: <RadioLogyRequestLayout />,
        children: [
          {
            path: '',
            element: <RadiologyRequest />,
            children: [],
            header: 'Radiology Request',
            location: '/radiology-request',
            roles: ['RADIOLOGY_SUPERVISOR'],
          },
        ],
        header: 'Radiology Request',
        location: '/radiology-request',
        roles: ['RADIOLOGY_SUPERVISOR'],
      },
      {
        id: '64ec848afbe2e6b90cbe0139',
        path: 'radiology-invoice/*',
        element: <RadiologyInvoiceLayout />,
        children: [
          {
            path: '',
            element: <RadiologyInvoiceLayout />,
            children: [],
            header: 'Invoice',
            location: '/radiology-invoice/information',
            roles: ['RADIOLOGY_SUPERVISOR'],
          },
          {
            path: 'information',
            element: <RadiologyInvoiceInformation />,
            children: [],
            header: 'Invoice',
            location: '/radiology-invoice/information',
            roles: ['RADIOLOGY_SUPERVISOR'],
          },
          {
            path: 'services',
            element: <RadiologyInvoiceService />,
            children: [],
            header: 'Invoice - Services',
            location: '/radiology-invoice/services',
            roles: ['RADIOLOGY_SUPERVISOR'],
          },
          {
            path: 'payment',
            element: <RadiologyInvoicePayment />,
            children: [],
            header: 'Invoice - Payment',
            location: '/radiology-invoice/payment',
            roles: ['RADIOLOGY_SUPERVISOR'],
          },
        ],
        header: 'Invoice',
        location: '/radiology-invoice',
        roles: ['RADIOLOGY_SUPERVISOR'],
      },
      {
        id: '64ec84dafbe2e6b90cbe013b',
        path: 'radiology-configuration/*',
        element: <RadiologyConfiguration />,
        children: [],
        header: 'Configuration',
        location: '/radiology-configuration',
        roles: ['RADIOLOGY_SUPERVISOR'],
      },

      // Inventory Routes

      {
        id: '64f72e418380cdd3a764cb74',
        path: 'request/*',
        element: <RequestLayout />,
        children: [
          {
            path: '',
            element: <InventoryRequest />,
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
        id: '64f72f0b8380cdd3a764cb78',
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
        id: '64f72fa28380cdd3a764cb7c',
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
      {
        id: '64f730008380cdd3a764cb80',
        path: 'purchaseinvoice/*',
        element: <PurchaseInvoiceLayout />,
        children: [
          {
            path: '',
            element: <PurchaseInvoice />,
            children: [],
            header: 'Purchase Invoice',
            location: '/purchaseinvoice',
            roles: ['Super Admin'],
          },
        ],
        header: 'Purchaseinvoice',
        location: '/purchaseinvoice',
        roles: ['Super Admin'],
      },

      // dentist routes

      {
        id: '64f72ac08380cdd3a764cb37',
        path: 'dentist/*',
        element: <DentistAppointmentDashboard />,
        children: [],
        header: 'Dentist',
        location: '/dentist',
        roles: ['DENTIST'],
      },
      {
        id: '64f72c068380cdd3a764cb6e',
        path: 'patientdentaldiagnosis/*',
        element: <DentistDiagnosisLayout />,
        children: [
          {
            path: 'diagnosis',
            element: <DentalDiagnosisForm />,
            children: [],
            header: 'Diagnosis',
            location: '/diagnosis',
            roles: ['DENTIST'],
          },
          {
            path: 'medication',
            element: <DentalMedication />,
            children: [],
            header: 'Dentist Diagnosis',
            location: '/diagnosis/medication',
            roles: ['DENTIST'],
          },
          {
            path: 'request',
            element: <DentalRequest />,
            children: [],
            header: 'Dentist Diagnosis',
            location: '/request',
            roles: ['DENTIST'],
          },
          {
            path: 'referral',
            element: <DentalReferral />,
            children: [],
            header: 'Dentist',
            location: '/referral',
            roles: ['DENTIST'],
          },
          {
            path: 'treatment',
            element: <DentalTreatmentPlanList />,
            children: [],
            header: 'Treatment',
            location: '/treatment',
            roles: ['DENTIST'],
          },
        ],
        header: 'Dentist Diagnosis',
        location: '/diagnosis',
        roles: ['DENTIST'],
      },

      {
        id: 'public',
        path: '*',
        element: <NotFound />,
        children: [],
        header: 'Page Not Found',
        roles: ['MC Admin'],
      },
      {
        id: 'public',
        path: 'notfound',
        element: <NotFound />,
        children: [],
        header: 'Page Not Found',
        roles: ['MC Admin'],
      },
      {
        id: 'public',
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

export const notFoundRoutes: MyRoutes[] = [
  ...commonRoutes,
  {
    path: '/*',
    element: (
      <AuthWrapper>
        <MainLayout />
      </AuthWrapper>
    ),
    children: [
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

export const mainRouteData: MyRoutes[] = [...commonRoutes, ...authRoutes]

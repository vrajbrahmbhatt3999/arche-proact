import { ReactElement } from 'react';
import MainLayout from '../../../pages/main-layout/MainLayout';
import Login from '../../../pages/login/Login';
import AuthWrapper from './AuthWrapper';
import LandingPage from '../../common/landing-page/LandingPage';
import ForgotPassword from '../../../pages/login/forgot-password/ForgotPassword';
import OtpVerfication from '../../../pages/login/otp-verfication/OtpVerfication';
import RecoveryPassword from '../../../pages/login/recovery-password/RecoveryPassword';
import NotFound from '../../common/not-found/NotFound';
import MobileAppConfigLayout from '../../../pages/mobileapp-configuraion/MobileAppConfigLayout';
import MobileAppAppointment from '../../../pages/mobileapp-configuraion/mobile-app-appointment/MobileAppAppointment';
import MobileAppNews from '../../../pages/mobileapp-configuraion/mobile-app-news/MobileAppNews';
import ManageUsersLayout from '../../../pages/manage-users/ManageUsersLayout';
import ManageUsers from '../../../pages/manage-users/manage-user-grid/ManageUsers';
import MasterTableManagementLayout from '../../../pages/master-table-management/MasterTableManagementLayout';
import ManageUserGroupsLayout from '../../../pages/manage-usergroups/ManageUserGroupsLayout';
import DashboardLayout from '../../../pages/dashboard/DashboardLayout';
import CreateUsers from '../../../pages/manage-users/create-user/CreateUsers';
import MedicalCenterDepartment from '../../../pages/dashboard/department/MedicalCenterDepartment';
import MedicalCenterBranch from '../../../pages/dashboard/branch/MedicalCenterBranch';
import BranchList from '../../../pages/dashboard/branch/branch-list/BranchList';
import CreateUserPrimary from '../../../pages/manage-users/create-user/create-user-primary/CreateUserPrimary';
import CreateUserSecondary from '../../../pages/manage-users/create-user/create-user-secondary/CreateUserSecondary';
import UserGroupList from '../../../pages/manage-usergroups/usergrouplist/UserGroupList';
import ManageBranch from '../../../pages/dashboard/branch/manage-branch/ManageBranch';
import DepartmentList from '../../../pages/dashboard/department/department-list/DepartmentList';
import ManageDepartment from '../../../pages/dashboard/department/manage-department/ManageDepartment';
import ManageSpecialities from '../../../pages/dashboard/department/manage-specialities/ManageSpecialities';
import ManageUserGroup from '../../../pages/manage-usergroups/usergrouplist/manage-usergroup/ManageUsergroup';
import MasterTableCategory from '../../../pages/master-table-management/master-table-category/MasterTableCategory';
import PrimaryUserGroup from '../../../pages/manage-usergroups/usergrouplist/manage-usergroup/primary/PrimaryUsergroup';
import SecondaryUsergroup from '../../../pages/manage-usergroups/usergrouplist/manage-usergroup/secondary/SecondaryUsergroup';
import MasterTableCategoryValue from '../../../pages/master-table-management/master-table-category-value/MasterTableCategoryValue';
import SubmitQuestionnaireLayout from '../../../pages/submit-questionnaire/submit-questionnaire-layout/SubmitQuestionnaireLayout';
import SubmitQuestionnaireForm from '../../../pages/submit-questionnaire/submit-questionnaire-form/SubmitQuestionnaireForm';
import QuestionnaireSubmit from '../../../pages/submit-questionnaire/questionnaire-submit/QuestionnaireSubmit';
import SubmitOtp from '../../../pages/submit-otp/SubmitOtp';
import AdminModuleScreens from '../../../pages/admin-module-screens/AdminModuleScreens';
import InsuranceMaster from '../../../pages/insurance-master/InsuranceMaster';
import OnGoingClaims from '../../../pages/insurance/ongoing-claims/onGoingClaims';
import ManageMasterTableNewtLayout from '../../../pages/manageMasterTable-New/ManageMasterTableNewLayout';
import ManageMasterNew from '../../../pages/manageMasterTable-New/manageMasterNew/ManageMasterNew';
import ManageAppoinmentStatus from '../../../pages/manageMasterTable-New/manageAppoinmentStatus/ManageAppoinmentStatus';
import ManageAssignTag from '../../../pages/manageMasterTable-New/manageAssignTag/ManageAssignTag';
import ManageCategoryValues from '../../../pages/manageMasterTable-New/MasterCategoryValues/ManageCategoryValues';
import Services from '../../../pages/PatientEmrServices/service-landing-page/Service';
import ManageInventoryUnitType from '../../../pages/manageMasterTable-New/manageInventoryUnitType/ManageInventoryUnitType';
import MedicalCenterWard from '../../../pages/dashboard/ward/MedicalCenterWard';
import ManageWard from '../../../pages/dashboard/ward/manage-ward/ManageWard';
import WardList from '../../../pages/dashboard/ward/ward-list/WardList';
import InventoryMasterTable from '../../../pages/admin-inventory-master/InventoryMasterTable';
import AddNewSuplier from '../../../pages/admin-inventory-master/add-new-supplier/AddNewSuplier';
import InventoryMasterTableLayout from '../../../pages/admin-inventory-master/InventoryMasterTableLayout';

export interface MyRoutes {
  path: string;
  element: ReactElement<any, any>;
  children: MyRoutes[];
  header: string;
  location?: string;
  roles?: string[];
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
        path: 'usergroups/*',
        element: <ManageUserGroupsLayout />,
        children: [
          {
            path: '',
            element: <UserGroupList />,
            children: [],
            header: 'Manage Userroles',
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
                header: 'Manage Userroles',
                location: '/manageusergroups/usergroups',
                roles: ['MC Admin'],
              },
              {
                path: 'secondary',
                element: <SecondaryUsergroup />,
                children: [],
                header: 'Manage Userroles',
                location: '/manageusergroups/usergroups/secondary',
                roles: ['MC Admin'],
              },
            ],
            header: 'Manage Userroles',
            location: '/usergroups/manageusergroups',
            roles: ['MC Admin'],
          },
        ],
        header: 'Manage Userroles',
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
                path: 'managedepartment',
                element: <ManageWard />,
                children: [],
                header: 'Manage Medical Center Setup',
                location: '/medicalcenter/department/manageward',
                roles: ['Medical Center Admin'],
              },
            ],
            header: 'Manage Medical Center Setup',
            location: '/medicalcenter/ward',
            roles: ['Medical Center Admin'],
          },
        ],
        header: 'Medical Center - Branch Setup',
        location: '/medicalcenter/branch',
        roles: ['Super Admin'],
      },
      {
        path: 'insurancemaster',
        element: <InsuranceMaster />,
        children: [],
        header: 'Insurance Masters',
        location: '/insurancemaster',
        roles: ['Medical Center Admin'],
      },
      {
        path: 'ongoing-claims',
        element: <OnGoingClaims />,
        children: [],
        header: 'Insurance Claims',
        location: '/ongoing-claims',
        roles: ['Medical Center Admin'],
      },
      {
        path: 'services',
        element: <Services />,
        children: [],
        header: 'Services Masters',
        location: '/services',
        roles: ['Medical Center Admin'],
      },

      {
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
];

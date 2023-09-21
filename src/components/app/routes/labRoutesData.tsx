import { ReactElement } from 'react'
import MainLayout from '../../../pages/main-layout/MainLayout'
import Login from '../../../pages/login/Login'
import AuthWrapper from './AuthWrapper'
import LandingPage from '../../common/landing-page/LandingPage'
import ForgotPassword from '../../../pages/login/forgot-password/ForgotPassword'
import OtpVerfication from '../../../pages/login/otp-verfication/OtpVerfication'
import RecoveryPassword from '../../../pages/login/recovery-password/RecoveryPassword'
import NotFound from '../../common/not-found/NotFound'
import JobLayout from '../../../pages/job/JobLayout'
import CreateJobs from '../../../pages/job/create-jobs/CreateJobs'
import ViewJobs from '../../../pages/job/view-jobs/ViewJobs'
import LabRequestLayout from '../../../pages/lab-request/LabRequestLayout'
import LabRequest from '../../../pages/lab-request/labRequest/LabRequest'
import Configuration from '../../../pages/configuration/Configuration'
import LabInvoiceLayout from '../../../pages/lab-invoice/LabInvoiceLayout'
import LabInformation from '../../../pages/lab-invoice/lab-information/LabInformation'
import LabServices from '../../../pages/lab-invoice/lab-services/LabServices'
import LabPayment from '../../../pages/lab-invoice/lab-payment/LabPayment'

export interface MyRoutes {
  path: string
  element: ReactElement<any, any>
  children: MyRoutes[]
  header: string
  location?: string
  roles?: string[]
}

export const labRoutes: MyRoutes[] = [
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
    path: '/*',
    element: (
      <AuthWrapper>
        <MainLayout />
      </AuthWrapper>
    ),
    children: [
      // {
      //   path: "job/*",
      //   element: <CreateJobs />,
      //   children: [],
      //   header: "Job",
      //   location: "/job",
      //   roles: ["LAB_SUPERVISOR"],
      // },
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
        path: 'configuration/*',
        element: <Configuration />,
        children: [],
        header: 'Configuration',
        location: '/configuration',
        roles: ['LAB_SUPERVISOR'],
      },



      {
        path: '*',
        element: <NotFound />,
        children: [],
        header: 'Page Not Found',
        roles: ['LAB_SUPERVISOR'],
      },
      {
        path: 'notfound',
        element: <NotFound />,
        children: [],
        header: 'Page Not Found',
        roles: ['LAB_SUPERVISOR'],
      },
      {
        path: 'notpermitted',
        element: <NotFound />,
        children: [],
        header: 'Page Not Found',
        roles: ['LAB_SUPERVISOR'],
      },
    ],
    header: 'Home',
    roles: ['LAB_SUPERVISOR'],
  },
]

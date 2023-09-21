import { ReactElement } from 'react'
import MainLayout from '../../../pages/main-layout/MainLayout'
import Login from '../../../pages/login/Login'
import AuthWrapper from './AuthWrapper'
import LandingPage from '../../common/landing-page/LandingPage'
import ForgotPassword from '../../../pages/login/forgot-password/ForgotPassword'
import OtpVerfication from '../../../pages/login/otp-verfication/OtpVerfication'
import RecoveryPassword from '../../../pages/login/recovery-password/RecoveryPassword'
import NotFound from '../../common/not-found/NotFound'
import RadioLogyRequestLayout from '../../../pages/radiology-request/RadioLogyRequestLayout'
import RadioLogyRequest from '../../../pages/radiology-request/radioLogyRequest/RadioLogyRequest'
import RadiologyJobLayout from '../../../pages/radiology-jobs/JobLayout'
import RadiologyCreateJobs from '../../../pages/radiology-jobs/create-jobs/CreateJobs'
import RadiologyInvoiceLayout from '../../../pages/radiology-invoice/RadiologyInvoiceLayout'
import RadiologyInvoiceInformation from '../../../pages/radiology-invoice/radiology-invoice-information/RadiologyInvoiceInformation'
import RadiologyInvoicePayment from '../../../pages/radiology-invoice/radiology-invoice-payment/RadiologyInvoicePayment'
import RadiologyInvoiceService from '../../../pages/radiology-invoice/radiology-invoice-service/RadiologyInvoiceService'
import RadiologyConfiguration from '../../../pages/radiology-configuration/RadiologyConfiguration'
import RadiologyViewJobs from '../../../pages/radiology-jobs/view-jobs/ViewJobs'

export interface MyRoutes {
  path: string
  element: ReactElement<any, any>
  children: MyRoutes[]
  header: string
  location?: string
  roles?: string[]
}

export const radiologyRoutes: MyRoutes[] = [
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
      {
        path: 'job/*',
        element: <RadiologyJobLayout />,
        children: [
          {
            path: '',
            element: <RadiologyJobLayout />,
            children: [],
            header: 'Job',
            location: '/job/createjobs',
            roles: ['Super Admin'],
          },
          {
            path: 'createjobs',
            element: <RadiologyCreateJobs />,
            children: [],
            header: 'Job',
            location: '/job/createjobs',
            roles: ['Super Admin'],
          },
          {
            path: 'viewJobs',
            element: <RadiologyViewJobs />,
            children: [],
            header: 'View Job',
            location: '/job/viewJobs',
            roles: ['Super Admin'],
          },
        ],
        header: 'Job',
        location: '/job',
        roles: ['RADIOLOGY_SUPERVISOR'],
      },
      {
        path: 'request/*',
        element: <RadioLogyRequestLayout />,
        children: [
          {
            path: '',
            element: <RadioLogyRequest />,
            children: [],
            header: 'Radiology Request',
            location: '/request',
            roles: ['RADIOLOGY_SUPERVISOR'],
          },
        ],
        header: 'Radiology Request',
        location: '/request',
        roles: ['RADIOLOGY_SUPERVISOR'],
      },

      {
        path: 'invoice/*',
        element: <RadiologyInvoiceLayout />,
        children: [
          {
            path: '',
            element: <RadiologyInvoiceLayout />,
            children: [],
            header: 'Invoice',
            location: '/invoice/information',
            roles: ['RADIOLOGY_SUPERVISOR'],
          },
          {
            path: 'information',
            element: <RadiologyInvoiceInformation />,
            children: [],
            header: 'Invoice',
            location: '/invoice/information',
            roles: ['RADIOLOGY_SUPERVISOR'],
          },
          {
            path: 'services',
            element: <RadiologyInvoiceService />,
            children: [],
            header: 'Invoice - Services',
            location: '/invoice/services',
            roles: ['RADIOLOGY_SUPERVISOR'],
          },
          {
            path: 'payment',
            element: <RadiologyInvoicePayment />,
            children: [],
            header: 'Invoice - Payment',
            location: '/invoice/payment',
            roles: ['RADIOLOGY_SUPERVISOR'],
          },
        ],
        header: 'Invoice',
        location: '/invoice',
        roles: ['RADIOLOGY_SUPERVISOR'],
      },
      {
        path: 'radiology-configuration/*',
        element: <RadiologyConfiguration />,
        children: [],
        header: 'Configuration',
        location: '/radiology-configuration',
        roles: ['RADIOLOGY_SUPERVISOR'],
      },
      {
        path: '*',
        element: <NotFound />,
        children: [],
        header: 'Page Not Found',
        roles: ['RADIOLOGY_SUPERVISOR'],
      },
      {
        path: 'notfound',
        element: <NotFound />,
        children: [],
        header: 'Page Not Found',
        roles: ['RADIOLOGY_SUPERVISOR'],
      },
      {
        path: 'notpermitted',
        element: <NotFound />,
        children: [],
        header: 'Page Not Found',
        roles: ['RADIOLOGY_SUPERVISOR'],
      },
    ],
    header: 'Home',
    roles: ['RADIOLOGY_SUPERVISOR'],
  },
]

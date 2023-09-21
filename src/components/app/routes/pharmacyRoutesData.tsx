import { ReactElement } from 'react'
import MainLayout from '../../../pages/main-layout/MainLayout'
import Login from '../../../pages/login/Login'
import AuthWrapper from './AuthWrapper'
import LandingPage from '../../common/landing-page/LandingPage'
import ForgotPassword from '../../../pages/login/forgot-password/ForgotPassword'
import OtpVerfication from '../../../pages/login/otp-verfication/OtpVerfication'
import RecoveryPassword from '../../../pages/login/recovery-password/RecoveryPassword'
import NotFound from '../../common/not-found/NotFound'
import PharmacyLayout from '../../../pages/pharmacy/PharmacyLayout'
import PharmacyInfoForm from '../../../pages/pharmacy/pharmacy-info/PharmacyInfoForm'
import PharmacyPaymentForm from '../../../pages/pharmacy/pharmacy-payment/PharmacyPaymentForm'
import RequestLayout from '../../../pages/request/RequestLayout'
import Request from '../../../pages/request/request/Request'
import BranchStoreLayout from '../../../pages/branchstore/BranchStoreLayout'
import BranchStore from '../../../pages/branchstore/branchstore/BranchStore'
import MainStoreLayout from '../../../pages/mainstore/MainStoreLayout'
import MainStore from '../../../pages/mainstore/mainstore/MainStore'
import PurchaseInvoiceLayout from '../../../pages/purchase-invoice/PurchaseInvoiceLayout'
import PurchaseInvoice from '../../../pages/purchase-invoice/purchase-invoice/PurchaseInvoice'
export interface MyRoutes {
  path: string
  element: ReactElement<any, any>
  children: MyRoutes[]
  header: string
  location?: string
  roles?: string[]
}

export const pharmacyRoutes: MyRoutes[] = [
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
          {
            path: 'pharmacy-payment',
            element: <PharmacyPaymentForm />,
            children: [],
            header: 'pos',
            location: '/pharmacy/pharmacy-payment',
            roles: ['Pharmacy Salesperson'],
          },
        ],
        header: 'pos',
        location: '/pharmacy',
        roles: ['Pharmacy Salesperson'],
      },
      {
        path: 'store/*',
        element: <h1>Store</h1>,
        children: [],
        header: 'Pharmacy Store',
        location: '/store',
        roles: ['PHARMACY_SALESPERSON'],
      },
      {
        path: 'inventory/*',
        element: <h1>Inventory</h1>,
        children: [],
        header: 'Invoice',
        location: '/inventory',
        roles: ['PHARMACY_SALESPERSON'],
      },

      // inventrory

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
      {
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

      {
        path: '*',
        element: <NotFound />,
        children: [],
        header: 'Page Not Found',
        roles: ['PHARMACY_SALESPERSON'],
      },
      {
        path: 'notfound',
        element: <NotFound />,
        children: [],
        header: 'Page Not Found',
        roles: ['PHARMACY_SALESPERSON'],
      },
      {
        path: 'notpermitted',
        element: <NotFound />,
        children: [],
        header: 'Page Not Found',
        roles: ['PHARMACY_SALESPERSON'],
      },
    ],
    header: 'Home',
    roles: ['PHARMACY_SALESPERSON'],
  },
]

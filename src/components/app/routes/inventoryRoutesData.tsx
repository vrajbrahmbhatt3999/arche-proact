import { ReactElement } from 'react'
import MainLayout from '../../../pages/main-layout/MainLayout'
import Login from '../../../pages/login/Login'
import AuthWrapper from './AuthWrapper'
import LandingPage from '../../common/landing-page/LandingPage'
import ForgotPassword from '../../../pages/login/forgot-password/ForgotPassword'
import OtpVerfication from '../../../pages/login/otp-verfication/OtpVerfication'
import RecoveryPassword from '../../../pages/login/recovery-password/RecoveryPassword'
import { MyRoutes } from './routeData'
import RequestLayout from '../../../pages/request/RequestLayout'
import Request from '../../../pages/request/request/Request'
import BranchStoreLayout from '../../../pages/branchstore/BranchStoreLayout'
import BranchStore from '../../../pages/branchstore/branchstore/BranchStore'
import MainStoreLayout from '../../../pages/mainstore/MainStoreLayout'
import MainStore from '../../../pages/mainstore/mainstore/MainStore'

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
  
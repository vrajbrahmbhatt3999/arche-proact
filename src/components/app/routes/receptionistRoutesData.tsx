import { ReactElement } from "react";
import MainLayout from "../../../pages/main-layout/MainLayout";
import Login from "../../../pages/login/Login";
import AuthWrapper from "./AuthWrapper";
import LandingPage from "../../common/landing-page/LandingPage";
import ForgotPassword from "../../../pages/login/forgot-password/ForgotPassword";
import OtpVerfication from "../../../pages/login/otp-verfication/OtpVerfication";
import RecoveryPassword from "../../../pages/login/recovery-password/RecoveryPassword";
import NotFound from "../../common/not-found/NotFound";
import PatientEmrLayout from "../../../pages/patient-emr/PatientEmrLayout";
import PatientEmrDashboard from "../../../pages/patient-emr/patient-emr-dashboard/PatientEmrDashboard";
import BookingSchedularFunctional from "../../../pages/appointment/BookingFunctional";
import ShareQuestionEmail from "../../../pages/patient-emr/share-question-email/ShareQuestionEmail";
import SubmitQuestionnaireLayout from "../../../pages/submit-questionnaire/submit-questionnaire-layout/SubmitQuestionnaireLayout";
import SubmitQuestionnaireForm from "../../../pages/submit-questionnaire/submit-questionnaire-form/SubmitQuestionnaireForm";
import QuestionnaireSubmit from "../../../pages/submit-questionnaire/questionnaire-submit/QuestionnaireSubmit";
import Receptionist from "../../../pages/receptionist/Receptionist";
import SubmitOtp from "../../../pages/submit-otp/SubmitOtp";
import MainSchedular from "../../../pages/appointment/SchedularMainLayout";
import InvoiceLayout from "../../../pages/invoice/InvoiceLayout";
import InvoiceInformation from "../../../pages/invoice/invoice-information/InvoiceInformation";
import InvoiceServices from "../../../pages/invoice/invoice-services/InvoiceServices";
import InvoicePayment from "../../../pages/invoice/invoice-payment/InvoicePayment";
import ReceiptLayout from "../../../pages/receipt/ReceiptLayout";
import Receipt from "../../../pages/receipt/receipt-landing-page/Receipt";

export interface MyRoutes {
  path: string;
  element: ReactElement<any, any>;
  children: MyRoutes[];
  header: string;
  location?: string;
  roles?: string[];
}

export const receptionistRoutes: MyRoutes[] = [
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
    path: "submitquestionnairelayout",
    element: <SubmitQuestionnaireLayout />,
    children: [
      {
        path: "",
        element: <SubmitQuestionnaireForm />,
        children: [],
        header: "",
        location: "/submitquestionnairelayout",
      },
      {
        path: "questionnairesubmit",
        element: <QuestionnaireSubmit />,
        children: [],
        header: "",
        location: "/submitquestionnairelayout/questionnairesubmit",
      },
    ],
    header: "",
    location: "/submitquestionnairelayout",
  },
  {
    path: "submitotp",
    element: <SubmitOtp />,
    children: [],
    header: "",
    location: "/submitotp",
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
        path: "patientemr/*",
        element: <PatientEmrLayout />,
        children: [
          {
            path: "",
            element: <PatientEmrDashboard />,
            children: [],
            header: "Patient EMR Dashboard",
            location: "/patientemr",
            roles: ["MC Admin"],
          },
          {
            path: "sharequestionnaireemail",
            element: <ShareQuestionEmail />,
            children: [],
            header: "Patient Emr Dashboard",
            location: "patientemr/sharequestionnaireemail",
            roles: ["MC Admin"],
          },
        ],
        header: "Patient Emr Dashboard",
        location: "/patientemr",
        roles: ["MC Admin"],
      },
      {
        path: "bookingappointment/*",
        element: <MainSchedular />,
        children: [
          {
            path: "",
            element: <BookingSchedularFunctional />,
            children: [],
            header: "Patient Emr Dashboard",
            location: "patientemr/sharequestionnaireemail",
            roles: ["MC Admin"],
          },
        ],
        header: "Manage Appointments",
        location: "/bookingappointment",
        roles: ["Recessepnoist"],
      },
      {
        path: "receptionist/*",
        element: <Receptionist />,
        children: [],
        header: "Receptionist",
        location: "/receptionist",
        roles: ["Receptionist"],
      },
      {
        path: "invoice/*",
        element: <InvoiceLayout />,
        children: [
          {
            path: "",
            element: <InvoiceLayout />,
            children: [],
            header: "Invoice",
            location: "/invoice/information",
            roles: ["Super Admin"],
          },
          {
            path: "information",
            element: <InvoiceInformation />,
            children: [],
            header: "Invoice",
            location: "/invoice/information",
            roles: ["Super Admin"],
          },
          {
            path: "services",
            element: <InvoiceServices />,
            children: [],
            header: "Invoice - Services",
            location: "/invoice/services",
            roles: ["Super Admin"],
          },
          {
            path: "payment",
            element: <InvoicePayment />,
            children: [],
            header: "Invoice - Payment",
            location: "/invoice/payment",
            roles: ["Super Admin"],
          },
        ],
        header: "Invoice",
        location: "/invoice",
        roles: ["Super Admin"],
      },
      {
        path: "receipt/*",
        element: <ReceiptLayout />,
        children: [
          {
            path: "",
            element: <Receipt />,
            children: [],
            header: "Receipt",
            location: "/receipt",
            roles: ["Receptionist"],
          },
        ],
        header: "Receipt",
        location: "/receipt",
        roles: ["Receptionist"],
      },
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
        path: "*",
        element: <NotFound />,
        children: [],
        header: "Page Not Found",
        roles: ["MC Admin"],
      },
      {
        path: "notfound",
        element: <NotFound />,
        children: [],
        header: "Page Not Found",
        roles: ["MC Admin"],
      },
      {
        path: "notpermitted",
        element: <NotFound />,
        children: [],
        header: "Page Not Found",
        roles: ["MC Admin"],
      },
    ],
    header: "Home",
    roles: ["MC Admin"],
  },
];

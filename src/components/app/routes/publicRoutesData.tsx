import { ReactElement } from "react";
import LandingPage from "../../common/landing-page/LandingPage";
import Login from "../../../pages/login/Login";
import ForgotPassword from "../../../pages/login/forgot-password/ForgotPassword";
import OtpVerfication from "../../../pages/login/otp-verfication/OtpVerfication";
import RecoveryPassword from "../../../pages/login/recovery-password/RecoveryPassword";
import NotFound from "../../common/not-found/NotFound";
import SubmitQuestionnaireLayout from "../../../pages/submit-questionnaire/submit-questionnaire-layout/SubmitQuestionnaireLayout";
import SubmitQuestionnaireForm from "../../../pages/submit-questionnaire/submit-questionnaire-form/SubmitQuestionnaireForm";
import QuestionnaireSubmit from "../../../pages/submit-questionnaire/questionnaire-submit/QuestionnaireSubmit";
import SubmitOtp from "../../../pages/submit-otp/SubmitOtp";

export interface MyRoutes {
  path: string;
  element: ReactElement<any, any>;
  children: MyRoutes[];
  header: string;
  location?: string;
  roles?: string[];
}

export const publicRoutes: MyRoutes[] = [
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
    path: "notfound",
    element: <NotFound />,
    children: [],
    header: "",
    location: "/submnotfounditotp",
  },
  {
    path: "*",
    element: <NotFound />,
    children: [],
    header: "",
    location: "/submnotfounditotp",
  },
];

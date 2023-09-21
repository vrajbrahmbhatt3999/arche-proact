import { ReactElement } from 'react'
import MainLayout from '../../../pages/main-layout/MainLayout'
import Login from '../../../pages/login/Login'
import AuthWrapper from './AuthWrapper'
import LandingPage from '../../common/landing-page/LandingPage'
import ForgotPassword from '../../../pages/login/forgot-password/ForgotPassword'
import OtpVerfication from '../../../pages/login/otp-verfication/OtpVerfication'
import RecoveryPassword from '../../../pages/login/recovery-password/RecoveryPassword'
import NotFound from '../../common/not-found/NotFound'
import PatientEmrLayout from '../../../pages/patient-emr/PatientEmrLayout'
import PatientEmrDashboard from '../../../pages/patient-emr/patient-emr-dashboard/PatientEmrDashboard'
import ShareQuestionEmail from '../../../pages/patient-emr/share-question-email/ShareQuestionEmail'
import SubmitQuestionnaireLayout from '../../../pages/submit-questionnaire/submit-questionnaire-layout/SubmitQuestionnaireLayout'
import SubmitQuestionnaireForm from '../../../pages/submit-questionnaire/submit-questionnaire-form/SubmitQuestionnaireForm'
import QuestionnaireSubmit from '../../../pages/submit-questionnaire/questionnaire-submit/QuestionnaireSubmit'
import Receptionist from '../../../pages/receptionist/Receptionist'
import SubmitOtp from '../../../pages/submit-otp/SubmitOtp'
import DoctorAppointmentDashboard from '../../../pages/doctor-dashboard/doctor-appointments/DoctorAppointmentDashboard'
import DoctorDiagnosisLayout from '../../../pages/doctor-diagnosis/DoctorDiagnosisLayout'
import DiagnosisForm from '../../../pages/doctor-diagnosis/diagnosis/diagnosis-form/DiagnosisForm'
import Medication from '../../../pages/doctor-diagnosis/medication/Medication'
import Referral from '../../../pages/doctor-diagnosis/referal/Referral'
import TreatmentPlanList from '../../../pages/doctor-diagnosis/treatment/treatment-plan-list/TreatmentPlanList'
import CreateNewFormsLayout from '../../../pages/create-new-forms/CreateNewFormsLayout'
import CreateNewFormList from '../../../pages/create-new-forms/create-new-form-list/CreateNewFormList'
import CreateNewFormBuilder from '../../../pages/create-new-forms/create-new-form-builder/CreateNewFormBuilder'
import Invoice from '../../../pages/doctor-diagnosis/invoice/Invoice'
import Request from '../../../pages/doctor-diagnosis/request/Request'

export interface MyRoutes {
  path: string
  element: ReactElement<any, any>
  children: MyRoutes[]
  header: string
  location?: string
  roles?: string[]
}

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
        element: <h1>IPD</h1>,
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
    ],
    header: 'Home',
    roles: ['MC Admin'],
  },
]

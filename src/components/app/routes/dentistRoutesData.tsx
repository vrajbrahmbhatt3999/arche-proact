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
import DentistAppointmentDashboard from '../../../pages/dentist-dashboard/dentist-appointments/DentistAppointmentDashboard'
import DentistDiagnosisLayout from '../../../pages/dentist-diagnosis/DentistDiagnosisLayout'
import DiagnosisForm from '../../../pages/dentist-diagnosis/diagnosis/diagnosis-form/DiagnosisForm'
import Medication from '../../../pages/dentist-diagnosis/medication/Medication'
import Referral from '../../../pages/dentist-diagnosis/referal/Referral'
import TreatmentPlanList from '../../../pages/dentist-diagnosis/treatment/treatment-plan-list/TreatmentPlanList'
import CreateNewFormsLayout from '../../../pages/create-new-forms/CreateNewFormsLayout'
import CreateNewFormList from '../../../pages/create-new-forms/create-new-form-list/CreateNewFormList'
import CreateNewFormBuilder from '../../../pages/create-new-forms/create-new-form-builder/CreateNewFormBuilder'
import Request from '../../../pages/dentist-diagnosis/request/Request'
import Dental from '../../../pages/dentist-diagnosis/dental/Dental'

export interface MyRoutes {
  path: string
  element: ReactElement<any, any>
  children: MyRoutes[]
  header: string
  location?: string
  roles?: string[]
}

export const dentistRoutes: MyRoutes[] = [
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
        path: 'dentist/*',
        element: <DentistAppointmentDashboard />,
        children: [],
        header: 'Dentist',
        location: '/dentist',
        roles: ['DENTIST'],
      },
      {
        path: 'patientdiagnosis/*',
        element: <DentistDiagnosisLayout />,
        children: [
          {
            path: 'diagnosis',
            element: <DiagnosisForm />,
            children: [],
            header: 'Diagnosis',
            location: '/diagnosis',
            roles: ['DENTIST'],
          },
          {
            path: 'dental',
            element: <Dental />,
            children: [],
            header: 'Dental',
            location: '/dental',
            roles: ['DENTIST'],
          },
          {
            path: 'medication',
            element: <Medication />,
            children: [],
            header: 'Dentist Diagnosis',
            location: '/diagnosis/medication',
            roles: ['DENTIST'],
          },
          {
            path: 'request',
            element: <Request />,
            children: [],
            header: 'Dentist Diagnosis',
            location: '/request',
            roles: ['DENTIST'],
          },
          {
            path: 'referral',
            element: <Referral />,
            children: [],
            header: 'Dentist',
            location: '/referral',
            roles: ['DENTIST'],
          },
          {
            path: 'treatment',
            element: <TreatmentPlanList />,
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
        path: 'formBuilder/*',
        element: <CreateNewFormsLayout />,
        children: [
          {
            path: '',
            element: <CreateNewFormList />,
            children: [],
            header: 'Create New Forms',
            location: '',
            roles: ['DENTIST'],
          },
          {
            path: 'createNewFormBuilder',
            element: <CreateNewFormBuilder />,
            children: [],
            header: ' Create New Form Builder',
            location: '/createNewFormBuilder',
            roles: ['DENTIST'],
          },
          {
            path: '*',
            element: <NotFound />,
            children: [],
            header: 'Page Not Found',
            roles: ['DENTIST'],
          },
        ],
        header: ' Create New Forms',
        location: '/formBuilder',
        roles: ['DENTIST'],
      },
      {
        path: 'ipd/*',
        element: <h1>IPD</h1>,
        children: [],
        header: 'IPD',
        location: '/ipd',
        roles: ['DENTIST'],
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

import { FC, useEffect } from 'react'
import Tabs from '../../components/core/tab/Tabs'
import PatientInformationForm from './patient_information_form/PatientInformationForm'
import { doctorDiagnosisTabData } from '../../constants/data'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

const DoctorDiagnosisLayout: FC = () => {
  const navigate = useNavigate()
  const location = useLocation().pathname
  useEffect(() => {
    if (location === '/patientdiagnosis') {
      navigate('/patientdiagnosis/diagnosis')
    }
  }, [location])
  return (
    <>
      <PatientInformationForm />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginBottom: '40px',
        }}
      >
        <Tabs tabData={doctorDiagnosisTabData} />
        <Outlet />
      </div>
    </>
  )
}

export default DoctorDiagnosisLayout

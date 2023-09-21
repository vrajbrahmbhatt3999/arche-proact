import { FC, useEffect } from 'react'
import Tabs from '../../components/core/tab/Tabs'
import PatientInformationForm from './patient_information_form/PatientInformationForm'
import { dentistDiagnosisTabData } from '../../constants/data'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

const DentistDiagnosisLayout: FC = () => {
  const navigate = useNavigate()
  const location = useLocation().pathname
  useEffect(() => {
    if (location === '/patientdentaldiagnosis') {
      navigate('/patientdentaldiagnosis/diagnosis')
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
        }}>
        <Tabs tabData={dentistDiagnosisTabData} />
        <Outlet />
      </div>
    </>
  )
}

export default DentistDiagnosisLayout

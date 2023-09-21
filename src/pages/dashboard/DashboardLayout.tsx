import { FC, useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Tabs from '../../components/core/tab/Tabs'
import { medicalCenterTabData } from '../../constants/data'

interface IAppProps {}

const DashboardLayout: FC<IAppProps> = () => {
  const navigate = useNavigate()
  const location = useLocation().pathname
  useEffect(() => {
    if (location === '/medicalcenter') {
      navigate('/medicalcenter/branch')
    }
  }, [location])
  return (
    <>
      <Tabs tabData={medicalCenterTabData} />
      <Outlet />
    </>
  )
}

export default DashboardLayout

import { FC, useEffect } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import Tabs from '../../components/core/tab/Tabs'
import { mobileAppConfigurationData } from '../../constants/data'

interface IMobileAppConfig {}

const MobileAppConfigLayout: FC<IMobileAppConfig> = (props) => {
  const navigate = useNavigate()
  const location = useLocation().pathname
  useEffect(() => {
    if (location === '/mobileappconfiguration') {
      navigate('/mobileappconfiguration/appointment')
    }
  }, [location])
  return (
    <>
      <Tabs tabData={mobileAppConfigurationData} />
      <Outlet />
    </>
  )
}

export default MobileAppConfigLayout

import { FC, useEffect } from 'react'
import Tabs from '../../components/core/tab/Tabs'
import { pharmacyJobData } from '../../constants/data'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

interface IPharmacyLayout {}

const PharmacyLayout: FC<IPharmacyLayout> = () => {
  const navigate = useNavigate()
  const location = useLocation().pathname
  useEffect(() => {
    if (location === '/pharmacy') {
      navigate('/pharmacy/pharmacy-info')
    }
  }, [location])
  return (
    <>
      <Tabs tabData={pharmacyJobData} />
      <Outlet />
    </>
  )
}
export default PharmacyLayout

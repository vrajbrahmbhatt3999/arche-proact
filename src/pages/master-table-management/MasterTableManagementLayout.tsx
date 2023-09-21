import { FC, useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Tabs from '../../components/core/tab/Tabs'
import { masterTableManagementData } from '../../constants/data'

interface IMasterTableManagementLayout {}

const MasterTableManagementLayout: FC<IMasterTableManagementLayout> = () => {
  const navigate = useNavigate()
  const location = useLocation().pathname
  useEffect(() => {
    if (location === '/mastertablemanage') {
      navigate('/mastertablemanage/managecategory')
    }
  }, [location])
  return (
    <>
      <Tabs tabData={masterTableManagementData} />
      <Outlet />
    </>
  )
}

export default MasterTableManagementLayout

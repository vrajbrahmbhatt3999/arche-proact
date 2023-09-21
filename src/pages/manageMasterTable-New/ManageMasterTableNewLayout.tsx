import { FC, useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

interface IManageMasterTableNewtLayout {}

const ManageMasterTableNewtLayout: FC<IManageMasterTableNewtLayout> = () => {
  const navigate = useNavigate()
  const location = useLocation().pathname
  useEffect(() => {
    if (location === '/mastertablemanagenew') {
      navigate('/mastertablemanagenew/managemasternew')
    }
  }, [location])
  return (
    <>
      <Outlet />
    </>
  )
}

export default ManageMasterTableNewtLayout

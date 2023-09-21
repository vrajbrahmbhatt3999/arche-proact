import { FC, ReactElement } from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../../../hooks'

interface IAuthWrapper {
  children: ReactElement<any, any> | null
}

const AuthWrapper: FC<IAuthWrapper> = ({ children }) => {
  //   const { token } = useToken()
  //   const { authRole } = useRole()
  const { isLoggedin } = useAppSelector((state) => state.login)
  let authRole = true
  // let isLoggedin = true
  console.log('auth wrapper call')
  if (!isLoggedin) {
    return <Navigate to="/" />
  } else if (authRole) {
    return children
  } else {
    return <Navigate to="/notpermitted" />
  }
}

export default AuthWrapper

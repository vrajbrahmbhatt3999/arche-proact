import styles from './mainLayout.module.scss'
import Header from './header/Header'
import SideBar from './sidebar/SideBar'
import { Outlet, useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks'
import usePermissions from '../../hooks/usePermissions'
import { useEffect, useRef } from 'react'
import { getDeviceTokenStore } from '../../redux/features/appointment/appointmentAsyncActions'
import { requestGenerator } from '../../utils/payloadGenerator'
import { fetchFirebaseToken } from '../../redux/features/login/loginSlice'

const MainLayout: React.FunctionComponent = () => {
  const dispatch = useAppDispatch()
  const { userData, firebaseToken } = useAppSelector((state) => state.login)
  const { sidebar } = usePermissions()

  let deviceTokenPayload = {
    device_token: firebaseToken,
  }

  useEffect(() => {
    if (firebaseToken?.length > 0) {
      dispatch(getDeviceTokenStore(requestGenerator(deviceTokenPayload)))
    }
  }, [firebaseToken])
  const path = useLocation().pathname
  let module = path.split('/')[path.split('/').length - 1]
  const classObject: any = {
    bookingappointment: styles.customHeaderChildrenContainer,
  }
  // useEffect(() => {
  //   console.log('firebasecall')
  //   dispatch(fetchFirebaseToken()).then((res) => {
  //     if (res.type === 'login/createFirebaseToken/fulfilled') {
  //       let deviceTokenPayload = {
  //         device_token: res.payload,
  //       }
  //       dispatch(getDeviceTokenStore(requestGenerator(deviceTokenPayload)))
  //     }
  //   })
  // }, [])
  return (
    <div className={styles.mainContainer}>
      <SideBar sidebarData={sidebar || []} />
      <div className={classObject[module] ?? styles.headerChildrenContainer}>
        <Header />
        {/* {location.pathname === "/patientemr" ? <FormActionSidebar /> : ""} */}
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout

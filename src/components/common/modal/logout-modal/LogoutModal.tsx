import { FC, useState } from 'react'
import profileIcon from '../../../../assets/images/profileIcon.png'
import { colors } from '../../../../constants/color'
import Divider from '../../divider/Divider'
import { LogoutIcon } from '../../svg-components'
import styles from './logoutModal.module.scss'
import { useAppDispatch, useAppSelector } from '../../../../hooks/index'
import { useNavigate } from 'react-router'
import { requestGenerator } from '../../../../utils/payloadGenerator'
import { userLogout } from '../../../../redux/features/login/loginAsynActions'
import { clearPatientBranch } from '../../../../redux/features/patient-emr/patient/patientSlice'
import { socket } from '../../../../socket'
import { roleData } from '../../../../constants/data'
import SelectImage from '../../../../assets/images/Default Image.png'
import usePermissions from '../../../../hooks/usePermissions'

interface ILogoutModal {
  logoutRef: any
}

const LogoutModal: FC<ILogoutModal> = ({ logoutRef }) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { userData, branchData } = useAppSelector((state) => state.login)
  const [socketJoined, setSocketJoined] = useState(false)
  // const { setSideBar, setRouteData } = usePermissions()
  const handleLogout = () => {
    // console.log("fccfg");
    dispatch(userLogout(requestGenerator({})))
    // setRouteData([])
    // setSideBar([])
    dispatch({ type: 'RESET_STATE' })
    navigate('/')
    dispatch(clearPatientBranch())

    if (socket && socket.connected) {
      // socket.on("userOffline");
      // console.log("Socket disconnect", socket.connected);
      socket.disconnect()
      setSocketJoined(false)

      // Disconnect the socket if it's connected
    } else {
      console.log('Socket disconnec issue')
    }
  }

  // const userDataReplace = userData?.role
  //   ? userData?.role.replace('_', ' ')
  //   : '-'
  // console.log('userDataReplace', userDataReplace)
  // const userDataFormate =
  //   userDataReplace.charAt(0).toUpperCase() + userDataReplace.slice(1)
  const userDataArray = userData?.role ? userData?.role.split('_') : '-'
  const userDataReplace = userDataArray?.join(' ')
  const userDataFormate =
    userDataReplace?.charAt(0)?.toUpperCase() +
    userDataReplace?.slice(1)?.toLowerCase()

  return (
    <>
      <div className={styles.mainContainer} ref={logoutRef}>
        <div className={styles.profileContainer}>
          <div className={styles.profileImageContainer}>
            <img
              className={styles.profileImage}
              src={
                branchData?.profile_pic ? branchData?.profile_pic : SelectImage
              }
              alt=""
            />
          </div>
          <div className={styles.profileInfo}>
            <p className={styles.userNameStyle}>{userData?.name}</p>
            <p className={styles.userRoleStyle}>
              {/* {userData?.role && roleData[userData.role]?.name} */}
              {/* {userData?.role ? userData?.role.replace("_", " ") : '-'} */}
              {/* Your words matter, and our paraphrasing  */}
              {userDataFormate ? userDataFormate : ''}
            </p>
          </div>
        </div>
        <Divider customClass={styles.dividerStyle} />

        <div>
          <span className={styles.logoutContainer}>
            <LogoutIcon
              fillColor={colors.black1}
              handleClick={() => handleLogout()}
            />
            <p className={styles.logoutTextStyle} onClick={handleLogout}>
              Sign Out
            </p>
          </span>
        </div>
      </div>
    </>
  )
}

export default LogoutModal

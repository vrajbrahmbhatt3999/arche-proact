import { FC, useEffect, useState } from 'react'
// import profileIcon from '../../../../assets/images/profileIcon.png'
// import { colors } from '../../../../constants/color'
import styles from './notificationmodal.module.scss'
import ToggleSwitch from '../../../../components/common/toggle-switch/ToggleSwtich'

// import { userLogout } from "../../../redux/features/login/loginSlice";
// interface ILogoutModal {}

const NotificationModal: FC = () => {
  const [toggle, setToggle] = useState<any>(false);
  const handleToggle = () => {
    setToggle(!toggle)
  }
  // const dispatch = useAppDispatch();
  // const handleLogout = () => {
  //   dispatch(userLogout());
  // };
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.profileMainContainer}>
          <div className={styles.profileContainer}>
            <p className={styles.userNameStyle}>Notification</p>
            <ToggleSwitch
              isToggled={toggle}
              handleToggle={() => handleToggle()}
            />
          </div>
          <div className={styles.profileSoundContainer}>
            <p className={styles.userRoleStyle}>Sound</p>
            <ToggleSwitch />
          </div>
        </div>

        {/* <div>
          <span className={styles.logoutContainer}>
            <p className={styles.logoutTextStyle} onClick={handleLogout}></p>
          </span>
        </div> */}
      </div>
    </>
  )
}

export default NotificationModal

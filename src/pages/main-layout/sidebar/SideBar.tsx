import React from 'react'
import { FC } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import styles from './sidebar.module.scss'
// import proactLogo from '../../../assets/images/proactLogo.png'
import proactlatestlogo from '../../../assets/images/proactlatestlogo.png'
import { colors } from '../../../constants/color'
import { ISidebar } from '../../../interfaces/interfaces'
import { useAppSelector } from '../../../hooks'
import usePermissions from '../../../hooks/usePermissions'

interface ISidebarProps {
  sidebarData: any[]
}

const SideBar: FC<ISidebarProps> = ({ sidebarData }) => {
  const state = useLocation().state
  const navigate = useNavigate()
  const { sidebar } = usePermissions()
  const handleNavigateToHome = () => {
    // const { navigateTo } = navigateAfterLogin(userData?.role)
    navigate(sidebar[0]?.navigate ? sidebar[0]?.navigate : '/notfound')
  }
  const location = useLocation().pathname
  let matchPath = location.split('/')
  return (
    <>
      {!state?.notRenderSidebar && (
        <div className={styles.sidebarContainer}>
          <img
            src={proactlatestlogo}
            alt="proact_logo"
            className={styles.logoStyle}
            onClick={() => handleNavigateToHome()}
          />

          <div className={styles.sidebarData}>
            {sidebarData.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <NavLink
                    to={item.navigate}
                    className={({ isActive }) =>
                      isActive
                        ? item?.navigate
                          ? styles.active
                          : matchPath[1] === item?.activeLocation
                          ? styles.active
                          : styles.sidebarContent
                        : styles.sidebarContent
                    }
                    children={({ isActive }) => {
                      return (
                        <>
                          <div className={styles.iconTooltip}>
                            <item.icon
                              fillColor={
                                isActive
                                  ? item?.navigate
                                    ? colors.blue1
                                    : matchPath[1] === item?.activeLocation
                                    ? colors.blue1
                                    : colors.grey1
                                  : colors.grey1
                              }
                            />
                            <p className={styles.iconTooltipText}>
                              {item.name}
                            </p>
                          </div>
                        </>
                      )
                    }}
                  ></NavLink>
                </React.Fragment>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}

export default SideBar

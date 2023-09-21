import React from 'react'
import { FC } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import styles from './tabs.module.scss'
import { ITab } from '../../../interfaces/interfaces'

interface ITabData {
  tabData: any[]
  customClass?: string
}

const Tabs: FC<ITabData> = ({ tabData, customClass }) => {
  const location = useLocation().pathname
  return (
    <>
      <div className={[styles.tabData, customClass].join(' ')}>
        {tabData.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <NavLink
                to={item?.navigate}
                className={({ isActive }) =>
                  isActive
                    ? item?.navigate
                      ? styles.activeTab
                      : location === item?.activeLocation
                      ? styles.activeTab
                      : styles.tabContent
                    : styles.tabContent
                }
                children={({ isActive }) => {
                  return (
                    <>
                      <span className={styles.tabTitle}>{item.name}</span>
                    </>
                  )
                }}
              ></NavLink>
            </React.Fragment>
          )
        })}
      </div>
    </>
  )
}

export default Tabs

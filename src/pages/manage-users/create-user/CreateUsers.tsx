import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import Tabs from '../../../components/core/tab/Tabs'
import styles from './createUsers.module.scss'
import { useAppSelector } from '../../../hooks'
import { manageCreateUserData } from '../../../constants/data'

interface ICreateUsers {}

const CreateUsers: FC<ICreateUsers> = () => {
  const { isSecondayActive } = useAppSelector((state) => state.manageUser)
  return (
    <>
      <div className={styles.mainContainer}>
        <Tabs tabData={manageCreateUserData} />
        <Outlet />
      </div>
    </>
  )
}

export default CreateUsers

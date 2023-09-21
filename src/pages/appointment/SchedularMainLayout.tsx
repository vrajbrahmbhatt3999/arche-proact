import { FC, Fragment } from 'react'
import { Outlet } from 'react-router'
import SchedularHeader from '../../components/common/appointment/schedular-header/SchedularHeader'
import styles from './schedularMainLayout.module.scss'

interface IMainSchedularProps {}
const MainSchedular: FC<IMainSchedularProps> = () => {
  return (
    <Fragment>
      <SchedularHeader />
      <Outlet />
    </Fragment>
  )
}
export default MainSchedular

import { MyRoutes } from '../components/app/routes/routeData'
import {
  authRoutes,
  commonRoutes,
  mainRouteData,
  notFoundRoutes,
} from '../constants/routesPermission/mainRouteData'
import { mainSidebarData } from '../constants/routesPermission/mainSidebarData'
import { permissionsObject } from '../constants/routesPermission/routesPermission'
import { useState, useEffect, FC } from 'react'
import { ISidebar } from '../interfaces/interfaces'
import { useAppSelector } from './index'
import { filterRouteData, filterSideBarData } from '../utils/utils'
import { useNavigate } from 'react-router-dom'

const usePermissions = () => {
  const [sidebar, setSideBar] = useState<ISidebar[]>([])
  const [routeData, setRouteData] = useState<MyRoutes[]>(commonRoutes)
  const { sidebarData } = useAppSelector((state) => state.login)
  const navigate = useNavigate()

  useEffect(() => {
    if (sidebarData && sidebarData?.length > 0) {
      const moduleIdArr = sidebarData?.map((item: any) => item?.moduleId)

      //sidebar
      const data = filterSideBarData(moduleIdArr, mainSidebarData)
      navigate(
        data[0]?.navigateAfterLogin
          ? data[0]?.navigateAfterLogin
          : data[0]?.navigate
          ? data[0]?.navigate
          : '/'
      )
      setSideBar(data)

      const filteredRoutes = filterRouteData(moduleIdArr, authRoutes)
      const routeData: MyRoutes[] = [...commonRoutes, ...filteredRoutes]
      setRouteData(routeData)
    } else {
      setSideBar([])
      setRouteData(notFoundRoutes)
    }
  }, [sidebarData])
  // let permission = permissionsObject[userRole] || {};
  return { sidebar, routeData, setSideBar, setRouteData }
}

export default usePermissions

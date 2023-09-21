import { FC } from 'react'
import { useRoutes } from 'react-router-dom'
import usePermissions from '../../../hooks/usePermissions'
import { commonRoutes } from '../../../constants/routesPermission/mainRouteData'
interface RoutesProps {}

const RootRoutes: FC<RoutesProps> = () => {
  const { routeData } = usePermissions()
  const routing = useRoutes(routeData ? routeData : commonRoutes)
  return routing
}
export default RootRoutes

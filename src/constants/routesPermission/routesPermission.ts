import {
  doctorSidebarData,
  dentistSidebarData,
  receptionistSidebarData,
  sidebarData,
  labSidebarData,
  radiologySidebarData,
  inventorySidebarData,
  pharmacySidebarData,
} from '../data'
import { mcAdminRoutes } from '../../components/app/routes/mcAdminRoutesData'
import { receptionistRoutes } from '../../components/app/routes/receptionistRoutesData'
import { doctorRoutes } from '../../components/app/routes/doctorRoutesData'
import { dentistRoutes } from '../../components/app/routes/dentistRoutesData'
import { labRoutes } from '../../components/app/routes/labRoutesData'
import { radiologyRoutes } from '../../components/app/routes/radiologyRoutesData'
import { pharmacyRoutes } from '../../components/app/routes/pharmacyRoutesData'
import { inventoryRoutesData } from '../../components/app/routes/inventoryRoutesData'

export const permissionsObject: any = {
  MC_ADMIN: {
    sidebar: sidebarData,
    routeData: mcAdminRoutes,
  },
  RECEPTIONIST: {
    sidebar: receptionistSidebarData,
    routeData: receptionistRoutes,
  },
  DOCTOR: {
    sidebar: doctorSidebarData,
    routeData: doctorRoutes,
  },
  LAB_SUPERVISOR: {
    sidebar: labSidebarData,
    routeData: labRoutes,
  },
  RADIOLOGY_SUPERVISOR: {
    sidebar: radiologySidebarData,
    routeData: radiologyRoutes,
  },
  PHARMACY_SALESPERSON: {
    sidebar: pharmacySidebarData,
    routeData: pharmacyRoutes,
  },
  // INVENTORY_MANAGEMENT:{
  //   sidebar:inventorySidebarData,
  //   routeData:inventoryRoutesData,

  // }
  DENTIST: {
    sidebar: dentistSidebarData,
    routeData: dentistRoutes,
  },
}

// import { useState } from "react";

import {
  receptionistSidebarData,
  sidebarData,
  doctorSidebarData,
  dentistSidebarData,
} from "../constants/data";

import { ISidebar } from "../interfaces/interfaces";

interface IFilterSidebarProps {
  userRole: string;
}

const useFilterSidebarData = ({ userRole }: IFilterSidebarProps) => {
  const sidebarDataMap: any = {
    MC_ADMIN: sidebarData,
    RECEPTIONIST: receptionistSidebarData,
    DOCTOR: doctorSidebarData,
    DENTIST:dentistSidebarData
  };
  let filterSidebarData: ISidebar[] = sidebarDataMap[userRole] || [];
  return filterSidebarData;
};

export default useFilterSidebarData;

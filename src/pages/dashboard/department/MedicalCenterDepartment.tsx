import { FC } from "react";
import { Outlet } from "react-router";

interface IAppProps {}

const MedicalCenterDepartment: FC<IAppProps> = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default MedicalCenterDepartment;

import { FC } from "react";
import { Outlet } from "react-router-dom";

const DoctorLayout: FC = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default DoctorLayout;

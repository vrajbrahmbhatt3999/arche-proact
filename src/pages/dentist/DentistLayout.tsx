import { FC } from "react";
import { Outlet } from "react-router-dom";

const DentistLayout: FC = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default DentistLayout;

import { FC } from "react";
import { Outlet } from "react-router";

interface IMedicalCenterBranch {}

const MedicalCenterBranch: FC<IMedicalCenterBranch> = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default MedicalCenterBranch;

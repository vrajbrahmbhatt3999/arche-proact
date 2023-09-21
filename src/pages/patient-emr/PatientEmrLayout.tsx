import { FC } from "react";
import { Outlet } from "react-router-dom";

interface IPatientEmrLayout {}

const PatientEmrLayout: FC<IPatientEmrLayout> = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default PatientEmrLayout;

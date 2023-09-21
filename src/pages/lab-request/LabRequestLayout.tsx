import { FC } from "react";
import { Outlet } from "react-router-dom";

interface ILabRequestLayout {}

const LabRequestLayout: FC<ILabRequestLayout> = () => {
  return <Outlet />;
};

export default LabRequestLayout;

import { FC } from "react";
import { Outlet } from "react-router-dom";

interface ILabRequestLayout {}

const RadioLogyRequestLayout: FC<ILabRequestLayout> = () => {
  return <Outlet />;
};

export default RadioLogyRequestLayout;

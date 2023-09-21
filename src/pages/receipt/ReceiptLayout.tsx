import { FC } from "react";
import { Outlet } from "react-router-dom";

interface IReceiptLayout {}

const ReceiptLayout: FC<IReceiptLayout> = () => {
  return <Outlet />;
};

export default ReceiptLayout;

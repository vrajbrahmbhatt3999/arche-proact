import { FC } from 'react';
import { Outlet } from 'react-router-dom';

interface IAppProps {}

const InventoryMasterTableLayout: FC<IAppProps> = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default InventoryMasterTableLayout;

import * as React from "react";
import { Outlet } from "react-router-dom";

interface IManageUsersProps {}

const ManageUsersLayout: React.FunctionComponent<IManageUsersProps> = (
  props
) => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default ManageUsersLayout;

import * as React from "react";
import { Outlet } from "react-router-dom";

interface IAppProps {}

const ManageUserGroupsLayout: React.FunctionComponent<IAppProps> = (props) => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default ManageUserGroupsLayout;

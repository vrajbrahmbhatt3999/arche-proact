import { FC, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

interface ISubStoreLayoutLayout {}

const BranchStoreLayout: FC<ISubStoreLayoutLayout> = (props) => {

return(
  <>
  <Outlet />
  </>
);
}
export default BranchStoreLayout;
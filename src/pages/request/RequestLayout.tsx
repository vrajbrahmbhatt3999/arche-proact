import { FC, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

interface IRequestLayout {}

const RequestLayout: FC<IRequestLayout> = (props) => {

return(
  <>
 
  <Outlet />
  </>
);
}
export default RequestLayout;
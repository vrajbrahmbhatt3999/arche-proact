import { FC, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

interface IPurchaseInvoiceLayout {}

const PurchaseInvoiceLayout: FC<IPurchaseInvoiceLayout> = (props) => {

return(
  <>
 
  <Outlet />
  </>
);
}
export default PurchaseInvoiceLayout;
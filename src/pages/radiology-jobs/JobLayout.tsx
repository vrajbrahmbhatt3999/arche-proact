import { FC, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { RadiologyJobTabData } from "../../constants/data";
import Tabs from "../../components/core/tab/Tabs";

interface IJobLayout {}

const RadiologyJobLayout: FC<IJobLayout> = (props) => {
  const navigate = useNavigate();
  const location = useLocation().pathname;
  useEffect(() => {
    if (location === "/radiology-job") {
      navigate("createjobs");
    }
  }, [location]);
  return (
    <>
      <Tabs tabData={RadiologyJobTabData} />
      <Outlet />
    </>
  );
};
export default RadiologyJobLayout;

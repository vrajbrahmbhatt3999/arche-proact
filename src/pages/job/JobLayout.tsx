import { FC, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { labJobTabData } from "../../constants/data";
import Tabs from "../../components/core/tab/Tabs";

interface IJobLayout {}

const JobLayout: FC<IJobLayout> = (props) => {
  const navigate = useNavigate();
  const location = useLocation().pathname;
  useEffect(() => {
    if (location === "/job") {
      navigate("createjobs");
    }
  }, [location]);
  return (
    <>
      <Tabs tabData={labJobTabData} />
      <Outlet />
    </>
  );
};
export default JobLayout;

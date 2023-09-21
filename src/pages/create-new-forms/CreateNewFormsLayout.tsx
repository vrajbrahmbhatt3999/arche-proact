import { FC } from "react";
import { Outlet } from "react-router-dom";

interface ICreateNewFormsLayout {}

const CreateNewFormsLayout: FC<ICreateNewFormsLayout> = (props) => {
  return <Outlet />;
};

export default CreateNewFormsLayout;

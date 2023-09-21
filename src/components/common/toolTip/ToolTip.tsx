import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/index";
import { clearToolTipMessage } from "../../../redux/features/toast/toastSlice";
import styles from "./toolTip.module.scss";

interface IToolTipProps {
  customClass?: string;
}

const ToolTip: FC<IToolTipProps> = ({ customClass }) => {
  const dispatch = useAppDispatch();
  const { toolTipMessage } = useAppSelector((state) => state.toast);

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(clearToolTipMessage());
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [dispatch]);

  return (
    <>
      <p className={[styles.iconTooltipText, customClass].join(" ")}>
        {toolTipMessage}
      </p>
    </>
  );
};

export default ToolTip;

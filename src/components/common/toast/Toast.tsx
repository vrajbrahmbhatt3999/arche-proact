import { FC, useEffect, useState, ReactElement } from "react";
import { CloseIcon } from "../svg-components";
import styles from "./toast.module.scss";
import { useAppDispatch } from "../../../hooks/index";
import { clearMessage } from "../../../redux/features/toast/toastSlice";
import { IToastType } from "../../../interfaces/interfaces";

interface IToastProps {
  type: IToastType;
  message: string;
}

const Toast: FC<IToastProps> = ({ type, message }) => {
  const [toast, setToast] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  const handleToast = () => {
    setToast(!toast);
    dispatch(clearMessage());
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setToast(false);
      dispatch(clearMessage());
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [dispatch]);

  return (
    // <div className={toast ? styles.notificationShow : styles.notificationHide}>
    <section className={styles.notificationShow}>
      <div className={styles.notification}>
        <div className={styles.notificationHeader}>
          <div className={styles.title}>
            <span className={styles.image}>{type.icon}</span>
            <p className={styles.notificationTitle}>{message}</p>
          </div>
          <CloseIcon
            fillColor={type.crossColor}
            handleClick={() => handleToast()}
          />
        </div>
      </div>
    </section>
  );
};

export default Toast;

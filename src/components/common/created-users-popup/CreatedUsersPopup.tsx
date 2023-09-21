import { FC } from "react";
import styles from "./createdUsersPopup.module.scss";
import { CloseIcon } from "../svg-components/index";
import { colors } from "../../../constants/color";
import Divider from "../divider/Divider";

const CreatedUsersPopup: FC = () => {
  return (
    <>
      <div className={styles.popupContainer}>
        <CloseIcon
          customClass={styles.closeIconStyle}
          fillColor={colors.green1}
        />
        <div className={styles.usersContainer}>
          <p className={styles.title}>Created Users</p>
          <Divider customClass={styles.dividerStyle} />
          <p className={styles.subTitle}>USERS NAME</p>
          <div className={styles.usersList}>
            <p className={styles.userName}>Gabriel Ferris</p>
            <p className={styles.userName}>Ella Roy</p>
            <p className={styles.userName}>Marilyn Dennis</p>
            <p className={styles.userName}>Calvin Curry</p>
            <p className={styles.userName}>Jennifer Adams</p>
            <p className={styles.userName}>Gabriel Ferris</p>
            <p className={styles.userName}>Ella Roy</p>
            <p className={styles.userName}>Marilyn Dennis</p>
            <p className={styles.userName}>Calvin Curry</p>
            <p className={styles.userName}>Jennifer Adams</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatedUsersPopup;

import { FC, useCallback, useState } from "react";
import { ReloadIcon } from "../../common/svg-components/index";
import moment from "moment";
import styles from "./reloadButton.module.scss";

interface IReloadButton {
  customClass?: string;
  handleClick?: (e?: React.MouseEvent<HTMLElement>) => void;
  reoladDate?: any;
}
const ReloadButton: FC<IReloadButton> = ({
  customClass,
  handleClick,
  reoladDate,
}) => {
  const formatedRefreshDate = moment(reoladDate).format("hh:mm:ss a");
  return (
    <>
      <div
        className={[styles.reloadButtonSection, customClass ?? ""].join(" ")}
      >
        <button
          className={styles.reloadButton}
          onClick={handleClick && handleClick}
        >
          <ReloadIcon />
        </button>
        <p className={styles.reloadButtonText}>
          Last Refresh on {formatedRefreshDate}
        </p>
      </div>
    </>
  );
};

export default ReloadButton;

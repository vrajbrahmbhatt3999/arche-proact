import { FC } from "react";
import { colors } from "../../../../../constants/color";
import Button from "../../../button/Button";
import Divider from "../../../divider/Divider";
import { CloseIcon } from "../../../svg-components";
import styles from "./statusConfirmationPopupV2.module.scss";

interface IStatusConfirmationModalProps {
  message?: string;
  handleClose?: (e?: React.MouseEvent<HTMLElement>) => void;
  handleSubmit?: (e?: React.MouseEvent<HTMLElement>) => void;
}

const StatusConfirmationPopupV2: FC<IStatusConfirmationModalProps> = ({
  message,
  handleClose,
  handleSubmit,
}) => {
  return (
    <>
      <div
        className={styles.popupContainer}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <CloseIcon
          customClass={styles.closeIconStyle}
          fillColor={colors.green1}
          handleClick={() => {
            handleClose && handleClose();
          }}
        />
        <div className={styles.statusContainer}>
          <p className={styles.title}>Status</p>
          <Divider customClass={styles.dividerStyle} />
          <p className={styles.userText}>{message}</p>
          <div className={styles.btnContainer}>
            <Button
              title="Yes"
              customClass={styles.btnStyle}
              handleClick={() => {
                handleSubmit && handleSubmit();
              }}
            />
            <Button
              title="No"
              customClass={styles.yesButton}
              handleClick={() => {
                handleClose && handleClose();
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default StatusConfirmationPopupV2;

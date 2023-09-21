import { FC } from "react";
import styles from "./confirmationPopup.module.scss";
import { CloseIcon } from "../../svg-components";
import Divider from "../../divider/Divider";
import Button from "../../button/Button";
import { colors } from "../../../../constants/color";

interface IConfirmationPopup {
  popupTitle?: any;
  popupSubTitle?: any;
  handleClose?: any;
  setModelOpenClose?: any;
  handleYes: any;
}

const ConfirmationPopup: FC<IConfirmationPopup> = ({
  popupTitle,
  popupSubTitle,
  handleClose,
  setModelOpenClose,
  handleYes,
}) => {
  return (
    <>
      <div
        className={styles.notesPopupContainer}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <CloseIcon
          customClass={styles.closeIconStyle}
          fillColor={colors.green1}
          handleClick={handleClose}
        />
        <div className={styles.notesContainer}>
          <p className={styles.title}>{popupTitle}</p>
          <Divider customClass={styles.dividerStyle} />
          <p className={styles.popupSubTitle}>{popupSubTitle}</p>
          <div className={styles.btnContainer}>
            <Button
              title="Yes"
              customClass={styles.yesButtonStyle}
              handleClick={handleYes}
            />
            <Button
              title="No"
              customClass={styles.noButtonStyle}
              handleClick={() => setModelOpenClose(false)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmationPopup;

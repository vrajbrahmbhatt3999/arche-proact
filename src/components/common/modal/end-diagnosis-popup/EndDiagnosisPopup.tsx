import { FC } from "react";
import styles from "./endDiagnosisPopup.module.scss";
import Divider from "../../divider/Divider";
import { CloseIcon } from "../../svg-components";
import { colors } from "../../../../constants/color";
import Button from "../../button/Button";

interface IDeleteMedication {
  handleClose?: any;
  handleYes?: any;
  handleNo?: any;
}

const EndDiagnosisPopup: FC<IDeleteMedication> = ({
  handleClose,
  handleYes,
  handleNo,
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
          <p className={styles.title}>End Diagnosis</p>
          <Divider customClass={styles.dividerStyle} />
          <p className={styles.deleteText}>
            Are you sure you want to End Diagnosis ?
          </p>
          <div className={styles.btnContainer}>
            <Button
              title="Yes"
              customClass={styles.yesButtonStyle}
              handleClick={handleYes}
            />
            <Button
              title="No"
              customClass={styles.noButtonStyle}
              handleClick={handleNo}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default EndDiagnosisPopup;

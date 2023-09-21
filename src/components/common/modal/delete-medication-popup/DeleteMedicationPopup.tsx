import { FC } from "react";
import styles from "./deleteMedicationPopup.module.scss";
import Divider from "../../divider/Divider";
import { CloseIcon } from "../../svg-components";
import { colors } from "../../../../constants/color";
import Button from "../../button/Button";

interface IDeleteMedication {
  handleClose?: any;
  handleYes?: any;
  handleNo?: any;
}

const DeleteMedicationPopup: FC<IDeleteMedication> = ({
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
          <p className={styles.title}>Delete</p>
          <Divider customClass={styles.dividerStyle} />
          <p className={styles.deleteText}>Are you sure you want to Delete ?</p>
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

export default DeleteMedicationPopup;

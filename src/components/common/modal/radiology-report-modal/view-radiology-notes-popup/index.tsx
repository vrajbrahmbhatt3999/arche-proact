import { FC } from "react";
import { CloseIcon } from "../../../svg-components";
import Divider from "../../../divider/Divider";
import { colors } from "../../../../../constants/color";
import styles from "./addresultsnotesPopup.module.scss";

interface IPropsData {
  handleClose?: any;
  popData?: any;
}
const ViewLRadiologyReportNotes: FC<IPropsData> = ({ handleClose, popData }) => {
  return (
    <div
      className={styles.addResultsNotesPopupContainer}
      onClick={(e) => e.stopPropagation()}
    >
      <CloseIcon
        customClass={styles.closeIconStyle}
        fillColor={colors.green1}
        handleClick={() => handleClose()}
      />
      <div className={styles.addResultsNotesContainer}>
        <p className={styles.title}>Notes</p>
        <Divider customClass={styles.dividerStyle} />

        <div className={styles.notesData}>
          {popData?.test_notes?.length
            ? popData?.test_notes
            : "No Notes Found"}
        </div>
      </div>
    </div>
  );
};

export default ViewLRadiologyReportNotes;

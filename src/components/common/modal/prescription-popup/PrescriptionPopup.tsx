import { FC } from "react";
import { colors } from "../../../../constants/color";
import Divider from "../../divider/Divider";
import { CloseIcon } from "../../svg-components";
import styles from "./prescriptionPopup.module.scss";

interface IPropsData {
  popData?: any;
}
const PrescriptionPopup: FC<IPropsData> = ({ popData }) => {
  console.log();

  return (
    <>
      <div className={styles.notesPopupContainer}>
        <CloseIcon
          customClass={styles.closeIconStyle}
          fillColor={colors.green1}
        />
        <div className={styles.notesContainer}>
          <p className={styles.title}>
            {!popData?.insurance_company_id ? "Prescription" : "Remarks"}
          </p>
          <Divider customClass={styles.dividerStyle} />
          <p className={styles.descriptionText}>{popData?.remarks}</p>
        </div>
      </div>
    </>
  );
};

export default PrescriptionPopup;

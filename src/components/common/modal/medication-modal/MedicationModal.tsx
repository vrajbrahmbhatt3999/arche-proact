import { FC } from "react";
import TableV2 from "../../../../components/common/table/tableV2/TableV2";
import { CloseIcon } from "../../svg-components";
import { colors } from "../../../../constants/color";
import styles from "./medicationModal.module.scss";

interface IMedicationModal {
  handleClose: (e?: React.MouseEvent<HTMLElement>) => void;
  popData: any;
  heading: string;
  headerData: any;
}

const MedicationModal: FC<IMedicationModal> = ({
  handleClose,
  popData,
  heading,
  headerData,
}) => {
  return (
    <>
      <div
        className={styles.medicationModalContainer}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <CloseIcon
          customClass={styles.closeIconStyle}
          fillColor={colors.green1}
          handleClick={() => {
            handleClose();
          }}
        />
        <h1 className={styles.medicationModalHeading}>{heading}</h1>
        <hr className={styles.medicationModalModalDivider} />
        <div className={styles.medicationContainer}>
          <div className={styles.medicationModalDateContainer}>
            <p className={styles.medicationModalDateTitle}>Date</p>{" "}
            <p className={styles.medicationModalDate}>
              {popData?.diag_apt_date}
            </p>
          </div>
          <div className={styles.medicationTableContainer}>
            <TableV2
              tableHeaderData={headerData}
              tableRowData={popData?.diag_medicine_prescription}
              active={false}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MedicationModal;

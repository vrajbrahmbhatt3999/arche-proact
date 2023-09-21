import { FC } from "react";
import styles from "./viewreportmodal.module.scss";
import { CloseIcon } from "../../../svg-components";
import { colors } from "../../../../../constants/color";
import TableV2 from "../../../table/tableV2/TableV2";
import { ViewRadiologyReportData } from "./addResultTableData";

interface IPropsData {
  handleClose?: () => void;
  popData?: any;
  handleOpen?: any;
}
const ViewRadiologyReportModal: FC<IPropsData> = ({
  handleClose,
  popData,
  handleOpen,
}) => {
  return (
    <>
      <div
        className={styles.addResultsPopupContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <CloseIcon
          customClass={styles.closeIconStyle}
          fillColor={colors.green1}
          handleClick={handleClose}
        />
        <p className={styles.resultsTitle}>
          Job ID <span className={styles.resultsId}>{popData?.job_no}</span>
        </p>

        <div className={styles.tableContainer}>
          <TableV2
            tableHeaderData={ViewRadiologyReportData}
            tableRowData={popData?.profile}
            active={false}
            handleClick={popData}
            handleRowClick={handleOpen}
          />
        </div>
      </div>
    </>
  );
};

export default ViewRadiologyReportModal;

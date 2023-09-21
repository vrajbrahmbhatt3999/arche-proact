import { FC } from "react";
import TableV2 from "../../../../components/common/table/tableV2/TableV2";
import { colors } from "../../../../constants/color";
import styles from "./style.module.scss";
import { CloseIcon } from "../../../../components/common/svg-components";

interface IProfileTestModal {
  handleClose: (e?: React.MouseEvent<HTMLElement>) => void;
  popData: any;
  heading: string;
  headerData: any;
  handleOpen?: any;
}

const ViewJobsTestModal: FC<IProfileTestModal> = ({
  handleClose,
  popData,
  heading,
  headerData,
  handleOpen,
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
          <div className={styles.medicationTableContainer}>
            <TableV2
              tableHeaderData={headerData}
              tableRowData={popData?.profile}
              active={false}
              handleClick={popData}
              handleRowClick={handleOpen}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewJobsTestModal;

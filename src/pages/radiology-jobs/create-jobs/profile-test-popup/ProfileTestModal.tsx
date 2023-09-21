import { FC } from "react";
import TableV2 from "../../../../components/common/table/tableV2/TableV2";
import { colors } from "../../../../constants/color";
import styles from "./profileTestModal.module.scss";
import { CloseIcon } from "../../../../components/common/svg-components";

interface IProfileTestModal {
  handleClose: (e?: React.MouseEvent<HTMLElement>) => void;
  popData: any;
  heading: string;
  headerData: any;
}

const ProfileTestModal: FC<IProfileTestModal> = ({
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
          <div className={styles.medicationTableContainer}>
            <TableV2
              tableHeaderData={headerData}
              tableRowData={popData}
              active={false}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileTestModal;

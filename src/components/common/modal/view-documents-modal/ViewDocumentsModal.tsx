import { FC } from "react";
import TableV2 from "../../../../components/common/table/tableV2/TableV2";
import { CloseIcon } from "../../svg-components";
import { colors } from "../../../../constants/color";
import styles from "./viewDocumentsModual.module.scss";

interface IViewDocumentsModal {
  handleClose: (e?: React.MouseEvent<HTMLElement>) => void;
  popData: any;
  heading: string;
  headerData: any;
  handleOpen: any;
}

const ViewDocumentsModal: FC<IViewDocumentsModal> = ({
  handleClose,
  popData,
  heading,
  headerData,
  handleOpen,
}) => {
  return (
    <>
      <div
        className={styles.viewDocumentsModalContainer}
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
        <h1 className={styles.viewDocumentsModalHeading}>{heading}</h1>
        <hr className={styles.viewDocumentsModalModalDivider} />
        <div className={styles.viewDocumentsContainer}>
          <div className={styles.viewDocumentsModalDateContainer}>
            <p className={styles.viewDocumentsModalDateTitle}>Date</p>{" "}
            <p className={styles.viewDocumentsModalDate}>
              {popData?.diag_apt_date}
            </p>
          </div>
          <div className={styles.viewDocumentsTableContainer}>
            <TableV2
              tableHeaderData={headerData}
              tableRowData={popData?.docs_list}
              active={false}
              customClassForTd={styles.viewDocumentsTableColumn}
              customClassForTh={styles.viewDocumentsTableColumnHead}
              handleClick={handleOpen}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewDocumentsModal;

import { FC } from "react";
import { CloseIcon } from "../../svg-components";
import Divider from "../../divider/Divider";
import { colors } from "../../../../constants/color";
import styles from "./moreDetailsPopup.module.scss";
import TableV2 from "../../table/tableV2/TableV2";
import {
  moreDetailsHeaderData,
  moreDetailsTable,
} from "../../../../constants/table-data/moreDetailsPopupData";

interface IMoreDetailsPopup {
  handleClose?: any;
}

const MoreDetailsPopup: FC<IMoreDetailsPopup> = ({ handleClose }) => {
  return (
    <>
      <div className={styles.notesPopupContainer}>
        <CloseIcon
          customClass={styles.closeIconStyle}
          fillColor={colors.green1}
          handleClick={() => handleClose()}
        />
        <div className={styles.notesContainer}>
          <p className={styles.title}>More Details</p>
          <Divider customClass={styles.dividerStyle} />
          <div className={styles.table}>
            <TableV2
              tableHeaderData={moreDetailsHeaderData}
              tableRowData={moreDetailsTable}
              active={false}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MoreDetailsPopup;

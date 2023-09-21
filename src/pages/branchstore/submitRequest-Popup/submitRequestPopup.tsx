import { FC } from "react";
import styles from "./submitRequest.module.scss";
import Divider from "../../../components/common/divider/Divider";
import Search from "../../../components/common/search/Search";
import { colors } from "../../../constants/color";
import { CloseIcon } from "../../../components/common/svg-components";
interface ISubmitRequestPopup {
  popData?: any;
  handleClose?: any;
}

const SubmitRequest: FC<ISubmitRequestPopup> = ({ popData, handleClose }) => {
  return (
    <>
      <div
        className={styles.branchStoreRequestItemPopupMainContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <CloseIcon
          customClass={styles.closeIconStyle}
          fillColor={colors.green1}
          handleClick={() => handleClose()}
        />
        <div className={styles.paymentContainer}>
          <p className={styles.title}>Submit Request</p>
          <Divider customClass={styles.dividerStyle} />
        </div>

        <div className={styles.content}>
          <h1 className={styles.docId}>
            Doc ID :{" "}
            <span className={styles.docIdValue}> {popData?.doc_id}</span>
          </h1>
        </div>
      </div>
    </>
  );
};

export default SubmitRequest;

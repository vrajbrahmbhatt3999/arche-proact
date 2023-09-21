import { FC } from "react";
import styles from "./submitPopup.module.scss";
import Divider from "../../../components/common/divider/Divider";
import { colors } from "../../../constants/color";
import { CloseIcon } from "../../../components/common/svg-components";
interface ISubmitAllPopup {
  handleClose?: any;
  popData?: any;
}

const SubmitAllTablePopup: FC<ISubmitAllPopup> = ({ handleClose, popData }) => {
  return (
    <>
      <div
        className={styles.mainStoreRequestItemPopupMainContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <CloseIcon
          customClass={styles.closeIconStyle}
          fillColor={colors.green1}
          handleClick={() => handleClose()}
        />
        <div className={styles.paymentContainer}>
          <p className={styles.title}> Request Submitted</p>
          <Divider customClass={styles.dividerStyle} />
        </div>

        <div className={styles.content}>
          <h1 className={styles.docId}>
            Doc ID : <span className={styles.docIdValue}>{popData}</span>
          </h1>
        </div>
      </div>
    </>
  );
};

export default SubmitAllTablePopup;

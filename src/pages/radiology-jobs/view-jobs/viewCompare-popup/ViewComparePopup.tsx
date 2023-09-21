import { FC } from "react";
import { colors } from "../../../../constants/color";
import Divider from "../../../../components/common/divider/Divider";
import { CloseIcon } from "../../../../components/common/svg-components/index";
import styles from "./viewcomparePopup.module.scss";

interface IPropsData {
  handleClose?: any;
}
const ViewComparePopup: FC<IPropsData> = ({ handleClose }) => {
  return (
    <>
      <div
        className={styles.viewComparePopupContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <CloseIcon
          customClass={styles.closeIconStyle}
          fillColor={colors.green1}
          handleClick={() => handleClose()}
        />
        <div className={styles.viewCompareContainer}>
          <p className={styles.title}>View Compare</p>
          <Divider customClass={styles.dividerStyle} />
          <p className={styles.discriptionText}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum vero reiciendis modi, consequatur cum accusamus totam porro excepturi tempore? Distinctio impedit adipisci iure inventoremolestias accusantium ipsam.</p>
        </div>
      </div>
    </>
  );
};

export default ViewComparePopup;

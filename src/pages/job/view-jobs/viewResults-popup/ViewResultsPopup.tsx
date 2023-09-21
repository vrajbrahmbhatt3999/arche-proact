import { FC } from "react";
import { colors } from "../../../../constants/color";
import Divider from "../../../../components/common/divider/Divider";
import { CloseIcon } from "../../../../components/common/svg-components/index";
import styles from "./viewresultsPopup.module.scss";

interface IPropsData {
  handleClose?:any
}
const ViewResultsPopup: FC<IPropsData> = ({ handleClose }) => {
  return (
      <div className={styles.viewResultsPopupContainer} onClick={(e)=>e.stopPropagation()}>
        <CloseIcon
          customClass={styles.closeIconStyle}
          fillColor={colors.green1}
          handleClick={()=>handleClose()}
        />
        <div className={styles.viewResultsContainer}>
          <p className={styles.title}>View Reports</p>
          <Divider customClass={styles.dividerStyle} />
          <div className={styles.viewResultsNotesInfo}>
          <p className={styles.descriptionText}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum ex rem quas omnis, maxime ullam iure reprehenderit illo quasi eaque libero ab, impedit magnam eos? Beatae aspernatur numquam tempora! Unde.
          </p>
          </div>
        </div>
      </div>
  );
};

export default ViewResultsPopup;

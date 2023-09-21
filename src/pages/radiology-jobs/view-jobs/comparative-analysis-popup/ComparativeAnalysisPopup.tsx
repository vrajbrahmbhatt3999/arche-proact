import { FC } from "react";
import { CloseIcon } from "../../../../components/common/svg-components";
import { colors } from "../../../../constants/color";
import styles from "./comparativeAnalysisPopup.module.scss";
import wbcImage from "../../../../assets/images/wbcImage.png";
import rbcImage from "../../../../assets/images/rbcImage.png";

interface IComparativeAnalysisProps {
  handleChildClick: () => void;
}

const ComparativeAnalysisPopup: FC<IComparativeAnalysisProps> = (props) => {
  const handleComparativeAnalysisCloce = () => {
    props.handleChildClick();
  };

  return (
      <div
        className={styles.comparativeAnalysisPopupContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <div onClick={() => handleComparativeAnalysisCloce()}>
          <CloseIcon
            customClass={styles.closeIconStyle}
            fillColor={colors.green1}
          />
        </div>

        <div className={styles.comparativeContainer}>
          <div className={styles.comparativeData}>
            <h3 className={styles.comparativeHeading}>WBC</h3>
            <img
              src={wbcImage}
              className={styles.ImageStyle}
              alt="wbc reports"
            />
          </div>
          <div className={styles.comparativeData}>
            <h3 className={styles.comparativeHeading}>RBC</h3>
            <img
              src={rbcImage}
              className={styles.ImageStyle}
              alt="rbc reports"
            />
          </div>
        </div>
      </div>
  );
};
export default ComparativeAnalysisPopup;

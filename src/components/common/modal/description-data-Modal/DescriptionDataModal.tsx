import { FC } from "react";
import { CloseIcon } from "../../svg-components";
import { colors } from "../../../../constants/color";
import styles from "./descriptionDataModal.module.scss";
import Divider from "../../divider/Divider";

interface IDescriptionDataModalProps {
  heading?: string;
  message?: string;
  handleClose?: any;
  popData?: string | any;
}

const DescriptionDataModal: FC<IDescriptionDataModalProps> = ({
  heading,
  message,
  handleClose,
  popData,
}) => {
  console.log("popData>>>>>>>>>", popData);
  return (
    // <div
    //   className={styles.descrtiptionModalContainer}
    //   onClick={(e) => {
    //     e.stopPropagation();
    //   }}
    // >
    //   <CloseIcon
    //     customClass={styles.closeIconStyle}
    //     fillColor={colors.green1}
    //     handleClick={() => {
    //       handleClose && handleClose();
    //     }}
    //   />
    //   <h1 className={styles.descriptionModalHeading}>{heading}</h1>
    //   <hr className={styles.descriptionDivider} />
    //   <p className={styles.descriptionText}>{message}</p>
    //   {popData?.noteDetail?.length > 0 && (
    //     <div className={styles.notesDetailContainer}>
    //       <p className={styles.notesDetailText}>{popData?.noteDetail}</p>
    //     </div>
    //   )}
    // </div>
    <div className={styles.mainContainer}>
      <CloseIcon
        customClass={styles.closeIconStyle}
        fillColor={colors.green1}
      />
      <div
        className={styles.addCategoryContainer}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <p className={styles.title}>{heading}</p>
        <Divider customClass={styles.dividerStyle} />
        <div className={styles.mcUpdatecontainer}>
          <div className={styles.updatenewscontainer}>
            <p className={styles.description}>{popData?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DescriptionDataModal;

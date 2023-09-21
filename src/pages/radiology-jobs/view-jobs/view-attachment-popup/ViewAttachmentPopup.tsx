import { FC } from "react";
import { colors } from "../../../../constants/color";
import { CloseIcon } from "../../../../components/common/svg-components/index";
import styles from "./viewAttachment.module.scss";
import Divider from "../../../../components/common/divider/Divider";
import { useAppSelector } from "../../../../hooks";
import Loader from "../../../../components/common/spinner/Loader";
interface IPropsData {
  handleClose?: any;
}
const ViewAttachmentPopup: FC<IPropsData> = ({
  handleClose,
}) => {
  const { isLoading, LoadFiles } = useAppSelector((state) => state.radiologyJobs);
  
  return (
    <>
    {isLoading && <Loader />}
    <div
      className={styles.viewAttachmentPopupContainer}
      onClick={(e) => e.stopPropagation()}
    >
      <CloseIcon
        customClass={styles.closeIconStyle}
        fillColor={colors.green1}
        handleClick={() => handleClose()}
      />
      <div className={styles.viewAttachmentContainer}>
        <p className={styles.title}>Attachment</p>
        <Divider customClass={styles.dividerStyle} />
        <img src={LoadFiles && LoadFiles.length && LoadFiles?.[0]} alt="" style={{margin: 'auto'}} />
      </div>
    </div>
    </>
  );
};

export default ViewAttachmentPopup;

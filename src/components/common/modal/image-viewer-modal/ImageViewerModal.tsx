import React, { FC } from "react";
import { CloseIcon } from "../../svg-components";
import { colors } from "../../../../constants/color";
import styles from "./imageViewerModal.module.scss";

interface IImageViewerModal {
  handleClose: (e?: React.MouseEvent<HTMLElement>) => void;
  popData: any;
}

const ImageViewerModal: FC<IImageViewerModal> = ({ handleClose, popData }) => {
  return (
    <>
      <div
        className={styles.imageViewerModalContainer}
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
        <img className={styles.imageViwerStyle} src={popData} alt="view_img" />
      </div>
    </>
  );
};

export default ImageViewerModal;

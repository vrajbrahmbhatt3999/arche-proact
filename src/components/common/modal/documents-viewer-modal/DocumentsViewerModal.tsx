import React, { FC, useRef } from "react";
import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";
import {
  ZoomInICon,
  ZoomOutIcon,
  ResetImageIcon,
  CloseIcon,
} from "../../svg-components";
import { colors } from "../../../../constants/color";
import styles from "./documentsViewerModal.module.scss";

interface IDocumentsViewerModal {
  handleClose: (e?: React.MouseEvent<HTMLElement>) => void;
  popData: any;
}

const DocumentsViewerModal: FC<IDocumentsViewerModal> = ({
  handleClose,
  popData,
}) => {
  const transformComponentRef = useRef<ReactZoomPanPinchRef | null>(null);
  const documentsType = popData
    ?.substring(popData?.indexOf(":") + 1, popData?.indexOf(";"))
    .split("/")?.[1];
  console.log("popData :>> ", popData);
  console.log("documentsType :>> ", documentsType);
  return (
    <>
      <div
        className={styles.documentViewerModalContainer}
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
        {documentsType === "pdf" ? (
          <iframe
            className={styles.documentViwerStyle}
            src={popData}
            title="document_pdf"
          />
        ) : (
          <TransformWrapper
            ref={transformComponentRef}
            initialScale={1}
            disablePadding={true}
            wheel={{ wheelDisabled: true }}
            doubleClick={{ disabled: true }}
          >
            {(utils) => (
              <React.Fragment>
                <TransformComponent wrapperClass={styles.zoomImageWrapper}>
                  <img
                    className={styles.zoomImageStyle}
                    src={popData}
                    alt="zoom_img"
                  />
                </TransformComponent>
                <ImageControllar {...utils} />
              </React.Fragment>
            )}
          </TransformWrapper>
        )}
      </div>
    </>
  );
};

const ImageControllar = ({ zoomIn, zoomOut, resetTransform }: any) => (
  <div className={styles.imageControllarContainer}>
    <ZoomInICon
      customClass={styles.zoomInIconStyle}
      fillColor={colors.white1}
      handleClick={() => zoomIn()}
    />
    <ResetImageIcon
      customClass={styles.resetIconStyle}
      fillColor={colors.white1}
      handleClick={() => resetTransform()}
    />
    <ZoomOutIcon
      customClass={styles.zoomOutIconStyle}
      fillColor={colors.white1}
      handleClick={() => zoomOut()}
    />
  </div>
);

export default DocumentsViewerModal;

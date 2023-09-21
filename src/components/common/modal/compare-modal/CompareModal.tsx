import React, { FC, useEffect, useRef } from "react";
import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";
import styles from "./compareModal.module.scss";
import {
  ZoomInICon,
  ZoomOutIcon,
  ResetImageIcon,
  CloseIcon,
} from "../../svg-components";
import { colors } from "../../../../constants/color";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { requestGenerator } from "../../../../utils/payloadGenerator";
import { getCompareDocumentsById } from "../../../../redux/features/patient-history/patientHistoryAsyncActions";
import Loader from "../../spinner/Loader";
import {
  clearCompareData,
  clearDocData,
  setPatientHistoryImagesData,
  setSelectedImagesData,
} from "../../../../redux/features/patient-history/patientHistorySlice";
interface ICompareModalProps {
  handleClose: any;
  heading: string;
}

const CompareModal: FC<ICompareModalProps> = ({ handleClose, heading }) => {
  const {
    selectedDocForCompare,
    patientCompareDocumentsData,
    isLoading,
    patientHistoryAttachments,
  } = useAppSelector((state) => state.patientHistory);
  const dispatch = useAppDispatch();

  const transformComponentRef = useRef<ReactZoomPanPinchRef | null>(null);

  useEffect(() => {
    const tempArr = selectedDocForCompare?.map((item: any) => {
      return { diag_id: item?._id, img_id: item?.diag?.img_id };
    });
    const payload = {
      img_ids: tempArr,
      flag: false,
    };
    dispatch(getCompareDocumentsById(requestGenerator(payload)));
  }, [selectedDocForCompare]);

  useEffect(() => {
    return () => {
      let tempArr = patientHistoryAttachments?.map((item: any) => {
        return { ...item, status: false };
      });
      dispatch(setPatientHistoryImagesData(tempArr ?? []));
      dispatch(setSelectedImagesData([]));
    };
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      <div
        className={styles.compareModalContainer}
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
        <h1 className={styles.compareModalHeading}>{heading}</h1>
        <hr className={styles.compareModalDivider} />
        {patientCompareDocumentsData?.length > 0 && (
          <div className={styles.compareImagesContainer}>
            {patientCompareDocumentsData?.map((item: any, index: number) => {
              return (
                <div
                  className={styles.zoomCompareImageContainer}
                  key={`${index}-img`}
                >
                  <TransformWrapper
                    ref={transformComponentRef}
                    initialScale={1}
                    disablePadding={true}
                    wheel={{ wheelDisabled: true }}
                    doubleClick={{ disabled: true }}
                  >
                    {(utils) => (
                      <React.Fragment>
                        <TransformComponent
                          wrapperClass={styles.zoomImageWrapper}
                        >
                          <img
                            src={item}
                            alt="img3"
                            className={styles.zoomImageStyle}
                          />
                        </TransformComponent>
                        <ImageControllar {...utils} />
                      </React.Fragment>
                    )}
                  </TransformWrapper>
                </div>
              );
            })}
          </div>
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
export default CompareModal;

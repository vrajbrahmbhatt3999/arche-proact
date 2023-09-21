import React, { FC, useEffect, useRef, useState } from "react";
import styles from "./scribeDialog.module.scss";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { useForm, useController, Controller } from "react-hook-form";
import { components } from "react-select";
import { useDispatch } from "react-redux";
import {
  AddButtonIcon,
  CloseIcon,
  DropDownArrowIcon,
  DropDownIcon,
  Error,
  EyeIcon,
  Warning,
  ZoomInICon,
  ZoomOutIcon,
} from "../../../../components/common/svg-components";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import {
  deleteNewTreatmentPlanDialogTableDataById,
  getNewTreatmentPlanDialogTableDataPriceAndDiscountDetails,
  getTreatmentPlanTableData,
} from "../../../../redux/features/treatmentPlans/treatmentPlansSlice";
import { colors } from "../../../../constants/color";
import Divider from "../../../../components/common/divider/Divider";
import { searchableSelectStyle, uniqueID } from "../../../../utils/utils";
import { newTreatmentPlansTableHeaderData } from "../../../../constants/data";
import TableV2 from "../../../../components/common/table/tableV2/TableV2";
import Button from "../../../../components/common/button/Button";
import {
  createCustomTreatmentPlan,
  createTreatmentPlan,
  getAllTreatmentPlans,
  getAllTreatmentServices,
} from "../../../../redux/features/treatmentPlans/treatmentPlansAsyncActions";
import { requestGenerator } from "../../../../utils/payloadGenerator";
import Popup from "../../../../components/common/popup/Popup";
import Toast from "../../../../components/common/toast/Toast";
// import DrawingBoardReact from "react-drawing-board";
import { addScribeData } from "../../../../redux/features/dentist-diagnosis/dentistDiagnosisSlice";
import { doctorDiagnosisValidators } from "../../../../form-validators/doctorDiagnosisValidators";
import { CATEGORY_LABEL_NAME } from "../../../../constants/constant";
import { ReactZoomPanPinchRef, TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

interface IScribeImageAndNotesPreviewDialog {
  handleClose?: any;
  popData?:any
}

const ScribeImageAndNotesPreviewDialog: FC<IScribeImageAndNotesPreviewDialog> = ({ handleClose, popData }) => {
  /* Dependency to navigate between pages */
  const navigate = useNavigate();
  /* Dependency to navigate between pages */

  /* Dependency to dispatch an action */
  const dispatch = useAppDispatch();
  /* Dependency to dispatch an action */

  const { userData } = useAppSelector((state) => state.login);

  /* Form submission dependencies */
  const { control, handleSubmit, formState, register, reset, watch, setValue, trigger } =
    useForm({
      mode: "all",
    });
  const { errors, dirtyFields, isDirty, isValid, } = formState;
  const form = watch();
  /* Form submission dependencies */

  const transformComponentRef = useRef<ReactZoomPanPinchRef | null>(null);
  console.log(popData,'popData')

  return (
    <>
      {/* Scribe Images and Notes Preview Dialog */}
      <div
        className={styles.imageZoomInOutModalContainer}
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
        <TransformWrapper
          ref={transformComponentRef}
          initialScale={1}
          disablePadding={true}
          wheel={{ wheelDisabled: true }}
          doubleClick={{ disabled: true }}
        >
          {(utils) => (
            <React.Fragment>
              <ImageControllar {...utils} />
              <TransformComponent wrapperClass={styles.zoomImageWrapper}>
                <img
                  className={styles.zoomImageStyle}
                  alt="zoom_img"
                  src={popData?.imageUrl}
                />
              </TransformComponent>
            </React.Fragment>
          )}
        </TransformWrapper>
      </div>
      {/* Scribe Images and Notes Preview Dialog */}
    </>
  );
};
export default ScribeImageAndNotesPreviewDialog;

const ImageControllar = ({ zoomIn, zoomOut }: any) => (
  <div className={styles.imageControllarContainer}>
    <ZoomInICon
      customClass={styles.zoomInIconStyle}
      fillColor={colors.black1}
      handleClick={() => zoomIn()}
    />
    <ZoomOutIcon
      customClass={styles.zoomOutIconStyle}
      fillColor={colors.black1}
      handleClick={() => zoomOut()}
    />
  </div>
);

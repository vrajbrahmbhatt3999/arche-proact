import React, { FC } from "react";
import styles from "./ApprovalNummodal.module.scss";
import Divider from "../../divider/Divider";
import { CloseIcon } from "../../svg-components";
import { colors } from "../../../../constants/color";
import Button from "../../button/Button";
import { APPROVAL_NUM } from "../../../../constants/constant";
import { approvalNumValidators } from "../../../../form-validators/approvalNumValidators";
import { IApprovalNum } from "../../../../interfaces/interfaces";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../../../hooks";
import { approvalNumber } from "../../../../redux/features/lab-invoice/labInvoiceSlice";

interface ISearchModal {
  setModelOpenClose?: any;
  handleRowClick?: any;
  handleClose?: any;
  popData: any;
  handleChildClick?: any;
}

const ApprovalNummodal: FC<ISearchModal> = ({
  setModelOpenClose,
  handleClose,
  popData,
  handleChildClick,
}) => {
  const dispatch = useAppDispatch();

  // FORM
  const {
    register,
    reset,
    handleSubmit,
    setValue,
    getValues,
    trigger,
    watch,
    formState: { errors },
  } = useForm<IApprovalNum>({});

  const onSubmit = (data: any) => {
    dispatch(approvalNumber(data));
    setModelOpenClose(false);
    handleChildClick();
  };

  console.log(popData, "popUpData");
  return (
    <>
      <div
        className={styles.mainContainer}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={styles.closeIconContainer}>
          <CloseIcon
            customClass={styles.closeIconStyle}
            fillColor={colors.green1}
            handleClick={() => handleClose()}
          />
        </div>

        <p className={styles.title}>Approval No.</p>
        <Divider customClass={styles.dividerStyle} />

        <form
          className={styles.approvalFormContainer}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={styles.approvalContainer}>
            <div className={styles.formFieldContainer}>
              <div className={styles.inputFieldContainer}>
                <label className={styles.approvalLable}>Insurance Plan:</label>
                <p className={styles.insuranceTitle}>
                  {" "}
                  {popData?.insurance_plan}
                </p>
              </div>
            </div>

            <div className={styles.formFieldContainer}>
              <div className={styles.inputFieldContainer}>
                <label className={styles.approvalLable}>Approval No.</label>
                <div>
                  <input
                    type="text"
                    className={styles.inputField}
                    {...register(
                      APPROVAL_NUM,
                      approvalNumValidators[APPROVAL_NUM]
                    )}
                  />
                  {errors[APPROVAL_NUM] && (
                    <p className="dashboardFormError">
                      {errors[APPROVAL_NUM].message as any}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.okButtonContainer}>
            <Button
              title="Ok"
              type="submit"
              customClass={styles.addInsuranceBtn}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default ApprovalNummodal;

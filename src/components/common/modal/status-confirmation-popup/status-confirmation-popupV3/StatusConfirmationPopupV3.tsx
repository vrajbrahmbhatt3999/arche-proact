import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { REASON_TEXT } from "../../../../../constants/constant";
import { ICancelForm } from "../../../../../interfaces/interfaces";
import { cancelAppointmentValidators } from "../../../../../form-validators/cancelAppointmentValidators";
import { trimValue } from "../../../../../utils/utils";
import { colors } from "../../../../../constants/color";
import Button from "../../../button/Button";
import Divider from "../../../divider/Divider";
import { CloseIcon } from "../../../svg-components";
import styles from "./statusConfirmationPopupV3.module.scss";

interface IStatusConfirmationModalProps {
  message?: string;
  heading?: string;
  handleClose?: (e?: React.MouseEvent<HTMLElement>) => void;
  handleOpen?: (e?: any) => void;
}

const StatusConfirmationPopupV3: FC<IStatusConfirmationModalProps> = ({
  message,
  heading,
  handleClose,
  handleOpen,
}) => {
  // React Hook form for the form handling
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICancelForm>({});

  // Envoke on when we submit the form
  const onSubmit: SubmitHandler<ICancelForm> = (data) => {
    handleOpen && handleOpen(data);
  };

  return (
    <>
      <div
        className={styles.popupContainer}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <CloseIcon
          customClass={styles.closeIconStyle}
          fillColor={colors.green1}
          handleClick={() => {
            handleClose && handleClose();
          }}
        />
        <div className={styles.statusContainer}>
          <p className={styles.title}>{heading}</p>
          <Divider customClass={styles.dividerStyle} />
          <p className={styles.userText}>{message}</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.formFieldRow}>
              <div className={styles.formFieldContainer}>
                <div className={styles.textAreaFieldContainer}>
                  <label htmlFor={REASON_TEXT} className={styles.formLabel}>
                    Reason
                    <span className="asterick">*</span>
                  </label>
                  <div className={styles.textAreaContainer}>
                    <textarea
                      className={styles.textArea}
                      {...register(
                        REASON_TEXT,
                        cancelAppointmentValidators[REASON_TEXT]
                      )}
                      onChange={(e) => {
                        trimValue(e);
                      }}
                      placeholder="Enter Reason"
                    />
                    {errors[REASON_TEXT] && (
                      <p className={styles.formError}>
                        {errors[REASON_TEXT].message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.btnContainer}>
              <Button
                title="Save"
                type="submit"
                customClass={styles.btnStyle}
                // handleClick={() => {
                //   handleOpen && handleOpen();
                // }}
              />
              <Button
                title="Cancel"
                customClass={styles.yesButton}
                handleClick={() => {
                  handleClose && handleClose();
                }}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default StatusConfirmationPopupV3;

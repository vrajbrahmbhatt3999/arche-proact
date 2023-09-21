import { FC } from "react";
import styles from "./styles.module.scss";
import { colors } from "../../../../constants/color";
import { CloseIcon } from "../../../../components/common/svg-components";
import Divider from "../../../../components/common/divider/Divider";
import Button from "../../../../components/common/button/Button";
import { Input } from "../../../../components/common/input/input";
import { useForm } from "react-hook-form";

interface IDeleteMedication {
  handleClose?: any;
  handleYes?: any;
  heading?: any;
  message?: any;
}

const SaveTreatmentPlans: FC<IDeleteMedication> = ({
  handleClose,
  handleYes,
  heading = "Save",
  message = "Save Treatment Plans",
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const SubmitData = (item: any) => {
    handleYes(item);
  };

  return (
    <div
      className={styles.notesPopupContainer}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <CloseIcon
        customClass={styles.closeIconStyle}
        fillColor={colors.green1}
        handleClick={handleClose}
      />
      <div className={styles.notesContainer}>
        <p className={styles.title}>{heading}</p>
        <Divider customClass={styles.dividerStyle} />
        <form action="" onSubmit={handleSubmit(SubmitData)}>
          <Input
            labelText="Name"
            placeholder="please enter name"
            requiredField={true}
            {...register("saveTreatment", { required: true })}
            showErrors={errors?.["saveTreatment"]?.type === "required"}
            errorMessage="Please enter name"
            labelClass={styles.labelContainer}
          />
          <div className={styles.btnContainer}>
            <Button
              title="Save"
              customClass={styles.yesButtonStyle}
              type="submit"
            />
            <Button
              title="Close"
              customClass={styles.noButtonStyle}
              handleClick={handleClose}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SaveTreatmentPlans;

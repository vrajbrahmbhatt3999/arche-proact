import { FC, useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CloseIcon } from "../../../../components/common/svg-components";
import { colors } from "../../../../constants/color";
import AttachFiles from "../../../../components/common/attach-files/single-file/AttachSingleFile";
import Button from "../../../../components/common/button/Button";
import { IMobileAppAppointmentForm } from "../../../../interfaces/mobileAppConfigurationInterfaces";
import { mobileAppAppointmentValidators } from "../../../../form-validators/mobileAppConfigurationValidators";
import {
  ID,
  APPOINTMENT_TYPE,
  TITLE,
  DESCRIPTION,
  PRICE,
  ICON,
  VISIBILITY,
  PRICE_VISIBILITY,
} from "../../../../constants/mobileAppConfigurationConstant";
import {
  dataURI,
  disableArrowKey,
  disableScroll,
} from "../../../../utils/utils";
import { appointmentTypeArray } from "../../../../constants/data";
import {
  getAllAppointment,
  createAppointment,
  editAppointment,
} from "../../../../redux/features/mobile_app_configuration/mobileAppConfigurationAsyncActions";
import { requestGenerator } from "../../../../utils/payloadGenerator";
import { useAppDispatch, useAppSelector } from "../../../../hooks/index";
import {
  CREATE_APPOINTMENT,
  EDIT_APPOINTMENT,
} from "../../../../constants/asyncActionsType";
import styles from "./mobileAppAppointmentModal.module.scss";

interface IAppointmentModalProps {
  handleClose: (e?: React.MouseEvent<HTMLElement>) => void;
  popData?: string | any;
}

interface FileList {
  name: string;
  data_uri: any;
}

const MobileAppAppointmentModal: FC<IAppointmentModalProps> = ({
  handleClose,
  popData,
}) => {
  const dispatch = useAppDispatch();
  const { getAllAppointPaylod } = useAppSelector(
    (state) => state.mobileAppConfig
  );

  // React Hook form for the form handling
  const {
    register,
    reset,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IMobileAppAppointmentForm>({});
  const selectIconData = watch(ICON);
  const [iconFiles, setIconFiles] = useState({ name: "", data_uri: "" });
  const fileName = selectIconData?.[0];

  // Editing set existing img
  useEffect(() => {
    if (popData?.[ID]) {
      const { icon, ...rest } = popData;
      const editResetData = { ...rest };
      setIconFiles({ name: "abc.jpg", data_uri: popData?.icon });
      reset(editResetData);
    } else {
      setValue(PRICE_VISIBILITY, true);
    }
  }, [reset, popData]);

  // convert file object to data_uri
  useEffect(() => {
    const fileList: FileList = { name: "", data_uri: "" };
    const getDataURI = async (fileName: File) => {
      try {
        const result = await dataURI(fileName);
        fileList.name = fileName.name;
        fileList.data_uri = result;
        setIconFiles(fileList);
      } catch (error) {
        console.log({ error });
      }
    };
    if (fileName) {
      getDataURI(fileName);
    }
  }, [fileName, setValue]);

  // useeffect for disable scroll
  useEffect(() => {
    disableScroll();
  }, []);

  // Envoke on when we submit the form
  const onSubmit: SubmitHandler<IMobileAppAppointmentForm> = (data) => {
    if (popData?.[ID]) {
      const { _id, name, icon, price, ...rest } = data;
      const payload = {
        id: _id,
        data: {
          ...rest,
          icon: iconFiles,
          price: Number(data?.[PRICE]),
        },
      };

      // call edit API

      dispatch(editAppointment(requestGenerator(payload))).then((e) => {
        if (e.type === `${EDIT_APPOINTMENT}/fulfilled`) {
          // reset();
          dispatch(getAllAppointment(requestGenerator(getAllAppointPaylod)));
          handleClose();
        }
      });
    } else {
      const { icon, price, ...rest } = data;
      const payload = {
        ...rest,
        icon: iconFiles,
        price: Number(data?.[PRICE]),
      };
      // call add API
      dispatch(createAppointment(requestGenerator(payload))).then((e) => {
        if (e.type === `${CREATE_APPOINTMENT}/fulfilled`) {
          // reset();
          dispatch(getAllAppointment(requestGenerator(getAllAppointPaylod)));
          handleClose();
        }
      });
    }
  };

  // Reset All form data
  const handleReset = () => {
    reset();
    setIconFiles({ name: "", data_uri: "" });
  };

  // Function For Trim Input Field Data
  const handleChange = (e: any) => {
    const value = e.target.value;
    if (value.length === 1 && value === " ") {
      e.target.value = "";
    } else if (
      value.length > 1 &&
      value[0] === " " &&
      value[value.length - 1] === " "
    ) {
      e.target.value = value.trim();
    }
  };

  return (
    <div
      className={styles.appointmentModalContainer}
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
      <h1 className={styles.appointmentModalHeading}>
        {popData?.[ID] ? "Edit Appointment Type" : "Add Appointment Type"}
      </h1>
      <hr className={styles.appointmentDivider} />
      <form
        className={styles.addAppointMentForm}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={styles.formFieldColumn}>
          <div className={styles.formFieldContainer}>
            <div className={styles.inputFieldContainer}>
              <label htmlFor={APPOINTMENT_TYPE} className={styles.formLabel}>
                Type
                <span className="asterick">*</span>
              </label>
              <select
                className={styles.inputField}
                {...register(
                  APPOINTMENT_TYPE,
                  mobileAppAppointmentValidators[APPOINTMENT_TYPE]
                )}
              >
                <option value="">Select Type</option>
                {appointmentTypeArray?.map((appointmentType, index) => (
                  <option value={appointmentType} key={index}>
                    {appointmentType}
                  </option>
                ))}
              </select>
              <div className={styles.checkboxContainerBlank}></div>
            </div>

            {errors[APPOINTMENT_TYPE] && (
              <p className={styles.formError}>
                {errors[APPOINTMENT_TYPE].message}
              </p>
            )}
          </div>
          <div className={styles.formFieldContainer}>
            <div className={styles.inputFieldContainer}>
              <label htmlFor={TITLE} className={styles.formLabel}>
                Title
                <span className="asterick">*</span>
              </label>
              <input
                type="text"
                className={styles.inputField}
                {...register(TITLE, mobileAppAppointmentValidators[TITLE])}
                onChange={(e) => {
                  handleChange(e);
                }}
                placeholder="Enter Title"
              />
              <div className={styles.checkboxContainerBlank}></div>
            </div>

            {errors[TITLE] && (
              <p className={styles.formError}>{errors[TITLE].message}</p>
            )}
          </div>
          <div className={styles.formFieldContainer}>
            <div className={styles.inputFieldContainer}>
              <label htmlFor={DESCRIPTION} className={styles.formLabel}>
                Description
                <span className="asterick">*</span>
              </label>
              <textarea
                className={styles.textArea}
                {...register(
                  DESCRIPTION,
                  mobileAppAppointmentValidators[DESCRIPTION]
                )}
                onChange={(e) => {
                  handleChange(e);
                }}
                placeholder="Enter Description"
              />
              <div className={styles.checkboxContainerBlank}></div>
            </div>
            {errors[DESCRIPTION] && (
              <p className={styles.formError}>{errors[DESCRIPTION].message}</p>
            )}
          </div>
          <div className={styles.formFieldContainer}>
            <div className={styles.inputFieldContainer}>
              <label htmlFor={PRICE} className={styles.formLabel}>
                Price Listing
                <span className="asterick">*</span>
              </label>
              <input
                type="number"
                className={styles.inputField}
                {...register(PRICE, mobileAppAppointmentValidators[PRICE])}
                onChange={(e) => {
                  handleChange(e);
                }}
                placeholder="Enter Price Listing"
                onKeyDown={(e: any) => disableArrowKey(e)}
              />
              <label className={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  className={styles.checkboxField}
                  {...register(PRICE_VISIBILITY)}
                  // checked={false}
                />
                <span className={styles.checkboxLabel}></span>
                Visibility
              </label>
            </div>
            {errors[PRICE] && (
              <p className={styles.formError}>{errors[PRICE].message}</p>
            )}
          </div>
          <div className={styles.formFieldContainer}>
            <div className={styles.inputFieldContainer}>
              <label htmlFor={ICON} className={styles.formLabel}>
                Icon
                <span className="asterick">*</span>
              </label>
              <AttachFiles
                attachmentContainerCustomClass={
                  styles.attachmentContainerCustomClass
                }
                register={register}
                fileKey={ICON}
                id={ICON}
                fileList={iconFiles}
                validation={
                  popData?.[ID] && iconFiles?.data_uri?.length > 0
                    ? {}
                    : mobileAppAppointmentValidators[ICON]
                }
              />
              <div className={styles.checkboxContainerBlank}></div>
            </div>
            {errors[ICON] && (
              <p className={styles.formError}>{errors[ICON].message}</p>
            )}
          </div>
        </div>
        <div className={styles.formButtonContainer}>
          <Button
            title="Submit"
            type="submit"
            customClass={styles.submitButton}
          />
          <Button
            title="Reset"
            type="reset"
            handleClick={() => handleReset()}
            customClass={styles.resetButton}
          />
        </div>
      </form>
    </div>
  );
};

export default MobileAppAppointmentModal;

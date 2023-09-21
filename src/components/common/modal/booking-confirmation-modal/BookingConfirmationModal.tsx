import { FC, useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import moment from "moment";
import {
  PATIENT_NAME,
  FILE_NO,
  DOCTOR_NAME,
  BOOKING_DATE,
  START_TIME,
  END_TIME,
  PATINET_MOBILE_NO,
  RECURRING_DOCTOR_NAME,
  SESSION,
  RECURRING_START_DATE,
  TYPE,
  RECURRING_START_TIME,
  RECURRING_END_TIME,
  INTERVAL,
  NOTES,
  DAY,
  AVAILABLE_SLOT,
} from "../../../../constants/bookingConfirmationConstatnt";
import {
  CheckIcon,
  UncheckIcon,
  CloseIcon,
  PrintIcon,
  BookingDeleteIcon,
} from "../../../../components/common/svg-components";
import {
  trimValue,
  disableArrowKey,
  disableScroll,
  checkConsecutiveTimeSlots,
  appointmentDuration,
  sortArray,
  createSlots,
} from "../../../../utils/utils";
import Button from "../../../../components/common/button/Button";
import { IBookingConfirmationForm } from "../../../../interfaces/bookingConfirmationModalInterfaces";
import { bookingConfirmationValidators } from "../../../../form-validators/bookingConfirmationValidators";
import PhoneInput from "react-phone-input-2";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useAppDispatch, useAppSelector } from "../../../../hooks/index";
import { colors } from "../../../../constants/color";
import { daysList } from "../../../../constants/data";
import { requestGenerator } from "../../../../utils/payloadGenerator";
import {
  getAvailableSlots,
  bookingConfirmation,
} from "../../../../redux/features/appointments/bookingAppointmentAsyncActions";
import {
  clearSlotData,
  setAppointmentsSlots,
} from "../../../../redux/features/appointments/bookingAppointmentsSlice";
import {
  getAllMobileAppointment,
  getAllMobileAppointmentCalander,
} from "../../../../redux/features/mobile-appointment-request/mobileAppointmentRequestAsyncActions";
import { BOOKING_CONFIRMATION_TYPE } from "../../../../constants/asyncActionsType";
import styles from "./bookingConfirmationModal.module.scss";

interface IBookingConfirmationModalProps {
  heading?: string;
  message?: string;
  handleClose?: (e?: React.MouseEvent<HTMLElement>) => void;
  popData?: string | any;
  appointmentIds?: any[];
}

const BookingConfirmationModal: FC<IBookingConfirmationModalProps> = ({
  heading,
  message,
  handleClose,
  popData,
  appointmentIds,
}) => {
  const dispatch = useAppDispatch();
  const {
    isLoading,
    singleMobileAppointmentRequestData,
    getAllMobileAppointPayloadData,
    branch_id,
  } = useAppSelector((state) => state.mobileAppointmentRequest);
  const { availbleSlots } = useAppSelector((state) => state.appointments);
  const { branchData } = useAppSelector((state) => state.login);
  // console.log("branch_id :>> ", branch_id);

  // define state variables
  const [recurringIcon, setRecurringIcon] = useState<boolean>(false);
  // const [avalableSlotsOptions, setAvailableSlotsOption] = useState([])
  const [totalAppointmentDuration, setTotalAppointmentDuration] = useState(0);
  const animatedComponent = makeAnimated();

  // React Hook form for the form handling
  const {
    register,
    reset,
    setError,
    clearErrors,
    handleSubmit,
    watch,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<IBookingConfirmationForm>({});

  const selectedType = watch(TYPE);
  const selectedDate = watch(BOOKING_DATE);
  const selectedSlots = watch(AVAILABLE_SLOT);

  useEffect(() => {
    // console.log(
    //   "singleMobileAppointmentRequestData",
    //   singleMobileAppointmentRequestData
    // );
    const currentDateFormated = moment(new Date()).format("YYYY-MM-DD");
    const currentDateMiliseconds = new Date(currentDateFormated).getTime();
    const selectedDateMiliseconds = new Date(
      singleMobileAppointmentRequestData?.apt_date
    ).getTime();

    if (
      singleMobileAppointmentRequestData?.apt_status === "SCHEDULED" &&
      singleMobileAppointmentRequestData?.previous_status === "PENDING" &&
      selectedDateMiliseconds >= currentDateMiliseconds
    ) {
      reset(singleMobileAppointmentRequestData);
      // console.log(
      //   "singleMobileAppointmentRequestData?.apt_date",
      //   singleMobileAppointmentRequestData?.apt_date
      // );
      const startDate = new Date(singleMobileAppointmentRequestData?.apt_date);
      const startDateHoursMinutes =
        singleMobileAppointmentRequestData?.apt_time?.split(":");
      startDate.setHours(startDateHoursMinutes[0]);
      startDate.setMinutes(startDateHoursMinutes[1]);
      startDate.setMilliseconds(0);
      const startHour =
        startDate.getHours() < 10
          ? `0${startDate.getHours()}`
          : startDate.getHours();
      const startMin =
        startDate.getMinutes() < 10
          ? `0${startDate.getMinutes()}`
          : startDate.getMinutes();
      const endDate = moment(startDate)
        .add(singleMobileAppointmentRequestData?.apt_slot, "minutes")
        .toDate();
      const endHour =
        endDate.getHours() < 10 ? `0${endDate.getHours()}` : endDate.getHours();
      const endMin =
        endDate.getMinutes() < 10
          ? `0${endDate.getMinutes()}`
          : endDate.getMinutes();
      const mobileAppointmentSlots = createSlots(startDate, endDate, true);
      setValue(BOOKING_DATE, singleMobileAppointmentRequestData?.apt_date);
      setValue(AVAILABLE_SLOT, mobileAppointmentSlots || []);
      setValue(START_TIME, `${startHour}:${startMin}` || "");
      setValue(END_TIME, `${endHour}:${endMin}` || "");
    } else {
      reset(singleMobileAppointmentRequestData);
    }
  }, [reset, singleMobileAppointmentRequestData]);

  const handleRecurring = () => {
    setRecurringIcon((prevState) => !prevState);
  };

  // useeffect for disable scroll
  useEffect(() => {
    disableScroll();
  }, []);

  // get all available slot
  useEffect(() => {
    const currentTime = moment().format("HH:mm");
    const date = selectedDate && moment(selectedDate);
    const dayIndex = date && date.weekday();
    const payload = {
      doctor_id: singleMobileAppointmentRequestData?.doctor_id,
      appointment_date: selectedDate,
      appointment_day: dayIndex,
      current_time: currentTime,
    };

    const currentDateFormated = moment(new Date()).format("YYYY-MM-DD");
    const currentDateMiliseconds = new Date(currentDateFormated).getTime();
    const selectedDateMiliseconds = new Date(selectedDate).getTime();

    // console.log(
    //   "firsteee",
    //   singleMobileAppointmentRequestData?.apt_date !== selectedDate
    // );
    if (selectedDateMiliseconds >= currentDateMiliseconds && selectedDate) {
      dispatch(getAvailableSlots(requestGenerator(payload)));
      if (singleMobileAppointmentRequestData?.apt_date !== selectedDate) {
        setValue(AVAILABLE_SLOT, []);
        setValue(START_TIME, "");
        setValue(END_TIME, "");
      }
    } else if (selectedDate) {
      dispatch(clearSlotData());
      // setAvailableSlotsOption([])
      dispatch(setAppointmentsSlots([]));
      if (singleMobileAppointmentRequestData?.apt_date !== selectedDate) {
        setValue(AVAILABLE_SLOT, []);
        setValue(START_TIME, "");
        setValue(END_TIME, "");
      }
    }
  }, [dispatch, selectedDate]);

  // ** Commented by divyaraj, uncomment to handle slots locally
  // useEffect(() => {
  //   if (availbleSlots && availbleSlots?.length > 0) {
  //     const tempArray = availbleSlots.map((item: any, index: number) => {
  //       const startTime = item
  //       const endTime = moment(startTime, 'HH:mm')
  //         .add(15, 'minutes')
  //         .format('HH:mm')
  //       const label = `${startTime} to ${endTime}`
  //       return { label, value: item }
  //     })
  //     setAvailableSlotsOption(tempArray)
  //   }
  // }, [availbleSlots])

  useEffect(() => {
    const checkConsecutiveTimeSlots1 = async (
      slotes: string[],
      duration: number
    ) => {
      try {
        const areConsecutive = await checkConsecutiveTimeSlots(
          slotes,
          duration
        );

        if (slotes?.length > 8) {
          setError(AVAILABLE_SLOT, {
            type: "custom",
            message: "Time slot selection should be less than 2 hrs",
          });
        } else if (!areConsecutive) {
          setError(AVAILABLE_SLOT, {
            type: "custom",
            message: "Time slot selection should be consecutive",
          });
        } else {
          clearErrors(AVAILABLE_SLOT);
        }
      } catch (error) {
        setError(AVAILABLE_SLOT, {
          type: "custom",
          message: "Time slot selection should ne consecutive",
        });
      }
    };
    if (selectedSlots && selectedSlots.length > 0) {
      const selectedSlotsArr = selectedSlots?.map(
        (item: any, index: number) => {
          return item?.value;
        }
      );
      checkConsecutiveTimeSlots1(selectedSlotsArr, 15);
    }
  }, [selectedSlots]);

  useEffect(() => {
    setTotalAppointmentDuration(appointmentDuration(selectedSlots, 15));
  }, [selectedSlots]);

  // Envoke on when we submit the form
  const onSubmit: SubmitHandler<IBookingConfirmationForm> = (data) => {
    const date = new Date(selectedDate);
    date.setHours(parseInt(data[AVAILABLE_SLOT][0]?.value.split(":")[0]) || 0);
    date.setMinutes(
      parseInt(data[AVAILABLE_SLOT][0]?.value.split(":")[1]) || 0
    );
    // ***uncomment below lines to add offset**
    // const offset = date.getTimezoneOffset()
    // date.setTime(date.getTime() + offset)

    if (branchData?.branches?.length > 0) {
      let slots: any = [];
      if (selectedSlots && selectedSlots.length > 0) {
        slots = selectedSlots?.map((item: any) => item?.value);
        // checkConsecutiveTimeSlots1(slots, 15)
      }

      const payload = {
        doctor_id: singleMobileAppointmentRequestData?.doctor_id,
        branch_id: branch_id,
        appointment_date: date,
        [AVAILABLE_SLOT]: slots,
        appointment_duration: totalAppointmentDuration,
        appointment_status: data.apt_status,
        problem_description: data.problem_description,
        patient_name: data.patient_name,
        phone: data.patient_phone,
        appointment_type: data.apt_type,
        appointment_id: data.apt_id,
        is_update: true,
      };

      dispatch(bookingConfirmation(requestGenerator(payload))).then((e) => {
        if (e.type === `${BOOKING_CONFIRMATION_TYPE}/fulfilled`) {
          if (appointmentIds && appointmentIds?.length > 0) {
            dispatch(
              getAllMobileAppointmentCalander(
                requestGenerator({ appointment_requests: appointmentIds || [] })
              )
            );
          } else {
            dispatch(
              getAllMobileAppointment(
                requestGenerator(getAllMobileAppointPayloadData)
              )
            );
          }
          handleClose && handleClose();
        }
      });
    }
  };

  return (
    <div
      className={styles.bookingConfirmationModalContainer}
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
      <div className={styles.iconConatainer}>
        <PrintIcon />
        <BookingDeleteIcon />
      </div>
      <h1 className={styles.bookingConfirmationModalHeading}>
        Booking Confirmation
      </h1>
      <hr className={styles.bookingConfirmationModalDivider} />
      <form
        className={styles.bookingConfirmForm}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={styles.formFieldRow}>
          <div className={styles.formFieldContainer}>
            <div className={styles.inputFieldContainer}>
              <label htmlFor={PATIENT_NAME} className={styles.formLabel}>
                Patient Name
                <span className="asterick">*</span>
              </label>
              <input
                type="text"
                className={styles.inputField}
                {...register(PATIENT_NAME)}
                placeholder="Enter Patient Name"
                disabled
              />
            </div>

            {/* {errors[PATIENT_NAME] && (
            <p className={styles.formError}>{errors[PATIENT_NAME].message}</p>
          )} */}
          </div>
          <div className={styles.formFieldContainer}>
            <div className={styles.inputFieldContainer}>
              <label htmlFor={FILE_NO} className={styles.formLabel}>
                File No.
              </label>
              <input
                type="text"
                className={styles.inputField}
                {...register(FILE_NO)}
                placeholder="File No."
                disabled
              />
            </div>

            {/* {errors[FILE_NO] && (
            <p className={styles.formError}>{errors[FILE_NO].message}</p>
          )} */}
          </div>
        </div>
        <div className={styles.formFieldRow}>
          <div className={styles.formFieldContainer}>
            <div className={styles.inputFieldContainer}>
              <label htmlFor={DOCTOR_NAME} className={styles.formLabel}>
                Doctor
                <span className="asterick">*</span>
              </label>
              <input
                type="text"
                className={styles.inputField}
                {...register(DOCTOR_NAME)}
                placeholder="Enter Doctor Name"
                disabled
              />
            </div>

            {/* {errors[DOCTOR_NAME] && (
            <p className={styles.formError}>{errors[DOCTOR_NAME].message}</p>
          )} */}
          </div>
          <div className={styles.formFieldContainer}>
            <div className={styles.inputFieldContainer}>
              <label htmlFor={BOOKING_DATE} className={styles.formLabel}>
                Date
                <span className="asterick">*</span>
              </label>
              <input
                type="date"
                className={styles.inputField}
                max="9999-12-31"
                min={new Date().toISOString().split("T")[0]}
                {...register(
                  BOOKING_DATE,
                  bookingConfirmationValidators[BOOKING_DATE]
                )}
              />
            </div>
            {errors[BOOKING_DATE] && (
              <div className={styles.errorContainer}>
                <div className={styles.errorExtraDiv}></div>
                <p className={styles.formError}>
                  {errors[BOOKING_DATE].message}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className={styles.formFieldRow}>
          <div className={styles.formFieldContainer}>
            <div className={styles.inputFieldContainer}>
              <label htmlFor={AVAILABLE_SLOT} className={styles.formLabel}>
                Available Slot
                <span className="asterick">*</span>
              </label>

              <Select
                className={styles.multiSelectField}
                {...register(
                  AVAILABLE_SLOT,
                  bookingConfirmationValidators[AVAILABLE_SLOT]
                )}
                isMulti
                isSearchable={true}
                isClearable={true}
                value={selectedSlots}
                options={availbleSlots}
                components={animatedComponent}
                closeMenuOnSelect={false}
                placeholder="Select Available Slot"
                onChange={(e: any) => {
                  const sortedOptions = sortArray(e);
                  if (sortedOptions && sortedOptions?.length > 0) {
                    setValue(START_TIME, sortedOptions[0]?.value);
                    const endTime =
                      sortedOptions[sortedOptions?.length - 1]?.value;
                    const endTimePlus15 = moment(endTime, "HH:mm")
                      .add(15, "minutes")
                      .format("HH:mm");
                    setValue(END_TIME, endTimePlus15);
                    setValue(
                      AVAILABLE_SLOT,
                      sortedOptions?.map((item: any) => {
                        return item;
                      })
                    );
                    trigger(AVAILABLE_SLOT);
                  } else {
                    setValue(AVAILABLE_SLOT, []);
                    setValue(START_TIME, "");
                    setValue(END_TIME, "");
                  }
                }}
                styles={{
                  multiValue: (provided) => ({
                    ...provided,
                    width: "fit-content",
                  }),
                }}
              />
            </div>

            {errors[AVAILABLE_SLOT] && (
              <div className={styles.errorContainer}>
                <div className={styles.errorExtraDiv}></div>
                <p className={styles.formError}>
                  {errors[AVAILABLE_SLOT].message as any}
                </p>
              </div>
            )}
          </div>
          <div className={styles.formFieldContainer}>
            <div className={styles.inputFieldContainer}>
              <label className={styles.formLabel}>
                Time
                <span className="asterick">*</span>
              </label>
              <input
                type="time"
                className={styles.inputTimeField}
                {...register(START_TIME)}
                disabled
              />
              <p>to</p>
              <input
                type="time"
                className={styles.inputTimeField}
                {...register(END_TIME)}
                disabled
              />
            </div>
          </div>
        </div>

        <div className={styles.formFieldRow}>
          <div
            className={[
              styles.formFieldContainer,
              styles.singleFieldContainer,
            ].join(" ")}
          >
            <div className={styles.inputFieldContainer}>
              <label htmlFor={PATINET_MOBILE_NO} className={styles.formLabel}>
                Mobile No.
                <span className="asterick">*</span>
              </label>

              <PhoneInput
                country={"kw"}
                {...register(
                  PATINET_MOBILE_NO,
                  bookingConfirmationValidators[PATINET_MOBILE_NO]
                )}
                value={getValues(PATINET_MOBILE_NO)}
                placeholder="Enter Phone No."
                onChange={(phone) => {
                  const formattedPhone = phone && `+${phone}`;
                  setValue(PATINET_MOBILE_NO, formattedPhone);
                  trigger(PATINET_MOBILE_NO);
                }}
                inputClass={styles.phoneNumberInput}
                // disableCountryCode={true}
                disabled={true}
              />
            </div>
            {errors[PATINET_MOBILE_NO] && (
              <div className={styles.errorContainer}>
                <div className={styles.errorExtraDiv}></div>
                <p className={styles.formError}>
                  {errors[PATINET_MOBILE_NO].message}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className={styles.formFieldRow}>
          <div className={styles.formFieldContainer}>
            <div
              className={[
                styles.inputFieldContainer,
                styles.textAreaFieldContainer,
              ].join(" ")}
            >
              <label htmlFor={NOTES} className={styles.formLabel}>
                Notes
                {/* <span className="asterick">*</span> */}
              </label>
              <div className={styles.textAreaContainer}>
                <textarea
                  className={styles.textArea}
                  {...register(NOTES)}
                  onChange={(e) => {
                    trimValue(e);
                  }}
                  placeholder="Enter Notes"
                />
                {errors[NOTES] && (
                  <p className={styles.formError}>{errors[NOTES].message}</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.formButtonContainer}>
          <div className={styles.extraDiv}></div>
          <Button
            title="Save"
            type="submit"
            customClass={styles.submitButton}
          />
          <Button
            title="Add Nurse"
            type="button"
            // handleClick={() => handleReset()}
            customClass={styles.extraButton}
            disable={true}
          />
          <Button
            title="Share Payment Link"
            type="button"
            // handleClick={() => handleReset()}
            customClass={styles.extraButton}
            disable={true}
          />
          <Button
            title="Enable smart notification"
            type="button"
            // handleClick={() => handleReset()}
            customClass={styles.extraButton}
            disable={true}
          />
        </div>
      </form>
    </div>
  );
};

export default BookingConfirmationModal;

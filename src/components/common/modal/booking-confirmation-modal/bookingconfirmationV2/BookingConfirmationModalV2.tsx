import { FC, useState, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import styles from '../bookingConfirmationModal.module.scss'
import { useAppDispatch, useAppSelector } from '../../../../../hooks'
import { IBookingConfirmationForm } from '../../../../../interfaces/bookingConfirmationModalInterfaces'
import {
  AVAILABLE_SLOT,
  BOOKING_DATE,
  DAY,
  DOCTOR_NAME,
  END_TIME,
  FILE_NO,
  INTERVAL,
  MOBILE_NO,
  NOTES,
  PATIENT_NAME,
  RECURRING_DOCTOR_NAME,
  RECURRING_END_TIME,
  RECURRING_START_DATE,
  RECURRING_START_TIME,
  SESSION,
  SESSION_TIME,
  START_TIME,
  STATUS_NAME,
  TYPE,
} from '../../../../../constants/bookingConfirmationConstatnt'
import {
  appointmentDuration,
  createSlots,
  disableArrowKey,
  sortArray,
  trimValue,
} from '../../../../../utils/utils'
import {
  BookingDeleteIcon,
  CheckIcon,
  CloseIcon,
  CrossIcon,
  PrintIcon,
  SearchIcon,
  UncheckIcon,
} from '../../../svg-components'
import { colors } from '../../../../../constants/color'
import { bookingConfirmationValidators } from '../../../../../form-validators/bookingConfirmationValidators'
import Button from '../../../button/Button'
import PhoneInput from 'react-phone-input-2'
import Popup from '../../../popup/Popup'
import SearchModal from '../../search-modal/SearchModal'
import { requestGenerator } from '../../../../../utils/payloadGenerator'
import {
  bookingConfirmation,
  getAllDoctorAppointments,
  getAvailableSlots,
} from '../../../../../redux/features/appointments/bookingAppointmentAsyncActions'
import moment from 'moment'
import makeAnimated from 'react-select/animated'
import Select from 'react-select'
import {
  clearSlotData,
  setAvialbleSlotsPayload,
  setSelectedSlots,
} from '../../../../../redux/features/appointments/bookingAppointmentsSlice'
import { BOOKING_CONFIRMATION_TYPE } from '../../../../../constants/asyncActionsType'
import { isEqual } from 'lodash'
import { setMessage } from '../../../../../redux/features/toast/toastSlice'
import {
  daysList,
  failure,
  intervalData,
  statusData,
  sessionTimeData,
  defaultSchedule,
  forArrivedNonPatient,
} from '../../../../../constants/data'
import { IInterval } from '../../../../../interfaces/interfaces'
import { useNavigate } from 'react-router-dom'
import { getPatientEmrById } from '../../../../../redux/features/patient-emr/patient/patientAsyncAction'

interface IBookingConfirmationModalProps {
  heading?: string
  message?: string
  handleClose?: (e?: React.MouseEvent<HTMLElement>) => void
  popData?: string | any
  handleOpen?: any
  setModelOpenClose?: any
  branchId?: string
}

const BookingConfirmationModalV2: FC<IBookingConfirmationModalProps> = ({
  heading,
  message,
  handleClose,
  popData,
  handleOpen,
  setModelOpenClose,
  branchId,
}) => {
  // Define state variables
  const [recurringIcon, setRecurringIcon] = useState<boolean>(false)
  const [showSearchModal, setShowSearchModal] = useState<boolean>(false)
  const [searchModalData, setSearchModalData] = useState({})
  const [patientData, setPateintData] = useState<any>({})
  const { doctorData, selectedSlots, recurringSelectedSlots, availbleSlots } =
    useAppSelector((state) => state.appointments)
  // console.log('popData', popData)
  const [totalAppointmentDuration, setTotalAppointmentDuration] = useState(0)
  const [disableSubmit, setDisableSubmit] = useState<boolean>(false)
  const [defaultSlots, setDefaultSlots] = useState([])
  const [numberOfSession, setNumberOfSeesion] = useState<any>('')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  // React Hook form for the form handling
  const {
    register,
    setError,
    clearErrors,
    handleSubmit,
    watch,
    getValues,
    trigger,
    setValue,
    formState: { errors },
  } = useForm<IBookingConfirmationForm>({})

  // const selectedSlots = watch(AVAILABLE_SLOT)
  const selectedDate = watch(BOOKING_DATE)
  const selectedRecurringDate = watch(RECURRING_START_DATE)
  const startTime = watch(START_TIME)
  const endTime = watch(END_TIME)
  const recurringStartTime = watch(RECURRING_START_TIME)
  const recurringEndTime = watch(RECURRING_END_TIME)
  const sessionTime = watch(SESSION_TIME)
  const daysArray = watch(DAY)
  const interval = watch(INTERVAL)
  const statusName = watch(STATUS_NAME)
  const handleRecurring = () => {
    if (patientData?._id) {
      setRecurringIcon((prevState) => !prevState)
    } else {
      dispatch(
        setMessage({
          message: 'Please select patient witn emr from search',
          type: failure,
        })
      )
    }
  }

  const watchInterval: any = watch(INTERVAL)
  // Envoke on when we submit the form
  const onSubmit: SubmitHandler<IBookingConfirmationForm> = (data: any) => {
    const date = new Date(selectedDate)

    date.setHours(parseInt(selectedSlots[0]?.split(':')[0]) || 0)
    date.setMinutes(parseInt(selectedSlots[0]?.split(':')[1]) || 0)
    // date.setSeconds(parseInt(data[AVAILABLE_SLOT][0]?.value.split(':')[1]) || 0)
    // ** uncomment beloe two lines to add offset ** //
    // const offset = date.getTimezoneOffset()
    // date.setTime(date.getTime() + offset)

    const recurringSelectedSlotsWithTimestamp = recurringSelectedSlots?.map(
      (slotItem: any) => {
        // console.log('slotITem>>', slotItem?.date, selectedDate)
        const date = new Date(slotItem?.date)
        date.setHours(parseInt(slotItem?.time?.split(':')[0]) || 0)
        date.setMinutes(parseInt(slotItem?.time?.split(':')[1]) || 0)
        return { ...slotItem, appointment_timestamp: date }
      }
    )

    const payload = recurringIcon
      ? {
          // ...data,
          doctor_id: popData?._id,
          patient_id: patientData?._id,
          branch_id: branchId || '',
          appointment_status: 'SCHEDULED',
          appointment_type: 'INPERSON',
          appointment_id: popData?.appt_id || '',
          appointment_duration: sessionTime?.value,
          // status_name: statusName?.value,
          // appointment_date: date,
          // [AVAILABLE_SLOT]: selectedSlots,
          [SESSION]: Number(numberOfSession),
          recurring_details: recurringSelectedSlotsWithTimestamp,
          is_update: popData?.appt_id ? true : false,
          is_recurring: true,
          [NOTES]: data[NOTES],
        }
      : patientData?._id
      ? {
          ...data,
          doctor_id: popData?._id,
          patient_id: patientData?._id,
          branch_id: branchId || '',
          // appointment_status: popData?.appt_id ? "RESCHEDULED" : "SCHEDULED",
          [STATUS_NAME]: data[STATUS_NAME]?.value,

          appointment_duration: totalAppointmentDuration,
          appointment_type: 'INPERSON',
          appointment_id: popData?.appt_id || '',
          appointment_date: date,
          [AVAILABLE_SLOT]: selectedSlots,
          is_update: popData?.appt_id ? true : false,
        }
      : {
          ...data,
          doctor_id: popData?._id,
          branch_id: branchId || '',
          // appointment_status: popData?.appt_id ? "RESCHEDULED" : "SCHEDULED",
          [STATUS_NAME]: data[STATUS_NAME]?.value,

          appointment_duration: totalAppointmentDuration,
          appointment_type: 'INPERSON',
          appointment_id: popData?.appt_id || '',
          appointment_date: date,
          [AVAILABLE_SLOT]: selectedSlots,
          is_update: popData?.appt_id ? true : false,
        }
    const selectedDateMiliseconds = new Date(selectedDate).getTime()
    const apptDateMilliSec = new Date(popData?.appointment_date).getTime()

    if (recurringIcon) {
      if (recurringSelectedSlots && recurringSelectedSlots?.length > 0) {
        dispatch(bookingConfirmation(requestGenerator(payload))).then((e) => {
          if (e.type === `${BOOKING_CONFIRMATION_TYPE}/fulfilled`) {
            dispatch(
              getAllDoctorAppointments(
                requestGenerator({ branch_id: branchId })
              )
            )
            handleClose && handleClose()
          }
        })
      } else {
        dispatch(
          setMessage({
            message: 'Please select recurring time slots',
            type: failure,
          })
        )
      }
    } else if (!recurringIcon && selectedSlots?.length === 0) {
      dispatch(
        setMessage({
          message: 'No slots available in given time range',
          type: failure,
        })
      )
    } else if (totalAppointmentDuration > 120) {
      dispatch(
        setMessage({
          message: 'Maximum appointment time is 2 hours',
          type: failure,
        })
      )
    } else if (popData?.appt_id) {
      if (
        apptDateMilliSec === selectedDateMiliseconds &&
        popData?.problem_description === data[NOTES] &&
        isEqual(selectedSlots, defaultSlots) &&
        data[STATUS_NAME]?.value === 'RESCHEDULED'
      ) {
        dispatch(
          setMessage({
            message: 'Please change appointment time or date',
            type: failure,
          })
        )
        return
      } else {
        dispatch(bookingConfirmation(requestGenerator(payload))).then((e) => {
          if (e.type === `${BOOKING_CONFIRMATION_TYPE}/fulfilled`) {
            dispatch(
              getAllDoctorAppointments(
                requestGenerator({ branch_id: branchId })
              )
            )
            handleClose && handleClose()
          }
        })
      }
    } else {
      dispatch(bookingConfirmation(requestGenerator(payload))).then((e) => {
        if (e.type === `${BOOKING_CONFIRMATION_TYPE}/fulfilled`) {
          dispatch(
            getAllDoctorAppointments(requestGenerator({ branch_id: branchId }))
          )
          handleClose && handleClose()
        }
      })
    }
  }

  // search modal open -close
  const handleSearchModalClose = () => {
    setShowSearchModal(!showSearchModal)
  }

  // set doctor name field
  useEffect(() => {
    if (popData?._id) {
      const doctor = doctorData?.find((item: any) => item?._id === popData?._id)
      setValue(DOCTOR_NAME, doctor?.doctor_name)
    }
  }, [doctorData])

  const animatedComponent = makeAnimated()
  // console.log('appointment duraion', totalAppointmentDuration)
  useEffect(() => {
    setTotalAppointmentDuration(appointmentDuration(selectedSlots, 15))
    const startTime = selectedSlots[0]
    const endTime = moment(selectedSlots[selectedSlots.length - 1], 'HH:mm')
      .add(15, 'minutes')
      .format('HH:mm')
    // setValue(START_TIME, startTime)
    // setValue(END_TIME, endTime)
  }, [selectedSlots])

  useEffect(() => {
    return () => {
      dispatch(clearSlotData())
    }
  }, [])

  // set form values
  useEffect(() => {
    if (popData) {
      const startDate = new Date(popData?.dateStart)
      const startHour =
        startDate.getHours() < 10
          ? `0${startDate.getHours()}`
          : startDate.getHours()
      const startMin =
        startDate.getMinutes() < 10
          ? `0${startDate.getMinutes()}`
          : startDate.getMinutes() || '00'
      const endDate = new Date(popData?.dateEnd)
      const endHour =
        endDate.getHours() < 10 ? `0${endDate.getHours()}` : endDate.getHours()
      const endMin =
        endDate.getMinutes() < 10
          ? `0${endDate.getMinutes()}`
          : endDate.getMinutes() || '00'
      const editSlots = createSlots(startDate, endDate)
      // console.log('start-end time', endHour, endMin)
      setDefaultSlots(editSlots)
      // setValue(AVAILABLE_SLOT, editSlots || [])
      if (popData?.patient_id) {
        dispatch(setSelectedSlots(editSlots))
        dispatch(
          getPatientEmrById(
            requestGenerator({
              id: popData?.patient_id,
            })
          )
        )
      } else if (popData?.appt_id) {
        dispatch(setSelectedSlots(editSlots))
      }

      setValue(PATIENT_NAME, popData?.patient_name || '')
      setValue(FILE_NO, popData?.file_no || '')
      setValue(
        BOOKING_DATE,
        popData?.appointment_date ||
          moment(startDate).format('YYYY-MM-DD') ||
          ''
      )

      setValue(START_TIME, `${startHour}:${startMin}` || '')
      setValue(END_TIME, `${endHour}:${endMin}` || '')
      setValue(MOBILE_NO, popData?.patient_phone || '')
      setPateintData({ _id: popData?.patient_id })
      setValue(NOTES, popData?.problem_description || '')
      if (popData?.appt_status) {
        setValue(STATUS_NAME, {
          label: popData?.appt_status,
          value: popData?.appt_status,
        })
      } else {
        setValue(STATUS_NAME, defaultSchedule[0])
      }
    }
  }, [popData])

  const handleClearPatientDetail = () => {
    setRecurringIcon(false)
    setPateintData({})
    setValue(PATIENT_NAME, '')
    setValue(FILE_NO, '')
    setValue(MOBILE_NO, '')
  }

  // view  time slots
  const handleViewSlots = (
    isRecurring: boolean,
    selectionDate: any,
    handler: any,
    timeStart: any,
    timeEnd: any,
    dateKey: any,
    sessionTime?: any,
    session?: any,
    interval?: any,
    days?: any[]
  ) => {
    const currentTime = moment().format('HH:mm')
    const date = selectionDate && moment(selectionDate)
    const dayIndex = date && date.weekday()
    const payload = isRecurring
      ? {
          is_recurring: true,
          doctor_id: popData?._id,
          current_time: currentTime,
          recurring_details: {
            session: Number(session),
            duration: sessionTime ?? '',
            interval: Number(interval),
            start_date: selectedRecurringDate,
            day: days || [],
            convenient_time: {
              start_time: recurringStartTime,
              end_time: recurringEndTime,
            },
          },
        }
      : {
          doctor_id: popData?._id,
          appointment_date: selectionDate,
          appointment_day: dayIndex,
          current_time: currentTime,
          convenient_time: {
            start_time: timeStart,
            end_time: timeEnd,
          },
        }
    const currentDateFormated = moment(new Date()).format('YYYY-MM-DD')
    const currentDateMiliseconds = new Date(currentDateFormated).getTime()
    const selectedDateMiliseconds = new Date(selectionDate).getTime()
    if (selectedDateMiliseconds >= currentDateMiliseconds) {
      dispatch(setAvialbleSlotsPayload(payload))
      clearErrors(dateKey)
      handler()
    } else {
      setError(dateKey, {
        type: 'custom',
        message: 'Past date is not allowed',
      })
    }
  }

  // handling auto select slots //

  useEffect(() => {
    const currentDateFormated = moment(new Date()).format('YYYY-MM-DD')
    const currentDateMiliseconds = new Date(currentDateFormated).getTime()
    const selectedDateMiliseconds = new Date(selectedDate).getTime()
    const date = selectedDate && moment(selectedDate)
    const dayIndex = date && date.weekday()
    const currentTime = moment().format('HH:mm')

    const payload = {
      doctor_id: popData?._id,
      appointment_date: selectedDate,
      appointment_day: dayIndex,
      current_time: currentTime,
      convenient_time: {
        start_time: startTime,
        end_time: endTime,
      },
    }

    if (selectedDateMiliseconds >= currentDateMiliseconds) {
      dispatch(setAvialbleSlotsPayload(payload))
      const {
        doctor_id,
        appointment_date,
        appointment_day,
        current_time,
        convenient_time,
      } = payload
      const { start_time, end_time } = convenient_time
      if (
        doctor_id &&
        appointment_date &&
        appointment_day?.toString() &&
        current_time &&
        convenient_time &&
        start_time &&
        end_time
      ) {
        dispatch(getAvailableSlots(requestGenerator(payload)))
        clearErrors(BOOKING_DATE)
      }
      clearErrors(BOOKING_DATE)
      // handler()
    } else {
      setError(BOOKING_DATE, {
        type: 'custom',
        message: 'Past date is not allowed!!',
      })
    }
  }, [popData?._id, selectedDate, startTime, endTime])
  const handleNavigate = () => {
    navigate('/patientemr/sharequestionnaireemail')
  }

  // console.log('popdata', popData)
  const handleEmrRecord = (item: any) => {
    let dataPayload = {
      id: item?._id,
    }
    dispatch(getPatientEmrById(requestGenerator(dataPayload))).then((e) => {
      if (e.type === 'patient/getPatientEmrById/fulfilled') {
        // setModelOpenClose(false);
        setShowSearchModal(false)
      }
    })
  }
  console.log('slots', availbleSlots, selectedSlots)
  useEffect(() => {
    if (availbleSlots && availbleSlots?.length > 0) {
      const selctedSlots = availbleSlots
        ?.filter((item: any) => item?.selected)
        .map((item: any) => item?.value)
      dispatch(setSelectedSlots(selctedSlots))
    }
  }, [availbleSlots])
  useEffect(() => {
    if (totalAppointmentDuration > 120) {
      dispatch(
        setMessage({
          message: 'Maximum appointment time is 2 hours',
          type: failure,
        })
      )
    }
  }, [totalAppointmentDuration])
  return (
    <>
      {showSearchModal && (
        <Popup
          Children={SearchModal}
          popData={searchModalData}
          handleClose={() => setShowSearchModal(false)}
          setModelOpenClose={setShowSearchModal}
          handleRowClick={(item: any) => {
            setPateintData(item)
            setValue(PATIENT_NAME, item?.patient_name)
            setValue(FILE_NO, item?.emr_no)
            setValue(MOBILE_NO, item?.phone)
            setShowSearchModal(false)
            handleEmrRecord(item)
          }}
          isDefault={true}
        />
      )}

      <div
        className={styles.bookingConfirmationModalContainer}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <CloseIcon
          customClass={styles.closeIconStyle}
          fillColor={colors.green1}
          handleClick={() => {
            handleClose && handleClose()
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
                <span
                  // onClick={() =>
                  //   popData?.patient_id ? {} : handleSearchModalClose()
                  // }
                  style={{ position: 'relative' }}
                >
                  <input
                    type="text"
                    className={styles.inputField}
                    {...register(
                      PATIENT_NAME,
                      bookingConfirmationValidators[PATIENT_NAME]
                    )}
                    placeholder="Patient Name"
                    disabled={
                      popData?.patient_id || patientData?._id ? true : false
                    }
                    autoComplete="off"
                  />
                  <span
                    className={styles.searchButton}
                    onClick={() =>
                      popData?.patient_id
                        ? {}
                        : patientData?._id
                        ? handleClearPatientDetail()
                        : handleSearchModalClose()
                    }
                  >
                    {popData?.patient_id ? (
                      <SearchIcon fillColor={colors.white1} />
                    ) : patientData?._id ? (
                      <CrossIcon fillColor={colors.white1} />
                    ) : (
                      <SearchIcon fillColor={colors.white1} />
                    )}
                  </span>
                </span>
              </div>
              {errors[PATIENT_NAME] && (
                <div className={styles.errorContainer}>
                  <div className={styles.errorExtraDiv}></div>
                  <p className={styles.formError}>
                    {errors[PATIENT_NAME].message}
                  </p>
                </div>
              )}
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
                  min={new Date().toISOString().split('T')[0]}
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
                <label className={styles.formLabel}>
                  Time
                  <span className="asterick">*</span>
                </label>
                <input
                  type="time"
                  className={styles.inputTimeField}
                  {...register(START_TIME)}
                  // disabled
                />
                <p>to</p>
                <input
                  type="time"
                  className={styles.inputTimeField}
                  {...register(END_TIME)}
                  // min="12:00"
                  // max="18:00" // disabled
                />
              </div>
            </div>
            <div className={styles.formFieldContainer}>
              <div className={styles.inputFieldContainer}>
                <label className={styles.formLabel}></label>
                <Button
                  title="View Slots"
                  type="button"
                  disable={selectedDate && startTime && endTime ? false : true}
                  handleClick={() =>
                    handleViewSlots(
                      false,
                      selectedDate,
                      handleOpen,
                      startTime,
                      endTime,
                      BOOKING_DATE,
                      ''
                    )
                  }
                  customClass={styles.customButtonClass}
                />
              </div>
            </div>
          </div>

          <div className={styles.formFieldRow}>
            <div
              className={[
                styles.formFieldContainer,
                // styles.singleFieldContainer,
              ].join(' ')}
            >
              <div className={styles.inputFieldContainer}>
                <label htmlFor={MOBILE_NO} className={styles.formLabel}>
                  Mobile No.
                  <span className="asterick">*</span>
                </label>

                <PhoneInput
                  country={'kw'}
                  {...register(
                    MOBILE_NO,
                    bookingConfirmationValidators[MOBILE_NO]
                  )}
                  value={getValues(MOBILE_NO)}
                  placeholder="Enter Phone No."
                  onChange={(phone) => {
                    const formattedPhone = phone && `+${phone}`
                    setValue(MOBILE_NO, formattedPhone)
                    trigger(MOBILE_NO)
                  }}
                  inputClass={styles.phoneNumberInput}
                  // disableCountryCode={true}
                  // disabled
                />
              </div>
              {errors[MOBILE_NO] && (
                <div className={styles.errorContainer}>
                  <div className={styles.errorExtraDiv}></div>
                  <p className={styles.formError}>
                    {errors[MOBILE_NO].message}
                  </p>
                </div>
              )}
            </div>
            <div className={styles.formFieldContainer}>
              <div className={styles.inputFieldContainer}>
                <label htmlFor={STATUS_NAME} className={styles.formLabel}>
                  Status
                  <span className="asterick">*</span>
                </label>
                <Select
                  className={styles.selectInputField}
                  isSearchable={true}
                  options={
                    popData?.appt_id
                      ? popData?.appt_status
                        ? !popData?.patient_id &&
                          popData?.appt_status === 'ARRIVED'
                          ? forArrivedNonPatient
                          : statusData[popData?.appt_status]
                        : []
                      : defaultSchedule
                  }
                  value={watch(STATUS_NAME)}
                  closeMenuOnSelect={true}
                  placeholder="Select Status Name"
                  {...register(
                    STATUS_NAME,
                    bookingConfirmationValidators[STATUS_NAME]
                  )}
                  onChange={(e: any) => {
                    setValue(STATUS_NAME, e)
                    trigger(STATUS_NAME)
                  }}
                  isDisabled={!popData?.appt_id ? true : false}
                />
              </div>
              {errors[STATUS_NAME] && (
                <div className={styles.errorContainer}>
                  <div className={styles.errorExtraDiv}></div>
                  <p className={styles.formError}>
                    {errors[STATUS_NAME].message as any}
                  </p>
                </div>
              )}
              {/* {errors[FILE_NO] && (
            <p className={styles.formError}>{errors[FILE_NO].message}</p>
          )} */}
            </div>
          </div>
          {popData?.patient_id ? (
            ''
          ) : patientData?._id ? (
            <>
              <div className={styles.recurringContainer}>
                <div className={styles.extraForCheckBox}></div>
                {recurringIcon ? (
                  <CheckIcon
                    fillColor={colors.green1}
                    handleClick={handleRecurring}
                  />
                ) : (
                  <UncheckIcon
                    fillColor={colors.grey2}
                    handleClick={handleRecurring}
                  />
                )}
                <p className={styles.recurringText}>Recurring</p>
              </div>
              {recurringIcon && (
                <>
                  <div className={styles.formFieldRow}>
                    <div className={styles.formFieldContainer}>
                      <div className={styles.inputFieldContainer}>
                        <label
                          htmlFor={RECURRING_DOCTOR_NAME}
                          className={styles.formLabel}
                        >
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
                    </div>
                    <div className={styles.formFieldContainer}>
                      <div className={styles.inputFieldContainer}>
                        <label htmlFor={SESSION} className={styles.formLabel}>
                          Session
                          <span className="asterick">*</span>
                        </label>
                        <input
                          type="number"
                          className={styles.inputField}
                          {...register(
                            SESSION,

                            bookingConfirmationValidators[SESSION]
                          )}
                          onChange={(e: any) => {
                            trimValue(e)
                            setNumberOfSeesion(e.target.value)
                          }}
                          placeholder="Enter Session"
                          onKeyDown={(e: any) => disableArrowKey(e)}
                          onWheel={(e: any) => {
                            e.target.blur()
                          }}
                        />
                      </div>

                      {errors[SESSION] && (
                        <div className={styles.errorContainer}>
                          <div className={styles.errorExtraDiv}></div>
                          <p className={styles.formError}>
                            {errors[SESSION].message}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={styles.formFieldRow}>
                    <div className={styles.formFieldContainer}>
                      <div className={styles.inputFieldContainer}>
                        <label htmlFor={TYPE} className={styles.formLabel}>
                          Session Time
                          <span className="asterick">*</span>
                        </label>

                        <Select
                          className={styles.selectInputField}
                          isSearchable={true}
                          // isClearable={true}
                          options={sessionTimeData}
                          value={watch(SESSION_TIME)}
                          components={animatedComponent}
                          closeMenuOnSelect={true}
                          placeholder="Select Session Time"
                          {...register(
                            SESSION_TIME,
                            bookingConfirmationValidators[SESSION_TIME]
                          )}
                          onChange={(e: any) => {
                            console.log(e, 'event')
                            setValue(SESSION_TIME, e)
                            trigger(SESSION_TIME)
                          }}
                        />
                      </div>

                      {errors[SESSION_TIME] && (
                        <div className={styles.errorContainer}>
                          <div className={styles.errorExtraDiv}></div>
                          <p className={styles.formError}>
                            {errors[SESSION_TIME].message as any}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className={styles.formFieldContainer}>
                      <div className={styles.inputFieldContainer}>
                        <label
                          htmlFor={RECURRING_START_DATE}
                          className={styles.formLabel}
                        >
                          Start Date
                          <span className="asterick">*</span>
                        </label>
                        <input
                          type="date"
                          className={styles.inputField}
                          max="9999-12-31"
                          min={new Date().toISOString().split('T')[0]}
                          {...register(
                            RECURRING_START_DATE,
                            bookingConfirmationValidators[RECURRING_START_DATE]
                          )}
                        />
                      </div>
                      {errors[RECURRING_START_DATE] && (
                        <div className={styles.errorContainer}>
                          <div className={styles.errorExtraDiv}></div>
                          <p className={styles.formError}>
                            {errors[RECURRING_START_DATE].message}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className={styles.formFieldRow}>
                    <div className={styles.formFieldContainer}>
                      <div className={styles.inputFieldContainer}>
                        <label htmlFor={INTERVAL} className={styles.formLabel}>
                          Interval
                          <span className="asterick">*</span>
                        </label>
                        <input
                          type="number"
                          placeholder="Enter Interval"
                          className={styles.inputField}
                          {...register(
                            INTERVAL,
                            bookingConfirmationValidators[INTERVAL]
                          )}
                          onChange={(e: any) => {
                            setValue(INTERVAL, e.target.value)
                            trigger(INTERVAL)
                            setValue(DAY, !(watchInterval >= 7) && '')
                          }}
                          onKeyDown={(e: any) => disableArrowKey(e)}
                          onWheel={(e: any) => {
                            e.target.blur()
                          }}
                        />
                        {/* <Select
                          className={styles.selectInputField}
                          isSearchable={true}
                          // isClearable={true}
                          options={intervalData}
                          maxMenuHeight={190}
                          value={watch(INTERVAL)}
                          // defaultValue={intervalData[0]}
                          components={animatedComponent}
                          closeMenuOnSelect={true}
                          placeholder="Select Interval"
                          {...register(
                            INTERVAL,
                            bookingConfirmationValidators[INTERVAL]
                          )}
                          onChange={(e: any) => {
                            setValue(INTERVAL, e)
                            trigger(INTERVAL)
                          }}
                        /> */}
                      </div>
                      {errors[INTERVAL] && (
                        <div className={styles.errorContainer}>
                          <div className={styles.errorExtraDiv}></div>
                          <p className={styles.formError}>
                            {errors[INTERVAL].message as any}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className={styles.formFieldContainer}>
                      <div className={styles.inputFieldContainer}>
                        <label htmlFor={DAY} className={styles.formLabel}>
                          Day
                          {/* <span className="asterick">*</span> */}
                        </label>
                        <Select
                          className={styles.selectInputField}
                          isSearchable={true}
                          isDisabled={!(watchInterval >= 7) ? true : false}
                          // isClearable={true}
                          isMulti
                          options={daysList}
                          maxMenuHeight={190}
                          value={watch(DAY)}
                          components={animatedComponent}
                          closeMenuOnSelect={false}
                          placeholder="Select Day"
                          {...register(DAY)}
                          onChange={(e: any) => {
                            const sortedOptions = sortArray(e)
                            setValue(DAY, sortedOptions)
                            trigger(DAY)
                          }}
                        />
                      </div>
                      {/* 
                      {errors[DAY] && (
                        <div className={styles.errorContainer}>
                          <div className={styles.errorExtraDiv}></div>
                          <p className={styles.formError}>
                            {errors[DAY].message as any}
                          </p>
                        </div>
                      )} */}
                    </div>
                  </div>
                  <div className={styles.formFieldRow}>
                    <div className={styles.formFieldContainer}>
                      <div className={styles.inputFieldContainer}>
                        <label className={styles.formLabel}>
                          Time
                          <span className="asterick">*</span>
                        </label>
                        <input
                          type="time"
                          className={styles.inputTimeField}
                          {...register(RECURRING_START_TIME)}
                          // disabled
                        />
                        <p>to</p>
                        <input
                          type="time"
                          className={styles.inputTimeField}
                          {...register(RECURRING_END_TIME)}
                          // disabled
                        />
                      </div>
                    </div>
                    <div className={styles.formFieldContainer}>
                      <div className={styles.inputFieldContainer}>
                        <label className={styles.formLabel}></label>
                        <Button
                          title="View Slots"
                          type="button"
                          disable={
                            numberOfSession &&
                            sessionTime &&
                            // daysArray?.length > 0 &&
                            interval &&
                            selectedRecurringDate &&
                            recurringStartTime &&
                            recurringEndTime
                              ? false
                              : true
                          }
                          handleClick={() => {
                            let days: String[] = []
                            days =
                              daysArray?.length &&
                              daysArray?.map((item: IInterval) => {
                                return item?.value ?? ''
                              })
                            if (numberOfSession <= 0 || numberOfSession > 99) {
                              setError(SESSION, {
                                type: 'custom',
                                message:
                                  'Please enter session no between 1 to 99',
                              })
                            } else {
                              clearErrors(SESSION)
                              handleViewSlots(
                                true,
                                selectedRecurringDate,
                                setModelOpenClose,
                                recurringStartTime,
                                recurringEndTime,
                                RECURRING_START_DATE,
                                sessionTime?.value,
                                // statusName?.value,
                                numberOfSession,
                                interval,
                                days
                              )
                            }
                          }}
                          customClass={styles.customButtonClass}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          ) : (
            ''
          )}

          <div className={styles.formFieldRow}>
            <div className={styles.formFieldContainer}>
              <div
                className={[
                  styles.inputFieldContainer,
                  styles.textAreaFieldContainer,
                ].join(' ')}
              >
                <label htmlFor={NOTES} className={styles.formLabel}>
                  Notes
                  {/* <span className="asterick">*</span> */}
                </label>
                <div className={styles.textAreaContainer}>
                  <textarea
                    className={styles.textArea}
                    {...register(
                      NOTES /* bookingConfirmationValidators[NOTES]*/
                    )}
                    onChange={(e) => {
                      trimValue(e)
                    }}
                    placeholder="Enter Notes"
                  />
                  {/* {errors[NOTES] && (
                    <p className={styles.formError}>{errors[NOTES].message}</p>
                  )} */}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.formButtonContainer}>
            {/* <div className={styles.extraDiv}></div> */}
            <Button
              title="Save"
              type="submit"
              disable={disableSubmit}
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
            <Button
              title="Share Questionnaire"
              type="button"
              handleClick={() => handleNavigate()}
              customClass={styles.extraButton}
            />
          </div>
        </form>
      </div>
    </>
  )
}

export default BookingConfirmationModalV2

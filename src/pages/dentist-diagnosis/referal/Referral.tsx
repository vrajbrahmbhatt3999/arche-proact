import { FC, useState, useEffect } from 'react'
import styles from './referral.module.scss'
import Button from '../../../components/common/button/Button'
import Select from 'react-select'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IReferral } from '../../../interfaces/interfaces'
import makeAnimated from 'react-select/animated'
import {
  APPOINTMENT_TAGS,
  PAYMENT_REMARKS,
  REFER_TO_DOCTOR,
  REFER_TO_RECEPTIONIST,
  REFFERAL_START_DATE,
  REMARKS,
} from '../../../constants/constant'
import { referralValidators } from '../../../form-validators/referralValidators'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { requestGenerator } from '../../../utils/payloadGenerator'
import {
  getAllInternalDocotorReferral,
  getAllReceptionistName,
  getAllReferral,
} from '../../../redux/features/referral/referralAsyncActions'
import {
  ADD_PATIENT_REFERRAL,
  GET_RECEPTIONIST_NAME,
} from '../../../config/config'
import { useNavigate } from 'react-router'
import Popup from '../../../components/common/popup/Popup'
import EndDiagnosisPopup from '../../../components/common/modal/end-diagnosis-popup/EndDiagnosisPopup'
import { markStage } from '../../../redux/features/diagnosis/diagnosisAsyncActions'
import { clearDiagnosisId } from '../../../redux/features/doctor-diagnosis/doctorDiagnosisSlice'
import { setMessage } from '../../../redux/features/toast/toastSlice'
import { failure } from '../../../constants/data'

const Referral: FC = () => {
  const currentDate = new Date().toISOString().split('T')[0]
  const [selectedDate, setSelectedDate] = useState(currentDate)
  const [selectedOption, setSelectedOption] = useState<any>('option2')
  const [endRefferal, setEndRefferal] = useState(false)
  const [paymentRemarks, setPaymentRemarks] = useState<any>('')
  const [remarks, setRemarks] = useState<any>('')

  const [selectedAppointmentTag, setSelectedAppointmentTag] =
    useState<any>(null)
  const [referDoctor, setReferDoctor] = useState('')
  const [deviceToken, setDeviceToken] = useState<any>(false)
  const navigate = useNavigate()
  const animatedComponent = makeAnimated()
  const dispatch = useAppDispatch()
  const { userData, masterValueData, branchData } = useAppSelector(
    (state) => state.login
  )
  const { referDoctorData, receptionistList } = useAppSelector(
    (state) => state.referral
  )
  const [selectedReceptionist, setSelectedReceptionist] = useState<any>(null)

  const { patientFormData } = useAppSelector((state) => state.patientHistory)

  const { createdDiagnosisId } = useAppSelector(
    (state) => state.doctorDiagnosis
  )
  const handleDateChange = (e: any) => {
    setSelectedDate(e.target.value)
  }
  const handleOptionChange = (e: any) => {
    const value = e.target.value
    setSelectedOption(value === selectedOption ? null : value)
    setValue(REFER_TO_DOCTOR, '')
    setValue(APPOINTMENT_TAGS, '')
    setValue(REMARKS, '')
    setValue(PAYMENT_REMARKS, '')
    setValue(REFER_TO_RECEPTIONIST, '')
  }
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<IReferral>()

  const watchReferReceptionistValue = watch(REFER_TO_RECEPTIONIST)
  const onSubmit: SubmitHandler<IReferral> = (data) => {
    let payloadData = {
      ...data,

      diagnosis_id:
        createdDiagnosisId?.length > 0
          ? createdDiagnosisId
          : patientFormData?.diag_id !== null && patientFormData?.diag_id,
      registrationToken: deviceToken,
      referred_doctor: userData?.name,
      receptionist_id: watchReferReceptionistValue?.map((s: any) => s.value) ?? [],
      refer_to_doctor: referDoctor,
      date: selectedDate,
      appointment_tags: selectedAppointmentTag,
      remark: remarks,
      payment_remark: paymentRemarks,
      is_internal: selectedOption === 'option2' ? true : false,
    }

    dispatch(getAllReferral(requestGenerator(payloadData))).then((e) => {
      if (e.type === `${ADD_PATIENT_REFERRAL}/fulfilled`) {
        // navigate('/doctor')
        setSelectedDate('')
        setValue(REFER_TO_DOCTOR, '')
        setValue(APPOINTMENT_TAGS, '')
        setValue(REFER_TO_RECEPTIONIST, [])
        setValue(REMARKS, '')
        setValue(PAYMENT_REMARKS, '')
      }
    })
  }



  const filteredReferDoctorData = referDoctorData?.filter(
    (item: any) => item.user_id !== branchData?._id
  )

  const handleEndDiagnosis = () => {
    // let reqData = {
    //   diagnosis_id:
    //     createdDiagnosisId?.length > 0
    //       ? createdDiagnosisId
    //       : patientFormData?.diag_id !== null && patientFormData?.diag_id,
    //   diagnosis_stage: "E",
    // };
    // dispatch(markStage(requestGenerator(reqData))).then(() => {
    //   navigate("/doctor");
    // });
    // dispatch(clearDiagnosisId());

    let reqData = {
      // diagnosis_id: "646e0979dafb09722afde19f",
      diagnosis_id:
        createdDiagnosisId?.length > 0
          ? createdDiagnosisId
          : patientFormData?.diag_id
          ? patientFormData?.diag_id
          : '',
      diagnosis_stage: 'E',
    }
    if (reqData?.diagnosis_id) {
      dispatch(markStage(requestGenerator(reqData))).then(() => {
        navigate('/doctor')
      })
      dispatch(clearDiagnosisId())
    } else {
      dispatch(
        setMessage({ message: 'Please do diagnosis first', type: failure })
      )
    }
  }

  let payload = {
    // search: "r",
    page: 1,
    pageSize: 100,
    search: '',
  }

  useEffect(() => {
    dispatch(getAllInternalDocotorReferral(requestGenerator({})))
  }, [])

  useEffect(() => {
    dispatch(getAllReceptionistName(requestGenerator(payload)))
  }, [])

  const customStyles = {
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? 'white' : 'transparent',
      color: state.isSelected ? 'black' : 'black',
    }),
  }
  return (
    <>
      {endRefferal && (
        <Popup
          Children={EndDiagnosisPopup}
          handleClose={() => setEndRefferal(false)}
          handleNo={() => setEndRefferal(false)}
          handleYes={() => handleEndDiagnosis()}
        />
      )}
      <div className={styles.referralMainContainer}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.radioContainer}>
            <div className={styles.internalRadio}>
              <input
                className={styles.radioInput}
                type="radio"
                value="option2"
                checked={selectedOption === 'option2'}
                onChange={handleOptionChange}
              />
              <label
                className={
                  selectedOption === 'option2'
                    ? styles.internalText
                    : styles.disableText
                }
              >
                Internal
              </label>
            </div>
            <div className={styles.externalRadio}>
              <input
                className={styles.radioInput}
                type="radio"
                name="options"
                value="option1"
                checked={selectedOption === 'option1'}
                onChange={handleOptionChange}
              />
              <label
                className={
                  selectedOption === 'option1'
                    ? styles.externalText
                    : styles.disableText
                }
              >
                External
              </label>
            </div>
          </div>
          <div className={styles.doctorContainer}>
            <div className={styles.dateInputFieldContainer}>
              <label className={styles.dateText}>
                Date
                <span className="asterick">*</span>
              </label>
              <div className={styles.errorContainer}>
                <input
                  type="date"
                  value={selectedDate}
                  max="9999-12-31"
                  min={new Date().toISOString().split('T')[0]}
                  {...register(
                    REFFERAL_START_DATE,
                    referralValidators[REFFERAL_START_DATE]
                  )}
                  onChange={handleDateChange}
                  className={styles.dateInputField}
                />
                <p className={styles.errorText}>
                  {errors.referral_start_date && (
                    <span className="error">
                      {errors.referral_start_date.message}
                    </span>
                  )}
                </p>
              </div>
            </div>
            <div className={styles.doctorInputFieldContainer}>
              <label className={styles.doctorText}>
                Doctor
                <span className="asterick">*</span>
              </label>
              <div className={styles.errorContainer}>
                <input
                  type="text"
                  className={styles.doctorInputField}
                  value={userData?.name}
                  disabled={true}
                />
              </div>
            </div>

            {selectedOption === 'option2' ? (
              <div className={styles.referDoctorInputFieldContainer}>
                <div className={styles.referDoctorContainer}>
                  <label className={styles.referDoctorText}>
                    Refer To Doctor
                    <span className="asterick">*</span>
                  </label>

                  <Select
                    placeholder="Select Doctor"
                    className={styles.customClassContent}
                    options={filteredReferDoctorData?.map((item: any) => ({
                      label: item.doctor_name,
                      value: item.doctor_id,
                    }))}
                    isSearchable={true}
                    {...register(
                      REFER_TO_DOCTOR,
                      referralValidators[REFER_TO_DOCTOR]
                    )}
                    components={animatedComponent}
                    value={watch(REFER_TO_DOCTOR)}
                    closeMenuOnSelect={true}
                    onChange={(e: any) => {
                      setReferDoctor(e.label)

                      setValue(REFER_TO_DOCTOR, e)
                      trigger(REFER_TO_DOCTOR, e)
                    }}
                    maxMenuHeight={200}
                    styles={customStyles}
                  />
                </div>
                {errors[REFER_TO_DOCTOR] && (
                  <div className={styles.errorContainer}>
                    <div className={styles.errorExtraDiv}></div>
                    <p className={styles.formError}>
                      {errors[REFER_TO_DOCTOR].message as any}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              false
            )}

            {selectedOption === 'option1' ? (
              <div className={styles.referDoctorInputFieldContainer}>
                <div className={styles.referDoctorContainer}>
                  <label className={styles.referDoctorText}>
                    Refer To Doctor
                    <span className="asterick">*</span>
                  </label>

                  <Select
                    placeholder="Select Doctor"
                    className={styles.customClassContent}
                    options={
                      Array.isArray(masterValueData) &&
                      masterValueData.length > 0
                        ? masterValueData
                            .find(
                              (item: any) =>
                                item.category_name === 'REFERRAL_DOCTOR'
                            )
                            ?.values?.map((item: any) => ({
                              label: item?.value,
                              value: item?._id,
                            }))
                        : []
                    }
                    isSearchable={true}
                    {...register(
                      REFER_TO_DOCTOR,
                      referralValidators[REFER_TO_DOCTOR]
                    )}
                    components={animatedComponent}
                    value={watch(REFER_TO_DOCTOR)}
                    closeMenuOnSelect={true}
                    onChange={(e: any) => {
                      setReferDoctor(e.label)
                      setValue(REFER_TO_DOCTOR, e)
                      trigger(REFER_TO_DOCTOR)
                    }}
                    maxMenuHeight={200}
                    styles={customStyles}
                  />
                </div>
                {errors[REFER_TO_DOCTOR] && (
                  <div className={styles.errorContainer}>
                    <div className={styles.errorExtraDiv}></div>
                    <p className={styles.formError}>
                      {errors[REFER_TO_DOCTOR].message as any}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              false
            )}
          </div>
          <div className={styles.appMaincontiner}>
            {selectedOption === 'option2' ? (
              <div className={styles.appointmentMainContainer}>
                <div className={styles.appointmentContainer}>
                  <label className={styles.appointmentText}>
                    Appointment Tags
                    <span className="asterick">*</span>
                  </label>

                  <Select
                    className={styles.customClassContent}
                    options={
                      Array.isArray(masterValueData) &&
                      masterValueData.length > 0
                        ? masterValueData
                            .find(
                              (item: any) =>
                                item.category_name === 'APPOINTMENT_TAG'
                            )
                            ?.values?.map((item: any) => ({
                              label: item?.value,
                              value: item?._id,
                            }))
                        : []
                    }
                    placeholder="Select Appt.Tag"
                    isSearchable={true}
                    {...register(
                      APPOINTMENT_TAGS,
                      referralValidators[APPOINTMENT_TAGS]
                    )}
                    components={animatedComponent}
                    value={watch(APPOINTMENT_TAGS)}
                    closeMenuOnSelect={true}
                    onChange={(e: any) => {
                      setSelectedAppointmentTag(e.label)

                      setValue(APPOINTMENT_TAGS, e)
                      trigger(APPOINTMENT_TAGS)
                    }}
                    maxMenuHeight={200}
                    styles={customStyles}
                  />
                </div>
                {errors[APPOINTMENT_TAGS] && (
                  <div className={styles.errorContainer}>
                    <div className={styles.errorExtraDiv}></div>
                    <p className={styles.formError}>
                      {errors[APPOINTMENT_TAGS].message as any}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              ''
            )}

            {selectedOption === 'option2' ? (
              <div className={styles.appointmentMainContainer}>
                <div className={styles.appointmentContainer}>
                  <label className={styles.appointmentText}>
                    Refer To Receptionist
                    <span className="asterick">*</span>
                  </label>

                  <Select
                    className={styles.customClassContent}
                    isMulti={true}
                    options={receptionistList?.map((item: any) => ({
                      label: item.name,
                      value: item._id,
                      device_token: item.device_token
                        ? item.device_token
                        : null,
                    }))}
                    placeholder="Select Receptionist"
                    isSearchable={true}
                    {...register(
                      REFER_TO_RECEPTIONIST,
                      referralValidators[REFER_TO_RECEPTIONIST]
                    )}
                    components={animatedComponent}
                    value={watch(REFER_TO_RECEPTIONIST)}
                    closeMenuOnSelect={false}
                    onChange={(e: any) => {
                      setDeviceToken(e?.device_token)
                      setSelectedReceptionist(e.value)
                      setValue(REFER_TO_RECEPTIONIST, e)
                      trigger(REFER_TO_RECEPTIONIST)
                    }}
                    maxMenuHeight={200}
                    styles={customStyles}
                  />
                </div>
                {errors[REFER_TO_RECEPTIONIST] && (
                  <div className={styles.errorContainer}>
                    <div className={styles.errorExtraDiv}></div>
                    <p className={styles.formError}>
                      {errors[REFER_TO_RECEPTIONIST].message as any}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              ''
            )}
          </div>

          <div className={styles.appMaincontiner}>
            {selectedOption === 'option1' ? (
              <div className={styles.appointmentMainContainer}>
                <div className={styles.appointmentContainer}>
                  <label className={styles.appointmentText}>
                    Appointment Tags
                    <span className="asterick">*</span>
                  </label>

                  <Select
                    className={styles.customClassContent}
                    options={
                      Array.isArray(masterValueData) &&
                      masterValueData.length > 0
                        ? masterValueData
                            .find(
                              (item: any) =>
                                item.category_name === 'APPOINTMENT_TAG'
                            )
                            ?.values?.map((item: any) => ({
                              label: item?.value,
                              value: item?._id,
                            }))
                        : []
                    }
                    placeholder="Select Appt.Tag"
                    isSearchable={true}
                    {...register(
                      APPOINTMENT_TAGS,
                      referralValidators[APPOINTMENT_TAGS]
                    )}
                    components={animatedComponent}
                    value={watch(APPOINTMENT_TAGS)}
                    closeMenuOnSelect={true}
                    onChange={(e: any) => {
                      setSelectedAppointmentTag(e.label)
                      setValue(APPOINTMENT_TAGS, e)
                      trigger(APPOINTMENT_TAGS)
                    }}
                    maxMenuHeight={200}
                    styles={customStyles}
                  />
                </div>
                {errors[APPOINTMENT_TAGS] && (
                  <div className={styles.errorContainer}>
                    <div className={styles.errorExtraDiv}></div>
                    <p className={styles.formError}>
                      {errors[APPOINTMENT_TAGS].message as any}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              ''
            )}

            {selectedOption === 'option1' ? (
              <div className={styles.appointmentMainContainer}>
                <div className={styles.appointmentContainer}>
                  <label className={styles.appointmentText}>
                    Refer To Receptionist
                    <span className="asterick">*</span>
                  </label>

                  <Select
                    className={styles.customClassContent}
                    isMulti={true}
                    options={receptionistList?.map((item: any) => ({
                      label: item.name,
                      value: item._id,
                      device_token: item.device_token
                        ? item.device_token
                        : null,
                    }))}
                    placeholder="Select Receptionist"
                    isSearchable={true}
                    {...register(
                      REFER_TO_RECEPTIONIST,
                      referralValidators[REFER_TO_RECEPTIONIST]
                    )}
                    components={animatedComponent}
                    value={watch(REFER_TO_RECEPTIONIST)}
                    closeMenuOnSelect={false}
                    onChange={(e: any) => {
                      setDeviceToken(e?.device_token)
                      setSelectedReceptionist(e.value)
                      setValue(REFER_TO_RECEPTIONIST, e)
                      trigger(REFER_TO_RECEPTIONIST)
                    }}
                    maxMenuHeight={200}
                    styles={customStyles}
                  />
                </div>
                {errors[REFER_TO_RECEPTIONIST] && (
                  <div className={styles.errorContainer}>
                    <div className={styles.errorExtraDiv}></div>
                    <p className={styles.formError}>
                      {errors[REFER_TO_RECEPTIONIST].message as any}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              ''
            )}
          </div>

          <div className={styles.remarksMainContainer}>
            <div className={styles.remarksContainer}>
              <label className={styles.remarksText}>Remarks</label>
              <div className={styles.errorContainer}>
                <input
                  type="text"
                  placeholder="Enter Remarks"
                  {...register(
                    REMARKS
                    // referralValidators[REMARKS]
                  )}
                  onChange={(e) => setRemarks(e.target.value)}
                  className={styles.remarksInputField}
                  autoComplete="off"
                />
                {/* <p className={styles.errorText}>
                  {errors.remarks && (
                    <span className="error">{errors.remarks.message}</span>
                  )}
                </p> */}
              </div>
            </div>
            <div className={styles.paymentRemarksContainer}>
              <label className={styles.remarksText}>Payment Remarks</label>
              <div className={styles.errorContainer}>
                <input
                  type="text"
                  placeholder="Enter Payment Remarks"
                  {...register(
                    PAYMENT_REMARKS
                    // referralValidators[PAYMENT_REMARKS]
                  )}
                  onChange={(e) => setPaymentRemarks(e.target.value)}
                  autoComplete="off"
                  className={styles.paymentRemarksInputField}
                />
                {/* <p className={styles.errorText}>
                  {errors.payment_remarks && (
                    <span className="error">
                      {errors.payment_remarks.message}
                    </span>
                  )}
                </p> */}
              </div>
            </div>
          </div>
        </form>
        <div className={styles.buttonContainer}>
          <Button
            title="Notify"
            customClass={styles.nextBtn}
            handleClick={handleSubmit(onSubmit)}
            disable={
              createdDiagnosisId
                ? false
                : patientFormData?.diag_id
                ? false
                : true
            }
          />
          <Button
            title="End Diagnosis"
            customClass={styles.endDiagnosisBtn}
            handleClick={() => setEndRefferal(!endRefferal)}
            disable={
              createdDiagnosisId
                ? false
                : patientFormData?.diag_id
                ? false
                : true
            }
          />
        </div>
      </div>
    </>
  )
}

export default Referral

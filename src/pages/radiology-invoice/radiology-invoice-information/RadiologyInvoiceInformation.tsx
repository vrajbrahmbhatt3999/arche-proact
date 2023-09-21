import React, { FC, useEffect, useRef, useState } from 'react'
import styles from './radiologyInvoiceInformation.module.scss'
import { failure, invoiceFormActionData } from '../../../constants/data'
import {
  allowedNumberOfDigitsAfterDecimal,
  trimValue,
} from '../../../utils/utils'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { SubmitHandler, useForm } from 'react-hook-form'
import { radiologyInvoiceValidators } from '../../../form-validators/radiologyInvoiceValidators'
import Button from '../../../components/common/button/Button'
import PhoneInput from 'react-phone-input-2'
import {
  DropDownArrowIcon,
  DropDownIcon,
  EyeIcon,
  SearchIcon,
} from '../../../components/common/svg-components'
import Divider from '../../../components/common/divider/Divider'
import Popup from '../../../components/common/popup/Popup'
import SearchModal from '../../../components/common/modal/search-modal/SearchModal'
import DoctorModal from '../../../components/common/modal/doctor-search-modal/DoctorModal'
import PatientInfoModal from '../../../components/common/modal/patient-info-modal/PatientInfoModal'
import AddInsuranceModal from '../../../components/common/modal/add-insurance-modal/AddInsuranceModal'
import SettledInvoiceModal from '../../../components/common/modal/settled-invoice-modal/SettledInvoiceModal'
import { getAllDoctors } from '../../../redux/features/appointments/bookingAppointmentAsyncActions'
import { requestGenerator } from '../../../utils/payloadGenerator'
import { useNavigate } from 'react-router-dom'

import DescriptionDataModal from '../../../components/common/modal/description-data-Modal/DescriptionDataModal'
import { setMessage } from '../../../redux/features/toast/toastSlice'
import AddInsuranceApprovalNoModal from '../../../components/common/modal/add-insurance-approvalNo-modal/AddInsuranceApprovalNoModal'
import { clearDoctorIdState } from '../../../redux/features/receptionist/receptionistSlice'

import { clearRegularPatientData } from '../../../redux/features/invoice-module/invoiceSlice'
import { IRadiologyPatientInvoiceForm } from '../../../interfaces/interfaces'
import {
  RADIOLOGY_INVOICE_DOCTOR_NAME,
  RADIOLOGY_INVOICE_PATIENT_BRANCH_NAME,
  RADIOLOGY_INVOICE_PATIENT_FILE_NO,
  RADIOLOGY_INVOICE_PATIENT_MOBILE_NO,
  RADIOLOGY_INVOICE_PATIENT_NAME,
  RADIOLOGY_INVOICE_PATIENT_NATIONAL_ID,
  RADIOLOGY_INVOICE_PATIENT_PRIMARY_DOCTOR,
  RADIOLOGY_INVOICE_PATIENT_TYPE,
  RADIOLOGY_INVOICE_REFERRAL_TYPE,
  RADIOLOGY_INVOICE_REFER_BY,
} from '../../../constants/constant'
import { saveRadiologyPatientInvoiceData } from '../../../redux/features/radiology/radiologySlice'
import GlobalPatientInfoModal from '../../../components/common/patient-info-modal/PatientInfoModal'
interface IRadiologyInvoiceInformation { }

const RadiologyInvoiceInformation: FC<IRadiologyInvoiceInformation> = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const ref = useRef<any>()
  const { branchData } = useAppSelector((state) => state.login)

  const { invoiceObjectById, generatedInvoiceObject, selectedInsurancePlan } =
    useAppSelector((state) => state.invoice)

  const { radiologyPatientInvoiceData } = useAppSelector(
    (state) => state.radiology
  )
  const referredDoctor = useAppSelector(
    (state) => state.invoice?.invoiceObjectById?.refer_info?.doctor_name
  )
  const { doctorDataById } = useAppSelector((state) => state.receptionist)
  const { doctorData } = useAppSelector((state) => state.appointments)
  const [formActionValue, setFormActionValue] = useState(-1)
  const [disable, setDisable] = useState<any>(true)
  const [selectedOption, setSelectedOption] = useState('')
  const [selectedDoctorOption, setSelectedDoctorOption] = useState('')
  const [prefixValue, setPrefixValue] = useState<any>('')
  const [suffixValue, setSuffixValue] = useState<any>('')
  const [patientType, setPatientType] = useState('REGULAR')
  const [showInsurance, setShowInsurance] = useState(false)
  const [showReferralInfo, setShowReferralInfo] = useState(false)
  const [showSearchModal, setShowSearchModal] = useState<boolean>(false)
  const [searchModalData, setSearchModalData] = useState({})
  const [showDoctorModal, setShowDoctorModal] = useState<boolean>(false)
  const [doctorModalData, setDoctorModalData] = useState({})
  const [showPatientInfoModal, setShowPatientInfoModal] =
    useState<boolean>(false)
  const [showInsuranceModal, setShowInsuranceModal] = useState<boolean>(false)
  const [insuranceModalData, setInsuranceModalData] = useState({})
  const [showSettleInvoiceModal, setShowSettleInvoiceModal] =
    useState<boolean>(false)
  const [imageFiles, setImageFiles] = useState(
    { name: '', data_uri: '' } || null
  )
  const [branchName, setBranchName] = useState<any>('')
  const [selectedBranchNameId, setSelectedBranchNameId] = useState<any>()
  const [showDescriptionModal, setShowDescriptionModal] =
    useState<boolean>(false)
  const [descriptionPopupData, setDescriptionPopupData] = useState<any>({})
  const [showNotesModal, setShowNotesModal] = useState<boolean>(false)
  const [notesPopupData, setNotesPopupData] = useState<any>({})
  const [showApprovalNoModal, setShowApprovalNoModal] = useState<boolean>(false)
  const [approvalNoPopupData, setApprovalNoPopupData] = useState<any>({});
  const [patientInfoDisabled, setPatientInfoDisabled] = useState<boolean>(false);


  useEffect(() => {
    if (radiologyPatientInvoiceData?.patient_type === 'OUT PATIENT') {
      setPatientType('OUT PATIENT')
    } else {
      setPatientType('REGULAR')
    }
  }, [radiologyPatientInvoiceData?.patient_type])

  // handleshowInsurance
  const handleShowInsurance = () => {
    setShowInsurance(!showInsurance)
  }

  // handleshowReferralInfo
  const handleShowReferralInfo = () => {
    setShowReferralInfo(!showReferralInfo)
  }

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
  } = useForm<IRadiologyPatientInvoiceForm>({})

  const [selecteddoctorName, setSelectedDoctorName] = useState<any>(
    doctorDataById?._id
  )

  const onSubmit: SubmitHandler<IRadiologyPatientInvoiceForm> = (data: any) => {
    data.patient_type = patientType
    data.refer_by = selecteddoctorName
    data.insurance_approval_no = selectedInsurancePlan?.insurance_approval_no
    data.patient_insurance_id = selectedInsurancePlan?.patient_insurance_id
    console.log('data>>>>>>>', data)
    dispatch(saveRadiologyPatientInvoiceData(data))
    navigate('/radiology-invoice/services')
  }

  useEffect(() => {
    if (doctorDataById?._id) {
      setSelectedDoctorName(doctorDataById?._id)
    }
  }, [doctorDataById?._id])

  // handleSearchPopup
  const handleSearchPopup = () => {
    setShowSearchModal(!showSearchModal)

  }
  // search modal close
  const handleSearchModalClose = () => {
    setShowSearchModal(!showSearchModal)
    setSearchModalData({})
  }

  // handleDoctorPopup
  const handleDoctorPopup = () => {
    setShowDoctorModal(!showDoctorModal)
  }
  // Doctor modal close
  const handleDoctorModalClose = () => {
    setShowDoctorModal(!showDoctorModal)
    setDoctorModalData({})
  }

  // handlePatientInfoPopup
  const handlePatientInfoPopup = () => {
    setShowPatientInfoModal(!showPatientInfoModal)
  }

  // handleInsurancePopup
  const handleInsurancePopup = () => {
    if (!invoiceObjectById?._id) {
      dispatch(
        setMessage({
          message: 'Please load patient id first',
          type: failure,
        })
      )
    } else {
      setShowInsuranceModal(!showInsuranceModal)
      setInsuranceModalData(invoiceObjectById)
    }
  }
  //Insurance modale close
  const handleInsuranceModalClose = () => {
    setShowInsuranceModal(!showInsuranceModal)
    setInsuranceModalData({})
  }

  // handleSettled invoice
  const handleSettledInvoice = () => {
    // if (!invoiceObjectById?._id) {
    //   dispatch(
    //     setMessage({
    //       message: 'Please load patient data',
    //       type: failure,
    //     })
    //   )
    // } else {
    //   setShowSettleInvoiceModal(true)
    // }
    setShowSettleInvoiceModal(true)
  }

  // set the data on form
  useEffect(() => {
    if (invoiceObjectById?.name) {
      reset(invoiceObjectById);
      setPatientInfoDisabled(true)
    }
  }, [reset, invoiceObjectById])

  useEffect(() => {
    if (invoiceObjectById?.profile_pic) {
      setImageFiles({
        name: 'abc.jpg',
        data_uri: invoiceObjectById?.profile_pic,
      })
    }
  }, [invoiceObjectById?.profile_pic])

  useEffect(() => {
    if (invoiceObjectById?.patient_default_branch_id) {
      setSelectedOption(invoiceObjectById?.patient_default_branch_id)
      const selectedBranchId = branchData?.branches?.filter(
        (item: any) =>
          item?._id === invoiceObjectById?.patient_default_branch_id
      )
    }
  }, [invoiceObjectById?.patient_default_branch_id])

  useEffect(() => {
    if (invoiceObjectById?.patient_primary_Doctor) {
      setSelectedDoctorOption(invoiceObjectById?.patient_primary_Doctor)
    }
  }, [invoiceObjectById?.patient_primary_Doctor])

  useEffect(() => {
    if (invoiceObjectById?.emr_no) {
      const fileNumber = invoiceObjectById?.emr_no
      setPrefixValue(fileNumber?.substring(0, 2))
      setSuffixValue(fileNumber?.slice(2))
    }
    // else if (branchData?.defaultBranch !== null) {
    //   setPrefixValue(branchData?.defaultBranch?.initials)
    // }
  }, [invoiceObjectById?.emr_no])

  const handleSelectBranchChange = (e: any) => {
    const selectedBranch = branchData?.branches.find(
      (branch: any) => branch?._id === e.target.value
    )
    if (branchData?.defaultBranch !== null) {
      setSelectedOption(e.target.value)
      setBranchName(selectedBranch?.name)
      setSelectedBranchNameId(selectedBranch?._id)
    } else {
      setSelectedOption(e.target.value)
      setBranchName(selectedBranch?.name)
      // setPrefixValue(selectedBranch?.initials)
      setSelectedBranchNameId(selectedBranch?._id)
    }
  }

  // useEffect(() => {
  //   let data = {
  //     search: '',
  //     page: 0,
  //     pageSize: 100,
  //     department: '',
  //     branch: selectedBranchNameId,
  //   }
  //   selectedBranchNameId && dispatch(getAllDoctors(requestGenerator(data)))
  // }, [dispatch, selectedBranchNameId])
  useEffect(() => {
    let data = {
      search: '',
      page: 0,
      pageSize: 100,
    }
    dispatch(getAllDoctors(requestGenerator(data)))
  }, [dispatch])

  const handleSelectDoctorChange = (e: any) => {
    const selectedDoctor = doctorData.find(
      (branch: any) => branch?._id === e.target.value
    )
    setSelectedDoctorOption(selectedDoctor?._id)
  }

  const handleClear = () => {
    if (branchData?.defaultBranch !== null) {
      dispatch(clearRegularPatientData())
      dispatch(clearDoctorIdState())
      setPrefixValue('')
      setSuffixValue('')
      setValue(RADIOLOGY_INVOICE_PATIENT_BRANCH_NAME, '')
      setValue(RADIOLOGY_INVOICE_PATIENT_FILE_NO, '')
      setValue(RADIOLOGY_INVOICE_PATIENT_NAME, '')
      setValue(RADIOLOGY_INVOICE_PATIENT_PRIMARY_DOCTOR, '')
      setValue(RADIOLOGY_INVOICE_PATIENT_MOBILE_NO, '')
      setValue(RADIOLOGY_INVOICE_PATIENT_NATIONAL_ID, '')
      setValue(RADIOLOGY_INVOICE_DOCTOR_NAME, '')
      setValue(RADIOLOGY_INVOICE_REFER_BY, '')
      setValue(RADIOLOGY_INVOICE_REFERRAL_TYPE, '')
      setImageFiles({ name: '', data_uri: '' })
      setBranchName('')
      setSelectedOption('')
      setSelectedBranchNameId('')
      setSelectedDoctorOption('')
      // setShowPatientInfoModal(false)
      setPatientInfoDisabled(false)
      setPatientType('OUT PATIENT')
    } else {
      dispatch(clearRegularPatientData())
      dispatch(clearDoctorIdState())
      setPrefixValue('')
      setSuffixValue('')
      setValue(RADIOLOGY_INVOICE_PATIENT_BRANCH_NAME, '')
      setValue(RADIOLOGY_INVOICE_PATIENT_FILE_NO, '')
      setValue(RADIOLOGY_INVOICE_PATIENT_NAME, '')
      setValue(RADIOLOGY_INVOICE_PATIENT_PRIMARY_DOCTOR, '')
      setValue(RADIOLOGY_INVOICE_PATIENT_MOBILE_NO, '')
      setValue(RADIOLOGY_INVOICE_PATIENT_NATIONAL_ID, '')
      setValue(RADIOLOGY_INVOICE_DOCTOR_NAME, '')
      setValue(RADIOLOGY_INVOICE_REFER_BY, '')
      setValue(RADIOLOGY_INVOICE_REFERRAL_TYPE, '')
      setImageFiles({ name: '', data_uri: '' })
      setBranchName('')
      setSelectedOption('')
      setSelectedBranchNameId('')
      setSelectedDoctorOption('')
      // setShowPatientInfoModal(false)
      setPatientInfoDisabled(false)
      setPatientType('OUT PATIENT')
    }
  }

  const handleRadioChange = (e: any) => {
    setPatientType(e.target.value)
    if (e.target.value === 'OUT PATIENT') {
      handleClear()
    }
  }

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (
        showPatientInfoModal &&
        ref.current &&
        !ref.current.contains(e.target)
      ) {
        setShowPatientInfoModal(false)
      }
    }
    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside)
    }
  }, [showPatientInfoModal])

  const descriptionModalClose = () => {
    setDescriptionPopupData({})
    setShowDescriptionModal((prevState) => !prevState)
  }

  const handleDescriptionModalOpen = (item: any) => {
    const payload = {
      description: item?.details,
    }
    setShowDescriptionModal(!showDescriptionModal)
    setDescriptionPopupData(payload)
  }

  const notesModalClose = () => {
    setNotesPopupData({})
    setShowNotesModal((prevState) => !prevState)
  }

  const handleNotesModalOpen = (item: any) => {
    const payload = {
      description: item?.notes,
    }
    setShowNotesModal(!showNotesModal)
    setNotesPopupData(payload)
  }

  // handleApprovalNoPopup
  const handleApprovalNoPopup = (item: any) => {
    const payload = {
      patient_insurance_id: item?._id,
      insurance_plan: item?.insurance_plan,
    }
    setShowApprovalNoModal(!showApprovalNoModal)
    setApprovalNoPopupData(payload)
  }
  //ApprovalNo modal close
  const handleApprovalNoModalClose = () => {
    setShowApprovalNoModal((prevState) => !prevState)
    setApprovalNoPopupData({})
  }

  const handlePadStart = (invoiceNo: any) => {
    let padstartInvoiceNumber = invoiceNo
    let invoice_number = String(padstartInvoiceNumber).padStart(6, '0')
    return invoice_number
  }

  useEffect(() => {
    if (radiologyPatientInvoiceData) {
      setValue(RADIOLOGY_INVOICE_PATIENT_BRANCH_NAME, radiologyPatientInvoiceData?.patient_default_branch_id);
      setValue(RADIOLOGY_INVOICE_PATIENT_PRIMARY_DOCTOR, radiologyPatientInvoiceData?.patient_primary_Doctor_radiology);
    }
  }, [])


  return (
    <>
      {/* popup section */}

      {showSearchModal && (
        <Popup
          Children={SearchModal}
          popData={searchModalData}
          handleClose={() => handleSearchModalClose()}
          setModelOpenClose={setShowSearchModal}
          invoiceFlag={true}
          message="RADIOLOGY"
        />
      )}

      {showDoctorModal && (
        <Popup
          Children={DoctorModal}
          popData={doctorModalData}
          handleClose={() => handleDoctorModalClose()}
          setModelOpenClose={setShowDoctorModal}
        />
      )}

      {showInsuranceModal && (
        <Popup
          Children={AddInsuranceModal}
          popData={insuranceModalData}
          handleClose={() => handleInsuranceModalClose()}
          setModelOpenClose={setShowInsuranceModal}
          handleOpen={handleDescriptionModalOpen}
          handleNotesPreview={handleNotesModalOpen}
          handleInsuranceRowClick={handleApprovalNoPopup}
        />
      )}

      {showSettleInvoiceModal && (
        <Popup
          Children={SettledInvoiceModal}
          handleClose={() => setShowSettleInvoiceModal(false)}
          setModelOpenClose={setShowSettleInvoiceModal}
          message="RADIOLOGY"
          popData={invoiceObjectById}
        />
      )}

      {showDescriptionModal && (
        <Popup
          Children={DescriptionDataModal}
          handleClose={descriptionModalClose}
          popData={descriptionPopupData}
          heading={'Description'}
        />
      )}

      {showNotesModal && (
        <Popup
          Children={DescriptionDataModal}
          handleClose={notesModalClose}
          popData={notesPopupData}
          heading={'Notes'}
        />
      )}

      {showApprovalNoModal && (
        <Popup
          Children={AddInsuranceApprovalNoModal}
          handleClose={handleApprovalNoModalClose}
          popData={approvalNoPopupData}
          setModelOpenClose={setShowApprovalNoModal}
        />
      )}

      <form className={styles.mainContainer} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.mainFormContainer}>
          {/* form */}
          <div className={styles.formLayoutContainer}>
            <div className={styles.formContainer}>
              {/* branch and patient type */}
              <div className={styles.formLayout}>
                <div className={styles.labelFieldContainer}>
                  <label className={styles.labelText}>
                    Branch
                    <span className="asterick">*</span>
                  </label>
                  <div className={styles.fieldErrorContainer}>
                    <select
                      className={styles.selectInputField}
                      // value={
                      //   selectedOption
                      //     ? selectedOption
                      //     : radiologyPatientInvoiceData?.patient_default_branch_id
                      // }
                      {...register(
                        RADIOLOGY_INVOICE_PATIENT_BRANCH_NAME,
                        radiologyInvoiceValidators[
                        RADIOLOGY_INVOICE_PATIENT_BRANCH_NAME
                        ]
                      )}
                      onChange={handleSelectBranchChange}
                    >
                      <option  selected>
                        Select branch
                      </option>

                      {branchData?.branches
                        ?.filter((item: any) => item?._id)
                        .map((item: any, i: number) => {
                          return (
                            <React.Fragment key={i}>
                              <option
                                value={item?._id}
                                selected={
                                  item?._id ===
                                  invoiceObjectById?.patient_default_branch_id
                                }
                              >
                                {item?.name}
                              </option>
                            </React.Fragment>
                          )
                        })}
                    </select>
                    <div className={styles.errorContainer}>
                      <span className={styles.extraSpan}></span>
                      {errors[RADIOLOGY_INVOICE_PATIENT_BRANCH_NAME] && (
                        <p className="dashboardFormError">
                          {
                            errors[RADIOLOGY_INVOICE_PATIENT_BRANCH_NAME]
                              .message as any
                          }
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className={styles.labelFieldContainer}>
                  <label className={styles.labelText}>Patient :</label>
                  <div
                    className={styles.fieldErrorContainer}
                    style={{ marginTop: '2px' }}
                  >
                    <label htmlFor="regular" className={styles.radioLabel}>
                      <input
                        className={styles.radioInput}
                        type="radio"
                        id="regular"
                        name="patientType"
                        value="REGULAR"
                        checked={patientType === 'REGULAR'}
                        onChange={handleRadioChange}
                      />
                      <span className={styles.customRadio} />
                      Regular
                    </label>

                    <label htmlFor="outpatient" className={styles.radioLabel}>
                      <input
                        className={styles.radioInput}
                        type="radio"
                        id="outpatient"
                        name="patientType"
                        value="OUT PATIENT"
                        onChange={handleRadioChange}
                      />
                      <span className={styles.customRadio} />
                      Out Patient
                    </label>

                    <div className={styles.errorContainer}>
                      <span className={styles.extraSpan}></span>
                      {errors[RADIOLOGY_INVOICE_PATIENT_TYPE] && (
                        <p className="dashboardFormError">
                          {
                            errors[RADIOLOGY_INVOICE_PATIENT_TYPE]
                              .message as any
                          }
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* file no and patient name */}
              <div className={styles.formLayout}>
                <div className={styles.labelFieldContainer}>
                  <label className={styles.labelText}>
                    {patientType === 'REGULAR' ? 'File No.' : 'Fixed File No.'}
                    <span className="asterick">*</span>
                  </label>
                  <div className={styles.fieldErrorContainer}>
                    {patientType === 'REGULAR' ? (
                      <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <input
                          type="text"
                          className={
                            disable
                              ? styles.disableInputFieldBranchInitials
                              : styles.inputField
                          }
                          disabled={true}
                          value={prefixValue}
                        />
                        <input
                          type="text"
                          className={
                            disable
                              ? styles.disableInputFieldFileNo
                              : styles.inputField
                          }
                          disabled={true}
                          defaultValue={suffixValue}
                        />
                      </div>
                    ) : (
                      <div>
                        <input
                          type="text"
                          className={styles.fixedFileNoinputField}
                          disabled={true}
                          value={
                            generatedInvoiceObject?.fixed_file_number
                              ? handlePadStart(
                                generatedInvoiceObject?.invoice_no
                              )
                              : 'XXXXXX'
                          }
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className={styles.labelFieldContainer}>
                  <label
                    htmlFor={RADIOLOGY_INVOICE_PATIENT_NAME}
                    className={styles.labelText}
                  >
                    Patient Name
                    <span className="asterick">*</span>
                  </label>
                  <div className={styles.fieldErrorContainer}>
                    <input
                      type="text"
                      placeholder="Enter patient name"
                      className={styles.searchInputField}
                      {...register(
                        RADIOLOGY_INVOICE_PATIENT_NAME,
                        radiologyInvoiceValidators[
                        RADIOLOGY_INVOICE_PATIENT_NAME
                        ]
                      )}
                      defaultValue={
                        invoiceObjectById?._id
                          ? invoiceObjectById?.name
                          : radiologyPatientInvoiceData?.name
                      }
                      onChange={(e) => trimValue(e)}
                      disabled={patientType === 'REGULAR' ? true : false}
                    />

                    {patientType === 'REGULAR' ? (
                      <SearchIcon
                        fillColor="#797979"
                        customClass={styles.searchIconStyle}
                        handleClick={handleSearchPopup}
                      />
                    ) : (
                      ''
                    )}

                    {patientType === 'REGULAR' ? (
                      <>
                        <span ref={ref}>
                          <EyeIcon
                            fillColor="#02BF90"
                            customClass={styles.eyeIconStyle}
                            handleClick={() => {
                              if (patientInfoDisabled) {
                                setShowPatientInfoModal(!showPatientInfoModal)
                              }
                            }}
                          />
                        </span>
                      </>
                    ) : (
                      ''
                    )}

                    {showPatientInfoModal && (
                      <GlobalPatientInfoModal
                        nationalId={invoiceObjectById?.national_id ?? ''}
                        mobileNo={invoiceObjectById?.phone ?? ''}
                        patientImage={invoiceObjectById?.profile_pic}
                      />
                    )}

                    <div className={styles.errorContainer}>
                      <span className={styles.extraSpan}></span>
                      {errors[RADIOLOGY_INVOICE_PATIENT_NAME] && (
                        <p className="dashboardFormError">
                          {
                            errors[RADIOLOGY_INVOICE_PATIENT_NAME]
                              .message as any
                          }
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* primary doctor and mobile no */}
              <div className={styles.formLayout}>
                <div className={styles.labelFieldContainer}>
                  <label className={styles.labelText}>
                    Primary Doctor
                    <span className="asterick">*</span>
                  </label>
                  <div className={styles.fieldErrorContainer}>
                    <select
                      className={styles.selectInputField}
                      placeholder="Select doctor"
                      value={
                        selectedDoctorOption
                          ? selectedDoctorOption
                          : radiologyPatientInvoiceData?.patient_primary_Doctor_radiology
                      }
                      {...register(
                        RADIOLOGY_INVOICE_PATIENT_PRIMARY_DOCTOR,
                        radiologyInvoiceValidators[
                        RADIOLOGY_INVOICE_PATIENT_PRIMARY_DOCTOR
                        ]
                      )}
                      onChange={handleSelectDoctorChange}
                    // disabled={radiologyPatientInvoiceData?.patient_primary_Doctor_radiology ? true : false}
                    >
                      <option value="" selected>
                        Select doctor
                      </option>

                      {doctorData?.map((item: any, i: number) => {
                        return (
                          <React.Fragment key={i}>
                            <option
                              value={item?._id}
                              selected={
                                item?._id ===
                                invoiceObjectById?.patient_primary_Doctor
                              }
                            >
                              {item?.doctor_name}
                            </option>
                          </React.Fragment>
                        )
                      })}
                    </select>
                    <div className={styles.errorContainer}>
                      <span className={styles.extraSpan}></span>
                      {errors[RADIOLOGY_INVOICE_PATIENT_PRIMARY_DOCTOR] && (
                        <p className="dashboardFormError">
                          {
                            errors[RADIOLOGY_INVOICE_PATIENT_PRIMARY_DOCTOR]
                              .message as any
                          }
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className={styles.labelFieldContainer}>
                  <label
                    htmlFor={RADIOLOGY_INVOICE_PATIENT_NAME}
                    className={styles.labelText}
                  >
                    Mobile No.
                    <span className="asterick">*</span>
                  </label>
                  <div className={styles.fieldErrorContainer}>
                    <PhoneInput
                      country={'kw'}
                      {...register(
                        RADIOLOGY_INVOICE_PATIENT_MOBILE_NO,
                        radiologyInvoiceValidators[
                        RADIOLOGY_INVOICE_PATIENT_MOBILE_NO
                        ]
                      )}
                      value={
                        getValues(RADIOLOGY_INVOICE_PATIENT_MOBILE_NO) ??
                        radiologyPatientInvoiceData?.phone
                      }
                      onChange={(phone: any) => {
                        const formattedPhone = phone && `+${phone}`
                        setValue(
                          RADIOLOGY_INVOICE_PATIENT_MOBILE_NO,
                          formattedPhone
                        )
                        trigger(RADIOLOGY_INVOICE_PATIENT_MOBILE_NO)
                      }}
                      inputClass={styles.phoneNumberInput}
                      disabled={patientType === 'REGULAR' ? true : false}
                    />
                    <div className={styles.errorContainer}>
                      <span className={styles.extraSpan}></span>
                      {errors[RADIOLOGY_INVOICE_PATIENT_MOBILE_NO] && (
                        <p className="dashboardFormError">
                          {
                            errors[RADIOLOGY_INVOICE_PATIENT_MOBILE_NO]
                              .message as any
                          }
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* insurance container */}
            {patientType === 'REGULAR' ? (
              <div className={styles.insuranceContainer}>
                <div>
                  <span className={styles.dividerStyleContainer}>
                    <Divider customClass={styles.dividerStyle} />
                    <span
                      className={styles.formFieldMoreContainer}
                      onClick={handleShowInsurance}
                    >
                      {!showInsurance ? (
                        <>
                          <p className={styles.dividerText}>Insurance</p>
                          <DropDownIcon
                            fillColor="#797979"
                            customClass={styles.dropDownIcon}
                          />
                        </>
                      ) : (
                        <>
                          <p className={styles.dividerText}>Insurance</p>
                          <DropDownArrowIcon
                            fillColor="#797979"
                            customClass={styles.dropDownIcon}
                          />
                        </>
                      )}
                    </span>
                    <Divider customClass={styles.dividerStyle} />
                  </span>
                </div>
                {showInsurance && (
                  <Button
                    title="Add Insurance"
                    type="button"
                    customClass={styles.insuranceButtonStyle}
                    handleClick={handleInsurancePopup}
                    disable={true}
                  />
                )}
              </div>
            ) : (
              ''
            )}
            {/* referral info container */}
            <div className={styles.referralContainer}>
              <div>
                <span className={styles.dividerStyleContainer}>
                  <Divider customClass={styles.dividerStyle} />
                  <span
                    className={styles.formFieldMoreContainer}
                    onClick={handleShowReferralInfo}
                  >
                    {!showReferralInfo ? (
                      <>
                        <p className={styles.dividerText}>Referral Info</p>
                        <DropDownIcon
                          fillColor="#797979"
                          customClass={styles.dropDownIcon}
                        />
                      </>
                    ) : (
                      <>
                        <p className={styles.dividerText}>Referral Info</p>
                        <DropDownArrowIcon
                          fillColor="#797979"
                          customClass={styles.dropDownIcon}
                        />
                      </>
                    )}
                  </span>
                  <Divider customClass={styles.dividerStyle} />
                </span>
              </div>
              {showReferralInfo && (
                <div className={styles.referralLayout}>
                  <div className={styles.labelFieldContainer}>
                    <div className={styles.fieldErrorContainer}>
                      <label htmlFor="internal" className={styles.radioLabel}>
                        <input
                          className={styles.radioInput}
                          type="radio"
                          id="internal"
                          value="INTERNAL"
                          {...register(RADIOLOGY_INVOICE_REFERRAL_TYPE)}
                        // disabled={patientType === 'REGULAR' ? true : false}
                        />
                        <span className={styles.customRadio} />
                        Internal
                      </label>

                      <label htmlFor="external" className={styles.radioLabel}>
                        <input
                          className={styles.radioInput}
                          type="radio"
                          id="external"
                          value="EXTERNAL"
                          {...register(RADIOLOGY_INVOICE_REFERRAL_TYPE)}
                          // disabled={patientType === "REGULAR" ? true : false}
                          disabled={true}
                        />
                        <span className={styles.customRadio} />
                        External
                      </label>
                    </div>
                  </div>

                  <div className={styles.fieldContainer}>
                    <label className={styles.labelText}>
                      Doctor / Medical Center
                      {/* <span className="asterick">*</span> */}
                    </label>
                    <div
                      className={styles.fieldErrorContainer}
                      onClick={() => {
                        // if (patientType === 'OUT PATIENT') {
                        handleDoctorPopup()
                        // }
                      }}
                    >
                      <input
                        type="text"
                        placeholder="Search doctor / medical center"
                        className={styles.inputField}
                        value={
                          invoiceObjectById?.patient_id
                            ? referredDoctor !== undefined
                              ? referredDoctor
                              : doctorDataById?._id
                                ? doctorDataById?.doctor_name
                                : ''
                            : doctorDataById?._id
                              ? doctorDataById?.doctor_name
                              : ''
                        }
                        onChange={(e) => trimValue(e)}
                        disabled={true}
                      />
                      <SearchIcon
                        fillColor="#797979"
                        customClass={styles.searchIconStyle}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Button
              title="Save & Next"
              type="submit"
              customClass={styles.saveButtonStyle}
            />
          </div>

          {/* amount */}
          <div className={styles.settleInvoiceAmountContainer}>
            {patientType === 'REGULAR' ? (
              <div className={styles.settleInvoiceContainer}>
                <div></div>
                <Button
                  type="button"
                  title="Settled Invoice"
                  customClass={styles.settleButton}
                  handleClick={handleSettledInvoice}
                />
              </div>
            ) : (
              ''
            )}

            <div className={styles.amountContainer}>
              {patientType === 'REGULAR' ? (
                <>
                  <div className={styles.dueAmountStyle}>
                    Due: $
                    {invoiceObjectById?._id
                      ? allowedNumberOfDigitsAfterDecimal(
                        invoiceObjectById?.outstanding_amount,
                        3
                      )
                      : '0'}
                  </div>
                  <div className={styles.advanceDueAmountStyle}>
                    Advance Due: $
                    {invoiceObjectById?.advance_amount
                      ? allowedNumberOfDigitsAfterDecimal(
                        invoiceObjectById?.advance_amount,
                        3
                      )
                      : '0'}
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.dueAmountStyle}>Due: $0</div>
                  <div className={styles.advanceDueAmountStyle}>
                    Advance Due: $0
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        {/* action bar */}
        <div className={styles.mainContainerFormActionSidebar}>
          <div className={styles.sidebarData}>
            {invoiceFormActionData?.map((item: any, index: any) => {
              return (
                <React.Fragment key={index}>
                  <div className={styles.iconStyleContainer} key={index}>
                    <item.icon
                      customClass={styles.iconStyle}
                      fillColor="#CDD4D8"
                      mouseEnter={() => setFormActionValue(index)}
                      mouseLeave={() => setFormActionValue(-1)}
                    />
                    <p className={styles.tooltiptext}>{item.name}</p>
                  </div>
                </React.Fragment>
              )
            })}
          </div>
        </div>
      </form>
    </>
  )
}

export default RadiologyInvoiceInformation

import React, { useEffect, useRef, useState } from 'react'
import styles from './LabInformation.module.scss'
import { ILabInvoiceForm } from '../../../interfaces/interfaces'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  LAB_INVOICE_PATIENT_BRANCH_NAME,
  // LAB_INVOICE_PATIENT_TYPE,
  LAB_INVOICE_PATIENT_FILE_NO,
  LAB_INVOICE_PATIENT_NAME,
  LAB_INVOICE_PATIENT_PRIMARY_DOCTOR,
  LAB_INVOICE_PATIENT_MOBILE_NO,
  // LAB_INVOICE_PATIENT_PROFILE_PIC,
  LAB_INVOICE_PATIENT_NATIONAL_ID,
  LAB_INVOICE_DOCTOR_NAME,
  LAB_INVOICE_REFERRAL_TYPE,
} from '../../../constants/constant'
import {
  allowedNumberOfDigitsAfterDecimal,
  trimValue,
} from '../../../utils/utils'
import {
  DropDownArrowIcon,
  DropDownIcon,
  EyeIcon,
  SearchIcon,
} from '../../../components/common/svg-components'
import Divider from '../../../components/common/divider/Divider'
import Button from '../../../components/common/button/Button'
import PhoneInput from 'react-phone-input-2'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { invoiceFormActionData } from '../../../constants/data'
import Popup from '../../../components/common/popup/Popup'
import {
  clearInvoicePatientObject,
  labInformation,
} from '../../../redux/features/lab-invoice/labInvoiceSlice'
import { getAllPrimaryDoctors } from '../../../redux/features/lab-invoice/labInvoiceAsyncActions'
import { requestGenerator } from '../../../utils/payloadGenerator'
import { useLocation, useNavigate } from 'react-router-dom'
import { labInvoiceValidators } from '../../../form-validators/labInvoice Validator'
import InsuranceModal from '../../../components/common/modal/lab-add-insurance-modal/InsuranceModal'
import LabPatientSearchmodal from '../../../components/common/modal/lab-patientSerarch-modal/LabPatientSearchmodal'
import DoctorSearchmodal from '../../../components/common/modal/lab-doctorSearch-modal/DoctorSearchmodal'
import SettledInvoiceV1Modal from '../../../components/common/modal/lab-settledInvoice-modal/SettledInvoiceV1Modal'
import GlobalPatientInfoModal from '../../../components/common/patient-info-modal/PatientInfoModal'

const LabInformation = () => {
  const [selectedOption, setSelectedOption] = useState('')
  const [patientType, setPatientType] = useState('')

  const [disable, setDisable] = useState<any>(true)
  const [prefixValue, setPrefixValue] = useState<any>('')
  const [suffixValue, setSuffixValue] = useState<any>('')
  const [showSearchModal, setShowSearchModal] = useState<boolean>(false)
  const [showPatientInfoModal, setShowPatientInfoModal] =
    useState<boolean>(false)
  const [patientInfoDisabled, setPatientInfoDisabled] = useState<boolean>(false)
  const [showInsuranceModal, setShowInsuranceModal] = useState<boolean>(false)
  const [showInsurance, setShowInsurance] = useState(false)
  const [showReferralInfo, setShowReferralInfo] = useState(false)
  const [showCheckInternal, setShowCheckInternal] = useState('INTERNAL')
  const [showDoctorModal, setShowDoctorModal] = useState<boolean>(false)
  const [showSettleInvoiceModal, setShowSettleInvoiceModal] =
    useState<boolean>(false)
  const [formActionValue, setFormActionValue] = useState(-1)
  const [searchModalData, setSearchModalData] = useState({})
  const [doctorModalData, setDoctorModalData] = useState({})
  const [branchName, setBranchName] = useState<any>('')
  const [selectedBranchNameId, setSelectedBranchNameId] = useState<any>('')
  const [imageFiles, setImageFiles] = useState(
    { name: '', data_uri: '' } || null
  )
  const [outStandingAmount, setoutStandingAmount] = useState(0)
  const [advancedAmount, setadvancedAmount] = useState(0)
  const [doctorData, setdoctorData] = useState<any>('')

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const location = useLocation()

  const { branchData } = useAppSelector((state) => state.login)
  const { primaryDoctorsList, patientSearchObject, labInformationData } =
    useAppSelector((state) => state.labInvoice);

  const ref = useRef<any>();

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
  } = useForm<ILabInvoiceForm>({})

  // Submit Function
  const onSubmit: SubmitHandler<ILabInvoiceForm> = (data) => {
    data.patient_type = patientType
    console.log(data, 'DATA')
    dispatch(labInformation(data))
    navigate('/invoice/labservices')
  }

  const handleClear = () => {
    if (branchData?.defaultBranch !== null) {
      setPrefixValue(branchData?.defaultBranch?.initials)
      setSuffixValue('')
      dispatch(clearInvoicePatientObject())
      setValue(LAB_INVOICE_PATIENT_BRANCH_NAME, '')
      setValue(LAB_INVOICE_PATIENT_FILE_NO, '')
      setValue(LAB_INVOICE_PATIENT_NAME, '')
      setValue(LAB_INVOICE_PATIENT_MOBILE_NO, '')
      setValue(LAB_INVOICE_PATIENT_NATIONAL_ID, '')
      setValue(LAB_INVOICE_DOCTOR_NAME, '')
      setValue(LAB_INVOICE_REFERRAL_TYPE, '')
      setValue(LAB_INVOICE_PATIENT_PRIMARY_DOCTOR, '')
      setImageFiles({ name: '', data_uri: '' })
      setBranchName('')
      setSelectedOption('')
      setSelectedBranchNameId('')
      setPatientInfoDisabled(false)
      setPatientType('OUT PATIENT')
    } else {
      setPrefixValue('')
      setSuffixValue('')
      dispatch(clearInvoicePatientObject())
      setValue(LAB_INVOICE_PATIENT_BRANCH_NAME, '')
      setValue(LAB_INVOICE_PATIENT_FILE_NO, '')
      setValue(LAB_INVOICE_PATIENT_NAME, '')
      setValue(LAB_INVOICE_PATIENT_PRIMARY_DOCTOR, '')
      setValue(LAB_INVOICE_PATIENT_MOBILE_NO, '')
      setValue(LAB_INVOICE_PATIENT_NATIONAL_ID, '')
      setValue(LAB_INVOICE_DOCTOR_NAME, '')
      setValue(LAB_INVOICE_REFERRAL_TYPE, '')
      setImageFiles({ name: '', data_uri: '' })
      setBranchName('')
      setSelectedOption('')
      setSelectedBranchNameId('')
      setPatientInfoDisabled(false)
      setPatientType('OUT PATIENT')
    }
  }

  // Patient Type Change
  const handleRadioChange = (e: any) => {
    const { value } = e.target
    setoutStandingAmount(0)
    setadvancedAmount(0)
    setPatientType(value)
    if (e.target.value === 'OUT PATIENT') {
      handleClear()
    }
  }

  // For Set OutPatient
  useEffect(() => {
    if (location?.state?.patient_type === 'OUT PATIENT') {
      reset(location?.state)
      setPatientType(location?.state?.patient_type)
    } else {
      setPatientType('REGULAR')
    }
  }, [])

  // handle Patient Search Popup
  const handleSearchPopup = () => {
    setShowSearchModal(!showSearchModal)
  }

  // Show Insurance Section
  const handleShowInsurance = () => {
    setShowInsurance(!showInsurance)
  }

  // handle Insurance Popup
  const handleInsurancePopup = () => {
    setShowInsuranceModal(!showInsuranceModal)
  }

  // Show Referral Info Section
  const handleShowReferralInfo = () => {
    setShowReferralInfo(!showReferralInfo)
  }

  // handle Doctor Popup
  const handleDoctorPopup = () => {
    setShowDoctorModal(!showDoctorModal)
  }

  // PatientInfo modal close
  const handleInsuranceModalClose = () => {
    setShowInsuranceModal(!showInsuranceModal)
    // setInsuranceModalData({});
  }

  // Doctor modal close
  const handleDoctorModalClose = () => {
    setShowDoctorModal(!showDoctorModal)
  }

  // search modal close
  const handleSearchModalClose = () => {
    setShowSearchModal(!showSearchModal)
  }

  // Set Patient Data on Form...
  useEffect(() => {
    if (patientSearchObject?.name) {
      setPatientInfoDisabled(true)
      reset(patientSearchObject)
      setoutStandingAmount(patientSearchObject?.outstanding_amount)
      setadvancedAmount(patientSearchObject?.advance_amount);
    }
  }, [patientSearchObject])

  useEffect(() => {
    if (patientSearchObject === null) {
      // handleClear()
      // setPatientType('REGULAR')
      setoutStandingAmount(0)
      setadvancedAmount(0)
    }
  }, [patientSearchObject])

  // For Patient Profile
  useEffect(() => {
    if (patientSearchObject?.profile_pic) {
      setImageFiles({
        name: 'abc.jpg',
        data_uri: patientSearchObject?.profile_pic,
      })
    }
  }, [patientSearchObject?.profile_pic])

  // For Branch Select...
  useEffect(() => {
    if (patientSearchObject?.patient_default_branch_id) {
      setSelectedOption(patientSearchObject?.patient_default_branch_id)
      const selectedBranchId = branchData?.branches?.filter(
        (item: any) =>
          item?._id === patientSearchObject?.patient_default_branch_id
      )
    }
  }, [patientSearchObject?.patient_default_branch_id])

  // ** change made by divyaraj
  // For Fixed File Number

  useEffect(() => {
    if (patientSearchObject?.emr_no) {
      const fileNumber = patientSearchObject?.emr_no
      setPrefixValue(fileNumber?.substring(0, 2))
      setSuffixValue(fileNumber?.slice(2))
    } else if (branchData?.defaultBranch !== null) {
      // setPrefixValue(branchData?.defaultBranch?.initials)
    }
  }, [patientSearchObject?.emr_no])

  // handle Branch Selection...
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

  // Primary Doctor
  useEffect(() => {
    let data = {
      search: '',
      page: 0,
      pageSize: 100,
    }
    dispatch(getAllPrimaryDoctors(requestGenerator(data)))
  }, [dispatch])

  // Set Doctor OR Medical Center
  const handleDoctorName = (item: any) => {
    setShowDoctorModal(!showDoctorModal)
    setValue(LAB_INVOICE_DOCTOR_NAME, item.doctor_name)
  }

  // Handle Refraal Type
  const handleRefrralType = (e: any) => {
    const { value } = e.target
    setShowCheckInternal(value)
  }

  // Close Patient Info Modal
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

  // handle Patient Settled Invoice
  const handleSettledInvoice = () => {
    setShowSettleInvoiceModal(true)
  }

  // handle Patient Info Modal
  const handlePatientInfoModal = () => {
    if (patientInfoDisabled) {
      setShowPatientInfoModal(!showPatientInfoModal)
    }
  }

  useEffect(() => {
    if (labInformationData) {
      setValue(LAB_INVOICE_DOCTOR_NAME, labInformationData?.doctor_name);
      setValue(LAB_INVOICE_PATIENT_PRIMARY_DOCTOR, labInformationData?.patient_primary_Doctor_lab);
      setValue(LAB_INVOICE_PATIENT_BRANCH_NAME, labInformationData?.patient_default_branch_id);
    }
  }, [])


  return (
    <>
      {showSearchModal && (
        <Popup
          Children={LabPatientSearchmodal}
          popData={searchModalData}
          handleClose={() => handleSearchModalClose()}
          setModelOpenClose={setShowSearchModal}
        />
      )}

      {showDoctorModal && (
        <Popup
          Children={DoctorSearchmodal}
          popData={doctorModalData}
          handleClose={() => handleDoctorModalClose()}
          setModelOpenClose={setShowDoctorModal}
          handleRowClick={handleDoctorName}
        />
      )}

      {showInsuranceModal && (
        <Popup
          Children={InsuranceModal}
          // popData={insuranceModalData}
          handleClose={() => handleInsuranceModalClose()}
          setModelOpenClose={setShowInsuranceModal}
          popData={patientSearchObject?.patient_id}
        />
      )}

      {showSettleInvoiceModal && (
        <Popup
          Children={SettledInvoiceV1Modal}
          handleClose={() => setShowSettleInvoiceModal(false)}
          setModelOpenClose={setShowSettleInvoiceModal}
          popData={patientSearchObject}
        />
      )}

      <form className={styles.mainContainer} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.mainFormContainer}>
          {/* form */}
          <div className={styles.formLayoutContainer}>
            <div className={styles.formContainer}>
              {/* Branch and Patient Type */}
              <div className={styles.formLayout}>
                {/* branch */}
                <>
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
                        //     : patientSearchObject?.patient_default_branch_id
                        // }
                        {...register(
                          LAB_INVOICE_PATIENT_BRANCH_NAME,
                          labInvoiceValidators[LAB_INVOICE_PATIENT_BRANCH_NAME]
                        )}
                        // onChange={handleSelectBranchChange}
                        placeholder='Select Branch'
                      >
                        <option value="">Select branch</option>

                        {branchData?.branches
                          ?.filter((item: any) => item?._id)
                          .map((item: any, i: number) => {
                            return (
                              <React.Fragment key={i}>
                                <option
                                  value={item?._id}
                                  selected={
                                    item?._id === patientSearchObject?.patient_default_branch_id
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
                        {errors[LAB_INVOICE_PATIENT_BRANCH_NAME] && (
                          <p className="dashboardFormError">
                            {
                              errors[LAB_INVOICE_PATIENT_BRANCH_NAME]
                                .message as any
                            }
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </>

                {/* Patient Type */}
                <div className={styles.labelFieldContainer}>
                  <label className={styles.labelText}>Patient :</label>
                  <div className={styles.fieldErrorContainer}>
                    <label htmlFor="regular" className={styles.radioLabel}>
                      <input
                        className={styles.radioInput}
                        type="radio"
                        id="regular"
                        value="REGULAR"
                        checked={patientType === 'REGULAR'}
                        // {...register(LAB_INVOICE_PATIENT_TYPE)}
                        onChange={handleRadioChange}
                      />
                      <span className={styles.customRadio} />
                      Regular
                    </label>

                    <label htmlFor="outPatient" className={styles.radioLabel}>
                      <input
                        className={styles.radioInput}
                        type="radio"
                        id="outPatient"
                        value="OUT PATIENT"
                        // {...register(LAB_INVOICE_PATIENT_TYPE)}
                        checked={patientType === 'OUT PATIENT'}
                        onChange={handleRadioChange}
                      />
                      <span className={styles.customRadio} />
                      Out Patient
                    </label>
                  </div>
                </div>
              </div>

              {/* file no and patient name */}
              <div className={styles.formLayout}>
                {/* File Number */}

                {patientType === 'OUT PATIENT' ? (
                  <>
                    <div className={styles.labelFieldContainer}>
                      <label
                        htmlFor={LAB_INVOICE_PATIENT_NAME}
                        className={styles.labelText}
                      >
                        Fixed File No
                        <span className="asterick">*</span>
                      </label>
                      <div className={styles.fieldErrorContainer}>
                        <input
                          type="text"
                          className={styles.searchInputField}
                          onChange={(e) => trimValue(e)}
                          disabled={true}
                          value="xxxxxx"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={styles.labelFieldContainer}>
                      <label className={styles.labelText}>
                        File No.
                        <span className="asterick">*</span>
                      </label>
                      <div className={styles.fieldErrorContainer}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                          <input
                            type="text"
                            className={styles.disableInputFieldBranchInitials}
                            disabled={true}
                            value={prefixValue}
                          />
                          <input
                            type="text"
                            className={styles.disableInputFieldFileNo}
                            disabled={true}
                            defaultValue={suffixValue}
                          />

                          <SearchIcon
                            fillColor="#797979"
                            customClass={styles.fixSearchIconStyle}
                            handleClick={handleSearchPopup}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/*  Patient Name */}
                <div className={styles.labelFieldContainer}>
                  <label
                    htmlFor={LAB_INVOICE_PATIENT_NAME}
                    className={styles.labelText}
                  >
                    Patient Name
                    <span className="asterick">*</span>
                  </label>
                  <div className={styles.fieldErrorContainer}>
                    <input
                      type="text"
                      placeholder="Patient Name"
                      // className={[styles.searchInputField, patientType === "REGULAR" && styles.disabledPatientname]?.join(' ')}
                      className={styles.searchInputField}
                      {...register(
                        LAB_INVOICE_PATIENT_NAME,
                        labInvoiceValidators[LAB_INVOICE_PATIENT_NAME]
                      )}
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
                            handleClick={handlePatientInfoModal}
                          />
                        </span>
                      </>
                    ) : (
                      ''
                    )}

                    {showPatientInfoModal && (
                      <GlobalPatientInfoModal
                        nationalId={patientSearchObject?.national_id ?? ''}
                        mobileNo={patientSearchObject?.phone ?? ''}
                        patientImage={patientSearchObject?.profile_pic}
                      />
                    )}

                    <div className={styles.errorContainer}>
                      <span className={styles.extraSpan}></span>
                      {errors[LAB_INVOICE_PATIENT_NAME] && (
                        <p className="dashboardFormError">
                          {errors[LAB_INVOICE_PATIENT_NAME].message as any}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* primary doctor and mobile no */}
              <div className={styles.formLayout}>
                {/* Primary Doctor */}
                <div className={styles.labelFieldContainer}>
                  <label className={styles.labelText}>
                    Primary Doctor
                    <span className="asterick">*</span>
                  </label>
                  <div className={styles.fieldErrorContainer}>
                    <select
                      className={styles.selectInputField}
                      {...register(
                        LAB_INVOICE_PATIENT_PRIMARY_DOCTOR,
                        labInvoiceValidators[LAB_INVOICE_PATIENT_PRIMARY_DOCTOR]
                      )}
                    // disabled={
                    //   patientSearchObject?.patient_primary_Doctor_lab
                    //     ? true
                    //     : false
                    // }
                    >
                      <option value="">Select doctor</option>

                      {primaryDoctorsList
                        ?.filter((item: any) => item?._id)
                        .map((item: any, i: number) => {
                          return (
                            <React.Fragment key={i}>
                              <option
                                value={item?._id}
                                selected={
                                  item?._id === labInformationData?.patient_primary_Doctor_lab ? labInformationData?.patient_primary_Doctor_lab
                                    : patientSearchObject?.patient_primary_Doctor_lab
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
                      {errors[LAB_INVOICE_PATIENT_PRIMARY_DOCTOR] && (
                        <p className="dashboardFormError">
                          {
                            errors[LAB_INVOICE_PATIENT_PRIMARY_DOCTOR]
                              .message as any
                          }
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Mobile Number */}
                <div className={styles.labelFieldContainer}>
                  <label
                    htmlFor={LAB_INVOICE_PATIENT_MOBILE_NO}
                    className={styles.labelText}
                  >
                    Mobile No.
                    <span className="asterick">*</span>
                  </label>
                  <div className={styles.fieldErrorContainer}>
                    <PhoneInput
                      country={'kw'}
                      {...register(
                        LAB_INVOICE_PATIENT_MOBILE_NO,
                        labInvoiceValidators[LAB_INVOICE_PATIENT_MOBILE_NO]
                      )}
                      value={getValues(LAB_INVOICE_PATIENT_MOBILE_NO)}
                      onChange={(phone: any) => {
                        const formattedPhone = phone && `+${phone}`
                        setValue(LAB_INVOICE_PATIENT_MOBILE_NO, formattedPhone)
                        trigger(LAB_INVOICE_PATIENT_MOBILE_NO)
                      }}
                      // inputClass={styles.phoneNumberInput}
                      inputClass={[
                        styles.phoneNumberInput,
                        patientType === 'REGULAR' && styles.disabledPatientname,
                      ]?.join(' ')}
                      disabled={patientType === 'REGULAR' ? true : false}
                    />
                    <div className={styles.errorContainer}>
                      <span className={styles.extraSpan}></span>
                      {errors[LAB_INVOICE_PATIENT_MOBILE_NO] && (
                        <p className="dashboardFormError">
                          {errors[LAB_INVOICE_PATIENT_MOBILE_NO].message as any}
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
                  <div className={styles.insuranceButtonContainer}>
                    <Button
                      title="Add Insurance"
                      type="button"
                      customClass={styles.insuranceButtonStyle}
                      handleClick={handleInsurancePopup}
                      disable={true}
                    />
                  </div>
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
                  <div className={styles.referralLayout}>
                    {/* ................ */}
                    <div className={styles.labelFieldContainer}>
                      <div className={styles.fieldErrorContainer}>
                        <label htmlFor="internal" className={styles.radioLabel}>
                          <input
                            className={styles.radioInput}
                            type="radio"
                            id="internal"
                            value="INTERNAL"
                            // {...register(LAB_INVOICE_REFERRAL_TYPE)}
                            // disabled={
                            //   invoiceObjectById?._id ||
                            //     patientType === "OUT PATIENT"
                            //     ? false
                            //     : true
                            // }
                            checked={showCheckInternal === 'INTERNAL'}
                            onChange={(e) => {
                              handleRefrralType(e)
                            }}
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
                            // {...register(LAB_INVOICE_REFERRAL_TYPE)}
                            // disabled={
                            //   invoiceObjectById?._id ||
                            //     patientType === "OUT PATIENT"
                            //     ? false
                            //     : true
                            // }
                            // checked={showCheckInternal === 'EXTERNAL'}
                            onChange={(e) => {
                              handleRefrralType(e)
                            }}
                            disabled={true}
                          />
                          <span className={styles.customRadio} />
                          External
                        </label>
                      </div>
                    </div>
                    {/* .............................. */}

                    <div className={styles.fieldContainer}>
                      <label className={styles.labelText}>
                        Doctor / Medical Center
                      </label>
                      <div
                        className={styles.fieldErrorContainer}
                        onClick={handleDoctorPopup}
                      >
                        <input
                          type="text"
                          placeholder="Search doctor / medical center "
                          className={styles.inputField}
                          // value={doctorData}
                          {...register(LAB_INVOICE_DOCTOR_NAME)}
                          onChange={(e) => trimValue(e)}
                          disabled={true}
                        />
                        <SearchIcon
                          fillColor="#797979"
                          customClass={styles.searchIconStyle}
                        // handleClick={handleDoctorPopup}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className={styles.saveButtonContainer}>
              <Button
                title="Save & Next"
                type="submit"
                customClass={styles.saveButtonStyle}
              />
            </div>
          </div>

          {/* amount */}
          <div className={styles.settleInvoiceAmountContainer}>
            {patientType === 'REGULAR' ? (
              <div className={styles.settleInvoiceContainer}>
                <div></div>
                <Button
                  type="button"
                  title="Invoice"
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
                    Due:{' '}
                    {/* {patientSearchObject?.outstanding_amount
                      ? patientSearchObject?.outstanding_amount
                      : 0} */}
                    {allowedNumberOfDigitsAfterDecimal(outStandingAmount, 3)}
                  </div>
                  <div className={styles.paidAmountStyle}>
                    Advance Due:{' '}
                    {/* {patientSearchObject?.paid_amount
                      ? patientSearchObject?.paid_amount
                      : 0} */}
                    {/* {advancedAmount} */}
                    {allowedNumberOfDigitsAfterDecimal(advancedAmount, 3)}
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.dueAmountStyle}>Due: $0</div>
                  <div className={styles.paidAmountStyle}>Advance Due: $0</div>
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

export default LabInformation

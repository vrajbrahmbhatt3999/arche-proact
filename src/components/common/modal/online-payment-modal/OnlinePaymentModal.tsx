import React, { FC, useEffect, useState } from 'react'
import styles from './onlinePaymentModal.module.scss'
import { CloseIcon } from '../../svg-components'
import { colors } from '../../../../constants/color'
import Divider from '../../divider/Divider'
import Button from '../../button/Button'
import { trimValue } from '../../../../utils/utils'
import { onlinePaymentValidator } from '../../../../form-validators/onlinePaymentValidator'
import {
  INVOICE_ONLINE_PAYMENT_AMOUNT,
  INVOICE_ONLINE_PAYMENT_BRANCH,
  INVOICE_ONLINE_PAYMENT_MOBILE_NO,
  INVOICE_ONLINE_PAYMENT_NAME,
  INVOICE_ONLINE_PAYMENT_NOTES,
  INVOICE_ONLINE_PAYMENT_REF_NO,
  INVOICE_ONLINE_PAYMENT_URL,
} from '../../../../constants/constant'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IOnlinePaymentForm } from '../../../../interfaces/interfaces'
import Select from 'react-select'
import PhoneInput from 'react-phone-input-2'
import { useAppDispatch, useAppSelector } from '../../../../hooks'
import { requestGenerator } from '../../../../utils/payloadGenerator'
import { getOnlinePayment } from '../../../../redux/features/invoice-module/invoiceAsynActions'
import { useNavigate } from 'react-router-dom'
import { clearInvoiceServiceData } from '../../../../redux/features/treatmentPlans/treatmentPlansSlice'
import { clearInvoicePatientData } from '../../../../redux/features/invoice-module/invoiceSlice'
import { clearDoctorIdState } from '../../../../redux/features/receptionist/receptionistSlice'
import { clearLabInvoicePatientData } from '../../../../redux/features/lab-invoice/labInvoiceSlice'
import { clearRadiologyInvoiceData } from '../../../../redux/features/radiology/radiologySlice'

interface IOnlinePaymentModal {
  handleClose?: any
  popData?: string | any
  setModelOpenClose?: any
  message: string
}

const OnlinePaymentModal: FC<IOnlinePaymentModal> = ({
  handleClose,
  popData,
  setModelOpenClose,
  message,
}) => {
  console.log('popData??>>', popData)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [showNote, setShowNote] = useState('')
  const [selectedOption, setSelectedOption] = useState('')
  const [branchName, setBranchName] = useState<any>('')
  const [selectedBranchNameId, setSelectedBranchNameId] = useState<any>()

  const { branchData } = useAppSelector((state) => state.login)

  useEffect(() => {
    if (popData?.patient_default_branch_id) {
      setSelectedOption(popData?.patient_default_branch_id)
      const selectedBranchId = branchData?.branches?.filter(
        (item: any) => item?._id === popData?.patient_default_branch_id
      )
    }
  }, [popData?.patient_default_branch_id])

  const handleSelectBranchChange = (e: any) => {
    const selectedBranch = branchData?.branches.find(
      (branch: any) => branch?._id === e.target.value
    )
    if (branchData?.defaultBranch !== null) {
      setSelectedOption(e.target.value)
      setBranchName(selectedBranch?.name)
      setSelectedBranchNameId(selectedBranch?._id)
    }
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
  } = useForm<IOnlinePaymentForm>({})

  const onSubmit: SubmitHandler<IOnlinePaymentForm> = (data: any) => {
    popData.note = showNote
    data = popData
    console.log('data>>??', data)

    dispatch(getOnlinePayment(requestGenerator(data))).then((e) => {
      if ((e.type = 'invoice/getInvoiceOnlinePayment/fulfilled')) {
        dispatch(clearInvoiceServiceData())
        dispatch(clearInvoicePatientData())
        dispatch(clearRadiologyInvoiceData())
        dispatch(clearDoctorIdState())
        dispatch(clearLabInvoicePatientData())

        setTimeout(() => {
          setModelOpenClose(false)
          navigate(message)
        }, 1000)
      }
    })

    // static used
    // if (data !== null) {
    //   dispatch(clearInvoiceServiceData());
    //   dispatch(clearInvoicePatientData());
    //   dispatch(clearDoctorIdState());
    //   setTimeout(() => {
    //     setModelOpenClose(false);
    //     navigate("/invoice/information");
    //   }, 1000);
    // }
  }

  // set the data on form
  useEffect(() => {
    if (popData) {
      reset(popData)
    }
  }, [reset, popData])

  const handleCancel = () => {
    setModelOpenClose(false)
  }

  return (
    <>
      <div
        className={styles.mainContainer}
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
        <h1 className={styles.heading}>Pay Online</h1>
        <Divider customClass={styles.dividerStyle} />

        <form
          className={styles.formContainer}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={styles.formLayoutContainer}>
            {/* customer info field */}
            <div className={styles.formFieldContainer}>
              <div className={styles.formFieldLeftlayout}>
                {/* branch */}
                <div className={styles.labelFieldContainer}>
                  <label
                    htmlFor={INVOICE_ONLINE_PAYMENT_BRANCH}
                    className={styles.labelText}
                  >
                    Branch <span className="asterick">*</span>
                  </label>
                  <div className={styles.fieldErrorContainer}>
                    <select
                      className={styles.selectInputField}
                      value={
                        selectedOption
                          ? selectedOption
                          : popData?.patient_default_branch_id
                      }
                      {...register(
                        INVOICE_ONLINE_PAYMENT_BRANCH,
                        onlinePaymentValidator[INVOICE_ONLINE_PAYMENT_BRANCH]
                      )}
                      onChange={handleSelectBranchChange}
                      disabled={true}
                    >
                      <option value="" disabled selected hidden>
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
                                  popData?.patient_default_branch_id
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
                      {errors[INVOICE_ONLINE_PAYMENT_BRANCH] && (
                        <p className="dashboardFormError">
                          {errors[INVOICE_ONLINE_PAYMENT_BRANCH].message as any}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                {/* phone number */}
                <div className={styles.labelFieldContainer}>
                  <label
                    htmlFor={INVOICE_ONLINE_PAYMENT_MOBILE_NO}
                    className={styles.labelText}
                  >
                    Mobile No.
                    <span className="asterick">*</span>
                  </label>
                  <div className={styles.fieldErrorContainer}>
                    <PhoneInput
                      country={'kw'}
                      {...register(
                        INVOICE_ONLINE_PAYMENT_MOBILE_NO,
                        onlinePaymentValidator[INVOICE_ONLINE_PAYMENT_MOBILE_NO]
                      )}
                      value={
                        getValues(INVOICE_ONLINE_PAYMENT_MOBILE_NO) ??
                        popData?.phone
                      }
                      onChange={(phone: any) => {
                        const formattedPhone = phone && `+${phone}`
                        setValue(
                          INVOICE_ONLINE_PAYMENT_MOBILE_NO,
                          formattedPhone
                        )
                        trigger(INVOICE_ONLINE_PAYMENT_MOBILE_NO)
                      }}
                      inputClass={styles.phoneNumberInput}
                    />
                    <div className={styles.errorContainer}>
                      <span className={styles.extraSpan}></span>
                      {errors[INVOICE_ONLINE_PAYMENT_MOBILE_NO] && (
                        <p className="dashboardFormError">
                          {
                            errors[INVOICE_ONLINE_PAYMENT_MOBILE_NO]
                              .message as any
                          }
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                {/* amount */}
                <div className={styles.labelFieldContainer}>
                  <label
                    htmlFor={INVOICE_ONLINE_PAYMENT_AMOUNT}
                    className={styles.labelText}
                  >
                    Amount
                    <span className="asterick">*</span>
                  </label>
                  <div className={styles.fieldErrorContainer}>
                    <input
                      type="number"
                      placeholder="Enter amount"
                      className={styles.inputField}
                      {...register(
                        INVOICE_ONLINE_PAYMENT_AMOUNT,
                        onlinePaymentValidator[INVOICE_ONLINE_PAYMENT_AMOUNT]
                      )}
                      onChange={(e) => trimValue(e)}
                      disabled={true}
                    />

                    <div className={styles.errorContainer}>
                      <span className={styles.extraSpan}></span>
                      {errors[INVOICE_ONLINE_PAYMENT_AMOUNT] && (
                        <p className="dashboardFormError">
                          {errors[INVOICE_ONLINE_PAYMENT_AMOUNT].message as any}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.formFieldRightlayout}>
                {/* patient name */}
                <div className={styles.labelFieldContainer}>
                  <label
                    htmlFor={INVOICE_ONLINE_PAYMENT_NAME}
                    className={styles.labelText}
                  >
                    Patient Name
                    <span className="asterick">*</span>
                  </label>
                  <div className={styles.fieldErrorContainer}>
                    <input
                      type="text"
                      placeholder="Enter name"
                      className={styles.inputField}
                      {...register(
                        INVOICE_ONLINE_PAYMENT_NAME,
                        onlinePaymentValidator[INVOICE_ONLINE_PAYMENT_NAME]
                      )}
                      onChange={(e) => trimValue(e)}
                      disabled={true}
                    />

                    <div className={styles.errorContainer}>
                      <span className={styles.extraSpan}></span>
                      {errors[INVOICE_ONLINE_PAYMENT_NAME] && (
                        <p className="dashboardFormError">
                          {errors[INVOICE_ONLINE_PAYMENT_NAME].message as any}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* ref no */}
                <div className={styles.labelFieldContainer}>
                  <label
                    htmlFor={INVOICE_ONLINE_PAYMENT_REF_NO}
                    className={styles.labelText}
                  >
                    Ref No.
                    <span className="asterick">*</span>
                  </label>
                  <div className={styles.fieldErrorContainer}>
                    <input
                      type="number"
                      placeholder="Enter ref no."
                      className={styles.inputField}
                      {...register(
                        INVOICE_ONLINE_PAYMENT_REF_NO,
                        onlinePaymentValidator[INVOICE_ONLINE_PAYMENT_REF_NO]
                      )}
                      onChange={(e) => trimValue(e)}
                      disabled={true}
                    />

                    <div className={styles.errorContainer}>
                      <span className={styles.extraSpan}></span>
                      {errors[INVOICE_ONLINE_PAYMENT_REF_NO] && (
                        <p className="dashboardFormError">
                          {errors[INVOICE_ONLINE_PAYMENT_REF_NO].message as any}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* notes and url field */}
            <div className={styles.formNotesUrlContainer}>
              <div className={styles.labelFieldContainer}>
                <label
                  htmlFor={INVOICE_ONLINE_PAYMENT_NOTES}
                  className={styles.labelText}
                >
                  Notes
                </label>
                <div className={styles.fieldErrorContainer}>
                  <textarea
                    placeholder="Enter note"
                    className={styles.noteInputField}
                    {...register(INVOICE_ONLINE_PAYMENT_NOTES)}
                    onChange={(e) => {
                      trimValue(e)
                      setShowNote(e.target.value)
                    }}
                  />
                </div>
              </div>

              <div className={styles.labelFieldContainer}>
                <label
                  htmlFor={INVOICE_ONLINE_PAYMENT_URL}
                  className={styles.labelText}
                >
                  URL <span className="asterick">*</span>
                </label>
                <div className={styles.fieldErrorContainer}>
                  <textarea
                    placeholder="Enter payment link"
                    className={styles.noteInputField}
                    {...register(
                      INVOICE_ONLINE_PAYMENT_URL,
                      onlinePaymentValidator[INVOICE_ONLINE_PAYMENT_URL]
                    )}
                    onChange={(e) => trimValue(e)}
                    disabled={true}
                  />
                  <div className={styles.errorContainer}>
                    <span className={styles.extraSpan}></span>
                    {errors[INVOICE_ONLINE_PAYMENT_URL] && (
                      <p className="dashboardFormError">
                        {errors[INVOICE_ONLINE_PAYMENT_URL].message as any}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <Button
              title="Send Msg"
              customClass={styles.sendMessageButtonStyle}
            />
            <Button
              title="Cancel"
              customClass={styles.cancelButtonStyle}
              handleClick={handleCancel}
            />
          </div>
        </form>
      </div>
    </>
  )
}

export default OnlinePaymentModal

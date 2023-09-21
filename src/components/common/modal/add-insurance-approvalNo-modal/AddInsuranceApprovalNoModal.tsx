import React, { FC, useEffect } from 'react'
import styles from './AddInsuranceApprovalNoModal.module.scss'
import { CloseIcon } from '../../svg-components'
import { colors } from '../../../../constants/color'
import Divider from '../../divider/Divider'
import { IApprovalNo } from '../../../../interfaces/interfaces'
import { SubmitHandler, useForm } from 'react-hook-form'
import { INVOICE_INSURANCE_APPROVAL_NO } from '../../../../constants/constant'
import { trimValue } from '../../../../utils/utils'
import { addApprovalNoValidators } from '../../../../form-validators/addApprovalNoValidators'
import Button from '../../button/Button'
import { useAppDispatch, useAppSelector } from '../../../../hooks'
import { addSelectedInsurancePlan } from '../../../../redux/features/invoice-module/invoiceSlice'

interface IAddInsuranceApprovalNoModal {
  popData?: any
  setModelOpenClose?: any
  handleClose?: any
}

const AddInsuranceApprovalNoModal: FC<IAddInsuranceApprovalNoModal> = ({
  popData,
  setModelOpenClose,
  handleClose,
}) => {
  const dispatch = useAppDispatch()
  const { invoiceObjectById, generatedInvoiceObject } = useAppSelector(
    (state) => state.invoice
  )

  // FORM;
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IApprovalNo>({})

  // set the data on form
  useEffect(() => {
    if (invoiceObjectById || generatedInvoiceObject) {
      reset(invoiceObjectById || generatedInvoiceObject)
    }
  }, [reset, invoiceObjectById, generatedInvoiceObject])

  const onSubmit: SubmitHandler<IApprovalNo> = (data: any) => {
    data.patient_insurance_id = popData?.patient_insurance_id
    dispatch(addSelectedInsurancePlan(data))
    handleClose()
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
          handleClick={() => setModelOpenClose(false)}
        />
        <div className={styles.addCategoryContainer}>
          <p className={styles.title}>Approval No.</p>
          <Divider customClass={styles.dividerStyle} />

          <form
            className={styles.formLayoutContainer}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className={styles.formLayout}>
              <div className={styles.labelFieldContainer}>
                <label
                  htmlFor={INVOICE_INSURANCE_APPROVAL_NO}
                  className={styles.labelText}
                >
                  Insurance Plan :
                </label>
                <div className={styles.fieldErrorContainer}>
                  <input
                    type="text"
                    value={popData?.insurance_plan}
                    className={styles.inputPlanNameField}
                  />
                </div>
              </div>
            </div>

            <div className={styles.formLayout}>
              <div className={styles.labelFieldContainer}>
                <label
                  htmlFor={INVOICE_INSURANCE_APPROVAL_NO}
                  className={styles.labelText}
                >
                  Approval No. <span className="asterick">*</span>
                </label>
                <div className={styles.fieldErrorContainer}>
                  <input
                    type="text"
                    placeholder="Enter approval no."
                    className={styles.inputField}
                    {...register(
                      INVOICE_INSURANCE_APPROVAL_NO,
                      addApprovalNoValidators[INVOICE_INSURANCE_APPROVAL_NO]
                    )}
                    onChange={(e) => trimValue(e)}
                  />

                  <div className={styles.errorContainer}>
                    <span className={styles.extraSpan}></span>
                    {errors[INVOICE_INSURANCE_APPROVAL_NO] && (
                      <p className={styles.dashboardFormError}>
                        {errors[INVOICE_INSURANCE_APPROVAL_NO].message as any}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <Button title="Ok" type="submit" customClass={styles.buttonStyle} />
          </form>
        </div>
      </div>
    </>
  )
}

export default AddInsuranceApprovalNoModal

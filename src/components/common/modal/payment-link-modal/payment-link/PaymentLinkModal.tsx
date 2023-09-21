import { FC, useEffect } from 'react'
import styles from './paymentLinkModal.module.scss'
import { CloseIcon } from '../../../svg-components'
import { colors } from '../../../../../constants/color'
import Divider from '../../../divider/Divider'
import {
  trimValue,
  disableScroll,
  disableArrowKey,
} from '../../../../../utils/utils'
import Button from '../../../button/Button'
import { INVOICE_PAYMENT_AMOUNT } from '../../../../../constants/constant'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IPaymentAmountForm } from '../../../../../interfaces/interfaces'
import { paymentLinkModalValidators } from '../../../../../form-validators/paymentLinkModalValidators'
import { savePaymentMode } from '../../../../../redux/features/invoice-module/invoiceSlice'
import { useAppDispatch } from '../../../../../hooks'

interface IPaymentLinkModal {
  handleClose?: any
  popData?: string | any
  setModelOpenClose?: any
}

const PaymentLinkModal: FC<IPaymentLinkModal> = ({
  handleClose,
  popData,
  setModelOpenClose,
}) => {
  const dispatch = useAppDispatch()
  // console.log("popData>>>>>>>>>", popData);

  // FORM
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IPaymentAmountForm>({})

  // funtion for reset form
  useEffect(() => {
    if (popData?._id) {
      setValue(INVOICE_PAYMENT_AMOUNT, popData?.amount)
    }
  }, [popData, setValue])

  // useeffect for disable scroll
  useEffect(() => {
    disableScroll()
  }, [])

  const onSubmit: SubmitHandler<IPaymentAmountForm> = (data: any) => {
    data.payment_mode = 'upay'
    data._id = 8
    data.payment_label = 'U-pay'
    setModelOpenClose(data)
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
        <h1 className={styles.heading}>Payment</h1>
        <Divider customClass={styles.dividerStyle} />

        <div className={styles.container}>
          <form
            noValidate
            className={styles.formContainer}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className={styles.labelFieldContainer}>
              <label
                htmlFor={INVOICE_PAYMENT_AMOUNT}
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
                    INVOICE_PAYMENT_AMOUNT,
                    paymentLinkModalValidators[INVOICE_PAYMENT_AMOUNT]
                  )}
                  onChange={(e) => trimValue(e)}
                  onKeyDown={(e: any) => disableArrowKey(e)}
                />

                <div className={styles.errorContainer}>
                  <span className={styles.extraSpan}></span>
                  {errors[INVOICE_PAYMENT_AMOUNT] && (
                    <p className="dashboardFormError">
                      {errors[INVOICE_PAYMENT_AMOUNT].message as any}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <Button title="Submit" customClass={styles.buttonStyle} />
          </form>
        </div>
      </div>
    </>
  )
}

export default PaymentLinkModal

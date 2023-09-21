import React, { FC, useState } from 'react'
import styles from './radiologyInvoicePayment.module.scss'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { useNavigate } from 'react-router-dom'
import {
  clearInvoicePatientData,
  savePaymentMode,
  setAmountData,
} from '../../../redux/features/invoice-module/invoiceSlice'
import ScribeDialog from '../../doctor-diagnosis/diagnosis/scribe-dialog/ScribeDialog'
import Button from '../../../components/common/button/Button'
import {
  ExportIcon,
  PrintIcon,
  ShareIcon,
} from '../../../components/common/svg-components'
import TableV2 from '../../../components/common/table/tableV2/TableV2'
import { invoicePaymentHeaderData } from '../../../constants/table-data/invoicePaymentTableData'
import {
  invoiceFormActionData,
  paymentModeModalData,
} from '../../../constants/data'
import { clearRadiologyInvoiceData } from '../../../redux/features/radiology/radiologySlice'
import Popup from '../../../components/common/popup/Popup'
import PaymentLinkModal from '../../../components/common/modal/payment-link-modal/payment-link/PaymentLinkModal'
import AddPaymentModeModal from '../../../components/common/modal/receipt-add-payment-mode-modal/AddPaymentModeModal'
import { generateUpayLink } from '../../../redux/features/invoice-module/invoiceAsynActions'
import { requestGenerator } from '../../../utils/payloadGenerator'
import OnlinePaymentModal from '../../../components/common/modal/online-payment-modal/OnlinePaymentModal'
import {
  allowedNumberOfDigitsAfterDecimal,
  handleCalculateTotalAmountForPaymentMode,
  handlePadStart,
} from '../../../utils/utils'
import Loader from '../../../components/common/spinner/Loader'
interface IRadiologyInvoicePayment {}

const RadiologyInvoicePayment: FC<IRadiologyInvoicePayment> = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { generatedInvoiceObject, paymentModeData } = useAppSelector(
    (state) => state.invoice
  )
  const { radiologyPatientInvoiceData, isLoading } = useAppSelector(
    (state) => state.radiology
  )
  const [formActionValue, setFormActionValue] = useState(-1)
  const [showScribeDialog, setShowScribeDialog] = useState<boolean>(false)
  const [showPaymentLinkModal, setShowPaymentLinkModal] =
    useState<boolean>(false)
  const [paymentLinkData, setPaymentLinkData] = useState<any>({})
  const [showPaymentModeModal, setShowPaymentModeModal] =
    useState<boolean>(false)
  const [showOnlinePaymentModeModal, setShowOnlinePaymentModeModal] =
    useState<boolean>(false)
  const [onlinePaymentLinkData, setOnlinePaymentLinkData] = useState<any>({})

  const handlePaymentProcess = () => {
    setShowPaymentLinkModal(!showPaymentLinkModal)
  }
  //paymentLinkPopup modal close
  const handlePaymentLinkModalClose = () => {
    setShowPaymentLinkModal(!showPaymentLinkModal)
    setPaymentLinkData({})
  }
  const invoicePaymentModeModalOpen = () => {
    setShowPaymentModeModal((prevState) => !prevState)
  }

  const invoicePaymentModeModalClose = () => {
    setShowPaymentModeModal((prevState) => !prevState)
  }

  const addPaymentMode = (item: any) => {
    setShowPaymentModeModal((prevState) => !prevState)
    let requestPayload: any = {
      payment_mode: item?.payment_mode_name,
      payment_label: item?.payment_mode_label,
      amount: item?.amount ?? 0,
      _id: item?.payment_mode_id,
    }
    dispatch(savePaymentMode(requestPayload))
  }
  const addUpayData = (item: any) => {
    setPaymentLinkData(item)
    dispatch(setAmountData(item))
    setShowPaymentLinkModal(!showPaymentLinkModal)
  }

  const handleGenerateLink = () => {
    const modifyPaymentModeData = paymentModeData?.map((item: any) => {
      const { _id, ...rest } = item
      return rest
    })
    const requestPayload = {
      invoice_no: generatedInvoiceObject?.invoice_no,
      partial_payment_array: modifyPaymentModeData,
    }

    dispatch(generateUpayLink(requestGenerator(requestPayload))).then((e) => {
      if (e.type === 'invoice/getGenerateUpayLink/fulfilled') {
        if (e?.payload?.link) {
          const onlinePaymentLinkData = {
            patient_default_branch_id:
              radiologyPatientInvoiceData?.patient_default_branch_id,
            name: radiologyPatientInvoiceData?.name,
            phone: radiologyPatientInvoiceData?.phone,
            email: radiologyPatientInvoiceData?.email,
            invoice_no: generatedInvoiceObject?.invoice_no,
            // amount: upayLinkObject?.amount,
            // link: upayLinkObject?.link,
            // transaction_id: upayLinkObject?.transaction_id,
            transaction_id: e?.payload?.transaction_id,
            amount: paymentLinkData?.amount || 0,
            link: e?.payload?.link,
            // link: null,
          }
          setShowOnlinePaymentModeModal(!showOnlinePaymentModeModal)
          setOnlinePaymentLinkData(onlinePaymentLinkData)
        } else {
          navigate('/radiology-invoice/information')
          dispatch(clearRadiologyInvoiceData())
          dispatch(clearInvoicePatientData())
        }
      }
    })
  }
  const invoiceOnlinePaymentModalClose = () => {
    setShowOnlinePaymentModeModal(!showOnlinePaymentModeModal)
    setOnlinePaymentLinkData({})
  }

  const handleExit = () => {
    dispatch(clearRadiologyInvoiceData())
    dispatch(clearInvoicePatientData())
    navigate('/radiology-invoice/information')
  }

  return (
    <>
      {/* Scribe Dialog Dependencies */}
      {/* Scribe Dialog Dependencies */}
      {isLoading && <Loader />}
      {showPaymentLinkModal && (
        <Popup
          Children={PaymentLinkModal}
          popData={paymentLinkData}
          handleClose={() => handlePaymentLinkModalClose()}
          setModelOpenClose={addUpayData}
        />
      )}
      {showScribeDialog === true && (
        <ScribeDialog
          handleClose={() => setShowScribeDialog(false)}
          setScribeDropdownShow={false}
          customClassContainer={styles.customClassContainer}
          customClassCanvasContainer={styles.customClassCanvasContainer}
        />
      )}
      {showPaymentModeModal && (
        <Popup
          Children={AddPaymentModeModal}
          popData={paymentModeModalData}
          handleClose={invoicePaymentModeModalClose}
          handleYes={addPaymentMode}
        />
      )}
      {showOnlinePaymentModeModal && (
        <Popup
          Children={OnlinePaymentModal}
          popData={onlinePaymentLinkData}
          handleClose={() => invoiceOnlinePaymentModalClose()}
          setModelOpenClose={setShowOnlinePaymentModeModal}
          message="/radiology-invoice/information"
        />
      )}
      <form className={styles.mainContainer}>
        <div className={styles.mainServiceContainer}>
          {/*invoiceInfoContainer*/}
          <div className={styles.invoiceInfoContainer}>
            <div className={styles.userNameContainer}>
              <p className={styles.userTextStyle}>Invoice No. :</p>
              <p className={styles.userNameStyle}>
                {generatedInvoiceObject?.invoice_no
                  ? handlePadStart(generatedInvoiceObject?.invoice_no)
                  : '-'}
              </p>
            </div>

            {generatedInvoiceObject?.fixed_file_number ? (
              <div className={styles.invoiceDateContainer}>
                <p className={styles.invoiceDateTextStyle}>Fixed File No. :</p>
                <p className={styles.invoiceDateStyle}>
                  {generatedInvoiceObject?.fixed_file_number}
                </p>
              </div>
            ) : (
              ''
            )}
          </div>
          {/* payment container */}
          <div className={styles.paymentMainContainer}>
            <div className={styles.paymentContainer}>
              {generatedInvoiceObject?.isOutPatient === true ||
              (generatedInvoiceObject?.isOutPatient === false &&
                generatedInvoiceObject?.patient_insurance_id === null) ? (
                ''
              ) : (
                <>
                  <div className={styles.amountStyle}>
                    Amount to be Claimed: $
                    {generatedInvoiceObject?.invoice_no &&
                    generatedInvoiceObject?.insurance_claim_amount
                      ? generatedInvoiceObject?.insurance_claim_amount
                      : 0}
                  </div>
                </>
              )}
              <div className={styles.outstandingStyle}>
                Outstanding Amount: $
                {generatedInvoiceObject?.invoice_no &&
                generatedInvoiceObject?.outstanding_amount
                  ? allowedNumberOfDigitsAfterDecimal(
                      generatedInvoiceObject?.outstanding_amount,
                      3
                    )
                  : 0}
              </div>

              {generatedInvoiceObject?.isOutPatient === false ? (
                <div className={styles.advanceDueStyle}>
                  Advance Due: $
                  {generatedInvoiceObject?.invoice_no &&
                  radiologyPatientInvoiceData?.advance_amount
                    ? allowedNumberOfDigitsAfterDecimal(
                        radiologyPatientInvoiceData?.advance_amount,
                        3
                      )
                    : 0}
                </div>
              ) : (
                ''
              )}
              {/* generatedInvoiceObject?.patient_insurance_id !== null */}
              {generatedInvoiceObject?.isOutPatient === true ||
              (generatedInvoiceObject?.isOutPatient === false &&
                generatedInvoiceObject?.patient_insurance_id === null) ? (
                ''
              ) : (
                <>
                  <div className={styles.copayDetailContainer}>
                    <div className={styles.copayPercentageContainer}>
                      <label className={styles.labelText}>Co-pay %</label>
                      <input
                        type="text"
                        className={styles.inputField}
                        value={generatedInvoiceObject?.co_pay_percentage ?? ''}
                      />
                    </div>
                    <div className={styles.copayAmountContainer}>
                      <label className={styles.labelText}>Co-pay Amount</label>
                      <input
                        type="text"
                        className={styles.inputField}
                        value={generatedInvoiceObject?.co_pay_amount ?? ''}
                      />
                    </div>
                  </div>
                </>
              )}

              <div className={styles.buttonContainer}>
                <Button
                  type="button"
                  title="Add Payment Mode"
                  customClass={styles.addPaymentStyle}
                  handleClick={invoicePaymentModeModalOpen}
                  disable={
                    handleCalculateTotalAmountForPaymentMode(paymentModeData)
                      .amount >= generatedInvoiceObject?.outstanding_amount
                      ? true
                      : false
                  }
                />
                <div style={{ position: 'relative' }}>
                  <Button
                    type="button"
                    title="Customer's E-Signature"
                    customClass={styles.eSignButtonStyle}
                    handleClick={() => setShowScribeDialog(true)}
                    disable={true}
                  />
                  <ShareIcon
                    fillColor="#0E26A3"
                    customClass={styles.shareIcon}
                  />
                </div>
                <PrintIcon customClass={styles.printIcon} />
                <ExportIcon customClass={styles.exportIcon} />
              </div>

              {/* <div className={styles.scribeContainer}>
                <p className={styles.eSignText}>Customer's E-Signature</p>
              </div> */}
            </div>
            <div className={styles.paymentDetailContainer}>
              <p
                className={styles.linkGenreateContainer}
                onClick={handlePaymentProcess}
              >
                click here to share Upay link
              </p>
              <div className={styles.tableContainer}>
                <TableV2
                  tableHeaderData={invoicePaymentHeaderData}
                  tableRowData={
                    paymentModeData && paymentModeData?.length > 0
                      ? paymentModeData
                      : []
                  }
                  active={false}
                />

                <div className={styles.submitPaymentContainer}>
                  <Button
                    title="Submit"
                    type="button"
                    customClass={styles.buttonStyle}
                    handleClick={handleGenerateLink}
                    disable={
                      handleCalculateTotalAmountForPaymentMode(paymentModeData)
                        .amount > generatedInvoiceObject?.outstanding_amount
                        ? true
                        : paymentModeData?.length === 0
                        ? true
                        : paymentModeData?.some((item: any) => !item?.amount)
                        ? true
                        : false
                    }
                  />

                  <Button
                    title="Exit"
                    type="button"
                    customClass={styles.backButton}
                    // handleClick={() => navigate('/invoice/services')}
                    handleClick={handleExit}
                  />
                </div>
              </div>
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

export default RadiologyInvoicePayment

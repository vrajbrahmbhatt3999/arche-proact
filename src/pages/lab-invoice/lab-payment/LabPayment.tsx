import React, { FC, useState } from 'react'
import styles from './LabPayment.module.scss'
import {
  formActionData,
  invoiceFormActionData,
  paymentModeModalData,
} from '../../../constants/data'
import Button from '../../../components/common/button/Button'
import {
  ExportIcon,
  PrintIcon,
  RemoveTagCloseIcon,
  ShareIcon,
} from '../../../components/common/svg-components'
import TableV2 from '../../../components/common/table/tableV2/TableV2'
import { invoicePaymentHeaderData } from '../../../constants/table-data/invoicePaymentTableData'
import ScribeDialog from '../../doctor-diagnosis/diagnosis/scribe-dialog/ScribeDialog'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import PaymentLinkModal from '../../../components/common/modal/payment-link-modal/payment-link/PaymentLinkModal'
import AddPaymentModeModal from '../../../components/common/modal/receipt-add-payment-mode-modal/AddPaymentModeModal'
import Popup from '../../../components/common/popup/Popup'
import {
  clearInvoicePatientData,
  savePaymentMode,
  setAmountData,
  updatedNewPaymentAmountArray,
} from '../../../redux/features/invoice-module/invoiceSlice'
import { requestGenerator } from '../../../utils/payloadGenerator'
import OnlinePaymentModal from '../../../components/common/modal/online-payment-modal/OnlinePaymentModal'
import { generateUpayLink } from '../../../redux/features/invoice-module/invoiceAsynActions'
import Loader from '../../../components/common/spinner/Loader'
import { clearLabInvoicePatientData } from '../../../redux/features/lab-invoice/labInvoiceSlice'
import {
  allowedNumberOfDigitsAfterDecimal,
  handleCalculateTotalAmountForPaymentMode,
} from '../../../utils/utils'
import { useNavigate } from 'react-router-dom'
interface IInvoicePayment {}

const InvoicePayment: FC<IInvoicePayment> = () => {
  const [formActionValue, setFormActionValue] = useState(-1)
  const [showScribeDialog, setShowScribeDialog] = useState<boolean>(false)
  const [amountModal, setamountModal] = useState<boolean>(false)
  const [showPaymentMode, setshowPaymentMode] = useState(false)
  const [showOnlinePaymentModeModal, setShowOnlinePaymentModeModal] =
    useState<boolean>(false)
  const [onlinePaymentLinkData, setOnlinePaymentLinkData] = useState<any>({})
  const [paymentLinkData, setpaymentLinkData] = useState<any>({})

  const { isLoading, generatedInvoiceObject, paymentAmount, paymentModeData } =
    useAppSelector((state) => state.invoice)

  const { patientSearchObject, labInformationData } = useAppSelector(
    (state) => state.labInvoice
  )

  console.log(paymentModeData, 'paymentModeData')
  const { patientPaymentInfo } = useAppSelector((state) => state.labInvoice)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const handlePaymentProcess = () => {
    setamountModal(!amountModal)
    // if (paymentModeData?.length > 0) {
    //   const findUpayPayment = paymentModeData?.find(
    //     (item: any) => item?._id === 8
    //   )
    //   setpaymentLinkData(findUpayPayment)
    // } else {
    //   setpaymentLinkData({})
    // }
  }

  const handlePaymentMode = () => {
    setshowPaymentMode(!showPaymentMode)
  }

  const addPaymentMode = (item: any) => {
    setshowPaymentMode((prevState) => !prevState)
    let requestPayload: any = {
      payment_mode: item?.payment_mode_name,
      payment_label: item?.payment_mode_label,
      amount: item?.amount ?? 0,
      _id: item?.payment_mode_id,
    }
    dispatch(savePaymentMode(requestPayload))
  }

  // paymentLinkPopup modal close

  const handlePaymentLinkModalClose = () => {
    setamountModal(!amountModal)
    setpaymentLinkData({})
  }

  const addUpayData = (item: any) => {
    setpaymentLinkData(item)
    dispatch(setAmountData(item))
    setamountModal(!amountModal)
  }

  const handleGenerateLink = () => {
    const modifyPaymentModeData = paymentModeData?.map((item: any) => {
      const { _id, ...rest } = item
      return rest
    })
    const requestPayload = {
      invoice_no: patientPaymentInfo?.invoice_no,
      partial_payment_array: modifyPaymentModeData,
    }

    dispatch(generateUpayLink(requestGenerator(requestPayload))).then(
      (e: any) => {
        if (e.type === 'invoice/getGenerateUpayLink/fulfilled') {
          if (e?.payload?.link) {
            const onlinePaymentLinkData = {
              patient_default_branch_id:
                labInformationData?.patient_default_branch_id,
              name: labInformationData?.name,
              phone: labInformationData?.phone,
              email: labInformationData?.email,
              invoice_no: patientPaymentInfo?.invoice_no,
              transaction_id: e?.payload?.transaction_id,
              amount: paymentLinkData?.amount || 0,
              link: e?.payload?.link,
            }
            // dispatch(clearLabInvoicePatientData())
            setShowOnlinePaymentModeModal(!showOnlinePaymentModeModal)
            setOnlinePaymentLinkData(onlinePaymentLinkData)
          } else {
            dispatch(clearLabInvoicePatientData())
            dispatch(updatedNewPaymentAmountArray([]))
            navigate('/invoice/labinformation')
          }
        }
      }
    )

    // static
    // if (onlinePaymentLinkData?.link !== null) {
    //   setShowOnlinePaymentModeModal(!showOnlinePaymentModeModal);
    //   setOnlinePaymentLinkData(onlinePaymentLinkData);
    // }
  }

  const invoiceOnlinePaymentModalClose = () => {
    setShowOnlinePaymentModeModal(!showOnlinePaymentModeModal)
    setOnlinePaymentLinkData({})
  }

  const handlePadStart = (invoiceNo: any) => {
    let padstartInvoiceNumber = invoiceNo
    let invoice_number = String(padstartInvoiceNumber).padStart(6, '0')
    return invoice_number
  }

  const handleExit = () => {
    dispatch(clearLabInvoicePatientData())
    dispatch(clearInvoicePatientData())
    navigate('/invoice/labinformation')
  }

  return (
    <>
      {isLoading && <Loader />}

      {amountModal && (
        <Popup
          Children={PaymentLinkModal}
          popData={paymentLinkData}
          handleClose={handlePaymentLinkModalClose}
          setModelOpenClose={addUpayData}
        />
      )}

      {showPaymentMode && (
        <Popup
          Children={AddPaymentModeModal}
          popData={paymentModeModalData}
          handleClose={handlePaymentMode}
          handleYes={addPaymentMode}
        />
      )}

      {/* Scribe Dialog Dependencies */}
      {showScribeDialog === true && (
        <ScribeDialog
          handleClose={() => setShowScribeDialog(false)}
          setScribeDropdownShow={false}
          customClassContainer={styles.customClassContainer}
          customClassCanvasContainer={styles.customClassCanvasContainer}
        />
      )}

      {showOnlinePaymentModeModal && (
        <Popup
          Children={OnlinePaymentModal}
          popData={onlinePaymentLinkData}
          handleClose={() => invoiceOnlinePaymentModalClose()}
          setModelOpenClose={setShowOnlinePaymentModeModal}
          message="/invoice/labinformation"
        />
      )}

      <form className={styles.mainContainer}>
        <div className={styles.mainServiceContainer}>
          {/*invoiceInfoContainer*/}
          <div className={styles.invoiceInfoContainer}>
            <div className={styles.invoiceNoContainer}>
              <p className={styles.invoiceTextStyle}>Invoice no :</p>
              <p className={styles.invoiceStyle}>
                {/* {patientPaymentInfo?.invoice_no?.padStart(6,"0")} */}
                {patientPaymentInfo?.invoice_no
                  ? handlePadStart(patientPaymentInfo?.invoice_no)
                  : ''}
              </p>
            </div>

            {patientPaymentInfo?.fixed_file_number ? (
              <div className={styles.fileNoContainer}>
                <p className={styles.invoiceFileTextStyle}>Fixed File No. :</p>
                <p className={styles.invoiceFileStyle}>
                  {handlePadStart(patientPaymentInfo?.fixed_file_number)}
                </p>
              </div>
            ) : (
              ''
            )}
          </div>

          {/* payment container */}
          <div className={styles.paymentMainContainer}>
            <div className={styles.paymentContainer}>
              {/* {patientPaymentInfo?.insurance_claim_amount && (
                <>
                  <div className={styles.amountStyle}>
                    Amount to be Claimed:{" "}
                    {patientPaymentInfo?.insurance_claim_amount
                      ? patientPaymentInfo?.insurance_claim_amount
                      : 0}
                  </div>
                </>
              )} */}

              <div className={styles.outstandingStyle}>
                Outstanding Amount:{' '}
                {/* {patientPaymentInfo?.outstanding_amount
                  ? patientPaymentInfo?.outstanding_amount
                  : 0} */}
                {patientPaymentInfo?.invoice_no &&
                patientPaymentInfo?.outstanding_amount
                  ? allowedNumberOfDigitsAfterDecimal(
                      patientPaymentInfo?.outstanding_amount,
                      3
                    )
                  : 0}
              </div>
              {/* <div className={styles.advanceDueStyle}>
                Advance Due:{' '}
                {patientPaymentInfo?.paid_amount
                  ? patientPaymentInfo?.paid_amount
                  : 0}
              </div> */}
              {patientPaymentInfo?.isOutPatient === false ? (
                <div className={styles.advanceDueStyle}>
                  Advance Due:{' '}
                  {patientPaymentInfo?.invoice_no &&
                  labInformationData?.advance_amount
                    ? allowedNumberOfDigitsAfterDecimal(
                        labInformationData?.advance_amount,
                        3
                      )
                    : 0}
                </div>
              ) : (
                ''
              )}

              {/* <div className={styles.copayDetailContainer}>
                <div className={styles.copayPercentageContainer}>
                  <label className={styles.labelText}>Co-pay %</label>
                  <input
                    type="text"
                    className={styles.inputFieldDisable}
                    value={patientPaymentInfo?.co_pay_percentage ?? ""}
                    disabled={true}
                  />
                </div>
                <div className={styles.copayAmountContainer}>
                  <label className={styles.labelText}>Co-pay Amount</label>
                  <input
                    type="text"
                    className={styles.inputFieldDisable}
                    value={patientPaymentInfo?.co_pay_amount ?? ""}
                    disabled={true}
                  />
                </div>
              </div> */}

              <div className={styles.buttonContainer}>
                <Button
                  type="button"
                  title="Add Payment Mode"
                  customClass={styles.addPaymentStyle}
                  handleClick={handlePaymentMode}
                  disable={
                    Number(
                      handleCalculateTotalAmountForPaymentMode(paymentModeData)
                        .amount
                    ) >= Number(generatedInvoiceObject?.outstanding_amount)
                      ? true
                      : false
                  }
                />
                <div>
                  <Button
                    type="button"
                    title="Customer's E-Signature"
                    customClass={styles.eSignButtonStyle}
                    handleClick={() => setShowScribeDialog(true)}
                    disable={true}
                  />
                  {/* <ShareIcon
                    fillColor="#0E26A3"
                    customClass={styles.shareIcon}
                  /> */}
                </div>
                <PrintIcon customClass={styles.printIcon} />
                <ExportIcon customClass={styles.exportIcon} />
              </div>

              {/* <div className={styles.scribeContainer}>
                <p className={styles.eSignText}>Customer's E-Signature</p>
                <div className={styles.scribeAttachments}>
                  {!scribeNotesArr ||
                  scribeNotesArr === undefined ||
                  scribeNotesArr === "" ||
                  scribeNotesArr === null ||
                  scribeNotesArr?.length === 0
                    ? defaultNoAttachmentArr.map((_element: any) => {
                        return (
                          <>
                            <div
                              className={styles.scribeSingleAttachmentWrapper}
                            >
                              <div
                                className={styles.scribeSingleAttachment}
                                key={_element.id}
                              >
                                <img src={_element.imageUrl} />
                              </div>
                            </div>
                          </>
                        );
                      })
                    : scribeNotesArr.map((_element: any) => {
                        return (
                          <>
                            <div
                              className={styles.scribeSingleAttachmentWrapper}
                              key={_element.id}
                            >
                              <div
                                className={styles.scribeSingleAttachment}
                                onClick={() =>
                                  handleScribeImagesAndNotesPreviewDialogOpen(
                                    _element
                                  )
                                }
                              >
                                <img src={_element.imageUrl} />
                              </div>
                              <div
                                className={styles.closeIconContainer}
                                onClick={() =>
                                  dispatch(removeScribeNotesData(_element))
                                }
                              >
                                <RemoveTagCloseIcon fillColor="#02BF90" />
                              </div>
                            </div>
                          </>
                        );
                      })}
                </div>
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
                  tableRowData={paymentModeData}
                  active={false}
                />
              </div>

              <div className={styles.submitPaymentContainer}>
                <Button
                  type="button"
                  title="Submit"
                  customClass={styles.settle8Button}
                  handleClick={handleGenerateLink}
                  disable={
                    Number(
                      handleCalculateTotalAmountForPaymentMode(paymentModeData)
                        .amount
                    ) > Number(generatedInvoiceObject?.outstanding_amount)
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
                  // handleClick={() => navigate("/invoice/labservices")}
                  handleClick={handleExit}
                />
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

export default InvoicePayment

import React, { FC, useEffect, useState } from 'react'
import styles from './invoiceServices.module.scss'
import { failure, invoiceFormActionData } from '../../../constants/data'
import {
  allowedNumberOfDigitsAfterDecimal,
  doPayment,
  isServiceEditable,
  trimValue,
} from '../../../utils/utils'
import {
  ExportIcon,
  PrintIcon,
} from '../../../components/common/svg-components'
import Button from '../../../components/common/button/Button'
import TableV2 from '../../../components/common/table/tableV2/TableV2'
import moment from 'moment'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import Popup from '../../../components/common/popup/Popup'
import AddServiceModal from '../../../components/common/modal/invoice-add-service-modal/AddServiceModal'
import DescriptionModal from '../../../components/common/modal/description-modal/DescriptionModal'
import { useNavigate } from 'react-router-dom'
import { requestGenerator } from '../../../utils/payloadGenerator'
import { createInvoice } from '../../../redux/features/invoice-module/invoiceAsynActions'
import { invoiceServiceHeaderData } from '../../../constants/table-data/invoiceServiceTableData'
import PaymentConfirmationModal from '../../../components/common/modal/payment-confirmation-modal/PaymentConfirmationModal'
import { GENERATE_PATIENT_INVOICE } from '../../../constants/asyncActionsType'
import {
  setGeneratedInvoiceData,
  updatedNewPaymentAmountArray,
  updatedNewServiceArray,
} from '../../../redux/features/invoice-module/invoiceSlice'
import { setMessage } from '../../../redux/features/toast/toastSlice'
import { CustomModal } from '../../../components/common/custom-modal/modal'
import AddNotePopup from '../../../components/common/modal/add-notes/AddNotePopup'

interface IInvoiceServices {}

const InvoiceServices: FC<IInvoiceServices> = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [formActionValue, setFormActionValue] = useState(-1)
  const [searchValue, setSearchValue] = useState<string>('')

  const { patientInvoiceData, invoiceObjectById, patientDiagnosisServiceData } =
    useAppSelector((state) => state.invoice)

  const { userData } = useAppSelector((state) => state.login)

  const [showNewServiceModal, setShowNewServiceModal] = useState<boolean>(false)
  const [newServiceModalData, setnewServiceModalData] = useState<Object>({})
  const [showDescriptionModal, setShowDescriptionModal] =
    useState<boolean>(false)
  const [descriptionPopupData, setDescriptionPopupData] = useState<any>({})
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const [totalDiscount, setTotalDiscount] = useState<number>(0)
  const [totalNetAmount, setTotalNetAmount] = useState<number>(0)
  const [showProceedPaymentModal, setShowProceedPaymentModal] =
    useState<boolean>(false)

  const [notePopup, setNotPopup] = useState<boolean>(false)
  const [selectedService, setSelectedService] = useState<any>({})
  // new service
  const handleNewServiceModalPopup = () => {
    if (isServiceEditable(patientInvoiceData)) {
      setShowNewServiceModal(!showNewServiceModal)
    }
  }
  // new Service modal close
  const handleNewServiceModalClose = () => {
    setShowNewServiceModal(!showNewServiceModal)
    setnewServiceModalData({})
  }

  const handleProceedPaymentModalPopup = () => {
    let inValid: boolean = false
    console.log(
      'showPatientDiagnosisServiceData',
      showPatientDiagnosisServiceData
    )
    inValid = showPatientDiagnosisServiceData?.some(
      (item: any) =>
        Number.isNaN(item?.discount) ||
        Number.isNaN(!item?.price) ||
        !item?.quantity
    )
    if (inValid) {
      dispatch(
        setMessage({
          message: 'Please enter valid QTY , Price or Discount',
          type: failure,
        })
      )
    } else if (doPayment(patientInvoiceData)) {
      setShowProceedPaymentModal(!showProceedPaymentModal)
    } else {
      const generatedInvoice = {
        patient_insurance_id: null,
        co_pay_percentage: null,
        co_pay_amount: null,
        file_number: patientInvoiceData?.emr_no,
        invoice_no: patientInvoiceData?.invoice_no,
        paid_amount: patientInvoiceData?.paid_amount,
        advance_amount: patientInvoiceData?.advance_amount,
        total_amount: patientInvoiceData?.total_amount,
        outstanding_amount: patientInvoiceData?.outstanding_amount,
        insurance_claim_amount: patientInvoiceData?.insurance_claim_amount,
        isOutPatient: false,
      }
      dispatch(setGeneratedInvoiceData(generatedInvoice))
      navigate('/invoice/payment')
    }
  }

  let currentDate = new Date()
  const formattedDate = moment(currentDate).format('DD MMM YYYY')

  const descriptionModalClose = () => {
    setDescriptionPopupData({})
    setShowDescriptionModal((prevState) => !prevState)
  }

  const handleDescriptionModalOpen = (item: any) => {
    setShowDescriptionModal(!showDescriptionModal)
    setDescriptionPopupData(item)
  }

  const [showPatientDiagnosisServiceData, setShowPatientDiagnosisServiceData] =
    useState<any>()

  useEffect(() => {
    setShowPatientDiagnosisServiceData(patientDiagnosisServiceData)
  }, [patientDiagnosisServiceData])

  useEffect(() => {
    let sum = 0
    patientDiagnosisServiceData?.forEach((row: any) => {
      if (row?.isBillable === 'Yes' && row?.is_return !== true) {
        const quantity = row.quantity
        const unitPrice = row.unitPrice
        const amount = quantity * unitPrice
        sum += amount
      }
    })
    setTotalPrice(sum)
  }, [patientDiagnosisServiceData])

  useEffect(() => {
    let sum = 0
    patientDiagnosisServiceData?.forEach((row: any) => {
      if (row?.isBillable === 'Yes' && row?.is_return !== true) {
        const discount = row.discount
        const discountAmount = discount
        sum += discountAmount
      }
    })
    setTotalDiscount(sum)
  }, [patientDiagnosisServiceData])

  useEffect(() => {
    let sum = 0
    patientDiagnosisServiceData?.forEach((row: any) => {
      if (row?.isBillable === 'Yes' && row?.is_return !== true) {
        const quantity = row.quantity
        const unitPrice = row.unitPrice
        const discount = row.discount
        const amount = quantity * unitPrice
        const netAmount = amount - discount
        sum += netAmount
      }
    })

    setTotalNetAmount(sum)
  }, [patientDiagnosisServiceData])

  const handleInputChange = (e: any) => {
    trimValue(e)
    setSearchValue(e.target.value)
    const filterData = patientDiagnosisServiceData?.filter((item: any) => {
      const itemName = item.name.toLowerCase()
      return itemName.includes(e.target.value.toLowerCase())
    })
    setShowPatientDiagnosisServiceData(filterData)
  }

  const handleProceedToPayment = () => {
    // generate invoice regular patient
    let regularPatientPayload = {
      isOutPatient: false,
      type: 'DIAGNOSIS',
      invoice_no: patientInvoiceData?.invoice_no,
      patient_id: patientInvoiceData?.patient_id,
      _id: patientInvoiceData?._id ? patientInvoiceData?._id : null,
      diagnosisService: patientDiagnosisServiceData,
      referral_type: patientInvoiceData?.referral_type,
      refer_by: patientInvoiceData?.refer_by,
      insurance_approval_no: invoiceObjectById?.insurance_approval_no
        ? invoiceObjectById?.insurance_approval_no
        : patientInvoiceData?.insurance_approval_no
        ? patientInvoiceData?.insurance_approval_no
        : patientInvoiceData?.insurance_approval_no === undefined
        ? null
        : '',
      insurance_plan_id: invoiceObjectById?.patient_insurance_id
        ? invoiceObjectById?.patient_insurance_id
        : patientInvoiceData?.patient_insurance_id
        ? patientInvoiceData?.patient_insurance_id
        : patientInvoiceData?.patient_insurance_id === undefined
        ? null
        : '',
    }
    // generate invoice for out patient
    let outPatientPayload = {
      isOutPatient: true,
      type: 'DIAGNOSIS',
      diagnosisService: patientDiagnosisServiceData,
      name: patientInvoiceData?.name,
      phone: patientInvoiceData?.phone,
      patient_default_branch_id: patientInvoiceData?.patient_default_branch_id,
      // default_doctor_id: patientInvoiceData?.patient_primary_Doctor,
      default_doctor_id:
        patientInvoiceData?.patient_primary_Doctor !== ''
          ? patientInvoiceData?.patient_primary_Doctor
          : null,

      referral_type: patientInvoiceData?.referral_type || '',
      refer_by: patientInvoiceData?.refer_by || '',
    }

    if (patientInvoiceData?.patient_type === 'REGULAR') {
      dispatch(createInvoice(requestGenerator(regularPatientPayload))).then(
        (e) => {
          if (e.type === `${GENERATE_PATIENT_INVOICE}/fulfilled`) {
            setShowNewServiceModal(false)
            navigate('/invoice/payment')
          } else {
            setShowProceedPaymentModal(false)
            setShowNewServiceModal(false)
          }
        }
      )
    } else {
      dispatch(createInvoice(requestGenerator(outPatientPayload))).then((e) => {
        if (e.type === `${GENERATE_PATIENT_INVOICE}/fulfilled`) {
          setShowNewServiceModal(false)
          navigate('/invoice/payment')
        } else {
          setShowProceedPaymentModal(false)
          setShowNewServiceModal(false)
        }
      })
    }
  }
  useEffect(() => {
    return () => {
      dispatch(updatedNewPaymentAmountArray([]))
    }
  }, [])

  const handleNotes = (service: any) => {
    setSelectedService(service)
    setNotPopup(true)
  }
  const handleSaveNotes = (data: any) => {
    setNotPopup(false)
    let tempArr: any = []
    tempArr =
      patientDiagnosisServiceData && patientDiagnosisServiceData?.length > 0
        ? patientDiagnosisServiceData?.map((item: any, index: any) => {
            if (Number(index) === Number(selectedService?.id)) {
              return {
                ...item,
                note: data?.note,
              }
            } else {
              return item
            }
          })
        : []
    dispatch(updatedNewServiceArray(tempArr))
  }
  return (
    <>
      {notePopup && (
        <CustomModal
          showModal={notePopup}
          closeModal={() => setNotPopup(false)}
          title="Add Note"
        >
          <AddNotePopup
            popData={selectedService?.original}
            handleYes={(data: any) => handleSaveNotes(data)}
          />
        </CustomModal>
      )}
      {showNewServiceModal && (
        <Popup
          Children={AddServiceModal}
          popData={newServiceModalData}
          handleClose={handleNewServiceModalClose}
          setModelOpenClose={setShowNewServiceModal}
          handleOpen={handleDescriptionModalOpen}
        />
      )}

      {showDescriptionModal && (
        <Popup
          Children={DescriptionModal}
          handleClose={descriptionModalClose}
          popData={descriptionPopupData}
          heading={'Description'}
        />
      )}

      {showProceedPaymentModal && (
        <Popup
          Children={PaymentConfirmationModal}
          handleClose={handleProceedPaymentModalPopup}
          setModelOpenClose={setShowProceedPaymentModal}
          handleYes={handleProceedToPayment}
        />
      )}

      <div className={styles.mainContainer}>
        <div className={styles.mainServiceContainer}>
          {/*invoiceInfoContainer*/}
          <div className={styles.invoiceInfoContainer}>
            <div className={styles.userNameContainer}>
              <p className={styles.userTextStyle}>Username :</p>
              <p className={styles.userNameStyle}>{userData.name}</p>
            </div>

            <div className={styles.invoiceDateContainer}>
              <p className={styles.invoiceDateTextStyle}>Invoice Date :</p>
              <p className={styles.invoiceDateStyle}>{formattedDate}</p>
            </div>
          </div>

          <div className={styles.searchServiceContainer}>
            {/* search container */}
            <div className={styles.searchContainer}>
              <input
                type="text"
                className={styles.inputSearchContainer}
                placeholder="Search by service name"
                value={searchValue}
                onChange={handleInputChange}
              />

              {/* <SearchButton
                handleClick={() => {
                  if (!!searchValue) {
                    // handleSearch();
                  }
                }}
                customClass={styles.inputSearchButton}
              /> */}
            </div>
            {/* button ,print & upload icon container */}
            <div className={styles.buttonIconsContainer}>
              <PrintIcon customClass={styles.printIcon} />
              <ExportIcon customClass={styles.exportIcon} />
              <Button
                // disable={
                //   generatedInvoiceObject?.isOutPatient === true ||
                //   generatedInvoiceObject?.isOutPatient === false
                //     ? true
                //     : false
                // }
                title="Add New Services"
                handleClick={handleNewServiceModalPopup}
                customClass={styles.buttonAddServiceStyle}
              />
            </div>
          </div>

          {/* table container */}
          <div className={styles.tableContainer}>
            <TableV2
              tableHeaderData={invoiceServiceHeaderData}
              tableRowData={
                showPatientDiagnosisServiceData &&
                showPatientDiagnosisServiceData?.length > 0
                  ? showPatientDiagnosisServiceData
                  : []
              }
              active={false}
              handleClick={(service: any) => handleNotes(service)}
            />
          </div>

          {/* total amount */}
          <div className={styles.totalAmountContainer}>
            <div className={styles.amountStyle}>
              {/* Total Amount: ${totalPrice} */}
              Total Amount:{' $'}
              {allowedNumberOfDigitsAfterDecimal(totalPrice, 3) || 0}
            </div>
            <div className={styles.discountStyle}>
              {/* Total Discount: ${totalDiscount} */}
              Total Discount:{' $'}
              {allowedNumberOfDigitsAfterDecimal(totalDiscount, 3) || 0}
            </div>
            <div className={styles.netAmountStyle}>
              {/* Net Amount: ${totalNetAmount} */}
              Net Amount:{' $'}
              {allowedNumberOfDigitsAfterDecimal(totalNetAmount, 3) || 0}
            </div>
          </div>

          <div className={styles.proeedButtonContainer}>
            <Button
              title="Submit"
              customClass={styles.paymentStyle}
              // handleClick={handleProceedToPayment}
              handleClick={() => {
                showPatientDiagnosisServiceData &&
                showPatientDiagnosisServiceData?.length > 0
                  ? Number(totalDiscount) > Number(totalPrice)
                    ? dispatch(
                        setMessage({
                          message:
                            'Dicount amount should be less than totam amount',
                          type: failure,
                        })
                      )
                    : handleProceedPaymentModalPopup()
                  : dispatch(
                      setMessage({
                        message: 'Please select services',
                        type: failure,
                      })
                    )
              }}
              // disable={
              //   generatedInvoiceObject?.isOutPatient === true ||
              //   generatedInvoiceObject?.isOutPatient === false
              //     ? true
              //     : false
              // }
            />

            <Button
              title="Back"
              type="button"
              customClass={styles.backButton}
              handleClick={() => navigate('/invoice/information')}
            />
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
      </div>
    </>
  )
}

export default InvoiceServices

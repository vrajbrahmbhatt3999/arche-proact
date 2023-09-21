import React, { FC, useEffect, useState } from 'react'
import styles from './radiologyInvoiceService.module.scss'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import Popup from '../../../components/common/popup/Popup'
import DescriptionModal from '../../../components/common/modal/description-modal/DescriptionModal'
import {
  ExportIcon,
  PrintIcon,
} from '../../../components/common/svg-components'
import Button from '../../../components/common/button/Button'
import {
  allowedNumberOfDigitsAfterDecimal,
  doPayment,
  trimValue,
} from '../../../utils/utils'
import { failure, invoiceFormActionData } from '../../../constants/data'
import TableV2 from '../../../components/common/table/tableV2/TableV2'

import RadiologyAddServiceModal from '../../../components/common/modal/radiology-invoice-add-service/RadiologyAddServiceModal'
import { radiologyServiceHeaderData } from '../../../constants/table-data/radiologyInvoiceServiceTable'
import PaymentConfirmationModal from '../../../components/common/modal/payment-confirmation-modal/PaymentConfirmationModal'
import { createInvoice } from '../../../redux/features/invoice-module/invoiceAsynActions'
import { requestGenerator } from '../../../utils/payloadGenerator'
import {
  setGeneratedInvoiceData,
  updatedNewPaymentAmountArray,
} from '../../../redux/features/invoice-module/invoiceSlice'
import { handleServicesProfileTests } from '../../../redux/features/radiology/radiologySlice'
import LabTestsmodal from '../../../components/common/modal/lab-tests-modal/LabTestsmodal'
import { setMessage } from '../../../redux/features/toast/toastSlice'

interface IRadiologyInvoiceService {}

const RadiologyInvoiceService: FC<IRadiologyInvoiceService> = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [formActionValue, setFormActionValue] = useState(-1)
  const [searchValue, setSearchValue] = useState<string>('')

  const {
    radiologyPatientInvoiceData,
    radiologyPatientDiagnosisServiceData,
    patientTests,
  } = useAppSelector((state) => state.radiology)

  const { userData } = useAppSelector((state) => state.login)

  const [showNewServiceModal, setShowNewServiceModal] = useState<boolean>(false)
  const [newServiceModalData, setnewServiceModalData] = useState<Object>({})
  const [showDescriptionModal, setShowDescriptionModal] =
    useState<boolean>(false)
  const [descriptionPopupData, setDescriptionPopupData] = useState<any>({})
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const [showProceedPaymentModal, setShowProceedPaymentModal] =
    useState<boolean>(false)
  const [viewTest, setviewTest] = useState<boolean>(false)
  const handleInputSearch = () => {
    // console.log("calling handle search");
  }
  // new service
  const handleNewServiceModalPopup = () => {
    if (doPayment(radiologyPatientInvoiceData)) {
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
    inValid = showPatientDiagnosisServiceData?.some(
      (item: any) => !item?.unitPrice
    )
    if (inValid) {
      dispatch(
        setMessage({
          message: 'Please enter valid price',
          type: failure,
        })
      )
    } else if (doPayment(radiologyPatientInvoiceData)) {
      setShowProceedPaymentModal(!showProceedPaymentModal)
    } else {
      const generatedInvoice = {
        patient_insurance_id: null,
        co_pay_percentage: null,
        co_pay_amount: null,
        file_number: radiologyPatientInvoiceData?.emr_no,
        invoice_no: radiologyPatientInvoiceData?.invoice_no,
        paid_amount: radiologyPatientInvoiceData?.paid_amount,
        advance_amount: radiologyPatientInvoiceData?.advance_amount,
        total_amount: radiologyPatientInvoiceData?.total_amount,
        outstanding_amount: radiologyPatientInvoiceData?.outstanding_amount,
        insurance_claim_amount:
          radiologyPatientInvoiceData?.insurance_claim_amount,
        isOutPatient: false,
      }
      dispatch(setGeneratedInvoiceData(generatedInvoice))
      navigate('/radiology-invoice/payment')
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
    setShowPatientDiagnosisServiceData(radiologyPatientDiagnosisServiceData)
  }, [radiologyPatientDiagnosisServiceData])

  useEffect(() => {
    let sum = 0
    radiologyPatientDiagnosisServiceData?.forEach((row: any) => {
      if (row?.billable === 'Yes' && row?.is_return !== true) {
        const quantity = row.quantity
        const price = row.unitPrice
        const amount = quantity * price
        sum += amount
      }
    })
    setTotalPrice(sum)
  }, [radiologyPatientDiagnosisServiceData])

  const [error, setError] = useState('')
  const [discountValue, setDiscountValue] = useState(0)

  const validateInput = (inputValue: any) => {
    const pattern = /^\d{1,4}(?:\.\d{1,3})?$/
    return pattern.test(inputValue)
  }
  const handleDiscountChange = (event: any) => {
    const discount = event.target.value
    const isValid = validateInput(discount)
    if (isValid === false) {
      setError('Please enter valid discount')
    }
    if (isValid === true) {
      setError('')
    }
    setDiscountValue(discount)
  }

  const netAmountCalculation = totalPrice - discountValue
  const netAmount = netAmountCalculation

  const handleInputChange = (e: any) => {
    trimValue(e)
    setSearchValue(e.target.value)
    const filterData = radiologyPatientDiagnosisServiceData?.filter(
      (item: any) => {
        const itemName = item?.name?.toLowerCase()
        return itemName?.includes(e.target.value.toLowerCase())
      }
    )
    setShowPatientDiagnosisServiceData(filterData)
  }
  const { invoiceObjectById } = useAppSelector((state) => state.invoice)

  const testArr =
    radiologyPatientDiagnosisServiceData &&
    radiologyPatientDiagnosisServiceData?.length > 0
      ? radiologyPatientDiagnosisServiceData?.map((item: any) => {
          return {
            ...item,
            price: item?.unitPrice,
          }
        })
      : []
  console.log('test arr', testArr)
  const handleProceedToPayment = () => {
    // generate invoice regular patient
    let regularPatientPayload = {
      isOutPatient: false,
      type: 'RADIOLOGY',
      invoice_no: radiologyPatientInvoiceData?.invoice_no,
      patient_id: radiologyPatientInvoiceData?.patient_id,
      _id: radiologyPatientInvoiceData?._id
        ? radiologyPatientInvoiceData?._id
        : null,
      radiology_tests: testArr,
      referral_type: radiologyPatientInvoiceData?.referral_type,
      refer_by: radiologyPatientInvoiceData?.refer_by,
      insurance_approval_no: invoiceObjectById?.insurance_approval_no
        ? invoiceObjectById?.insurance_approval_no
        : radiologyPatientInvoiceData?.insurance_approval_no
        ? radiologyPatientInvoiceData?.insurance_approval_no
        : radiologyPatientInvoiceData?.insurance_approval_no === undefined
        ? null
        : '',
      insurance_plan_id: invoiceObjectById?.patient_insurance_id
        ? invoiceObjectById?.patient_insurance_id
        : radiologyPatientInvoiceData?.patient_insurance_id
        ? radiologyPatientInvoiceData?.patient_insurance_id
        : radiologyPatientInvoiceData?.patient_insurance_id === undefined
        ? null
        : '',
      discount: discountValue,
    }
    // generate invoice for out patient
    let outPatientPayload = {
      isOutPatient: true,
      type: 'RADIOLOGY',
      radiology_tests: testArr /* radiologyPatientDiagnosisServiceData */,
      name: radiologyPatientInvoiceData?.name,
      phone: radiologyPatientInvoiceData?.phone,
      patient_default_branch_id:
        radiologyPatientInvoiceData?.patient_default_branch_id,
      // default_doctor_id:
      //   radiologyPatientInvoiceData?.patient_primary_Doctor_radiology,
      default_doctor_id:
        radiologyPatientInvoiceData?.patient_primary_Doctor_radiology !== ''
          ? radiologyPatientInvoiceData?.patient_primary_Doctor_radiology
          : null,
      referral_type: radiologyPatientInvoiceData?.referral_type || '',
      refer_by: radiologyPatientInvoiceData?.refer_by || '',
      discount: discountValue,
    }
    if (radiologyPatientInvoiceData?.patient_type === 'REGULAR') {
      dispatch(createInvoice(requestGenerator(regularPatientPayload))).then(
        (e) => {
          if (e.type === 'invoice/createInvoice/fulfilled') {
            console.log('e.payload', e.payload)
            setShowProceedPaymentModal(false)
            setShowNewServiceModal(false)
            navigate('/radiology-invoice/payment')
          } else {
            setShowNewServiceModal(false)
            setShowProceedPaymentModal(false)
          }
        }
      )
    } else {
      dispatch(createInvoice(requestGenerator(outPatientPayload))).then((e) => {
        if ((e.type = 'invoice/createInvoice/fulfilled')) {
          setShowProceedPaymentModal(false)
          navigate('/radiology-invoice/payment')
          setShowNewServiceModal(false)
        } else {
          setShowNewServiceModal(false)
          setShowProceedPaymentModal(false)
        }
      })
    }
  }
  useEffect(() => {
    return () => {
      dispatch(updatedNewPaymentAmountArray([]))
    }
  }, [])

  const discriptionModalClose = () => {
    setviewTest(!viewTest)
  }

  const handleRadiologyTestes = (item: any) => {
    setviewTest(!viewTest)
    dispatch(handleServicesProfileTests(item?.tests))
  }
  console.log('discount value', discountValue)
  return (
    <>
      {viewTest && (
        <Popup
          Children={LabTestsmodal}
          popData={patientTests}
          heading="Tests"
          handleClose={discriptionModalClose}
          setModelOpenClose={() => setviewTest(false)}
        />
      )}

      {showNewServiceModal && (
        <Popup
          Children={RadiologyAddServiceModal}
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
            <div className={styles.invoiceDateContainer}>
              <p className={styles.invoiceDateTextStyle}>Job Id :</p>
              <p className={styles.invoiceDateStyle}>
                {radiologyPatientInvoiceData?.radiology_job_lab
                  ? radiologyPatientInvoiceData?.radiology_job_lab
                  : '-'}
              </p>
            </div>
          </div>

          <div className={styles.searchServiceContainer}>
            {/* search container */}
            <div className={styles.searchContainer}>
              <input
                type="text"
                className={styles.inputSearchContainer}
                placeholder="Search by test name"
                value={searchValue}
                onChange={handleInputChange}
              />
            </div>
            {/* button ,print & upload icon container */}
            <div className={styles.buttonIconsContainer}>
              <PrintIcon customClass={styles.printIcon} />
              <ExportIcon customClass={styles.exportIcon} />
              <Button
                title="Add New Services"
                handleClick={handleNewServiceModalPopup}
                customClass={styles.buttonAddServiceStyle}
              />
            </div>
          </div>

          {/* table container */}
          <div className={styles.tableContainer}>
            <TableV2
              handleRowClick={(item: any) => handleRadiologyTestes(item)}
              tableHeaderData={radiologyServiceHeaderData}
              tableRowData={
                showPatientDiagnosisServiceData &&
                showPatientDiagnosisServiceData?.length > 0
                  ? showPatientDiagnosisServiceData
                  : []
              }
              active={false}
            />
          </div>

          {/* total amount */}
          <div className={styles.totalAmountContainer}>
            <div className={styles.amountStyle}>
              {/* Total Amount: ${totalPrice} */}
              Total Amount:{' $'}
              {totalPrice
                ? allowedNumberOfDigitsAfterDecimal(totalPrice, 3)
                : 0}
            </div>
            <div className={styles.discountStyle}>
              Total Discount :
              {/*  Total Discount:{" $"} {totalDiscount
                ? allowedNumberOfDigitsAfterDecimal(totalDiscount, 3)
                : 0} */}
              <input
                className={styles.inputFieldServiceTable}
                value={discountValue}
                type="number"
                onChange={handleDiscountChange}
                disabled={doPayment(radiologyPatientInvoiceData) ? false : true}
              />
              <p className="dashboardFormError">{error}</p>
            </div>
            <div className={styles.netAmountStyle}>
              Net Amount:{' $'}
              {netAmount ? allowedNumberOfDigitsAfterDecimal(netAmount, 3) : 0}
            </div>
          </div>

          <div className={styles.proeedButtonContainer}>
            <Button
              title="Submit"
              customClass={styles.paymentStyle}
              handleClick={() => {
                showPatientDiagnosisServiceData &&
                showPatientDiagnosisServiceData?.length > 0
                  ? Number(discountValue) > Number(totalPrice)
                    ? dispatch(
                        setMessage({
                          message:
                            'Dicount amount should be less than total amount',
                          type: failure,
                        })
                      )
                    : handleProceedPaymentModalPopup()
                  : dispatch(
                      setMessage({
                        message: 'Please Select Services',
                        type: failure,
                      })
                    )
              }}
              disable={error ? true : false}
            />

            <Button
              title="Back"
              type="button"
              customClass={styles.backButton}
              handleClick={() => navigate('/radiology-invoice/information')}
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

export default RadiologyInvoiceService

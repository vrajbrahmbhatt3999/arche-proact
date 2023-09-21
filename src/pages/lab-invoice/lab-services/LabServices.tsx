import { useState, useEffect } from 'react'
import styles from './LabServices.module.scss'
import {
  ExportIcon,
  PrintIcon,
  SearchIcon,
} from '../../../components/common/svg-components'
import Button from '../../../components/common/button/Button'

import { useAppDispatch, useAppSelector } from '../../../hooks'
import { labServicesHeaderData } from '../../../constants/table-data/labServiceTableData'
import { requestGenerator } from '../../../utils/payloadGenerator'
import Popup from '../../../components/common/popup/Popup'
import AddNewServiceModal from '../../../components/common/modal/labinvoice-add-service-modal/AddNewServiceModal'
import {
  servicesTests,
  setPatientPaymentInfo,
} from '../../../redux/features/lab-invoice/labInvoiceSlice'
import { createNewInvoice } from '../../../redux/features/lab-invoice/labInvoiceAsyncActions'
import {
  allowedNumberOfDigitsAfterDecimal,
  handlePaymentCondtions,
  trimValue,
} from '../../../utils/utils'
import { Navigate, useNavigate } from 'react-router-dom'
import moment from 'moment'
import PaymentConfirmationModal from '../../../components/common/modal/payment-confirmation-modal/PaymentConfirmationModal'
import { CREATE_NEW_INVOICE } from '../../../constants/asyncActionsType'
import LabTestsmodal from '../../../components/common/modal/lab-tests-modal/LabTestsmodal'
import TableV2 from '../../../components/common/table/tableV2/TableV2'
import { setMessage } from '../../../redux/features/toast/toastSlice'
import { failure } from '../../../constants/data'

const LabServices = () => {
  const [showNewServices, setshowNewServices] = useState(false)
  const [activateSmartSearch, setActivateSmartSearch] = useState<boolean>(false)
  const [viewTest, setviewTest] = useState<boolean>(false)
  const [patientLabServicesList, setpatientLabServicesList] = useState<any>([])
  const [showProceedPaymentModal, setShowProceedPaymentModal] =
    useState<boolean>(false)
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const [error, setError] = useState('')
  const [discountValue, setDiscountValue] = useState(0)
  const [searchValue, setSearchValue] = useState<string>('')
  const [patientLabServicesData, setpatientLabServicesData] = useState<any>([])

  const formattedDate = moment(new Date()).format('DD MMM YYYY')
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const {
    patientSearchObject,
    patientServicesList,
    labInformationData,
    insuranceApprovalNumber,
    insuranceItem,
    patientTests,
  } = useAppSelector((state) => state.labInvoice)
  const { userData } = useAppSelector((state) => state.login)

  const handleNewServices = () => {
    setshowNewServices(!showNewServices)
  }

  const handleNewServiceModalClose = () => {
    setshowNewServices(!showNewServices)
  }

  const handleLabTestes = (item: any) => {
    setviewTest(!viewTest)
    dispatch(servicesTests(item?.tests))
  }

  const discriptionModalClose = () => {
    setviewTest(!viewTest)
  }

  useEffect(() => {
    setpatientLabServicesList(patientServicesList)
  }, [patientServicesList])
  console.log('patient servce', patientServicesList)
  const handleProceedPaymentModalPopup = () => {
    let inValid: boolean = false
    inValid = patientServicesList?.some((item: any) => !item?.unitPrice)
    if (inValid) {
      dispatch(
        setMessage({
          message: 'Please enter valid price',
          type: failure,
        })
      )
    } else if (handlePaymentCondtions(labInformationData)) {
      if (discountValue > totalPrice) {
        dispatch(
          setMessage({
            message: 'Discount should be less then Outstanding amount',
            type: failure,
          })
        )
      } else {
        setShowProceedPaymentModal(!showProceedPaymentModal)
      }
    } else {
      const generatedInvoice = {
        patient_insurance_id: null,
        co_pay_percentage: null,
        co_pay_amount: null,
        file_number: labInformationData?.emr_no,
        invoice_no: labInformationData?.invoice_no,
        paid_amount: labInformationData?.paid_amount,
        advance_amount: labInformationData?.advance_amount,
        total_amount: labInformationData?.total_amount,
        outstanding_amount: labInformationData?.outstanding_amount,
        insurance_claim_amount: labInformationData?.insurance_claim_amount,
        isOutPatient: false,
      }
      dispatch(setPatientPaymentInfo(generatedInvoice))
      navigate('/invoice/labpayment')
    }
  }

  const handleProceedToPayment = () => {
    const testArr =
      patientServicesList && patientServicesList?.length > 0
        ? patientServicesList?.map((item: any) => {
            return {
              ...item,
              price: item?.unitPrice,
            }
          })
        : []

    const regularPatientPayload = {
      isOutPatient: false,
      type: 'LABORATORY',
      invoice_no: labInformationData?.invoice_no,
      patient_id: labInformationData?.patient_id,
      lab_tests: testArr,
      referral_type: 'INTERNAL',
      insurance_approval_no: insuranceApprovalNumber?.approvalNum,
      insurance_plan_id: insuranceItem?._id,
      refer_by: labInformationData?.refer_by,
      discount: discountValue,
      _id: labInformationData?._id,
    }

    const outPatientPayload = {
      isOutPatient: true,
      type: 'LABORATORY',
      lab_tests: testArr,
      referral_type: 'INTERNAL',
      name: labInformationData?.name,
      phone: labInformationData?.phone,
      patient_default_branch_id: labInformationData?.patient_default_branch_id,
      default_doctor_id:
        labInformationData?.patient_primary_Doctor_lab !== ''
          ? labInformationData?.patient_primary_Doctor_lab
          : null,
      refer_by: labInformationData?.refer_by,
      discount: discountValue,
    }

    if (
      labInformationData?.patient_type === 'OUT PATIENT' ||
      labInformationData?.status === 'DRAFT'
    ) {
      dispatch(
        createNewInvoice(
          requestGenerator(
            labInformationData?.patient_type === 'OUT PATIENT'
              ? outPatientPayload
              : regularPatientPayload
          )
        )
      ).then((e) => {
        if (e.type === `${CREATE_NEW_INVOICE}/fulfilled`) {
          navigate('/invoice/labpayment')
        }
      })
    } else {
      navigate('/invoice/labpayment')
    }
  }

  useEffect(() => {
    let sum = 0
    patientServicesList?.forEach((row: any) => {
      let isBillable = row?.billable?.toLowerCase()

      if (isBillable === 'yes' && row?.is_return !== true) {
        const quantity = row.quantity
        const price = row.unitPrice
        const amount = quantity * price
        sum += amount
      }
    })
    setTotalPrice(sum)
  }, [patientServicesList])

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

  useEffect(() => {
    if (patientSearchObject?.discount) {
      setDiscountValue(patientSearchObject?.discount)
    }
  }, [patientSearchObject])

  // Set BE Services data in State
  useEffect(() => {
    setpatientLabServicesData(patientServicesList)
  }, [patientServicesList])

  // handle Search
  const handleInputChange = (e: any) => {
    trimValue(e)
    setSearchValue(e.target.value)
    const filterData = patientServicesList?.filter((item: any) => {
      // const itemName = item?.test_name?.toLowerCase();
      const itemName = item?.test_name
        ? item?.test_name.toLowerCase()
        : item?.profile_name.toLowerCase()
      return itemName?.includes(e.target.value?.toLowerCase())
    })
    setpatientLabServicesData(filterData)
  }

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

      {showNewServices && (
        <Popup
          Children={AddNewServiceModal}
          handleClose={handleNewServiceModalClose}
          setModelOpenClose={setshowNewServices}
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
        <div className={styles.lableContainer}>
          <div className={styles.invoiceInfoContainer}>
            <p className={styles.invoiceTextStyle}>User Name :</p>
            <p className={styles.invoiceStyle}>{userData?.name}</p>
          </div>

          <div className={styles.invoiceInfoContainer}>
            <p className={styles.invoiceTextStyle}>Invoice Date:</p>
            <p className={styles.invoiceStyle}>{formattedDate}</p>
          </div>
          {patientSearchObject?.lab_job_lab && (
            <div className={styles.invoiceInfoContainer}>
              <p className={styles.invoiceTextStyle}>Job Id:</p>
              <p className={styles.invoiceStyle}>
                {patientSearchObject?.lab_job_lab}
              </p>
            </div>
          )}
        </div>

        <div className={styles.searchContainer}>
          <div className={styles.smartInputContainer}>
            <input
              type="text"
              className={styles.inputSearchContainer}
              placeholder="Search by test name"
              value={searchValue}
              onChange={handleInputChange}
            />
            <SearchIcon
              fillColor="#797979"
              customClass={styles.searchIconStyle}
            />
          </div>

          <PrintIcon customClass={styles.iconContainer} />
          <ExportIcon customClass={styles.iconContainer} />

          <span className={styles.addServices}>
            <Button
              type="button"
              title="Add New Service"
              customClass={styles.newServiceButton}
              handleClick={handleNewServices}
              disable={
                handlePaymentCondtions(labInformationData) ? false : true
              }
            />
          </span>
        </div>

        <div className={styles.tableContainer}>
          <TableV2
            handleRowClick={(item: any) => handleLabTestes(item)}
            tableHeaderData={labServicesHeaderData}
            tableRowData={
              patientLabServicesData && patientLabServicesData?.length > 0
                ? patientLabServicesData
                : []
            }
            active={false}
          />
        </div>

        {/* total amount */}
        <div className={styles.totalAmountContainer}>
          <div className={styles.amountStyle}>
            Total Amount:{' $'}
            {totalPrice ? allowedNumberOfDigitsAfterDecimal(totalPrice, 3) : 0}
          </div>
          <div className={styles.discountStyle}>
            Total Discount :
            <input
              className={styles.inputFieldServiceTable}
              value={discountValue}
              type="number"
              onChange={handleDiscountChange}
              disabled={
                handlePaymentCondtions(labInformationData) ? false : true
              }
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
            customClass={styles.proeedButton}
            handleClick={handleProceedPaymentModalPopup}
            disable={
              patientLabServicesData?.length === 0 || error ? true : false
            }
          />

          <Button
            title="Back"
            type="button"
            customClass={styles.backButton}
            handleClick={() =>
              navigate(`/invoice/labinformation`, {
                state: labInformationData,
              })
            }
          />
        </div>
      </div>
    </>
  )
}

export default LabServices

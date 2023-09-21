import {
  GET_ALL_PATIENT_INSURANCE,
  GET_ALL_DOCTORS,
  GET_PATIENT_SEARCH_DATA,
  GET_PATIENT_INVOICE,
  GET_LAB_TESTS,
  CREATE_NEW_INVOICE,
  INVOICE_PAYMENT_DETAILS,
  LAB_SETTLED_INVOICE,
} from '../../../constants/asyncActionsType'
import createAsyncThunkForSlice from '../../../utils/utils'
import {
  getAllDoctors,
  getAllPatientInsurances,
  getAllTests,
  getNewInvoice,
  getPatientInvoice,
  getPatientSearchData,
  getSettledInvoice,
  invoicePayment,
} from './labInvoiceCrud'

export const getAllPatientInsurance = createAsyncThunkForSlice(
  GET_ALL_PATIENT_INSURANCE,
  getAllPatientInsurances
)

export const getAllPrimaryDoctors = createAsyncThunkForSlice(
  GET_ALL_DOCTORS,
  getAllDoctors
)

export const getSearchPatientInfo = createAsyncThunkForSlice(
  GET_PATIENT_SEARCH_DATA,
  getPatientSearchData
)

export const getPatientInvoiceData = createAsyncThunkForSlice(
  GET_PATIENT_INVOICE,
  getPatientInvoice
)

export const getAllLabTests = createAsyncThunkForSlice(
  GET_LAB_TESTS,
  getAllTests
)

export const createNewInvoice = createAsyncThunkForSlice(
  CREATE_NEW_INVOICE,
  getNewInvoice,
  {
    isToast: true,
  }
)

export const invoicePaymentDetails = createAsyncThunkForSlice(
  INVOICE_PAYMENT_DETAILS,
  invoicePayment
)

export const getPatientSettledInvoice = createAsyncThunkForSlice(
  LAB_SETTLED_INVOICE,
  getSettledInvoice
)

import {
  GENERATE_PATIENT_INVOICE,
  GET_GENERATE_UPAY_LINK,
  GET_INVOICE,
  GET_PATIENT_INSURANCE_PLAN_LIST,
  GET_SETTLED_INVOICE_LIST,
  GET_iNVOICE_ONLINE_PAYMENT,
} from '../../../constants/asyncActionsType'
import createAsyncThunkForSlice from '../../../utils/utils'
import {
  generateInvoice,
  generatePaymentLink,
  getInsuarncePlan,
  getInvoice,
  getSettledInvoice,
  invoiceOnlinePayment,
} from './invoiceCrud'

export const getLastInvoice = createAsyncThunkForSlice(GET_INVOICE, getInvoice)
export const getSettledInvoiceList = createAsyncThunkForSlice(
  GET_SETTLED_INVOICE_LIST,
  getSettledInvoice
)
export const createInvoice = createAsyncThunkForSlice(
  GENERATE_PATIENT_INVOICE,
  generateInvoice,
  {
    isToast: true,
  }
)
export const patientInsurancePlanList = createAsyncThunkForSlice(
  GET_PATIENT_INSURANCE_PLAN_LIST,
  getInsuarncePlan
)

export const generateUpayLink = createAsyncThunkForSlice(
  GET_GENERATE_UPAY_LINK,
  generatePaymentLink,
  {
    isToast: true,
  }
)

export const getOnlinePayment = createAsyncThunkForSlice(
  GET_iNVOICE_ONLINE_PAYMENT,
  invoiceOnlinePayment,
  {
    isToast: true,
  }
)

import {
  GET_ALL_PATIENT_RECEIPT_TYPE,
  GET_RECEIPT_PATIENT_OUTSTANDING_TYPE,
  GET_PATIENT_ADVANCE_INVOICE_TYPE,
  GET_PATIENT_REFUND_INVOICE_TYPE,
  CREATE_RECEIPT_REFUND_TYPE,
  UPDATE_RECEIPT_REFUND_TYPE,
  CREATE_RECEIPT_ADVANCE_TYPE,
  UPDATE_RECEIPT_ADVANCE_TYPE,
  CREATE_RECEIPT_OUTSTANDING_TYPE,
  UPDATE_RECEIPT_OUTSTANDING_TYPE,
  GET_OUTSTANDING_INVOICE_TYPE,
  DELETE_OUTSTANDING_INVOICE_TYPE,
} from "../../../constants/asyncActionsType";
import createAsyncThunkForSlice from "../../../utils/utils";
import {
  getAllReceiptPatient,
  getAllReceiptPatientOutstandingData,
  getPatientAdvanceInvoiceData,
  getPatientRefundInvoiceData,
  createReceiptRefund,
  updateReceiptRefund,
  createReceiptAdvance,
  updateReceiptAdvance,
  createReceiptOutStanding,
  updateReceiptOutStanding,
  getOutstandingInvoiceData,
  deleteOutstandingInvoiceData,
} from "./receiptCrud";

export const getReceiptPatientList = createAsyncThunkForSlice(
  GET_ALL_PATIENT_RECEIPT_TYPE,
  getAllReceiptPatient
);

export const getReceiptPatientOutstandingList = createAsyncThunkForSlice(
  GET_RECEIPT_PATIENT_OUTSTANDING_TYPE,
  getAllReceiptPatientOutstandingData
);

export const getPatientAdvanceInoviceList = createAsyncThunkForSlice(
  GET_PATIENT_ADVANCE_INVOICE_TYPE,
  getPatientAdvanceInvoiceData
);

export const getPatientRefundInoviceList = createAsyncThunkForSlice(
  GET_PATIENT_REFUND_INVOICE_TYPE,
  getPatientRefundInvoiceData
);

export const addReceiptRefund = createAsyncThunkForSlice(
  CREATE_RECEIPT_REFUND_TYPE,
  createReceiptRefund
);

export const entryReceiptRefund = createAsyncThunkForSlice(
  UPDATE_RECEIPT_REFUND_TYPE,
  updateReceiptRefund,
  { isToast: true }
);

export const addReceiptAdvance = createAsyncThunkForSlice(
  CREATE_RECEIPT_ADVANCE_TYPE,
  createReceiptAdvance
);

export const entryReceiptAdvance = createAsyncThunkForSlice(
  UPDATE_RECEIPT_ADVANCE_TYPE,
  updateReceiptAdvance,
  { isToast: true }
);

export const addReceiptOutStanding = createAsyncThunkForSlice(
  CREATE_RECEIPT_OUTSTANDING_TYPE,
  createReceiptOutStanding
);

export const entryReceiptOutStanding = createAsyncThunkForSlice(
  UPDATE_RECEIPT_OUTSTANDING_TYPE,
  updateReceiptOutStanding,
  { isToast: true }
);

export const getOutstandingInoviceList = createAsyncThunkForSlice(
  GET_OUTSTANDING_INVOICE_TYPE,
  getOutstandingInvoiceData
);

export const deleteOutstandingInovice = createAsyncThunkForSlice(
  DELETE_OUTSTANDING_INVOICE_TYPE,
  deleteOutstandingInvoiceData,
  { isToast: true }
);

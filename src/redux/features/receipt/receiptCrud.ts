import axios from "axios";
import { IAPIPayload } from "../../../interfaces/apiInterface";
import {
  GET_ALL_RECEIPT_PATIENT,
  GET_ALL_PATIENT_OUTSTANDING_DATA,
  GET_PATIENT_ADVANCE_INVOICE_DATA,
  GET_PATIENT_REFUND_INVOICE_DATA,
  CREATE_RECEIPT_REFUND,
  UPDATE_RECEIPT_REFUND,
  CREATE_RECEIPT_ADVANCE,
  UPDATE_RECEIPT_ADVANCE,
  CREATE_RECEIPT_OUTSTANDING,
  UPDATE_RECEIPT_OUTSTANDING,
  GET_OUTSTANDING_INVOICE_DATA,
  DELETE_OUTSTANDING_INVOICE_DATA,
} from "../../../config/config";

export const getAllReceiptPatient = (data: IAPIPayload) => {
  return axios.post(GET_ALL_RECEIPT_PATIENT, data);
};

export const getAllReceiptPatientOutstandingData = (data: IAPIPayload) => {
  return axios.post(GET_ALL_PATIENT_OUTSTANDING_DATA, data);
};

export const getPatientAdvanceInvoiceData = (data: IAPIPayload) => {
  return axios.post(GET_PATIENT_ADVANCE_INVOICE_DATA, data);
};

export const getPatientRefundInvoiceData = (data: IAPIPayload) => {
  return axios.post(GET_PATIENT_REFUND_INVOICE_DATA, data);
};

export const createReceiptRefund = (data: IAPIPayload) => {
  return axios.post(CREATE_RECEIPT_REFUND, data);
};

export const updateReceiptRefund = (data: IAPIPayload) => {
  return axios.post(UPDATE_RECEIPT_REFUND, data);
};

export const createReceiptAdvance = (data: IAPIPayload) => {
  return axios.post(CREATE_RECEIPT_ADVANCE, data);
};

export const updateReceiptAdvance = (data: IAPIPayload) => {
  return axios.post(UPDATE_RECEIPT_ADVANCE, data);
};

export const createReceiptOutStanding = (data: IAPIPayload) => {
  return axios.post(CREATE_RECEIPT_OUTSTANDING, data);
};

export const updateReceiptOutStanding = (data: IAPIPayload) => {
  return axios.post(UPDATE_RECEIPT_OUTSTANDING, data);
};

export const getOutstandingInvoiceData = (data: IAPIPayload) => {
  return axios.post(GET_OUTSTANDING_INVOICE_DATA, data);
};

export const deleteOutstandingInvoiceData = (data: IAPIPayload) => {
  return axios.post(DELETE_OUTSTANDING_INVOICE_DATA, data);
};

import axios from "axios";
import {
  ADD_PATIENT_INSURANCE_PLAN,
  GENERATE_INVOICE,
  GENERATE_PAYMENT_LINK,
  GET_INVOICE_LAST,
  GET_INVOICE_PAYMENT_MOBILE,
  GET_SETTLED_INVOICE,
} from "../../../config/config";
import { IAPIPayload } from "../../../interfaces/apiInterface";

export const getInvoice = (data: IAPIPayload) => {
  return axios.post(GET_INVOICE_LAST, data);
};
export const getSettledInvoice = (data: IAPIPayload) => {
  return axios.post(GET_SETTLED_INVOICE, data);
};
export const generateInvoice = (data: IAPIPayload) => {
  return axios.post(GENERATE_INVOICE, data);
};
export const getInsuarncePlan = (data: IAPIPayload) => {
  return axios.post(ADD_PATIENT_INSURANCE_PLAN, data);
};
export const generatePaymentLink = (data: IAPIPayload) => {
  return axios.post(GENERATE_PAYMENT_LINK, data);
};
export const invoiceOnlinePayment = (data: IAPIPayload) => {
  return axios.post(GET_INVOICE_PAYMENT_MOBILE, data);
};

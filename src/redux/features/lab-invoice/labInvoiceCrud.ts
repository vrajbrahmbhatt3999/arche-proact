import axios from "axios";
import {
    CREATE_NEW_INVOICE,
    GET_ALL_DOCTORS,
    GET_ALL_PATIENT_INSURANCE,
    GET_LAB_TESTS,
    GET_PATIENT_INVOICE,
    GET_PATIENT_SEARCH_DATA,
    LAB_INVOICE_PAYMENT,
    LAB_SETTLED_INVOICE
} from "../../../config/config";
import { IAPIPayload } from "../../../interfaces/apiInterface";


export const getAllPatientInsurances = (data: IAPIPayload) => {
    return axios.post(GET_ALL_PATIENT_INSURANCE, data);
};

export const getAllDoctors = (data: IAPIPayload) => {
    return axios.post(GET_ALL_DOCTORS, data);
};

export const getPatientSearchData = (data: IAPIPayload) => {
    return axios.post(GET_PATIENT_SEARCH_DATA, data);
};

export const getSettledInvoice = (data: IAPIPayload) => {
    return axios.post(LAB_SETTLED_INVOICE, data);
};

export const getPatientInvoice = (data: IAPIPayload) => {
    return axios.post(GET_PATIENT_INVOICE, data);
};

export const getAllTests = (data: IAPIPayload) => {
    return axios.post(GET_LAB_TESTS, data);
};

export const getNewInvoice = (data: IAPIPayload) => {
    return axios.post(CREATE_NEW_INVOICE, data);
};

export const invoicePayment = (data: IAPIPayload) => {
    return axios.post(LAB_INVOICE_PAYMENT, data);
};


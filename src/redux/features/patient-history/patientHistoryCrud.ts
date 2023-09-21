import axios from "axios";
import { IAPIPayload } from "../../../interfaces/apiInterface";
import {
  GET_PATIENT_INFO_URL,
  PATIENT_DIOG_STATUS_URL,
  GET_PATIENT_HISTORY_URL,
  GET_PATIENT_DIAG_ATTACHMENTS_URL,
  GET_PATIENT_DIANGNOSIS_DETAIL_URL,
  GET_PATIENT_ATTACHMENTS_URL,
  GET_PATIENT_IMAGES_URL,
  GET_COMPARE_DOCUMENTS_URL,
  GET_PATIENT_DENTAL_INFO_URL,
} from "../../../config/config";

export const getPatientInformation = (data: IAPIPayload) => {
  return axios.post(GET_PATIENT_INFO_URL, data);
};

export const changePatientStatus = (data: IAPIPayload) => {
  return axios.post(PATIENT_DIOG_STATUS_URL, data);
};

export const getPatientHistory = (data: IAPIPayload) => {
  return axios.post(GET_PATIENT_HISTORY_URL, data);
};

export const getAllPatientHistoryDiagAttachments = (data: IAPIPayload) => {
  return axios.post(GET_PATIENT_DIAG_ATTACHMENTS_URL, data);
};

export const getPatientDiagnosisDetail = (data: IAPIPayload) => {
  return axios.post(GET_PATIENT_DIANGNOSIS_DETAIL_URL, data);
};

export const getPatientAttachments = (data: IAPIPayload) => {
  return axios.post(GET_PATIENT_ATTACHMENTS_URL, data);
};

export const getPatientImages = (data: IAPIPayload) => {
  return axios.post(GET_PATIENT_IMAGES_URL, data);
};

export const getCompareDocuments = (data: IAPIPayload) => {
  return axios.post(GET_COMPARE_DOCUMENTS_URL, data);
};

export const getPatientDentalInformation = (data: IAPIPayload) => {
  return axios.post(GET_PATIENT_DENTAL_INFO_URL, data);
};
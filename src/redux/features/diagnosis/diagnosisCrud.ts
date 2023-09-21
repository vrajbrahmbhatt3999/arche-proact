import axios from 'axios';
import { IAPIPayload } from '../../../interfaces/apiInterface';
import {
  ADD_DIAGNOSIS_DOCUMENT,
  ADD_DIAGNOSIS_IMAGE,
  ADD_PATIENT_PRESCRIPTION,
  FIND_MEDICINE,
  GET_ALL_DIAGNOSIS_SCRIBE_IMAGES,
  GET_ALL_DIAGNOSIS_SCRIBE_NOTES,
  GET_ALL_MEDICINE,
  GET_ALL_MEDICINE_CATEGORY,
  GET_ALL_PATIENT_HISTORY,
  GET_ALL_PATIENT_HISTORY_YEAR,
  GET_PATIENT_DIAGNOSIS_BY_ID,
  GET_PATIENT_MEDICINE,
  MARK_STAGE,
  TAGGED_PATIENT,
  TAGGED_PATIENT_FILTER,
} from '../../../config/config';

export const getAllMedicineCategories = (data: IAPIPayload) => {
  return axios.post(GET_ALL_MEDICINE_CATEGORY, data);
};

export const getAllMedicines = (data: IAPIPayload) => {
  return axios.post(GET_ALL_MEDICINE, data);
};

export const findMedicines = (data: IAPIPayload) => {
  return axios.post(FIND_MEDICINE, data);
};

export const getPatientDiagnosisById = (data: IAPIPayload) => {
  return axios.post(GET_PATIENT_DIAGNOSIS_BY_ID, data);
};

export const addPatientPrescriptions = (data: IAPIPayload) => {
  return axios.post(ADD_PATIENT_PRESCRIPTION, data);
};

export const addDiagnosisImage = (data: IAPIPayload) => {
  return axios.post(ADD_DIAGNOSIS_IMAGE, data);
};

export const addDiagnosisDoc = (data: IAPIPayload) => {
  return axios.post(ADD_DIAGNOSIS_DOCUMENT, data);
};

export const getAllDiagnosisScribeNotes = (data: IAPIPayload) => {
  return axios.post(GET_ALL_DIAGNOSIS_SCRIBE_NOTES, data);
};

export const getAllDiagnosisScribeImages = (data: IAPIPayload) => {
  return axios.post(GET_ALL_DIAGNOSIS_SCRIBE_IMAGES, data);
};

export const getAllPatientHistorys = (data: IAPIPayload) => {
  return axios.post(GET_ALL_PATIENT_HISTORY, data);
};

export const getPatientMedicines = (data: IAPIPayload) => {
  return axios.post(GET_PATIENT_MEDICINE, data);
};

export const marksStage = (data: IAPIPayload) => {
  return axios.post(MARK_STAGE, data);
};

export const taggedPatientList = (data: IAPIPayload) => {
  return axios.post(TAGGED_PATIENT, data);
};

export const taggedPatientFilterList = (data: IAPIPayload) => {
  return axios.post(TAGGED_PATIENT_FILTER, data);
};

export const getAllPatientHistoryYears = (data: IAPIPayload) => {
  return axios.post(GET_ALL_PATIENT_HISTORY_YEAR, data);
};

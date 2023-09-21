import axios from "axios";
import {
  ASSIGN_TAG,
  // CREATE_PATIENT,
  // DELETE_PATIENT,
  // GET_ALL_BRANCH_LIST,
  // GET_ALL_MEDICAL_TIMELINE,
  // GET_ALL_PATIENT_LIST,
  // GET_ALL_SELECTION_LIST,
  // GET_ALL_TODAY_PATIENT,
  // GET_PATIENT_BY_ID,
  // UPDATE_PATIENT,
  CREATE_MEDICAL_HISTORY,
  GET_ALL_ASSIGN_TAG,
  GET_ALL_MEDICAL_HISTORY,
  GET_ALL_MEDICAL_TIMELINE,
  GET_ALL_PATIENT_APPOINTMENT,
  GET_ALL_TODAY_PATIENT_APPOINTMENT,
  GET_RECENT_MEDICAL_HISTORY,
  UPDATE_APPOINTMENT_STATUS,
  CREATE_PATIENT,
  DELETE_PATIENT,
  GET_ALL_BRANCH_LIST,
  // GET_ALL_MEDICAL_TIMELINE,
  GET_ALL_PATIENT_LIST,
  GET_ALL_SELECTION_LIST,
  GET_ALL_TODAY_PATIENT,
  GET_PATIENT_BY_ID,
  UPDATE_PATIENT,
  CREATE_INSURANCE_PLAN,
  GET_ALL_PATIENT_INSURANCE_PLAN,
  CREATE_ADDTIONAL_PATIENT_FIELDS,
  GET_ADDTIONAL_PATIENT_FIELDS,
} from "../../../../config/config";
import { IAPIPayload } from "../../../../interfaces/apiInterface";

export const assignTags = (data: IAPIPayload) => {
  return axios.post(ASSIGN_TAG, data);
};

export const getAllAssignTags = (data: IAPIPayload) => {
  return axios.post(GET_ALL_ASSIGN_TAG, data);
};

export const getAllMedicalTimelines = (data: IAPIPayload) => {
  return axios.post(GET_ALL_MEDICAL_TIMELINE, data);
};

export const createMedicalsHistory = (data: IAPIPayload) => {
  return axios.post(CREATE_MEDICAL_HISTORY, data);
};

export const getAllMedicalsHistory = (data: IAPIPayload) => {
  return axios.post(GET_ALL_MEDICAL_HISTORY, data);
};

export const getRecentMedicalsHistory = (data: IAPIPayload) => {
  return axios.post(GET_RECENT_MEDICAL_HISTORY, data);
};
// Patient EMR

export const getSelectionList = (data: IAPIPayload) => {
  return axios.post(GET_ALL_SELECTION_LIST, data);
};

export const getBranchList = (data: IAPIPayload) => {
  return axios.post(GET_ALL_BRANCH_LIST, data);
};

export const getAllPatient = (data: IAPIPayload) => {
  return axios.post(GET_ALL_PATIENT_LIST, data);
};

export const getPatientById = (data: IAPIPayload) => {
  return axios.post(GET_PATIENT_BY_ID, data);
};

export const createPatient = (data: IAPIPayload) => {
  return axios.post(CREATE_PATIENT, data);
};

export const updatePatient = (data: IAPIPayload) => {
  return axios.post(UPDATE_PATIENT, data);
};

export const deletePatient = (data: IAPIPayload) => {
  return axios.post(DELETE_PATIENT, data);
};

export const createInsurancePlans = (data: IAPIPayload) => {
  return axios.post(CREATE_INSURANCE_PLAN, data);
};

export const getAllInsurancePlans = (data: IAPIPayload) => {
  return axios.post(GET_ALL_PATIENT_INSURANCE_PLAN, data);
};

export const createFields = (data: IAPIPayload) => {
  return axios.post(CREATE_ADDTIONAL_PATIENT_FIELDS, data);
};
export const getAllAdditionalFields = (data: IAPIPayload) => {
  return axios.post(GET_ADDTIONAL_PATIENT_FIELDS, data);
};

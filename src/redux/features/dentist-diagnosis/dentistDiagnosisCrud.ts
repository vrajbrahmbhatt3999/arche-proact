import axios from 'axios'
import { IAPIPayload } from '../../../interfaces/apiInterface'
import {
  CREATE_DENTAL_DIAGNOSIS_URL,
  GET_DIAGNOSIS_SEARCH_TAG_URL,
  GET_DIAGNOSIS_TAG,
  UPDATE_DENTAL_DIAGNOSIS_URL,
  GET_DENTAL_DIAGNOSIS_BY_ID_URL,
  GET_ALL_DENTAL_TREATMENT_SERVICE_URL,
  GET_ALL_DENTAL_TOOTH_URL,
  ADD_DENTAL_DIAGNOSIS_DOCUMENT,
  ADD_DENTAL_DIAGNOSIS_IMAGE,
  ADD_PATIENT_DENTAL_PRESCRIPTION,
  FIND_MEDICINE,
  GET_ALL_DENTAL_DIAGNOSIS_SCRIBE_IMAGES,
  GET_ALL_DENTAL_DIAGNOSIS_SCRIBE_NOTES,
  GET_ALL_MEDICINE,
  GET_ALL_MEDICINE_CATEGORY,
  GET_ALL_PATIENT_DENTAL_HISTORY,
  GET_PATIENT_DENTAL_DIAGNOSIS_BY_ID,
  GET_PATIENT_DENTAL_MEDICINE,
  DENTAL_MARK_STAGE,
  TAGGED_PATIENT,
  TAGGED_PATIENT_FILTER,
} from '../../../config/config'

export const createDentalDiagnosis = (data: IAPIPayload) => {
  return axios.post(CREATE_DENTAL_DIAGNOSIS_URL, data)
}

export const updateDentalDiagnosis = (data: IAPIPayload) => {
  return axios.post(UPDATE_DENTAL_DIAGNOSIS_URL, data)
}

export const getDentalDiagnosisById = (data: IAPIPayload) => {
  return axios.post(GET_DENTAL_DIAGNOSIS_BY_ID_URL, data)
}

export const getdiagnosisSearchTags = (data: IAPIPayload) => {
  return axios.post(GET_DIAGNOSIS_SEARCH_TAG_URL, data)
}

export const getDiagnosisTags = (data: IAPIPayload) => {
  return axios.post(GET_DIAGNOSIS_TAG, data)
}

export const getAllDentalTreatmentServicesAxios = (data: IAPIPayload) => {
  return axios.post(GET_ALL_DENTAL_TREATMENT_SERVICE_URL, data)
}

export const getAllDentalTreatmentServicesByParentIdAxios = (data: IAPIPayload) => {
  return axios.post(GET_ALL_DENTAL_TREATMENT_SERVICE_URL, data)
}


export const getAllToothAxios = () => {
  return axios.get(GET_ALL_DENTAL_TOOTH_URL)
}


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
  return axios.post(GET_PATIENT_DENTAL_DIAGNOSIS_BY_ID, data);
};

export const addPatientPrescriptions = (data: IAPIPayload) => {
  return axios.post(ADD_PATIENT_DENTAL_PRESCRIPTION, data);
};

export const addDiagnosisImage = (data: IAPIPayload) => {
  return axios.post(ADD_DENTAL_DIAGNOSIS_IMAGE, data);
};

export const addDiagnosisDoc = (data: IAPIPayload) => {
  return axios.post(ADD_DENTAL_DIAGNOSIS_DOCUMENT, data);
};

export const getAllDiagnosisScribeNotes = (data: IAPIPayload) => {
  return axios.post(GET_ALL_DENTAL_DIAGNOSIS_SCRIBE_NOTES, data);
};

export const getAllDiagnosisScribeImages = (data: IAPIPayload) => {
  return axios.post(GET_ALL_DENTAL_DIAGNOSIS_SCRIBE_IMAGES, data);
};

export const getAllPatientHistorys = (data: IAPIPayload) => {
  return axios.post(GET_ALL_PATIENT_DENTAL_HISTORY, data);
};

export const getPatientMedicines = (data: IAPIPayload) => {
  return axios.post(GET_PATIENT_DENTAL_MEDICINE, data);
};

export const marksStage = (data: IAPIPayload) => {
  return axios.post(DENTAL_MARK_STAGE, data);
};

export const taggedPatientList = (data: IAPIPayload) => {
  return axios.post(TAGGED_PATIENT, data);
};

export const taggedPatientFilterList = (data: IAPIPayload) => {
  return axios.post(TAGGED_PATIENT_FILTER, data);
};

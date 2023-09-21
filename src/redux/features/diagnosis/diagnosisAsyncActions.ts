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
  GET_PATIENT_MEDICINE,
  GET_TAGGED_PATIENT,
  GET_TAGGED_PATIENT_FILTER_LIST,
  MARK_STAGE,
  PATIENT_DIAGNOSIS_BY_ID,
} from '../../../constants/asyncActionsType';
import createAsyncThunkForSlice from '../../../utils/utils';
import {
  addDiagnosisDoc,
  addDiagnosisImage,
  addPatientPrescriptions,
  findMedicines,
  getAllDiagnosisScribeImages,
  getAllDiagnosisScribeNotes,
  getAllMedicineCategories,
  getAllMedicines,
  getAllPatientHistoryYears,
  getAllPatientHistorys,
  getPatientDiagnosisById,
  getPatientMedicines,
  marksStage,
  taggedPatientFilterList,
  taggedPatientList,
} from './diagnosisCrud';

export const getAllMedicineCategory = createAsyncThunkForSlice(
  GET_ALL_MEDICINE_CATEGORY,
  getAllMedicineCategories
);

export const getAllMedicine = createAsyncThunkForSlice(
  GET_ALL_MEDICINE,
  getAllMedicines
);

export const findMedicine = createAsyncThunkForSlice(
  FIND_MEDICINE,
  findMedicines
);

export const patientDiagnosisById = createAsyncThunkForSlice(
  PATIENT_DIAGNOSIS_BY_ID,
  getPatientDiagnosisById
);
export const addPatientPrescription = createAsyncThunkForSlice(
  ADD_PATIENT_PRESCRIPTION,
  addPatientPrescriptions,
  {
    isToast: true,
  }
);

export const addDiagnosisImg = createAsyncThunkForSlice(
  ADD_DIAGNOSIS_IMAGE,
  addDiagnosisImage,
  {
    isToast: true,
  }
);

export const addDiagnosisDocument = createAsyncThunkForSlice(
  ADD_DIAGNOSIS_DOCUMENT,
  addDiagnosisDoc,
  {
    isToast: true,
  }
);

export const getAllDiagnosisScribeNote = createAsyncThunkForSlice(
  GET_ALL_DIAGNOSIS_SCRIBE_NOTES,
  getAllDiagnosisScribeNotes,
  {
    isToast: true,
  }
);

export const getAllDiagnosisScribeImage = createAsyncThunkForSlice(
  GET_ALL_DIAGNOSIS_SCRIBE_IMAGES,
  getAllDiagnosisScribeImages,
  {
    isToast: true,
  }
);

export const getAllPatientHistory = createAsyncThunkForSlice(
  GET_ALL_PATIENT_HISTORY,
  getAllPatientHistorys,
  {
    isToast: true,
  }
);

export const getPatientMedicine = createAsyncThunkForSlice(
  GET_PATIENT_MEDICINE,
  getPatientMedicines,
  {
    isToast: true,
  }
);

export const markStage = createAsyncThunkForSlice(MARK_STAGE, marksStage, {
  isToast: true,
});

export const getTaggedPatientList = createAsyncThunkForSlice(
  GET_TAGGED_PATIENT,
  taggedPatientList
);

export const getTaggedPatientFilterList = createAsyncThunkForSlice(
  GET_TAGGED_PATIENT_FILTER_LIST,
  taggedPatientFilterList
);

export const getAllPatientHistoryYear = createAsyncThunkForSlice(
  GET_ALL_PATIENT_HISTORY_YEAR,
  getAllPatientHistoryYears,
  {
    isToast: true,
  }
);

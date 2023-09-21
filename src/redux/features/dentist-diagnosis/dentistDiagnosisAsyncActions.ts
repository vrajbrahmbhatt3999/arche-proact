import { GET_DENTAL_DIAGNOSIS_BY_ID_URL } from '../../../config/config'
import {
  CREATE_DENTAL_DIAGNOSIS,
  DIAGNOSIS_All_TAG,
  DIAGNOSIS_SEARCH_TAG,
  UPDATE_DENTAL_DIAGNOSIS,
  GET_ALL_DENTAL_TOOTH,
  GET_ALL_DENTAL_TREATMENT_SERVICES,
  GET_ALL_DENTAL_TREATMENT_SERVICES_BY_PARENT_ID,
  GET_ALL_MEDICINE_CATEGORY,
  GET_ALL_MEDICINE,
  FIND_MEDICINE,
  PATIENT_DENTAL_DIAGNOSIS_BY_ID,
  ADD_DENTAL_PATIENT_PRESCRIPTION,
  ADD_DENTAL_DIAGNOSIS_IMAGE,
  ADD_DENTAL_DIAGNOSIS_DOCUMENT,
  GET_ALL_DENTAL_DIAGNOSIS_SCRIBE_NOTES,
  GET_ALL_DENTAL_DIAGNOSIS_SCRIBE_IMAGES,
  GET_ALL_PATIENT_HISTORY,
  GET_PATIENT_MEDICINE,
  GET_TAGGED_PATIENT_FILTER_LIST,
  GET_TAGGED_PATIENT,
  DENTAL_MARK_STAGE,
  GET_DENTAL_DIAGNOSIS,
  DELETE_DENTAL_DIAGNOSIS_ENTRY
} from '../../../constants/asyncActionsType'
import createAsyncThunkForSlice from '../../../utils/utils'
import {
  createDentalDiagnosis,
  getDiagnosisTags,
  getdiagnosisSearchTags,
  updateDentalDiagnosis,
  getAllDentalTreatmentServicesAxios,
  getAllToothAxios,
  getAllMedicineCategories,
  getAllMedicines,
  findMedicines,
  getPatientDiagnosisById,
  addPatientPrescriptions,
  addDiagnosisImage,
  addDiagnosisDoc,
  getAllDiagnosisScribeNotes,
  getAllDiagnosisScribeImages,
  getAllPatientHistorys,
  getPatientMedicines,
  taggedPatientList,
  marksStage,
  taggedPatientFilterList,
  getAllDentalTreatmentServicesByParentIdAxios,
  getDentalDiagnosisById
} from './dentistDiagnosisCrud'

export const createDentalDiagnosisAction = createAsyncThunkForSlice(
  CREATE_DENTAL_DIAGNOSIS,
  createDentalDiagnosis,
  {
    isToast: true,
  }
)

export const getDentalDiagnosisByIdAction = createAsyncThunkForSlice(
  GET_DENTAL_DIAGNOSIS,
  getDentalDiagnosisById
)

export const updateDentalDiagnosisAction = createAsyncThunkForSlice(
  UPDATE_DENTAL_DIAGNOSIS,
  updateDentalDiagnosis,
  {
    isToast: true,
  }
)

export const getDiagnosisSearchTags = createAsyncThunkForSlice(
  DIAGNOSIS_SEARCH_TAG,
  getdiagnosisSearchTags
)

export const getDiagnosisAllTags = createAsyncThunkForSlice(
  DIAGNOSIS_All_TAG,
  getDiagnosisTags
)

export const getAllDentalTreatmentServices = createAsyncThunkForSlice(
  GET_ALL_DENTAL_TREATMENT_SERVICES,
  getAllDentalTreatmentServicesAxios
)

export const getAllDentalTreatmentServicesByParentId = createAsyncThunkForSlice(
  GET_ALL_DENTAL_TREATMENT_SERVICES_BY_PARENT_ID,
  getAllDentalTreatmentServicesByParentIdAxios
)

export const getAllTooths = createAsyncThunkForSlice(
  GET_ALL_DENTAL_TOOTH,
  getAllToothAxios
)


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
  PATIENT_DENTAL_DIAGNOSIS_BY_ID,
  getPatientDiagnosisById
);
export const addPatientPrescription = createAsyncThunkForSlice(
  ADD_DENTAL_PATIENT_PRESCRIPTION,
  addPatientPrescriptions,
  {
    isToast: true,
  }
);

export const addDiagnosisImg = createAsyncThunkForSlice(
  ADD_DENTAL_DIAGNOSIS_IMAGE,
  addDiagnosisImage,
  {
    isToast: true,
  }
);

export const addDiagnosisDocument = createAsyncThunkForSlice(
  ADD_DENTAL_DIAGNOSIS_DOCUMENT,
  addDiagnosisDoc,
  {
    isToast: true,
  }
);

export const getAllDiagnosisScribeNote = createAsyncThunkForSlice(
  GET_ALL_DENTAL_DIAGNOSIS_SCRIBE_NOTES,
  getAllDiagnosisScribeNotes,
  {
    isToast: true,
  }
);

export const getAllDiagnosisScribeImage = createAsyncThunkForSlice(
  GET_ALL_DENTAL_DIAGNOSIS_SCRIBE_IMAGES,
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

export const markStage = createAsyncThunkForSlice(DENTAL_MARK_STAGE, marksStage, {
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

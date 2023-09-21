import { GET_ALL_ASSIGN_TAG } from '../../../../config/config'
import {
  ASSIGN_TAG,
  // CREATE_MEDICAL_HISTORY,
  // GET_ALL_MEDICAL_HISTORY,
  // GET_ALL_MEDICAL_TIMELINE,
  GET_ALL_PATIENT_APPOINTMENT,
  // GET_ALL_TAG,
  GET_ALL_TODAY_PATIENT_APPOINTMENT,
  GET_RECENT_MEDICAL_HISTORY,
  UPDATE_APPOINTMENT_STATUS,
  // CREATE_PATIENT_EMR,
  // DELETE_PATIENT_EMR,
  // GET_ALL_BRANCH_LIST,
  CREATE_PATIENT_EMR,
  DELETE_PATIENT_EMR,
  GET_ALL_BRANCH_LIST,
  CREATE_MEDICAL_HISTORY,
  GET_ALL_MEDICAL_HISTORY,
  GET_ALL_MEDICAL_TIMELINE,
  GET_ALL_PATIENT_LIST,
  GET_ALL_SELECTION_LIST,
  GET_ALL_TAG,
  // GET_ALL_TODAY_PATIENT,
  GET_PATIENT_EMR_BY_ID,
  UPDATE_PATIENT_EMR,
  CREATE_INSURANCE_PLAN,
  GET_ALL_PATIENT_INSURANCE_PLAN,
  CREATE_ADDTIONAL_FIELDS,
  GET_PATIENT_ADDTIONAL_FIELDS,
  // GET_ALL_TODAY_PATIENT_APPOINTMENT,
  // GET_RECENT_MEDICAL_HISTORY,
  // UPDATE_APPOINTMENT_STATUS,
} from '../../../../constants/asyncActionsType'
import createAsyncThunkForSlice from '../../../../utils/utils'
import {
  assignTags,
  // createMedicalsHistory,
  getAllAssignTags,
  // getAllMedicalsHistory,
  // createPatient,
  // deletePatient,
  // getAllMedicalTimelines,
  // getAllPatientsAppointment,
  // getAllTodayPatients,
  // getRecentMedicalsHistory,
  // updateAppointmentsStatus,
  // createPatient,
  // getAllMedicalTimelines,
  // getAllPatient,
  // getAllTodayPatients,
  createPatient,
  deletePatient,
  createMedicalsHistory,
  getAllMedicalsHistory,
  getAllMedicalTimelines,
  getAllPatient,
  // getAllTodayPatients,
  getBranchList,
  getPatientById,
  getSelectionList,
  updatePatient,
  getRecentMedicalsHistory,
  createInsurancePlans,
  getAllInsurancePlans,
  createFields,
  getAllAdditionalFields,
  // updateAppointmentsStatus,
} from './patientCrud'

export const assignTag = createAsyncThunkForSlice(ASSIGN_TAG, assignTags, {
  isToast: true,
})

export const getAllAssignTag = createAsyncThunkForSlice(
  GET_ALL_ASSIGN_TAG,
  getAllAssignTags,
  {
    isToast: true,
  }
)

export const getAllMedicalTimeline = createAsyncThunkForSlice(
  GET_ALL_MEDICAL_TIMELINE,
  getAllMedicalTimelines,
  {
    isToast: true,
  }
)

// export const createMedicalHistory = createAsyncThunkForSlice(
//   CREATE_MEDICAL_HISTORY,
//   createMedicalsHistory
// );

// Patient EMR
export const getPatientSelectionList = createAsyncThunkForSlice(
  GET_ALL_SELECTION_LIST,
  getSelectionList
)

export const getPatientBranchList = createAsyncThunkForSlice(
  GET_ALL_BRANCH_LIST,
  getBranchList
)

export const getAllPatientList = createAsyncThunkForSlice(
  GET_ALL_PATIENT_LIST,
  getAllPatient
)

export const getPatientEmrById = createAsyncThunkForSlice(
  GET_PATIENT_EMR_BY_ID,
  getPatientById
)

export const createPatientEmr = createAsyncThunkForSlice(
  CREATE_PATIENT_EMR,
  createPatient,
  {
    isToast: true,
  }
)
// export const getAllMedicalHistory = createAsyncThunkForSlice(
//   GET_ALL_MEDICAL_HISTORY,
//   getAllMedicalsHistory,
//   {
//     isToast: true,
//   }
// );
// export const getRecentMedicalHistory = createAsyncThunkForSlice(
//   GET_RECENT_MEDICAL_HISTORY,
//   getRecentMedicalsHistory
// );

export const updatePatientEmr = createAsyncThunkForSlice(
  UPDATE_PATIENT_EMR,
  updatePatient,
  {
    isToast: true,
  }
)

export const deletePatientEmr = createAsyncThunkForSlice(
  DELETE_PATIENT_EMR,
  deletePatient,
  {
    isToast: true,
  }
)
export const createMedicalHistory = createAsyncThunkForSlice(
  CREATE_MEDICAL_HISTORY,
  createMedicalsHistory,
  {
    isToast: true,
  }
)

export const getAllMedicalHistory = createAsyncThunkForSlice(
  GET_ALL_MEDICAL_HISTORY,
  getAllMedicalsHistory,
  {
    isToast: true,
  }
)

export const getRecentMedicalHistory = createAsyncThunkForSlice(
  GET_RECENT_MEDICAL_HISTORY,
  getRecentMedicalsHistory
  // {
  //   isToast: true,
  // }
)

export const createInsurancePlan = createAsyncThunkForSlice(
  CREATE_INSURANCE_PLAN,
  createInsurancePlans,
  {
    isToast: true,
  }
)

export const getAllInsurancePlan = createAsyncThunkForSlice(
  GET_ALL_PATIENT_INSURANCE_PLAN,
  getAllInsurancePlans
)

export const createAddtionalFields = createAsyncThunkForSlice(
  CREATE_ADDTIONAL_FIELDS,
  createFields,
  {
    isToast: true,
  }
)

export const getPatientAddtionalFields = createAsyncThunkForSlice(
  GET_PATIENT_ADDTIONAL_FIELDS,
  getAllAdditionalFields
)

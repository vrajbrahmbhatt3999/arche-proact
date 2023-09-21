import { CREATE_EXISTING_DENTAL_TREATMENT_URL, GET_ALL_TREATMENT_PLANS_STATUS } from '../../../config/config'
import {
  GET_ALL_TREATMENT_PLANS,
  GET_ALL_TREATMENT_SERVICES,
  ADD_DEPARTMENT,
  EDIT_DEPARTMENT,
  GET_ALL_DEPARTMENT,
  GET_DEPARTMENT_BY_ID,
  UPDATE_DEPARTMENT_STATUS,
  CREATE_TREATMENT_PLAN,
  CREATE_CUSTOM_TREATMENT_PLAN,
  GET_ALL_TREATMENT_PLANS_TYPE,
  UPDATE_TREATMENT_PLANS_TYPE,
  GET_ALL_DENTAL_TREATMENT_SERVICES,
  GET_DIAGNOSIS_TREATMENT_PLAN,
  DELETE_ALL_DIAGNOSIS_TREATMENT_PLAN,
  CREATE_MASTER_PLAN_TYPE,
  UPDATE_MASTER_PLAN_TYPE,
  DELETE_DENTAL_DIAGNOSIS_ENTRY,
} from '../../../constants/asyncActionsType'
import createAsyncThunkForSlice from '../../../utils/utils'
import { updateStatusCategoryValue } from '../master-table-category/MasterTableCategoryCrud'
import {
  getAlltreatmentPlans,
  createtreatmentPlan,
  getAlltreatmentServices,
  addDepartments,
  editDepartments,
  getDepartmentByIds,
  updateDepartmentStatuss,
  createCustomtreatmentPlan,
  getAllTreatmentPlanforDianosis,
  updateAndSaveTreatmentPlan,
  getAllDentalTreatmentServicesAxios,
  getTreatmentPlans,
  deleteTreatmentPlans,
  createNewPlan,
  getAlltreatmentPlansStatus,
  updatePlan,
  deleteDentalTreatmentPlanTableDataById
} from './treatmentPlansCrud'

export const getAllTreatmentPlans = createAsyncThunkForSlice(
  GET_ALL_TREATMENT_PLANS,
  getAlltreatmentPlans
)

export const createTreatmentPlan = createAsyncThunkForSlice(
  CREATE_TREATMENT_PLAN,
  createtreatmentPlan
)

export const createCustomTreatmentPlan = createAsyncThunkForSlice(
  CREATE_CUSTOM_TREATMENT_PLAN,
  createCustomtreatmentPlan,
  {
    isToast: true,
  }
)

export const getAllTreatmentServices = createAsyncThunkForSlice(
  GET_ALL_TREATMENT_SERVICES,
  getAlltreatmentServices
)

export const addDepartment = createAsyncThunkForSlice(
  ADD_DEPARTMENT,
  addDepartments,
  {
    isToast: true,
  }
)

export const getDepartmentById = createAsyncThunkForSlice(
  GET_DEPARTMENT_BY_ID,
  getDepartmentByIds,
  {
    isToast: true,
  }
)

export const editDepartment = createAsyncThunkForSlice(
  EDIT_DEPARTMENT,
  editDepartments,
  {
    isToast: true,
  }
)

export const updateDepartmentStatus = createAsyncThunkForSlice(
  UPDATE_DEPARTMENT_STATUS,
  updateDepartmentStatuss,
  {
    isToast: true,
  }
)

export const getAllTreatmentPlansforPatient = createAsyncThunkForSlice(
  GET_ALL_TREATMENT_PLANS_TYPE,
  getAllTreatmentPlanforDianosis
)

export const updateTreatmentPlan = createAsyncThunkForSlice(
  UPDATE_TREATMENT_PLANS_TYPE,
  updateAndSaveTreatmentPlan,
  {
    isToast: true,
  }
)

export const getAllDentalTreatmentServices = createAsyncThunkForSlice(
  GET_ALL_DENTAL_TREATMENT_SERVICES,
  getAllDentalTreatmentServicesAxios
)

export const getAllDiagnosisTreatmentPlans = createAsyncThunkForSlice(
  GET_DIAGNOSIS_TREATMENT_PLAN,
  getTreatmentPlans
)

export const deleteDiagnosisTreatmentPlans = createAsyncThunkForSlice(
  DELETE_ALL_DIAGNOSIS_TREATMENT_PLAN,
  deleteTreatmentPlans
)

export const createNewMasterPlan = createAsyncThunkForSlice(
  CREATE_MASTER_PLAN_TYPE,
  createNewPlan,
  {
    isToast: true,
  }
)

export const updateMasterPlan = createAsyncThunkForSlice(
  UPDATE_MASTER_PLAN_TYPE,
  updatePlan,
  {
    isToast: true,
  }
)

export const getAllTreatmentServicesStatus = createAsyncThunkForSlice(
  GET_ALL_TREATMENT_PLANS_STATUS,
  getAlltreatmentPlansStatus
)

export const createExistingDentalTreatmentPlan = createAsyncThunkForSlice(
  CREATE_EXISTING_DENTAL_TREATMENT_URL,
  createtreatmentPlan
)

export const deleteDentalTreatmentPlanTableDataByIdAction = createAsyncThunkForSlice(
  DELETE_DENTAL_DIAGNOSIS_ENTRY,
  deleteDentalTreatmentPlanTableDataById,
  {
    isToast: true,
  }
)

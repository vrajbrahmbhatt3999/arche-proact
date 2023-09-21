import axios from 'axios'
import {
  GET_ALL_TREATMENT_PLANS_URL,
  GET_ALL_TREATMENT_SERVICES_URL,
  ADD_DEPARTMENT,
  EDIT_DEPARTMENT,
  GET_DEPARTMENT_BY_ID,
  UPDATE_DEPARTMENT_STATUS,
  CREATE_TREATMENT_PLAN_URL,
  CREATE_CUSTOM_TREATMENT_PLAN_URL,
  GET_ALL_TREATMENT_PLANS_URL_DIAG_URL,
  UPDATE_TREATMENT_PLANS_URL,
  GET_ALL_DENTAL_TREATMENT_SERVICES_URL,
  GET_ALL_DIAGNOSIS_TREATMENT_PLAN,
  DELETE_DIAGNOSIS_TREATMENT_PLAN,
  CREATE_NEW_PLAN_URL,
  GET_ALL_TREATMENT_PLANS_STATUS,
  UPDATE_PLAN_URL,
  CREATE_EXISTING_DENTAL_TREATMENT_URL,
  DELETE_DENTAL_DIAGNOSIS_URL
} from '../../../config/config'
import { IAPIPayload } from '../../../interfaces/apiInterface'

export const getAlltreatmentPlans = (data: IAPIPayload) => {
  return axios.post(GET_ALL_TREATMENT_PLANS_URL, data)
}

export const createtreatmentPlan = (data: IAPIPayload) => {
  return axios.post(CREATE_TREATMENT_PLAN_URL, data)
}

export const createCustomtreatmentPlan = (data: IAPIPayload) => {
  return axios.post(CREATE_CUSTOM_TREATMENT_PLAN_URL, data)
}

export const getAlltreatmentServices = (data: IAPIPayload) => {
  return axios.post(GET_ALL_TREATMENT_SERVICES_URL, data)
}

export const getAllDentalTreatmentServicesAxios = (data: IAPIPayload) => {
  return axios.post(GET_ALL_DENTAL_TREATMENT_SERVICES_URL, data)
}

export const addDepartments = (data: IAPIPayload) => {
  return axios.post(ADD_DEPARTMENT, data)
}

export const getDepartmentByIds = (data: IAPIPayload) => {
  return axios.post(GET_DEPARTMENT_BY_ID, data)
}

export const editDepartments = (data: IAPIPayload) => {
  return axios.post(EDIT_DEPARTMENT, data)
}

export const updateDepartmentStatuss = (data: IAPIPayload) => {
  return axios.post(UPDATE_DEPARTMENT_STATUS, data)
}

export const getAllTreatmentPlanforDianosis = (data: IAPIPayload) => {
  return axios.post(GET_ALL_TREATMENT_PLANS_URL_DIAG_URL, data)
}

export const updateAndSaveTreatmentPlan = (data: IAPIPayload) => {
  return axios.post(UPDATE_TREATMENT_PLANS_URL, data)
}

export const getTreatmentPlans = (data: IAPIPayload) => {
  return axios.post(GET_ALL_DIAGNOSIS_TREATMENT_PLAN, data)
}

export const deleteTreatmentPlans = (data: IAPIPayload) => {
  return axios.post(DELETE_DIAGNOSIS_TREATMENT_PLAN, data)
}
export const createNewPlan = (data: IAPIPayload) => {
  return axios.post(CREATE_NEW_PLAN_URL, data)
}
export const updatePlan = (data: IAPIPayload) => {
  return axios.post(UPDATE_PLAN_URL, data)
}
export const getAlltreatmentPlansStatus = (data: IAPIPayload) => {
  return axios.post(GET_ALL_TREATMENT_PLANS_STATUS, data)
}
export const createExistingDentalTreatment = (data: IAPIPayload) => {
  return axios.post(CREATE_EXISTING_DENTAL_TREATMENT_URL, data)
}

export const deleteDentalTreatmentPlanTableDataById = (data: IAPIPayload) => {
  return axios.post(DELETE_DENTAL_DIAGNOSIS_URL, data)
}
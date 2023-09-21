import axios from 'axios';
import { IAPIPayload } from '../../../interfaces/apiInterface';
import {
  ADD_INSURANCE_COMPANY,
  ADD_INSURANCE_PLAN,
  ADD_MARKETPLACE,
  ALL_INSURANCE_PLAN,
  DELETE_INSURANCE_COMPANY_ATTACHMENT,
  DELETE_INSURANCE_PLAN_ATTACHMENT,
  DELETE_MARKETLPLACE_ATTACHMENT,
  GET_ALL_INSURANCE_COMPANY,
  GET_ALL_INSURANCE_PLAN,
  GET_ALL_MARKETPLACE,
  GET_ALL_TREATMENT_SERVICES_URL,
  GET_INSURANCE_COMPANY,
  GET_INSURANCE_PLAN,
  GET_MARKETPLACE,
  GET_PLAN_ALL_SERVICE,
  UPDATE_INSURANCE_COMPANY,
  UPDATE_INSURANCE_DEPARTMENT,
  UPDATE_INSURANCE_PLAN,
  UPDATE_MARKETPLACE,
} from '../../../config/config';

export const getAllmarketplaces = (data: IAPIPayload) => {
  return axios.post(GET_ALL_MARKETPLACE, data);
};

export const addmarketplaces = (data: IAPIPayload) => {
  return axios.post(ADD_MARKETPLACE, data);
};

export const getAllInsuarnceCompanies = (data: IAPIPayload) => {
  return axios.post(GET_ALL_INSURANCE_COMPANY, data);
};

export const addInsuarnceCompanies = (data: IAPIPayload) => {
  return axios.post(ADD_INSURANCE_COMPANY, data);
};

export const getAllInsuarncePlans = (data: IAPIPayload) => {
  return axios.post(GET_ALL_INSURANCE_PLAN, data);
};

export const allInsuarncePlans = (data: IAPIPayload) => {
  return axios.post(ALL_INSURANCE_PLAN, data);
};

export const addInsuarncePlans = (data: IAPIPayload) => {
  return axios.post(ADD_INSURANCE_PLAN, data);
};

export const getDepartmentServices = (data: IAPIPayload) => {
  return axios.post(GET_ALL_TREATMENT_SERVICES_URL, data);
};

export const updateInsurancePlanDepartments = (data: IAPIPayload) => {
  return axios.post(UPDATE_INSURANCE_DEPARTMENT, data);
};

export const getMarketplaces = (data: IAPIPayload) => {
  return axios.post(GET_MARKETPLACE, data);
};

export const updateMarketplaces = (data: IAPIPayload) => {
  return axios.post(UPDATE_MARKETPLACE, data);
};

export const getInsuranceCompanys = (data: IAPIPayload) => {
  return axios.post(GET_INSURANCE_COMPANY, data);
};

export const updateInsuranceCompanys = (data: IAPIPayload) => {
  return axios.post(UPDATE_INSURANCE_COMPANY, data);
};

export const getInsurancePlans = (data: IAPIPayload) => {
  return axios.post(GET_INSURANCE_PLAN, data);
};

export const updateInsurancePlans = (data: IAPIPayload) => {
  return axios.post(UPDATE_INSURANCE_PLAN, data);
};

export const getPlanAllServices = (data: IAPIPayload) => {
  return axios.post(GET_PLAN_ALL_SERVICE, data);
};

export const deleteMarketplaceAttachments = (data: IAPIPayload) => {
  return axios.post(DELETE_MARKETLPLACE_ATTACHMENT, data);
};

export const deleteInsuranceCompanyAttachments = (data: IAPIPayload) => {
  return axios.post(DELETE_INSURANCE_COMPANY_ATTACHMENT, data);
};

export const deleteInsurancePlanAttachments = (data: IAPIPayload) => {
  return axios.post(DELETE_INSURANCE_PLAN_ATTACHMENT, data);
};

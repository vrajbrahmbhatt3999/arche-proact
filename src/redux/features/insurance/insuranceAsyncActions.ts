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
} from '../../../constants/asyncActionsType';
import createAsyncThunkForSlice from '../../../utils/utils';
import {
  addInsuarnceCompanies,
  addInsuarncePlans,
  addmarketplaces,
  allInsuarncePlans,
  deleteInsuranceCompanyAttachments,
  deleteInsurancePlanAttachments,
  deleteMarketplaceAttachments,
  getAllInsuarnceCompanies,
  getAllInsuarncePlans,
  getAllmarketplaces,
  getDepartmentServices,
  getInsuranceCompanys,
  getInsurancePlans,
  getMarketplaces,
  getPlanAllServices,
  updateInsuranceCompanys,
  updateInsurancePlanDepartments,
  updateInsurancePlans,
  updateMarketplaces,
} from './insuranceCrud';

export const getAllmarketplace = createAsyncThunkForSlice(
  GET_ALL_MARKETPLACE,
  getAllmarketplaces
);

export const addmarketplace = createAsyncThunkForSlice(
  ADD_MARKETPLACE,
  addmarketplaces,
  {
    isToast: true,
  }
);

export const getAllInsuarnceCompany = createAsyncThunkForSlice(
  GET_ALL_INSURANCE_COMPANY,
  getAllInsuarnceCompanies
);

export const addInsuarnceCompany = createAsyncThunkForSlice(
  ADD_INSURANCE_COMPANY,
  addInsuarnceCompanies,
  {
    isToast: true,
  }
);

export const getAllInsuarncePlan = createAsyncThunkForSlice(
  GET_ALL_INSURANCE_PLAN,
  getAllInsuarncePlans
);

export const allInsuarncePlan = createAsyncThunkForSlice(
  ALL_INSURANCE_PLAN,
  allInsuarncePlans
);

export const addInsuarncePlan = createAsyncThunkForSlice(
  ADD_INSURANCE_PLAN,
  addInsuarncePlans,
  {
    isToast: true,
  }
);

export const getDepartmentService = createAsyncThunkForSlice(
  GET_ALL_TREATMENT_SERVICES_URL,
  getDepartmentServices
);

export const updateInsurancePlanDepartment = createAsyncThunkForSlice(
  UPDATE_INSURANCE_DEPARTMENT,
  updateInsurancePlanDepartments
);

export const getMarketplace = createAsyncThunkForSlice(
  GET_MARKETPLACE,
  getMarketplaces
);

export const updateMarketplace = createAsyncThunkForSlice(
  UPDATE_MARKETPLACE,
  updateMarketplaces,
  {
    isToast: true,
  }
);

export const getInsuranceCompany = createAsyncThunkForSlice(
  GET_INSURANCE_COMPANY,
  getInsuranceCompanys
);

export const updateInsuranceCompany = createAsyncThunkForSlice(
  UPDATE_INSURANCE_COMPANY,
  updateInsuranceCompanys,
  {
    isToast: true,
  }
);

export const getInsurancePlan = createAsyncThunkForSlice(
  GET_INSURANCE_PLAN,
  getInsurancePlans
);

export const updateInsurancePlan = createAsyncThunkForSlice(
  UPDATE_INSURANCE_PLAN,
  updateInsurancePlans,
  {
    isToast: true,
  }
);

export const getPlanAllService = createAsyncThunkForSlice(
  GET_PLAN_ALL_SERVICE,
  getPlanAllServices
);

export const deleteMarketplaceAttachment = createAsyncThunkForSlice(
  DELETE_MARKETLPLACE_ATTACHMENT,
  deleteMarketplaceAttachments,
  {
    isToast: true,
  }
);

export const deleteInsuranceCompanyAttachment = createAsyncThunkForSlice(
  DELETE_INSURANCE_COMPANY_ATTACHMENT,
  deleteInsuranceCompanyAttachments,
  {
    isToast: true,
  }
);

export const deleteInsurancePlanAttachment = createAsyncThunkForSlice(
  DELETE_INSURANCE_PLAN_ATTACHMENT,
  deleteInsurancePlanAttachments,
  {
    isToast: true,
  }
);

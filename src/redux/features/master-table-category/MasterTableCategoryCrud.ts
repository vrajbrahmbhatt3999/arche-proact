import axios from "axios";
import { IAPIPayload } from "../../../interfaces/apiInterface";
import {
  ADD_CATEGORY,
  ADD_CATEGORY_VALUE,
  EDIT_CATEGORY,
  EDIT_CATEGORY_VALUE,
  GET_ALL_CATEGORY,
  GET_ALL_CATEGORY_VALUE,
  GET_CATEGORY_BY_ID,
  GET_CATEGORY_VALUE_BY_ID,
  UPDATE_STATUS_CATEGORY,
  UPDATE_STATUS_CATEGORY_VALUE,
} from "../../../config/config";

// master table category
export const getMasterCategory = (data: IAPIPayload) => {
  return axios.post(GET_ALL_CATEGORY, data);
};
export const getCategoryByID = (data: IAPIPayload) => {
  return axios.post(GET_CATEGORY_BY_ID, data);
};
export const addCategory = (data: IAPIPayload) => {
  return axios.post(ADD_CATEGORY, data);
};
export const editCategory = (data: IAPIPayload) => {
  return axios.post(EDIT_CATEGORY, data);
};
export const updateStatusCategory = (data: IAPIPayload) => {
  return axios.post(UPDATE_STATUS_CATEGORY, data);
};

// master table category value
export const getMasterCategoryValue = (data: IAPIPayload) => {
  return axios.post(GET_ALL_CATEGORY_VALUE, data);
};
export const getCategoryValueByID = (data: IAPIPayload) => {
  return axios.post(GET_CATEGORY_VALUE_BY_ID, data);
};
export const addCategoryValue = (data: IAPIPayload) => {
  return axios.post(ADD_CATEGORY_VALUE, data);
};
export const editCategoryValue = (data: IAPIPayload) => {
  return axios.post(EDIT_CATEGORY_VALUE, data);
};
export const updateStatusCategoryValue = (data: IAPIPayload) => {
  return axios.post(UPDATE_STATUS_CATEGORY_VALUE, data);
};

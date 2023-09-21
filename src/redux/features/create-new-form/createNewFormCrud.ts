import axios from "axios";
import {
  GET_ALL_MODULES_URL,
  GET_ALL_FORMS_URL,
  GET_FORM_BY_ID_URL,
  UPDATE_FORM_URL,
  ADD_NEW_FORM_URL,
  DELETE_FORM_URL,
  UPDATE_STATUS_BY_ID_FORM_URL
} from "../../../config/config";
import { IAPIPayload } from "../../../interfaces/apiInterface";

export const getAllForms = (data: IAPIPayload) => {
  return axios.post(GET_ALL_FORMS_URL, data);
};

export const getFormById = (data: IAPIPayload) => {
  return axios.post(GET_FORM_BY_ID_URL, data);
};

export const updateFormById = (data: IAPIPayload) => {
  return axios.post(UPDATE_FORM_URL, data);
};

export const addNewForm = (data: IAPIPayload) => {
  return axios.post(ADD_NEW_FORM_URL, data);
};

export const deleteFormById = (data: IAPIPayload) => {
  return axios.post(DELETE_FORM_URL, data);
};

export const updateStatusForFormById = (data: IAPIPayload) => {
  return axios.post(UPDATE_STATUS_BY_ID_FORM_URL, data);
};

/* API call for select list */
export const getAllModules = (data: IAPIPayload) => {
  return axios.post(GET_ALL_MODULES_URL, data);
};
/* API call for select list */
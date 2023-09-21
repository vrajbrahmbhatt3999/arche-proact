import axios from "axios";
import {
  ADD_DEPARTMENT,
  EDIT_DEPARTMENT,
  GET_ALL_DEPARTMENT,
  GET_DEPARTMENT_BY_ID,
  UPDATE_DEPARTMENT_STATUS,
} from "../../../config/config";
import { IAPIPayload } from "../../../interfaces/apiInterface";

export const getAllDepartmentList = (data: IAPIPayload) => {
  return axios.post(GET_ALL_DEPARTMENT, data);
};

export const addDepartments = (data: IAPIPayload) => {
  return axios.post(ADD_DEPARTMENT, data);
};

export const getDepartmentByIds = (data: IAPIPayload) => {
  return axios.post(GET_DEPARTMENT_BY_ID, data);
};

export const editDepartments = (data: IAPIPayload) => {
  return axios.post(EDIT_DEPARTMENT, data);
};

export const updateDepartmentStatuss = (data: IAPIPayload) => {
  return axios.post(UPDATE_DEPARTMENT_STATUS, data);
};

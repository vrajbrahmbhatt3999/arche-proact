import axios from "axios";
import {
  ADD_BRANCH,
  EDIT_BRANCH,
  GET_ALL_BRANCH,
  GET_BRANCH_BY_ID,
  GET_DEFAULT_BRANCH,
  UPDATE_BRANCH_STATUS,
  USER_LICENSE,
} from "../../../config/config";
import { IAPIPayload } from "../../../interfaces/apiInterface";

export const getAllBranchList = (data: IAPIPayload) => {
  return axios.post(GET_ALL_BRANCH, data);
};

export const addBranchs = (data: IAPIPayload) => {
  return axios.post(ADD_BRANCH, data);
};

export const getBranchByIds = (data: IAPIPayload) => {
  return axios.post(GET_BRANCH_BY_ID, data);
};

export const editBranchs = (data: IAPIPayload) => {
  return axios.post(EDIT_BRANCH, data);
};

export const updateBranchStatuss = (data: IAPIPayload) => {
  return axios.post(UPDATE_BRANCH_STATUS, data);
};

export const usersLicense = (data: IAPIPayload) => {
  return axios.post(USER_LICENSE, data);
};

export const getDefaultBranchs = (data: IAPIPayload) => {
  return axios.post(GET_DEFAULT_BRANCH, data);
};

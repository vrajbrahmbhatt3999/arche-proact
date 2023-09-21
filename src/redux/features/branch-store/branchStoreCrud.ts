import axios from "axios";
import { IAPIPayload } from "../../../interfaces/apiInterface";
import {
  GET_ALL_REQUEST_INVENTORY_DATA,
  BRANCH_STORE_ISSUE,
  GET_BRANCH_STORE_ISSUE_DATA,
  GET_BRANCH_STORE_MAIN_STORE_REQUEST_DATA,
  GET_MAIN_STORE_REQUEST_ITEMS_DATA,
  UPDATE_MAIN_STORE_REQUEST_ITEMS_DATA,
  DELETE_MAIN_STORE_REQUEST_ITEMS_DATA,
} from "../../../config/config";

export const getAllBranchStoreRequestData = (data: IAPIPayload) => {
  return axios.post(GET_ALL_REQUEST_INVENTORY_DATA, data);
};

export const branchStoreIssueData = (data: IAPIPayload) => {
  return axios.post(BRANCH_STORE_ISSUE, data);
};

export const getBranchStoreIssueData = (data: IAPIPayload) => {
  return axios.post(GET_BRANCH_STORE_ISSUE_DATA, data);
};

export const getBranchStoreMainStoreRequestData = (data: IAPIPayload) => {
  return axios.post(GET_BRANCH_STORE_MAIN_STORE_REQUEST_DATA, data);
};

export const getMainStoreRequestItemsData = (data: IAPIPayload) => {
  return axios.post(GET_MAIN_STORE_REQUEST_ITEMS_DATA, data);
};

export const updateMainStoreRequestItemsData = (data: IAPIPayload) => {
  return axios.post(UPDATE_MAIN_STORE_REQUEST_ITEMS_DATA, data);
};

export const deleteMainStoreRequestItemsData = (data: IAPIPayload) => {
  return axios.post(DELETE_MAIN_STORE_REQUEST_ITEMS_DATA, data);
};

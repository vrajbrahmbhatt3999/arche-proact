import axios from "axios";
import { IAPIPayload } from "../../../interfaces/apiInterface";
import {
  ADD_MASTER_VALUE,
  GET_ALL_MASTER_VALUE,
  MASTER_VALUE_UPDATE,
  STATUS_UPDATE,
} from "../../../config/config";

// add master value
export const addMasterValue = (data: IAPIPayload) => {
  return axios.post(ADD_MASTER_VALUE, data);
};

// get all master value
export const getallMasterValue = (data: IAPIPayload) => {
  return axios.post(GET_ALL_MASTER_VALUE, data);
};
// update status
export const updateStatus = (data: IAPIPayload) => {
  return axios.post(STATUS_UPDATE, data);
};

// update master value 
export const updateMasterValue = (data: IAPIPayload) => {
  return axios.post(MASTER_VALUE_UPDATE, data);
};

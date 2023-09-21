import axios from "axios";
import {
  ADD_BED,
  EDIT_BED,
  GET_ALL_BED,
  GET_BED_BY_ID,
  UPDATE_BED_STATUS,
} from "../../../config/config";
import { IAPIPayload } from "../../../interfaces/apiInterface";

export const getAllBedList = (data: IAPIPayload) => {
  return axios.post(GET_ALL_BED, data);
};

export const addBed = (data: IAPIPayload) => {
  return axios.post(ADD_BED, data);
};

export const getBedByIds = (data: IAPIPayload) => {
  return axios.post(GET_BED_BY_ID, data);
};

export const editBeds = (data: IAPIPayload) => {
  return axios.post(EDIT_BED, data);
};

export const updateBedStatuss = (data: IAPIPayload) => {
  return axios.post(UPDATE_BED_STATUS, data);
};

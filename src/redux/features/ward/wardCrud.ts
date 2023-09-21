import axios from "axios";
import {
  ADD_WARD,
  EDIT_WARD,
  GET_ALL_WARD,
  GET_WARD_BY_ID,
  UPDATE_WARD_STATUS,
} from "../../../config/config";
import { IAPIPayload } from "../../../interfaces/apiInterface";

export const getAllWardList = (data: IAPIPayload) => {
  return axios.post(GET_ALL_WARD, data);
};

export const addWard = (data: IAPIPayload) => {
  return axios.post(ADD_WARD, data);
};

export const getWardByIds = (data: IAPIPayload) => {
  return axios.post(GET_WARD_BY_ID, data);
};

export const editWards = (data: IAPIPayload) => {
  return axios.post(EDIT_WARD, data);
};

export const updateWardStatuss = (data: IAPIPayload) => {
  return axios.post(UPDATE_WARD_STATUS, data);
};


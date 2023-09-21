import axios from "axios";
import {
  ADD_SPECIALITIES,
  EDIT_SPECIALITIES,
  GET_ALL_SPECIALITIES,
  GET_SPECIALITIES_BY_ID,
  UPDATE_SPECIALITIES_STATUS,
} from "../../../config/config";
import { IAPIPayload } from "../../../interfaces/apiInterface";

export const getAllSpecialities = (data: IAPIPayload) => {
  return axios.post(GET_ALL_SPECIALITIES, data);
};

export const addSpecialities = (data: IAPIPayload) => {
  return axios.post(ADD_SPECIALITIES, data);
};

export const getSpecialitiesById = (data: IAPIPayload) => {
  return axios.post(GET_SPECIALITIES_BY_ID, data);
};

export const editSpecialities = (data: IAPIPayload) => {
  return axios.post(EDIT_SPECIALITIES, data);
};

export const updateSpecialitiesStatus = (data: IAPIPayload) => {
  return axios.post(UPDATE_SPECIALITIES_STATUS, data);
};

import axios from "axios";
import {
  CREATE_MEDICAL_CENTER_NEWS,
  GET_MEDICAL_CENTER_NEWS,
  CREATE_APPOINTMENT,
  UPDATE_APPOINTMENT,
  GET_ALL_APPOINTMENT,
  UPDATE_STATUS_APPOINTMENT,
} from "../../../config/config";
import { IAPIPayload } from "../../../interfaces/apiInterface";

export const getMedicalNews = (data: IAPIPayload) => {
  return axios.post(GET_MEDICAL_CENTER_NEWS, data);
};

export const createMedicalNews = (data: IAPIPayload) => {
  return axios.post(CREATE_MEDICAL_CENTER_NEWS, data);
};

export const getAppointments = (data: IAPIPayload) => {
  return axios.post(GET_ALL_APPOINTMENT, data);
}

export const addAppointment = (data: IAPIPayload) => {
  return axios.post(CREATE_APPOINTMENT, data);
};

export const editAppointmentById = (data: IAPIPayload) => {
  return axios.post(UPDATE_APPOINTMENT, data);
};

export const updateStatus = (data: IAPIPayload) => {
  return axios.post(UPDATE_STATUS_APPOINTMENT, data);
};


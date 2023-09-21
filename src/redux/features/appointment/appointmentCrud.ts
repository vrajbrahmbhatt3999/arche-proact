import axios from "axios";
import {
  GET_ALL_PATIENT_APPOINTMENT,
  GET_ALL_TODAY_PATIENT_APPOINTMENT,
  GET_APPOINTMENT_LOG,
  GET_APPOINTMENT_SUMMARY,
  GET_DEVICE_TOKEN_STORE,
  UPDATE_APPOINTMENT_STATUS,
} from "../../../config/config";
import { IAPIPayload } from "../../../interfaces/apiInterface";

export const getAllTodayPatients = (data: IAPIPayload) => {
  return axios.post(GET_ALL_TODAY_PATIENT_APPOINTMENT, data);
};

export const getAllPatientsAppointment = (data: IAPIPayload) => {
  return axios.post(GET_ALL_PATIENT_APPOINTMENT, data);
};

export const updateAppointmentsStatus = (data: IAPIPayload) => {
  return axios.post(UPDATE_APPOINTMENT_STATUS, data);
};

export const getAppointmentsLog = (data: IAPIPayload) => {
  return axios.post(GET_APPOINTMENT_LOG, data);
};

export const getAppointmentsSummary = (data: IAPIPayload) => {
  return axios.post(GET_APPOINTMENT_SUMMARY, data);
};

export const storeDeviceToken = (data: IAPIPayload) => {
  return axios.post(GET_DEVICE_TOKEN_STORE, data);
};

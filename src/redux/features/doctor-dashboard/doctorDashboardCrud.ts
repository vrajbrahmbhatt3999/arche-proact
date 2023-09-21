import axios from "axios";

import {
  GET_ALL_NOTIFICATION,
  GET_DOCTOR_APPOINTMENT_LIST,
} from "../../../config/config";
import { IAPIPayload } from "../../../interfaces/apiInterface";

export const getAllDoctorAppointments = (data: IAPIPayload) => {
  return axios.post(GET_DOCTOR_APPOINTMENT_LIST, data);
};

export const getAllTodoReminder = (data: IAPIPayload) => {
  return axios.post(GET_ALL_NOTIFICATION, data);
};

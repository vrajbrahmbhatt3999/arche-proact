import axios from "axios";

import {
  GET_ALL_NOTIFICATION,
  GET_DENTIST_APPOINTMENT_LIST,
} from "../../../config/config";
import { IAPIPayload } from "../../../interfaces/apiInterface";

export const getAllDentistAppointments = (data: IAPIPayload) => {
  return axios.post(GET_DENTIST_APPOINTMENT_LIST, data);
};

export const getAllTodoReminder = (data: IAPIPayload) => {
  return axios.post(GET_ALL_NOTIFICATION, data);
};


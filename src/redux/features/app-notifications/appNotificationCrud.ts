import axios from "axios";
import { IAPIPayload } from "../../../interfaces/apiInterface";
import {
  CREATE_NOTIFICATION,
  GET_ALL_NOTIFICATIONS,
  NOTIFICATION_MARKREAD,
} from "../../../config/config";

export const createNotification = (data: IAPIPayload) => {
  return axios.post(CREATE_NOTIFICATION, data);
};

export const getAllNotifications = (data: IAPIPayload) => {
  return axios.post(GET_ALL_NOTIFICATIONS, data);
};

export const getNotificationRead = (data: IAPIPayload) => {
  return axios.post(NOTIFICATION_MARKREAD, data);
};

import {
  CREATE_APP_NOTIFICATION,
  GET_ALL_NOTIFICATIONS_LIST,
  MARKREAD_APP_NOTIFICATION,
} from "../../../constants/asyncActionsType";
import createAsyncThunkForSlice from "../../../utils/utils";
import {
  createNotification,
  getAllNotifications,
  getNotificationRead,
} from "./appNotificationCrud";

export const getAllNotificationList = createAsyncThunkForSlice(
  GET_ALL_NOTIFICATIONS_LIST,
  getAllNotifications
);

export const createAppNotification = createAsyncThunkForSlice(
  CREATE_APP_NOTIFICATION,
  createNotification
);

export const markReadNotification = createAsyncThunkForSlice(
  MARKREAD_APP_NOTIFICATION,
  getNotificationRead
);

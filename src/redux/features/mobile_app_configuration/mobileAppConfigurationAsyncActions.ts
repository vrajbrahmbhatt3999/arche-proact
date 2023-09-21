import {
  GET_ALL_MEDICAL_CENTER_NEWS,
  CREATE_MEDICAL_CENTER_NEWS,
  CREATE_APPOINTMENT,
  EDIT_APPOINTMENT,
  GET_ALL_APPOINTMENT,
  UPDATE_STATUS_APPOINTMENT,
} from "../../../constants/asyncActionsType";
import createAsyncThunkForSlice from "../../../utils/utils";
import {
  getMedicalNews,
  createMedicalNews,
  addAppointment,
  editAppointmentById,
  getAppointments,
  updateStatus,
} from "./mobileAppConfigurationCrud";

export const getAllMedicalCenterNews = createAsyncThunkForSlice(
  GET_ALL_MEDICAL_CENTER_NEWS,
  getMedicalNews
);

export const createMedicalCenterNews = createAsyncThunkForSlice(
  CREATE_MEDICAL_CENTER_NEWS,
  createMedicalNews,
  { isToast: true }
);

export const getAllAppointment = createAsyncThunkForSlice(
  GET_ALL_APPOINTMENT,
  getAppointments
);

export const createAppointment = createAsyncThunkForSlice(
  CREATE_APPOINTMENT,
  addAppointment,
  { isToast: true }
);

export const editAppointment = createAsyncThunkForSlice(
  EDIT_APPOINTMENT,
  editAppointmentById,
  { isToast: true }
);

export const updateStatusAppointment = createAsyncThunkForSlice(
  UPDATE_STATUS_APPOINTMENT,
  updateStatus,
  { isToast: true }
);
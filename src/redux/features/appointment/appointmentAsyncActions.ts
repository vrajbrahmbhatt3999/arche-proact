import {
  GET_ALL_PATIENT_APPOINTMENT,
  GET_ALL_TODAY_PATIENT_APPOINTMENT,
  GET_APPOINTMENT_LOG,
  GET_APPOINTMENT_SUMMARY,
  GET_TOKEN_STORE,
  UPDATE_APPOINTMENT_STATUS,
} from "../../../constants/asyncActionsType";
import createAsyncThunkForSlice from "../../../utils/utils";
import {
  getAllPatientsAppointment,
  getAllTodayPatients,
  getAppointmentsLog,
  getAppointmentsSummary,
  storeDeviceToken,
  updateAppointmentsStatus,
} from "./appointmentCrud";

export const getAllTodayPatient = createAsyncThunkForSlice(
  GET_ALL_TODAY_PATIENT_APPOINTMENT,
  getAllTodayPatients
  // {
  //   isToast: true,
  // }
);

export const getAllPatientAppointment = createAsyncThunkForSlice(
  GET_ALL_PATIENT_APPOINTMENT,
  getAllPatientsAppointment
  // {
  //   isToast: true,
  // }
);

export const updateAppointmentStatus = createAsyncThunkForSlice(
  UPDATE_APPOINTMENT_STATUS,
  updateAppointmentsStatus,
  {
    isToast: true,
  }
);

export const getAppointmentLog = createAsyncThunkForSlice(
  GET_APPOINTMENT_LOG,
  getAppointmentsLog,
  {
    isToast: true,
  }
);

export const getAppointmentSummary = createAsyncThunkForSlice(
  GET_APPOINTMENT_SUMMARY,
  getAppointmentsSummary,
  {
    isToast: true,
  }
);

export const getDeviceTokenStore = createAsyncThunkForSlice(
  GET_TOKEN_STORE,
  storeDeviceToken
  // {
  //   isToast: true,
  // }
);

import {
  GET_ALL_DOCTOR_APPOINTMENT_LIST,
  GET_ALL_TODO_REMINDER_LIST,
} from "../../../constants/asyncActionsType";
import createAsyncThunkForSlice from "../../../utils/utils";
import {
  getAllDoctorAppointments,
  getAllTodoReminder,
} from "./doctorDashboardCrud";

export const getAllDoctorAppointmentLists = createAsyncThunkForSlice(
  GET_ALL_DOCTOR_APPOINTMENT_LIST,
  getAllDoctorAppointments
);


export const getAllTodoReminderLists = createAsyncThunkForSlice(
  GET_ALL_TODO_REMINDER_LIST,
  getAllTodoReminder,
  {
    isToast: true,
  }
);

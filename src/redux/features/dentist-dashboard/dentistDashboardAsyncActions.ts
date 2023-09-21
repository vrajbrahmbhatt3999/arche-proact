import {
  GET_ALL_DENTIST_APPOINTMENT_LIST,
  GET_ALL_TODO_REMINDER_LIST,
} from "../../../constants/asyncActionsType";
import createAsyncThunkForSlice from "../../../utils/utils";
import {
  getAllDentistAppointments,
  getAllTodoReminder,
} from "./dentistDashboardCrud";

export const getAllDentistAppointmentLists = createAsyncThunkForSlice(
  GET_ALL_DENTIST_APPOINTMENT_LIST,
  getAllDentistAppointments
);


export const getAllTodoReminderLists = createAsyncThunkForSlice(
  GET_ALL_TODO_REMINDER_LIST,
  getAllTodoReminder,
  {
    isToast: true,
  }
);

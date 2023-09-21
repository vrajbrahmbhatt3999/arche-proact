import {
  GET_ALL_DOCTORS_APPOINTMENT_TYPE,
  GET_ALL_DOCTORS_TYPE,
  GET_AVAILABLE_SLOTS_TYPE,
  BOOKING_CONFIRMATION_TYPE,
  GET_RECURRING_AVAILABLE_SLOTS_TYPE,
} from '../../../constants/asyncActionsType'
import createAsyncThunkForSlice from '../../../utils/utils'
import {
  getAllDoctorsList,
  getAllDoctorAppointmentsList,
  getAllAvailableSlotsDoctor,
  addBookingConfirmation,
  getAllAvailableRecurringSlotsDoctor,
} from './bookingAppointmentsCrud'

// get all doctors
export const getAllDoctors = createAsyncThunkForSlice(
  GET_ALL_DOCTORS_TYPE,
  getAllDoctorsList
)

// get all appointments of doctor's

export const getAllDoctorAppointments = createAsyncThunkForSlice(
  GET_ALL_DOCTORS_APPOINTMENT_TYPE,
  getAllDoctorAppointmentsList
)

// get available slots of doctors
export const getAvailableSlots = createAsyncThunkForSlice(
  GET_AVAILABLE_SLOTS_TYPE,
  getAllAvailableSlotsDoctor
)

// get recurring available slots
export const getRecurringAvailableSlots = createAsyncThunkForSlice(
  GET_RECURRING_AVAILABLE_SLOTS_TYPE,
  getAllAvailableRecurringSlotsDoctor
)

// add booking confirmation
export const bookingConfirmation = createAsyncThunkForSlice(
  BOOKING_CONFIRMATION_TYPE,
  addBookingConfirmation,
  {
    isToast: true,
  }
)

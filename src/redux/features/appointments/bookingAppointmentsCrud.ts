import axios from 'axios'
import { IAPIPayload } from '../../../interfaces/apiInterface'
import {
  GET_ALL_DOCTERS_URL,
  GET_ALL_DOCTERS_APPOINTMENTS_URL,
  GET_ALL_AVAILABLE_SLOTS_URL,
  BOOKING_CONFIRMATION_URL,
  GET_ALL_RECURRING_AVAILABLE_SLOTS_URL,
} from '../../../config/config'

export const getAllDoctorsList = (data: IAPIPayload) => {
  return axios.post(GET_ALL_DOCTERS_URL, data)
}

export const getAllDoctorAppointmentsList = (data: IAPIPayload) => {
  return axios.post(GET_ALL_DOCTERS_APPOINTMENTS_URL, data)
}

export const getAllAvailableSlotsDoctor = (data: IAPIPayload) => {
  return axios.post(GET_ALL_AVAILABLE_SLOTS_URL, data)
}

export const getAllAvailableRecurringSlotsDoctor = (data: IAPIPayload) => {
  return axios.post(GET_ALL_RECURRING_AVAILABLE_SLOTS_URL, data)
}

export const addBookingConfirmation = (data: IAPIPayload) => {
  return axios.post(BOOKING_CONFIRMATION_URL, data)
}

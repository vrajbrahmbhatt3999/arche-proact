import axios from 'axios'
import {
  GET_ALL_MOBILE_APPOINTMENT_REQUEST,
  CHANGE_MOBILE_APPOINTMENT_STATUS,
  CANCEL_APPOINTMENT_URL,
  GET_ALL_MOBILE_APPOINTMENT_REQUEST_CALANDER_URL,
} from '../../../config/config'
import { IAPIPayload } from '../../../interfaces/apiInterface'

// from button
export const getAllMobileAppointmentRequest = (data: IAPIPayload) => {
  return axios.post(GET_ALL_MOBILE_APPOINTMENT_REQUEST, data)
}

//from calander
export const getAllMobileAppointmentRequestCalnder = (data: IAPIPayload) => {
  return axios.post(GET_ALL_MOBILE_APPOINTMENT_REQUEST_CALANDER_URL, data)
}

export const updateMobileAppointmentStatus = (data: IAPIPayload) => {
  return axios.post(CHANGE_MOBILE_APPOINTMENT_STATUS, data)
}

export const cancelAppointmentStatusRequest = (data: IAPIPayload) => {
  return axios.post(CANCEL_APPOINTMENT_URL, data)
}

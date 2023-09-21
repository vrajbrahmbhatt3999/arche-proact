import {
  GET_ALL_MOBILE_APPOINTMENT_REQUEST,
  CHANGE_MOBILE_APPOINTMENT_STATUS,
  CANCEL_APPOINTMENT,
  GET_ALL_MOBILE_APPOINTMENT_REQUEST_CAlANDER,
} from '../../../constants/asyncActionsType'
import createAsyncThunkForSlice from '../../../utils/utils'
import {
  getAllMobileAppointmentRequest,
  updateMobileAppointmentStatus,
  cancelAppointmentStatusRequest,
  getAllMobileAppointmentRequestCalnder,
} from './mobileAppointmentRequestCrud'

// mobile appt from button
export const getAllMobileAppointment = createAsyncThunkForSlice(
  GET_ALL_MOBILE_APPOINTMENT_REQUEST,
  getAllMobileAppointmentRequest
)

// mobile appt from calander
export const getAllMobileAppointmentCalander = createAsyncThunkForSlice(
  GET_ALL_MOBILE_APPOINTMENT_REQUEST_CAlANDER,
  getAllMobileAppointmentRequestCalnder
)

export const changeMobileAppointmentStatus = createAsyncThunkForSlice(
  CHANGE_MOBILE_APPOINTMENT_STATUS,
  updateMobileAppointmentStatus
)

export const cancelAppointmentStatus = createAsyncThunkForSlice(
  CANCEL_APPOINTMENT,
  cancelAppointmentStatusRequest,
  {
    isToast: true,
  }
)

import axios from 'axios'
import {
  FORGOT_PASSWORD_URL,
  GET_MASTER_VALUE_URL,
  GET_SIDEBAR_URL,
  LOGIN_URL,
  LOGOUT_URL,
  RESEND_OTP_URL,
  RESET_PASSWORD_URL,
  VARIFY_OTP_URL,
} from '../../../config/config'
import { IAPIPayload } from '../../../interfaces/apiInterface'

export const login = (data: IAPIPayload) => {
  return axios.post(LOGIN_URL, data)
}

export const forgotPassword = (data: IAPIPayload) => {
  return axios.post(FORGOT_PASSWORD_URL, data)
}

export const varifyOTP = (data: IAPIPayload) => {
  return axios.post(VARIFY_OTP_URL, data)
}

export const resetPassword = (data: IAPIPayload) => {
  return axios.post(RESET_PASSWORD_URL, data)
}

export const resendOtp = (data: IAPIPayload) => {
  return axios.post(RESEND_OTP_URL, data)
}

export const logout = (data: IAPIPayload) => {
  return axios.post(LOGOUT_URL, data)
}

export const getMasterValueData = (data: IAPIPayload) => {
  return axios.post(GET_MASTER_VALUE_URL, data)
}

export const getsidebar = (data: IAPIPayload) => {
  return axios.post(GET_SIDEBAR_URL, data)
}

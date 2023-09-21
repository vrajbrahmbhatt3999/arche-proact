import createAsyncThunkForSlice from '../../../utils/utils'
import {
  forgotPassword,
  getMasterValueData,
  getsidebar,
  login,
  logout,
  resendOtp,
  resetPassword,
  varifyOTP,
} from './loginCrud'
import {
  GET_SIDEBAR_TYPE,
  MASTER_VALUR_DATA_TYPE,
  RESEND_OTP_TYPE,
  RESET_PASSWORD_TYPE,
  USER_FORGOT_PASSWORD_TYPE,
  USER_LOGIN_TYPE,
  USER_LOGOUT_TYPE,
  VERIFY_OTP_TYPE,
} from '../../../constants/asyncActionsType'

export const userLogin = createAsyncThunkForSlice(USER_LOGIN_TYPE, login, {
  isToast: true,
})

export const userForgotpassword = createAsyncThunkForSlice(
  USER_FORGOT_PASSWORD_TYPE,
  forgotPassword,
  {
    isToast: true,
  }
)

export const userVerifyOtp = createAsyncThunkForSlice(
  VERIFY_OTP_TYPE,
  varifyOTP,
  {
    isToast: true,
  }
)

export const userResetPassword = createAsyncThunkForSlice(
  RESET_PASSWORD_TYPE,
  resetPassword,
  {
    isToast: true,
  }
)

export const userResendOtp = createAsyncThunkForSlice(
  RESEND_OTP_TYPE,
  resendOtp,
  {
    isToast: true,
  }
)

export const userLogout = createAsyncThunkForSlice(USER_LOGOUT_TYPE, logout, {
  isToast: true,
})

export const getAllMasterValueData = createAsyncThunkForSlice(
  MASTER_VALUR_DATA_TYPE,
  getMasterValueData
)

export const getSideBarData = createAsyncThunkForSlice(
  GET_SIDEBAR_TYPE,
  getsidebar
)

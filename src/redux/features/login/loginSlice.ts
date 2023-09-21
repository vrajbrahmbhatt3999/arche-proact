import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ILoginState } from '../../../interfaces/apiInterface'
import {
  getAllMasterValueData,
  getSideBarData,
  userForgotpassword,
  userLogin,
  userLogout,
  userResendOtp,
  userResetPassword,
  userVerifyOtp,
} from './loginAsynActions'
import { getPatientBranchList } from '../../../redux/features/patient-emr/patient/patientAsyncAction'
import { createFirebaseToken } from '../../../config/firebase/firebaseRequestToken'
import { colorSchemeData } from '../../../constants/data'

export const initialState: ILoginState = {
  loading: false,
  userData: {},
  encryptionKey: '',
  isLoggedin: false,
  otpRequestId: '',
  isOtpVerified: false,
  resetPWDToken: '',
  otpAttempt: 0,
  branchData: [],
  firebaseToken: '',
  error: null,
  masterValueData: [],
  colorSchemeList: [],
  activeRole: {},
  sidebarData: [],
}

export const fetchFirebaseToken = createAsyncThunk(
  'login/createFirebaseToken',
  async () => {
    const firebaseToken = await createFirebaseToken()
    return firebaseToken
  }
)

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setEncryptionKey: (state, action) => {
      state.encryptionKey = action.payload
    },
    setOtpAttempts: (state, action) => {
      state.otpAttempt = action.payload
    },
    setActiveRole: (state, action) => {
      console.log('payload', action.payload)
      state.activeRole = action.payload
    },
    clearLoginState: (state) => {
      state.loading = false
      state.userData = {}
      state.encryptionKey = ''
      state.isLoggedin = false
      state.otpRequestId = ''
      state.isOtpVerified = false
      state.resetPWDToken = ''
      state.otpAttempt = 0
      state.branchData = []
      state.firebaseToken = ''
      state.error = null
      state.masterValueData = []
      state.colorSchemeList = []
      state.activeRole = {}
      state.sidebarData = []
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch the fireBase token
      .addCase(fetchFirebaseToken.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchFirebaseToken.fulfilled, (state, action) => {
        state.loading = false
        state.firebaseToken = action.payload
        console.log('firebaseToken redux', action.payload)
        state.isLoggedin = true
      })
      .addCase(fetchFirebaseToken.rejected, (state, action) => {
        state.loading = false
        state.firebaseToken = ''
        state.isLoggedin = false
      })

      // login
      .addCase(userLogin.pending, (state) => {
        state.loading = true
        state.userData = {}
        state.isLoggedin = false
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false
        state.userData = action.payload
        state.isLoggedin = true
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false
        state.userData = {}
        state.isLoggedin = false
      })

      .addCase(userForgotpassword.pending, (state) => {
        state.loading = true
        state.userData = {}
        state.otpRequestId = ''
        state.isLoggedin = false
      })
      .addCase(userForgotpassword.fulfilled, (state, action) => {
        state.loading = false
        state.userData = {}
        state.otpRequestId = action.payload
        state.isLoggedin = false
      })
      .addCase(userForgotpassword.rejected, (state, action) => {
        state.loading = false
        state.userData = {}
        state.otpRequestId = ''
        state.isLoggedin = false
      })
      .addCase(userVerifyOtp.pending, (state) => {
        state.loading = true
        state.userData = {}
        state.isOtpVerified = false
        state.isLoggedin = false
      })
      .addCase(userVerifyOtp.fulfilled, (state, action) => {
        state.loading = false
        state.userData = {}
        state.isOtpVerified = true
        state.resetPWDToken = action.payload.token
        state.isLoggedin = false
        state.otpAttempt = 0
      })
      .addCase(userVerifyOtp.rejected, (state, action) => {
        state.loading = false
        state.userData = {}
        state.isOtpVerified = false
        state.isLoggedin = false
        state.otpAttempt = state.otpAttempt + 1
      })
      .addCase(userResendOtp.pending, (state) => {
        state.loading = true
        state.userData = {}
        state.otpRequestId = ''
        state.isLoggedin = false
      })
      .addCase(userResendOtp.fulfilled, (state, action) => {
        state.loading = false
        state.userData = {}
        state.otpRequestId = action.payload
        state.isLoggedin = false
        state.otpAttempt = 0
      })
      .addCase(userResendOtp.rejected, (state, action) => {
        state.loading = false
        state.userData = {}
        state.otpRequestId = ''
        state.isLoggedin = false
      })
      .addCase(userResetPassword.pending, (state) => {
        state.loading = true
        state.userData = {}
        state.isLoggedin = false
      })
      .addCase(userResetPassword.fulfilled, (state, action) => {
        state.loading = false
        state.userData = {}
        state.isLoggedin = false
      })
      .addCase(userResetPassword.rejected, (state, action) => {
        state.loading = false
        state.userData = {}
        state.isLoggedin = false
      })
      .addCase(userLogout.pending, (state) => {
        state.loading = true
        state.userData = {}
        state.isLoggedin = false
      })
      .addCase(userLogout.fulfilled, (state, action) => {
        localStorage.clear()
        state.loading = false
        state.userData = {}
        state.encryptionKey = ''
        state.branchData = []
        state.firebaseToken = ''
        state.masterValueData = []
        state.isLoggedin = false
        state.activeRole = {}
        state.sidebarData = []
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.loading = false
        state.userData = {}
        state.isLoggedin = false
      })
      .addCase(getPatientBranchList.pending, (state) => {
        state.loading = true
      })
      .addCase(getPatientBranchList.fulfilled, (state, action) => {
        state.loading = false
        state.branchData = action.payload
        // console.log(">>>>>>>>>>", action.payload?.branches);
      })
      .addCase(getPatientBranchList.rejected, (state, error) => {
        state.loading = false
        state.error = error
      })
      .addCase(getAllMasterValueData.pending, (state) => {
        state.masterValueData = []
      })
      .addCase(getAllMasterValueData.fulfilled, (state, action) => {
        state.masterValueData = action.payload || []
        state.colorSchemeList =
          action.payload && action.payload?.length > 0
            ? action.payload
                .find(
                  (item: any) => item.category_name === 'APPOINTMENT_STATUS'
                )
                ?.values?.map((item: any) => ({
                  title: item?.value,
                  label: item?.metadata?.label,
                  colorCode: item?.metadata?.color_code,
                }))
            : colorSchemeData
      })
      .addCase(getAllMasterValueData.rejected, (state, error) => {
        state.masterValueData = []
      })
      .addCase(getSideBarData.pending, (state) => {
        state.loading = true
      })
      .addCase(getSideBarData.fulfilled, (state, action) => {
        state.loading = false
        state.sidebarData = action.payload
      })
      .addCase(getSideBarData.rejected, (state, error) => {
        state.loading = false
      })
  },
})

export const {
  setEncryptionKey,
  setOtpAttempts,
  clearLoginState,
  setActiveRole,
} = loginSlice.actions

export default loginSlice.reducer

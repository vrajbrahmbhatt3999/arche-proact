import { createSlice } from '@reduxjs/toolkit'
import {
  getAllMobileAppointment,
  changeMobileAppointmentStatus,
  cancelAppointmentStatus,
  getAllMobileAppointmentCalander,
} from './mobileAppointmentRequestAsyncActions'
import { IMobileAppointmentRequest } from '../../../interfaces/apiInterface'

export const initialState: IMobileAppointmentRequest = {
  isLoading: false,
  mobileAppointmentReqeustData: [],
  singleMobileAppointmentRequestData: {},
  getAllMobileAppointPayloadData: {},
  branch_id: '',
  error: null,
}

export const mobileAppointmentRequestSlice = createSlice({
  name: 'mobileappointmentrequest',
  initialState,
  reducers: {
    clearState: (state) => {
      state.isLoading = false
      state.error = ''
      state.mobileAppointmentReqeustData = []
      state.singleMobileAppointmentRequestData = {}
      state.getAllMobileAppointPayloadData = {}
    },
    setSingleMobileAppointmentRequestData: (state, action) => {
      state.singleMobileAppointmentRequestData = action.payload
    },
    setAllMobileAppointmentPayloadData: (state, action) => {
      state.getAllMobileAppointPayloadData = action.payload
    },
    setBranchId: (state, action) => {
      state.branch_id = action.payload
    },
  },
  extraReducers: (builder) => {
    // get all mobile appointment request
    builder
      .addCase(getAllMobileAppointment.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllMobileAppointment.fulfilled, (state, action) => {
        state.isLoading = false
        state.mobileAppointmentReqeustData = action.payload.data
      })
      .addCase(getAllMobileAppointment.rejected, (state, error) => {
        state.isLoading = false
        state.error = error
      })
    // get all pending mobile appointment request from calander
    builder
      .addCase(getAllMobileAppointmentCalander.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllMobileAppointmentCalander.fulfilled, (state, action) => {
        state.isLoading = false
        state.mobileAppointmentReqeustData = action.payload.data
      })
      .addCase(getAllMobileAppointmentCalander.rejected, (state, error) => {
        state.isLoading = false
        state.error = error
      })
    // change mobile appointment request
    builder
      .addCase(changeMobileAppointmentStatus.pending, (state) => {
        state.isLoading = true
      })
      .addCase(changeMobileAppointmentStatus.fulfilled, (state, action) => {
        state.isLoading = false
      })
      .addCase(changeMobileAppointmentStatus.rejected, (state, error) => {
        state.isLoading = false
        state.error = error
      })
    // cancel appointment status
    builder
      .addCase(cancelAppointmentStatus.pending, (state) => {
        state.isLoading = true
      })
      .addCase(cancelAppointmentStatus.fulfilled, (state, action) => {
        state.isLoading = false
      })
      .addCase(cancelAppointmentStatus.rejected, (state, error) => {
        state.isLoading = false
        state.error = error
      })
  },
})

export const {
  clearState,
  setSingleMobileAppointmentRequestData,
  setAllMobileAppointmentPayloadData,
  setBranchId,
} = mobileAppointmentRequestSlice.actions
export default mobileAppointmentRequestSlice.reducer

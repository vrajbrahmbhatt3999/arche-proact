import { createSlice } from '@reduxjs/toolkit'
import {
  createMedicalCenterNews,
  getAllMedicalCenterNews,
  createAppointment,
  editAppointment,
  getAllAppointment,
  updateStatusAppointment,
} from './mobileAppConfigurationAsyncActions'
import { IMobileAppConfigSlice } from '../../../interfaces/apiInterface'

export const initialState: IMobileAppConfigSlice = {
  isLoading: false,
  medicalCenterNewsData: [],
  allAppointmentsData: [],
  getAllAppointPaylod: {},
  error: null,
}

export const mobileAppConfigSlice = createSlice({
  name: 'mobileAppConfigSlice',
  initialState,
  reducers: {
    clearState: (state) => {
      state.isLoading = false
      state.error = ''
      state.medicalCenterNewsData = []
      state.allAppointmentsData = []
      state.getAllAppointPaylod = {}
    },
    getAllAppoinmentPayloadData: (state, action) => {
      state.getAllAppointPaylod = action.payload
    },
  },
  extraReducers: (builder) => {
    // get all medical center news
    builder
      .addCase(getAllMedicalCenterNews.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllMedicalCenterNews.fulfilled, (state, action) => {
        state.isLoading = false
        state.medicalCenterNewsData = action.payload.data
      })
      .addCase(getAllMedicalCenterNews.rejected, (state, error) => {
        state.isLoading = false
        state.error = error
      })

    // create medical center news
    builder
      .addCase(createMedicalCenterNews.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createMedicalCenterNews.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(createMedicalCenterNews.rejected, (state, error) => {
        state.isLoading = false
        state.error = error
      })

    // get all appointments
    builder
      .addCase(getAllAppointment.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllAppointment.fulfilled, (state, action) => {
        state.isLoading = false
        state.allAppointmentsData = action.payload?.data
      })
      .addCase(getAllAppointment.rejected, (state, error) => {
        state.isLoading = false
        state.error = error
      })

    // create appointment
    builder
      .addCase(createAppointment.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createAppointment.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(createAppointment.rejected, (state, error) => {
        state.isLoading = false
        state.error = error
      })

    // edit appointment
    builder
      .addCase(editAppointment.pending, (state) => {
        state.isLoading = true
      })
      .addCase(editAppointment.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(editAppointment.rejected, (state, error) => {
        state.isLoading = false
        state.error = error
      })

    // Update Status Appointment
    builder
      .addCase(updateStatusAppointment.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateStatusAppointment.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(updateStatusAppointment.rejected, (state, error) => {
        state.isLoading = false
        state.error = error
      })
  },
})

export const { clearState, getAllAppoinmentPayloadData } =
  mobileAppConfigSlice.actions
export default mobileAppConfigSlice.reducer

import { createSlice } from '@reduxjs/toolkit'
import { IAppointment } from '../../../interfaces/apiInterface'
import {
  getAllPatientAppointment,
  getAllTodayPatient,
  getAppointmentLog,
  getAppointmentSummary,
  updateAppointmentStatus,
} from './appointmentAsyncActions'

export const initialState: IAppointment = {
  isLoading: false,
  stsUpdt: false,
  todayAppointmentData: [],
  todayAppointmentInfo: {},
  todayAppointmentDoctorData: [],
  appointmentData: [],
  appointmentInfo: {},
  appointmentLog: [],
  actionLog: [],
  appointmentSummary: [],
  shareQuestionnaireInfo: {},
  otpInfo: {},
  error: null,
}

export const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET ALL TODAY'S  APPOINTMENT DATA

    builder.addCase(getAllTodayPatient.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getAllTodayPatient.fulfilled, (state, action) => {
      state.isLoading = false
      // console.log('action.payload>>>>>>', action.payload)
      state.todayAppointmentData = action.payload?.todaysAppointments?.data
      state.todayAppointmentDoctorData = action.payload?.filteredDoctors
      state.todayAppointmentInfo = action.payload?.todaysAppointments
    })
    builder.addCase(getAllTodayPatient.rejected, (state, error) => {
      state.isLoading = false
      state.todayAppointmentData = []
      state.todayAppointmentDoctorData = []
      state.error = error
    })

    // GET ALL  PATIENT APPOINTMENT DATA

    builder.addCase(getAllPatientAppointment.pending, (state) => {
      state.isLoading = true
      state.appointmentData = []
      state.appointmentInfo = {}
    })
    builder.addCase(getAllPatientAppointment.fulfilled, (state, action) => {
      state.isLoading = false
      state.appointmentData = action.payload?.data
      state.appointmentInfo = action.payload
    })
    builder.addCase(getAllPatientAppointment.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })

    // UPDATE APPOINTMENT STATUS

    builder.addCase(updateAppointmentStatus.pending, (state) => {
      state.isLoading = true
      state.stsUpdt = true
    })
    builder.addCase(updateAppointmentStatus.fulfilled, (state) => {
      state.isLoading = false
      state.stsUpdt = false
    })
    builder.addCase(updateAppointmentStatus.rejected, (state, error) => {
      state.isLoading = false
      state.stsUpdt = false
      state.error = error
    })

    // GET APPOINTMENT AND ACTION LOG

    builder.addCase(getAppointmentLog.pending, (state) => {
      state.isLoading = true
      state.appointmentLog = []
      state.actionLog = []
    })
    builder.addCase(getAppointmentLog.fulfilled, (state, action) => {
      state.isLoading = false
      state.appointmentLog = action.payload?.apntLog
      state.actionLog = action.payload?.actionLog
    })
    builder.addCase(getAppointmentLog.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })

    // GET APPOINTMENT SUMMARY

    builder.addCase(getAppointmentSummary.pending, (state) => {
      state.isLoading = true
      state.appointmentSummary = []
    })
    builder.addCase(getAppointmentSummary.fulfilled, (state, action) => {
      state.isLoading = false
      // console.log("appointmentSummary", action.payload);
      state.appointmentSummary = action.payload
    })
    builder.addCase(getAppointmentSummary.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })
  },
})

export default appointmentSlice.reducer

import { createSlice } from '@reduxjs/toolkit'
import { IDoctorDashboard } from '../../../interfaces/apiInterface'
import {
  getAllDoctorAppointmentLists,
  getAllTodoReminderLists,
} from './doctorDashboardAsyncActions'

export const initialState: IDoctorDashboard = {
  isLoading: false,
  doctorAppointmentList: [],
  doctorListDataObject: {},
  error: null,
}

export const doctorDashboardSlice = createSlice({
  name: 'doctorDashboard',
  initialState,
  reducers: {
    // clearPatientData: (state) => {
    //   state.patientDataObjectById = {};
    // },
  },

  extraReducers: (builder) => {
    // doctor dashboard all appointment
    builder.addCase(getAllDoctorAppointmentLists.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getAllDoctorAppointmentLists.fulfilled, (state, action) => {
      state.isLoading = false
      state.doctorAppointmentList = action.payload?.data
      state.doctorListDataObject = action.payload
    })
    builder.addCase(getAllDoctorAppointmentLists.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })

    // todo reminder list
    builder.addCase(getAllTodoReminderLists.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getAllTodoReminderLists.fulfilled, (state, action) => {
      state.isLoading = false
    })
    builder.addCase(getAllTodoReminderLists.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })
  },
})

export default doctorDashboardSlice.reducer

import { createSlice } from '@reduxjs/toolkit'
import { IDentistDashboard } from '../../../interfaces/apiInterface'
import {
  getAllDentistAppointmentLists,
  getAllTodoReminderLists,
} from './dentistDashboardAsyncActions'

export const initialState: IDentistDashboard = {
  isLoading: false,
  dentistAppointmentList: [],
  dentistListDataObject: {},
  error: null,
}

export const dentistDashboardSlice = createSlice({
  name: 'dentistDashboard',
  initialState,
  reducers: {
    // clearPatientData: (state) => {
    //   state.patientDataObjectById = {};
    // },
  },

  extraReducers: (builder) => {
    // dentist dashboard all appointment
    builder.addCase(getAllDentistAppointmentLists.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(
      getAllDentistAppointmentLists.fulfilled,
      (state, action) => {
        state.isLoading = false
        state.dentistAppointmentList = action.payload?.data
        state.dentistListDataObject = action.payload
      }
    )
    builder.addCase(getAllDentistAppointmentLists.rejected, (state, error) => {
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

export default dentistDashboardSlice.reducer

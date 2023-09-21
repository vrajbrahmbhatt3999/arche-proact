import { createSlice } from '@reduxjs/toolkit'
import { getAllPatientActivityLog } from './patientActivityLogAsyncActions'
import { IPatientActivityLoglice } from '../../../interfaces/apiInterface'

export const initialState: IPatientActivityLoglice = {
  isLoading: false,
  patientActivityLogData: [],
  error: null,
}

export const patientActivityLogSlice = createSlice({
  name: 'getAllPatientActivityLog',
  initialState,
  reducers: {
    clearState: (state) => {
      state.isLoading = false
      state.error = ''
      state.patientActivityLogData = []
    },
  },
  extraReducers: (builder) => {
    // get all patient activity log
    builder
      .addCase(getAllPatientActivityLog.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllPatientActivityLog.fulfilled, (state, action) => {
        state.isLoading = false
        state.patientActivityLogData = action.payload.data
      })
      .addCase(getAllPatientActivityLog.rejected, (state, error) => {
        state.isLoading = false
        state.error = error
      })
  },
})

export const { clearState } = patientActivityLogSlice.actions
export default patientActivityLogSlice.reducer

import { createSlice } from '@reduxjs/toolkit'
import { IRadiologyRequest } from '../../../interfaces/apiInterface'
import {
  getAllRadiologyRequestsList,
  changeRadiologyRequestsStatus,
} from './radiologyRequestAsyncActions'

export const initialState: IRadiologyRequest = {
  isLoading: false,
  radiologyRequestData: [],
  getAllRadiologyRequestPayload: [],
}

export const radiologyRequestSlice = createSlice({
  name: 'radiology-request',
  initialState,
  reducers: {
    clearRadiologyRequestData: (state) => {
      state.isLoading = false
      state.radiologyRequestData = []
    },
    getAllRadiologyRequestPayloadData: (state, action) => {
      state.getAllRadiologyRequestPayload = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // get all radiology request data
      .addCase(getAllRadiologyRequestsList.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllRadiologyRequestsList.fulfilled, (state, action) => {
        state.isLoading = false
        state.radiologyRequestData = action.payload.data
      })
      .addCase(getAllRadiologyRequestsList.rejected, (state, error) => {
        state.isLoading = false
      })
      // change radiology request status
      .addCase(changeRadiologyRequestsStatus.pending, (state) => {
        state.isLoading = true
      })
      .addCase(changeRadiologyRequestsStatus.fulfilled, (state, action) => {
        state.isLoading = false
      })
      .addCase(changeRadiologyRequestsStatus.rejected, (state, error) => {
        state.isLoading = false
      })
  },
})

export const { clearRadiologyRequestData, getAllRadiologyRequestPayloadData } =
  radiologyRequestSlice.actions
export default radiologyRequestSlice.reducer

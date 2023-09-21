import { createSlice } from '@reduxjs/toolkit'
import { ILabRequest } from '../../../interfaces/apiInterface'
import {
  getAllLabRequestsList,
  changeLabRequestsStatus,
} from './labRequestAsyncActions'

export const initialState: ILabRequest = {
  isLoading: false,
  labRequestData: [],
  getAllLabRequestPayload: [],
}

export const labRequestSlice = createSlice({
  name: 'lab-request',
  initialState,
  reducers: {
    clearLabRequestData: (state) => {
      state.isLoading = false
      state.labRequestData = []
    },
    getAllLabRequestPayloadData: (state, action) => {
      state.getAllLabRequestPayload = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // get all lab request data
      .addCase(getAllLabRequestsList.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllLabRequestsList.fulfilled, (state, action) => {
        state.isLoading = false
        state.labRequestData = action.payload.data
      })
      .addCase(getAllLabRequestsList.rejected, (state, error) => {
        state.isLoading = false
      })
      // change lab request status
      .addCase(changeLabRequestsStatus.pending, (state) => {
        state.isLoading = true
      })
      .addCase(changeLabRequestsStatus.fulfilled, (state, action) => {
        state.isLoading = false
      })
      .addCase(changeLabRequestsStatus.rejected, (state, error) => {
        state.isLoading = false
      })
  },
})

export const { clearLabRequestData, getAllLabRequestPayloadData } =
  labRequestSlice.actions
export default labRequestSlice.reducer

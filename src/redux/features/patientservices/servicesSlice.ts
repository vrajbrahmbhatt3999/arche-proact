import { createSlice } from '@reduxjs/toolkit'
import { IServices } from '../../../interfaces/apiInterface'
import {
  AddServiceAction,
  GetAllServicesAsyncData,
  StatusUpdateServiceAction,
  UpdateServiceAction,
} from './servicesAsyncActions'
import { error } from 'console'

export const initialState: IServices = {
  isLoading: false,
  allServiceData: [],
  addService: [],
  updateService: [],
  updateStatus: [],
  error: '',
  isStatusValueUpdated: false,
}
export const createServicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(GetAllServicesAsyncData.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(GetAllServicesAsyncData.fulfilled, (state, action) => {
      state.isLoading = false
      state.allServiceData = action.payload?.data
    })
    builder.addCase(GetAllServicesAsyncData.rejected, (state, error) => {
      state.isLoading = false
      state.allServiceData = []
    })

    builder.addCase(AddServiceAction.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(AddServiceAction.fulfilled, (state, action) => {
      state.isLoading = false
      state.addService = action.payload?.data
    })
    builder.addCase(AddServiceAction.rejected, (state, error) => {
      state.isLoading = false
      state.addService = []
    })

    builder.addCase(UpdateServiceAction.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(UpdateServiceAction.fulfilled, (state, action) => {
      state.isLoading = false
      state.updateService = action.payload?.data
    })
    builder.addCase(UpdateServiceAction.rejected, (state, error) => {
      state.isLoading = false
      state.updateService = []
    })

    builder.addCase(StatusUpdateServiceAction.pending, (state) => {
      state.isLoading = true

      state.isStatusValueUpdated = false
    })
    builder.addCase(StatusUpdateServiceAction.fulfilled, (state, action) => {
      state.isLoading = false
      state.isStatusValueUpdated = true
    })
    builder.addCase(StatusUpdateServiceAction.rejected, (state, error) => {
      state.isStatusValueUpdated = false
    })
  },
})

// export const { getTestData, removeTestData, emptyTestData, setQuantity, setDefaultTest } =
// createServicesSlice.actions;

export default createServicesSlice.reducer

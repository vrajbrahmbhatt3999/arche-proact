import { createSlice } from '@reduxjs/toolkit'
import { IMasterTableCategory } from '../../../interfaces/apiInterface'
import {
  addMasterTableCategory,
  addMasterTableCategoryValue,
  editMasterTableCategory,
  editMasterTableCategoryValue,
  getAllMasterTableCategory,
  getAllMasterTableCategoryValue,
  getMasterTableCategoryById,
  getMasterTableCategoryValueById,
  updateStatusMasterTableCategory,
  updateStatusMasterTableCategoryValue,
} from './MasterTableCategoryAsyncActions'

export const initialState: IMasterTableCategory = {
  isLoading: false,
  masterCategoryData: [],
  masterCategoryDataById: {},
  masterCategoryValueData: [],
  masterCategoryValueDataById: {},
  isStatusUpdated: true,
  isStatusValueUpdated: true,
  error: null,
}

export const masterTableCategorySlice = createSlice({
  name: 'masterTableManagementCategory',
  initialState,
  reducers: {
    clearState: (state) => {
      state.isLoading = false
      state.error = ''
      state.masterCategoryDataById = {}
      state.masterCategoryValueDataById = {}
    },
  },
  extraReducers: (builder) => {
    // getallMC
    builder
      .addCase(getAllMasterTableCategory.pending, (state) => {
        state.isLoading = true
        state.isStatusUpdated = false
      })
      .addCase(getAllMasterTableCategory.fulfilled, (state, action) => {
        state.isLoading = false
        state.masterCategoryData = action?.payload?.data
        state.isStatusUpdated = false
      })
      .addCase(getAllMasterTableCategory.rejected, (state, error) => {
        state.isLoading = false
        state.error = error
        state.isStatusUpdated = false
      })
    // getallMCById
    builder
      .addCase(getMasterTableCategoryById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getMasterTableCategoryById.fulfilled, (state, action) => {
        state.isLoading = false
        state.masterCategoryDataById = action.payload
      })
      .addCase(getMasterTableCategoryById.rejected, (state, error) => {
        state.isLoading = false
        state.error = error
        state.masterCategoryDataById = {}
      })
    // addMC
    builder
      .addCase(addMasterTableCategory.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addMasterTableCategory.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(addMasterTableCategory.rejected, (state, error) => {
        state.isLoading = false
        state.error = error
      })
    // editMC
    builder
      .addCase(editMasterTableCategory.pending, (state) => {
        state.isLoading = true
      })
      .addCase(editMasterTableCategory.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(editMasterTableCategory.rejected, (state, error) => {
        state.isLoading = false
        state.error = error
      })
    //updateStatus-MC
    builder
      .addCase(updateStatusMasterTableCategory.pending, (state) => {
        state.isLoading = true
        state.isStatusUpdated = false
      })
      .addCase(updateStatusMasterTableCategory.fulfilled, (state) => {
        state.isLoading = false
        state.isStatusUpdated = true
      })
      .addCase(updateStatusMasterTableCategory.rejected, (state, error) => {
        state.isLoading = false
        state.error = error
        state.isStatusUpdated = false
      })
    // getAll master category value
    builder
      .addCase(getAllMasterTableCategoryValue.pending, (state) => {
        state.isLoading = true
        state.isStatusValueUpdated = false
      })
      .addCase(getAllMasterTableCategoryValue.fulfilled, (state, action) => {
        state.isLoading = false
        state.masterCategoryValueData = action?.payload?.data
        state.isStatusValueUpdated = false
      })
      .addCase(getAllMasterTableCategoryValue.rejected, (state, error) => {
        state.isLoading = false
        state.error = error
        state.isStatusValueUpdated = false
      })
    builder
      .addCase(getMasterTableCategoryValueById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getMasterTableCategoryValueById.fulfilled, (state, action) => {
        state.isLoading = false
        state.masterCategoryValueDataById = action.payload
      })
      .addCase(getMasterTableCategoryValueById.rejected, (state, error) => {
        state.isLoading = false
        state.masterCategoryValueDataById = {}
        state.error = error
      })
    builder
      .addCase(addMasterTableCategoryValue.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addMasterTableCategoryValue.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(addMasterTableCategoryValue.rejected, (state, error) => {
        state.isLoading = false
        state.error = error
      })
    builder
      .addCase(editMasterTableCategoryValue.pending, (state) => {
        state.isLoading = true
      })
      .addCase(editMasterTableCategoryValue.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(editMasterTableCategoryValue.rejected, (state, error) => {
        state.isLoading = false
        state.error = error
      })
    builder
      .addCase(updateStatusMasterTableCategoryValue.pending, (state) => {
        state.isLoading = true
        state.isStatusValueUpdated = false
      })
      .addCase(updateStatusMasterTableCategoryValue.fulfilled, (state) => {
        state.isLoading = false
        state.isStatusValueUpdated = true
      })
      .addCase(
        updateStatusMasterTableCategoryValue.rejected,
        (state, error) => {
          state.isLoading = false
          state.isStatusValueUpdated = false

          state.error = error
        }
      )
  },
})

export const { clearState } = masterTableCategorySlice.actions
export default masterTableCategorySlice.reducer

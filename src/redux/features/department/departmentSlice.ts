import { createSlice } from '@reduxjs/toolkit'
import { IDepartment } from '../../../interfaces/apiInterface'
import {
  addDepartment,
  editDepartment,
  getAllDepartment,
  getAllDepartmentDropdownData,
  getDepartmentById,
  updateDepartmentStatus,
} from './departmentAsyncActions'

export const initialState: IDepartment = {
  isLoading: true,
  departmentData: [],
  departmentDropdownData: [],
  departmentlistInfo: {},
  departmentInfo: {},
  error: null,
}

export const departmentSlice = createSlice({
  name: 'department',
  initialState,
  reducers: {
    clearDepartmentInfo: (state) => {
      state.departmentInfo = {}
    },
  },
  extraReducers(builder) {
    // GET ALL DEPARTMENT

    builder.addCase(getAllDepartment.pending, (state) => {
      state.isLoading = false
    })
    builder.addCase(getAllDepartment.fulfilled, (state, action) => {
      state.isLoading = false
      state.departmentData = action.payload?.data
      state.departmentlistInfo = action.payload
    })
    builder.addCase(getAllDepartment.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })

    builder.addCase(getAllDepartmentDropdownData.pending, (state) => {
      state.isLoading = false
    })
    builder.addCase(getAllDepartmentDropdownData.fulfilled, (state, action) => {
      state.isLoading = false
      state.departmentDropdownData = action.payload?.data
    })
    builder.addCase(getAllDepartmentDropdownData.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })
    // ADD DEPARTMENT

    builder.addCase(addDepartment.pending, (state) => {
      state.isLoading = false
    })
    builder.addCase(addDepartment.fulfilled, (state, action) => {
      state.isLoading = false
      state.departmentInfo = action.payload
    })
    builder.addCase(addDepartment.rejected, (state, error) => {
      state.isLoading = false
      state.departmentInfo = {}
      state.error = error
    })

    // GET DEPARTMENT BY ID

    builder.addCase(getDepartmentById.pending, (state) => {
      state.isLoading = false
      state.departmentInfo = {}
    })
    builder.addCase(getDepartmentById.fulfilled, (state, action) => {
      state.isLoading = false
      state.departmentInfo = action.payload
    })
    builder.addCase(getDepartmentById.rejected, (state, error) => {
      state.isLoading = false
      state.departmentInfo = {}
      state.error = error
    })

    // EDIT DEPARTMENT

    builder.addCase(editDepartment.pending, (state) => {
      state.isLoading = false
    })
    builder.addCase(editDepartment.fulfilled, (state, action) => {
      state.isLoading = false
      state.departmentInfo = action.payload
    })
    builder.addCase(editDepartment.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })

    // UPDATE DEPARTMENT STATUS

    builder.addCase(updateDepartmentStatus.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(updateDepartmentStatus.fulfilled, (state) => {
      state.isLoading = false
    })
    builder.addCase(updateDepartmentStatus.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })
  },
})

export const { clearDepartmentInfo } = departmentSlice.actions
export default departmentSlice.reducer

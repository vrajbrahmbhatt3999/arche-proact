import { createSlice } from '@reduxjs/toolkit'
import { ICreateNewFormState } from '../../../interfaces/apiInterface'
import {
  getAllCreateNewFormById,
  createNewForm,
  deleteCreateNewFormById,
  getAllCreateNewForms,
  updateCreateNewFormById,
  updateStatusForCreateNewFormById,
  getAllCreateNewFormModules,
} from './createNewFormAsynActions'

export const initialState: ICreateNewFormState = {
  isLoading: false,
  createFormBuilderHeaderData: {},
  createNewFormData: [],
  createNewFormDepartmentsData: [],
  createNewFormModulesData: [],
  createNewFormByIdData: {},
  updatedCreateNewFormData: {},
  error: null,
  isStatusUpdated: true,
  createUserData: [],
  filteredFormData: [],
}

export const createNewFormSlice = createSlice({
  name: 'createNewForm',
  initialState,
  reducers: {
    saveDataForFormBuilderHeader: (state, action) => {
      state.createFormBuilderHeaderData = action.payload
    },
    clearState: (state) => {
      state.isLoading = false
      state.error = ''

      state.createNewFormByIdData = {}
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCreateNewForms.pending, (state) => {
        state.isLoading = true
        state.isStatusUpdated = false
      })
      .addCase(getAllCreateNewForms.fulfilled, (state, action) => {
        state.isLoading = false
        state.createNewFormData =
          action.payload?.data?.length > 0 ? action.payload?.data : []
        console.log('formData', action.payload?.data)
        state.filteredFormData =
          action.payload?.data?.length > 0
            ? action.payload?.data.filter((item: any) => {
                return item.module_name === 'Doctor'
              })
            : []
        state.isStatusUpdated = false
      })
      .addCase(getAllCreateNewForms.rejected, (state, error) => {
        state.isLoading = false
        state.createNewFormData = []
        state.error = error
      })
      // createNewForm
      .addCase(createNewForm.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createNewForm.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(createNewForm.rejected, (state, error) => {
        state.isLoading = false
        state.error = error
      })

    // getAllCreateNewFormById
    builder
      .addCase(getAllCreateNewFormById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllCreateNewFormById.fulfilled, (state, action) => {
        state.isLoading = false
        state.createNewFormByIdData = action.payload
      })
      .addCase(getAllCreateNewFormById.rejected, (state, error) => {
        state.isLoading = false
        state.error = error
      })

    // updateCreateNewFormById
    builder
      .addCase(updateCreateNewFormById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateCreateNewFormById.fulfilled, (state, action) => {
        state.isLoading = false
        state.updatedCreateNewFormData = action.payload
      })
      .addCase(updateCreateNewFormById.rejected, (state, error) => {
        state.isLoading = false
        state.error = error
      })

    // deleteCreateNewFormById
    builder
      .addCase(deleteCreateNewFormById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteCreateNewFormById.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(deleteCreateNewFormById.rejected, (state, error) => {
        state.isLoading = false
        state.error = error
      })

    // updateStatusForCreateNewFormById
    builder
      .addCase(updateStatusForCreateNewFormById.pending, (state) => {
        state.isLoading = true
        state.isStatusUpdated = false
      })
      .addCase(updateStatusForCreateNewFormById.fulfilled, (state) => {
        state.isLoading = false
        state.isStatusUpdated = true
      })
      .addCase(updateStatusForCreateNewFormById.rejected, (state, error) => {
        state.isLoading = false
        state.error = error
        state.isStatusUpdated = false
      })

    // getAllCreateNewFormModules
    builder
      .addCase(getAllCreateNewFormModules.pending, (state) => {
        state.isLoading = true
        state.isStatusUpdated = false
      })
      .addCase(getAllCreateNewFormModules.fulfilled, (state, action) => {
        state.isLoading = false
        state.createNewFormDepartmentsData =
          action.payload?.data?.length > 0 ? action.payload?.data : []
        state.isStatusUpdated = false
      })
      .addCase(getAllCreateNewFormModules.rejected, (state, error) => {
        state.isLoading = false
        state.createNewFormDepartmentsData = []
        state.error = error
      })
  },
})

export const { clearState, saveDataForFormBuilderHeader } =
  createNewFormSlice.actions
export default createNewFormSlice.reducer

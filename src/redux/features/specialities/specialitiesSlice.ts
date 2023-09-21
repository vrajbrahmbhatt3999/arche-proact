import { createSlice } from '@reduxjs/toolkit'
import { ISpecialities } from '../../../interfaces/apiInterface'
import {
  addSpeciality,
  editSpeciality,
  getAllSpeciality,
  getSpecialityById,
  updateSpeciality,
} from './specialitiesAsyncActions'

export const initialState: ISpecialities = {
  isLoading: false,
  specialityData: [],
  specialityInfo: {},
  error: null,
}

export const specialitiesSlice = createSlice({
  name: 'specialities',
  initialState,
  reducers: {
    clearSpecialityInfo: (state) => {
      state.specialityInfo = {}
    },
  },
  extraReducers(builder) {
    // GET ALL SPECIALITY

    builder.addCase(getAllSpeciality.pending, (state) => {
      state.isLoading = true
      state.specialityData = []
    })
    builder.addCase(getAllSpeciality.fulfilled, (state, action) => {
      state.isLoading = false
      state.specialityData = action.payload?.data
    })
    builder.addCase(getAllSpeciality.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })

    // ADD SPECIALITY

    builder.addCase(addSpeciality.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(addSpeciality.fulfilled, (state, action) => {
      state.isLoading = false
      state.specialityInfo = action.payload
    })
    builder.addCase(addSpeciality.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })

    // GET SPECIALITY BY ID

    builder.addCase(getSpecialityById.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getSpecialityById.fulfilled, (state, action) => {
      state.isLoading = false
      state.specialityInfo = action.payload
    })
    builder.addCase(getSpecialityById.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })

    // EDIT SPECIALITY

    builder.addCase(editSpeciality.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(editSpeciality.fulfilled, (state, action) => {
      state.isLoading = false
      state.specialityInfo = action.payload
    })
    builder.addCase(editSpeciality.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })

    // UPDATE SPECIALITY

    builder.addCase(updateSpeciality.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(updateSpeciality.fulfilled, (state, action) => {
      state.isLoading = false
      state.specialityInfo = action.payload
    })
    builder.addCase(updateSpeciality.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })
  },
})

export const { clearSpecialityInfo } = specialitiesSlice.actions
export default specialitiesSlice.reducer

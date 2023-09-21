import { createSlice } from '@reduxjs/toolkit'
import {
  getAllInternalDocotorReferral,
  getAllOutsideDocotorReferral,
  getAllReceptionistName,
  getAllReferral,
} from './referralAsyncActions'

export const initialState = {
  isLoading: false,
  referralData: [],
  referDoctorData: [],
  receptionistList: [],
  error: null,
}

export const referralSlice = createSlice({
  name: 'referral',
  initialState,
  reducers: {
    clearReferralData: (state) => {
      state.referralData = []
    },
  },
  extraReducers(builder) {
    // GET ALL Referral

    builder.addCase(getAllReferral.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getAllReferral.fulfilled, (state, action) => {
      state.isLoading = false
      state.referralData = action.payload
      console.log('referralDta', action.payload)
    })
    builder.addCase(getAllReferral.rejected, (state, error) => {
      state.isLoading = false
      // state.error = error;
    })

    //internal referral doctor

    builder.addCase(getAllInternalDocotorReferral.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(
      getAllInternalDocotorReferral.fulfilled,
      (state, action) => {
        state.isLoading = false
        state.referDoctorData = action.payload.data
        console.log('internalDocotorReferral', action.payload)
      }
    )
    builder.addCase(getAllInternalDocotorReferral.rejected, (state, error) => {
      state.isLoading = false
      // state.error = error;
    })

    builder.addCase(getAllReceptionistName.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getAllReceptionistName.fulfilled, (state, action) => {
      state.isLoading = false
      state.receptionistList = action.payload.data
      console.log('erral', action.payload)
    })
    builder.addCase(getAllReceptionistName.rejected, (state, error) => {
      state.isLoading = false
      // state.error = error;
    })
  },
})

export const { clearReferralData } = referralSlice.actions
export default referralSlice.reducer

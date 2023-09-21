import { createSlice } from '@reduxjs/toolkit'
import { IOngoingClaims } from '../../../interfaces/apiInterface'
import {
  createNewClaim,
  createSetteledClaims,
  getAllOngoingClaims,
  getClaimsByMarketPlace,
} from './onGoingClaimsAsyncActions'
import { getPandingClaims } from './onGoingClaimsAsyncActions'

export const initialState: IOngoingClaims = {
  isLoading: false,
  onGoingClaimsData: [],
  pandingClaimsData: [],
  claimsByMarketPlace: [],
}

export const onGoingClaims = createSlice({
  name: 'ongoing-claims',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllOngoingClaims.pending, (state) => {
      state.isLoading = true
      state.onGoingClaimsData = []
    })
    builder.addCase(getAllOngoingClaims.fulfilled, (state, action) => {
      state.isLoading = false
      state.onGoingClaimsData = action.payload.data ?? []
    })
    builder.addCase(getAllOngoingClaims.rejected, (state, error) => {
      state.isLoading = false
      state.onGoingClaimsData = []
    })

    // get panding claims case

    builder.addCase(getPandingClaims.pending, (state) => {
      state.isLoading = true
      state.pandingClaimsData = []
    })
    builder.addCase(getPandingClaims.fulfilled, (state, action) => {
      state.isLoading = false
      state.pandingClaimsData = action.payload ?? []
    })
    builder.addCase(getPandingClaims.rejected, (state, error) => {
      state.isLoading = false
      state.pandingClaimsData = []
    })

    builder.addCase(createNewClaim.pending, (state) => {
      state.isLoading = true
      state.onGoingClaimsData = []
    })
    builder.addCase(createNewClaim.fulfilled, (state, action) => {
      state.isLoading = false
    })
    builder.addCase(createNewClaim.rejected, (state, error) => {
      state.isLoading = false
    })

    // get all claims based on market place company
    builder.addCase(getClaimsByMarketPlace.pending, (state) => {
      state.isLoading = true
      state.claimsByMarketPlace = []
    })
    builder.addCase(getClaimsByMarketPlace.fulfilled, (state, action) => {
      state.isLoading = false
      state.claimsByMarketPlace = action.payload.data ?? []
    })
    builder.addCase(getClaimsByMarketPlace.rejected, (state, error) => {
      state.isLoading = false
    })

    builder.addCase(createSetteledClaims.pending, (state) => {
      state.isLoading = true
      state.onGoingClaimsData = []
    })
    builder.addCase(createSetteledClaims.fulfilled, (state, action) => {
      state.isLoading = false
    })
    builder.addCase(createSetteledClaims.rejected, (state, error) => {
      state.isLoading = false
    })
  },
})

export default onGoingClaims.reducer

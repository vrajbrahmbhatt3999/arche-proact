import { createSlice } from '@reduxjs/toolkit'
import { IRoleUser } from '../../../interfaces/apiInterface'
import { getUserRole, updateRoleStatus } from './roleAsynActions'

export const initialState: IRoleUser = {
  isLoading: false,
  userRole: [],
  error: null,
  isStatusUpdated: false,
}

export const roleSlice = createSlice({
  name: 'roleuser',
  initialState,
  reducers: {},
  extraReducers(builder) {
    // SHARE QUESTIONNAIRE LINK
    builder
      .addCase(getUserRole.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUserRole.fulfilled, (state, action) => {
        state.isLoading = false
        state.userRole = action.payload || []
      })
      .addCase(getUserRole.rejected, (state, error) => {
        state.isLoading = false
        state.userRole = []
        state.error = error
      })
      .addCase(updateRoleStatus.pending, (state) => {
        state.isLoading = true
        state.isStatusUpdated = false
      })
      .addCase(updateRoleStatus.fulfilled, (state, action) => {
        state.isLoading = false
        state.isStatusUpdated = true
      })
      .addCase(updateRoleStatus.rejected, (state, action) => {
        state.isLoading = false
        state.isStatusUpdated = false
      })
  },
})

export default roleSlice.reducer

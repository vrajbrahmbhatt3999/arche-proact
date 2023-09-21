import { createSlice } from '@reduxjs/toolkit'
import { IManageUserPrimary } from '../../../interfaces/apiInterface'
import {
  addManageUser,
  createShift,
  editManageUserById,
  editShift,
  getAllManageUser,
  getAllUsersByRole,
  getManageUserById,
  getUserShiftById,
  updateStatusManageUserById,
} from './ManageUserAsynActions'
import { checkExpiryDate } from '../../../utils/utils'

export const initialState: IManageUserPrimary = {
  isLoading: false,
  primaryUserData: {},
  allUsersData: [],
  userDetail: {},
  userId: '',
  shiftData: {},
  shiftEdit: false,
  error: null,
  isSecondayActive: false,
  isStatusUpdated: true,
  editUserData: {},
  userDataByRole: [],
}

export const ManageUserSlice = createSlice({
  name: 'manageUser',
  initialState,
  reducers: {
    goToSecondary: (state, action) => {
      state.isSecondayActive = action.payload
    },
    clearUserData: (state) => {
      state.userDetail = {}
      state.shiftData = {}
      state.editUserData = {}
      state.allUsersData = []
    },
    getEditUserData: (state, action) => {
      state.editUserData = action.payload
    },
    clearEditUserData: (state) => {
      state.editUserData = {}
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllManageUser.pending, (state) => {
        state.isLoading = true
        state.isStatusUpdated = false
      })
      .addCase(getAllManageUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.allUsersData = action.payload?.data
        state.isStatusUpdated = false
      })
      .addCase(getAllManageUser.rejected, (state, error) => {
        state.isLoading = false
        state.error = error
        state.isStatusUpdated = false
      })
    builder
      .addCase(getManageUserById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getManageUserById.fulfilled, (state, action) => {
        state.isLoading = false
        state.userDetail = action.payload
      })
      .addCase(getManageUserById.rejected, (state, error) => {
        state.isLoading = false
        state.error = error
      })
    builder
      .addCase(addManageUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addManageUser.fulfilled, (state, action) => {
        state.isLoading = false
        // console.log('action payload', action.payload, action.type)
        state.userId = action.payload
        state.shiftEdit = false
      })
      .addCase(addManageUser.rejected, (state, error) => {
        state.isLoading = false
      })
    builder
      .addCase(editManageUserById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(editManageUserById.fulfilled, (state, action) => {
        state.isLoading = false
        // state.shiftData = action.payload
        state.userId = action.payload
        state.shiftEdit = true
      })
      .addCase(editManageUserById.rejected, (state, error) => {
        state.isLoading = false
        state.error = error
      })
    builder
      .addCase(updateStatusManageUserById.pending, (state) => {
        state.isLoading = true
        state.isStatusUpdated = false
      })
      .addCase(updateStatusManageUserById.fulfilled, (state) => {
        state.isLoading = false
        state.isStatusUpdated = true
      })
      .addCase(updateStatusManageUserById.rejected, (state, error) => {
        state.isLoading = false
        state.error = error
        state.isStatusUpdated = false
      })
    builder
      .addCase(createShift.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createShift.fulfilled, (state, action) => {
        state.isLoading = false
        state.shiftData = action.payload
      })
      .addCase(createShift.rejected, (state, error) => {
        state.isLoading = false
      })
    builder
      .addCase(editShift.pending, (state) => {
        state.isLoading = true
      })
      .addCase(editShift.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(editShift.rejected, (state, error) => {
        state.isLoading = false
      })
    builder
      .addCase(getUserShiftById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUserShiftById.fulfilled, (state, action) => {
        state.isLoading = false
        state.shiftData = action.payload
      })
      .addCase(getUserShiftById.rejected, (state, error) => {
        state.isLoading = false
      })
    builder
      .addCase(getAllUsersByRole.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllUsersByRole.fulfilled, (state, action) => {
        state.isLoading = false
        let tempArr: any = []
        // tempArr =
        //   action.payload && action.payload?.length > 0
        //     ? action.payload.filter((item: any) => {
        //         return item.is_active && checkExpiryDate(item?.expiry_date)
        //       })
        //     : []
        tempArr =
          action.payload && action.payload?.length > 0
            ? action.payload.filter((item: any) => {
                return item.is_active
              })
            : []
        state.userDataByRole = tempArr ?? []
      })

      .addCase(getAllUsersByRole.rejected, (state, error) => {
        state.isLoading = false
      })
  },
})

export const {
  goToSecondary,
  clearUserData,
  getEditUserData,
  clearEditUserData,
} = ManageUserSlice.actions
export default ManageUserSlice.reducer

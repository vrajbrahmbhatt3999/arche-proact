import { createSlice } from '@reduxjs/toolkit'
import {
  createUsergroup,
  getAllUserGroup,
  getUsergrouppermissionById,
  updateStatusUserGroupId,
  updateUsergroupPermission,
} from './manageUsergroupAsyncActions'

interface IManageUsergroup {
  loading: boolean
  createUserGroupRes: Object
  usergroupData: any[]
  activeModule: any
  isStatusUpdated: boolean
}

export const initialState: IManageUsergroup = {
  loading: false,
  createUserGroupRes: {
    modulesObj: [],
    userGroupObj: {},
  },
  usergroupData: [],
  activeModule: {},
  isStatusUpdated: true,
}

const manageUsergroupSlice = createSlice({
  name: 'manageusergroup',
  initialState,
  reducers: {
    clearActionTableData: (state) => {
      let userGroup = {
        modulesObj: [],
        userGroupObj: {},
      }
      state.createUserGroupRes = userGroup
    },
    setActiveModule: (state, action) => {
      state.activeModule = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUsergroup.pending, (state) => {
        state.loading = true
      })
      .addCase(createUsergroup.fulfilled, (state, action) => {
        state.loading = false
        state.createUserGroupRes = action.payload
        let data =
          action.payload.modulesObj.length > 0 && action.payload.modulesObj[0]
        state.activeModule = data
      })
      .addCase(createUsergroup.rejected, (state, action) => {
        state.loading = false
      })
      .addCase(getAllUserGroup.pending, (state) => {
        state.loading = true
        state.isStatusUpdated = false
      })
      .addCase(getAllUserGroup.fulfilled, (state, action) => {
        state.loading = false
        state.usergroupData = action?.payload?.data
        state.isStatusUpdated = false
      })
      .addCase(getAllUserGroup.rejected, (state, action) => {
        state.loading = false
      })
      .addCase(updateUsergroupPermission.pending, (state) => {
        state.loading = true
      })
      .addCase(updateUsergroupPermission.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(updateUsergroupPermission.rejected, (state, action) => {
        state.loading = false
        state.isStatusUpdated = false
      })
      .addCase(getUsergrouppermissionById.pending, (state) => {
        state.loading = true
      })
      .addCase(getUsergrouppermissionById.fulfilled, (state, action) => {
        state.loading = false
        console.log('data>>>>', action.payload)
        let data =
          action.payload.modulesObj.length > 0 &&
          action.payload.modulesObj.filter((item: any) => {
            return item?._id === state.activeModule?._id
          })
        state.activeModule =
          data.length > 0
            ? data[0]
            : action.payload.modulesObj.length > 0
            ? action.payload.modulesObj[0]
            : []
        state.createUserGroupRes = action.payload
      })
      .addCase(getUsergrouppermissionById.rejected, (state, action) => {
        state.loading = false
      })
      .addCase(updateStatusUserGroupId.pending, (state) => {
        state.loading = true
        state.isStatusUpdated = false
      })
      .addCase(updateStatusUserGroupId.fulfilled, (state, action) => {
        state.loading = false
        state.isStatusUpdated = true
      })
      .addCase(updateStatusUserGroupId.rejected, (state, action) => {
        state.loading = false
        state.isStatusUpdated = false
      })
  },
})

export const { clearActionTableData, setActiveModule } =
  manageUsergroupSlice.actions

export default manageUsergroupSlice.reducer

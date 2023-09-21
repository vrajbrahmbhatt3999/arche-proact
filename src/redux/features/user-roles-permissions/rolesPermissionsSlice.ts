import { createSlice } from '@reduxjs/toolkit'
import { roleData } from '../../../constants/data'
import {
  createPermissions,
  createUserRole,
  getAllEmptyPermissions,
  getAllPermissionsById,
  updatePermissions,
} from './rolesPermissionAsyncActions'

interface IRolesPermissions {
  loading: boolean
  permissions: any[]
  activeModule: any
  isStatusUpdated: boolean
  activeActionTab: any
  roleData: any
  permissionsById: any[]
}

export const initialState: IRolesPermissions = {
  loading: false,
  permissions: [],
  activeModule: {},
  activeActionTab: {},
  roleData: {},
  isStatusUpdated: true,
  permissionsById: [],
}

const rolesPermissionsSlice = createSlice({
  name: 'permissions',
  initialState,
  reducers: {
    clearActionTableData: (state) => {},
    setActiveModule: (state, action) => {
      state.activeModule = action.payload
    },
    setActiveActionTab: (state, action) => {
      state.activeActionTab = action.payload
    },

    setUpdatePermissions: (state, action) => {
      state.permissions = action.payload
    },
    setRoleData: (state, action) => {
      state.roleData = action.payload
    },
    clearRolePermissions: (state) => {
      state.permissions = []
      state.activeModule = {}
      state.roleData = {}
      state.permissionsById = []
    },
  },
  extraReducers: (builder) => {
    // get all permissions
    builder
      .addCase(getAllEmptyPermissions.pending, (state) => {
        state.loading = true
      })
      .addCase(getAllEmptyPermissions.fulfilled, (state, action) => {
        state.loading = false

        state.permissions = action.payload
        const data =
          action.payload && action.payload?.length > 0 ? action.payload[0] : {}

        state.activeModule = data
      })
      .addCase(getAllEmptyPermissions.rejected, (state, action) => {
        state.loading = false
      })

      // create new secondary role
      .addCase(createUserRole.pending, (state) => {
        state.loading = true
      })
      .addCase(createUserRole.fulfilled, (state, action) => {
        state.loading = false
        state.roleData = { ...action.payload, isUpdate: false }
      })
      .addCase(createUserRole.rejected, (state, action) => {
        state.loading = false
      })

      .addCase(updatePermissions.pending, (state) => {
        state.loading = true
      })
      .addCase(updatePermissions.fulfilled, (state, action) => {
        state.loading = false
        state.roleData = { ...action.payload, isUpdate: true }
        state.permissions = []
        state.activeModule = {}
      })
      .addCase(updatePermissions.rejected, (state, action) => {
        state.loading = false
      })

      .addCase(createPermissions.pending, (state) => {
        state.loading = true
      })
      .addCase(createPermissions.fulfilled, (state, action) => {
        state.loading = false
        state.roleData = { ...action.payload, isUpdate: false }
      })
      .addCase(createPermissions.rejected, (state, action) => {
        state.loading = false
      })

      .addCase(getAllPermissionsById.pending, (state) => {
        state.loading = true
      })
      .addCase(getAllPermissionsById.fulfilled, (state, action) => {
        state.loading = false
        state.permissionsById = action.payload
      })
      .addCase(getAllPermissionsById.rejected, (state, action) => {
        state.loading = false
      })
  },
})

export const {
  clearActionTableData,
  setActiveModule,
  setActiveActionTab,
  setUpdatePermissions,
  clearRolePermissions,
  setRoleData,
} = rolesPermissionsSlice.actions

export default rolesPermissionsSlice.reducer

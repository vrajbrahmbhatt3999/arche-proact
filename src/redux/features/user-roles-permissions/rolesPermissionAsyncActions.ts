import {
  CREATE_PERMISSIONS_TYPE,
  CREATE_USER_ROLE_TYPE,
  GET_ALL_PERMISSIONS_TYPE,
  GET_ALL_USER_ROLES_TYPE,
  GET_PERMISSIONS_BY_ID_TYPE,
  UPDATE_PERMISSIONS_TYPE,
} from '../../../constants/asyncActionsType'
import createAsyncThunkForSlice from '../../../utils/utils'
import {
  createRole,
  createpermissions,
  getPermissions,
  getallroles,
  getpermissionbyid,
  updatepermissions,
} from './rolesPermissionsCrud'

export const getAllEmptyPermissions = createAsyncThunkForSlice(
  GET_ALL_PERMISSIONS_TYPE,
  getPermissions
)

export const createUserRole = createAsyncThunkForSlice(
  CREATE_USER_ROLE_TYPE,
  createRole,
  {
    isToast: true,
  }
)

export const getAllRoles = createAsyncThunkForSlice(
  GET_ALL_USER_ROLES_TYPE,
  getallroles
)

export const createPermissions = createAsyncThunkForSlice(
  CREATE_PERMISSIONS_TYPE,
  createpermissions,
  {
    isToast: true,
  }
)

export const updatePermissions = createAsyncThunkForSlice(
  UPDATE_PERMISSIONS_TYPE,
  updatepermissions,
  {
    isToast: true,
  }
)

export const getAllPermissionsById = createAsyncThunkForSlice(
  GET_PERMISSIONS_BY_ID_TYPE,
  getpermissionbyid
)

import {
  ADD_MANAGE_USER,
  GET_MANAGE_USER_BY_ID,
  GET_ALL_MANAGE_USER,
  UPDATE_STATUS_MANAGE_USER,
  EDIT_MANAGE_USER_TYPE,
  CREATE_USER_SHIFT_TYPE,
  UPDATE_USER_SHIFT_TYPE,
  GET_USER_SHIFT_BY_ID_TYPE,
  GET_ALL_MANAGE_USER_BY_ROLE_TYPE,
} from '../../../constants/asyncActionsType'
import createAsyncThunkForSlice from '../../../utils/utils'
import {
  addUserShift,
  createManageUser,
  editManageUser,
  getAllUserByRole,
  getManageUser,
  getManageUserByID,
  getShiftById,
  updateShift,
  updateStatusManageUser,
} from './ManageUserCrud'

export const getAllManageUser = createAsyncThunkForSlice(
  GET_ALL_MANAGE_USER,
  getManageUser
)
export const getManageUserById = createAsyncThunkForSlice(
  GET_MANAGE_USER_BY_ID,
  getManageUserByID
)
export const addManageUser = createAsyncThunkForSlice(
  ADD_MANAGE_USER,
  createManageUser,
  {
    isToast: true,
  }
)
export const editManageUserById = createAsyncThunkForSlice(
  EDIT_MANAGE_USER_TYPE,
  editManageUser,
  {
    isToast: true,
  }
)
export const updateStatusManageUserById = createAsyncThunkForSlice(
  UPDATE_STATUS_MANAGE_USER,
  updateStatusManageUser,
  {
    isToast: true,
  }
)

export const createShift = createAsyncThunkForSlice(
  CREATE_USER_SHIFT_TYPE,
  addUserShift,
  {
    isToast: true,
  }
)

export const editShift = createAsyncThunkForSlice(
  UPDATE_USER_SHIFT_TYPE,
  updateShift,
  {
    isToast: true,
  }
)

export const getUserShiftById = createAsyncThunkForSlice(
  GET_USER_SHIFT_BY_ID_TYPE,
  getShiftById
)

export const getAllUsersByRole = createAsyncThunkForSlice(
  GET_ALL_MANAGE_USER_BY_ROLE_TYPE,
  getAllUserByRole
)

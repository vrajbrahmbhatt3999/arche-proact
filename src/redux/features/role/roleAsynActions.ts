import {
  GET__ROLE__USER,
  UPDATE_ROLE_STATUS_TYPE,
} from '../../../constants/asyncActionsType'
import createAsyncThunkForSlice from '../../../utils/utils'
import { getRoleUser, updaterolestatus } from './roleCrud'

export const getUserRole = createAsyncThunkForSlice(
  GET__ROLE__USER,
  getRoleUser
)

export const updateRoleStatus = createAsyncThunkForSlice(
  UPDATE_ROLE_STATUS_TYPE,
  updaterolestatus
)

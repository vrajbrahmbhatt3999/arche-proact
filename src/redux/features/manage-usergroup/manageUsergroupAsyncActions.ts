import {
  CREATE_USERGROUP_TYPE,
  GER_USERGROUP_PERMISSION_TYPE,
  GET_USERGROUP_TYPE,
  UPDATE_USER_GROUP_STATUD_BY_ID_TYPE,
} from '../../../constants/asyncActionsType'
import createAsyncThunkForSlice from '../../../utils/utils'
import {
  addUsergroup,
  getUsergroupList,
  getUsergroupPermissions,
  updateUserGroupStatusById,
  updateUsergroupList,
} from './manageUsergroupCrud'
import { UPDATE_USERGROUP_PERMISSION_TYPE } from '../../../constants/asyncActionsType'

export const createUsergroup = createAsyncThunkForSlice(
  CREATE_USERGROUP_TYPE,
  addUsergroup,
  {
    isToast: true,
  }
)

export const getAllUserGroup = createAsyncThunkForSlice(
  GET_USERGROUP_TYPE,
  getUsergroupList
)

export const updateUsergroupPermission = createAsyncThunkForSlice(
  UPDATE_USERGROUP_PERMISSION_TYPE,
  updateUsergroupList
)

export const getUsergrouppermissionById = createAsyncThunkForSlice(
  GER_USERGROUP_PERMISSION_TYPE,
  getUsergroupPermissions
)

export const updateStatusUserGroupId = createAsyncThunkForSlice(
  UPDATE_USER_GROUP_STATUD_BY_ID_TYPE,
  updateUserGroupStatusById,
  {
    isToast: true,
  }
)

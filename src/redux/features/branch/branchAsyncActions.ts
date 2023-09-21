import {
  ADD_BRANCH,
  EDIT_BRANCH,
  GET_ALL_BRANCH,
  GET_ALL_BRANCH_DROPDOWNDATA,
  GET_BRANCH_BY_ID,
  GET_DEFAULT_BRANCH,
  UPDATE_BRANCH_STATUS,
  USER_LICENSE,
} from '../../../constants/asyncActionsType'
import createAsyncThunkForSlice from '../../../utils/utils'
import {
  getAllBranchList,
  addBranchs,
  editBranchs,
  updateBranchStatuss,
  getBranchByIds,
  usersLicense,
  getDefaultBranchs,
} from './branchCrud'

export const getAllBranch = createAsyncThunkForSlice(
  GET_ALL_BRANCH,
  getAllBranchList
)
export const getAllBranchDropDownData = createAsyncThunkForSlice(
  GET_ALL_BRANCH_DROPDOWNDATA,
  getAllBranchList,
  {
    // isToast: true,
  }
)
export const addBranch = createAsyncThunkForSlice(ADD_BRANCH, addBranchs, {
  isToast: true,
})

export const getBranchById = createAsyncThunkForSlice(
  GET_BRANCH_BY_ID,
  getBranchByIds,
  {
    isToast: true,
  }
)

export const editBranch = createAsyncThunkForSlice(EDIT_BRANCH, editBranchs, {
  isToast: true,
})

export const updateBranchStatus = createAsyncThunkForSlice(
  UPDATE_BRANCH_STATUS,
  updateBranchStatuss,
  {
    isToast: true,
  }
)

export const userLicense = createAsyncThunkForSlice(
  USER_LICENSE,
  usersLicense,
  {
    isToast: true,
  }
)

export const getDefaultBranch = createAsyncThunkForSlice(
  GET_DEFAULT_BRANCH,
  getDefaultBranchs,
  {
    isToast: true,
  }
)

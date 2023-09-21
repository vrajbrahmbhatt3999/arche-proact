import {
  ADD_WARD,
  EDIT_WARD,
  GET_ALL_WARD,
  GET_WARD_BY_ID,
  UPDATE_WARD_STATUS,
} from '../../../constants/asyncActionsType'
import createAsyncThunkForSlice from '../../../utils/utils'
import {
  getAllWardList,
  addWard,
  editWards,
  updateWardStatuss,
  getWardByIds,
} from './wardCrud'

export const getAllWard = createAsyncThunkForSlice(
  GET_ALL_WARD,
  getAllWardList
)

export const addWards = createAsyncThunkForSlice(ADD_WARD, addWard, {
  isToast: true,
})

export const getWardById = createAsyncThunkForSlice(
  GET_WARD_BY_ID,
  getWardByIds,
  {
    isToast: true,
  }
)

export const editWard = createAsyncThunkForSlice(EDIT_WARD, editWards, {
  isToast: true,
})

export const updateWardStatus = createAsyncThunkForSlice(
  UPDATE_WARD_STATUS,
  updateWardStatuss,
  {
    isToast: true,
  }
)


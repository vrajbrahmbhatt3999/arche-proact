import {
  ADD_BED,
  EDIT_BED,
  GET_ALL_BED,
  GET_BED_BY_ID,
  UPDATE_BED_STATUS,
} from '../../../constants/asyncActionsType'
import createAsyncThunkForSlice from '../../../utils/utils'
import {
  getAllBedList,
  addBed,
  editBeds,
  updateBedStatuss,
  getBedByIds,
} from './bedCrud'

export const getAllbed = createAsyncThunkForSlice(
  GET_ALL_BED,
  getAllBedList
)

export const addBeds = createAsyncThunkForSlice(ADD_BED, addBed, {
  isToast: true,
})

export const getBedById = createAsyncThunkForSlice(
  GET_BED_BY_ID,
  getBedByIds,
  {
    isToast: true,
  }
)

export const editBed = createAsyncThunkForSlice(EDIT_BED, editBeds, {
  isToast: true,
})

export const updateBedStatus = createAsyncThunkForSlice(
  UPDATE_BED_STATUS,
  updateBedStatuss,
  {
    isToast: true,
  }
)


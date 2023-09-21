import {
  ADD_SPECIALITIES,
  EDIT_SPECIALITIES,
  GET_ALL_SPECIALITIES,
  GET_SPECIALITIES_BY_ID,
  UPDATE_SPECIALITIES_STATUS,
} from '../../../constants/asyncActionsType'
import createAsyncThunkForSlice from '../../../utils/utils'
import {
  addSpecialities,
  editSpecialities,
  getAllSpecialities,
  getSpecialitiesById,
  updateSpecialitiesStatus,
} from './specialitiesCrud'

export const getAllSpeciality = createAsyncThunkForSlice(
  GET_ALL_SPECIALITIES,
  getAllSpecialities
)

export const addSpeciality = createAsyncThunkForSlice(
  ADD_SPECIALITIES,
  addSpecialities,
  { isToast: true }
)

export const getSpecialityById = createAsyncThunkForSlice(
  GET_SPECIALITIES_BY_ID,
  getSpecialitiesById,
  { isToast: true }
)

export const editSpeciality = createAsyncThunkForSlice(
  EDIT_SPECIALITIES,
  editSpecialities,
  { isToast: true }
)

export const updateSpeciality = createAsyncThunkForSlice(
  UPDATE_SPECIALITIES_STATUS,
  updateSpecialitiesStatus,
  { isToast: true }
)

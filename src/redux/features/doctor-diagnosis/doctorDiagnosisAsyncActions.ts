import {
  CREATE_DIAGNOSIS,
  DIAGNOSIS_All_TAG,
  DIAGNOSIS_SEARCH_TAG,
  UPDATE_DIAGNOSIS,
} from '../../../constants/asyncActionsType'
import createAsyncThunkForSlice from '../../../utils/utils'
import {
  creatediagnosis,
  getDiagnosisTags,
  getdiagnosisSearchTags,
  updatediagnosis,
} from './doctorDiagnosisCrud'

export const createDiagnosis = createAsyncThunkForSlice(
  CREATE_DIAGNOSIS,
  creatediagnosis,
  {
    isToast: true,
  }
)

export const updateDiagnosis = createAsyncThunkForSlice(
  UPDATE_DIAGNOSIS,
  updatediagnosis,
  {
    isToast: true,
  }
)

export const getDiagnosisSearchTags = createAsyncThunkForSlice(
  DIAGNOSIS_SEARCH_TAG,
  getdiagnosisSearchTags
)

export const getDiagnosisAllTags = createAsyncThunkForSlice(
  DIAGNOSIS_All_TAG,
  getDiagnosisTags
)

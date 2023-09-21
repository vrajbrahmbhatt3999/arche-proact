import createAsyncThunkForSlice from '../../../utils/utils'
import {
  AllServicesData,
  addServiceData,
  updateServiceData,
  updateStatusServiceData,
  AllActiveServicesData,
} from './servicesCrud'
import {
  ALL_SERVICE_DATA,
  GET_ALL_SERVICES_DATA,
  GET_ALL_ACTIVE_SERVICES_DATA,
  STATUS_UPDATE_SERVICE_DATA,
  UPDATE_SERVICE_DATA,
} from '../../../constants/asyncActionsType'

export const GetAllServicesAsyncData = createAsyncThunkForSlice(
  GET_ALL_SERVICES_DATA,
  AllServicesData,
  {
    isToast: true,
  }
)

export const GetAllActiveServicesAsyncData = createAsyncThunkForSlice(GET_ALL_ACTIVE_SERVICES_DATA, AllActiveServicesData)

export const AddServiceAction = createAsyncThunkForSlice(
  ALL_SERVICE_DATA,
  addServiceData,
  {
    isToast: true,
  }
)

export const UpdateServiceAction = createAsyncThunkForSlice(
  UPDATE_SERVICE_DATA,
  updateServiceData,
  {
    isToast: true,
  }
)

export const StatusUpdateServiceAction = createAsyncThunkForSlice(
  STATUS_UPDATE_SERVICE_DATA,
  updateStatusServiceData
)

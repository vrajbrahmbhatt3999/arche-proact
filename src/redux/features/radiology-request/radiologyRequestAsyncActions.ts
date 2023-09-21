import {
  GET_ALL_RADIOLOGY_REQUESTS_TYPE,
  CHANGE_RADIOLOGY_REQUESTS_STATUS_TYPE,
} from "../../../constants/asyncActionsType";
import createAsyncThunkForSlice from "../../../utils/utils";
import {
  getAllRadiologyReqeusts,
  changeRadiologyJobStatus,
} from "./radiologyRequestCrud";

export const getAllRadiologyRequestsList = createAsyncThunkForSlice(
  GET_ALL_RADIOLOGY_REQUESTS_TYPE,
  getAllRadiologyReqeusts
);

export const changeRadiologyRequestsStatus = createAsyncThunkForSlice(
  CHANGE_RADIOLOGY_REQUESTS_STATUS_TYPE,
  changeRadiologyJobStatus,
  { isToast: true }
);

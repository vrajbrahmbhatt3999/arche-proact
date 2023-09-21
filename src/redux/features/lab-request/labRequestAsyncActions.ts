import {
  GET_ALL_LAB_REQUESTS_TYPE,
  CHANGE_LAB_REQUESTS_STATUS_TYPE,
} from "../../../constants/asyncActionsType";
import createAsyncThunkForSlice from "../../../utils/utils";
import { getAllLabReqeusts, changeLabJobStatus } from "./labRequestCrud";

export const getAllLabRequestsList = createAsyncThunkForSlice(
  GET_ALL_LAB_REQUESTS_TYPE,
  getAllLabReqeusts
);

export const changeLabRequestsStatus = createAsyncThunkForSlice(
  CHANGE_LAB_REQUESTS_STATUS_TYPE,
  changeLabJobStatus,
  { isToast: true }
);

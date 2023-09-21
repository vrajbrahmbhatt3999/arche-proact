import createAsyncThunkForSlice from "../../../utils/utils";
import {
  ADD_MASTER_VALUE_TYPE,
  GET_ALL_MASTER_VALUE_TYPE,
  UPDATE_MASTER_VALUE_TYPE,
  UPDATE_STATUS_TYPE,
} from "../../../constants/asyncActionsType";
import {
  addMasterValue,
  getallMasterValue,
  updateMasterValue,
  updateStatus,
} from "./MasterValueCrud";

// add master value
export const addAllMasterValue = createAsyncThunkForSlice(
  ADD_MASTER_VALUE_TYPE,
  addMasterValue,
  {
    isToast: true,
  }
);

// get master value
export const getAllMasterValue = createAsyncThunkForSlice(
  GET_ALL_MASTER_VALUE_TYPE,
  getallMasterValue
);

// update status
export const updateStatusValue = createAsyncThunkForSlice(
  UPDATE_STATUS_TYPE,
  updateStatus,
  {
    isToast: true,
  }
);

// update master value
export const updatMasterValue = createAsyncThunkForSlice(
  UPDATE_MASTER_VALUE_TYPE,
  updateMasterValue,
  {
    isToast: true,
  }
);

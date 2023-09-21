import createAsyncThunkForSlice from "../../../utils/utils";
import {
  GET_ALL_BRANCH_STORE_REQUEST_DATA,
  ADD_BRANCH_STORE_ISSUE_DATA,
  GET_BRANCH_STORE_ISSUE_TYPE,
  GET_BRANCH_STORE_MAIN_STORE_REQUEST_TYPE,
  GET_MAIN_STORE_REQUEST_ITEMS_TYPE,
  UPDATE_MAIN_STORE_REQUEST_ITEMS_TYPE,
  DELETE_MAIN_STORE_REQUEST_ITEMS_TYPE,
} from "../../../constants/asyncActionsType";
import {
  getAllBranchStoreRequestData,
  branchStoreIssueData,
  getBranchStoreIssueData,
  getBranchStoreMainStoreRequestData,
  getMainStoreRequestItemsData,
  updateMainStoreRequestItemsData,
  deleteMainStoreRequestItemsData,
} from "./branchStoreCrud";

export const getAllBranchStoreRequestList = createAsyncThunkForSlice(
  GET_ALL_BRANCH_STORE_REQUEST_DATA,
  getAllBranchStoreRequestData
);

export const addBranchStoreIssueList = createAsyncThunkForSlice(
  ADD_BRANCH_STORE_ISSUE_DATA,
  branchStoreIssueData,
  { isToast: true }
);

export const getBranchStoreIssueList = createAsyncThunkForSlice(
  GET_BRANCH_STORE_ISSUE_TYPE,
  getBranchStoreIssueData
);

export const getBranchStoreMainStoreRequestList = createAsyncThunkForSlice(
  GET_BRANCH_STORE_MAIN_STORE_REQUEST_TYPE,
  getBranchStoreMainStoreRequestData
);

export const getMainStoreRequestItemsList = createAsyncThunkForSlice(
  GET_MAIN_STORE_REQUEST_ITEMS_TYPE,
  getMainStoreRequestItemsData
);

export const updateMainStoreRequestItemsList = createAsyncThunkForSlice(
  UPDATE_MAIN_STORE_REQUEST_ITEMS_TYPE,
  updateMainStoreRequestItemsData,
  { isToast: true }
);

export const deleteMainStoreRequestItemsList = createAsyncThunkForSlice(
  DELETE_MAIN_STORE_REQUEST_ITEMS_TYPE,
  deleteMainStoreRequestItemsData,
  { isToast: true }
);

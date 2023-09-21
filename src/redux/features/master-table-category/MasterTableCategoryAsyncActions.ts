import createAsyncThunkForSlice from "../../../utils/utils";
import {
  ADD_CATEGORY,
  ADD_CATEGORY_VALUE,
  EDIT_CATEGORY,
  EDIT_CATEGORY_VALUE,
  GET_ALL_CATEGORY,
  GET_ALL_CATEGORY_VALUE,
  GET_CATEGORY_BY_ID,
  GET_CATEGORY_VALUE_BY_ID,
  UPDATE_STATUS_CATEGORY,
  UPDATE_STATUS_CATEGORY_VALUE,
} from "../../../constants/asyncActionsType";
import {
  addCategory,
  addCategoryValue,
  editCategory,
  editCategoryValue,
  getCategoryByID,
  getCategoryValueByID,
  getMasterCategory,
  getMasterCategoryValue,
  updateStatusCategory,
  updateStatusCategoryValue,
} from "./MasterTableCategoryCrud";

// master table management category
export const getAllMasterTableCategory = createAsyncThunkForSlice(
  GET_ALL_CATEGORY,
  getMasterCategory
);
export const getMasterTableCategoryById = createAsyncThunkForSlice(
  GET_CATEGORY_BY_ID,
  getCategoryByID,
  {
    isToast: true,
  }
);
export const addMasterTableCategory = createAsyncThunkForSlice(
  ADD_CATEGORY,
  addCategory,
  {
    isToast: true,
  }
);
export const editMasterTableCategory = createAsyncThunkForSlice(
  EDIT_CATEGORY,
  editCategory,
  {
    isToast: true,
  }
);
export const updateStatusMasterTableCategory = createAsyncThunkForSlice(
  UPDATE_STATUS_CATEGORY,
  updateStatusCategory,
  {
    isToast: true,
  }
);

// master table management category value

export const getAllMasterTableCategoryValue = createAsyncThunkForSlice(
  GET_ALL_CATEGORY_VALUE,
  getMasterCategoryValue
);
export const getMasterTableCategoryValueById = createAsyncThunkForSlice(
  GET_CATEGORY_VALUE_BY_ID,
  getCategoryValueByID,
  {
    isToast: true,
  }
);
export const addMasterTableCategoryValue = createAsyncThunkForSlice(
  ADD_CATEGORY_VALUE,
  addCategoryValue,
  {
    isToast: true,
  }
);
export const editMasterTableCategoryValue = createAsyncThunkForSlice(
  EDIT_CATEGORY_VALUE,
  editCategoryValue,
  {
    isToast: true,
  }
);
export const updateStatusMasterTableCategoryValue = createAsyncThunkForSlice(
  UPDATE_STATUS_CATEGORY_VALUE,
  updateStatusCategoryValue,
  {
    isToast: true,
  }
);

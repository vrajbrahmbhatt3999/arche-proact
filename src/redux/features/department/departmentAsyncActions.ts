import {
  ADD_DEPARTMENT,
  EDIT_DEPARTMENT,
  GET_ALL_DEPARTMENT,
  GET_ALL_DEPARTMENT_DROPDOWNDATA,
  GET_DEPARTMENT_BY_ID,
  UPDATE_DEPARTMENT_STATUS,
} from "../../../constants/asyncActionsType";
import createAsyncThunkForSlice from "../../../utils/utils";
import {
  addDepartments,
  editDepartments,
  getAllDepartmentList,
  getDepartmentByIds,
  updateDepartmentStatuss,
} from "./departmentCrud";
export const getAllDepartment = createAsyncThunkForSlice(
  GET_ALL_DEPARTMENT,
  getAllDepartmentList
);
export const getAllDepartmentDropdownData = createAsyncThunkForSlice(
  GET_ALL_DEPARTMENT_DROPDOWNDATA,
  getAllDepartmentList
);

export const addDepartment = createAsyncThunkForSlice(
  ADD_DEPARTMENT,
  addDepartments,
  {
    isToast: true,
  }
);

export const getDepartmentById = createAsyncThunkForSlice(
  GET_DEPARTMENT_BY_ID,
  getDepartmentByIds,
  {
    isToast: true,
  }
);

export const editDepartment = createAsyncThunkForSlice(
  EDIT_DEPARTMENT,
  editDepartments,
  {
    isToast: true,
  }
);

export const updateDepartmentStatus = createAsyncThunkForSlice(
  UPDATE_DEPARTMENT_STATUS,
  updateDepartmentStatuss,
  {
    isToast: true,
  }
);

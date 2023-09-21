import createAsyncThunkForSlice from "../../../utils/utils";
import {
  GET_ALL_FORMS,
  ADD_NEW_FORM,
  GET_FORM_BY_ID,
  UPDATE_FORM_BY_ID,
  DELETE_FORM_BY_ID,
  UPDATE_STATUS_FOR_FORM_BY_ID,
  GET_ALL_MODULE
} from "../../../constants/asyncActionsType";

import {
  getAllForms,
  addNewForm,
  getFormById,
  updateFormById,
  deleteFormById,
  updateStatusForFormById,
  getAllModules
} from "./createNewFormCrud";

export const getAllCreateNewForms = createAsyncThunkForSlice(
  GET_ALL_FORMS,
  getAllForms
);

export const createNewForm = createAsyncThunkForSlice(
  ADD_NEW_FORM,
  addNewForm,
  {
    isToast: true,
  }
);

export const getAllCreateNewFormById = createAsyncThunkForSlice(
  GET_FORM_BY_ID,
  getFormById
);

export const updateCreateNewFormById = createAsyncThunkForSlice(
  UPDATE_FORM_BY_ID,
  updateFormById,
  {
    isToast: true,
  }
);

export const deleteCreateNewFormById = createAsyncThunkForSlice(
  DELETE_FORM_BY_ID,
  deleteFormById,
  {
    isToast: true,
  }
);

export const updateStatusForCreateNewFormById = createAsyncThunkForSlice(
  UPDATE_STATUS_FOR_FORM_BY_ID,
  updateStatusForFormById,
  {
    isToast: true,
  }
);


export const getAllCreateNewFormModules = createAsyncThunkForSlice(
  GET_ALL_MODULE,
  getAllModules
);
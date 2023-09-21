import {
  ALL_LAB_CATEGORY,
  CREATE_LAB_COMPONENT,
  CREATE_LAB_TEST,
  CREATE_LAB_TEST_PROFILE,
  DELETE_LAB_COMPONENT,
  EDIT_LAB_TEST,
  EDIT_LAB_TEST_PROFILE,
  GET_ALL_LAB_COMPONENT,
  GET_ALL_LAB_SAMPLE_TYPE,
  GET_ALL_LAB_TEST,
  GET_ALL_LAB_TEST_PROFILE,
  GET_ALL_LAB_UNIT,
  GET_LAB_COMPONENT,
  GET_LAB_TEST,
  GET_LAB_TEST_PROFILE,
  UPDATE_LAB_COMPONENT,
} from "../../../constants/asyncActionsType";
import createAsyncThunkForSlice from "../../../utils/utils";
import {
  createComponents,
  createLabTestProfiles,
  createLabTests,
  deleteComponents,
  editLabTestProfiles,
  editLabTests,
  getAllLabComponents,
  getAllLabSampleTypes,
  getAllLabTestProfiles,
  getAllLabTests,
  getAllLabUnits,
  getComponents,
  getLabCategorys,
  getLabTestProfiles,
  getLabTests,
  updateComponents,
} from "./labCrud";

export const getLabCategory = createAsyncThunkForSlice(
  ALL_LAB_CATEGORY,
  getLabCategorys
);

export const getAllLabTestProfile = createAsyncThunkForSlice(
  GET_ALL_LAB_TEST_PROFILE,
  getAllLabTestProfiles
);

export const createLabTestProfile = createAsyncThunkForSlice(
  CREATE_LAB_TEST_PROFILE,
  createLabTestProfiles,
  {
    isToast: true,
  }
);

export const editLabTestProfile = createAsyncThunkForSlice(
  EDIT_LAB_TEST_PROFILE,
  editLabTestProfiles,
  {
    isToast: true,
  }
);

export const getLabTestProfile = createAsyncThunkForSlice(
  GET_LAB_TEST_PROFILE,
  getLabTestProfiles,
  {
    isToast: true,
  }
);

export const getAllLabSampleType = createAsyncThunkForSlice(
  GET_ALL_LAB_SAMPLE_TYPE,
  getAllLabSampleTypes
);

export const getAllLabUnit = createAsyncThunkForSlice(
  GET_ALL_LAB_UNIT,
  getAllLabUnits
);

export const getAllLabComponent = createAsyncThunkForSlice(
  GET_ALL_LAB_COMPONENT,
  getAllLabComponents
);

export const createLabTest = createAsyncThunkForSlice(
  CREATE_LAB_TEST,
  createLabTests,
  {
    isToast: true,
  }
);

export const editLabTest = createAsyncThunkForSlice(
  EDIT_LAB_TEST,
  editLabTests,
  {
    isToast: true,
  }
);

export const getLabTest = createAsyncThunkForSlice(GET_LAB_TEST, getLabTests, {
  isToast: true,
});

export const getAllLabTest = createAsyncThunkForSlice(
  GET_ALL_LAB_TEST,
  getAllLabTests
);

export const createLabComponent = createAsyncThunkForSlice(
  CREATE_LAB_COMPONENT,
  createComponents,
  {
    isToast: true,
  }
);

export const getLabComponent = createAsyncThunkForSlice(
  GET_LAB_COMPONENT,
  getComponents
);

export const updateLabComponent = createAsyncThunkForSlice(
  UPDATE_LAB_COMPONENT,
  updateComponents,
  {
    isToast: true,
  }
);

export const deleteComponent = createAsyncThunkForSlice(
  DELETE_LAB_COMPONENT,
  deleteComponents,
  {
    isToast: true,
  }
);

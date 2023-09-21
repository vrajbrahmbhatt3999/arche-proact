import { ALL_RADIOLOGY_CATEGORY, CREATE_RADIOLOGY_TEST, CREATE_RADIOLOGY_TEST_PROFILE, EDIT_RADIOLOGY_TEST, EDIT_RADIOLOGY_TEST_PROFILE, GET_ALL_RADIOLOGY_TEST, GET_ALL_RADIOLOGY_TEST_PROFILE, GET_RADIOLOGY_TEST, GET_RADIOLOGY_TEST_PROFILE } from "../../../constants/asyncActionsType";
import createAsyncThunkForSlice from "../../../utils/utils";
import { createRadiologyTestProfiles, createRadiologyTests, editRadiologyTestProfiles, editRadiologyTests, getAllRadiologyCategorys, getAllRadiologyTestProfiles, getAllRadiologyTests, getRadiologyTestProfiles, getRadiologyTests } from "./radiologyCrud";

export const getAllRadiologyCategory = createAsyncThunkForSlice(
    ALL_RADIOLOGY_CATEGORY,
    getAllRadiologyCategorys
)

export const getAllRadiologyTest = createAsyncThunkForSlice(
    GET_ALL_RADIOLOGY_TEST,
    getAllRadiologyTests
)

export const createRadiologyTest = createAsyncThunkForSlice(
    CREATE_RADIOLOGY_TEST,
    createRadiologyTests,
    {
        isToast: true
    }
)

export const editRadiologyTest = createAsyncThunkForSlice(
    EDIT_RADIOLOGY_TEST,
    editRadiologyTests,
    {
        isToast: true
    }
)

export const getRadiologyTest = createAsyncThunkForSlice(
    GET_RADIOLOGY_TEST,
    getRadiologyTests
)

export const getAllRadiologyTestProfile = createAsyncThunkForSlice(
    GET_ALL_RADIOLOGY_TEST_PROFILE,
    getAllRadiologyTestProfiles
)

export const createRadiologyTestProfile = createAsyncThunkForSlice(
    CREATE_RADIOLOGY_TEST_PROFILE,
    createRadiologyTestProfiles,
    {
        isToast: true
    }
)

export const editRadiologyTestProfile = createAsyncThunkForSlice(
    EDIT_RADIOLOGY_TEST_PROFILE,
    editRadiologyTestProfiles,
    {
        isToast: true
    }
)

export const getRadiologyTestProfile = createAsyncThunkForSlice(
    GET_RADIOLOGY_TEST_PROFILE,
    getRadiologyTestProfiles
)

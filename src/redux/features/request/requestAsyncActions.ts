import {
  ADD_PATIENT_REQUESTS_TYPE,
  GET_LAB_TESTS_TYPE,
  GET_RADIOLOGY_TESTS_TYPE,
  GET_TEST_NAME_BY_INSURANCE_NAME_TYPE,
} from "../../../constants/asyncActionsType";
import createAsyncThunkForSlice from "../../../utils/utils";
import {
  addPatientReqeusts,
  getAllLabTests,
  getAllRadiologyTests,
  getTestNameByInsuranceName,
} from "./requestCrud";

export const addPatientRequestList = createAsyncThunkForSlice(
  ADD_PATIENT_REQUESTS_TYPE,
  addPatientReqeusts,
  { isToast: true }
);

export const getLabTestsList = createAsyncThunkForSlice(
  GET_LAB_TESTS_TYPE,
  getAllLabTests
);

export const getRadiologyTestsList = createAsyncThunkForSlice(
  GET_RADIOLOGY_TESTS_TYPE,
  getAllRadiologyTests
);

export const getTestsListByInsuranceNameList = createAsyncThunkForSlice(
  GET_TEST_NAME_BY_INSURANCE_NAME_TYPE,
  getTestNameByInsuranceName
);

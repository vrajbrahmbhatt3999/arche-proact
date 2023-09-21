import axios from "axios";
import { IAPIPayload } from "../../../interfaces/apiInterface";
import {
  CREATE_LAB_TEST_PROFILE,
  GET_ALL_LAB_TEST_PROFILE,
  ALL_LAB_CATEGORY,
  GET_ALL_LAB_SAMPLE_TYPE,
  GET_ALL_LAB_UNIT,
  GET_ALL_LAB_COMPONENT,
  CREATE_LAB_TEST,
  GET_ALL_LAB_TEST,
  EDIT_LAB_TEST_PROFILE,
  GET_LAB_TEST_PROFILE,
  GET_LAB_TEST,
  EDIT_LAB_TEST,
  CREATE_LAB_COMPONENT,
  GET_LAB_COMPONENT,
  UPDATE_LAB_COMPONENT,
  DELETE_LAB_COMPONENT,
} from "../../../config/config";

export const getLabCategorys = (data: IAPIPayload) => {
  return axios.post(ALL_LAB_CATEGORY, data);
};

export const getAllLabTestProfiles = (data: IAPIPayload) => {
  return axios.post(GET_ALL_LAB_TEST_PROFILE, data);
};

export const createLabTestProfiles = (data: IAPIPayload) => {
  return axios.post(CREATE_LAB_TEST_PROFILE, data);
};

export const editLabTestProfiles = (data: IAPIPayload) => {
  return axios.post(EDIT_LAB_TEST_PROFILE, data);
};

export const getLabTestProfiles = (data: IAPIPayload) => {
  return axios.post(GET_LAB_TEST_PROFILE, data);
};

export const getAllLabSampleTypes = (data: IAPIPayload) => {
  return axios.post(GET_ALL_LAB_SAMPLE_TYPE, data);
};

export const getAllLabUnits = (data: IAPIPayload) => {
  return axios.post(GET_ALL_LAB_UNIT, data);
};

export const getAllLabComponents = (data: IAPIPayload) => {
  return axios.post(GET_ALL_LAB_COMPONENT, data);
};

export const createLabTests = (data: IAPIPayload) => {
  return axios.post(CREATE_LAB_TEST, data);
};

export const editLabTests = (data: IAPIPayload) => {
  return axios.post(EDIT_LAB_TEST, data);
};

export const getLabTests = (data: IAPIPayload) => {
  return axios.post(GET_LAB_TEST, data);
};

export const getAllLabTests = (data: IAPIPayload) => {
  return axios.post(GET_ALL_LAB_TEST, data);
};

export const createComponents = (data: IAPIPayload) => {
  return axios.post(CREATE_LAB_COMPONENT, data);
};

export const getComponents = (data: IAPIPayload) => {
  return axios.post(GET_LAB_COMPONENT, data);
};

export const updateComponents = (data: IAPIPayload) => {
  return axios.post(UPDATE_LAB_COMPONENT, data);
};

export const deleteComponents = (data: IAPIPayload) => {
  return axios.post(DELETE_LAB_COMPONENT, data);
};

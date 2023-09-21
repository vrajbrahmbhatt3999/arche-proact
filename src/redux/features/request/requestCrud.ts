import axios from "axios";
import { IAPIPayload } from "../../../interfaces/apiInterface";
import {
  ADD_PATIENT_REQUESTS_DATA,
  GET_ALL_LAB_TEST_DATA,
  GET_ALL_RADIOLOGY_TEST_DATA,
  GET_TEST_NAME_BY_INSURANCE_NAME,
} from "../../../config/config";

export const addPatientReqeusts = (data: IAPIPayload) => {
  return axios.post(ADD_PATIENT_REQUESTS_DATA, data);
};

export const getAllLabTests = (data: IAPIPayload) => {
  return axios.post(GET_ALL_LAB_TEST_DATA, data);
};

export const getAllRadiologyTests = (data: IAPIPayload) => {
  return axios.post(GET_ALL_RADIOLOGY_TEST_DATA, data);
};

export const getTestNameByInsuranceName = (data: IAPIPayload) => {
  return axios.post(GET_TEST_NAME_BY_INSURANCE_NAME, data);
};

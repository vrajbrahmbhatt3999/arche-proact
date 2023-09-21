import axios from "axios";
import { IAPIPayload } from "../../../interfaces/apiInterface";
import {
  GET_ALL_REQUESTS_DATA,
  REQUEST_STATUS_CHANGE,
} from "../../../config/config";

export const getAllRadiologyReqeusts = (data: IAPIPayload) => {
  return axios.post(GET_ALL_REQUESTS_DATA, data);
};

export const changeRadiologyJobStatus = (data: IAPIPayload) => {
  return axios.post(REQUEST_STATUS_CHANGE, data);
};

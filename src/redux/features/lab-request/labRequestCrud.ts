import axios from "axios";
import { IAPIPayload } from "../../../interfaces/apiInterface";
import {
  GET_ALL_REQUESTS_DATA,
  REQUEST_STATUS_CHANGE,
} from "../../../config/config";

export const getAllLabReqeusts = (data: IAPIPayload) => {
  return axios.post(GET_ALL_REQUESTS_DATA, data);
};

export const changeLabJobStatus = (data: IAPIPayload) => {
  return axios.post(REQUEST_STATUS_CHANGE, data);
};

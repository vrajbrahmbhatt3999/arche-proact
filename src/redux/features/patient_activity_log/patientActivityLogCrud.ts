import axios from "axios";
import { GET_ALL_PATIENT_ACTIVITY_LOG } from "../../../config/config";
import { IAPIPayload } from "../../../interfaces/apiInterface";

export const getAllPatientActivity = (data: IAPIPayload) => {
  return axios.post(GET_ALL_PATIENT_ACTIVITY_LOG, data);
};
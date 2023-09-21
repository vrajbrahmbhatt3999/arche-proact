import axios from "axios";
import { GET_ALL_TAG } from "../../../../config/config";
import { IAPIPayload } from "../../../../interfaces/apiInterface";

export const getAllTags = (data: IAPIPayload) => {
  return axios.post(GET_ALL_TAG, data);
};

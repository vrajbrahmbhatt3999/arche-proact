import axios from "axios";
import {
  ALL_LAB_JOBS,
  ATTACHMENTSAPI,
  CREATELABJOB,
  GETADDRESULT,
  LABJOBDOCUMENTS,
  LOADFILEAPI,
  UPDATEADDRESULT,
  UPDATELABJOBS,
} from "../../../config/config";

export const CreateJobsCrud = (data: any) => {
  return axios.post(CREATELABJOB, data);
};

export const ViewJobsData = (data: any) => {
  return axios.post(ALL_LAB_JOBS, data);
};

export const UpdateJobsApi = (data: any) => {
  return axios.post(UPDATELABJOBS, data);
};

export const DocumentsJobsApi = (data: any) => {
  return axios.post(LABJOBDOCUMENTS, data);
};

export const AttachmentsJobsApi = (data: any) => {
  return axios.post(ATTACHMENTSAPI, data);
};

export const LoadFilesApi = (data: any) => {
  return axios.post(LOADFILEAPI, data);
};

export const GetAddResultData = (data: any) => {
  return axios.post(GETADDRESULT, data);
};

export const UpdateAddResultApi = (data: any) => {
  return axios.post(UPDATEADDRESULT, data);
};

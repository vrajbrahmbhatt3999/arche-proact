import createAsyncThunkForSlice from "../../../utils/utils";
import {
  AttachmentsJobsApi,
  CreateJobsCrud,
  DocumentsJobsApi,
  GetAddResultData,
  LoadFilesApi,
  UpdateAddResultApi,
  UpdateJobsApi,
  ViewJobsData,
} from "./createJobs";
import {
  ATTACHMENTS_LAB_JOBS,
  CREATE_JOBS_LAB_TYPE,
  DOCUMENT_LAB_JOBS,
  GETADDRESULTJOBS,
  LOAD_FILES_JOBS,
  UPATE_LAB_JOBS_TYPE,
  UPDATEADDRESULTJOBS,
  VIEW_JOBS_LAB_TYPE,
} from "../../../constants/asyncActionsType";

export const createJobsAsyncData = createAsyncThunkForSlice(
  CREATE_JOBS_LAB_TYPE,
  CreateJobsCrud,
  {
    isToast: true,
  }
);

export const ViewJobsAsyncData = createAsyncThunkForSlice(
  VIEW_JOBS_LAB_TYPE,
  ViewJobsData
);

export const UpdateLabJobsAsyncData = createAsyncThunkForSlice(
  UPATE_LAB_JOBS_TYPE,
  UpdateJobsApi,
  {
    isToast: true,
  }
);

export const DocumentJobsAsyncData = createAsyncThunkForSlice(
  DOCUMENT_LAB_JOBS,
  DocumentsJobsApi
);

export const AttachmentsJobsAsyncData = createAsyncThunkForSlice(
  ATTACHMENTS_LAB_JOBS,
  AttachmentsJobsApi
);

export const LoadFilesAsyncData = createAsyncThunkForSlice(
  LOAD_FILES_JOBS,
  LoadFilesApi
);

export const GetAllAddResultData = createAsyncThunkForSlice(
  GETADDRESULTJOBS,
  GetAddResultData
);

export const UpdateAllAddResultData = createAsyncThunkForSlice(
  UPDATEADDRESULTJOBS,
  UpdateAddResultApi
);

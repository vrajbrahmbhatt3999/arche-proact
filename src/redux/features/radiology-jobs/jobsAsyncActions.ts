import createAsyncThunkForSlice from "../../../utils/utils";
import {
  AttachmentsJobsApi,
  CreateJobsCrud,
  DocumentsJobsApi,
  LoadFilesApi,
  UpdateJobsApi,
  ViewJobsData,
} from "./createJobs";
import {
  RADIOLOGY_ATTACHMENTS_JOBS,
  RADIOLOGY_CREATE_JOBS_TYPE,
  RADIOLOGY_DOCUMENT_JOBS,
  RADIOLOGY_LOAD_FILES_JOBS,
  RADIOLOGY_UPATE_JOBS_TYPE,
  RADIOLOGY_VIEW_JOBS_TYPE,
} from "../../../constants/asyncActionsType";

// export const CreateRadiologyJobsAsyncData = createAsyncThunkForSlice(
//   CREATE_JOBS_RADIOLOGY_TYPE,
//   CreateJobsCrud,
//   {
//     isToast: true,
//   }
// );

// export const ViewRadiologyJobsAsyncData = createAsyncThunkForSlice(
//   VIEW_JOBS_RADIOLOGY_TYPE,
//   ViewJobsData,
// )

export const createJobsAsyncData = createAsyncThunkForSlice(
  RADIOLOGY_CREATE_JOBS_TYPE,
  CreateJobsCrud,
  {
    isToast: true,
  }
);

export const ViewJobsAsyncData = createAsyncThunkForSlice(
  RADIOLOGY_VIEW_JOBS_TYPE,
  ViewJobsData
);

export const UpdateLabJobsAsyncData = createAsyncThunkForSlice(
  RADIOLOGY_UPATE_JOBS_TYPE,
  UpdateJobsApi,
  {
    isToast: true,
  }
);

export const DocumentJobsAsyncData = createAsyncThunkForSlice(
  RADIOLOGY_DOCUMENT_JOBS,
  DocumentsJobsApi
);

export const AttachmentsJobsAsyncData = createAsyncThunkForSlice(
  RADIOLOGY_ATTACHMENTS_JOBS,
  AttachmentsJobsApi
);

export const LoadFilesAsyncData = createAsyncThunkForSlice(
  RADIOLOGY_LOAD_FILES_JOBS,
  LoadFilesApi
)

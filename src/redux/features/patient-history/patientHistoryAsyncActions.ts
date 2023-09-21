import {
  CHANGE_PATIENT_DIAG_STATUS,
  GET_PATIENT_INFO_TYPE,
  GET_PATIENT_HISTORY_TYPE,
  GET_PATIENT_DIAG_ATTACHMENTS_TYPE,
  GET_PATIENT_DIAGNOSIS_DETAIL,
  GET_PATIENT_ATTACHMENTS,
  GET_PATIENT_IMAGES,
  GET_ALL_COMPARE_DOCUMENTS_TYPE,
  GET_PATIENT_DENTAL_INFO_TYPE
} from '../../../constants/asyncActionsType'
import createAsyncThunkForSlice from '../../../utils/utils'
import {
  changePatientStatus,
  getPatientInformation,
  getPatientHistory,
  getAllPatientHistoryDiagAttachments,
  getPatientDiagnosisDetail,
  getPatientAttachments,
  getPatientImages,
  getCompareDocuments,
  getPatientDentalInformation
} from './patientHistoryCrud'

export const getPatientInformationById = createAsyncThunkForSlice(
  GET_PATIENT_INFO_TYPE,
  getPatientInformation
)

export const changePatientDiaogStatus = createAsyncThunkForSlice(
  CHANGE_PATIENT_DIAG_STATUS,
  changePatientStatus
)

export const getPatientHistoryById = createAsyncThunkForSlice(
  GET_PATIENT_HISTORY_TYPE,
  getPatientHistory
)

export const getPatientHistoryDiagAttachments = createAsyncThunkForSlice(
  GET_PATIENT_DIAG_ATTACHMENTS_TYPE,
  getAllPatientHistoryDiagAttachments
)

export const getPatientDiagnosisDetailById = createAsyncThunkForSlice(
  GET_PATIENT_DIAGNOSIS_DETAIL,
  getPatientDiagnosisDetail
)

export const getPatientAttachmentsById = createAsyncThunkForSlice(
  GET_PATIENT_ATTACHMENTS,
  getPatientAttachments
)

export const getPatientImagesById = createAsyncThunkForSlice(
  GET_PATIENT_IMAGES,
  getPatientImages
)

export const getCompareDocumentsById = createAsyncThunkForSlice(
  GET_ALL_COMPARE_DOCUMENTS_TYPE,
  getCompareDocuments
)

export const getPatientDentalInformationById = createAsyncThunkForSlice(
  GET_PATIENT_DENTAL_INFO_TYPE,
  getPatientDentalInformation
)

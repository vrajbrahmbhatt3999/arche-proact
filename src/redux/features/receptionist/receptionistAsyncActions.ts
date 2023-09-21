import createAsyncThunkForSlice from "../../../utils/utils";
import {
  GET_All_DOCTOR_LIST_BY_ID,
  GET_ALL_LIST_DENTIST,
  GET_All_LIST_DOCTOR,
  GET_All_MC_NEWS,
  GET_All_MC_NEWS_BY_ID,
  QUESTIONNAIRE_OTP_RESEND,
  QUESTIONNAIRE_OTP_SEND,
  QUESTIONNAIRE_OTP_VERIFY,
  SHARE_QUESTIONNAIRE_LINK,
} from "../../../constants/asyncActionsType";
import {
  CREATE_TODO_LIST,
  DELETE_TODO_LIST,
  GET_ALL_TODO_LIST,
  GET_ALL_TODO_LIST_BY_ID,
  UPDATE_TODO_LIST,
} from "../../../constants/asyncActionsType";

import {
  questionnaireOtpSend,
  questionnaireOtpVerify,
  createTodo,
  deleteTodo,
  getTodoList,
  getTodoListById,
  shareQuestionnaireLinks,
  updateTodo,
  // questionnaireOtpSend,
  // questionnaireOtpVerify,
  questionnaireOtpReSend,
  getReceiptionistNews,
  getDoctorList,
  getDoctorListByID,
  getDentistList,
  // getReceiptionistNewsByID,
} from "./receptionistCrud";

export const shareQuestionnaireLink = createAsyncThunkForSlice(
  SHARE_QUESTIONNAIRE_LINK,
  shareQuestionnaireLinks,
  {
    isToast: true,
  }
);
export const questionnairesOtpSend = createAsyncThunkForSlice(
  QUESTIONNAIRE_OTP_SEND,
  questionnaireOtpSend,
  {
    isToast: true,
  }
);
export const getAllTodoList = createAsyncThunkForSlice(
  GET_ALL_TODO_LIST,
  getTodoList
);

export const getAllTodoListById = createAsyncThunkForSlice(
  GET_ALL_TODO_LIST_BY_ID,
  getTodoListById
);

export const createTodoList = createAsyncThunkForSlice(
  CREATE_TODO_LIST,
  createTodo,
  {
    isToast: true,
  }
);

export const questionnairesOtpReSend = createAsyncThunkForSlice(
  QUESTIONNAIRE_OTP_RESEND,
  questionnaireOtpReSend,
  {
    isToast: true,
  }
);
export const updateTodoList = createAsyncThunkForSlice(
  UPDATE_TODO_LIST,
  updateTodo,
  {
    isToast: true,
  }
);

export const questionnairesOtpVerify = createAsyncThunkForSlice(
  QUESTIONNAIRE_OTP_VERIFY,
  questionnaireOtpVerify,
  {
    isToast: true,
  }
);
export const deleteTodoList = createAsyncThunkForSlice(
  DELETE_TODO_LIST,
  deleteTodo,
  {
    isToast: true,
  }
);

// mc news
export const getAllMedicalCenterNews = createAsyncThunkForSlice(
  GET_All_MC_NEWS,
  getReceiptionistNews
);

// mc news by id
// export const getAllMedicalCenterNewsByID = createAsyncThunkForSlice(
//   GET_All_MC_NEWS_BY_ID,
//   getReceiptionistNewsByID
// );

// receiptionist: dashboard setup 2 -> doctor list
export const getAllDoctorList = createAsyncThunkForSlice(
  GET_All_LIST_DOCTOR,
  getDoctorList
);

export const getAllDentistList = createAsyncThunkForSlice(
  GET_ALL_LIST_DENTIST,
  getDentistList
);

export const getDoctorById = createAsyncThunkForSlice(
  GET_All_DOCTOR_LIST_BY_ID,
  getDoctorListByID
);

import axios from "axios";
import {
  QUESTIONNAIRE_OTP_RESEND,
  QUESTIONNAIRE_OTP_SEND,
  QUESTIONNAIRE_OTP_VERIFY,
  SHARE_QUESTIONNAIRE_LINK,
  CREATE_TODO,
  DELETE_TODO,
  GET_ALL_LIST,
  GET_ALL_LIST_BY_ID,
  UPDATE_TODO,
  PROACT_NEWS,
  GET_ALL_DOCTOR_LIST,
  GET_ALL_DENTIST_LIST,
  GET_ALL_DOCTOR_BY_ID,
  // PROACT_NEWS_BY_ID,
} from "../../../config/config";
import { IAPIPayload } from "../../../interfaces/apiInterface";

export const shareQuestionnaireLinks = (data: IAPIPayload) => {
  return axios.post(SHARE_QUESTIONNAIRE_LINK, data);
};

export const questionnaireOtpSend = (data: IAPIPayload) => {
  return axios.post(QUESTIONNAIRE_OTP_SEND, data);
};

export const questionnaireOtpReSend = (data: IAPIPayload) => {
  return axios.post(QUESTIONNAIRE_OTP_RESEND, data);
};

export const questionnaireOtpVerify = (data: IAPIPayload) => {
  return axios.post(QUESTIONNAIRE_OTP_VERIFY, data);
};
// export const questionnairesOtpSend = (data: IAPIPayload) => {
//   return axios.post(QUESTIONNAIRE_OTP_SEND);
// }

// Todo: receiptionist module
export const getTodoList = (data: IAPIPayload) => {
  return axios.post(GET_ALL_LIST, data);
};

export const getTodoListById = (data: IAPIPayload) => {
  return axios.post(GET_ALL_LIST_BY_ID, data);
};

export const createTodo = (data: IAPIPayload) => {
  return axios.post(CREATE_TODO, data);
};

export const updateTodo = (data: IAPIPayload) => {
  return axios.post(UPDATE_TODO, data);
};

export const deleteTodo = (data: IAPIPayload) => {
  return axios.post(DELETE_TODO, data);
};

export const getDoctorList = (data: IAPIPayload) => {
  return axios.post(GET_ALL_DOCTOR_LIST, data);
};
export const getDentistList = (data: IAPIPayload) => {
  return axios.post(GET_ALL_DENTIST_LIST, data);
};

export const getDoctorListByID = (data: IAPIPayload) => {
  return axios.post(GET_ALL_DOCTOR_BY_ID, data);
};

export const getReceiptionistNews = (data: IAPIPayload) => {
  return axios.post(PROACT_NEWS, data);
};
// export const getReceiptionistNewsByID = (data: IAPIPayload) => {
//   return axios.post(PROACT_NEWS_BY_ID, data);
// };

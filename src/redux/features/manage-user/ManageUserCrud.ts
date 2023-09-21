import axios from 'axios'
import { IAPIPayload } from '../../../interfaces/apiInterface'
import {
  CREATE_MANAGE_USER,
  CREATE_USER_SHIFT_URL,
  EDIT_MANAGE_USER_URL,
  GET_ALL_MANAGE_USER,
  GET_ALL_MANAGE_USER_BY_ROLE_URL,
  GET_USER_BY_ID_URL,
  GET_USER_SHIFT_BY_ID_URL,
  UPDATE_STATUS_MANAGE_USER,
  UPDATE_USER_SHIFT_URL,
} from '../../../config/config'

export const getManageUser = (data: IAPIPayload) => {
  return axios.post(GET_ALL_MANAGE_USER, data)
}
export const updateStatusManageUser = (data: IAPIPayload) => {
  return axios.post(UPDATE_STATUS_MANAGE_USER, data)
}
export const getManageUserByID = (data: IAPIPayload) => {
  return axios.post(GET_USER_BY_ID_URL, data)
}
export const createManageUser = (data: IAPIPayload) => {
  return axios.post(CREATE_MANAGE_USER, data)
}
export const editManageUser = (data: IAPIPayload) => {
  return axios.post(EDIT_MANAGE_USER_URL, data)
}

export const addUserShift = (data: IAPIPayload) => {
  return axios.post(CREATE_USER_SHIFT_URL, data)
}

export const updateShift = (data: IAPIPayload) => {
  return axios.post(UPDATE_USER_SHIFT_URL, data)
}

export const getShiftById = (data: IAPIPayload) => {
  return axios.post(GET_USER_SHIFT_BY_ID_URL, data)
}

export const getAllUserByRole = (data: IAPIPayload) => {
  return axios.post(GET_ALL_MANAGE_USER_BY_ROLE_URL, data)
}

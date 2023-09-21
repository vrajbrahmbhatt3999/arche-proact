import axios from 'axios'
import {
  CREATE_PERMISSIONS_URL,
  CREATE_SECONDARY_ROLE_URL,
  GET_ALL_ROLE_URL,
  GET_PERMISSIONS_BY_ID_URL,
  GET_USERS_PERMISSIONS_URL,
  UPDATE_PERMISSIONS_URL,
} from '../../../config/config'
import { IAPIPayload } from '../../../interfaces/apiInterface'

export const getPermissions = (data: IAPIPayload) => {
  return axios.post(GET_USERS_PERMISSIONS_URL, data)
}

export const createRole = (data: IAPIPayload) => {
  return axios.post(CREATE_SECONDARY_ROLE_URL, data)
}

export const getallroles = (data: IAPIPayload) => {
  return axios.post(GET_ALL_ROLE_URL, data)
}

export const createpermissions = (data: IAPIPayload) => {
  return axios.post(CREATE_PERMISSIONS_URL, data)
}

export const updatepermissions = (data: IAPIPayload) => {
  return axios.post(UPDATE_PERMISSIONS_URL, data)
}

export const getpermissionbyid = (data: IAPIPayload) => {
  return axios.post(GET_PERMISSIONS_BY_ID_URL, data)
}

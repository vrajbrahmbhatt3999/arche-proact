import axios from 'axios'
import { IAPIPayload } from '../../../interfaces/apiInterface'
import {
  CREATE_USERGROUP_URL,
  GET_USERGROUP_PERMISSION_URL,
  GET_USERGROUP_URL,
  UPDATE_USERGROUP_PERMISSIONS_URL,
  UPDATE_USERGROUP_STATUS_BY_ID_URL,
} from '../../../config/config'

// create usergroup
export const addUsergroup = (data: IAPIPayload) => {
  return axios.post(CREATE_USERGROUP_URL, data)
}

// get all usergrouplist
export const getUsergroupList = (data: IAPIPayload) => {
  return axios.post(GET_USERGROUP_URL, data)
}

// update usergroups permissons
export const updateUsergroupList = (data: IAPIPayload) => {
  return axios.post(UPDATE_USERGROUP_PERMISSIONS_URL, data)
}

// get usergroups permissons by id
export const getUsergroupPermissions = (data: IAPIPayload) => {
  return axios.post(GET_USERGROUP_PERMISSION_URL, data)
}

// get usergroups permissons by id
export const updateUserGroupStatusById = (data: IAPIPayload) => {
  return axios.post(UPDATE_USERGROUP_STATUS_BY_ID_URL, data)
}

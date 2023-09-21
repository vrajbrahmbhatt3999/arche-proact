import axios from 'axios'
import { IAPIPayload } from '../../../interfaces/apiInterface'
import { GET_USER_ROLE } from '../../../config/config'

export const getRoleUser = (data: IAPIPayload) => {
  return axios.post(GET_USER_ROLE, data)
}

export const updaterolestatus = (data: IAPIPayload) => {
  return axios.post(GET_USER_ROLE, data)
}

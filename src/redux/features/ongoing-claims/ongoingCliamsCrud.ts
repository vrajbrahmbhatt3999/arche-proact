import axios from 'axios'
import { IAPIPayload } from '../../../interfaces/apiInterface'
import {
  CREATE_CLAIM_URL,
  GET_ALL_ONGOING_CLAIMS_URL,
  GET_PANDING_CLAIMS_URL,
  UPDATE_CLAIM_URL,
} from '../../../config/config'

export const getAllOngoingClaimsByStatus = (data: IAPIPayload) => {
  return axios.post(GET_ALL_ONGOING_CLAIMS_URL, data)
}

export const getPandingClaimsByStatus = (data: IAPIPayload) => {
  return axios.post(GET_PANDING_CLAIMS_URL, data)
}

export const createnewclaim = (data: IAPIPayload) => {
  return axios.post(CREATE_CLAIM_URL, data)
}

export const createsettledclaims = (data: IAPIPayload) => {
  console.log('payload settled', data)
  return axios.post(UPDATE_CLAIM_URL, data)
}

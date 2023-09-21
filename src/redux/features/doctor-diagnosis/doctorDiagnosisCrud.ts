import axios from 'axios'
import { IAPIPayload } from '../../../interfaces/apiInterface'
import {
  CREATE_DIAGNOSIS_URL,
  GET_DIAGNOSIS_SEARCH_TAG_URL,
  GET_DIAGNOSIS_TAG,
  UPDATE_DIAGNOSIS_URL,
} from '../../../config/config'

export const creatediagnosis = (data: IAPIPayload) => {
  return axios.post(CREATE_DIAGNOSIS_URL, data)
}

export const updatediagnosis = (data: IAPIPayload) => {
  return axios.post(UPDATE_DIAGNOSIS_URL, data)
}

export const getdiagnosisSearchTags = (data: IAPIPayload) => {
  return axios.post(GET_DIAGNOSIS_SEARCH_TAG_URL, data)
}

export const getDiagnosisTags = (data: IAPIPayload) => {
  return axios.post(GET_DIAGNOSIS_TAG, data)
}

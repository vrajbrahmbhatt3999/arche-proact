import axios from 'axios';
import { IAPIPayload } from "../../../interfaces/apiInterface";
import { ALL_RADIOLOGY_CATEGORY, CREATE_RADIOLOGY_TEST, CREATE_RADIOLOGY_TEST_PROFILE, EDIT_RADIOLOGY_TEST, EDIT_RADIOLOGY_TEST_PROFILE, GET_ALL_RADIOLOGY_TEST, GET_ALL_RADIOLOGY_TEST_PROFILE, GET_RADIOLOGY_TEST, GET_RADIOLOGY_TEST_PROFILE } from '../../../config/config';

export const getAllRadiologyCategorys = (data: IAPIPayload) => {
    return axios.post(ALL_RADIOLOGY_CATEGORY, data)
}

export const getAllRadiologyTests = (data: IAPIPayload) => {
    return axios.post(GET_ALL_RADIOLOGY_TEST, data)
}

export const createRadiologyTests = (data: IAPIPayload) => {
    return axios.post(CREATE_RADIOLOGY_TEST, data)
}

export const editRadiologyTests = (data: IAPIPayload) => {
    return axios.post(EDIT_RADIOLOGY_TEST, data)
}

export const getRadiologyTests = (data: IAPIPayload) => {
    return axios.post(GET_RADIOLOGY_TEST, data)
}

export const getAllRadiologyTestProfiles = (data: IAPIPayload) => {
    return axios.post(GET_ALL_RADIOLOGY_TEST_PROFILE, data)
}

export const createRadiologyTestProfiles = (data: IAPIPayload) => {
    return axios.post(CREATE_RADIOLOGY_TEST_PROFILE, data)
}

export const editRadiologyTestProfiles = (data: IAPIPayload) => {
    return axios.post(EDIT_RADIOLOGY_TEST_PROFILE, data)
}

export const getRadiologyTestProfiles = (data: IAPIPayload) => {
    return axios.post(GET_RADIOLOGY_TEST_PROFILE, data)
}
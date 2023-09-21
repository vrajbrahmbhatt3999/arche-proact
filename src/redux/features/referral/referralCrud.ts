import axios from "axios";
import { IAPIPayload } from "../../../interfaces/apiInterface";
import { ADD_PATIENT_REFERRAL, GET_INTERNAL_DOCTOR, GET_OUTSIDE_REFERRAL_DOCTOR, GET_RECEPTIONIST_NAME } from "../../../config/config";

export const getAllPatientReferralList = (data: IAPIPayload) => {
    return axios.post(ADD_PATIENT_REFERRAL, data);
  };
  
  export const getAllOutsideDoctorReferralList = (data: IAPIPayload) => {
    return axios.post(GET_OUTSIDE_REFERRAL_DOCTOR, data);
  };
  

  export const getAllinternalDoctorReferralList = (data: IAPIPayload) => {
    return axios.post(GET_INTERNAL_DOCTOR, data);
  };
  export const getAllreceptionistList = (data: IAPIPayload) => {
    return axios.post(GET_RECEPTIONIST_NAME, data);
  };
  
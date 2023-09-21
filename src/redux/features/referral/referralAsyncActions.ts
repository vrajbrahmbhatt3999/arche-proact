import { ADD_PATIENT_REFERRAL, GET_INTERNAL_DOCTOR, GET_OUTSIDE_REFERRAL_DOCTOR, GET_RECEPTIONIST_NAME } from "../../../config/config";
import createAsyncThunkForSlice from "../../../utils/utils";
import { getAllOutsideDoctorReferralList, getAllPatientReferralList, getAllinternalDoctorReferralList, getAllreceptionistList } from "./referralCrud";

export const getAllReferral= createAsyncThunkForSlice(
    ADD_PATIENT_REFERRAL,
    getAllPatientReferralList,
    {
      isToast: true,
    }
  )

  export const getAllOutsideDocotorReferral= createAsyncThunkForSlice(
    GET_OUTSIDE_REFERRAL_DOCTOR,
    getAllOutsideDoctorReferralList,
    {
      isToast: true,
    }
  )

  
  export const getAllInternalDocotorReferral= createAsyncThunkForSlice(
    GET_INTERNAL_DOCTOR,
    getAllinternalDoctorReferralList,
    {
      isToast: true,
    
}
  )
  

  export const getAllReceptionistName= createAsyncThunkForSlice(
    GET_RECEPTIONIST_NAME,
    getAllreceptionistList,
    {
      isToast: true,
    
}
  )
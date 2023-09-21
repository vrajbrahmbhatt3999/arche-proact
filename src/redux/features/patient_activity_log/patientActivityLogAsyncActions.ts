import { GET_ALL_PATIENT_ACTIVITY_LOG } from "../../../constants/asyncActionsType";
import createAsyncThunkForSlice from "../../../utils/utils";
import { getAllPatientActivity } from "./patientActivityLogCrud";

export const getAllPatientActivityLog = createAsyncThunkForSlice(
  GET_ALL_PATIENT_ACTIVITY_LOG,
  getAllPatientActivity
);

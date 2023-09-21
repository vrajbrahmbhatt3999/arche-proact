import {
  FILE_NO,
  PATIENT_STATUS,
  PATIENT_NAME,
  PATIENT_GENDER,
  PATIENT_AGE,
  PATIENT_ATTENDED_BY,
  PATIENT_LAST_APPT_DATE,
  PATIENT_APPT_NOTE,
} from '../constants/patientInformationConstant'

export interface IPatientInformationForm {
  [FILE_NO]: string
  [PATIENT_STATUS]: string
  [PATIENT_NAME]: string
  [PATIENT_GENDER]: string
  [PATIENT_AGE]: string
  [PATIENT_ATTENDED_BY]: string
  [PATIENT_LAST_APPT_DATE]: string
  [PATIENT_APPT_NOTE]: string
}

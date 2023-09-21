import {
  PATIENT_NAME,
  FILE_NO,
  DOCTOR_NAME,
  BOOKING_DATE,
  START_TIME,
  END_TIME,
  MOBILE_NO,
  RECURRING_DOCTOR_NAME,
  SESSION,
  RECURRING_START_DATE,
  TYPE,
  RECURRING_START_TIME,
  RECURRING_END_TIME,
  INTERVAL,
  NOTES,
  DAY,
  AVAILABLE_SLOT,
  PATINET_MOBILE_NO,
  APPOINTMENT_ID,
  SESSION_TIME,
  STATUS_NAME,
} from '../constants/bookingConfirmationConstatnt'
import { IInterval, ISesstionTimeData } from './interfaces'

export interface IBookingConfirmationForm {
  [PATIENT_NAME]: string
  [FILE_NO]: string
  [DOCTOR_NAME]: string
  [BOOKING_DATE]: string
  [START_TIME]: string
  [END_TIME]: string
  [MOBILE_NO]: string
  [PATINET_MOBILE_NO]: string
  [RECURRING_DOCTOR_NAME]: string
  [SESSION]: string
  [RECURRING_START_DATE]: string
  [TYPE]: string
  [RECURRING_START_TIME]: string
  [RECURRING_END_TIME]: string
  [INTERVAL]: IInterval
  [NOTES]: string
  [DAY]: any
  [AVAILABLE_SLOT]: any
  [APPOINTMENT_ID]: string
  [SESSION_TIME]: ISesstionTimeData
  [STATUS_NAME]:any
  apt_pricing?: string
  apt_slot?: string | number
  apt_time?: string
  apt_type?: string
  apt_status?: string
  apt_date?: string
}

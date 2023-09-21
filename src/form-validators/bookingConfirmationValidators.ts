import {
  PATIENT_NAME,
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
  AVAILABLE_SLOT,
  PATINET_MOBILE_NO,
  SESSION_TIME,
  INTERVAL,
  STATUS_NAME,
} from "../constants/bookingConfirmationConstatnt";
import { IBookingConfirmationForm } from "../interfaces/bookingConfirmationModalInterfaces";

export const bookingConfirmationValidators = {
  [PATIENT_NAME]: {
    required: "Please Enter/Search Patient Name",
  },
  [DOCTOR_NAME]: {
    required: "Please Enter Doctor Name",
  },
  [MOBILE_NO]: {
    required: "Please Enter  mobile no.",
  },
  [PATINET_MOBILE_NO]: {
    required: "Please Enter Mobile No.",
  },
  [RECURRING_DOCTOR_NAME]: {},
  [STATUS_NAME]: {
    required: "Please Select Appointment Status",
  },
  [SESSION]: {
    required: "Please Enter Session",
    validate: {
      handleValue: (value: any) => {
        if (value <= 0 || value > 90) {
          return "Please enter session no between 1 to 90";
        }
      },
    },
  },
  [TYPE]: {
    required: "Please Select Type",
  },
  [SESSION_TIME]: {
    required: "Please Select Session Time",
  },
  [START_TIME]: {
    required: "Please Select Start Time",
  },
  [END_TIME]: {
    required: "Please Select End Time",
    validate: {
      handleTime: (value: string, values: IBookingConfirmationForm) => {
        const startTime = values[START_TIME];
        // console.log("startTime", startTime);
        if (value <= startTime) {
          return "End time must be greater than start time";
        }
      },
    },
  },
  [RECURRING_START_TIME]: {
    required: "Please Select Start Time",
  },
  [RECURRING_END_TIME]: {
    required: "Please Select End Time",
    validate: {
      handleTime: (value: string, values: IBookingConfirmationForm) => {
        const startTime = values[RECURRING_START_TIME];
        // console.log("startTime", startTime);
        if (value <= startTime) {
          return "End time must be greater than start time";
        }
      },
    },
  },
  [BOOKING_DATE]: {
    required: "Please select date",
  },
  [RECURRING_START_DATE]: {
    required: "Please select start date",
  },
  // [DAY]: {
  //   required: 'Please Select Day',
  // },
  [AVAILABLE_SLOT]: {
    required: "Please Select Available Slot",
  },
  // [NOTES]: {
  //   required: 'Please Enter Notes',
  // },
  [INTERVAL]: {
    required: "Please Enter Interval",
  },
};

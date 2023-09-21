import { APPOINTMENT_COLOR, APPOINTMENT_STATUS } from "../constants/constant";

export interface IMasterValueValidators {
  [APPOINTMENT_STATUS]: {
    required: string;
  };
  [APPOINTMENT_COLOR]: {
    required: string;
  };
}

export const masterValueVadidator: IMasterValueValidators = {
  [APPOINTMENT_STATUS]: {
    required: "please enter appointment status",
  },
  [APPOINTMENT_COLOR]: {
    required: "Please select color ",
  },
};

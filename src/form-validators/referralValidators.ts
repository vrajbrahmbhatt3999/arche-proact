import { APPOINTMENT_TAGS,  PAYMENT_REMARKS, REFER_TO_DOCTOR, REFER_TO_RECEPTIONIST, REFFERAL_START_DATE, REMARKS } from "../constants/constant";

export interface IreferralValidators {
 
  [REFER_TO_DOCTOR]: {
    required: string;
  };
  [APPOINTMENT_TAGS]: {
    required: string;
  };
  [REMARKS]: {
    required: string;
  };
  [PAYMENT_REMARKS]:{
    required: string;

  }
  [REFFERAL_START_DATE]:{
    required: any;

  };
  [REFER_TO_RECEPTIONIST]:{
    required: any;

  };
}

export const referralValidators: IreferralValidators = {
 
  [REFER_TO_DOCTOR]: {
    required: "please select refer to doctor",
  },
  [APPOINTMENT_TAGS]: {
    required: "please select appointment tags",
  },
  [REMARKS]: {
    required: "please enter remarks",
  },
  [PAYMENT_REMARKS]: {
    required: "please enter payment remarks",
  },
  [REFFERAL_START_DATE]: {
    required: "please select date",
  },
  [REFER_TO_RECEPTIONIST]: {
    required: "please select refer to receptionist",
  },
};

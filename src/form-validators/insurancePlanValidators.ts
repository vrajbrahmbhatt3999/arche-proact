import {
  EMR_CLAIM_TYPE,
  EMR_EXPIRY_DATE,
  EMR_INSURANCE_COMPANY,
  EMR_INSURANCE_PLAN,
  EMR_POLICY_NO,
  EMR_REIMBURSEMENT_TYPE,
} from "../constants/constant";

export const insurancePlanValidators = {
  [EMR_INSURANCE_COMPANY]: {
    required: "Please select insurance company",
  },
  [EMR_INSURANCE_PLAN]: {
    required: "Please select insurance plan",
  },
  [EMR_POLICY_NO]: {
    required: "Please enter policy no.",
  },
  [EMR_REIMBURSEMENT_TYPE]: {
    required: "Please select reimbursement type",
  },
  [EMR_CLAIM_TYPE]: {
    required: "Please select claim type",
  },
  [EMR_EXPIRY_DATE]: {
    required: "Please select expiry date",
  },
};

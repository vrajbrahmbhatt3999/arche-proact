import {
  INSURANCE_CLAIM_TYPE,
  INSURANCE_COMPANY,
  INSURANCE_REIMBURSEMENT_TYPE,
  MARKETPLACE,
} from "../constants/constant";

export const addInsuranceCompanyValidators = {
  [MARKETPLACE]: {
    required: "Please select marketplace company",
  },
  [INSURANCE_COMPANY]: {
    required: "Please enter company name",
  },
  [INSURANCE_CLAIM_TYPE]: {
    required: "Please select claim type",
  },
  [INSURANCE_REIMBURSEMENT_TYPE]: {
    required: "Please select reimbursement type",
  },
};

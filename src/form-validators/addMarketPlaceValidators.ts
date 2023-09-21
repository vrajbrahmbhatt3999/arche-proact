import {
  CLAIM_TYPE,
  COMPANY_NAME,
  REIMBURSEMENT_TYPE,
} from "../constants/constant";

export const addMarketPlaceValidators = {
  [COMPANY_NAME]: {
    required: "Please enter company name",
  },
  [REIMBURSEMENT_TYPE]: {
    required: "Please select reimbursement type",
  },
  [CLAIM_TYPE]: {
    required: "Please select claim type",
  },
};

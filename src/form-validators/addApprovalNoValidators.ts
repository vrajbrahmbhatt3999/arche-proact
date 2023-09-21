import { INVOICE_INSURANCE_APPROVAL_NO } from "../constants/constant";

export interface IaddApprovalNoValidators {
  [INVOICE_INSURANCE_APPROVAL_NO]: {
    required: string;
  };
}
export const addApprovalNoValidators: IaddApprovalNoValidators = {
  [INVOICE_INSURANCE_APPROVAL_NO]: {
    required: "Please enter approval number",
  },
};

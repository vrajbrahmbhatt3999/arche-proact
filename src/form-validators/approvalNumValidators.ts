import { APPROVAL_NUM } from "../constants/constant";


export interface IinsuranceApprovalNum {
    [APPROVAL_NUM]: {
      required: any;
    };
  }

export const approvalNumValidators: IinsuranceApprovalNum = {
    [APPROVAL_NUM]: {
      required: "Please enter Approval Number",
    },
  };
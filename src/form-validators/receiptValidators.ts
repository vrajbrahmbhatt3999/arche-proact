import {
  BRANCH_TYPE,
  PATIENT_NAME,
  FILE_NO,
  MOBILE_NO,
  REFERENCE_RECEIPT_NO,
  RECEIPT_DATE,
  RECEIPT_TYPE,
} from "../constants/receiptConstants";
import { IReceiptForm } from "../interfaces/receiptInterfaces";

export const receiptValidators = {
  [BRANCH_TYPE]: {
    required: "Please Select Branch Type",
  },
  [PATIENT_NAME]: {
    required: "Please Select Patient Name",
  },
  [FILE_NO]: {
    required: "Please Enter File No.",
  },
  [MOBILE_NO]: {
    required: "Please Enter Mobile No.",
  },
  [REFERENCE_RECEIPT_NO]: {
    // required: "Please Select Reference Receipt No.",
    validate: {
      handleReceiptType: (value: any, values: IReceiptForm) => {
        const receipt_type = values[RECEIPT_TYPE];
        if (receipt_type !== "OUTSTANDING") {
          return undefined;
        } else if (receipt_type === "OUTSTANDING" && value?.length === 0) {
          return "Please Select Reference Inovice No.";
        }
        // else if (receipt_type !== "OUTSTANDING" && !value?.label) {
        //   return "Please Select Reference Inovice No.";
        // }
      },
    },
  },
  [RECEIPT_DATE]: {
    required: "Please Enter Receipt Date",
  },
};

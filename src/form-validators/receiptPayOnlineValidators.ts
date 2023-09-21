import {
  RECEIPT_ONLINE_PAYMENT_MOBILE_NO,
  RECEIPT_ONLINE_PAYMENT_NOTES,
  RECEIPT_ONLINE_PAYMENT_CUSTOMER_NAME,
  RECEIPT_ONLINE_PAYMENT_BRANCH,
  RECEIPT_ONLINE_PAYMENT_REF_NO,
  RECEIPT_ONLINE_PAYMENT_AMOUNT,
  RECEIPT_ONLINE_PAYMENT_URL,
} from "../constants/receiptPayOnlineConstants";

export const receiptPayOnlineValidators = {
  [RECEIPT_ONLINE_PAYMENT_MOBILE_NO]: {
    required: "Please Enter Mobile No.",
  },
  [RECEIPT_ONLINE_PAYMENT_NOTES]: {
    required: "Please Enter Notes",
  },
  [RECEIPT_ONLINE_PAYMENT_BRANCH]: {
    required: "Please Select Branch",
  },
  [RECEIPT_ONLINE_PAYMENT_CUSTOMER_NAME]: {
    required: "Please Enter Customer Name",
  },
  [RECEIPT_ONLINE_PAYMENT_REF_NO]: {
    required: "Please Enter Ref No",
  },
  [RECEIPT_ONLINE_PAYMENT_AMOUNT]: {
    required: "Please Enter Amount",
  },
  [RECEIPT_ONLINE_PAYMENT_URL]: {
    required: "Please Enter Url",
  },
};

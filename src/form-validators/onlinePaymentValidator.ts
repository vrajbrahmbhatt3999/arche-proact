import {
  INVOICE_ONLINE_PAYMENT_AMOUNT,
  INVOICE_ONLINE_PAYMENT_BRANCH,
  INVOICE_ONLINE_PAYMENT_MOBILE_NO,
  INVOICE_ONLINE_PAYMENT_NAME,
  INVOICE_ONLINE_PAYMENT_REF_NO,
  INVOICE_ONLINE_PAYMENT_URL,
} from "../constants/constant";

export interface IonlinePaymentValidator {
  [INVOICE_ONLINE_PAYMENT_BRANCH]: {
    required: string;
  };
  [INVOICE_ONLINE_PAYMENT_NAME]: {
    required: string;
  };
  [INVOICE_ONLINE_PAYMENT_MOBILE_NO]: {
    required: string;
  };
  [INVOICE_ONLINE_PAYMENT_REF_NO]: {
    required: string;
  };
  [INVOICE_ONLINE_PAYMENT_AMOUNT]: {
    required: string;
  };
  [INVOICE_ONLINE_PAYMENT_URL]: {
    required: string;
  };
}
export const onlinePaymentValidator: IonlinePaymentValidator = {
  [INVOICE_ONLINE_PAYMENT_BRANCH]: {
    required: "Please select branch",
  },
  [INVOICE_ONLINE_PAYMENT_NAME]: {
    required: "Please enter customer name",
  },
  [INVOICE_ONLINE_PAYMENT_MOBILE_NO]: {
    required: "Please enter mobile no.",
  },
  [INVOICE_ONLINE_PAYMENT_REF_NO]: {
    required: "Please enter ref no.",
  },
  [INVOICE_ONLINE_PAYMENT_AMOUNT]: {
    required: "Please enter amount",
  },
  [INVOICE_ONLINE_PAYMENT_URL]: {
    required: "Please enter url link",
  },
};

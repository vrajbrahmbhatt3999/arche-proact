import { INVOICE_PAYMENT_AMOUNT } from "../constants/constant";

export interface IpaymentLinkModalValidators {
  [INVOICE_PAYMENT_AMOUNT]: {
    required: string;
    pattern: {
      value: RegExp;
      message: string;
    };
  };
}
export const paymentLinkModalValidators: IpaymentLinkModalValidators = {
  [INVOICE_PAYMENT_AMOUNT]: {
    required: "Please enter amount",
    pattern : {
      value: /^(?=.*[1-9])\d*\.?\d*$/,
      message: "Please enter a valid amount",
    },
  },
};

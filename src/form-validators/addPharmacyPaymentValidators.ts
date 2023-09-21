import {
    PHARMACY_OUTSTANDING_AMOUNT,
    PHARMACY_TAX_1,
    PHARMACY_TOTAL_DISCOUNT,
    PHARMACY_TAX_2,
    PHARMACY_CO_PAY,
    PHARMACY_TOTAL_TAX,
    PHARMACY_CO_PAY_AMOUNT
  } from "../constants/constant";


  
  export interface IaddPharmacyPaymentValidators {
    [PHARMACY_OUTSTANDING_AMOUNT]: {
      required: string;
    };
  
    [PHARMACY_TAX_1]: {
      required: string;
    };
  
    [PHARMACY_TOTAL_DISCOUNT]: {
      required: string;
    };
  
    [PHARMACY_TAX_2]: {
      required: string;
    };
  
    [PHARMACY_CO_PAY]: {
      required: string;
    };
  
    [PHARMACY_TOTAL_TAX]: {
      required: string;
    };
    [PHARMACY_CO_PAY_AMOUNT]: {
      required: string;
    };
  }
  
  
  export const addPharmacyPaymentValidators: IaddPharmacyPaymentValidators =
    {
      [PHARMACY_OUTSTANDING_AMOUNT]: {
        required: "Please enter Outstanding Amount",
      },
      [PHARMACY_TAX_1]: {
        required: "Please enter Tax 1",
      },
      [PHARMACY_TOTAL_DISCOUNT]: {
        required: "Please enter Total Discount",
      },
      [PHARMACY_TAX_2]: {
        required: "Please enter Tax 2",
      },
      [PHARMACY_CO_PAY]: {
        required: "Please enter Co-pay",
      },
      [PHARMACY_TOTAL_TAX]: {
        required: "Please enter Total Tax",
      },
      [PHARMACY_CO_PAY_AMOUNT]: {
        required: "Please enter Co-pay Amount",
      },
    };
  
import {
    PHARMACY_ITEM_CODE,
    PHARMACY_PRODUCTS,
    PHARMACY_SELL_PRICE,
    PHARMACY_DISCOUNT,
    PHARMACY_QTY,
    PHARMACY_SUB_QTY,
    PHARMACY_EXPIRY_DATE
  } from "../constants/constant";


  
  export interface IaddPharmacyCustomerInformationSecondValidators {
    [PHARMACY_ITEM_CODE]: {
      required: string;
    };
  
    [PHARMACY_PRODUCTS]: {
      required: string;
    };
  
    [PHARMACY_SELL_PRICE]: {
      required: string;
    };
  
    [PHARMACY_DISCOUNT]: {
      required: string;
    };
  
    [PHARMACY_QTY]: {
      required: string;
    };
  
    [PHARMACY_SUB_QTY]: {
      required: string;
    };
    [PHARMACY_EXPIRY_DATE]: {
      required: string;
    };
  }
  
  
  export const addPharmacyCustomerSecondInformation: IaddPharmacyCustomerInformationSecondValidators =
    {
      [PHARMACY_ITEM_CODE]: {
        required: "Please enter Item Code",
      },
      [PHARMACY_PRODUCTS]: {
        required: "Please enter Product",
      },
      [PHARMACY_SELL_PRICE]: {
        required: "Please enter Sell Price",
      },
      [PHARMACY_DISCOUNT]: {
        required: "Please enter Discount",
      },
      [PHARMACY_QTY]: {
        required: "Please enter Qty",
      },
      [PHARMACY_SUB_QTY]: {
        required: "Please enter Sub Qty",
      },
      [PHARMACY_EXPIRY_DATE]: {
        required: "Please enter Expiry Date",
      },
    };
  
import {
  PHARMACY_PATIENT_NAME,
  PHARMACY_FILE_NO,
  PHARMACY_MOBILE,
  PHARMACY_AGE,
  PHARMACY_NATIONAL_ID_NO,
  PHARMACY_DATE,
  PHARMACY_REFERRAL,
  PHARMACY_GENDER
} from "../constants/constant";

export interface IaddPharmacyCustomerInformationValidators {
  [PHARMACY_PATIENT_NAME]: {
    required: string;
  };

  [PHARMACY_FILE_NO]: {
    required: string;
  };

  [PHARMACY_MOBILE]: {
    required: string;
  };

  [PHARMACY_AGE]: {
    required: string;
  };

  [PHARMACY_NATIONAL_ID_NO]: {
    required: any;
  };

  [PHARMACY_DATE]: {
    required: string;
  };
  [PHARMACY_REFERRAL]: {
    required: string;
  };
  [PHARMACY_GENDER]: {
    required: string;
  };
}


export const addPharmacyCustomerInformation: IaddPharmacyCustomerInformationValidators =
  {
    [PHARMACY_PATIENT_NAME]: {
      required: "Please enter Patient Name",
    },
    [PHARMACY_FILE_NO]: {
      required: "Please enter File No",
    },
    [PHARMACY_MOBILE]: {
      required: "Please enter Mobile Number",
    },
    [PHARMACY_AGE]: {
      required: "Please enter Age",
    },
    [PHARMACY_NATIONAL_ID_NO]:{ required: {
      value: true,
      message: 'Please enter National ID No'
    }},
    [PHARMACY_DATE]: {
      required: "Please enter National ID No",
    },
    [PHARMACY_REFERRAL]: {
      required: "Please enter National ID No",
    },
    [PHARMACY_GENDER]: {
      required: "Please enter gender",
    },
  };

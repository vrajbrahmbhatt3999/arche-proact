import {
  PATIENT_BRANCH_NAME,
  PATIENT_DOB,
  // PATIENT_EMAIL,
  PATIENT_FILE_NO,
  PATIENT_GENDER,
  PATIENT_MOBILE_NO_1,
  PATIENT_NAME,
  PATIENT_NATIONALITY,
  PATIENT_NATIONAL_ID,
  PATIENT_NATIONAL_ID_TYPE,
  PATIENT_PROFILE_PIC,
} from "../constants/constant";

export interface IaddPatientValidators {
  // [PATIENT_EMAIL]: {
  //   required: string;
  //   pattern: {
  //     value: RegExp;
  //     message: string;
  //   };
  // };
  [PATIENT_FILE_NO]: {
    required: string;
  };
  [PATIENT_NAME]: {
    required: string;
  };
  [PATIENT_NATIONALITY]: {
    required: string;
  };
  [PATIENT_DOB]: {
    required: string;
    validate: any;
  };
  [PATIENT_GENDER]: {
    required: string;
  };
  [PATIENT_MOBILE_NO_1]: {
    required: string;
  };
  // [PATIENT_OPENED_BY]: {
  //   required: string;
  // };
  // [PATIENT_OPENED_ON]: {
  //   required: string;
  // };
  [PATIENT_BRANCH_NAME]: {
    required: string;
  };
  // [PATIENT_AGE]: {
  //   required: string;
  // };
  [PATIENT_NATIONAL_ID_TYPE]: {
    required: string;
  };
  [PATIENT_NATIONAL_ID]: {
    required: string;
  };
  [PATIENT_PROFILE_PIC]: {
    required: string;
  };
}
export const addPatientValidators: IaddPatientValidators = {
  // [PATIENT_EMAIL]: {
  //   required: "Please enter email",
  //   pattern: {
  //     value: /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/,
  //     message: "Please enter valid email",
  //   },
  // },
  [PATIENT_PROFILE_PIC]: {
    required: "Please select profile image",
  },
  [PATIENT_FILE_NO]: {
    required: "Please enter file no",
  },
  [PATIENT_NAME]: {
    required: "Please enter patient name",
  },
  [PATIENT_NATIONALITY]: {
    required: "Please select nationality",
  },
  [PATIENT_DOB]: {
    required: "Please select date of birth",
    validate: {
      futureDate: (value: any) => {
        const currentDate = new Date();
        const selectedDate = new Date(value);
        if (selectedDate > currentDate) {
          return "Please not select future date";
        }
        return true;
      },
    },
  },
  [PATIENT_GENDER]: {
    required: "Please select gender",
  },
  [PATIENT_MOBILE_NO_1]: {
    required: "Please enter mobile no.",
  },
  // [PATIENT_OPENED_BY]: {
  //   required: "Please enter opened by",
  // },
  // [PATIENT_OPENED_ON]: {
  //   required: "Please select opened on",
  // },
  // [PATIENT_AGE]: {
  //   required: "Please enter age",
  // },
  [PATIENT_BRANCH_NAME]: {
    required: "Please select branch first",
  },
  [PATIENT_NATIONAL_ID_TYPE]: {
    required: "Please select id",
  },
  [PATIENT_NATIONAL_ID]: {
    required: "Please enter id number",
  },
};

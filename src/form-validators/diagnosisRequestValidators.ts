import {
  TEST_TYPE,
  TEST_NAME,
  PRICE,
  BILLABLE_TYPE,
  PRIORITY,
} from "../constants/diagnosisRequestConstant";

export const diagnosisRequestValidators = {
  [TEST_TYPE]: {
    required: "Please Select Test Type",
  },
  [TEST_NAME]: {
    required: "Please Select Test Name",
  },
  [PRICE]: {
    required: "Please Enter Price",
    validate: {
      handleZero: (value: any) => {
        if (value <= 0) {
          return "Please Enter Valid Price";
        }
      },
    },
  },
  [BILLABLE_TYPE]: {
    required: "Please Select Billable",
  },
  [PRIORITY]: {
    required: "Please Select Priority",
  },
};

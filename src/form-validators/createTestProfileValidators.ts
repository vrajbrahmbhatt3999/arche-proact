import { PACKAGE_AMOUNT, TEST_PROFILE_NAME } from "../constants/constant";

export const createTestProfileValidators = {
  [PACKAGE_AMOUNT]: {
    required: "Please enter pacakge amount",
    pattern: {
      value: /^[0-9]{0,6}(?:\.[0-9]{1,3})?$/,
      message: 'Please enter number upto 6 digit',
    },
  },
  [TEST_PROFILE_NAME]: {
    required: "Please enter test profile name",
  },
};


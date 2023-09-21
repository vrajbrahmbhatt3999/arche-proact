import {
  COMPONENT,
  COST_PRICE,
  SAMPLE_TYPE,
  SELL_PRICE,
  SOURCE,
  TEST_CATEGORY,
  TEST_NAME,
  TEST_TAT,
  UNIT,
} from "../constants/constant";

export const createTestValidators = {
  [TEST_NAME]: {
    required: "Please enter test name",
  },
  [TEST_CATEGORY]: {
    required: "Please select test category",
  },
  [TEST_TAT]: {
    required: "Please enter TAT",
  },
  [SAMPLE_TYPE]: {
    required: "Please select sample type",
  },
  [SOURCE]: {
    required: "Please select source",
  },
  [UNIT]: {
    required: "Please select unit",
  },
  [COMPONENT]: {
    required: "Please select component",
  },
  [COST_PRICE]: {
    required: "Please enter cost price",
    pattern: {
      value: /^[0-9]{0,6}(?:\.[0-9]{1,3})?$/,
      message: 'Please enter number upto 6 digit',
    },
  },
  [SELL_PRICE]: {
    required: "Please enter sell price",
    pattern: {
      value: /^[0-9]{0,6}(?:\.[0-9]{1,3})?$/,
      message: 'Please enter number upto 6 digit',
    },
  },
};

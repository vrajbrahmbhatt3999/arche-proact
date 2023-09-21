import { RADIOLOGY_COST_PRICE, RADIOLOGY_SELL_PRICE, RADIOLOGY_SOURCE, RADIOLOGY_TEST_CATEGORY, RADIOLOGY_TEST_NAME, RADIOLOGY_TEST_TAT } from "../constants/constant";


export const radiologyCreateTestValidators = {
    [RADIOLOGY_TEST_NAME]: {
        required: "Please enter test name",
    },
    [RADIOLOGY_TEST_CATEGORY]: {
        required: "Please select test category",
    },
    [RADIOLOGY_TEST_TAT]: {
        required: "Please enter TAT",
    },
    [RADIOLOGY_SOURCE]: {
        required: "Please select source",
    },
    [RADIOLOGY_COST_PRICE]: {
        required: "Please enter cost price",
        pattern: {
            value: /^[0-9]{0,6}(?:\.[0-9]{1,3})?$/,
            message: 'Please enter number upto 6 digit',
        },
    },
    [RADIOLOGY_SELL_PRICE]: {
        required: "Please enter sell price",
        pattern: {
            value: /^[0-9]{0,6}(?:\.[0-9]{1,3})?$/,
            message: 'Please enter number upto 6 digit',
        },
    },
};

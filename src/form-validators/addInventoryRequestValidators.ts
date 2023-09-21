import {
  ITEM_NAME,
  ITEM_QTY,
  REQUEST_SOURCE,
  SOURCE_BRANCH,
  SOURCE_DEPT,
  STORE,
  UNIT_TYPE,
} from '../constants/constant';

export const addInventoryRequestValidators = {
  [ITEM_NAME]: {
    required: 'Please select item',
  },
  [ITEM_QTY]: {
    required: 'Please enter item qty',
    validate: {
      handleValue: (value: any) => {
        if (Number(value) < 0) {
          return 'Please enter positive value';
        } else if (Number(value) === 0) {
          return 'Please enter value greater than 0';
        }
      },
    },
  },
  [UNIT_TYPE]: {
    required: 'Please select unit type',
  },
  [STORE]: {
    required: 'Please select store',
  },
  [REQUEST_SOURCE]: {
    required: 'Please select source',
  },
  [SOURCE_DEPT]: {
    required: 'Please select',
  },
  [SOURCE_BRANCH]: {
    required: 'Please select branch',
  },
};

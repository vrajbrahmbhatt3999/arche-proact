import {
  AGE_FROM,
  AGE_TO,
  GENDER_RANGE,
  PERIOD,
  RANGE_FROM,
  RANGE_TO,
} from '../constants/constant';

export const rangePopupValidators = {
  [GENDER_RANGE]: {
    required: 'Please select gender',
  },
  [AGE_FROM]: {
    required: 'Please enter age from',
    validate: {
      handleValue: (value: any) => {
        if (Number(value) < 0) {
          return 'Please enter positive value';
        }
      },
    },
  },
  [AGE_TO]: {
    required: 'Please enter age to',
    validate: {
      handleValue: (value: any, data: any) => {
        if (Number(value) < 0) {
          return 'Please enter positive value';
        } else if (Number(value) <= Number(data.age_from)) {
          return 'Age to should greater than Age from';
        }
      },
    },
  },
  [RANGE_FROM]: {
    required: 'Please enter range from',
    validate: {
      handleValue: (value: any) => {
        if (Number(value) < 0) {
          return 'Please enter positive value';
        }
      },
    },
  },
  [RANGE_TO]: {
    required: 'Please enter range to',
    validate: {
      handleValue: (value: any, data: any) => {
        if (Number(value) < 0) {
          return 'Please enter positive value';
        } else if (Number(value) <= Number(data.range_from)) {
          return 'Range to should greater than Range from';
        }
      },
    },
  },
  [PERIOD]: {
    required: 'Please select period',
  },
};

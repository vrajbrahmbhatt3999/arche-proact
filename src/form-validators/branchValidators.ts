import {
  ADDRESS_ONE,
  ADDRESS_TWO,
  BRANCH_INITIALS,
  BRANCH_NAME,
  DEFAULT_SEQUENCE_NO,
  CITY,
  COUNTRY,
  STATE,
  ZIPCODE,
} from '../constants/constant'

export interface IBranchValidators {
  [BRANCH_NAME]: {
    required: string
  }
  [BRANCH_INITIALS]: {
    required: string
  }
  [DEFAULT_SEQUENCE_NO]: {
    required: string
  }
  [ADDRESS_ONE]: {
    required: string
  }
  [ADDRESS_TWO]: {
    required: string
  }
  [CITY]: {
    required: string
  }
  [COUNTRY]: {
    required: string
  }
  [STATE]: {
    required: string
  }
  [ZIPCODE]: {
    required: string
  }
}

export const branchValidators = {
  [BRANCH_NAME]: {
    required: 'Please enter branch name',
  },
  [BRANCH_INITIALS]: {
    required: 'Please enter branch initials',
  },
  [DEFAULT_SEQUENCE_NO]: {
    required: 'Please enter branch sequence no.',
    pattern: {
      value: /^\d{1,3}$/,
      message: 'Branch sequence no. should be 1 to 999',
    },
  },

  [ADDRESS_ONE]: {
    required: 'Please enter address line 1',
  },
  [ADDRESS_TWO]: {
    required: 'Please enter address line 2',
  },
  [CITY]: {
    required: 'Please enter city',
    pattern: {
      value: /^[a-zA-Z !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/i,
      message: 'Please enter valid city name',
    },
  },
  [COUNTRY]: {
    required: 'Please enter country',
    pattern: {
      value: /^[a-zA-Z !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/i,
      message: 'Please enter valid country name',
    },
  },
  [STATE]: {
    required: 'Please enter state',
    pattern: {
      value: /^[a-zA-Z !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/i,
      message: 'Please enter valid state name',
    },
  },
  [ZIPCODE]: {
    required: 'Please enter zipcode',
    pattern: {
      value: /^\d{4,10}$/,
      message: 'Please enter valid 4 to 10 digit zipcode',
    },
  },
}

import {
  SHIFT1_START_TIME,
  SHIFT1_END_TIME,
  SHIFT2_START_TIME,
  SHIFT2_END_TIME,
} from '../constants/constant'

export interface ICreateSecondaryValidators {
  [SHIFT1_START_TIME]: {
    required: string
  }
  [SHIFT1_END_TIME]: {
    required: string
  }
  [SHIFT2_START_TIME]: {
    required: string
  }
  [SHIFT2_END_TIME]: {
    required: string
  }
}

export const createSecondaryValidators: ICreateSecondaryValidators = {
  [SHIFT1_START_TIME]: {
    required: 'Please enter shift one start time',
  },
  [SHIFT1_END_TIME]: {
    required: 'Please enter shift end time',
  },
  [SHIFT2_START_TIME]: {
    required: 'Please enter shift2 start time',
  },
  [SHIFT2_END_TIME]: {
    required: 'Please enter shift1 start time',
  },
}

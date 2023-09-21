import {
  ASSIGN_TAG_NAME,
  ASSIGN_TAG,
  MASTER_VALUE,
  MASTER_VALUE_LABEL,
} from '../constants/constant'

export interface IassignTag {
  [MASTER_VALUE_LABEL]: {
    required: any
  }
  [MASTER_VALUE]: {
    required: any
  }
}

export const masterValuesValidators: IassignTag = {
  [MASTER_VALUE_LABEL]: {
    required: 'Please enter category',
  },
  [MASTER_VALUE]: {
    required: 'Please enter value',
  },
}

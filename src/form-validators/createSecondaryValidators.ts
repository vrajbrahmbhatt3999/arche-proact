import {
  SHIFT1_END_TIME,
  SHIFT1_START_TIME,
  SHIFT2_END_TIME,
  SHIFT2_START_TIME,
} from '../constants/constant'
import { ICreateSecondaryFormInputs } from '../interfaces/interfaces'

type ValidateResult = string | undefined
type Validate<TFieldValue, TFormValues> = (
  value: TFieldValue,
  formValues: TFormValues
) => ValidateResult | Promise<ValidateResult>

type ValidatorShift1<TFieldValue> = {
  required: string
  validate?: Validate<TFieldValue, ICreateSecondaryFormInputs>
}
type ValidatorShift2<TFieldValue> = {
  // required: string
  validate?: Validate<TFieldValue, ICreateSecondaryFormInputs>
}

export interface ICreateSecondaryFormInputsValidators {
  [SHIFT1_START_TIME]: ValidatorShift1<string>
  [SHIFT1_END_TIME]: ValidatorShift1<string>
  [SHIFT2_START_TIME]: ValidatorShift2<string>
  [SHIFT2_END_TIME]: ValidatorShift2<string>
}

export const createSecondaryValidators: ICreateSecondaryFormInputsValidators = {
  [SHIFT1_START_TIME]: {
    required: 'Please enter shift 1 start time',
  },
  [SHIFT1_END_TIME]: {
    required: 'Please enter shift 1 end time',
    validate: (value: string, values: ICreateSecondaryFormInputs) => {
      const shift1StartTime = values[SHIFT1_START_TIME]
      const shift2StartTime = values[SHIFT2_START_TIME]
      const shift2EndTime = values[SHIFT2_END_TIME]
      console.log(
        'timings>>',
        value,
        shift1StartTime,
        shift2StartTime,
        shift2EndTime
      )
      if (shift1StartTime && shift2StartTime && shift2EndTime) {
        if (value <= shift1StartTime) {
          return 'Shift 1 end time must be greater than Shift 1 start time'
        } else if (value > shift2StartTime) {
          return 'Shift 1 end time must be less than Shift 2 start time'
        }
      }
      return undefined
    },
  },
  [SHIFT2_START_TIME]: {
    // required: 'Please enter shift 2 start time',
    validate: (value: string, values: ICreateSecondaryFormInputs) => {
      const shift1EndTime = values[SHIFT1_END_TIME]
      const shift2EndTime = values[SHIFT2_END_TIME]

      if (shift1EndTime && shift2EndTime) {
        if (value <= shift1EndTime) {
          return 'Shift 2 start time must be greater than Shift 1 end time'
        } else if (value === shift1EndTime) {
          return 'Shift 1 and Shift 2 cannot have the same start time'
        }
      }
      return undefined
    },
  },
  [SHIFT2_END_TIME]: {
    // required: 'Please enter shift 2 end time',
    validate: (value: string, values: ICreateSecondaryFormInputs) => {
      const shift1EndTime = values[SHIFT1_END_TIME]
      const shift2StartTime = values[SHIFT2_START_TIME]

      if (shift1EndTime && shift2StartTime) {
        if (value <= shift2StartTime) {
          return 'Shift 2 end time must be greater than Shift 2 start time'
        } else if (value === shift1EndTime) {
          return 'Shift 1 and Shift 2 cannot have the same end time'
        }
      }
      return undefined
    },
  },
}

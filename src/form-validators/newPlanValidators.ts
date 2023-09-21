import {
  PLAN_AMOUNT,
  PLAN_NAME,
  PLAN_TOTAL_AMOUNT,
} from '../constants/constant'
import { ICreateNewPlan } from '../interfaces/interfaces'

export const newPlanValidators = {
  [PLAN_AMOUNT]: {
    required: 'Please enter plan amount',
    // pattern: {
    //   value: /^[0-9]{0,6}(?:\.[0-9]{1,3})?$/,
    //   message: 'Please enter number upto 6 digit',
    // },
    validate: (planAmount: string, values: ICreateNewPlan) => {
      const totalAmount = values[PLAN_TOTAL_AMOUNT]
      console.log(planAmount, totalAmount)
      if (Number(planAmount) > Number(totalAmount)) {
        return 'Plan amount must lower than total amount'
      }
      return undefined
    },
  },
  [PLAN_NAME]: {
    required: 'Please enter plan name',
  },
}

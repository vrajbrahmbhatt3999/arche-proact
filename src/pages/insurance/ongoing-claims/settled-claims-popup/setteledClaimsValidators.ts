import {
  INITIATED_CLAIMS,
  SETTELED_AMOUNT,
  SETTELED_CLAIM_AMOUNT,
  SETTELED_CLAIM_DATE,
  SETTELED_MARKETPLACE_CLAIM,
} from './setteledClaimsConstatnts'

export const setteledClaimValidators: any = {
  [SETTELED_MARKETPLACE_CLAIM]: {
    required: 'Please select marketplace company',
  },
  [INITIATED_CLAIMS]: {
    required: 'Please select initiated claim',
  },
  [SETTELED_CLAIM_DATE]: {
    required: 'Please enter date',
  },
  [SETTELED_CLAIM_AMOUNT]: {
    required: 'Please enter claim amount',
  },
  [SETTELED_AMOUNT]: {
    required: 'Please enter setteled amount',
    validate: {
      handleAmount: (value: string, values: any) => {
        const claimAmt = values[SETTELED_CLAIM_AMOUNT]
        // console.log("startTime", startTime);
        if (value > claimAmt) {
          return 'Setteled amount must ne less than claim amount'
        }
      },
    },
  },
}

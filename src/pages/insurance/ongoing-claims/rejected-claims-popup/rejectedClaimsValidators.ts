import {
  INITIATED_CLAIMS_REJECTED,
  REJECTED_AMOUNT,
  REJECTED_CLAIM_AMOUNT,
  REJECTED_CLAIM_DATE,
  REJECTED_MARKETPLACE_CLAIM,
} from './rejectedClaimsConstants'

export const rejectedClaimValidators: any = {
  [REJECTED_MARKETPLACE_CLAIM]: {
    required: 'Please select marketplace company',
  },
  [INITIATED_CLAIMS_REJECTED]: {
    required: 'Please select initiated claim',
  },
  [REJECTED_CLAIM_DATE]: {
    required: 'Please enter date',
  },
  [REJECTED_CLAIM_AMOUNT]: {
    required: 'Please enter claim amount',
  },
  [REJECTED_AMOUNT]: {
    required: 'Please enter rejected amount',
    validate: {
      handleAmount: (value: string, values: any) => {
        const claimAmt = values[REJECTED_CLAIM_AMOUNT]
        // console.log("startTime", startTime);
        if (value > claimAmt) {
          return 'Setteled amount must ne less than claim amount'
        }
      },
    },
  },
}

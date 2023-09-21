import {
  ADD_CLAIM_AMOUNT,
  ADD_CLAIM_DATE,
  MARKETPLACE_ADD_CLAIM,
  PENDING_CLAIMS,
} from './addClaimConstants'

export const addClaimsValidators = {
  [MARKETPLACE_ADD_CLAIM]: {
    required: 'Please select marketplace company',
  },
  [PENDING_CLAIMS]: {
    required: 'Please select pending claim',
  },
  [ADD_CLAIM_DATE]: {
    required: 'Please enter date',
  },
  [ADD_CLAIM_AMOUNT]: {
    required: 'Please enter claim amount',
  },
}

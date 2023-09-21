import {
  CREATE_CLAIM_TYPE,
  CREATE_SETTLED_CLAIM_TYPE,
  GET_ALL_ONGOING_CLAIMS_TYPE,
  GET_CLAIMS_BY_MARKET_PLACE_TYPE,
  GET_PANDING_CLAIMS_TYPE,
} from '../../../constants/asyncActionsType'
import createAsyncThunkForSlice from '../../../utils/utils'
import {
  createnewclaim,
  createsettledclaims,
  getAllOngoingClaimsByStatus,
  getPandingClaimsByStatus,
} from './ongoingCliamsCrud'

export const getAllOngoingClaims = createAsyncThunkForSlice(
  GET_ALL_ONGOING_CLAIMS_TYPE,
  getAllOngoingClaimsByStatus
)

export const getClaimsByMarketPlace = createAsyncThunkForSlice(
  GET_CLAIMS_BY_MARKET_PLACE_TYPE,
  getAllOngoingClaimsByStatus
)

export const getPandingClaims = createAsyncThunkForSlice(
  GET_PANDING_CLAIMS_TYPE,
  getPandingClaimsByStatus
)

export const createNewClaim = createAsyncThunkForSlice(
  CREATE_CLAIM_TYPE,
  createnewclaim,
  {
    isToast: true,
  }
)

export const createSetteledClaims = createAsyncThunkForSlice(
  CREATE_SETTLED_CLAIM_TYPE,
  createsettledclaims,
  {
    isToast: true,
  }
)

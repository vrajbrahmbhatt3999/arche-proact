import {
  INSURANCE__PLAN_CLAIM_TYPE,
  INSURANCE_PLAN,
  INSURANCE_PLAN_REIMBURSEMENT_TYPE,
  INSURANCE_PLAN_COMPANY,
  CO_PAY,
  CO_PAY_VALUE,
  SERVICES,
  INSURANCE_DISCOUNT,
  INSURANCE_COPAY,
} from '../constants/constant';

export const addInsurancePlanValidators = {
  [INSURANCE_PLAN_COMPANY]: {
    required: 'Please select insurance company',
  },
  [INSURANCE_PLAN]: {
    required: 'Please enter insurance plan',
  },
  [INSURANCE__PLAN_CLAIM_TYPE]: {
    required: 'Please select claim type',
  },
  [INSURANCE_PLAN_REIMBURSEMENT_TYPE]: {
    required: 'Please select reimbursement type',
  },
  [CO_PAY]: {
    required: 'Please select co-pay',
  },
  [CO_PAY_VALUE]: {
    required: 'Please enter co-pay%',
  },
  [SERVICES]: {
    required: 'Please select services',
  },
};

export const departmentInsuranceConfigValidators = {
  [INSURANCE_DISCOUNT]: {
    required: 'Please enter discount',
  },
  [INSURANCE_COPAY]: {
    required: 'Please enter copay',
  },
};

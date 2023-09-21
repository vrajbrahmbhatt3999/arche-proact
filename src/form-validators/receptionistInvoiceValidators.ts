import {
  INVOICE_PATIENT_BRANCH_NAME,
  INVOICE_PATIENT_MOBILE_NO,
  INVOICE_PATIENT_NAME,
  INVOICE_PATIENT_PRIMARY_DOCTOR,
  INVOICE_PATIENT_TYPE,
} from '../constants/constant'

export interface IreceptionistInvoiceValidators {
  [INVOICE_PATIENT_BRANCH_NAME]: {
    required: string
  }
  [INVOICE_PATIENT_TYPE]: {
    required: string
  }
  [INVOICE_PATIENT_NAME]: {
    required: string
  }
  [INVOICE_PATIENT_PRIMARY_DOCTOR]: {
    required: string
  }
  [INVOICE_PATIENT_MOBILE_NO]: {
    required: string
  }
}
export const receptionistInvoiceValidators: IreceptionistInvoiceValidators = {
  [INVOICE_PATIENT_BRANCH_NAME]: {
    required: 'Please select branch name',
  },
  [INVOICE_PATIENT_TYPE]: {
    required: 'Please select patient type',
  },
  [INVOICE_PATIENT_NAME]: {
    required: 'Please enter / select patient name',
  },
  [INVOICE_PATIENT_PRIMARY_DOCTOR]: {
    required: 'Please select primary doctor',
  },
  [INVOICE_PATIENT_MOBILE_NO]: {
    required: 'Please enter mobile no.',
  },
}

import {
  RADIOLOGY_INVOICE_PATIENT_BRANCH_NAME,
  RADIOLOGY_INVOICE_PATIENT_MOBILE_NO,
  RADIOLOGY_INVOICE_PATIENT_NAME,
  RADIOLOGY_INVOICE_PATIENT_PRIMARY_DOCTOR,
  RADIOLOGY_INVOICE_PATIENT_TYPE,
} from '../constants/constant'

export interface IradiologyInvoiceValidators {
  [RADIOLOGY_INVOICE_PATIENT_BRANCH_NAME]: {
    required: string
  }
  [RADIOLOGY_INVOICE_PATIENT_TYPE]: {
    required: string
  }
  [RADIOLOGY_INVOICE_PATIENT_NAME]: {
    required: string
  }
  [RADIOLOGY_INVOICE_PATIENT_PRIMARY_DOCTOR]: {
    required: string
  }
  [RADIOLOGY_INVOICE_PATIENT_MOBILE_NO]: {
    required: string
  }
}
export const radiologyInvoiceValidators: IradiologyInvoiceValidators = {
  [RADIOLOGY_INVOICE_PATIENT_BRANCH_NAME]: {
    required: 'Please select branch name',
  },
  [RADIOLOGY_INVOICE_PATIENT_TYPE]: {
    required: 'Please select patient type',
  },
  [RADIOLOGY_INVOICE_PATIENT_NAME]: {
    required: 'Please enter / select patient name',
  },
  [RADIOLOGY_INVOICE_PATIENT_PRIMARY_DOCTOR]: {
    required: 'Please select primary doctor',
  },
  [RADIOLOGY_INVOICE_PATIENT_MOBILE_NO]: {
    required: 'Please enter mobile no.',
  },
}

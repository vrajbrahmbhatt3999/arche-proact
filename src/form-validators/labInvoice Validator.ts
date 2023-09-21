import {
  LAB_INVOICE_PATIENT_BRANCH_NAME,
  LAB_INVOICE_PATIENT_TYPE,
  LAB_INVOICE_PATIENT_FILE_NO,
  LAB_INVOICE_PATIENT_NAME,
  LAB_INVOICE_PATIENT_PRIMARY_DOCTOR,
  LAB_INVOICE_PATIENT_MOBILE_NO,
  LAB_INVOICE_PATIENT_PROFILE_PIC,
  LAB_INVOICE_PATIENT_NATIONAL_ID,
} from '../constants/constant'

export interface IlabInvoiceValidators {
  [LAB_INVOICE_PATIENT_BRANCH_NAME]: {
    required: string
  }
  [LAB_INVOICE_PATIENT_TYPE]: {
    required: string
  }
  [LAB_INVOICE_PATIENT_NAME]: {
    required: string
  }
  [LAB_INVOICE_PATIENT_PRIMARY_DOCTOR]: {
    required: string
  }
  [LAB_INVOICE_PATIENT_MOBILE_NO]: {
    required: string
  }
}
export const labInvoiceValidators: IlabInvoiceValidators = {
  [LAB_INVOICE_PATIENT_BRANCH_NAME]: {
    required: 'Please select branch name',
  },
  [LAB_INVOICE_PATIENT_TYPE]: {
    required: 'Please select patient type',
  },
  [LAB_INVOICE_PATIENT_NAME]: {
    required: 'Please select patient name',
  },
  [LAB_INVOICE_PATIENT_PRIMARY_DOCTOR]: {
    required: 'Please select primary doctor',
  },
  [LAB_INVOICE_PATIENT_MOBILE_NO]: {
    required: 'Please enter mobile no.',
  },
}

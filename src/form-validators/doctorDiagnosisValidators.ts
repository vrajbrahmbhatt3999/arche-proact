import {
  IMAGE_LABEL_NAME,
  CATEGORY_LABEL_NAME,
  MAIN_COMPLAINT_LABEL_NAME,
  DIAGNOSIS_LABEL_NAME,
  SESSIONS_LABEL_NAME,
  SERVICE_LABEL_NAME,
  DOCTOR_LABEL_NAME,
} from '../constants/constant'

export const doctorDiagnosisValidators = {
  [IMAGE_LABEL_NAME]: {
    required: 'Please Enter Image Name',
  },
  [CATEGORY_LABEL_NAME]: {
    required: 'Please Select Category',
  },
  [MAIN_COMPLAINT_LABEL_NAME]: {
    required: 'Please Select Main Complaint',
  },
  [SERVICE_LABEL_NAME]: {
    required: 'Please Select Service',
  },
  [DOCTOR_LABEL_NAME]: {
    required: 'Please Select Doctor',
  },
  [SESSIONS_LABEL_NAME]: {
    required: 'Please enter sessions',
    validate: {
      handleMaxNumberValidation: (value: any) => {
        const tempVal = value * 1
        if (tempVal <= 0 || tempVal > 99) {
          return 'Please enter session no between 1 to 99'
        }
      },
    },
  },
}

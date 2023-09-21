import {
  PRIMARY_FIRST_NAME,
  PRIMARY_LAST_NAME,
  PRIMARY_DESIGNATION,
  PRIMARY_BRANCH,
  PRIMARY_SPECIALITY,
  PRIMARY_DEPARTMENT,
  PRIMARY_PHONE_NUMBER,
  PRIMARY_EMAIL_ID,
  PRIMARY_USER_GROUPS,
  PRIMARY_EXPIRY_DATE,
  PRIMARY_USER_PHOTO_ATTACHMENT,
  PRIMARY_ROLE,
} from '../constants/constant'

export interface ICreatePrimaryValidators {
  [PRIMARY_FIRST_NAME]: {
    required: string
  }
  [PRIMARY_LAST_NAME]: {
    required: string
  }
  [PRIMARY_DESIGNATION]: {
    required: string
  }
  [PRIMARY_BRANCH]: {
    required: string
  }
  // [PRIMARY_SPECIALITY]: {
  //   required: string
  // }
  [PRIMARY_ROLE]: {
    required: string
  }
  [PRIMARY_DEPARTMENT]: {
    required: string
  }
  [PRIMARY_PHONE_NUMBER]: {
    required: string
  }
  [PRIMARY_EMAIL_ID]: {
    required: string
    pattern: {
      value: RegExp
      message: string
    }
  }
  [PRIMARY_USER_GROUPS]: {
    required: string
  }
  [PRIMARY_EXPIRY_DATE]: {
    required: string
    validate: (value: any) => boolean | string
  }
  [PRIMARY_USER_PHOTO_ATTACHMENT]: {
    required: string
    validate: any
  }
}

export const createPrimaryValidators: ICreatePrimaryValidators = {
  [PRIMARY_FIRST_NAME]: {
    required: 'Please enter first name',
  },
  [PRIMARY_LAST_NAME]: {
    required: 'Please enter last name',
  },
  [PRIMARY_DESIGNATION]: {
    required: 'Please enter designation',
  },
  [PRIMARY_BRANCH]: {
    required: 'Please select branch',
  },
  // [PRIMARY_SPECIALITY]: {
  //   required: 'Please select speciality',
  // },
  [PRIMARY_DEPARTMENT]: {
    required: 'Please select department',
  },
  [PRIMARY_PHONE_NUMBER]: {
    required: 'Please enter phone number',
  },
  [PRIMARY_EMAIL_ID]: {
    required: 'Please enter email',
    pattern: {
      value: /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/,
      message: 'Please enter valid email',
    },
  },
  [PRIMARY_USER_GROUPS]: {
    required: 'Please select usergroup',
  },
  [PRIMARY_ROLE]: {
    required: 'Please select role name',
  },
  [PRIMARY_EXPIRY_DATE]: {
    required: 'Please select expiry Date',
    validate: (value: string) => {
      const selectedDate = new Date(value)
      const currentDate = new Date()
      if (selectedDate <= currentDate) {
        return 'Expiry date must be greater than  to today'
      }
      return true
    },
  },
  [PRIMARY_USER_PHOTO_ATTACHMENT]: {
    required: 'Please select user photo',
    validate: {
      fileSize: (file: FileList) => {
        return (
          file[0].size <= 2 * 1024 * 1024 || 'File size should be less than 2MB'
        )
      },
      fileType: (file: FileList) =>
        /jpeg|png/.test(file[0].type) || 'Only JPEG/PNG files are allowed',
    },
  },
}

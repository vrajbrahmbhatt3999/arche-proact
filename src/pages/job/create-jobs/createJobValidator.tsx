import { AGE, FILE_NO, GENDER, LOCATION_ID, MOBILE_NO, NAME, PATIENT } from "../../../constants/createJobConstants"


export const createJobsValidators = {
    [NAME]: {
      required: 'Please enter patient name',
    },
    [FILE_NO]: {
      required: 'Please search file no',
    },
    // [FIXED_FILE_NO]: {
    //   required: 'Please search fixed file no',
    // },
    [MOBILE_NO]: {
      required: 'Please enter mobile no',
    },
    [PATIENT]: {
      required: 'Please select any one',
    },
    [AGE]: {
      required: 'Please enter age',
      pattern: {
        value: /^\d+$/,
        message: 'Please enter only numbers',
      },
      // validate: {
      //   handleZero: (value: any) => {
      //     if (value <= 0) {
      //       return 'Please enter valid age'
      //     }
      //   },
      // },
    },
    [GENDER]: {
      required: 'Please select any one ',
    },
    [LOCATION_ID]: {
      required: 'Please select any one ',
    },
    // [TASK]: {
    //   required: 'Please select any one ',
    // },
    
    
  }

 
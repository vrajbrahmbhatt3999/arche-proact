import { RADILOGYPATIENT, RADIOLOGYAGE, RADIOLOGYFILE_NO, RADIOLOGYGENDER, RADIOLOGYLOCATION_ID, RADIOLOGYMOBILE_NO, RADIOLOGYNAME } from "../../../constants/createJobConstants"


export const createJobsValidators = {
    [RADIOLOGYNAME]: {
      required: 'Please enter patient name',
    },
    [RADIOLOGYFILE_NO]: {
      required: 'Please search file no',
    },
    // [FIXED_FILE_NO]: {
    //   required: 'Please search fixed file no',
    // },
    [RADIOLOGYMOBILE_NO]: {
      required: 'Please enter mobile no',
    },
    [RADILOGYPATIENT]: {
      required: 'Please select any one',
    },
    [RADIOLOGYAGE]: {
      required: 'Please enter age',
      pattern: {
        value: /^\d+$/,
        message: 'Please enter only numbers',
      },
      validate: {
        handleZero: (value: any) => {
          if (value <= 0) {
            return 'Please enter valid age'
          }
        },
      },
    },
    [RADIOLOGYGENDER]: {
      required: 'Please select any one ',
    },
    [RADIOLOGYLOCATION_ID]: {
      required: 'Please select any one ',
    },
    // [TASK]: {
    //   required: 'Please select any one ',
    // },
    
    
  }

 
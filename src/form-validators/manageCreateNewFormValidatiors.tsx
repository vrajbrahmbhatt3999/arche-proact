import {
    MODULE_LABEL_NAME,
    DEPARTMENT_LABEL_NAME,
    FORM_LABEL_NAME
  } from '../constants/constant'
  
  export const manageCreateNewFormsValidators = {
    [FORM_LABEL_NAME]: {
      required: 'Please enter form',
    },
    [MODULE_LABEL_NAME]: {
      required: 'Please select module',
    },
    [DEPARTMENT_LABEL_NAME]: {
      required: 'Please select department',
    }
  }
  
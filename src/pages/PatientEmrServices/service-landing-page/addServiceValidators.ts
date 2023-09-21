import {
  SERVICE_DEPARTMENT,
  SERVICE_CODE,
  SERVICE_NAME,
  SERVICE_PRICE,
  SERVICE_COST,
  SERVICE_QTY,
  SERVICE_UNIT_TYPE,
  SERVICE_BALANCE,
  SERVICE_SOURCE,
  SERVICE_GROUP,
  SERVICE_LOCATION,
  SERVICE_SESSION,
  SERVICE_STATUS,
  SERVICE_NUMBER_SESSION,
} from '../../../constants/constant'

export const addServiceValidator = {
  [SERVICE_DEPARTMENT]: {
    required: 'Please select department',
  },
  [SERVICE_CODE]: {
    required: 'Please Enter User Code',
  },
  [SERVICE_NAME]: {
    required: 'Please Enter Name',
  },
  [SERVICE_PRICE]: {
    required: 'Please Enter Sell Price',
  },
  [SERVICE_COST]: {
    required: 'Please Enter Cost Price',
  },
  [SERVICE_QTY]: {
    required: 'Please Enter Qty',
  },
  [SERVICE_UNIT_TYPE]: {
    required: 'Please select Unit Type',
  },
  [SERVICE_BALANCE]: {
    required: 'Please Enter Mininum Qty Balance',
  },
  [SERVICE_SOURCE]: {
    required: 'Please select salary type',
  },
  [SERVICE_GROUP]: {
    required: 'Please Select Group ',
  },
  [SERVICE_LOCATION]: {
    required: 'Please Enter Locationb',
  },
  [SERVICE_NUMBER_SESSION]: {
    required: 'Please Enter Number of Session',
    validate: {
      handleValue: (value: any) => {
        if (value <= 0 || value > 99) {
          return 'Please enter session no between 1 to 99'
        }
      },
    },
  },
  [SERVICE_SESSION]: {
    required: 'Please Enter Session Time',
  },
  [SERVICE_STATUS]: {
    required: 'Please Select Status ',
  },
}

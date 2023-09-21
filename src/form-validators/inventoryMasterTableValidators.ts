import {
  INVENTORY_MASTER_ADDRESS_LINE_ONE,
  INVENTORY_MASTER_ADDRESS_LINE_TWO,
  INVENTORY_MASTER_CITY,
  INVENTORY_MASTER_CONTACT_NO,
  INVENTORY_MASTER_CONTACT_PERSON,
  INVENTORY_MASTER_COUNTRY,
  INVENTORY_MASTER_CURRENCY,
  INVENTORY_MASTER_NAME,
  INVENTORY_MASTER_STATE,
  INVENTORY_MASTER_ZIPCODE,
} from '../constants/constant';

export interface IinventoryMasterTableValidators {
  [INVENTORY_MASTER_NAME]: {
    required: any;
    pattern: {
      value: any;
      message: any;
    };
  };
  [INVENTORY_MASTER_CURRENCY]: {
    required: any;
  };
  [INVENTORY_MASTER_CONTACT_NO]: {
    required: any;
  };
}

export const inventoryMasterTableValidators: IinventoryMasterTableValidators = {
  [INVENTORY_MASTER_NAME]: {
    required: 'Please enter name',
    pattern: {
      value: /^[a-zA-Z\s]*$/,
      message: 'Please Enter valid name',
    },
  },
  [INVENTORY_MASTER_CURRENCY]: {
    required: 'Please select currency',
  },
  [INVENTORY_MASTER_CONTACT_NO]: {
    required: 'Please enter contact no',
  },
};

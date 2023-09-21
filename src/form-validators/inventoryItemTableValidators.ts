import {
  INVENTORY_ITEM_NAME,
  INVENTORY_ITEM_CODE,
  INVENTORY_BASE_UNIT_TYPE,
  INVENTORY_GROUP,
  INVENTORY_QUANTITY,
  INVENTORY_CHARGABLE,
  INVENTORY_COST_PRICE,
  INVENTORY_SELL_PRICE,
  INVENTORY_EXPIRY_DAYS
} from '../constants/constant';

export interface IinventoryItemTableValidators {
  [INVENTORY_ITEM_NAME]: {
    required: any;
  };
  [INVENTORY_ITEM_CODE]: {
    required: any;
  };
  [INVENTORY_BASE_UNIT_TYPE]: {
    required: any;
  };
  [INVENTORY_GROUP]: {
    required: any;
  };
  [INVENTORY_QUANTITY]: {
    required: any;
    pattern: {
      value: any;
      message: any;
    };
  };
  [INVENTORY_CHARGABLE]: {
    required: any;
  };
  [INVENTORY_COST_PRICE]: {
    required: any;
    pattern: {
      value: any;
      message: any;
    };
  };
  [INVENTORY_SELL_PRICE]: {
    required: any;
    pattern: {
      value: any;
      message: any;
    };
  };
  [INVENTORY_EXPIRY_DAYS]: {
    required: any;
    pattern: {
      value: any;
      message: any;
    };
  };
}

export const inventoryItemTableValidators: IinventoryItemTableValidators = {
  [INVENTORY_ITEM_NAME]: {
    required: 'Please enter name'
  },
  [INVENTORY_ITEM_CODE]: {
    required: 'Please enter item code'
  },
  [INVENTORY_BASE_UNIT_TYPE]: {
    required: 'Please enter base unit type'
  },
  [INVENTORY_GROUP]: {
    required: 'Please enter group'
  },
  [INVENTORY_QUANTITY]: {
    required: 'Please enter quantity',
    pattern: {
      value: /^[0-9]{0,6}(?:\.[0-9]{1,3})?$/,
      message: 'Please enter number upto 6 digit',
    },
  },
  [INVENTORY_CHARGABLE]: {
    required: 'Please enter chargable'
  },
  [INVENTORY_COST_PRICE]: {
    required: 'Please enter cost price',
    pattern: {
      value: /^[0-9]{0,6}(?:\.[0-9]{1,3})?$/,
      message: 'Please enter number upto 6 digit',
    },
  },
  [INVENTORY_SELL_PRICE]: {
    required: 'Please enter sell price',
    pattern: {
      value: /^[0-9]{0,6}(?:\.[0-9]{1,3})?$/,
      message: 'Please enter number upto 6 digit',
    },
  },
  [INVENTORY_EXPIRY_DAYS]: {
    required: 'Please enter expiry days',
    pattern: {
      value: /^[0-9]{0,6}(?:\.[0-9]{1,3})?$/,
      message: 'Please enter number upto 6 digit',
    },
  },
};

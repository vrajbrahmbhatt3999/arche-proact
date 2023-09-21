import {
  MASTER_UNIT_TYPE_NAME,
  MASTER_UNIT_TYPE_QTY,
  MASTER_UNIT_TYPE_VALUE,
} from "../constants/constant";

export interface IunitType {
  [MASTER_UNIT_TYPE_NAME]: {
    required: any;
  };
  [MASTER_UNIT_TYPE_VALUE]: {
    required: any;
  };
  [MASTER_UNIT_TYPE_QTY]: {
    required: any;
    pattern: {
      value: any;
      message: any;
    };
  };
}

export const masterUnitTypeValidators: IunitType = {
  [MASTER_UNIT_TYPE_NAME]: {
    required: "Please enter category",
  },
  [MASTER_UNIT_TYPE_VALUE]: {
    required: "Please enter value",
  },
  [MASTER_UNIT_TYPE_QTY]: {
    required: "Please enter quantity",
    pattern: {
      value: /^(?!00$|-1|0$)(?!0\d)\d*$/,
      message: "Enter positive and non-zero number",
    },
  },
};

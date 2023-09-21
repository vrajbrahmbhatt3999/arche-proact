import {
  MASTER_TABLE_CATEGORY_VALUE,
  MASTER_TABLE_CATEGORY_VALUE_NAME,
} from "../constants/constant";

export interface IaddCategoryValueValidators {
  [MASTER_TABLE_CATEGORY_VALUE_NAME]: {
    required: string;
  };
  [MASTER_TABLE_CATEGORY_VALUE]: {
    required: string;
  };
}
export const addCategoryValueValidators: IaddCategoryValueValidators = {
  [MASTER_TABLE_CATEGORY_VALUE_NAME]: {
    required: "Please select category",
  },
  [MASTER_TABLE_CATEGORY_VALUE]: {
    required: "Please enter category value",
  },
};

import { MASTER_TABLE_CATEGORY_NAME } from "../constants/constant";

export interface IaddCategoryValidators {
  [MASTER_TABLE_CATEGORY_NAME]: {
    required: string;
  };
}
export const addCategoryValidators: IaddCategoryValidators = {
  [MASTER_TABLE_CATEGORY_NAME]: {
    required: "Please enter category name",
  },
};

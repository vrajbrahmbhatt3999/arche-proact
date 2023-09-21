import { ASSIGN_TAG_NAME, ASSIGN_TAG } from "../constants/constant";

export interface IassignTag {
  [ASSIGN_TAG_NAME]: {
    required: any;
  };
  [ASSIGN_TAG]: {
    required: any;
  };
}

export const assigntagValidators: IassignTag = {
  [ASSIGN_TAG_NAME]: {
    required: "Please enter Name",
  },
  [ASSIGN_TAG]: {
    required: "Please Select Icon",
  },
};

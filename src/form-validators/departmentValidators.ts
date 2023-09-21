import { DEPT_NAME, NOTES } from "../constants/constant";

export interface IDepartmentValidators {
  [DEPT_NAME]: {
    required: string;
  };
  [NOTES]: {
    required: string;
  };
}

export const departmentValidators: IDepartmentValidators = {
  [DEPT_NAME]: {
    required: "Please enter department name",
  },
  [NOTES]: {
    required: "Please enter notes",
  },
};

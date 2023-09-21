import { FILE_NO, NATIONALITY } from "../constants/constant";

export const submitQuestionValidators = {
  [NATIONALITY]: {
    required: "Please select id",
  },
  [FILE_NO]: {
    required: "Please enter id number",
  },
};

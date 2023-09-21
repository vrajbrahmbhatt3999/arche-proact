import {
  CC_MAIL,
  EMAIL_BODY,
  FORM_DATA,
  PATIENT_NAME_SQ,
  PATIENT_NUMBER,
  SUBJECT,
} from "./../constants/constant";
import { TO_MAIL } from "../constants/constant";

export const shareQuestionEmailValidators = {
  [TO_MAIL]: {
    required: "Please enter sender email",
    pattern: {
      value: /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/,
      message: "Please enter a valid email address",
    },
  },
  [CC_MAIL]: {},
  [SUBJECT]: {
    required: "Please enter subject",
  },
  [EMAIL_BODY]: {
    required: "Please enter email body",
  },
  [PATIENT_NAME_SQ]: {
    required: "Please enter patient name",
  },
  [PATIENT_NUMBER]: {
    required: "Please enter patient number",
  },
  [FORM_DATA]: {
    required: "Please select form",
  },
};

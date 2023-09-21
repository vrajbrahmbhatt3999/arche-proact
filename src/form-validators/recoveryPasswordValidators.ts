import { CONFIRM_NEW_PASSWORD, NEW_PASSWORD } from "../constants/constant";

export interface IRecoveryPasswordValidators {
  [NEW_PASSWORD]: {
    required: string;
    pattern: {
      value: RegExp;
      message: string;
    };
  };
  [CONFIRM_NEW_PASSWORD]: {
    required: string;
    validate?: {
      matchesPassword: (value: string, formValues: any) => string | boolean;
    };
  };
}

export const recoveryPasswordValidators: IRecoveryPasswordValidators = {
  [NEW_PASSWORD]: {
    required: "Please enter new password",
    pattern: {
      value:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,16}$/,
      message:
        "Password must be 6-16 characters long, 1 uppercase , 1 lowercase character, 1 number & 1 special character",
    },
  },
  [CONFIRM_NEW_PASSWORD]: {
    required: "Please enter confirm password",
    validate: {
      matchesPassword: (value: string, formValues: any) => {
        const password = formValues[NEW_PASSWORD];
        if (password !== value) {
          return "Password and confirm password should same";
        }
        return true;
      },
    },
  },
};

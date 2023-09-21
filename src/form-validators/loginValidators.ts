import { EMAIL, PASSWORD } from "../constants/constant";

export interface ILoginValidators {
  [EMAIL]: {
    required: string;
    pattern: {
      value: RegExp;
      message: string;
    };
  };
  [PASSWORD]: {
    required: string;
  };
}

export const loginValidators: ILoginValidators = {
  [EMAIL]: {
    required: "Please enter email",
    pattern: {
      value: /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/,
      message: "Please enter valid email",
    },
  },
  [PASSWORD]: {
    required: "Please enter password",
  },
};

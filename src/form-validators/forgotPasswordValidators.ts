import { FORGOT_PASSWORD_EMAIL } from '../constants/constant'

export interface IForgotPasswordValidators {
  [FORGOT_PASSWORD_EMAIL]: {
    required?: string
    pattern: {
      value: RegExp
      message: string
    }
  }
}

export const forgotPasswordValidators: IForgotPasswordValidators = {
  [FORGOT_PASSWORD_EMAIL]: {
    required: 'Please enter email',
    pattern: {
      value: /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/,
      // value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      message: 'Please enter valid email',
    },
  },
}

import { OTP } from '../constants/constant'
export const otpValidators = {
  [OTP]: {
    required: 'Please Enter  6 digit OTP',
    validate: {
      length: (value: string) => {
        if (value.length !== 6) {
          return 'OTP length must be 6 digit'
        }
        return true
      },
    },
  },
}

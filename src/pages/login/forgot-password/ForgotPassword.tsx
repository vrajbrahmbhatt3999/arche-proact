import { FC, useEffect } from 'react'
import { EmailIcon } from '../../../components/common/svg-components'
import styles from './forgotPassword.module.scss'
import { FORGOT_PASSWORD_EMAIL } from '../../../constants/constant'
import Button from '../../../components/common/button/Button'
import { SubmitHandler, useForm } from 'react-hook-form'

import 'react-phone-input-2/lib/style.css'
import { IForgotPasswordForm } from '../../../interfaces/interfaces'
import { forgotPasswordValidators } from '../../../form-validators/forgotPasswordValidators'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { requestGenerator } from '../../../utils/payloadGenerator'
import { userForgotpassword } from '../../../redux/features/login/loginAsynActions'
import { useNavigate, useLocation } from 'react-router-dom'
import { USER_FORGOT_PASSWORD_TYPE } from '../../../constants/asyncActionsType'
import Loader from '../../../components/common/spinner/Loader'

const ForgotPassword: FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { loading } = useAppSelector((state) => state.login)
  const render = useLocation().state
  console.log('render>>', render)
  const {
    register,
    handleSubmit,
    // setError,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<IForgotPasswordForm>()

  const onSubmit: SubmitHandler<IForgotPasswordForm> = (data) => {
    console.log('key>', data)
    dispatch(userForgotpassword(requestGenerator(data))).then((e) => {
      if (e.type === `${USER_FORGOT_PASSWORD_TYPE}/fulfilled`) {
        navigate('/otpverfication', {
          state: { email: data?.email, renderOtp: true },
        })
        // dispatch(setPhoneNo(data)) // set user phone no in redux
      }
    })
  }
  useEffect(() => {
    if (!render?.renderForgotPassword) {
      navigate('/')
    }
  }, [navigate, render?.renderForgotPassword])
  return (
    <>
      {loading && <Loader />}
      <p className={styles.formTitle}>Forgot Password</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className={styles.forgotPasswordContent}>
          Please enter your Email Address below to receive your OTP.
        </p>
        <div className={styles.formContainer}>
          <div className={styles.forgotPasswordForm}>
            <span className={styles.iconLabelStyle}>
              <EmailIcon customClass={styles.iconCustomClass} />
              <label
                htmlFor={FORGOT_PASSWORD_EMAIL}
                className={styles.labelStyle}
              >
                Email
              </label>
            </span>

            <div className={styles.inputFieldContainer}>
              <input
                type="text"
                placeholder="example@email.com"
                className={styles.inputFieldStyle}
                {...register(
                  FORGOT_PASSWORD_EMAIL,
                  forgotPasswordValidators[FORGOT_PASSWORD_EMAIL]
                )}
              />
            </div>
            <p className="errorText">
              {errors[FORGOT_PASSWORD_EMAIL] && (
                <span className="error">
                  {errors[FORGOT_PASSWORD_EMAIL].message}
                </span>
              )}
            </p>
          </div>
          <Button
            title="Send OTP"
            type="submit"
            disable={loading}
            customClass={styles.sendOtpButtonStyle}
          />
          <Button
            title="Go Back"
            type="button"
            disable={loading}
            customClass={styles.goBackButton}
            handleClick={() => navigate('/')}
          />
        </div>
      </form>
    </>
  )
}

export default ForgotPassword

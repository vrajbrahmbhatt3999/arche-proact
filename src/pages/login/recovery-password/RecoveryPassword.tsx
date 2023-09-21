import { FC, useState, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Button from '../../../components/common/button/Button'
import EyeIcons from '../../../components/common/eye-icon/EyeIcon'
import Loader from '../../../components/common/spinner/Loader'
import { PasswordIcon } from '../../../components/common/svg-components'
import { CONFIRM_NEW_PASSWORD, NEW_PASSWORD } from '../../../constants/constant'
import { recoveryPasswordValidators } from '../../../form-validators/recoveryPasswordValidators'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import {
  IRecoveryPasswordInputs,
  passwordType,
} from '../../../interfaces/interfaces'
import { userResetPassword } from '../../../redux/features/login/loginAsynActions'
import { requestGenerator } from '../../../utils/payloadGenerator'
import styles from './recoveryPassword.module.scss'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { RESET_PASSWORD_TYPE } from '../../../constants/asyncActionsType'

const RecoveryPassword: FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { loading, resetPWDToken } = useAppSelector((state) => state.login)
  const state = useLocation().state
  const [passwordType, setPasswordType] = useState<passwordType>('password')
  const [confirmPasswordType, setConfirmPasswordType] =
    useState<passwordType>('password')

  const {
    register,
    handleSubmit,
    // setError,
    formState: { errors },
  } = useForm<IRecoveryPasswordInputs>()
  const token = useLocation().search

  const onSubmit: SubmitHandler<IRecoveryPasswordInputs> = (data) => {
    const payload = {
      ...data,
      token: resetPWDToken ? resetPWDToken : token ? token?.split('=')[1] : '',
    }
    dispatch(userResetPassword(requestGenerator(payload))).then((e) => {
      if (e.type === `${RESET_PASSWORD_TYPE}/fulfilled`) {
        navigate('/')
      }
    })
  }
  useEffect(() => {
    if (!state?.renderResetPassword && !token) {
      navigate('/')
    }
  }, [navigate, state?.renderResetPassword, token])

  return (
    <>
      {loading && <Loader />}
      <p className={styles.formTitle}>Set Password</p>
      <div>
        <p className={styles.forgotPasswordContent}>
          Please create new passoword that you don't use or any other site.
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.loginForm}>
            <span className={styles.iconLabelStyle}>
              <PasswordIcon customClass={styles.iconCustomClass} />
              <label htmlFor={NEW_PASSWORD} className={styles.labelStyle}>
                Password
              </label>
            </span>
            <div>
              <span style={{ position: 'relative' }}>
                <input
                  type={passwordType}
                  placeholder="Enter new password"
                  className={styles.inputFieldStyle}
                  {...register(
                    NEW_PASSWORD,
                    recoveryPasswordValidators[NEW_PASSWORD]
                  )}
                />
                <EyeIcons
                  passwordType={passwordType}
                  setPasswordType={setPasswordType}
                  customClass={styles.eyeIcon}
                />
              </span>
              {errors[NEW_PASSWORD] && (
                <p className="errorText">
                  <span className="error">{errors[NEW_PASSWORD].message}</span>
                </p>
              )}
            </div>
          </div>
          <div className={styles.loginForm}>
            <span className={styles.iconLabelStyle}>
              <PasswordIcon customClass={styles.iconCustomClass} />
              <label
                htmlFor={CONFIRM_NEW_PASSWORD}
                className={styles.labelStyle}
              >
                Confirm Password
              </label>
            </span>
            <div>
              <span style={{ position: 'relative' }}>
                <input
                  type={confirmPasswordType}
                  placeholder="Enter confirm password"
                  className={styles.inputFieldStyle}
                  {...register(
                    CONFIRM_NEW_PASSWORD,
                    recoveryPasswordValidators[CONFIRM_NEW_PASSWORD]
                  )}
                />
                <EyeIcons
                  passwordType={confirmPasswordType}
                  setPasswordType={setConfirmPasswordType}
                  customClass={styles.eyeIcon}
                  handleClick={() => setConfirmPasswordType('password')}
                />
              </span>
              {errors[CONFIRM_NEW_PASSWORD] && (
                <p className="errorText">
                  <span className="error">
                    {errors[CONFIRM_NEW_PASSWORD].message}
                  </span>
                </p>
              )}
            </div>
          </div>
          <Button
            title="Reset Password"
            type="submit"
            disable={loading}
            customClass={styles.loginButtonStyle}
          />
        </form>
      </div>
    </>
  )
}

export default RecoveryPassword

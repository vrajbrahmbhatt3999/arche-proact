import { FC, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Button from '../../components/common/button/Button'
import OTPInput from 'react-otp-input'
import styles from './submitOtp.module.scss'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IVerifyOtpForm } from '../../interfaces/interfaces'
import { useAppDispatch, useAppSelector } from '../../hooks/index'
import { OTP } from '../../constants/constant'
import { otpValidators } from '../../form-validators/otpValidators'
import loginBackgroundImage from '../../assets/images/loginImage.png'
import logo from '../../assets/images/proactlatestlogo.png'
import { requestGenerator } from '../../utils/payloadGenerator'
import {
  questionnairesOtpReSend,
  questionnairesOtpSend,
  questionnairesOtpVerify,
} from '../../redux/features/receptionist/receptionistAsyncActions'
import Loader from '../../components/common/spinner/Loader'
import useTimer from '../../hooks/useTimer'
import {
  failure,
  formOneData,
  formThreeData,
  formTwoData,
  questionData,
} from '../../constants/data'
import { setMessage } from '../../redux/features/toast/toastSlice'
import {
  setFormNameData,
  setInitialQuestionnaireData,
} from '../../redux/features/patient-emr/patient/patientSlice'
import { getSearchQueryinObject } from '../../utils/utils'

interface ISubmitOtp {
  [OTP]: string
  requestId: string
  que_sentby_user_id: any
}

const SubmitOtp: FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const state = useLocation()
  const { counter, setCounter } = useTimer({ limit: 120 })
  const { formNameData } = useAppSelector((state) => state.patient)

  console.log('state', state.search)
  let queryPara = state.search
  const emailRegex = /[\w-]+@[\w-]+\.[\w-]+/
  const email = queryPara.match(emailRegex)

  console.log('queryPara>>>>>>>>>>', queryPara)

  const formData = state.search
  const queryString = getSearchQueryinObject(state.search)

  console.log('search', queryString)
  const { isLoading, otpInfo, numberOfotpAttempt } = useAppSelector(
    (state) => state.receptionist
  )

  useEffect(() => {
    dispatch(setFormNameData(formData.slice(-5)))
  }, [])

  // console.log("formNameData>>", formNameData);

  useEffect(() => {
    if (formNameData === 'form1') {
      dispatch(setInitialQuestionnaireData(formOneData))
    } else if (formNameData === 'form2') {
      dispatch(setInitialQuestionnaireData(formTwoData))
    } else if (formNameData === 'form3') {
      dispatch(setInitialQuestionnaireData(formThreeData))
    }
  }, [formNameData])

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<ISubmitOtp>()
  function handleChange(otp: any) {
    setValue(OTP, otp)
    trigger(OTP)
  }
  const onSubmit: SubmitHandler<ISubmitOtp> = (data) => {
    data.requestId = otpInfo?.requestId
    data.que_sentby_user_id = queryString?.uid
    dispatch(questionnairesOtpVerify(requestGenerator(data))).then((e) => {
      // console.log("e", e);
      if (e.type === 'receptionist/questionnaireOtpVerify/fulfilled') {
        navigate(
          `/submitquestionnairelayout?email=${queryString?.email}&form=${queryString?.form}&uid=${queryString?.uid}`
        )
      }
    })
  }

  useEffect(() => {
    if (numberOfotpAttempt > 3) {
      navigate('/')
    }
  }, [numberOfotpAttempt])

  const handleResend = () => {
    let data = {
      patient_email: queryString?.email,
      que_sentby_user_id: queryString?.uid,
    }
    if (numberOfotpAttempt >= 3) {
      let toastData = {
        message: 'You are not authorized',
        type: failure,
      }
      navigate('/')
      dispatch(setMessage(toastData))
    } else {
      dispatch(questionnairesOtpReSend(requestGenerator(data))).then((e) => {
        console.log('ee', e)
        if (e.type === 'receptionist/questionnaireOtpReSend/fulfilled') {
          setCounter(120)
        }
      })
    }

    setValue(OTP, '')
  }

  useEffect(() => {
    let data = {
      patient_email: queryString?.email,
      que_sentby_user_id: queryString?.uid,
    }
    dispatch(questionnairesOtpSend(requestGenerator(data)))
  }, [])

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.mainContainer}>
        <div className={styles.logoContainer}>
          <img src={logo} alt="error to display" />
        </div>
        <div className={styles.container}>
          <div className={styles.formStyleContainer}>
            <div className={styles.formStyle}>
              <>
                <p className={styles.formTitle}>OTP</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <p className={styles.otpContent}>
                    Put the OTP below sent to your Email Address{' '}
                    {queryString?.email}
                  </p>
                  <div className={styles.formContainer}>
                    <div className={styles.otpForm}>
                      <div className={styles.otpInputStyle}>
                        <OTPInput
                          value={getValues(OTP)}
                          {...register(OTP, otpValidators[OTP])}
                          onChange={handleChange}
                          numInputs={6}
                          separator={<span style={{ width: '8px' }}></span>}
                          isInputNum={true}
                          shouldAutoFocus={true}
                          inputStyle={styles.inputStyle}
                          focusStyle={styles.focusStyle}
                        />
                        {errors[OTP] && (
                          <p className="errorText">
                            <span className="error">{errors[OTP].message}</span>
                          </p>
                        )}
                      </div>
                      <p className={styles.atemptContainer}>
                        <span className={styles.noOfAttempts}>
                          {numberOfotpAttempt} / 3 attempts -
                          {counter === 0
                            ? 'Otp has expired'
                            : `Otp will expires in ${counter} sec`}
                        </span>
                        {counter === 0 && (
                          <span
                            className={styles.resendLinkStyle}
                            onClick={() => handleResend()}
                          >
                            Resend OTP
                          </span>
                        )}
                      </p>
                    </div>
                    <Button
                      title="Submit OTP"
                      type="submit"
                      customClass={styles.verifyOtpButtonStyle}
                    />
                  </div>
                </form>
              </>
            </div>
          </div>
          <div className={styles.landingPageImageContainer}>
            <img
              src={loginBackgroundImage}
              className={styles.landingPageImageStyle}
              alt="error to display"
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default SubmitOtp

import { FC, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../../../components/common/button/Button";
import OTPInput from "react-otp-input";
import styles from "./otpVerfication.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { IVerifyOtpForm } from "../../../interfaces/interfaces";
import { useAppSelector } from "../../../hooks";
import Loader from "../../../components/common/spinner/Loader";
import { useAppDispatch } from "../../../hooks/index";
import { requestGenerator } from "../../../utils/payloadGenerator";
import {
  userResendOtp,
  userVerifyOtp,
} from "../../../redux/features/login/loginAsynActions";
import {
  RESEND_OTP_TYPE,
  VERIFY_OTP_TYPE,
} from "../../../constants/asyncActionsType";
import { OTP } from "../../../constants/constant";
import { otpValidators } from "../../../form-validators/otpValidators";
import useTimer from "../../../hooks/useTimer";
import { setOtpAttempts } from "../../../redux/features/login/loginSlice";

const OtpVerfication: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, otpRequestId, otpAttempt, resetPWDToken } = useAppSelector(
    (state) => state.login
  );
  const state = useLocation().state;
  const {
    register,
    handleSubmit,
    // setError,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<IVerifyOtpForm>();
  function handleChange(otp: any) {
    setValue(OTP, otp);
    trigger(OTP);
  }
  const onSubmit: SubmitHandler<IVerifyOtpForm> = (data) => {
    const otpPayload = {
      customerAuthentication: {
        otp: {
          requestId: otpRequestId?.requestId, // here you can also use useLocation state by passing it from forgot password
          requestType: "forgotPass",
          otpPin: data.otpPin,
        },
      },
    };
    dispatch(userVerifyOtp(requestGenerator(otpPayload))).then((e) => {
      if (e.type === `${VERIFY_OTP_TYPE}/fulfilled`) {
        navigate(`/resetpassword`, {
          state: { email: state?.email, renderResetPassword: true },
        });
      }
    });
  };
  const { counter, setCounter } = useTimer({ limit: 120 });
  const handleResend = () => {
    const payload = {
      email: state?.email,
    };
    console.log(payload);
    dispatch(userResendOtp(requestGenerator(payload))).then((e) => {
      if (e.type === `${RESEND_OTP_TYPE}/fulfilled`) {
        setCounter(120);
      }
    });
    setValue(OTP, '')
  };
  useEffect(() => {
    if (otpAttempt >= 3) {
      navigate("/forgotpassword", { state: { renderForgotPassword: true } });
    }
  }, [navigate, otpAttempt]);

  useEffect(() => {
    return () => {
      dispatch(setOtpAttempts(0));
    };
  }, [dispatch]);

  useEffect(() => {
    if (!state?.renderOtp) {
      navigate("/");
    }
  }, [navigate, state?.renderOtp]);

  return (
    <>
      {loading && <Loader />}
      <p className={styles.formTitle}>OTP</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className={styles.otpContent}>
          Put the OTP below sent to your number {state?.email ?? ""}
        </p>
        <div className={styles.formContainer}>
          <div className={styles.otpForm}>
            <div className={styles.otpInputStyle}>
              <OTPInput
                value={getValues(OTP)}
                {...register(OTP, otpValidators[OTP])}
                onChange={handleChange}
                numInputs={6}
                separator={<span style={{ width: "8px" }}></span>}
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
                {otpAttempt} / 3 attempts -
                {counter === 0
                  ? "Otp has expired"
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
            title="Verify OTP"
            disable={loading}
            type="submit"
            customClass={styles.verifyOtpButtonStyle}
          />
        </div>
      </form>
    </>
  );
};

export default OtpVerfication;

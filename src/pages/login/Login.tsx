import { useState, FC, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import styles from './login.module.scss';
import { loginValidators } from '../../form-validators/loginValidators';
import {
  EmailIcon,
  PasswordIcon,
} from '../../components/common/svg-components';
import Button from '../../components/common/button/Button';
import { ILoginFormInputs, passwordType } from '../../interfaces/interfaces';
import EyeIcons from '../../components/common/eye-icon/EyeIcon';
import { EMAIL, PASSWORD } from '../../constants/constant';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { filterSideBarData, uuid } from '../../utils/utils';
import { requestGenerator } from '../../utils/payloadGenerator';
import {
  fetchFirebaseToken,
  setActiveRole,
  setEncryptionKey,
} from '../../redux/features/login/loginSlice';
import {
  getAllMasterValueData,
  getSideBarData,
  userLogin,
} from '../../redux/features/login/loginAsynActions';
import { getPatientBranchList } from '../../redux/features/patient-emr/patient/patientAsyncAction';
import {
  GET_ALL_BRANCH_LIST,
  GET_SIDEBAR_TYPE,
  USER_LOGIN_TYPE,
} from '../../constants/asyncActionsType';
import Loader from '../../components/common/spinner/Loader';
import { mainSidebarData } from '../../constants/routesPermission/mainSidebarData';

const Login: FC = () => {
  console.log(
    'process.env.REACT_APP_BASE_URL_AUTH=',
    process.env.REACT_APP_BASE_URL_AUTH
  );
  console.log(
    'process.env.REACT_APP_BASE_URL=',
    process.env.REACT_APP_BASE_URL
  );

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [passwordType, setPasswordType] = useState<passwordType>('password');
  const { loading, userData } = useAppSelector((state) => state.login);
  // useEffect(() => {
  //   if (userData?.role) {
  //     const { navigateTo } = navigateAfterLogin(userData?.role)
  //     navigateTo && navigate(navigateTo)
  //   }
  // }, [userData?.role])
  const {
    register,
    handleSubmit,
    // setError,
    formState: { errors },
  } = useForm<ILoginFormInputs>();

  const onSubmit: SubmitHandler<ILoginFormInputs> = (data) => {
    const staticKey: string = uuid();

    dispatch(setEncryptionKey(staticKey));
    dispatch(userLogin(requestGenerator(data))).then((e) => {
      if (e.type === `${USER_LOGIN_TYPE}/fulfilled`) {
        // if ('serviceWorker' in navigator) {
        //   console.log('coming in if for service-worker')
        //   try {
        //     navigator.serviceWorker.register('../../firebase-messaging-sw')
        //   } catch (e) {
        //     console.log(e)
        //   }
        // }
        dispatch(fetchFirebaseToken());
        dispatch(getPatientBranchList(requestGenerator({}))).then(
          (profileEvent) => {
            if (profileEvent.type === `${GET_ALL_BRANCH_LIST}/fulfilled`) {
              // const { navigateTo } = navigateAfterLogin(e?.payload?.role)
              console.log('getdata', profileEvent.payload);
              if (profileEvent.payload?.rolesArray) {
                const activeRole = {
                  label: profileEvent.payload?.rolesArray[0]?.name,
                  value: profileEvent.payload?.rolesArray[0]?._id,
                };
                dispatch(setActiveRole(activeRole));
                dispatch(
                  getSideBarData(
                    requestGenerator({ role_id: activeRole?.value })
                  )
                ).then((sidebarEvent) => {
                  if (sidebarEvent.type === `${GET_SIDEBAR_TYPE}/fulfilled`) {
                    const moduleIdArr = sidebarEvent.payload?.map(
                      (item: any) => item?.moduleId
                    );
                    const data = filterSideBarData(
                      moduleIdArr,
                      mainSidebarData
                    );
                    console.log('datalogin', data);
                    // navigate(
                    //   data[0]?.navigate ? data[0]?.navigate : '/notfound'
                    // )
                    navigate(
                      data[0]?.navigateAfterLogin
                        ? data[0]?.navigateAfterLogin
                        : data[0]?.navigate
                        ? data[0]?.navigate
                        : '/'
                    );
                  }
                });
              }
              dispatch(
                getAllMasterValueData(
                  requestGenerator({
                    category_name: [
                      'REFERRAL_DOCTOR',
                      'APPOINTMENT_TAG',
                      'DIAGNOSIS_STATUS',
                      'DIAGNOSIS_MAIN_COMPLAINT',
                      'TREATMENT_SERVICE',
                      'DOCUMENT_CATEGORY',
                      'APPOINTMENT_STATUS',
                      'INVENTORY_UNIT_TYPE',
                      'DENTAL_DIAGNOSIS_MAIN_COMPLAINT',
                      'CURRENCY',
                    ],
                    search: '',
                  })
                )
              );
            }
          }
        );
      }
    });
  };

  return (
    <>
      {loading && <Loader />}
      <p className={styles.formTitle}>Sign in</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.loginForm}>
          <span className={styles.iconLabelStyle}>
            <EmailIcon customClass={styles.iconCustomClass} />
            <label htmlFor={EMAIL} className={styles.labelStyle}>
              Email
            </label>
          </span>
          <div className={styles.inputFieldContainer}>
            <input
              type="text"
              placeholder="Enter email"
              className={styles.inputFieldStyle}
              {...register(EMAIL, loginValidators[EMAIL])}
              // onChange={(e) => trimValue(e)}
            />
            <p className={styles.errorText}>
              {errors.email && (
                <span className="error">{errors.email.message}</span>
              )}
            </p>
          </div>
        </div>
        <div className={styles.loginForm}>
          <span className={styles.iconLabelStyle}>
            <PasswordIcon customClass={styles.iconCustomClass} />
            <label htmlFor={PASSWORD} className={styles.labelStyle}>
              Password
            </label>
          </span>
          <div>
            <span style={{ position: 'relative' }}>
              <input
                type={passwordType}
                placeholder="Enter password"
                className={styles.inputFieldStyle}
                {...register(PASSWORD, loginValidators[PASSWORD])}
                // onChange={(e) => trimValue(e)}
              />
              <EyeIcons
                passwordType={passwordType}
                setPasswordType={setPasswordType}
                customClass={styles.eyeIcon}
                handleClick={() => setPasswordType('password')}
              />
            </span>
            <p className={styles.errorText}>
              {errors.password && (
                <span className="error">{errors.password.message}</span>
              )}
            </p>
          </div>
        </div>
        <Button
          title="Sign in"
          type="submit"
          customClass={styles.loginButtonStyle}
          disable={loading}
        />{' '}
        <div className={styles.forgotPasswordStyle}>
          <span
            onClick={() =>
              navigate('/forgotpassword', {
                state: { renderForgotPassword: true },
              })
            }
          >
            Forgot password?
          </span>
        </div>
      </form>
    </>
  );
};

export default Login;

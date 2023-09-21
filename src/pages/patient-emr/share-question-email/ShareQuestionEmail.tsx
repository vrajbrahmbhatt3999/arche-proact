import { FC, useState, useEffect } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Button from '../../../components/common/button/Button'
import Loader from '../../../components/common/spinner/Loader'
import {
  CC_MAIL,
  EMAIL_BODY,
  FORM_DATA,
  PATIENT_NAME_SQ,
  PATIENT_NUMBER,
  SUBJECT,
  SUBMIT_OTP_URL,
  TO_MAIL,
} from '../../../constants/constant'
import { shareQuestionEmailValidators } from '../../../form-validators/shareQuestionEmailValidators'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { shareQuestionnaireLink } from '../../../redux/features/receptionist/receptionistAsyncActions'
import { requestGenerator } from '../../../utils/payloadGenerator'
import { trimValue } from '../../../utils/utils'
import styles from './shareQuestionEmail.module.scss'
import { clearPatientHistory } from '../../../redux/features/diagnosis/diagnosisSlice'
import PhoneInput from 'react-phone-input-2'
import Select from 'react-select'
import { getAllCreateNewForms } from '../../../redux/features/create-new-form/createNewFormAsynActions'

interface IShareQuestionEmail {
  patient_email?: string
  cc?: any
  subject?: string
  body?: any
  name?: any
  phone_no?: any
  questionnaire_form?: any
}

const ShareQuestionEmail: FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { isLoading } = useAppSelector((state) => state.receptionist)
  const { patientDataObjectById } = useAppSelector((state) => state.patient)
  const { createNewFormData } = useAppSelector((state) => state.createNewForm)
  const { userData } = useAppSelector((state) => state.login)
  console.log('formList data', createNewFormData)
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    reset,
    getValues,
    control,
    formState: { errors },
  } = useForm<IShareQuestionEmail>({})

  const questionnaireLink =
    `${SUBMIT_OTP_URL}?uid=${userData?.uid}` +
    '&email=' +
    `${patientDataObjectById?.email}`

  const questionnaireLinkNew = `${SUBMIT_OTP_URL}?uid=${userData?.uid}` + '&'

  const [mailLink, setMailLink] = useState(questionnaireLinkNew)
  const [formText, setFormText] = useState<any>()

  const [isFocused, setIsFocused] = useState(false)

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  const [body, setBody] = useState(
    patientDataObjectById?.email !== undefined ? questionnaireLink : mailLink
  )

  const [bodyText, setBodyText] = useState(
    patientDataObjectById?.email !== undefined ? questionnaireLink : mailLink
  )

  const onSubmit: SubmitHandler<IShareQuestionEmail> = (data: any) => {
    // console.log("reqData>>>>>", reqData);

    let payloadData = {
      body: bodyText,
      cc: data.cc,
      name: data.name,
      patient_email: data.patient_email,
      phone_no: data.phone_no,
      subject: data.subject,
    }

    data.body = bodyText

    // console.log("data>>>>>>>", data);

    if (isFocused === false) {
      dispatch(shareQuestionnaireLink(requestGenerator(payloadData))).then(
        (e) => {
          if ((e.type = 'receptionist/shareQuestionnaireLink/fulfilled')) {
            navigate('/patientemr')
            dispatch(clearPatientHistory())
          }
        }
      )
    } else {
      dispatch(shareQuestionnaireLink(requestGenerator(payloadData))).then(
        (e) => {
          if ((e.type = 'receptionist/shareQuestionnaireLink/fulfilled')) {
            navigate('/patientemr')
            dispatch(clearPatientHistory())
          }
        }
      )
    }
  }

  useEffect(() => {
    if (patientDataObjectById.phone !== undefined) {
      setValue(PATIENT_NUMBER, patientDataObjectById.phone)
    }
  }, [patientDataObjectById])

  let questionFormData = [
    {
      value: 'form1',
      label: 'Form1',
    },
    {
      value: 'form2',
      label: 'Form2',
    },
    {
      value: 'form3',
      label: 'Form3',
    },
  ]

  // ** divyaraj development with dynamic formbuilder ** //

  const [formData, setFormData] = useState<any>([])

  useEffect(() => {
    const requestData = {
      search: '',
      page: 1,
      pageSize: 500,
    }
    dispatch(getAllCreateNewForms(requestGenerator(requestData)))
  }, [dispatch])

  useEffect(() => {
    if (createNewFormData && createNewFormData?.length > 0) {
      const data = createNewFormData?.map((item: any) => {
        return {
          label: item?.name,
          value: item?._id,
        }
      })
      console.log('formData', formData)
      setFormData(data)
    } else {
      setFormData([])
    }
  }, [createNewFormData])

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.mainContainer}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.labelField}>
            <label className={styles.labelText} style={{ width: '70px' }}>
              Question Form <span className="asterick">*</span>
            </label>
            <div
              className={styles.fieldErrorContainer}
              style={{ width: '250px' }}
            >
              <Select
                className={styles.select}
                placeholder="Form"
                closeMenuOnSelect={true}
                isSearchable={true}
                options={formData}
                {...register(
                  FORM_DATA,
                  shareQuestionEmailValidators[FORM_DATA]
                )}
                onChange={(e: any) => {
                  setValue(FORM_DATA, e.value)
                  trigger(FORM_DATA)
                  setFormText(e.value)
                  // if (formText !== undefined) {
                  //   setBodyText(bodyText.slice(-5));
                  // }
                  // setBody(questionnaireLinkNew + "form=" + e.value);
                  // setMailLink(questionnaireLinkNew + e.value);
                  // setBodyText(body)
                  setBodyText(body + '&form=' + e.value)
                }}
                // value={selectMarket}
                maxMenuHeight={200}
              />
              {errors[FORM_DATA] && (
                <p className="errorText">{errors[FORM_DATA].message as any}</p>
              )}
            </div>
          </div>
          <div className={styles.combineFields}>
            <div className={styles.labelField}>
              <label className={styles.labelText}>
                Patient Name <span className="asterick">*</span>
              </label>
              <div className={styles.fieldErrorContainer}>
                <input
                  type="text"
                  className={styles.inputField}
                  placeholder="Andrew Davidson"
                  defaultValue={
                    patientDataObjectById.name !== undefined
                      ? patientDataObjectById?.name
                      : ''
                  }
                  {...register(
                    PATIENT_NAME_SQ,
                    shareQuestionEmailValidators[PATIENT_NAME_SQ]
                  )}
                  onChange={(e) => {
                    trimValue(e)
                    // setBody(questionnaireLinkNew + e.target.value);
                    // setMailLink(questionnaireLinkNew + e.target.value);
                  }}
                />
                {errors[PATIENT_NAME_SQ] && (
                  <p className="errorText">
                    {errors[PATIENT_NAME_SQ].message as any}
                  </p>
                )}
              </div>
            </div>
            <div className={styles.labelField}>
              <label className={styles.labelTextName}>
                Mobile Number <span className="asterick">*</span>
              </label>
              <div className={styles.fieldErrorContainer}>
                <PhoneInput
                  country={'kw'}
                  {...register(
                    PATIENT_NUMBER,
                    shareQuestionEmailValidators[PATIENT_NUMBER]
                  )}
                  value={getValues(PATIENT_NUMBER)}
                  onChange={(phone) => {
                    const formattedPhone = phone && `+${phone}`
                    setValue(PATIENT_NUMBER, formattedPhone)
                    trigger(PATIENT_NUMBER)
                  }}
                  inputClass={styles.inputFieldPhone}
                />
                {errors[PATIENT_NUMBER] && (
                  <p className="errorText">
                    {errors[PATIENT_NUMBER].message as any}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className={styles.labelField}>
            <label className={styles.labelText}>
              To <span className="asterick">*</span>
            </label>
            <div className={styles.fieldErrorContainer}>
              <input
                type="text"
                className={styles.inputField}
                placeholder="abc@mail.com"
                defaultValue={
                  patientDataObjectById.email !== undefined
                    ? patientDataObjectById?.email
                    : ''
                }
                {...register(TO_MAIL, shareQuestionEmailValidators[TO_MAIL])}
                onChange={(e) => {
                  trimValue(e)
                  setBody(questionnaireLinkNew + 'email=' + e.target.value)
                  // setBody(
                  //   formText === undefined
                  //     ? questionnaireLinkNew + "email=" + e.target.value
                  //     : questionnaireLinkNew +
                  //         "email=" +
                  //         e.target.value +
                  //         "&form=" +
                  //         formText
                  // );
                  setBodyText(
                    formText === undefined
                      ? questionnaireLinkNew + 'email=' + e.target.value
                      : questionnaireLinkNew +
                          'email=' +
                          e.target.value +
                          '&form=' +
                          formText
                  )
                  setMailLink(questionnaireLinkNew + e.target.value)
                }}
              />
              {errors[TO_MAIL] && (
                <p className="errorText">{errors[TO_MAIL].message}</p>
              )}
            </div>
          </div>
          <div className={styles.labelField}>
            <label className={styles.labelText}>CC</label>
            <div className={styles.fieldErrorContainer}>
              <Controller
                name={CC_MAIL}
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder="abc@mail.com"
                    className={styles.inputField}
                    onBlur={(event) => {
                      const emailsArray = event.target.value
                        .split(',')
                        .map((email) => email.trim())
                        .join(',')
                      field.onChange(emailsArray)
                    }}
                  />
                )}
              />
            </div>
          </div>
          <div className={styles.labelField}>
            <label className={styles.labelText}>
              Subject <span className="asterick">*</span>
            </label>
            <div className={styles.fieldErrorContainer}>
              <input
                type="text"
                placeholder="Enter subject"
                className={styles.inputField}
                defaultValue={
                  patientDataObjectById?.emr_no !== undefined
                    ? `FileNo - ${patientDataObjectById?.emr_no} Submit Questionnaire`
                    : ''
                }
                {...register(SUBJECT, shareQuestionEmailValidators[SUBJECT])}
                onChange={(e) => trimValue(e)}
              />
              {errors[SUBJECT] && (
                <p className="errorText">{errors[SUBJECT].message}</p>
              )}
            </div>
          </div>
          <div className={styles.labelField}>
            <label className={styles.labelText}>
              Body <span className="asterick">*</span>
            </label>
            <div className={styles.fieldErrorContainer}>
              <textarea
                placeholder="Enter body text"
                className={styles.inputFieldBody}
                value={bodyText}
                {...register(
                  EMAIL_BODY,
                  shareQuestionEmailValidators[EMAIL_BODY]
                )}
                onChange={(e) => {
                  trimValue(e)
                  setBodyText(e.target.value)
                }}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
          </div>
          <div className={styles.btnContainer}>
            <Button title="Submit" />
            <Button
              title="Back"
              type="button"
              customClass={styles.backBtn}
              handleClick={() => {
                navigate('/patientemr')
                dispatch(clearPatientHistory())
              }}
            />
          </div>
        </form>
      </div>
    </>
  )
}

export default ShareQuestionEmail

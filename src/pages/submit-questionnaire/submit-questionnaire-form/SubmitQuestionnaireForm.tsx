import React, { FC, memo, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../hooks'
import { createMedicalHistory } from '../../../redux/features/patient-emr/patient/patientAsyncAction'

import { requestGenerator } from '../../../utils/payloadGenerator'
import {
  formatOutput,
  getSearchQueryinObject,
  trimValue,
} from '../../../utils/utils'
import styles from './submitQuestionnaireForm.module.scss'
import { useForm } from 'react-hook-form'
import { FILE_NO, NATIONALITY } from '../../../constants/constant'
import { submitQuestionValidators } from '../../../form-validators/submitQuestionValidators'
import Loader from '../../../components/common/spinner/Loader'
import { getAllCreateNewFormById } from '../../../redux/features/create-new-form/createNewFormAsynActions'
import { Form } from 'react-formio/lib/components'

const SubmitQuestionnaireForm: FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [queryParams, setQueryParams] = useState<any>({})
  const { isLoading } = useAppSelector((state) => state.patient)

  const state = useLocation()

  const {
    register,
    setError,
    watch,
    clearErrors,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IPatientEmr>({})
  const dropdownFormData = watch()
  interface IPatientEmr {
    [FILE_NO]: any
    [NATIONALITY]: any
  }

  const optionIDData = [
    {
      value: 'CIVIL_ID',
      label: 'Civil ID',
    },
    {
      value: 'PASSPORT_ID',
      label: 'Passport ID',
    },
  ]

  // ** divyaraj development ** //
  const queryString = getSearchQueryinObject(state.search)
  const { createNewFormByIdData } = useAppSelector(
    (state) => state.createNewForm
  )

  useEffect(() => {
    setQueryParams(queryString)
    const payload = {
      id: queryString?.form,
      que_sentby_user_id: queryString?.uid,
    }
    dispatch(getAllCreateNewFormById(requestGenerator(payload)))
  }, [])

  const checkErrors = () => {
    let valid: any = true

    if (!dropdownFormData?.[NATIONALITY]) {
      setError(NATIONALITY, {
        type: 'custom',
        message: 'Please select id',
      })
      valid = false
    } else {
      clearErrors(NATIONALITY)
      valid = true
    }
    if (!dropdownFormData?.[FILE_NO]) {
      setError(FILE_NO, {
        type: 'custom',
        message: 'Please enter id number',
      })
      valid = false
    } else {
      clearErrors(FILE_NO)
      valid = true
    }
    return valid
  }
  const [formData, setFormData] = useState({})
  const submitDynamicForm = (event: any) => {
    // event.preventDefault()
    setFormData(event.data)
    const valid = checkErrors()
    let questions: any[] = []
    const form = JSON.parse(createNewFormByIdData?.form)
    let formArray: any[] = []
    if (form && form?.components?.length > 0) {
      for (let i = 0; i < form?.components?.length; i++) {
        const item = form?.components[i]
        if (!item.action) {
          formArray.push(item)
        }
      }
    } else {
      formArray = []
    }

    for (let key in event?.data) {
      const foundQuestion = formArray?.find((item: any) => {
        if (item?.key === key) {
          return item
        }
      })
      // console.log('found', foundQuestion, form, formArray)

      if (foundQuestion?.label) {
        const value = event?.data[key]
        let obj = {
          question: foundQuestion?.label,
          answer:
            typeof value === 'boolean'
              ? value
                ? 'yes'
                : 'no'
              : typeof value === 'object'
              ? formatOutput(value)
              : value,
        }
        questions.push(obj)
      }
    }
    if (valid) {
      const payload: any = {
        patient_mail: queryParams?.email,
        ...dropdownFormData,
        questionnaire: questions,
        que_sentby_user_id: queryString?.uid,
      }
      dispatch(createMedicalHistory(requestGenerator(payload))).then((e) => {
        if (e.type === 'patient/createMedicalHistory/fulfilled') {
          navigate('/submitquestionnairelayout/questionnairesubmit')
        }
      })
    }
  }

  return (
    <>
      {isLoading && <Loader />}
      <form
        className={styles.submitQuestionContainer}
        // onSubmit={handleSubmit(submitDynamicForm)}
      >
        <div className={styles.headerContainer}>
          <p className={styles.title}>Submit Questionnaire</p>
          <div>
            <div className={styles.selectInputfieldContainer}>
              <select
                className={styles.selectField}
                {...register(
                  NATIONALITY,
                  submitQuestionValidators[NATIONALITY]
                )}
                // onChange={(e) => {
                //   setFormData(formData)
                //   setValue(NATIONALITY, e.target.value)
                // }}
              >
                <option value="">
                  National ID
                  <span className="asterick">*</span>
                </option>

                {optionIDData?.map((item: any, i: number) => {
                  return (
                    <React.Fragment key={i}>
                      <option value={item?.value}>{item?.label}</option>
                    </React.Fragment>
                  )
                })}
              </select>
              <input
                className={styles.selectinputField}
                type={
                  dropdownFormData?.[NATIONALITY] === 'CIVIL_ID'
                    ? 'number'
                    : 'text'
                }
                {...register(FILE_NO, submitQuestionValidators[FILE_NO])}
                // onChange={(e) => {
                //   trimValue(e)
                // }}
                // onChange={(e) => {
                //   setFormData(formData)
                //   trimValue(e)
                //   setValue(FILE_NO, e.target.value)
                // }}
              />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: '98%',
                height: '20px',
                marginLeft: '5px',
                justifyContent: 'space-between',
              }}
            >
              <div className={styles.errorContainer}>
                <span className={styles.extraSpan}></span>
                {errors[NATIONALITY] && (
                  <p className="dashboardFormError1">
                    {errors[NATIONALITY].message as any}
                  </p>
                )}
              </div>
              <div className={styles.errorContainer}>
                <span className={styles.extraSpan}></span>
                {errors[FILE_NO] && (
                  <p className="dashboardFormError1">
                    {errors[FILE_NO].message as any}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div style={{ minHeight: '300px' }}>
          <section className={styles.sectionContainer}>
            {createNewFormByIdData?.form && (
              <Form
                form={JSON.parse(createNewFormByIdData?.form)}
                onSubmit={(e: any) => submitDynamicForm(e)}
                submission={{ data: formData }}
                onChange={(data: any) => {}}
              />
            )}
            {/* <Component
              form={createNewFormByIdData?.form}
              submit={submitDynamicForm}
            /> */}
          </section>
        </div>
      </form>
    </>
  )
}

// const Component = memo(({ form, submit }: any) => {
//   console.log('form render')
//   return (
//     form && (
//       <Form
//         form={JSON.parse(form)}
//         onSubmit={(e: any) => submit(e)}
//         // onChange={(data: any) => setFormData(data)}
//       />
//     )
//   )
// })

export default SubmitQuestionnaireForm

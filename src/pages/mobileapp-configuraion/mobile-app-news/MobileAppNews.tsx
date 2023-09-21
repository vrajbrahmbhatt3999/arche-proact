import { FC, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Button from '../../../components/common/button/Button'
import { medicalNewsArray } from '../../../constants/data'
import styles from './mobileAppNews.module.scss'
import {
  NEWS_TITLE,
  NEWS_DESCRIPTION,
} from '../../../constants/mobileAppConfigurationConstant'
import { IMedicalCenterNewsForm } from '../../../interfaces/mobileAppConfigurationInterfaces'
import { medicalCenterNewsValidators } from '../../../form-validators/mobileAppConfigurationValidators'
import { CREATE_MEDICAL_CENTER_NEWS } from '../../../constants/asyncActionsType'
import {
  createMedicalCenterNews,
  getAllMedicalCenterNews,
} from '../../../redux/features/mobile_app_configuration/mobileAppConfigurationAsyncActions'
import { requestGenerator } from '../../../utils/payloadGenerator'
import { useAppDispatch, useAppSelector } from '../../../hooks/index'
import Loader from '../../../components/common/spinner/Loader'
import { removeProperties } from '../../../utils/utils'

const MobileAppNews: FC = () => {
  const dispatch = useAppDispatch()
  const { isLoading, medicalCenterNewsData } = useAppSelector(
    (state) => state.mobileAppConfig
  )

  // get medical news data
  useEffect(() => {
    dispatch(getAllMedicalCenterNews(requestGenerator({})))
  }, [dispatch])

  // Form Handiling using react hook form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IMedicalCenterNewsForm>()

  // set default form data
  useEffect(() => {
    const propertiesToRemove = ['createdAt', 'updatedAt']

    if (medicalCenterNewsData.length > 0) {
      const updatedNews = removeProperties(
        medicalCenterNewsData,
        propertiesToRemove
      )
      let formData: any = { ...updatedNews }
      reset(formData)
    }
  }, [reset, medicalCenterNewsData])

  // Envoke on submit the form
  const onSubmit: SubmitHandler<IMedicalCenterNewsForm> = (data) => {
    const payload = Object.values(data)

    dispatch(createMedicalCenterNews(requestGenerator(payload))).then((e) => {
      if (e.type === `${CREATE_MEDICAL_CENTER_NEWS}/fulfilled`) {
        reset()
        dispatch(getAllMedicalCenterNews(requestGenerator({})))
      }
    })
  }

  // Function For Trim Input Field Data
  const handleChange = (e: any) => {
    const value = e.target.value
    if (value.length === 1 && value === ' ') {
      e.target.value = ''
    } else if (
      value.length > 1 &&
      value[0] === ' ' &&
      value[value.length - 1] === ' '
    ) {
      e.target.value = value.trim()
    }
  }

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.mobileAppNewsContainer}>
        <h1 className={styles.mobileAppNewsTitle}>Medical Center News</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.mobileAppNewsForm}
        >
          {medicalNewsArray.map((medicalNews) => {
            return (
              <div key={medicalNews.id} className={styles.formContainer}>
                <p className={styles.newsName}>{medicalNews.name}</p>
                <div className={styles.formFieldContainer}>
                  <div className={styles.inputFieldContainer}>
                    <label
                      htmlFor={`${medicalNews.id}.${NEWS_TITLE}`}
                      className={styles.formLabel}
                    >
                      News Title
                      <span className="asterick">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter News Title"
                      className={styles.formInput}
                      {...register(
                        `${medicalNews.id}.${NEWS_TITLE}`,
                        medicalCenterNewsValidators[NEWS_TITLE]
                      )}
                      onChange={(e) => {
                        handleChange(e)
                      }}
                    />
                  </div>
                  {errors[medicalNews.id]?.[NEWS_TITLE] && (
                    <div className={styles.errorContainer}>
                      <span className={styles.extraSpan}></span>
                      <p className="dashboardFormError">
                        {errors[medicalNews.id]?.[NEWS_TITLE]?.message}
                      </p>
                    </div>
                  )}
                </div>
                <div className={styles.formFieldContainer}>
                  <div className={styles.inputFieldContainer}>
                    <label
                      htmlFor={`${medicalNews.id}.${NEWS_DESCRIPTION}`}
                      className={styles.formLabel}
                    >
                      Description
                      <span className="asterick">*</span>
                    </label>
                    <textarea
                      className={styles.textArea}
                      placeholder="Enter Description"
                      {...register(
                        `${medicalNews.id}.${NEWS_DESCRIPTION}`,
                        medicalCenterNewsValidators[NEWS_DESCRIPTION]
                      )}
                      onChange={(e) => {
                        handleChange(e)
                      }}
                    />
                  </div>
                  {errors[medicalNews.id]?.[NEWS_DESCRIPTION] && (
                    <div className={styles.errorContainer}>
                      <span className={styles.extraSpan}></span>
                      <p className="dashboardFormError">
                        {errors[medicalNews.id]?.[NEWS_DESCRIPTION]?.message}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
          <div className={styles.formButtonContainer}>
            <Button title="Submit" type="submit" />
            <Button
              title="Reset"
              type="reset"
              customClass={styles.resetBtn}
              handleClick={() => reset()}
            />
          </div>
        </form>
      </div>
    </>
  )
}

export default MobileAppNews

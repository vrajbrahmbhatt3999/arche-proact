import { FC, useEffect, useState } from 'react'
import styles from './addReminderModal.module.scss'
import { useAppDispatch, useAppSelector } from '../../../../hooks'
import { IAddTodoReminder } from '../../../../interfaces/interfaces'
import { SubmitHandler, useForm } from 'react-hook-form'
import { CloseIcon } from '../../svg-components'
import { colors } from '../../../../constants/color'
import Loader from '../../spinner/Loader'
import Divider from '../../divider/Divider'
import Button from '../../button/Button'
import { TODO_REMINDER } from '../../../../constants/constant'
import { trimValue } from '../../../../utils/utils'
import { addReminderValidators } from '../../../../form-validators/addReminderValidators'
import { getAllTodoReminderLists } from '../../../../redux/features/doctor-dashboard/doctorDashboardAsyncActions'
import { requestGenerator } from '../../../../utils/payloadGenerator'

import { getAllTodoListById } from '../../../../redux/features/receptionist/receptionistAsyncActions'
import moment from 'moment'
import {
  createAppNotification,
  getAllNotificationList,
} from '../../../../redux/features/app-notifications/appNotificationAsyncActions'
import Toast from '../../toast/Toast'
import { userLogout } from '../../../../redux/features/login/loginAsynActions'
import { useNavigate } from 'react-router-dom'

interface IAddReminderModal {
  popData?: any
  setModelOpenClose?: any
}

const AddReminderModal: FC<IAddReminderModal> = ({
  popData,
  setModelOpenClose,
}) => {
  const dispatch = useAppDispatch()
  const { firebaseToken } = useAppSelector((state) => state?.login)
  const { isLoading } = useAppSelector((state) => state.doctor)
  const [initialDatetime, setInitialDatetime] = useState('')
  const navigate = useNavigate()
  useEffect(() => {
    let data = {
      id: popData?._id,
    }
    popData?._id && dispatch(getAllTodoListById(requestGenerator(data)))
  }, [dispatch])

  // FORM
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAddTodoReminder>({})
  const onSubmit: SubmitHandler<IAddTodoReminder> = async (data) => {
    const utcdate = moment(data.notification_date).utc().format('YYYY-MM-DD')
    const utctime = moment(data.notification_date).utc().format('HH:mm')
    let utscConvert = moment.utc(`${utcdate} ${utctime}`).toISOString()
    let reqPayload = {
      id: popData?._id,
      notification_date: utscConvert,
      registrationToken: firebaseToken,
      message: {
        title: popData?.title,
        body: popData?.description,
      },
    }

    let createPayloadData = {
      notification_type: 'TODO',
      title: popData?.title,
      body: popData?.description,
      notification_date: utscConvert,
    }
    dispatch(getAllTodoReminderLists(requestGenerator(reqPayload))).then(
      (e) => {
        console.log('e', e)
        if (e.type === 'doctor/getAllTodoReminderLists/fulfilled') {
          dispatch(createAppNotification(requestGenerator(createPayloadData)))
          setTimeout(() => {
            setModelOpenClose(false)
          }, 2000)
        } else if (
          e.payload === 'please allow notification access to continue'
        ) {
          setTimeout(() => {
            dispatch(userLogout(requestGenerator({})))
            navigate('/')
          }, 3000)
        }
      }
    )
  }

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.mainContainer}>
        <CloseIcon
          customClass={styles.closeIconStyle}
          fillColor={colors.green1}
        />
        <div
          className={styles.addCategoryContainer}
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <p className={styles.title}>Add Reminder</p>
          <Divider customClass={styles.dividerStyle} />

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.formLayoutContainer}>
              <div className={styles.formContainer}>
                <div className={styles.inputContainer}>
                  <div className={styles.inputTaskContainer}>
                    <div className={styles.labelField}>
                      <label
                        htmlFor={TODO_REMINDER}
                        className={styles.labelText}
                      >
                        Date and time
                        <span className="asterick">*</span>
                      </label>
                      <div className={styles.fieldErrorContainer}>
                        <input
                          type="datetime-local"
                          min={new Date().toISOString().split('T')[0]}
                          max="9999-12-31T23:59"
                          className={styles.inputField}
                          {...register(
                            TODO_REMINDER,
                            addReminderValidators[TODO_REMINDER]
                          )}
                          value={initialDatetime}
                          onChange={(e) => {
                            trimValue(e)
                            setInitialDatetime(e.target.value)
                          }}
                        />
                        <div className={styles.errorContainer}>
                          <span className={styles.extraSpan}></span>
                          {errors[TODO_REMINDER] && (
                            <p className="dashboardFormError">
                              {errors[TODO_REMINDER].message as any}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.buttonConatiner}>
                <Button title="Set" type="submit" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default AddReminderModal

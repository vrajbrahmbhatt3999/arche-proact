import { FC, useEffect, useState } from 'react'
import Button from '../../../../components/common/button/Button'
import {
  CheckIcon,
  UncheckIcon,
} from '../../../../components/common/svg-components'
import { colors } from '../../../../constants/color'
import { rangeData2 } from '../../../../constants/data'
import styles from './createUserSecondary.module.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  ICreateSecondaryFormInputs,
  IRangeData,
} from '../../../../interfaces/interfaces'
import {
  SHIFT1_END_TIME,
  SHIFT1_START_TIME,
  SHIFT2_DAYS,
  SHIFT2_END_TIME,
  SHIFT2_START_TIME,
} from '../../../../constants/constant'
import {
  createShift,
  editShift,
  getUserShiftById,
} from '../../../../redux/features/manage-user/ManageUserAsynActions'
import { requestGenerator } from '../../../../utils/payloadGenerator'
import { useAppDispatch, useAppSelector } from '../../../../hooks'
import Loader from '../../../../components/common/spinner/Loader'
import {
  ADD_MANAGE_USER,
  CREATE_USER_SHIFT_TYPE,
  UPDATE_USER_SHIFT_TYPE,
} from '../../../../constants/asyncActionsType'
import { SHIFT1_DAYS } from '../../../../constants/constant'
import { createSecondaryValidators } from '../../../../form-validators/createSecondaryValidators'
import { clearUserData } from '../../../../redux/features/manage-user/ManageUserSlice'

interface ICreateUserSecondary {
  selectedShiftOneDaysItems?: any
}

const CreateUserSecondary: FC<ICreateUserSecondary> = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const state = useLocation().state
  const { isLoading, userDetail, shiftData, shiftEdit, userId } =
    useAppSelector((state) => state.manageUser)
  const [shiftOneDays, setShiftOneDays] = useState<IRangeData[]>(rangeData2)
  const [shiftTwoDays, setShiftTwoDays] = useState<IRangeData[]>(rangeData2)
  const [shiftOneDaysError, setShiftoneDaysError] = useState<string>('')
  const [shiftTwoDaysError, setShiftTwoDaysError] = useState<string>('')
  const handleShiftOneDay = (item: IRangeData) => {
    const updatedRangeData = shiftOneDays.map((rangeItem: any) => {
      if (rangeItem.id === item.id) {
        return {
          ...rangeItem,
          status: !rangeItem.status,
        }
      } else {
        return rangeItem
      }
    })

    // check if any of the individual day status is false
    const hasAnyFalse = updatedRangeData.some(
      (rangeItem) => rangeItem.id !== 7 && !rangeItem.status
    )

    // update the status of the All CheckIcon based on the individual day statuses
    const updatedAllStatus = !hasAnyFalse
    const updatedRangeDataWithAll = updatedRangeData.map((rangeItem) => {
      if (rangeItem.id === 7) {
        return {
          ...rangeItem,
          status: updatedAllStatus,
        }
      } else {
        return rangeItem
      }
    })

    setShiftOneDays(updatedRangeDataWithAll)
  }
  const handleToggleAllShift1 = () => {
    const allStatus = !shiftOneDays[0].status

    const updatedRangeData = shiftOneDays.map((rangeItem: any) => {
      return {
        ...rangeItem,
        status: allStatus,
      }
    })
    setShiftOneDays(updatedRangeData)
  }
  const handleShiftTwoDay = (item: IRangeData) => {
    const updatedRangeData = shiftTwoDays.map((rangeItem: any) => {
      if (rangeItem.id === item.id) {
        return {
          ...rangeItem,
          status: !rangeItem.status,
        }
      } else {
        return rangeItem
      }
    })

    // check if any of the individual day status is false
    const hasAnyFalse = updatedRangeData.some(
      (rangeItem) => rangeItem.id !== 7 && !rangeItem.status
    )

    // update the status of the All CheckIcon based on the individual day statuses
    const updatedAllStatus = !hasAnyFalse
    const updatedRangeDataWithAll = updatedRangeData.map((rangeItem) => {
      if (rangeItem.id === 7) {
        return {
          ...rangeItem,
          status: updatedAllStatus,
        }
      } else {
        return rangeItem
      }
    })

    setShiftTwoDays(updatedRangeDataWithAll)
  }
  const handleToggleAllShift2 = () => {
    const allStatus = !shiftTwoDays[0].status

    const updatedRangeData = shiftTwoDays.map((rangeItem: any) => {
      return {
        ...rangeItem,
        status: allStatus,
      }
    })
    setShiftTwoDays(updatedRangeData)
  }

  const {
    register,
    reset,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ICreateSecondaryFormInputs>({})
  const formData = watch()
  const onSubmit: SubmitHandler<ICreateSecondaryFormInputs> = (data) => {
    const shift1Days = shiftOneDays
      .filter((item: any, index: number) => {
        return item?.status === true && item.id !== 7 // exclude All checkbox with id 7
      })
      .map((item: any, index: number) => {
        return item?.id
      })

    const shift2Days = shiftTwoDays
      .filter((item: any, index: number) => {
        return item?.status === true && item.id !== 7 // exclude All checkbox with id 7
      })
      .map((item: any, index: number) => {
        return item?.id
      })

    if (shiftData?._id) {
      const editPayload = {
        id: shiftData?._id,
        data: {
          [SHIFT1_START_TIME]: data[SHIFT1_START_TIME],
          [SHIFT1_END_TIME]: data[SHIFT1_END_TIME],
          [SHIFT1_DAYS]: shift1Days,
          [SHIFT2_START_TIME]: data[SHIFT2_START_TIME],
          [SHIFT2_END_TIME]: data[SHIFT2_END_TIME],
          [SHIFT2_DAYS]: shift2Days,
        },
      }
      if (shiftOneDaysError === '' && shiftTwoDaysError === '') {
        dispatch(editShift(requestGenerator(editPayload))).then((e) => {
          if (e.type === `${UPDATE_USER_SHIFT_TYPE}/fulfilled`) {
            navigate('/manageusers')
          }
        })
      }
    } else {
      const addPayload = {
        user_id: userId,
        shift: {
          [SHIFT1_START_TIME]: data[SHIFT1_START_TIME],
          [SHIFT1_END_TIME]: data[SHIFT1_END_TIME],
          [SHIFT1_DAYS]: shift1Days,
          [SHIFT2_START_TIME]: data[SHIFT2_START_TIME],
          [SHIFT2_END_TIME]: data[SHIFT2_END_TIME],
          [SHIFT2_DAYS]: shift2Days,
        },
      }
      if (shiftOneDaysError === '' && shiftTwoDaysError === '') {
        dispatch(createShift(requestGenerator(addPayload))).then((e) => {
          if (e.type === `${CREATE_USER_SHIFT_TYPE}/fulfilled`) {
            navigate('/manageusers')
          }
        })
      }
    }
  }

  useEffect(() => {
    if (!state) {
      navigate('/manageusers/createusers/primary')
    } else if (userId) {
      // dispatch(getUserShiftById(requestGenerator({ id: userDetail?._id }))) // need to use shift id instead of user id
      dispatch(getUserShiftById(requestGenerator({ id: userDetail?._id })))
    }
  }, [userId, dispatch])
  useEffect(() => {
    if (shiftData) {
      setValue(SHIFT1_START_TIME, shiftData?.shift_one_start)
      setValue(SHIFT1_END_TIME, shiftData?.shift_one_end)
      setValue(SHIFT2_START_TIME, shiftData?.shift_two_start)
      setValue(SHIFT2_END_TIME, shiftData?.shift_two_end)
      const shift1array = shiftOneDays?.map((item: any, index: number) => {
        if (shiftData?.shift_one_days?.includes(item?.id)) {
          const row = { ...item, status: true }
          return row
        } else {
          return item
        }
      })
      const tempArrShiftOne = shift1array.filter((item) => item.status)
      if (tempArrShiftOne.length === 7) {
        const finalShiftOne = shift1array?.map((item: any) => {
          if (item?.id === 7) {
            return { ...item, status: true }
          } else {
            return item
          }
        })
        setShiftOneDays(finalShiftOne)
      } else {
        setShiftOneDays(shift1array)
      }
      const shift2array = shiftTwoDays?.map((item: any, index: number) => {
        if (shiftData?.shift_two_days?.includes(item?.id)) {
          const row = { ...item, status: true }
          return row
        } else {
          return item
        }
      })
      const tempArrShiftTwo = shift2array.filter((item) => item.status)
      if (tempArrShiftTwo.length === 7) {
        const finalShiftOne = shift2array?.map((item: any) => {
          if (item?.id === 7) {
            return { ...item, status: true }
          } else {
            return item
          }
        })
        setShiftTwoDays(finalShiftOne)
      } else {
        setShiftTwoDays(shift2array)
      }
    }
  }, [reset, shiftData])

  useEffect(() => {
    return () => {
      dispatch(clearUserData())
    }
  }, [])

  const handleShiftDays = () => {
    const emptyShiftOne = shiftOneDays.every((item) => !item.status)
    const emptyShiftTwo = shiftTwoDays.every((item) => !item.status)
    emptyShiftOne
      ? setShiftoneDaysError('Please select days for shift one')
      : setShiftoneDaysError('')
    if (
      emptyShiftTwo &&
      formData[SHIFT2_START_TIME] &&
      formData[SHIFT2_END_TIME]
    ) {
      setShiftTwoDaysError('Please select days for shift two')
    } else {
      setShiftTwoDaysError('')
    }
    // emptyShiftTwo
    //   ? setShiftTwoDaysError('Please select days for shift two')
    //   : setShiftTwoDaysError('')
  }

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.mainContainer}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formLayoutContainer}>
            <div className={styles.formContainer}>
              <div className={styles.formTitle}>Shift 1</div>
              <div className={styles.inputContainer}>
                <div className={styles.labelField}>
                  <label
                    htmlFor={SHIFT1_START_TIME}
                    className={styles.labelText}
                  >
                    Start Time
                    <span className="asterick">*</span>
                  </label>
                  <div className={styles.fieldErrorContainer}>
                    <input
                      type="time"
                      className={styles.inputField}
                      {...register(
                        SHIFT1_START_TIME,
                        createSecondaryValidators[SHIFT1_START_TIME]
                      )}
                    />
                    <div className={styles.errorContainer}>
                      <span className={styles.extraSpan}></span>
                      {errors[SHIFT1_START_TIME] && (
                        <p className="dashboardFormError">
                          {errors[SHIFT1_START_TIME]?.message as any}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className={styles.labelField}>
                  <label htmlFor={SHIFT1_END_TIME} className={styles.labelText}>
                    End Time
                    <span className="asterick">*</span>
                  </label>
                  <div className={styles.fieldErrorContainer}>
                    <input
                      type="time"
                      className={styles.inputField}
                      {...register(
                        SHIFT1_END_TIME,
                        createSecondaryValidators[SHIFT1_END_TIME]
                      )}
                    />
                    <div className={styles.errorContainer}>
                      <span className={styles.extraSpan}></span>
                      {errors[SHIFT1_END_TIME] && (
                        <p className="dashboardFormError">
                          {errors[SHIFT1_END_TIME]?.message as any}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.weekDaysContainer}>
                <label className={styles.labelText}>
                  Select Days
                  <span className="asterick">*</span>
                </label>
                <div className={styles.selectDaysContainer}>
                  <span onClick={() => handleToggleAllShift1()}>
                    {shiftOneDays[0].status ? (
                      <CheckIcon fillColor={colors.green1} />
                    ) : (
                      <UncheckIcon fillColor={colors.grey2} />
                    )}
                  </span>
                  <p className={styles.daysNameStyle}>
                    {shiftOneDays[0].title}
                  </p>
                </div>
                {shiftOneDays?.map((item: IRangeData, index: number) => {
                  return (
                    index !== 0 && (
                      <div className={styles.selectDaysContainer} key={index}>
                        <span onClick={() => handleShiftOneDay(item)}>
                          {item.status ? (
                            <CheckIcon fillColor={colors.green1} />
                          ) : (
                            <UncheckIcon fillColor={colors.grey2} />
                          )}
                        </span>
                        <p className={styles.daysNameStyle}>{item.title}</p>
                      </div>
                    )
                  )
                })}
              </div>
              {shiftOneDaysError && (
                <p className="dashboardFormError"> {shiftOneDaysError}</p>
              )}
            </div>
            <div className={styles.formContainer}>
              <div className={styles.formTitle}>Shift 2</div>
              <div className={styles.inputContainer}>
                <div className={styles.labelField}>
                  <label
                    htmlFor={SHIFT2_START_TIME}
                    className={styles.labelText}
                  >
                    Start Time
                    {/* <span className="asterick">*</span> */}
                  </label>
                  <div className={styles.fieldErrorContainer}>
                    <input
                      type="time"
                      className={styles.inputField}
                      {...register(
                        SHIFT2_START_TIME,
                        createSecondaryValidators[SHIFT2_START_TIME]
                      )}
                    />
                    <div className={styles.errorContainer}>
                      <span className={styles.extraSpan}></span>
                      {errors[SHIFT2_START_TIME] && (
                        <p className="dashboardFormError">
                          {errors[SHIFT2_START_TIME]?.message as any}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className={styles.labelField}>
                  <label htmlFor={SHIFT2_END_TIME} className={styles.labelText}>
                    End Time
                    {/* <span className="asterick">*</span> */}
                  </label>
                  <div className={styles.fieldErrorContainer}>
                    <input
                      type="time"
                      className={styles.inputField}
                      {...register(
                        SHIFT2_END_TIME,
                        createSecondaryValidators[SHIFT2_END_TIME]
                      )}
                    />
                    <div className={styles.errorContainer}>
                      <span className={styles.extraSpan}></span>
                      {errors[SHIFT2_END_TIME] && (
                        <p className="dashboardFormError">
                          {errors[SHIFT2_END_TIME]?.message as any}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.weekDaysContainer}>
                <label className={styles.labelText}>
                  Select Days
                  {/* <span className="asterick">*</span> */}
                </label>
                <div className={styles.selectDaysContainer}>
                  <span onClick={() => handleToggleAllShift2()}>
                    {shiftTwoDays[0].status ? (
                      <CheckIcon fillColor={colors.green1} />
                    ) : (
                      <UncheckIcon fillColor={colors.grey2} />
                    )}
                  </span>
                  <p className={styles.daysNameStyle}>
                    {shiftTwoDays[0].title}
                  </p>
                </div>
                {shiftTwoDays?.map((item: IRangeData, index: number) => {
                  return (
                    index !== 0 && (
                      <div className={styles.selectDaysContainer} key={index}>
                        <span onClick={() => handleShiftTwoDay(item)}>
                          {item.status ? (
                            <CheckIcon fillColor={colors.green1} />
                          ) : (
                            <UncheckIcon fillColor={colors.grey2} />
                          )}
                        </span>
                        <p className={styles.daysNameStyle}>{item.title}</p>
                      </div>
                    )
                  )
                })}
              </div>
              {shiftTwoDaysError && (
                <p className="dashboardFormError"> {shiftTwoDaysError}</p>
              )}
            </div>
            <div className={styles.buttonConatiner}>
              <Button
                title="Submit"
                type="submit"
                handleClick={() => handleShiftDays()}
              />
              <Button
                title="Reset"
                type="reset"
                customClass={styles.resetButtonStyle}
              />
              <Button
                title="Back"
                type="button"
                customClass={styles.resetButtonStyle}
                handleClick={() => navigate('/manageusers')}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default CreateUserSecondary

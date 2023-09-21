import { FC, useEffect, useState } from 'react'
import Button from '../../../../components/common/button/Button'
import {
  AddButtonIcon,
  CheckIcon,
  UncheckIcon,
} from '../../../../components/common/svg-components'
import { colors } from '../../../../constants/color'
import styles from './createUserprimary.module.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  ICreatePrimaryFormInputs,
  fileType,
} from '../../../../interfaces/interfaces'

import { createPrimaryValidators } from '../../../../form-validators/createPrimaryValidators'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import {
  PRIMARY_BRANCH,
  PRIMARY_DESIGNATION,
  PRIMARY_FIRST_NAME,
  PRIMARY_LAST_NAME,
  PRIMARY_SPECIALITY,
  PRIMARY_DEPARTMENT,
  PRIMARY_PHONE_NUMBER,
  PRIMARY_EMAIL_ID,
  PRIMARY_EXPIRY_DATE,
  PRIMARY_USER_PHOTO_ATTACHMENT,
  PRIMARY_SYSTEM_USER,
  PRIMARY_NOTES,
  PRIMARY_USER_GROUPS,
  PRIMARY_ROLE,
  SECONDARY_ROLE,
} from '../../../../constants/constant'
import { requestGenerator } from '../../../../utils/payloadGenerator'
import { getAllBranch } from '../../../../redux/features/branch/branchAsyncActions'
import { useAppDispatch, useAppSelector } from '../../../../hooks'
import { getAllDepartment } from '../../../../redux/features/department/departmentAsyncActions'
import { getAllSpeciality } from '../../../../redux/features/specialities/specialitiesAsyncActions'
import { getAllUserGroup } from '../../../../redux/features/manage-usergroup/manageUsergroupAsyncActions'
import {
  addManageUser,
  editManageUserById,
  getManageUserById,
} from '../../../../redux/features/manage-user/ManageUserAsynActions'
import {
  ADD_MANAGE_USER,
  EDIT_MANAGE_USER_TYPE,
} from '../../../../constants/asyncActionsType'
import Loader from '../../../../components/common/spinner/Loader'
import PhoneInput from 'react-phone-input-2'
import {
  clearEditUserData,
  clearUserData,
} from '../../../../redux/features/manage-user/ManageUserSlice'
import {
  dataURI,
  getDataUriFileSize,
  getValuesForSelectOptions,
  trimValue,
  utcToDate,
} from '../../../../utils/utils'
import AttachFiles from '../../../../components/common/attach-files/single-file/AttachSingleFile'
import { getUserRole } from '../../../../redux/features/role/roleAsynActions'

interface ICreateUserPrimary {
  null?: any
}

const CreateUserPrimary: FC<ICreateUserPrimary> = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { isLoading, userDetail, editUserData } = useAppSelector(
    (state) => state.manageUser
  )

  const state = useLocation().state

  const [selectSystemUser, setSelectSystemUser] = useState<boolean>(false)
  const [isDobuleBooking, setIsDoubleBooking] = useState<boolean>(false)
  const animatedComponent = makeAnimated()
  const { branchData } = useAppSelector((state) => state.branch)
  const { departmentData } = useAppSelector((state) => state.department)
  const { specialityData } = useAppSelector((state) => state.speciality)
  const specialityState = useAppSelector((state) => state.speciality)
  const { usergroupData } = useAppSelector((state) => state.usergroup)
  const { userRole } = useAppSelector((state) => state.roleUser)
  const [userPhoto, setuserPhoto] = useState({ name: '', data_uri: '' })

  const handleSelectSystemUser = () => {
    setSelectSystemUser(!selectSystemUser)
  }
  const handleDoubleBooking = () => {
    setIsDoubleBooking(!isDobuleBooking)
  }

  useEffect(() => {
    let data = {
      search: '',
      page: 1,
      pageSize: 100,
    }
    dispatch(getAllBranch(requestGenerator(data)))
    dispatch(getAllDepartment(requestGenerator(data)))
    // dispatch(getAllSpeciality(requestGenerator(data)))
    dispatch(getAllUserGroup(requestGenerator(data)))
    dispatch(getUserRole(requestGenerator(data)))
  }, [dispatch])

  useEffect(() => {
    if (state?.user?._id) {
      dispatch(getManageUserById(requestGenerator({ id: state?.user?._id })))
    }
  }, [state?.usergroup?._id])
  const {
    register,
    reset,
    setError,
    handleSubmit,
    setValue,
    getValues,
    clearErrors,
    watch,
    trigger,
    formState: { errors },
  } = useForm<ICreatePrimaryFormInputs>({})
  const formData = watch()

  const onSubmit: SubmitHandler<ICreatePrimaryFormInputs> = (data) => {
    if (userPhoto) {
      if (getDataUriFileSize(userPhoto?.data_uri) >= 2 * 1024 * 1024) {
        setError(PRIMARY_USER_PHOTO_ATTACHMENT, {
          type: 'custom',
          message: 'Maximum attachments size is 2MB',
        })
      } else {
        clearErrors(PRIMARY_USER_PHOTO_ATTACHMENT)
      }
    }
    if (/*state?.user?._id  && */ userDetail?._id) {
      getDataUriFileSize(userPhoto?.data_uri) < 2 * 1024 * 1024 &&
        dispatch(
          editManageUserById(
            requestGenerator({
              id: userDetail?._id,
              data: {
                ...data,
                [PRIMARY_USER_PHOTO_ATTACHMENT]: userPhoto,
                system_user: selectSystemUser,
                [PRIMARY_BRANCH]: formData[PRIMARY_BRANCH]?.map(
                  (item: any) => item?.value
                ),
                [PRIMARY_SPECIALITY]: formData[PRIMARY_SPECIALITY]?.map(
                  (item: any) => item?.value
                ),
                [PRIMARY_DEPARTMENT]: formData[PRIMARY_DEPARTMENT]?.map(
                  (item: any) => item?.value
                ),
                [PRIMARY_USER_GROUPS]: formData[PRIMARY_USER_GROUPS]?.map(
                  (item: any) => item?.value
                ),
                [SECONDARY_ROLE]: formData[SECONDARY_ROLE]?.map(
                  (item: any) => item?.value
                ),
                [PRIMARY_ROLE]: formData[PRIMARY_ROLE]?.value || '',
              },
            })
          )
        ).then((e: any) => {
          if (e.type === `${EDIT_MANAGE_USER_TYPE}/fulfilled`) {
            navigate('/manageusers/createusers/secondary', {
              state: { primaryData: data },
            })
          }
        })
    } else {
      dispatch(
        addManageUser(
          requestGenerator({
            ...data,
            [PRIMARY_USER_PHOTO_ATTACHMENT]: userPhoto,
            system_user: selectSystemUser,
            [PRIMARY_BRANCH]: formData[PRIMARY_BRANCH]?.map(
              (item: any) => item?.value
            ),
            [PRIMARY_SPECIALITY]: formData[PRIMARY_SPECIALITY]?.map(
              (item: any) => item?.value
            ),
            [PRIMARY_DEPARTMENT]: formData[PRIMARY_DEPARTMENT]?.map(
              (item: any) => item?.value
            ),
            [PRIMARY_USER_GROUPS]: formData[PRIMARY_USER_GROUPS]?.map(
              (item: any) => item?.value
            ),
            [SECONDARY_ROLE]: formData[SECONDARY_ROLE]?.map(
              (item: any) => item?.value
            ),
            [PRIMARY_ROLE]: formData[PRIMARY_ROLE]?.value || '',
          })
        )
      ).then((e: any) => {
        if (e.type === `${ADD_MANAGE_USER}/fulfilled`) {
          navigate('/manageusers/createusers/secondary', {
            state: { primaryData: data },
          })
        }
      })
    }

    // dispatch(goToSecondary(true))
  }
  useEffect(() => {
    if (userDetail?._id) {
      reset(userDetail)
      setSelectSystemUser(userDetail?.system_user)
      // setIsDoubleBooking(userDetail?.double_booking)
      setuserPhoto({
        name: 'abc.png',
        data_uri: userDetail?.profile_pic,
      })
    }
  }, [userDetail])

  useEffect(() => {
    if (userDetail[PRIMARY_EXPIRY_DATE]) {
      const formatData = utcToDate(userDetail[PRIMARY_EXPIRY_DATE], true)
      setValue(PRIMARY_EXPIRY_DATE, formatData)
    }
  }, [userDetail[PRIMARY_EXPIRY_DATE], utcToDate])

  //* useEffets for handling select options */
  // brnaches
  useEffect(() => {
    if (userDetail[PRIMARY_BRANCH]) {
      // const branches = userDetail[PRIMARY_BRANCH]?.map((item: any) =>
      //   branchData?.find((branchItem: any) => branchItem?._id === item)
      // ).map((item: any) => {
      //   return { label: item?.name, value: item?._id }
      // })
      const branches = getValuesForSelectOptions(
        userDetail[PRIMARY_BRANCH],
        branchData
      )
      setValue(PRIMARY_BRANCH, branches || [])
    }
  }, [userDetail[PRIMARY_BRANCH]])

  //specilaity
  useEffect(() => {
    console.log('outside...')
    if (userDetail[PRIMARY_BRANCH] && userDetail[PRIMARY_SPECIALITY]) {
      console.log('inside..')
      const specialities = getValuesForSelectOptions(
        userDetail?.[PRIMARY_SPECIALITY],
        specialityData
      )
      setValue(PRIMARY_SPECIALITY, specialities ?? [])
    }
  }, [setValue, specialityData, userDetail])

  //departments
  useEffect(() => {
    if (userDetail[PRIMARY_DEPARTMENT]) {
      const departments = getValuesForSelectOptions(
        userDetail[PRIMARY_DEPARTMENT],
        departmentData
      )
      const departmentIdArr = departments.map((item) => item?.value)
      let data = {
        search: '',
        page: 1,
        pageSize: 1000,
        exclude_image: true,
        department_ids: departmentIdArr,
      }

      dispatch(getAllSpeciality(requestGenerator(data)))

      setValue(PRIMARY_DEPARTMENT, departments || [])
    }
  }, [userDetail[PRIMARY_DEPARTMENT]])

  //usergroups
  useEffect(() => {
    if (userDetail[PRIMARY_USER_GROUPS]) {
      const usergroups = getValuesForSelectOptions(
        userDetail[PRIMARY_USER_GROUPS],
        usergroupData
      )
      setValue(PRIMARY_USER_GROUPS, usergroups || [])
    }
  }, [userDetail[PRIMARY_USER_GROUPS]])
  useEffect(() => {
    if (userDetail[SECONDARY_ROLE]) {
      const usergroups = getValuesForSelectOptions(
        userDetail[SECONDARY_ROLE],
        userRole
      )
      setValue(SECONDARY_ROLE, usergroups || [])
    }
  }, [userDetail[SECONDARY_ROLE]])

  //role
  useEffect(() => {
    if (userDetail[PRIMARY_ROLE]) {
      setValue(PRIMARY_ROLE, {
        label: userDetail?.roleName || '',
        value: userDetail?.roleName || '',
      })
    }
  }, [userDetail[PRIMARY_ROLE]])

  useEffect(() => {
    return () => {
      dispatch(clearUserData())
    }
  }, [])
  const userPhotoField = watch(PRIMARY_USER_PHOTO_ATTACHMENT)
  const fileName = userPhotoField?.[0]
  // console.log('form file', fileName)
  // convert file object to data_uri
  useEffect(() => {
    const fileList: fileType = { name: '', data_uri: '' }
    const getDataURI = async (fileName: File) => {
      try {
        const result = await dataURI(fileName)
        fileList.data_uri = result
        fileList.name = fileName.name
        setuserPhoto(fileList)
      } catch (error) {
        console.log({ error })
      }
    }
    if (fileName) {
      getDataURI(fileName)
    }
  }, [fileName])

  const handleReset = () => {
    reset()
    setValue(PRIMARY_PHONE_NUMBER, '')
    setValue(PRIMARY_USER_GROUPS, [])
    setValue(PRIMARY_BRANCH, [])
    setValue(PRIMARY_DEPARTMENT, [])
    setValue(PRIMARY_SPECIALITY, [])
    setValue(PRIMARY_ROLE, {
      label: userDetail[PRIMARY_ROLE] || '',
      value: userDetail[PRIMARY_ROLE] || '',
    })

    setuserPhoto({ name: '', data_uri: '' })
    // dispatch(clearUserData())
    dispatch(clearEditUserData())
  }

  const handleNavigate = () => {
    navigate('/usergroups/manageusergroups/primary')
  }

  return (
    <>
      {isLoading || specialityState?.isLoading ? <Loader /> : null}
      <div className={styles.mainLayoutContainer}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputFieldsContainer}>
            <div className={styles.labelField}>
              <label htmlFor={PRIMARY_FIRST_NAME} className={styles.labelText}>
                First Name
                <span className="asterick">*</span>
              </label>
              <div className={styles.fieldErrorContainer}>
                <input
                  type="text"
                  placeholder="Enter Firstname"
                  className={styles.inputField}
                  {...register(
                    PRIMARY_FIRST_NAME,
                    createPrimaryValidators[PRIMARY_FIRST_NAME]
                  )}
                  onChange={(e) => trimValue(e)}
                />
                <div className={styles.errorContainer}>
                  <span className={styles.extraSpan}></span>
                  {errors[PRIMARY_FIRST_NAME] && (
                    <p className="dashboardFormError">
                      {errors[PRIMARY_FIRST_NAME].message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.labelField}>
              <label htmlFor={PRIMARY_LAST_NAME} className={styles.labelText}>
                Last Name
                <span className="asterick">*</span>
              </label>
              <div className={styles.fieldErrorContainer}>
                <input
                  type="text"
                  placeholder="Enter Lastname"
                  className={styles.inputField}
                  {...register(
                    PRIMARY_LAST_NAME,
                    createPrimaryValidators[PRIMARY_LAST_NAME]
                  )}
                  onChange={(e) => trimValue(e)}
                />
                <div className={styles.errorContainer}>
                  <span className={styles.extraSpan}></span>
                  {errors[PRIMARY_LAST_NAME] && (
                    <p className="dashboardFormError">
                      {errors[PRIMARY_LAST_NAME].message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.labelField}>
              <label htmlFor={PRIMARY_DESIGNATION} className={styles.labelText}>
                Designation
                <span className="asterick">*</span>
              </label>
              <div className={styles.fieldErrorContainer}>
                <input
                  type="text"
                  placeholder="Enter Designation"
                  className={styles.inputField}
                  {...register(
                    PRIMARY_DESIGNATION,
                    createPrimaryValidators[PRIMARY_DESIGNATION]
                  )}
                  onChange={(e) => trimValue(e)}
                />
                <div className={styles.errorContainer}>
                  <span className={styles.extraSpan}></span>
                  {errors[PRIMARY_DESIGNATION] && (
                    <p className="dashboardFormError">
                      {errors[PRIMARY_DESIGNATION].message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.labelField}>
              <label htmlFor={PRIMARY_BRANCH} className={styles.labelText}>
                Branch
                <span className="asterick">*</span>
              </label>
              <div className={styles.fieldErrorContainer}>
                <Select
                  className={styles.selectInputField}
                  {...register(
                    PRIMARY_BRANCH,
                    createPrimaryValidators[PRIMARY_BRANCH]
                  )}
                  isMulti
                  isSearchable={true}
                  isClearable={true}
                  options={branchData
                    ?.filter((item: any) => item.is_active)
                    .map((item: any) => ({
                      label: item.name,
                      value: item._id,
                    }))}
                  maxMenuHeight={200}
                  // defaultValue={editUserData?.branches?.map((item: any) => ({
                  //   label: item?.name,
                  //   value: item?._id,
                  // }))}
                  value={watch(PRIMARY_BRANCH) || []}
                  // getOptionValue={({ id }) => id}
                  components={animatedComponent}
                  closeMenuOnSelect={false}
                  placeholder="Select Branch"
                  onChange={(e) => {
                    setValue(
                      PRIMARY_BRANCH,
                      e.map((item: any) => {
                        return item
                      })
                    )
                    trigger(PRIMARY_BRANCH)
                  }}
                />
                <div className={styles.errorContainer}>
                  <span className={styles.extraSpan}></span>
                  {errors[PRIMARY_BRANCH] && (
                    <p className="dashboardFormError">
                      {errors[PRIMARY_BRANCH].message as any}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.labelField}>
              <label htmlFor={PRIMARY_DEPARTMENT} className={styles.labelText}>
                Department
                <span className="asterick">*</span>
              </label>
              <div className={styles.fieldErrorContainer}>
                <Select
                  className={styles.selectInputField}
                  isMulti
                  isSearchable={true}
                  isClearable={true}
                  options={departmentData
                    ?.filter((item: any) => item.is_active)
                    .map((item: any) => ({
                      label: item.name,
                      value: item._id,
                    }))}
                  value={watch(PRIMARY_DEPARTMENT) || []}
                  components={animatedComponent}
                  closeMenuOnSelect={false}
                  placeholder="Select Department"
                  {...register(
                    PRIMARY_DEPARTMENT,
                    createPrimaryValidators[PRIMARY_DEPARTMENT]
                  )}
                  onChange={(e) => {
                    const departmentIdArr = e.map((item) => item?.value)
                    let data = {
                      search: '',
                      page: 1,
                      pageSize: 1000,
                      exclude_image: true,
                      department_ids: departmentIdArr,
                    }
                    dispatch(getAllSpeciality(requestGenerator(data)))
                    setValue(PRIMARY_SPECIALITY, [])
                    setValue(PRIMARY_DEPARTMENT, e)
                    trigger(PRIMARY_DEPARTMENT)
                  }}
                />
                <div className={styles.errorContainer}>
                  <span className={styles.extraSpan}></span>
                  {errors[PRIMARY_DEPARTMENT] && (
                    <p className="dashboardFormError">
                      {errors[PRIMARY_DEPARTMENT].message as any}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.labelField}>
              <label htmlFor={PRIMARY_SPECIALITY} className={styles.labelText}>
                Specialty
                {/* <span className="asterick">*</span> */}
              </label>
              <div className={styles.fieldErrorContainer}>
                <Select
                  className={styles.selectInputField}
                  {...register(
                    PRIMARY_SPECIALITY
                    // createPrimaryValidators[PRIMARY_SPECIALITY]
                  )}
                  isMulti
                  isSearchable={true}
                  isClearable={true}
                  options={specialityData
                    ?.filter((item: any) => item.is_active)
                    .map((item: any) => ({
                      label: item.name,
                      value: item._id,
                    }))}
                  value={watch(PRIMARY_SPECIALITY || [])}
                  components={animatedComponent}
                  closeMenuOnSelect={false}
                  placeholder="Select Specialty"
                  onChange={(e) => {
                    setValue(PRIMARY_SPECIALITY, e)
                    trigger(PRIMARY_SPECIALITY)
                  }}
                />
                {/* <div className={styles.errorContainer}>
                  <span className={styles.extraSpan}></span>
                  {errors[PRIMARY_SPECIALITY] && (
                    <p className="dashboardFormError">
                      {errors[PRIMARY_SPECIALITY].message as any}
                    </p>
                  )}
                </div> */}
              </div>
            </div>
            <div className={styles.labelField}>
              <label
                htmlFor={PRIMARY_PHONE_NUMBER}
                className={styles.labelText}
              >
                Phone No.
                <span className="asterick">*</span>
              </label>
              <div className={styles.fieldErrorContainer}>
                {/* <input
                  type="text"
                  className={styles.inputField}
                  {...register(
                    PRIMARY_PHONE_NUMBER,
                    createPrimaryValidators[PRIMARY_PHONE_NUMBER]
                  )}
                /> */}
                <PhoneInput
                  country={'kw'}
                  {...register(
                    PRIMARY_PHONE_NUMBER,
                    createPrimaryValidators[PRIMARY_PHONE_NUMBER]
                  )}
                  value={getValues(PRIMARY_PHONE_NUMBER)}
                  placeholder="Enter Phone No."
                  onChange={(phone) => {
                    //  trimValue(e)
                    const formattedPhone = phone && `+${phone}`
                    setValue(PRIMARY_PHONE_NUMBER, formattedPhone)
                    trigger(PRIMARY_PHONE_NUMBER)
                  }}
                  inputClass={styles.phoneNumberInput}
                />
                <div className={styles.errorContainer}>
                  <span className={styles.extraSpan}></span>
                  {errors[PRIMARY_PHONE_NUMBER] && (
                    <p className="dashboardFormError">
                      {errors[PRIMARY_PHONE_NUMBER].message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.labelField}>
              <label htmlFor={PRIMARY_EMAIL_ID} className={styles.labelText}>
                Email ID
                <span className="asterick">*</span>
              </label>
              <div className={styles.fieldErrorContainer}>
                <input
                  type="text"
                  className={styles.inputField}
                  placeholder="Enter Email ID"
                  {...register(
                    PRIMARY_EMAIL_ID,
                    createPrimaryValidators[PRIMARY_EMAIL_ID]
                  )}
                  onChange={(e) => trimValue(e)}
                />
                <div className={styles.errorContainer}>
                  <span className={styles.extraSpan}></span>
                  {errors[PRIMARY_EMAIL_ID] && (
                    <p className="dashboardFormError">
                      {errors[PRIMARY_EMAIL_ID].message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.labelField}>
              <label htmlFor={PRIMARY_SYSTEM_USER} className={styles.labelText}>
                System User
              </label>
              <div className={styles.fieldErrorContainer1}>
                {selectSystemUser ? (
                  <CheckIcon
                    fillColor={colors.green1}
                    handleClick={() => handleSelectSystemUser()}
                  />
                ) : (
                  <UncheckIcon
                    fillColor={colors.grey2}
                    handleClick={() => handleSelectSystemUser()}
                  />
                )}
              </div>
            </div>
            {/* <div className={styles.labelField}>
              <label htmlFor={PRIMARY_USER_GROUPS} className={styles.labelText}>
                Usergroups
                <span className="asterick">*</span>
              </label>
              <div className={styles.fieldErrorContainer}>
                <Select
                  className={styles.selectInputField}
                  isMulti
                  isSearchable={true}
                  isClearable={true}
                  options={usergroupData
                    ?.filter((item: any) => item.is_active)
                    .map((item: any) => ({
                      label: item.name,
                      value: item._id,
                    }))}
                  value={watch(PRIMARY_USER_GROUPS) || []}
                  components={animatedComponent}
                  closeMenuOnSelect={false}
                  placeholder="Select Usergroups"
                  {...register(
                    PRIMARY_USER_GROUPS,
                    createPrimaryValidators[PRIMARY_USER_GROUPS]
                  )}
                  onChange={(e: any) => {
                    // IF multi select
                    setValue(PRIMARY_USER_GROUPS, e)
                    // setValue(PRIMARY_USER_GROUPS, e?.value)
                    trigger(PRIMARY_USER_GROUPS)
                  }}
                />
                <div className={styles.errorContainer}>
                  <span className={styles.extraSpan}></span>
                  {errors[PRIMARY_USER_GROUPS] && (
                    <p className="dashboardFormError">
                      {errors[PRIMARY_USER_GROUPS].message as any}
                    </p>
                  )}
                </div>
              </div>
            </div> */}
            {/* Primary role */}
            <div className={styles.labelField}>
              <label htmlFor={PRIMARY_ROLE} className={styles.labelText}>
                Role
                <span className="asterick">*</span>
              </label>
              <div className={styles.fieldErrorContainer}>
                <Select
                  className={styles.selectInputField}
                  isSearchable={true}
                  // isClearable={true}
                  isDisabled={userDetail?.roleName ? true : false}
                  options={userRole
                    ?.filter((item: any) => item?.role_type !== 'secondary')
                    ?.map((item: any) => ({
                      label: item.name,
                      value: item.name,
                    }))}
                  value={watch(PRIMARY_ROLE)}
                  components={animatedComponent}
                  closeMenuOnSelect={true}
                  placeholder="Select Role"
                  {...register(
                    PRIMARY_ROLE,
                    createPrimaryValidators[PRIMARY_ROLE]
                  )}
                  onChange={(e: any) => {
                    // IF multi select
                    // setValue(
                    //   PRIMARY_ROLE,
                    //   e.map((item: any) => {
                    //     return item.value
                    //   })
                    // )
                    setValue(PRIMARY_ROLE, e)
                    trigger(PRIMARY_ROLE)
                  }}
                />
                {/* {formData[PRIMARY_ROLE]?.value === 'DOCTOR' && (
                  <div className={styles.doubleBookingCheckboxContainer}>
                    {isDobuleBooking ? (
                      <CheckIcon
                        fillColor={colors.green1}
                        handleClick={() => handleDoubleBooking()}
                      />
                    ) : (
                      <UncheckIcon
                        fillColor={colors.grey2}
                        handleClick={() => handleDoubleBooking()}
                      />
                    )}
                    <span className={styles.doubleBookingText}>
                      Allow double booking
                    </span>
                  </div>
                )} */}

                <div className={styles.errorContainer}>
                  <span className={styles.extraSpan}></span>
                  {errors[PRIMARY_ROLE] && (
                    <p className="dashboardFormError">
                      {errors[PRIMARY_ROLE].message as any}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Secondary role */}
            <div className={styles.labelField}>
              <label htmlFor={SECONDARY_ROLE} className={styles.labelText}>
                Secondary role
                {/* <span className="asterick">*</span> */}
              </label>
              <div className={styles.fieldErrorContainer}>
                <Select
                  className={styles.selectInputField}
                  isSearchable={true}
                  isMulti
                  // isDisabled={userDetail?.roleName ? true : false}
                  options={userRole
                    ?.filter((item: any) => item?.role_type === 'secondary')
                    ?.map((item: any) => ({
                      label: item.name,
                      value: item._id,
                    }))}
                  value={watch(SECONDARY_ROLE)}
                  components={animatedComponent}
                  placeholder="Select Role"
                  {...register(
                    SECONDARY_ROLE
                    // createPrimaryValidators[SECONDARY_ROLE]
                  )}
                  onChange={(e: any) => {
                    setValue(SECONDARY_ROLE, e)
                    trigger(SECONDARY_ROLE)
                  }}
                />
                {/* <AddButtonIcon
                  fillColor={colors.green1}
                  customClass={styles.addButtonStyle}
                  handleClick={() => handleNavigate()}
                /> */}
                {/* <div className={styles.errorContainer}>
                  <span className={styles.extraSpan}></span>
                  {errors[PRIMARY_ROLE] && (
                    <p className="dashboardFormError">
                      {errors[PRIMARY_ROLE].message as any}
                    </p>
                  )}
                </div> */}
              </div>
            </div>

            <div className={styles.labelField}>
              <label htmlFor={PRIMARY_EXPIRY_DATE} className={styles.labelText}>
                Expiry Date
                <span className="asterick">*</span>
              </label>
              <div className={styles.fieldErrorContainer}>
                <input
                  type="date"
                  placeholder="Select Expiry Date"
                  className={styles.inputField}
                  max="9999-12-31"
                  min={new Date().toISOString().split('T')[0]}
                  {...register(
                    PRIMARY_EXPIRY_DATE,
                    createPrimaryValidators[PRIMARY_EXPIRY_DATE]
                  )}
                />
                <div className={styles.errorContainer}>
                  <span className={styles.extraSpan}></span>
                  {errors[PRIMARY_EXPIRY_DATE] && (
                    <p className="dashboardFormError">
                      {errors[PRIMARY_EXPIRY_DATE].message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.labelField}>
              <label
                htmlFor={PRIMARY_USER_PHOTO_ATTACHMENT}
                className={styles.labelText}
              >
                User Photo
                <span className="asterick">*</span>
              </label>
              <div className={styles.fieldErrorContainer1}>
                <AttachFiles
                  attachmentContainerCustomClass={
                    styles.attachmentContainerCustomClass
                  }
                  register={register}
                  fileKey={PRIMARY_USER_PHOTO_ATTACHMENT}
                  id={PRIMARY_USER_PHOTO_ATTACHMENT}
                  fileList={userPhoto}
                  validation={
                    userDetail?._id
                      ? {}
                      : createPrimaryValidators[PRIMARY_USER_PHOTO_ATTACHMENT]
                  }
                />
                <div className={styles.errorContainer}>
                  <span className={styles.extraSpan}></span>
                  {errors[PRIMARY_USER_PHOTO_ATTACHMENT] && (
                    <p className="dashboardFormError">
                      {errors[PRIMARY_USER_PHOTO_ATTACHMENT].message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.labelField}>
              <label htmlFor={PRIMARY_NOTES} className={styles.labelText}>
                Notes
              </label>
              <div className={styles.fieldErrorContainer}>
                <textarea
                  placeholder="Enter notes"
                  className={styles.inputField}
                  {...register(PRIMARY_NOTES)}
                  onChange={(e) => trimValue(e)}
                />
              </div>
            </div>
          </div>
          <div className={styles.buttonConatiner}>
            <Button title="Submit" type="submit" />
            <Button
              title="Reset"
              type="reset"
              handleClick={() => handleReset()}
              customClass={styles.resetButtonStyle}
            />
            <Button
              title="Back"
              type="button"
              customClass={styles.resetButtonStyle}
              handleClick={() => navigate('/manageusers')}
            />
          </div>
        </form>
      </div>
    </>
  )
}

export default CreateUserPrimary

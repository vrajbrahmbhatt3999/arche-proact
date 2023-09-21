import { FC, useEffect, useState } from 'react'
import styles from './addServiceDataModel.module.scss'
import { CloseIcon } from '../../../components/common/svg-components'
import { colors } from '../../../constants/color'
import Divider from '../../../components/common/divider/Divider'
import Button from '../../../components/common/button/Button'
import Select from 'react-select'
import { SubmitHandler, useForm } from 'react-hook-form'

import { IAddCategory, IAddService } from '../../../interfaces/interfaces'

// import { MASTER_TABLE_CATEGORY_NAME } from "../../../../constants/constant";
// import { addCategoryValidators } from "../../../../form-validators/addCategoryValidators";
import { useAppDispatch, useAppSelector } from '../../../hooks'
// import {
//   addMasterTableCategory,
//   editMasterTableCategory,
//   getAllMasterTableCategory,
//   getMasterTableCategoryById,
// } from "../../../../redux/features/master-table-category/MasterTableCategoryAsyncActions";
import { requestGenerator } from '../../../utils/payloadGenerator'
// import { clearState } from "../../../../redux/features/master-table-category/MasterTableCategorySlice";

import Loader from '../../../components/common/spinner/Loader'
import { addServiceValidator } from './addServiceValidators'
import {
  SERVICE_BALANCE,
  SERVICE_CODE,
  SERVICE_COST,
  SERVICE_DEPARTMENT,
  SERVICE_GROUP,
  SERVICE_LOCATION,
  SERVICE_NAME,
  SERVICE_NUMBER_SESSION,
  SERVICE_PARENT_ID,
  SERVICE_PRICE,
  SERVICE_QTY,
  SERVICE_SESSION,
  SERVICE_SOURCE,
  SERVICE_STATUS,
  SERVICE_UNIT_TYPE,
} from '../../../constants/constant'
import { disableArrowKey, trimValue } from '../../../utils/utils'
import makeAnimated from 'react-select/animated'
import { getAllDepartment } from '../../../redux/features/department/departmentAsyncActions'
import {
  AddServiceAction,
  GetAllActiveServicesAsyncData,
  GetAllServicesAsyncData,
  UpdateServiceAction,
} from '../../../redux/features/patientservices/servicesAsyncActions'
import { GET_ALL_ACTIVE_SERVICES_DATA } from '../../../constants/asyncActionsType'
interface IAddServiceModal {
  handleClose: (e?: React.MouseEvent<HTMLElement>) => void
  setModelOpenClose?: any
  popData?: any
}
interface IOptionType {
  label: any
  value: any
}

const AddServiceDataModal: FC<IAddServiceModal> = ({
  handleClose,
  setModelOpenClose,
  popData,
}) => {
  const dispatch = useAppDispatch()
  const animatedComponent = makeAnimated()

  const { departmentData } = useAppSelector((state) => state.department)
  const { addService } = useAppSelector((state) => state.services)
  const [serviceData,setServiceData] = useState([]);
  const [filteredServiceData,setFilteredServiceData] = useState([]);

  const Group: IOptionType[] = [
    { value: 'individual', label: 'Individual' },
    { value: 'group', label: 'Group' },
    // { value: "6475e21c3cba7bc0f51d797b", label: "12 Hours" },
  ]

  const Status: IOptionType[] = [
    { value: true, label: 'Active' },
    { value: false, label: 'Inactive' },
    // { value: "6475e21c3cba7bc0f51d797b", label: "12 Hours" },
  ]

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    getValues,
    trigger,
    watch,

    formState: { errors },
  } = useForm<IAddService>({})

  const onSubmit: SubmitHandler<IAddService> = (data) => {
    if (popData?._id) {
      console.log('hi')
      let editdata = {
        id: popData?._id,
        data: {
          parent_id:data.service_parent_id?.value,
          department_id: data.service_department?.value,
          user_code: data.service_code,
          name: data.service_name,
          // "note":"This is test note",
          price: data.service_price,
          cost: data.service_cost,
          sessions: data.service_number_session,
          service_type: data.service_group?.value,
          session_time: data.service_session, // in minute
          is_active: data.service_status?.value,
          discount: 0, // optional
          notes: '', // optional
        },
      }

      dispatch(UpdateServiceAction(requestGenerator(editdata))).then((e) => {
        if (e.type == 'services/updateServiceData/fulfilled') {
          // dispatch(setEmployeeNullData([]));
          // navigate("/hr/documentmanagement");
          let reqPayload = {
            page: 1,
            pageSize: 10,
            // is_active:true
            // order_by: { name: "1" },
          }
          dispatch(GetAllServicesAsyncData(requestGenerator(reqPayload))).then(
            (result) => setModelOpenClose(result.payload.lastPage)
          )
          handleClose()
        }
      })
    } else {
      let data1 = {
        department_id: data.service_department?.value,
        parent_id:data.service_parent_id?.value,
        user_code: data.service_code,
        name: data.service_name,
        // "note":"This is test note",
        price: data.service_price,
        cost: data.service_cost,
        sessions: data.service_number_session,
        service_type: data.service_group?.value,
        session_time: data.service_session, // in minute
        is_active: data.service_status?.value,
        discount: 0, // optional
        notes: '', // optional
      }

      dispatch(AddServiceAction(requestGenerator(data1))).then((e) => {
        console.log('e.type', e.type)
        if (e.type == 'services/addServiceData/fulfilled') {
          // dispatch(setEmployeeNullData([]));
          // navigate("/hr/documentmanagement");
          let reqPayload = {
            page: 1,
            pageSize: 10,
            // is_active:true
            // order_by: { name: "1" },
          }
          dispatch(GetAllServicesAsyncData(requestGenerator(reqPayload))).then(
            (result) => setModelOpenClose(result.payload.lastPage)
          )
          handleClose()
        }
      })
    }
  }

  useEffect(() => {
    reset(popData)
    console.log('popData', popData)
    if (popData?._id) {
     
      const findDepartment = departmentData?.find(
        (item: any) => item?._id === popData?.department_id?._id
      )
      const findGroup = Group?.find(
        (item: any) => item?.label === popData?.service_type
      )
      const findstatus = Status?.find(
        (item: any) => item?.value === popData?.is_active
      )
     
      const selectedDepartment = {
        label: findDepartment?.name,
        value: findDepartment?._id,
      }
      const selectedGroup = {
        label: findGroup?.label,
        value: findGroup?.value,
      }
      const selectedStatus = {
        label: findstatus?.label,
        value: findstatus?.value,
      }
      setValue(SERVICE_NAME, popData?.name)
      setValue(SERVICE_PRICE, popData?.price)
      setValue(SERVICE_COST, popData?.cost)
      setValue(SERVICE_NUMBER_SESSION, popData?.sessions)
      setValue(SERVICE_SESSION, popData?.session_time)
      setValue(SERVICE_DEPARTMENT, selectedDepartment)
      setValue(SERVICE_GROUP, selectedGroup)
      setValue(SERVICE_STATUS, selectedStatus)
      setValue(SERVICE_CODE, popData?.user_code)
    }
  }, [popData])

  useEffect(() => {
    let data = {
      search: '',
      page: 1,
      pageSize: 100,
      reqType: 'SERVICE_MASTER',
    }
    dispatch(getAllDepartment(requestGenerator(data)))
    dispatch(GetAllActiveServicesAsyncData(requestGenerator({}))).then((e: any) => {
      if (e.type === `${GET_ALL_ACTIVE_SERVICES_DATA}/fulfilled`) {
        setServiceData(e.payload);
        const findServiceData:any = e.payload?.find(
          (item: any) => item?._id === popData?.parent_id
        )
        const selectedParentId = {
          label: findServiceData?.name,
          value: findServiceData?._id,
        }
        setValue(SERVICE_PARENT_ID,selectedParentId)
        const values = getValues();
        let filterd = e.payload.filter((itm:any)=>itm.department_id===values.service_department?.value);
        if(filterd.length>0){
          setFilteredServiceData(filterd);
        }
      }
    });
  }, [dispatch])


 
  const customDropdownStyles = {
    control: (provided: any) => ({
      ...provided,
      boxShadow: 'none',
    }),
    input: (provided: any) => ({
      ...provided,
      height: '42px',
      margin: '0px !important',
    }),

    option: (provided: any) => ({
      ...provided,
      padding: '8px',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    dropdownIndicator: (provided: any, state: any) => ({
      ...provided,
      color: '#797979',
      transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : null,
    }),
    clearIndicator: (provided: any) => ({
      ...provided,
      display: 'none',
    }),
  }

  const handleCancel = () => {
    setModelOpenClose(false)
  }

  useEffect(() => {
    setValue(SERVICE_GROUP, {
      label: Group?.[0].label,
      value: Group?.[0].value,
    })
  }, [])

  useEffect(() => {
    if (!popData?._id) {
      setValue(SERVICE_STATUS, {
        label: Status?.[0].label,
        value: Status?.[0].value,
      })
    }
  }, [popData?._id])

  return (
    <>
      {/* {isLoading && <Loader />} */}
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
          <p className={styles.title}>
            {popData?._id ? 'Edit Service' : 'Add New Service'}
          </p>
          <Divider customClass={styles.dividerStyle} />

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.formFieldRow}>
              {/* Month */}
              <div className={styles.formFieldContainer}>
                <div className={styles.inputFieldContainer}>
                  <label
                    htmlFor={SERVICE_DEPARTMENT}
                    className={styles.formLabel}
                  >
                    Department<span className="asterick">*</span>
                  </label>

                  <Select
                    className={styles.selectInputField}
                    placeholder="Select Department"
                    {...register(
                      SERVICE_DEPARTMENT,
                      addServiceValidator[SERVICE_DEPARTMENT]
                    )}
                    // isClearable={true}
                    value={watch(SERVICE_DEPARTMENT || [])}
                    options={departmentData?.map((item: any) => ({
                      label: item.name,
                      value: item._id,
                    }))}
                    components={animatedComponent}
                    closeMenuOnSelect={true}
                    maxMenuHeight={130}
                    styles={customDropdownStyles}
                    onChange={(e: any) => {
                      setValue(SERVICE_DEPARTMENT, e)
                      let filterd = serviceData.filter((itm:any)=>itm.department_id===e.value);
                      if(filterd.length>0){
                        setFilteredServiceData(filterd);
                      }
                      // trigger(MONTH);
                    }}
                  />
                </div>
                {errors[SERVICE_DEPARTMENT] && (
                  <div className={styles.errorContainer}>
                    <span className={styles.extraSpan}></span>
                    <p className="dashboardFormError">
                      {errors[SERVICE_DEPARTMENT].message as any}
                    </p>
                  </div>
                )}
              </div>

              <div className={styles.formFieldContainer}>
                <div className={styles.inputFieldContainer}>
                  <label
                    htmlFor={SERVICE_PARENT_ID}
                    className={styles.formLabel}
                  >
                    Parent Service
                  </label>

                  <Select
                    className={styles.selectInputField}
                    placeholder="Select Parent Sevice"
                    {...register(SERVICE_PARENT_ID)}
                    // isClearable={true}
                    value={watch(SERVICE_PARENT_ID || [])}
                    options={filteredServiceData?.map((item: any) => ({
                      label: item.name,
                      value: item._id,
                    }))}
                    components={animatedComponent}
                    closeMenuOnSelect={true}
                    maxMenuHeight={130}
                    styles={customDropdownStyles}
                    onChange={(e: any) => {
                      setValue(SERVICE_PARENT_ID, e)
                      // trigger(MONTH);
                    }}
                  />
                </div>
              </div>


              <div className={styles.formFieldContainer}>
                <div className={styles.inputFieldContainer}>
                  <label htmlFor={SERVICE_CODE} className={styles.formLabel}>
                    User Code
                    {/* <span className="asterick">*</span> */}
                  </label>
                  <input
                    type="text"
                    // min="6"
                    placeholder="Enter User Code"
                    maxLength={6}
                    className={styles.inputField}
                    {...register(
                      SERVICE_CODE,
                    )}
                    onChange={(e) => trimValue(e)}
                  />
                </div>
                {errors[SERVICE_CODE] && (
                  <div className={styles.errorContainer}>
                    <span className={styles.extraSpan}></span>
                    <p className="dashboardFormError">
                      {errors[SERVICE_CODE].message as any}
                    </p>
                  </div>
                )}
              </div>

              <div className={styles.formFieldContainer}>
                <div className={styles.inputFieldContainer}>
                  <label htmlFor={SERVICE_NAME} className={styles.formLabel}>
                    Name
                    <span className="asterick">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Service  Name"
                    className={styles.inputField}
                    {...register(
                      SERVICE_NAME,
                      addServiceValidator[SERVICE_NAME]
                    )}
                    // value={watch(SERVICE_NAME || [])}
                    onChange={(e) => trimValue(e)}
                  />
                </div>
                {errors[SERVICE_NAME] && (
                  <div className={styles.errorContainer}>
                    <span className={styles.extraSpan}></span>
                    <p className="dashboardFormError">
                      {errors[SERVICE_NAME].message}
                    </p>
                  </div>
                )}
              </div>

              <div className={styles.formFieldContainer}>
                <div className={styles.inputFieldContainer}>
                  <label htmlFor={SERVICE_PRICE} className={styles.formLabel}>
                    Sell Price
                    <span className="asterick">*</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Enter Sell Price"
                    className={styles.inputField}
                    {...register(
                      SERVICE_PRICE,
                      addServiceValidator[SERVICE_PRICE]
                    )}
                    onChange={(e) => trimValue(e)}
                    onKeyDown={(e: any) => disableArrowKey(e)}
                    onWheel={(e: any) => {
                      e.target.blur()
                    }}
                  />
                </div>
                {errors[SERVICE_PRICE] && (
                  <div className={styles.errorContainer}>
                    <span className={styles.extraSpan}></span>
                    <p className="dashboardFormError">
                      {errors[SERVICE_PRICE].message}
                    </p>
                  </div>
                )}
              </div>

              <div className={styles.formFieldContainer}>
                <div className={styles.inputFieldContainer}>
                  <label htmlFor={SERVICE_COST} className={styles.formLabel}>
                    Cost Price
                    <span className="asterick">*</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Enter Cost Price"
                    className={styles.inputField}
                    {...register(
                      SERVICE_COST,
                      addServiceValidator[SERVICE_COST]
                    )}
                    onChange={(e) => trimValue(e)}
                    onKeyDown={(e: any) => disableArrowKey(e)}
                    onWheel={(e: any) => {
                      e.target.blur()
                    }}
                  />
                </div>
                {errors[SERVICE_COST] && (
                  <div className={styles.errorContainer}>
                    <span className={styles.extraSpan}></span>
                    <p className="dashboardFormError">
                      {errors[SERVICE_COST].message}
                    </p>
                  </div>
                )}
              </div>

              <div className={styles.formFieldContainer}>
                <div className={styles.inputFieldContainer}>
                  <label htmlFor={SERVICE_GROUP} className={styles.formLabel}>
                    Group <span className="asterick">*</span>
                  </label>
                  <Select
                    className={styles.selectInputField}
                    placeholder={<div className="selectPlaceholder"></div>}
                    {...register(
                      SERVICE_GROUP,
                      addServiceValidator[SERVICE_GROUP]
                    )}
                    isClearable={true}
                    value={watch(SERVICE_GROUP || [])}
                    options={Group?.map((item: any) => ({
                      label: item.label,
                      value: item.value,
                      isDisabled: item.value === 'group',
                    }))}
                    components={animatedComponent}
                    closeMenuOnSelect={true}
                    maxMenuHeight={130}
                    styles={customDropdownStyles}
                    onChange={(e: any) => {
                      setValue(SERVICE_GROUP, e)
                      // trigger(MONTH);
                    }}
                  />
                </div>
                {errors[SERVICE_GROUP] && (
                  <div className={styles.errorContainer}>
                    <span className={styles.extraSpan}></span>
                    <p className="dashboardFormError">
                      {errors[SERVICE_GROUP].message as any}
                    </p>
                  </div>
                )}
              </div>

              <div className={styles.formFieldContainer}>
                <div className={styles.inputFieldContainer}>
                  <label
                    htmlFor={SERVICE_NUMBER_SESSION}
                    className={styles.formLabel}
                  >
                    Number of Sessions
                    <span className="asterick">*</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Enter Number of Sessions"
                    className={styles.inputField}
                    onKeyDown={(e: any) => disableArrowKey(e)}
                    onWheel={(e: any) => {
                      e.target.blur()
                    }}
                    {...register(
                      SERVICE_NUMBER_SESSION,
                      addServiceValidator[SERVICE_NUMBER_SESSION]
                    )}
                    onChange={(e) => trimValue(e)}
                  />
                </div>
                {errors[SERVICE_NUMBER_SESSION] && (
                  <div className={styles.errorContainer}>
                    <span className={styles.extraSpan}></span>
                    <p className="dashboardFormError">
                      {errors[SERVICE_NUMBER_SESSION].message}
                    </p>
                  </div>
                )}
              </div>

              <div className={styles.formFieldContainer}>
                <div className={styles.inputFieldContainer}>
                  <label htmlFor={SERVICE_SESSION} className={styles.formLabel}>
                    Session Time
                    {/* <span className="asterick">*</span> */}
                  </label>
                  <input
                    type="number"
                    placeholder="Session Time in Minutes"
                    onKeyDown={(e: any) => disableArrowKey(e)}
                    onWheel={(e: any) => {
                      e.target.blur()
                    }}
                    className={styles.inputField}
                    {...register(SERVICE_SESSION)}
                    onChange={(e) => trimValue(e)}
                  />
                </div>
                {/* {errors[SERVICE_SESSION] && (
                      <div className={styles.errorContainer}>
                        <span className={styles.extraSpan}></span>
                        <p className="dashboardFormError">
                          {errors[SERVICE_SESSION].message}
                        </p>
                      </div>
                    )} */}
              </div>

              <div className={styles.formFieldContainer}>
                <div className={styles.inputFieldContainer}>
                  <label htmlFor={SERVICE_STATUS} className={styles.formLabel}>
                    Status <span className="asterick">*</span>
                  </label>
                  <Select
                    className={styles.selectInputField}
                    // placeholder={<div className="selectPlaceholder"></div>}
                    {...register(
                      SERVICE_STATUS,
                      addServiceValidator[SERVICE_STATUS]
                    )}
                    isClearable={true}
                    value={watch(SERVICE_STATUS || [])}
                    options={Status?.map((item: any) => ({
                      label: item.label,
                      value: item.value,
                    }))}
                    components={animatedComponent}
                    closeMenuOnSelect={true}
                    maxMenuHeight={130}
                    styles={customDropdownStyles}
                    onChange={(e: any) => {
                      setValue(SERVICE_STATUS, e)
                      // trigger(MONTH);
                    }}
                  />
                </div>
                {errors[SERVICE_STATUS] && (
                  <div className={styles.errorContainer}>
                    <span className={styles.extraSpan}></span>
                    <p className="dashboardFormError">
                      {errors[SERVICE_STATUS].message as any}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className={styles.buttonConatiner}>
              <Button
                title="Submit"
                type="submit"
                customClass={styles.submitButtonStyle}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default AddServiceDataModal
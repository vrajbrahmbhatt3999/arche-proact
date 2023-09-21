import { FC, useEffect, useState } from 'react'
import styles from './TreatmentPlanDialog.module.scss'
import Select from 'react-select'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { components } from 'react-select'
import {
  CloseIcon,
  DropDownArrowIcon,
  DropDownIcon,
  Error,
} from '../../../../components/common/svg-components'
import { useAppDispatch, useAppSelector } from '../../../../hooks'
import {
  concateTreatmentPlans,
  concateTreatmentPlansFromdialog,
  deleteNewTreatmentPlanDialogTableDataById,
  getNewTreatmentPlanDialogTableDataPriceAndDiscountDetails,
} from '../../../../redux/features/treatmentPlans/treatmentPlansSlice'
import { colors } from '../../../../constants/color'
import Divider from '../../../../components/common/divider/Divider'
import {
  allowedNumberOfDigitsAfterDecimal,
  createServiceData,
  disableArrowKey,
  getUniqueServiceIds,
  handleCalculatePriceAndDiscount,
  searchableSelectStyle,
  uniqueID,
} from '../../../../utils/utils'
import TableV2 from '../../../../components/common/table/tableV2/TableV2'
import Button from '../../../../components/common/button/Button'
import DeletePopUpAlert from '../delete-popUp-alert/DeletePopUpAlert'
import {
  createCustomTreatmentPlan,
  getAllTreatmentPlans,
  getAllTreatmentServices,
} from '../../../../redux/features/treatmentPlans/treatmentPlansAsyncActions'
import { requestGenerator } from '../../../../utils/payloadGenerator'
import Toast from '../../../../components/common/toast/Toast'
import {
  DOCTOR_LABEL_NAME,
  SERVICE_LABEL_NAME,
  PROCEDURE_LABEL_NAME,
  SESSIONS_LABEL_NAME,
} from '../../../../constants/constant'
import { predefinedPlanHeaderData } from '../../../../constants/table-data/dentalTreatmentTablesData'
import { setMessage } from '../../../../redux/features/toast/toastSlice'
import { failure } from '../../../../constants/data'
import { CREATE_CUSTOM_TREATMENT_PLAN } from '../../../../constants/asyncActionsType'
import Loader from '../../../../components/common/spinner/Loader'
import { getAllDentalTreatmentServices, getAllDentalTreatmentServicesByParentId } from '../../../../redux/features/dentist-diagnosis/dentistDiagnosisAsyncActions'
import { dentistDiagnosisValidators } from '../../../../form-validators/dentalDiagnosisValidators'

interface ITreatmentPlanDialog {
  forPreDefinedPlanFlag: boolean
  selectedTreatmentPlanId: any
  popData?: {}
  handleClose?: any
  setNotPopup?: any
  setComplaintPopup?: any
}

const TreatmentPlanDialog: FC<ITreatmentPlanDialog> = ({
  popData,
  handleClose,
  selectedTreatmentPlanId,
  forPreDefinedPlanFlag,
  setNotPopup,
  setComplaintPopup,
}) => {
  const dispatch = useAppDispatch()

  const { newTreatmentPlanDialogTableData, predefinedPlanData, isLoading } =
    useAppSelector((state) => state.treatmentPlans)

  const { doctorData } = useAppSelector((state) => state.appointments)
  const { branchData } = useAppSelector((state) => state.login)

  /* Toast dependencies */
  const [showToast, setShowToast] = useState<boolean>(false)
  /* Toast dependencies */

  /* Dialog dependencies */
  const [selectedServiceId, setSelectedServiceId] = useState<string>('')
  const [showDeletePopUpAlert, setShowDeletePopUpAlert] =
    useState<boolean>(false)
  /* Dialog dependencies */

  // Dependencies for searchable select */
  const [procedures, setProcedures] = useState<any>([])
  const [services,setServices]= useState<any>([])
  const [doctors, setDoctors] = useState<any>([])
  const [predefinedPlans, setPredefinedPlans] = useState<any[]>([])
  // Dependencies for searchable select */

  /* Form submission dependencies */
  const { control, handleSubmit, formState, register, reset, watch, setValue } =
    useForm({
      mode: 'all',
    })
  const { errors } = formState
  const form = watch()
  /* Form submission dependencies */

  const handleAddService = (e: any) => {
    e.preventDefault()
    const { service } = form
    const tempService = { ...service }
    tempService['price'] = allowedNumberOfDigitsAfterDecimal(service.price, 3)
    tempService['netPrice'] = allowedNumberOfDigitsAfterDecimal(
      service.netPrice,
      3
    )
    tempService['isServicePerSessionsAlreadyAdded'] = false

    dispatch(
      getNewTreatmentPlanDialogTableDataPriceAndDiscountDetails({
        forNewTreatmentPlan: { ...tempService },
      })
    )
    setValue('service', { value: '', label: '' })
  }

  /* Initial API call for select list */
  useEffect(() => {
    if (forPreDefinedPlanFlag) {
      /* API call - Select list for services */
      dispatch(getAllTreatmentPlans(requestGenerator({})))
      /* API call - Select list for services */
    } else {
      /* API call - Select list for services */
      dispatch(getAllDentalTreatmentServices(requestGenerator({pageSize:100}))).then((result) => {
        const selectListData = result?.payload?.data
        const filteredSelectListData = selectListData?.map((_element: any) => {
          const netPrice = (_element.price || 0) - (_element.discount || 0)
          return {
            value: _element._id,
            label: _element.name,
            netPrice: netPrice,
            ..._element,
          }
        })
        setProcedures(filteredSelectListData)
        // * setdoctor dropdown data
        let tempDoctors: any = []
        tempDoctors =
          doctorData && doctorData.length > 0
            ? doctorData.map((item: any) => {
                return {
                  label: item?.doctor_name,
                  value: item?._id,
                  ...item,
                }
              })
            : []
        setDoctors(tempDoctors)
      })
      /* API call - Select list for services */
    }
  }, [])
  /* Initial API call for select list */

  useEffect(() => {
    if (predefinedPlanData && predefinedPlanData.length > 0) {
      let tempArr: any[] = []
      tempArr = predefinedPlanData.map((item: any, index: any) => {
        return {
          value: item._id,
          label: item.name,
          service_ids: item.service_ids,
        }
      })
      setPredefinedPlans(tempArr)
    }
  }, [predefinedPlanData])

  /* Common dialog dependencies to Open Dialog */
  const handleDialogOpen = (tempObj: any) => {
    if (tempObj && tempObj?.noteDetail) {
      setNotPopup({ open: true, note: tempObj })
    } 
    else if (tempObj && tempObj?.noteDetail) {
      setNotPopup({ open: true, note: tempObj })
    } 
    else if (tempObj && tempObj.deleteAction) {
      setShowDeletePopUpAlert(tempObj.deleteAction.isDeleteDialogOpen)
      setSelectedServiceId(tempObj.deleteAction._id)
    }
  }
  /* Common dialog dependencies to Open Dialog */

  /* Delete popup alert dependencies - Close Dialog */
  const handleDeletePopUpAlertClose = () => {
    setShowDeletePopUpAlert(false)
    setSelectedServiceId('')
  }
  /* Delete popup alert dependencies - Close Dialog */

  // set default doctor and attended by dropdown
  let userObject: any = {}
  let defaultDoctor =
    branchData?._id && doctorData.length > 0
      ? doctorData?.find((item: any) => {
          return item?.user_id === branchData?._id
        })
      : {}
  userObject = {
    doctor_id: defaultDoctor?._id,
    doctor_name: defaultDoctor?.doctor_name,
    attended_by_id: defaultDoctor?.user_id,
  }
  /* Function definition to load the services in the table on predefined plans changed */
  const handlePredefinedPlansChanged = (selValue: any) => {
    if (selValue && selValue !== undefined && selValue !== null) {
      const tableDataForSelectedPlan = createServiceData(selValue, userObject)
      setValue('sessions', tableDataForSelectedPlan.length)
      dispatch(
        getNewTreatmentPlanDialogTableDataPriceAndDiscountDetails({
          forPredefinedTreatmentPlan: tableDataForSelectedPlan,
        })
      )
    }
  }
  /* Function definition to load the services in the table on predefined plans changed */

  /* Function definition which loads the data with price per sessions */
  const handlePredefinedPlansSelection = () => {
    let tempArr: any[] = []
    tempArr =
      newTreatmentPlanDialogTableData &&
      newTreatmentPlanDialogTableData?.length > 0
        ? newTreatmentPlanDialogTableData
        : []
    dispatch(concateTreatmentPlans(tempArr))
    handleClose()
  }

  const handleAddServiceToNewPlan: SubmitHandler<any> = (formData) => {
    const tableData: any[] = []
    console.log('handleAddServiceToNewPlan==',formData);
    // Iterate over the service_ids array of the selected plan

    const { name, price, discount, _id, netPrice } = formData?.service

    let userObject: any = {}
    let defaultDoctor =
      branchData?._id && doctorData.length > 0
        ? doctorData?.find((item: any) => {
            return item?._id === formData?.doctor?._id
          })
        : {}
    userObject = {
      doctor_id: defaultDoctor?._id,
      doctor_name: defaultDoctor?.doctor_name,
      attended_by_id: defaultDoctor?.user_id,
    }

    // Create multiple rows for each service based on the number of sessions
    for (let i = 1; i <= formData?.sessions; i++) {
      // Create a new row of data for each session of the service
      const rowData = {
        treatmentPlanName: i === 1 ? formData?.treatmentPlanName : '-',
        service_name: name,
        price,
        discount,
        sessionsIndex: i,
        sessions:
          i === 1 ? formData?.sessions : '-' /* i === 1 ? session : '-' */,
        netPrice: allowedNumberOfDigitsAfterDecimal(netPrice, 3),
        service_id: _id,
        sessionId: uniqueID(),
        procedure_name:formData?.procedure.name,
        procedure_id:formData?.procedure._id,
        doctor_id: formData?.doctor?._id,
        doctor_name: formData?.doctor?.doctor_name,
        selected_tooths:[],
        status: 'new',
        billable: true,
        billed: 'not-billed',
        note: '',
        attended_by_id: userObject?.attended_by_id,
      }

      // Add the row data to the table data array
      tableData.push(rowData)
    }

    let isExist = newTreatmentPlanDialogTableData.some(
      (item: any) => item?.service_id === _id
    )
    isExist
      ? dispatch(
          setMessage({ message: `${name} is already exist`, type: failure })
        )
      : dispatch(concateTreatmentPlansFromdialog(tableData))
    // Now you can use the tableData array to populate the table component
  }
  const createNewTreatmentPlan = () => {
    let payload: any = {}
    const uniqueServiceIds = getUniqueServiceIds(
      newTreatmentPlanDialogTableData
    )
    payload = {
      name: form?.treatmentPlanName,
      sessions: newTreatmentPlanDialogTableData.length,
      service_ids: uniqueServiceIds,
      doctor_id: form?.doctor?._id,
      department_id:procedures?.length>0 ?procedures[0].department_id:null,
      procedure_ids:[newTreatmentPlanDialogTableData.procedure_id]
    }
    dispatch(createCustomTreatmentPlan(requestGenerator(payload))).then((e) => {
      if (e.type === `${CREATE_CUSTOM_TREATMENT_PLAN}/fulfilled`) {
        console.log('new plan id', e)
        let tempArr =
          newTreatmentPlanDialogTableData &&
          newTreatmentPlanDialogTableData?.length > 0
            ? newTreatmentPlanDialogTableData.map((item: any) => {
                return {
                  ...item,
                  plan_id: e?.payload?._id,
                }
              })
            : []
        dispatch(concateTreatmentPlans(tempArr))
        handleClose()
      }
    })
  }

  const TreatmentPlanName = ()=>
    (<div className="common-input-wrapper">
    <label className="common-input-wrapper__label">
      Treatment Plan Name<span className="asterick">*</span>
    </label>
    <Controller
      name="treatmentPlanName"
      control={control}
      render={({ field }) => (
        <>
          <input
            {...field}
            type="text"
            className="common-input-wrapper__input"
            placeholder="Enter plan name"
            value={field.value?.trimLeft()}
            onChange={(e) => {
              return field.onChange(e.target.value.trimLeft())
            }}
          />
        </>
      )}
      rules={{ required: true }}
    />
    <div className="common-input-wrapper__error-container">
      {errors?.treatmentPlanName && (
        <p className="dashboardFormError">
          Please enter treatment plan name
        </p>
      )}
    </div>
  </div>)

  const ProceduresDropdown = ()=> (
    <div className={styles.inputWrapperWithAddButton}>
    <label className="common-input-wrapper__label">
      Procedures<span className="asterick">*</span>
    </label>
    <div className={styles.searchableSelect}>
      <Controller
        name={PROCEDURE_LABEL_NAME}
        control={control}
        rules={dentistDiagnosisValidators[PROCEDURE_LABEL_NAME]}
        render={({ field }) => (
          <Select
            options={procedures}
            value={field.value}
            onChange={(option: any) => {
              setShowToast(false)
              console.log('Procedures on change option=',option);
              setServices([]);
              dispatch(getAllDentalTreatmentServicesByParentId(requestGenerator({filters:{parent_id:option.value}}))).then((result) => {
                const selectServiceListData = result?.payload?.data
                const filteredServiceSelectListData = selectServiceListData?.map((_element: any) => {
                  const netPrice = (_element.price || 0) - (_element.discount || 0)
                  return {
                    value: _element._id,
                    label: _element.name,
                    netPrice: netPrice,
                    ..._element,
                  }
                })
                setServices(filteredServiceSelectListData)
              })
              return field.onChange(option)
            }}
            placeholder="Select Procedures"
            components={{ DropdownIndicator }}
            backspaceRemovesValue={true}
            styles={searchableSelectStyle}
          />
        )}
      />
      <div className="common-input-wrapper__error-container">
        <p className="dashboardFormError">
          {errors[SERVICE_LABEL_NAME] && (
            <>{errors[SERVICE_LABEL_NAME]?.message}</>
          )}
        </p>
      </div>
    </div> 

  </div>
  )

  const ServicesDropdown = ()=> (
    <div className={styles.inputWrapperWithAddButton}>
    <label className="common-input-wrapper__label">
     Services<span className="asterick">*</span>
    </label>
    <div className={styles.searchableSelect}>
      <Controller
        name={SERVICE_LABEL_NAME}
        control={control}
        render={({ field }) => (
          <Select
            options={services}
            value={field.value}
            onChange={(option: any) => {
              setShowToast(false)
              return field.onChange(option)
            }}
            placeholder="Select Services"
            components={{ DropdownIndicator }}
            backspaceRemovesValue={true}
            styles={searchableSelectStyle}
          />
        )}
      />
      <div className="common-input-wrapper__error-container">
        <p className="dashboardFormError">
          {errors[SERVICE_LABEL_NAME] && (
            <>{errors[SERVICE_LABEL_NAME]?.message}</>
          )}
        </p>
      </div>
    </div> 

  </div>
  )


  const Sessions = ()=>(
    <div className="common-input-wrapper">
    <label className="common-input-wrapper__label">
      Sessions<span className="asterick">*</span>{' '}
    </label>
    <Controller
      name="sessions"
      control={control}
      render={({ field }) => (
        <input
          {...field}
          type="number"
          onKeyDown={(e: any) => disableArrowKey(e)}
          value={field.value?.trimLeft()}
          onChange={(e) => {
            return field.onChange(e.target.value.trimLeft())
          }}
          onWheel={(e: any) => {
            e.target.blur()
          }}
          placeholder="Enter sessions"
          className="common-input-wrapper__input"
        />
      )}
      rules={dentistDiagnosisValidators[SESSIONS_LABEL_NAME]}
    />
    <div className="common-input-wrapper__error-container">
      <p className="dashboardFormError">
        {errors?.sessions && <>{errors?.sessions?.message}</>}
      </p>
    </div>
  </div>
  )

  const DoctorInput = () =>(
    <div className={styles.inputWrapperWithAddButton}>
      <label className="common-input-wrapper__label">
        Dentist<span className="asterick">*</span>
      </label>
      <div className={styles.searchableSelect}>
        <Controller
          name={DOCTOR_LABEL_NAME}
          control={control}
          rules={dentistDiagnosisValidators[DOCTOR_LABEL_NAME]}
          render={({ field }) => (
            <Select
              options={doctors}
              value={field.value}
              onChange={(option: any) => {
                setShowToast(false)
                return field.onChange(option)
              }}
              placeholder="Select Dentist"
              components={{ DropdownIndicator }}
              backspaceRemovesValue={true}
              styles={searchableSelectStyle}
              maxMenuHeight={190}
            />
          )}
        />
        <div className="common-input-wrapper__error-container">
          <p className="dashboardFormError">
            {errors[DOCTOR_LABEL_NAME] && (
              <>{errors[DOCTOR_LABEL_NAME]?.message}</>
            )}
          </p>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {isLoading && <Loader />}
      {/* Treatment Plan Dialog */}
      <div className="dialog">
        <div
          className={styles.mainContainer}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.iconContainer}>
            <CloseIcon
              customClass={styles.closeIconStyle}
              fillColor={colors.green1}
              handleClick={handleClose}
            />
          </div>

          <header className={styles.headerContainer}>
            <span className={styles.title}>
              {forPreDefinedPlanFlag === true
                ? 'Predefined Dental Plans'
                : 'New Dental Treatment Plan'}
            </span>
            <Divider customClass={styles.dividerStyle} />
          </header>

          <form
            className={styles.formContainer}
            onSubmit={handleSubmit(handleAddServiceToNewPlan)}
          >
            <section className={styles.sectionContainer}>
              {forPreDefinedPlanFlag === true ? (
                <>
                  <div className="common-input-wrapper">
                    <label className="common-input-wrapper__label">
                      Predefined Plan<span className="asterick">*</span>
                    </label>
                    <div className="common-input-wrapper__searchable-select">
                      {
                        <Controller
                          name="predefinedPlan"
                          control={control}
                          render={({ field }) => (
                            <Select
                              options={predefinedPlans}
                              value={field.value}
                              onChange={(option: any) => {
                                handlePredefinedPlansChanged(option)
                                return field.onChange(option)
                              }}
                              placeholder="Predefined Plan"
                              components={{ DropdownIndicator }}
                              isClearable={true}
                              backspaceRemovesValue={true}
                              styles={searchableSelectStyle}
                            />
                          )}
                          rules={{ required: true }}
                        />
                      }
                    </div>
                  </div>
                  <div className="common-input-wrapper">
                    <label className="common-input-wrapper__label">
                      Sessions<span className="asterick">*</span>{' '}
                    </label>
                    <Controller
                      name="sessions"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          className="common-input-wrapper__input"
                          required
                          disabled
                          style={{ backgroundColor: '#f5f7f9' }}
                        />
                      )}
                      rules={{ required: true }}
                    />
                    <div className="common-input-wrapper__error-container">
                      {errors?.sessions && (
                        <p className="dashboardFormError">
                          Sessions is required
                        </p>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  
                  {TreatmentPlanName()}
                  {ProceduresDropdown()}
                  {ServicesDropdown()}
                  {Sessions()}
                  {DoctorInput()}
                  
                </>
              )}
            </section>

            {/* Table container */}
            <div className={styles.tableContainer}>
              <TableV2
                tableHeaderData={predefinedPlanHeaderData}
                tableRowData={newTreatmentPlanDialogTableData}
                handleClick={handleDialogOpen}
                active={false}
              />
            </div>
            {/* Table container */}

            {/* Amount container */}
            {
              <div className={styles.amountContainer}>
                <div>
                  Total Amount:{' $'}
                  {allowedNumberOfDigitsAfterDecimal(
                    handleCalculatePriceAndDiscount(
                      newTreatmentPlanDialogTableData
                    ).totalPrice,
                    3
                  ) || 0}
                </div>
                <div>
                  Discount:{' $'}
                  {allowedNumberOfDigitsAfterDecimal(
                    handleCalculatePriceAndDiscount(
                      newTreatmentPlanDialogTableData
                    ).discount,
                    3
                  ) || 0}
                </div>
                <div>
                  Net Amount:{' $'}
                  {allowedNumberOfDigitsAfterDecimal(
                    handleCalculatePriceAndDiscount(
                      newTreatmentPlanDialogTableData
                    ).netPrice,
                    3
                  ) || 0}
                </div>
              </div>
            }
            {/* Amount container */}

            {/* Dependency for delete popup alert - Treatment Plan */}
            {
              <DeletePopUpAlert
                open={showDeletePopUpAlert}
                handleClose={handleDeletePopUpAlertClose}
                selectedId={selectedServiceId}
                dispatchFunction={deleteNewTreatmentPlanDialogTableDataById}
              />
            }
            {/* Dependency for delete popup alert - Treatment Plan */}

            <div className={styles.buttonContainer}>
              {forPreDefinedPlanFlag === true ? (
                <Button
                  title="Submit"
                  type="button"
                  handleClick={() => handlePredefinedPlansSelection()}
                />
              ) : (
                <>
                  <Button
                    title="Submit Service"
                    // handleClick={onSubmitService}
                    type="submit"
                  />
                  <Button
                    title="Save Plan"
                    disable={
                      newTreatmentPlanDialogTableData.length > 0 ? false : true
                    }
                    handleClick={createNewTreatmentPlan}
                    type="button"
                  />
                </>
              )}
            </div>
          </form>
        </div>
      </div>
      {/* Treatment Plan Dialog */}

      {/* Toast dependencies */}
      {showToast === true && (
        <Toast
          type={{
            id: 1,
            title: 'Atleast one service has to be selected',
            crossColor: 'red',
            icon: <Error fillColor="red" />,
          }}
          message="Atleast one service has to be selected"
        />
      )}
      {/* Toast dependencies */}
    </>
  )
}
export default TreatmentPlanDialog

export const DropdownIndicator = (props: any) => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        {props.selectProps.menuIsOpen ? (
          <DropDownArrowIcon fillColor="#797979" />
        ) : (
          <DropDownIcon fillColor="#797979" />
        )}
      </components.DropdownIndicator>
    )
  )
}

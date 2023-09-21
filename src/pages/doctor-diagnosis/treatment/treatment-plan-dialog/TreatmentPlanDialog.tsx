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
  clearNewTreatmentPlanDialogTableData,
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
import { doctorDiagnosisValidators } from '../../../../form-validators/doctorDiagnosisValidators'
import {
  DOCTOR_LABEL_NAME,
  SERVICE_LABEL_NAME,
  SESSIONS_LABEL_NAME,
} from '../../../../constants/constant'
import { predefinedPlanHeaderData } from '../../../../constants/table-data/treatmentTablesData'
import { setMessage } from '../../../../redux/features/toast/toastSlice'
import { failure } from '../../../../constants/data'
import { CREATE_CUSTOM_TREATMENT_PLAN } from '../../../../constants/asyncActionsType'
import Loader from '../../../../components/common/spinner/Loader'

interface ITreatmentPlanDialog {
  forPreDefinedPlanFlag: boolean
  selectedTreatmentPlanId: any
  popData?: {}
  handleClose?: any
  setNotPopup?: any
}

const TreatmentPlanDialog: FC<ITreatmentPlanDialog> = ({
  popData,
  handleClose,
  selectedTreatmentPlanId,
  forPreDefinedPlanFlag,
  setNotPopup,
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
  const [services, setServices] = useState([])
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
      dispatch(
        getAllTreatmentPlans(requestGenerator({ page: 1, pageSize: 100 }))
      )
      /* API call - Select list for services */
    } else {
      const paylaod = {
        page: 1,
        pageSize: 100,
      }
      /* API call - Select list for services */
      dispatch(getAllTreatmentServices(requestGenerator(paylaod))).then(
        (result) => {
          const selectListData = result?.payload?.data
          const filteredSelectListData = selectListData?.map(
            (_element: any) => {
              const netPrice = (_element.price || 0) - (_element.discount || 0)
              return {
                value: _element._id,
                label: _element.name,
                netPrice: netPrice,
                ..._element,
              }
            }
          )
          setServices(filteredSelectListData)
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
        }
      )
      /* API call - Select list for services */
    }
  }, [])
  /* Initial API call for select list */

  useEffect(() => {
    if (predefinedPlanData && predefinedPlanData.length > 0) {
      let tempArr: any[] = []
      tempArr = predefinedPlanData
        ?.filter((item: any) => item?.is_active)
        .map((item: any, index: any) => {
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
    } else if (tempObj && tempObj.deleteAction) {
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
        treatmentPlanName: formData?.treatmentPlanName,
        name: i === 1 ? name : '-',
        price,
        discount,
        sessionsIndex: i,
        sessions:
          i === 1 ? formData?.sessions : '-' /* i === 1 ? session : '-' */,
        netPrice: allowedNumberOfDigitsAfterDecimal(netPrice, 3),
        service_id: _id,
        sessionId: uniqueID(),
        doctor_id: formData?.doctor?._id,
        doctor_name: formData?.doctor?.doctor_name,
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
    console.log('services', uniqueServiceIds)
    const total_amount = allowedNumberOfDigitsAfterDecimal(
      handleCalculatePriceAndDiscount(newTreatmentPlanDialogTableData)
        .totalPrice,
      3
    )
    const plan_amount = allowedNumberOfDigitsAfterDecimal(
      handleCalculatePriceAndDiscount(newTreatmentPlanDialogTableData).netPrice,
      3
    )
    payload = {
      name: form?.treatmentPlanName,
      sessions: newTreatmentPlanDialogTableData.length,
      service_ids: uniqueServiceIds,
      doctor_id: form?.doctor?._id,
      total_amount: total_amount ? total_amount : 0,
      plan_amount: plan_amount ? plan_amount : 0,
    }
    dispatch(createCustomTreatmentPlan(requestGenerator(payload))).then((e) => {
      if (e.type === `${CREATE_CUSTOM_TREATMENT_PLAN}/fulfilled`) {
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
      } else {
        dispatch(clearNewTreatmentPlanDialogTableData())
      }
    })
  }
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
                ? 'Predefined Plans'
                : 'New Treatment Plan'}
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
                  <div className="common-input-wrapper">
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
                  </div>

                  <div className={styles.inputWrapperWithAddButton}>
                    <label className="common-input-wrapper__label">
                      Services<span className="asterick">*</span>
                    </label>
                    <div className={styles.searchableSelect}>
                      <Controller
                        name={SERVICE_LABEL_NAME}
                        control={control}
                        rules={doctorDiagnosisValidators[SERVICE_LABEL_NAME]}
                        render={({ field }) => (
                          <Select
                            options={services}
                            value={field.value}
                            onChange={(option: any) => {
                              setShowToast(false)
                              return field.onChange(option)
                            }}
                            placeholder="Select Service"
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
                    {/* Plus Icom */}
                    {/* <button
                      disabled={
                        (form?.service?.label && form?.service?.label === '') ||
                        form?.service?.label === null ||
                        form?.service?.label === undefined ||
                        form?.service?.value === '' ||
                        form?.service?.value === null ||
                        form?.service?.value === undefined
                      }
                      className={styles.addListButton}
                      onClick={(e) => handleAddService(e)}
                    >
                      <AddButtonIcon fillColor="#02BF90" />
                    </button> */}
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
                      rules={doctorDiagnosisValidators[SESSIONS_LABEL_NAME]}
                    />
                    <div className="common-input-wrapper__error-container">
                      <p className="dashboardFormError">
                        {errors?.sessions && <>{errors?.sessions?.message}</>}
                      </p>
                    </div>
                  </div>
                  <div className={styles.inputWrapperWithAddButton}>
                    <label className="common-input-wrapper__label">
                      Doctor<span className="asterick">*</span>
                    </label>
                    <div className={styles.searchableSelect}>
                      <Controller
                        name={DOCTOR_LABEL_NAME}
                        control={control}
                        rules={doctorDiagnosisValidators[DOCTOR_LABEL_NAME]}
                        render={({ field }) => (
                          <Select
                            options={doctors}
                            value={field.value}
                            onChange={(option: any) => {
                              setShowToast(false)
                              return field.onChange(option)
                            }}
                            placeholder="Select Doctor"
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

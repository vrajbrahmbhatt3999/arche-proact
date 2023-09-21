import { FC, useEffect, useState } from 'react'
import styles from './TreatmentPlanList.module.scss'
import { useNavigate } from 'react-router-dom'
import Select, { components } from 'react-select'
import { Controller, useForm } from 'react-hook-form'
import TreatmentPlanDialog from '../treatment-plan-dialog/TreatmentPlanDialog'
import Calculator from '../treatment-plan-calculator/Calculator'
import { useAppDispatch, useAppSelector } from '../../../../hooks'
import {
  clearNewTreatmentPlanDialogTableData,
  clearNewTreatmentPlanDialogTableDataPriceAndDiscountDetails,
  clearTreatmentData,
  concateTreatmentPlans,
  deleteTreatmentPlanTableDataById,
  emptyAllTreatmentStatus,
  setCalculatorDialog,
  setOngoingTreatmentPlanPopup,
  updateTreatmentPlansFromtable,
} from '../../../../redux/features/treatmentPlans/treatmentPlansSlice'
import {
  allowedNumberOfDigitsAfterDecimal,
  createServiceArray,
  handleCalculatePriceAndDiscount,
  searchableSelectStyle,
} from '../../../../utils/utils'
import TableV2 from '../../../../components/common/table/tableV2/TableV2'
import Button from '../../../../components/common/button/Button'
import { SearchIcon } from '../../../../components/common/svg-components'
import DeletePopUpAlert from '../delete-popUp-alert/DeletePopUpAlert'
import {
  getAllTreatmentPlansforPatient,
  getAllTreatmentServices,
  updateTreatmentPlan,
} from '../../../../redux/features/treatmentPlans/treatmentPlansAsyncActions'
import { requestGenerator } from '../../../../utils/payloadGenerator'
import Popup from '../../../../components/common/popup/Popup'
import EndDiagnosisPopup from '../../../../components/common/modal/end-diagnosis-popup/EndDiagnosisPopup'
import { markStage } from '../../../../redux/features/diagnosis/diagnosisAsyncActions'
import { clearDiagnosisId } from '../../../../redux/features/doctor-diagnosis/doctorDiagnosisSlice'
import { treatmentPlansMainTableHeaderData } from '../../../../constants/table-data/treatmentTablesData'
import { getAllDoctors } from '../../../../redux/features/appointments/bookingAppointmentAsyncActions'
import { getAllUsersByRole } from '../../../../redux/features/manage-user/ManageUserAsynActions'
import AddNotes from '../../../../components/common/modal/add-notes/AddNotes'
import Loader from '../../../../components/common/spinner/Loader'
import {
  GET_PATIENT_INSURANCE_PLAN_LIST,
  GET_TEST_NAME_BY_INSURANCE_NAME_TYPE,
  UPDATE_TREATMENT_PLANS_TYPE,
} from '../../../../constants/asyncActionsType'
import DescriptionModal from '../../../../components/common/modal/description-modal/DescriptionModal'
import { setMessage } from '../../../../redux/features/toast/toastSlice'
import { failure } from '../../../../constants/data'
import { partition } from 'lodash'
import OngoingTreatmentPlanPopup from '../ongoing-treatmentplan-popup/OngoingTreatmentPlanPopup'
import SaveTreatmentPlans from '../save-treatment-plans-popup/page'
import GlobalConfirmationPopup from '../../../../components/common/confirmation-popup/page'
import { getTestsListByInsuranceNameList } from '../../../../redux/features/request/requestAsyncActions'
import { patientInsurancePlanList } from '../../../../redux/features/invoice-module/invoiceAsynActions'

interface ITreatmentPlanList {}

const TreatmentPlanList: FC<ITreatmentPlanList> = () => {
  /* Dependency to dispatch an action */
  const dispatch = useAppDispatch()
  /* Dependency to dispatch an action */

  const {
    treatmentPlanTableData,
    isCalculatorDialogOpen,
    isLoading,
    ongoingTreatmentPlanPopup,
  } = useAppSelector((state) => state.treatmentPlans)
  const filterStatusData = treatmentPlanTableData?.filter(
    (s: any) => s?.status !== 'new' && s.is_disable !== true
  )

  const filterIdData = treatmentPlanTableData?.filter(
    (s: any) => s?._id?.length
  )

  const { createdDiagnosisId } = useAppSelector(
    (state) => state.doctorDiagnosis
  )
  const { patientFormData } = useAppSelector((state) => state.patientHistory)
  const { doctorData } = useAppSelector((state) => state.appointments)

  const { branchData } = useAppSelector((state) => state.login)

  /* Dependencies for select list */
  const [services, setServices] = useState([])
  const [insurances, setInsurance] = useState<any>([
    { label: 'Select Plan', value: '' },
  ])
  /* Dependencies for select list */

  const [endMedication, setEndMedication] = useState(false)

  /* Form submission dependencies */
  const { control, watch, setValue } = useForm({
    mode: 'all',
  })
  const form = watch()
  /* Form submission dependencies */

  /* Dialog dependencies */
  const [showTreatmentPlanDialog, setShowTreatmentPlanDialog] =
    useState<boolean>(false)
  const [dialogType, setDialogType] = useState<string>()
  const [selectedTreatmentPlanId, setSelectedTreatmentPlanId] =
    useState<string>('')

  const [notesDetails, setNotesDetails] = useState<any>({})
  const [notePopup, setNotePopup] = useState({ open: false, note: {} })
  const [showDeletePopUpAlert, setShowDeletePopUpAlert] =
    useState<boolean>(false)

  const [resetPopup, setResetPopup] = useState(false)
  const [saveService, setSaveService] = useState(false)
  useState<boolean>(false)
  /* Dialog dependencies */
  const getDisabledStatus = treatmentPlanTableData?.find(
    (s: any) => s.sessionId === selectedTreatmentPlanId
  )

  /* Treatment plan dialog Add/Edit dependencies - Open Dialog */
  const handleTreatmentPlanDialogOpen = (_id: any, type: string) => {
    setDialogType(type)
    setShowTreatmentPlanDialog(!showTreatmentPlanDialog)
    if (_id && _id !== null && _id !== undefined) {
      setSelectedTreatmentPlanId(_id)
    }
  }
  /* Treatment plan dialog Add/Edit dependencies - Open Dialog */

  /* Treatment Plan dialog Add/Edit dependencies - Close Dialog */
  const handleTreatmentPlanDialogClose = () => {
    dispatch(clearNewTreatmentPlanDialogTableData())
    dispatch(clearNewTreatmentPlanDialogTableDataPriceAndDiscountDetails())
    setShowTreatmentPlanDialog(false)
    setSelectedTreatmentPlanId('')
    setDialogType('')
  }
  /* Treatment Plan dialog Add/Edit dependencies - Close Dialog */

  /* Initial API call for select list */
  useEffect(() => {
    const requestData = {
      patient_id: patientFormData?.patient_id,
      page: 1,
      pageSize: 100,
    }
    patientFormData?.patient_id &&
      dispatch(patientInsurancePlanList(requestGenerator(requestData))).then(
        (e) => {
          if (e.type === `${GET_PATIENT_INSURANCE_PLAN_LIST}/fulfilled`) {
            const filteredSelectListData =
              e.payload && e.payload?.length > 0
                ? e.payload?.map((_element: any) => {
                    return {
                      value: _element.insurance_plan_id,
                      label: _element.insurance_plan,
                    }
                  })
                : []
            console.log('filteredSelectListData', filteredSelectListData)
            setInsurance([
              { label: 'Select Plan', value: '' },
              ,
              ...filteredSelectListData,
            ])
          }
        }
      )
    /* API call - Select list for services */
  }, [])

  useEffect(() => {
    if (form?.insurance?.value) {
      const payload = {
        department_name: 'TreatmentService',
        insurance_plan_id:
          form?.insurance?.value /* '64e5ddf34b2f0b1b030cfbd5' */,
      }
      dispatch(getTestsListByInsuranceNameList(requestGenerator(payload))).then(
        (e) => {
          if (e.type === `${GET_TEST_NAME_BY_INSURANCE_NAME_TYPE}/fulfilled`) {
            const selectListData = e?.payload
            const filteredSelectListData = selectListData?.map(
              (_element: any) => {
                const netPrice =
                  (_element.price || 0) - (_element.discount || 0)
                return {
                  ..._element,
                  value: _element._id,
                  label: _element.name,
                  netPrice: netPrice,
                }
              }
            )
            setServices(filteredSelectListData)
          }
        }
      )
    } else {
      const paylaod = {
        page: 1,
        pageSize: 100,
      }
      dispatch(getAllTreatmentServices(requestGenerator(paylaod))).then(
        (result) => {
          const selectListData = result?.payload?.data
          const filteredSelectListData = selectListData?.map(
            (_element: any) => {
              const netPrice = (_element.price || 0) - (_element.discount || 0)
              return {
                ..._element,
                value: _element._id,
                label: _element.name,
                netPrice: netPrice,
              }
            }
          )
          setServices(filteredSelectListData)
        }
      )
    }
  }, [form?.insurance?.value])

  /* Initial API call for select list */

  /* Add Service from the search bar - Add Multiple Service */
  const handleAddService = () => {
    const { service } = form
    let serviceArr: any = []
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
    createServiceArray(service, serviceArr, null, userObject)
    dispatch(concateTreatmentPlans(serviceArr))
    setValue('service', { value: '', label: '' })
    setValue('insurance', { value: '', label: '' })
  }

  /* Calculator dialog dependencies - Close Dialog */
  const handleCalculatorDialogClose = () => {
    dispatch(setCalculatorDialog(false))
  }
  /* Calculator dialog dependencies - Close Dialog */

  /* Delete popup alert dependencies - Close Dialog */
  const handleDeletePopUpAlertClose = () => {
    setShowDeletePopUpAlert(false)
    setSelectedTreatmentPlanId('')
  }
  /* Delete popup alert dependencies - Close Dialog */
  const handleOngoingTreatmentPopupClose = () => {
    // setOngoingTreatmentPlan(!ongoingTreatmentPlan);
    dispatch(setOngoingTreatmentPlanPopup(false))
  }
  const navigate = useNavigate()
  const handleEndDiagnosis = () => {
    let reqData = {
      // diagnosis_id: "646e0979dafb09722afde19f",
      diagnosis_id:
        createdDiagnosisId?.length > 0
          ? createdDiagnosisId
          : patientFormData?.diag_id
          ? patientFormData?.diag_id
          : '',
      diagnosis_stage: 'E',
    }
    if (reqData?.diagnosis_id) {
      dispatch(markStage(requestGenerator(reqData))).then(() => {
        navigate('/doctor')
      })
      dispatch(clearDiagnosisId())
    } else {
      dispatch(
        setMessage({ message: 'Please do diagnosis first', type: failure })
      )
    }
  }
  useEffect(() => {
    let getAllTreatment: boolean = false
    getAllTreatment =
      createdDiagnosisId?.length > 0
        ? true
        : patientFormData?.diag_id !== null && patientFormData?.diag_id
        ? true
        : false

    const payload = {
      diagnosis_id:
        createdDiagnosisId?.length > 0
          ? createdDiagnosisId
          : patientFormData?.diag_id !== null
          ? patientFormData?.diag_id
          : '',
      page: 1,
      pageSize: 100,
      search: '',
      is_active: true,
    }
    getAllTreatment &&
      dispatch(getAllTreatmentPlansforPatient(requestGenerator(payload)))
  }, [dispatch, createdDiagnosisId])

  useEffect(() => {
    let data = {
      search: '',
      page: 1,
      pageSize: 100,
      branch: '',
    }
    dispatch(getAllDoctors(requestGenerator(data)))
  }, [dispatch])

  useEffect(() => {
    let data = {
      search: '',
      role_ids: ['641a0a05304745d678911c3b'],
    }
    dispatch(getAllUsersByRole(requestGenerator(data)))
  }, [dispatch])

  const checkDiscountMoreThanPrice = (arr: any[]) => {
    const isDiscountGrater = arr.some((item) => {
      return item.discount > item.price
    })
    return isDiscountGrater
  }

  const handleSaveTreatmentPlan = () => {
    setSaveService(true)
  }

  // notes state and functions
  const [showAddNote, setShowAddNote] = useState<boolean>(false)
  const handleNotes = (data: any) => {
    let tempArr: any = []
    tempArr = treatmentPlanTableData.map((item: any, index: number) => {
      try {
        if (item?.sessionId === notesDetails?.sessionId) {
          return {
            ...item,
            note: data.note ?? '',
          }
        } else {
          return item
        }
      } catch (error: any) {
        console.log('error', error)
      }
    })
    dispatch(updateTreatmentPlansFromtable(tempArr))
    setShowAddNote(false)
  }
  /* Common dialog dependencies to Open Dialog */
  const handleDialogOpen = (tempObj: any) => {
    if (tempObj && tempObj.notes) {
      setShowAddNote(tempObj.notes.isNotesIcon)
      setNotesDetails(tempObj.notes.item)
    } else if (tempObj && tempObj.deleteAction) {
      setShowDeletePopUpAlert(tempObj.deleteAction.isDeleteDialogOpen)
      setSelectedTreatmentPlanId(tempObj.deleteAction._id)
    }
  }
  /* Common dialog dependencies to Open Dialog */

  useEffect(() => {
    return () => {
      dispatch(clearTreatmentData())
      dispatch(emptyAllTreatmentStatus([]))
    }
  }, [])

  const emptyAllService = () => {
    dispatch(clearTreatmentData())
    setResetPopup(false)
  }

  const saveTreatmentPlans = (item: any) => {
    const separateArrayById = (arr: any[]) => {
      return partition(arr, '_id')
    }
    const [arrayWithId, arrayWithoutId] = separateArrayById(
      treatmentPlanTableData
    )

    const updatedPlan =
      arrayWithId.length > 0
        ? arrayWithId?.map((item: any) => {
            return {
              ...item,
              id: item?._id,
            }
          })
        : []

    let payload: any = {}
    payload = {
      diagnosis_id:
        createdDiagnosisId?.length > 0
          ? createdDiagnosisId
          : patientFormData?.diag_id
          ? patientFormData?.diag_id
          : '',
      newTreatments: arrayWithoutId,
      updateTreatments: updatedPlan,
      prescription_name: item?.saveTreatment,
    }
    const isEmpty = treatmentPlanTableData.some(
      ({ doctor_id }: any) => doctor_id === ''
    )
    const isDiscountHigher = checkDiscountMoreThanPrice(treatmentPlanTableData)
    if (!payload.diagnosis_id) {
      dispatch(
        setMessage({
          message: 'Please create diagnosis',
          type: failure,
        })
      )
    } else if (isEmpty) {
      dispatch(
        setMessage({
          message: 'Please select doctor name for all sessions',
          type: failure,
        })
      )
    } else if (isDiscountHigher) {
      dispatch(
        setMessage({
          message: 'Please enter discount less than price for all sessions',
          type: failure,
        })
      )
    } else {
      treatmentPlanTableData &&
        treatmentPlanTableData.length > 0 &&
        payload?.diagnosis_id &&
        dispatch(updateTreatmentPlan(requestGenerator(payload))).then((e) => {
          if (e.type === `${UPDATE_TREATMENT_PLANS_TYPE}/fulfilled`) {
            navigate('/patientdiagnosis/medication')
            setSaveService(false)
          }
        })
    }
  }

  const handleSavePlan = () => {
    setSaveService(false)
    const separateArrayById = (arr: any[]) => {
      return partition(arr, '_id')
    }
    let [arrayWithId, arrayWithoutId] = separateArrayById(
      treatmentPlanTableData
    )
    arrayWithId = arrayWithId.filter((p: any) => p.is_disable === false)
    const updatedPlan =
      arrayWithId.length > 0
        ? arrayWithId?.map((item: any) => {
            return {
              ...item,
              id: item?._id,
            }
          })
        : []

    let payload: any = {}
    payload = {
      diagnosis_id:
        createdDiagnosisId?.length > 0
          ? createdDiagnosisId
          : patientFormData?.diag_id
          ? patientFormData?.diag_id
          : '',
      newTreatments: arrayWithoutId,
      updateTreatments: updatedPlan,
      prescription_name: treatmentPlanTableData?.[0]?.prescription_name,
    }
    const isEmpty = treatmentPlanTableData.some(
      ({ doctor_id }: any) => doctor_id === ''
    )
    const isDiscountHigher = checkDiscountMoreThanPrice(treatmentPlanTableData)
    if (!payload.diagnosis_id) {
      dispatch(
        setMessage({
          message: 'Please create diagnosis',
          type: failure,
        })
      )
    } else if (isEmpty) {
      dispatch(
        setMessage({
          message: 'Please select doctor name for all sessions',
          type: failure,
        })
      )
    } else if (isDiscountHigher) {
      dispatch(
        setMessage({
          message: 'Please enter discount less than price for all sessions',
          type: failure,
        })
      )
    } else if (
      treatmentPlanTableData?.some((item: any) => item?.discount === '')
    ) {
      dispatch(
        setMessage({
          message: 'Please enter minimum discount 0',
          type: failure,
        })
      )
    } else {
      treatmentPlanTableData &&
        treatmentPlanTableData.length > 0 &&
        payload?.diagnosis_id &&
        dispatch(updateTreatmentPlan(requestGenerator(payload))).then((e) => {
          if (e.type === `${UPDATE_TREATMENT_PLANS_TYPE}/fulfilled`) {
            navigate('/patientdiagnosis/medication')
            setSaveService(false)
          }
        })
    }
  }

  return (
    <>
      {endMedication && (
        <Popup
          Children={EndDiagnosisPopup}
          handleClose={() => setEndMedication(false)}
          handleNo={() => setEndMedication(false)}
          handleYes={() => handleEndDiagnosis()}
        />
      )}
      {showAddNote && (
        <Popup
          Children={AddNotes}
          handleClose={() => setShowAddNote(false)}
          handleYes={handleNotes}
          popData={notesDetails}
        />
      )}
      {ongoingTreatmentPlanPopup && (
        <Popup
          Children={OngoingTreatmentPlanPopup}
          handleClose={handleOngoingTreatmentPopupClose}
        />
      )}
      {resetPopup && (
        <Popup
          Children={GlobalConfirmationPopup}
          handleClose={() => setResetPopup(false)}
          handleYes={emptyAllService}
          heading="Reset"
          message="Are you sure you want to reset?"
        />
      )}
      {saveService && (
        <Popup
          Children={SaveTreatmentPlans}
          handleClose={() => setSaveService(false)}
          handleYes={saveTreatmentPlans}
        />
      )}
      {isLoading && <Loader />}
      <main className={styles.mainContainer}>
        {/* Header container */}
        <div className={styles.headerContainer}>
          <button
            className={styles.addNewButtonStyle}
            onClick={() =>
              handleTreatmentPlanDialogOpen(null, 'newTreatmentPlan')
            }
          >
            New Treatment Plan
          </button>

          <button
            className={styles.addNewButtonStyle}
            onClick={() =>
              handleTreatmentPlanDialogOpen(null, 'preDefinedPlan')
            }
          >
            Predefined Plans
          </button>

          <button
            className={styles.addNewButtonStyle}
            onClick={() => dispatch(setOngoingTreatmentPlanPopup(true))}
            disabled={filterStatusData?.length}
          >
            Ongoing Plans
          </button>
        </div>
        {/* Header container */}

        {/* Search container */}
        <div className={styles.searchContainer}>
          <label className="common-input-wrapper__label">Insurance plan</label>
          <div className={styles.searchableSelect}>
            {
              <Controller
                name="insurance"
                control={control}
                render={({ field }) => (
                  <Select
                    options={insurances}
                    value={field.value}
                    onChange={(option: any) => {
                      setValue('service', { value: '', label: '' })
                      field.onChange(option)
                    }}
                    placeholder="Insurance plan"
                    components={{ DropdownIndicator }}
                    backspaceRemovesValue={true}
                    styles={searchableSelectStyle}
                  />
                )}
                rules={{ required: true }}
              />
            }
          </div>
          <label className="common-input-wrapper__label">
            Services (Procedure)
          </label>
          <div className={styles.searchableSelect}>
            {
              <Controller
                name="service"
                control={control}
                render={({ field }) => (
                  <Select
                    options={services}
                    value={field.value}
                    onChange={(option: any) => field.onChange(option)}
                    placeholder="Services"
                    components={{ DropdownIndicator }}
                    backspaceRemovesValue={true}
                    styles={searchableSelectStyle}
                  />
                )}
                rules={{ required: true }}
              />
            }
          </div>
          <button
            disabled={
              form?.service?.label === '' ||
              form?.service?.label === null ||
              form?.service?.label === undefined ||
              form?.service?.value === '' ||
              form?.service?.value === null ||
              form?.service?.value === undefined
            }
            className={styles.addNewButtonStyle}
            onClick={handleAddService}
          >
            {' '}
            Add Service{' '}
          </button>
          <button
            className={styles.addNewButtonStyle}
            onClick={() => (
              setResetPopup(true), dispatch(emptyAllTreatmentStatus([]))
            )}
            disabled={!treatmentPlanTableData?.length}
            style={{ opacity: !treatmentPlanTableData?.length ? '0.6' : '1' }}
          >
            Reset
          </button>
        </div>
        {/* Search container */}

        {/* Table container */}
        <div className={styles.tableContainer}>
          <TableV2
            tableHeaderData={treatmentPlansMainTableHeaderData}
            tableRowData={treatmentPlanTableData}
            handleClick={handleDialogOpen}
            active={false}
            colSpan={13}
          />
        </div>
        {/* Table container */}

        {/* Amount container */}
        <div className={styles.amountContainer}>
          <div>
            Total Amount:{' $'}
            {allowedNumberOfDigitsAfterDecimal(
              handleCalculatePriceAndDiscount(treatmentPlanTableData)
                .totalPrice,
              3
            ) || 0}
          </div>
          <div>
            Discount:{' $'}
            {allowedNumberOfDigitsAfterDecimal(
              handleCalculatePriceAndDiscount(treatmentPlanTableData).discount,
              3
            ) || 0}
          </div>
          <div>
            Net Amount:{' $'}
            {allowedNumberOfDigitsAfterDecimal(
              handleCalculatePriceAndDiscount(treatmentPlanTableData).netPrice,
              3
            ) || 0}
          </div>
        </div>
        {/* Amount container */}

        <div className={styles.buttonContainer}>
          <Button
            title="Save & Next"
            disable={treatmentPlanTableData?.length === 0 ? true : false}
            handleClick={() =>
              treatmentPlanTableData?.length === 0
                ? navigate('/patientdiagnosis/medication')
                : filterIdData?.length > 0
                ? handleSavePlan()
                : handleSaveTreatmentPlan()
            }
          />
          <Button
            title="End Diagnosis"
            customClass={styles.endButtonStyle}
            disable={
              createdDiagnosisId
                ? false
                : patientFormData?.diag_id
                ? false
                : true
            }
            handleClick={() => setEndMedication(!endMedication)}
          />
        </div>
      </main>

      {/* Dependency for add/edit dialog - Treatment Plan */}
      {showTreatmentPlanDialog && (
        <TreatmentPlanDialog
          forPreDefinedPlanFlag={dialogType === 'preDefinedPlan' ? true : false}
          selectedTreatmentPlanId={selectedTreatmentPlanId}
          handleClose={handleTreatmentPlanDialogClose}
          setNotPopup={setNotePopup}
        />
      )}

      {notePopup.open && (
        <Popup
          Children={DescriptionModal}
          handleClose={() => setNotePopup({ open: false, note: {} })}
          heading={'Notes'}
          popData={notePopup.note}
        />
      )}
      {/* Dependency for add/edit dialog - Treatment Plan */}

      {/* Dependency for calculator dialog - Treatment Plan */}
      {isCalculatorDialogOpen === true && (
        <Calculator handleClose={handleCalculatorDialogClose} />
      )}
      {/* Dependency for calculator dialog - Treatment Plan */}

      {/* Dependency for delete popup alert - Treatment Plan */}
      {
        <DeletePopUpAlert
          open={showDeletePopUpAlert}
          handleClose={handleDeletePopUpAlertClose}
          selectedId={selectedTreatmentPlanId}
          dispatchFunction={deleteTreatmentPlanTableDataById}
          isDisabled={getDisabledStatus?.hasOwnProperty('is_disable')}
          rowId={getDisabledStatus?._id}
        />
      }
      {/* Dependency for delete popup alert - Treatment Plan */}
    </>
  )
}

export default TreatmentPlanList

export const DropdownIndicator = (props: any) => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <SearchIcon fillColor="#797979" />
      </components.DropdownIndicator>
    )
  )
}

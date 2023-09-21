import { FC, useEffect, useState } from 'react'
import styles from './TreatmentPlanList.module.scss'
import { useNavigate } from 'react-router-dom'
import Select, { components } from 'react-select'
import { useForm } from 'react-hook-form'
import TreatmentPlanDialog from '../treatment-plan-dialog/TreatmentPlanDialog'
import Calculator from '../treatment-plan-calculator/Calculator'
import { useAppDispatch, useAppSelector } from '../../../../hooks'
import { 
  setCalculatorDialog,
  updateTreatmentPlansFromtable,
} from '../../../../redux/features/treatmentPlans/treatmentPlansSlice'
import {
  allowedNumberOfDigitsAfterDecimal,
  createServiceArray,
  handleCalculatePriceAndDiscount,
  searchableSelectStyle,
  uuid,
} from '../../../../utils/utils'
import TableV2 from '../../../../components/common/table/tableV2/TableV2'
import Button from '../../../../components/common/button/Button'
import { SearchIcon } from '../../../../components/common/svg-components'
import DeletePopUpAlert from '../delete-popUp-alert/DeletePopUpAlert'
import {
  deleteDentalTreatmentPlanTableDataByIdAction
} from '../../../../redux/features/treatmentPlans/treatmentPlansAsyncActions'
import { requestGenerator } from '../../../../utils/payloadGenerator'
import Popup from '../../../../components/common/popup/Popup'
import EndDiagnosisPopup from '../../../../components/common/modal/end-diagnosis-popup/EndDiagnosisPopup'
import {
  getAllTooths,
  getAllDentalTreatmentServices,
  markStage,
  updateDentalDiagnosisAction,
  getDentalDiagnosisByIdAction
} from '../../../../redux/features/dentist-diagnosis/dentistDiagnosisAsyncActions'
import { clearDiagnosisId } from '../../../../redux/features/dentist-diagnosis/dentistDiagnosisSlice'
import { dentalTreatmentPlansMainTableHeaderData } from '../../../../constants/table-data/dentalTreatmentTablesData'
import { getAllDoctors } from '../../../../redux/features/appointments/bookingAppointmentAsyncActions'
import { getAllUsersByRole } from '../../../../redux/features/manage-user/ManageUserAsynActions'
import AddNotes from '../../../../components/common/modal/add-notes/AddNotes'
import AddComplaint from '../../../../components/common/modal/add-complaint/AddComplaint'
import Loader from '../../../../components/common/spinner/Loader'
import {
  DELETE_DENTAL_DIAGNOSIS_ENTRY,
  GET_DENTAL_DIAGNOSIS 
} from '../../../../constants/asyncActionsType'
import DescriptionModal from '../../../../components/common/modal/description-modal/DescriptionModal'
import { setMessage } from '../../../../redux/features/toast/toastSlice'
import { failure } from '../../../../constants/data'
import { partition } from 'lodash'
import ToothModal from '../../../../components/common/modal/tooth-modal/ToothModal'
import moment from 'moment'

interface ITreatmentPlanList {}

const TreatmentPlanList: FC<ITreatmentPlanList> = () => {
  /* Dependency to dispatch an action */
  const dispatch = useAppDispatch()
  /* Dependency to dispatch an action */

  var { treatmentPlanTableData, isCalculatorDialogOpen, isLoading } =
    useAppSelector((state) => state.treatmentPlans)
  const { createdDiagnosisId, tooths, services, diagnosisDetails } =
    useAppSelector((state) => state.dentistDiagnosis)
  const { patientFormData } = useAppSelector((state) => state.patientHistory)
  //const { doctorData } = useAppSelector((state) => state.appointments)
  const { branchData } = useAppSelector((state) => state.login)
  const [endMedication, setEndMedication] = useState(false)
  const [tableData, setTableData] = useState(treatmentPlanTableData)

  /* Form submission dependencies */
  const { control, handleSubmit, formState, register, watch, setValue } =
    useForm({ mode: 'all' })
  const form = watch()
  /* Form submission dependencies */

  /* Dialog dependencies */
  const [ageGroup, setAgeGroup] = useState({ label: 'Adult', value: 'adult' })
  const [chartMode, setChartMode] = useState('ALL')
  const [toothModal, setToothModal] = useState<boolean>(false)
  const [toothModalData, setToothModalData] = useState<any>({})

  //const [showTreatmentPlanDialog, setShowTreatmentPlanDialog] = useState<boolean>(false)
  //const [dialogType, setDialogType] = useState<string>()

  const [selectedTreatmentPlanId, setSelectedTreatmentPlanId] =
    useState<string>('')
  const [notesDetails, setNotesDetails] = useState<any>({})
  const [notePopup, setNotePopup] = useState({ open: false, note: {} })
  const [complaintDetails, setComplaintDetails] = useState<any>({})
  const [complaintPopup, setComplaintPopup] = useState({
    open: false,
    complaint: {},
  })
  const [showDeletePopUpAlert, setShowDeletePopUpAlert] =
    useState<boolean>(false)
  const uppertooths = tooths
    ? tooths
        .filter(
          (item: any) =>
            item.jaw === 'upper' && item.age_group.includes(ageGroup.value)
        )
        .map((ti: any) => {
          let fti = { ...ti }
          if (ageGroup.value === 'kids') {
            fti.display_tooth_number = ti.tooth_number + 40
          } else {
            fti.display_tooth_number = ti.tooth_number
          }
          return fti
        })
    : []
  const lowertooths = tooths
    ? tooths
        .filter(
          (item: any) =>
            item.jaw === 'lower' && item.age_group.includes(ageGroup.value)
        )
        .map((ti: any) => {
          let fti = { ...ti }
          if (ageGroup.value === 'kids') {
            fti.display_tooth_number = ti.tooth_number + 40
          } else {
            fti.display_tooth_number = ti.tooth_number
          }
          return fti
        })
    : []
    const base_image_url = ageGroup.value==='kids'?'https://proact-services-dev.s3.me-south-1.amazonaws.com/medical-center/dental-module/KIDS/':'https://proact-services-dev.s3.me-south-1.amazonaws.com/medical-center/dental-module/';

  /* Dialog dependencies */
  
  useEffect(() => {
    setTableData([])
    handleChartModeChange(chartMode)
  }, [treatmentPlanTableData])

  useEffect(() => {
    dispatch(getAllTooths(requestGenerator({})))
    dispatch(getAllDentalTreatmentServices(requestGenerator({})))
  }, [])

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
      role_ids: [branchData.role_id._id],
    }
    dispatch(getAllUsersByRole(requestGenerator(data)))
  }, [dispatch])


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

  const handleDeleteEntry=()=>{
    let item_to_delete = treatmentPlanTableData.find((item:any)=>item._id === selectedTreatmentPlanId);
    let payload ={
      _id:item_to_delete._id,
      diagnosis_id:diagnosisDetails._id,
      procedure_id:item_to_delete.procedure_id,
      tooth_id: item_to_delete.selected_tooths && item_to_delete.selected_tooths.length>0 ?item_to_delete.selected_tooths[0]._id:null
    };
    dispatch(deleteDentalTreatmentPlanTableDataByIdAction(requestGenerator(payload)))
    .then((e0: any)=>{
       if (e0.type === `${DELETE_DENTAL_DIAGNOSIS_ENTRY}/fulfilled`){
        dispatch(getDentalDiagnosisByIdAction(requestGenerator(payload))) 
      } 
    })
  }

  const navigate = useNavigate()
  const handleEndDiagnosis = () => {
    let reqData = {
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
        navigate('/dentist')
      })
      dispatch(clearDiagnosisId())
    } else {
      dispatch(
        setMessage({ message: 'Please do diagnosis first', type: failure })
      )
    }
  }

  function mapData(dentalDiagDetails:any) {
    //treatmentPlanTableData = []
    //dispatch(updateTreatmentPlansFromtable([]))
    //setTableData([])

    let diagnosis_treatments =
      dentalDiagDetails &&
      dentalDiagDetails.diagnosis_treatments
        ? dentalDiagDetails.diagnosis_treatments
        : []
    let existing_treatments =
      dentalDiagDetails && dentalDiagDetails.diagnosis_history
        ? dentalDiagDetails.diagnosis_history.tooths
        : []

   
    // MAPPING OF DIAGNOSIS TREATMENTS
    let taken: any[] = []
    diagnosis_treatments = diagnosis_treatments.length>0 ? diagnosis_treatments.map((item: any) => {
      let obj = Object.assign({}, item)
      obj._id = uuid()
      obj.type = 'TREATMENT'
      obj.age_group =
        item.age_group === 'adult'
          ? {
              label: 'Adult',
              value: 'adult',
            }
          : {
              label: 'Kids',
              value: 'kids',
            }
      obj.procedure_id = item.procedure_id._id
      obj.procedure_name = item.procedure_id.name
      obj.service_id = item.service_id ? item.service_id._id : null
      obj.service_name = item.service_id ? item.service_id.name : ''
      obj.attented_by_id = item.attended_by_id._id
      obj.doctor_id = item.doctor_id;
      obj.doctor_name = item.doctor_name;
      obj.selected_tooths = item.selected_tooths
        ? item.selected_tooths.map((t: any) => {
            let str1 =
              t.tooth_id._id +
              '-' +
              item.procedure_id._id +
              '-' +
              moment(item.createdAt).format('YYYY-MM-DD')
            taken.push(str1)
            let tooth = {
              original_images: t.original_images,
              treatment_images: t.treatment_images,
              display_tooth_number:
                item.age_group === 'adult'
                  ? t.tooth_number
                  : 40 + t.tooth_number,
              ...t.tooth_id,
            }
            return tooth
          })
        : []
      obj.last_treatment_done_at = new Date(item.createdAt);
      obj.show_delete_icon = item.billed === 'billed' ?false:true;
      return obj
    }):[]

    let temp1 = [...diagnosis_treatments];
    // MAPPING OF EXISTING DIAGNOSIS TREATMENTS
    let existingTreatmentPlanTableData: any = []
    existing_treatments.map((item: any) => {
      //filter((treatmentItem:any)=>treatmentItem.diagnosis_id !== dentalDiagDetails._id)
      item.treatments.map((treatment: any) => {
        let obj: any = {
          _id: uuid(),
          treatmentPlanName: '-',
          price: '0',
          discount: 0,
          netPrice: '0',
          sessionId: '-',
          status: 'new',
          billable: false,
          billed: 'not-billed',
          age_group:
            treatment.age_group === 'adult'
              ? {
                  label: 'Adult',
                  value: 'adult',
                }
              : {
                  label: 'Kids',
                  value: 'kids',
                }
        }
        obj.type = 'EXISTING'
        obj.procedure_id = treatment.procedure_id
          ? treatment.procedure_id._id
          : ''
        obj.procedure_name = treatment.procedure_id
          ? treatment.procedure_id.name
          : null
        obj.procedure_subtype = treatment.procedure_subtype
        obj.service_id = treatment.service_id ? treatment.service_id._id : null
        obj.service_name = treatment.service_id ? treatment.service_id.name : ''
        obj.attented_by_id = treatment.doctor_id
          ? treatment.doctor_id.user
          : null
        obj.doctor_id = treatment.doctor_id._id;
        obj.doctor_name = treatment.doctor_id.doctor_name;
    
        obj.selected_tooths = [
          {
            ...item.tooth_id,
            display_tooth_number: item.display_tooth_number,
            treatment_images: treatment.treatment_images,
          }
        ]
        obj.note = treatment.note
        obj.complaint = treatment.complaint
        obj.last_treatment_done_at = item.last_treatment_done_at
          ? new Date(item.last_treatment_done_at)
          : new Date()
        let str =
          item.tooth_id._id +
          '-' +
          treatment.procedure_id._id +
          '-' +
          moment(item.last_treatment_done_at).format('YYYY-MM-DD');
        let findIndex = taken.findIndex((itm: any) => itm === str)
        if(findIndex === -1){
          existingTreatmentPlanTableData.push(obj)
        }
        obj.show_delete_icon =  treatment.diagnosis_id === dentalDiagDetails._id ?true:false;
        return obj
      });
    });
    //console.log('newSiagnosisTreatmentPlanTableData==',temp1);
    //console.log('existingTreatmentPlanTableData==',existingTreatmentPlanTableData);
    const newTreatmentPlanTableData = temp1.concat(existingTreatmentPlanTableData);
    //console.log('TreatmentPlanTableData==',newTreatmentPlanTableData);
    dispatch(updateTreatmentPlansFromtable(newTreatmentPlanTableData))
    setTableData(newTreatmentPlanTableData)
  }

  useEffect(() => {
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
    if (payload.diagnosis_id) {
      dispatch(getDentalDiagnosisByIdAction(requestGenerator(payload))).then(
        (e: any) => {
          if (e.type === `${GET_DENTAL_DIAGNOSIS}/fulfilled`) {
            mapData(e.payload)
          }
        }
      )
    }
  }, [dispatch, createdDiagnosisId])

  const checkDiscountMoreThanPrice = (arr: any[]) => {
    const isDiscountGrater = arr.some((item) => {
      return item.discount > item.price
    })
    console.log('discount check', isDiscountGrater)
    return isDiscountGrater
  }

  const handleSaveTreatmentPlan = () => {
    const separateArrayById = (arr: any[]) => {
      return partition(arr, '_id')
    }
    const [arrayWithId, arrayWithoutId] = separateArrayById(
      treatmentPlanTableData
    )
    let payload: any = {}
    payload = {
      diagnosis_id:
        createdDiagnosisId?.length > 0
          ? createdDiagnosisId
          : patientFormData?.diag_id
          ? patientFormData?.diag_id
          : '',
      newTreatments: arrayWithoutId,
      diagnosis_treatments: treatmentPlanTableData,
    }
    const isEmpty = treatmentPlanTableData.some(
      ({ doctor_id }: any) => doctor_id === ''
    )
    const isDiscountHigher = checkDiscountMoreThanPrice(treatmentPlanTableData)
    if (isEmpty) {
      dispatch(
        setMessage({
          message: 'Please select dentist name for all sessions',
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
        dispatch(updateDentalDiagnosisAction(requestGenerator(payload))).then(
          (e) => {
            if (e.type === 'dentalDiagnosis/updateDentalDiagnosis/fulfilled') {
              dispatch(
                getDentalDiagnosisByIdAction(requestGenerator(payload))
              ).then((e: any) => {
                if (e.type === `${GET_DENTAL_DIAGNOSIS}/fulfilled`) {
                  navigate('/patientdentaldiagnosis/medication')
                }
              })
            }
          }
        )
    }
  }

  // notes state and functions
  const [showAddNote, setShowAddNote] = useState<boolean>(false)
  const [showAddComplaint, setShowAddComplaint] = useState<boolean>(false)
  const handleNotes = (data: any) => {
    let tempArr: any = []
    tempArr = treatmentPlanTableData.map((item: any, index: number) => {
      try {
        if (item?._id === notesDetails?._id){
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

  const handleComplaint = (data: any) => {
    let tempArr: any = []
    tempArr = treatmentPlanTableData.map((item: any, index: number) => {
      try {
        if (item?._id === notesDetails?._id) {
          return {
            ...item,
            complaint: data.complaint ?? '',
          }
        } else {
          return item
        }
      } catch (error: any) {
        console.log('error', error)
      }
    })
    dispatch(updateTreatmentPlansFromtable(tempArr))
    setShowAddComplaint(false)
  }

  /* Common dialog dependencies to Open Dialog */
  const handleDialogOpen = (tempObj: any) => {
    if (tempObj && tempObj.notes) {
      setShowAddNote(tempObj.notes.isNotesIcon)
      setNotesDetails(tempObj.notes.item)
    } else if (tempObj && tempObj.complaint) {
      setShowAddComplaint(tempObj.complaint.isComplaintIcon)
      setComplaintDetails(tempObj.complaint.item)
    } else if (tempObj && tempObj.deleteAction) {
      setShowDeletePopUpAlert(tempObj.deleteAction.isDeleteDialogOpen)
      setSelectedTreatmentPlanId(tempObj.deleteAction._id)
    } else if (
      tempObj &&
      tempObj.selectToothAction &&
      tempObj.selectToothAction.data
    ) {
      setToothModal(tempObj.selectToothAction.isToothSelectionDialogOpen)
      let data_to_send = JSON.parse(
        JSON.stringify(tempObj.selectToothAction.data)
      )
      data_to_send.diagnosis_id=diagnosisDetails._id;
      data_to_send.mode = 'EDIT'
      data_to_send.ageGroup = data_to_send.age_group
      setToothModalData(data_to_send)
    }
  }
 

  /* Common dialog dependencies to Open Dialog */
  const ToothDivComponent: any = (props: any) => {
    let tooth_find_array: any[] = []
    let diagnosis_id= createdDiagnosisId?.length > 0
    ? createdDiagnosisId
    : patientFormData?.diag_id !== null
    ? patientFormData?.diag_id
    : '';

    // MAPPING OF TREATMENT PLAN DATA
    if (props.mode === 'ALL' || props.mode === 'TREATMENT') {
      treatmentPlanTableData
        .slice()
        .filter((item: any) => item.type === 'TREATMENT')
        .map((th: any) => {
          let t = JSON.parse(JSON.stringify(th))
          let find: any = t.selected_tooths.find(
            (tooth: any) => tooth._id === props.tooth._id.toString()
          )
          if (find) {
            find.procedures = [t.procedure]
            find.procedure_subtypes = [t.procedure_subtype]
            let index_found = tooth_find_array.findIndex(
              (th: any) => th._id.toString() === find._id.toString()
            )
            if (index_found === -1) {
              tooth_find_array.push(find)
            } else {
              tooth_find_array[index_found]['treatment_images'] =
                tooth_find_array[index_found]['treatment_images'].concat(
                  find.treatment_images
                )
              tooth_find_array[index_found]['procedures'] = tooth_find_array[
                index_found
              ]['procedures'].concat(find.procedure)
              tooth_find_array[index_found]['procedure_subtypes'] =
                tooth_find_array[index_found]['procedure_subtypes'].concat(
                  find.procedure_subtype
                )
            }
          }
          return t
        })
    }

    if (props.mode === 'ALL' || props.mode === 'EXISTING') {
      treatmentPlanTableData
        .slice()
        .filter((item: any) => item.type === 'EXISTING')
        .map((th: any) => {
          let t = JSON.parse(JSON.stringify(th))
          let find: any = t.selected_tooths.find(
            (tooth: any) => tooth._id === props.tooth._id.toString()
          )
          if (find) {
            find.procedures = [t.procedure]
            find.procedure_subtypes = [t.procedure_subtype]
            let index_found = tooth_find_array.findIndex(
              (th: any) => th._id.toString() === find._id.toString()
            )
            if (index_found === -1) {
              tooth_find_array.push(find)
            } else {
              tooth_find_array[index_found]['treatment_images'] =
                tooth_find_array[index_found]['treatment_images'].concat(
                  find.treatment_images
                )
              tooth_find_array[index_found]['procedures'] = tooth_find_array[
                index_found
              ]['procedures'].concat(find.procedure)
              tooth_find_array[index_found]['procedure_subtypes'] =
                tooth_find_array[index_found]['procedure_subtypes'].concat(
                  find.procedure_subtype
                )
            }
          }
          return t
        })
    }

    let tooth_find = tooth_find_array.find(
      (th: any) => th._id.toString() === props.tooth._id.toString()
    )
    const no_images_services= ["XRay","Exam","Composite","BU/P&C","Other"];
    if (tooth_find) {
      let upper_image: string = ''
      let lower_image: string = ''
      let default_upper_image: string = props.tooth.display_tooth_number>50?base_image_url + props.tooth.tooth_number + 'A.png':base_image_url + props.tooth.tooth_number + 'a.png';
      let default_lower_image: string = props.tooth.display_tooth_number>50?base_image_url + props.tooth.tooth_number + 'B.png':base_image_url + props.tooth.tooth_number + 'b.png';

      if (tooth_find.treatment_images.length > 0){
         upper_image = tooth_find.treatment_images[tooth_find.treatment_images.length-1].upper;
         lower_image = tooth_find.treatment_images[tooth_find.treatment_images.length-1].lower;
      } 
      return (
        <div
          className={`${styles.toothDiv}`}
          onClick={(e) => {
              setToothModal(true)
              setToothModalData({
                diagnosis_id:diagnosisDetails._id,
                mode: 'CREATE',
                type: chartMode,
                ageGroup: ageGroup,
              })
          }}
        >

          <div style={{ height:'60px',width:'40px'}}>
            {
              upper_image ? <img
              src={upper_image}
              height="60px"
              width="40px"
              alt="Tooth"
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; 
                currentTarget.src= default_upper_image;
              }}
              style={{ marginBottom: '5px' }}
            />:''
            }
          </div>
          
          <div style={{ height:'60px',width:'40px'}}>
            {
              lower_image ?  <img
              src={lower_image}
              height="60px"
              width="40px"
              alt="Tooth"
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; 
                currentTarget.src=default_lower_image;
              }}
              style={{ marginBottom: '5px' }}
            />:''
            }
          </div>
          

          <p style={{ marginTop: '8px' }}>{props.tooth.display_tooth_number}</p>
        </div>
      )
    } else {
      return (
        <div
          className={`${styles.toothDiv}`}
          onClick={(e) => {
            if(diagnosis_id){
                setToothModal(true)
                setToothModalData({
                  diagnosis_id:diagnosisDetails._id,
                  mode: 'CREATE',
                  type: chartMode,
                  ageGroup: ageGroup,
                  selected_tooths: [props.tooth],
                })
              }else{
                // toast messge 
                dispatch(
                  setMessage({ message: 'Please do diagnosis first', type: failure })
                )
              }
          }}
        >
          <img
            src={base_image_url + props.tooth.tooth_number + 'a.png'}
            height="60px"
            width="40px"
            alt="Tooth"
            style={{ marginBottom: '5px' }}
          />
          <img
            src={base_image_url + props.tooth.tooth_number + 'b.png'}
            height="60px"
            width="40px"
            alt="Tooth"
          />
          <p style={{ marginTop: '8px' }}>{props.tooth.display_tooth_number}</p>
        </div>
      )
    }
  }

  const showDentalChart: any = (mode: string) => {
    return (
      <div style={{ marginTop: '12px' }}>
        <div className={styles.toothRaw}>
          {uppertooths.map((tooth: any, index: number) => (
            <ToothDivComponent
              tooth={tooth}
              mode={mode}
              key={'upper_' + index}
            />
          ))}
        </div>
        <div className={styles.toothRaw}>
          {lowertooths.map((tooth: any, index: number) => (
            <ToothDivComponent
              tooth={tooth}
              mode={mode}
              key={'lower_' + index}
            />
          ))}
        </div>
      </div>
    )
  }

  const handleChartModeChange = (mode: string) => {
    setChartMode(mode)
    if (mode === 'ALL') {
      setTableData([])
      let temp: any = treatmentPlanTableData.filter((itm: any) => {
        return itm.type === 'TREATMENT' || itm.type === 'EXISTING'
      })
      setTableData(temp)
    } else {
      setTableData([])
      let temp: any = treatmentPlanTableData.filter((itm: any) => {
        return itm.type === mode
      })
      setTableData(temp)
    }
  }

  const chartModeRadio: any = () => (
    <div className={styles.labelFieldContainer}>
      <label className={styles.labelText}>Entry Status :</label>
      <div className={styles.fieldErrorContainer}>
        <label htmlFor="mode_existing" className={styles.radioLabel}>
          <input
            className={styles.radioInput}
            type="radio"
            id="mode_existing"
            value="EXISTING"
            checked={chartMode === 'EXISTING'}
            onChange={() => {
              handleChartModeChange('EXISTING')
            }}
          />
          <span className={styles.customRadio} />
          Existing
        </label>

        <label htmlFor="mode_treatment" className={styles.radioLabel}>
          <input
            className={styles.radioInput}
            type="radio"
            id="mode_treatment"
            value="TREATMENT"
            checked={chartMode === 'TREATMENT'}
            onChange={() => {
              handleChartModeChange('TREATMENT')
            }}
          />
          <span className={styles.customRadio} />
          Treatment Plan
        </label>

        <label htmlFor="mode_showall" className={styles.radioLabel}>
          <input
            className={styles.radioInput}
            type="radio"
            id="mode_showall"
            value="ALL"
            checked={chartMode === 'ALL'}
            onChange={() => {
              handleChartModeChange('ALL')
            }}
          />
          <span className={styles.customRadio} />
          Show all
        </label>
      </div>
    </div>
  )

  const ageGroupOptions: any[] = [
    { label: 'Adult', value: 'adult' },
    { label: 'Kids', value: 'kids' },
  ]

  const Select_AgeGroup: any = () => {
    return (
      <div className={styles.labelFieldContainer}>
        <label className={styles.labelText}>Age Group</label>
        <div className={styles.fieldErrorContainer}>
          <Select
            className={styles.select}
            placeholder="AgeGroup"
            closeMenuOnSelect={true}
            value={ageGroup}
            options={ageGroupOptions}
            onChange={(e: any) => {
              setAgeGroup(e)
            }}
            maxMenuHeight={200}
          />
        </div>
      </div>
    )
  }

  return (
    <>
      {isLoading && <Loader />}
      {toothModal && (
        <Popup
          Children={ToothModal}
          popData={toothModalData}
          handleClose={() => {
            setToothModal(false)
            handleChartModeChange('ALL')
          }}
          setModelOpenClose={() => {
            setToothModal(false)
            handleChartModeChange('ALL')
          }}
        />
      )}

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

      {showAddComplaint && (
        <Popup
          Children={AddComplaint}
          handleClose={() => {
            setShowAddComplaint(false)
            setComplaintDetails('')
          }}
          handleYes={handleComplaint}
          popData={complaintDetails}
        />
      )}

      <main className={styles.mainContainer}>
        {/* Header container */}
        {/* <div className={styles.headerContainer}>
          <button
            className={styles.addNewButtonStyle}
            onClick={() =>
              handleTreatmentPlanDialogOpen(null, 'newTreatmentPlan')
            }>
            New Treatment Plan
          </button>
          <button
            className={styles.addNewButtonStyle}
            onClick={() =>
              handleTreatmentPlanDialogOpen(null, 'preDefinedPlan')
            }>
            Predefined Plans
          </button>
        </div> */}
        {/* Header container */}

        <div className={styles.toothSelection}>
          <p className={styles.title}>Dental Chart</p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid grey',
              paddingTop: '8px',
              paddingBottom: '8px',
            }}
          >
            {chartModeRadio()}
            {Select_AgeGroup()}
          </div>
          {showDentalChart(chartMode)}
        </div>

        {/* Table container */}
        <div className={styles.tableContainer}>
          <TableV2
            tableHeaderData={dentalTreatmentPlansMainTableHeaderData}
            tableRowData={tableData}
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
            handleClick={() => handleSaveTreatmentPlan()}
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
      {/*showTreatmentPlanDialog && (
        <TreatmentPlanDialog
          forPreDefinedPlanFlag={dialogType === 'preDefinedPlan' ? true : false}
          selectedTreatmentPlanId={selectedTreatmentPlanId}
          handleClose={handleTreatmentPlanDialogClose}
          setNotPopup={setNotePopup}
        />
      )*/}

      {notePopup.open && (
        <Popup
          Children={DescriptionModal}
          handleClose={() => setNotePopup({ open: false, note: {} })}
          heading={'Notes'}
          popData={notePopup.note}
        />
      )}

      {complaintPopup.open && (
        <Popup
          Children={DescriptionModal}
          handleClose={() => setComplaintPopup({ open: false, complaint: {} })}
          heading={'Complaint'}
          popData={complaintPopup.complaint}
        />
      )}

      {isCalculatorDialogOpen === true && (
        <Calculator handleClose={handleCalculatorDialogClose} />
      )}

      {/* Dependency for delete popup alert - Treatment Plan */}
      {
        <DeletePopUpAlert
          open={showDeletePopUpAlert}
          defaultDispatchUse={false}
          handleClose={handleDeletePopUpAlertClose}
          selectedId={selectedTreatmentPlanId}
          dispatchFunction={handleDeleteEntry}
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

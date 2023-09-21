import React, { useEffect, useState } from 'react'
import styles from './patientEmrDashboard.module.scss'
import SearchDesign from '../../../components/common/search-design/SearchDesign'
import Popup from '../../../components/common/popup/Popup'
import AssignTagModal from '../../../components/common/modal/assign-tag-modal/AssignTagModal'
import {
  DeleteIcon,
  DropDownArrowIcon,
  DropDownIcon,
  LabelIcon,
  RewokeIcon,
} from '../../../components/common/svg-components'
import {
  calculateAge,
  dataURI,
  isDataUri,
  trimValue,
  utcToDate,
} from '../../../utils/utils'
import SelectImage from '../../../assets/images/Default Image.png'
import NoSelectImage from '../../../assets/images/Delete Image.png'
import Button from '../../../components/common/button/Button'
import Divider from '../../../components/common/divider/Divider'
import SearchModal from '../../../components/common/modal/search-modal/SearchModal'
import MedicalHistory from './medical-history/MedicalHistory'
import ViewHistoryPopup from '../../../components/common/modal/view-history-popup/ViewHistoryPopup'
import RecentHistoryPopup from '../../../components/common/modal/recent-history-popup/RecentHistoryPopup'
import Timeline from './timeline/Timeline'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { requestGenerator } from '../../../utils/payloadGenerator'
import { getAllTag } from '../../../redux/features/patient-emr/tag/tagAsyncActions'
import Loader from '../../../components/common/spinner/Loader'
import { addPatientValidators } from '../../../form-validators/addPatientValidators'
import {
  PATIENT_ADDRESS,
  PATIENT_ADDRESS_PINCODE,
  PATIENT_ADDTIONAL_FIELDS,
  PATIENT_AGE,
  PATIENT_ALLERGIES,
  PATIENT_AREA,
  PATIENT_BLOODGROUP,
  PATIENT_BRANCH_NAME,
  PATIENT_DOB,
  PATIENT_EMAIL,
  PATIENT_FILE_NO,
  PATIENT_FINANCIAL_REMARK,
  PATIENT_GENDER,
  PATIENT_MARITAL_STATUS,
  PATIENT_MEDICAL_REMARK,
  PATIENT_MOBILE_NO_1,
  PATIENT_MOBILE_NO_2,
  PATIENT_NAME,
  PATIENT_NATIONALITY,
  PATIENT_NATIONAL_ID,
  PATIENT_NATIONAL_ID_TYPE,
  PATIENT_OPENED_BY,
  PATIENT_OPENED_ON,
  PATIENT_PROFILE_PIC,
  PATIENT_RELATIVE_MOBILE,
  PATIENT_RELATIVE_NAME,
  PATIENT_RELATIVE_RELATION,
  PATIENT_SOURCE,
} from '../../../constants/constant'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IPatientEmr } from '../../../interfaces/interfaces'
import {
  createAddtionalFields,
  createPatientEmr,
  deletePatientEmr,
  getAllAssignTag,
  getPatientAddtionalFields,
  getPatientEmrById,
  getPatientSelectionList,
} from '../../../redux/features/patient-emr/patient/patientAsyncAction'
import { formActionData, success } from '../../../constants/data'
import { setMessage } from '../../../redux/features/toast/toastSlice'
import { clearPatientData } from '../../../redux/features/patient-emr/patient/patientSlice'
import { updatePatientEmr } from '../../../redux/features/patient-emr/patient/patientAsyncAction'
import AttachSingleFileV2 from '../../../components/common/attach-files/single-file-V2/AttachSingleFileV2'
import AttachSingleFileV3 from '../../../components/common/attach-files/single-file-V3/AttachSingleFileV3'
import PhoneInput from 'react-phone-input-2'
import ImageUploadPopup from '../../../components/common/modal/image-upload-popup/ImageUploadPopup'
import DocumentUploadPopup from '../../../components/common/modal/document-upload-popup/DocumentUploadPopup'
import ScribeNotesPopup from '../../../components/common/modal/scribe-notes-popup/ScribeNotesPopup'
import ScribeImagesPopup from '../../../components/common/modal/scribe-images-popup/ScribeImagesPopup'
import ImageViewerModal from '../../../components/common/modal/image-viewer-modal/ImageViewerModal'
import ImageZoomInOutModal from '../../../components/common/modal/image-zoom-in-out-modal/ImageZoomInOutModal'
import PatientHistoryModal from '../../doctor-diagnosis/patient_history_modal/PatientHistoryModal'
import ViewDocumentsModal from '../../../components/common/modal/view-documents-modal/ViewDocumentsModal'
import TagsListModal from '../../../components/common/modal/tags_list_modal/TagsListModal'
import MedicationModal from '../../../components/common/modal/medication-modal/MedicationModal'
import PatientHistoryNotesModal from '../../../components/common/modal/patient-history-notes-modal/PatientHistoryNotesModal'
import { attachmentsModalHeaderData } from '../../../constants/table-data/attachmentsModalTableData'
import { medicationModalHeaderData } from '../../../constants/table-data/medicationModalTableData'
import { imagesModalHeaderData } from '../../../constants/table-data/imagesModalTableData'
import scribe_notes_img from '../../../assets/images/scrib_notes_img.png'
import {
  getCompareDocumentsById,
  getPatientAttachmentsById,
  getPatientDiagnosisDetailById,
  getPatientImagesById,
} from '../../../redux/features/patient-history/patientHistoryAsyncActions'
import DiagnosisModal from '../../../components/common/modal/diagnosis_modal/DiagnosisModal'
import {
  clearPatientAttachmentsData,
  clearPatientCompareImagesData,
  clearPatientDiagnosisDetailData,
  clearPatientHistoryData,
} from '../../../redux/features/patient-history/patientHistorySlice'
import DocumentsViewerModal from '../../../components/common/modal/documents-viewer-modal/DocumentsViewerModal'
import ViewAllAttachmentsModal from '../../../components/common/modal/viewAll-attachments-modal/ViewAllAttachmentsModal'
import { viewAllAttachmentsModalHeaderData } from '../../../constants/table-data/viewAllAttachmentsTableData'
import CompareDocModal from '../../../components/common/modal/compare-modal/compare-docs/CompareDocs'
import { viewAllDocumentsList } from '../../doctor-diagnosis/patient_information_form/patientInformationDummyData'
import ViewAllImagesModal from '../../../components/common/modal/viewAll-images-modal/ViewAllImagesModal'
import { viewAllImagesHeaderData } from '../../../constants/table-data/viewAllImagesTableData'
import CompareModal from '../../../components/common/modal/compare-modal/CompareModal'
import { clearPatientHistory } from '../../../redux/features/diagnosis/diagnosisSlice'
import TimelineAppointmentPopup from '../../../components/common/modal/timeline-appointment-popup/TimelineAppointmentPopup'
import InputTextfield from '../../../components/common/input-textfield/InputTextfield'
import ConfirmationPopup from '../../../components/common/modal/generic-confirmationPopup/ConfirmationPopup'
import { CustomModal } from '../../../components/common/custom-modal/modal'
import sucessImage from '../../../assets/images/sucessimage.png'

interface IPatientEmrProps {}
interface FileList {
  name: string
  data_uri: any
}
const PatientEmrDashboard: React.FunctionComponent<IPatientEmrProps> = () => {
  const dispatch = useAppDispatch()
  const userRole = useAppSelector((state) => state.login?.userData?.role)
  // console.log("userRole?>>>", userRole);
  // userRole === "MC_ADMIN"
  // userRole === "RECEPTIONIST"

  const [readOnly, setReadOnly] = useState(
    userRole === 'DOCTOR' || userRole === 'MC_ADMIN'
  )
  const userLoginName = useAppSelector((state) => state.login?.userData?.name)
  const {
    nationalityData,
    patientDataObjectById,
    isLoading,
    assignTagInfoData,
    addtionalFieldData,
  } = useAppSelector((state) => state.patient)
  const { branchData } = useAppSelector((state) => state.login)

  const [idValidationError, setIdValidationError] = useState('')
  const [showAssignTagModal, setShowAssignTagModal] = useState<boolean>(false)
  const [assignTagData, setAssignTagData] = useState({})
  const [showSearchModal, setShowSearchModal] = useState<boolean>(false)
  const [searchModalData, setSearchModalData] = useState({})
  const [showMoreFields, setShowMoreFields] = useState(false)
  const [viewHistory, setViewHistory] = useState<boolean>(false)
  const [recentHistory, setRecentHistory] = useState<boolean>(false)
  const { loadingTag, tagData } = useAppSelector((state) => state.tag)
  const [disable, setDisable] = useState<any>(true)
  const [idValue, setIdValue] = useState<any>('')
  const [showAnotherComponent, setShowAnotherComponent] = useState(false)
  const [showNoImage, setShowNoImage] = useState(false)
  const [showWebCamComponent, setShowWebCamComponent] = useState(false)
  const [age, setAge] = useState<any>('')
  const [prefixValue, setPrefixValue] = useState<any>('')
  const [suffixValue, setSuffixValue] = useState<any>('')
  const [imageFiles, setImageFiles] = useState(
    { name: '', data_uri: '' } || null
  )
  const [formActionValue, setFormActionValue] = useState(-1)
  const [selectedIDOption, setSelectedIDOption] = useState('')
  const [showOption, setShowOption] = useState(false)
  const [selectedOption, setSelectedOption] = useState('')
  const [branchName, setBranchName] = useState<any>('')
  const [selectedBranchNameId, setSelectedBranchNameId] = useState<any>('')
  const [imagePopup, setImagePopup] = useState(false)
  const [imgDiagnosisId, setImgDiagnosisId] = useState('')
  const [documentPopup, setDocumentPopup] = useState<boolean>(false)
  const [documentDiagnosisId, setDocumentDiagnosisId] = useState('')
  const [scribeNotes, setScribeNotes] = useState<boolean>(false)
  const [scribeNotesId, setScribeNotesId] = useState('')
  const [scribeImages, setScribeImages] = useState<boolean>(false)
  const [scribeImagesId, setScribeImagesId] = useState('')
  const [scribeNotesPreview, setScribeNotesPreview] = useState<boolean>(false)
  const [scribeNotesLink, setScribeNotesLink] = useState('')
  const [scribeImagesPreview, setScribeImagesPreview] = useState<boolean>(false)
  const [scribeImagesLink, setScribeImagesLink] = useState('')
  const [showPatientHistory, setShowPatientHistory] = useState<boolean>(false)
  const [showDiagnosisLink, setShowDiagnosisLink] = useState(false)
  const [diagnosisId, setDiagnosisId] = useState()
  // THIS ALL STATES ARE FOR THE PATIENT HOSTORY
  const [showSymptomsModal, setShowSymptomsModal] = useState<boolean>(false)
  const [symptomsPopupData, setSymptomsPopupData] = useState<any>({})
  const [showMedicationModal, setShowMedicationModal] = useState<boolean>(false)
  const [medicationPopupData, setMedicationPopupData] = useState<any>({})
  const [showPatientHistoryNotesModal, setShowPatientHistoryNotesModal] =
    useState<boolean>(false)
  const [showAttachmentsNotesModal, setShowAttachmentsNotesModal] =
    useState<boolean>(false)
  const [compareDocsModal, setCompareDocsModal] = useState<boolean>(false)

  const [attachmentnsNotesPopupData, setAttachmentnsNotesPopupData] =
    useState<any>({})
  const [
    viewAllSingleAttachmentPopupData,
    setViewAllSingleAttachmentPopupData,
  ] = useState<any>('')
  const [
    showViewAllSingleAttachmentModal,
    setShowViewAllSingleAttachmentModal,
  ] = useState<boolean>(false)
  const [showImagesNotesModal, setShowImagesNotesModal] =
    useState<boolean>(false)
  const [showPatientHistoryModal, setShowPatientHistoryModal] =
    useState<boolean>(false)
  const [patientHistoryNotesPopupData, setPatientHistoryNotes] = useState<any>(
    {}
  )
  const [showImageModal, setShowImageModal] = useState<boolean>(false)
  const [imagePopupData, setImagePopupData] = useState<string>('')
  const [showAttachmentsModal, setShowAttachmentsModal] =
    useState<boolean>(false)

  const [attachmentsPopupData, setAttachmentsPopupData] = useState<any>({})
  const [showImagesModal, setShowImagesModal] = useState<boolean>(false)
  const [imagesPopupData, setImagesPopupData] = useState<any>({})
  const [showSingleAttachmentModal, setShowSingleAttachmentModal] =
    useState<boolean>(false)
  const [singleAttachmentPopupData, setSingleAttachmentPopupData] =
    useState<string>('')
  const [showSingleImageModal, setShowSingleImageModal] =
    useState<boolean>(false)
  const [singleImagePopupData, setSingleImagePopupData] = useState<string>('')
  const [diagnosisPopupData, setDiagnosisPopupData] = useState<any>({})
  const [showDianosisModal, setShowDianosisModal] = useState<boolean>(false)
  const [diagnosisScribeNotesPopupData, setDiagnosisScribeNotesPopupData] =
    useState<any>('')
  const [showDianosisScribeImageModal, setShowDianosisScribeImageModal] =
    useState<boolean>(false)
  const [showDianosisScribeNotesModal, setShowDianosisScribeNotesModal] =
    useState<boolean>(false)
  const [diagnosisScribeImagePopupData, setDiagnosisScribeImagePopupData] =
    useState<any>('')
  const [showViewAllAttachementsModal, setShowViewAllAttachementsModal] =
    useState<boolean>(false)
  const [viewAllAttchmentnsPopupData, setViewAllAttchmentnsPopupData] =
    useState<any>({})
  const [imagesNotesPopupData, setImagesNotesPopupData] = useState<any>({})
  const [viewAllImagesPopupData, setViewAllImagesPopupData] = useState<any>({})
  useState<any>('')
  const [showViewAllImagesModal, setShowViewAllImagesModal] =
    useState<boolean>(false)
  const [compareImagesModal, setCompareImageModal] = useState<boolean>(false)
  const [viewAllSingleImagePopupData, setViewAllSingleImagePopupData] =
    useState<any>('')
  const [showViewAllSingleImageModal, setShowViewAllSingleImageModal] =
    useState<boolean>(false)
  const [singleCompareDocumentModal, setSingleCompareDocumentModal] =
    useState<boolean>(false)
  const [compareDocsModalPopupData, setCompareDocModalPopupData] =
    useState<any>('')
  const [singleCompareImageModal, setSingleCompareImageModal] =
    useState<boolean>(false)
  const [compareImageModalPopupData, setCompareImageModalPopupData] =
    useState<any>('')
  const { patientHistoryData } = useAppSelector((state) => state.diagnosis)
  const [showAppointmentPopup, setShowAppointmentPopup] = useState(false)
  const [appointmentYear, setAppointmentYear] = useState('')
  const [successModal, setSuccessModal] = useState(false)
  const [statusMsg, setStatusMsg] = useState(false)

  // add block states
  const [customTextField, setCustomTextField] = useState<any[]>([])
  console.log('customTextField>>', customTextField)
  const [additionalData, setAdditionalData] = useState<any>(
    branchData?.emrAdditionFields
  )
  let globalAdditionalFieldList: any = branchData?.emrAdditionFields

  // console.log("additionalData api data", additionalData);
  const [isNonEmptyLabelValue, setIsNonEmptyLabelValue] = useState<any>()
  const [isConfirmationPopup, setIsConfirmationPopup] = useState(false)
  const [labelNameDisable, setLabelNameDisable] = useState(true)
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [isEmptyLabel, setIsEmptyLabel] = useState(false)
  const [isDeleteCustomField, setIsDeleteCustomField] = useState(false)
  const [idDeleteValue, setIdDeleteValue] = useState<any>()
  let actievTags = [] as any
  const activeTag = tagData?.map((item: any) => {
    if (item.is_active === true && item?._id !== undefined) {
      actievTags.push(item)
    }
  })

  let activeTagsData = [] as any

  const activeTagData = assignTagInfoData?.map((item: any) => {
    if (item.assigned === true && item?._id !== undefined) {
      activeTagsData.push(item)
    }
  })

  const handleUserRoleChange = (newRole: any) => {
    setReadOnly(newRole === 'DOCTOR' || newRole === 'MC_ADMIN')
  }
  useEffect(() => {
    // Call handleUserRoleChange whenever userRole changes
    handleUserRoleChange(userRole)
  }, [userRole])

  useEffect(() => {
    if (patientDataObjectById?._id !== undefined) {
      let data = {
        patient_id: patientDataObjectById?._id,
        // patient_id: "643cd77436c4ce562a664756",
      }
      dispatch(getAllAssignTag(requestGenerator(data)))
    } else {
      let data = {
        page: 1,
        pageSize: 10,
        search: '',
        // is_active: true,
      }
      dispatch(getAllTag(requestGenerator(data)))
    }
  }, [patientDataObjectById?._id])

  // Nationality drop down
  useEffect(() => {
    let dataPayload = {
      category_name: [
        'NATIONALITY',
        'MARITAL_STATUS',
        'BLOOD_GROUP',
        'SOURCE_AD_CAMPAIGN',
      ],
      search: '',
    }
    dispatch(getPatientSelectionList(requestGenerator(dataPayload)))
  }, [dispatch])

  let patientNationalityData = [] as any
  let patientSourceData = [] as any
  let patientBloodGroupData = [] as any
  let patientMaritalStatusData = [] as any

  let nationalityNew = nationalityData?.map((item: any) => {
    if (item?.category_name === 'NATIONALITY') {
      patientNationalityData.push(item?.values)
    } else if (item?.category_name === 'SOURCE_AD_CAMPAIGN') {
      patientSourceData.push(item?.values)
    } else if (item?.category_name === 'BLOOD_GROUP') {
      patientBloodGroupData.push(item?.values)
    } else {
      patientMaritalStatusData.push(item?.values)
    }
  })

  // select ID dropdown
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

  // handleSearchPopup
  const handleSearchPopup = () => {
    // if (readOnly)
    if (userRole === 'DOCTOR') {
      setShowSearchModal(showSearchModal)
    } else {
      setShowSearchModal(!showSearchModal)
    }

    // setSearchModalData({});
  }
  // search modal close
  const handleSearchModalClose = () => {
    setShowSearchModal(!showSearchModal)
    setSearchModalData({})
  }

  // handleAssignPopup
  const handleAssignPopup = () => {
    if (patientDataObjectById?._id && readOnly) {
      setShowAssignTagModal(showAssignTagModal)
    } else if (patientDataObjectById?._id !== undefined && !readOnly) {
      setShowAssignTagModal(!showAssignTagModal)
      setAssignTagData({})
    } else {
      let toastData = {
        message: 'Please load patient data',
        type: success,
      }
      if (userRole === 'RECEPTIONIST') {
        dispatch(setMessage(toastData))
      }
    }
  }

  // assign tag modal close
  const handleModalClose = () => {
    setShowAssignTagModal(!showAssignTagModal)
    setAssignTagData({})
  }
  // handleMoreFields
  const handleMoreFields = () => {
    setShowMoreFields(!showMoreFields)
  }

  // view and recent history modal close
  const handleViewModalClose = () => {
    setViewHistory(false)
    setRecentHistory(false)
  }

  const handleImageMouseEnter = () => {
    setShowAnotherComponent(true)
  }
  const handleImageMouseLeave = () => {
    setShowAnotherComponent(false)
  }
  const handleDeleteImage = () => {
    setShowNoImage(true)
    setImageFiles({ name: '', data_uri: '' })
  }
  const handleNoImageMouseEnter = () => {
    setShowWebCamComponent(true)
  }
  const handleNoImageMouseLeave = () => {
    setShowWebCamComponent(false)
  }

  // VIEW HISTORY
  const handleViewHistory = () => {
    if (patientDataObjectById._id === undefined) {
      let toastData = {
        message: 'Please load patient data',
        type: success,
      }
      dispatch(setMessage(toastData))
    } else {
      setViewHistory(!viewHistory)
    }
  }

  // RECENT HISTORY
  const handleRecentHistory = () => {
    if (patientDataObjectById._id === undefined) {
      let toastData = {
        message: 'Please load patient data',
        type: success,
      }
      dispatch(setMessage(toastData))
    } else {
      setRecentHistory(!recentHistory)
    }
  }

  useEffect(() => {
    let patientAge = patientDataObjectById?.dob
    const formatData = patientAge ? utcToDate(patientAge, true) : ''
    let getSelectedDate = calculateAge(formatData)
    setAge(getSelectedDate)
  }, [dispatch, patientDataObjectById?.dob])

  // add block get-create-edit functionality for mc_admin

  // below useEffect is used to all the get-api for Additional field
  useEffect(() => {
    dispatch(getPatientAddtionalFields(requestGenerator({})))
  }, [])

  // below useEffect is used to set the updated data into the customTextField state
  useEffect(() => {
    setCustomTextField(addtionalFieldData)
  }, [addtionalFieldData])
  const [addBlockId, setAddBlockId] = useState(1)
  // below function is used to add the block when the Add button is clicked
  const handleAddCustomField = () => {
    const newFields = [...customTextField, { id: addBlockId, label_name: '' }]
    setCustomTextField(newFields)
    setIsEditing(true)
    setIsEmptyLabel(true)
    setIsSubmitDisabled(true)
    setAddBlockId(addBlockId + 1)
  }

  let customTextFieldData: any = customTextField?.filter(
    (item) => !item?._id && !item?.label_slug
  )
  // below function is used to update the value for the input label field
  const handleTextFieldChange = (index: number, value: string) => {
    const newFields = customTextField?.map(
      (item: any, currentIndex: number) => {
        if (currentIndex === index) {
          return { ...item, label_name: value }
        } else {
          return item
        }
      }
    )
    console.log('newFields handleLabel', newFields)
    setCustomTextField(newFields)
    // check label input field value is empty
    const hasEmptyLabel = newFields?.some((item) => !item.label_name)
    setIsEmptyLabel(hasEmptyLabel)
    // // Activate or deactivate the submit button
    setIsSubmitDisabled(!isEditing || hasEmptyLabel)
  }

  // below function is used to delete the added the block when the delete icon is clicked
  const handleDeleteCustomField = () => {
    const idToDelete = idDeleteValue
    const indexToDelete: any = customTextField?.findIndex(
      (item: any) => item?.id === idToDelete
    )
    if (indexToDelete !== -1) {
      // Create a copy of the array and remove the block at the specified index
      const newFields = [...customTextField]
      newFields?.splice(indexToDelete, 1)
      setCustomTextField(newFields)
      setIsEmptyLabel(false)
      setIsDeleteCustomField(false)
      setAddBlockId(addBlockId - 1)
    }
  }

  // below function is used to open the confirmation popup
  const handleDeleteCustomFieldPopup = () => {
    setIsDeleteCustomField(!isDeleteCustomField)
  }

  let additionalBlockKey = [] as any

  // below function is to submit the added block field
  const handleAddBlockFieldSubmit = () => {
    // additionalBlockKey = customTextField?.filter(
    //   (item) => !item?._id && !item?.label_slug
    // );
    // const updatedAdditionalData = additionalBlockKey?.map((item: any) => {
    //   return {
    //     label_name: item?.label_name,
    //   };
    // });
    additionalBlockKey = customTextField?.map((item) => item)
    // const updatedAdditionalData: any = customTextField?.map(
    //   (label_name: any) => label_name
    // );
    // console.log("additionalBlockKey>>>???", additionalBlockKey);
    // console.log("updatedAdditionalData???", updatedAdditionalData);
    // let requestPayload = {
    //   additional_details: updatedAdditionalData,
    // };
    let requestPayload = {
      additional_details: additionalBlockKey,
    }
    dispatch(createAddtionalFields(requestGenerator(requestPayload))).then(
      (e) => {
        if (e.type === 'patient/createAddtionalFields/fulfilled') {
          // setCustomTextField(updatedAdditionalData);
          setCustomTextField(additionalBlockKey)
          setIsConfirmationPopup(false)
          setIsSubmitDisabled(true)
          setLabelNameDisable(true)
          setIsEditing(false)
          dispatch(getPatientAddtionalFields(requestGenerator({})))
        }
      }
    )
  }
  // below function is used to open the confirmation popup to submit the added block
  const handleConfirmationPopup = () => {
    setIsConfirmationPopup(!isConfirmationPopup)
  }
  // below function is used to handleEdit button
  const handleEditLabel = () => {
    if (labelNameDisable) {
      setLabelNameDisable(!labelNameDisable)
      setIsEditing(true)
      setIsSubmitDisabled(false)
    } else {
      setLabelNameDisable(!labelNameDisable)
      setIsEditing(false)
      setIsSubmitDisabled(true)
    }
  }

  // add block get-create-edit functionality for receptionist

  // below useEffect will be call whenever the patientId is fetch
  useEffect(() => {
    // reset({ [PATIENT_ADDTIONAL_FIELDS]: {} });
    if (patientDataObjectById?._id) {
      const updatedAdditionalData = additionalData?.map((item: any) => {
        const itemKey = item?.label_slug
        const additionalValue =
          patientDataObjectById?.additional_details?.[itemKey] ?? ''
        return {
          ...item,
          value: additionalValue,
        }
      })
      setAdditionalData(updatedAdditionalData)
    }
  }, [patientDataObjectById?._id, patientDataObjectById?.additional_details])

  // below function is used to write the value for the specific index label field
  const handleInputChange = (index: number, newValue: string) => {
    const updataAdditionalInputData = additionalData?.map(
      (item: any, currentIndex: any) => {
        if (currentIndex === index) {
          return { ...item, value: newValue }
        } else {
          return item
        }
      }
    )
    setAdditionalData(updataAdditionalInputData)
  }

  // dataInfo[] takes out the label_slug key-value pair property from additionalData[]
  let dataInfo = additionalData?.map((item: any) => {
    return { [item?.label_slug]: item?.value }
  })
  // filterAdditionalData[] filter out the who holds value for label_slug property
  let filterAdditionalData = dataInfo?.filter((item: any) => {
    if (Object.values(item)[0] !== undefined && Object.values(item)[0] !== '') {
      return item
    }
  })
  // filterAdditionalDataObject{} covert the filterAdditionalData[] into object
  let filterAdditionalDataObject = {} as any
  filterAdditionalData?.map((item: any) => {
    const key = Object.keys(item)[0]
    const value = item[key]
    filterAdditionalDataObject[key] = value
  })

  // FORM
  const {
    register,
    reset,
    handleSubmit,
    setValue,
    getValues,
    trigger,
    watch,
    formState: { errors },
  } = useForm<IPatientEmr>({})

  const onSubmit: SubmitHandler<IPatientEmr> = (data) => {
    data.opened_on = new Date().toISOString().substr(0, 10)
    data.patient_pic = imageFiles?.data_uri?.length ? imageFiles : undefined
    data.patient_default_branch_id = selectedBranchNameId
    data.additional_details = filterAdditionalDataObject

    if (patientDataObjectById?._id) {
      let dataPayload = {
        id: patientDataObjectById?._id,
        data: {
          ...data,
        },
      }
      dispatch(updatePatientEmr(requestGenerator(dataPayload))).then((e) => {
        if (e.type === 'patient/updatePatientEmr/fulfilled') {
          setStatusMsg(false)
          setSuccessModal(true)
        }
      })
    } else {
      dispatch(createPatientEmr(requestGenerator(data))).then((e) => {
        if (e.type === 'patient/createPatientEmr/fulfilled') {
          let dataPayload = {
            id: e?.payload[0]?._id,
          }
          dispatch(getPatientEmrById(requestGenerator(dataPayload)))
          setStatusMsg(true)
          setSuccessModal(true)
          setSuccessModal(true)
        }
      })
    }
  }

  // set the data on form
  useEffect(() => {
    if (patientDataObjectById) {
      reset(patientDataObjectById)
    }
  }, [reset, patientDataObjectById])

  useEffect(() => {
    if (patientDataObjectById?.patient_pic) {
      setImageFiles({
        name: 'abc.jpg',
        data_uri: patientDataObjectById?.patient_pic,
      })
    } else {
      setImageFiles({ name: '', data_uri: '' })
    }
  }, [patientDataObjectById?.patient_pic])

  useEffect(() => {
    if (patientDataObjectById) {
      const formatData = utcToDate(patientDataObjectById[PATIENT_DOB], true)
      setValue(PATIENT_DOB, formatData)
    }
  }, [patientDataObjectById, utcToDate])

  useEffect(() => {
    if (patientDataObjectById) {
      const formatData = utcToDate(
        patientDataObjectById[PATIENT_OPENED_ON],
        true
      )
      setValue(PATIENT_OPENED_ON, formatData)
    }
  }, [patientDataObjectById[PATIENT_OPENED_ON], utcToDate])

  useEffect(() => {
    if (patientDataObjectById?.national_id) {
      setIdValue(patientDataObjectById?.national_id)
    }
  }, [patientDataObjectById?.national_id])

  // useEffect(() => {
  //   if (patientDataObjectById?.patient_default_branch_id) {
  //     setSelectedOption(patientDataObjectById?.patient_default_branch_id)
  //     const selectedBranchId = branchData?.branches?.filter(
  //       (item: any) =>
  //         item?._id === patientDataObjectById?.patient_default_branch_id
  //     )
  //     setBranchName(selectedBranchId[0]?.name)
  //   }
  // }, [patientDataObjectById?.patient_default_branch_id])

  useEffect(() => {
    if (patientDataObjectById?.patient_default_branch_id) {
      if (
        branchData?.branches?.some(
          (item: any) =>
            item?.name === patientDataObjectById?.patient_default_branch?.name
        )
      ) {
        setSelectedOption(patientDataObjectById?.patient_default_branch_id)
      } else {
        setSelectedOption('')
      }
      // const selectedBranchId = branchData?.branches?.filter(
      //   (item: any) =>
      //     item?._id === patientDataObjectById?.patient_default_branch_id
      // );
      // setBranchName(selectedBranchId[0]?.name);
      setBranchName(patientDataObjectById?.patient_default_branch?.name)
    }
  }, [patientDataObjectById?.patient_default_branch_id])

  // dob
  const handleChange = (e: any) => {
    let currentDate = new Date()
    let selected = new Date(e.target.value)
    if (selected <= currentDate) {
      let selectedDate1 = calculateAge(e.target.value)
      setAge(selectedDate1)
    } else {
      setAge('')
    }
  }

  const selectImageFile = watch(PATIENT_PROFILE_PIC)
  const fileName = isDataUri(selectImageFile) ? '' : selectImageFile?.[0]
  // convert file object to data_uri
  useEffect(() => {
    const fileList: FileList = { name: '', data_uri: '' }
    const getDataURI = async (fileName: File) => {
      try {
        const result = await dataURI(fileName)
        fileList.name = fileName.name
        fileList.data_uri = result
        setImageFiles(fileList)
      } catch (error) {}
    }
    if (fileName) {
      getDataURI(fileName)
    }
  }, [fileName])

  const handleAdd = () => {
    console.log(watch(PATIENT_NATIONAL_ID_TYPE), 'PATIENT_NATIONAL_ID_TYPE')
    dispatch(clearPatientHistory())
    setValue(PATIENT_NATIONAL_ID_TYPE, 'National ID')
    if (branchData?.defaultBranch !== null) {
      setPrefixValue(branchData?.defaultBranch?.initials)
      dispatch(clearPatientData())
      setSuffixValue('')
      setValue(PATIENT_FILE_NO, '')
      setValue(PATIENT_NAME, '')
      setValue(PATIENT_DOB, '')
      setValue(PATIENT_ADDRESS, '')
      setValue(PATIENT_ADDRESS_PINCODE, '')
      setValue(PATIENT_AREA, '')
      setValue(PATIENT_ALLERGIES, '')
      setValue(PATIENT_NATIONAL_ID, '')
      setValue(PATIENT_EMAIL, '')
      setValue(PATIENT_FINANCIAL_REMARK, '')
      setValue(PATIENT_MEDICAL_REMARK, '')
      setValue(PATIENT_MOBILE_NO_1, '')
      setValue(PATIENT_MOBILE_NO_2, '')
      setValue(PATIENT_RELATIVE_NAME, '')
      setValue(PATIENT_RELATIVE_MOBILE, '')
      setValue(PATIENT_RELATIVE_RELATION, '')
      setValue(PATIENT_NATIONALITY, '')
      setValue(PATIENT_BLOODGROUP, '')
      setValue(PATIENT_MARITAL_STATUS, '')
      setValue(PATIENT_SOURCE, '')
      setValue(PATIENT_BRANCH_NAME, '')
      setValue(PATIENT_GENDER, '')
      setAge('')
      setValue(PATIENT_NATIONAL_ID_TYPE, 'National ID')
      setImageFiles({ name: '', data_uri: '' })
      setSelectedIDOption('National ID')
      setBranchName('')
      setSelectedOption('')
      setIdValue('')
      setSelectedBranchNameId('')
      setValue(PATIENT_ADDTIONAL_FIELDS, {})
      setAdditionalData(globalAdditionalFieldList)
    } else {
      dispatch(clearPatientData())
      setPrefixValue('')
      setSuffixValue('')
      setValue(PATIENT_NATIONAL_ID_TYPE, 'National ID')
      setValue(PATIENT_FILE_NO, '')
      setValue(PATIENT_NAME, '')
      setValue(PATIENT_DOB, '')
      setValue(PATIENT_ADDRESS, '')
      setValue(PATIENT_ADDRESS_PINCODE, '')
      setValue(PATIENT_AREA, '')
      setValue(PATIENT_ALLERGIES, '')
      setValue(PATIENT_NATIONAL_ID, '')
      setValue(PATIENT_EMAIL, '')
      setValue(PATIENT_FINANCIAL_REMARK, '')
      setValue(PATIENT_MEDICAL_REMARK, '')
      setValue(PATIENT_MOBILE_NO_1, '')
      setValue(PATIENT_MOBILE_NO_2, '')
      setValue(PATIENT_RELATIVE_NAME, '')
      setValue(PATIENT_RELATIVE_MOBILE, '')
      setValue(PATIENT_RELATIVE_RELATION, '')
      setValue(PATIENT_NATIONALITY, '')
      setValue(PATIENT_BLOODGROUP, '')
      setValue(PATIENT_MARITAL_STATUS, '')
      setValue(PATIENT_SOURCE, '')
      setValue(PATIENT_BRANCH_NAME, '')
      setValue(PATIENT_GENDER, '')
      setAge('')
      setImageFiles({ name: '', data_uri: '' })
      setSelectedIDOption('National ID')
      setBranchName('')
      setSelectedOption('')
      setIdValue('')
      setSelectedBranchNameId('')
      setValue(PATIENT_ADDTIONAL_FIELDS, {})
      setAdditionalData(globalAdditionalFieldList)
    }
  }

  const handdleEmrRecordDelete = () => {
    let dataPayload = {
      id: patientDataObjectById?._id,
      data: {
        is_active: !patientDataObjectById?.is_active,
      },
    }
    if (patientDataObjectById?.is_active === true) {
      dispatch(deletePatientEmr(requestGenerator(dataPayload))).then((e) => {
        if ((e.type = 'patient/deletePatientEmr/fulfilled')) {
          dispatch(clearPatientData())
          setIdValue('')
          setPrefixValue('')
          // setSuffixValue("");
          setSuffixValue('')
          setValue(PATIENT_FILE_NO, '')
          setValue(PATIENT_NAME, '')
          setValue(PATIENT_DOB, '')
          setValue(PATIENT_ADDRESS, '')
          setValue(PATIENT_ADDRESS_PINCODE, '')
          setValue(PATIENT_AREA, '')
          setValue(PATIENT_ALLERGIES, '')
          setValue(PATIENT_NATIONAL_ID, '')
          setValue(PATIENT_EMAIL, '')
          setValue(PATIENT_FINANCIAL_REMARK, '')
          setValue(PATIENT_MEDICAL_REMARK, '')
          setValue(PATIENT_MOBILE_NO_1, '')
          setValue(PATIENT_MOBILE_NO_2, '')
          setValue(PATIENT_RELATIVE_NAME, '')
          setValue(PATIENT_RELATIVE_MOBILE, '')
          setValue(PATIENT_RELATIVE_RELATION, '')
          setValue(PATIENT_NATIONALITY, '')
          setValue(PATIENT_BLOODGROUP, '')
          setValue(PATIENT_MARITAL_STATUS, '')
          setValue(PATIENT_SOURCE, '')
          setValue(PATIENT_BRANCH_NAME, '')
          setValue(PATIENT_GENDER, '')
          setAge('')
          setImageFiles({ name: '', data_uri: '' })
          setSelectedIDOption('')
          setBranchName('')
          setSelectedOption('')
          setSelectedBranchNameId('')
          setValue(PATIENT_ADDTIONAL_FIELDS, {})
          setAdditionalData(globalAdditionalFieldList)
        } else if (branchData?.defaultBranch !== null) {
          setPrefixValue(branchData?.defaultBranch?.initials)
          dispatch(clearPatientData())
          setIdValue('')
          setSuffixValue('')
          setValue(PATIENT_FILE_NO, '')
          setValue(PATIENT_NAME, '')
          setValue(PATIENT_DOB, '')
          setValue(PATIENT_ADDRESS, '')
          setValue(PATIENT_ADDRESS_PINCODE, '')
          setValue(PATIENT_AREA, '')
          setValue(PATIENT_ALLERGIES, '')
          setValue(PATIENT_NATIONAL_ID, '')
          setValue(PATIENT_EMAIL, '')
          setValue(PATIENT_FINANCIAL_REMARK, '')
          setValue(PATIENT_MEDICAL_REMARK, '')
          setValue(PATIENT_MOBILE_NO_1, '')
          setValue(PATIENT_MOBILE_NO_2, '')
          setValue(PATIENT_RELATIVE_NAME, '')
          setValue(PATIENT_RELATIVE_MOBILE, '')
          setValue(PATIENT_RELATIVE_RELATION, '')
          setValue(PATIENT_NATIONALITY, '')
          setValue(PATIENT_BLOODGROUP, '')
          setValue(PATIENT_MARITAL_STATUS, '')
          setValue(PATIENT_SOURCE, '')
          setValue(PATIENT_BRANCH_NAME, '')
          setValue(PATIENT_GENDER, '')
          setAge('')
          setImageFiles({ name: '', data_uri: '' })
          setSelectedIDOption('National ID')
          setBranchName('')
          setSelectedOption('')
          setSelectedBranchNameId('')
          setValue(PATIENT_ADDTIONAL_FIELDS, {})
          setAdditionalData(globalAdditionalFieldList)
        } else {
          setSuffixValue('')
        }
      })
    } else {
      if (branchData?.defaultBranch !== null) {
        setPrefixValue(branchData?.defaultBranch?.initials)
        dispatch(clearPatientData())
        setIdValue('')
        setSuffixValue('')
        setValue(PATIENT_FILE_NO, '')
        setValue(PATIENT_NAME, '')
        setValue(PATIENT_DOB, '')
        setValue(PATIENT_ADDRESS, '')
        setValue(PATIENT_ADDRESS_PINCODE, '')
        setValue(PATIENT_AREA, '')
        setValue(PATIENT_ALLERGIES, '')
        setValue(PATIENT_NATIONAL_ID, '')
        setValue(PATIENT_EMAIL, '')
        setValue(PATIENT_FINANCIAL_REMARK, '')
        setValue(PATIENT_MEDICAL_REMARK, '')
        setValue(PATIENT_MOBILE_NO_1, '')
        setValue(PATIENT_MOBILE_NO_2, '')
        setValue(PATIENT_RELATIVE_NAME, '')
        setValue(PATIENT_RELATIVE_MOBILE, '')
        setValue(PATIENT_RELATIVE_RELATION, '')
        setValue(PATIENT_NATIONALITY, '')
        setValue(PATIENT_BLOODGROUP, '')
        setValue(PATIENT_MARITAL_STATUS, '')
        setValue(PATIENT_SOURCE, '')
        setValue(PATIENT_BRANCH_NAME, '')
        setValue(PATIENT_GENDER, '')
        setAge('')
        setImageFiles({ name: '', data_uri: '' })
        setSelectedIDOption('National ID')
        setBranchName('')
        setSelectedOption('')
        setSelectedBranchNameId('')
        setValue(PATIENT_ADDTIONAL_FIELDS, {})
        setAdditionalData(globalAdditionalFieldList)
      } else {
        dispatch(clearPatientData())
        setIdValue('')
        setPrefixValue('')
        setSuffixValue('')
        setValue(PATIENT_FILE_NO, '')
        setValue(PATIENT_NAME, '')
        setValue(PATIENT_DOB, '')
        setValue(PATIENT_ADDRESS, '')
        setValue(PATIENT_ADDRESS_PINCODE, '')
        setValue(PATIENT_AREA, '')
        setValue(PATIENT_ALLERGIES, '')
        setValue(PATIENT_NATIONAL_ID, '')
        setValue(PATIENT_EMAIL, '')
        setValue(PATIENT_FINANCIAL_REMARK, '')
        setValue(PATIENT_MEDICAL_REMARK, '')
        setValue(PATIENT_MOBILE_NO_1, '')
        setValue(PATIENT_MOBILE_NO_2, '')
        setValue(PATIENT_RELATIVE_NAME, '')
        setValue(PATIENT_RELATIVE_MOBILE, '')
        setValue(PATIENT_RELATIVE_RELATION, '')
        setValue(PATIENT_NATIONALITY, '')
        setValue(PATIENT_BLOODGROUP, '')
        setValue(PATIENT_MARITAL_STATUS, '')
        setValue(PATIENT_SOURCE, '')
        setValue(PATIENT_BRANCH_NAME, '')
        setValue(PATIENT_GENDER, '')
        setAge('')
        setImageFiles({ name: '', data_uri: '' })
        setSelectedIDOption('')
        setBranchName('')
        setSelectedOption('')
        setSelectedBranchNameId('')
        setValue(PATIENT_ADDTIONAL_FIELDS, {})
        setAdditionalData(globalAdditionalFieldList)
      }
    }
  }

  const handdleEmrRecordReActive = () => {
    let getDataPayload = {
      id: patientDataObjectById?._id,
    }
    let dataPayload = {
      id: patientDataObjectById?._id,
      data: {
        is_active: !patientDataObjectById?.is_active,
      },
    }
    dispatch(deletePatientEmr(requestGenerator(dataPayload))).then((e) => {
      if (e.type === 'patient/deletePatientEmr/fulfilled') {
        dispatch(getPatientEmrById(requestGenerator(getDataPayload)))
      }
    })
  }

  useEffect(() => {
    // Set the initial value of selectedIDOption when patientDataObjectById changes
    setSelectedIDOption(patientDataObjectById?.national_id_type || '')
  }, [patientDataObjectById])

  const handleSelectChange = (event: any) => {
    let selectedValues = event.target.value
    setSelectedIDOption(selectedValues)
    // Clear the input field when selecting "CIVIL_ID" or "PASSPORT_ID"
    if (
      selectedValues === 'CIVIL_ID' ||
      selectedValues === 'PASSPORT_ID' ||
      selectedValues === ''
    ) {
      setIdValue('')
    }

    const selectedValue = event.target.value

    // Perform validation based on the selected ID option
    if (selectedValue === '') {
      setIdValidationError('')
    }
  }

  const handleWheel = (e: any) => {
    e.preventDefault()
  }

  const handleKeyDown = (event: any) => {
    if (event.keyCode === 38 || event.keyCode === 40) {
      event.preventDefault()
    }
  }

  // ** change made by divyaraj
  useEffect(() => {
    if (patientDataObjectById?.emr_no) {
      const fileNumber = patientDataObjectById?.emr_no
      setPrefixValue(fileNumber?.substring(0, 2))
      setSuffixValue(fileNumber?.slice(2))
    } else if (branchData?.defaultBranch !== null) {
      setPrefixValue(branchData?.defaultBranch?.initials)
    }
  }, [branchData?.defaultBranch?.initials, patientDataObjectById?.emr_no])

  const handleSelectBranchChange = (e: any) => {
    const selectedBranch = branchData?.branches.find(
      (branch: any) => branch?._id === e.target.value
    )
    if (branchData?.defaultBranch !== null) {
      setSelectedOption(e.target.value)
      setBranchName(selectedBranch?.name)
      setSelectedBranchNameId(selectedBranch?._id)
    } else {
      setSelectedOption(e.target.value)
      setBranchName(selectedBranch?.name)
      setPrefixValue(selectedBranch?.initials)
      setSelectedBranchNameId(selectedBranch?._id)
    }
  }

  // SHOW NOTES PREVIEW

  const handleNotesPreview = (item: any) => {
    setScribeNotesPreview(!scribeNotesPreview)
    setScribeNotesLink(item?.path)
  }

  // SHOW NOTES PREVIEW

  const handleImagesPreview = (item: any) => {
    setScribeImagesPreview(!scribeImagesPreview)
    setScribeImagesLink(item?.path)
  }

  // funtion for finding modal
  const findModal = (item: any) => {
    switch (item?.headerName) {
      case 'DIAGNOSIS':
        diagnosisModalOpen(item)
        break
      case 'SYMPTOMS':
        symptomsModalOpen(item)
        break
      case 'MEDICATION':
        medicationModalOpen(item)
        break
      case 'NOTES':
        patientHistoryNotesModalOpen(item)
        break
      case 'ATTACHMENTS':
        attachmentsModalOpen(item)
        break
      case 'ATTACHMENTS_HEADER':
        viewAllAttachmentsModalOpen(item)
        break
      case 'IMAGES':
        imagesModalOpen(item)
        break
      case 'IMAGES_HEADER':
        viewAllImagesModalOpen(item)
        break
    }
  }

  // funtion for handling modal
  const handlePatientHistoryViewBtn = (item: any) => {
    findModal(item)
  }

  // function for handling View All Attachments modal
  const viewAllAttachmentsModalOpen = (item: any) => {
    const viewAllAttachments = { viewAllDocumentsList }
    setViewAllAttchmentnsPopupData(viewAllAttachments)
    setShowViewAllAttachementsModal((prevState) => !prevState)
  }

  // function for handling View All Images modal
  const viewAllImagesModalOpen = (item: any) => {
    const viewAllImages = { viewAllDocumentsList }
    setViewAllImagesPopupData(viewAllImages)
    setShowViewAllImagesModal((prevState) => !prevState)
  }

  // function for handling Diagnosis modal
  const diagnosisModalOpen = (item: any) => {
    const payloadData = {
      diagnosis_id: item?.diag_id,
    }
    if (item?.diag_id) {
      dispatch(
        getPatientDiagnosisDetailById(requestGenerator(payloadData))
      ).then((result) => {
        const diagnosisModalData = {
          ...result.payload,
          diag_apt_date: item?.convertDate,
        }
        setDiagnosisPopupData(diagnosisModalData)
        setShowDianosisModal((prevState) => !prevState)
      })
    }
  }

  // funtion for handling patient history modal
  // const handlePatientHistoryModal = () => {
  //   setShowPatientHistoryModal((prevState) => !prevState);
  // };

  // function for handling symptoms modal
  const symptomsModalOpen = (item: any) => {
    const symtomsData = {
      diag_symptom_tags: item?.diag_symptom_tags,
      diag_apt_date: item?.convertDate,
    }
    setSymptomsPopupData(symtomsData)
    setShowSymptomsModal((prevState) => !prevState)
  }

  const symptomsModalClose = () => {
    setSymptomsPopupData({})
    setShowSymptomsModal((prevState) => !prevState)
  }

  // function for handling Medication modal
  const medicationModalOpen = (item: any) => {
    const medicationData = {
      diag_medicine_prescription: item?.diag_medicine_prescription,
      diag_apt_date: item?.convertDate,
    }
    setMedicationPopupData(medicationData)
    setShowMedicationModal((prevState) => !prevState)
  }

  const medicationModalClose = () => {
    setMedicationPopupData({})
    setShowMedicationModal((prevState) => !prevState)
  }

  // function for handling Patient History notes modal
  const patientHistoryNotesModalOpen = (item: any) => {
    const patientHistoryNotesData = {
      diag_note: item?.diag_note,
      diag_apt_date: item?.convertDate,
    }
    setPatientHistoryNotes(patientHistoryNotesData)
    setShowPatientHistoryNotesModal((prevState) => !prevState)
  }

  const patientHistoryNotesModalClose = () => {
    setPatientHistoryNotes({})
    setShowPatientHistoryNotesModal((prevState) => !prevState)
  }

  // function for handling Image modal
  const imageModalOpen = (item: any) => {
    // const imageModalData = {
    //   teeth_img,
    // };
    setImagePopupData(scribe_notes_img)
    setShowImageModal((prevState) => !prevState)
  }

  const imageModalClose = () => {
    setImagePopupData('')
    setShowImageModal((prevState) => !prevState)
  }

  // function for handling Attachments modal
  const attachmentsModalOpen = (item: any) => {
    const payloadData = {
      diagnosis_id: item?.diag_id,
    }
    if (item?.diag_id) {
      dispatch(getPatientAttachmentsById(requestGenerator(payloadData))).then(
        (result) => {
          const attachmentsData = {
            docs_list: result.payload,
            diag_apt_date: item?.convertDate,
          }
          setAttachmentsPopupData(attachmentsData)
          setShowAttachmentsModal((prevState) => !prevState)
        }
      )
    }
  }

  const attachmentsModalClose = () => {
    dispatch(clearPatientAttachmentsData())
    setAttachmentsPopupData({})
    setShowAttachmentsModal((prevState) => !prevState)
  }

  // function for handling Single Attachment modal
  const singleAttachmentModalOpen = (rowData: any) => {
    setSingleAttachmentPopupData(rowData?.doc_url)
    setShowSingleAttachmentModal((prevState) => !prevState)
  }

  const singleAttachmentModalClose = () => {
    setSingleAttachmentPopupData('')
    setShowSingleAttachmentModal((prevState) => !prevState)
  }

  // function for handling Images modal
  const imagesModalOpen = (item: any) => {
    const payloadData = {
      diagnosis_id: item?.diag_id,
    }
    if (item?.diag_id) {
      dispatch(getPatientImagesById(requestGenerator(payloadData))).then(
        (result) => {
          const imagesData = {
            docs_list: result.payload,
            diag_apt_date: item?.convertDate,
          }

          setImagesPopupData(imagesData)
          setShowImagesModal((prevState) => !prevState)
        }
      )
    }
  }

  const imagesModalClose = () => {
    setImagesPopupData({})
    setShowImagesModal((prevState) => !prevState)
  }

  // function for handling Single Image modal
  const singleImageModalOpen = (rowData: any) => {
    setSingleImagePopupData(rowData?.img_url)
    setShowSingleImageModal((prevState) => !prevState)
  }

  const singleImageModalClose = () => {
    setSingleImagePopupData('')
    setShowSingleImageModal((prevState) => !prevState)
  }

  const diagnosisModalClose = () => {
    dispatch(clearPatientDiagnosisDetailData())
    setDiagnosisPopupData({})
    setShowDianosisModal((prevState) => !prevState)
  }

  // function for handling Diagnosis Scribe Notes modal
  const diagnosisScribeNotesModalOpen = (item: any) => {
    setDiagnosisScribeNotesPopupData(item)
    setShowDianosisScribeNotesModal((prevState) => !prevState)
  }

  const diagnosisScribeNotesModalClose = () => {
    setDiagnosisScribeNotesPopupData('')
    setShowDianosisScribeNotesModal((prevState) => !prevState)
  }

  // function for handling Diagnosis Scribe Image modal
  const diagnosisScribeImageModalOpen = (item: any) => {
    setDiagnosisScribeImagePopupData(item)
    setShowDianosisScribeImageModal((prevState) => !prevState)
  }

  const diagnosisScribeImageModalClose = () => {
    setDiagnosisScribeImagePopupData('')
    setShowDianosisScribeImageModal((prevState) => !prevState)
  }

  const handleImageUploadNew = () => {
    setImagePopup(!imagePopup)
  }

  const attachmentsNotesModalClose = () => {
    setAttachmentnsNotesPopupData({})
    setShowAttachmentsNotesModal((prevState) => !prevState)
  }

  // funtion for handling patient history modal
  const handlePatientHistoryModalOpen = () => {
    setShowPatientHistoryModal((prevState) => !prevState)
  }

  // const handlePatientHistoryModalClose = () => {
  //   setShowPatientHistoryModal((prevState) => !prevState);
  //   dispatch(clearPatientHistoryData());
  // };

  const viewAllAttachmentsModalClose = () => {
    setViewAllAttchmentnsPopupData({})
    setShowViewAllAttachementsModal((prevState) => !prevState)
  }

  // function for handling Attachments notes modal
  const attachmentsNotesModalOpen = (item: any) => {
    const attachmentNotesData = {
      diag_note: item?.diag_note,
      diag_apt_date: item?.date,
    }
    setAttachmentnsNotesPopupData(attachmentNotesData)
    setShowAttachmentsNotesModal((prevState) => !prevState)
  }

  // function for handling View All Single Attachment modal
  const viewAllSingleAttachmentModalOpen = (item: any) => {
    // console.log("item :>> ", item);
    const payloadData = {
      img_ids: [
        {
          diag_id: item?._id,
          img_id: item?.diag?.doc_id,
        },
      ],
      flag: true,
    }
    if (item?._id) {
      dispatch(getCompareDocumentsById(requestGenerator(payloadData))).then(
        (result) => {
          const viewAllAttachmentModalData = {
            ...result.payload,
          }
          setViewAllSingleAttachmentPopupData(
            viewAllAttachmentModalData?.[0] || ''
          )
          setShowViewAllSingleAttachmentModal((prevState) => !prevState)
        }
      )
    }
  }

  const viewAllSingleAttachmentModalClose = () => {
    dispatch(clearPatientCompareImagesData())
    setViewAllSingleAttachmentPopupData('')
    setShowViewAllSingleAttachmentModal((prevState) => !prevState)
  }

  const viewAllImagesModalClose = () => {
    setViewAllImagesPopupData({})
    setShowViewAllImagesModal((prevState) => !prevState)
  }

  // function for handling View All Single Image modal
  const viewAllSingleImageModalOpen = (item: any) => {
    // console.log("item :>> ", item);
    const payloadData = {
      img_ids: [
        {
          diag_id: item?._id,
          img_id: item?.diag?.img_id,
        },
      ],
      flag: false,
    }
    if (item?._id) {
      dispatch(getCompareDocumentsById(requestGenerator(payloadData))).then(
        (result) => {
          const viewAllImageModalData = {
            ...result.payload,
          }
          setViewAllSingleImagePopupData(viewAllImageModalData?.[0] || '')
          setShowViewAllSingleImageModal((prevState) => !prevState)
        }
      )
    }
  }

  const viewAllSingleImageModalClose = () => {
    dispatch(clearPatientCompareImagesData())
    setViewAllSingleImagePopupData('')
    setShowViewAllSingleImageModal((prevState) => !prevState)
  }

  // function for handling Images notes modal
  const imagesNotesModalOpen = (item: any) => {
    const imageNotesData = {
      diag_note: item?.diag_note,
      diag_apt_date: item?.date,
    }
    setImagesNotesPopupData(imageNotesData)
    setShowImagesNotesModal((prevState) => !prevState)
  }

  const imagesNotesModalClose = () => {
    setImagesNotesPopupData({})
    setShowImagesNotesModal((prevState) => !prevState)
  }

  // function for handling Single Compare Doc modal
  const singleCompareDocModalOpen = (item: any) => {
    // console.log("item :>> ", item);
    setCompareDocModalPopupData(item)
    setSingleCompareDocumentModal((prevState) => !prevState)
  }

  const singleCompareDocModalClose = () => {
    setCompareDocModalPopupData('')
    setSingleCompareDocumentModal((prevState) => !prevState)
  }

  // function for handling Single Compare Image modal
  // const singleCompareImageModalOpen = (item: any) => {
  //   // console.log("item :>> ", item);
  //   setCompareImageModalPopupData(item);
  //   setSingleCompareImageModal((prevState) => !prevState);
  // };

  // const singleCompareImageModalClose = () => {
  //   setCompareImageModalPopupData("");
  //   setSingleCompareImageModal((prevState) => !prevState);
  // };

  useEffect(() => {
    return () => {
      dispatch(clearPatientData())
    }
  }, [dispatch])
  useEffect(() => {
    dispatch(clearPatientHistory())
  }, [])

  return (
    <>
      {isLoading && <Loader />}
      {loadingTag && <Loader />}
      {showSearchModal && (
        <Popup
          Children={SearchModal}
          popData={searchModalData}
          handleClose={() => handleSearchModalClose()}
          setModelOpenClose={setShowSearchModal}
          invoiceFlag={false}
        />
      )}
      {showAssignTagModal && (
        <Popup
          Children={AssignTagModal}
          popData={assignTagData}
          handleClose={() => handleModalClose()}
        />
      )}
      {viewHistory && (
        <Popup
          Children={ViewHistoryPopup}
          handleClose={() => handleViewModalClose()}
        />
      )}
      {recentHistory && (
        <Popup
          Children={RecentHistoryPopup}
          handleClose={() => handleViewModalClose()}
        />
      )}
      {imagePopup && (
        <Popup
          Children={ImageUploadPopup}
          handleClose={() => handleImageUploadNew()}
          setModelOpenClose={setImagePopup}
          popData={
            // seletedDropdownValue?.id !== undefined
            //   ? seletedDropdownValue?.id
            //   :
            imgDiagnosisId
          }
        />
      )}
      {documentPopup && (
        <Popup
          Children={DocumentUploadPopup}
          handleClose={() => setDocumentPopup(false)}
          setModelOpenClose={setDocumentPopup}
          popData={documentDiagnosisId}
        />
      )}
      {scribeNotes && (
        <Popup
          Children={ScribeNotesPopup}
          handleClose={() => setScribeNotes(false)}
          handleNotesPreview={handleNotesPreview}
          popData={scribeNotesId}
        />
      )}
      {scribeNotesPreview && (
        <Popup
          Children={ImageViewerModal}
          popData={scribeNotesLink}
          handleClose={() => setScribeNotesPreview(false)}
        />
      )}
      {scribeImages && (
        <Popup
          Children={ScribeImagesPopup}
          handleClose={() => setScribeImages(false)}
          handleImagesPreview={handleImagesPreview}
          popData={scribeImagesId}
        />
      )}
      {scribeImagesPreview && (
        <Popup
          Children={ImageZoomInOutModal}
          popData={scribeImagesLink}
          handleClose={() => setScribeImagesPreview(false)}
        />
      )}

      {showAppointmentPopup && (
        <Popup
          Children={TimelineAppointmentPopup}
          handleClose={() => setShowAppointmentPopup(false)}
          popData={appointmentYear}
          handleSubmitData={(item: any) => {
            setShowDiagnosisLink(!showDiagnosisLink)
            setDiagnosisId(item)
          }}
        />
      )}

      {showPatientHistory && (
        <Popup
          Children={PatientHistoryModal}
          handleClose={() => setShowPatientHistory((prevState) => !prevState)}
          handleOpen={handlePatientHistoryViewBtn}
          popData={patientDataObjectById?._id}
        />
      )}
      {showDiagnosisLink && (
        <Popup
          Children={PatientHistoryModal}
          handleClose={() => setShowDiagnosisLink((prevState) => !prevState)}
          handleOpen={handlePatientHistoryViewBtn}
          popData={diagnosisId}
        />
      )}
      {/* THIS ALL POPUPS ARE FOR THE PATIENT HISTORY  */}
      {showSymptomsModal && (
        <Popup
          Children={TagsListModal}
          handleClose={symptomsModalClose}
          popData={symptomsPopupData}
          heading={'Symptoms'}
        />
      )}
      {/* {showPatientHistoryModal && (
        <Popup
          Children={PatientHistoryModal}
          handleClose={handlePatientHistoryModalClose}
          handleOpen={handlePatientHistoryViewBtn}
        />
      )} */}
      {showMedicationModal && (
        <Popup
          Children={MedicationModal}
          handleClose={medicationModalClose}
          popData={medicationPopupData}
          heading={'Medication'}
          headerData={medicationModalHeaderData}
        />
      )}
      {showSingleAttachmentModal && (
        <Popup
          Children={DocumentsViewerModal}
          handleClose={singleAttachmentModalClose}
          popData={singleAttachmentPopupData}
        />
      )}
      {showPatientHistoryNotesModal && (
        <Popup
          Children={PatientHistoryNotesModal}
          handleClose={patientHistoryNotesModalClose}
          popData={patientHistoryNotesPopupData}
          heading={'Notes'}
        />
      )}
      {showViewAllAttachementsModal && (
        <Popup
          Children={ViewAllAttachmentsModal}
          handleClose={viewAllAttachmentsModalClose}
          heading={'Attachments'}
          // popData={viewAllAttchmentnsPopupData}
          popData={patientDataObjectById?._id}
          headerData={viewAllAttachmentsModalHeaderData}
          handleOpen={attachmentsNotesModalOpen}
          handleSubmit={viewAllSingleAttachmentModalOpen}
          setModelOpenClose={setCompareDocsModal}
        />
      )}
      {showViewAllSingleAttachmentModal && (
        <Popup
          Children={DocumentsViewerModal}
          handleClose={viewAllSingleAttachmentModalClose}
          popData={viewAllSingleAttachmentPopupData}
        />
      )}
      {compareDocsModal && (
        <Popup
          Children={CompareDocModal}
          handleClose={() => {
            setCompareDocsModal(false)
          }}
          heading="Compare"
        />
      )}
      {showAttachmentsNotesModal && (
        <Popup
          Children={PatientHistoryNotesModal}
          handleClose={attachmentsNotesModalClose}
          popData={attachmentnsNotesPopupData}
          heading={'Notes'}
        />
      )}
      {showImageModal && (
        <Popup
          Children={ImageViewerModal}
          handleClose={imageModalClose}
          popData={imagePopupData}
        />
      )}
      {showAttachmentsModal && (
        <Popup
          Children={ViewDocumentsModal}
          handleClose={attachmentsModalClose}
          popData={attachmentsPopupData}
          heading={'Attachments'}
          headerData={attachmentsModalHeaderData}
          handleOpen={singleAttachmentModalOpen}
        />
      )}
      {showSingleAttachmentModal && (
        <Popup
          Children={DocumentsViewerModal}
          handleClose={singleAttachmentModalClose}
          popData={singleAttachmentPopupData}
        />
      )}
      {showImagesModal && (
        <Popup
          Children={ViewDocumentsModal}
          handleClose={imagesModalClose}
          popData={imagesPopupData}
          heading={'Images'}
          headerData={imagesModalHeaderData}
          handleOpen={singleImageModalOpen}
        />
      )}
      {showSingleImageModal && (
        <Popup
          Children={ImageZoomInOutModal}
          handleClose={singleImageModalClose}
          popData={singleImagePopupData}
        />
      )}
      {showDianosisModal && (
        <Popup
          Children={DiagnosisModal}
          handleClose={diagnosisModalClose}
          handleOpen={diagnosisScribeNotesModalOpen}
          setModelOpenClose={diagnosisScribeImageModalOpen}
          popData={diagnosisPopupData}
          heading={'Diagnosis'}
        />
      )}
      {showViewAllImagesModal && (
        <Popup
          Children={ViewAllImagesModal}
          handleClose={viewAllImagesModalClose}
          heading={'Images'}
          popData={patientDataObjectById?._id}
          headerData={viewAllImagesHeaderData}
          setModelOpenClose={setCompareImageModal}
          handleOpen={imagesNotesModalOpen}
          handleSubmit={viewAllSingleImageModalOpen}
        />
      )}
      {showViewAllSingleImageModal && (
        <Popup
          Children={ImageZoomInOutModal}
          handleClose={viewAllSingleImageModalClose}
          popData={viewAllSingleImagePopupData}
        />
      )}
      {showImagesNotesModal && (
        <Popup
          Children={PatientHistoryNotesModal}
          handleClose={imagesNotesModalClose}
          popData={imagesNotesPopupData}
          heading={'Notes'}
        />
      )}
      {/* {compareImagesModal && (
        <Popup
          Children={CompareModal}
          handleClose={() => {
            setCompareImageModal(false);
          }}
          handleOpen={singleCompareImageModalOpen}
          heading="Compare"
        />
      )} */}
      {compareImagesModal && (
        <Popup
          Children={CompareModal}
          handleClose={() => {
            setCompareImageModal(false)
          }}
          // handleOpen={singleCompareImageModalOpen}
          heading="Compare"
        />
      )}
      {/* {singleCompareImageModal && (
        <Popup
          Children={ImageZoomInOutModal}
          handleClose={singleCompareImageModalClose}
          popData={compareImageModalPopupData}
        />
      )} */}
      {/* {singleCompareImageModal && (
        <Popup
          Children={ImageZoomInOutModal}
          handleClose={singleCompareImageModalClose}
          popData={compareImageModalPopupData}
        />
      )} */}
      {/* {compareImagesModal && (
        <Popup
          Children={CompareModal}
          handleClose={() => {
            setCompareImageModal(false);
          }}
          heading="Compare"
        />
      )} */}
      {compareDocsModal && (
        <Popup
          Children={CompareDocModal}
          handleClose={() => {
            setCompareDocsModal(false)
          }}
          handleOpen={singleCompareDocModalOpen}
          heading="Compare"
        />
      )}
      {singleCompareDocumentModal && (
        <Popup
          Children={DocumentsViewerModal}
          handleClose={singleCompareDocModalClose}
          popData={compareDocsModalPopupData}
        />
      )}
      {showDianosisScribeImageModal && (
        <Popup
          Children={ImageZoomInOutModal}
          handleClose={diagnosisScribeImageModalClose}
          popData={diagnosisScribeImagePopupData}
        />
      )}
      {showDianosisScribeNotesModal && (
        <Popup
          Children={ImageViewerModal}
          handleClose={diagnosisScribeNotesModalClose}
          popData={diagnosisScribeNotesPopupData}
        />
      )}
      {isConfirmationPopup && (
        <Popup
          Children={ConfirmationPopup}
          popupTitle="Are you sure ?"
          popupSubTitle="All the fields added would be non-deletable."
          handleClose={handleConfirmationPopup}
          setModelOpenClose={setIsConfirmationPopup}
          handleYes={handleAddBlockFieldSubmit}
        />
      )}
      {isDeleteCustomField && (
        <Popup
          Children={ConfirmationPopup}
          popupTitle="Are you sure ?"
          popupSubTitle="Are you sure you want to delete the added block field."
          handleClose={handleDeleteCustomFieldPopup}
          setModelOpenClose={setIsDeleteCustomField}
          handleYes={handleDeleteCustomField}
        />
      )}

      <CustomModal
        showModal={successModal}
        closeModal={() => setSuccessModal(false)}
        width="30%"
      >
        <div className={styles.sucessMsgWrapper}>
          <img src={sucessImage} alt="Sucessfull" />
          <p style={{ fontWeight: '800', textAlign: 'center' }}>
            Patient Emr {statusMsg ? 'Created' : 'Updated'} Sucessfully
          </p>
        </div>
      </CustomModal>

      <form
        className={styles.PatientEMRContainer}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div
          className={styles.mainContainer}
          onClick={() => {
            if (showOption === true) {
              setShowOption(false)
            }
          }}
        >
          <div className={styles.Container}>
            <div className={styles.searchAssignTagLayout}>
              <div
                className={
                  userRole === 'DOCTOR'
                    ? styles.searchContainerDisable
                    : styles.searchContainer
                }
              >
                <SearchDesign handleSearchClick={handleSearchPopup} />
              </div>

              <div className={styles.branchSelectContainer}>
                <p className={styles.branchTitle}>Branch</p>
                <select
                  onChange={handleSelectBranchChange}
                  className={styles.selectContainer}
                  value={selectedOption}
                  disabled={
                    patientDataObjectById?.patient_default_branch_id || readOnly
                      ? true
                      : false
                  }
                >
                  <option value="" disabled selected hidden>
                    Select branch
                  </option>

                  {branchData?.branches
                    ?.filter((item: any) => item?._id)
                    .map((item: any, i: number) => {
                      return (
                        <React.Fragment key={i}>
                          <option
                            value={item?._id}
                            // selected={
                            //   item?._id ===
                            //   patientDataObjectById?.patient_default_branch_id
                            // }
                          >
                            {item?.name}
                          </option>
                        </React.Fragment>
                      )
                    })}
                </select>
              </div>

              <div className={styles.assignTagLayout}>
                <div className={styles.patientAssignedTag}>
                  {patientDataObjectById?._id !== undefined &&
                    activeTagsData &&
                    activeTagsData.length > 0 &&
                    activeTagsData.map((item: any, index: number) => {
                      return (
                        <img
                          src={item?.label_icon}
                          alt="tag_img"
                          className={styles.tagStyle}
                          key={index}
                        />
                      )
                    })}
                </div>
                <div
                  className={
                    readOnly
                      ? styles.assignTagContainerDisable
                      : styles.assignTagContainer
                  }
                  onClick={() => handleAssignPopup()}
                >
                  <p className={styles.assignTagText}>Assign Tag</p>
                </div>
              </div>

              {patientDataObjectById?._id ? (
                <div className={styles.activeEmrLayout}>
                  <div
                    className={
                      patientDataObjectById?.is_active === false
                        ? styles.inActiveEmr
                        : styles.activeEmr
                    }
                  >
                    <p>
                      {patientDataObjectById?.is_active === false
                        ? 'In Active'
                        : 'Active'}
                    </p>
                  </div>
                </div>
              ) : (
                ''
              )}
            </div>
            <div className={styles.formLayoutContainer}>
              {/* starting from here */}
              <div className={styles.formContainer}>
                <div className={styles.formStyleContainer}>
                  <div className={styles.formLayout}>
                    <div className={styles.labelField}>
                      <label
                        htmlFor={PATIENT_FILE_NO}
                        className={styles.labelText}
                      >
                        File No.
                        <span className="asterick">*</span>
                      </label>
                      <div className={styles.fieldErrorContainer}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                          <input
                            type="text"
                            className={
                              disable
                                ? styles.disableInputFieldBranchInitials
                                : styles.inputField
                            }
                            disabled={true}
                            // defaultValue={prefixValue}
                            value={prefixValue}
                          />
                          <input
                            type="text"
                            className={
                              disable
                                ? styles.disableInputFieldFileNo
                                : styles.inputField
                            }
                            disabled={true}
                            defaultValue={suffixValue}
                            // value={suffixValue}
                          />
                        </div>
                      </div>
                    </div>

                    <div className={styles.labelField}>
                      <label
                        htmlFor={PATIENT_NAME}
                        className={styles.labelText}
                      >
                        Name
                        <span className="asterick">*</span>
                      </label>
                      <div className={styles.fieldErrorContainer}>
                        <input
                          type="text"
                          placeholder="Enter patient name"
                          className={
                            readOnly
                              ? styles.disableInputFields
                              : styles.inputField
                          }
                          {...register(
                            PATIENT_NAME,
                            addPatientValidators[PATIENT_NAME]
                          )}
                          onChange={(e) => trimValue(e)}
                          readOnly={readOnly}
                        />

                        <div className={styles.errorContainer}>
                          <span className={styles.extraSpan}></span>
                          {errors[PATIENT_NAME] && (
                            <p className="dashboardFormError">
                              {errors[PATIENT_NAME].message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className={styles.labelField}>
                      <label
                        htmlFor={PATIENT_NATIONALITY}
                        className={styles.labelText}
                      >
                        Nationality
                        <span className="asterick">*</span>
                      </label>
                      <div className={styles.fieldSelectContainer}>
                        <select
                          disabled={readOnly}
                          className={
                            readOnly
                              ? styles.disableInputFields
                              : styles.selectInputField
                          }
                          {...register(
                            PATIENT_NATIONALITY,
                            addPatientValidators[PATIENT_NATIONALITY]
                          )}
                          placeholder="Select Nationality"
                        >
                          <option value="" selected disabled hidden>
                            Select Nationality
                          </option>
                          {patientNationalityData[0]?.map(
                            (item: any, i: number) => {
                              return (
                                <React.Fragment key={i}>
                                  <option
                                    value={item?.value}
                                    selected={
                                      item?.value ===
                                      patientDataObjectById[PATIENT_NATIONALITY]
                                    }
                                  >
                                    {item?.value}
                                  </option>
                                </React.Fragment>
                              )
                            }
                          )}
                        </select>
                        <div className={styles.errorContainer}>
                          <span className={styles.extraSpan}></span>
                          {errors[PATIENT_NATIONALITY] && (
                            <p className="dashboardFormError">
                              {errors[PATIENT_NATIONALITY].message as any}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className={styles.labelField}>
                      <label htmlFor={PATIENT_DOB} className={styles.labelText}>
                        Date Of Birth
                        <span className="asterick">*</span>
                      </label>
                      <div className={styles.fieldErrorContainer}>
                        <input
                          readOnly={readOnly}
                          type="date"
                          id="birthDate"
                          max="9999-12-31"
                          className={
                            readOnly
                              ? styles.disableInputFields
                              : styles.inputField
                          }
                          {...register(
                            PATIENT_DOB,
                            addPatientValidators[PATIENT_DOB]
                          )}
                          onChange={handleChange}
                        />
                        <div className={styles.errorContainer}>
                          <span className={styles.extraSpan}></span>
                          {errors[PATIENT_DOB] && (
                            <p className="dashboardFormError">
                              {errors[PATIENT_DOB].message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className={styles.labelField}>
                      <label
                        htmlFor={PATIENT_GENDER}
                        className={styles.labelText}
                      >
                        Gender
                        <span className="asterick">*</span>
                      </label>
                      <div className={styles.fieldErrorContainer}>
                        <label htmlFor="male" className={styles.radioLabel}>
                          <input
                            disabled={readOnly}
                            className={styles.radioInput}
                            type="radio"
                            id="male"
                            value="MALE"
                            {...register(
                              PATIENT_GENDER,
                              addPatientValidators[PATIENT_GENDER]
                            )}
                          />
                          <span className={styles.customRadio} />
                          Male
                        </label>

                        <label htmlFor="female" className={styles.radioLabel}>
                          <input
                            disabled={readOnly}
                            className={styles.radioInput}
                            type="radio"
                            id="female"
                            value="FEMALE"
                            {...register(
                              PATIENT_GENDER,
                              addPatientValidators[PATIENT_GENDER]
                            )}
                          />
                          <span className={styles.customRadio} />
                          Female
                        </label>

                        <div className={styles.errorContainer}>
                          <span className={styles.extraSpan}></span>
                          {errors[PATIENT_GENDER] && (
                            <p className="dashboardFormError">
                              {errors[PATIENT_GENDER].message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* <div className={styles.labelField}>
                      <label
                        htmlFor={PATIENT_ALLERGIES}
                        className={styles.labelText}
                      >
                        Allergies
                      </label>
                      <div className={styles.fieldErrorContainer}>
                        <input
                          readOnly={readOnly}
                          type="text"
                          placeholder="Enter allergies name"
                          className={
                            readOnly
                              ? styles.disableInputFields
                              : styles.inputField
                          }
                          {...register(PATIENT_ALLERGIES)}
                          onChange={(e) => trimValue(e)}
                        />
                      </div>
                    </div> */}

                    <div className={styles.labelField}>
                      <label
                        htmlFor={PATIENT_MOBILE_NO_1}
                        className={styles.labelText}
                      >
                        Mobile No.
                        <span className="asterick">*</span>
                      </label>
                      <div className={styles.fieldErrorContainer}>
                        <PhoneInput
                          country={'kw'}
                          {...register(
                            PATIENT_MOBILE_NO_1,
                            addPatientValidators[PATIENT_MOBILE_NO_1]
                          )}
                          value={getValues(PATIENT_MOBILE_NO_1)}
                          onChange={(phone) => {
                            const formattedPhone = phone && `+${phone}`
                            setValue(PATIENT_MOBILE_NO_1, formattedPhone)
                            trigger(PATIENT_MOBILE_NO_1)
                          }}
                          inputClass={styles.phoneNumberInput}
                          disabled={readOnly ? true : false}
                        />
                        <div className={styles.errorContainer}>
                          <span className={styles.extraSpan}></span>
                          {errors[PATIENT_MOBILE_NO_1] && (
                            <p className="dashboardFormError">
                              {errors[PATIENT_MOBILE_NO_1].message as any}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* <div className={styles.labelField}>
                      <label
                        htmlFor={PATIENT_BLOODGROUP}
                        className={styles.labelText}
                      >
                        Blood Group
                      </label>
                      <div className={styles.fieldSelectContainer}>
                        <select
                          disabled={readOnly}
                          className={
                            readOnly
                              ? styles.disableInputFields
                              : styles.selectInputField
                          }
                          // className={styles.selectInputField}
                          {...register(PATIENT_BLOODGROUP)}
                          placeholder="Select BloodGroup"
                        >
                          <option value="" selected disabled hidden>
                            Select Blood Group
                          </option>
                          {patientBloodGroupData[0]?.map(
                            (item: any, i: number) => {
                              return (
                                <React.Fragment key={i}>
                                  <option
                                    value={item?.value}
                                    selected={
                                      item?.value ===
                                      patientDataObjectById[PATIENT_BLOODGROUP]
                                    }
                                  >
                                    {item?.value}
                                  </option>
                                </React.Fragment>
                              );
                            }
                          )}
                        </select>
                      </div>
                    </div> */}

                    {/* <div className={styles.labelField}>
                      <label
                        htmlFor={PATIENT_OPENED_BY}
                        className={styles.labelText}
                      >
                        Opened By
                        <span className="asterick">*</span>
                      </label>
                      <div className={styles.fieldErrorContainer}>
                        <input
                          type="text"
                          className={
                            disable
                              ? styles.disableInputField
                              : styles.inputField
                          }
                          defaultValue={userLoginName}
                          disabled={true}
                        />
                        <div className={styles.errorContainer}>
                          <span className={styles.extraSpan}></span>
                          {errors[PATIENT_OPENED_BY] && (
                            <p className="dashboardFormError">
                              {errors[PATIENT_OPENED_BY].message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div> */}
                  </div>
                  <div className={styles.formLayout1}>
                    <div className={styles.labelField}>
                      <div
                        className={styles.selectInputFieldErrorStyleContainer}
                      >
                        <div className={styles.selectInputfieldContainer}>
                          <select
                            disabled={readOnly}
                            className={
                              readOnly
                                ? styles.disableselectField
                                : styles.selectField
                            }
                            // className={styles.selectField}
                            {...register(
                              PATIENT_NATIONAL_ID_TYPE,
                              addPatientValidators[PATIENT_NATIONAL_ID_TYPE]
                            )}
                            onChange={handleSelectChange}
                          >
                            {/* <option>
                              National ID
                              <span className="asterick">*</span>
                            </option> */}
                            <option
                              value="National ID"
                              selected
                              disabled
                              hidden
                            >
                              {' '}
                              National ID <span className="asterick">
                                *
                              </span>{' '}
                              <span className="asterick">*</span>
                            </option>

                            {optionIDData?.map((item: any, i: number) => {
                              return (
                                <React.Fragment key={i}>
                                  <option
                                    value={item?.value}
                                    // selected={
                                    //   item?.value ===
                                    //   patientDataObjectById[
                                    //   PATIENT_NATIONAL_ID_TYPE
                                    //   ]
                                    // }
                                  >
                                    {item?.label}
                                  </option>
                                </React.Fragment>
                              )
                            })}
                          </select>

                          <input
                            readOnly={readOnly}
                            type={
                              selectedIDOption === 'CIVIL_ID'
                                ? 'number'
                                : 'text'
                            }
                            disabled={
                              selectedIDOption === 'CIVIL_ID' ||
                              selectedIDOption === 'PASSPORT_ID'
                                ? false
                                : true
                            }
                            // className={
                            //   selectedIDOption === "CIVIL_ID" ||
                            //   selectedIDOption === "PASSPORT_ID"
                            //     ? styles.selectinputField
                            //     : styles.disableInputField
                            // }
                            className={
                              (readOnly && selectedIDOption === 'CIVIL_ID') ||
                              (readOnly && selectedIDOption === 'PASSPORT_ID')
                                ? styles.disableInputField
                                : (!readOnly &&
                                    selectedIDOption === 'CIVIL_ID') ||
                                  (!readOnly &&
                                    selectedIDOption === 'PASSPORT_ID')
                                ? styles.selectinputField
                                : styles.disableInputField
                            }
                            {...register(PATIENT_NATIONAL_ID)}
                            onChange={(e) => {
                              trimValue(e)
                              setIdValue(e.target.value)
                            }}
                            value={idValue}
                            placeholder="Enter ID number"
                            onWheel={handleWheel}
                            onKeyDown={handleKeyDown}
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
                            {errors[PATIENT_NATIONAL_ID_TYPE] && (
                              <p className="dashboardFormError">
                                {errors[PATIENT_NATIONAL_ID_TYPE].message}
                              </p>
                            )}
                          </div>
                          <div className={styles.errorContainer}>
                            {/* <span className={styles.extraSpan}></span>
                            {errors[PATIENT_NATIONAL_ID] && (
                              <p className="dashboardFormError1">
                                {errors[PATIENT_NATIONAL_ID].message}
                              </p>
                            )} */}
                            {idValidationError && (
                              <p className="dashboardFormError">
                                {idValidationError}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.avtarContainer}>
                      {showNoImage ? (
                        showNoImage && (
                          <div
                            className={styles.avtarNoImageStyle}
                            onMouseEnter={handleNoImageMouseEnter}
                            onMouseLeave={handleNoImageMouseLeave}
                          >
                            {imageFiles?.data_uri ? (
                              <img
                                src={imageFiles?.data_uri}
                                style={{
                                  objectFit: 'cover',
                                  width: '100%',
                                  borderRadius: '20px',
                                  height: '200px',
                                }}
                                alt=""
                              />
                            ) : (
                              <img
                                src={NoSelectImage}
                                className={styles.avtarImageFitStyle}
                                alt=""
                              />
                            )}

                            {showWebCamComponent && (
                              <div className={styles.avtarChangeImageStyle}>
                                <div
                                  className={
                                    styles.avtarChangeImageStyleContainer
                                  }
                                >
                                  <p className={styles.avtarImageTextStyle}>
                                    Recommended image size 872x724 Pixel. Images
                                    of improper dimensions may get distorted.
                                  </p>
                                  <div className={styles.buttonContainer}>
                                    <AttachSingleFileV3
                                      id={PATIENT_PROFILE_PIC}
                                      register={register}
                                      fileKey={PATIENT_PROFILE_PIC}
                                      fileList={imageFiles}
                                      readOnly={readOnly}
                                    />
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        )
                      ) : (
                        <div
                          className={styles.avtarImageStyle}
                          onMouseEnter={handleImageMouseEnter}
                          onMouseLeave={handleImageMouseLeave}
                        >
                          {imageFiles?.data_uri ? (
                            <img
                              src={imageFiles?.data_uri}
                              style={{
                                objectFit: 'cover',
                                width: '100%',
                                borderRadius: '20px',
                                height: '200px',
                              }}
                              alt=""
                            />
                          ) : (
                            <img
                              src={SelectImage}
                              className={styles.avtarImageFitStyle}
                              alt=""
                            />
                          )}

                          {showAnotherComponent && (
                            <div className={styles.avtarChangeImageStyle}>
                              <AttachSingleFileV2
                                id={PATIENT_PROFILE_PIC}
                                register={register}
                                fileKey={PATIENT_PROFILE_PIC}
                                fileList={imageFiles}
                                validation={
                                  addPatientValidators[PATIENT_PROFILE_PIC]
                                }
                                readOnly={readOnly}
                              />

                              <Button
                                title="Delete"
                                type="button"
                                customClass={styles.deleteButtonStyle}
                                handleClick={handleDeleteImage}
                                disable={readOnly}
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className={styles.errorContainer}>
                      <span className={styles.extraSpan}></span>
                      {errors[PATIENT_PROFILE_PIC] && (
                        <p className="dashboardFormError">
                          {errors[PATIENT_PROFILE_PIC].message as any}
                        </p>
                      )}
                    </div>
                    <div className={styles.labelFieldFormLayout1}>
                      <label htmlFor={PATIENT_AGE} className={styles.labelText}>
                        Age<span className="asterickFormLayoutAge">*</span>
                      </label>
                      <div className={styles.fieldErrorContainer}>
                        <input
                          type="text"
                          className={
                            disable
                              ? styles.disableInputField
                              : styles.inputField
                          }
                          value={
                            age === 'NaNyr  NaNm  NaNd' ? '0yr 0m 0d' : age
                          }
                          disabled={true}
                        />
                      </div>
                    </div>
                    {/* <div className={styles.labelFieldFormLayout1}>
                      <label
                        htmlFor={PATIENT_SOURCE}
                        className={styles.labelText}
                      >
                        Source
                      </label>
                      <div className={styles.fieldSelectContainer}>
                        <select
                          disabled={readOnly}
                          className={
                            readOnly
                              ? styles.disableInputFields
                              : styles.selectInputField
                          }
                          {...register(PATIENT_SOURCE)}
                          placeholder="Select Source"
                        >
                          <option value="" selected disabled hidden>
                            Select Source
                          </option>
                          {patientSourceData[0]?.map((item: any, i: number) => {
                            return (
                              <React.Fragment key={i}>
                                <option
                                  value={item?.value}
                                  selected={
                                    item?.value ===
                                    patientDataObjectById[PATIENT_SOURCE]
                                  }
                                >
                                  {item?.value}
                                </option>
                              </React.Fragment>
                            );
                          })}
                        </select>
                      </div>
                    </div> */}
                    {/* <div className={styles.labelFieldFormLayout1}>
                      <label
                        htmlFor={PATIENT_OPENED_ON}
                        className={styles.labelText}
                      >
                        Opened On
                        <span className="asterickFormLayoutAge">*</span>
                      </label>
                      <div className={styles.fieldErrorContainer}>
                        <input
                          type="date"
                          className={
                            disable
                              ? styles.disableInputField
                              : styles.inputField
                          }
                          {...register(PATIENT_OPENED_ON)}
                          value={new Date().toISOString().substr(0, 10)}
                          disabled={true}
                        />
                      </div>
                    </div> */}
                  </div>
                </div>

                {showMoreFields && (
                  <>
                    <div className={styles.formStyleContainer}>
                      <div className={styles.formLayout}>
                        <div className={styles.labelField}>
                          <label
                            htmlFor={PATIENT_MOBILE_NO_2}
                            className={styles.labelText}
                          >
                            Mobile No. 2
                          </label>
                          <div className={styles.fieldErrorContainer}>
                            <PhoneInput
                              country={'kw'}
                              {...register(PATIENT_MOBILE_NO_2)}
                              value={getValues(PATIENT_MOBILE_NO_2)}
                              onChange={(phone) => {
                                const formattedPhone = phone && `+${phone}`
                                setValue(PATIENT_MOBILE_NO_2, formattedPhone)
                                trigger(PATIENT_MOBILE_NO_2)
                              }}
                              inputClass={styles.phoneNumberInput}
                              disabled={readOnly ? true : false}
                            />
                          </div>
                        </div>

                        <div className={styles.labelField}>
                          <label
                            htmlFor={PATIENT_AREA}
                            className={styles.labelText}
                          >
                            Area
                          </label>
                          <div className={styles.fieldErrorContainer}>
                            <input
                              readOnly={readOnly}
                              type="text"
                              placeholder="Enter address area"
                              className={
                                readOnly
                                  ? styles.disableInputFields
                                  : styles.inputField
                              }
                              {...register(PATIENT_AREA)}
                              onChange={(e) => trimValue(e)}
                            />
                          </div>
                        </div>

                        <div className={styles.labelField}>
                          <label
                            htmlFor={PATIENT_MARITAL_STATUS}
                            className={styles.labelText}
                          >
                            Marital Status
                          </label>
                          <div className={styles.fieldSelectContainer}>
                            <select
                              disabled={readOnly}
                              className={
                                readOnly
                                  ? styles.disableInputFields
                                  : styles.selectInputField
                              }
                              {...register(PATIENT_MARITAL_STATUS)}
                              placeholder="Select Marital Status"
                            >
                              <option value="" selected disabled hidden>
                                Select Marital Status
                              </option>
                              {patientMaritalStatusData[0]?.map(
                                (item: any, i: number) => {
                                  return (
                                    <React.Fragment key={i}>
                                      <option
                                        value={item?.value}
                                        selected={
                                          item?.value ===
                                          patientDataObjectById[
                                            PATIENT_MARITAL_STATUS
                                          ]
                                        }
                                      >
                                        {item?.value}
                                      </option>
                                    </React.Fragment>
                                  )
                                }
                              )}
                            </select>
                          </div>
                        </div>

                        <div className={styles.labelField}>
                          <label
                            htmlFor={PATIENT_EMAIL}
                            className={styles.labelText}
                          >
                            Email
                            {/* <span className="asterick">*</span> */}
                          </label>
                          <div className={styles.fieldErrorContainer}>
                            <input
                              type="text"
                              readOnly={readOnly}
                              // type="email"
                              placeholder="Enter patient email"
                              className={
                                readOnly
                                  ? styles.disableInputFields
                                  : styles.selectInputField
                              }
                              // {...register(
                              //   PATIENT_EMAIL
                              //    addPatientValidators[PATIENT_EMAIL]
                              // )}
                              {...register(PATIENT_EMAIL)}
                              onChange={(e) => trimValue(e)}
                            />
                            {/* <div className={styles.errorContainer}>
                              <span className={styles.extraSpan}></span>
                              {errors[PATIENT_EMAIL] && (
                                <p className="dashboardFormError">
                                  {errors[PATIENT_EMAIL].message as any}
                                </p>
                              )}
                            </div> */}
                          </div>
                        </div>
                        <div className={styles.labelField}>
                          <label
                            htmlFor={PATIENT_BLOODGROUP}
                            className={styles.labelText}
                          >
                            Blood Group
                          </label>
                          <div className={styles.fieldSelectContainer}>
                            <select
                              disabled={readOnly}
                              className={
                                readOnly
                                  ? styles.disableInputFields
                                  : styles.selectInputField
                              }
                              // className={styles.selectInputField}
                              {...register(PATIENT_BLOODGROUP)}
                              placeholder="Select BloodGroup"
                            >
                              <option value="" selected disabled hidden>
                                Select Blood Group
                              </option>
                              {patientBloodGroupData[0]?.map(
                                (item: any, i: number) => {
                                  return (
                                    <React.Fragment key={i}>
                                      <option
                                        value={item?.value}
                                        selected={
                                          item?.value ===
                                          patientDataObjectById[
                                            PATIENT_BLOODGROUP
                                          ]
                                        }
                                      >
                                        {item?.value}
                                      </option>
                                    </React.Fragment>
                                  )
                                }
                              )}
                            </select>
                          </div>
                        </div>
                        <div className={styles.labelField}>
                          <label
                            htmlFor={PATIENT_ALLERGIES}
                            className={styles.labelText}
                          >
                            Allergies
                          </label>
                          <div className={styles.fieldErrorContainer}>
                            <input
                              readOnly={readOnly}
                              type="text"
                              placeholder="Enter allergies name"
                              className={
                                readOnly
                                  ? styles.disableInputFields
                                  : styles.inputField
                              }
                              {...register(PATIENT_ALLERGIES)}
                              onChange={(e) => trimValue(e)}
                            />
                          </div>
                        </div>
                        <div className={styles.labelField}>
                          <label
                            htmlFor={PATIENT_OPENED_BY}
                            className={styles.labelText}
                          >
                            Opened By
                            <span className="asterick">*</span>
                          </label>
                          <div className={styles.fieldErrorContainer}>
                            <input
                              type="text"
                              className={
                                disable
                                  ? styles.disableInputField
                                  : styles.inputField
                              }
                              defaultValue={userLoginName}
                              disabled={true}
                            />
                            <div className={styles.errorContainer}>
                              <span className={styles.extraSpan}></span>
                              {errors[PATIENT_OPENED_BY] && (
                                <p className="dashboardFormError">
                                  {errors[PATIENT_OPENED_BY].message}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        {userRole === 'MC_ADMIN'
                          ? customTextField?.map((item: any, index: number) => {
                              if (index % 2 === 0) {
                                return (
                                  <InputTextfield
                                    customInputFieldClass={
                                      styles.disableInputFields
                                    }
                                    key={index}
                                    label={item?.label_name}
                                    onLabelChange={(e: any) => {
                                      trimValue(e)
                                      handleTextFieldChange(
                                        index,
                                        e.target.value
                                      )
                                    }}
                                    disabledLabelValue={
                                      item._id && labelNameDisable
                                    }
                                    disabledValue={true}
                                    // handleClick={() =>
                                    //   handleDeleteCustomField(index)
                                    // }
                                    handleClick={() => {
                                      setIsDeleteCustomField(true)
                                      setIdDeleteValue(item?.id)
                                    }}
                                    isIcon={
                                      item?._id && item?.label_slug
                                        ? false
                                        : true
                                    }
                                  />
                                )
                              }
                            })
                          : additionalData?.map((item: any, index: number) => {
                              if (index % 2 === 0) {
                                return (
                                  <React.Fragment key={index}>
                                    <div className={styles.labelField}>
                                      <label className={styles.labelText}>
                                        {item?.label_name}
                                      </label>
                                      <div
                                        className={styles.fieldErrorContainer}
                                      >
                                        <input
                                          type="text"
                                          className={styles.inputField}
                                          // {...register(
                                          //   `${PATIENT_ADDTIONAL_FIELDS}.${item?.label_slug}`
                                          // )}
                                          value={item?.value ?? ''}
                                          onChange={(e) => {
                                            trimValue(e)
                                            handleInputChange(
                                              index,
                                              e.target.value
                                            )
                                          }}
                                          disabled={readOnly}
                                        />
                                      </div>
                                    </div>
                                  </React.Fragment>
                                )
                              }
                            })}
                      </div>
                      <div className={styles.formLayout1}>
                        <div className={styles.labelFieldFormLayout1}>
                          <label
                            htmlFor={PATIENT_ADDRESS}
                            className={styles.labelText}
                          >
                            Address
                          </label>
                          <div className={styles.fieldErrorContainer}>
                            <input
                              readOnly={readOnly}
                              type="text"
                              placeholder="Enter patient address"
                              className={
                                readOnly
                                  ? styles.disableInputField
                                  : styles.inputField
                              }
                              {...register(PATIENT_ADDRESS)}
                              onChange={(e) => trimValue(e)}
                            />
                          </div>
                        </div>

                        <div className={styles.labelFieldFormLayout1}>
                          <label
                            htmlFor={PATIENT_ADDRESS_PINCODE}
                            className={styles.labelText}
                          >
                            PIN Code
                          </label>
                          <div className={styles.fieldErrorContainer}>
                            <input
                              type="number"
                              placeholder="Enter pin code"
                              readOnly={readOnly}
                              className={
                                readOnly
                                  ? styles.disableInputField
                                  : styles.inputField
                              }
                              {...register(PATIENT_ADDRESS_PINCODE)}
                              onChange={(e) => trimValue(e)}
                            />
                          </div>
                        </div>

                        <div className={styles.labelFieldFormLayout1}>
                          <label
                            htmlFor={PATIENT_MEDICAL_REMARK}
                            className={styles.labelText}
                          >
                            Medical Remark
                          </label>
                          <div className={styles.fieldErrorContainer}>
                            <input
                              type="text"
                              placeholder="Enter medical remark"
                              readOnly={readOnly}
                              className={
                                readOnly
                                  ? styles.disableInputField
                                  : styles.inputField
                              }
                              {...register(PATIENT_MEDICAL_REMARK)}
                              onChange={(e) => trimValue(e)}
                            />
                          </div>
                        </div>

                        <div className={styles.labelFieldFormLayout1}>
                          <label
                            htmlFor={PATIENT_FINANCIAL_REMARK}
                            className={styles.labelText}
                          >
                            Financial Remark
                          </label>
                          <div className={styles.fieldErrorContainer}>
                            <input
                              type="text"
                              placeholder="Enter financial remark"
                              readOnly={readOnly}
                              className={
                                readOnly
                                  ? styles.disableInputField
                                  : styles.inputField
                              }
                              {...register(PATIENT_FINANCIAL_REMARK)}
                              onChange={(e) => trimValue(e)}
                            />
                          </div>
                        </div>
                        <div className={styles.labelFieldFormLayout1}>
                          <label
                            htmlFor={PATIENT_SOURCE}
                            className={styles.labelText}
                          >
                            Source
                          </label>
                          <div className={styles.fieldSelectContainer}>
                            <select
                              disabled={readOnly}
                              className={
                                readOnly
                                  ? styles.disableInputFields
                                  : styles.selectInputField
                              }
                              {...register(PATIENT_SOURCE)}
                              placeholder="Select Source"
                            >
                              <option value="" selected disabled hidden>
                                Select Source
                              </option>
                              {patientSourceData[0]?.map(
                                (item: any, i: number) => {
                                  return (
                                    <React.Fragment key={i}>
                                      <option
                                        value={item?.value}
                                        selected={
                                          item?.value ===
                                          patientDataObjectById[PATIENT_SOURCE]
                                        }
                                      >
                                        {item?.value}
                                      </option>
                                    </React.Fragment>
                                  )
                                }
                              )}
                            </select>
                          </div>
                        </div>
                        <div className={styles.labelFieldFormLayout1}>
                          <label
                            htmlFor={PATIENT_OPENED_ON}
                            className={styles.labelText}
                          >
                            Branch Name
                            <span className="asterickFormLayoutAge">*</span>
                          </label>
                          <div className={styles.fieldErrorContainer}>
                            <input
                              type="text"
                              className={
                                disable
                                  ? styles.disableInputField
                                  : styles.inputField
                              }
                              value={branchName}
                              disabled={true}
                            />
                          </div>
                        </div>

                        <div className={styles.labelFieldFormLayout1}>
                          <label
                            htmlFor={PATIENT_OPENED_ON}
                            className={styles.labelText}
                          >
                            Opened On
                            <span className="asterickFormLayoutAge">*</span>
                          </label>
                          <div className={styles.fieldErrorContainer}>
                            <input
                              type="date"
                              className={
                                disable
                                  ? styles.disableInputField
                                  : styles.inputField
                              }
                              {...register(PATIENT_OPENED_ON)}
                              value={new Date().toISOString().substr(0, 10)}
                              disabled={true}
                            />
                          </div>
                        </div>

                        {userRole === 'MC_ADMIN'
                          ? customTextField?.map((item: any, index: number) => {
                              if (index % 2 !== 0) {
                                return (
                                  <InputTextfield
                                    customInputFieldClass={
                                      styles.disableInputFields
                                    }
                                    key={index}
                                    label={item?.label_name}
                                    onLabelChange={(e: any) => {
                                      trimValue(e)
                                      handleTextFieldChange(
                                        index,
                                        e.target.value
                                      )
                                    }}
                                    disabledLabelValue={
                                      item?._id && labelNameDisable
                                    }
                                    disabledValue={true}
                                    // handleClick={() =>
                                    //   handleDeleteCustomField(index)
                                    // }
                                    handleClick={() => {
                                      setIsDeleteCustomField(true)
                                      setIdDeleteValue(item?.id)
                                    }}
                                    isIcon={
                                      item?._id && item?.label_slug
                                        ? false
                                        : true
                                    }
                                  />
                                )
                              }
                            })
                          : additionalData?.map((item: any, index: number) => {
                              if (index % 2 !== 0) {
                                return (
                                  <>
                                    <div
                                      className={styles.labelFieldFormLayout1}
                                    >
                                      <label className={styles.labelText}>
                                        {item?.label_name}
                                      </label>
                                      <div
                                        className={styles.fieldErrorContainer}
                                      >
                                        <input
                                          type="text"
                                          className={styles.inputField}
                                          // {...register(
                                          //   `${PATIENT_ADDTIONAL_FIELDS}.${item?.label_slug}`
                                          // )}
                                          value={item?.value ?? ''}
                                          onChange={(e) => {
                                            trimValue(e)
                                            handleInputChange(
                                              index,
                                              e.target.value
                                            )
                                          }}
                                          disabled={readOnly}
                                        />
                                      </div>
                                    </div>
                                  </>
                                )
                              }
                            })}
                      </div>
                    </div>

                    {!patientDataObjectById?._id && userRole === 'MC_ADMIN' ? (
                      <>
                        <div className={styles.buttonContainer}>
                          <Button
                            title="Add Block"
                            type="button"
                            customClass={styles.buttonStyle}
                            handleClick={handleAddCustomField}
                          />

                          <Button
                            title="Edit label"
                            type="button"
                            customClass={styles.buttonStyle}
                            handleClick={handleEditLabel}
                          />
                          <Button
                            title="Submit"
                            type="button"
                            customClass={styles.buttonStyle}
                            handleClick={() => setIsConfirmationPopup(true)}
                            disable={isSubmitDisabled || isEmptyLabel}
                          />
                        </div>
                      </>
                    ) : (
                      ''
                    )}

                    <Divider customClass={styles.dividerStyling} />
                    <p className={styles.titleText}>Relative</p>
                    <div className={styles.formStyleContainer}>
                      <div className={styles.formLayout}>
                        <div className={styles.labelField}>
                          <label
                            htmlFor={PATIENT_RELATIVE_NAME}
                            className={styles.labelText}
                          >
                            Name
                          </label>
                          <div className={styles.fieldErrorContainer}>
                            <input
                              type="text"
                              placeholder="Enter relative name"
                              readOnly={readOnly}
                              className={
                                readOnly
                                  ? styles.disableInputField
                                  : styles.inputField
                              }
                              {...register(PATIENT_RELATIVE_NAME)}
                              onChange={(e) => trimValue(e)}
                            />
                          </div>
                        </div>

                        <div className={styles.labelField}>
                          <label
                            htmlFor={PATIENT_RELATIVE_RELATION}
                            className={styles.labelText}
                          >
                            Relation
                          </label>
                          <div className={styles.fieldErrorContainer}>
                            <input
                              type="text"
                              placeholder="Enter relative relation"
                              readOnly={readOnly}
                              className={
                                readOnly
                                  ? styles.disableInputField
                                  : styles.inputField
                              }
                              {...register(PATIENT_RELATIVE_RELATION)}
                              onChange={(e) => trimValue(e)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className={styles.formLayout1}>
                        <div className={styles.labelField}>
                          <label
                            htmlFor={PATIENT_RELATIVE_MOBILE}
                            className={styles.labelText}
                          >
                            Mobile
                          </label>
                          <div className={styles.fieldErrorContainer}>
                            <PhoneInput
                              country={'kw'}
                              {...register(PATIENT_RELATIVE_MOBILE)}
                              value={getValues(PATIENT_RELATIVE_MOBILE)}
                              onChange={(phone) => {
                                const formattedPhone = phone && `+${phone}`
                                setValue(
                                  PATIENT_RELATIVE_MOBILE,
                                  formattedPhone
                                )
                                trigger(PATIENT_RELATIVE_MOBILE)
                              }}
                              inputClass={styles.phoneNumberInput}
                              disabled={readOnly ? true : false}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                <div>
                  <span className={styles.dividerStyleContainer}>
                    <Divider customClass={styles.dividerStyle} />
                    <span
                      className={styles.formFieldMoreContainer}
                      onClick={() => {
                        handleMoreFields()
                      }}
                    >
                      {!showMoreFields ? (
                        <>
                          <p className={styles.dividerText}>More</p>
                          <DropDownIcon
                            fillColor="#797979"
                            customClass={styles.dropDownIcon}
                          />
                        </>
                      ) : (
                        <>
                          <p className={styles.dividerText}>Less</p>
                          <DropDownArrowIcon
                            fillColor="#797979"
                            customClass={styles.dropDownIcon}
                          />
                        </>
                      )}
                    </span>
                    <Divider customClass={styles.dividerStyle} />
                  </span>
                </div>
              </div>
              <div className={styles.patientGraphLayout}>
                <div className={styles.patientChartContainer}>
                  <div className={styles.dueAmountStyle}>
                    Due: $
                    {patientDataObjectById?.outstanding_amount?.toFixed(3) ?? 0}
                  </div>
                  <div className={styles.advanceDueAmountStyle}>
                    Advance Due: $
                    {patientDataObjectById?.advance_amount?.toFixed(3) ?? 0}
                  </div>
                </div>
                <div className={styles.medicalHistory}>
                  <MedicalHistory
                    handleViewHistory={handleViewHistory}
                    handleRecentHistory={handleRecentHistory}
                    showOption={showOption}
                    setShowOption={setShowOption}
                  />
                </div>

                <Timeline
                  handleImageUpload={(id: any) => {
                    setImagePopup(true)
                    setImgDiagnosisId(id)
                  }}
                  handleDocumentUpload={(id: any) => {
                    setDocumentPopup(true)
                    setDocumentDiagnosisId(id)
                  }}
                  handleScribeNotes={(id: any) => {
                    setScribeNotes(!scribeNotes)
                    setScribeNotesId(id)
                  }}
                  handleScribeImages={(id: any) => {
                    setScribeImages(!scribeImages)
                    setScribeImagesId(id)
                  }}
                  handleViewAll={
                    () => {
                      setShowPatientHistory(!showPatientHistory)
                      // handlePatientHistoryModalOpen();
                    }
                    // handleClick={handlePatientHistoryModalOpen}
                  }
                  handleDiagnosisLink={(appointment: any) => {
                    setShowDiagnosisLink(!showDiagnosisLink)
                    setDiagnosisId(appointment)
                  }}
                  handleYearNode={(index: any) => {
                    setAppointmentYear(index)
                    setShowAppointmentPopup(!showAppointmentPopup)
                  }}
                  imagePopup={imagePopup}
                  documentPopup={documentPopup}
                  scribeNotes={scribeNotes}
                  scribeImages={scribeImages}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.mainContainerFormActionSidebar}>
          <div className={styles.sidebarData}>
            {/* conditional */}
            {readOnly
              ? formActionData?.map((item: any, index: any) => {
                  return (
                    <React.Fragment key={index}>
                      <div className={styles.iconStyleContainer} key={index}>
                        {patientDataObjectById?.is_active === true ||
                        !patientDataObjectById?._id ? (
                          <>
                            {item?.id === 2 ? (
                              <div
                                className={styles.iconStyleContainer}
                                key={index}
                              >
                                <item.icon
                                  customClass={styles.iconStyle}
                                  fillColor={
                                    index !== formActionValue
                                      ? '#CDD4D8'
                                      : '#3D96E7'
                                  }
                                  mouseEnter={() => setFormActionValue(index)}
                                  mouseLeave={() => setFormActionValue(-1)}
                                />
                              </div>
                            ) : item?.id === 1 &&
                              item?.handleOnClick === true ? (
                              <button
                                style={{
                                  border: 'none',
                                  background: 'white',
                                  padding: '0px',
                                  width: '10px',
                                  marginBottom: '0px',
                                }}
                                type="button"
                              >
                                <div
                                  className={styles.iconStyleContainer}
                                  key={index}
                                >
                                  <item.icon
                                    customClass={styles.iconStyle}
                                    fillColor={
                                      index !== formActionValue
                                        ? '#CDD4D8'
                                        : '#3D96E7'
                                    }
                                    mouseEnter={() => setFormActionValue(index)}
                                    mouseLeave={() => setFormActionValue(-1)}
                                  />
                                </div>
                              </button>
                            ) : userRole === 'MC_ADMIN' && item?.id === 0 ? (
                              <div
                                className={styles.iconStyleContainer}
                                key={index}
                                onClick={handleAdd}
                              >
                                <item.icon
                                  customClass={styles.iconStyle}
                                  fillColor={
                                    index !== formActionValue
                                      ? '#CDD4D8'
                                      : '#3D96E7'
                                  }
                                  mouseEnter={() => setFormActionValue(index)}
                                  mouseLeave={() => setFormActionValue(-1)}
                                />
                              </div>
                            ) : (
                              <div
                                className={styles.iconStyleContainer}
                                key={index}
                              >
                                <item.icon
                                  customClass={styles.iconStyle}
                                  fillColor={
                                    index !== formActionValue
                                      ? '#CDD4D8'
                                      : '#3D96E7'
                                  }
                                  mouseEnter={() => setFormActionValue(index)}
                                  mouseLeave={() => setFormActionValue(-1)}
                                />
                              </div>
                            )}
                          </>
                        ) : (
                          <>
                            {userRole === 'MC_ADMIN' && item?.id === 2 ? (
                              <div
                                className={styles.iconStyleContainer}
                                key={index}
                                onClick={handdleEmrRecordReActive}
                              >
                                <RewokeIcon
                                  customClass={styles.rewokeIconStyle}
                                  fillColor={
                                    index !== formActionValue
                                      ? '#CDD4D8'
                                      : '#3D96E7'
                                  }
                                  mouseEnter={() => setFormActionValue(index)}
                                  mouseLeave={() => setFormActionValue(-1)}
                                />
                              </div>
                            ) : item?.id === 1 &&
                              item?.handleOnClick === true ? (
                              <button
                                style={{
                                  border: 'none',
                                  background: 'white',
                                  padding: '0px',
                                  width: '10px',
                                  marginBottom: '0px',
                                }}
                                type="button"
                              >
                                <div
                                  className={styles.iconStyleContainer}
                                  key={index}
                                >
                                  <item.icon
                                    customClass={styles.iconStyle}
                                    fillColor={
                                      index !== formActionValue
                                        ? '#CDD4D8'
                                        : '#3D96E7'
                                    }
                                    mouseEnter={() => setFormActionValue(index)}
                                    mouseLeave={() => setFormActionValue(-1)}
                                  />
                                </div>
                              </button>
                            ) : userRole === 'MC_ADMIN' && item?.id === 0 ? (
                              <div
                                className={styles.iconStyleContainer}
                                key={index}
                                onClick={handleAdd}
                              >
                                <item.icon
                                  customClass={styles.iconStyle}
                                  fillColor={
                                    index !== formActionValue
                                      ? '#CDD4D8'
                                      : '#3D96E7'
                                  }
                                  mouseEnter={() => setFormActionValue(index)}
                                  mouseLeave={() => setFormActionValue(-1)}
                                />
                              </div>
                            ) : (
                              <div
                                className={styles.iconStyleContainer}
                                key={index}
                              >
                                <item.icon
                                  customClass={styles.iconStyle}
                                  fillColor={
                                    index !== formActionValue
                                      ? '#CDD4D8'
                                      : '#3D96E7'
                                  }
                                  mouseEnter={() => setFormActionValue(index)}
                                  mouseLeave={() => setFormActionValue(-1)}
                                />
                              </div>
                            )}
                          </>
                        )}
                        <p className={styles.tooltiptext}>
                          {item?.id === 0 ||
                          item?.id === 1 ||
                          item?.id === 3 ||
                          item?.id === 4 ||
                          item?.id === 5
                            ? item?.name
                            : patientDataObjectById?.is_active === true &&
                              item?.id === 2
                            ? 'Delete'
                            : patientDataObjectById?.is_active === false &&
                              item?.id === 2
                            ? 'Rewoke'
                            : !patientDataObjectById?._id && item?.id === 2
                            ? 'Delete'
                            : ''}
                        </p>
                      </div>
                    </React.Fragment>
                  )
                })
              : formActionData?.map((item: any, index: any) => {
                  return (
                    <React.Fragment key={index}>
                      {item?.id === 1 && item?.handleOnClick === true ? (
                        <button
                          onClick={() => {
                            trigger(PATIENT_PROFILE_PIC)
                          }}
                          style={{
                            border: 'none',
                            background: 'none',
                            padding: '0px',
                            width: '10px',
                            marginBottom: '10px',
                          }}
                          type="submit"
                        >
                          <div
                            className={
                              readOnly
                                ? styles.iconStyleContainer
                                : styles.iconStyleContainerReceptionist
                            }
                            key={index}
                          >
                            <item.icon
                              customClass={styles.iconStyle}
                              fillColor={
                                index !== formActionValue
                                  ? '#CDD4D8'
                                  : '#3D96E7'
                              }
                              mouseEnter={() => setFormActionValue(index)}
                              mouseLeave={() => setFormActionValue(-1)}
                            />
                            <p className={styles.tooltiptext}>{item.name}</p>
                          </div>
                        </button>
                      ) : patientDataObjectById?._id &&
                        item?.id === 2 &&
                        item?.handleOnClick === true ? (
                        <div
                          className={
                            readOnly
                              ? styles.iconStyleContainer
                              : styles.iconStyleContainerReceptionist
                          }
                          key={index}
                          onClick={handdleEmrRecordDelete}
                        >
                          <item.icon
                            customClass={styles.iconStyle}
                            fillColor={
                              index !== formActionValue ? '#CDD4D8' : '#3D96E7'
                            }
                            mouseEnter={() => setFormActionValue(index)}
                            mouseLeave={() => setFormActionValue(-1)}
                          />
                          <p className={styles.tooltiptext}>{item.name}</p>
                        </div>
                      ) : item?.id === 0 ? (
                        <div
                          // className={styles.iconStyleContainer}
                          className={
                            readOnly
                              ? styles.iconStyleContainer
                              : styles.iconStyleContainerReceptionist
                          }
                          key={index}
                          onClick={handleAdd}
                        >
                          <item.icon
                            customClass={styles.iconStyle}
                            fillColor={
                              index !== formActionValue ? '#CDD4D8' : '#3D96E7'
                            }
                            mouseEnter={() => setFormActionValue(index)}
                            mouseLeave={() => setFormActionValue(-1)}
                          />
                          <p className={styles.tooltiptext}>{item.name}</p>
                        </div>
                      ) : (
                        <div
                          className={
                            readOnly
                              ? styles.iconStyleContainer
                              : styles.iconStyleContainerReceptionist
                          }
                          key={index}
                        >
                          <item.icon
                            customClass={styles.iconStyle}
                            fillColor={
                              index !== formActionValue ? '#CDD4D8' : '#3D96E7'
                            }
                            mouseEnter={() => setFormActionValue(index)}
                            mouseLeave={() => setFormActionValue(-1)}
                          />
                          <p className={styles.tooltiptext}>{item.name}</p>
                        </div>
                      )}
                    </React.Fragment>
                  )
                })}
          </div>
        </div>
      </form>
    </>
  )
}

export default PatientEmrDashboard

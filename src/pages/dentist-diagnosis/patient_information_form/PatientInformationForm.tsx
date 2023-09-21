import { FC, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Select from 'react-select'
import { DropdownIndicator } from '../../../components/common/dropdown-indicator/DropdownIndicator'
import Button from '../../../components/common/button/Button'
import Popup from '../../../components/common/popup/Popup'
import PatientHistoryModal from '../patient_history_modal/PatientHistoryModal'
import ViewHistoryPopup from '../../../components/common/modal/view-history-popup/ViewHistoryPopup'
import TagsListModal from '../../../components/common/modal/tags_list_modal/TagsListModal'
import MedicationModal from '../../../components/common/modal/medication-modal/MedicationModal'
import PatientHistoryNotesModal from '../../../components/common/modal/patient-history-notes-modal/PatientHistoryNotesModal'
import ViewDocumentsModal from '../../../components/common/modal/view-documents-modal/ViewDocumentsModal'
import ImageZoomInOutModal from '../../../components/common/modal/image-zoom-in-out-modal/ImageZoomInOutModal'
import ImageViewerModal from '../../../components/common/modal/image-viewer-modal/ImageViewerModal'
import DocumentsViewerModal from '../../../components/common/modal/documents-viewer-modal/DocumentsViewerModal'
import DiagnosisModal from '../../../components/common/modal/diagnosis_modal/DiagnosisModal'
import ViewAllAttachmentsModal from '../../../components/common/modal/viewAll-attachments-modal/ViewAllAttachmentsModal'
import ViewAllImagesModal from '../../../components/common/modal/viewAll-images-modal/ViewAllImagesModal'
import moment from 'moment'
import {
  FILE_NO,
  PATIENT_STATUS,
  PATIENT_NAME,
  PATIENT_GENDER,
  PATIENT_AGE,
  PATIENT_ATTENDED_BY,
  PATIENT_LAST_APPT_DATE,
  PATIENT_APPT_NOTE,
} from '../../../constants/patientInformationConstant'
import { patientInformationValidators } from '../../../form-validators/patientInformationValidators'
import { IPatientInformationForm } from '../../../interfaces/patientInformationInterfaces'
import { medicationModalHeaderData } from '../../../constants/table-data/medicationModalTableData'
import { attachmentsModalHeaderData } from '../../../constants/table-data/attachmentsModalTableData'
import { imagesModalHeaderData } from '../../../constants/table-data/imagesModalTableData'
import { viewAllAttachmentsModalHeaderData } from '../../../constants/table-data/viewAllAttachmentsTableData'
import { viewAllImagesHeaderData } from '../../../constants/table-data/viewAllImagesTableData'
import { viewAllDocumentsList } from './patientInformationDummyData'
import styles from './patientInformationForm.module.scss'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { useLocation, useNavigate } from 'react-router'
import { requestGenerator } from '../../../utils/payloadGenerator'
import {
  changePatientDiaogStatus,
  getPatientAttachmentsById,
  getPatientDiagnosisDetailById,
  getPatientImagesById,
  getPatientDentalInformationById,
} from '../../../redux/features/patient-history/patientHistoryAsyncActions'
import { getPatientEmrById } from '../../../redux/features/patient-emr/patient/patientAsyncAction'
import {
  clearPatientAttachmentsData,
  clearPatientCompareImagesData,
  clearPatientData,
  clearPatientDiagnosisDetailData,
  clearPatientHistoryData,
  clearPatientImagesData,
} from '../../../redux/features/patient-history/patientHistorySlice'
import Loader from '../../../components/common/spinner/Loader'
import { getCompareDocumentsById } from '../../../redux/features/patient-history/patientHistoryAsyncActions'
import CompareModal from '../../../components/common/modal/compare-modal/CompareModal'
import CompareDocModal from '../../../components/common/modal/compare-modal/compare-docs/CompareDocs'
import avatar from '../../../assets/images/Default Image.png'
import AddInsuranceModal from '../../../components/common/modal/add-insurance-modal/AddInsuranceModal'
import DescriptionDataModal from '../../../components/common/modal/description-data-Modal/DescriptionDataModal'
import SelectImage from '../../../assets/images/Default Image.png'

const PatientInformationForm: FC = () => {
  // Define state variables
  const [showPatientHistoryModal, setShowPatientHistoryModal] =
    useState<boolean>(false)
  const [showMedicalHistoryModal, setShowMedicalHistoryModal] =
    useState<boolean>(false)
  const [showSymptomsModal, setShowSymptomsModal] = useState<boolean>(false)
  const [symptomsPopupData, setSymptomsPopupData] = useState<any>({})
  const [showMedicationModal, setShowMedicationModal] = useState<boolean>(false)
  const [medicationPopupData, setMedicationPopupData] = useState<any>({})
  const [showPatientHistoryNotesModal, setShowPatientHistoryNotesModal] =
    useState<boolean>(false)
  const [patientHistoryNotesPopupData, setPatientHistoryNotes] = useState<any>(
    {}
  )
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
  const [showDianosisModal, setShowDianosisModal] = useState<boolean>(false)
  const [diagnosisPopupData, setDiagnosisPopupData] = useState<any>({})
  const [showDianosisScribeNotesModal, setShowDianosisScribeNotesModal] =
    useState<boolean>(false)
  const [diagnosisScribeNotesPopupData, setDiagnosisScribeNotesPopupData] =
    useState<any>('')
  const [showDianosisScribeImageModal, setShowDianosisScribeImageModal] =
    useState<boolean>(false)
  const [diagnosisScribeImagePopupData, setDiagnosisScribeImagePopupData] =
    useState<any>('')
  const [showViewAllAttachementsModal, setShowViewAllAttachementsModal] =
    useState<boolean>(false)
  const [viewAllAttchmentnsPopupData, setViewAllAttchmentnsPopupData] =
    useState<any>({})
  const [showAttachmentsNotesModal, setShowAttachmentsNotesModal] =
    useState<boolean>(false)
  const [attachmentnsNotesPopupData, setAttachmentnsNotesPopupData] =
    useState<any>({})
  const [showViewAllImagesModal, setShowViewAllImagesModal] =
    useState<boolean>(false)
  const [viewAllImagesPopupData, setViewAllImagesPopupData] = useState<any>({})
  useState<any>('')
  const [showImagesNotesModal, setShowImagesNotesModal] =
    useState<boolean>(false)
  const [imagesNotesPopupData, setImagesNotesPopupData] = useState<any>({})
  useState<any>('')
  const [patientStatus, setPatientStatus] = useState([])
  const [compareImagesModal, setCompareImageModal] = useState<boolean>(false)
  const [singleCompareImageModal, setSingleCompareImageModal] =
    useState<boolean>(false)
  const [compareImageModalPopupData, setCompareImageModalPopupData] =
    useState<any>('')
  const [compareDocsModal, setCompareDocsModal] = useState<boolean>(false)
  const [singleCompareDocumentModal, setSingleCompareDocumentModal] =
    useState<boolean>(false)
  const [compareDocsModalPopupData, setCompareDocModalPopupData] =
    useState<any>('')
  const [showViewAllSingleImageModal, setShowViewAllSingleImageModal] =
    useState<boolean>(false)
  const [viewAllSingleImagePopupData, setViewAllSingleImagePopupData] =
    useState<any>('')
  const [
    showViewAllSingleAttachmentModal,
    setShowViewAllSingleAttachmentModal,
  ] = useState<boolean>(false)
  const [
    viewAllSingleAttachmentPopupData,
    setViewAllSingleAttachmentPopupData,
  ] = useState<any>('')
  const state = useLocation().state
  const dispatch = useAppDispatch()

  const { patientFormData, isLoading, selectedDocForCompare } = useAppSelector(
    (state) => state.patientHistory
  )

  const { masterValueData } = useAppSelector((state) => state.login)
  useEffect(() => {
    if (state?.user) {
      dispatch(
        getPatientDentalInformationById(
          requestGenerator({
            appointment_id: state?.user?._id,
            patient_id: state?.user?.patient_id,
          })
        )
      )
    }
  }, [state?.user])
  // React Hook form for the form handling
  const {
    register,
    reset,
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = useForm<IPatientInformationForm>({})

  // const status = watch(PATIENT_STATUS);
  // console.log("status", status);

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

  // funtion for handling patient history modal
  const handlePatientHistoryModalOpen = () => {
    setShowPatientHistoryModal((prevState) => !prevState)
  }

  const handlePatientHistoryModalClose = () => {
    setShowPatientHistoryModal((prevState) => !prevState)
    dispatch(clearPatientHistoryData())
  }

  // funtion for handling medical history modal
  const handleMedicalHistoryModalOpen = () => {
    setShowMedicalHistoryModal((prevState) => !prevState)
  }

  const handleMedicalHistoryModalClose = () => {
    setShowMedicalHistoryModal((prevState) => !prevState)
  }

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
          // console.log("result :>> ", result.payload);
          setImagesPopupData(imagesData)
          setShowImagesModal((prevState) => !prevState)
        }
      )
    }
  }

  const imagesModalClose = () => {
    dispatch(clearPatientImagesData())
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

  const navigate = useNavigate()

  // function for handling View All Attachments modal
  const viewAllAttachmentsModalOpen = (item: any) => {
    const viewAllAttachments = { viewAllDocumentsList }
    setViewAllAttchmentnsPopupData(viewAllAttachments)
    setShowViewAllAttachementsModal((prevState) => !prevState)
  }

  const viewAllAttachmentsModalClose = () => {
    setViewAllAttchmentnsPopupData({})
    setShowViewAllAttachementsModal((prevState) => !prevState)
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

  // function for handling Attachments notes modal
  const attachmentsNotesModalOpen = (item: any) => {
    const attachmentNotesData = {
      diag_note: item?.diag_note,
      diag_apt_date: item?.date,
    }
    setAttachmentnsNotesPopupData(attachmentNotesData)
    setShowAttachmentsNotesModal((prevState) => !prevState)
  }

  const attachmentsNotesModalClose = () => {
    setAttachmentnsNotesPopupData({})
    setShowAttachmentsNotesModal((prevState) => !prevState)
  }

  // function for handling View All Images modal
  const viewAllImagesModalOpen = (item: any) => {
    const viewAllImages = { viewAllDocumentsList }
    setViewAllImagesPopupData(viewAllImages)
    setShowViewAllImagesModal((prevState) => !prevState)
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
    // console.log("item", item);
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

  // Editing set form data
  useEffect(() => {
    if (patientFormData?.[FILE_NO]) {
      reset(patientFormData)
      let last_data = patientFormData?.last_apt_date
        ? moment(patientFormData?.last_apt_date).format('DD MMM YYYY')
        : ''
      setValue(PATIENT_LAST_APPT_DATE, last_data)
      let status: any = {
        label: patientFormData?.patient_status_value || '',
        value: patientFormData?.patient_status_id || '',
      }

      status.value
        ? setValue(PATIENT_STATUS, status)
        : setValue(PATIENT_STATUS, patientStatus[0])
    }
  }, [reset, patientFormData])

  useEffect(() => {
    if (masterValueData && masterValueData.length > 0) {
      const statusArray = masterValueData
        ?.find((item: any) => item.category_name === 'DIAGNOSIS_STATUS')
        ?.values?.map((item: any) => {
          return {
            label: item?.value,
            value: item?._id,
          }
        })
      setPatientStatus(statusArray)
    } else {
      setPatientStatus([])
    }
  }, [masterValueData])
  const handleEmrRecord = () => {
    let dataPayload = {
      id: patientFormData?.patient_id,
    }
    dispatch(getPatientEmrById(requestGenerator(dataPayload))).then((e) => {
      if (e.type === 'patient/getPatientEmrById/fulfilled') {
        navigate('/patientemr')
      }
    })
  }
  const [showInsuranceModal, setShowInsuranceModal] = useState<boolean>(false)
  const [insuranceModalData, setInsuranceModalData] = useState<any>({})
  const [showDescriptionModal, setShowDescriptionModal] =
    useState<boolean>(false)
  const [descriptionPopupData, setDescriptionPopupData] = useState<any>({})
  const [showNotesModal, setShowNotesModal] = useState<boolean>(false)
  const [notesPopupData, setNotesPopupData] = useState<any>({})

  // handleInsurancePopup
  const handleInsurancePopup = () => {
    setShowInsuranceModal(!showInsuranceModal)
    setInsuranceModalData(patientFormData)
  }
  //Insurance modale close
  const handleInsuranceModalClose = () => {
    setShowInsuranceModal(!showInsuranceModal)
    setInsuranceModalData({})
  }

  const descriptionModalClose = () => {
    setDescriptionPopupData({})
    setShowDescriptionModal((prevState) => !prevState)
  }

  const handleDescriptionModalOpen = (item: any) => {
    const payload = {
      description: item?.details,
    }
    setShowDescriptionModal(!showDescriptionModal)
    setDescriptionPopupData(payload)
  }

  const notesModalClose = () => {
    setNotesPopupData({})
    setShowNotesModal((prevState) => !prevState)
  }

  const handleNotesModalOpen = (item: any) => {
    const payload = {
      description: item?.notes,
    }
    setShowNotesModal(!showNotesModal)
    setNotesPopupData(payload)
  }

  useEffect(() => {
    return () => {
      dispatch(clearPatientData())
    }
  }, [])


  return (
    <>
      {isLoading && <Loader />}
      {showPatientHistoryModal && (
        <Popup
          Children={PatientHistoryModal}
          handleClose={handlePatientHistoryModalClose}
          handleOpen={handlePatientHistoryViewBtn}
        />
      )}
      {showMedicalHistoryModal && (
        <Popup
          Children={ViewHistoryPopup}
          handleClose={handleMedicalHistoryModalClose}
        />
      )}
      {showSymptomsModal && (
        <Popup
          Children={TagsListModal}
          handleClose={symptomsModalClose}
          popData={symptomsPopupData}
          heading={'Symptoms'}
        />
      )}
      {showMedicationModal && (
        <Popup
          Children={MedicationModal}
          handleClose={medicationModalClose}
          popData={medicationPopupData}
          heading={'Medication'}
          headerData={medicationModalHeaderData}
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
      {showDianosisScribeNotesModal && (
        <Popup
          Children={ImageViewerModal}
          handleClose={diagnosisScribeNotesModalClose}
          popData={diagnosisScribeNotesPopupData}
        />
      )}
      {showDianosisScribeImageModal && (
        <Popup
          Children={ImageZoomInOutModal}
          handleClose={diagnosisScribeImageModalClose}
          popData={diagnosisScribeImagePopupData}
        />
      )}
      {showViewAllAttachementsModal && (
        <Popup
          Children={ViewAllAttachmentsModal}
          handleClose={viewAllAttachmentsModalClose}
          heading={'Attachments'}
          popData={viewAllAttchmentnsPopupData}
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
      {showAttachmentsNotesModal && (
        <Popup
          Children={PatientHistoryNotesModal}
          handleClose={attachmentsNotesModalClose}
          popData={attachmentnsNotesPopupData}
          heading={'Notes'}
        />
      )}
      {showViewAllImagesModal && (
        <Popup
          Children={ViewAllImagesModal}
          handleClose={viewAllImagesModalClose}
          heading={'Images'}
          popData={viewAllImagesPopupData}
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

      {showInsuranceModal && (
        <Popup
          Children={AddInsuranceModal}
          popData={insuranceModalData}
          handleClose={() => handleInsuranceModalClose()}
          setModelOpenClose={setShowInsuranceModal}
          handleOpen={handleDescriptionModalOpen}
          handleNotesPreview={handleNotesModalOpen}
        />
      )}
      {showDescriptionModal && (
        <Popup
          Children={DescriptionDataModal}
          handleClose={descriptionModalClose}
          popData={descriptionPopupData}
          heading={'Description'}
        />
      )}

      {showNotesModal && (
        <Popup
          Children={DescriptionDataModal}
          handleClose={notesModalClose}
          popData={notesPopupData}
          heading={'Notes'}
        />
      )}

      <div className={styles.mainContainer}>
        <div className={styles.patientFormContainer}>
          <div className={styles.formSectionOne}>
            <div className={styles.inputFieldContainer}>
              <label htmlFor={FILE_NO} className={styles.formLabel}>
                File No.
                <span className="asterick">*</span>
              </label>
              <input
                type="text"
                className={styles.inputField}
                {...register(FILE_NO)}
                placeholder="File No."
                // value={"RD356985"}
                disabled
              />
              <p
                className={styles.patientEMRLink}
                onClick={() => handleEmrRecord()}
              >
                EMR
              </p>
            </div>
            <div className={styles.inputFieldContainer}>
              <label htmlFor={PATIENT_NAME} className={styles.formLabel}>
                Patient Name
                <span className="asterick">*</span>
              </label>
              <input
                type="text"
                className={styles.inputField}
                {...register(PATIENT_NAME)}
                // value={"Andrew Davidson"}
                placeholder="Patient Name"
                disabled
              />
            </div>
            <div className={styles.inputFieldContainer}>
              <label htmlFor={PATIENT_AGE} className={styles.formLabel}>
                Age
                <span className="asterick">*</span>
              </label>
              <input
                type="text"
                className={styles.inputField}
                {...register(PATIENT_AGE)}
                // value={"45"}
                placeholder="Age"
                disabled
              />
            </div>
            <div className={styles.inputFieldContainer}>
              <label
                htmlFor={PATIENT_LAST_APPT_DATE}
                className={styles.formLabel}
              >
                Last Appt. Date
                <span className="asterick">*</span>
              </label>
              <input
                type="text"
                className={styles.inputField}
                {...register(PATIENT_LAST_APPT_DATE)}
                // value={"25 April 2023"}
                placeholder="Last Appt. Date"
                disabled
              />
            </div>
          </div>
          <div className={styles.formSectionTwo}>
            <div className={styles.inputFieldContainer}>
              <label htmlFor={PATIENT_STATUS} className={styles.formLabel}>
                Status
                <span className="asterick">*</span>
              </label>
              <Select
                className={styles.selectInputField}
                placeholder="Select Status"
                closeMenuOnSelect={true}
                components={{ DropdownIndicator }}
                {...register(
                  PATIENT_STATUS,
                  patientInformationValidators[PATIENT_STATUS]
                )}
                value={watch(PATIENT_STATUS) || []}
                isSearchable={false}
                options={patientStatus}
                onChange={(e: any) => {
                  dispatch(
                    changePatientDiaogStatus(
                      requestGenerator({
                        appointment_id: patientFormData?.apt_id,
                        patient_status: e.value,
                      })
                    )
                  )
                  setValue(PATIENT_STATUS, e)
                  trigger(PATIENT_STATUS)
                }}
                maxMenuHeight={200}
              />
            </div>
            <div className={styles.radioFieldContainer}>
              <label htmlFor={PATIENT_GENDER} className={styles.radioFormLabel}>
                Gender
                <span className="asterick">*</span>
              </label>
              <div className={styles.radioBtnContainer}>
                <label htmlFor="male" className={styles.radioLabel}>
                  <input
                    className={styles.radioInput}
                    type="radio"
                    id="male"
                    value="MALE"
                    {...register(PATIENT_GENDER)}
                    disabled
                  />
                  <span className={styles.customRadio} />
                  Male
                </label>
                <label htmlFor="female" className={styles.radioLabel}>
                  <input
                    className={styles.radioInput}
                    type="radio"
                    id="female"
                    value="FEMALE"
                    {...register(PATIENT_GENDER)}
                    disabled
                  />
                  <span className={styles.customRadio} />
                  Female
                </label>
              </div>
            </div>
            <div className={styles.inputFieldContainer}>
              <label htmlFor={PATIENT_ATTENDED_BY} className={styles.formLabel}>
                Attended By
                <span className="asterick">*</span>
              </label>
              <input
                type="text"
                className={styles.inputField}
                {...register(PATIENT_ATTENDED_BY)}
                // value={"Dr. Davidson Andrew"}
                placeholder="Doctor Name"
                disabled
              />
            </div>
            <div className={styles.inputFieldContainer}>
              <label htmlFor={PATIENT_ATTENDED_BY} className={styles.formLabel}>
                Description
                {/* <span className="asterick">*</span> */}
              </label>
              <textarea
                className={styles.inputField}
                {...register(PATIENT_APPT_NOTE)}
                // value={"Dr. Davidson Andrew"}
                placeholder="Problem Description"
                disabled
              />
            </div>
            {/* <div className={styles.inputFieldContainer}>
              <label htmlFor={'file_no'} className={styles.formLabel}></label>
              <div className={styles.extraInputField} />
            </div> */}
          </div>
          <div className={styles.formSectionThree}>
            <div className={styles.patienProfileImgDiv}>
              <img
                className={styles.patientProfileImg}
                src={
                  patientFormData?.patient_img
                    ? patientFormData?.patient_img
                    : SelectImage
                }
                alt="profile_img"
              />
            </div>
          </div>
        </div>
        <div className={styles.patientFormBtnTagContainer}>
          <div className={styles.patientBtnContainer}>
            <Button
              title="Patient History"
              type="button"
              handleClick={handlePatientHistoryModalOpen}
            />
            <Button
              title="Medical History"
              type="button"
              handleClick={handleMedicalHistoryModalOpen}
            />
            <Button title="Create Case IPD" type="button" />
            <Button
              title="Insurance"
              type="button"
              handleClick={handleInsurancePopup}
            />
          </div>
          <div className={styles.patientTagContainer}>
            {patientFormData &&
              patientFormData?.tags &&
              patientFormData?.tags?.length > 0 &&
              patientFormData?.tags?.map((item: any, index: number) => {
                return (
                  item?.label_icon ?  <img
                    src={item?.label_icon}
                    alt="tag_img"
                    className={styles.tagImage}
                    key={`${index}-tagimage`}
                  />:''
                )
              })}
          </div>
        </div>
      </div>
    </>
  )
}

export default PatientInformationForm

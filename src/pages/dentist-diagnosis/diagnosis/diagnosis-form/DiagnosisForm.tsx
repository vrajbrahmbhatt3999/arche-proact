import React, { FC, useEffect, useState } from 'react'
import styles from './diagnosisForm.module.scss'
import { useNavigate } from 'react-router-dom'
import Select, { components } from 'react-select'
import { Controller, useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../../../hooks'
import { searchableSelectStyle, trimValue } from '../../../../utils/utils'
import Button from '../../../../components/common/button/Button'
import {
  DropDownArrowIcon,
  DropDownIcon,
  RemoveTagCloseIcon,
  ScribeIcon,
  SearchIcon,
  TypeIcon,
} from '../../../../components/common/svg-components'
import { requestGenerator } from '../../../../utils/payloadGenerator'
import imageAttachment from '../../../../assets/images/imageAttachment.png'
import ScribeDialog from '../scribe-dialog/ScribeDialog'
import {
  clearScricedata,
  createScribesImagesAtEdit,
  createScribesNotesAtEdit,
  removeScribeImagesData,
  removeScribeNotesData,
} from '../../../../redux/features/dentist-diagnosis/dentistDiagnosisSlice'
import Popup from '../../../../components/common/popup/Popup'
import ScribeImageAndNotesPreviewDialog from '../scribe-image-and-notes-preview-dialog/ScribeImageAndNotesPreviewDialog'
import {
  DIAGNOSIS_LABEL_NAME,
  MAIN_COMPLAINT_LABEL_NAME,
} from '../../../../constants/constant'
import { doctorDiagnosisValidators } from '../../../../form-validators/doctorDiagnosisValidators'
import {
  createDentalDiagnosisAction,
  getDiagnosisSearchTags,
  getDentalDiagnosisByIdAction,
  updateDentalDiagnosisAction,
} from '../../../../redux/features/dentist-diagnosis/dentistDiagnosisAsyncActions'
import Loader from '../../../../components/common/spinner/Loader'
import { GET_DENTAL_DIAGNOSIS } from '../../../../constants/asyncActionsType'
import { clearPatientDiagnosisDetailData } from '../../../../redux/features/patient-history/patientHistorySlice'

interface IDiagnosisForm {}

const DiagnosisForm: FC<IDiagnosisForm> = () => {
  /* Dependency to navigate between pages */
  const navigate = useNavigate()
  /* Dependency to navigate between pages */
  /* Dependency to dispatch an action */
  const dispatch = useAppDispatch()
  /* Dependency to dispatch an action */

  const {
    scribeImagesArr,
    scribeNotesArr,
    diagnosisSearchTagData,
    createdDiagnosisId,
    isLoading,
    diagnosisDetails,
  } = useAppSelector((state) => state.dentistDiagnosis)

  // const filterScribeData = scribeNotesArr;
  // console.log(filterScribeData, 'scribe')

  const { masterValueData } = useAppSelector((state) => state.login)
  const { patientFormData } = useAppSelector((state) => state.patientHistory)

  /* Dependencies for select list */
  const [selectedSymptomsArr, setSelectedSymptomsArr] = useState<any>([])
  const [mainComplaints, setMainComplaints] = useState<any>([])
  /* Dependencies for select list */

  /* Dependencies for default image attachment */
  const [defaultNoAttachmentArr] = useState([
    {
      id: 1,
      imageUrl: imageAttachment,
      isImageFilled: false,
    },
    {
      id: 2,
      imageUrl: imageAttachment,
      isImageFilled: false,
    },
    {
      id: 3,
      imageUrl: imageAttachment,
      isImageFilled: false,
    },
  ])

  /* Dependencies for default image attachment */

  /* Form submission dependencies */
  const { control, handleSubmit, formState, setValue, reset } = useForm({
    mode: 'all',
  })
  const { errors } = formState

  /* Form submission dependencies */
  /* Dialog dependencies */
  const [showScribeDialog, setShowScribeDialog] = useState<boolean>(false)
  const [selectedScribeDetails, setSelectedScribeDetails] = useState<any>()
  const [
    showScribeImagesAndNotesPreviewDialog,
    setShowScribeImagesAndNotesPreviewDialog,
  ] = useState<boolean>(false)
  /* Dialog dependencies */

  /* Function to generate unique id */
  function uniqueID() {
    return Math.floor(Math.random() * Date.now())
  }
  /* Function to generate unique id */

  const getAndSetMainComplaintsDropdown=()=>{
    masterValueData.forEach((_data: any) => {
      if(_data.category_name === 'DENTAL_DIAGNOSIS_MAIN_COMPLAINT') {
        const refactoredComplaints = _data.values.map((_elem: any) => {
          return {
            value: _elem._id,
            label: _elem.value,
          }
        })
        setMainComplaints(refactoredComplaints)
        if(diagnosisDetails && diagnosisDetails._id){
          let found:any =refactoredComplaints.find((itm:any)=>itm.value === diagnosisDetails.diag_main_complaint);
          setValue('mainComplaint',found);
        }
      }
    })
  }

  /* Initial API call for select list */
  useEffect(() => {
    getAndSetMainComplaintsDropdown();
    /* API call - Select list for main complaints */
  }, [])
  /* Initial API call for select list */


  /* Temporary data for symptoms */
  const [symptoms, setSymptoms] = useState<any>([])
  /* Temporary data for symptoms */

  /* ***** Symptom Tag searchable select dependencies ***** */
  /* On Select option - push element in symptoms array */
  const handleSymptomsChanged = (option: any, event: any) => {
    const filteredSymptoms = symptoms.filter((elem: any) => {
      return elem.label !== option.label
    })
    setSymptoms(filteredSymptoms)
    setSelectedSymptomsArr((prevValue: any) => [...prevValue, { ...option }])
    setValue('symptomsTag', null)
  }
  /* On Select option - push element in symptoms array */

  /* On enter press add a new symptom - push element in symptom array */
  const handleKeyDown = (e: any) => {
    if (e.target.value === '') {
      return
    }
    if (e.key === 'Enter') {
      const dataToBeSent = {
        tag_name: e.target.value,
        is_new: true, //
      }
      dispatch(getDiagnosisSearchTags(requestGenerator(dataToBeSent)))

      const isExistingVal = selectedSymptomsArr.some(
        (_element: any) => _element.label === e.target.value
      )

      if (!isExistingVal) {
        const newVal = {
          value: uniqueID(),
          label: e.target.value,
          isSelected: true,
          isRemovable: true,
        }

        setSelectedSymptomsArr((prevValue: any) => [
          ...prevValue,
          { ...newVal },
        ])
      }

      setValue('symptomsTag', '')
    } else {
      const dataToBeSent = {
        tag_name: e.target.value, //
      }
      dispatch(getDiagnosisSearchTags(requestGenerator(dataToBeSent)))

      if (
        diagnosisSearchTagData &&
        diagnosisSearchTagData !== null &&
        diagnosisSearchTagData !== undefined &&
        Array.isArray(diagnosisSearchTagData) &&
        diagnosisSearchTagData.length
      ) {
        const refactoredDiagnosisSearchTagData = diagnosisSearchTagData?.map(
          (_data: any) => {
            return {
              value: uniqueID(),
              label: _data.tag_name,
            }
          }
        )
        setSymptoms(refactoredDiagnosisSearchTagData)
      }
    }
  }
  /* On enter press add a new symptom - push element in symptom array */

  /* When symptoms are clicked they turn green color and are selected */
  const handleSelectSymptom = (_element: any, e: any) => {
    const newSelectedSymptomsArr = [...selectedSymptomsArr]
    const index = newSelectedSymptomsArr.findIndex(
      (elem) => elem.value === _element.value
    )
    if (newSelectedSymptomsArr[index].isSelected === false) {
      newSelectedSymptomsArr[index].isSelected = true
    } else if (newSelectedSymptomsArr[index].isSelected === true) {
      newSelectedSymptomsArr[index].isSelected = false
    }
    setSelectedSymptomsArr([...newSelectedSymptomsArr])
  }
  /* When symptoms are clicked they turn green color and are selected */

  const handleSelectSymptomFromServer = (_element: any, e: any) => {
    const newElement = {
      ..._element,
      isSelected: true,
      isRemovable: false,
    }
    const isAlreadyPresent = selectedSymptomsArr.some(
      (elem: any) => elem.label === _element.label
    )
    if (!isAlreadyPresent)
      setSelectedSymptomsArr((prevValue: any) => [
        ...prevValue,
        { ...newElement },
      ])
  }

  /* Removing a symptom which is added through enter key press */
  const handleRemoveTag = (_element: any) => {
    const filteredSelectedSymptomsArr = selectedSymptomsArr?.filter(
      (elem: any) => {
        return elem.value !== _element.value
      }
    )
    setSelectedSymptomsArr(filteredSelectedSymptomsArr)
  }
  /* Removing a symptom which is added through enter key press */

  /* ***** Symptom Tag searchable select dependencies ***** */

  /* Scribe dialog dependencies - Dialog Open  */
  const handleScribeDialogOpen = () => {
    setShowScribeDialog(true)
  }
  /* Scribe dialog dependencies - Dialog Open  */

  /* Scribe dialog dependencies - Dialog Close  */
  const handleScribeDialogClose = () => {
    setShowScribeDialog(false)
  }
  /* Scribe dialog dependencies - Dialog Close  */

  /* Scribe dialog dependencies - Dialog Open  */
  const handleScribeImagesAndNotesPreviewDialogOpen = (_element: any) => {
    setSelectedScribeDetails(_element)
    setShowScribeImagesAndNotesPreviewDialog(true)
  }
  /* Scribe dialog dependencies - Dialog Open  */

  /* Scribe dialog dependencies - Dialog Close  */
  const handleScribeImagesAndNotesPreviewDialogClose = () => {
    setShowScribeImagesAndNotesPreviewDialog(false)
    setSelectedScribeDetails(null)
  }
  /* Scribe dialog dependencies - Dialog Close  */
  const onSubmit = (formData: any) => {
    const scribed_notes = scribeNotesArr?.map((_element: any) => {
      return {
        name: _element.imageName,
        data_uri: _element.imageUrl,
      }
    })

    const scribed_images = scribeImagesArr?.map((_element: any, index: any) => {
      return {
        name: _element?.imageName ? _element?.imageName : `file-${index}`,
        category: _element?.category?.value ?? '',
        data_uri: _element?.imageUrl,
      }
    })

    const appointment_id = patientFormData?.apt_id

    const dataToBeSent =
      createdDiagnosisId?.length > 0
        ? {
            diagnosis_id: createdDiagnosisId,
            appointment_id,
            main_complaint: formData.mainComplaint.value,
            diagnosis_description: formData.diagnosis,
            diagnosis_note: formData.notes,
            scribed_notes:
              scribed_notes && scribed_notes?.length <= 3 ? scribed_notes : [],
            scribed_images:
              scribed_images && scribed_images?.length <= 3
                ? scribed_images
                : [],
            symptom_tags:
              selectedSymptomsArr
                .filter((elem: any) => elem.isSelected !== false)
                .map((elem: any) => elem.label) || [],
          }
        : patientFormData?.diag_id
        ? {
            diagnosis_id: patientFormData?.diag_id,
            appointment_id,
            main_complaint: formData.mainComplaint.value,
            diagnosis_description: formData.diagnosis,
            diagnosis_note: formData.notes,
            scribed_notes:
              scribed_notes && scribed_notes?.length <= 3 ? scribed_notes : [],
            scribed_images:
              scribed_images && scribed_images?.length <= 3
                ? scribed_images
                : [],
            symptom_tags:
              selectedSymptomsArr
                .filter((elem: any) => elem.isSelected !== false)
                .map((elem: any) => elem.label) || [],
          }
        : {
            appointment_id,
            main_complaint: formData.mainComplaint.value,
            diagnosis_description: formData.diagnosis,
            diagnosis_note: formData.notes,
            scribed_notes: scribed_notes || [], // do not add above condition here
            scribed_images: scribed_images || [], // do not add above condition here
            symptom_tags:
              selectedSymptomsArr
                .filter((elem: any) => elem.isSelected !== false)
                .map((elem: any) => elem.label) || [],
          }
    createdDiagnosisId?.length > 0 || patientFormData?.diag_id
      ? dispatch(
          updateDentalDiagnosisAction(requestGenerator(dataToBeSent))
        ).then((e: any) => {
          if (e.type === 'dentalDiagnosis/updateDentalDiagnosis/fulfilled') {
            navigate('/patientdentaldiagnosis/treatment')
          }
        })
      : dispatch(
          createDentalDiagnosisAction(requestGenerator(dataToBeSent))
        ).then((e: any) => {
          if (e.type === 'dentalDiagnosis/createDentalDiagnosis/fulfilled') {
            navigate('/patientdentaldiagnosis/treatment')
          }
        })
  }
  useEffect(() => {
    const payloadData = {
      diagnosis_id: patientFormData?.diag_id
        ? patientFormData?.diag_id
        : createdDiagnosisId?.length > 0
        ? createdDiagnosisId
        : '',
    }
    payloadData?.diagnosis_id &&
      dispatch(
        getDentalDiagnosisByIdAction(requestGenerator(payloadData))
      ).then((e) => {
        if (e.type === `${GET_DENTAL_DIAGNOSIS}/fulfilled`) {
          let arr: any[] = []
          if (e.payload.diag_symptom_tags) {
            for (let tag of e.payload.diag_symptom_tags) {
              const newVal = {
                value: tag,
                label: tag,
                isSelected: true,
                isRemovable: true,
              }
              arr.push(newVal)
            }
            setSelectedSymptomsArr((prevValue: any) => [...prevValue, ...arr])
          }
          if (e.payload.scribe_notes && e.payload.scribe_notes.length > 0) {
            let tempArr = e.payload.scribe_notes?.map((item: any) => {
              const dataToBeSent = {
                id: item?.scribe_id,
                imageUrl: item?.path,
              }
              return dataToBeSent
            })
            dispatch(createScribesNotesAtEdit(tempArr))
          }
          if (e.payload.scribe_images && e.payload.scribe_images.length) {
            let tempArr = e.payload.scribe_images?.map((item: any) => {
              const dataToBeSent = {
                id: item?.scribe_id,
                imageUrl: item?.path,
              }
              return dataToBeSent
            })
            dispatch(createScribesImagesAtEdit(tempArr))
          }
          reset();
          setValue('diagnosis', diagnosisDetails?.diag_desc)
          setValue('notes', diagnosisDetails?.diag_note)
          getAndSetMainComplaintsDropdown(); 
        }
      })
  }, [patientFormData?.diag_id])
 
  //get all symptom tags

  useEffect(() => {
    const dataToBeSent = {
      tag_name: 'a', //
    }
    dispatch(getDiagnosisSearchTags(requestGenerator(dataToBeSent)))
  }, [])

  useEffect(() => {
    return () => {
      dispatch(clearScricedata())
      dispatch(clearPatientDiagnosisDetailData())
    }
  }, [])

  useEffect(() => {
    if (
      diagnosisSearchTagData &&
      diagnosisSearchTagData !== null &&
      diagnosisSearchTagData !== undefined &&
      Array.isArray(diagnosisSearchTagData) &&
      diagnosisSearchTagData.length
    ) {
      const refactoredDiagnosisSearchTagData = diagnosisSearchTagData?.map(
        (_data: any) => {
          return {
            value: uniqueID(),
            label: _data.tag_name,
          }
        }
      )
      setSymptoms(refactoredDiagnosisSearchTagData)
    }
  }, [diagnosisSearchTagData])

  return (
    <>
      {isLoading && <Loader />}
      <main className={styles.mainContainer}>
        <form
          className={styles.wrapper}
          onSubmit={handleSubmit(onSubmit)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') e.preventDefault()
          }}
        >
          {/* Main container */}
          <div className={styles.inputWrapper}>
            <label className={styles.inputWrapperLabel}>
              Main Complaint<span className="asterick">*</span>
            </label>
            <div className="common-input-wrapper__searchable-select">
              {
                <Controller
                  name="mainComplaint"
                  control={control}
                  render={({ field }) => (
                    <Select
                      options={mainComplaints}
                      value={field.value}
                      onChange={(option: any) => {
                        return field.onChange(option)
                      }}
                      components={{ DropdownIndicator }}
                      isClearable={true}
                      backspaceRemovesValue={true}
                      styles={searchableSelectStyle}
                      placeholder="Main Complaint"
                    />
                  )}
                  rules={{ required: true }}
                />
              }
              <div className="common-input-wrapper__error-container">
                {errors[MAIN_COMPLAINT_LABEL_NAME] && (
                  <p className="dashboardFormError">
                    {
                      doctorDiagnosisValidators[MAIN_COMPLAINT_LABEL_NAME]
                        .required
                    }
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className={styles.inputWrapper}>
            <label className={styles.inputWrapperLabel}>
              Diagnosis{' '}
            </label>
            <div className={styles.textareaWrapper}>
              <Controller
                name="diagnosis"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    className={styles.textarea}
                    value={field.value?.trimLeft()}
                    onChange={(e) => {
                      return field.onChange(e.target.value.trimLeft())
                    }}
                    data-diagnosis
                    placeholder="Enter Diagnosis"
                  />
                )} 
              />
              
            </div>
            <div className={styles.diagnosis_icons}>
              <TypeIcon />
              <ScribeIcon handleClick={handleScribeDialogOpen} />
            </div>
          </div>

          <div className={styles.inputWrapper}>
            <label className={styles.inputWrapperLabelCentered}>
              Scribed Notes
            </label>
            <div className={styles.scribeAttachments}>
              {scribeNotesArr?.length === 0
                ? defaultNoAttachmentArr.map((_element: any) => {
                    return (
                      <div
                        className={styles.scribeSingleAttachmentWrapper}
                        key={_element.id}
                      >
                        <div className={styles.scribeSingleAttachment}>
                          <img src={_element.imageUrl} alt="" />
                        </div>
                      </div>
                    )
                  })
                : scribeNotesArr.map((_element: any) => {
                    return (
                      <div
                        className={styles.scribeSingleAttachmentWrapper}
                        key={_element.id}
                      >
                        <div
                          className={styles.scribeSingleAttachment}
                          onClick={() =>
                            handleScribeImagesAndNotesPreviewDialogOpen(
                              _element
                            )
                          }
                        >
                          <img src={_element.imageUrl} alt="" />
                        </div>
                        <div
                          className={styles.closeIconContainer}
                          onClick={() =>
                            dispatch(removeScribeNotesData(_element))
                          }
                        >
                          <RemoveTagCloseIcon fillColor="#02BF90" />
                        </div>
                      </div>
                    )
                  })}
            </div>
          </div>

          <div className={styles.inputWrapper}>
            <label className={styles.inputWrapperLabelCentered}>
              Scribed Images
            </label>
            <div className={styles.scribeAttachments}>
              {!scribeImagesArr ||
              scribeImagesArr === undefined ||
              scribeImagesArr === '' ||
              scribeImagesArr === null ||
              scribeImagesArr?.length === 0
                ? defaultNoAttachmentArr.map((_element: any) => {
                    return (
                      <div
                        className={styles.scribeSingleAttachmentWrapper}
                        key={_element.id}
                      >
                        <div className={styles.scribeSingleAttachment}>
                          <img src={_element.imageUrl} alt="" />
                        </div>
                      </div>
                    )
                  })
                : scribeImagesArr.map((_element: any) => {
                    return (
                      <div
                        className={styles.scribeSingleAttachmentWrapper}
                        key={_element.id}
                      >
                        <div
                          className={styles.scribeSingleAttachment}
                          onClick={() =>
                            handleScribeImagesAndNotesPreviewDialogOpen(
                              _element
                            )
                          }
                        >
                          <img src={_element.imageUrl} alt="" />
                        </div>
                        <div
                          className={styles.closeIconContainer}
                          onClick={() =>
                            dispatch(removeScribeImagesData(_element))
                          }
                        >
                          <RemoveTagCloseIcon fillColor="#02BF90" />
                        </div>
                      </div>
                    )
                  })}
            </div>
          </div>

          <div className={styles.inputWrapper}>
            <label className={styles.inputWrapperLabel}>Notes</label>
            <div className={styles.textareaWrapper}>
              <Controller
                name="notes"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    className={styles.textarea}
                    data-notes
                    value={field.value?.trimLeft()}
                    onChange={(e) => {
                      return field.onChange(e.target.value.trimLeft())
                    }}
                    placeholder="Enter Notes"
                  />
                )}
              />
            </div>
          </div>

          {/* Symptom tags input */}
          <div className={styles.symptomTagsContainer}>
            <div className={styles.inputWrapperForSearchBar}>
              <label className={styles.inputWrapperLabelCentered}>
                Symptoms Tag
              </label>
              <Controller
                name="symptomsTag"
                control={control}
                render={({ field }) => {
                  return (
                    <div className={styles.symptomTagsInputWrapper}>
                      <div className={styles.searchIconContainerForSymptomsTag}>
                        <SearchIcon fillColor="#797979" />
                      </div>
                      <input
                        {...field}
                        className={styles.symptomsTagInput}
                        onKeyDown={handleKeyDown}
                        value={field.value}
                        onChange={(e) => {
                          return field.onChange(trimValue(e))
                        }}
                      />
                    </div>
                  )
                }}
              />
            </div>
            <div className={styles.inputWrapper}>
              <div className={styles.symptomTags}>
                {symptoms?.map((_element: any) => {
                  return (
                    <div className={styles.symptomsWrapper}>
                      <div
                        className={styles.symptoms}
                        onClick={(e) =>
                          handleSelectSymptomFromServer(_element, e)
                        }
                      >
                        <div className={styles.symptomLabel}>
                          {_element?.label}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            {Array.isArray(selectedSymptomsArr) &&
              selectedSymptomsArr.length !== 0 && (
                <div className={styles.inputWrapper}>
                  <div></div>
                  <hr
                    style={{
                      width: '682px',
                      textAlign: 'center',
                      border: '1px solid lightgray',
                      margin: 0,
                      padding: 0,
                      opacity: 0.5,
                    }}
                  />
                  <div></div>
                </div>
              )}
            <div className={styles.inputWrapper}>
              <div className={styles.symptomTags}>
                {selectedSymptomsArr?.map((_element: any, id: number) => {
                  return (
                    <React.Fragment key={id}>
                      <div className={styles.symptomsWrapper}>
                        <div
                          style={{
                            backgroundColor:
                              _element?.isSelected === true
                                ? '#02BF90'
                                : '#FFFFFF',
                          }}
                          className={styles.symptoms}
                          onClick={(e) => handleSelectSymptom(_element, e)}
                        >
                          <div
                            style={{
                              color:
                                _element?.isSelected === true
                                  ? '#FFFFFF'
                                  : '#8D94A7',
                            }}
                            className={styles.symptomLabel}
                          >
                            {_element?.label}
                          </div>
                        </div>
                        {_element?.isRemovable === true && (
                          <div
                            className={styles.closeIcon}
                            onClick={() => handleRemoveTag(_element)}
                          >
                            <RemoveTagCloseIcon fillColor="red" />
                          </div>
                        )}
                      </div>
                    </React.Fragment>
                  )
                })}
              </div>
            </div>
          </div>
          {/* Symptom tags input */}

          <div className={styles.buttonContainer}>
            <Button title="Save & Next" type="submit" />
          </div>
          {/* Main container */}
        </form>
      </main>

      {/* Scribe Dialog Dependencies */}
      {showScribeDialog === true && (
        <ScribeDialog
          handleClose={handleScribeDialogClose}
          setScribeDropdownShow={true}
        />
      )}
      {/* Scribe Dialog Dependencies */}

      {/* Scribe Image And Notes Preview Dialog */}
      {showScribeImagesAndNotesPreviewDialog === true && (
        <Popup
          Children={ScribeImageAndNotesPreviewDialog}
          handleClose={handleScribeImagesAndNotesPreviewDialogClose}
          popData={selectedScribeDetails}
        />
      )}
      {/* Scribe Image And Notes Preview Dialog */}
    </>
  )
}

export default DiagnosisForm

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

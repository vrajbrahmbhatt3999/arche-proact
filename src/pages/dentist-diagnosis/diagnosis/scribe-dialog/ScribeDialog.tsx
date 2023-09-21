import React, { FC, useEffect, useRef, useState } from 'react'
import styles from './scribeDialog.module.scss'
import Select from 'react-select'
import { useNavigate } from 'react-router-dom'
import { useForm, useController, Controller } from 'react-hook-form'
import { components } from 'react-select'
import { useDispatch } from 'react-redux'
import {
  CloseIcon,
  DropDownArrowIcon,
  DropDownIcon,
} from '../../../../components/common/svg-components'
import { useAppDispatch, useAppSelector } from '../../../../hooks'
import { colors } from '../../../../constants/color'
import Divider from '../../../../components/common/divider/Divider'
import { searchableSelectStyle, uniqueID } from '../../../../utils/utils'
// import DrawingBoardReact from "react-drawing-board";
import {
  addScribeData,
  updateScribeData,
} from '../../../../redux/features/dentist-diagnosis/dentistDiagnosisSlice'
import { doctorDiagnosisValidators } from '../../../../form-validators/doctorDiagnosisValidators'
import { CATEGORY_LABEL_NAME } from '../../../../constants/constant'
import Canvas from '../canvas/Canvas'

interface IScribeDialog {
  handleGetDataUrl?: any
  handleClose?: any
  setScribeDropdownShow?: boolean
  customClassContainer?: any
  customClassCanvasContainer?: any
}

const ScribeDialog: FC<IScribeDialog> = ({
  handleClose,
  handleGetDataUrl,
  setScribeDropdownShow,
  customClassContainer,
  customClassCanvasContainer,
}) => {
  /* Dependency to navigate between pages */
  // const navigate = useNavigate()
  /* Dependency to navigate between pages */

  const uploadRef: any = useRef(null)

  /* Dependency to dispatch an action */
  const dispatch = useAppDispatch()
  /* Dependency to dispatch an action */

  const canvasRef = useRef<any>(null)
  const contextRef = useRef<any>(null)
  // const { userData } = useAppSelector((state) => state.login)
  const { masterValueData } = useAppSelector((state) => state.login)
  const [imageSrc, setImageSrc] = useState<string>('')

  /* Form submission dependencies */
  const { control, formState, watch, trigger } = useForm({
    mode: 'all',
  })
  const { errors, dirtyFields } = formState
  const form = watch()
  /* Form submission dependencies */

  /* Drawing board dependencies */
  // const [drawingBoardOperations, setDrawingBoardOperations] = useState([])
  const [isScribeImage, setIsScribeImage] = useState(false)
  // const [idForImageUrl, setIdForImageUrl] = useState<number>(1)
  /* Drawing board dependencies */

  /* Dependencies for searchable select */
  const [scribeTypes, setScribeTypes] = useState([
    {
      value: 1,
      label: 'Scribe Notes',
    },
    {
      value: 2,
      label: 'Scribe Images',
    },
  ])
  const [categories, setCategories] = useState([])
  /* Dependencies for searchable select */

  /* Initial API call for select list */
  useEffect(() => {
    masterValueData.forEach((_data: any) => {
      if (_data.category_name === 'DOCUMENT_CATEGORY') {
        const refactoredCategories = _data.values.map((_elem: any) => {
          return {
            value: _elem._id,
            label: _elem.value,
          }
        })
        setCategories(refactoredCategories)
      }
    })

    contextRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    )
    setImageSrc('')
    /* API call - Select list for document category */
  }, [])
  /* Initial API call for select list */

  /* On Scribe type changed set Show Image ToolBar - searchable select */
  const handleOnScribeTypesChange = (option: any) => {
    if (option.value === 1) {
      setIsScribeImage(false)
    } else {
      setIsScribeImage(true)
    }

    contextRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    )
    setImageSrc('')
  }

  const handleScribbleChange = () => {
    contextRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    )
    setImageSrc('')
  }
  /* On Scribe type changed set Show Image ToolBar - searchable select */

  /* On Image submit handler */
  const onSubmit = async (dataUrl: any) => {
    await trigger('category')
    await trigger('imageName')
    const { category, imageName } = form

    /* If fields are empty then don't allow to submit */
    if (isScribeImage) {
      let tempIsSubmitDisabled = true
      if (!errors && !dirtyFields) {
        tempIsSubmitDisabled = false
      } else if (
        category &&
        category !== undefined &&
        category !== null &&
        category !== '' &&
        imageName &&
        imageName !== undefined &&
        imageName !== null &&
        imageName !== ''
      ) {
        tempIsSubmitDisabled = false
      }

      if (tempIsSubmitDisabled) {
        return
      }
    }
    /* If fields are empty then don't allow to submit */

    const dataToBeSent = {
      id: uniqueID(),
      category,
      imageName,
      imageUrl: dataUrl,
      isScribeImage: isScribeImage,
    }
    handleClose()
    dispatch(addScribeData(dataToBeSent))
    dispatch(updateScribeData(dataToBeSent))
  }
  /* On Image submit handler */

  return (
    <>
      {/* Scribe Dialog */}
      <div className="dialog" onClick={handleClose}>
        <div
          className={[styles.mainContainer, customClassContainer].join(' ')}
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
            <span className={styles.title}>Scribe</span>
            <Divider customClass={styles.dividerStyle} />
          </header>

          {/* <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles.formContainer}
          > */}
          <section className={styles.sectionContainer}>
            <div className={styles.inputContainer}>
              <div className="common-input-wrapper">
                {setScribeDropdownShow === true && (
                  <>
                    <label className="common-input-wrapper__label">
                      Scribe
                    </label>
                    <div className="common-input-wrapper__searchable-select">
                      {
                        <Controller
                          name="scribe"
                          control={control}
                          render={({ field }) => (
                            <Select
                              options={scribeTypes}
                              defaultValue={scribeTypes[0]}
                              value={field.value}
                              onChange={(option: any) => {
                                handleOnScribeTypesChange(option)
                                return field.onChange(option)
                              }}
                              placeholder="Scribe Type"
                              components={{ DropdownIndicator }}
                              styles={searchableSelectStyle}
                            />
                          )}
                          rules={{ required: true }}
                        />
                      }
                    </div>
                  </>
                )}
              </div>
              {isScribeImage && (
                <>
                  <div className="common-input-wrapper">
                    <label className="common-input-wrapper__label">
                      Category<span className="asterick">*</span>
                    </label>
                    <div className="common-input-wrapper__searchable-select">
                      {
                        <Controller
                          name="category"
                          control={control}
                          render={({ field }) => (
                            <Select
                              options={categories}
                              value={field.value}
                              onChange={(option: any) => {
                                return (
                                  field.onChange(option), handleScribbleChange()
                                )
                              }}
                              placeholder="Category"
                              components={{ DropdownIndicator }}
                              styles={searchableSelectStyle}
                            />
                          )}
                          rules={{ required: true }}
                        />
                      }
                    </div>
                    <div className="common-input-wrapper__error-container">
                      {errors[CATEGORY_LABEL_NAME] && (
                        <p className="dashboardFormError">
                          {
                            doctorDiagnosisValidators[CATEGORY_LABEL_NAME]
                              .required
                          }
                        </p>
                      )}
                    </div>
                  </div>
                  <div className={styles.uploadButtonContainer}>
                    <button onClick={() => uploadRef?.current?.click()}>
                      Upload
                    </button>
                  </div>
                  <div className="common-input-wrapper">
                    <label className="common-input-wrapper__label">
                      Image Name<span className="asterick">*</span>
                    </label>
                    <Controller
                      name="imageName"
                      control={control}
                      render={({ field }) => (
                        <>
                          <input
                            {...field}
                            type="text"
                            className="common-input-wrapper__input"
                          />
                        </>
                      )}
                      rules={{ required: true }}
                    />
                    <div className="common-input-wrapper__error-container">
                      {errors?.imageName && (
                        <p className="dashboardFormError">
                          Please Enter Image Name
                        </p>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className={styles.canvasContainer} data-hidden={isScribeImage}>
              <Canvas
                buttonRef={uploadRef}
                onSubmit={onSubmit}
                canvasRef={canvasRef}
                contextRef={contextRef}
                imageSrc={imageSrc}
                setImageSrc={setImageSrc}
              />
            </div>
            <div className={styles.buttonContainer} />
          </section>
        </div>
      </div>
      {/* Scribe Dialog */}
    </>
  )
}
export default ScribeDialog

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

import { FC, useEffect } from 'react'
import styles from './scribeNotesPopup.module.scss'
import { CloseIcon } from '../../svg-components'
import { colors } from '../../../../constants/color'
import Divider from '../../divider/Divider'
import { useAppDispatch, useAppSelector } from '../../../../hooks'
import { getAllDiagnosisScribeNote } from '../../../../redux/features/diagnosis/diagnosisAsyncActions'
import { requestGenerator } from '../../../../utils/payloadGenerator'
import Loader from '../../spinner/Loader'

interface IScribeNotes {
  handleClose?: any
  handleNotesPreview?: any
  popData?: any
}

const ScribeNotesPopup: FC<IScribeNotes> = ({
  handleClose,
  handleNotesPreview,
  popData,
}) => {
  const dispatch = useAppDispatch()
  const { isLoading, diagnosisScribeNotesData } = useAppSelector(
    (state) => state.diagnosis
  )

  useEffect(() => {
    let data = {
      // diagnosis_id: "646e0979dafb09722afde19f",
      diagnosis_id: popData.length > 0 && popData,
    }
    dispatch(getAllDiagnosisScribeNote(requestGenerator(data)))
  }, [])

  return (
    <>
      {isLoading && <Loader />}
      <div
        className={styles.mainContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <CloseIcon
          customClass={styles.closeIconStyle}
          fillColor={colors.green1}
          handleClick={handleClose}
        />
        <div className={styles.uploadContainer}>
          <p className={styles.title}>Scribed Notes</p>
          <Divider customClass={styles.dividerStyle} />
          <div className={styles.imageContainer}>
            {diagnosisScribeNotesData.length > 0 ? (
              diagnosisScribeNotesData.map((item: any, index: number) => {
                return (
                  <>
                    <div
                      className={styles.img}
                      onClick={() => handleNotesPreview(item)}
                      key={`${index}-i`}
                    >
                      <img
                        src={item?.path}
                        alt="scribe_notes"
                        key={index}
                        className={styles.imageStyle}
                      />
                      <div className={styles.overlayContainer}>
                        <span className={styles.previewText}>Preview</span>
                      </div>
                    </div>
                  </>
                )
              })
            ) : (
              <p className={styles.noData}>No scribe notes found</p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default ScribeNotesPopup

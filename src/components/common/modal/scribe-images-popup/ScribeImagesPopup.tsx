import { FC, useEffect } from 'react'
import styles from './scribeImagesPopup.module.scss'
import { CloseIcon } from '../../svg-components'
import { colors } from '../../../../constants/color'
import Divider from '../../divider/Divider'
import { useAppDispatch, useAppSelector } from '../../../../hooks'
import { requestGenerator } from '../../../../utils/payloadGenerator'
import { getAllDiagnosisScribeImage } from '../../../../redux/features/diagnosis/diagnosisAsyncActions'
import Loader from '../../spinner/Loader'

interface IScribeImages {
  handleClose?: any
  handleImagesPreview?: any
  popData?: any
}

const ScribeImagesPopup: FC<IScribeImages> = ({
  handleClose,
  handleImagesPreview,
  popData,
}) => {
  const dispatch = useAppDispatch()
  const { isLoading, diagnosisScribeImagesData } = useAppSelector(
    (state) => state.diagnosis
  )

  useEffect(() => {
    let data = {
      // diagnosis_id: "646e0979dafb09722afde19f",
      diagnosis_id: popData.length > 0 && popData,
    }
    dispatch(getAllDiagnosisScribeImage(requestGenerator(data)))
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
          <p className={styles.title}>Scribed Images</p>
          <Divider customClass={styles.dividerStyle} />
          <div className={styles.imageContainer}>
            {diagnosisScribeImagesData.length > 0 ? (
              diagnosisScribeImagesData.map((item: any, index: number) => {
                return (
                  <div
                    className={styles.img}
                    onClick={() => handleImagesPreview(item)}
                    key={index}
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
                )
              })
            ) : (
              <p className={styles.noData}>No scribe images found</p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default ScribeImagesPopup

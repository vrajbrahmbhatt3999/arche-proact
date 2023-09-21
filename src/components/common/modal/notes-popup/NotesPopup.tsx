import { FC, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { colors } from '../../../../constants/color'
import { useAppDispatch } from '../../../../hooks'
import { utcToDate } from '../../../../utils/utils'
import Divider from '../../divider/Divider'
import { CloseIcon } from '../../svg-components'
import styles from './notesPopup.module.scss'

interface IPropsData {
  popData?: any
}
const NotesPopup: FC<IPropsData> = ({ popData }) => {
  return (
    <>
      <div className={styles.notesPopupContainer}>
        <CloseIcon
          customClass={styles.closeIconStyle}
          fillColor={colors.green1}
        />
        <div className={styles.notesContainer}>
          <p className={styles.title}>Notes</p>
          <Divider customClass={styles.dividerStyle} />
          <div className={styles.dateInfo}>
            {popData?.updatedAt && (
              <>
                <p className={styles.dateText}>Latest Updated</p>
                <p className={styles.spanText}>
                  {utcToDate(popData?.updatedAt) ?? ''}
                </p>
              </>
            )}

            <p className={styles.descriptionText}>{popData?.notes}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default NotesPopup

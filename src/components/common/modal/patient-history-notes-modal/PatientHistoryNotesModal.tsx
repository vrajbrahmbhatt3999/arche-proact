import { FC } from 'react'
import { CloseIcon } from '../../svg-components'
import { colors } from '../../../../constants/color'
import styles from './patientHistoryNotesModal.module.scss'
import moment from 'moment'

interface IPatientHistoryNotesModal {
  handleClose: (e?: React.MouseEvent<HTMLElement>) => void
  popData: any
  heading: string
  setIsDefault: any
}

const PatientHistoryNotesModal: FC<IPatientHistoryNotesModal> = ({
  handleClose,
  popData,
  heading,
  setIsDefault,
}) => {
  return (
    <>
      <div
        className={styles.patientHistoryNotesModalContainer}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <CloseIcon
          customClass={styles.closeIconStyle}
          fillColor={colors.green1}
          handleClick={() => {
            handleClose()
          }}
        />
        <h1 className={styles.patientHistoryNotesModalHeading}>{heading}</h1>
        <hr className={styles.patientHistoryNotesModalDivider} />
        <div className={styles.patientHistoryNotesContainer}>
          <div className={styles.patientHistoryNotesModalDateContainer}>
            <p className={styles.patientHistoryNotesModalDateTitle}>Date</p>{' '}
            <p className={styles.patientHistoryNotesModalDate}>
              {moment(popData?.diag_apt_date).format('DD MMM yyyy')}
            </p>
          </div>
          {setIsDefault ? (
            <p className={styles.patientHistoryNoteArrayText}>
              {popData?.diag_note?.map((item: any, index: any) => (
                <p key={index} className={styles.noteText}>
                  {index + 1}. {item}
                </p>
              ))}
            </p>
          ) : (
            <p className={styles.patientHistoryNotesModalText}>
              {popData?.diag_note ? popData?.diag_note : 'No Notes Found'}
            </p>
          )}
        </div>
      </div>
    </>
  )
}

export default PatientHistoryNotesModal

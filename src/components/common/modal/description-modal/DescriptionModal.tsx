import { FC } from 'react'
import { CloseIcon } from '../../svg-components'
import { colors } from '../../../../constants/color'
import styles from './descrtiptionModal.module.scss'

interface IDescriptionModalProps {
  heading?: string
  message?: string
  handleClose?: (e?: React.MouseEvent<HTMLElement>) => void
  popData?: string | any
}

const DescriptionModal: FC<IDescriptionModalProps> = ({
  heading,
  message,
  handleClose,
  popData,
}) => {
  console.log("popData>>>>>>>>>", popData);
  return (
    <div
      className={styles.descrtiptionModalContainer}
      onClick={(e) => {
        e.stopPropagation()
      }}
    >
      <CloseIcon
        customClass={styles.closeIconStyle}
        fillColor={colors.green1}
        handleClick={() => {
          handleClose && handleClose()
        }}
      />
      <h1 className={styles.descriptionModalHeading}>{heading}</h1>
      <hr className={styles.descriptionDivider} />
      <p className={styles.descriptionText}>{message}</p>
      {popData?.noteDetail?.length > 0 && (
        <div className={styles.notesDetailContainer}>
          {popData?.lastUpdateDate && (
            <p className={styles.notesDetailDate}>
              Latest Updated on {popData?.lastUpdateDate}
            </p>
          )}
          <p className={styles.notesDetailText}>{popData?.noteDetail}</p>
        </div>
      )}
    </div>
  )
}

export default DescriptionModal

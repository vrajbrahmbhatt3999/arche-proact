import { FC } from 'react'
import styles from './styles.module.scss'
import { CloseIcon } from '../svg-components'
import Divider from '../divider/Divider'
import { colors } from '../../../constants/color'
import Button from '../button/Button'

interface IConfirmation {
  handleClose?: () => void
  handleYes?: () => void
  heading?: string
  message?: string
}

const GlobalConfirmationPopup: FC<IConfirmation> = ({
  handleClose,
  handleYes,
  heading = 'Delete',
  message = 'Are you sure you want to delete?',
}) => {
  return (
    <>
      <div
        className={styles.notesPopupContainer}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <CloseIcon
          customClass={styles.closeIconStyle}
          fillColor={colors.green1}
          handleClick={handleClose}
        />
        <div className={styles.notesContainer}>
          <p className={styles.title}>{heading}</p>
          <Divider customClass={styles.dividerStyle} />
          <p className={styles.deleteText}>{message}</p>
          <div className={styles.btnContainer}>
            <Button
              title="Yes"
              customClass={styles.yesButtonStyle}
              handleClick={handleYes}
            />
            <Button
              title="No"
              customClass={styles.noButtonStyle}
              handleClick={handleClose}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default GlobalConfirmationPopup

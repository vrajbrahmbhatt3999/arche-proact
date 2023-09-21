import { FC } from 'react'
import styles from './InvoiceConformationModal.module.scss'
import { CloseIcon } from '../../svg-components'
import { colors } from '../../../../constants/color'
import Divider from '../../divider/Divider'
import Button from '../../button/Button'

interface IPaymentConfirmationModal {
  handleClose?: any
  setModelOpenClose?: any
  handleYes: any
  handleNo: any
}

const InvoiceConformationModal: FC<IPaymentConfirmationModal> = ({
  handleClose,
  setModelOpenClose,
  handleYes,
  handleNo,
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
          <p className={styles.title}>Invoice</p>
          <Divider customClass={styles.dividerStyle} />
          <p className={styles.deleteText}>Create New Invoice ?</p>
          <div className={styles.btnContainer}>
            <Button
              title="Yes"
              customClass={styles.yesButtonStyle}
              handleClick={() => setModelOpenClose()}
            />
            <Button
              title="No"
              customClass={styles.noButtonStyle}
              handleClick={handleNo}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default InvoiceConformationModal

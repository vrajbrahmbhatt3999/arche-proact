import { FC } from 'react'
import styles from './paymentConfirmationModal.module.scss'
import { CloseIcon } from '../../svg-components'
import { colors } from '../../../../constants/color'
import Divider from '../../divider/Divider'
import Button from '../../button/Button'

interface IPaymentConfirmationModal {
  handleClose?: any
  setModelOpenClose?: any
  handleYes: any
}

const PaymentConfirmationModal: FC<IPaymentConfirmationModal> = ({
  handleClose,
  setModelOpenClose,
  handleYes,
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
          <p className={styles.title}>Generate Invoice?</p>
          <Divider customClass={styles.dividerStyle} />
          <p className={styles.deleteText}>
          Are you sure to generate the invoice ? 
          </p>
          <div className={styles.btnContainer}>
            <Button
              title="Yes"
              customClass={styles.yesButtonStyle}
              handleClick={handleYes}
            />
            <Button
              title="No"
              customClass={styles.noButtonStyle}
              handleClick={() => setModelOpenClose(false)}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default PaymentConfirmationModal


import { FC, useEffect } from 'react'
import styles from '../add-notes/addNotes.module.scss'
import { CloseIcon } from '../../svg-components'
import { colors } from '../../../../constants/color'
import { trimValue } from '../../../../utils/utils'
import { useForm } from 'react-hook-form'
import Button from '../../button/Button'

interface IAddComplaintProps {
  handleClose: any
  handleYes: any
  popData?: any
}

const AddComplaint: FC<IAddComplaintProps> = ({ handleClose, handleYes, popData }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>({})
  useEffect(() => {
    if (popData) {
      reset(popData)
    }
  }, [popData, reset])
  return (
    <div
      className={styles.addNotesModalContainer}
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

      <h1 className={styles.addNotesHeading}>Add Complaint</h1>
      <hr className={styles.addNotesModalDivider} />
      <form onSubmit={handleSubmit(handleYes)}>
        <div className={styles.formFieldRow}>
          <div className={styles.formFieldContainer}>
            <div
              className={[
                styles.inputFieldContainer,
                styles.textAreaFieldContainer,
              ].join(' ')}
            >
              <label htmlFor="Complaint" className={styles.formLabel}>
                Complaint
                <span className="asterick">*</span>
              </label>
              <div className={styles.textAreaContainer}>
                <textarea
                  className={styles.textArea}
                  {...register('complaint', {
                    required: 'Please Enter Complaint',
                  })}
                  onChange={(e) => {
                    trimValue(e)
                  }}
                  placeholder="Enter Complaint"
                />
                {errors.note && (
                  <p className={styles.formError}>
                    {errors.note.message as any}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <Button title="Add" type="submit" customClass={styles.submitButton} />
        </div>
      </form>
    </div>
  )
}
export default AddComplaint

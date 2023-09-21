import { FC, useEffect } from 'react'
import styles from './addNotes.module.scss'
import { trimValue } from '../../../../utils/utils'
import { useForm } from 'react-hook-form'
import { addNotesValidators } from '../../../../form-validators/addNotesValidators'
import Button from '../../button/Button'

interface IAddNotesProps {
  handleYes: any
  popData?: any
}

const AddNotePopup: FC<IAddNotesProps> = ({ handleYes, popData }) => {
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
    <form onSubmit={handleSubmit(handleYes)}>
      <div className={styles.formFieldRow}>
        <div className={styles.formFieldContainer}>
          <div
            className={[
              styles.inputFieldContainer,
              styles.textAreaFieldContainer,
            ].join(' ')}
          >
            <label htmlFor="Notes" className={styles.formLabel}>
              Notes
              <span className="asterick">*</span>
            </label>
            <div className={styles.textAreaContainer}>
              <textarea
                className={styles.textArea}
                {...register('note', addNotesValidators.note)}
                onChange={(e) => {
                  trimValue(e)
                }}
                placeholder="Enter Notes"
              />
              {errors.note && (
                <p className={styles.formError}>{errors.note.message as any}</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <Button title="Add" type="submit" customClass={styles.submitButton} />
      </div>
    </form>
  )
}
export default AddNotePopup

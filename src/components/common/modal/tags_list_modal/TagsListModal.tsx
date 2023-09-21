import { FC } from 'react'
import { CloseIcon } from '../../../../components/common/svg-components'
import { colors } from '../../../../constants/color'
import styles from './tagsListModal.module.scss'

interface ITagsListModal {
  handleClose: (e?: React.MouseEvent<HTMLElement>) => void
  popData: any
  heading: string
}

const TagsListModal: FC<ITagsListModal> = ({
  handleClose,
  popData,
  heading,
}) => {
  return (
    <>
      <div
        className={styles.tagsListModalContainer}
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
        <h1 className={styles.tagsListModalHeading}>{heading}</h1>
        <hr className={styles.tagsListModalDivider} />
        <div className={styles.tagsListModalDateContainer}>
          <p className={styles.tagsListModalDateTitle}>Date</p>{' '}
          <p className={styles.tagsListModalDate}>{popData?.diag_apt_date}</p>
        </div>
        <div className={styles.tagsListContainer}>
          {popData?.diag_symptom_tags?.length > 0 ? (
            popData?.diag_symptom_tags?.map(
              (symptomTag: string, index: number) => (
                <p key={index} className={styles.tagsListText}>
                  {symptomTag}
                </p>
              )
            )
          ) : (
            <p>No Symptoms Found</p>
          )}
        </div>
      </div>
    </>
  )
}

export default TagsListModal

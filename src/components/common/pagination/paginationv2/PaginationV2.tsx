import { FC } from 'react'
import styles from './paginationV2.module.scss'
import {
  CalanderIcon,
  NextIcon,
  PreviousIcon,
  ResetIcon,
} from '../../svg-components'
import { colors } from '../../../../constants/color'
interface IPaginationProps {
  handlePaginate?: any
  totalPages?: any
  currentPage: any
  handlePrevious: any
  handleReset: any
  handleNext: any
}

const PaginationV2: FC<IPaginationProps> = ({
  handlePaginate,
  totalPages,
  currentPage,
  handlePrevious,
  handleReset,
  handleNext,
}) => {
  return (
    <div className={styles.paginationContainer}>
      <div className={styles.iconContainer} onClick={() => handlePrevious()}>
        <PreviousIcon fillColor={colors.grey2} />
      </div>
      <div className={styles.iconContainer} onClick={() => handleReset()}>
        <ResetIcon fillColor={colors.grey2} />
      </div>
      <div className={styles.iconContainer} onClick={() => handleNext()}>
        <NextIcon fillColor={colors.grey2} />
      </div>
    </div>
  )
}
export default PaginationV2

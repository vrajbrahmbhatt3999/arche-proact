import { FC } from 'react'
import styles from './doubleBookinfInfo.module.scss'

interface IDoubleInfoBookingInfoProps {
  tooltipData: {
    message: string
    count?: number
  }
}

const DoubleInfoBookingInfo: FC<IDoubleInfoBookingInfoProps> = ({
  tooltipData,
}) => {
  return (
    <div className={styles.mainContainer}>
      <span className={styles.message}>{tooltipData?.message}</span>
      <span className={styles.count}>{tooltipData?.count}</span>
    </div>
  )
}
export default DoubleInfoBookingInfo

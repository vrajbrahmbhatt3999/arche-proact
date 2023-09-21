import { FC } from 'react'
import styles from './norecordfound.module.scss'
interface INoRecordFound {}

const NoRecordFound: FC<INoRecordFound> = () => {
  return (
    <div className={styles.norecordFoundContainer}>
      <span className={styles.norecordFoundText}> No Records Found</span>
    </div>
  )
}
export default NoRecordFound

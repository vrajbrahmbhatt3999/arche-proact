import { FC } from 'react'
import styles from './sup.module.scss'

interface ISup {
  sup: string
}

const Sup: FC<ISup> = ({ sup }) => {
  return <sup className={styles.sup}>{sup}</sup>
}

export default Sup

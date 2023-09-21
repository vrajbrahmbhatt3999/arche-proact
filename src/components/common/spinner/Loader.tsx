// import { FC } from 'react'
// import styles from './loader.module.scss'

// interface ILoaderProps {
//   customClass?: string
// }

// const Loader: FC<ILoaderProps> = ({ customClass }) => {
//   return (
//     <div className={[styles.loader, customClass].join(' ')}>
//       <div className={styles.spinner}></div>
//     </div>
//   )
// }
// export default Loader

import { FC } from 'react'
import styles from './loader.module.scss'
// interface ILoaderProps {
//   customClass?: string;
// }
const Loader: FC = () => {
  return (
    <>
      <div className={styles.spinnerContainer}>
        <div className={styles.loadingSpinner}></div>
      </div>
    </>
  )
}

export default Loader

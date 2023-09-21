import { FC } from 'react'
import styles from './colorScheme.module.scss'

interface IColorSchemeProps {
  tooltipData: { title: string; colorCode: string }[]
}

const ColorScheme: FC<IColorSchemeProps> = ({ tooltipData }) => {
  return (
    <div className={styles.colorSchemeContainer}>
      {tooltipData.map((item: { title: string; colorCode: string }) => {
        return (
          <div key={item?.title} className={styles.colorTitleContainer}>
            <span
              className={styles.colorBox}
              style={{ backgroundColor: item?.colorCode }}
            ></span>
            <span className={styles.statusTitle}> {item?.title}</span>
          </div>
        )
      })}
    </div>
  )
}

export default ColorScheme

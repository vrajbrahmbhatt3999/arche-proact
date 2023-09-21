import { FC, useState } from 'react'
import { colors } from '../../../constants/color'
import { InfoIcon } from '../svg-components'
import styles from './infoTooltip.module.scss'

interface IInfoTooltipProps {
  title: string
  Children: any
  customClass?: string
  customClassChild?: string
  tooltipData?: any
}

const InfoTooltip: FC<IInfoTooltipProps> = ({
  title,
  Children,
  customClass,
  customClassChild,
  tooltipData,
}) => {
  const [show, setShow] = useState<boolean>(false)
  return (
    <div className={[styles.informationContainer, customClass].join(' ')}>
      <span className={styles.infoTitle}>{title}</span>
      <InfoIcon
        fillColor={colors.grey2}
        mouseEnter={() => setShow(true)}
        mouseLeave={() => setShow(false)}
      />
      {show && (
        <div className={[styles.infoChildren, customClassChild].join(' ')}>
          <Children tooltipData={tooltipData} />
        </div>
      )}
    </div>
  )
}
export default InfoTooltip

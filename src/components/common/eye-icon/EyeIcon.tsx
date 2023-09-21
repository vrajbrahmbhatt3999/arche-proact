import { FC } from 'react'
import { colors } from '../../../constants/color'
import { passwordType } from '../../../interfaces/interfaces'
import { CloseEyeIcon, EyeIcon } from '../svg-components'
import styles from './eyeIcon.module.scss'

interface IEyeIconsProps {
  passwordType: passwordType
  setPasswordType: (value: React.SetStateAction<passwordType>) => void
  customClass?: string
  handleClick?:any
}

const EyeIcons: FC<IEyeIconsProps> = ({
  passwordType,
  setPasswordType,
  customClass,
  handleClick
}) => {
  return passwordType === 'password' ? (
    <CloseEyeIcon
      fillColor={colors?.grey1}
      customClass={[styles.eyeIcon, customClass].join(' ')}
      handleClick={() => setPasswordType('text')}
    />
  ) : (
    <EyeIcon
      fillColor={colors?.grey1}
      customClass={[styles.eyeIcon, customClass].join(' ')}
      // handleClick={() => setPasswordType('password')}
      handleClick={handleClick}
    />
  )
}

export default EyeIcons

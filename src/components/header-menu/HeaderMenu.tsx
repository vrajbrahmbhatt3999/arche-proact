import { FC } from 'react'
import styles from './headerMenu.module.scss'
import { IAppointmenuHeaderMenu } from '../../interfaces/interfaces'
import { colors } from '../../constants/color'
import { useNavigate } from 'react-router-dom'

interface IHeaderMenuProps {
  menuData: IAppointmenuHeaderMenu[]
  handleClick: (item: IAppointmenuHeaderMenu) => void;
  viewRef?:any
}

const HeaderMenu: FC<IHeaderMenuProps> = ({ menuData, handleClick ,viewRef}) => {
  return (
    <>
      <div className={styles.headerMenuContainer} ref={viewRef}>
        {menuData.map((item: IAppointmenuHeaderMenu, index: number) => {
          return (
            <div
              className={styles.iconNameContainer}
              key={`${index}-app`}
              onClick={() => handleClick(item)}
            >
              <item.icon fillColor={colors.green1} />
              <span className={styles.name}>{item.name}</span>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default HeaderMenu

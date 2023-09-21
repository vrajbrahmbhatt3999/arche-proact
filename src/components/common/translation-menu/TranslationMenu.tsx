import { FC } from 'react'
import styles from './TranslationMenu.module.scss'

interface ITranslationMenu {
  translationRef: any
}
const TranslationMenu: FC<ITranslationMenu> = ({ translationRef }) => {
  const langueages = [
    {
      label: 'English',
      value: 'english',
    },
    {
      label: 'العربية',
      value: 'arabic',
    },
  ]
  return (
    <>
      <div className={styles.mainContainer} ref={translationRef}>
        {langueages?.map((item: any, index: number) => {
          return (
            <span
              className={styles.languageName}
              key={`${item.label}-${index}`}
            >
              {item?.label}
            </span>
          )
        })}
      </div>
    </>
  )
}

export default TranslationMenu

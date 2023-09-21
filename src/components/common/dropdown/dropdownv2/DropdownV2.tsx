import { FC, useEffect, useRef, useState } from 'react'
import styles from './dropdownV2.module.scss'
import { DropDownIcon } from '../../svg-components'
import { colors } from '../../../../constants/color'
import { join } from 'path'

interface IDropdownProps {
  data: any[]
  handleClick?: any
  selectedItem?: any
  setSelectedItem?: any
  type?: string
  keyName: string
  customClass?: string
  notShowAllOption?: boolean
  customClassBox?: string
  customClassBody?: string
  customClassForItem?: string
  isDisable?: boolean
}

const DropdownV2: FC<IDropdownProps> = ({
  data,
  handleClick,
  selectedItem,
  setSelectedItem,
  type,
  keyName,
  customClass,
  notShowAllOption,
  customClassBox,
  customClassBody,
  customClassForItem,
  isDisable,
}) => {
  const [dropdown, setDropdown] = useState<boolean>(false)
  const ref: any = useRef(null)
  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (dropdown && ref.current && !ref.current.contains(e.target)) {
        setDropdown(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside)
    }
  }, [dropdown])

  return (
    <div
      className={[styles.dropdownContainer, customClass].join(' ')}
      ref={ref}
    >
      {type && <span className={styles.dropdownTitle}>{type}:</span>}
      <div
        className={[styles.dropdownHeaderBox, customClassBox].join(' ')}
        onClick={() => isDisable ? setDropdown(false) : data?.length > 0 && setDropdown(!dropdown)}
        // style={{ borderBottomLeftRadius: dropdown && '0px', borderBottomRightRadius: dropdown && '0px', borderBottom: dropdown && '0px' }}
      >
        <span
          className={[styles.selectedItemName, customClassForItem].join(' ')}
        >
          {selectedItem?.name}
        </span>
        <DropDownIcon fillColor={colors.grey2} />
        {dropdown && (
          <div className={[styles.dropdownBody, customClassBody].join(' ')}>
            {!notShowAllOption && (
              <span
                onClick={() => {
                  setSelectedItem({ name: 'Select All', _id: '' })
                  setDropdown(false)
                }}
                className={[styles.selectedItemName, customClassForItem].join(
                  ' '
                )}
              >
                Select All
              </span>
            )}

            {data &&
              data.length > 0 &&
              data.map((item: any, index: number) => {
                return (
                  <span
                    onClick={() => {
                      handleClick(item)
                      setDropdown(false)
                    }}
                    key={`${index}-item`}
                    className={[
                      styles.selectedItemName,
                      customClassForItem,
                    ].join(' ')}
                  >
                    {item?.[keyName]}
                  </span>
                )
              })}
          </div>
        )}
      </div>
    </div>
  )
}

export default DropdownV2

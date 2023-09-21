import { debounce } from 'lodash'
import { FC, useCallback, useState } from 'react'
import { colors } from '../../../constants/color'
import { SearchIcon } from '../svg-components'
import styles from './search.module.scss'
import { trimValue, handleRefClick } from '../../../utils/utils'

interface ISearch {
  setSearchMedicalCenter?: (value: string) => void
  searchMedicalCenter?: string
  customClass?: string
  customClassInput?: string
  placeHolder?: string
  customSerachIconStyle?: string
  disabled?:any
}
const Search: FC<ISearch> = ({
  setSearchMedicalCenter,
  searchMedicalCenter,
  customClass,
  customClassInput,
  placeHolder,
  customSerachIconStyle,
  disabled
}) => {
  const [searchValue, setSearchValue] = useState<string>('')
  // Debounce Search String
  const searchText = useCallback(
    debounce(
      (text: string): void =>
        setSearchMedicalCenter && setSearchMedicalCenter(text),
      500
    ),
    [setSearchMedicalCenter]
  )

  return (
    <>
      <div
        className={[styles.globalFilterSection, customClass ?? ''].join(' ')}
      >
        <SearchIcon
          fillColor={colors?.grey2}
          customClass={[styles.searchIconStyle, customSerachIconStyle].join(
            ' '
          )}
        />
        <input
          className={[styles.globalSearchInput, customClassInput].join(' ')}
          type="text"
          value={searchValue}
          onChange={(e) => {
            trimValue(e)
            setSearchValue(e.target.value)
            // setSearchMedicalCenter && setSearchMedicalCenter(e.target.value);
            searchText(e.target.value)
          }}
          placeholder={placeHolder ?? 'Search'}
          disabled={disabled}
        />
      </div>
    </>
  )
}

export default Search

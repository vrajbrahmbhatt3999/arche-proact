import { FC, useCallback, useState } from "react";
import DropDown from "../dropdown/DropDown";
import Search from "../search/Search";
import SmartSearch from "../smart-search/SmartSearch";
import styles from "./searchFilter.module.scss";
import Button from "../button/Button";
import { SearchIcon } from "../svg-components";
import { colors } from "../../../constants/color";
import { debounce } from "lodash";

interface ISearchFilter {
  title?: string;
  dropDownData?: any;
  handleClick?: any;
  setSearchMedicalCenter?: (value: string) => void;
  searchMedicalCenter?: string;
  setSmartSearchData?: (value: string) => void;
  smartSearchData?: string;
  isDropdown?: boolean;
  isSmartSearch?: boolean;
  isButtonGroup?: boolean;
  dropDownTitle?: string;
  customClass?: string;
  setGlobalFilter?: any;
  globalFilter?: string;
}
const SearchFilter: FC<ISearchFilter> = ({
  title,
  handleClick,
  dropDownData,
  setSearchMedicalCenter,
  searchMedicalCenter,
  setSmartSearchData,
  smartSearchData,
  isDropdown,
  isSmartSearch,
  isButtonGroup,
  dropDownTitle,
  customClass,
  setGlobalFilter,
  globalFilter,
}) => {
  const [smartSearchValue, setSmartSearchValue] = useState<string>("");
  // Debounce Search String
  const smartSearchText = useCallback(
    debounce(
      (text: string): void => setSmartSearchData && setSmartSearchData(text),
      500
    ),
    [setSearchMedicalCenter]
  );
  return (
    <>
      <div
        className={[styles.medicalCenterSearchContainer, customClass].join(" ")}
      >
        <div className={styles.searchContainer}>
          <div>
            <Search
              setSearchMedicalCenter={setSearchMedicalCenter}
              searchMedicalCenter={searchMedicalCenter}
            />
          </div>
          {isDropdown && (
            <div className={styles.dropDownContainer}>
              <p className={styles.packageTitle}>{dropDownTitle}</p>
              <DropDown
                dropdownInitialState="select package"
                dropDownData={dropDownData}
              />
            </div>
          )}

          {isSmartSearch && (
            <SmartSearch
              placeHolder={"Smart Search"}
              customClass={styles.smartSearchStyle}
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
              isDisable={
                searchMedicalCenter && searchMedicalCenter?.length > 0
                  ? false
                  : true
              }
            />
          )}
          <div></div>
        </div>

        {!isButtonGroup && (
          <div className={styles.buttonContainer}>
            <Button
              title={title}
              customClass={styles.medicalCenterButtonStyle}
              handleClick={() => handleClick()}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default SearchFilter;

import { FC, useState, useCallback, useEffect, useRef } from "react";
import styles from "./searchdropdown.module.scss";
import { SearchIcon } from "../svg-components";
import { debounce } from "lodash";

interface ISearchDropDown {
  dropdown?: any;
  customClass?: any;
  inputCustomClass?: any;
  placeholder?: any;
  onChange?: any;
  value?: any;
  setValue?: any;
  searchString?: any;
  setSearchString?: any;
  setCurrentPage?: any;
  options?: string[];
  dropdownDataToSee?: any;
  dropdownItemKey?: any;
  handleClick?: any;
  keyName?: any;
  dropDownKeyName?: any;
}

const SearchDropDown: FC<ISearchDropDown> = ({
  dropdown,
  customClass,
  inputCustomClass,
  placeholder,
  onChange,
  value,
  setValue,
  searchString,
  setSearchString,
  setCurrentPage,
  dropdownDataToSee,
  dropdownItemKey,
  handleClick,
  keyName,
  dropDownKeyName,
}) => {
  const [val, setVal] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const ref = useRef<any>();
  const deb = useCallback(
    debounce((text) => setSearchString(text), 1000),
    []
  );
  const handleSearch = (text: any) => {
    setVal(text);
    setShowDropdown(true);
    deb(text);
  };

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (showDropdown && ref.current && !ref.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [showDropdown]);


  return (
    <>
      <div className={[styles.inputData, customClass].join(" ")}>
        <input
          type="text"
          className={[styles.inputFilled, inputCustomClass].join(" ")}
          placeholder={placeholder}
          onChange={(e) => handleSearch(e.target.value.trimLeft())}
          value={val}
          name={keyName ? keyName : ""}
        />
        <SearchIcon fillColor="#969BA0" />
        <div
          className={
            showDropdown && dropdownDataToSee
              ? styles.seeDataInDropDownMain
              : styles.hideDataInDropDownMain
          }
          ref={ref}
        >
          {showDropdown &&
            dropdownDataToSee?.map((item: any, index: any) => {
              return (
                <p
                  key={index}
                  className={styles.dropdownItemText}
                  onClick={() => handleClick(item, setVal, setShowDropdown)}
                >
                  <span className={styles.dropdownItemName}>
                    {item[dropDownKeyName]}
                  </span>
                </p>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default SearchDropDown;

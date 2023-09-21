import { FC, useCallback, useState } from "react";
import styles from "./inputSearch.module.scss";
import { debounce } from "lodash";
import { SearchIcon } from "../svg-components";
import { colors } from "../../../constants/color";
interface InputSearch {
  setSearchCategory?: (value: string) => void;
  searchCategory?: string;
  customClass?: string;
  placeHolder?: string;
}

const InputSearch: FC<InputSearch> = ({
  setSearchCategory,
  searchCategory,
  customClass,
  placeHolder,
}) => {
  const [searchValue, setSearchValue] = useState<string>("");
  // Debounce Search String
  const searchText = useCallback(
    debounce(
      (text: string): void => setSearchCategory && setSearchCategory(text),
      500
    ),
    [setSearchCategory]
  );
  return (
    <>
      <div
        className={[styles.globalFilterSection, customClass ?? ""].join(" ")}
      >
        <input
          className={[styles.globalSearchInput, customClass].join("")}
          type="text"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
            // setSearchCategory && setSearchCategory(e.target.value);
            searchText(e.target.value);
          }}
          placeholder={placeHolder ?? "Search"}
        />
        <SearchIcon
          fillColor={colors?.grey2}
          customClass={styles.searchIconStyle}
        />
      </div>
    </>
  );
};

export default InputSearch;

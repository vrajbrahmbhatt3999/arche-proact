import { FC } from "react";
import { colors } from "../../../constants/color";
import { SearchIcon } from "../svg-components";
import styles from "./smartSearch.module.scss";

interface ISearch {
  setGlobalFilter?: any;
  globalFilter?: string;
  customClass?: string;
  customClassInput?: string;
  placeHolder?: string;
  isDisable?: boolean;
}
const SmartSearch: FC<ISearch> = ({
  setGlobalFilter,
  globalFilter,
  customClass,
  customClassInput,
  placeHolder,
  isDisable,
}) => {
  return (
    <>
      <div
        className={[styles.globalFilterSection, customClass ?? ""].join(" ")}
      >
        <SearchIcon
          fillColor={colors?.grey2}
          customClass={styles.searchIconStyle}
        />
        <input
          className={[
            isDisable ? styles.disableSearchInput : styles.globalSearchInput,
            customClassInput,
          ].join(" ")}
          type="text"
          value={globalFilter || ""}
          onChange={(e) => {
            setGlobalFilter(e.target.value);
          }}
          placeholder={placeHolder ?? "Search"}
          disabled={isDisable}
        />
      </div>
    </>
  );
};

export default SmartSearch;

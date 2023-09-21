import * as React from "react";
import styles from "./searchDesign.module.scss";
import { SearchIcon } from "../svg-components";
import { colors } from "../../../constants/color";

interface ISearchDesign {
  handleSearchClick?: any;
  customClass?: string;
  customClassInput?: string;
}

const SearchDesign: React.FunctionComponent<ISearchDesign> = ({
  handleSearchClick,
  customClass,
  customClassInput,
}) => {
  return (
    <>
      <div
        onClick={() => handleSearchClick()}
        className={[styles.mainContainer, customClass ?? ""].join(" ")}
      >
        <div className={styles.searchIcon}>
          <SearchIcon
            fillColor={colors?.grey2}
            customClass={styles.searchIconStyle}
          />
        </div>

        <div className={[styles.searchContainer, customClassInput].join(" ")}>
          <p className={styles.searchText}>Search Patients</p>
        </div>
      </div>
    </>
  );
};

export default SearchDesign;

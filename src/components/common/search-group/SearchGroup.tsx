import React, { FC } from "react";
import { colors } from "../../../constants/color";
import { SearchIcon } from "../svg-components";
import styles from "./searchGroup.module.scss";
interface ISearchGroup {
  filter: string;
  setFilter: any;
}

const SearchGroup: FC = () => {
  return (
    <>
      <div className={styles.globalFilterSection}>
        <SearchIcon
          fillColor={colors?.grey2}
          customClass={styles.searchIconStyle}
        />
        <input
          className={styles.globalSearchInput}
          type="text"
          placeholder="Search"
        />
      </div>
      <h1>hi</h1>
    </>
  );
};

export default SearchGroup;

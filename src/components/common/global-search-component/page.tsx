import React from "react";
import { SearchIcon } from "../svg-components";
import { colors } from "../../../constants/color";
import styles from "./style.module.scss";

interface IGlobalSearch {
  value: string;
  onChange: any;
  handleSearch: () => void;
  placeholder?: string;
  children?: React.ReactNode;
}

const GlobalSearch: React.FC<IGlobalSearch> = (props) => {
  const { value, onChange, handleSearch, placeholder, children } = props;
  return (
    <div className={styles.searchContainer}>
      <div className={styles.search}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        <div className={styles.searchButton} onClick={handleSearch}>
          <SearchIcon fillColor={colors.white1} />
        </div>
      </div>
      {children}
    </div>
  );
};

export default GlobalSearch;

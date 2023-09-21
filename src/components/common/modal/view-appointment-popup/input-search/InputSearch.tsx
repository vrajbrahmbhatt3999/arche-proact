import { debounce } from "lodash";
import { FC, useCallback, useState } from "react";
import { colors } from "../../../../../constants/color";
import { trimValue } from "../../../../../utils/utils";
import { SearchIcon } from "../../../svg-components";
import styles from "./inputSearch.module.scss";

interface IInputSearch {
  searchPatient?: any;
  setSearchPatient?: any;
}

const InputSearch: FC<IInputSearch> = ({ searchPatient, setSearchPatient }) => {
  const [searchValue, setSearchValue] = useState<string>("");

  const searchPatientText = useCallback(
    debounce(
      (text: string): void => setSearchPatient && setSearchPatient(text),
      500
    ),
    [setSearchPatient]
  );

  return (
    <div style={{ position: "relative" }}>
      <input
        type="text"
        className={styles.inputField}
        value={searchValue}
        onChange={(e) => {
          trimValue(e);
          setSearchValue(e.target.value);
          searchPatientText(e.target.value);
        }}
      />
      {/* <SearchIcon
        customClass={styles.searchIconStyle}
        fillColor={colors.grey1}
      /> */}
    </div>
  );
};

export default InputSearch;

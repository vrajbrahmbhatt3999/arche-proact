import React, { useState } from "react";
import styles from "./dropDown.module.scss";
import { DropDownArrowIcon, DropDownIcon } from "../svg-components";
import Divider from "../divider/Divider";

interface IDropDown {
  dropDownData?: Array<any>;
  dropdownInitialState?: string;
  customClassContainer?: string;
  customClassContent?: string;
  dropwnInitialValueOption?: string;
  setCurrentPage?: any;
  handleChangeDropdownStatus?: any;
  departmentFilter?: any;
  setDepartmentFilter?: any;
  departmentState?: any;
  setdepartmentState?: any;
}

const DropDown: React.FunctionComponent<IDropDown> = ({
  dropDownData,
  dropdownInitialState,
  customClassContainer,
  customClassContent,
  handleChangeDropdownStatus,
  dropwnInitialValueOption,
  departmentState,
  setdepartmentState,
  departmentFilter,
  setDepartmentFilter,
}) => {
  const [value, setValue] = useState(dropdownInitialState);

  const [totalPage, setTotalPage] = useState<number>(0);
  const pageIndexArray = () => {
    let pageIndexOptions = [];
    for (let i = 1; i <= totalPage; i++) {
      pageIndexOptions.push(i);
    }
    return pageIndexOptions;
  };
  const pageIndexOptions = pageIndexArray();

  const handlevalue = (item: any) => {
    setValue(item.name);
    handleChangeDropdownStatus(item?.name);
    setdepartmentState(false);
    setDepartmentFilter(item);
  };

  return (
    <>
      <div className={styles.dropDownMainContainer}>
        <div className={styles.dropDownContainer}>
          <div
            onClick={() => {
              setdepartmentState(!departmentState);
            }}
            className={[styles.dropDownContainer, customClassContainer].join(
              " "
            )}
          >
            <span
              className={
                value !== dropdownInitialState
                  ? styles.dropDownItem
                  : styles.placeholder
              }
            >
              {value}
            </span>

            <span className={styles.dropDownIcon}>
              {!departmentState ? (
                <DropDownIcon fillColor="#797979" />
              ) : (
                <DropDownArrowIcon fillColor="#797979" />
              )}
            </span>
          </div>
          {departmentState && (
            <div
              className={[styles.dropDownContent, customClassContent].join(" ")}
            >
              <p
                className={styles.dropDownValue}
                onClick={() => handlevalue({ name: "All status", _id: "" })}
              >
                {dropwnInitialValueOption}
              </p>

              {dropDownData &&
                dropDownData?.map((item: any, index: any) => {
                  return (
                    <>
                      <p
                        className={styles.dropDownValue}
                        key={index}
                        onClick={() => handlevalue(item)}
                      >
                        {item?.name}
                      </p>
                      {index !== dropDownData?.length - 1 && (
                        <Divider customClass={styles.dividerStyle} />
                      )}
                    </>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DropDown;

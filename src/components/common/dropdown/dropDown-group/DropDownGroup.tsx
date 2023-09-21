import React, { useState,useEffect,useRef } from "react";
import styles from "./dropDownGroup.module.scss";
import { DropDownArrowIcon, DropDownIcon } from "../../svg-components";

interface IDropDownGroup {
  dropDownData?: Array<any>;
  dropdownInitialState?: string;
  customClassContainer?: string;
  customClassContent?: string;
  dropwnInitialValueOption?: string;
  setCurrentPage?: any;
  handleChangeDropdownStatus?: any;
  handleChangeDropdownBranch?: any;
  handleChangeDropdownDiagnosis?: any;
  statusName?: any;
  branchName?: any;
  branchDropDownData?: any;
  branchDropwnInitialValueOption?: any;
  branchDropdownInitialState?: any;
  diagnosisDropwnInitialValueOption?: any;
  diagnosisDropdownInitialState?: any;
  diagnosisDropDownData?: any;
  setBranchFilter?: any;
  branchFilter?: any;
  statusFilter?: any;
  setStatusFilter?: any;
  diagnosisFilter?: any;
  setDiagnosisFilter?: any;
  statusState?: any;
  setStatusState?: any;
  branchState?: any;
  setBranchState?: any;
  diagnosisState?: any;
  setDiagnosisState?: any;
}

const DropDownGroup: React.FunctionComponent<IDropDownGroup> = ({
  dropDownData,
  dropdownInitialState,
  customClassContainer,
  customClassContent,
  handleChangeDropdownBranch,
  handleChangeDropdownStatus,
  handleChangeDropdownDiagnosis,
  dropwnInitialValueOption,
  branchDropDownData,
  branchDropwnInitialValueOption,
  branchDropdownInitialState,
  diagnosisDropwnInitialValueOption,
  diagnosisDropdownInitialState,
  diagnosisDropDownData,
  setStatusFilter,
  setBranchFilter,
  setDiagnosisFilter,
  // statusState,
  // setStatusState,
  // branchState,
  // setBranchState,
  // diagnosisState,
  // setDiagnosisState,
}) => {
  const [value, setValue] = useState(dropdownInitialState);
  const [branchvalue, setBranchValue] = useState(branchDropdownInitialState);
  const [diagnosisValue, setDiagnosisValue] = useState(
    diagnosisDropdownInitialState
  );
    const [statusState, setStatusState] = useState<boolean>(false);
  const [branchState, setBranchState] = useState<boolean>(false);
  const [diagnosisState, setDiagnosisState] = useState<boolean>(false);

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
    setStatusState(false);
    setStatusFilter(item);
  };

  const handleBranchValue = (item: any) => {
    setBranchValue(item.name);
    setBranchState(false);
    handleChangeDropdownBranch(item?.name);
    setBranchFilter(item);
  };

  const handleDiagnosisValue = (item: any) => {
    setDiagnosisValue(item.name);
    setDiagnosisState(false);
    handleChangeDropdownDiagnosis(item?.name);
    setDiagnosisFilter(item);
  };

  const statusRef: any = useRef(null);
  const branchRef: any = useRef(null);
  const diagnosisRef: any = useRef(null);
  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (statusState && statusRef.current && !statusRef.current.contains(e.target)) {
        setStatusState(false);
      }
      else if (diagnosisState && diagnosisRef.current && !diagnosisRef.current.contains(e.target)) {
        setDiagnosisState(false);
      }
      else if (branchState && branchRef.current && !branchRef.current.contains(e.target)) {
        setBranchState(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [statusState,diagnosisState,branchState]);
  return (
    <>
      <div className={styles.dropDownMainContainer}>
        <div className={styles.dropDownContainer}>
          <div
            onClick={() => {
              setStatusState(!statusState);
              setBranchState(false);
              setDiagnosisState(false);
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
              {!statusState ? (
                <DropDownIcon fillColor="#797979" />
              ) : (
                <DropDownArrowIcon fillColor="#797979" />
              )}
            </span>
          </div>
          {statusState && (
            <div
              className={[styles.dropDownContent, customClassContent].join(" ")}
              ref={statusRef}
            >
              <p
                className={styles.dropDownValue}
                onClick={() => handlevalue({ name: "All status", _id: "" })}
              >
                {/* Select status */}
                {dropwnInitialValueOption}
              </p>

              {dropDownData &&
                dropDownData?.map((item, index) => {
                  return (
                      <p
                        className={styles.dropDownValue}
                        key={index}
                        onClick={() => handlevalue(item)}
                      >
                        {item?.name}
                      </p>
                  );
                })}
            </div>
          )}
        </div>
      </div>

      <div className={styles.dropDownMainContainer}>
        <div className={styles.dropDownContainer}>
          <div
            onClick={() => {
              setBranchState(!branchState);
              setStatusState(false);
              setDiagnosisState(false);
            }}
            className={[styles.dropDownContainer, customClassContainer].join(
              " "
            )}
          >
            <span
              className={
                branchvalue !== branchDropdownInitialState
                  ? styles.dropDownItem
                  : styles.placeholder
              }
            >
              {branchvalue}
            </span>

            <span className={styles.dropDownIcon}>
              {!branchState ? (
                <DropDownIcon fillColor="#797979" />
              ) : (
                <DropDownArrowIcon fillColor="#797979" />
              )}
            </span>
          </div>
          {branchState && (
            <div
              className={[styles.dropDownContent, customClassContent].join(" ")}
              ref={branchRef}
            >
              <p
                className={styles.dropDownValue}
                onClick={() =>
                  handleBranchValue({ name: "All branches", _id: "" })
                }
              >
                {branchDropwnInitialValueOption}
              </p>

              {branchDropDownData &&
                branchDropDownData?.map((item: any, index: number) => {
                  return (
                    <>
                      <p
                        className={styles.dropDownValue}
                        key={index}
                        onClick={() => handleBranchValue(item)}
                      >
                        {item?.name}
                      </p>
                    </>
                  );
                })}
            </div>
          )}
        </div>
      </div>

      {/* diagnosis status filter */}

      <div className={styles.dropDownMainContainer}>
        <div className={styles.dropDownContainer}>
          <div
            onClick={() => {
              setDiagnosisState(!diagnosisState);
              setStatusState(false);
              setBranchState(false);
            }}
            className={[styles.dropDownContainer, customClassContainer].join(
              " "
            )}
          >
            <span
              className={
                diagnosisValue !== diagnosisDropdownInitialState
                  ? styles.dropDownItem
                  : styles.placeholder
              }
            >
              {diagnosisValue}
            </span>

            <span className={styles.dropDownIcon}>
              {!diagnosisState ? (
                <DropDownIcon fillColor="#797979" />
              ) : (
                <DropDownArrowIcon fillColor="#797979" />
              )}
            </span>
          </div>
          {diagnosisState && (
            <div
              className={[styles.dropDownContent, customClassContent].join(" ")}
              ref={diagnosisRef}
            >
              <p
                className={styles.dropDownValue}
                onClick={() => handleDiagnosisValue({ name: "All", _id: "" })}
              >
                {diagnosisDropwnInitialValueOption}
              </p>

              {diagnosisDropDownData &&
                diagnosisDropDownData?.map((item: any, index: number) => {
                  return (
                    <>
                      <p
                        className={styles.dropDownValue}
                        key={index}
                        onClick={() => handleDiagnosisValue(item)}
                      >
                        {item?.name}
                      </p>
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

export default DropDownGroup;

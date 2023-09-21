import { FC, useState, useEffect } from "react";
import Select from "react-select";
import TableV2 from "../../../components/common/table/tableV2/TableV2";
import Pagination from "../../../components/common/pagination/Pagination";
import { patientActivityHeaderData } from "../../../constants/table-data/patientActivityData";
import {
  CloseIcon,
  PrintIcon,
  ExportIcon,
  SearchIcon,
} from "../../../components/common/svg-components";
import { colors } from "../../../constants/color";
import { requestGenerator } from "../../../utils/payloadGenerator";
import { useAppDispatch, useAppSelector } from "../../../hooks/index";
import { trimValue } from "../../../utils/utils";
import { DropdownIndicator } from "../../../components/common/dropdown-indicator/DropdownIndicator";
import { getAllPatientActivityLog } from "../../../redux/features/patient_activity_log/patientActivityLogAsyncActions";
import Loader from "../../../components/common/spinner/Loader";
import styles from "./patientActivityLogModal.module.scss";

interface IPatientActivityLogModal {
  handleClose: (e?: React.MouseEvent<HTMLElement>) => void;
}

const PatientActivityLogModal: FC<IPatientActivityLogModal> = ({
  handleClose,
}) => {
  const dispatch = useAppDispatch();
  const { isLoading, patientActivityLogData } = useAppSelector(
    (state) => state.patientActivityLog
  );
  const { branchData } = useAppSelector((state) => state.login);

  // Define state variables
  const [patientActivitySearch, setPatientActivitySearch] =
    useState<string>("");
  const [patientActivitySearchOnButton, setPatientActivitySearchOnButton] =
    useState<string>("");
  const defaultBranch = {
    label: branchData?.branches?.[0]?.name,
    value: branchData?.branches?.[0]?._id,
  };
  const [dataPerPage, setDataPerPage] = useState<number>(10);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [branchDropDownData, setBranchDropDownData] = useState([]);
  const [selectBranch, setSelectBranch] = useState(defaultBranch);
  // console.log("selectBranch :>> ", selectBranch);
  // console.log("branchData", branchData?.branches);
  // console.log("branchDropDownData :>> ", branchDropDownData);
  // console.log("patientActivitySearch", patientActivitySearch);
  // console.log("patientActivitySearchOnButton", patientActivitySearchOnButton);
  // function for creating Page Index Array
  const pageIndexArray = () => {
    let pageIndexOptions = [];
    for (let i = 1; i <= totalPage; i++) {
      pageIndexOptions.push(i);
    }
    return pageIndexOptions;
  };
  const pageIndexOptions = pageIndexArray();

  // console.log("defaultBranch :>> ", defaultBranch);
  // useEffect for branch dropdown data
  useEffect(() => {
    if (branchData?.branches && branchData?.branches?.length > 0) {
      const branchesArray = branchData?.branches?.map((item: any) => {
        return {
          label: item?.name,
          value: item?._id,
        };
      });
      setBranchDropDownData(branchesArray);
    } else {
      setBranchDropDownData([]);
    }
  }, [branchData?.branches]);

  // Api call for Get All Appointments
  useEffect(() => {
    let payloadData = {
      page: pageIndex,
      pageSize: dataPerPage,
      search: patientActivitySearchOnButton,
      branch_id: selectBranch?.value,
    };
    dispatch(getAllPatientActivityLog(requestGenerator(payloadData))).then(
      (result) => setTotalPage(result.payload.lastPage)
    );
    const interval = setInterval(() => {
      dispatch(getAllPatientActivityLog(requestGenerator(payloadData))).then(
        (result) => setTotalPage(result.payload.lastPage)
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [
    dispatch,
    dataPerPage,
    pageIndex,
    patientActivitySearchOnButton,
    selectBranch?.value,
  ]);

  // function for print page.
  // const handlePrint = () => {
  //   window.print();
  // };

  const handleSearch = () => {
    setPageIndex(1)
    if (patientActivitySearch?.length > 0) {
      setPatientActivitySearchOnButton(patientActivitySearch);
      let payloadData = {
        page: pageIndex,
        pageSize: dataPerPage,
        search: patientActivitySearch,
        branch_id: selectBranch?.value,
      };
      dispatch(getAllPatientActivityLog(requestGenerator(payloadData))).then(
        (result) => setTotalPage(result.payload.lastPage)
      );
    }
  };

  return (
    <>
      {/* {isLoading && <Loader />} */}

      <div
        className={styles.patientActivityModalContainer}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <CloseIcon
          customClass={styles.closeIconStyle}
          fillColor={colors.green1}
          handleClick={() => {
            handleClose();
          }}
        />
        <h1 className={styles.patientActivityLogModalHeading}>
          Patient Activity Log
        </h1>
        <hr className={styles.patientActivityLogModalDivider} />
        <div className={styles.activityLogContainer}>
          <div className={styles.searchIconContainer}>
            <div className={styles.inputFieldContainer}>
              <label htmlFor={"Branch"} className={styles.formLabel}>
                Branch
              </label>
              <Select
                className={styles.selectInputField}
                placeholder="Select Branch"
                closeMenuOnSelect={true}
                components={{ DropdownIndicator }}
                isSearchable={false}
                defaultValue={defaultBranch}
                options={branchDropDownData}
                onChange={(e: any) => {
                  // console.log("object :>> ", e);
                  setSelectBranch(e);
                  setPatientActivitySearch("");
                  setPatientActivitySearchOnButton("");
                }}
                maxMenuHeight={200}
              />
            </div>
            <div className={styles.searchFieldContainer}>
              <label htmlFor={"user"} className={styles.searchLabel}>
                User
              </label>
              <input
                className={styles.searchInput}
                type="text"
                value={patientActivitySearch}
                onChange={(e) => {
                  trimValue(e);
                  setPatientActivitySearch(e.target.value);
                  if (e.target.value.length === 0) {
                    setPatientActivitySearchOnButton("");
                    let payloadData = {
                      page: pageIndex,
                      pageSize: dataPerPage,
                      search: "",
                      branch_id: selectBranch?.value,
                    };
                    dispatch(
                      getAllPatientActivityLog(requestGenerator(payloadData))
                    ).then((result) => setTotalPage(result.payload.lastPage));
                  }
                }}
              />
            </div>
            <div className={styles.searchButton} onClick={handleSearch}>
              <SearchIcon fillColor={colors.white1} />
            </div>
            <PrintIcon
              customClass={styles.stylePrint}
              // handleClick={handlePrint}
            />
            <ExportIcon customClass={styles.styleExport} />
          </div>
          <div className={styles.tableContainer}>
            <TableV2
              tableHeaderData={patientActivityHeaderData}
              tableRowData={patientActivityLogData}
            />
          </div>
          {patientActivityLogData?.length > 0 && (
            <Pagination
              setDataPerPage={setDataPerPage}
              pageIndexOptions={pageIndexOptions}
              pageIndex={pageIndex}
              setPageIndex={setPageIndex}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default PatientActivityLogModal;

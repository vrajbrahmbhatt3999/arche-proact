import { FC, useState, useEffect } from "react";
import {
  Column,
  TableOptions,
  useGlobalFilter,
  useSortBy,
  useTable,
} from "react-table";
import { Cols } from "../../../interfaces/interfaces";
import moment from "moment";
import TableV3 from "../../../components/common/table/tableV3/TableV3";
import Select from "react-select";
import { DropdownIndicator } from "../../../components/common/dropdown-indicator/DropdownIndicator";
import styles from "./labRequest.module.scss";
import MedicationModal from "../../../components/common/modal/medication-modal/MedicationModal";
import Popup from "../../../components/common/popup/Popup";
import Pagination from "../../../components/common/pagination/Pagination";
import SmartSearch from "../../../components/common/smart-search/SmartSearch";
import FloatingBar from "../../../components/common/floatingbar/FloatingBar";
import Loader from "../../../components/common/spinner/Loader";
import { labRequestFloatingBarData } from "../../../constants/data";
import { labRequestTableHeaderData } from "../../../constants/table-data/labRequestTableData";
import { labTestNameModalHeaderData } from "../../../constants/table-data/labTestNameModalHeaderData";
import { requestGenerator } from "../../../utils/payloadGenerator";
import { useAppDispatch, useAppSelector } from "../../../hooks/index";
import { getAllLabRequestPayloadData } from "../../../redux/features/lab-request/labRequestSlice";
import { getAllLabRequestsList } from "../../../redux/features/lab-request/labRequestAsyncActions";
import { job_type_array, job_status_array } from "./labRequestDummyData";
import { trimValue } from "../../../utils/utils";
import { SearchIcon } from "../../../components/common/svg-components";
import { colors } from "../../../constants/color";

interface ILabRequest {}

const LabRequest: FC<ILabRequest> = () => {
  const dispatch = useAppDispatch();
  const { isLoading, labRequestData } = useAppSelector(
    (state) => state.labRequests
  );
  // console.log("getAllLabRequestPayload :>> ", getAllLabRequestPayload);
  const [labRequestSearch, setLabRequestSearch] = useState<string>("");
  const [isSmartSearchDisable, setIsSmartSearchDisable] =
    useState<boolean>(true);
  const [jobType, setJobType] = useState<any>(null);
  const [jobStatus, setJobStatus] = useState<any>(null);
  const [showTestNameModal, setTestNameModal] = useState<boolean>(false);
  const [testNamePopupData, setTestNamePopupData] = useState<any>({});
  const [dataPerPage, setDataPerPage] = useState<number>(10);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [pageIndex, setPageIndex] = useState<number>(1);

  // React Table define
  const data: Cols[] = labRequestData;
  const columns: Column<Cols>[] = labRequestTableHeaderData;
  const options: TableOptions<Cols> = {
    data,
    columns,
  };

  const {
    state,
    // @ts-ignore
    setGlobalFilter,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(options, useGlobalFilter, useSortBy);
  // @ts-ignore
  const { globalFilter } = state;

  // function for creating Page Index Array
  const pageIndexArray = () => {
    let pageIndexOptions = [];
    for (let i = 1; i <= totalPage; i++) {
      pageIndexOptions.push(i);
    }
    return pageIndexOptions;
  };
  const pageIndexOptions = pageIndexArray();

  // api call for get all lab requests
  useEffect(() => {
    const payloadData = {
      test_type: "LABORATORY",
      search: labRequestSearch,
      req_type: jobType?.value,
      req_status: jobStatus?.value,
      page: pageIndex,
      pageSize: dataPerPage,
    };
    dispatch(getAllLabRequestPayloadData(payloadData));
    dispatch(getAllLabRequestsList(requestGenerator(payloadData))).then(
      (result) => setTotalPage(result.payload.lastPage)
    );
  }, [dispatch, jobType, jobStatus, dataPerPage, pageIndex]);

  const handleTestNameModalOpen = (rowData: any) => {
    const convertDate = moment(rowData?.job_date).format("DD-MMM-YYYY");
    const testDetailsData = {
      diag_medicine_prescription: rowData,
      diag_apt_date: convertDate,
    };
    setTestNamePopupData(testDetailsData);
    setTestNameModal((prevState) => !prevState);
  };

  const handleTestNameModalClose = () => {
    setTestNamePopupData({});
    setTestNameModal((prevState) => !prevState);
  };

  const handleSearch = () => {
    if (labRequestSearch?.length > 0) {
      // console.log("labRequestSearch :>> ", labRequestSearch);
      // setIsSmartSearchDisable(false);
      let payloadData = {
        test_type: "LABORATORY",
        search: labRequestSearch,
        req_type: jobType?.value,
        req_status: jobStatus?.value,
        page: pageIndex,
        pageSize: dataPerPage,
      };
      dispatch(getAllLabRequestPayloadData(payloadData));
      dispatch(getAllLabRequestsList(requestGenerator(payloadData))).then(
        (result) => {
          setIsSmartSearchDisable(false);
          setTotalPage(result.payload.lastPage);
        }
      );
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      {showTestNameModal && (
        <Popup
          Children={MedicationModal}
          handleClose={handleTestNameModalClose}
          heading={"Test Name"}
          headerData={labTestNameModalHeaderData}
          popData={testNamePopupData}
        />
      )}
      <div className={styles.labRequestContainer}>
        <div className={styles.pageWrapper}>
          {/* Search Container */}
          <div className={styles.searchContainer}>
            <div className={styles.search}>
              <label htmlFor={"doctorName"} className={styles.searchLabel}>
                Doctor Name
              </label>
              <input
                className={styles.searchInput}
                type="text"
                placeholder="Search by doctor"
                value={labRequestSearch}
                onChange={(e) => {
                  trimValue(e);
                  setLabRequestSearch(e.target.value);
                  if (e.target.value.length === 0) {
                    setIsSmartSearchDisable(true);
                    setGlobalFilter("");
                    let payloadData = {
                      test_type: "LABORATORY",
                      search: "",
                      req_type: "",
                      req_status: "",
                      page: pageIndex,
                      pageSize: dataPerPage,
                    };
                    dispatch(
                      getAllLabRequestsList(requestGenerator(payloadData))
                    ).then((result) => {
                      setTotalPage(result.payload.lastPage);
                    });
                    setJobStatus(null);
                    setJobType(null);
                  }
                }}
              />
              <div className={styles.searchButton} onClick={handleSearch}>
                <SearchIcon fillColor={colors.white1} />
              </div>
              <SmartSearch
                placeHolder={"Smart Search"}
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
                isDisable={isSmartSearchDisable}
                customClassInput={styles.smartSearchInput}
              />
            </div>
            <div className={styles.fileterContainer}>
              <Select
                className={styles.selectInputField}
                placeholder="Select Job Type"
                closeMenuOnSelect={true}
                components={{ DropdownIndicator }}
                isSearchable={false}
                options={job_type_array}
                value={jobType || ""}
                onChange={(e: any) => {
                  setJobType(e);
                }}
                maxMenuHeight={200}
                styles={{
                  control: (provided) => ({
                    ...provided,
                    width: "180px",
                    height: "42px",
                  }),
                }}
              />
              <Select
                className={styles.selectInputField}
                placeholder="Select Status"
                closeMenuOnSelect={true}
                components={{ DropdownIndicator }}
                isSearchable={false}
                options={job_status_array}
                value={jobStatus || ""}
                onChange={(e: any) => {
                  setJobStatus(e);
                }}
                maxMenuHeight={200}
                styles={{
                  control: (provided) => ({
                    ...provided,
                    width: "190px",
                    height: "42px",
                  }),
                }}
              />
            </div>
          </div>
          {/* Table */}
          <div className={styles.mainContainer}>
            <div className={styles.tableContainer}>
              <TableV3
                handleClick={handleTestNameModalOpen}
                getTableProps={getTableProps}
                getTableBodyProps={getTableBodyProps}
                headerGroups={headerGroups}
                rows={rows}
                prepareRow={prepareRow}
              />
            </div>
            {/* Pagination */}
            {labRequestData && labRequestData.length !== 0 ? (
              <Pagination
                setDataPerPage={setDataPerPage}
                pageIndexOptions={pageIndexOptions}
                pageIndex={pageIndex}
                setPageIndex={setPageIndex}
              />
            ) : (
              ""
            )}
          </div>
        </div>
        <div className={styles.floatingBarConatainer}>
          <FloatingBar floatingBarData={labRequestFloatingBarData} />
        </div>
      </div>
    </>
  );
};

export default LabRequest;

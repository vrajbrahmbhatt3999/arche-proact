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
import MedicationModal from "../../../components/common/modal/medication-modal/MedicationModal";
import Popup from "../../../components/common/popup/Popup";
import Pagination from "../../../components/common/pagination/Pagination";
import SmartSearch from "../../../components/common/smart-search/SmartSearch";
import FloatingBar from "../../../components/common/floatingbar/FloatingBar";
import Loader from "../../../components/common/spinner/Loader";
import { labRequestFloatingBarData } from "../../../constants/data";
import { radiologyRequestTableHeaderData } from "../../../constants/table-data/radiologyRequestTableData";
import { radiologyTestNameModalHeaderData } from "../../../constants/table-data/radiologyTestNameModalHeaderData";
import { requestGenerator } from "../../../utils/payloadGenerator";
import { useAppDispatch, useAppSelector } from "../../../hooks/index";
import { getAllRadiologyRequestPayloadData } from "../../../redux/features/radiology-request/radiologyRequestSlice";
import { getAllRadiologyRequestsList } from "../../../redux/features/radiology-request/radiologyRequestAsyncActions";
import { job_type_array, job_status_array } from "./radioLogyRequestDummyData";
import { trimValue } from "../../../utils/utils";
import { SearchIcon } from "../../../components/common/svg-components";
import { colors } from "../../../constants/color";
import styles from "./radioLogyRequest.module.scss";

interface IRadiologyRequest {}

const RadiologyRequest: FC<IRadiologyRequest> = () => {
  const dispatch = useAppDispatch();
  const { isLoading, radiologyRequestData } = useAppSelector(
    (state) => state.radiolgyRequests
  );
  // console.log("radiologyRequestData :>> ", radiologyRequestData);
  const [radiologyRequestSearch, setRadiologyRequestSearch] =
    useState<string>("");
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
  const data: Cols[] = radiologyRequestData;
  const columns: Column<Cols>[] = radiologyRequestTableHeaderData;
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

  // api call for get all radiology requests
  useEffect(() => {
    const payloadData = {
      test_type: "RADIOLOGY",
      search: radiologyRequestSearch,
      req_type: jobType?.value,
      req_status: jobStatus?.value,
      page: pageIndex,
      pageSize: dataPerPage,
    };
    dispatch(getAllRadiologyRequestPayloadData(payloadData));
    dispatch(getAllRadiologyRequestsList(requestGenerator(payloadData))).then(
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
    if (radiologyRequestSearch?.length > 0) {
      // setIsSmartSearchDisable(false);
      let payloadData = {
        test_type: "RADIOLOGY",
        search: radiologyRequestSearch,
        req_type: jobType?.value,
        req_status: jobStatus?.value,
        page: pageIndex,
        pageSize: dataPerPage,
      };
      dispatch(getAllRadiologyRequestPayloadData(payloadData));
      dispatch(getAllRadiologyRequestsList(requestGenerator(payloadData))).then(
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
          headerData={radiologyTestNameModalHeaderData}
          popData={testNamePopupData}
        />
      )}
      <div className={styles.radiologyRequestContainer}>
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
                value={radiologyRequestSearch}
                onChange={(e) => {
                  trimValue(e);
                  setRadiologyRequestSearch(e.target.value);
                  if (e.target.value.length === 0) {
                    setIsSmartSearchDisable(true);
                    setGlobalFilter("");
                    let payloadData = {
                      test_type: "RADIOLOGY",
                      search: "",
                      req_type: "",
                      req_status: "",
                      page: pageIndex,
                      pageSize: dataPerPage,
                    };
                    dispatch(
                      getAllRadiologyRequestsList(requestGenerator(payloadData))
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
            {radiologyRequestData && radiologyRequestData.length !== 0 ? (
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

export default RadiologyRequest;

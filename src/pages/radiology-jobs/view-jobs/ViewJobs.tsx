import { useEffect, useState } from "react";
import Button from "../../../components/common/button/Button";
import Popup from "../../../components/common/popup/Popup";
import ComparativeAnalysisPopup from "./comparative-analysis-popup/ComparativeAnalysisPopup";
import ComparePopup from "./compare-popup/ComparePopup";
import styles from "./viewJobs.module.scss";
import AddResultsPopup from "./add-results-popup/AddResultsPopup";
import SmartSearch from "../../../components/common/smart-search/SmartSearch";
import {
  Column,
  TableOptions,
  useGlobalFilter,
  useSortBy,
  useTable,
} from "react-table";
import { IviewJobsTableData } from "../../../interfaces/interfaces";
import Pagination from "../../../components/common/pagination/Pagination";
import { viewJobsTableHeaderData } from "./viewJobTableData";
import { trimValue } from "../../../utils/utils";
import { SearchIcon } from "../../../components/common/svg-components";
import { colors } from "../../../constants/color";
import ViewAttachmentPopup from "./view-attachment-popup/ViewAttachmentPopup";
import AddAttachmentsPopup from "./add-attachments-popup/AddAttachmentsPopup";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { requestGenerator } from "../../../utils/payloadGenerator";
import TableV3 from "../../../components/common/table/tableV3/TableV3";
import ViewJobsTestModal from "./view-test-id-popup/page";
import { addResultsPopupHeaderData } from "./add-results-popup/addResultTableData";
import {
  getAllLabViewPayloadData,
  setNotesData,
  setShowAddResultPopup,
  setShowNotes,
  setShowObservations,
} from "../../../redux/features/radiology-jobs/jobsSlice";
import { ViewJobsAsyncData } from "../../../redux/features/radiology-jobs/jobsAsyncActions";
import AddNotesPopup from "./notes-popup";
import Loader from "../../../components/common/spinner/Loader";
import AddObservationsPopup from "./observations-popup";

const TestIdHeaders = [
  {
    Header: "TEST PROFILE",
    Cell: (props: any) => {
      return (
        <>
          {props?.row?.original?.isProfile === true ? (
            <span>{props?.row?.original?.profile_name}</span>
          ) : (
            "-"
          )}
        </>
      );
    },
  },
  {
    Header: "TEST ID",
    Cell: (props: any) => {
      return (
        <>
          {props.row.original.tests.map((s: any, index: number) => (
            <div key={index}>
              {`${index + 1})`} {s?.test_no}
            </div>
          ))}
        </>
      );
    },
  },
  {
    Header: "TESTS",
    Cell: (props: any) => {
      return (
        <>
          {props.row.original.tests.map((s: any, index: number) => (
            <div key={index}>
              {`${index + 1})`} {s?.test_name}
            </div>
          ))}
        </>
      );
    },
  },
  {
    Header: "PRICE",
    Cell: (props: any) => {
      return (
        <>
          {props?.row?.original?.total_amount > 0 ? (
            <span>${props?.row?.original?.total_amount}</span>
          ) : (
            "-"
          )}
        </>
      );
    },
  },
];

const ViewJobs = () => {
  const [showComparePopup, setShowComparePopup] = useState<boolean>(false);
  const [showComparativeAnalysisPopup, setComparativeAnalysisPopup] =
    useState<boolean>(false);
  const [comparePopupData, setComparePopupData] = useState();
  const [showViewResultsPopup, setShowViewResultsPopup] =
    useState<boolean>(false);
  const [viewAttachmentsPopup, setViewAttachmentsPopup] =
    useState<boolean>(false);
  const [searchTest, setSearchTest] = useState("");
  const [dataPerPage, setDataPerPage] = useState<number>(10);
  const [showAttachments, setShowAttachments] = useState(false);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [showTestIdModal, setShowTestIdModal] = useState(false);
  const [testIDData, setTestIDData] = useState([]);
  const [addResult, setAddResult] = useState<any>([]);
  const [attachment, setAttachment] = useState([]);
  const [searchDate, setSearchDate] = useState("");
  const [toSearchDate, setToSearchDate] = useState("");
  const [items, setItems] = useState({});
  const [totalData, setTotalData] = useState(0);

  const dispatch = useAppDispatch();
  const {
    viewJobs,
    showNotes,
    showAddResultPopup,
    isLoading,
    showObservations,
  } = useAppSelector((state) => state.radiologyJobs);
  useEffect(() => {
    let reqPayload = {
      name: searchTest,
      page: pageIndex,
      pageSize: dataPerPage,
      job_type: "RADIOLOGY",
      is_internal: true,
    };
    dispatch(getAllLabViewPayloadData(reqPayload));
    dispatch(ViewJobsAsyncData(requestGenerator(reqPayload))).then((result) => {
      setTotalPage(result.payload.lastPage);
      setTotalData(result.payload.total);
    });
  }, [dataPerPage, pageIndex, dispatch]);

  // React Table define
  const data: IviewJobsTableData[] = viewJobs;
  const columns: Column<IviewJobsTableData>[] = viewJobsTableHeaderData;
  const options: TableOptions<IviewJobsTableData> = {
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

  const showTest = (item: any) => {
    setTestIDData(item);
    setShowTestIdModal((s) => !s);
  };

  const showAddResultTest = (item: any) => {
    setAddResult(item);
    dispatch(setShowAddResultPopup(true));
  };

  const showViewReports = (item: any) => {
    setAddResult(item);
    setShowViewResultsPopup((s) => !s);
  };

  const showAddAttachments = (item: any) => {
    setAttachment(item);
    setShowAttachments((s) => !s);
  };
  const findModal = (item: any) => {
    switch (item?.headerName) {
      case "TEST":
        showTest(item);
        break;
      case "ADD ATTACHMENTS":
        showAddAttachments(item);
        break;
      case "ADD RESULTS":
        showAddResultTest(item);
        break;
      case "VIEW REPORTS":
        showViewReports(item);
        break;
    }
  };

  useEffect(() => {
    if (toSearchDate?.length) {
      let requestData = {
        name: searchTest,
        page: pageIndex,
        pageSize: dataPerPage,
        job_type: "RADIOLOGY",
        is_internal: true,
        range: {
          fromDate: searchDate,
          toDate: toSearchDate,
        },
      };

      dispatch(ViewJobsAsyncData(requestGenerator(requestData))).then(
        (result) => {
          setTotalPage(result.payload.lastPage);
          setTotalData(result.payload.total);
        }
      );
    }
  }, [searchDate, toSearchDate]);

  const handlePatientHistoryViewBtn = (item: any) => {
    findModal(item);
  };

  const handleComparePopup = (item: any) => {
    setShowComparePopup((prevState) => !prevState);
    setComparePopupData(item);
  };

  const handleModalClose = () => {
    setShowComparePopup(!showComparePopup);
  };

  const handleChild = () => {
    setComparativeAnalysisPopup(true);
  };

  const handleComparativeAnalysisPopup = () => {
    setComparativeAnalysisPopup(!showComparativeAnalysisPopup);
    setShowComparePopup(true);
  };

  // function for creating Page Index Array
  const pageIndexArray = () => {
    let pageIndexOptions = [];
    for (let i = 1; i <= totalPage; i++) {
      pageIndexOptions.push(i);
    }
    return pageIndexOptions;
  };
  const pageIndexOptions = pageIndexArray();

  const handleSearch = () => {
    let requestData = {
      name: searchTest,
      page: pageIndex,
      pageSize: dataPerPage,
      job_type: "RADIOLOGY",
      is_internal: true,
    };
    dispatch(ViewJobsAsyncData(requestGenerator(requestData))).then(
      (result) => {
        setTotalPage(result.payload.lastPage);
        setTotalData(result.payload.total);
      }
    );

    setSearchDate("");
    setToSearchDate("");
  };

  const handleAddResultsNotes1 = () => {
    setViewAttachmentsPopup(true);
  };

  const closePopup = () => {
    setShowTestIdModal((s) => !s);
  };

  return (
    <>
      {isLoading && <Loader />}
      {/* Compare Popup */}
      {showComparePopup && (
        <Popup
          Children={ComparePopup}
          popData={comparePopupData}
          handleClose={() => handleModalClose()}
          handleChildClick={handleChild}
        />
      )}
      {/* Comparative Analysis Popup */}
      {showComparativeAnalysisPopup && (
        <Popup
          Children={ComparativeAnalysisPopup}
          popData={comparePopupData}
          handleClose={() => handleComparativeAnalysisPopup}
          handleChildClick={handleComparativeAnalysisPopup}
        />
      )}
      {/* Add Results Popup */}
      {showAddResultPopup && (
        <Popup
          Children={AddResultsPopup}
          handleClose={() => dispatch(setShowAddResultPopup(false))}
          setModelOpenClose={(item: any) => (
            dispatch(setShowObservations(true)),
            setItems(item),
            dispatch(setNotesData(addResult))
          )}
          popData={addResult}
          handleOpen={(item: any) => (
            dispatch(setShowNotes(true)),
            setItems(item),
            dispatch(setNotesData(addResult))
          )}
          headerData={addResultsPopupHeaderData}
        />
      )}
      {showAttachments && (
        <Popup
          Children={AddAttachmentsPopup}
          handleOpen={handleAddResultsNotes1}
          handleClose={() => setShowAttachments(false)}
          popData={attachment}
        />
      )}
      {/* View Attachment Popup */}
      {viewAttachmentsPopup && (
        <Popup
          Children={ViewAttachmentPopup}
          handleClose={() => setViewAttachmentsPopup((prevState) => !prevState)}
        />
      )}
      {/* View Results Popup */}
      {showViewResultsPopup && (
        <Popup
          Children={AddResultsPopup}
          handleClose={() => setShowViewResultsPopup(false)}
          setModelOpenClose={(item: any) => (
            dispatch(setShowObservations(true)),
            setItems(item),
            dispatch(setNotesData(addResult))
          )}
          popData={addResult}
          headerData={addResultsPopupHeaderData}
          handleOpen={() => dispatch(setShowNotes(true))}
          setDeleteFlag={false}
        />
      )}
      {showTestIdModal && (
        <Popup
          Children={ViewJobsTestModal}
          handleClose={closePopup}
          heading="Tests"
          headerData={TestIdHeaders}
          popData={testIDData}
        />
      )}
      {showNotes && (
        <Popup
          Children={AddNotesPopup}
          handleClose={() => dispatch(setShowNotes(false))}
          popData={items}
        />
      )}

      {showObservations && (
        <Popup
          Children={AddObservationsPopup}
          handleClose={() => dispatch(setShowObservations(false))}
          popData={items}
        />
      )}

      <div className={styles.pageWrapper}>
        {/* Search */}
        <div className={styles.searchContainer}>
          <div className={styles.search}>
            <input
              className={styles.searchInput}
              type="text"
              value={searchTest}
              placeholder="Search by Name"
              onChange={(e) => {
                trimValue(e);
                setSearchTest(e.target.value);
                if (e.target.value === "") {
                  let requestData = {
                    search: "",
                    page: pageIndex,
                    pageSize: dataPerPage,
                    job_type: "RADIOLOGY",
                    is_internal: true,
                  };
                  dispatch(
                    ViewJobsAsyncData(requestGenerator(requestData))
                  ).then((result) => {
                    setTotalPage(result.payload.lastPage);
                    setTotalData(result.payload.total);
                  });
                }
              }}
            />
            {/* Search Button */}
            <div className={styles.searchButton} onClick={handleSearch}>
              <SearchIcon fillColor={colors.white1} />
            </div>
            {/* Smart Search */}
            <SmartSearch
              placeHolder="Smart Search"
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
              // isDisable={
              //   viewJobSearch && viewJobSearch?.length > 0 ? false : true
              // }
            />
          </div>
        </div>
        <div className={styles.dateFieldContainer}>
          {/* Date Container */}
          <div className={styles.dateContainer}>
            <p>From</p>
            <input
              type="date"
              className={styles.dateField}
              value={searchDate}
              onChange={(e) => {
                setSearchDate(e.target.value);
                // setSearchTest("");
              }}
            />
          </div>
          <div className={styles.dateContainer}>
            <p>To</p>
            <input
              type="date"
              className={styles.dateField}
              value={toSearchDate}
              onChange={(e) => {
                setToSearchDate(e.target.value);
              }}
            />
          </div>
          <Button
            title="Compare"
            customClass={styles.compareButton}
            handleClick={handleComparePopup}
            disable={true}
          />
        </div>
        <div className={styles.mainTableContainer}>
          <div className={styles.tableContainer}>
            <TableV3
              getTableProps={getTableProps}
              getTableBodyProps={getTableBodyProps}
              headerGroups={headerGroups}
              rows={rows}
              prepareRow={prepareRow}
              handleClick={handlePatientHistoryViewBtn}
            />
          </div>
          {/* Pagination */}
          {totalData > 10 && (
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

export default ViewJobs;

import { useState, useEffect } from "react";
import styles from "./posummarypopup.module.scss";
import { CustomRadio } from "../../../components/common/custom-radio";
import TableV3 from "../../../components/common/table/tableV3/TableV3";
import {
  Column,
  TableOptions,
  useGlobalFilter,
  useSortBy,
  useTable,
} from "react-table";
import SmartSearch from "../../../components/common/smart-search/SmartSearch";
import { PendingHeaderData } from "./poSummaryPopupTableData";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { getInventoryAllPo } from "../../../redux/features/inventory-request/inventoryRequestAsyncActions";
import { requestGenerator } from "../../../utils/payloadGenerator";
import Loader from "../../../components/common/spinner/Loader";
import Pagination from "../../../components/common/pagination/Pagination";
import { trimValue } from "../../../utils/utils";
import { CustomModal } from "../../../components/common/custom-modal/modal";
import PoGrnData from "../po-grn-data/page";
import GlobalSearch from "../../../components/common/global-search-component/page";

const PoSummaryPopup = () => {
  const [check, setCheck] = useState("Pending");

  const { isLoading, getAlldirectPoData } = useAppSelector(
    (state) => state.inventoryRequest
  );

  const dispatch = useAppDispatch();

  const [searchTest, setSearchTest] = useState("");
  const [totalPage, setTotalPage] = useState<any>(0);
  const [partialTotalPage, setPartialTotalPage] = useState<number>(0);
  const [settledTotalPage, setSettledTotalPage] = useState<number>(0);
  const [dataPerPage, setDataPerPage] = useState<number>(10);
  const [partialDataPerPage, setPartialDataPerPage] = useState<number>(10);
  const [settledDataPerPage, setSettledDataPerPage] = useState<number>(10);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [partialpageIndex, setPartialPageIndex] = useState<number>(1);
  const [settledpageIndex, setSettledPageIndex] = useState<number>(1);
  const [disable, setDisable] = useState(true);
  const [totalData, setTotalData] = useState(0);
  const [grnPopup, setGrnPopup] = useState(false);
  const [notes, setNotes] = useState(false);
  const [notesData, setNotesData] = useState({});
  const pendingStatus = check === "Pending";
  const partialStatus = check === "partially";
  const settledStatus = check === "Settled";

  const getStatus =
    (pendingStatus && "INITIATED") ||
    (partialStatus && "PARTIAL") ||
    (settledStatus && "COMPLETED");

  const getPageIndex =
    (pendingStatus && pageIndex) ||
    (partialStatus && partialpageIndex) ||
    (settledStatus && settledpageIndex);

  const getTotalPage =
    (pendingStatus && totalPage) ||
    (partialStatus && partialTotalPage) ||
    (settledStatus && settledTotalPage);

  const getDataPerPage =
    (pendingStatus && dataPerPage) ||
    (partialStatus && partialDataPerPage) ||
    (settledStatus && settledDataPerPage);

  const fetchTotalDataResponse = (result: any) => {
    (pendingStatus && setTotalPage(result.payload.lastPage)) ||
      (partialStatus && setPartialTotalPage(result.payload.lastPage)) ||
      (settledStatus && setSettledTotalPage(result.payload.lastPage));
    setTotalData(result.payload.total);
  };

  const pageIndexArray = () => {
    let pageIndexOptions = [];
    for (let i = 1; i <= Math.ceil(getTotalPage); i++) {
      pageIndexOptions.push(i);
    }
    return pageIndexOptions;
  };
  const pageIndexOptions = pageIndexArray();

  let requestData = {
    search: searchTest,
    status: [getStatus],
    page: getPageIndex,
    pageSize: getDataPerPage,
    order_by: { name: 1 },
  };

  useEffect(() => {
    dispatch(getInventoryAllPo(requestGenerator(requestData))).then(
      (result) => {
        fetchTotalDataResponse(result);
      }
    );
  }, [
    check,
    dataPerPage,
    dispatch,
    pageIndex,
    partialDataPerPage,
    partialpageIndex,
    settledDataPerPage,
    settledpageIndex,
  ]);

  const handleSearch = () => {
    if (searchTest?.length) {
      dispatch(getInventoryAllPo(requestGenerator(requestData))).then(
        (result) => {
          fetchTotalDataResponse(result);
          setDisable(false);
        }
      );
    }
  };

  const data: any = getAlldirectPoData;
  const columns: Column<any>[] = PendingHeaderData ?? [];
  const options: TableOptions<any> = {
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

  return (
    <>
      {isLoading && <Loader />}
      <CustomModal
        showModal={grnPopup}
        closeModal={() => {
          setGrnPopup(false);
        }}
        title="GRN"
        width="50%"
        height="400px"
      >
        <PoGrnData />
      </CustomModal>
      <CustomModal
        showModal={notes}
        closeModal={() => setNotes(false)}
        title="View Notes"
        width="30%"
        height="250px"
      >
        <div className={styles.notesContainer}>test</div>
      </CustomModal>
      <GlobalSearch
        placeholder="Search"
        value={searchTest}
        onChange={(e: any) => {
          trimValue(e);
          setSearchTest(e.target.value);
          if (e.target.value === "") {
            let requestData = {
              search: "",
              status: [getStatus],
              page: getPageIndex,
              pageSize: getDataPerPage,
              order_by: { name: 1 },
            };
            dispatch(getInventoryAllPo(requestGenerator(requestData))).then(
              (result) => {
                fetchTotalDataResponse(result);
                setDisable(true);
              }
            );
          }
        }}
        handleSearch={() => handleSearch()}
      >
        <SmartSearch
          placeHolder="Smart Search"
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          isDisable={disable}
        />
      </GlobalSearch>

      <div className={styles.radioFieldContainer}>
        <CustomRadio
          value="Pending"
          name="task"
          label="Pending"
          checked={check === "Pending"}
          onChange={() => setCheck("Pending")}
          onClick={() => (setSearchTest(""), setDisable(true))}
        />
        <CustomRadio
          value="partially Pending "
          name="task"
          label="partially"
          checked={check === "partially"}
          onChange={() => setCheck("partially")}
          onClick={() => (setSearchTest(""), setDisable(true))}
        />
        <CustomRadio
          value="Settled"
          name="task"
          label="Settled"
          checked={check === "Settled"}
          onChange={() => setCheck("Settled")}
          onClick={() => (setSearchTest(""), setDisable(true))}
        />
      </div>

      <div className={styles.tablestyle}>
        <TableV3
          getTableProps={getTableProps}
          getTableBodyProps={getTableBodyProps}
          headerGroups={headerGroups}
          rows={rows}
          prepareRow={prepareRow}
          handleRowClick={() => setGrnPopup(true)}
          handleClick={(item: any) => (setNotes(true), setNotesData(item))}
        />
      </div>
      {pendingStatus && totalData > 10 && (
        <Pagination
          setDataPerPage={setDataPerPage}
          pageIndexOptions={pageIndexOptions}
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
        />
      )}
      {partialStatus && totalData > 10 && (
        <Pagination
          setDataPerPage={setPartialDataPerPage}
          pageIndexOptions={pageIndexOptions}
          pageIndex={partialpageIndex}
          setPageIndex={setPartialPageIndex}
        />
      )}
      {settledStatus && totalData > 10 && (
        <Pagination
          setDataPerPage={setSettledDataPerPage}
          pageIndexOptions={pageIndexOptions}
          pageIndex={settledpageIndex}
          setPageIndex={setSettledPageIndex}
        />
      )}
    </>
  );
};

export default PoSummaryPopup;

import { FC, useState, useEffect } from "react";
import styles from "./mainstorerequestpopup.module.scss";
import Button from "../../../components/common/button/Button";
import { mainstoreRequestPopupHeaderData } from "./mainStoreRequestPopupTableData";
import SmartSearch from "../../../components/common/smart-search/SmartSearch";
import {
  Column,
  TableOptions,
  useGlobalFilter,
  useSortBy,
  useTable,
} from "react-table";
import TableV3 from "../../../components/common/table/tableV3/TableV3";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { getInventoryRequestDataAll } from "../../../redux/features/inventory-request/inventoryRequestAsyncActions";
import { requestGenerator } from "../../../utils/payloadGenerator";
import Loader from "../../../components/common/spinner/Loader";
import { trimValue } from "../../../utils/utils";
import Pagination from "../../../components/common/pagination/Pagination";
import GlobalSearch from "../../../components/common/global-search-component/page";
interface IMainStoreRequestPopup {
  handleClose?: any;
}

const MainStoreRequestPopup: FC<IMainStoreRequestPopup> = ({ handleClose }) => {
  const {
    isLoading,
    getAllInventoryRequestData,
    requestSourceTypeEvent,
    requestSourceEvent,
  } = useAppSelector((state) => state.inventoryRequest);

  const [tabs, setTabs] = useState("Green");
  const [totalPage, setTotalPage] = useState<any>(0);
  const [mediumQtyTotalPage, setMediumQtyTotalPage] = useState(0);
  const [lowQtyTotalPage, setLowQtyTotalPage] = useState(0);
  const [dataPerPage, setDataPerPage] = useState<number>(10);
  const [mediumQtydataPerPage, setMediumQtyDataPerPage] = useState<number>(10);
  const [lowQtydataPerPage, setLowQtyDataPerPage] = useState<number>(10);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [mediumQtypageIndex, setMediumQtyPageIndex] = useState<number>(1);
  const [lowQtypageIndex, setLowQtyPageIndex] = useState<number>(1);
  const [totalData, setTotalData] = useState(0);
  const [searchTest, setSearchTest] = useState("");
  const [disable, setDisable] = useState(true);

  const data: any = getAllInventoryRequestData ?? [];
  const columns: Column<any>[] = mainstoreRequestPopupHeaderData ?? [];
  const options: TableOptions<any> = {
    data,
    columns,
  };

  const greenTabs = tabs === "Green";
  const orangeTabs = tabs === "Orange";
  const redTabs = tabs === "Red";

  const getFlagStatus =
    (greenTabs && "green") || (orangeTabs && "orange") || (redTabs && "red");

  const getTotalPages =
    (greenTabs && totalPage) ||
    (orangeTabs && mediumQtyTotalPage) ||
    (redTabs && lowQtyTotalPage);

  const getPageIndex =
    (greenTabs && pageIndex) ||
    (orangeTabs && mediumQtypageIndex) ||
    (redTabs && lowQtypageIndex);

  const getDataPerPage =
    (greenTabs && dataPerPage) ||
    (orangeTabs && mediumQtydataPerPage) ||
    (redTabs && lowQtydataPerPage);

  const fetchTotalDataResponse = (result: any) => {
    (greenTabs && setTotalPage(result.payload.lastPage)) ||
      (orangeTabs && setMediumQtyTotalPage(result.payload.lastPage)) ||
      (redTabs && setLowQtyTotalPage(result.payload.lastPage));
    setTotalData(result.payload.total);
  };

  const pageIndexArray = () => {
    let pageIndexOptions = [];
    for (let i = 1; i <= Math.ceil(getTotalPages); i++) {
      pageIndexOptions.push(i);
    }
    return pageIndexOptions;
  };
  const pageIndexOptions = pageIndexArray();

  const dispatch = useAppDispatch();

  let requestData = {
    filter: {
      reqSourceType: requestSourceTypeEvent?.toUpperCase(),
      reqSource: requestSourceEvent,
    },
    destination: "MAIN_STORE",
    search: searchTest,
    page: getPageIndex,
    pageSize: getDataPerPage,
    flag: getFlagStatus,
  };

  let requestData2 = {
    destination: "MAIN_STORE",
    search: searchTest,
    page: getPageIndex,
    pageSize: getDataPerPage,
    flag: getFlagStatus,
  };

  useEffect(() => {
    dispatch(
      getInventoryRequestDataAll(
        requestGenerator(
          requestSourceTypeEvent?.length ? requestData : requestData2
        )
      )
    ).then((result) => {
      fetchTotalDataResponse(result);
    });
  }, [
    dispatch,
    pageIndex,
    mediumQtypageIndex,
    lowQtypageIndex,
    dataPerPage,
    mediumQtydataPerPage,
    lowQtydataPerPage,
    tabs,
  ]);

  const handleSearch = () => {
    if (searchTest?.length) {
      dispatch(
        getInventoryRequestDataAll(
          requestGenerator(
            requestSourceTypeEvent?.length ? requestData : requestData2
          )
        )
      ).then((result) => {
        fetchTotalDataResponse(result);
        setDisable(false);
      });
    }
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
      <GlobalSearch
        placeholder="Search by Name"
        value={searchTest}
        onChange={(e: any) => {
          trimValue(e);
          setSearchTest(e.target.value);
          if (e.target.value === "") {
            let emptyRequestData = {
              search: "",
              destination: "MAIN_STORE",
              filter: {
                reqSourceType: requestSourceTypeEvent?.toUpperCase(),
                reqSource: requestSourceEvent,
              },
              page: getPageIndex,
              pageSize: getDataPerPage,
              flag: getFlagStatus,
            };
            let emptyRequestData2 = {
              search: "",
              destination: "MAIN_STORE",
              page: getPageIndex,
              pageSize: getDataPerPage,
              flag: getFlagStatus,
            };

            dispatch(
              getInventoryRequestDataAll(
                requestGenerator(
                  requestSourceTypeEvent?.length ? emptyRequestData : emptyRequestData2
                )
              )
            ).then((result) => {
              fetchTotalDataResponse(result);
              setDisable(true);
            });
          }
        }}
        handleSearch={handleSearch}
      >
        <SmartSearch
          placeHolder="Smart Search"
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          isDisable={disable}
        />
      </GlobalSearch>
      <div className={styles.mainContainer}>
        <span
          className={
            greenTabs
              ? [styles.tabContent, styles.greenTab]?.join(" ")
              : styles.disableTab
          }
          onClick={() => (
            setTabs("Green"), setSearchTest(""), setDisable(true)
          )}
        >
          Green
        </span>
        <span
          className={
            tabs === "Orange"
              ? [styles.tabContent, styles.yellowTab]?.join(" ")
              : styles.orangeDisableTab
          }
          onClick={() => (
            setTabs("Orange"), setSearchTest(""), setDisable(true)
          )}
        >
          Orange
        </span>
        <span
          className={
            tabs === "Red"
              ? [styles.tabContent, styles.redTab]?.join(" ")
              : styles.redDisableTab
          }
          onClick={() => (setTabs("Red"), setSearchTest(""), setDisable(true))}
        >
          Red
        </span>
      </div>

      <div className={styles.tableContainer}>
        <TableV3
          getTableProps={getTableProps}
          getTableBodyProps={getTableBodyProps}
          headerGroups={headerGroups}
          rows={rows}
          prepareRow={prepareRow}
        />
      </div>
      {greenTabs && totalData > 10 && (
        <Pagination
          setDataPerPage={setDataPerPage}
          pageIndexOptions={pageIndexOptions}
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
        />
      )}
      {orangeTabs && totalData > 10 && (
        <Pagination
          setDataPerPage={setMediumQtyDataPerPage}
          pageIndexOptions={pageIndexOptions}
          pageIndex={mediumQtypageIndex}
          setPageIndex={setMediumQtyPageIndex}
        />
      )}
      {redTabs && totalData > 10 && (
        <Pagination
          setDataPerPage={setLowQtyDataPerPage}
          pageIndexOptions={pageIndexOptions}
          pageIndex={lowQtypageIndex}
          setPageIndex={setLowQtyPageIndex}
        />
      )}
      <div className={styles.btn}>
        <Button title="submit" handleClick={handleClose} />
      </div>
    </>
  );
};

export default MainStoreRequestPopup;

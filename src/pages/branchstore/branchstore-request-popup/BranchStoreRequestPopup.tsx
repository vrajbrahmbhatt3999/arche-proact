import { FC, useState, useEffect, useCallback } from "react";
import Loader from "../../../components/common/spinner/Loader";
import { colors } from "../../../constants/color";
import {
  CloseIcon,
  SearchIcon,
} from "../../../components/common/svg-components";
import Button from "../../../components/common/button/Button";
// import { addUniqueMainStoreData } from "../../../redux/features/branch-store/branchStoreSlice";
import { getAllBranchStoreRequestList } from "../../../redux/features/branch-store/branchStoreAsyncActions";
import { branchstoreRequestPopupHeaderData } from "../../../constants/table-data/branchStoreRequestPopupTableData";
import { requestGenerator } from "../../../utils/payloadGenerator";
import {
  Column,
  TableOptions,
  useGlobalFilter,
  useSortBy,
  useTable,
} from "react-table";
import TableV3 from "../../../components/common/table/tableV3/TableV3";
import SmartSearch from "../../../components/common/smart-search/SmartSearch";
import { useAppDispatch, useAppSelector } from "../../../hooks/index";
import { trimValue } from "../../../utils/utils";
import Pagination from "../../../components/common/pagination/Pagination";
import { Cols } from "../../../interfaces/interfaces";
import styles from "./branchstorerequestpopup.module.scss";

interface IRequestPopup {
  handleClose: any;
  handleSubmitData: any;
  popData: any;
}

const BranchStoreRequestPopup: FC<IRequestPopup> = ({
  handleClose,
  handleSubmitData,
  popData,
}) => {
  const dispatch = useAppDispatch();
  const {
    isLoading,
    selectedIssueData,
    selectedMainStoreData,
    brachStoreRequestData,
  } = useAppSelector((state) => state.branchStore);
  // console.log("selectedMainStoreData :>> ", selectedMainStoreData);
  // console.log("popData :>> ", popData);
  // Define State Variables
  const [dataPerPage, setDataPerPage] = useState<number>(10);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [tabs, setTabs] = useState("Green");
  const [requestSearch, setRequestSearch] = useState<string>("");
  const [isSmartSearchDisable, setIsSmartSearchDisable] =
    useState<boolean>(true);
  const data: Cols[] = brachStoreRequestData;
  const columns: Column<Cols>[] = branchstoreRequestPopupHeaderData;
  // tabs === "Green"
  //   ? branchstoreRequestPopupHeaderData
  //   : branchstoreRequestPopupHeaderData ?? [];
  const options: TableOptions<Cols> = {
    data,
    columns,
  };
  // console.log("tabs :>> ", tabs);
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

  // Set PageIndex and DataPerPage on tabs change
  useEffect(() => {
    setPageIndex(1);
    setDataPerPage(10);
  }, [tabs]);

  // function for genrating payload
  const genrateGetPayload = useCallback(
    (search?: string) => {
      if (popData?.request_type) {
        return {
          filter: {
            reqSourceType: popData?.request_type,
            reqSource: popData?.department_name || popData?.room_name,
          },
          destination: "BRANCH_STORE",
          search: search,
          flag: tabs?.toLowerCase(),
          page: pageIndex,
          pageSize: dataPerPage,
        };
      } else {
        return {
          destination: "BRANCH_STORE",
          search: search,
          flag: tabs?.toLowerCase(),
          page: pageIndex,
          pageSize: dataPerPage,
        };
      }
    },
    [tabs, pageIndex, dataPerPage, popData]
  );
  // const requestData = genrateGetPayload(requestSearch);
  // console.log("requestData :>> ", requestData);

  // API call for getting branch store request modal data
  useEffect(() => {
    const requestData = genrateGetPayload(requestSearch);
    dispatch(getAllBranchStoreRequestList(requestGenerator(requestData))).then(
      (result) => setTotalPage(result.payload.lastPage)
    );
  }, [dispatch, genrateGetPayload, tabs, dataPerPage, pageIndex]);

  // Function for search branch store request
  const handleSearch = () => {
    if (requestSearch?.length > 0) {
      setIsSmartSearchDisable(false);
      const requestData = genrateGetPayload(requestSearch);
      dispatch(
        getAllBranchStoreRequestList(requestGenerator(requestData))
      ).then((result) => {
        setIsSmartSearchDisable(false);
        setTotalPage(result.payload.lastPage);
      });
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div
        className={styles.branchStoreRequestItemPopupMainContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <CloseIcon
          customClass={styles.closeIconStyle}
          fillColor={colors.green1}
          handleClick={() => handleClose()}
        />
        <h1 className={styles.branchStoreRequestModalHeading}>Request</h1>
        <hr className={styles.branchStoreRequestModalDivider} />
        <div className={styles.branchStoreRequestContainer}>
          <div className={styles.searchContainer}>
            <div className={styles.search}>
              <input
                className={styles.searchInput}
                type="text"
                placeholder="Search by Item Name"
                value={requestSearch}
                onChange={(e) => {
                  trimValue(e);
                  setRequestSearch(e.target.value);
                  if (e.target.value.length === 0) {
                    setIsSmartSearchDisable(true);
                    setGlobalFilter("");
                    const requestData = genrateGetPayload(e.target.value);
                    dispatch(
                      getAllBranchStoreRequestList(
                        requestGenerator(requestData)
                      )
                    ).then((result) => setTotalPage(result.payload.lastPage));
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
          </div>
          <div className={styles.mainContainer}>
            <span
              className={
                tabs === "Green"
                  ? [styles.tabContent, styles.greenTab]?.join(" ")
                  : styles.greenDisableTab
              }
              onClick={() => setTabs("Green")}
            >
              Green
            </span>
            <span
              className={
                tabs === "Orange"
                  ? [styles.tabContent, styles.yellowTab]?.join(" ")
                  : styles.orangeDisableTab
              }
              onClick={() => setTabs("Orange")}
            >
              Orange
            </span>
            <span
              className={
                tabs === "Red"
                  ? [styles.tabContent, styles.redTab]?.join(" ")
                  : styles.redDisableTab
              }
              onClick={() => setTabs("Red")}
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
            {brachStoreRequestData?.length > 0 && (
              <Pagination
                pageSize={dataPerPage}
                setDataPerPage={setDataPerPage}
                pageIndexOptions={pageIndexOptions}
                pageIndex={pageIndex}
                setPageIndex={setPageIndex}
              />
            )}
          </div>
        </div>

        <div className={styles.btn}>
          <Button
            title="Submit"
            type="button"
            handleClick={handleSubmitData}
            disable={
              selectedIssueData?.length === 0 &&
              selectedMainStoreData?.length === 0
            }
          />
        </div>
      </div>
    </>
  );
};

export default BranchStoreRequestPopup;

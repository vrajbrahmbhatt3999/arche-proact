import { useState, useEffect, useCallback } from "react";
import {
  Column,
  TableOptions,
  useGlobalFilter,
  useSortBy,
  useTable,
} from "react-table";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { issueItemPopupHeaderData } from "../../../../constants/table-data/issuedItemPopupData";
import { getBranchStoreIssueList } from "../../../../redux/features/branch-store/branchStoreAsyncActions";
import { requestGenerator } from "../../../../utils/payloadGenerator";
import Loader from "../../../../components/common/spinner/Loader";
import { trimValue } from "../../../../utils/utils";
import SmartSearch from "../../../../components/common/smart-search/SmartSearch";
import TableV3 from "../../../../components/common/table/tableV3/TableV3";
import Pagination from "../../../../components/common/pagination/Pagination";
import styles from "./style.module.scss";
import GlobalSearch from "../../../../components/common/global-search-component/page";

const MainStoreIssueItem = () => {
  const dispatch = useAppDispatch();
  const { isLoading, branchStoreIssueData } = useAppSelector(
    (state) => state.branchStore
  );

  const { branchData } = useAppSelector((state) => state.login);

  // Define State Variables
  const [issuedItemsSearch, setIssuedItemsSearch] = useState<string>("");
  const [isSmartSearchDisable, setIsSmartSearchDisable] =
    useState<boolean>(true);
  const [dataPerPage, setDataPerPage] = useState<number>(10);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [pageIndex, setPageIndex] = useState<number>(1);

  const data: any = branchStoreIssueData ?? [];
  const columns: Column<any>[] = issueItemPopupHeaderData ?? [];
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

  // function for creating Page Index Array
  const pageIndexArray = () => {
    let pageIndexOptions = [];
    for (let i = 1; i <= totalPage; i++) {
      pageIndexOptions.push(i);
    }
    return pageIndexOptions;
  };
  const pageIndexOptions = pageIndexArray();

  // function for genrating payload
  const genrateGetPayload = useCallback(
    (search?: string) => {
      return {
        name: search,
        page: pageIndex,
        pageSize: dataPerPage,
        store_id: branchData?.main_store?.[0]?._id,
      };
    },
    [pageIndex, dataPerPage, branchData?.main_store]
  );

  // API call for getting issued items modal data
  useEffect(() => {
    const requestData = genrateGetPayload(issuedItemsSearch);
    dispatch(getBranchStoreIssueList(requestGenerator(requestData))).then(
      (result) => setTotalPage(result.payload.lastPage)
    );
  }, [dispatch, genrateGetPayload, dataPerPage, pageIndex]);

  // Function for search issued items
  const handleSearch = () => {
    if (issuedItemsSearch?.length > 0) {
      setIsSmartSearchDisable(false);
      const requestData = genrateGetPayload(issuedItemsSearch);
      dispatch(getBranchStoreIssueList(requestGenerator(requestData))).then(
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
      <GlobalSearch
        placeholder="Search By Item Name"
        value={issuedItemsSearch}
        onChange={(e: any) => {
          trimValue(e);
          setIssuedItemsSearch(e.target.value);
          if (e.target.value.length === 0) {
            setIsSmartSearchDisable(true);
            setGlobalFilter("");
            const requestData = genrateGetPayload(e.target.value);
            dispatch(
              getBranchStoreIssueList(requestGenerator(requestData))
            ).then((result) => setTotalPage(result.payload.lastPage));
          }
        }}
        handleSearch={() => handleSearch()}
      >
        <SmartSearch
          placeHolder={"Smart Search"}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          isDisable={isSmartSearchDisable}
          customClassInput={styles.smartSearchInput}
        />
      </GlobalSearch>

      <div className={styles.tableContainer}>
        <TableV3
          getTableProps={getTableProps}
          getTableBodyProps={getTableBodyProps}
          headerGroups={headerGroups}
          rows={rows}
          prepareRow={prepareRow}
        />
      </div>
      {branchStoreIssueData?.length > 0 && (
        <Pagination
          pageSize={dataPerPage}
          setDataPerPage={setDataPerPage}
          pageIndexOptions={pageIndexOptions}
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
        />
      )}
    </>
  );
};
export default MainStoreIssueItem;

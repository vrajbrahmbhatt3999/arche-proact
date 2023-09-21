import { useEffect, useState } from "react";
import styles from "./submittedpopopup.module.scss";
import { SubmittedpoHeaderData } from "../../../constants/table-data/submittedPoTableDataPopup";
import TableV3 from "../../../components/common/table/tableV3/TableV3";
import {
  Column,
  TableOptions,
  useGlobalFilter,
  useSortBy,
  useTable,
} from "react-table";

import SmartSearch from "../../../components/common/smart-search/SmartSearch";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { getInventoryAllPo } from "../../../redux/features/inventory-request/inventoryRequestAsyncActions";
import { requestGenerator } from "../../../utils/payloadGenerator";
import Loader from "../../../components/common/spinner/Loader";
import Pagination from "../../../components/common/pagination/Pagination";
import { trimValue } from "../../../utils/utils";
import GlobalSearch from "../../../components/common/global-search-component/page";

const SubmittedPoPopup = () => {
  const { isLoading, getAlldirectPoData } = useAppSelector(
    (state) => state.inventoryRequest
  );

  const [searchTest, setSearchTest] = useState("");
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<any>(0);
  const [dataPerPage, setDataPerPage] = useState<number>(10);
  const [totalData, setTotalData] = useState(0);

  const dispatch = useAppDispatch();

  const pageIndexArray = () => {
    let pageIndexOptions = [];
    for (let i = 1; i <= Math.ceil(totalPage); i++) {
      pageIndexOptions.push(i);
    }
    return pageIndexOptions;
  };
  const pageIndexOptions = pageIndexArray();

  useEffect(() => {
    let requestData = {
      search: searchTest,
      page: pageIndex,
      pageSize: dataPerPage,
      order_by: { name: 1 },
    };
    dispatch(getInventoryAllPo(requestGenerator(requestData))).then(
      (result: any) => {
        setTotalPage(result.payload.lastPage);
        setTotalData(result.payload.total);
      }
    );
  }, [dataPerPage, dispatch, pageIndex]);
  const data: any = getAlldirectPoData ?? [];
  const columns: Column<any>[] = SubmittedpoHeaderData ?? [];
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

  const handleSearch = () => {
    if (searchTest?.length) {
      let requestData = {
        search: searchTest,
        page: pageIndex,
        pageSize: dataPerPage,
        order_by: { name: 1 },
      };
      dispatch(getInventoryAllPo(requestGenerator(requestData))).then(
        (result: any) => {
          setTotalPage(result.payload.lastPage);
          setTotalData(result.payload.total);
        }
      );
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <GlobalSearch
        placeholder="Search"
        value={searchTest}
        onChange={(e: any) => {
          trimValue(e);
          setSearchTest(e.target.value);
          if (e.target.value === "") {
            let requestData = {
              page: pageIndex,
              pageSize: dataPerPage,
              order_by: { name: 1 },
            };
            dispatch(getInventoryAllPo(requestGenerator(requestData))).then(
              (result: any) => {
                setTotalPage(result.payload.lastPage);
                setTotalData(result.payload.total);
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
          isDisable={!searchTest?.length}
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
      {!!(totalData > 10) && (
        <Pagination
          setDataPerPage={setDataPerPage}
          pageIndexOptions={pageIndexOptions}
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
        />
      )}
    </>
  );
};

export default SubmittedPoPopup;

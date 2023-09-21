import { FC, useEffect, useState } from "react";
import styles from "./directpopopup.module.scss";
import { directPoPoupHeaderData } from "../../../constants/table-data/directPoPopupTableData";
import Button from "../../../components/common/button/Button";
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
import { requestGenerator } from "../../../utils/payloadGenerator";
import { getItemFromStore } from "../../../redux/features/inventory-request/inventoryRequestAsyncActions";
import Loader from "../../../components/common/spinner/Loader";
import Pagination from "../../../components/common/pagination/Pagination";
import { trimValue } from "../../../utils/utils";
import GlobalSearch from "../../../components/common/global-search-component/page";
interface IDirectPoopup {
  closeModal?: () => void;
}

const DirectPoPopup: FC<IDirectPoopup> = ({ closeModal }) => {
  const { isLoading, getItemWithStoreData } = useAppSelector(
    (state) => state.inventoryRequest
  );

  const { branchData } = useAppSelector((state) => state.login);

  const [totalPage, setTotalPage] = useState<any>(0);
  const [dataPerPage, setDataPerPage] = useState<number>(10);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [totalData, setTotalData] = useState(0);
  const [searchTest, setSearchTest] = useState("");
  const [disable, setDisable] = useState(true);

  const pageIndexArray = () => {
    let pageIndexOptions = [];
    for (let i = 1; i <= Math.ceil(totalPage); i++) {
      pageIndexOptions.push(i);
    }
    return pageIndexOptions;
  };
  const pageIndexOptions = pageIndexArray();

  const dispatch = useAppDispatch();

  let requestData = {
    store_id: branchData?.main_store?.[0]?._id,
    search: searchTest,
    page: pageIndex,
    pageSize: dataPerPage,
  };

  useEffect(() => {
    dispatch(getItemFromStore(requestGenerator(requestData))).then((result) => {
      setTotalPage(result.payload.lastPage);
      setTotalData(result.payload.total);
    });
  }, [dispatch, pageIndex, dataPerPage]);

  const handleSearch = () => {
    if (searchTest?.length) {
      dispatch(getItemFromStore(requestGenerator(requestData))).then(
        (result) => {
          setTotalPage(result.payload.lastPage);
          setTotalData(result.payload.total);
          setDisable(false);
        }
      );
    }
  };

  const data: any = getItemWithStoreData ?? [];
  const columns: Column<any>[] = directPoPoupHeaderData ?? [];
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
      {/* <div className={styles.searchContainer}>
        <span className={styles.text}>Item Name</span>
      </div> */}
      <GlobalSearch
        placeholder="Search by Item Name"
        value={searchTest}
        onChange={(e: any) => {
          trimValue(e);
          setSearchTest(e.target.value);
          if (e.target.value === "") {
            let requestData = {
              search: "",
              page: pageIndex,
              pageSize: dataPerPage,
            };
            dispatch(getItemFromStore(requestGenerator(requestData))).then(
              (result) => {
                setTotalPage(result.payload.lastPage);
                setTotalData(result.payload.total);
                setDisable(true);
              }
            );
          }
        }}
        handleSearch={() => handleSearch()}
      >
        <SmartSearch
          placeHolder={"Smart Search"}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          isDisable={disable}
        />
      </GlobalSearch>

      <div className={styles.tablestyle}>
        <TableV3
          getTableProps={getTableProps}
          getTableBodyProps={getTableBodyProps}
          headerGroups={headerGroups}
          rows={rows}
          prepareRow={prepareRow}
        />
      </div>
      {totalData > 10 && (
        <Pagination
          setDataPerPage={setDataPerPage}
          pageIndexOptions={pageIndexOptions}
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
        />
      )}
      <div className={styles.btn}>
        <Button title="Submit PO" handleClick={closeModal} />
      </div>
    </>
  );
};

export default DirectPoPopup;

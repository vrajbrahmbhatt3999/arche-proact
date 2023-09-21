import { FC, useState, useEffect, useCallback } from "react";
import { colors } from "../../../constants/color";
import { useAppDispatch, useAppSelector } from "../../../hooks/index";
import {
  CloseIcon,
  SearchIcon,
} from "../../../components/common/svg-components";
import {
  mainstoreHeaderData,
  mainstorePopupData,
} from "../../../constants/table-data/mainStoreRequestItemTableDataPopup";
import SmartSearch from "../../../components/common/smart-search/SmartSearch";
import {
  Column,
  TableOptions,
  useGlobalFilter,
  useSortBy,
  useTable,
} from "react-table";
import TableV3 from "../../../components/common/table/tableV3/TableV3";
import { requestGenerator } from "../../../utils/payloadGenerator";
import { getMainStoreRequestItemsPayload } from "../../../redux/features/branch-store/branchStoreSlice";
import { getBranchStoreMainStoreRequestList } from "../../../redux/features/branch-store/branchStoreAsyncActions";
import Pagination from "../../../components/common/pagination/Pagination";
import { trimValue } from "../../../utils/utils";
import Loader from "../../../components/common/spinner/Loader";
import styles from "./mainstorerequestitempopup.module.scss";

interface IRequestPopup {
  handleClose?: any;
  handleRowClick?: any;
  handleOpen?: any;
}

const MainStoreRequestItemPopup: FC<IRequestPopup> = ({
  handleClose,
  handleRowClick,
  handleOpen,
}) => {
  const dispatch = useAppDispatch();
  const { isLoading, branchStoreMainStoreRequestData } = useAppSelector(
    (state) => state.branchStore
  );
  // console.log(
  //   "branchStoreMainStoreRequestData :>> ",
  //   branchStoreMainStoreRequestData
  // );
  // Define State Variables
  const [mainStoreRequestSearch, setMainStoreRequestSearch] =
    useState<string>("");
  const [isSmartSearchDisable, setIsSmartSearchDisable] =
    useState<boolean>(true);
  const [dataPerPage, setDataPerPage] = useState<number>(10);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [pageIndex, setPageIndex] = useState<number>(1);

  const data: any = branchStoreMainStoreRequestData ?? [];
  const columns: Column<any>[] = mainstoreHeaderData ?? [];
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
        dateSearch: search,
        page: pageIndex,
        pageSize: dataPerPage,
      };
    },
    [pageIndex, dataPerPage]
  );

  // API call for getting main store request modal data
  useEffect(() => {
    const requestData = genrateGetPayload(mainStoreRequestSearch);
    dispatch(getMainStoreRequestItemsPayload(requestData));
    if (mainStoreRequestSearch?.length > 0) {
      setIsSmartSearchDisable(false);
      dispatch(
        getBranchStoreMainStoreRequestList(requestGenerator(requestData))
      ).then((result) => setTotalPage(result.payload.lastPage));
    } else {
      dispatch(
        getBranchStoreMainStoreRequestList(requestGenerator(requestData))
      ).then((result) => setTotalPage(result.payload.lastPage));
    }
  }, [
    dispatch,
    genrateGetPayload,
    dataPerPage,
    pageIndex,
    mainStoreRequestSearch,
  ]);

  // Function for search main store request
  // const handleSearch = () => {
  //   if (mainStoreRequestSearch?.length > 0) {
  //     const requestData = genrateGetPayload(mainStoreRequestSearch);
  //     dispatch(
  //       getBranchStoreMainStoreRequestList(requestGenerator(requestData))
  //     ).then((result) => {
  //       setIsSmartSearchDisable(false);
  //       setTotalPage(result.payload.lastPage);
  //     });
  //   }
  // };

  return (
    <>
      {isLoading && <Loader />}

      <div
        className={styles.mainStoreRequestItemPopupMainContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <CloseIcon
          customClass={styles.closeIconStyle}
          fillColor={colors.green1}
          handleClick={() => handleClose()}
        />
        <h1 className={styles.mainStoreRequestModalHeading}>
          Main Store Request Items
        </h1>
        <hr className={styles.mainStoreRequestModalDivider} />
        <div className={styles.mainStoreRequestContainer}>
          <div className={styles.searchContainer}>
            <div className={styles.search}>
              <label htmlFor={"date"} className={styles.searchLabel}>
                Date
              </label>
              <input
                className={styles.searchInput}
                type="date"
                // placeholder="Search"
                value={mainStoreRequestSearch}
                onChange={(e) => {
                  trimValue(e);
                  setMainStoreRequestSearch(e.target.value);
                  if (e.target.value.length === 0) {
                    setIsSmartSearchDisable(true);
                    setGlobalFilter("");
                    const requestData = genrateGetPayload(e.target.value);
                    dispatch(getMainStoreRequestItemsPayload(requestData));
                    dispatch(
                      getBranchStoreMainStoreRequestList(
                        requestGenerator(requestData)
                      )
                    ).then((result) => setTotalPage(result.payload.lastPage));
                  }
                }}
              />
              {/* <div className={styles.searchButton} onClick={handleSearch}>
                <SearchIcon fillColor={colors.white1} />
              </div> */}
            </div>
            <SmartSearch
              placeHolder={"Smart Search"}
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
              isDisable={isSmartSearchDisable}
              customClassInput={styles.smartSearchInput}
            />
          </div>
          <div className={styles.tableContainer}>
            <TableV3
              getTableProps={getTableProps}
              getTableBodyProps={getTableBodyProps}
              headerGroups={headerGroups}
              rows={rows}
              prepareRow={prepareRow}
              handleClick={handleRowClick}
              handleOpen={handleOpen}
            />
            {branchStoreMainStoreRequestData?.length > 0 && (
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
      </div>
    </>
  );
};

export default MainStoreRequestItemPopup;

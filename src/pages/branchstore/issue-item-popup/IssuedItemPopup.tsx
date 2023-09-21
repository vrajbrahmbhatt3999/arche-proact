import { FC, useState, useEffect, useCallback } from "react";
import { colors } from "../../../constants/color";
import { useAppDispatch, useAppSelector } from "../../../hooks/index";
import {
  CloseIcon,
  SearchIcon,
} from "../../../components/common/svg-components";
import {
  issueItemPopupHeaderData,
} from "../../../constants/table-data/issuedItemPopupData";
import {
  Column,
  TableOptions,
  useGlobalFilter,
  useSortBy,
  useTable,
} from "react-table";
import SmartSearch from "../../../components/common/smart-search/SmartSearch";
import Loader from "../../../components/common/spinner/Loader";
import TableV3 from "../../../components/common/table/tableV3/TableV3";
import { trimValue } from "../../../utils/utils";
import { requestGenerator } from "../../../utils/payloadGenerator";
import { getBranchStoreIssueList } from "../../../redux/features/branch-store/branchStoreAsyncActions";
import styles from "./issueditempopup.module.scss";
import Pagination from "../../../components/common/pagination/Pagination";

interface IIssueItemPopup {
  handleClose?: any;
}

const IssueItemPopup: FC<IIssueItemPopup> = ({ handleClose }) => {
  const dispatch = useAppDispatch();
  const { branchData } = useAppSelector((state) => state.login);
  const { isLoading, branchStoreIssueData } = useAppSelector(
    (state) => state.branchStore
  );
  // console.log("branchStoreIssueData :>> ", branchStoreIssueData);

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
        store_id: branchData?.main_store?.[0]?._id,
        // store_id: "64c3809a8e6dbe248dc566e9",
        page: pageIndex,
        pageSize: dataPerPage,
      };
    },
    [pageIndex, dataPerPage]
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
      <div
        className={styles.issueItemPopupMainContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <CloseIcon
          customClass={styles.closeIconStyle}
          fillColor={colors.green1}
          handleClick={() => handleClose()}
        />
        <h1 className={styles.issuedItemsModalHeading}>Issued Items</h1>
        <hr className={styles.issuedItemsModalDivider} />
        <div className={styles.issuedItemsContainer}>
          <div className={styles.searchContainer}>
            <div className={styles.search}>
              <input
                className={styles.searchInput}
                type="text"
                placeholder="Search By Item Name"
                value={issuedItemsSearch}
                onChange={(e) => {
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

          <div className={styles.tableContainer}>
            <TableV3
              getTableProps={getTableProps}
              getTableBodyProps={getTableBodyProps}
              headerGroups={headerGroups}
              rows={rows}
              prepareRow={prepareRow}
            />
            {branchStoreIssueData?.length > 0 && (
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
export default IssueItemPopup;

import { FC, useState, useEffect } from "react";
import {
  Column,
  TableOptions,
  useGlobalFilter,
  useSortBy,
  useTable,
} from "react-table";
import { Cols } from "../../../../interfaces/interfaces";
import Pagination from "../../pagination/Pagination";
import TableV3 from "../../../../components/common/table/tableV3/TableV3";
import { searchModalV2HeaderData } from "../../../../constants/table-data/searchModalV2HeaderData";
import {
  CloseIcon,
  SearchIcon,
} from "../../../../components/common/svg-components";
import { getReceiptPatientList } from "../../../../redux/features/receipt/receiptAsyncActions";
import { requestGenerator } from "../../../../utils/payloadGenerator";
import { useAppDispatch, useAppSelector } from "../../../../hooks/index";
import { colors } from "../../../../constants/color";
import styles from "./searchModalV2.module.scss";
import SmartSearch from "../../smart-search/SmartSearch";
import { trimValue } from "../../../../utils/utils";
import Loader from "../../spinner/Loader";

interface ISearchModalV2 {
  handleRowClick: any;
  handleClose: (e?: React.MouseEvent<HTMLElement>) => void;
  popData: any;
}

const SearchModalV2: FC<ISearchModalV2> = ({
  handleClose,
  popData,
  handleRowClick,
}) => {
  const dispatch = useAppDispatch();
  const { isLoading, receiptPatientData } = useAppSelector(
    (state) => state.receipt
  );
  // console.log("receiptPatientData :>> ", receiptPatientData);
  // Define State Variables
  const [patientSearch, setPatientSearch] = useState<string>("");
  const [isSmartSearchDisable, setIsSmartSearchDisable] =
    useState<boolean>(true);
  const [dataPerPage, setDataPerPage] = useState<number>(10);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [pageIndex, setPageIndex] = useState<number>(1);
  // React Table define
  const data: Cols[] = receiptPatientData;
  const columns: Column<Cols>[] = searchModalV2HeaderData;
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

  // API call for patient history modal
  useEffect(() => {
    let payloadData = {
      search: patientSearch,
      // branch_id: popData,
      page: pageIndex,
      pageSize: dataPerPage,
    };
    dispatch(getReceiptPatientList(requestGenerator(payloadData))).then(
      (result) => setTotalPage(result.payload.lastPage)
    );
  }, [dispatch, dataPerPage, pageIndex]);

  const handleSearch = () => {
    if (patientSearch?.length > 0) {
      // console.log("labRequestSearch :>> ", labRequestSearch);
      let payloadData = {
        search: patientSearch,
        // branch_id: popData,
        page: pageIndex,
        pageSize: dataPerPage,
      };
      dispatch(getReceiptPatientList(requestGenerator(payloadData))).then(
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
        className={styles.patientSearchModalContainer}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <CloseIcon
          customClass={styles.closeIconStyle}
          fillColor={colors.green1}
          handleClick={() => {
            handleClose();
          }}
        />
        <h1 className={styles.patientSearchModalHeading}>Patient Search</h1>
        <hr className={styles.patientSearchLogModalDivider} />
        <div className={styles.patientSearchContainer}>
          <div className={styles.searchContainer}>
            <div className={styles.search}>
              <input
                className={styles.searchInput}
                type="text"
                placeholder="Search"
                value={patientSearch}
                onChange={(e) => {
                  trimValue(e);
                  setPatientSearch(e.target.value);
                  if (e.target.value.length === 0) {
                    setIsSmartSearchDisable(true);
                    setGlobalFilter("");
                    let payloadData = {
                      search: e.target.value,
                      // branch_id: popData,
                      page: pageIndex,
                      pageSize: dataPerPage,
                    };
                    dispatch(
                      getReceiptPatientList(requestGenerator(payloadData))
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
              handleClick={handleRowClick}
              getTableProps={getTableProps}
              getTableBodyProps={getTableBodyProps}
              headerGroups={headerGroups}
              rows={rows}
              prepareRow={prepareRow}
            />
          </div>
          {receiptPatientData?.length > 0 && (
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
    </>
  );
};

export default SearchModalV2;

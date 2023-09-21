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
import { receiptOutstandingModalHeaderData } from "../../../../constants/table-data/receiptOutstandingModalHeaderData";
import {
  CloseIcon,
  SearchIcon,
} from "../../../../components/common/svg-components";
import {
  // getReceiptPatientOutstandingList,
  getOutstandingInoviceList,
} from "../../../../redux/features/receipt/receiptAsyncActions";
import { addGetOutstandingInoviceListPayload } from "../../../../redux/features/receipt/receiptSlice";
import { requestGenerator } from "../../../../utils/payloadGenerator";
import { useAppDispatch, useAppSelector } from "../../../../hooks/index";
import { colors } from "../../../../constants/color";
import styles from "./outStanding.module.scss";
import SmartSearch from "../../smart-search/SmartSearch";
import { trimValue } from "../../../../utils/utils";
import Loader from "../../spinner/Loader";
import Button from "../../button/Button";

interface IOutstandingModal {
  handleClose: (e?: React.MouseEvent<HTMLElement>) => void;
  handleYes: any;
  handleOpen: any;
  popData: any;
}

const OutstandingModal: FC<IOutstandingModal> = ({
  handleClose,
  handleYes,
  handleOpen,
  popData,
}) => {
  const dispatch = useAppDispatch();
  const { isLoading, receiptPatientOutstandingData, selectedInvoiceData } =
    useAppSelector((state) => state.receipt);
  // Define State Variables
  const [patientSearch, setPatientSearch] = useState<string>("");
  const [isSmartSearchDisable, setIsSmartSearchDisable] =
    useState<boolean>(true);
  const [dataPerPage, setDataPerPage] = useState<number>(10);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [pageIndex, setPageIndex] = useState<number>(1);
  // React Table define
  const data: Cols[] = receiptPatientOutstandingData;
  const columns: Column<Cols>[] = receiptOutstandingModalHeaderData;
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
      getType: "outstanding",
      search: patientSearch,
      patient_id: popData,
      page: pageIndex,
      pageSize: dataPerPage,
    };
    dispatch(addGetOutstandingInoviceListPayload(payloadData));
    dispatch(getOutstandingInoviceList(requestGenerator(payloadData))).then(
      (result) => setTotalPage(result.payload.lastPage)
    );
  }, [dispatch, dataPerPage, pageIndex, popData]);

  const handleSearch = () => {
    if (patientSearch?.length > 0) {
      // console.log("labRequestSearch :>> ", labRequestSearch);
      let payloadData = {
        getType: "outstanding",
        search: patientSearch,
        patient_id: popData,
        page: pageIndex,
        pageSize: dataPerPage,
      };
      dispatch(addGetOutstandingInoviceListPayload(payloadData));
      dispatch(getOutstandingInoviceList(requestGenerator(payloadData))).then(
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
        className={styles.outStandingModalContainer}
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
        <h1 className={styles.outStandingModalHeading}>Outstanding</h1>
        <hr className={styles.outStandingModalDivider} />
        <div className={styles.outStandingContainer}>
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
                      getType: "outstanding",
                      search: e.target.value,
                      patient_id: popData,
                      page: pageIndex,
                      pageSize: dataPerPage,
                    };
                    dispatch(addGetOutstandingInoviceListPayload(payloadData));
                    dispatch(
                      getOutstandingInoviceList(requestGenerator(payloadData))
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
              handleClick={handleOpen}
            />
          </div>
          {receiptPatientOutstandingData?.length > 0 && (
            <Pagination
              pageSize={dataPerPage}
              setDataPerPage={setDataPerPage}
              pageIndexOptions={pageIndexOptions}
              pageIndex={pageIndex}
              setPageIndex={setPageIndex}
            />
          )}
        </div>
        <div className={styles.outStandingBtnContaniner}>
          <Button
            title="Add"
            type="button"
            customClass={styles.outStandingBtn}
            handleClick={handleYes}
            disable={selectedInvoiceData?.length === 0}
          />
        </div>
      </div>
    </>
  );
};

export default OutstandingModal;

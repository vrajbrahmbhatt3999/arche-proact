import React, { FC, useEffect, useState } from "react";
import styles from "./SettledInvoiceV1Modal.module.scss";
import { CloseIcon, SearchButton } from "../../svg-components";
import { colors } from "../../../../constants/color";
import Divider from "../../divider/Divider";
import { trimValue } from "../../../../utils/utils";
import TableV3 from "../../table/tableV3/TableV3";
import Pagination from "../../pagination/Pagination";
import { requestGenerator } from "../../../../utils/payloadGenerator";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import {
  settledInvoiceHeaderDataV1,
} from "../../../../constants/table-data/labInvoiceTabledata";
import { Cols } from "../../../../interfaces/interfaces";
import {
  Column,
  TableOptions,
  useGlobalFilter,
  useSortBy,
  useTable,
} from "react-table";
import { getPatientSettledInvoice } from "../../../../redux/features/lab-invoice/labInvoiceAsyncActions";
import Loader from "../../spinner/Loader";
import { result } from "lodash";

interface ISettledInvoiceModal {
  setModelOpenClose?: any;
  handleRowClick?: any;
  handleClose?: any;
  popData?: any;
  message?: any

}

const SettledInvoiceV1Modal: FC<ISettledInvoiceModal> = ({
  setModelOpenClose,
  handleRowClick,
  handleClose,
  popData,
  message
}) => {
  const dispatch = useAppDispatch();

  const { settledInvoiceObject, settledInvoiceList, isLoading } = useAppSelector(
    (state) => state.labInvoice
  );

  // React Table define
  const data: Cols[] = settledInvoiceList;
  const columns: Column<Cols>[] = settledInvoiceHeaderDataV1;
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
  const [dataPerPage, setDataPerPage] = useState<number>(10);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [pageIndex, setPageIndex] = useState<number>(1);


  // function for creating Page Index Array
  const pageIndexArray = () => {
    let pageIndexOptions = [];
    for (let i = 1; i <= totalPage; i++) {
      pageIndexOptions.push(i);
    }
    return pageIndexOptions;
  };
  const pageIndexOptions = pageIndexArray();

  const [searchValue, setSearchValue] = useState<string>("");
  const [smartSearchValue, setSmartSearchValue] = useState<string>("");
  const [activateSmartSearch, setActivateSmartSearch] =
    useState<boolean>(false);

  const handleInputSearch = () => {
    setActivateSmartSearch(true);
    const requestData = {
      search: searchValue,
      type: "LABORATORY",
      page: pageIndex,
      pageSize: dataPerPage,
    };
    dispatch(getPatientSettledInvoice(requestGenerator(requestData))).then((result) =>
      setTotalPage(result.payload.lastPage)
    );
  };

  useEffect(() => {
    if (searchValue === "") {
      setActivateSmartSearch(false);
      setGlobalFilter("");
      const requestData = {
        search: searchValue,
        type: "LABORATORY",
        page: pageIndex,
        pageSize: dataPerPage,
      };

      if (popData?.patient_id) {
        dispatch(getPatientSettledInvoice(requestGenerator({ ...requestData, patient_id: popData?.patient_id }))).then(
          (result) => setTotalPage(result.payload.lastPage)
        );
      } else {
        dispatch(getPatientSettledInvoice(requestGenerator(requestData))).then(
          (result) => setTotalPage(result.payload.lastPage)
        );
      }
    }


  }, [dispatch, pageIndex, dataPerPage]);

  return (
    <>

      {isLoading && <Loader />}

      <div
        className={styles.mainContainer}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={styles.closeIconContainer}>
          <CloseIcon
            customClass={styles.closeIconStyle}
            fillColor={colors.green1}
            handleClick={() => handleClose()}
          />
        </div>
        <p className={styles.title}>Settled Invoices</p>
        <Divider customClass={styles.dividerStyle} />
        <div className={styles.searchFieldContainer}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "25px",
            }}
          >
            <div
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <input
                type="text"
                className={styles.inputSearchContainer}
                placeholder="Search"
                onChange={(e) => {
                  trimValue(e);
                  setSearchValue(e.target.value);
                  setGlobalFilter("");
                }}
              />

              <SearchButton
                handleClick={() => {
                  if (!!searchValue) {
                    handleInputSearch();
                  }
                }}
                customClass={styles.inputSearchButton}
              />
            </div>

            <div
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "row",
                marginLeft: "18px",
              }}
            >
              <input
                type="text"
                className={
                  !activateSmartSearch
                    ? styles.inputSmartSearchContainer
                    : styles.inputSearchContainer
                }
                placeholder="Smart Search"
                disabled={!activateSmartSearch}
                onChange={(e) => {
                  trimValue(e);
                  setGlobalFilter(e.target.value);
                }}
                value={searchValue === "" ? searchValue : globalFilter}
              />
            </div>
          </div>

          <Divider customClass={styles.dividerStyling} />
          <div className={styles.tableContainer}>
            <TableV3
              handleRowClick={(item: any) =>
                handleRowClick && handleRowClick(item)
              }
              getTableProps={getTableProps}
              getTableBodyProps={getTableBodyProps}
              headerGroups={headerGroups}
              rows={rows}
              prepareRow={prepareRow}
              setModelOpenClose={setModelOpenClose}
            />
          </div>

          {settledInvoiceList?.length < 9 &&
            settledInvoiceObject?.lastPage === 1 &&
            settledInvoiceObject?.nextPage === 0 &&
            settledInvoiceObject?.previousPage === 0 ? (
            " "
          ) : (
            <Pagination
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

export default SettledInvoiceV1Modal;

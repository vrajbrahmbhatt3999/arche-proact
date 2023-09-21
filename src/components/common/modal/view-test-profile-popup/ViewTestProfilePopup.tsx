import { FC, useState, useEffect } from "react";
import styles from "./viewTestProfilePopup.module.scss";
import { CloseIcon, SearchButton } from "../../svg-components";
import { colors } from "../../../../constants/color";
import Divider from "../../divider/Divider";
import Pagination from "../../pagination/Pagination";
import TableV3 from "../../table/tableV3/TableV3";
import { trimValue } from "../../../../utils/utils";
import {
  Column,
  TableOptions,
  useGlobalFilter,
  useSortBy,
  useTable,
} from "react-table";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { getAllLabTestProfile } from "../../../../redux/features/lab/labAsyncActions";
import { requestGenerator } from "../../../../utils/payloadGenerator";
import Loader from "../../spinner/Loader";
import {
  testProfileDummyData,
  viewTestProfileHeaderData,
} from "../../../../constants/table-data/viewTestProfilePopupData";
import { Cols } from "../../../../interfaces/interfaces";

interface IViewTestProfile {
  handleClose?: any;
  handleOpen?: any;
  handleRowClick?: any;
  headerData?: any
}

const ViewTestProfilePopup: FC<IViewTestProfile> = ({
  handleClose,
  handleOpen,
  handleRowClick,
  headerData
}) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [activateSmartSearch, setActivateSmartSearch] =
    useState<boolean>(false);
  const [dataPerPage, setDataPerPage] = useState<number>(10);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const dispatch = useAppDispatch();
  const { isLoading, testProfileData } = useAppSelector((state) => state.lab);

  // function for creating Page Index Array
  const pageIndexArray = () => {
    let pageIndexOptions = [];
    for (let i = 1; i <= totalPage; i++) {
      pageIndexOptions.push(i);
    }
    return pageIndexOptions;
  };
  const pageIndexOptions = pageIndexArray();

  useEffect(() => {
    let requestData = {
      search: searchValue,
      page: pageIndex,
      pageSize: dataPerPage,
      order_by: { name: 1 },
    };
    dispatch(getAllLabTestProfile(requestGenerator(requestData))).then(
      (result) => setTotalPage(result.payload.lastPage)
    );
  }, [pageIndex, dataPerPage]);

  const data: Cols[] =
    testProfileData?.length > 0 || testProfileData !== undefined
      ? testProfileData
      : testProfileDummyData;
  const columns: Column<Cols>[] = viewTestProfileHeaderData;
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

  const handleInputSearch = () => {
    setActivateSmartSearch(true);
    let requestData = {
      search: searchValue,
      page: 1,
      pageSize: 10,
      order_by: { name: 1 },
    };
    setPageIndex(1)
    dispatch(getAllLabTestProfile(requestGenerator(requestData)));
  };


  useEffect(() => {
    setSearchValue("")
    setGlobalFilter(undefined)
    setActivateSmartSearch(false)
  }, [headerData])

  useEffect(() => {
    if (globalFilter === undefined) {
      let requestData = {
        search: searchValue,
        page: pageIndex,
        pageSize: dataPerPage,
        order_by: { name: 1 },
      };
      dispatch(
        getAllLabTestProfile(requestGenerator(requestData))
      );
    }
  }, [globalFilter])



  return (
    <>
      {/* {isLoading && <Loader />} */}
      <div
        className={styles.notesPopupContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <CloseIcon
          customClass={styles.closeIconStyle}
          fillColor={colors.green1}
          handleClick={() => handleClose()}
        />
        <div className={styles.notesContainer}>
          <p className={styles.title}>View Test Profile</p>
          <Divider customClass={styles.dividerStyle} />
          <div className={styles.mainContainer}>
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
                    placeholder="Search by profile name"
                    value={searchValue}
                    onChange={(e) => {
                      trimValue(e);
                      setSearchValue(e.target.value);
                      setGlobalFilter("");
                      if (e.target.value === "") {
                        let requestData = {
                          search: e.target.value,
                          page: pageIndex,
                          pageSize: dataPerPage,
                          order_by: { name: 1 },
                        };
                        dispatch(
                          getAllLabTestProfile(requestGenerator(requestData))
                        );
                        setActivateSmartSearch(false)
                      }
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
            </div>
            <div className={styles.tableContainer}>
              <TableV3
                getTableProps={getTableProps}
                getTableBodyProps={getTableBodyProps}
                headerGroups={headerGroups}
                rows={rows}
                prepareRow={prepareRow}
                handleOpen={handleOpen}
                handleRowClick={handleRowClick}
              // handleInputState={searchValue}
              />
            </div>
            {testProfileData?.length > 0 && (
              <Pagination
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

export default ViewTestProfilePopup;

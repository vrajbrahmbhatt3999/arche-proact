import { FC, useState, useEffect } from "react";
import styles from "./medicineCompositionPopup.module.scss";
import { CloseIcon, SearchButton } from "../../svg-components";
import { colors } from "../../../../constants/color";
import Divider from "../../divider/Divider";
import { trimValue } from "../../../../utils/utils";
import TableV2 from "../../table/tableV2/TableV2";
import {
  medicineCompositionHeaderData,
  meicineCompositionDummyData,
} from "../../../../constants/table-data/medicineCompositionPopupData";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { requestGenerator } from "../../../../utils/payloadGenerator";
import { findMedicine } from "../../../../redux/features/diagnosis/diagnosisAsyncActions";
import {
  Column,
  TableOptions,
  useGlobalFilter,
  useSortBy,
  useTable,
} from "react-table";
import { Cols } from "../../../../interfaces/interfaces";
import TableV3 from "../../table/tableV3/TableV3";
import Pagination from "../../pagination/Pagination";
import Loader from "../../spinner/Loader";

interface IMedicineComposition {
  handleClose?: any;
}

const MedicineCompositionPopup: FC<IMedicineComposition> = ({
  handleClose,
}) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [activateSmartSearch, setActivateSmartSearch] =
    useState<boolean>(false);
  const [category, setCategory] = useState("");
  const [dataPerPage, setDataPerPage] = useState<number>(10);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const dispatch = useAppDispatch();
  const { isLoading, medicineCategory, medicineCompositionData } =
    useAppSelector((state) => state.diagnosis);

  console.log("medicineCompositionData", medicineCompositionData);

  // function for creating Page Index Array
  const pageIndexArray = () => {
    let pageIndexOptions = [];
    for (let i = 1; i <= totalPage; i++) {
      pageIndexOptions.push(i);
    }
    return pageIndexOptions;
  };
  const pageIndexOptions = pageIndexArray();

  const data: Cols[] =
    medicineCompositionData?.length > 0 || medicineCompositionData !== undefined
      ? medicineCompositionData
      : meicineCompositionDummyData;
  const columns: Column<Cols>[] = medicineCompositionHeaderData;
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
    const requestData = {
      search: searchValue,
      cat_name: category,
      page: pageIndex,
      pageSize: dataPerPage,
    };
    dispatch(findMedicine(requestGenerator(requestData))).then((result) =>
      setTotalPage(result.payload.lastPage)
    );
  };

  useEffect(() => {
    if (searchValue === "") {
      setActivateSmartSearch(false);
      setGlobalFilter("");
      setCategory("");
      const requestData = {
        search: searchValue,
        cat_name: category,
        page: pageIndex,
        pageSize: dataPerPage,
      };
      dispatch(findMedicine(requestGenerator(requestData))).then((result) =>
        setTotalPage(result.payload.lastPage)
      );
    }
  }, [dispatch, searchValue, category, dataPerPage, pageIndex]);

  return (
    <>
      {isLoading && <Loader />}
      <div
        className={styles.popupContainer}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <CloseIcon
          customClass={styles.closeIconStyle}
          fillColor={colors.green1}
          handleClick={() => handleClose()}
        />
        <div className={styles.medicineComposition}>
          <p className={styles.title}>Medicines Composition</p>
          <Divider customClass={styles.dividerStyle} />
          <div className={styles.mainContainer}>
            <div className={styles.filterContainer}>
              <p className={styles.filterText}>Category</p>
              <select
                name="Select Category"
                className={styles.selectContainer}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                disabled={searchValue === "" ? true : false}
              >
                <option value="">Select Category</option>
                {medicineCategory &&
                  medicineCategory?.length > 0 &&
                  medicineCategory?.map((item: any, index: number) => {
                    return (
                      <option value={item?.category_name} key={index}>
                        {item?.category_name}
                      </option>
                    );
                  })}
              </select>
            </div>
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
                    placeholder="Search by medicine name"
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
            </div>
            <div className={styles.tableContainer}>
              <TableV3
                getTableProps={getTableProps}
                getTableBodyProps={getTableBodyProps}
                headerGroups={headerGroups}
                rows={rows}
                prepareRow={prepareRow}
              />
            </div>
            {medicineCompositionData?.length > 0 && (
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

export default MedicineCompositionPopup;

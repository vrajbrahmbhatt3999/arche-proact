import { FC, useState } from "react";
import styles from "./configurePricePopup.module.scss";
import { CloseIcon, SearchButton } from "../../svg-components";
import { colors } from "../../../../constants/color";
import Divider from "../../divider/Divider";
import { trimValue } from "../../../../utils/utils";

interface IViewTestProfile {
  handleClose?: any;
}

const CobfigurePricePopup: FC<IViewTestProfile> = ({ handleClose }) => {
  const [searchValue, setSearchValue] = useState<string>("");
  // const data: Cols[] =
  //   medicineCompositionData?.length > 0 || medicineCompositionData !== undefined
  //     ? medicineCompositionData
  //     : meicineCompositionDummyData;
  // const columns: Column<Cols>[] = medicineCompositionHeaderData;
  // const options: TableOptions<Cols> = {
  //   data,
  //   columns,
  // };

  // const {
  //   state,
  //   // @ts-ignore
  //   setGlobalFilter,
  //   getTableProps,
  //   getTableBodyProps,
  //   headerGroups,
  //   rows,
  //   prepareRow,
  // } = useTable(options, useGlobalFilter, useSortBy);
  // @ts-ignore
  // const { globalFilter } = state;

  const handleInputSearch = () => {
    console.log("first");
  };

  return (
    <>
      <div className={styles.notesPopupContainer}>
        <CloseIcon
          customClass={styles.closeIconStyle}
          fillColor={colors.green1}
          handleClick={() => handleClose()}
        />
        <div className={styles.notesContainer}>
          <p className={styles.title}>Configure Price</p>
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
                    placeholder="Search by medicine name"
                    onChange={(e) => {
                      trimValue(e);
                      setSearchValue(e.target.value);
                      // setGlobalFilter("");
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
                      // !activateSmartSearch
                      // ? styles.inputSmartSearchContainer
                      styles.inputSearchContainer
                    }
                    placeholder="Smart Search"
                    // disabled={!activateSmartSearch}
                    onChange={(e) => {
                      trimValue(e);
                      // setGlobalFilter(e.target.value);
                    }}
                    // value={searchValue === "" ? searchValue : globalFilter}
                  />
                </div>
              </div>
            </div>
            <div className={styles.tableContainer}>
              {/* <TableV3
                getTableProps={getTableProps}
                getTableBodyProps={getTableBodyProps}
                headerGroups={headerGroups}
                rows={rows}
                prepareRow={prepareRow}
              /> */}
            </div>
            {/* {medicineCompositionData?.length > 0 && (
              <Pagination
                setDataPerPage={setDataPerPage}
                pageIndexOptions={pageIndexOptions}
                pageIndex={pageIndex}
                setPageIndex={setPageIndex}
              />
            )} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default CobfigurePricePopup;

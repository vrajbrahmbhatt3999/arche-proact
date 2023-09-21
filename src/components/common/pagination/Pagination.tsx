import { FC, useState } from "react";
import styles from "./pagination.module.scss";

interface IPagination {
  setDataPerPage?: (value: number) => void;
  pageIndexOptions?: number[];
  pageIndex?: number;
  setPageIndex?: (value: number) => void;
  pageSize?: any;
}
const Pagination: FC<IPagination> = ({
  pageSize,
  setDataPerPage,
  pageIndexOptions,
  pageIndex,
  setPageIndex,
}) => {
  const numberPagesArray = [10, 15, 20];

  return (
    <>
      <div className={styles.paginationSection}>
        <>
          {pageIndexOptions?.map((pageOption, index) => {
            if (
              pageIndexOptions.length <= 5 || // If there are 7 or fewer page options, show all of them
              index < 3 || // Show the first 3 page options
              index >= pageIndexOptions.length - 3 || // Show the last 3 page options
              (pageIndex && Math.abs(pageIndex - pageOption) <= 1) // Show the page option if it is within 1 index of the current page
            ) {
              return (
                <div
                  className={
                    pageIndex === pageOption
                      ? styles.selectedPage
                      : styles.paginationButton
                  }
                  key={pageOption}
                  onClick={() => setPageIndex && setPageIndex(pageOption)}
                >
                  {pageOption}
                </div>
              );
            } else if (
              index === 3 && // If the current index is 3
              pageIndexOptions.length > 7 // and there are more than 7 page options
            ) {
              return (
                <div className={styles.paginationButton} key="ellipsis">
                  ...
                </div>
              );
            }
            return null;
          })}
        </>
        <div className={styles.setPageSizeSection}>
          <p className={styles.setPageSizeText}>Listing</p>
          <select
            className={styles.selectPageSize}
            value={pageSize}
            onChange={(event) => {
              setDataPerPage && setDataPerPage(Number(event.target.value));
              setPageIndex && setPageIndex(1);
            }}
          >
            {numberPagesArray.map((numberPageArray) => (
              <option key={numberPageArray} value={numberPageArray}>
                {numberPageArray}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default Pagination;

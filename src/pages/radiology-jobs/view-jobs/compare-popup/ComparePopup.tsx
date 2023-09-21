import { FC, useState } from "react";
import Button from "../../../../components/common/button/Button";
import { CloseIcon, SearchIcon } from "../../../../components/common/svg-components";
import { colors } from "../../../../constants/color";
import styles from "./comparePopup.module.scss";
// import Search from "../../../../components/common/search/Search";
import Table from "../../../../components/common/table/Table";
import Popup from "../../../../components/common/popup/Popup";
import ViewComparePopup from "../viewCompare-popup/ViewComparePopup";
import { comparePopupTableDummyData, comparePopupTableHeaderData } from "./compareTableData";
import { trimValue } from "../../../../utils/utils";


interface IComparePopupProps {
  handleClose?: any;
  handleChildClick: () => void;
}

const ComparePopup: FC<IComparePopupProps> = ({
  handleChildClick,
  handleClose,
}) => {
  const [showViewComparePopup, setShowViewComparePopup] =
    useState<boolean>(false);
   


  const handleViewResults = () => {
    setShowViewComparePopup((prevState) => !prevState);
  };

  const handleComparativeAnalysis = () => {
    handleChildClick();
  };
  return (
    <>
      {showViewComparePopup && (
        <Popup
          Children={ViewComparePopup}
          handleClose={() => handleViewResults()}
        />
      )}

      <div
        className={styles.comparePopupContainer}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <CloseIcon
          customClass={styles.closeIconStyle}
          fillColor={colors.green1}
          handleClick={() => handleClose()}
        />
       
       
          <div className={styles.searchContainer}>
            <div className={styles.search}>
            <input
              className={styles.searchInput}
              type="text"
              placeholder="Search"
              onChange={(e) => {
                trimValue(e);
              }}
            />
            <div className={styles.searchButton}>
              <SearchIcon fillColor={colors.white1} />
            </div>
            </div>
          </div>
          <Button
              title="Comparative Analysis"
              customClass={styles.comparativeButton}
              handleClick={handleComparativeAnalysis}
            />
          <div className={styles.compareContainer}>
          <div className={styles.tableContainer}>
            <Table
              tableHeaderData={comparePopupTableHeaderData}
              tableRowData={comparePopupTableDummyData}
              handleClick={handleViewResults}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default ComparePopup;

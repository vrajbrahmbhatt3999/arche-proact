import { FC, useState, useEffect } from "react";
import Button from "../../../../components/common/button/Button";
import {
  CloseIcon,
  SearchIcon,
} from "../../../../components/common/svg-components";
import { colors } from "../../../../constants/color";
import styles from "./comparePopup.module.scss";
// import Search from "../../../../components/common/search/Search";
import Table from "../../../../components/common/table/Table";
import Popup from "../../../../components/common/popup/Popup";
import ViewComparePopup from "../viewCompare-popup/ViewComparePopup";
import {
  comparePopupTableHeaderData,
} from "./compareTableData";
import { trimValue } from "../../../../utils/utils";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { ViewJobsAsyncData } from "../../../../redux/features/jobs/jobsAsyncActions";
import { requestGenerator } from "../../../../utils/payloadGenerator";

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

  const [compareSearchTest, setCompareSearchTest] = useState("");
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [dataPerPage, setDataPerPage] = useState<number>(10);
  const dispatch = useAppDispatch();
  const { viewJobs } = useAppSelector((state) => state.labsJob);

  const [compareData, setCompareData] = useState([]);

  const handleViewResults = () => {
    setShowViewComparePopup((prevState) => !prevState);
  };

  const handleComparativeAnalysis = () => {
    handleChildClick();
  };

  // useEffect(() => {
  //   let reqPayload = {
  //     page: pageIndex,
  //     pageSize: dataPerPage,
  //     job_type: "LABORATORY",
  //     is_internal: true,
  //   };
  //   dispatch(getAllLabViewPayloadData(reqPayload));
  //   dispatch(ViewJobsAsyncData(requestGenerator(reqPayload)));
  // }, [dataPerPage, dispatch, pageIndex]);

  const handleSearch = () => {
    let requestData = {
      name: compareSearchTest,
      // job_no: searchTest,
      page: pageIndex,
      pageSize: dataPerPage,
      job_type: "LABORATORY",
      is_internal: true,
    };
    dispatch(ViewJobsAsyncData(requestGenerator(requestData)));
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
                setCompareSearchTest(e.target.value);
                if (e.target.value === "") {
                  let requestData = {
                    search: "",
                    page: pageIndex,
                    pageSize: dataPerPage,
                    job_type: "LABORATORY",
                    is_internal: true,
                  };
                  dispatch(ViewJobsAsyncData(requestGenerator(requestData)));
                }
              }}
            />
            {/* Search Button */}
            <div className={styles.searchButton} onClick={handleSearch}>
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
              tableRowData={
                viewJobs && viewJobs?.length > 0 ? viewJobs : []
              }
              handleClick={handleViewResults}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default ComparePopup;

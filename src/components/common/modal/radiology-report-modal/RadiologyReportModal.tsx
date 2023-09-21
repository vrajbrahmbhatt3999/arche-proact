import { FC, useState, useEffect } from "react";
import {
  CloseIcon,
  ExportIcon,
  PrintIcon,
  SearchIcon,
} from "../../svg-components";
import { colors } from "../../../../constants/color";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import SmartSearch from "../../smart-search/SmartSearch";
import TableV3 from "../../table/tableV3/TableV3";
import { Cols } from "../../../../interfaces/interfaces";
import {
  Column,
  TableOptions,
  useGlobalFilter,
  useSortBy,
  useTable,
} from "react-table";
import { requestGenerator } from "../../../../utils/payloadGenerator";
import Loader from "../../spinner/Loader";
import Pagination from "../../pagination/Pagination";
import { trimValue } from "../../../../utils/utils";
import styles from "./radiologyreportmodal.module.scss";
import { radiologyReportHeaderData } from "./radiologyReportModalData";
import { getAllLabViewPayloadData } from "../../../../redux/features/radiology-jobs/jobsSlice";
import { ViewJobsAsyncData } from "../../../../redux/features/radiology-jobs/jobsAsyncActions";
import Button from "../../button/Button";
import { CustomModal } from "../../custom-modal/modal";
import DownloadAttachments from "./download-radiology-attachments/page";

interface IRadiologyReportModal {
  handleClose?: any;
  handleOpen?: any;
}

const RadiologyReportModal: FC<IRadiologyReportModal> = ({
  handleClose,
  handleOpen,
}) => {
  const { viewJobs, isLoading } = useAppSelector(
    (state) => state.radiologyJobs
  );

  const [searchTest, setSearchTest] = useState("");
  const [dataPerPage, setDataPerPage] = useState<number>(10);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [totalData, setTotalData] = useState(0);
  const [diacomViewer, setDiacomViewer] = useState(false);
  const [viewAttachments, setViewAttachments] = useState(false);
  const [getAttachments, setGetAttachments] = useState([]);
  const dispatch = useAppDispatch();
  useEffect(() => {
    let reqPayload = {
      name: searchTest,
      invoice_status: "GENERATED",
      page: pageIndex,
      pageSize: dataPerPage,
      job_type: "RADIOLOGY",
      is_internal: true,
    };
    dispatch(getAllLabViewPayloadData(reqPayload));
    dispatch(ViewJobsAsyncData(requestGenerator(reqPayload))).then((result) => {
      setTotalPage(result.payload.lastPage);
      setTotalData(result.payload.total);
    });
  }, [dataPerPage, dispatch, pageIndex]);

  const data: Cols[] = viewJobs;
  const columns: Column<Cols>[] = radiologyReportHeaderData;
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

  const pageIndexArray = () => {
    let pageIndexOptions = [];
    for (let i = 1; i <= totalPage; i++) {
      pageIndexOptions.push(i);
    }
    return pageIndexOptions;
  };
  const pageIndexOptions = pageIndexArray();

  const handleSearch = () => {
    if (searchTest?.length) {
      let requestData = {
        name: searchTest,
        invoice_status: "GENERATED",
        page: pageIndex,
        pageSize: dataPerPage,
        job_type: "RADIOLOGY",
        is_internal: true,
      };
      dispatch(ViewJobsAsyncData(requestGenerator(requestData))).then(
        (result) => {
          setTotalPage(result.payload.lastPage);
          setTotalData(result.payload.total);
        }
      );
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <CustomModal
        showModal={diacomViewer}
        closeModal={() => setDiacomViewer(false)}
        customModalClass={styles.diacomModalClass}
        closeIconClassName={styles.closeModal}
      >
        <div className={styles.diacomIframeContainer}>
          <iframe
            src="https://mri-viewer.opensource.epam.com/"
            frameBorder="0"
            title="viewer"
            width="100%"
            style={{ height: "100%" }}
          />
        </div>
      </CustomModal>
      <CustomModal
        showModal={viewAttachments}
        closeModal={() => setViewAttachments(false)}
        zIndex="4"
        overlayzIndex="3"
        width="50%"
        height="500px"
      >
        <DownloadAttachments />
      </CustomModal>
        <div className={styles.search}>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search by Name"
            value={searchTest}
            onChange={(e) => {
              trimValue(e);
              setSearchTest(e.target.value);
              if (e.target.value === "") {
                let requestData = {
                  name: "",
                  invoice_status: "GENERATED",
                  page: pageIndex,
                  pageSize: dataPerPage,
                  job_type: "RADIOLOGY",
                  is_internal: true,
                };
                dispatch(ViewJobsAsyncData(requestGenerator(requestData))).then(
                  (result) => {
                    setTotalPage(result.payload.lastPage);
                    setTotalData(result.payload.total);
                  }
                );
              }
            }}
          />
          {/* Search Button */}
          <div className={styles.searchButton} onClick={handleSearch}>
            <SearchIcon fillColor={colors.white1} />
          </div>
          {/* Smart Search */}
          <SmartSearch
            placeHolder="Smart Search"
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
          <PrintIcon customClass={styles.stylePrint} />
          <ExportIcon customClass={styles.styleExport} />
        </div>

        <div className={styles.textContainer}>
          <div className={styles.text}>
            <span className={styles.subText}> Patient Name : </span>
            <p className={styles.physicianName}>Andrew</p>
          </div>
          <div className={styles.text1}>
            <span className={styles.subText}> Physician Name : </span>
            <p className={styles.physicianName}> Andrew</p>
          </div>
          <div>
            <Button
              title="Diacom Viewer"
              handleClick={() => setDiacomViewer(true)}
              type="button"
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
            handleOpen={handleOpen}
            handleClick={(item: any) => (
              setViewAttachments(true), setGetAttachments(item?.attachements)
            )}
          />
        </div>
        {totalData > 10 && (
          <Pagination
            setDataPerPage={setDataPerPage}
            pageIndexOptions={pageIndexOptions}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
          />
        )}
    
    </>
  );
};

export default RadiologyReportModal;

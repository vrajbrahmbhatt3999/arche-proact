import { FC, useEffect, useState } from "react";
import Select, { components } from "react-select";
import TableV2 from "../../table/tableV2/TableV2";
import Pagination from "../../pagination/Pagination";
import {
  CloseIcon,
  ExportIcon,
  PrintIcon,
  SearchIcon,
  InfoIcon,
} from "../../svg-components";
import Button from "../../button/Button";
import { DropdownIndicator } from "../../dropdown-indicator/DropdownIndicator";
import { colors } from "../../../../constants/color";
import styles from "./viewAllImages.module.scss";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { getPatientHistoryDiagAttachments } from "../../../../redux/features/patient-history/patientHistoryAsyncActions";
import { requestGenerator } from "../../../../utils/payloadGenerator";
import Loader from "../../spinner/Loader";
import {
  clearDocData,
  setSelectedImagesData,
} from "../../../../redux/features/patient-history/patientHistorySlice";
import { setMessage } from "../../../../redux/features/toast/toastSlice";
import { failure } from "../../../../constants/data";

interface IViewAllImagesModal {
  handleClose: (e?: React.MouseEvent<HTMLElement>) => void;
  handleSubmit?: (e?: React.MouseEvent<HTMLElement>) => void;
  popData: any;
  heading: string;
  headerData: any;
  handleOpen: any;
  setModelOpenClose: any;
}

const ViewAllImagesModal: FC<IViewAllImagesModal> = ({
  handleClose,
  handleSubmit,
  popData,
  heading,
  headerData,
  handleOpen,
  setModelOpenClose,
}) => {
  // Define state variables
  const [showInfoText, setShowInfoText] = useState<boolean>(false);
  const [imageSearch, setImageSearch] = useState<string>("");
  const [categorySearch, setCategorySearch] = useState<string>("All");
  const [dataPerPage, setDataPerPage] = useState<number>(10);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [dateSearch, setDateSearch] = useState("");
  const [docCategory, setDocCategory] = useState([{ label: "All", value: "" }]);
  const dispatch = useAppDispatch();
  const {
    patientFormData,
    isLoading,
    patientHistoryAttachments,
    selectedDocForCompare,
  } = useAppSelector((state) => state.patientHistory);
  const { masterValueData } = useAppSelector((state) => state.login);

  // function for creating Page Index Array
  const pageIndexArray = () => {
    let pageIndexOptions = [];
    for (let i = 1; i <= totalPage; i++) {
      pageIndexOptions.push(i);
    }
    return pageIndexOptions;
  };
  const pageIndexOptions = pageIndexArray();
  const getAllAttachments = (
    page: number,
    pageSize: number,
    docName_search: string,
    date_search: string,
    category_search: string
  ) => {
    dispatch(
      getPatientHistoryDiagAttachments(
        requestGenerator({
          page: page,
          pageSize: pageSize,
          docName_search: docName_search,
          date_search: date_search,
          category_search: category_search === "All" ? "" : category_search,
          patient_id:
            popData.length > 0 ? popData : patientFormData?.patient_id,
          flag: false,
        })
      )
    ).then((result) => setTotalPage(result.payload.lastPage));
  };
  useEffect(() => {
    getAllAttachments(pageIndex, dataPerPage, "", "", categorySearch);
  }, [pageIndex, dataPerPage]);
  useEffect(() => {
    return () => {
      dispatch(clearDocData());
    };
  }, []);
  const handleCompareModal = () => {
    if (selectedDocForCompare?.length <= 1) {
      dispatch(
        setMessage({
          message: "Please select at least two images",
          type: failure,
        })
      );
    } else {
      setModelOpenClose(true);
    }
  };
  const handleSearch = () => {
    if (imageSearch.length > 0) {
      getAllAttachments(
        pageIndex,
        dataPerPage,
        imageSearch,
        dateSearch,
        categorySearch
      );
    }
  };
  useEffect(() => {
    if (masterValueData && masterValueData.length > 0) {
      const statusArray = masterValueData
        ?.find((item: any) => item.category_name === "DOCUMENT_CATEGORY")
        ?.values?.map((item: any) => {
          return {
            label: item?.value,
            value: item?._id,
          };
        });
      statusArray?.length > 0 &&
        setDocCategory([{ label: "All", value: "" }, ...statusArray]);
    } else {
      setDocCategory([{ label: "All", value: "" }]);
    }
  }, [masterValueData]);
  return (
    <>
      {isLoading && <Loader />}

      <div
        className={styles.viewAllImagesModalContainer}
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
        <h1 className={styles.viewAllImagesModalHeading}>{heading}</h1>
        <hr className={styles.viewAllImagesModalDivider} />
        <div className={styles.viewAllImagesContainer}>
          <div className={styles.imagesFilterAndCompareContainer}>
            <div className={styles.searchFieldContainer}>
              <input
                className={styles.searchInput}
                type="date"
                // value={patientActivitySearch}
                onChange={(e) => {
                  setDateSearch(e.target.value);
                  getAllAttachments(
                    pageIndex,
                    dataPerPage,
                    imageSearch,
                    e.target.value,
                    categorySearch
                  );
                }}
              />
              <Select
                className={styles.selectInputField}
                placeholder={
                  <div className={styles.select_placeholder_text}>
                    Image Category
                  </div>
                }
                closeMenuOnSelect={true}
                components={{ DropdownIndicator }}
                isSearchable={false}
                options={docCategory}
                onChange={(e: any) => {
                  setCategorySearch(e?.label);
                  dispatch(setSelectedImagesData([]));
                  getAllAttachments(
                    pageIndex,
                    dataPerPage,
                    imageSearch,
                    dateSearch,
                    e.label
                  );
                }}
                maxMenuHeight={200}
              />
              <input
                className={styles.searchInput}
                type="text"
                placeholder="Search Image Name"
                value={imageSearch}
                onChange={(e) => {
                  setImageSearch(e.target.value);
                  if (e.target.value === "") {
                    getAllAttachments(
                      pageIndex,
                      dataPerPage,
                      e.target.value,
                      dateSearch,
                      categorySearch
                    );
                  }
                }}
              />
              <div
                className={styles.searchButton}
                onClick={() => handleSearch()}
              >
                <SearchIcon fillColor={colors.white1} />
              </div>
              <PrintIcon customClass={styles.stylePrint} />
              <ExportIcon customClass={styles.styleExport} />
            </div>
            <div className={styles.copareAndInfoBtnContainer}>
              <Button
                title="Compare"
                customClass={styles.compareBtnStyle}
                handleClick={() =>
                  patientHistoryAttachments?.length > 0 && handleCompareModal()
                }
              />
              <div className={styles.infoIconContainer}>
                <InfoIcon
                  fillColor={colors.grey2}
                  customClass={styles.styleInfoIcon}
                  mouseEnter={() => setShowInfoText(true)}
                  mouseLeave={() => setShowInfoText(false)}
                />
                <p
                  className={
                    showInfoText
                      ? styles.showInfoIconText
                      : styles.hideInfoIconText
                  }
                >
                  Maximum 3 images can be compared
                </p>
              </div>
            </div>
          </div>
          <div className={styles.medicationTableContainer}>
            <TableV2
              tableHeaderData={headerData}
              tableRowData={patientHistoryAttachments}
              active={false}
              handleClick={handleOpen}
              handleRowClick={handleSubmit}
            />
          </div>
          {patientHistoryAttachments?.length > 0 && (
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

export default ViewAllImagesModal;

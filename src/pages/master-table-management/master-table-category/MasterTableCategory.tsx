import { FC, useCallback, useEffect, useState } from "react";
import styles from "./masterTableCategory.module.scss";
import SearchFilter from "../../../components/common/search-filter/SearchFilter";
import { useNavigate } from "react-router-dom";
import Table from "../../../components/common/table/Table";
import { masterTableHeaderData } from "../../../constants/data";
import Popup from "../../../components/common/popup/Popup";
import AddCategoryModal from "../../../components/common/modal/add-category-modal/AddCategoryModal";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { getAllMasterTableCategory } from "../../../redux/features/master-table-category/MasterTableCategoryAsyncActions";
import { requestGenerator } from "../../../utils/payloadGenerator";
import Pagination from "../../../components/common/pagination/Pagination";
import StatusConfirmationPopup from "../../../components/common/modal/status-confirmation-popup/StatusConfirmationPopup";
import Loader from "../../../components/common/spinner/Loader";
import {
  SearchButton,
  SearchIcon,
} from "../../../components/common/svg-components";
import { colors } from "../../../constants/color";
import { debounce } from "lodash";
import { trimValue } from "../../../utils/utils";
import Button from "../../../components/common/button/Button";

interface IMasterTableCategory {
  setSearchMedicalCenter?: (value: string) => void;
  searchMedicalCenter?: string;
  customClass?: string;
  customClassInput?: string;
  placeHolder?: string;
}

const MasterTableCategory: FC<IMasterTableCategory> = ({
  customClass,
  customClassInput,
  placeHolder,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, masterCategoryData, isStatusUpdated } = useAppSelector(
    (state) => state.masterTableCategory
  );
  console.log("masterCategoryData tab1>>>>>", masterCategoryData);
  const [searchMedicalCenter, setSearchMedicalCenter] = useState<string>("");
  const [dataPerPage, setDataPerPage] = useState<number>(10);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [addModalData, setAddModalData] = useState({});
  const [toggle, setToggle] = useState<boolean>(false);
  const [toggleValue, setToggleValue] = useState();
  const [toggleData, setToggleData] = useState({});
  const [confirm, setConfirm] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState("");
  // Debounce Search String
  const searchText = useCallback(
    debounce(
      (text: string): void =>
        setSearchMedicalCenter && setSearchMedicalCenter(text),
      500
    ),
    [setSearchMedicalCenter]
  );

  // function for creating Page Index Array
  const pageIndexArray = () => {
    let pageIndexOptions = [];
    for (let i = 1; i <= totalPage; i++) {
      pageIndexOptions.push(i);
    }
    return pageIndexOptions;
  };
  const pageIndexOptions = pageIndexArray();

  // add modal close
  const handleModalClose = () => {
    setShowAddModal(false);
    setAddModalData({});
    setSearchValue("");
  };
  // handleAddModal
  // const handleAddModal = () => {
  //   setShowAddModal(!showAddModal);
  //   setAddModalData({});
  //   setSearchValue("");
  // };

  // getAllMasterCategorylist Api
  useEffect(() => {
    let payloadData = {
      page: pageIndex,
      pageSize: dataPerPage,
      search: searchValue,
      is_active: "",
    };
    dispatch(getAllMasterTableCategory(requestGenerator(payloadData))).then(
      (result) => setTotalPage(result.payload.lastPage)
    );
  }, [dispatch, dataPerPage, pageIndex, isStatusUpdated]);

  // Master Category record getbyId
  const handleGetMcById = (item: any) => {
    setShowAddModal(!showAddModal);
    setAddModalData(item);
    // item &&
    //   navigate(``, {
    //     state: {
    //       id: item?._id,
    //     },
    //   });
  };

  // handle toggle
  const handleToggleStatusModal = (item: any) => {
    setSearchValue("");
    setConfirm(!confirm);
    setToggleData(item);
    setToggle(item.is_active);
    setToggleValue(item?._id);
  };

  const handleInputSearch = () => {
    setPageIndex(1);
    const requestData = {
      page: pageIndex,
      pageSize: dataPerPage,
      search: searchValue,
      is_active: "",
    };
    dispatch(getAllMasterTableCategory(requestGenerator(requestData))).then(
      (result) => setTotalPage(result.payload.lastPage)
    );
  };

  useEffect(() => {
    if (searchValue === "") {
      const requestData = {
        page: pageIndex,
        pageSize: dataPerPage,
        search: searchValue,
        is_active: "",
      };
      dispatch(getAllMasterTableCategory(requestGenerator(requestData))).then(
        (result) => setTotalPage(result.payload.lastPage)
      );
    }
  }, [dispatch, searchValue, dataPerPage, pageIndex]);
  return (
    <>
      {isLoading && <Loader />}
      {showAddModal && (
        <Popup
          Children={AddCategoryModal}
          popData={addModalData}
          handleClose={() => handleModalClose()}
          setModelOpenClose={setShowAddModal}
        />
      )}

      {confirm && (
        <Popup
          popData={toggleData}
          Children={StatusConfirmationPopup}
          handleClose={() => setConfirm(false)}
        />
      )}

      <div className={styles.mainContainer}>
        {/* <SearchFilter
          title="Add Category"
          searchMedicalCenter={searchMedicalCenter}
          setSearchMedicalCenter={setSearchMedicalCenter}
          isDropdown={false}
          isSmartSearch={false}
          handleClick={() => handleAddModal()}
        /> */}

        <div className={styles.searchContainer}>
          <div className={styles.inputFieldContainer}>
            <input
              type="text"
              className={styles.inputSearchContainer}
              placeholder="Search by category"
              value={searchValue}
              onChange={(e) => {
                trimValue(e);
                setSearchValue(e.target.value);
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

          {/* <div>
            <Button title="Add Category" handleClick={() => handleAddModal()} />
          </div> */}
        </div>

        <div className={styles.tableContainer}>
          <Table
            tableHeaderData={masterTableHeaderData}
            tableRowData={masterCategoryData}
            handleAction={handleGetMcById}
            handleActiveMC={handleToggleStatusModal}
          />
        </div>
        {/* <Pagination
          setDataPerPage={setDataPerPage}
          pageIndexOptions={pageIndexOptions}
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
        /> */}
        {masterCategoryData && masterCategoryData.length !== 0 ? (
          <Pagination
            setDataPerPage={setDataPerPage}
            pageIndexOptions={pageIndexOptions}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
          />
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default MasterTableCategory;

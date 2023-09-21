import { FC, useCallback, useEffect, useState } from "react";
import styles from "./masterTableCategoryValue.module.scss";
import Table from "../../../components/common/table/Table";
import Pagination from "../../../components/common/pagination/Pagination";
import SearchFilter from "../../../components/common/search-filter/SearchFilter";
import Popup from "../../../components/common/popup/Popup";
import { useNavigate } from "react-router-dom";
import AddCategoryValue from "../../../components/common/modal/add-category-value/AddCategoryValue";
import {
  masterTableCategoryValueHeaderData,
  masterTableCategoryValueRowData,
} from "../../../constants/data";
import { getAllMasterTableCategoryValue } from "../../../redux/features/master-table-category/MasterTableCategoryAsyncActions";
import { requestGenerator } from "../../../utils/payloadGenerator";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import StatusConfirmationPopup from "../../../components/common/modal/status-confirmation-popup/StatusConfirmationPopup";
import Loader from "../../../components/common/spinner/Loader";
import { debounce } from "lodash";
import Button from "../../../components/common/button/Button";
import { trimValue } from "../../../utils/utils";
import { SearchButton } from "../../../components/common/svg-components";
import { clearDiagnosisId } from "../../../redux/features/doctor-diagnosis/doctorDiagnosisSlice";

interface IMasterTableCategoryValue {}

const MasterTableCategoryValue: FC<IMasterTableCategoryValue> = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, masterCategoryValueData, isStatusValueUpdated } =
    useAppSelector((state) => state.masterTableCategory);
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
console.log("masterCategoryValueData",masterCategoryValueData)
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
  const handleAddModal = () => {
    console.log("opemn");
    setShowAddModal(!showAddModal);
    setAddModalData({});
    setSearchValue("");
  };

  // getAllMasterCategorylist Api
  useEffect(() => {
    let payloadData = {
      page: pageIndex,
      pageSize: dataPerPage,
      search: searchValue,
    };
    dispatch(
      getAllMasterTableCategoryValue(requestGenerator(payloadData))
    ).then((result) => setTotalPage(result.payload.lastPage));
  }, [dispatch, dataPerPage, pageIndex, isStatusValueUpdated]);

  // Master Category value record getbyId
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
    // setSearchMedicalCenter('')
    setConfirm(!confirm);
    setToggleData(item);
    setToggle(item.is_active);
    setToggleValue(item?._id);
  };

  const handleInputSearch = () => {
    setPageIndex(1)
    const requestData = {
      page: pageIndex,
      pageSize: dataPerPage,
      search: searchValue,
    };
    dispatch(
      getAllMasterTableCategoryValue(requestGenerator(requestData))
    ).then((result) => setTotalPage(result.payload.lastPage));
  };

  useEffect(() => {
    if (searchValue === "") {
      const requestData = {
        page: pageIndex,
        pageSize: dataPerPage,
        search: searchValue,
      };
      dispatch(
        getAllMasterTableCategoryValue(requestGenerator(requestData))
      ).then((result) => setTotalPage(result.payload.lastPage));
    }
  }, [dispatch, searchValue, dataPerPage, pageIndex]);
  return (
    <>
      {isLoading && <Loader />}
      {showAddModal && (
        <Popup
          Children={AddCategoryValue}
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
          title="Add Category Value"
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
              value={searchValue}
              className={styles.inputSearchContainer}
              placeholder="Search by value"
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

          <div>
            <Button
              title="Add Category Value"
              customClass={styles.addCategoryValueButton}
              handleClick={handleAddModal}
            />
          </div>
        </div>

        <div className={styles.tableContainer}>
          <Table
            tableHeaderData={masterTableCategoryValueHeaderData}
            tableRowData={masterCategoryValueData}
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
        {masterCategoryValueData && masterCategoryValueData.length !== 0 ? (
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

export default MasterTableCategoryValue;

import { FC, useState, useEffect } from "react";
import Button from "../../../components/common/button/Button";
import Search from "../../../components/common/search/Search";
import Select from "react-select";
import { DropdownIndicator } from "../../../components/common/dropdown-indicator/DropdownIndicator";
import Popup from "../../../components/common/popup/Popup";
import MainStoreRequestItemPopup from "../mainstore-request-item-popup/MainStoreRequestItemPopup";
import MainStoreRequestItemEditPopup from "../mainstore-request-edit-popup/MainStoreRequestItemEditPopup";
import IssueItemPopup from "../issue-item-popup/IssuedItemPopup";
import BranchStoreRequestPopup from "../branchstore-request-popup/BranchStoreRequestPopup";
import DeleteMedicationPopup from "../../../components/common/modal/delete-medication-popup/DeleteMedicationPopup";
import {
  msRequestData,
  msRequestHeaderData,
} from "../../../constants/table-data/msRequestTableData";
import ItemIssued from "../submitAll-Popup/submitAllPopup";
import SubmitRequest from "../submitRequest-Popup/submitRequestPopup";
import {
  requestIssueTableData,
  requestIssueTableHeaderData,
} from "../../../constants/table-data/issueTableData";
import TableV3 from "../../../components/common/table/tableV3/TableV3";
import {
  Column,
  TableOptions,
  useGlobalFilter,
  useSortBy,
  useTable,
} from "react-table";
import { Cols } from "../../../interfaces/interfaces";
import { useAppDispatch, useAppSelector } from "../../../hooks/index";
import {
  requestDropdownData,
  roomsDropDownData,
  branchStoreDropdownData,
} from "../branchStoreData";
import {
  removeIssueData,
  removeMainStoreData,
  clearSelectedIssueData,
  clearSelectedMainStoreData,
  addUniqueMainStoreData,
  clearMainStoreItemsData,
} from "../../../redux/features/branch-store/branchStoreSlice";
import {
  addBranchStoreIssueList,
  getMainStoreRequestItemsList,
  updateMainStoreRequestItemsList,
  deleteMainStoreRequestItemsList,
  getBranchStoreMainStoreRequestList,
} from "../../../redux/features/branch-store/branchStoreAsyncActions";
import { createInventoryRequest } from "../../../redux/features/inventory-request/inventoryRequestAsyncActions";
import { requestGenerator } from "../../../utils/payloadGenerator";
import { setMessage } from "../../../redux/features/toast/toastSlice";
import { success, failure } from "../../../constants/data";
// import { SearchIcon } from "../../../components/common/svg-components";
import SmartSearch from "../../../components/common/smart-search/SmartSearch";
// import { colors } from "../../../constants/color";
import {
  ADD_BRANCH_STORE_ISSUE_DATA,
  CREATE_INVENTORY_REQUEST,
  GET_MAIN_STORE_REQUEST_ITEMS_TYPE,
  UPDATE_MAIN_STORE_REQUEST_ITEMS_TYPE,
  DELETE_MAIN_STORE_REQUEST_ITEMS_TYPE,
} from "../../../constants/asyncActionsType";
import styles from "./branchstore.module.scss";

interface ISubStore {}

const BranchStore: FC<ISubStore> = () => {
  const dispatch = useAppDispatch();
  const { branchData, userData, user_no } = useAppSelector(
    (state) => state.login
  );
  const {
    selectedIssueData,
    selectedMainStoreData,
    selectedMainStoreUniqueData,
    mainStoreRequestItemsData,
    getBranchStoreMainStoreRequestPayload,
  } = useAppSelector((state) => state.branchStore);

  console.log(selectedMainStoreUniqueData, "selectedMainStoreUniqueData");

  // console.log("selectedIssueData :>> ", selectedIssueData);
  // console.log("selectedMainStoreUniqueData :>> ", selectedMainStoreUniqueData);
  //Define State Variables
  const [tabs, setTabs] = useState("Issue");
  const [issueItemPopup, setIssueItemPopup] = useState(false);
  const [mainStoreRequestItemPopup, setMainStoreRequestItemPopup] =
    useState(false);
  const [branchStoreRequestModal, setBranchStoreRequestModal] = useState(false);
  const [SubmitAllPopup, setSubmitAllPopup] = useState(false);
  const [submitRequestPopup, setSubmitRequestPopup] = useState(false);
  const [requestType, setRequestType] = useState<any>(null);
  const [branchStoreOptions, setBranchStoreOptions] = useState<any>([]);
  const [branchStoreType, setBranchStoreType] = useState<any>(
    branchStoreOptions[0]
  );
  const [departmentName, setDepartmentName] = useState<any>(null);
  const [roomName, setRoomName] = useState<any>(null);
  const [branchStoreRequestPayload, setBranchStoreRequestPayload] =
    useState<any>({});
  const [isDisableIssueBtn, setIsDisableIssueBtn] = useState(false);
  const [isDisableMainStoreRequestBtn, setIsDisableMainStoreRequestBtn] =
    useState(false);
  const [addIssueSuccessData, setAddIssueSuccessData] = useState<any>({});
  const [addMainStoreDataSuccess, setAddMainStoreDataSuccess] = useState<any>(
    {}
  );
  const [mainStoreEditPopup, setMainStoreEditPopup] = useState(false);
  const [mainStoreEditData, setMainStoreEditData] = useState<any>({});
  const [showDeleteMainStoreItemModal, setShowDeleteMainStoreItemModal] =
    useState<boolean>(false);
  const [deleteMainStoreItemPopupData, setDeleteMainStoreItemPopupdata] =
    useState<any>({});
  // const [showDeleteIssueModal, setShowDeleteIssueModal] =
  //   useState<boolean>(false);
  // const [deleteIssuePopupData, setDeleteIssuePopupdata] = useState<any>({});

  // console.log("branchStoreRequestPayload :>> ", branchStoreRequestPayload);
  // console.log("setRequestType :>> ", requestType);
  // console.log("departmentName :>> ", departmentName);
  // console.log("roomName :>> ", roomName);
  // console.log("branchData :>> ", branchData);
  // console.log("branchStoreType :>> ", branchStoreType);
  // console.log("filterBranchStoreOptions :>> ", branchStoreOptions);
  // define table column and row
  const data: Cols[] =
    tabs === "Issue" ? selectedIssueData : selectedMainStoreUniqueData;
  const columns: Column<Cols>[] =
    tabs === "Issue" ? requestIssueTableHeaderData : msRequestHeaderData;
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

  // useeffect for generate branch store options
  useEffect(() => {
    const filterBranchStoreOptions = branchData?.branch_store?.map(
      (item: any) => ({
        label: item?.name,
        value: item?._id,
      })
    );
    setBranchStoreOptions(filterBranchStoreOptions);
    setBranchStoreType(filterBranchStoreOptions[0]);
  }, [branchData]);
  // useeffect for reset dropdown
  useEffect(() => {
    setDepartmentName(null);
    setRoomName(null);
  }, [requestType]);

  // useeffect for create branch store request payload
  useEffect(() => {
    const branchStoreRequestPopupPayload = {
      branch_store_type: branchStoreType?.value,
      request_type: requestType?.value,
      department_name: departmentName?.label,
      room_name: roomName?.value,
    };
    setBranchStoreRequestPayload(branchStoreRequestPopupPayload);
  }, [branchStoreType, requestType, departmentName, roomName]);

  // useeffect for disable issue button
  useEffect(() => {
    const isDisableBtn = selectedIssueData?.some(
      (item: any) =>
        Number(item?.issue_qty) <= 0 || item?.issue_qty === undefined
    );
    setIsDisableIssueBtn(isDisableBtn);
  }, [selectedIssueData]);

  // useeffect for disable main store request button
  useEffect(() => {
    const isDisableBtn = selectedMainStoreUniqueData?.some(
      (item: any) =>
        Number(item?.main_store_qty) <= 0 || item?.main_store_qty === undefined
    );
    setIsDisableMainStoreRequestBtn(isDisableBtn);
  }, [selectedMainStoreUniqueData]);

  // useeffect for creating unique selectedMain store request
  useEffect(() => {
    const uniqueItemIds = new Set();
    const generatedUniqueMainStoreData = [];

    for (const item of selectedMainStoreData) {
      if (!uniqueItemIds.has(item?.item_id)) {
        uniqueItemIds.add(item?.item_id);
        generatedUniqueMainStoreData.push(item);
      }
    }

    // console.log(
    //   "generatedUniqueMainStoreData :>> ",
    //   generatedUniqueMainStoreData
    // );
    dispatch(addUniqueMainStoreData(generatedUniqueMainStoreData));
  }, [dispatch, selectedMainStoreData]);

  const handleBranchStoreRequestModalOpen = () => {
    // dispatch(clearSelectedIssueData());
    // dispatch(clearSelectedMainStoreData());
    setBranchStoreRequestModal((prevState) => !prevState);
  };
  const handleBranchStoreRequestModalClose = () => {
    // dispatch(clearSelectedIssueData());
    // dispatch(clearSelectedMainStoreData());
    setBranchStoreRequestModal((prevState) => !prevState);
  };
  const handleBranchStoreModal = () => {
    // const selectedIssueValidation = selectedIssueData?.some(
    //   (item: any) =>
    //     Number(item?.issue_qty) <= 0 || item?.issue_qty === undefined
    // );
    // const selectedMainStoreValidation = selectedMainStoreUniqueData?.some(
    //   (item: any) =>
    //     Number(item?.main_store_qty) <= 0 || item?.main_store_qty === undefined
    // );
    // console.log("selectedIssueValidation :>> ", selectedIssueValidation);
    // console.log(
    //   "selectedMainStoreValidation :>> ",
    //   selectedMainStoreValidation
    // );
    // if (selectedIssueValidation || selectedMainStoreValidation) {
    //   dispatch(
    //     setMessage({
    //       message: "Please enter selected store quantity",
    //       type: failure,
    //     })
    //   );
    // } else {
    //   setBranchStoreRequestModal((prevState) => !prevState);
    // }
    setBranchStoreRequestModal((prevState) => !prevState);
  };

  // function for handling delete selected issue
  // const handleDeleteIssueModal = (rowData: any) => {
  //   setDeleteIssuePopupdata(rowData);
  //   setShowDeleteIssueModal((prevState) => !prevState);
  // };

  // const handleDeleteOutstandingModalClose = () => {
  //   setDeleteOutstandingPopupdata("");
  //   setShowDeleteOutstandingModal((prevState) => !prevState);
  // };

  // const handleDeleteIssue = () => {
  //   dispatch(removeIssueData(deleteIssuePopupData));
  //   setShowDeleteIssueModal((prevState) => !prevState);
  // };

  // const handleDeleteOutstandingModalClose = () => {
  //   setDeleteOutstandingPopupdata("");
  //   setShowDeleteOutstandingModal((prevState) => !prevState);
  // };

  // handle submit issue
  const submitIssuePopup = () => {
    const issueItemArray = selectedIssueData?.map((item: any) => {
      return {
        source: item?.request_source_type,
        destination: item?.destination,
        name: item?.item_name,
        store_id: item?.store_id,
        req_id: item?.req_id,
        item_id: item?.item_id,
        qty: item?.issue_qty,
        base_unit_type_id: item?.base_unit_type?._id,
        req_unit_type_id: item?.req_unit_type?._id,
      };
    });
    const payloadData = {
      items: issueItemArray,
    };
    dispatch(addBranchStoreIssueList(requestGenerator(payloadData))).then(
      (response: any) => {
        // console.log("response :>> ", response);
        if (response.type === `${ADD_BRANCH_STORE_ISSUE_DATA}/fulfilled`) {
          const succesResponce = {
            doc_id: response.payload?.doc_id,
          };
          setAddIssueSuccessData(succesResponce);
          setSubmitAllPopup((prevState) => !prevState);
          dispatch(clearSelectedIssueData());
        }
      }
    );
  };

  const submitIssuePopupClose = () => {
    setAddIssueSuccessData({});
    setSubmitAllPopup((prevState) => !prevState);
  };

  // handle main store reqeust
  // api call for submit mainstore request
  const handleSubmitMainStoreRequest = () => {
    const mainStoreRequestArray = selectedMainStoreUniqueData?.map(
      (item: any) => {
        return {
          id: item?.item_id,
          requested_qty: item?.main_store_qty,
          qty_type: item?.unit_type,
          base_unit_type_id: item?.base_unit_type?._id,
          req_unit_type_id: item?.req_unit_type?._id,
        };
      }
    );
    const payloadData = {
      request_source: "BRANCH_STORE",
      request_destination: "MAIN_STORE",
      request_source_type: "BRANCH_STORE",
      source_id: "64c3809a8e6dbe248dc566e9",
      store_id: branchData?.main_store?.[0]?._id,
      // base_unit_type_id:
      // store_id: "64c24e87cc8abfbfe53e3a8b",
      items: mainStoreRequestArray,
    };
    // console.log("payload :>> ", payloadData);
    dispatch(createInventoryRequest(requestGenerator(payloadData))).then(
      (response: any) => {
        // console.log("response :>> ", response);
        if (response.type === `${CREATE_INVENTORY_REQUEST}/fulfilled`) {
          const succesResponce = {
            doc_id: response.payload,
          };
          setAddMainStoreDataSuccess(succesResponce);
          setSubmitRequestPopup((prevState) => !prevState);
          dispatch(clearSelectedMainStoreData());
        }
      }
    );
  };

  const submitMainStorePopupClose = () => {
    setAddMainStoreDataSuccess({});
    setSubmitRequestPopup((prevState) => !prevState);
  };

  // handle issue item popup
  const handleIssuePopupOpen = () => {
    setIssueItemPopup((prevState) => !prevState);
  };

  const handleIssuePopupClose = () => {
    setIssueItemPopup((prevState) => !prevState);
  };

  // handle main store item popup
  const mainStoreRequestPopupOpen = () => {
    setMainStoreRequestItemPopup((prevState) => !prevState);
  };

  const mainStoreRequestPopupClose = () => {
    setMainStoreRequestItemPopup((prevState) => !prevState);
  };

  // handle main store edit item popup

  const mainStoreRequestEditPopupOpen = (rowData: any) => {
    const payloadData = {
      request_id: rowData?._id,
    };
    if (rowData?._id) {
      dispatch(
        getMainStoreRequestItemsList(requestGenerator(payloadData))
      ).then((response: any) => {
        if (
          response.type === `${GET_MAIN_STORE_REQUEST_ITEMS_TYPE}/fulfilled`
        ) {
          setMainStoreEditData(rowData);
          setMainStoreEditPopup((prevState) => !prevState);
        }
      });
    }
  };

  const mainStoreRequestEdit = () => {
    const mainStoreRequestArray = mainStoreRequestItemsData?.map(
      (item: any) => {
        return {
          item_id: item?._id,
          qty: Number(item?.requested_qty),
        };
      }
    );
    const payloadData = {
      request_id: mainStoreEditData?._id,
      items: mainStoreRequestArray,
    };
    // console.log("payloadData :>> ", payloadData);
    dispatch(
      updateMainStoreRequestItemsList(requestGenerator(payloadData))
    ).then((response: any) => {
      if (
        response.type === `${UPDATE_MAIN_STORE_REQUEST_ITEMS_TYPE}/fulfilled`
      ) {
        dispatch(clearMainStoreItemsData());
        setMainStoreEditData({});
        setMainStoreEditPopup((prevState) => !prevState);
      }
    });
  };

  const mainStoreRequestEditPopupClose = () => {
    dispatch(clearMainStoreItemsData());
    setMainStoreEditData({});
    setMainStoreEditPopup((prevState) => !prevState);
  };

  // function for handling delete main store items
  const handleDeleteMainStoreModal = (rowData: any) => {
    // console.log("object :>> ", rowData);
    setDeleteMainStoreItemPopupdata(rowData);
    setShowDeleteMainStoreItemModal((prevState) => !prevState);
  };

  const handleDeleteMainStoreItem = () => {
    const payloadData = {
      request_id: deleteMainStoreItemPopupData?._id,
    };
    dispatch(
      deleteMainStoreRequestItemsList(requestGenerator(payloadData))
    ).then((response: any) => {
      // console.log("response :>> ", response);
      if (
        response.type === `${DELETE_MAIN_STORE_REQUEST_ITEMS_TYPE}/fulfilled`
      ) {
        dispatch(
          getBranchStoreMainStoreRequestList(
            requestGenerator(getBranchStoreMainStoreRequestPayload)
          )
        );
        setShowDeleteMainStoreItemModal((prevState) => !prevState);
        setDeleteMainStoreItemPopupdata({});
      }
    });
  };

  // reset branch store filter
  const resetBranchStoreFilter = () => {
    dispatch(clearSelectedMainStoreData());
    setRequestType(null);
    dispatch(
      setMessage({
        message: "Main Store Request are Reseted",
        type: success,
      })
    );
  };

  return (
    <>
      {issueItemPopup && (
        <Popup Children={IssueItemPopup} handleClose={handleIssuePopupClose} />
      )}
      {mainStoreRequestItemPopup && (
        <Popup
          Children={MainStoreRequestItemPopup}
          handleClose={mainStoreRequestPopupClose}
          handleRowClick={mainStoreRequestEditPopupOpen}
          handleOpen={handleDeleteMainStoreModal}
        />
      )}
      {mainStoreEditPopup && (
        <Popup
          Children={MainStoreRequestItemEditPopup}
          popData={mainStoreEditData}
          handleClose={mainStoreRequestEditPopupClose}
          handleSubmitData={mainStoreRequestEdit}
        />
      )}
      {branchStoreRequestModal && (
        <Popup
          Children={BranchStoreRequestPopup}
          popData={branchStoreRequestPayload}
          handleClose={handleBranchStoreRequestModalClose}
          handleSubmitData={handleBranchStoreModal}
        />
      )}
      {SubmitAllPopup && (
        <Popup
          Children={ItemIssued}
          popData={addIssueSuccessData}
          handleClose={submitIssuePopupClose}
        />
      )}
      {submitRequestPopup && (
        <Popup
          Children={SubmitRequest}
          popData={addMainStoreDataSuccess}
          handleClose={submitMainStorePopupClose}
        />
      )}
      {showDeleteMainStoreItemModal && (
        <Popup
          Children={DeleteMedicationPopup}
          handleClose={() => handleDeleteMainStoreModal({})}
          handleNo={() => handleDeleteMainStoreModal({})}
          handleYes={handleDeleteMainStoreItem}
        />
      )}
      {/* {showDeleteIssueModal && (
        <Popup
          Children={DeleteMedicationPopup}
          handleClose={() => handleDeleteIssueModal("")}
          handleNo={() => handleDeleteIssueModal("")}
          handleYes={handleDeleteIssue}
        />
      )} */}

      <div className={styles.branchStoreMainContainer}>
        <div className={styles.branchDataContainer}>
          <div className={styles.main}>
            <div className={styles.branchContainer}>
              {user_no && (
                <div className={styles.userIdContainer}>
                  <span className={styles.idText}>User ID:</span>
                  <p className={styles.text}>{user_no}</p>
                </div>
              )}
              <div className={styles.userIdContainer}>
                <span className={styles.idText}> User Name</span>
                <p className={styles.text}>{userData?.name} </p>
              </div>
              {/* <div className={styles.userIdContainer}>
                <span className={styles.idText}>Date</span>
                <p className={styles.text}>23 Jan 2023</p>
              </div>
              <div className={styles.userIdContainer}>
                <span className={styles.idText}> Doc ID</span>
                <p className={styles.text}>SS_IS_DT_TIME</p>
              </div> */}
            </div>
            <div className={styles.dropDownContainer}>
              <div className={styles.dropDownField}>
                <span className={styles.dropDownLabel}>Branch Store</span>
                <Select
                  className={styles.select}
                  placeholder=" Select Branch Store"
                  closeMenuOnSelect={true}
                  isSearchable={false}
                  isClearable={false}
                  components={{ DropdownIndicator }}
                  value={branchStoreType}
                  options={branchStoreOptions}
                  onChange={(selectedOption: any) => {
                    if (selectedMainStoreData.length > 0) {
                      dispatch(
                        setMessage({
                          message: "Reset the Main Store Request",
                          type: failure,
                        })
                      );
                    } else {
                      setBranchStoreType(selectedOption);
                    }
                  }}
                  maxMenuHeight={200}
                />
              </div>
            </div>
            <div className={styles.dropDownContainer}>
              <div className={styles.dropDownField}>
                <span className={styles.dropDownLabel}>Request Type</span>
                <Select
                  className={styles.select}
                  placeholder=" Select Request"
                  closeMenuOnSelect={true}
                  isSearchable={false}
                  isClearable={true}
                  components={{ DropdownIndicator }}
                  value={requestType}
                  options={requestDropdownData}
                  onChange={(selectedOption: any) => {
                    setRequestType(selectedOption);
                  }}
                  maxMenuHeight={200}
                />
                {/* <Select
                  className={styles.selectInputField}
                  placeholder="Select Request"
                  closeMenuOnSelect={true}
                  components={{ DropdownIndicator }}
                  // defaultValue={defaultBranch}
                  // options={branchDropDownData}
                  // {...register(BRANCH_TYPE)}
                  isSearchable={false}
                  // onChange={(e: any) => {
                  //   setValue(BRANCH_TYPE, e.value);
                  //   trigger(BRANCH_TYPE);
                  // }}
                  maxMenuHeight={200}
                /> */}
              </div>

              {requestType?.value === "DEPARTMENT" && (
                <>
                  <div className={styles.dropDownField}>
                    <span className={styles.subDropDownLabel}>Department</span>
                    <Select
                      className={styles.select}
                      placeholder="Select Department"
                      closeMenuOnSelect={true}
                      isSearchable={true}
                      components={{ DropdownIndicator }}
                      options={branchData?.departments?.map((item: any) => ({
                        label: item?.name,
                        value: item?._id,
                      }))}
                      onChange={(selectedOption: any) => {
                        setDepartmentName(selectedOption);
                      }}
                      maxMenuHeight={200}
                    />
                  </div>
                </>
              )}
              {requestType?.value === "ROOM" && (
                <>
                  <div className={styles.dropDownField}>
                    <span className={styles.subDropDownLabel}>Room</span>
                    <Select
                      className={styles.select}
                      placeholder="Select Room"
                      closeMenuOnSelect={true}
                      isSearchable={true}
                      components={{ DropdownIndicator }}
                      options={roomsDropDownData}
                      onChange={(selectedOption: any) => {
                        setRoomName(selectedOption);
                      }}
                      maxMenuHeight={200}
                    />
                  </div>
                </>
              )}
              {requestType?.value === "INDIVIDUAL" && (
                <>
                  <div className={styles.dropDownField}>
                    <span className={styles.subDropDownLabel}>User</span>
                    <Select
                      className={styles.select}
                      placeholder="Select User"
                      closeMenuOnSelect={true}
                      isSearchable={true}
                      components={{ DropdownIndicator }}
                      // options={dropdownData?.map((item: any) => ({
                      //   label: item?.value,
                      //   value: item?.value,
                      // }))}
                      maxMenuHeight={200}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <Button
              title="Requests"
              customClass={styles.button}
              handleClick={handleBranchStoreRequestModalOpen}
            />
            <Button
              title="Issued Items"
              customClass={styles.button}
              handleClick={handleIssuePopupOpen}
            />
            <Button
              title="Main store Req. Items"
              customClass={styles.button}
              handleClick={mainStoreRequestPopupOpen}
            />
          </div>
        </div>
        <div className={styles.reqSubmitbtn}>
          <Button
            title="Reset"
            type="button"
            customClass={styles.reqSubmit}
            handleClick={resetBranchStoreFilter}
          />
        </div>
      </div>
      <div className={styles.mainContainer}>
        <p
          className={tabs === "Issue" ? styles.tabContent : styles.disableTab}
          onClick={() => setTabs("Issue")}
        >
          Issue
        </p>
        <p
          className={
            tabs === "MS Request" ? styles.tabContent : styles.disableTab
          }
          onClick={() => setTabs("MS Request")}
        >
          MS Request
        </p>
      </div>
      {/* {tabs === "Issue" && ( */}
      <div className={styles.tabData}>
        <div className={styles.tablestyle}>
          <div className={styles.searchContainer}>
            {/* <span className={styles.search}>
              <Search
                placeHolder="Search"
                customClassInput={styles.inputSearch}
              />
            </span>
            <span className={styles.smartSearch}>
                <Search
                  placeHolder="Smart Search"
                  customClassInput={styles.inputSearch}
                />
              </span>
            <div className={styles.searchButton}>
              <SearchIcon fillColor={colors.white1} />
            </div> */}
            <SmartSearch
              placeHolder={"Search"}
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
              // isDisable={isSmartSearchDisable}
              customClassInput={styles.inputSearch}
            />
          </div>

          <TableV3
            getTableProps={getTableProps}
            getTableBodyProps={getTableBodyProps}
            headerGroups={headerGroups}
            rows={rows}
            prepareRow={prepareRow}
            // handleClick={handleDeleteIssueModal}
          />

          <div className={styles.reqSubmitbtn}>
            {tabs === "Issue" ? (
              <Button
                title="Issue Selected"
                type="button"
                customClass={styles.reqSubmit}
                handleClick={submitIssuePopup}
                disable={selectedIssueData?.length === 0 || isDisableIssueBtn}
              />
            ) : (
              <Button
                title="Submit Request"
                type="button"
                customClass={styles.reqSubmit}
                // handleClick={submitallPopupOpen1}
                handleClick={handleSubmitMainStoreRequest}
                disable={
                  selectedMainStoreUniqueData?.length === 0 ||
                  isDisableMainStoreRequestBtn
                }
              />
            )}
          </div>
        </div>
      </div>
      {/* )} */}
      {/* <div className={styles.tabData}>
        {tabs === "MS Request" && (
          <div>
            <div className={styles.tablestyle}>
              <div className={styles.searchContainer}>
                <span className={styles.search}>
                  <Search
                    placeHolder="Search"
                    customClassInput={styles.inputSearch}
                  />
                </span>
                <span className={styles.smartSearch}>
                <Search
                  placeHolder="Smart Search"
                  customClassInput={styles.inputSearch}
                />
              </span>
                <div className={styles.searchButton}>
                  <SearchIcon fillColor={colors.white1} />
                </div>
                <SmartSearch
                  placeHolder={"Smart Search"}
                  globalFilter={globalFilter}
                  setGlobalFilter={setGlobalFilter}
                  isDisable={isSmartSearchDisable}
                  customClassInput={styles.inputSearch}
                />
              </div>
              <TableV3
                getTableProps={getTableProps}
                getTableBodyProps={getTableBodyProps}
                headerGroups={headerGroups}
                rows={rows}
                prepareRow={prepareRow}
              />

              <div className={styles.reqSubmitbtn}>
                <Button
                  title="Submit Request"
                  type="button"
                  customClass={styles.reqSubmit}
                  handleClick={submitallPopupOpen1}
                />
              </div>
            </div>
          </div>
        )}
      </div> */}
    </>
  );
};
export default BranchStore;

import { useState } from "react";
import styles from "./mainstore.module.scss";
import Popup from "../../../components/common/popup/Popup";
import SubmittedPoPopup from "../submitted-po-popup/SubmittedPoPopup";
import PoSummaryPopup from "../po-summary-popup/PoSummaryPopup";
import Button from "../../../components/common/button/Button";
import MainStoreRequestPopup from "../mainstore-request-popup/MainStoreRequestPopup";
import SubmittedPobtnPopup from "../submitpo-popup/submitPobtnPopup";
import DirectPoPopup from "../direct-po-popup/DirectPoPopup";
import AddGrnPopup from "../add-grn-popup/AddGrnPopup";
import PendingPoPopup from "../pending-po-popup/PendingPoPopup";
import AdditionalItemsPoPopup from "../additional-items-popup/AdditionalItemsPopup";
import { issueMainStoreHeaderData } from "./issueMainStoreTableData";
import { poMainStoreHeaderData } from "./poMainStoreTableData";
import SmartSearch from "../../../components/common/smart-search/SmartSearch";
import {
  Column,
  TableOptions,
  useGlobalFilter,
  useSortBy,
  useTable,
} from "react-table";
import TableV3 from "../../../components/common/table/tableV3/TableV3";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import Select from "react-select";
import { CustomModal } from "../../../components/common/custom-modal/modal";
import { requestGenerator } from "../../../utils/payloadGenerator";
import { addInventoryIssueDataAll } from "../../../redux/features/inventory-request/inventoryRequestAsyncActions";
import {
  clearInventoryIssueData,
  emptyIssueCheckStatus,
  setIssueId,
  setRequestSourceEvent,
  setRequestSourceTypeEvent,
} from "../../../redux/features/inventory-request/inventoryRequestSlice";
import MainStoreIssueItem from "./issue-items/page";
import { DropdownIndicator } from "../../../components/common/dropdown-indicator/DropdownIndicator";

const MainStore = () => {
  const [tabs, setTabs] = useState("Issue");
  const { userData, branchData } = useAppSelector((state) => state.login);

  const { inventoryIssueData, inventoryPoData, getIssueId } = useAppSelector(
    (state) => state.inventoryRequest
  );

  const data: any =
    tabs === "Issue" ? inventoryIssueData : inventoryPoData ?? [];
  const columns: Column<any>[] =
    tabs === "Issue" ? issueMainStoreHeaderData : poMainStoreHeaderData ?? [];
  const options: TableOptions<any> = {
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
  const dispatch = useAppDispatch();

  // @ts-ignore
  const { globalFilter } = state;
  const [issueItemPopup, setIssueItemPopup] = useState(false);
  const [poSummaryPopup, setPoSummaryPopup] = useState(false);
  const [requestPopup, setRequestPopup] = useState(false);
  const [SubmitAllPopup, setSubmitAllPopup] = useState(false);
  const [directPoPopup, setDirectPoPopup] = useState(false);
  const [newGrnPopup, setNewGrnPopup] = useState(false);
  const [pendingPoPopup, setPendingPoPopup] = useState(false);
  const [additionalItemPopup, setAdditionalItemPopup] = useState(false);
  const [submitIssuedPopup, setSubmitIssuedPopup] = useState(false);
  const [poIdPopup, setpoIdPopup] = useState(false);
  const [issueItems, setIssueItems] = useState(false);
  const [val, setVal] = useState();

  const [popData, setPopData] = useState({
    supplier_id: "", // Initialize supplier_id as an empty string
    name: "",
  });

  const handleDirectPoModalClose = () => {
    setDirectPoPopup(!directPoPopup);
  };
  const handleNewGrnModalClose = () => {
    setNewGrnPopup(!newGrnPopup);
    setPopData({ ...popData, supplier_id: "", name: "" }); // Reset supplier_id when closing the "Add GRN" popup
  };
  const handleItemModalClose = () => {
    let data = {
      items: inventoryIssueData?.map((item: any) => {
        return {
          source: item?.request_source_type,
          destination: item?.destination,
          source_id:
            item?.request_source_type === "BRANCH_STORE"
              ? item?.source_id
              : undefined,
          store_id: item?.store_id,
          req_id: item?.req_id,
          item_id: item?.item_id,
          qty: Number(item?.issueQuantity) ?? 0,
          name: item.item_name,
          base_unit_type_id: item?.base_unit_type?._id,
          req_unit_type_id: item?.req_unit_type?._id,
        };
      }),
    };

    dispatch(addInventoryIssueDataAll(requestGenerator(data))).then(
      (response: any) => {
        dispatch(setIssueId(response.payload.doc_id));
        if ((response.type = "inventory/addInventoryIssueDataAll/fulfilled")) {
          setSubmitIssuedPopup(!submitIssuedPopup);
          dispatch(clearInventoryIssueData());
          dispatch(emptyIssueCheckStatus());
        }
      }
    );
  };

  const dropdownData: any = [
    {
      // id: 0,
      value: "Department",
    },
    {
      // id: 1,
      value: "Room",
    },
    {
      // id: 2,
      value: "Individual",
    },
  ];
  const handleDepartment = (supplierId: any, supplierName: string) => {
    setPendingPoPopup(true);
    setPopData({ ...popData, supplier_id: supplierId, name: supplierName }); // Update supplier_id in popData
  };

  return (
    <>
      <CustomModal
        showModal={issueItemPopup}
        closeModal={() => setIssueItemPopup(false)}
        title="Submitted PO"
        width="90%"
        height="580px"
      >
        <SubmittedPoPopup />
      </CustomModal>
      <CustomModal
        showModal={poSummaryPopup}
        closeModal={() => setPoSummaryPopup(false)}
        title="PO Summary"
        width="70%"
        height="580px"
      >
        <PoSummaryPopup />
      </CustomModal>

      <CustomModal
        showModal={requestPopup}
        closeModal={() => setRequestPopup(false)}
        title="Request"
        width="90%"
        height="580px"
      >
        <MainStoreRequestPopup handleClose={() => setRequestPopup(false)} />
      </CustomModal>
      <CustomModal
        showModal={SubmitAllPopup}
        closeModal={() => setSubmitAllPopup(false)}
        width="80%"
        height="580px"
        title="Confirm PO"
      >
        <SubmittedPobtnPopup handleOpen={() => setpoIdPopup(true)} />
      </CustomModal>
      <CustomModal
        showModal={poIdPopup}
        closeModal={() => setpoIdPopup(false)}
        title="PO ID"
        width="374px"
      >
        <div className={styles.content}>PO ID Created</div>
      </CustomModal>

      <CustomModal
        showModal={directPoPopup}
        closeModal={() => handleDirectPoModalClose()}
        width="90%"
        height="570px"
        title="Direct PO"
      >
        <DirectPoPopup closeModal={() => handleDirectPoModalClose()} />
      </CustomModal>
      {newGrnPopup && (
        <Popup
          Children={AddGrnPopup}
          handleClose={() => handleNewGrnModalClose()}
          handleChildClick={() => setAdditionalItemPopup(true)}
          handleDepartment={handleDepartment}
          popData={popData} // Pass the popData prop to the "PendingPoPopup" component
        />
      )}
      {pendingPoPopup && (
        <Popup
          Children={PendingPoPopup}
          handleClose={() => setPendingPoPopup(false)}
          popData={popData} // Pass the popData prop to the "PendingPoPopup" component
        />
      )}
      {additionalItemPopup && (
        <Popup
          Children={AdditionalItemsPoPopup}
          handleClose={() => setAdditionalItemPopup(false)}
        />
      )}
      <CustomModal
        showModal={submitIssuedPopup}
        closeModal={() => setSubmitIssuedPopup(false)}
        title="Items Issued"
        width="35%"
      >
        <div className={styles.content}>
          <h1 className={styles.docId}>
            Doc ID : <span className={styles.docIdValue}>{getIssueId}</span>
          </h1>
        </div>
      </CustomModal>
      <CustomModal
        showModal={issueItems}
        closeModal={() => setIssueItems(false)}
        title="Issue Items"
        width="85%"
        height="550px"
      >
        <MainStoreIssueItem />
      </CustomModal>
      <div className={styles.mainStoreMainContainer}>
        <div>
          <div className={styles.userInfoContainer}>
            {userData?.user_no?.length && (
              <div className={styles.userIdContainer}>
                <span className={styles.idText}>User ID</span>
                <p className={styles.text}>{userData?.user_no}</p>
              </div>
            )}
            <div className={styles.userIdContainer}>
              <span className={styles.idText}> User Name</span>
              <p className={styles.text}>{userData?.name}</p>
            </div>
          </div>

          <div className={styles.dropDownContainer}>
            <span className={styles.dropDownLabel}> Request Type</span>
            <Select
              className={styles.select}
              placeholder=" Select Request Type"
              closeMenuOnSelect={true}
              isSearchable={true}
              options={dropdownData?.map((item: any) => ({
                label: item?.value,
                value: item?.value,
              }))}
              onChange={(selectedOption: any) => {
                setVal(selectedOption?.value || null);
                dispatch(setRequestSourceTypeEvent(selectedOption?.value));
              }}
              maxMenuHeight={200}
            />

            {val === "Department" && (
              <>
                <div className={styles.dropDownContainer}>
                  <span className={styles.dropDownLabel}> Department</span>
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
                      dispatch(setRequestSourceEvent(selectedOption?.label));
                    }}
                    maxMenuHeight={200}
                  />
                </div>
              </>
            )}
            {val === "Room" && (
              <div className={styles.dropDownContainer}>
                <span className={styles.dropDownLabel}> Room</span>

                <Select
                  className={styles.select}
                  placeholder=" Select Room"
                  closeMenuOnSelect={true}
                  isSearchable={true}
                  options={dropdownData?.map((item: any) => ({
                    label: item?.value,
                    value: item?.value,
                  }))}
                  maxMenuHeight={200}
                />
              </div>
            )}
            {val === "Individual" && (
              <div className={styles.dropDownContainer}>
                <span className={styles.dropDownLabel}> User</span>

                <Select
                  className={styles.select}
                  placeholder=" Select User"
                  closeMenuOnSelect={true}
                  isSearchable={true}
                  options={dropdownData?.map((item: any) => ({
                    label: item?.value,
                    value: item?.value,
                  }))}
                  maxMenuHeight={200}
                />
              </div>
            )}
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <Button
            title="Requests"
            customClass={styles.button}
            handleClick={() => setRequestPopup(true)}
          />

          <Button
            title="Submitted PO"
            customClass={styles.button}
            handleClick={() => setIssueItemPopup(true)}
          />
          <Button
            title="PO Summary"
            customClass={styles.button}
            handleClick={() => setPoSummaryPopup(true)}
          />
          <Button
            title="Direct PO"
            customClass={styles.button}
            handleClick={handleDirectPoModalClose}
          />
          <Button
            title="Add GRN"
            customClass={styles.button}
            handleClick={handleNewGrnModalClose}
          />
          <Button
            title="Issue Items"
            customClass={styles.button}
            handleClick={() => setIssueItems(true)}
          />
        </div>
      </div>
      <div style={{ marginTop: "40px" }}>
        <div className={styles.mainContainer}>
          <p
            className={tabs === "Issue" ? styles.tabContent : styles.disableTab}
            onClick={() => setTabs("Issue")}
          >
            Issue
          </p>
          <p
            className={tabs === "PO" ? styles.tabContent : styles.disableTab}
            onClick={() => setTabs("PO")}
          >
            PO
          </p>
        </div>
      </div>
      {tabs === "Issue" && (
          <div className={styles.tablestyle}>
            <div className={styles.searchContainer}>
              <SmartSearch
                placeHolder="Search"
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
                isDisable={!inventoryIssueData?.length}
              />
            </div>
            <div style={{ overflow: "auto", whiteSpace: "nowrap" }}>
              <TableV3
                getTableProps={getTableProps}
                getTableBodyProps={getTableBodyProps}
                headerGroups={headerGroups}
                rows={rows}
                prepareRow={prepareRow}
              />
            </div>
            <div className={styles.btn}>
              <Button
                title="Issue All Selected"
                handleClick={() => handleItemModalClose()}
                disable={!inventoryIssueData?.length}
              />
            </div>
          </div>
      )}
      {tabs === "PO" && (
          <div className={styles.tablestyle}>
            <div className={styles.searchContainer}>
              <SmartSearch
                placeHolder="Search"
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
                isDisable={!inventoryPoData?.length}
              />
            </div>
            <TableV3
              getTableProps={getTableProps}
              getTableBodyProps={getTableBodyProps}
              headerGroups={headerGroups}
              rows={rows}
              prepareRow={prepareRow}
            />

            <div className={styles.btn}>
              <Button
                title="Submit PO"
                type="button"
                customClass={styles.reqSubmit}
                handleClick={() => setSubmitAllPopup(true)}
                disable={!inventoryPoData?.length}
              />
            </div>
          </div>
      )}
    </>
  );
};
export default MainStore;

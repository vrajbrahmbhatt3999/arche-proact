import { FC, useState, useEffect } from "react";
import styles from "./addgrnpopup.module.scss";
import { CloseIcon } from "../../../components/common/svg-components";
import { colors } from "../../../constants/color";
import Divider from "../../../components/common/divider/Divider";
import Button from "../../../components/common/button/Button";
import TableV2 from "../../../components/common/table/tableV2/TableV2";
import { addGrnHeaderData } from "../../../constants/table-data/addGrnTableData";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { requestGenerator } from "../../../utils/payloadGenerator";
import SearchDropDown from "../../../components/common/search-dropdown/SearchDropDown";
import {
  getAllInventoryAllPo,
  grnAdd,
} from "../../../redux/features/inventory-request/inventoryRequestAsyncActions";
import { getAllSupplierDetails } from "../../../redux/features/purchase-invoice/purchaseAsyncActions";
import Loader from "../../../components/common/spinner/Loader";
import {
  clearInventoryPurchaseOrderData,
  emptyAllPoData,
} from "../../../redux/features/inventory-request/inventoryRequestSlice";
import AttachfilesV2 from "../../../components/common/attach-files/AttachfilesV2";
import { fileType } from "../../../interfaces/interfaces";

interface INewGrnPopup {
  handleClose?: any;
  handleChildClick?: any;
  handleDepartment?: any;
  popData: any;
  // supplier_id?: any;
  name?: any;
}

const AddGrnPopup: FC<INewGrnPopup> = ({
  handleClose,
  handleChildClick,
  handleDepartment,
  popData,
  // supplier_id,
}) => {
  const dispatch = useAppDispatch();
  const [searchString, setSearchString] = useState("");
  const [supplierId, setSupplierId] = useState<any>({
    supplier_id: "",
    date: "",
    doc_no: "",
    selectedSupplierName: "",
  });
  const [selectedSupplierName, setSelectedSupplierName] = useState("");
  const [nameSelected, setNameSelected] = useState(false);
  const [supplierDocNo, setSupplierDocNo] = useState("");
  const [receivedDate, setReceivedDate] = useState("");
  const [showDocNoError, setShowDocNoError] = useState(false);
  const [showDateError, setShowDateError] = useState(false);
  const [attachments, setAttachments] = useState<fileType[]>([]);

  const { suppliersInfo } = useAppSelector((state) => state.purchaseInvoice);
  const { branchData } = useAppSelector((state) => state.login);

  const { isLoading, selectedPurchaseOrderList } = useAppSelector(
    (state) => state.inventoryRequest
  );

  const filterDataWithPoNo = selectedPurchaseOrderList?.filter((item: any) =>
    item?.hasOwnProperty("po_no")
  );
  const filterDataWithOutPoNo = selectedPurchaseOrderList?.filter(
    (item: any) => !item?.hasOwnProperty("po_no")
  );
  const handlePendingPOClick = (item: any) => {
    if (supplierId.supplier_id && selectedSupplierName) {
      handleDepartment(supplierId.supplier_id, selectedSupplierName);
    } else {
      console.error("Supplier ID is missing or invalid.");
    }
  };
  useEffect(() => {
    if (searchString === "") {
      setNameSelected(false);
    }
  }, [searchString]);

  useEffect(() => {
    let requestData = {
      status: ["INITIATED", "PARTIAL"],
      supplier_id: popData?.supplier_id,
      isPOItem: true,
    };
    dispatch(getAllInventoryAllPo(requestGenerator(requestData)));
  }, [dispatch]);

  useEffect(() => {
    let data = {
      name: searchString,
    };
    dispatch(getAllSupplierDetails(requestGenerator(data)));
  }, [dispatch, searchString]);

  const handleAdd = () => {
    let payloadData = {
      supplier_name: selectedSupplierName,
      supplier_id: popData?.supplier_id,
      receive_date: receivedDate,
      store_id: branchData?.main_store?.[0]?._id,
      supplier_doc_no: supplierDocNo,
      file: attachments,
      received_items: filterDataWithPoNo?.map((item: any) => {
        return {
          po_id: item?.po_id,
          po_item_id: item?.po_item_id,
          item_id: item?.item_id,
          name: item?.name,
          qty: item?.delievered_qty,
          price: item?.requested_price,
          total_amount: item?.requested_price * item?.delievered_qty,
          base_unit_type_id: item?.base_unit_type?._id,
          req_unit_type_id: item?.req_unit_type?._id,
        };
      }),
      additional_items: filterDataWithOutPoNo?.map((items: any) => {
        return {
          item_id: items?.item_id,
          name: items?.name,
          qty: items?.requested_qty,
        };
      }),
    };
    dispatch(grnAdd(requestGenerator(payloadData))).then((e) => {
      if (e.type === "inventory/grnAdd/fulfilled") {
        handleClose();
        dispatch(emptyAllPoData());
      }
    });

    if (!supplierDocNo) {
      setShowDocNoError(true);
    }

    if (!receivedDate) {
      setShowDateError(true);
    }
  };
  useEffect(() => {
    dispatch(clearInventoryPurchaseOrderData());
  }, [dispatch]);
  return (
    <>
      {isLoading && <Loader />}
      <div
        className={styles.newGrnPopupMainContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <CloseIcon
          customClass={styles.closeIconStyle}
          fillColor={colors.green1}
          handleClick={() => handleClose()}
        />
        <div className={styles.paymentContainer}>
          <p className={styles.title}> Add GRN </p>
          <Divider customClass={styles.dividerStyle} />
        </div>
        <div className={styles.searchContainer}>
          <div className={styles.searchDropDownContainer}>
            <span className={styles.text}>Supplier Name</span>
            <SearchDropDown
              searchString={searchString}
              setSearchString={setSearchString}
              dropdownDataToSee={suppliersInfo}
              dropDownKeyName="name"
              customClass={styles.search}
              handleClick={(item: any, setVal: any, setShowDropdown: any) => {
                setVal(item?.name);
                setSupplierId({ ...supplierId, supplier_id: item?._id });
                setShowDropdown(false);
                setNameSelected(true);
                setSelectedSupplierName(item?.name);
              }}
            />
          </div>

          <div className={styles.textFieldContainer}>
            <label className={styles.text}> GRN No:</label>
            <input
              type="text"
              placeholder="XXXXXX"
              className={styles.inputSearchGrn}
              disabled={true}
            />
          </div>
          <div className={styles.dateSearch}>
            <div className={styles.dateField}>
              <p className={styles.text}> Date </p>
              <input
                type="date"
                value={receivedDate}
                onChange={(e) => setReceivedDate(e.target.value)}
                className={styles.inputSearch}
              />
            </div>
            <div>
              {showDateError && (
                <p className={styles.errorText}>Date is required.</p>
              )}
            </div>
          </div>
        </div>

        <div className={styles.searchContainer2}>
          <div className={styles.textFieldContainer}>
            <div>
              <label className={styles.text}> Supplier's Document No</label>
              <input
                type="text"
                className={styles.inputSearch}
                value={supplierDocNo}
                onChange={(e) => setSupplierDocNo(e.target.value)}
              />
            </div>

            <div>
              {showDocNoError && (
                <p className={styles.errorText}>
                  Supplier's Document No is required.
                </p>
              )}
            </div>
          </div>
          <div className={styles.attachmentContainer}>
            <label className={styles.labelText}>Attachments</label>
            <div className={styles.fieldErrorContainer}>
              <AttachfilesV2
                isMultiSelect={true}
                fileKey="name"
                attachments={attachments}
                setAttachments={setAttachments}
                customClassFileName={styles.fileNameStyle}
                customAttachFileName={styles.attachedFile}
              />
            </div>
          </div>
        </div>
        <div className={styles.btnContainer}>
          <Button
            title="Pending PO"
            handleClick={handlePendingPOClick}
            disable={!nameSelected}
          />
          <Button
            title="Additional Items"
            handleClick={handleChildClick}
            disable={!filterDataWithPoNo?.length}
          />
        </div>
        <div className={styles.table}>
          <TableV2
            tableHeaderData={addGrnHeaderData}
            tableRowData={selectedPurchaseOrderList}
            active={false}
          />
        </div>
        <div className={styles.btn}>
          <Button title="Submit" handleClick={handleAdd} />
        </div>
      </div>
    </>
  );
};

export default AddGrnPopup;

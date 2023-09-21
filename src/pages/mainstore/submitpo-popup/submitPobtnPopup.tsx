import { FC, useEffect, useState } from "react";
import styles from "./submitpobtnPopup.module.scss";
import TableV2 from "../../../components/common/table/tableV2/TableV2";
import Button from "../../../components/common/button/Button";
import { primaryInformationHeaderData } from "./primaryInformationTableData";
import { poformHeaderData } from "./poFormTableData";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  emptyPoFormData,
  getPoFormData,
  updateDirectPoStatus,
  updateInventoryPoData,
} from "../../../redux/features/inventory-request/inventoryRequestSlice";
import { addInventoryAddPo } from "../../../redux/features/inventory-request/inventoryRequestAsyncActions";
import { requestGenerator } from "../../../utils/payloadGenerator";
import { CustomModal } from "../../../components/common/custom-modal/modal";
import AddPoNotes from "./addpo-notes/page";
interface ISubmitPobtnPopup {
  handleOpen?: any;
}

const SubmittedPobtnPopup: FC<ISubmitPobtnPopup> = ({ handleOpen }) => {
  const [tabs, setTabs] = useState("Primary Information");
  const [value, setValue] = useState();
  const [active, setActive] = useState<boolean>(false);
  const [addNotes, setAAddNotes] = useState(false);
  const [idNotes, setIdNotes] = useState("");
  const [poFormAllData, setPoFormAllData] = useState<any>([]);

  const { inventoryPoData, poFormData, directPoStatus } = useAppSelector(
    (state) => state.inventoryRequest
  );

  const { branchData } = useAppSelector((state) => state.login);
  useEffect(() => {
    let supplierList: any = [];
    inventoryPoData.forEach((element: any) => {
      let checkSupplier = supplierList.filter(
        (p: any) => p?._id?.toString() === element?.supplier_id?._id.toString()
      );
      if (checkSupplier.length === 0) {
        supplierList.push({
          _id: element?.supplier_id?._id,
          name: element?.supplier_id?.name,
          createdAt: element?.createdAt,
        });
      }
    });

    setPoFormAllData(supplierList);
  }, [inventoryPoData]);

  const dispatch = useAppDispatch();
  const submitPoData = () => {
    let data = {
      items: poFormData?.map((items: any) => {
        return {
          item_id: items?._id,
          name: items?.item_name || items?.name,
          requested_price: items?.sell_price,
          requested_qty: items?.poQuantity,
          notes: items?.poNotes ?? "",
          expected_date: items?.expected_delievery_date,
          supplier_id: items?.supplier_id?._id,
          currency: "KD",
          store_id: branchData?.main_store?.[0]?._id,
          base_unit_type_id: items?.base_unit_type?._id,
          req_unit_type_id: items?.updatedMasterUnitType?.value,
        };
      }),
    };
    dispatch(addInventoryAddPo(requestGenerator(data))).then((e) => {
      if (e.type === "inventory/addInventoryAddPo/fulfilled") {
        let data = poFormAllData?.filter(
          (s: any) => s._id !== poFormData?.[0]?.supplier_id?._id
        );
        setPoFormAllData(data);
        let data2 = inventoryPoData?.filter(
          (s: any) => s.supplier_id._id !== poFormData?.[0]?.supplier_id?._id
        );
        dispatch(updateInventoryPoData(data2));
        let poStatusData = directPoStatus?.filter(
          (s: any) => s !== poFormData?.[0]?._id
        );
        dispatch(updateDirectPoStatus(poStatusData));
        dispatch(emptyPoFormData());
        handleOpen();
      }
    });
  };

  const handleClickPoData = (item: any, row: any) => {
    setValue(item);
    if (value === item) {
      setActive(true);
    } else {
      setActive(false);
    }
    let inventoryData = inventoryPoData.filter(
      (p: any) => p?.supplier_id?._id?.toString() === row?._id?.toString()
    );
    dispatch(getPoFormData(inventoryData));
  };

  return (
    <>
      <CustomModal
        showModal={addNotes}
        closeModal={() => setAAddNotes(false)}
        title="Add Notes"
        width="35%"
        height="320px"
      >
        <AddPoNotes objId={idNotes} closeModal={() => setAAddNotes(false)} />
      </CustomModal>
      <div className={styles.mainContainer}>
        <p
          className={
            tabs === "Primary Information"
              ? styles.tabContent
              : styles.disableTab
          }
          onClick={() => setTabs("Primary Information")}
        >
          Primary Information
        </p>
        <p
          className={tabs === "PO Form" ? styles.tabContent : styles.disableTab}
          onClick={() => poFormData?.length && setTabs("PO Form")}
        >
          PO Form
        </p>
      </div>

      {tabs === "Primary Information" && (
        <>
          <div className={styles.tablestyle}>
            <TableV2
              tableHeaderData={primaryInformationHeaderData}
              tableRowData={poFormAllData}
              setActive={setValue}
              active={value}
              handleRow={(item: any, row: any) => handleClickPoData(item, row)}
            />
          </div>

          <div className={styles.button}>
            <Button
              title="Next"
              handleClick={() => setTabs("PO Form")}
              disable={!poFormData?.length}
            />
          </div>
        </>
      )}

      {tabs === "PO Form" && (
        <>
          <div className={styles.tablestyle}>
            <TableV2
              tableHeaderData={poformHeaderData}
              tableRowData={poFormData ?? []}
              active={false}
              handleClick={(item: any) => (
                setIdNotes(item._id), setAAddNotes(true)
              )}
            />
          </div>
          <div className={styles.button}>
            <Button title="Submit" handleClick={() => submitPoData()} />
          </div>
        </>
      )}
    </>
  );
};

export default SubmittedPobtnPopup;

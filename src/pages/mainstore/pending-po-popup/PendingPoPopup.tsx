import { FC, useEffect } from "react";
import styles from "./pendingpopopup.module.scss";
import { CloseIcon } from "../../../components/common/svg-components";
import { colors } from "../../../constants/color";
import Divider from "../../../components/common/divider/Divider";
import TableV2 from "../../../components/common/table/tableV2/TableV2";
import Button from "../../../components/common/button/Button";
import { pendingPoPopupHeaderData } from "./pendingPoPopupData";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { requestGenerator } from "../../../utils/payloadGenerator";
import { getAllInventoryAllPo } from "../../../redux/features/inventory-request/inventoryRequestAsyncActions";
import Loader from "../../../components/common/spinner/Loader";
interface IPendingPoPopup {
  handleClose?: any;
  popData?: any;
  supplier_id?: any;
}

const PendingPoPopup: FC<IPendingPoPopup> = ({
  handleClose,
  popData,
  supplier_id,
}) => {
  const dispatch = useAppDispatch();

  const { isLoading, getAllInventoryPurchaseOrderData } = useAppSelector(
    (state) => state.inventoryRequest
  );

  useEffect(() => {
    let requestData = {
      status: ["INITIATED", "PARTIAL"],
      authorization_status: 'APPROVED',
      supplier_id: popData?.supplier_id,
      isPOItem: true,
    };
    dispatch(getAllInventoryAllPo(requestGenerator(requestData)));
  }, [dispatch, supplier_id]);

  const handle = () => {
    let requestData = {
      status: ["INITIATED", "PARTIAL"],
      authorization_status: 'APPROVED',
      supplier_id: popData?.supplier_id,
      isPOItem: true,
    };
    dispatch(getAllInventoryAllPo(requestGenerator(requestData)));
    handleClose();
  };


  return (
    <>
      {isLoading && <Loader />}
      <div
        className={styles.pendingPoPopupMainContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <CloseIcon
          customClass={styles.closeIconStyle}
          fillColor={colors.green1}
          handleClick={() => handleClose()}
        />
        <div className={styles.paymentContainer}>
          <p className={styles.title}> Pending PO </p>
          <Divider customClass={styles.dividerStyle} />
        </div>
        <div className={styles.searchContainer}>
     
          <span className={styles.text}>Supplier Name : {popData?.name}</span>
        </div>
        <div className={styles.tableContainer}>
          <TableV2
            tableHeaderData={pendingPoPopupHeaderData}
            tableRowData={getAllInventoryPurchaseOrderData}
            active={false}
          />
        </div>
        <div className={styles.btnContainer}>
          <Button title="Submit" handleClick={handle} />
        </div>
      </div>
    </>
  );
};

export default PendingPoPopup;

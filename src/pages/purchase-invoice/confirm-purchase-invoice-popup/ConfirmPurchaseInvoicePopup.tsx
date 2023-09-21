import { FC, useState } from "react";
import styles from "./confirmpurchaseinvoicepopup.module.scss"
import Divider from "../../../components/common/divider/Divider";
import Search from "../../../components/common/search/Search";
import { colors } from "../../../constants/color";
import { CloseIcon } from "../../../components/common/svg-components";
import Button from "../../../components/common/button/Button";
import TableV2 from "../../../components/common/table/tableV2/TableV2";
import { purchaseInvoiceData, purchaseInvoiceHeaderData } from "../../../constants/table-data/purchaseInvoiceTableData";
import Popup from "../../../components/common/popup/Popup";
import PurchaseCreatedPopup from "../purchase-created/PurchaseCreated";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { getPurchaseInvoice } from "../../../redux/features/purchase-invoice/purchaseAsyncActions";
import { requestGenerator } from "../../../utils/payloadGenerator";
import { useNavigate } from "react-router-dom";
import { CREATE_PURCHASE_INVOICE } from "../../../constants/asyncActionsType";
import { setMessage } from "../../../redux/features/toast/toastSlice";
import { success } from "../../../constants/data";
import { clearStates } from "../../../redux/features/purchase-invoice/purchaseInvoiceSlice";
interface IConfirmPurchaseInvoicePopup {
  handleClose?: any
  popData?: any
}

const ConfirmPurchaseInvoicePopup: FC<IConfirmPurchaseInvoicePopup> = ({ handleClose, popData }) => {

  const [purchasePopup, setPurchasePopup] = useState(false);

  const { conformPurchaseInvoiceList } = useAppSelector((state) => state.purchaseInvoice);

  const dispatch = useAppDispatch()
  const handleModalClose1 = () => {
    setPurchasePopup(!purchasePopup);
  };
  const issuedItemPopup = () => {

    // const grnList = conformPurchaseInvoiceList?.map((item: any) => {
    //   return item?._id
    // })

    const requestedPaylod = {
      // grnIds: grnList,
      supplier_doc_no: popData?.doc_no,
      file: popData?.file,
      grn_items: conformPurchaseInvoiceList?.map((items: any) => {
        return {
          _id: items?._id,
          received_items: items?.received_items
        }
      }),
      type: 'INVENTORY_PURCHASE'

    }

    dispatch(getPurchaseInvoice(requestGenerator(requestedPaylod))).then((e) => {
      if ((e.type === `${CREATE_PURCHASE_INVOICE}/fulfilled`)) {
        setPurchasePopup(!purchasePopup);
        dispatch(clearStates());
        dispatch(
          setMessage({
            message: "Purchase_invoice Generated",
            type: success,
          })
        );
      }
    })
  };

  return (
    <>
      {purchasePopup && (
        <Popup
          Children={PurchaseCreatedPopup}
          handleClose={() => handleModalClose1()}
        />
      )}
      <div
        className={styles.PurchaseInvoicePopupMainContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <CloseIcon
          customClass={styles.closeIconStyle}
          fillColor={colors.green1}
          handleClick={() => handleClose()}
        />
        <div className={styles.paymentContainer}>
          <p className={styles.title}> Confirm Purchase Invoice</p>
          <Divider customClass={styles.dividerStyle} />
        </div>

        <div className={styles.tableContainer}>
          <TableV2
            tableHeaderData={purchaseInvoiceHeaderData}
            tableRowData={conformPurchaseInvoiceList}
            active={false}

          />

        </div>

        <div className={styles.button}>
          <Button title="Submit" handleClick={issuedItemPopup} />
        </div>
      </div>
    </>
  );
};


export default ConfirmPurchaseInvoicePopup;
;
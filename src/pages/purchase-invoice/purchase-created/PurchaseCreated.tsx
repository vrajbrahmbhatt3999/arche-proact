import { FC } from "react";
import styles from "./purchasecreated.module.scss"
import Divider from "../../../components/common/divider/Divider";
import Search from "../../../components/common/search/Search";
import { colors } from "../../../constants/color";
import { CloseIcon } from "../../../components/common/svg-components";
import { useAppSelector } from "../../../hooks";
import Loader from "../../../components/common/spinner/Loader";
interface IPurchaseCreatedPopup {
  handleClose?: any
}

const PurchaseCreatedPopup: FC<IPurchaseCreatedPopup> = ({ handleClose }) => {

  const { generatedInvoiceData, isLoading } = useAppSelector((state) => state.purchaseInvoice);
  return (
    <>
      {isLoading && <Loader />}
      <div
        className={styles.mainStoreRequestItemPopupMainContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <CloseIcon
          customClass={styles.closeIconStyle}
          fillColor={colors.green1}
          handleClick={() => handleClose()}
        />
        <div className={styles.paymentContainer}>
          <p className={styles.title}> PI Doc Created</p>
          <Divider customClass={styles.dividerStyle} />
        </div>

        <div className={styles.content}>
          <h1 className={styles.docId}>PO DOC ID : <span className={styles.docIdValue}>{generatedInvoiceData?.grn_details?.grn_doc_no}</span></h1>
        </div>

      </div>
    </>
  );
};


export default PurchaseCreatedPopup;
;
import { FC } from "react";
import { CloseIcon } from "../../../components/common/svg-components";
import { colors } from "../../../constants/color";
import { useAppDispatch, useAppSelector } from "../../../hooks/index";
import TableV2 from "../../../components/common/table/tableV2/TableV2";
import Button from "../../../components/common/button/Button";
import Loader from "../../../components/common/spinner/Loader";
import styles from "./returnInvoiceModal.module.scss";
import {
  returnInvoiceModalTableData,
  returnInvoiceModalTableDataReceiptionist,
  returnInvoiceModalData,
} from "../../../constants/table-data/returnInvoiceModalTableData";
interface IReturnInvoiceModal {
  handleClose: (e?: React.MouseEvent<HTMLElement>) => void;
  handleYes: any;
  popData?: any;
}

const ReturnInvoiceModal: FC<IReturnInvoiceModal> = ({
  handleClose,
  handleYes,
  popData,
}) => {
  const { returnInvoiceData, selectedReturnInvoiceData, isLoading } =
    useAppSelector((state) => state.receipt);
  // console.log("returnInvoiceData :>> ", returnInvoiceData);

  return (
    <>
      {isLoading && <Loader />}

      <div
        className={styles.returnInvoiceModalContainer}
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
        <h1 className={styles.returnInvoiceModalHeading}>Return Invoice</h1>
        <hr className={styles.returnInvoiceModalDivider} />
        <div className={styles.useDetailsAndBtnContainer}>
          <div className={styles.userDetails}>
            <div className={styles.userDetailLabel}>
              <p className={styles.userDetailLableText}>Invoice:</p>
              <p className={styles.userDetailText}>
                {returnInvoiceData?.invoice_no?.toString().padStart(6, "0")}
              </p>
            </div>
            <div className={styles.userDetailLabel}>
              <p className={styles.userDetailLableText}>Patient Name:</p>
              <p className={styles.userDetailText}>
                {returnInvoiceData?.patient_name}
              </p>
            </div>
          </div>
          <Button
            title="Fully Return"
            type="button"
            // customClass={styles.outStandingBtn}
            handleClick={() => handleYes("FULLY_RETURN")}
          />
        </div>
        <div className={styles.paidDetails}>
          <div className={styles.paidAmountLabel}>
            <p className={styles.paidAmountLabelText}>Total Paid Amount:</p>
            <p className={styles.paidAmountText}>
              {returnInvoiceData?.paid_amount}
            </p>
          </div>
        </div>
        <div className={styles.returnInvoiceContainer}>
          <div className={styles.tableContainer}>
            <TableV2
              tableHeaderData={
                returnInvoiceData?.type === "DIAGNOSIS"
                  ? returnInvoiceModalTableDataReceiptionist
                  : returnInvoiceModalTableData
              }
              tableRowData={returnInvoiceData?.return_invoice_data}
              active={false}
            />
          </div>
        </div>
        <div className={styles.returnInvoiceBtnContaniner}>
          <Button
            title="Submit"
            type="button"
            customClass={styles.invoiceBtn}
            handleClick={() => handleYes("SUBMIT")}
            disable={selectedReturnInvoiceData?.length <= 0}
          />
        </div>
      </div>
    </>
  );
};

export default ReturnInvoiceModal;

import { FC, useState, useEffect } from "react";
import {
  CloseIcon,
  PrintIcon,
  ExportIcon,
} from "../../../components/common/svg-components";
import { receipt_payment_modal_table_data } from "./receiptPaymentModalDummuData";
import { receiptPaymentModalHeaderData } from "../../../constants/table-data/receiptPaymentModalHeaderData";
import { requestGenerator } from "../../../utils/payloadGenerator";
import { useAppDispatch, useAppSelector } from "../../../hooks/index";
import { colors } from "../../../constants/color";
import styles from "./receiptPaymentModal.module.scss";
import { trimValue } from "../../../utils/utils";
import TableV2 from "../../../components/common/table/tableV2/TableV2";
import Loader from "../../../components/common/spinner/Loader";
import Button from "../../../components/common/button/Button";
import {
  addReceiptPaymentModeData,
  updateTotalAdvanceAndRefundAmount,
  addOutstaningReceiptData,
  clearSelectedInvoiceData,
  updateTotalOutstandingAmount,
  addExistingReceiptNoOutstanding,
} from "../../../redux/features/receipt/receiptSlice";

interface IReceiptPaymentModal {
  handleOpen: any;
  handleSubmitData: any;
  handleYes: any;
  handleClose: (e?: React.MouseEvent<HTMLElement>) => void;
  popData: any;
}

const ReceiptPaymentModal: FC<IReceiptPaymentModal> = ({
  handleOpen,
  handleClose,
  handleSubmitData,
  handleYes,
  popData,
}) => {
  const dispatch = useAppDispatch();
  const {
    isLoading,
    receiptPaymentModeData,
    totalOutstandingAmount,
    totalAdvanceAndRefundAmount,
    // createReceiptOutStandingData,
    // createReceiptAdvanceData,
    // createReceiptRefundData,
  } = useAppSelector((state) => state.receipt);
  // state variables
  // const [outStandingReceiptData, setOutStandingReceiptData] = useState([]);
  // const [advanceAndRefundReceiptData, setAdvanceAndRefundReceiptData] =
  //   useState<string>("");
  const [disableReceiptSubmit, setDisableReceiptSubmit] =
    useState<boolean>(true);

  // useEffect for disable submit receipt button
  useEffect(() => {
    if (totalAdvanceAndRefundAmount <= 0) {
      setDisableReceiptSubmit(true);
    } else if (
      popData?.receipt_type === "OUTSTANDING" &&
      totalOutstandingAmount < totalAdvanceAndRefundAmount
    ) {
      setDisableReceiptSubmit(true);
    } else {
      setDisableReceiptSubmit(false);
    }
  }, [popData, totalAdvanceAndRefundAmount, totalOutstandingAmount]);

  // useEffect for default add field in refund
  useEffect(() => {
    if (popData?.receipt_type === "REFUND") {
      let selectedPaymentModeData = {
        _id: 0,
        payment_mode: "cash",
        payment_label: "Cash",
        amount: 0,
      };
      dispatch(addReceiptPaymentModeData(selectedPaymentModeData));
    }
  }, [dispatch, popData]);

  // function to create receipt number array
  // useEffect(() => {
  //   if (
  //     popData?.receipt_type === "OUTSTANDING" &&
  //     popData?.selectedInvoiceData?.length > 0
  //   ) {
  //     const receiptArray = popData?.selectedInvoiceData?.map(
  //       (item: any, index: any) => {
  //         const sixDigitString = item?.receipt_no?.toString().padStart(6, "0");
  //         return sixDigitString;
  //       }
  //     );
  //     setOutStandingReceiptData(receiptArray);
  //     dispatch(addOutstaningReceiptData(receiptArray));
  //   }
  // }, [dispatch, popData]);

  // function to create receipt number for advance and refund
  // useEffect(() => {
  //   if (popData?.receipt_type === "OUTSTANDING") {
  //     const sixDigitString = createReceiptOutStandingData?.receipt_no
  //       ?.toString()
  //       .padStart(6, "0");
  //     setAdvanceAndRefundReceiptData(sixDigitString);
  //   } else if (popData?.receipt_type === "ADVANCE") {
  //     const sixDigitString = createReceiptAdvanceData?.receipt_no
  //       ?.toString()
  //       .padStart(6, "0");
  //     setAdvanceAndRefundReceiptData(sixDigitString);
  //   } else if (popData?.receipt_type === "REFUND") {
  //     const sixDigitString = createReceiptRefundData?.receipt_no
  //       ?.toString()
  //       .padStart(6, "0");
  //     setAdvanceAndRefundReceiptData(sixDigitString);
  //   }
  // }, [
  //   popData,
  //   createReceiptOutStandingData,
  //   createReceiptAdvanceData,
  //   createReceiptRefundData,
  // ]);

  // useEffect for count total amount in advance and refund.
  useEffect(() => {
    let addPaymentModeSum = 0;
    if (receiptPaymentModeData.length > 0) {
      for (let i = 0; i < receiptPaymentModeData.length; i++) {
        addPaymentModeSum += Number(receiptPaymentModeData[i]?.amount);
      }
      let selectedInvoiceSumToFixed = Number(addPaymentModeSum.toFixed(3));
      dispatch(updateTotalAdvanceAndRefundAmount(selectedInvoiceSumToFixed));
    } else {
      dispatch(updateTotalAdvanceAndRefundAmount(0));
    }
  }, [dispatch, receiptPaymentModeData]);

  // clear receipt data on component remove
  useEffect(() => {
    return () => {
      dispatch(clearSelectedInvoiceData());
      dispatch(updateTotalOutstandingAmount(undefined));
      dispatch(addExistingReceiptNoOutstanding({}));
    };
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      <div
        className={styles.receiptPaymentModalContainer}
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
        <h1 className={styles.receiptPaymentModalHeading}>Make Payment</h1>
        <hr className={styles.receiptPaymentModalDivider} />
        {/* {popData?.receipt_type === "OUTSTANDING" && (
          <div className={styles.outStandingReceiptNoContainer}>
            <p className={styles.outStandingReceiptNoLabel}>Receipt No :</p>
            <div className={styles.outStandingReceiptNoTxtContainer}>
              {outStandingReceiptData?.map((item: any, index: number) => (
                <p className={styles.outStandingReceiptNo} key={index}>
                  {item}
                  {index < outStandingReceiptData?.length - 1 ? "," : ""}
                </p>
              ))}
            </div>
          </div>
        )} */}
        {/* <div className={styles.receiptNoContainer}>
          <p className={styles.receiptNoLabel}>Receipt No :</p>
          <p className={styles.receiptNo}>{advanceAndRefundReceiptData}</p>
        </div> */}
        <div className={styles.receiptPaymentContainer}>
          <div className={styles.receiptPaymentInfoContainer}>
            {popData?.receipt_type === "OUTSTANDING" && (
              <h1 className={styles.receiptPaymentOutstandingAmountDetail}>
                Outstanding Amount: ${totalOutstandingAmount?.toFixed(3)}
              </h1>
            )}
            {popData?.receipt_type === "ADVANCE" && (
              <h1 className={styles.receiptPaymentAdvanceAmountDetail}>
                Advance Amount: ${totalAdvanceAndRefundAmount?.toFixed(3)}
              </h1>
            )}
            {popData?.receipt_type === "REFUND" && (
              <h1 className={styles.receiptPaymentRefundAmountDetail}>
                Refund Amount: ${totalAdvanceAndRefundAmount?.toFixed(3)}
              </h1>
            )}
            <div className={styles.receiptPaymentBtnContainer}>
              {popData?.receipt_type !== "REFUND" && (
                <Button
                  title="Add Payment Mode"
                  type="button"
                  customClass={styles.AddPaymentModeBtn}
                  handleClick={handleOpen}
                />
              )}
              <PrintIcon customClass={styles.stylePrint} />
              <ExportIcon customClass={styles.styleExport} />
            </div>
          </div>
          <div className={styles.receiptPaymentInfoTableContainer}>
            {popData?.receipt_type !== "REFUND" && (
              <p
                className={styles.receiptPaymentLink}
                onClick={handleSubmitData}
              >
                click here to share Upay link
              </p>
            )}
            <div className={styles.receiptPaymentTableContainer}>
              <TableV2
                tableHeaderData={receiptPaymentModalHeaderData}
                tableRowData={receiptPaymentModeData}
                active={false}
                handleClick={popData}
              />
            </div>
            <div className={styles.receiptPaymentSubmitBtnContainer}>
              <Button
                title="Submit"
                type="button"
                customClass={styles.receiptPaytmentSubmitBtn}
                handleClick={handleYes}
                disable={disableReceiptSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReceiptPaymentModal;

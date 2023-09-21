import { useEffect } from "react";
import { CheckIcon, UncheckIcon } from "../../components/common/svg-components";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getReturnInvoiceData } from "../../redux/features/receipt/receiptSlice";
import { setMessage } from "../../redux/features/toast/toastSlice";
import { failure } from "../../constants/data";
import {
  addReturnInvoiceData,
  removeReturnInvoiceData,
} from "../../redux/features/receipt/receiptSlice";
import { disableArrowKey } from "../../utils/utils";
import { colors } from "../color";
import styles from "../../pages/receipt/return-invoice-modal/returnInvoiceModal.module.scss";

export const returnInvoiceModalTableData: any = [
  {
    Header: "SERVICE NAME",
    accessor: (row: any) => {
      // console.log("row :>> ", row);
      if (row?.test_name) {
        return row?.test_name;
      } else if (row?.name) {
        return row?.name;
      }
    },
  },
  {
    Header: "SESSION NO.",
    accessor: "session_no",
    Cell: () => {
      return <span>-</span>;
    },
  },
  {
    Header: "SESSION AMT",
    accessor: "totalAmount",
  },
  {
    Header: "SELECT",
    accessor: "selectRaw",
    disableSortBy: true,
    Cell: (props: any) => {
      const { selectedReturnInvoiceData, returnInvoiceData } = useAppSelector(
        (state) => state.receipt
      );
      // console.log("returnInvoiceData :>> ", returnInvoiceData);
      // console.log("selectedReturnInvoiceData :>> ", selectedReturnInvoiceData);
      const dispatch = useAppDispatch();
      const handleReturnInvoiceCheck = (checkType: string) => {
        if (checkType === "REMOVE") {
          const { refund_amt, ...rest } = props?.row?.original;
          const invoiceRefundAmtData =
            returnInvoiceData?.return_invoice_data?.map((item: any) => {
              if (
                item?.return_invoice_id ===
                props?.row?.original?.return_invoice_id
              ) {
                return { ...rest };
              } else {
                return item;
              }
            });
          const updatedReturnInvoiceData = {
            ...returnInvoiceData,
            return_invoice_data: invoiceRefundAmtData,
          };
          dispatch(getReturnInvoiceData(updatedReturnInvoiceData));
          dispatch(removeReturnInvoiceData(props?.row?.original));
        } else if (checkType === "ADD") {
          let addReturnInvoicePayload = {};
          if (returnInvoiceData?.outstanding_amount === 0) {
            addReturnInvoicePayload = {
              ...props?.row?.original,
              refund_amt: props?.row?.original?.totalAmount,
            };
            const invoiceRefundAmtData =
              returnInvoiceData?.return_invoice_data?.map((item: any) => {
                if (
                  item?.return_invoice_id ===
                  props?.row?.original?.return_invoice_id
                ) {
                  return addReturnInvoicePayload;
                } else {
                  return item;
                }
              });
            const updatedReturnInvoiceData = {
              ...returnInvoiceData,
              return_invoice_data: invoiceRefundAmtData,
            };
            dispatch(getReturnInvoiceData(updatedReturnInvoiceData));
          } else {
            addReturnInvoicePayload = {
              ...props?.row?.original,
            };
          }
          dispatch(addReturnInvoiceData(addReturnInvoicePayload));
        }
      };
      // console.log("selectedReturnInvoiceData :>> ", selectedReturnInvoiceData);
      return (
        <>
          {selectedReturnInvoiceData?.some(
            (item: any) =>
              item?.return_invoice_id ===
              props?.row?.original?.return_invoice_id
          ) ? (
            <CheckIcon
              fillColor={colors.green1}
              handleClick={() => handleReturnInvoiceCheck("REMOVE")}
            />
          ) : (
            <UncheckIcon
              fillColor={colors.grey1}
              handleClick={() => handleReturnInvoiceCheck("ADD")}
            />
          )}
        </>
      );
    },
  },
  {
    Header: "REFUND AMT",
    disableSortBy: true,
    Cell: (props: any) => {
      const dispatch = useAppDispatch();
      const { returnInvoiceData, selectedReturnInvoiceData } = useAppSelector(
        (state) => state.receipt
      );
      const isInvoiceSelected = selectedReturnInvoiceData?.some(
        (item: any) =>
          item?.return_invoice_id === props?.row?.original?.return_invoice_id
      );
      // console.log("returnInvoiceData :>> ", returnInvoiceData);
      // console.log("selectedReturnInvoiceData :>> ", selectedReturnInvoiceData);
      const validateRefundAmount = (refundAmount: string, item: any) => {
        // console.log("refundAmount :>> ", Number(refundAmount));
        // if (Number(refundAmount) === 0 || Number(refundAmount) === undefined) {
        if (Number(refundAmount) === undefined) {
          dispatch(
            setMessage({
              message: "Please enter valid refund amount",
              type: failure,
            })
          );
          return {
            ...item,
            refund_amt: refundAmount,
          };
        } else if (refundAmount === "0") {
          dispatch(
            setMessage({
              message: "Please enter valid refund amount",
              type: failure,
            })
          );
          return item;
        } else if (Number(refundAmount) < 0) {
          dispatch(
            setMessage({
              message: "Please enter valid refund amount",
              type: failure,
            })
          );
          return item;
        } else if (
          Number(refundAmount) > Number(returnInvoiceData?.paid_amount)
        ) {
          dispatch(
            setMessage({
              message: "Please enter refund amount less than paid amount",
              type: failure,
            })
          );
          return item;
        } else if (
          Number(refundAmount) > Number(props?.row?.original?.totalAmount)
        ) {
          dispatch(
            setMessage({
              message: "Please enter refund amount less than session amount",
              type: failure,
            })
          );
          return item;
        } else {
          return {
            ...item,
            refund_amt: refundAmount,
          };
        }
      };
      const handleChange = (e: any) => {
        const refundAmount = e.target.value;
        // console.log("issueQty :>> ");
        let tempArr: any = [];
        tempArr = returnInvoiceData?.return_invoice_data?.map(
          (item: any, index: number) => {
            if (
              item?.return_invoice_id ===
                props?.row?.original?.return_invoice_id &&
              isInvoiceSelected
            ) {
              return validateRefundAmount(refundAmount, item);
            } else {
              return item;
            }
          }
        );
        const updatedReturnInvoiceData = { ...returnInvoiceData };
        updatedReturnInvoiceData.return_invoice_data = tempArr;
        dispatch(getReturnInvoiceData(updatedReturnInvoiceData));
      };

      // const getInputValue = () => {
      //   if (returnInvoiceData?.outstanding_amount === 0 && isInvoiceSelected) {
      //     return (
      //       props?.row?.original?.totalAmount || props?.row?.original?.price
      //     );
      //   } else {
      //     return (
      //       returnInvoiceData?.return_invoice_data?.[props.row.index]
      //         ?.refund_amt || ""
      //     );
      //   }
      // };

      // const inputValue = getInputValue();

      return (
        <input
          type="number"
          value={
            returnInvoiceData?.return_invoice_data?.[props.row.index]
              ?.refund_amt || ""
          }
          // value={inputValue}
          className={
            returnInvoiceData?.outstanding_amount === 0
              ? styles.refundAmtFieldDisable
              : styles.refundAmtField
          }
          onChange={handleChange}
          onKeyDown={(e: any) => disableArrowKey(e)}
          onWheel={(e: any) => {
            e.target.blur();
          }}
          disabled={
            returnInvoiceData?.outstanding_amount === 0 ||
            returnInvoiceData?.paid_amount === 0
          }
        />
      );
    },
  },
];

export const returnInvoiceModalTableDataReceiptionist: any = [
  {
    Header: "SERVICE NAME",
    accessor: (row: any) => {
      // console.log("row :>> ", row);
      if (row?.test_name) {
        return row?.test_name;
      } else if (row?.name) {
        return row?.name;
      }
    },
  },
  {
    Header: "SESSION NO.",
    accessor: "session_no",
    Cell: () => {
      return <span>-</span>;
    },
  },
  {
    Header: "SESSION AMT",
    accessor: "price",
  },
  {
    Header: "DISCOUNT AMT",
    accessor: "discount",
  },
  {
    Header: "SELECT",
    accessor: "selectRaw",
    disableSortBy: true,
    Cell: (props: any) => {
      const { selectedReturnInvoiceData, returnInvoiceData } = useAppSelector(
        (state) => state.receipt
      );
      // console.log("returnInvoiceData :>> ", returnInvoiceData);
      // console.log("selectedReturnInvoiceData :>> ", selectedReturnInvoiceData);
      const dispatch = useAppDispatch();
      const handleReturnInvoiceCheck = (checkType: string) => {
        if (checkType === "REMOVE") {
          const { refund_amt, ...rest } = props?.row?.original;
          const invoiceRefundAmtData =
            returnInvoiceData?.return_invoice_data?.map((item: any) => {
              if (
                item?.return_invoice_id ===
                props?.row?.original?.return_invoice_id
              ) {
                return { ...rest };
              } else {
                return item;
              }
            });
          const updatedReturnInvoiceData = {
            ...returnInvoiceData,
            return_invoice_data: invoiceRefundAmtData,
          };
          dispatch(getReturnInvoiceData(updatedReturnInvoiceData));
          dispatch(removeReturnInvoiceData(props?.row?.original));
        } else if (checkType === "ADD") {
          let addReturnInvoicePayload = {};
          if (returnInvoiceData?.outstanding_amount === 0) {
            addReturnInvoicePayload = {
              ...props?.row?.original,
              refund_amt:
                props?.row?.original?.price - props?.row?.original?.discount ??
                0,
            };
            const invoiceRefundAmtData =
              returnInvoiceData?.return_invoice_data?.map((item: any) => {
                if (
                  item?.return_invoice_id ===
                  props?.row?.original?.return_invoice_id
                ) {
                  return addReturnInvoicePayload;
                } else {
                  return item;
                }
              });
            const updatedReturnInvoiceData = {
              ...returnInvoiceData,
              return_invoice_data: invoiceRefundAmtData,
            };
            dispatch(getReturnInvoiceData(updatedReturnInvoiceData));
          } else {
            addReturnInvoicePayload = {
              ...props?.row?.original,
            };
          }
          dispatch(addReturnInvoiceData(addReturnInvoicePayload));
        }
      };
      // console.log("selectedReturnInvoiceData :>> ", selectedReturnInvoiceData);
      return (
        <>
          {selectedReturnInvoiceData?.some(
            (item: any) =>
              item?.return_invoice_id ===
              props?.row?.original?.return_invoice_id
          ) ? (
            <CheckIcon
              fillColor={colors.green1}
              handleClick={() => handleReturnInvoiceCheck("REMOVE")}
            />
          ) : (
            <UncheckIcon
              fillColor={colors.grey1}
              handleClick={() => handleReturnInvoiceCheck("ADD")}
            />
          )}
        </>
      );
    },
  },
  {
    Header: "REFUND AMT",
    disableSortBy: true,
    Cell: (props: any) => {
      const dispatch = useAppDispatch();
      const { returnInvoiceData, selectedReturnInvoiceData } = useAppSelector(
        (state) => state.receipt
      );
      const isInvoiceSelected = selectedReturnInvoiceData?.some(
        (item: any) =>
          item?.return_invoice_id === props?.row?.original?.return_invoice_id
      );
      // console.log("returnInvoiceData :>> ", returnInvoiceData);
      // console.log("selectedReturnInvoiceData :>> ", selectedReturnInvoiceData);
      const validateRefundAmount = (refundAmount: string, item: any) => {
        // console.log("refundAmount :>> ", Number(refundAmount));
        // if (Number(refundAmount) === 0 || Number(refundAmount) === undefined) {
        if (Number(refundAmount) === undefined) {
          dispatch(
            setMessage({
              message: "Please enter valid refund amount",
              type: failure,
            })
          );
          return {
            ...item,
            refund_amt: refundAmount,
          };
        } else if (refundAmount === "0") {
          dispatch(
            setMessage({
              message: "Please enter valid refund amount",
              type: failure,
            })
          );
          return item;
        } else if (Number(refundAmount) < 0) {
          dispatch(
            setMessage({
              message: "Please enter valid refund amount",
              type: failure,
            })
          );
          return item;
        } else if (
          Number(refundAmount) > Number(returnInvoiceData?.paid_amount)
        ) {
          dispatch(
            setMessage({
              message: "Please enter refund amount less than paid amount",
              type: failure,
            })
          );
          return item;
        } else if (
          Number(refundAmount) >
          Number(props?.row?.original?.price) -
            Number(props?.row?.original?.discount ?? 0)
        ) {
          dispatch(
            setMessage({
              message:
                "Please enter refund amount less than discounted session amount",
              type: failure,
            })
          );
          return item;
        } else {
          return {
            ...item,
            refund_amt: refundAmount,
          };
        }
      };
      const handleChange = (e: any) => {
        const refundAmount = e.target.value;
        // console.log("issueQty :>> ");
        let tempArr: any = [];
        tempArr = returnInvoiceData?.return_invoice_data?.map(
          (item: any, index: number) => {
            if (
              item?.return_invoice_id ===
                props?.row?.original?.return_invoice_id &&
              isInvoiceSelected
            ) {
              return validateRefundAmount(refundAmount, item);
            } else {
              return item;
            }
          }
        );
        const updatedReturnInvoiceData = { ...returnInvoiceData };
        updatedReturnInvoiceData.return_invoice_data = tempArr;
        dispatch(getReturnInvoiceData(updatedReturnInvoiceData));
      };

      // const getInputValue = () => {
      //   if (returnInvoiceData?.outstanding_amount === 0 && isInvoiceSelected) {
      //     return (
      //       props?.row?.original?.totalAmount || props?.row?.original?.price
      //     );
      //   } else {
      //     return (
      //       returnInvoiceData?.return_invoice_data?.[props.row.index]
      //         ?.refund_amt || ""
      //     );
      //   }
      // };

      // const inputValue = getInputValue();

      return (
        <input
          type="number"
          value={
            returnInvoiceData?.return_invoice_data?.[props.row.index]
              ?.refund_amt || ""
          }
          // value={inputValue}
          className={
            returnInvoiceData?.outstanding_amount === 0
              ? styles.refundAmtFieldDisable
              : styles.refundAmtField
          }
          onChange={handleChange}
          onKeyDown={(e: any) => disableArrowKey(e)}
          onWheel={(e: any) => {
            e.target.blur();
          }}
          disabled={
            returnInvoiceData?.outstanding_amount === 0 ||
            returnInvoiceData?.paid_amount === 0
          }
        />
      );
    },
  },
];

export const returnInvoiceModalData = [
  {
    _id: 0,
    service_name: "Service 1",
    session_no: "111",
    session_amt: "21",
  },
  {
    _id: 1,
    service_name: "Service 1",
    session_no: "111",
    session_amt: "21",
  },
  {
    _id: 2,
    service_name: "Service 1",
    session_no: "111",
    session_amt: "21",
  },
  {
    _id: 3,
    service_name: "Service 1",
    session_no: "111",
    session_amt: "21",
  },
  {
    _id: 4,
    service_name: "Service 1",
    session_no: "111",
    session_amt: "21",
  },
  {
    _id: 5,
    service_name: "Service 1",
    session_no: "111",
    session_amt: "21",
  },
];

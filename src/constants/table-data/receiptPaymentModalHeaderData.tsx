import { useAppDispatch, useAppSelector } from "../../hooks/index";
import { disableArrowKey } from "../../utils/utils";
import { DeleteIcon } from "../../components/common/svg-components";
import { colors } from "../../constants/color";
import {
  updateReceiptPaymentModeData,
  deleteReceiptPaymentModeData,
} from "../../redux/features/receipt/receiptSlice";
import styles from "../../pages/receipt/receipt-payment-modal/receiptPaymentModal.module.scss";

export const receiptPaymentModalHeaderData: any = [
  {
    Header: "PAYMENT MODE",
    accessor: "payment_label",
  },
  {
    Header: "AMOUNT(E)",
    // accessor: "receipt_amount",
    Cell: (props: any) => {
      const dispatch = useAppDispatch();
      const { receiptPaymentModeData } = useAppSelector(
        (state) => state.receipt
      );
      const handleChange = (e: any) => {
        const amount = e.target.value;
        let tempArr: any = [];
        tempArr = receiptPaymentModeData.map((item: any, index: number) => {
          if (item?._id === props?.row?.original?._id) {
            return {
              ...item,
              amount: amount,
            };
          } else {
            return item;
          }
        });
        dispatch(updateReceiptPaymentModeData(tempArr));
      };
      return (
        <input
          type="number"
          value={receiptPaymentModeData[props.row.index].amount}
          placeholder="Text"
          className={styles.receiptTableAmountField}
          onChange={handleChange}
          onKeyDown={(e: any) => disableArrowKey(e)}
          onWheel={(e: any) => {
            e.target.blur();
          }}
          disabled={
            props?.row?.original?.payment_mode === "upay" ? true : false
          }
        />
      );
    },
  },
  {
    Header: "APPROVAL NO.",
    Cell: () => {
      return <span>-</span>;
    },
  },
  {
    Header: "ACTIONS",
    disableSortBy: true,
    Cell: (props: any) => {
      const dispatch = useAppDispatch();
      // console.log("object :>> ", props?.onClick);
      const deleteReceiptPaymentMode = () => {
        if (props?.onClick?.receipt_type !== "REFUND") {
          dispatch(deleteReceiptPaymentModeData(props?.row?.original));
        }
      };
      return (
        <DeleteIcon
          fillColor={colors.grey4}
          customClass={styles.iconStyle}
          handleClick={deleteReceiptPaymentMode}
        />
      );
    },
  },
];

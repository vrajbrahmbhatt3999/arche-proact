import moment from "moment";
import { CheckIcon, UncheckIcon } from "../../components/common/svg-components";
import { DeleteIcon } from "../../components/common/svg-components";
import { colors } from "../color";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  setSelectedInvoicesData,
  setPatientOutstandingData,
  addOutStandingInvoiceData,
  removeOutStaningInvoiceData,
} from "../../redux/features/receipt/receiptSlice";
import styles from "../../components/common/modal/receipt-outstanding-modal/outStanding.module.scss";

export const receiptOutstandingModalHeaderData: any = [
  {
    Header: "INVOICE NO",
    accessor: "invoice_no",
    Cell: (props: any) => {
      return (
        <>
          {props?.row?.original?.invoice_no ? (
            <span>
              {props?.row?.original?.invoice_no?.toString().padStart(6, "0")}
            </span>
          ) : (
            "-"
          )}
        </>
      );
    },
  },
  {
    Header: "INVOICE DATE",
    accessor: "createdAt",
    Cell: (props: any) => {
      const invoice_sdate_formated = moment(
        props?.row?.original?.createdAt
      ).format("DD-MM-YYYY");
      return (
        <>
          {props?.row?.original?.createdAt ? (
            <span>{invoice_sdate_formated}</span>
          ) : (
            "-"
          )}
        </>
      );
    },
  },

  {
    Header: "INVOICE AMOUNT",
    accessor: "total_amount",
    Cell: (props: any) => {
      return (
        <>
          {props?.row?.original?.total_amount ? (
            <span>${props?.row?.original?.total_amount?.toFixed(3)}</span>
          ) : (
            "-"
          )}
        </>
      );
    },
  },
  {
    Header: "AMOUNT RECEIVED",
    accessor: "paid_amount",
    Cell: (props: any) => {
      return (
        <>
          {props?.row?.original?.paid_amount ? (
            <span>${props?.row?.original?.paid_amount?.toFixed(3)}</span>
          ) : (
            "-"
          )}
        </>
      );
    },
  },
  {
    Header: "OUTSTANDING AMOUNT",
    accessor: "outstanding_amount",
    Cell: (props: any) => {
      return (
        <>
          {props?.row?.original?.outstanding_amount ? (
            <span>${props?.row?.original?.outstanding_amount?.toFixed(3)}</span>
          ) : (
            "-"
          )}
        </>
      );
    },
  },
  {
    Header: "SELECT",
    accessor: "selectRaw",
    disableSortBy: true,
    Cell: (props: any) => {
      const { selectedInvoiceData } = useAppSelector((state) => state.receipt);
      const dispatch = useAppDispatch();
      const handleInvoiceCheck = (checkType: string) => {
        if (checkType === "REMOVE") {
          dispatch(removeOutStaningInvoiceData(props?.row?.original));
        } else if (checkType === "ADD") {
          dispatch(addOutStandingInvoiceData(props?.row?.original));
        }
      };
      // console.log("selectedInvoiceData :>> ", selectedInvoiceData);
      return (
        <>
          {props?.row?.original?._id ? (
            selectedInvoiceData?.some(
              (item: any) => item?._id === props?.row?.original?._id
            ) ? (
              <CheckIcon
                fillColor={colors.green1}
                handleClick={() => handleInvoiceCheck("REMOVE")}
              />
            ) : (
              <UncheckIcon
                fillColor={colors.grey1}
                handleClick={() => handleInvoiceCheck("ADD")}
              />
            )
          ) : (
            "-"
          )}
        </>
      );
    },
  },
  {
    Header: "ACTIONS",
    disableSortBy: true,
    Cell: (props: any) => {
      const handleDeleteInvoice = () => {
        if (
          props?.row?.original?.refund_amount > 0 ||
          props?.row?.original?.is_refund ||
          props?.row?.original?.is_return
        ) {
          return;
        } else {
          props?.onClick(props?.row?.original);
        }
      };

      return (
        <DeleteIcon
          fillColor={colors.grey4}
          customClass={
            props?.row?.original?.refund_amount > 0 ||
            props?.row?.original?.is_refund ||
            props?.row?.original?.is_return
              ? styles.disableDeleteIcon
              : styles.deleteIconStyle
          }
          handleClick={handleDeleteInvoice}
        />
      );
    },
  },
];

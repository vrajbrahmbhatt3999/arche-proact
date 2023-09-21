import { DeleteIcon } from "../../components/common/svg-components";
import moment from "moment";
import { colors } from "../../constants/color";
import styles from "../../pages/receipt/receipt-landing-page/receipt.module.scss";

export const receiptOutstandingHeaderData: any = [
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
    disableSortBy: true,
  },
  {
    Header: "INVOICE DATE",
    accessor: "createdAt",
    disableSortBy: true,
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
    accessor: "invoice_amount",
    disableSortBy: true,
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
    disableSortBy: true,
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
    disableSortBy: true,
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
    Header: "ACTIONS",
    disableSortBy: true,
    Cell: (props: any) => {
      return (
        <DeleteIcon
          fillColor={colors.grey4}
          customClass={styles.iconStyle}
          handleClick={() => {
            props?.onClick(props?.row?.original);
          }}
        />
      );
    },
  },
];

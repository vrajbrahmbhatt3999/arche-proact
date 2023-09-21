import moment from "moment";
import styles from "./posummarypopup.module.scss";
import { requestGenerator } from "../../../utils/payloadGenerator";
import { getAllGrn } from "../../../redux/features/purchase-invoice/purchaseAsyncActions";
import { useAppDispatch } from "../../../hooks";

export const PendingHeaderData: any = [
  {
    Header: "DATE",
    accessor: (row: any) => {
      return moment(row?.requested_date).format("DD-MMM-YYYY") ?? "-";
    },
    disableSortBy: true,
  },
  {
    Header: "SUPPLIER_NAME",
    accessor: "suppliers",
  },
  {
    Header: "PO NO",
    accessor: "po_no",
  },
  {
    Header: "STATUS",
    Cell: (props: any) => {
      return (
        <span
          className={[
            props.row.original.status === "INITIATED" && styles.yellowTextColor,
            props.row.original.status === "PARTIAL" && styles.blueTextColor,
            props.row.original.status === "COMPLETED" && styles.greenTextColor,
          ]?.join(" ")}
          style={{ textTransform: "capitalize" }}
        >
          {props.row.original.status?.toLowerCase()}
        </span>
      );
    },
  },
  {
    Header: "NOTES",
    disableSortBy: true,
    Cell: (props: any) => {
      return (
        <>
          {props.row.original.hasOwnProperty("poNotes") ? (
            <span
              style={{ cursor: "pointer", color: "#0e26a3" }}
              onClick={() => {
                props?.onClick(props?.row?.original);
              }}
            >
              View
            </span>
          ) : (
            "-"
          )}
        </>
      );
    },
  },
  {
    Header: "GRN",
    disableSortBy: true,
    Cell: (props: any) => {
      const dispatch = useAppDispatch();
      const getGrnItemsData = () => {
        dispatch(
          getAllGrn(requestGenerator({ po_id: props.row.original._id }))
        );
      };
      return (
        <>
          {props.row.original.status !== "INITIATED" ? (
            <span
              style={{ cursor: "pointer", color: "#0e26a3" }}
              onClick={() => {
                props?.onRowClick(props?.row?.original);
                getGrnItemsData();
              }}
            >
              View
            </span>
          ) : (
            "-"
          )}
        </>
      );
    },
  },
];

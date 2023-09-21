import moment from "moment";

export const addGrnHeaderData: any = [
  {
    Header: "DATE",
    accessor: (row: any) => {
      return moment(row?.requested_date).format("DD-MMM-YYYY") ?? "-";
    },
  },
  {
    Header: "PO NO.",
    accessor: (row: any) => {
      return row.po_no ?? "-";
    },
  },
  {
    Header: "ITEMS NAME",
    accessor: "name",
  },

  {
    Header: "REQUESTED QTY",
    accessor: "requested_qty",
  },
  {
    Header: "PRICE",
    accessor: (row: any) => {
      return row.requested_price ?? "-";
    },
  },
  {
    Header: "DELIVERED QTY",
    Cell: (props: any) => {
      return <>{props?.row?.original?.delievered_qty ?? "-"}</>;
    },
  },
];

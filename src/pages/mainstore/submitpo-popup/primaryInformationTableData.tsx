import moment from "moment";

export const primaryInformationHeaderData: any = [
  {
    Header: "DATE",
    accessor: (row: any) => {
      return moment(row?.createdAt).format("DD-MMM-YYYY") ?? "-";
    },
  },
  {
    Header: "PO SUPPLIER",
    Cell: (props: any) => {
      return <>{props.row.original?.name}</>;
    },
  },
];

import styles from "./tableData.module.scss";
import { utcToDate } from "../../utils/utils";

export const actionLogData: any = [
  {
    Header: "TIME",
    accessor: "action_time",
    Cell: ({ row }: any) => {
      let date = new Date(row?.original?.action_date).toLocaleTimeString();
      return <p>{date}</p>;
    },
  },
  {
    Header: "DATE",
    Cell: ({ row }: any) => {
      let date = utcToDate(row?.original?.action_date);
      // let date = new Date(row?.original?.action_date).toLocaleDateString();
      return <p>{date}</p>;
    },
  },
  {
    Header: "ACTIVITY",
    // accessor: "action_activity",
    Cell: ({ row }: any) => {
      let status = row?.original?.apnt_status;
      let newStatus = status.toLowerCase().replace(/\s/g, "");
      return <p className={styles[newStatus]}>{status}</p>;
    },
  },
  {
    Header: "BY",
    accessor: "action_taken_by",
    Cell: ({ row }: any) => {
      let status = row?.original?.apnt_status;
      return (
        <p>
          {status === "PENDING"
            ? row?.original?.patient_name
            : row?.original?.action_taken_by}
        </p>
      );
    },
  },
];

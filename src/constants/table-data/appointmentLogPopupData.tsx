import { utcToDate } from "../../utils/utils";
import styles from "./tableData.module.scss";

export const appointmentLogData: any = [
  {
    Header: "PATIENT NAME",
    accessor: "patient_name",
  },
  {
    Header: "STATUS",
    Cell: ({ row }: any) => {
      let status = row?.original?.apnt_status;
      let newStatus = status.toLowerCase().replace(/\s/g, "");
      return <p className={styles[newStatus]}>{status}</p>;
    },
  },
  {
    Header: "TIME SPENT",
    // accessor: "timeSpent",
    Cell: ({ row }: any) => {
      let time = row?.original?.timeSpent;
      return <p>{time !== null ? time + " min" : "-"}</p>;
    },
  },
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
      return <p>{date}</p>;
    },
  },
];

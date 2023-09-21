import styles from "./tableData.module.scss";
import moment from "moment";

export const laboratoryReportHeaderData: any = [
  {
    Header: "JOB ID",
    accessor: "job_no",
  },
  {
    Header: "PATIENT NAME",
    accessor: "name",
  },
  {
    Header: "DATE",
    accessor: (row: any) => {
      return moment(row?.createdAt).format("DD-MMM-YYYY") ?? "-";
    },
  },
  {
    Header: "VIEW REPORT",
    Cell: (props: any) => {
      return (
        <>
          {props?.row?.original ? (
            <span
              className={styles.blueLinkText}
              onClick={() => {
                props?.onOpen(props?.row?.original);
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


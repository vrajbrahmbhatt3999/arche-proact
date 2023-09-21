import moment from "moment";
import styles from "./patientAcitvityTable.module.scss";

export const patientActivityHeaderData: any = [
  {
    Header: "ACTIVITY NAME",
    accessor: "activity_name",
    Cell: ({ row }: any) => {
      return (
        <>
          {row?.original?.activity_name ? (
            <span className={styles.activityName}>
              {row?.original?.activity_name}
            </span>
          ) : (
            "-"
          )}
        </>
      );
    },
  },
  {
    Header: "ACTIVITY STATUS",
    accessor: "status",
    Cell: ({ row }: any) => {
      return (
        <>
          {row?.original?.status ? (
            <span
              className={
                row?.original?.status === "SUCCESSFUL"
                  ? styles.activityStatusGreen
                  : row?.original?.status === "IN-PROGRESS"
                  ? styles.activityStatusYellow
                  : row?.original?.status === "FAILED"
                  ? styles.activityStatusRed
                  : ""
              }
            >
              {row?.original?.status.toLowerCase()}
            </span>
          ) : (
            "-"
          )}
        </>
      );
    },
  },
  {
    Header: "USER",
    accessor: "user_name",
    Cell: ({ row }: any) => {
      return (
        <>
          {row?.original?.user_name ? (
            <span className={styles.userStyle}>{row?.original?.user_name}</span>
          ) : (
            "-"
          )}
        </>
      );
    },
  },
  {
    Header: "DATE & TIME",
    accessor: "date_time",
    Cell: ({ row }: any) => {
      const convertDateAndTime = moment(row?.original?.date_time).format(
        "HH:mm DD-MMM-YYYY"
      );
      return (
        <>
          {row?.original?.date_time ? (
            <span className={styles.dateTimeStyle}>{convertDateAndTime}</span>
          ) : (
            "-"
          )}
        </>
      );
    },
  },
  // {
  //   Header: "HOST",
  //   accessor: "host",
  //   Cell: ({ row }: any) => {
  //     return (
  //       <>
  //         {row?.original?.host ? (
  //           <span className={styles.hostStyle}>{row?.original?.host}</span>
  //         ) : (
  //           "-"
  //         )}
  //       </>
  //     );
  //   },
  // },
];

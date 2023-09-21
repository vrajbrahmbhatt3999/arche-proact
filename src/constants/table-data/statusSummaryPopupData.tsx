import styles from "./tableData.module.scss";

export const statusSummaryData: any = [
  {
    Header: "STATUS",
    Cell: ({ row }: any) => {
      let status = row?.original?._id;
      let newStatus = status.toLowerCase().replace(/\s/g, "");
      return (
        <p
          className={
            newStatus === "arrived(crm)" ? styles.arrivedCrm : styles[newStatus]
          }
        >
          {status}
        </p>
      );
    },
  },
  {
    Header: "TOTAL PATIENT",
    accessor: "count",
  },
];

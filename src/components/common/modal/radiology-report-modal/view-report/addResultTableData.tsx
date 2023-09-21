import styles from "./viewreportmodal.module.scss";

// Add Results Popup Header Data
export const ViewRadiologyReportData: any = [
  {
    Header: "TEST PROFILE",
    accessor: (row: any) => {
      return row?.profile_name?.length ? row?.profile_name : "-";
    },
  },
  {
    Header: "TEST NAME",
    Cell: (props: any) => {
      return (
        <>
          {props.row.original.tests.length
            ? props.row.original.tests.map((s: any, index: number) => (
                <div key={index}>
                  {`${index + 1})`} {s?.test_name}
                </div>
              ))
            : props.row.original.test_name}
        </>
      );
    },
  },
  {
    Header: "OBSERVATIONS",
    Cell: (props: any) => {
      return (
        <>
          {props.row.original.tests.length
            ? props.row.original.tests.map((s: any, index: number) => (
                <div key={index} style={{ marginBlock: "6px" }}>
                  {s?.result?.length ? s?.result : "-"}
                </div>
              ))
            : "-"}
        </>
      );
    },
  },
  {
    Header: "NOTES",
    Cell: (props: any) => {
      return (
        <>
          {props.row.original.tests.length
            ? props.row.original.tests.map((s: any, index: number) => (
                <div
                  className={styles.view_Btn}
                  onClick={() =>
                    props.onRowClick({ test_notes: s.test_notes })
                  }
                  key={index}
                >
                  View
                </div>
              ))
            : "-"}
        </>
      );
    },
  },
  {
    Header: "REMARKS",
    Cell: (props: any) => {
      return (
        <>
          {props.row.original.tests.length
            ? props.row.original.tests.map((s: any, index: number) => (
                <div
                  className={[
                    styles.selectField,
                    s?.remark === "Low" && styles.bgRed,
                    s?.remark === "High" && styles.bgGreen,
                  ]?.join(" ")}
                  key={index}
                >
                  {s?.remark?.length ? s?.remark : "-"}
                </div>
              ))
            : "-"}
        </>
      );
    },
  },
];

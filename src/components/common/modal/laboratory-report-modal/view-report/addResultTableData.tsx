import { setNotesData } from "../../../../../redux/features/jobs/jobsSlice";
import { useAppDispatch } from "../../../../../hooks";
import styles from "./viewreportmodal.module.scss";

// Add Results Popup Header Data
export const ViewLabReportModal: any = [
  {
    Header: "TEST PROFILE",
    accessor: (row: any) => {
      return row?.profile_name;
    },
  },
  {
    Header: "TEST NAME",
    accessor: (row: any) => {
      return row?.test_name;
    },
  },
  {
    Header: "COMPONENTS",
    Cell: (props: any) => {
      return (
        <>
          {props.row.original?.components?.map((s: any, index: number) => (
            <div>
              {`${index + 1})`} {s?.name}{" "}
            </div>
          ))}
        </>
      );
    },
  },
  {
    Header: "RANGE",
    Cell: (props: any) => {
      return (
        <>
          {props.row.original?.components?.map((s: any) => (
            <div>
              {s?.hasOwnProperty("range")
                ? `${s?.range?.from}-${s?.range?.to}`
                : "-"}
            </div>
          ))}
        </>
      );
    },
  },
  {
    Header: "RESULTS(E)",
    Cell: (props: any) => {
      return (
        <>
          {props.row.original.components?.length
            ? props.row.original.components.map((s: any, index: number) => (
                <div key={index} className={styles.selectField}>
                  {s?.result}
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
      const dispatch = useAppDispatch();
      return (
        <>
          {props.row.original.components?.length
            ? props.row.original.components.map((s: any, index: number) => (
                <div
                  className={styles.view_Btn}
                  onClick={() =>
                    props.onRowClick(
                      dispatch(
                        setNotesData({
                          test_notes: s.test_notes,
                        })
                      )
                    )
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
          {props.row.original?.components?.map((s: any) => {
            const setRemarks = () => {
              let data = "-";
              const checkKey = s.hasOwnProperty("range");
              if (checkKey && s.result < s?.range.from) {
                data = "Low";
              } else if (
                checkKey &&
                s.result >= s?.range.from &&
                s.result <= s?.range.to
              ) {
                data = "Good";
              } else if (checkKey && s.result > s?.range.to) {
                data = "High";
              }
              return data;
            };

            return (
              <div
                className={[
                  styles.selectField,
                  setRemarks() === "Low" && styles.bgRed,
                  setRemarks() === "High" && styles.bgGreen,
                ]?.join(" ")}
              >
                {setRemarks()}
              </div>
            );
          })}
        </>
      );
    },
  },
];

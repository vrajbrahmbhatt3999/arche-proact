import { useFormContext } from "react-hook-form";
import styles from "./addresultsPopup.module.scss";
import { useAppDispatch } from "../../../../hooks";
import { setNotesData } from "../../../../redux/features/jobs/jobsSlice";
import { disableArrowKey } from "../../../../utils/utils";

// Add Results Popup Header Data
export const addResultsPopupHeaderData: any = [
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
            <div className={styles.alignColumns}>
              {s?.name}{" "}
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
            <div className={styles.alignColumns}>
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
      const { register } = useFormContext();
      return (
        <>
          {props.row.original.components?.length
            ? props.row.original.components.map((s: any, index: number) => (
                <div key={index} style={{ marginBlock: "6px" }}>
                  <input
                    type="number"
                    className={styles.inputField}
                    defaultValue={s?.result}
                    {...register(`${s?._id}_${props.row.original._id}`, {min: 0})}
                    onKeyDown={(e: any) => disableArrowKey(e)}
                    onWheel={(e: any) => {
                      e.target.blur();
                    }}
                  />
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
                          components: props.row.original.components,
                          test_id: props.row.original.test_component_id,
                          component_id: s._id,
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
              if (checkKey && s.result === null) {
                data = "-";
              } else if (checkKey && s.result < s?.range.from) {
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
    // Cell: (props: any) => {
    //   const { register } = useFormContext();

    //   return (
    //     <>
    //       {props.row.original.components?.length
    //         ? props.row.original.components.map((s: any, index: number) => (
    //             <select
    //               {...register(`select${s?._id}`)}
    //               className={[
    //                 styles.selectField,
    //                 s?.remark === "Low" && styles.bgRed,
    //                 s?.remark === "High" && styles.bgGreen,
    //               ]?.join(" ")}
    //               defaultValue={s?.remark}
    //               key={index}
    //             >
    //               <option value="Good">Good</option>
    //               <option value="High">High</option>
    //               <option value="Low">Low</option>
    //             </select>
    //           ))
    //         : "-"}
    //     </>
    //   );
    // },
  },
];

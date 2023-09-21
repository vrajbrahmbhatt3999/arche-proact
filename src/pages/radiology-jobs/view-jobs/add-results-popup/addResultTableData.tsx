import { useFormContext } from "react-hook-form";
import styles from "./addresultsPopup.module.scss";
import { useAppSelector } from "../../../../hooks";

// Add Results Popup Header Data
export const addResultsPopupHeaderData: any = [
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
                <div key={index} className={styles.alignColumns}>
                  {s?.test_name}
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
      const { checkPopupStatusKey } = useAppSelector(
        (state) => state.radiologyJobs
      );
      return (
        <>
          {props.row.original.tests.length
            ? props.row.original.tests.map((s: any, index: number) => (
                <div
                  className={styles.view_Btn}
                  onClick={() =>
                    props.onPopClose({ ...props.row.original, sId: s?._id, s })
                  }
                  key={index}
                >
                  {checkPopupStatusKey ? "View" : "Add"}
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
      const { checkPopupStatusKey } = useAppSelector(
        (state) => state.radiologyJobs
      );

      return (
        <>
          {props.row.original.tests.length
            ? props.row.original.tests.map((s: any, index: number) => (
                <div
                  className={styles.view_Btn}
                  onClick={() =>
                    props.onRowClick({ ...props.row.original, sId: s?._id, s })
                  }
                  key={index}
                >
                  {checkPopupStatusKey ? "View" : "Add"}
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
      const { register } = useFormContext();
      return (
        <>
          {props.row.original.tests.length
            ? props.row.original.tests.map((s: any, index: number) => (
                <select
                  {...register(`select${s?._id}`)}
                  className={[
                    styles.selectField,
                    s?.remark === "Low" && styles.bgRed,
                    s?.remark === "High" && styles.bgGreen,
                  ]?.join(" ")}
                  defaultValue={s?.remark}
                  key={index}
                >
                  <option
                    value="Good"
                    style={{ background: "#fefefe", color: "black" }}
                  >
                    Good
                  </option>
                  <option
                    value="High"
                    style={{ background: "#fefefe", color: "black" }}
                  >
                    High
                  </option>
                  <option
                    value="Low"
                    style={{ background: "#fefefe", color: "black" }}
                  >
                    Low
                  </option>
                </select>
              ))
            : "-"}
        </>
      );
    },
  },
];

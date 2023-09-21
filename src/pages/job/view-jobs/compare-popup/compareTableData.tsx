import { IcomparepopupTableData } from "../../../../interfaces/interfaces";
import styles from "./comparePopup.module.scss";
import moment from "moment";

// View Jobs Compare Popup Table
export const comparePopupTableHeaderData: any = [
  {
    Header: "DATE",
    accessor: (row: any) => {
      return moment(row?.createdAt).format("DD-MMM-YYYY") ?? "-";
    },
  },
  {
    Header: "TEST PROFILE",
    Cell: (props: any) => {
      const profileData = props.row.original.profile;
      return (
        <>
          {profileData?.map((s: any, id: number) =>
            s.isProfile ? <div key={id}>{s.profile_name}</div> : '-'
          )}
        </>
      );
    },
  },
  {
    Header: "RESULTS ",
    accessor: "_results",
    Cell: (props: any) => {
      return (
        <>
          <div className={styles.resultViewContainer}>
            <span className={styles.resultView} onClick={() => props.onClick()}>
              {" "}
              View
            </span>
            <label className={styles.checkboxContainer}>
              <input type="checkbox" className={styles.checkboxField} />
              <span className={styles.checkboxLabel}></span>
            </label>
          </div>
        </>
      );
    },
  },
];



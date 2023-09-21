import moment from "moment";
import styles from "./ongoingtreatmentplsnpopup.module.scss";

export const ongoingTreatmentPlanPopupHeaderData: any = [
  {
    Header: "Date",
    accessor: (row: any) => {
      return moment(row?.date).format("DD-MMM-YYYY") ?? "-";
    },
  },
  {
    Header: "Prescription Plan",
    accessor: (row: any) => {
      return row?.prescription_name ?? "-";
    },
  },
  {
    Header: "Services",
    Cell: (props: any) => {
      return (
        <p
          className={styles.blueLinkText}
          onClick={() => props.onRowClick(props.row.original)}
        >
          View
        </p>
      );
    },
  },
];

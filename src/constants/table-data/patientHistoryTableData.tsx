import moment from "moment";
import styles from "./patientHistoryTable.module.scss";

export const patientHistoryHeaderData: any = [
  {
    Header: "APPOINTMENT DT.",
    // accessor: "diag_apt_date",
    Cell: ({ row }: any) => {
      const convertDate = moment(row?.original?.diag_apt_date).format(
        "DD-MMM-YYYY"
      );
      return (
        <>
          {row?.original?.diag_apt_date ? (
            <span className={styles.appointmentDate}>
              {row?.original?.diag_apt_time} {convertDate}
            </span>
          ) : (
            "-"
          )}
        </>
      );
    },
  },
  {
    Header: "DIAGNOSIS",
    Cell: (props: any) => {
      // console.log("cell", row);
      const convertDate = moment(props?.row?.original?.diag_apt_date).format(
        "DD-MMM-YYYY"
      );
      const rowData = { ...props?.row?.original, convertDate };
      rowData.headerName = "DIAGNOSIS";
      // console.log("rowData", rowData);
      return (
        <>
          {props?.row?.original?.diag_apt_date ? (
            <span
              className={styles.viewPopupLink}
              onClick={() => {
                props?.onClick(rowData);
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
  {
    Header: "SYMPTOMS",
    Cell: (props: any) => {
      // console.log("cell", row);
      const convertDate = moment(props?.row?.original?.diag_apt_date).format(
        "DD-MMM-YYYY"
      );
      const rowData = { ...props?.row?.original, convertDate };
      rowData.headerName = "SYMPTOMS";
      return (
        <>
          {props?.row?.original?.diag_apt_date ? (
            <span
              className={styles.viewPopupLink}
              onClick={() => {
                props?.onClick(rowData);
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
  {
    Header: "MEDICATION",
    Cell: (props: any) => {
      // console.log("cell", row);
      const convertDate = moment(props?.row?.original?.diag_apt_date).format(
        "DD-MMM-YYYY"
      );
      const rowData = { ...props?.row?.original, convertDate };
      rowData.headerName = "MEDICATION";
      return (
        <>
          {props?.row?.original?.diag_apt_date ? (
            <span
              className={styles.viewPopupLink}
              onClick={() => {
                props?.onClick(rowData);
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
  {
    Header: "NOTES",
    Cell: (props: any) => {
      // console.log("cell", row);
      const convertDate = moment(props?.row?.original?.diag_apt_date).format(
        "DD-MMM-YYYY"
      );
      const rowData = { ...props?.row?.original, convertDate };
      rowData.headerName = "NOTES";
      return (
        <>
          {props?.row?.original?.diag_apt_date ? (
            <span
              className={styles.viewPopupLink}
              onClick={() => {
                props?.onClick(rowData);
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
  {
    Header: (props: any) => {
      // console.log("headerprops", row);
      // console.log("attachments header props :>> ", props?.data);
      const headerData = {
        headerName: "ATTACHMENTS_HEADER",
      };
      return (
        <div className={styles.attachmentsHeaderContainer}>
          <p className={styles.attachmentsHeaderText}>ATTACHMENTS</p>
          <button
            className={styles.attachmentsHeaderBtn}
            disabled={props?.data?.length > 0 ? false : true}
            onClick={() => {
              props.onClick(headerData);
            }}
          >
            View All
          </button>
        </div>
      );
    },
    accessor: "attachment",
    disableSortBy: true,
    Cell: (props: any) => {
      // console.log("cell", row);
      const convertDate = moment(props?.row?.original?.diag_apt_date).format(
        "DD-MMM-YYYY"
      );
      const rowData = { ...props?.row?.original, convertDate };
      rowData.headerName = "ATTACHMENTS";
      return (
        <>
          {props?.row?.original?.diag_apt_date ? (
            <span
              className={styles.viewPopupLink}
              onClick={() => {
                props?.onClick(rowData);
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
  {
    Header: (props: any) => {
      const headerData = {
        headerName: "IMAGES_HEADER",
      };
      return (
        <div className={styles.imagesHeaderContainer}>
          <p className={styles.imagesHeaderText}>IMAGES</p>
          <button
            className={styles.imagesHeaderBtn}
            disabled={props?.data?.length > 0 ? false : true}
            onClick={() => {
              props?.onClick(headerData);
            }}
          >
            View All
          </button>
        </div>
      );
    },
    accessor: "image",
    disableSortBy: true,
    Cell: (props: any) => {
      // console.log("cell", row);
      const convertDate = moment(props?.row?.original?.diag_apt_date).format(
        "DD-MMM-YYYY"
      );
      const rowData = { ...props?.row?.original, convertDate };
      rowData.headerName = "IMAGES";
      return (
        <>
          {props?.row?.original?.diag_apt_date ? (
            <span
              className={styles.viewPopupLink}
              onClick={() => {
                props?.onClick(rowData);
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

import { DeleteIcon } from "../../components/common/svg-components";
import { colors } from "../../constants/color";
import styles from "./diagnosisRequestHeaderData.module.scss";

export const diagnosisRequestHeaderData: any = [
  {
    Header: "TEST TYPE",
    accessor: "test_type",
    disableSortBy: true,
  },
  {
    Header: "TEST NAME",
    // accessor: "test_name",
    disableSortBy: true,
    Cell: (props: any) => {
      return (
        <>
          {props?.row?.original?.test_name ? (
            <span
              className={styles.viewPopupLink}
              onClick={() => {
                props?.onRowClick(props?.row?.original);
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
    Header: "PRIORITY",
    accessor: "priority",
    disableSortBy: true,
  },
  {
    Header: "PRICE",
    accessor: "price",
    Cell: (props: any) => {
      return (
        <>
          {props?.row?.original?.price ? (
            <span>$ {props?.row?.original?.price}</span>
          ) : (
            "-"
          )}
        </>
      );
    },
    disableSortBy: true,
  },
  {
    Header: "BILLABLE",
    accessor: "is_billable",
    disableSortBy: true,
    Cell: (props: any) => {
      return (
        <>
          {/* {props?.row?.original?.is_billable ? ( */}
            <span>
              {props?.row?.original?.is_billable ? "Yes" : "No"}
            </span>
          {/* ) : (
            "No"
          )} */}
        </>
      );
    },
  },
  {
    Header: "NOTES",
    accessor: "test_notes",
    disableSortBy: true,
    Cell: (props: any) => {
      return (
        <>
          {props?.row?.original?.test_notes ? (
            <span
              className={styles.viewPopupLink}
              onClick={() => {
                props?.onClick(props?.row?.original);
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
    Header: "ACTIONS",
    disableSortBy: true,
    Cell: (props: any) => {
      return (
        <DeleteIcon
          fillColor={colors.grey4}
          customClass={styles.iconStyle}
          handleClick={() => {
            props?.onPopClose(props?.row?.original);
          }}
        />
      );
    },
  },
];

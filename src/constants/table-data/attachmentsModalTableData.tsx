import styles from "./attachmentsModalTable.module.scss";

export const attachmentsModalHeaderData: any = [
  {
    Header: "NAME",
    accessor: "doc_name",
    disableSortBy: true,
  },
  {
    Header: "ATTACHMENTS",
    Cell: (props: any) => {
      return (
        <>
          {props?.row?.original?.doc_url ? (
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
];

import styles from "./imagesModalTable.module.scss";

export const imagesModalHeaderData: any = [
  {
    Header: "NAME",
    accessor: "img_name",
    disableSortBy: true,
  },
  {
    Header: "IMAGES",
    Cell: (props: any) => {
      return (
        <>
          {props?.row?.original?.img_url ? (
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

import styles from "../../components/common/modal/search-modal/searchModalV2.module.scss";

export const searchModalV2HeaderData: any = [
  {
    Header: "FILE NO.",
    accessor: "emr_no",
    Cell: (props: any) => {
      return (
        <>
          <span
            className={
              props?.row?.original?.is_active === true
                ? styles.fileLink
                : styles.deletedFileLink
            }
            onClick={() =>
              props?.row?.original?.is_active === true &&
              props.onClick(props?.row?.original)
            }
          >
            {" "}
            {props?.row?.original?.emr_no}
          </span>
        </>
      );
    },
  },
  {
    Header: "PATIENT NAME",
    accessor: "patient_name",
  },

  {
    Header: "NATIONAL ID",
    accessor: "national_id",
  },
  {
    Header: "MOBILE",
    accessor: "patient_phone",
  },
];

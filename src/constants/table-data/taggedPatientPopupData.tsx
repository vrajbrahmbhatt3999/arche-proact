import styles from "./taggedPatientPopupData.module.scss";

export const taggedPatientPopupHeaderData: any = [
  {
    Header: "PATIENT FILE NO.",
    accessor: "patient_emr",
  },
  {
    Header: "PATIENT NAME",
    accessor: "patient_name",
  },
  {
    Header: "LAST APPOINTMENT",
    accessor: "appointment_date",
  },

  {
    Header: "SYMPTOMS",
    Cell: (props: any) => {
      return (
        <>
          {props?.row?.original?.appointment_date ? (
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

export const taggedPatientPopupHeaderDummyData: any = [
  {
    Header: "PATIENT FILE NO.",
    accessor: "patient_emr",
  },
  {
    Header: "PATIENT NAME",
    accessor: "patient_name",
  },
  {
    Header: "LAST APPOINTMENT",
    accessor: "appointment_date",
  },

  {
    Header: "SYMPTOMS",
    Cell: () => {
      return <>-</>;
    },
  },
];
export const taggedPatientDummyData: any = [
  {
    patient_emr: "-",
    patient_name: "-",
    appointment_date: "-",
    // symptoms: "-",
  },
];

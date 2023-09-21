import styles from "./tableData.module.scss";

export const configurationEditHeaderData: any = [
  {
    Header: "TEST PROFILE",
    accessor: "g",
  },
  {
    Header: "TEST NAME",
    accessor: "f",
  },
  {
    Header: "UNIT",
    accessor: "t",
  },
  {
    Header: "COMPONENT",
    accessor: "rf",
  },
  {
    Header: "REMARKS",
    Cell: ({}) => {
      return <p className={styles.blueLinkText}>View</p>;
    },
  },
  {
    Header: "DETAILS",
    Cell: (props: any) => {
      return (
        <p
          className={styles.blueLinkText}
          onClick={() => {
            props?.onClick(props?.row?.original);
          }}
        >
          More Details
        </p>
      );
    },
  },
];

export const configurationEditTable = [
  {
    g: "Male",
    f: "3",
    t: "10",
    rf: "1-100",
    rt: "1-100",
  },
];

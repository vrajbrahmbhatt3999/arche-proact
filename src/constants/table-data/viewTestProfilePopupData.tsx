import { EditIcon } from "../../components/common/svg-components";
import styles from "./tableData.module.scss";

export const viewTestProfileHeaderData: any = [
  {
    Header: "PROFILE ID",
    accessor: (row: any) => {
      return row?.profile_no ? row?.profile_no : "-";
    },
  },
  {
    Header: "PROFILE NAME",
    accessor: "name",
  },
  {
    Header: "PROFILE TESTS",
    Cell: (props: any) => {
      return (
        <>
          {props?.row?.original?.labtest_ids?.length > 0 ? (
            <span
              className={styles.blueLinkText}
              onClick={() => {
                props?.onOpen(props?.row?.original);
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
    Header: "PROFILE AMOUNT",
    accessor: "package_amount",
  },
  {
    Header: "ACTION",
    Cell: (props: any) => {
      return (
        <EditIcon handleClick={() => props?.onRowClick(props?.row?.original?._id)} />
      );
    },
  },
];

export const testProfileDummyData = [
  {
    _id: "-",
    name: "-",
    package_amount: "-",
  },
];

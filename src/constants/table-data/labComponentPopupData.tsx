import { DeleteIcon, EditIcon } from "../../components/common/svg-components";
import ToggleSwitchV2 from "../../components/common/toggle-switch/ToggleSwitchV2";
import { colors } from "../color";
import styles from "./tableData.module.scss";

export const labComponentHeaderData: any = [
  // {
  //   Header: "ID",
  //   accessor: "_id",
  // },
  {
    Header: "COMPONENT",
    accessor: "name",
  },
  {
    Header: "RANGE",
    Cell: (props: any) => {
      return (
        <p
          className={styles.blueLinkText}
          onClick={() => {
            props?.onRowClick(props?.row?.original?.ranges);
          }}
        >
          View
        </p>
      );
    },
  },
  {
    Header: "ACTION",
    Cell: (props: any) => {
      return (
        <EditIcon
          handleClick={() => props?.onClick(props?.row?.original?._id)}
        />
      );
    },
  },
  {
    Header: "STATUS",
    Cell: (props: any) => {
      const is_active = props?.row?.original?.is_active;
      return (
        <ToggleSwitchV2
          isToggled={is_active}
          handleToggle={() => props?.onPopClose(props?.row?.original)}
        />
      );
    },
  },
];

import { EditIcon, InfoIcon } from "../../components/common/svg-components";
import { useState } from "react";
import { colors } from "../color";
import styles from "./tableData.module.scss"

export const configurationHeaderData: any = [
  {
    Header: "TEST ID",
    accessor: "test_no",
  },
  {
    Header: "TEST NAME",
    accessor: "name",
  },
  {
    Header: () => {
      const [tat, setTat] = useState(false);
      return (
        <>
          <div className={styles.tatStyle}>
            <p>TAT</p>
            <span className={styles.iconContainer}>
              <InfoIcon
                fillColor={colors.grey2}
                mouseEnter={() => setTat(true)}
                mouseLeave={() => setTat(false)}
              />
            </span>
            {tat && <p className={styles.tatText}>Turn Around Time</p>}
          </div>
        </>
      );
    },
    accessor: "tat",
    Cell: ({ row }: any) => {
      const _id = row?.original?._id;
      return (
        <>
          <input
            className={styles.inputField}
            value={row?.original?.turn_around_time}
            type="text"
            key={_id}
            disabled={true}
          />
        </>
      );
    },
  },
  {
    Header: "SAMPLE",
    accessor: "sample",
    Cell: ({ row }: any) => {
      const _id = row?.original?._id;
      return (
        <>
          <input
            className={styles.inputField}
            value={row?.original?.sample_id?.name}
            type="text"
            key={_id}
            disabled={true}
          />
        </>
      );
    },
  },
  {
    // Header: "INTERNAL/EXTERNAL",
    Header: () => {
      return (
        <div>
          <p>INTERNAL/</p>
          <p>EXTERNAL</p>
        </div>
      )
    },
    accessor: "source",
  },
  {
    Header: "COST PRICE",
    accessor: "cost_price",
  },
  {
    Header: "SELL PRICE",
    accessor: "sell_price",
  },
  {
    Header: "ACTION",
    Cell: (props: any) => {
      return <EditIcon handleClick={() => props?.onClick(props?.row?.original?._id)} />;
    },
  },
];
import styles from "./createJobs.module.scss";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { setAllTestQuantityData } from "../../../redux/features/jobs/jobsSlice";

// Create Jobs Table
export const createJobsHeaderData: any = [
  {
    Header: "PROFILE ID",
    accessor: (row: any) => {
      return row?.profile_test_id ? row?.profile_test_id : "-";
    },
  },
  {
    Header: "PROFILE NAME",
    accessor: (row: any) => {
      return row?.profile_test_name?.length ? row?.profile_test_name : "-";
    },
  },
  {
    Header: "TEST ID",
    accessor: (row: any) => {
      return row?.test_id ? row?.test_id : "-";
    },
  },
  {
    Header: "TEST NAME",
    accessor: (row: any) => {
      return row?.test_name?.length ? row?.test_name : "-";
    },
  },
  {
    Header: "QTY",
    Cell: (props: any) => {
      const { allTestData } = useAppSelector((state) => state.labsJob);
      const dispatch = useAppDispatch();
      const handleQuantityChange = (
        event: React.ChangeEvent<HTMLInputElement>
      ) => {
        const quantity = event.target.value;
        const updatedData = allTestData?.map((item: any) => {
          if (item?._id === props?.row?.original?._id) {
            return {
              ...item,
              quantity: parseInt(quantity),
            };
          } else {
            return item;
          }
        });
        dispatch(setAllTestQuantityData(updatedData));
      };
      return (
        <input
          type="number"
          className={styles.inputField}
          value={props?.row?.original?.quantity}
          defaultValue={1}
          key={props?.row?.original?._id}
          onChange={handleQuantityChange}
          disabled
        />
      );
    },
  },
  {
    Header: "PRICE",
    Cell: (props: any) => {
      return (
        <>
          {props.row.original?.sell_price
            ? `$${props.row.original?.sell_price?.toLocaleString()}`
            : `$${props.row.original?.total_amount?.toLocaleString()}`}
        </>
      );
    },
  },
  {
    Header: "AMOUNT",
    Cell: (props: any) => {
      const totalQtyPrice: any =
        (props.row.original?.sell_price
          ? props.row.original?.sell_price
          : props.row.original?.total_amount) *
        (typeof props.row?.original?.quantity === "undefined"
          ? 1
          : props.row?.original?.quantity);

      return (
        <>
          {isNaN(totalQtyPrice) ? (
            "-"
          ) : (
            <p>${totalQtyPrice?.toLocaleString()}</p>
          )}
        </>
      );
    },
  },
  {
    Header: "BILLABLE",
    Cell: () => {
      return (
        <select className={styles.inputField} disabled={true}>
          <option value="">YES</option>
          <option value="">NO</option>
        </select>
      );
    },
  },
];

import styles from "./createJobs.module.scss";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { setAllTestQuantityData } from "../../../redux/features/radiology-jobs/jobsSlice";

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
      // const { quantity, setAllTestData } = useAppSelector(
      //   (state) => state.labsJob
      // );
      const { allTestData } = useAppSelector((state) => state.radiologyJobs);
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
        // dispatch(updateQuantity(updatedData));
        // dispatch(setQuantity(updatedData));
        dispatch(setAllTestQuantityData(updatedData));
      };

      // const handleKeyDown = (e: any) => {
      //   if (e.target.value.length >= 2 && e.key !== "Backspace") {
      //     e.preventDefault();
      //   }
      // };
      return (
        <input
          type="number"
          className={styles.inputField}
          value={props?.row?.original?.quantity}
          defaultValue={1}
          key={props?.row?.original?._id}
          onChange={handleQuantityChange}
          disabled
          // onKeyDown={handleKeyDown}
        />
      );
    },
  },
  {
    Header: "PRICE",
    accessor: "",
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
    // accessor: "",
    Cell: (props: any) => {
      const totalQtyPrice =
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

// export const createJobsTableDummyData: any[] = [
//   {
//     test_id: 58,
//     _category: "Lab",
//     test_name: "WBC",
//     _qty: 1,
//     price: "$56",
//     _amt: "$56",
//   },
//   {
//     test_id: 256,
//     _category: "Lab",
//     test_name: "RBC",
//     _qty: "2",
//     price: "$80",
//     _amt: "$160",
//   },
//   {
//     test_id: 869,
//     _category: "Lab",
//     test_name: "Hb",
//     _qty: "1",
//     price: "$25",
//     _amt: "$25",
//   },
//   {
//     test_id: 425,
//     _category: "Lab",
//     test_name: "Lipid profile",
//     _qty: "-",
//     price: "$36",
//     _amt: "$108",
//   },
// ];

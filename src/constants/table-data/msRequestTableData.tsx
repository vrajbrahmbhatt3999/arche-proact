import StatusDropdownV3 from "../../components/common/status-dropdown/status-dropdown-V3/StatusDropdownV3";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  CrossIcon,
  CrossIcon2,
  EditIcon,
  DeleteIcon,
} from "../../components/common/svg-components";
import {
  removeUniqueMainStoreData,
  updateIssueData,
  updateMainStoreData,
} from "../../redux/features/branch-store/branchStoreSlice";
import { setMessage } from "../../redux/features/toast/toastSlice";
import { disableArrowKey, blockInvalidCharacter } from "../../utils/utils";
import { failure } from "../../constants/data";
import { colors } from "../color";
import styles from "../../pages/branchstore/branchstore/branchstore.module.scss";

export const msRequestHeaderData: any = [
  {
    Header: "REQ ID",
    accessor: (row: any) => {
      return row?.req_no?.toString().padStart(6, "0");
    },
    Cell: (props: any) => {
      return (
        <>
          {props?.row?.original?.req_no ? (
            <span>
              {props?.row?.original?.req_no?.toString().padStart(6, "0")}
            </span>
          ) : (
            "-"
          )}
        </>
      );
    },
  },

  {
    Header: "ITEM NAME",
    accessor: "item_name",
  },
  // {
  //   Header: "REQ QTY(MAIN STORE)",
  //   accessor: "main_store_qty",
  //   Cell: (props: any) => {
  //     return (
  //       <>
  //         {props?.row?.original?.main_store_qty ? (
  //           <span className={styles.textHighLight}>
  //             {props?.row?.original?.main_store_qty}
  //           </span>
  //         ) : (
  //           "-"
  //         )}
  //       </>
  //     );
  //   },
  // },
  {
    Header: "REQ QTY (MAIN STORE)(E).",
    disableSortBy: true,
    Cell: (props: any) => {
      const dispatch = useAppDispatch();
      const { selectedMainStoreData, selectedMainStoreUniqueData } =
        useAppSelector((state) => state.branchStore);
      // console.log("selectedMainStoreData :>> ", selectedMainStoreData);
      const validateMainStoreQty = (mainStoreQty: string, item: any) => {
        if (Number(mainStoreQty) === undefined) {
          dispatch(
            setMessage({
              message: "Please enter valid main store quantity",
              type: failure,
            })
          );
          return {
            ...item,
            main_store_qty: Number(mainStoreQty),
          };
        } else if (mainStoreQty === "0") {
          dispatch(
            setMessage({
              message: "Please enter valid main store quantity",
              type: failure,
            })
          );
          return item;
        } else if (Number(mainStoreQty) < 0) {
          dispatch(
            setMessage({
              message: "Please enter valid main store quantity",
              type: failure,
            })
          );
          return item;
        } else {
          return {
            ...item,
            main_store_qty: Number(mainStoreQty),
          };
        }
      };
      const handleChange = (e: any) => {
        const mainStoreQty = e.target.value;
        let tempArr: any = [];
        tempArr = selectedMainStoreUniqueData?.map(
          (item: any, index: number) => {
            if (item?._id === props?.row?.original?._id) {
              return validateMainStoreQty(mainStoreQty, item);
            } else {
              return item;
            }
          }
        );
        dispatch(updateMainStoreData(tempArr));
      };
      return (
        <input
          type="number"
          value={
            selectedMainStoreUniqueData[props.row.index]?.main_store_qty || ""
          }
          // placeholder="Text"
          className={styles.branchStoreQtyField}
          onChange={handleChange}
          onKeyDown={(e: any) => {
            disableArrowKey(e);
            blockInvalidCharacter(e);
          }}
          onWheel={(e: any) => {
            e.target.blur();
          }}
        />
      );
    },
  },
  {
    Header: "UNIT TYPE",
    accessor: "req_unit_type.value",
  },

  {
    Header: "REQ STATUS",
    disableSortBy: true,
    // accessor: "req_status",
    // Cell: ({ row }: any) => {
    //   return (
    //     <>
    //       <div className={styles.tabledataflex}>
    //         <StatusDropdownV3
    //           appointmentStatus={row?.original?.status}
    //           customDropdownContainer={styles.dropdown}
    //         />

    //         <div className={styles.icon}>
    //           <CrossIcon2 fillColor1={colors.red1} />
    //         </div>
    //       </div>
    //     </>
    //   );
    // },
    Cell: (props: any) => {
      return (
        <>
          <p>Initiated</p>
        </>
      );
    },
  },
  {
    Header: " ",
    Cell: (props: any) => {
      const dispatch = useAppDispatch();
      return (
        <>
          <div>
            <CrossIcon2
              fillColor1={colors.red1}
              handleClick={() => {
                dispatch(removeUniqueMainStoreData(props?.row?.original));
              }}
            />
          </div>
        </>
      );
    },
  },
  // {
  //   Header: "ACTIONS",
  //   disableSortBy: true,
  //   Cell: (props: any) => {
  //     return (
  //       <DeleteIcon
  //         fillColor={colors.grey4}
  //         customClass={styles.iconStyle}
  //         handleClick={() => {
  //           props?.onRowClick(props?.row?.original);
  //         }}
  //       />
  //     );
  //   },
  // },
];

export const msRequestData: any = [
  {
    req_id: "10 Jan 2023",
    item_name: "Cleaning Kit",
    req_qty: "400",
    unit_type: "Box",
    req_status: "",
  },
  {
    req_id: "10 Jan 2023",
    item_name: "Cleaning Kit",
    req_qty: "400",
    unit_type: "Box",
    req_status: "",
  },
  {
    req_id: "10 Jan 2023",
    item_name: "Cleaning Kit",
    req_qty: "400",
    unit_type: "Box",
    req_status: "",
  },
];

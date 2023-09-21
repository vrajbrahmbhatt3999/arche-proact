import { DeleteIcon, CrossIcon2 } from "../../components/common/svg-components";
import {
  updateIssueData,
  updateMainStoreData,
  removeIssueData,
} from "../../redux/features/branch-store/branchStoreSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setMessage } from "../../redux/features/toast/toastSlice";
import { disableArrowKey, blockInvalidCharacter } from "../../utils/utils";
import { failure } from "../../constants/data";
import { colors } from "../color";
import styles from "../../pages/branchstore/branchstore/branchstore.module.scss";

export const requestIssueTableHeaderData: any = [
  {
    Header: "ITEM CODE",
    accessor: "item_no",
    // Cell: (props: any) => {
    //   return (
    //     <>
    //       {props?.row?.original?.item_id ? (
    //         <span>{props?.row?.original?.item_id}</span>
    //       ) : (
    //         "-"
    //       )}
    //     </>
    //   );
    // },
  },
  {
    Header: "REQ.STOCK QTY.",
    accessor: "pending_qty",
  },
  {
    Header: "ITEM NAME",
    accessor: "item_name",
  },
  {
    Header: "UNIT TYPE",
    accessor: "req_unit_type.value",
  },
  {
    Header: "AVAIL. STOCK QTY",
    accessor: "available_qty",
  },
  {
    Header: "ISSUE QTY(E).",
    disableSortBy: true,
    Cell: (props: any) => {
      const dispatch = useAppDispatch();
      const { selectedIssueData } = useAppSelector(
        (state) => state.branchStore
      );
      // console.log("selectedIssueData :>> ", selectedIssueData);
      const validateIssueQty = (issueQty: string, item: any) => {
        if (Number(issueQty) === undefined) {
          dispatch(
            setMessage({
              message: "Please enter valid issue quantity",
              type: failure,
            })
          );
          return {
            ...item,
            issue_qty: Number(issueQty),
          };
        } else if (issueQty === "0") {
          dispatch(
            setMessage({
              message: "Please enter valid issue quantity",
              type: failure,
            })
          );
          return item;
        } else if (Number(issueQty) < 0) {
          dispatch(
            setMessage({
              message: "Please enter valid issue quantity",
              type: failure,
            })
          );
          return item;
        } else if (
          Number(issueQty) > Number(props?.row?.original?.pending_qty)
        ) {
          dispatch(
            setMessage({
              message: "Please enter issue quantity less than request quantity",
              type: failure,
            })
          );
          return item;
        } else if (
          Number(issueQty) > Number(props?.row?.original?.available_qty)
        ) {
          dispatch(
            setMessage({
              message:
                "Please enter issue quantity less than available quantity",
              type: failure,
            })
          );
          return item;
        } else {
          return {
            ...item,
            issue_qty: Number(issueQty),
          };
        }
      };
      const handleChange = (e: any) => {
        const issueQty = e.target.value;
        let tempArr: any = [];
        tempArr = selectedIssueData?.map((item: any, index: number) => {
          if (item?._id === props?.row?.original?._id) {
            return validateIssueQty(issueQty, item);
          } else {
            return item;
          }
        });
        dispatch(updateIssueData(tempArr));
      };
      return (
        <input
          type="number"
          value={selectedIssueData[props.row.index]?.issue_qty || ""}
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
    Header: "QTY. TO CLOSURE",
    accessor: (row: any) => {
      return Number(row?.pending_qty) - Number(row?.issue_qty);
    },
    Cell: (props: any) => {
      return (
        <>
          {Number(props?.row?.original?.issue_qty) > 0 ? (
            <span>
              {Number(props?.row?.original?.pending_qty) -
                Number(props?.row?.original?.issue_qty)}
            </span>
          ) : (
            "-"
          )}
        </>
      );
    },
  },
  {
    Header: "MIN BAL.",
    accessor: "qty_to_maintain",
  },
  {
    Header: "POST ISSUED BAL",
    accessor: (row: any) => {
      return Number(row?.available_qty) - Number(row?.issue_qty);
    },
    Cell: (props: any) => {
      return (
        <>
          {Number(props?.row?.original?.issue_qty) > 0 ? (
            <span>
              {Number(props?.row?.original?.available_qty) -
                Number(props?.row?.original?.issue_qty)}
            </span>
          ) : (
            "-"
          )}
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
                dispatch(removeIssueData(props?.row?.original));
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
  //           props?.onClick(props?.row?.original);
  //         }}
  //       />
  //     );
  //   },
  // },
];

export const requestIssueTableData: any = [
  {
    Item_Code: "56896",
    req_qty: "400",
    Item_Name: "Cleaning kit",
    Unit_type: "Box",
    Avail_Stock_Qty: "2200",
    Issue_Qty: "300",
    Qty_To_Closure: "100",
    Min_Bal: "1600",
    Authorized_Status: "1800",
  },
  {
    Item_Code: "56896",
    req_qty: "400",
    Item_Name: "Cleaning kit",
    Unit_type: "Box",
    Avail_Stock_Qty: "2200",
    Issue_Qty: "300",
    Qty_To_Closure: "100",
    Min_Bal: "1600",
    Authorized_Status: "1800",
  },
  {
    Item_Code: "56896",
    req_qty: "400",
    Item_Name: "Cleaning kit",
    Unit_type: "Box",
    Avail_Stock_Qty: "2200",
    Issue_Qty: "300",
    Qty_To_Closure: "100",
    Min_Bal: "1600",
    Authorized_Status: "1800",
  },
  {
    Item_Code: "56896",
    req_qty: "400",
    Item_Name: "Cleaning kit",
    Unit_type: "Box",
    Avail_Stock_Qty: "2200",
    Issue_Qty: "300",
    Qty_To_Closure: "100",
    Min_Bal: "1600",
    Authorized_Status: "1800",
  },
  {
    Item_Code: "56896",
    req_qty: "400",
    Item_Name: "Cleaning kit",
    Unit_type: "Box",
    Avail_Stock_Qty: "2200",
    Issue_Qty: "300",
    Qty_To_Closure: "100",
    Min_Bal: "1600",
    Authorized_Status: "1800",
  },
];

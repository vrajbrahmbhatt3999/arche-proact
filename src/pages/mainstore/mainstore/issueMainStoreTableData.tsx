import styles from "./issuemainstoretabledata.module.scss";
import moment from "moment";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { updateInventoryIssueData } from "../../../redux/features/inventory-request/inventoryRequestSlice";
import { blockInvalidCharacter, disableArrowKey } from "../../../utils/utils";

export const issueMainStoreHeaderData: any = [
  {
    Header: "DATE",
    accessor: (row: any) => {
      return moment(row?.date).format("DD-MMM-YYYY") ?? "-";
    },
  },
  {
    Header: "REQ TYPE",
    accessor: "tag",
  },
  {
    Header: "REQ ID",
    accessor: "req_no",
  },
  {
    Header: "BRANCH STORE",
    accessor: "request_source",
  },
  {
    Header: "ITEM NAME",
    accessor: "item_name",
  },
  {
    Header: "REQ STOCK QTY",
    accessor: "requested_qty",
  },
  {
    Header: "AVAIL STOCK QTY",
    accessor: "available_qty",
  },
  {
    Header: "ISSUE QTY(E).",
    Cell: (props: any) => {
      const { inventoryIssueData } = useAppSelector(
        (state) => state.inventoryRequest
      );
      const createUpdateDataPayload = (data: any, quantity: any) => {
        let tempArr = data?.map((item: any) => {
          if (item._id === props.row.original._id) {
            return {
              ...item,
              issueQuantity: quantity,
            };
          } else {
            return item;
          }
        });
        return tempArr;
      };
      const dispatch = useAppDispatch();
      const updateQuantity = (event: any) => {
        const quantity = event?.target.value;
        dispatch(
          updateInventoryIssueData(
            createUpdateDataPayload(inventoryIssueData, quantity)
          )
        );
      };

      return (
        <input
          type="number"
          className={styles.inputField}
          value={props?.row?.original?.issueQuantity}
          key={props?.row?.original?._id}
          onChange={updateQuantity}
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
    Header: "POST ISSUE BAL",
    Cell: (props: any) => {
      const isNanQuantity = Number(props.row.original.issueQuantity);
      const isAddFunc = () => {
        if (isNaN(isNanQuantity)) {
          return props.row.original.available_qty;
        } else {
          return props.row.original.available_qty - isNanQuantity;
        }
      };

      return <>{isAddFunc()}</>;
    },
  },
  {
    Header: "BASE UNIT TYPE",
    accessor: "base_unit_type.value",
  },
  {
    Header: "UNIT TYPE",
    accessor: "req_unit_type.value",
  },
  {
    Header: "QTY TO CLOSURE",
    Cell: (props: any) => {
      const isNanQuantity = Number(props.row.original.issueQuantity);
      const isAddFunc = () => {
        if (isNaN(isNanQuantity)) {
          return props.row.original.available_qty;
        } else {
          return props.row.original.available_qty - isNanQuantity;
        }
      };

      return <>{isAddFunc()}</>;
    },
  },
];

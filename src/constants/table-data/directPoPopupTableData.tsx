import { CheckIcon, UncheckIcon } from "../../components/common/svg-components";
import { colors } from "../color";
import moment from "moment";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  getInventoryPoData,
  removeInventoryPoData,
  setDirectPoStatus,
} from "../../redux/features/inventory-request/inventoryRequestSlice";

export const directPoPoupHeaderData: any = [
  {
    Header: "DATE",
    accessor: (row: any) => {
      return moment(row?.createdAt).format("DD-MMM-YYYY") ?? "-";
    },
    disableSortBy: true,
  },
  {
    Header: "ITEM NAME",
    accessor: "name",
  },
  {
    Header: "AVAIL STOCK",
    accessor: (row: any) => {
      return row?.store_item_detail?.qty ?? "-";
    },
  },
  {
    Header: "BASE UNIT TYPE",
    accessor: "base_unit_type.value",
  },
  {
    Header: "PRICE",
    disableSortBy: true,
    accessor: "sell_price",
  },
  {
    Header: "RAISE PO",
    disableSortBy: true,
    Cell: (props: any) => {
      const { directPoStatus } = useAppSelector(
        (state) => state.inventoryRequest
      );
      const dispatch = useAppDispatch();
      const loadIssueData = () => {
        dispatch(
          getInventoryPoData({
            ...props.row.original,
          })
        );
      };

      const addIssueId = () => {
        dispatch(setDirectPoStatus(props?.row?.original?._id));
      };

      const removeIssueData = () => {
        dispatch(removeInventoryPoData(props.row.original._id));
      };
      return (
        <div onClick={addIssueId}>
          {directPoStatus.includes(props.row.original._id) ? (
            <CheckIcon
              fillColor={colors.green1}
              handleClick={() => removeIssueData()}
            />
          ) : (
            <UncheckIcon
              fillColor={colors.grey1}
              handleClick={() => loadIssueData()}
            />
          )}
        </div>
      );
    },
  },
];

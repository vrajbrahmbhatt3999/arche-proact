import {
  CheckIcon,
  UncheckIcon,
} from "../../../components/common/svg-components";
import { colors } from "../../../constants/color";
import moment from "moment";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  getInventoryIssueData,
  getInventoryPoData,
  removeInventoryIssueData,
  removeInventoryPoData,
  setIssueCheckStatus,
  setPoCheckStatus,
} from "../../../redux/features/inventory-request/inventoryRequestSlice";

export const mainstoreRequestPopupHeaderData: any = [
  {
    Header: "DATE",
    accessor: (row: any) => {
      return moment(row?.date).format("DD-MMM-YYYY") ?? "-";
    },
  },
  {
    Header: "REQ ID",
    accessor: "req_no",
    disableSortBy: true,
  },
  {
    Header: "SOURCE",
    accessor: (row: any) => {
      return row?.request_source_type ?? "-";
    },
  },
  {
    Header: "ITEMS NAME",
    accessor: "item_name",
  },
  {
    Header: "AVAIL.Qty",
    accessor: "available_qty",
  },
  {
    Header: "ISSUE",
    disableSortBy: true,
    Cell: (props: any) => {
      const { issueCheckStatus, getAllInventoryRequestData } = useAppSelector(
        (state) => state.inventoryRequest
      );

      const dispatch = useAppDispatch();
      const loadIssueData = () => {
        const checkCommonIds = getAllInventoryRequestData?.find(
          (s: any) => s._id === props.row.original._id
        );

        let inventoryIssueData = {
          ...checkCommonIds,
        };

        dispatch(getInventoryIssueData(inventoryIssueData));
      };

      const addIssueId = () => {
        dispatch(setIssueCheckStatus(props.row.original._id));
      };

      const removeIssueData = () => {
        dispatch(removeInventoryIssueData(props.row.original._id));
      };
      return (
        <div onClick={addIssueId}>
          {issueCheckStatus.includes(props.row.original._id) ? (
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
  {
    Header: "REQ QTY",
    accessor: "requested_qty",
  },
  {
    Header: "RAISE PO",
    disableSortBy: true,
    Cell: (props: any) => {
      const { poCheckStatus, getAllInventoryRequestData } = useAppSelector(
        (state) => state.inventoryRequest
      );

      const dispatch = useAppDispatch();

      const loadIssueData = () => {
        const checkCommonIds = getAllInventoryRequestData?.find(
          (s: any) => s._id === props.row.original._id
        );
        let inventoryIssueData = {
          ...checkCommonIds,
        };
        dispatch(getInventoryPoData(inventoryIssueData));
      };

      const addIssueId = () => {
        dispatch(setPoCheckStatus(props.row.original._id));
      };

      const removeIssueData = () => {
        dispatch(removeInventoryPoData(props.row.original._id));
      };
      return (
        <div onClick={addIssueId}>
          {poCheckStatus.includes(props.row.original._id) ? (
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

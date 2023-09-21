import moment from "moment";
import { DropdownIndicator } from "../../components/common/dropdown-indicator/DropdownIndicator";
import Select from "react-select";
import { useAppDispatch } from "../../hooks";
import {
  getInventoryAllPo,
  poInventoryUpdate,
} from "../../redux/features/inventory-request/inventoryRequestAsyncActions";
import { requestGenerator } from "../../utils/payloadGenerator";

const resultStatusData = [
  { label: "ENTERED" },
  { label: "APPROVED" },
  { label: "REJECTED" },
];

export const SubmittedpoHeaderData: any = [
  {
    Header: "DATE",
    accessor: (row: any) => {
      return moment(row?.requested_date).format("DD-MMM-YYYY") ?? "-";
    },
    disableSortBy: true,
  },
  {
    Header: "DOC ID",
    accessor: "doc_id",
  },
  {
    Header: "PO NO",
    accessor: "po_no",
  },
  {
    Header: "SUPPLIER NAME",
    accessor: "suppliers",
  },
  {
    Header: "STATUS",
    accessor: "status",
  },
  {
    Header: "AUTHORIZATION STATUS",
    Cell: (props: any) => {
      const dispatch = useAppDispatch();
      const handlePo = (item: any) => {
        let data = {
          po_id: props.row.original._id,
          authorization_status: item.label,
        };
        dispatch(poInventoryUpdate(requestGenerator(data))).then((e: any) => {
          if (e.type === "inventory/poInventoryUpdate/fulfilled") {
            let requestData = {
              page: 1,
              pageSize: 10,
              order_by: { name: 1 },
            };
            dispatch(getInventoryAllPo(requestGenerator(requestData)));
          }
        });
      };
      return (
        <Select
          isDisabled={props.row.original?.authorization_status === "APPROVED"}
          components={{ DropdownIndicator }}
          isSearchable={false}
          value={{
            label: props.row.original.authorization_status,
            value: props.row.original.authorization_status,
          }}
          options={resultStatusData?.map((item: any) => ({
            label: item.label,
            value: item.label,
          }))}
          onChange={(e: any) => handlePo(e)}
          maxMenuHeight={120}
          styles={{
            control: (provided) => ({
              ...provided,
              minWidth: "50px",
              minHeight: "30px",
              cursor: "pointer",
            }),
          }}
        />
      );
    },
  },
];

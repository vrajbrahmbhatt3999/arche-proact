import TableV2 from "../../../components/common/table/tableV2/TableV2";
import moment from "moment";
import { useAppSelector } from "../../../hooks";

const PoGrnHeaderData: any = [
  {
    Header: "DATE",
    accessor: (row: any) => {
      return moment(row?.receive_date).format("DD-MMM-YYYY") ?? "-";
    },
    disableSortBy: true,
  },
  {
    Header: "GRN DOC ID",
    accessor: "doc_id",
  },
];

const PoGrnData = () => {
  const { grnList } = useAppSelector((state) => state.purchaseInvoice);
  return (
    <div style={{ marginTop: "30px", maxHeight: "250px", overflow: "auto" }}>
      <TableV2 tableHeaderData={PoGrnHeaderData} tableRowData={grnList} />
    </div>
  );
};

export default PoGrnData;

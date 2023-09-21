import { CrossIcon2 } from "../../components/common/svg-components";
import { colors } from "../color";

export const requestHeaderData: any = [
    {
      Header: "ITEM ID",
      accessor: "_id",
    },
    {
      Header: "REQUEST QTY",
      accessor: "_qty",
    },
    {
      Header: "UNIT TYPE",
      accessor: "unit_type",
    },
    {
      Header: "SUB STORE",
      accessor: "sub_store",
    },
    {
      Header: " REQUEST STATUS",
      accessor: "req_status",
    },
    {
      Header: "NOTE",
      accessor: "note",
    },
    {
        Header: "AUTHORIZED STATUS",
        accessor: "auth_status",
        Cell: (props: any) => {
          return (
            <>
              <div style={{display : "flex", justifyContent:"end"}}>
                  <div>
                <p style={{marginRight : "100px"}}>Entered</p>
                </div>
                <div  >
                <CrossIcon2  fillColor1={colors.red1} />
                </div>
              </div>
            </>
          )
        },
      },
  ];
  
  
  export const requestData :any= [
    {
      _id: "-",
      _qty: "-",
      unit_type: "-",
      sub_store: "-",
      req_status: "-",
      note:"-",
      auth_status:"-"
    },
    {
      _id: "-",
      _qty: "-",
      unit_type: "-",
      sub_store: "-",
      req_status: "-",
      _notes:"-",
      auth_status:"-"
    },
    {
      _id: "-",
      _qty: "-",
      unit_type: "-",
      sub_store: "-",
      req_status: "-",
      _notes:"-",
      auth_status:"-"
    },
    {
      _id: "-",
      _qty: "-",
      unit_type: "-",
      sub_store: "-",
      req_status: "-",
      _notes:"-",
      auth_status:"-"
    },
    {
      _id: "-",
      _qty: "-",
      unit_type: "-",
      sub_store: "-",
      req_status: "-",
      _notes:"-",
      auth_status:"-"
    },
    {
      _id: "-",
      _qty: "-",
      unit_type: "-",
      sub_store: "-",
      req_status: "-",
      _notes:"-",
      auth_status:"-"
    },
  ];
  
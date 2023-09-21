

import styles from "../table-data/requestInventoryManagement.module.scss"
import { CalculatorIcon, CrossIcon2 } from "../../components/common/svg-components";
import { colors } from "../color";


export const mainstoreTabledataHeaderData: any = [
    {
      Header: 'REQ_ID',
      accessor: 'Req_ID ',
    },
    {       
      Header: 'ITEM NAME',
      accessor: 'Item_Name',
    },
    {
        Header: 'REQ QTY (MAINSTORE)',
        accessor: 'REQ_Qty',
      },
    {
      Header: 'UNIT TYPE',
      accessor: 'Unit_type',
    },
    {
        Header: 'REQ STATUS',
        accessor: 'Req_Status',
      },

    {
        Header: ' ',
        // accessor: 'CrossIcon',
        Cell: (props: any) => {
            return (
              <>
                <div className={styles.tabledataflex}>
                  <CrossIcon2  fillColor1={colors.red1} />
                </div>
              </>
            )
          },
      },
  
  
  ]
  


    
  export const mainstoreTableHeaderDataDummyData: any = [
  
     
    {
      Item_ID: "101",
      Item_Name: "Cleaning kit",
      Request_QTY: "400",
      Unit_type: "box",
      Branch_Store: "Dental",
      Request_Status: "initiated",
      Authorized_Status: "Entered",

      
    },
    {
      Item_ID: "101",
      Item_Name: "Cleaning kit",
      Request_QTY: "400",
      Unit_type: "box",
      Branch_Store: "Dental",
      Request_Status: "initiated",
      Authorized_Status: "Entered",
    },
  ]
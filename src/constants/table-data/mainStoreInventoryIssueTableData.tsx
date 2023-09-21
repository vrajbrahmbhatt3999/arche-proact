

import styles from "../table-data/requestInventoryManagement.module.scss"
import { CalculatorIcon, CrossIcon2 } from "../../components/common/svg-components";
import { colors } from "../color";


export const mainstoreIssueTabledataHeaderData: any = [
    {
      Header: 'DATE',
      accessor: 'Date',
    },
    {       
      Header: 'REQ TYPE',
      accessor: 'Req_Type',
    },
    {
        Header: 'REQ ID',
        accessor: 'Req_ID',
      },
    {
      Header: 'SUB STORE',
      accessor: 'Sub_Store',
    },
    {
        Header: 'ITEM_NAME',
        accessor: 'Item_Name',
      },
      {
        Header: 'REQ STOCK QTY',
        accessor: 'Req_Stock_Qty',
      },
      {
        Header: 'AVAIL STOCK QTY',
        accessor: 'Avail_Stock_Qty',
      },
      {
        Header: 'MAIN BAL',
        accessor: 'Main_Bal',
      },
      {
        Header: 'POST ISSUE BAL',
        accessor: 'Post_Issue_Bal',
      },
      {
        Header: 'BASE UNIT TYPE',
        accessor: 'Base_Unit_Type',
      },

      {
        Header: 'UNIT TYPE',
        accessor: 'Unit_Type',
      },

      {
        Header: 'MASTER UNIT TYPE',
        accessor: 'Master_Unit_Type',
      },
      
      {
        Header: 'ISSUE_QTY',
        accessor: 'Issue_Qty',
      },

      {
        Header: 'QTY. TO CLOSURE',
        accessor: 'QTY_TO_CLOSURE',
      },

    // {
    //     Header: ' ',
    //     // accessor: 'CrossIcon',
    //     Cell: (props: any) => {
    //         return (
    //           <>
    //             <div className={styles.tabledataflex}>
    //               <CrossIcon2  fillColor1={colors.red1} />
    //             </div>
    //           </>
    //         )
    //       },
    //   },
  
  
  ]
  


    
  export const mainstoreIssueTableHeaderDataDummyData: any = [
  
     
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
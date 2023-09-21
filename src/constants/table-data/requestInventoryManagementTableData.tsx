
import moment from "moment";
import styles from "../table-data/requestInventoryManagement.module.scss"
import { CalculatorIcon, CrossIcon2 } from "../../components/common/svg-components";
import { colors } from "../color";


export const requestInventoryManagementHeaderData: any = [
    {
      Header: 'ITEM ID',
      accessor: 'Item_ID',
    },
    {
      Header: 'ITEM NAME',
      accessor: 'Item_Name',
    },
    {
      Header: 'REQUEST QTY',
      accessor: 'Request_QTY',
    },
    {
      Header: 'UNIT TYPE',
      accessor: 'Unit_type',
    },
    {
      Header: 'BRANCH STORE',
      accessor: 'Branch_Store',
    },
    {
      Header: 'REQUEST STATUS',
      accessor: 'Request_Status',
    },
    {
      Header: 'AUTHORIZED STATUS',
      accessor: 'Authorized_Status',
      Cell: (props: any) => {
        return (
          <>
            
            <div className={styles.tabledataflex}>
                <div>
              <p className={styles.valueColor}>Entered</p>
              </div>
              <div className={styles.crossiconend}>
              <CrossIcon2  fillColor1={colors.red1} />
              </div>
            </div>
          </>
        )
      },
    }
  
  
  ]
  


    
  export const requestInventoryManagementDummyData: any = [
  
     
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
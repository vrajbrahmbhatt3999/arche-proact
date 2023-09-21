import moment from "moment";
import styles from "../table-data/pharmacyPaymentTable.module.scss"
import { CalculatorIcon, CrossIcon2 } from "../../components/common/svg-components";
import { colors } from "../color";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setCalculatorDialog } from "../../redux/features/treatmentPlans/treatmentPlansSlice";


export const pharmacyPaymentTableHeaderData: any = [
    {
      Header: 'Sr No.',
      accessor: 'srNO_field',
    },
    {
      Header: 'Product',
      accessor: 'product_field',
    },
    {
      Header: 'Qty',
      accessor: 'qty_field',
    },
    {
      Header: 'Sub Qty',
      accessor: 'subQty_field',
    },
    {
      Header: 'Unit Price',
      accessor: 'unitPrice_field',
    },
    {
        Header: () => {
            // const dispatch = useAppDispatch()
            // const { isCalculatorDialogOpen } = useAppSelector(
            //   (state) => state.treatmentPlans
            // )
            return (
              <>
    
                <span className={styles.amountMargin} >AMOUNT (E)</span>
                <CalculatorIcon
                //   handleClick={() =>
                //     dispatch(setCalculatorDialog(!isCalculatorDialogOpen))
                //   }
                />
              </>
            )
          },
      accessor: 'discount_field',
    },
    {
      Header: 'Amount',
      accessor: 'amount_field',
    },
    {
      Header: 'Tax %',
      accessor: 'Tax_field',
      Cell: (props: any) => {
        return (
          <>
            {/* <div className={styles.resultViewContainer}>
              <span className={styles.resultView} onClick={() => props.onClick()}>
                {' '}
                View
              </span>
              <label className={styles.checkboxContainer}>
                <input type="checkbox" className={styles.checkboxField} />
                <span className={styles.checkboxLabel}></span>
              </label>
            </div> */}
            <div className={styles.tabledataflex}>
              <p className={styles.tablecontent}>0.15</p>
              <div className={styles.crossiconend}>
              <CrossIcon2  fillColor1={colors.red1} />
              </div>
            </div>
          </>
        )
      },
    }
  
  
  ]
  

  
  export const pharmacyPaymentTableDummyData: any = [
  
     
      {
        srNO_field: "1",
        product_field: "Aspirin",
        qty_field: "1",
        subQty_field: "0",
        unitPrice_field: "$10",
        discount_field: "0.00",
        expiryDate_field: "23 jan 2024",
        amount_field: "$10",
        Tax_field: "0.15",
        
      },
  
      {
        srNO_field: "1",
        product_field: "Aspirin",
        qty_field: "1",
        subQty_field: "0",
        unitPrice_field: "$10",
        discount_field: "0.00",
        expiryDate_field: "23 jan 2024",
        amount_field: "$10",
        Tax_field: "0.15",
        
      },
    ]
  
  
  
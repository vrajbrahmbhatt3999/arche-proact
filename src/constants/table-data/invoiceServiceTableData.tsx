import { useState, useEffect } from 'react'
import styles from './tableData.module.scss'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { updatedNewServiceArray } from '../../redux/features/invoice-module/invoiceSlice'
import {
  allowedNumberOfDigitsAfterDecimal,
  disableArrowKey,
  disableScroll,
  isServiceEditable,
} from '../../utils/utils'

// invoice service data
export const invoiceServiceHeaderData: any = [
  {
    Header: 'PLAN NAME',
    Cell: ({ row }: any) => {
      const plan_name = row?.original?.plan_name

      return (
        <>
          <span>{plan_name ? plan_name : '-'}</span>
          {/* <span>{'-'}</span> */}
        </>
      )
    },
  },

  {
    Header: 'SERVICE NAME',
    accessor: 'name',
  },
  {
    Header: 'Quantity (E)',
    Cell: ({ row }: any) => {
      const _id = row?.original?._id
      const dispatch = useAppDispatch()

      const { patientInvoiceData, patientDiagnosisServiceData } =
        useAppSelector((state) => state.invoice)
      const [error, setError] = useState('')

      const validateInput = (inputValue: any) => {
        const pattern = /^(?:[1-9]|[1-9][0-9])$/
        return pattern.test(inputValue)
      }

      const handleQuantityChange = (event: any) => {
        const quantity = event.target.value
        // const isValid = validateInput(quantity)
        // if (isValid === false) {
        //   setError('Please enter valid quantity')
        // }
        // if (isValid === true) {
        //   setError('')
        // }

        const updatedData = patientDiagnosisServiceData.map(
          (item: any, index: number) => {
            if (index === Number(row?.id)) {
              return {
                ...item,
                quantity: parseInt(quantity),
              }
            }

            return item
          }
        )

        dispatch(updatedNewServiceArray(updatedData))
      }
      useEffect(() => {
        disableScroll()
      }, [])
      return (
        <>
          <input
            className={styles.inputFieldServiceTable}
            value={row?.original?.quantity}
            type="number"
            key={row.original._id}
            onChange={handleQuantityChange}
            onKeyDown={(e: any) => disableArrowKey(e)}
            onWheel={(e: any) => {
              e.target.blur()
            }}
            disabled={isServiceEditable(patientInvoiceData) ? false : true}
          />
          <p className="dashboardFormError">{error}</p>
        </>
      )
    },
  },
  {
    Header: 'UNIT PRICE (E)',
    Cell: ({ row }: any) => {
      // const _id = row?.original?._id;
      const price = allowedNumberOfDigitsAfterDecimal(
        row?.original?.unitPrice,
        3
      )

      const dispatch = useAppDispatch()
      const { patientDiagnosisServiceData, patientInvoiceData } =
        useAppSelector((state) => state.invoice)
      const [error, setError] = useState('')

      const validateInput = (inputValue: any) => {
        const pattern = /^\d{1,6}(?:\.\d{1,3})?$/
        return pattern.test(inputValue)
      }
      const handleUnitPriceChange = (
        event: React.ChangeEvent<HTMLInputElement>
      ) => {
        const unitPrice = event.target.value
        const isValid = validateInput(unitPrice)
        if (isValid === false) {
          setError('Please enter valid discount')
        }
        if (isValid === true) {
          setError('')
        }
        const updatedData = patientDiagnosisServiceData.map(
          (item: any, index: number) => {
            if (index === Number(row?.id)) {
              return {
                ...item,
                unitPrice: parseFloat(unitPrice),
              }
            }
            return item
          }
        )

        dispatch(updatedNewServiceArray(updatedData))
      }
      useEffect(() => {
        disableScroll()
      }, [])
      return (
        <>
          <input
            className={styles.inputFieldServiceTable}
            value={price}
            type="number"
            key={row.original._id}
            onChange={handleUnitPriceChange}
            onKeyDown={(e: any) => disableArrowKey(e)}
            onWheel={(e: any) => {
              e.target.blur()
            }}
            disabled={isServiceEditable(patientInvoiceData) ? false : true}
          />
          <p className="dashboardFormError">{error}</p>
        </>
      )
    },
  },

  {
    Header: 'AMOUNT',
    Cell: ({ row }: any) => {
      const quantity = row?.original?.quantity
      const unitPrice = row?.original?.unitPrice
      const amountCalculation = quantity * unitPrice
      const amount = allowedNumberOfDigitsAfterDecimal(amountCalculation, 3)
      const [error, setError] = useState('')
      console.log('error netAmount>>>>', amount)

      const validateInput = (inputValue: any) => {
        const pattern = /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/
        return pattern.test(inputValue)
      }
      const handleAmount: any = (amount: any) => {
        const isValid = validateInput(amount)
        console.log('isValid', isValid)
        if (isValid === false) {
          setError('Please enter valid discount')
        }
        if (isValid === true) {
          setError('')
        }
      }
      useEffect(() => {
        handleAmount(amount)
      }, [amount])
      return (
        <>
          {isNaN(amount) ? '-' : <span>${amount?.toLocaleString()}</span>}
          <p className="dashboardFormError">{error}</p>
        </>
      )
    },
  },
  {
    Header: 'APPLY DISCOUNT (E)',
    Cell: ({ row }: any) => {
      const _id = row?.original?._id
      const dispatch = useAppDispatch()
      const { patientDiagnosisServiceData, patientInvoiceData } =
        useAppSelector((state) => state.invoice)
      const [error, setError] = useState('')

      const validateInput = (inputValue: any) => {
        const pattern = /^\d{1,4}(?:\.\d{1,3})?$/
        return pattern.test(inputValue)
      }

      const handleDiscountChange = (event: any) => {
        const discount = event.target.value
        const isValid = validateInput(discount)
        if (isValid === false) {
          setError('Please enter valid discount')
        }
        if (isValid === true) {
          setError('')
        }
        const updatedData = patientDiagnosisServiceData.map(
          (item: any, index: number) => {
            if (index === Number(row?.id)) {
              return {
                ...item,
                discount: parseFloat(discount),
              }
            }
            return item
          }
        )

        dispatch(updatedNewServiceArray(updatedData))
      }
      useEffect(() => {
        disableScroll()
      }, [])
      return (
        <>
          <input
            className={styles.inputFieldServiceTable}
            value={row?.original?.discount}
            type="number"
            key={row.original._id}
            onChange={handleDiscountChange}
            onKeyDown={(e: any) => disableArrowKey(e)}
            onWheel={(e: any) => {
              e.target.blur()
            }}
            disabled={isServiceEditable(patientInvoiceData) ? false : true}
          />
          <p className="dashboardFormError">{error}</p>
        </>
      )
    },
  },
  {
    Header: 'NET. AMOUNT',
    Cell: ({ row }: any) => {
      const quantity = row?.original?.quantity
      const unitPrice = row?.original?.unitPrice
      const discount = row?.original?.discount || 0
      const amount = quantity * unitPrice
      const netAmountCalculation = amount - discount
      const netAmount = allowedNumberOfDigitsAfterDecimal(
        netAmountCalculation,
        3
      )
      const [error, setError] = useState('')
      const validateInput = (inputValue: any) => {
        const pattern = /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/
        return pattern.test(inputValue)
      }
      const handleNetAmount: any = (amount: any) => {
        const isValid = validateInput(amount)
        console.log('isValid', isValid)
        if (isValid === false) {
          setError('Net amount must be positive')
        }
        if (isValid === true) {
          setError('')
        }
      }
      useEffect(() => {
        handleNetAmount(netAmount)
      }, [netAmount])
      return (
        <>
          {isNaN(netAmount) ? '-' : <span>${netAmount?.toLocaleString()}</span>}
          <p className="dashboardFormError">{error}</p>
        </>
      )
    },
  },
  {
    Header: 'RETURN',
    // accessor: "is_return",
    Cell: (props: any) => {
      // console.log("props?.row?.original :>> ", props?.row?.original);
      const typeOfInvoice = typeof props?.row?.original?.is_return
      const { patientInvoiceData } = useAppSelector((state) => state.invoice)
      return (
        <>
          {patientInvoiceData?.status === 'DRAFT' ||
          (patientInvoiceData?.refund_amount == 0 &&
            patientInvoiceData?.is_return === false &&
            patientInvoiceData?.is_refund === false) ? (
            '-'
          ) : typeOfInvoice === 'boolean' ? (
            <span>
              {props?.row?.original?.is_return === true ? 'True' : 'False'}
            </span>
          ) : (
            ''
          )}
        </>
      )
    },
  },
  {
    Header: 'BILLABLE',
    accessor: 'isBillable',
  },
  {
    Header: 'NOTES',
    accessor: 'notes',
    Cell: (props: any) => {
      return (
        <>
          <span
            className={styles.addNotePopupLink}
            onClick={() => props.onClick(props?.row)}
          >
            Add
          </span>
        </>
      )
    },
  },
]

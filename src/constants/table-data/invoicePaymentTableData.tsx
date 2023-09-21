import { useEffect, useState } from 'react'
import styles from './tableData.module.scss'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { updatedNewPaymentAmountArray } from '../../redux/features/invoice-module/invoiceSlice'
import { disableArrowKey, disableScroll } from '../../utils/utils'
import { DeleteIcon } from '../../components/common/svg-components'
import { colors } from '../color'

export const invoicePaymentHeaderData: any = [
  {
    Header: 'PAYMENT MODE',
    accessor: 'payment_label',
  },

  {
    Header: 'AMOUNT (E)',
    Cell: ({ row }: any) => {
      const _id = row?.original?._id
      const dispatch = useAppDispatch()
      const { paymentModeData } = useAppSelector((state) => state.invoice)
      const [error, setError] = useState('')

      const validateInput = (inputValue: any) => {
        const pattern = /^\d{1,6}(?:\.\d{1,3})?$/
        return pattern.test(inputValue)
      }

      const handleAmountChange = (event: any) => {
        const amount = event.target.value
        const isValid = validateInput(amount)
        if (isValid === false) {
          setError('Please enter valid amount')
        }
        if (isValid === true) {
          setError('')
        }
        const updatedData = paymentModeData?.map((item: any) => {
          if (item?._id === row?.original?._id) {
            return {
              ...item,
              amount: parseFloat(amount),
            }
          }
          return item
        })
        dispatch(updatedNewPaymentAmountArray(updatedData))
      }
      useEffect(() => {
        disableScroll()
      }, [])
      return (
        <>
          <input
            className={styles.inputFieldServiceTable}
            value={row?.original?.amount}
            type="number"
            key={row.original._id}
            onChange={handleAmountChange}
            onKeyDown={(e: any) => disableArrowKey(e)}
            onWheel={(e: any) => {
              e.target.blur()
            }}
            disabled={row?.original?.payment_mode === 'upay' ? true : false}
          />
          <p className="dashboardFormError">{error}</p>
        </>
      )
    },
  },

  {
    Header: 'APPROVAL NO.',
    Cell: ({ row }: any) => {
      return (
        <>
          <span>-</span>
        </>
      )
    },
  },

  {
    Header: 'ACTION',
    Cell: ({ row }: any) => {
      const dispatch = useAppDispatch()
      const { paymentModeData } = useAppSelector((state) => state.invoice)
      const handleRemovePaymentMode = (paymentMode: any) => {
        console.log('paymentmode', paymentMode)
        let tempArr: any = []
        tempArr =
          paymentModeData && paymentModeData.length > 0
            ? paymentModeData?.filter((item: any) => {
                return item?._id !== paymentMode?._id
              })
            : []
        dispatch(updatedNewPaymentAmountArray(tempArr))
      }
      return (
        <>
          <DeleteIcon
            fillColor={colors.grey4}
            handleClick={() => handleRemovePaymentMode(row?.original)}
          />
        </>
      )
    },
  },
]

export const invoicePaymentRowData = [
  {
    payment_mode: 'Platinum',
    approval_no: 'Derma',
  },
  {
    payment_mode: 'Platinum',
    approval_no: 'Derma',
  },
]

export const invoicePaymentRowDummyData = [
  {
    payment_mode: '-',
    approval_no: '-',
  },
  {
    payment_mode: '-',
    approval_no: '-',
  },
]

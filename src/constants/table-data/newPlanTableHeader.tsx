import { CheckIcon, UncheckIcon } from '../../components/common/svg-components'
import { useAppDispatch, useAppSelector } from '../../hooks'
import {
  removeSelectedServiceForPlan,
  setSelectedServiceForPlan,
  setSelectedServiceForPlanArr,
  setServicesForPlan,
} from '../../redux/features/treatmentPlans/treatmentPlansSlice'
import { disableArrowKey } from '../../utils/utils'
import { colors } from '../color'
import styles from './tableData.module.scss'

export const newPlanTableHeaderData: any = [
  {
    Header: 'SELECT',
    Cell: ({ row }: any) => {
      const dispatch = useAppDispatch()
      const { selectedServicesForPlan } = useAppSelector(
        (state) => state.treatmentPlans
      )

      const handleInvoiceCheck = (checkType: string) => {
        if (checkType === 'REMOVE') {
          dispatch(removeSelectedServiceForPlan(row?.original))
        } else if (checkType === 'ADD') {
          dispatch(setSelectedServiceForPlan(row?.original))
        }
      }
      return (
        <>
          {row?.original?._id ? (
            selectedServicesForPlan?.some(
              (item: any) => item?._id === row?.original?._id
            ) ? (
              <CheckIcon
                fillColor={colors.green1}
                handleClick={() => handleInvoiceCheck('REMOVE')}
              />
            ) : (
              <UncheckIcon
                fillColor={colors.grey1}
                handleClick={() => handleInvoiceCheck('ADD')}
              />
            )
          ) : (
            '-'
          )}
        </>
      )
    },
  },
  {
    Header: 'SERVICE NAME',
    accessor: 'name',
  },
  {
    Header: 'PRICE',
    accessor: 'price',
    Cell: ({ row }: any) => {
      return <>{row?.original?.price ? `$ ${row?.original?.price}` : '-'}</>
    },
  },
  {
    Header: 'SESSIONS(E)',
    accessor: 'sessions',
    Cell: ({ row }: any) => {
      const dispatch = useAppDispatch()

      const { serviceListData, selectedServicesForPlan } = useAppSelector(
        (state) => state.treatmentPlans
      )
      const handleSesssionChange = (e: any) => {
        const sessions = e.target.value
        let serviceArr: any = []
        let selectedServiceArr: any = []
        serviceArr =
          serviceListData && serviceListData?.length > 0
            ? serviceListData?.map((item: any) => {
                if (row?.original?._id === item?._id) {
                  return {
                    ...item,
                    sessions: sessions,
                    session_amount: sessions
                      ? sessions * item?.price
                      : item?.price,
                  }
                } else {
                  return item
                }
              })
            : []
        selectedServiceArr =
          selectedServicesForPlan && selectedServicesForPlan?.length > 0
            ? selectedServicesForPlan?.map((item: any) => {
                if (row?.original?._id === item?._id) {
                  return {
                    ...item,
                    sessions: sessions,
                    session_amount: sessions
                      ? sessions * item?.price
                      : item?.price,
                  }
                } else {
                  return item
                }
              })
            : []

        dispatch(setServicesForPlan(serviceArr))
        dispatch(setSelectedServiceForPlanArr(selectedServiceArr))
      }
      return (
        <input
          className={styles.inputFieldServiceTable}
          value={row?.original?.sessions}
          type="number"
          key={row.original._id}
          placeholder="sessions"
          onChange={(e) => handleSesssionChange(e)}
          onKeyDown={(e: any) => disableArrowKey(e)}
          onWheel={(e: any) => {
            e.target.blur()
          }}
        />
      )
    },
  },
  {
    Header: 'SERVICE AMOUNT',
    accessor: 'session_amount',
    Cell: ({ row }: any) => {
      return (
        <>
          {row?.original?.session_amount
            ? `$ ${row?.original?.session_amount}`
            : '-'}
        </>
      )
    },
  },
]

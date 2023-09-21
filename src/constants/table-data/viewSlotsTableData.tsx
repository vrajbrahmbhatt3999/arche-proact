import moment from 'moment'
import { CheckIcon, UncheckIcon } from '../../components/common/svg-components'
import { useAppDispatch, useAppSelector } from '../../hooks'
import {
  setAppointmentsSlots,
  setRecurringAppointmentsSlots,
} from '../../redux/features/appointments/bookingAppointmentsSlice'
import { colors } from '../color'

export const viewSlotsTableHeaderData: any = [
  {
    Header: 'Time',
    accessor: 'label',
  },

  {
    Header: 'ACTION',
    // accessor: '',
    Cell: ({ row }: any) => {
      const { availbleSlots } = useAppSelector((state) => state.appointments)
      const dispatch = useAppDispatch()
      const handleSlotsSelection = (slotItem: any) => {
        let tempArr: any = []
        tempArr =
          availbleSlots &&
          availbleSlots?.length > 0 &&
          availbleSlots?.map((item: any) => {
            if (slotItem?.label === item?.label) {
              return { ...item, selected: !item?.selected }
            } else {
              return item
            }
          })
        dispatch(setAppointmentsSlots(tempArr || []))
      }
      return row?.original?.selected ? (
        <CheckIcon
          fillColor={colors.green1}
          handleClick={() => handleSlotsSelection(row?.original)}
        />
      ) : (
        <UncheckIcon
          fillColor={colors.grey1}
          handleClick={() => handleSlotsSelection(row?.original)}
        />
      )
    },
  },
]

export const viewSlotsTableHeaderDataRecurring: any = [
  {
    Header: 'DATE',
    // accessor: 'date',
    Cell: ({ row }: any) => {
      return <>{moment(row?.original?.date).format('DD-MM-YYYY')}</>
    },
  },
  {
    Header: 'DAYS',
    accessor: 'day',
  },
  {
    Header: 'TIME',
    accessor: 'label',
  },
  {
    Header: 'ACTION',
    // accessor: '',
    Cell: ({ row }: any) => {
      const { recurringAvailableSlots } = useAppSelector(
        (state) => state.appointments
      )
      const dispatch = useAppDispatch()
      const handleSlotsSelection = (slotItem: any) => {
        console.log('slot>>', slotItem)
        let tempArr: any = []
        tempArr =
          recurringAvailableSlots &&
          recurringAvailableSlots?.length > 0 &&
          recurringAvailableSlots?.map((item: any) => {
            if (
              slotItem?.label === item?.label &&
              slotItem?.date === item?.date
            ) {
              return { ...item, selected: !item?.selected }
            } else {
              return item
            }
          })
        dispatch(setRecurringAppointmentsSlots(tempArr || []))
      }
      return row?.original?.label === '-' ? (
        '-'
      ) : row?.original?.selected ? (
        <CheckIcon
          fillColor={colors.green1}
          handleClick={() => handleSlotsSelection(row?.original)}
        />
      ) : (
        <UncheckIcon
          fillColor={colors.grey1}
          handleClick={() => handleSlotsSelection(row?.original)}
        />
      )
    },
  },
]

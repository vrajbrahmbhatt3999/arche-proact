import moment from 'moment'
import { onGoingClaimsTypesData } from '../../../constants/data'
import styles from './styles.module.scss'

// Create Jobs Table
export const ongoingClaimsHeaderDataIntiated: any = [
  {
    Header: 'DATE',
    accessor: '_date',
    Cell: (props: any) => {
      const date = new Date()
      return <>{moment(date).format('DD-MMM-yyyy')}</>
    },
  },
  {
    Header: 'INSURANCE COMPANY',
    accessor: 'insurace_company_name',
  },
  {
    Header: 'PATIENT NAME',
    accessor: 'patient_name',
  },
  {
    Header: 'DATE INITIATED',
    accessor: 'date_initiated',
    Cell: (props: any) => {
      return (
        <>
          {props.row.original?.date_initiated
            ? moment(props.row.original?.date_initiated).format('DD-MMM-yyyy')
            : '-'}
        </>
      )
    },
  },
  {
    Header: 'POLICY NO.',
    accessor: 'policy_no',
  },
  {
    Header: 'CLAIM AMOUNT',
    accessor: 'claim_amount',
    Cell: (props: any) => {
      return (
        <>
          {props.row.original?.claim_amount
            ? `$ ${props.row.original?.claim_amount}`
            : '0'}
        </>
      )
    },
  },
  {
    Header: 'STATUS',
    accessor: 'status',
    Cell: (props: any) => {
      return (
        <>
          {props.row.original?.status
            ? onGoingClaimsTypesData[props.row.original?.status]?.status
            : '-'}
        </>
      )
    },
  },
  {
    Header: 'NOTES',
    accessor: 'notes',
    Cell: (props: any) => {
      return (
        <>
          {props.row.original?.notes ? (
            <span
              className={styles.view}
              onClick={() => props.onClick(props.row.original?.notes)}
            >
              View
            </span>
          ) : (
            '-'
          )}
        </>
      )
    },
  },
]
export const ongoingClaimsHeaderDataSettled: any = [
  {
    Header: 'DATE',
    accessor: '_date',
    Cell: (props: any) => {
      const date = new Date()
      return <>{moment(date).format('DD-MMM-yyyy')}</>
    },
  },
  {
    Header: 'INSURANCE COMPANY',
    accessor: 'insurace_company_name',
  },
  {
    Header: 'PATIENT NAME',
    accessor: 'patient_name',
  },
  {
    Header: 'DATE INITIATED',
    accessor: 'date_initiated',
    Cell: (props: any) => {
      return (
        <>
          {props.row.original?.date_initiated
            ? moment(props.row.original?.date_initiated).format('DD-MMM-yyyy')
            : '-'}
        </>
      )
    },
  },
  {
    Header: 'DATE SETTLED',
    accessor: 'settled_date',
    Cell: (props: any) => {
      return (
        <>
          {props.row.original?.settled_date
            ? moment(props.row.original?.settled_date).format('DD-MMM-yyyy')
            : '-'}
        </>
      )
    },
  },
  {
    Header: 'POLICY NO.',
    accessor: 'policy_no',
  },
  {
    Header: 'CLAIM AMOUNT',
    accessor: 'claim_amount',
    Cell: (props: any) => {
      return (
        <>
          {props.row.original?.claim_amount
            ? `$ ${props.row.original?.claim_amount}`
            : '0'}
        </>
      )
    },
  },
  {
    Header: 'SETTLED AMOUNT',
    accessor: 'settled_amount',
    Cell: (props: any) => {
      return (
        <>
          {props.row.original?.settled_amount
            ? `$ ${props.row.original?.settled_amount}`
            : '0'}
        </>
      )
    },
  },
  {
    Header: 'STATUS',
    accessor: 'status',
    Cell: (props: any) => {
      return (
        <>
          {props.row.original?.status
            ? onGoingClaimsTypesData[props.row.original?.status]?.status
            : '-'}
        </>
      )
    },
  },
  {
    Header: 'NOTES',
    accessor: 'notes',
    Cell: (props: any) => {
      return (
        <>
          {props.row.original?.notes ? (
            <span
              className={styles.view}
              onClick={() => props.onClick(props.row.original?.notes)}
            >
              View
            </span>
          ) : (
            '-'
          )}
        </>
      )
    },
  },
]

export const ongoingClaimsHeaderDataRejected: any = [
  {
    Header: 'DATE',
    accessor: '_date',
    Cell: (props: any) => {
      const date = new Date()
      return <>{moment(date).format('DD-MMM-yyyy')}</>
    },
  },
  {
    Header: 'INSURANCE COMPANY',
    accessor: 'insurace_company_name',
  },
  {
    Header: 'PATIENT NAME',
    accessor: 'patient_name',
  },
  {
    Header: 'DATE INITIATED',
    accessor: 'date_initiated',
    Cell: (props: any) => {
      return (
        <>
          {props.row.original?.date_initiated
            ? moment(props.row.original?.date_initiated).format('DD-MMM-yyyy')
            : '-'}
        </>
      )
    },
  },
  {
    Header: 'DATE INITIATED',
    accessor: 'rejected_date',
    Cell: (props: any) => {
      return (
        <>
          {props.row.original?.rejected_date
            ? moment(props.row.original?.rejected_date).format('DD-MMM-yyyy')
            : '-'}
        </>
      )
    },
  },
  {
    Header: 'POLICY NO.',
    accessor: 'policy_no',
  },
  {
    Header: 'CLAIM AMOUNT',
    accessor: 'claim_amount',
    Cell: (props: any) => {
      return (
        <>
          {props.row.original?.claim_amount
            ? `$ ${props.row.original?.claim_amount}`
            : '0'}
        </>
      )
    },
  },
  {
    Header: 'REJCTED AMOUNT',
    accessor: 'rejected_amount',
    Cell: (props: any) => {
      return (
        <>
          {props.row.original?.rejected_amount
            ? `$ ${props.row.original?.rejected_amount}`
            : '0'}
        </>
      )
    },
  },
  {
    Header: 'STATUS',
    accessor: 'status',
    Cell: (props: any) => {
      return (
        <>
          {props.row.original?.status
            ? onGoingClaimsTypesData[props.row.original?.status]?.status
            : '-'}
        </>
      )
    },
  },
  {
    Header: 'NOTES',
    accessor: 'notes',
    Cell: (props: any) => {
      return (
        <>
          {props.row.original?.notes ? (
            <span
              className={styles.view}
              onClick={() => props.onClick(props.row.original?.notes)}
            >
              View
            </span>
          ) : (
            '-'
          )}
        </>
      )
    },
  },
]

export const ongoingClaimsHeaderMatch: any = {
  INITIATED: ongoingClaimsHeaderDataIntiated,
  SETTLED: ongoingClaimsHeaderDataSettled,
  REJECTED: ongoingClaimsHeaderDataRejected,
}

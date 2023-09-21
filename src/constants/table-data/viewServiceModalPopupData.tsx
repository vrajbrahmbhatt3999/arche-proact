import { useState } from 'react'
import styles from './tableData.module.scss'
import Select from 'react-select'
import moment from 'moment'

export const viewServiceModalHeaderData: any = [
  {
    Header: 'SERVICE ID',
    accessor: 'service_no',
    Cell: (props: any) => {
      const planAmount = props?.row?.original?.service_no
      return planAmount ? planAmount : '-'
    },
  },
  {
    Header: 'SERVICE NAME',
    accessor: 'name',
  },
  {
    Header: 'ITEM ID',
    accessor: 'item_no',
    Cell: (props: any) => {
      const planAmount = props?.row?.original?.item_no
      return planAmount ? planAmount : '-'
    },
  },
  {
    Header: 'ITEM NAME',
    accessor: 'item_name',
    Cell: (props: any) => {
      const item_name = props?.row?.original?.item_name
      return item_name ? item_name : '-'
    },
  },
  {
    Header: 'SERVICE PRICE',
    accessor: 'price',
    Cell: (props: any) => {
      const price = props?.row?.original?.price
      return price ? `$ ${price}` : '-'
    },
  },
  {
    Header: 'NO OF SESSIONS',
    accessor: 'sessions',
  },
  {
    Header: 'SERVICE AMOUNT',
    accessor: 'service_amt',
    Cell: (props: any) => {
      const price = props?.row?.original?.price
      const sessions = props?.row?.original?.sessions
      return price && sessions ? `$ ${price * sessions}` : '-'
    },
  },
]

export const viewServiceModalData: any = [
  {
    service_id: 'p_101',
    service_name: 'skin-plan',
    item_name: '$100',
    serv_pc: '',
    no_session: '',
    service_amt: '',
  },
  {
    service_id: 'p_101',
    service_name: 'skin-plan',
    item_name: '$100',
    serv_pc: '',
    no_session: '',
    service_amt: '',
  },
  {
    service_id: 'p_101',
    service_name: 'skin-plan',
    item_name: '$100',
    serv_pc: '',
    no_session: '',
    service_amt: '',
  },
  {
    service_id: 'p_101',
    service_name: 'skin-plan',
    item_name: '$100',
    serv_pc: '',
    no_session: '',
    service_amt: '',
  },
]

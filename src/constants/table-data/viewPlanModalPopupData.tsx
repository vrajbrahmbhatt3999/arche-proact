import { useState, useEffect } from 'react'
import styles from './tableData.module.scss'
import Select from 'react-select'
import moment from 'moment'
import { EditIcon } from '../../components/common/svg-components'
import ToggleSwitchV2 from '../../components/common/toggle-switch/ToggleSwitchV2'
import { useAppDispatch } from '../../hooks'
import { getAllTreatmentServicesStatus } from '../../redux/features/treatmentPlans/treatmentPlansAsyncActions'
import { requestGenerator } from '../../utils/payloadGenerator'

export const viewPlanModalHeaderData: any = [
  {
    Header: 'PLAN ID',
    accessor: 'plan_no',
    Cell: (props: any) => {
      const planNo = props?.row?.original?.plan_no
      return planNo ? planNo : '-'
    },
  },
  {
    Header: 'PLAN NAME',
    accessor: 'name',
  },
  {
    Header: 'SERVICES',
    Cell: (props: any) => {
      return (
        <>
          {props?.row?.original ? (
            <span
              className={styles.blueLinkText}
              onClick={() => {
                props?.onRowClick(props?.row?.original)
              }}
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
  {
    Header: 'PLAN AMOUNT',
    accessor: 'plan_amount',
    Cell: (props: any) => {
      const planAmount = props?.row?.original?.plan_amount
      return planAmount ? `$ ${planAmount}` : '-'
    },
  },
  {
    Header: 'STATUS',
    Cell: ({ row }: any) => {
      const dispatch = useAppDispatch()
      const is_active = row?.original?.is_active

      const handleToggle = (item: any) => {
        const payload = {
          id: item._id,

          data: { is_active: !item.is_active },
        }
        dispatch(getAllTreatmentServicesStatus(requestGenerator(payload)))
      }
      return (
        <ToggleSwitchV2
          isToggled={is_active}
          handleToggle={() => handleToggle(row?.original)}
        />
      )
    },
  },
  {
    Header: 'ACTIONS',
    Cell: (props: any) => {
      return (
        <EditIcon handleClick={() => props?.onClick(props?.row?.original)} />
      )
    },
  },
]

export const viewPlanModalData: any = [
  {
    plan_id: 'p_101',
    plan_name: 'skin-plan',
    // services_: "view",
    plan_amt: '$100',
    _actions: '',
  },
  {
    plan_id: 'p_102',
    plan_name: 'skin-plan',
    // services_: "view",
    plan_amt: '$100',
    _actions: '',
  },
  {
    plan_id: 'p_103',
    plan_name: 'skin-plan',
    // services_: "view",
    plan_amt: '$100',
    _actions: '',
  },
  {
    plan_id: 'p_104',
    plan_name: 'skin-plan',
    // services_: "view",
    plan_amt: '$100',
    _actions: '',
  },
]

import moment from 'moment'

// import styles from "./styles.module.scss";
// import { onGoingClaimsTypesData } from '../data';
import { original } from '@reduxjs/toolkit'
import { EDITICON } from '../mobileAppConfigurationConstant'
import { EditIcon } from '../../components/common/svg-components'
import { useAppDispatch } from '../../hooks'
import ToggleSwitchV2 from '../../components/common/toggle-switch/ToggleSwitchV2'
import { getAllTreatmentServicesStatus } from '../../redux/features/treatmentPlans/treatmentPlansAsyncActions'
import { StatusUpdateServiceAction } from '../../redux/features/patientservices/servicesAsyncActions'
import { requestGenerator } from '../../utils/payloadGenerator'

// Create Jobs Table
export const showallHeaderData: any = [
  {
    Header: 'SERIAL NO.',
    accessor: 'Serial_No.',
    Cell: (props: any) => {
      return <></>
    },
  },
  {
    Header: 'SERVICE ID',
    accessor: 'Service_ID',
    Cell: (props: any) => {
      return <>{props.row.original._id}</>
    },
  },
  {
    Header: 'SERVICE NAME',
    accessor: 'Service_Name',
    Cell: (props: any) => {
      return <>{props?.row?.original?.name}</>
    },
  },

  {
    Header: 'PRICE',
    accessor: 'Price',
    Cell: (props: any) => {
      return <>{props?.row?.original?.metadata?.price}</>
    },
  },
  {
    Header: 'COST',
    accessor: 'Cost',
    Cell: (props: any) => {
      return <>{props?.row?.original?.metadata?.cost}</>
    },
  },
  {
    Header: 'TYPE',
    accessor: 'Type',
    Cell: (props: any) => {
      return <>{props?.row?.original?.service_type}</>
    },
  },
  {
    Header: 'GRP',
    accessor: 'Grp',
    Cell: (props: any) => {
      return (
        <>
          {/* {props.row.original?.status
            ? onGoingClaimsTypesData[props.row.original?.status]?.status
            : "-"} */}
        </>
      )
    },
  },
  {
    Header: 'LOCATION',
    accessor: 'Location',
    Cell: (props: any) => {
      return (
        <>
          {/* {props.row.original?.notes ? (
            <span
              // className={styles.view}
              onClick={() => props.onClick(props.row.original?.notes)}
            >
              View
            </span>
          ) : (
            "-"
          )} */}
        </>
      )
    },
  },
  {
    Header: 'UNIT',
    accessor: 'Unit',
    Cell: (props: any) => {
      return <>{props?.row?.original?.metadata?.unit}</>
    },
  },
  {
    Header: 'SESSION TIME',
    accessor: 'Session_Time',
    Cell: (props: any) => {
      return <>{props?.row?.original?.metadata?.session_time}</>
    },
  },
  {
    Header: 'CHARGEABLE',
    Cell: () => {
      return (
        <select
          style={{
            borderRadius: '6px',
            border: '1px solid #CDD4D8',
            padding: '3px 8px',
            fontSize: '14px',
            color: '#797979',
          }}
        >
          <option value="initiated">initiated</option>
          <option value="initiated">initiated</option>
        </select>
      )
    },
  },
]
export const servicesHeaderData: any = [
  {
    Header: 'SERVICE NO.',
    accessor: 'Serial_No.',
    Cell: (props: any) => {
      return (
        <>
          {props?.row?.original?.service_no ? (
            <span>{props?.row?.original?.service_no}</span>
          ) : (
            '-'
          )}
        </>
      )
    },
  },

  {
    Header: 'USER CODE',
    accessor: 'user_code',
  },

  // {
  //   Header: "SERVICE ID",
  //   accessor: "Service_ID",
  //   Cell: (props: any) => {

  //     return <>{props.row.original._id}</>;
  //   }
  // },
  {
    Header: 'SERVICE NAME',
    accessor: 'Service_Name',
    Cell: (props: any) => {
      return (
        <>
          {props?.row?.original?.name ? (
            <span>{props?.row?.original?.name}</span>
          ) : (
            '-'
          )}
        </>
      )
    },
  },

  {
    Header: 'PRICE',
    accessor: 'Price',
    Cell: (props: any) => {
      // return <>{props?.row?.original?.price}</>;
      return (
        <>
          {props?.row?.original?.price ? (
            <span>{`$ ${props?.row?.original?.price}`}</span>
          ) : (
            '-'
          )}
        </>
      )
    },
  },
  {
    Header: 'COST',
    accessor: 'Cost',
    Cell: (props: any) => {
      return (
        <>
          {props?.row?.original?.cost ? (
            <span>{`$ ${props?.row?.original?.cost}`}</span>
          ) : (
            '-'
          )}
        </>
      )
    },
  },
  // {
  //   Header: "TYPE",
  //   accessor: "Type",
  //   Cell: (props: any) => {
  //     return (
  //       <>
  //         {props?.row?.original?.service_type}
  //       </>
  //     );
  //   },
  // },
  {
    Header: 'GRP',
    accessor: 'Grp',
    Cell: (props: any) => {
      return (
        <>
          {props?.row?.original?.service_type ? (
            <span>{props?.row?.original?.service_type}</span>
          ) : (
            '-'
          )}
        </>
      )
    },
  },
  // {
  //   Header: "LOCATION",
  //   accessor: "Location",
  //   Cell: (props: any) => {
  //     return (
  //       <>
  //         {/* {props.row.original?.notes ? (
  //           <span
  //             // className={styles.view}
  //             onClick={() => props.onClick(props.row.original?.notes)}
  //           >
  //             View
  //           </span>
  //         ) : (
  //           "-"
  //         )} */}
  //       </>
  //     );
  //   },
  // },
  // {
  //   Header: "UNIT",
  //   accessor: "Unit",
  //   Cell: (props: any) => {
  //     return (
  //       <>
  //         {props?.row?.original?.metadata?.unit}
  //       </>
  //     );
  //   },
  // },
  // {
  //   Header: "SESSION TIME",
  //   accessor: "Session_Time",
  //   Cell: (props: any) => {
  //     return (
  //       <>
  //         {props?.row?.original?.metadata?.session_time}
  //       </>
  //     );
  //   },
  // },
  {
    Header: 'SESSION TIME(Min)',
    accessor: 'Session_Time',
    Cell: (props: any) => {
      // return <>{props?.row?.original?.session_time}</>;
      return (
        <>
          {props?.row?.original?.session_time ? (
            <span>{props?.row?.original?.session_time}</span>
          ) : (
            '-'
          )}
        </>
      )
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
        dispatch(StatusUpdateServiceAction(requestGenerator(payload)))
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
    Header: 'ACTION',
    Cell: (props: any) => {
      return (
        <div
          style={{
            display: 'flex',
            gap: '5px',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div>{/* <OpenEyeIcon fillColor={colors.grey4} /> */}</div>
          {/* <div>
          <CrossIcon
            fillColor1={colors.red1}
            fillColor={colors.white1}
            handleClick={() =>
              props.onClick({
                deleteAction: {
                  isDeleteDialogOpen: true,
                  _id: props?.row?.original,
                  // is_active: props?.row?.original?.is_active,
                },
              })
            }
          />
        </div> */}
          <EditIcon
            handleClick={() =>
              props.onClick({
                editAction: {
                  // isLeav: true,
                  data: props?.row?.original,
                  // is_active: props?.row?.original?.is_active,
                },
              })
            }
          />
        </div>
      )
    },
  },
]
export const itemsHeaderData: any = [
  {
    Header: 'SERIAL NO.',
    accessor: 'Serial_No.',
    Cell: (props: any) => {
      return <></>
    },
  },

  {
    Header: 'ITEMS ID',
    accessor: 'Item_ID',
    Cell: (props: any) => {
      return <>{props.row.original._id}</>
    },
  },
  {
    Header: 'ITEMS NAME',
    accessor: 'Item_Name',
    Cell: (props: any) => {
      return <>{props?.row?.original?.name}</>
    },
  },

  {
    Header: 'PRICE',
    accessor: 'Price',
    Cell: (props: any) => {
      return <>{props?.row?.original?.metadata?.price}</>
    },
  },
  {
    Header: 'COST',
    accessor: 'Cost',
    Cell: (props: any) => {
      return <>{props?.row?.original?.metadata?.cost}</>
    },
  },
  {
    Header: 'TYPE',
    accessor: 'Type',
    Cell: (props: any) => {
      return <>{props?.row?.original?.service_type}</>
    },
  },
  {
    Header: 'GRP',
    accessor: 'Grp',
    Cell: (props: any) => {
      return (
        <>
          {/* {props.row.original?.status
            ? onGoingClaimsTypesData[props.row.original?.status]?.status
            : "-"} */}
        </>
      )
    },
  },
  {
    Header: 'LOCATION',
    accessor: 'Location',
    Cell: (props: any) => {
      return (
        <>
          {/* {props.row.original?.notes ? (
            <span
              // className={styles.view}
              onClick={() => props.onClick(props.row.original?.notes)}
            >
              View
            </span>
          ) : (
            "-"
          )} */}
        </>
      )
    },
  },
  {
    Header: 'UNIT',
    accessor: 'Unit',
    Cell: (props: any) => {
      return <>{props?.row?.original?.metadata?.unit}</>
    },
  },
  {
    Header: 'SESSION TIME',
    accessor: 'Session_Time',
    Cell: (props: any) => {
      return <>{props?.row?.original?.metadata?.session_time}</>
    },
  },
  {
    Header: 'CHARGEABLE',
    Cell: () => {
      return (
        <select
          style={{
            borderRadius: '6px',
            border: '1px solid #CDD4D8',
            padding: '3px 8px',
            fontSize: '14px',
            color: '#797979',
          }}
        >
          <option value="initiated">active</option>
          <option value="initiated">initiated</option>
          <option value="initiated">initiated</option>
          <option value="initiated">initiated</option>
        </select>
      )
    },
  },
]

export const ongoingClaimsHeaderMatch: any = {
  INITIATED: showallHeaderData,
  SETTLED: servicesHeaderData,
  REJECTED: itemsHeaderData,
}

// export const ongoingClaimDummyData: any[] = [
//   {
//     _date: "02-jan-2023",
//     _company: "TATA_AIG",
//     patient_name: "Will Smith",
//     date_initiated: "02-jan-2023",
//     policy_no: "#12345",
//     claim_amt: "$1500",
//     _status: "test",
//     _notes: "",
//   },
// ];

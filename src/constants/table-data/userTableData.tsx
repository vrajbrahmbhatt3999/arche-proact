import { useNavigate } from 'react-router-dom'
import { EditIcon } from '../../components/common/svg-components'
import ToggleSwitchV2 from '../../components/common/toggle-switch/ToggleSwitchV2'
import { useAppDispatch } from '../../hooks'
import { colors } from '../color'
import styles from './tableData.module.scss'
import { updateStatusManageUserById } from '../../redux/features/manage-user/ManageUserAsynActions'
import { requestGenerator } from '../../utils/payloadGenerator'
import { allowedNumberOfDigitsAfterDecimal, utcToDate } from '../../utils/utils'
import moment from 'moment'
import { getDoctorById } from '../../redux/features/receptionist/receptionistAsyncActions'

export const userListTableHeaderData: any = [
  // {
  //   Header: 'ID',
  //   accessor: '_id',
  // },
  {
    Header: 'NAME',
    accessor: 'name',
  },
  {
    Header: 'BRANCH',
    aaccessor: 'branches',
    Cell: ({ row }: any) => {
      const branchRow: any = row?.original?.branches
      return branchRow && branchRow.length > 0
        ? branchRow.map((item: any, index: number) => {
            return (
              <div key={`branch-${index}`} className={styles.columnFlex}>
                <span>
                  {index + 1}. {item?.name}
                </span>
              </div>
            )
          })
        : '-'
    },
  },
  {
    Header: 'DEPT',
    aaccessor: 'departments',
    Cell: ({ row }: any) => {
      const departments: any = row?.original?.departments
      return departments && departments.length > 0
        ? departments.map((item: any, index: number) => {
            return (
              <div key={`dept-${index}`} className={styles.columnFlex}>
                <span>
                  {index + 1}. {item?.name}
                </span>
              </div>
            )
          })
        : '-'
    },
  },
  {
    Header: 'SPECIALTIES',
    aaccessor: 'specialities',
    Cell: ({ row }: any) => {
      const specialities: any = row?.original?.specialities
      return specialities && specialities.length > 0
        ? specialities.map((item: any, index: number) => {
            return (
              <div key={`spec-${index}`} className={styles.columnFlex}>
                <span>
                  {index + 1}. {item?.name}
                </span>
              </div>
            )
          })
        : '-'
    },
  },

  {
    Header: 'EMAIL',
    accessor: 'email',
  },
  {
    Header: 'PRIMARY ROLE',
    accessor: 'role_id', //file_no
    Cell: ({ row }: any) => {
      const role = row?.original?.role_id
      return <>{role ? role?.name : '-'}</>
    },
  },
  {
    Header: 'SECONDARY ROLE',
    aaccessor: 'secondary_role',
    Cell: ({ row }: any) => {
      const sec_role: any = row?.original?.secondary_roles
      return sec_role && sec_role.length > 0
        ? sec_role.map((item: any, index: number) => {
            return (
              <div key={`spec-${index}`} className={styles.columnFlex}>
                <span>
                  {index + 1}. {item?.name}
                </span>
              </div>
            )
          })
        : '-'
    },
  },
  {
    Header: 'PHONE NO',
    accessor: 'phone',
  },
  {
    Header: 'NOTES',
    // accessor: 'notes',
    Cell: (props: any) => {
      const notesObject = {
        noteDetail: props?.row?.original?.notes,
        lastUpdateDate: utcToDate(props?.row?.original?.updatedAt),
      }
      // console.log(notesObject);

      return (
        <>
          {notesObject?.noteDetail ? (
            <span
              className={styles.view}
              onClick={() => props.onClick(notesObject)}
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
    Header: 'STATUS',
    Cell: ({ row }: any) => {
      const is_active = row?.original?.is_active
      const dispatch = useAppDispatch()

      const handleToggle = (item: any) => {
        const payload = {
          id: item._id,
          data: { is_active: !item.is_active },
        }
        dispatch(updateStatusManageUserById(requestGenerator(payload)))
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
    Cell: ({ row }: any) => {
      const navigate = useNavigate()
      const dispatch = useAppDispatch()

      const handleEdit = (item: any) => {
        // dispatch(getEditUserData(row.original));
        navigate('/manageusers/createusers/primary', {
          state: { user: item },
        })
      }
      return (
        <EditIcon
          fillColor={colors.grey4}
          handleClick={() => handleEdit(row?.original)}
        />
      )
    },
  },
]

// patient EMR: searchModalHeaderData
export const searchModalHeaderData: any = [
  {
    Header: 'FILE NO.',
    accessor: 'emr_no', //file_no
    Cell: ({ row, onPopClose, onRowClick, invoiceFlag }: any) => {
      const objectId = row?.original
      return (
        <span
          onClick={() => {
            onRowClick(row?.original)
          }}
          style={{ cursor: 'pointer', color: '#0e26a3' }}
        >
          {objectId?.emr_no}
        </span>
      )
    },
  },
  {
    Header: 'PATIENT NAME',
    accessor: 'patient_name',
  },

  {
    Header: 'NATIONAL ID',
    accessor: 'national_id',
  },
  {
    Header: 'MOBILE',
    accessor: 'phone',
  },
]

// invoice: doctorModalHeaderData
export const doctorModalHeaderData: any = [
  {
    Header: 'DOCTOR NAME',
    Cell: ({ row, onPopClose, onRowClick, invoiceFlag }: any) => {
      const objectId = row?.original
      const dispatch = useAppDispatch()
      onRowClick = (item: any) => {
        let dataPayload = {
          id: item,
        }
        dispatch(getDoctorById(requestGenerator(dataPayload))).then((e) => {
          if (e.type === 'receptionist/getAllDoctorListById/fulfilled') {
            onPopClose(false)
          }
        })
      }
      return (
        <span
          onClick={() => {
            onRowClick(row?.original?._id)
          }}
          style={{ cursor: 'pointer', color: '#0e26a3' }}
        >
          {objectId?.doctor_name}
        </span>
      )
    },
  },

  {
    Header: 'MOBILE',
    accessor: 'doctor_phone',
  },
]

// invoice: addInsuranceHeaderData
export const addInsuranceHeaderData: any = [
  {
    Header: 'ID',
    accessor: 'plan_id',
  },
  {
    Header: 'INSURANCE PLAN',
    accessor: 'insurance_plan',
  },
  {
    Header: 'EXPIRY DATE',
    Cell: ({ row }: any) => {
      const originalDate = row?.original?.expiry_date
      const formattedDate = moment(originalDate).format('DD MMM YYYY')
      return <>{formattedDate}</>
    },
  },
  {
    Header: 'POLICY NO',
    accessor: 'policy_no',
  },
  {
    Header: 'DETAILS',
    Cell: (props: any) => {
      return (
        <>
          {props?.row?.original?.details?.length ? (
            <span
              className={styles.viewPopupLink}
              onClick={() => {
                props?.onOpen(props?.row?.original)
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
    Header: 'COPAY %',
    accessor: 'coPay',
  },
  {
    Header: 'NOTES',
    Cell: (props: any) => {
      return (
        <>
          {props?.row?.original?.notes ? (
            <span
              className={styles.viewPopupLink}
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
]

// invoice: settledInvoiceHeaderData
export const settledInvoiceHeaderData: any = [
  {
    Header: 'PATIENT NAME',
    accessor: 'patient_name',
    Cell: ({ row }: any) => {
      return (
        <>{row?.original?.patient_name ? row?.original?.patient_name : '-'}</>
      )
    },
  },
  {
    Header: 'INVOICE NO.',
    accessor: 'invoice_no',
    Cell: ({ row }: any) => {
      return row?.original?.invoice_no
        ? String(row?.original?.invoice_no).padStart(6, '0')
        : '-'
    },
  },

  {
    Header: 'INVOICE DATE',
    Cell: ({ row }: any) => {
      const originalDate = row?.original?.createdAt
      // const formattedDate = moment(originalDate).utc().format("DD-MM-YYYY");
      const formattedDate = originalDate
        ? moment(originalDate).format('DD MMM YYYY')
        : '-'
      return <>{formattedDate}</>
    },
  },
  {
    Header: 'INVOICE AMOUNT',
    // accessor: 'paid_amount',
    Cell: ({ row }: any) => {
      const objectPaidAmount = allowedNumberOfDigitsAfterDecimal(
        row?.original?.paid_amount,
        3
      )
      return (
        <>
          <span style={{ cursor: 'pointer', color: '#0e26a3' }}>
            {objectPaidAmount ? objectPaidAmount : '0.000'}
          </span>
        </>
      )
    },
  },
  {
    Header: 'AMOUNT RECEIVED',
    // accessor: "paid_amount",
    Cell: ({ row }: any) => {
      const objectReceivedAmount = allowedNumberOfDigitsAfterDecimal(
        row?.original?.paid_amount,
        3
      )
      return (
        <>
          <span style={{ cursor: 'pointer', color: '#0e26a3' }}>
            {objectReceivedAmount ? objectReceivedAmount : '0.000'}
          </span>
        </>
      )
    },
  },
  {
    Header: 'SETTLED INVOICES',
    Cell: ({ row, onPopClose, onRowClick }: any) => {
      return (
        <>
          <span
            // onClick={() => {
            //   onRowClick(row?.original);
            // }}
            style={{ cursor: 'pointer', color: '#0e26a3' }}
          >
            View
          </span>
        </>
      )
    },
  },
]

export const settledInvoiceHeaderDataV1: any = [
  {
    Header: 'INVOICE NO.',
    accessor: 'invoice_no',
  },

  {
    Header: 'INVOICE DATE',
    Cell: ({ row }: any) => {
      const originalDate = row?.original?.generate_date
      const formattedDate = moment(originalDate).format('DD MMM YYYY')
      return <>{formattedDate}</>
    },
  },
  {
    Header: 'INVOICE AMOUNT',
    accessor: 'paid_amount',
  },
  {
    Header: 'AMOUNT RECEIVED',
    Cell: ({ row, onPopClose, onRowClick }: any) => {
      const objectId = row?.original
      return (
        <>
          <span
            // onClick={() => {
            //   onRowClick(row?.original);
            // }}
            style={{ cursor: 'pointer', color: '#0e26a3' }}
          >
            {objectId?.paid_amount}
          </span>
        </>
      )
    },
  },
  {
    Header: 'SETTLED INVOICES',
    Cell: ({ row, onPopClose, onRowClick }: any) => {
      return (
        <>
          <span
            // onClick={() => {
            //   onRowClick(row?.original);
            // }}
            style={{ cursor: 'pointer', color: '#0e26a3' }}
          >
            View
          </span>
        </>
      )
    },
  },
]

import moment from 'moment'
import { useNavigate } from 'react-router'
import StatusDropdown from '../../components/common/status-dropdown/StatusDropdown'
import styles from './tableData.module.scss'
import { useAppDispatch } from '../../hooks'
import { requestGenerator } from '../../utils/payloadGenerator'
import { getPatientEmrById } from '../../redux/features/patient-emr/patient/patientAsyncAction'
import { success, warning } from '../data'
import { setMessage } from '../../redux/features/toast/toastSlice'
import { failure } from '../data'

export const viewAppointmentPopupData: any = [
  {
    Header: 'FILE NO.',
    Cell: ({ row, onPopClose }: any) => {
      // console.log("onPopClose", onPopClose);
      // console.log("row", row?.original);
      const objectId = row?.original
      const dispatch = useAppDispatch()
      const navigate = useNavigate()
      const handleEmrRecord = (item: any) => {
        let dataPayload = {
          id: item,
        }
        dispatch(getPatientEmrById(requestGenerator(dataPayload))).then(
          (e: any) => {
            // console.log("eeeeeee", e);
            if (e.type === 'patient/getPatientEmrById/fulfilled') {
              navigate('/patientemr')
              onPopClose(false)
            } else {
              let toastData = {
                message: e?.payload,
                type: failure,
              }
              dispatch(setMessage(toastData))
            }
          }
        )
        console.log('objectId?.pnt_emr_no', objectId?.pnt_emr_no)
      }
      return (
        <span
          onClick={() =>
            objectId?.pnt_emr_no
              ? handleEmrRecord(row?.original?.patient_id)
              : {}
          }
          style={{ cursor: 'pointer', color: '#0e26a3' }}
        >
          {objectId?.pnt_emr_no ? objectId?.pnt_emr_no : '-'}
        </span>
      )
    },
  },
  {
    Header: 'DATE',
    accessor: 'appointment_date',
  },
  {
    Header: 'PATIENT',
    accessor: 'pnt_user_name',
  },
  {
    Header: 'MOBILE NO.',
    accessor: 'pnt_user_phone',
  },
  {
    Header: 'DOCTOR',
    accessor: 'dct_user_name',
  },
  {
    Header: 'STATUS',
    Cell: ({ row }: any) => {
      let appointment_id = row?.original?._id
      return (
        <>
          <StatusDropdown
            appointmentStatus={row?.original?.status}
            appointment_id={appointment_id}
          />
        </>
      )
    },
  },
  {
    Header: 'TIME IN',
    accessor: 'time_in',
    Cell: ({ row }: any) => {
      let appointment_time = row?.original?.time_in
      return <p>{appointment_time}</p>
    },
  },
  {
    Header: 'TIME OUT',
    Cell: ({ row }: any) => {
      let appointment_time = row?.original?.time_in
      let time_duration = row?.original?.time_duration

      let addTime = moment(appointment_time, 'HH:mm')
      let timeOut = addTime.add(time_duration, 'minutes').format('HH:mm')

      return <p>{timeOut}</p>
    },
  },
]

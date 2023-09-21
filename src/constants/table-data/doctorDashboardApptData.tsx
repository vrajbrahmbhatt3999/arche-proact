import { useNavigate } from 'react-router-dom'
import styles from './tableData.module.scss'
import { useAppDispatch } from '../../hooks'
import { getPatientEmrById } from '../../redux/features/patient-emr/patient/patientAsyncAction'
import { requestGenerator } from '../../utils/payloadGenerator'
import StatusDropdownV2 from '../../components/common/status-dropdown/status-dropdown-V2/StatusDropdownV2'
import { DiagnosPlayIcon } from '../../components/common/svg-components'
import moment from 'moment'
import { DiagnosPauseIcon } from '../../components/common/svg-components'
import { colors } from '../color'
import { DiagnosCheckIcon } from '../../components/common/svg-components'
import { markStage } from '../../redux/features/diagnosis/diagnosisAsyncActions'
import { appointmentTypes } from '../data'

export const doctorAppointmentHeaderData: any = [
  {
    Header: 'DATE',
    // accessor: "appointment_date",
    Cell: ({ row }: any) => {
      const originalDate = row?.original?.appointment_date
      const formattedDate = moment(originalDate).format('DD MMM YYYY')
      return <>{formattedDate}</>
    },
  },
  {
    Header: 'FILE NO.',
    accessor: 'patient_emr_number',

    Cell: ({ row }: any) => {
      const objectId = row?.original
      const dispatch = useAppDispatch()
      const navigate = useNavigate()
      const handleEmrRecord = (item: any) => {
        let dataPayload = {
          id: item,
        }
        dispatch(getPatientEmrById(requestGenerator(dataPayload))).then((e) => {
          if (e.type === 'patient/getPatientEmrById/fulfilled') {
            navigate('/patientemr')
          }
        })
        console.log('dataPayload', dataPayload)
      }
      return (
        <span
          onClick={() =>
            objectId?.patient_emr_number
              ? handleEmrRecord(row?.original?.patient_id)
              : {}
          }
          style={{ cursor: 'pointer', color: '#0e26a3' }}
        >
          {objectId?.patient_emr_number ? objectId?.patient_emr_number : '-'}
        </span>
      )
    },
  },
  {
    Header: 'TYPE',
    accessor: 'appointment_type',
  },

  {
    Header: 'PATIENT',
    accessor: 'patient_name',
  },
  {
    Header: 'MOBILE NO.',
    accessor: 'patient_phone_number',
  },

  {
    Header: 'TIME',
    accessor: 'time_in',
    Cell: ({ row }: any) => (
      <span className={styles.custom_column}>{row?.original?.time_in}</span>
    ),
  },
  {
    Header: 'STATUS',
    Cell: ({ row }: any) => {
      let appointment_id = row?.original?._id
      return (
        <>
          <StatusDropdownV2
            appointmentStatus={row?.original?.status}
            appointment_id={appointment_id}
          />
        </>
      )
    },
  },

  {
    Header: 'INVOICE',

    Cell: ({ row }: any) => {
      return (
        <>
          {row?.original?.invoice_status ? (
            <span
              className={styles[row?.original?.invoice_status]}
              style={{ cursor: 'default' }}
              // onClick={() => handleInvoice(row?.original)}
            >
              {row?.original?.invoice_status}
            </span>
          ) : (
            '-'
          )}
        </>
      )
    },
  },
  {
    Header: 'DOCTOR DIAGNOSIS',
    Cell: ({ row }: any) => {
      const patient_diagnosis_id = row?.original?.diagnosis_id
      const dispatch = useAppDispatch()
      const navigate = useNavigate()
      // const currentDate = new Date();
      // const localTime = moment(currentDate);
      // const utcTime = localTime
      //   .utc()
      //   .format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");

      // console.log("currentDate>>>>>>>>>>>>>", currentDate);
      // console.log("utcTime?>>>>>>>>>>>", utcTime);

      const handleEdit = (item: any) => {
        if (
          row?.original?.status === 'CANCELLED' ||
          row?.original?.status === 'WAITINGLIST' ||
          row?.original?.status === 'NOSHOW' ||
          !row?.original.patient_emr_number ||
          appointmentTypes.includes(row?.original?.appointment_type)
        ) {
          return null
        } else {
          navigate('/patientdiagnosis/diagnosis', {
            state: { user: item },
          })
        }
      }

      // const handleDiagnosisStatus = () => {
      //   let reqData = {
      //     diagnosis_id: patient_diagnosis_id,
      //     diagnosis_stage: "S",
      //   };
      //   dispatch(markStage(requestGenerator(reqData))).then((e) => {
      //     if (e.type === "diagnosis/markStage/fulfilled") {
      //       navigate("/patientdiagnosis/diagnosis");
      //     }
      //   });
      // };
      return (
        <>
          {row?.original?.diagnosis_stage === 'NS' ? (
            <DiagnosPlayIcon
              fillColor={
                row?.original?.status === 'CANCELLED' ||
                row?.original?.status === 'WAITINGLIST' ||
                row?.original?.status === 'NOSHOW' ||
                !row?.original.patient_emr_number ||
                appointmentTypes.includes(row?.original?.appointment_type)
                  ? '#797979'
                  : '#02BF90'
              }
              style={{
                cursor:
                  row?.original?.status === 'CANCELLED' ||
                  row?.original?.status === 'WAITINGLIST' ||
                  row?.original?.status === 'NOSHOW' ||
                  !row?.original.patient_emr_number ||
                  appointmentTypes.includes(row?.original?.appointment_type)
                    ? 'initial'
                    : 'pointer',
              }}
              handleClick={() => {
                // if (utcTime) {
                const currentDate = new Date()
                const rowDate = new Date(row?.original?.appointment_date)
                if (currentDate.toDateString() === rowDate.toDateString()) {
                  handleEdit(row?.original)
                }
                // }
              }}
            />
          ) : row?.original?.diagnosis_stage === 'S' ? (
            <DiagnosPauseIcon
              fillColor="#FFA009"
              handleClick={() => handleEdit(row?.original)}
            />
          ) : row?.original?.diagnosis_stage === 'E' ? (
            <DiagnosCheckIcon fillColor="#5936F1" />
          ) : (
            ''
          )}
        </>
      )
    },
  },
]

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PrescriptionPopup from '../../components/common/modal/prescription-popup/PrescriptionPopup'
import StatusDropdown from '../../components/common/status-dropdown/StatusDropdown'
import styles from './tableData.module.scss'
import { useAppDispatch } from '../../hooks'
import { getPatientEmrById } from '../../redux/features/patient-emr/patient/patientAsyncAction'
import { requestGenerator } from '../../utils/payloadGenerator'
import { getLastInvoice } from '../../redux/features/invoice-module/invoiceAsynActions'
import { setPatientData } from '../../redux/features/invoice-module/invoiceSlice'

export const todayAppointmentHeaderData: any = [
  {
    Header: 'FILE NO.',
    accessor: 'patient_emr_no',
    // Cell: ({ row }: any) => {
    //   const navigate = useNavigate();
    //   console.log("row", row?.original);
    //   return (
    //     <p
    //       className={styles.viewLink}
    //       onClick={() =>
    //         navigate("/patientemr", {
    //           state: { id: row?.original?.patient_id },
    //         })
    //       }
    //     >
    //       {row?.original?.patient_emr_no}
    //     </p>
    //   );
    // },
    Cell: ({ row }: any) => {
      // console.log("row", row?.original);
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
      }
      return (
        <span
          onClick={() =>
            objectId?.patient_emr_no
              ? handleEmrRecord(row?.original?.patient_id)
              : {}
          }
          style={{ cursor: 'pointer', color: '#0e26a3' }}
        >
          {/* {objectId?.emr_no} */}
          {objectId?.patient_emr_no ? objectId?.patient_emr_no : '-'}
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
    accessor: 'patinet_phone',
  },
  {
    Header: 'DOCTOR NAME',
    accessor: 'doctor_name',
  },
  {
    Header: 'TIME',
    accessor: 'appointment_time',
  },
  {
    Header: 'STATUS',
    Cell: ({ row }: any) => {
      let appointment_id = row?.original?.appointment_id
      // console.log("row?.original?.status", row?.original?.status);
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
    Header: 'INSURANCE',
    Cell: ({ row }: any) => {
      const dispatch = useAppDispatch()
      const navigate = useNavigate()
      const handleInvoice = (patientAppt: any) => {
        let invoiceDataPayload = {
          patient_id: patientAppt?.patient_id,
          type: 'DIAGNOSIS',
          diagnosis_id: patientAppt?.diagnosis_id
            ? patientAppt?.diagnosis_id
            : null,
        }
        dispatch(getLastInvoice(requestGenerator(invoiceDataPayload))).then(
          (e) => {
            if (e.type === 'invoice/getLastInvoice/fulfilled') {
              // setModelOpenClose(false)
              navigate('/invoice/information')

              if (e.payload) {
                dispatch(setPatientData(e.payload))
              } else {
                handlePatientEmrData(patientAppt)
              }
            }
          }
        )
      }
      const handlePatientEmrData = (item: any) => {
        let dataPayload = {
          id: item?.patient_id,
        }

        dispatch(getPatientEmrById(requestGenerator(dataPayload))).then((e) => {
          if (e.type === 'patient/getPatientEmrById/fulfilled') {
            // console.log(e.payload, 'e.payload')

            const patientObject = {
              _id: null,
              status: 'DRAFT',
              diagnosis_services: [],
              patient_id: e?.payload?._id,
              paid_amount: 0,
              total_amount: 0,
              outstanding_amount: 0,
              discount: 0,
              insurance_claim_amount: 0,
              lab_tests: [],
              radiology_tests: [],
              pharmacy_services: [],
              patient_default_branch_id: e?.payload?.patient_default_branch_id
                ? e?.payload?.patient_default_branch_id
                : '',
              emr_no: e?.payload?.emr_no,
              name: e?.payload?.name,
              advance_amount: e?.payload?.advance_amount
                ? e?.payload?.advance_amount
                : 0,
              patient_primary_Doctor: '',
              phone: e?.payload?.phone,
              profile_pic: e?.payload?.patient_pic
                ? e?.payload?.patient_pic
                : '',
              national_id: e?.payload?.national_id
                ? e?.payload?.national_id
                : '',
              email: e?.payload?.email ? e?.payload?.email : '',
            }
            dispatch(setPatientData(patientObject))
          }
        })
      }
      return row?.original?.insurance_status ? (
        <span
          className={styles[row?.original?.insurance_status]}
          onClick={() =>
            row?.original?.insurance_status === 'PENDING'
              ? handleInvoice(row?.original)
              : {}
          }
        >
          {row?.original?.insurance_status}
        </span>
      ) : (
        '-'
      )
    },
  },
  {
    Header: 'PRESCRIPTION',
    Cell: (props: any) => {
      const prescriptionInfo = {
        noteDetail: props?.row?.original?.problem_description,
      }
      const [prescription, setPrescription] = useState<boolean>(false)
      return <p>-</p>
    },
  },
  {
    Header: 'INVOICE',
    Cell: ({ row }: any) => {
      const navigate = useNavigate()
      const dispatch = useAppDispatch()
      const handleInvoice = (patientAppt: any) => {
        let invoiceDataPayload = {
          patient_id: patientAppt?.patient_id,
          type: 'DIAGNOSIS',
          diagnosis_id: patientAppt?.diagnosis_id
            ? patientAppt?.diagnosis_id
            : null,
        }
        dispatch(getLastInvoice(requestGenerator(invoiceDataPayload))).then(
          (e) => {
            if (e.type === 'invoice/getLastInvoice/fulfilled') {
              // setModelOpenClose(false)
              navigate('/invoice/information')

              if (e.payload) {
                dispatch(setPatientData(e.payload))
              } else {
                handlePatientEmrData(patientAppt)
              }
            }
          }
        )
      }
      const handlePatientEmrData = (item: any) => {
        let dataPayload = {
          id: item?.patient_id,
        }

        dispatch(getPatientEmrById(requestGenerator(dataPayload))).then((e) => {
          if (e.type === 'patient/getPatientEmrById/fulfilled') {
            // console.log(e.payload, 'e.payload')

            const patientObject = {
              _id: null,
              status: 'DRAFT',
              diagnosis_services: [],
              patient_id: e?.payload?._id,
              paid_amount: 0,
              total_amount: 0,
              outstanding_amount: 0,
              discount: 0,
              insurance_claim_amount: 0,
              lab_tests: [],
              radiology_tests: [],
              pharmacy_services: [],
              patient_default_branch_id: e?.payload?.patient_default_branch_id
                ? e?.payload?.patient_default_branch_id
                : '',
              emr_no: e?.payload?.emr_no,
              name: e?.payload?.name,
              advance_amount: e?.payload?.advance_amount
                ? e?.payload?.advance_amount
                : 0,
              patient_primary_Doctor: '',
              phone: e?.payload?.phone,
              profile_pic: e?.payload?.patient_pic
                ? e?.payload?.patient_pic
                : '',
              national_id: e?.payload?.national_id
                ? e?.payload?.national_id
                : '',
              email: e?.payload?.email ? e?.payload?.email : '',
            }
            dispatch(setPatientData(patientObject))
          }
        })
      }
      return row?.original?.invoice_status ? (
        <span
          className={styles[row?.original?.invoice_status]}
          onClick={() =>
            row?.original?.invoice_status === 'PENDING'
              ? handleInvoice(row?.original)
              : {}
          }
        >
          {row?.original?.invoice_status}
        </span>
      ) : (
        '-'
      )
    },
  },
]

//  <>
//    {prescriptionInfo?.noteDetail?.length > 0 ? (
//      <>
//        {prescription && (
//          <Popup
//            Children={PrescriptionPopup}
//            handleClose={() => setPrescription(false)}
//            popData={prescriptionInfo}
//          />
//        )}
//        <p
//          className={styles.viewLink}
//          onClick={() => setPrescription(!prescription)}
//        >
//          View
//        </p>
//      </>
//    ) : (
//      <p>-</p>
//    )}
//  </>;

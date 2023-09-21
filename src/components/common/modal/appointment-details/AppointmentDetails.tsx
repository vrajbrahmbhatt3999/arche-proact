import { FC } from 'react'
import styles from './appointmendDetails.module.scss'
import { CloseIcon } from '../../svg-components'
import { colors } from '../../../../constants/color'
import { useEffect, useState } from 'react'
import { useAppSelector } from '../../../../hooks'
import Button from '../../button/Button'
import moment from 'moment'

interface IAppointmentDetailsProps {
  popData: any
  handleClose?: any
  handleOpen?: any
}

const AppointmentDetails: FC<IAppointmentDetailsProps> = ({
  popData,
  handleClose,
  handleOpen,
}) => {
  console.log('popup data>>', popData)
  const { doctorData } = useAppSelector((state) => state.appointments)
  const [doctorName, setDoctorName] = useState<string>('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  useEffect(() => {
    if (popData?.apptData?._id) {
      const doctor = doctorData?.find(
        (item: any) => item?._id === popData?.apptData?._id
      )
      setDoctorName(`Dr. ${doctor?.doctor_name}` || '')
    }
  }, [doctorData])
  useEffect(() => {
    if (popData?.apptData) {
      const startDate = new Date(popData?.apptData?.dateStart)

      const startHour =
        startDate.getHours() < 10 && startDate.getHours() >= 1
          ? `0${startDate.getHours()}`
          : startDate.getHours()
      const startMin: any = startDate.getMinutes() || '00'
      setStartTime(
        `${startHour}:${
          startMin < 10 && startMin >= 1 ? `0${startMin}` : startMin
        }`
      )
      const endDate = new Date(popData?.apptData?.dateEnd)
      const endHour =
        endDate.getHours() < 10 ? `0${endDate.getHours()}` : endDate.getHours()
      const endMin: any = endDate.getMinutes() || '00'
      setEndTime(
        `${endHour}:${endMin < 10 && endMin >= 1 ? `0${endMin}` : endMin}`
      )
    }
  }, [popData?.apptData])
  console.log('status>>', popData?.apptData?.appt_status)
  return (
    <div
      className={styles.appointmentDetailsContainer}
      onClick={(e) => {
        e.stopPropagation()
      }}
    >
      <CloseIcon
        customClass={styles.closeIconStyle}
        fillColor={colors.green1}
        handleClick={() => {
          handleClose && handleClose()
        }}
      />
      <h1 className={styles.appointmentDetailsHeading}>
        {popData?.apptData?.appt_status === 'PENDING'
          ? 'Request'
          : 'Appointment'}{' '}
        Details
      </h1>
      <hr className={styles.appointmentDetailsDivider} />
      <div className={styles.mainDetailsContainer}>
        <div className={styles.detailsRow}>
          <span className={styles.detailsLabel}>Patient:</span>
          <span className={styles.detailsValue}>
            {popData?.apptData?.patient_name ?? '-'}
          </span>
        </div>
        <div className={styles.detailsRow}>
          <span className={styles.detailsLabel}>File No:</span>
          <span className={styles.detailsValue}>
            {popData?.apptData?.file_no ?? '-'}
          </span>
        </div>
        <div className={styles.detailsRow}>
          <span className={styles.detailsLabel}>Contact:</span>
          <span className={styles.detailsValue}>
            {popData?.apptData?.patient_phone ?? '-'}
          </span>
        </div>
        <div className={styles.detailsRow}>
          <span className={styles.detailsLabel}>Doctor:</span>
          <span className={styles.detailsValue}>{doctorName ?? '-'}</span>
        </div>
        <div className={styles.detailsRow}>
          <span className={styles.detailsLabel}>Time:</span>
          <span className={styles.detailsValue}>
            {startTime} to {endTime}
          </span>
        </div>
        <div className={styles.detailsRow}>
          <span className={styles.detailsLabel}>Date:</span>
          <span className={styles.detailsValue}>
            {popData?.apptData?.appointment_date
              ? moment(popData?.apptData?.appointment_date).format('DD/MM/YYYY')
              : '-'}
          </span>
        </div>
        <div className={styles.detailsRow}>
          <span className={styles.detailsLabel}>Status:</span>
          <span className={styles.detailsValue}>
          {popData?.apptData?.appt_status?? '-'}
          </span>
        </div>
        <div className={styles.detailsRow}>
          <span className={styles.detailsLabel}>Notes:</span>
          <span className={styles.detailsValue}>
            {popData?.apptData?.problem_description ?? '-'}
          </span>
        </div>
        <div className={styles.buttonContainer}>
          <Button title="Ok" handleClick={() => handleClose()} />
          <Button
            title="Cancel Appointment"
            handleClick={() => handleOpen(popData)}
            customClass={styles.cancelButton}
            disable={
              popData?.apptData?.appt_status === 'CANCELLED'
                ? true
                : popData?.apptData?.appt_status === 'COMPLETED'
                ? true
                : false
            }
          />
        </div>
      </div>
    </div>
  )
}
export default AppointmentDetails

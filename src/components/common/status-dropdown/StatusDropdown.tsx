import { FC, useState, useEffect, useRef } from 'react'
import { colors } from '../../../constants/color'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import {
  getAllPatientAppointment,
  getAllTodayPatient,
  updateAppointmentStatus,
} from '../../../redux/features/appointment/appointmentAsyncActions'
import { requestGenerator } from '../../../utils/payloadGenerator'
import { DropDownIcon } from '../svg-components'
import styles from './statusDropdown.module.scss'

interface IStatusDropdown {
  appointmentStatus?: any
  appointment_id?: any
}

const StatusDropdown: FC<IStatusDropdown> = ({
  appointmentStatus,
  appointment_id,
}) => {
  const [showOption, setShowOption] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const [statusValue, setStatusValue] = useState<any>()
  const { todayAppointmentData } = useAppSelector((state) => state.appointment)
  const statusRef = useRef<any>()

  useEffect(() => {
    setStatusValue({
      value: appointmentStatus && appointmentStatus,
      class:
        appointmentStatus && appointmentStatus.toLowerCase() === 'arrived(crm)'
          ? 'arrivedCrm'
          : appointmentStatus && appointmentStatus.toLowerCase(),
    })
  }, [appointmentStatus])

  // function for close dropdown
  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (
        showOption &&
        statusRef.current &&
        !statusRef.current.contains(e.target)
      ) {
        setShowOption(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside)
    }
  }, [showOption])

  const { patientBranchList } = useAppSelector((state) => state.patient)
  let branche = patientBranchList?.branches

  let branch_id = branche && branche.length > 0 && branche[0]?._id

  const arr = statusValue?.value?.split(' ')

  for (var i = 0; i < arr?.length; i++) {
    arr[i] = arr[i]?.charAt(0)?.toUpperCase() + arr[i]?.slice(1)
  }

  let optionData = [
    {
      value: 'PENDING',
      class: 'pending',
    },
    {
      value: 'SCHEDULED',
      class: 'scheduled',
    },
    {
      value: 'INPROGRESS',
      class: 'inprogress',
    },
    {
      value: 'COMPLETED',
      class: 'completed',
    },
    {
      value: 'CANCELLED',
      class: 'cancelled',
    },
    {
      value: 'ARRIVED',
      class: 'arrived',
    },
    {
      value: 'ARRIVED(CRM)',
      class: 'arrivedCrm',
    },
    {
      value: 'NOSHOW',
      class: 'noshow',
    },
    {
      value: 'RESCHEDULED',
      class: 'rescheduled',
    },
    {
      value: 'WAITINGLIST',
      class: 'waitinglist',
    },
    // {
    //   value: 'DELETED',
    //   class: 'deleted',
    // },
    // {
    //   value: 'CANCELLED',
    //   class: 'Cancelled',
    // },
    // {
    //   value: "INPERSON",
    //   class: "inperson",
    // },
  ]

  const [dropdownData, setDropdownData] = useState(optionData)

  let arrivedData = [
    {
      value: 'INPROGRESS',
      class: 'inprogress',
    },
    {
      value: 'NOSHOW',
      class: 'noshow',
    },
    {
      value: 'RESCHEDULED',
      class: 'rescheduled',
    },
    {
      value: 'CANCELLED',
      class: 'cancelled',
    },
  ]

  let scheduledData = [
    {
      value: 'NOSHOW',
      class: 'noshow',
    },
    {
      value: 'RESCHEDULED',
      class: 'rescheduled',
    },
    {
      value: 'CANCELLED',
      class: 'cancelled',
    },
    {
      value: 'ARRIVED',
      class: 'arrived',
    },
  ]

  let inProgressData = [
    {
      value: 'COMPLETED',
      class: 'completed',
    },
  ]

  console.log('statusValue', statusValue)

  useEffect(() => {
    if (statusValue?.value === 'ARRIVED') {
      setDropdownData(arrivedData)
    } else if (statusValue?.value === 'SCHEDULED') {
      setDropdownData(scheduledData)
    } else if (statusValue?.value === 'INPROGRESS') {
      setDropdownData(inProgressData)
    } else {
      setDropdownData([])
    }
  }, [statusValue])

  const handleStatus = (item: any) => {
    let statusValue1 = item.value.toUpperCase()
    if (
      statusValue1 === 'RESCHEDULED' ||
      statusValue1 === 'INPROGRESS' ||
      statusValue1 === 'COMPLETED'
    ) {
      return
    } else {
      setStatusValue(item)
      setShowOption(!showOption)
      let reqData = {
        appointment_id: appointment_id,
        status: statusValue1.replace(/\s/g, ''),
      }
      dispatch(updateAppointmentStatus(requestGenerator(reqData))).then((e) => {
        if (e.type === 'appointment/updateAppointmentStatus/fulfilled') {
          let data = {
            branch_id: branch_id,
          }

          let reqData = {
            patient: '',
            doctor: '',
            date: '',
            range: {
              fromDate: '',
              toDate: '',
            },
          }

          // dispatch(getAllTodayPatient(requestGenerator(data)));

          dispatch(getAllPatientAppointment(requestGenerator(reqData)))
        }
      })
    }
  }

  const handleOpenDropdown = () => {
    console.log('appointment_id', appointment_id)
    let selectedRow = todayAppointmentData?.filter((item: any) => {
      if (item?._id === appointment_id) {
        return appointment_id
      } else {
        return
      }
    })
    // console.log("selectedRow", selectedRow[0]?._id);
    if (selectedRow[0]?._id === appointment_id) {
      // console.log("drop down >>>>");
      setShowOption(!showOption)
    }
  }

  return (
    <>
      <div className={styles.dropdownContainer} ref={statusRef}>
        <div
          className={styles[`${statusValue?.class}`]}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: '120px',
            justifyContent:
              dropdownData.length === 0 ? 'center' : 'space-between',
          }}
          onClick={handleOpenDropdown}
        >
          <p>{statusValue?.value}</p>
          {dropdownData.length > 0 && (
            <DropDownIcon
              fillColor={colors.black1}
              handleClick={() => setShowOption(!showOption)}
              customClass={styles.iconStyle}
            />
          )}
        </div>
        {showOption && (
          <div className={styles.optionContainer}>
            {dropdownData?.map((item: any) => {
              if (item?.value !== statusValue?.value) {
                return (
                  <div onClick={() => handleStatus(item)}>
                    <p className={styles[`${item.class}`]}>{item.value}</p>
                  </div>
                )
              }
            })}
          </div>
        )}
      </div>
    </>
  )
}

export default StatusDropdown

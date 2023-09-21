import { createSlice } from '@reduxjs/toolkit'
import { IAppointmentState } from '../../../interfaces/apiInterface'
import {
  getAllDoctorAppointments,
  getAllDoctors,
  getAvailableSlots,
  bookingConfirmation,
  getRecurringAvailableSlots,
} from './bookingAppointmentAsyncActions'
import { flatten } from 'lodash'
import moment from 'moment'
import { getShiftTimeRange } from '../../../utils/utils'
import { colorSchemeData } from '../../../constants/data'

export const initialState: IAppointmentState = {
  loading: false,
  doctorLoading: false,
  doctorData: [],
  appointmentsData: [],
  dataSource: [],
  resources: [],
  availbleSlots: [],
  totalCount: 0,
  hourStartEndTime: {},
  selectedSlots: [],
  recurringSelectedSlots: [],
  payloadForAvailableSlots: {},
  recurringAvailableSlots: [],
  colorSchemeData: [],
}

export const appointmentSlice = createSlice({
  name: 'appoinments',
  initialState,
  reducers: {
    clearData: (state) => {
      state.loading = false
      state.doctorLoading = false
      state.doctorData = []
      state.resources = []
      state.dataSource = []
      state.appointmentsData = []
      state.availbleSlots = []
      state.totalCount = 0
      state.hourStartEndTime = {}
      state.selectedSlots = []
      state.recurringAvailableSlots = []
      state.payloadForAvailableSlots = {}
      state.recurringAvailableSlots = []
    },
    clearSlotData: (state) => {
      state.availbleSlots = []
      state.selectedSlots = []
      state.recurringAvailableSlots = []
      state.recurringSelectedSlots = []
    },
    setAppointmentsSlots: (state, action) => {
      state.availbleSlots = action.payload
    },
    setRecurringAppointmentsSlots: (state, action) => {
      state.recurringAvailableSlots = action.payload
    },
    setSelectedSlots: (state, action) => {
      state.selectedSlots = action.payload || []
    },
    setRecurringSelectedSlots: (state, action) => {
      state.recurringSelectedSlots = action.payload || []
    },
    setAvialbleSlotsPayload: (state, action) => {
      state.payloadForAvailableSlots = action.payload
    },
    addColorSchemeData: (state, action) => {
      state.colorSchemeData =
        action.payload && action?.payload?.length > 0
          ? action.payload
          : colorSchemeData
    },
  },
  extraReducers(builder) {
    //getalldoctors
    builder.addCase(getAllDoctors.pending, (state) => {
      state.doctorLoading = true
    })
    builder.addCase(getAllDoctors.fulfilled, (state, action) => {
      state.loading = false
      state.doctorLoading = false

      //set  doctors list
      // state.doctorData =
      //   action.payload?.data && action.payload?.data?.length > 0
      //     ? action.payload?.data?.filter((item: any) => {
      //         return item.is_active && checkExpiryDate(item?.expiry_date)
      //       })
      //     : []
      state.doctorData =
        action.payload?.data && action.payload?.data?.length > 0
          ? action.payload?.data?.filter((item: any) => {
              return item.is_active
            })
          : []

      state.totalCount = action?.payload?.total
      const userShiftArray = action?.payload?.data?.map(
        (item: any) => item?.user_shift
      )

      // set doctors shift timing and hour start/end
      let shiftFlatArr = flatten(userShiftArray)
      let finalShiftStartEndArr: any = []
      finalShiftStartEndArr =
        shiftFlatArr &&
        shiftFlatArr?.length > 0 &&
        shiftFlatArr.map((item: any) => {
          const {
            shift_one_start,
            shift_one_end,
            shift_two_start,
            shift_two_end,
          } = item
          return {
            shift_one_start,
            shift_one_end,
            shift_two_start,
            shift_two_end,
          }
        })
      state.hourStartEndTime = getShiftTimeRange(finalShiftStartEndArr) || {}
      // console.log('doctor arrat<<<', getShiftTimeRange(finalShiftStartEndArr))
      const doctorArray =
        action?.payload?.data.length > 0 &&
        action?.payload?.data.map((item: any) => {
          return {
            label: `Dr. ${item?.doctor_name}`,
            id: item._id,
            // backgroundColor: '#28a745',
          }
        })
      state.resources = [
        {
          label: 'Doctors',
          value: '_id',
          dataSource: doctorArray || [],
        },
      ]
    })
    builder.addCase(getAllDoctors.rejected, (state, error) => {
      state.loading = false
      state.doctorLoading = false
    })
    // get all appointments
    builder.addCase(getAllDoctorAppointments.pending, (state) => {
      // state.loading = true
    })
    builder.addCase(getAllDoctorAppointments.fulfilled, (state, action) => {
      state.loading = false
      state.appointmentsData = action?.payload
      const allAppointments =
        action?.payload &&
        action?.payload.length > 0 &&
        action.payload.map((item: any) => {
          return item?.appointments
        })
      const finalAppointmentsArr =
        allAppointments && allAppointments.length > 0
          ? flatten(allAppointments) || []
          : []
      // console.log('all appointments', finalAppointmentsArr)
      const doctorsAppointArr =
        finalAppointmentsArr &&
        finalAppointmentsArr.length > 0 &&
        finalAppointmentsArr.map((item: any) => {
          // console.log('appointment status', item?.status)
          const timeIn = item.time_in.split(':')
          const timeDuration = parseInt(item.time_duration)
          const dateStart = new Date(item.appointment_date)
          dateStart.setHours(parseInt(timeIn[0]))
          dateStart.setMinutes(parseInt(timeIn[1]))
          const dateEnd = new Date(dateStart.getTime() + timeDuration * 60000)
          const appointmentWithStautus = state?.colorSchemeData?.find(
            (colorScheme) => colorScheme?.label === item?.status
          )
          return {
            label: `${item?.pnt_user_name}  ${
              item?.pnt_emr_no ? `File no. - ${item?.pnt_emr_no}` : ''
            }`,
            _id: item?.doctor_id,
            dateStart: dateStart /*dateStart.toISOString() */,
            dateEnd:
              dateEnd /* dateEnd.toISOString()  "#B11313"  "#FFA009" "#02BF90" */,
            backgroundColor: appointmentWithStautus?.colorCode || '#5936F1',
            appt_status: item?.status,
            appt_id: item?._id,
            patient_name: item?.pnt_user_name,
            file_no: item?.pnt_emr_no,
            appointment_date: item?.appointment_date,
            // patient_id: item?.pnt_user_id,
            patient_id: item?.pnt_id,
            patient_phone: item?.pnt_user_phone,
            problem_description: item?.problem_description,
            // repeat: {
            //   repeatFreq: 'weekly',
            //   repeatInterval: 2,
            //   repeatOn: [0, 2, 5],
            //   repeatEnd: new Date(currentYear, currentMonth + 2, 24),
            // },
          }
        })
      // console.log('appointments in slice', doctorsAppointArr)
      state.dataSource = doctorsAppointArr || []
    })
    builder.addCase(getAllDoctorAppointments.rejected, (state, error) => {
      // state.loading = false
      state.doctorLoading = false
    })

    // get avaible slots
    builder.addCase(getAvailableSlots.pending, (state) => {
      // state.loading = true
      state.availbleSlots = []
    })
    builder.addCase(getAvailableSlots.fulfilled, (state, action) => {
      // console.log('payload for available slots>>', action)
      state.loading = false
      if (action?.payload?.slots && action?.payload?.slots?.length > 0) {
        let tempArray = action?.payload?.slots.map(
          (item: any, index: number) => {
            const startTime = item
            const endTime = moment(startTime, 'HH:mm')
              .add(15, 'minutes')
              .format('HH:mm')
            const label = `${startTime} to ${endTime}`

            return {
              label,
              value: item,
              selected: true,
            }
          }
        )
        state.availbleSlots = tempArray || []
      } else {
        state.availbleSlots = []
      }
    })
    builder.addCase(getAvailableSlots.rejected, (state, error) => {
      state.loading = false
    })
    // get recurring available slots
    builder.addCase(getRecurringAvailableSlots.pending, (state) => {
      state.loading = true
      state.availbleSlots = []
      state.recurringAvailableSlots = []
    })
    builder.addCase(getRecurringAvailableSlots.fulfilled, (state, action) => {
      let appointmentDuration: any =
        action?.meta?.arg?.payloadData?.requestData?.recurring_details
          ?.duration || 30

      state.loading = false
      if (action?.payload?.slots && action?.payload?.slots?.length > 0) {
        let tempArray = action?.payload?.slots.map(
          (item: any, index: number) => {
            const startTime = item?.time
            const endTime = moment(startTime, 'HH:mm')
              .add(appointmentDuration, 'minutes')
              .format('HH:mm')
            const label =
              startTime && endTime ? `${startTime} to ${endTime}` : '-'

            return {
              label,
              date: item?.date,
              day: item?.day,
              value: item?.time,
              duration: item?.duration,
              selected: false,
            }
          }
        )
        // console.log('temp array>>', tempArray)
        state.recurringAvailableSlots = tempArray || []
      } else {
        state.recurringAvailableSlots = []
      }
    })
    builder.addCase(getRecurringAvailableSlots.rejected, (state, error) => {
      state.loading = false
    })
    // add booking confirmation
    builder.addCase(bookingConfirmation.pending, (state) => {
      state.loading = true
    })
    builder.addCase(bookingConfirmation.fulfilled, (state, action) => {
      state.loading = false
    })
    builder.addCase(bookingConfirmation.rejected, (state, error) => {
      state.loading = false
    })
  },
})

export const {
  clearData,
  clearSlotData,
  setAppointmentsSlots,
  setSelectedSlots,
  setAvialbleSlotsPayload,
  setRecurringSelectedSlots,
  setRecurringAppointmentsSlots,
  addColorSchemeData,
} = appointmentSlice.actions
export default appointmentSlice.reducer

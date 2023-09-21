import { FC, useState, useEffect } from 'react'
import MobileAppoinmentRequestModal from '../../../../pages/mobile-appointment-request/mobile-appointment-request-modal/MobileAppoinmentRequestModal'
import BookingConfirmationModal from '../../../common/modal/booking-confirmation-modal/BookingConfirmationModal'
import StatusConfirmationPopupV3 from '../../../common/modal/status-confirmation-popup/status-confirmation-popupV3/StatusConfirmationPopupV3'
import { requestGenerator } from '../../../../utils/payloadGenerator'
import { useAppDispatch, useAppSelector } from '../../../../hooks/index'
import {
  cancelAppointmentStatus,
  getAllMobileAppointment,
} from '../../../../redux/features/mobile-appointment-request/mobileAppointmentRequestAsyncActions'
import {
  clearSlotData,
  addColorSchemeData,
} from '../../../../redux/features/appointments/bookingAppointmentsSlice'
import { CANCEL_APPOINTMENT } from '../../../../constants/asyncActionsType'
import Popup from '../../popup/Popup'
import styles from './schedularHeader.module.scss'
import Button from '../../button/Button'
import InfoTooltip from '../../info-tooltip/InfoTooltip'
import ColorScheme from '../../color-scheme/ColorScheme'
// import { colorSchemeData } from "../../../../constants/data";
import DoubleInfoBookingInfo from '../../color-scheme/double-booking-info/DoubleBookingInfo'
import StatusSummaryPopup from '../../modal/view-appointment-popup/status-summary-popup/StatusSummaryPopup'
import { colorSchemeData } from '../../../../constants/data'
import OnlinePaymentModal from '../../modal/online-payment-modal/OnlinePaymentModal'

interface ISchedularHeaderProps {}
// const a = () => {
//   return <div>ffd</div>;
// };

const SchedularHeader: FC<ISchedularHeaderProps> = () => {
  const dispatch = useAppDispatch()
  const { isLoading, getAllMobileAppointPayloadData } = useAppSelector(
    (state) => state.mobileAppointmentRequest
  )
  const { colorSchemeList } = useAppSelector((state) => state.login)
  // console.log("getAllMobileAppointPayloadData", getAllMobileAppointPayloadData);
  // Define state variables
  const [showMobileAppointmentRequest, setShowMobileAppointmentRequest] =
    useState<boolean>(false)
  const [showBookingConfirmationModal, setShowBookingConfirmationModal] =
    useState<boolean>(false)
  const [showStatusConfirmationModal, setStatusConfirmationModal] =
    useState<boolean>(false)
  const [statusSummary, setStatusSummary] = useState<boolean>(false)
  const [togglePayloadData, setTogglePayloadData] = useState<any>({})
  const [showOnlinePaymentModeModal, setShowOnlinePaymentModeModal] =
    useState<boolean>(false)
  const [onlinePaymentLinkData, setOnlinePaymentLinkData] = useState<any>({
    patient_default_branch_id: '',
    name: 'Rahul Patel',
    phone: '965989898989800',
    email: 'rahul@yopmail.com',
    invoice_no: '123456',
    amount: '80',
    // link: upayLinkObject?.link,
    // transaction_id: upayLinkObject?.transaction_id,
    note: 'test note',
    transaction_id: '',
    link: 'https://api.upayments.com/live/new-knet-payment?ref=m7OxY4Bqva65014e139319ea424297b81a1694584340164456273065014e145ea45&sess_id=1d2abf928d57c24ca791bc431482c01d&alive=TVZ2MEdtbG8yYA==',
    // link: null,
  })

  const handleMobileAppointmentRequestModal = () => {
    setShowMobileAppointmentRequest((prevState) => !prevState)
  }

  const handleBookingConfirmationModal = () => {
    setShowBookingConfirmationModal((prevState) => !prevState)
    dispatch(clearSlotData())
  }

  const handleStatusConfirmationModal = (statusData: any) => {
    setStatusConfirmationModal((prevState) => !prevState)
    setTogglePayloadData(statusData)
  }

  const handleStatusConfirmationModalClose = () => {
    setStatusConfirmationModal((prevState) => !prevState)
    setTogglePayloadData({})
  }

  // console.log("togglePayloadData", togglePayloadData);
  const handleStatusConfirmationAPICall = (data: any) => {
    // console.log("data", data);
    const payload = { ...togglePayloadData }
    payload.reason = data.reason
    // console.log("payload", payload);
    dispatch(cancelAppointmentStatus(requestGenerator(payload))).then((e) => {
      if (e.type === `${CANCEL_APPOINTMENT}/fulfilled`) {
        dispatch(
          getAllMobileAppointment(
            requestGenerator(getAllMobileAppointPayloadData)
          )
        )
        handleStatusConfirmationModalClose()
      }
    })
  }

  useEffect(() => {
    dispatch(addColorSchemeData(colorSchemeList))
  }, [dispatch, colorSchemeList])
  const invoiceOnlinePaymentModalClose = () => {
    setShowOnlinePaymentModeModal(!showOnlinePaymentModeModal)
    setOnlinePaymentLinkData({})
  }
  return (
    <>
      {statusSummary && (
        <Popup
          Children={StatusSummaryPopup}
          handleClose={() => setStatusSummary(false)}
        />
      )}
      {showMobileAppointmentRequest && (
        <Popup
          Children={MobileAppoinmentRequestModal}
          handleClose={handleMobileAppointmentRequestModal}
          handleSubmit={handleBookingConfirmationModal}
          handleOpen={handleStatusConfirmationModal}
        />
      )}
      {showBookingConfirmationModal && (
        <Popup
          Children={BookingConfirmationModal}
          handleClose={handleBookingConfirmationModal}
        />
      )}
      {showStatusConfirmationModal && (
        <Popup
          Children={StatusConfirmationPopupV3}
          handleClose={handleStatusConfirmationModalClose}
          handleOpen={handleStatusConfirmationAPICall}
          message={`Are you sure?`}
          heading={'Cancel appointment'}
        />
      )}
      {showOnlinePaymentModeModal && (
        <Popup
          Children={OnlinePaymentModal}
          popData={onlinePaymentLinkData}
          handleClose={() => invoiceOnlinePaymentModalClose()}
          setModelOpenClose={setShowOnlinePaymentModeModal}
          message="/invoice/information"
        />
      )}
      <div className={styles.mainHeaderContainer}>
        <div className={styles.buttonContainer}>
          <Button
            title="Share Payment Link"
            customClass={styles.buttonOutline}
            type="button"
            handleClick={() => setShowOnlinePaymentModeModal(true)}
          />
          <Button title="OT Booking" customClass={styles.buttonOutline} />
          <Button title="IPD Booking" customClass={styles.buttonOutline} />
          <Button
            title="Mobile Appointment Request"
            customClass={styles.buttonOutline}
            handleClick={handleMobileAppointmentRequestModal}
          />
          <Button
            title="Status Summary"
            customClass={styles.buttonOutline}
            handleClick={() => setStatusSummary(true)}
          />
        </div>
        <div className={styles.colorSchemeContainer}>
          <InfoTooltip
            title="Color Scheme"
            Children={ColorScheme}
            tooltipData={
              colorSchemeList && colorSchemeList.length > 0
                ? colorSchemeList
                : colorSchemeData
            }
          />
          <InfoTooltip
            title=" Allow double bookings"
            Children={DoubleInfoBookingInfo}
            customClassChild={styles.doubleBookingMsg}
            tooltipData={{ message: 'No. of Appointments per slot', count: 3 }}
          />
        </div>
      </div>
    </>
  )
}

export default SchedularHeader

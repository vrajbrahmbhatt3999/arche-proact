import { FC, useState } from "react";
import MobileAppoinmentRequestModal from "./mobile-appointment-request-modal/MobileAppoinmentRequestModal";
import BookingConfirmationModal from "../../components/common/modal/booking-confirmation-modal/BookingConfirmationModal";
import StatusConfirmationPopupV2 from "../../components/common/modal/status-confirmation-popup/status-confirmation-popupV2/StatusConfirmationPopupV2";
import { requestGenerator } from "../../utils/payloadGenerator";
import { useAppDispatch, useAppSelector } from "../../hooks/index";
import {
  changeMobileAppointmentStatus,
  getAllMobileAppointment,
} from "../../redux/features/mobile-appointment-request/mobileAppointmentRequestAsyncActions";
import Loader from "../../components/common/spinner/Loader";
import { CHANGE_MOBILE_APPOINTMENT_STATUS } from "../../constants/asyncActionsType";
import Popup from "../../components/common/popup/Popup";
import Button from "../../components/common/button/Button";
interface IMobileAppointmentRequest {}

const MobileAppointmentRequest: FC<IMobileAppointmentRequest> = (props) => {
  const dispatch = useAppDispatch();
  const { isLoading, getAllMobileAppointPayloadData } = useAppSelector(
    (state) => state.mobileAppointmentRequest
  );
  // console.log("getAllMobileAppointPayloadData", getAllMobileAppointPayloadData);
  // Define state variables
  const [showMobileAppointmentRequest, setShowMobileAppointmentRequest] =
    useState<boolean>(false);
  const [showBookingConfirmationModal, setShowBookingConfirmationModal] =
    useState<boolean>(false);
  const [showStatusConfirmationModal, setStatusConfirmationModal] =
    useState<boolean>(false);
  const [togglePayloadData, setTogglePayloadData] = useState<any>({});

  const handleMobileAppointmentRequestModal = () => {
    setShowMobileAppointmentRequest((prevState) => !prevState);
  };

  const handleBookingConfirmationModal = () => {
    setShowBookingConfirmationModal((prevState) => !prevState);
  };

  const handleStatusConfirmationModal = (statusData: any) => {
    setStatusConfirmationModal((prevState) => !prevState);
    setTogglePayloadData(statusData);
  };

  const handleStatusConfirmationModalClose = () => {
    setStatusConfirmationModal((prevState) => !prevState);
    setTogglePayloadData({});
  };

  const handleStatusConfirmationAPICall = () => {
    dispatch(
      changeMobileAppointmentStatus(requestGenerator(togglePayloadData))
    ).then((e) => {
      if (e.type === `${CHANGE_MOBILE_APPOINTMENT_STATUS}/fulfilled`) {
        dispatch(
          getAllMobileAppointment(
            requestGenerator(getAllMobileAppointPayloadData)
          )
        );
        handleStatusConfirmationModalClose();
      }
    });
  };

  // console.log("togglePayloadData", togglePayloadData);
  return (
    <div>
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
          Children={StatusConfirmationPopupV2}
          handleClose={handleStatusConfirmationModalClose}
          handleSubmit={handleStatusConfirmationAPICall}
          message={`Are you sure you want to change the selected ${togglePayloadData?.status.toLowerCase()} status?`}
        />
      )}
      <Button
        title={"Mobile Request"}
        type="button"
        handleClick={handleMobileAppointmentRequestModal}
      />
    </div>
  );
};

export default MobileAppointmentRequest;

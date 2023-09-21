import { useEffect, useRef, useState } from "react";
import { Scheduler } from "smart-webcomponents-react/scheduler";
import "smart-webcomponents-react/source/styles/smart.default.css";
import "./schedular.css";
import styles from "./bookingappointment.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  getAllDoctorAppointments,
  getAllDoctors,
} from "../../redux/features/appointments/bookingAppointmentAsyncActions";
import { requestGenerator } from "../../utils/payloadGenerator";
import Loader from "../../components/common/spinner/Loader";
import DropdownV2 from "../../components/common/dropdown/dropdownv2/DropdownV2";
import Popup from "../../components/common/popup/Popup";
import PaginationV2 from "../../components/common/pagination/paginationv2/PaginationV2";
import {
  clearData,
  clearSlotData,
} from "../../redux/features/appointments/bookingAppointmentsSlice";
import BookingConfirmationModalV2 from "../../components/common/modal/booking-confirmation-modal/bookingconfirmationV2/BookingConfirmationModalV2";
import { getAllDepartment } from "../../redux/features/department/departmentAsyncActions";
import { CANCEL_APPOINTMENT } from "../../constants/asyncActionsType";
import { compareDates } from "../../utils/utils";
import StatusConfirmationPopupV3 from "../../components/common/modal/status-confirmation-popup/status-confirmation-popupV3/StatusConfirmationPopupV3";
import {
  cancelAppointmentStatus,
  getAllMobileAppointmentCalander,
} from "../../redux/features/mobile-appointment-request/mobileAppointmentRequestAsyncActions";
import MobileAppoinmentRequestModalV2 from "../mobile-appointment-request/mobile-appointment-request-modal/MobileAppointmentV2";
import BookingConfirmationModal from "../../components/common/modal/booking-confirmation-modal/BookingConfirmationModal";
import ViewSlots from "../../components/common/modal/view-slot/ViewSlots";
import ReloadButton from "../../components/common/reload-button/ReloadButton";
import ViewSlotsV2 from "../../components/common/modal/view-slot/ViewSlotsV2";
import AppointmentDetails from "../../components/common/modal/appointment-details/AppointmentDetails";
import { setMessage } from "../../redux/features/toast/toastSlice";
import { failure } from "../../constants/data";
import noRecordImage from "../../assets/images/noRecordsFound.png";

const BookingSchedularFunctional = () => {
  const scheduler = useRef(null);
  const dispatch = useAppDispatch();
  const {
    doctorData,
    resources,
    doctorLoading,
    dataSource,
    loading,
    totalCount,
    hourStartEndTime,
  } = useAppSelector((state) => state.appointments);
  const { isLoading } = useAppSelector((state) => state.appointment);
  const [selectedItem, setSelectedItem] = useState({
    name: "Select All",
    _id: "",
  });
  const [selectedDeptItem, setSelectedDeptItem] = useState({
    name: "Select All",
    _id: "",
  });
  const [selectedBranchItem, setSelectedBranchItem] = useState({
    name: "Select Branch",
    _id: "",
  });
  const [doctorResources, setDoctorResources] = useState(resources);
  const [customPopup, setCustomPopup] = useState(false);
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const lastPage = Math.ceil(totalCount / itemsPerPage);
  const [popupData, setpopupData] = useState({});
  const { departmentData } = useAppSelector((state) => state.department);
  const { branchData } = useAppSelector((state) => state.login);
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    event: {},
    status: false,
  });
  const [mobileAppData, setMobileAppData] = useState([]);
  const [showMobileAppointmentRequest, setShowMobileAppointmentRequest] =
    useState(false);
  const [viewSlotsPopup, setViewSlotsPopup] = useState(false);
  const [viewSlotsPopupRecurring, setViewSlotsPopupRecurring] = useState(false);
  const [apptDetailsPopup, setApptDetailsPopup] = useState({
    status: false,
    apptData: {},
  });
  const views = [
    "day",
    {
      label: "Week",
      value: "workWeek",
      type: "week",
      shortcutKey: "W",
    },
    "month",
  ];
  const hideAllDay = true;
  const nonworkingDays = [];
  const hideNonworkingWeekdays = true;
  const firstDayOfWeek = 1;
  const viewSelectorType = "auto";
  const groups = ["_id"];
  const timelineDayScale = "halfHour";

  // open custom popup
  const handleCutomPopup = (e) => {
    console.log("calander event", e?.detail?.item?.appt_status);
    const todayDate = new Date();
    const calDate = new Date(e?.detail?.item?.dateStart);
    setpopupData(e?.detail?.item);
    e.preventDefault();
    if (e?.detail?.item?.appt_status === "PENDING") {
      setShowMobileAppointmentRequest(true);
      const appointments =
        dataSource &&
        dataSource.length > 0 &&
        dataSource.filter(
          (item) =>
            compareDates(item?.dateStart, e?.detail?.item?.dateStart) &&
            compareDates(item?.dateEnd, e?.detail?.item?.dateEnd)
        );
      const apptIds =
        appointments &&
        appointments?.length > 0 &&
        appointments?.map((item) => item?.appt_id);
      setMobileAppData(apptIds);
    }
    if (calDate < todayDate && !e?.detail?.item?.appt_id) {
      dispatch(
        setMessage({
          message: "Appointment can no be booked in past",
          type: failure,
        })
      );
    } else if (
      e?.detail?.item?.appt_status === "COMPLETED" ||
      e?.detail?.item?.appt_status === "NOSHOW" ||
      e?.detail?.item?.appt_status === "CANCELLED"
    ) {
      return;
    } else {
      setCustomPopup(true);
    }
  };

  useEffect(() => {
    let data = {
      search: "",
      page: currentPage,
      pageSize: itemsPerPage,
      department: selectedDeptItem?._id,
      branch: selectedBranchItem?._id,
    };
    selectedBranchItem?._id && dispatch(getAllDoctors(requestGenerator(data)));
  }, [
    dispatch,
    currentPage,
    itemsPerPage,
    selectedDeptItem?._id,
    selectedBranchItem?._id,
  ]);

  // get all doctor's appoinments
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(
        getAllDoctorAppointments(
          requestGenerator({ branch_id: selectedBranchItem?._id })
        )
      );
    }, 60000);
    return () => clearInterval(interval);
  }, [dispatch, selectedBranchItem?._id]);

  useEffect(() => {
    selectedBranchItem?._id &&
      dispatch(
        getAllDoctorAppointments(
          requestGenerator({ branch_id: selectedBranchItem?._id })
        )
      );
  }, [dispatch, selectedBranchItem?._id]);

  // go to previous page
  const handlePrevious = () => {
    currentPage !== 1 ? setCurrentPage(currentPage - 1) : setCurrentPage(1);
  };

  // go to next page
  const handleNext = (item) => {
    currentPage < lastPage
      ? setCurrentPage(currentPage + 1)
      : setCurrentPage(currentPage);
  };

  // login for filter doctors
  useEffect(() => {
    if (selectedItem?._id === "") {
      setDoctorResources(resources);
    } else {
      let tempArr = [];
      tempArr =
        resources?.length > 0 &&
        resources[0]?.dataSource?.filter(
          (item) => item?.id === selectedItem?._id
        );
      setDoctorResources([
        {
          label: "Doctors",
          value: "_id",
          dataSource: tempArr || [],
        },
      ]);
    }
  }, [resources, selectedItem]);

  useEffect(() => {
    dispatch(
      getAllDepartment(
        requestGenerator({
          search: "",
          page: 1,
          pageSize: 100,
        })
      )
    );
  }, [dispatch]);

  const handleStatusConfirmationAPICall = (data) => {
    let reqData = {
      appointment_id: apptDetailsPopup?.apptData?.appt_id,
      status: "CANCELLED",
      reason: data.reason,
    };
    dispatch(cancelAppointmentStatus(requestGenerator(reqData))).then((e) => {
      if (e.type === `${CANCEL_APPOINTMENT}/fulfilled`) {
        dispatch(
          getAllDoctorAppointments(
            requestGenerator({ branch_id: selectedBranchItem?._id })
          )
        );
        setDeleteConfirmation({ event: {}, status: false });
        setApptDetailsPopup({ status: false, apptData: {} });
      }
    });
  };

  // disable delete
  const handleItemChanging = (e) => {
    if (
      e?.detail?.type === "removing" &&
      e?.detail?.item?.backgroundColor === "#B11313"
    ) {
      e.preventDefault();
    } else if (e?.detail?.type === "removing") {
      e.preventDefault();
      setDeleteConfirmation({ event: e, status: true });
    }
  };
  // data cleanup
  useEffect(() => {
    return () => {
      dispatch(clearData());
    };
  }, [dispatch]);

  // close mobile app popup
  const handleMobileAppointmentRequestModal = () => {
    setShowMobileAppointmentRequest((prevState) => !prevState);
  };

  //** handling mobile appointmet request modal */

  const [showBookingConfirmationModal, setShowBookingConfirmationModal] =
    useState(false);
  const [showStatusConfirmationModal, setStatusConfirmationModal] =
    useState(false);
  const [togglePayloadData, setTogglePayloadData] = useState({});
  const [reoladDate, setReloadDate] = useState(new Date());

  const handleBookingConfirmationModal = () => {
    setShowBookingConfirmationModal((prevState) => !prevState);
    dispatch(clearSlotData());
  };
  const handleStatusConfirmationModalClose = () => {
    setStatusConfirmationModal((prevState) => !prevState);
    setTogglePayloadData({});
  };
  const handleStatusConfirmationAPICallV2 = (data) => {
    const payload = { ...togglePayloadData };
    payload.reason = data?.reason;
    dispatch(cancelAppointmentStatus(requestGenerator(payload))).then((e) => {
      if (e.type === `${CANCEL_APPOINTMENT}/fulfilled`) {
        dispatch(
          getAllMobileAppointmentCalander(
            requestGenerator({ appointment_requests: mobileAppData || [] })
          )
        );
        handleStatusConfirmationModalClose();
      }
    });
  };
  const handleStatusConfirmationModal = (statusData) => {
    setStatusConfirmationModal((prevState) => !prevState);
    setTogglePayloadData(statusData);
  };

  // reolad
  const handleReloadButton = () => {
    dispatch(
      getAllDoctorAppointments(
        requestGenerator({ branch_id: selectedBranchItem?._id })
      )
    );
    setReloadDate(new Date());
  };

  // handle more appointment information

  const handleEventMenuOpening = (e) => {
    e.preventDefault();
    setApptDetailsPopup({
      status: true,
      apptData: e?.detail?.eventObj[0] || {},
    });
  };
  useEffect(() => {
    branchData?.branches?.length > 0
      ? setSelectedBranchItem({
          name: branchData?.branches[0].name,
          _id: branchData?.branches[0]._id,
        })
      : setSelectedBranchItem({ name: "Select Branch", _id: "" });
    setSelectedItem({ name: "Select All", _id: "" });
  }, [branchData?.branches]);
  return (
    <>
      {customPopup && (
        <Popup
          Children={BookingConfirmationModalV2}
          handleClose={() => setCustomPopup(false)}
          handleOpen={() => setViewSlotsPopup(true)}
          popData={popupData}
          setModelOpenClose={() => setViewSlotsPopupRecurring(true)}
          branchId={selectedBranchItem?._id ? selectedBranchItem?._id : ""}
        />
      )}
      {showMobileAppointmentRequest && (
        <Popup
          Children={MobileAppoinmentRequestModalV2}
          handleClose={handleMobileAppointmentRequestModal}
          appointmentIds={mobileAppData}
          handleSubmit={handleBookingConfirmationModal}
          handleOpen={handleStatusConfirmationModal}
        />
      )}
      {showBookingConfirmationModal && (
        <Popup
          Children={BookingConfirmationModal}
          handleClose={handleBookingConfirmationModal}
          appointmentIds={mobileAppData}
        />
      )}
      {showStatusConfirmationModal && (
        <Popup
          Children={StatusConfirmationPopupV3}
          handleClose={handleStatusConfirmationModalClose}
          handleOpen={handleStatusConfirmationAPICallV2}
          message={`Are you sure?`}
          heading={"Cancel appointment"}
        />
      )}
      {viewSlotsPopup && (
        <Popup
          Children={ViewSlots}
          handleClose={(e) => {
            setViewSlotsPopup(false);
          }}
        />
      )}
      {viewSlotsPopupRecurring && (
        <Popup
          Children={ViewSlotsV2}
          handleClose={(e) => {
            setViewSlotsPopupRecurring(false);
          }}
        />
      )}

      {apptDetailsPopup.status && (
        <Popup
          Children={AppointmentDetails}
          popData={apptDetailsPopup}
          handleClose={(e) => {
            setApptDetailsPopup({ status: false, apptData: {} });
          }}
          handleOpen={(event) =>
            setDeleteConfirmation({ event: event, status: true })
          }
        />
      )}
      {deleteConfirmation?.status && (
        <Popup
          Children={StatusConfirmationPopupV3}
          handleClose={() =>
            setDeleteConfirmation({ event: {}, status: false })
          }
          appointmentIds={mobileAppData}
          message={`Are you sure?`}
          heading={"Cancel appointment"}
          handleOpen={handleStatusConfirmationAPICall}
        />
      )}

      {loading || doctorLoading || isLoading ? <Loader /> : null}
      <div className={styles.dropdownPaginationContainer}>
        <div className={styles.dropdownMainContainer}>
          <DropdownV2
            data={doctorData}
            type="Doctor"
            keyName="doctor_name"
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            handleClick={(item) => {
              setSelectedItem({ name: item?.doctor_name, _id: item?._id });
              setSelectedDeptItem({ name: "Select All", _id: "" });
              // setSelectedBranchItem({ name: "Select All", _id: "" })
            }}
          />
          <DropdownV2
            data={departmentData}
            type="Department"
            keyName="name"
            selectedItem={selectedDeptItem}
            setSelectedItem={setSelectedDeptItem}
            handleClick={(item) => {
              setSelectedDeptItem({ name: item?.name, _id: item?._id });
              setSelectedItem({ name: "Select All", _id: "" });
            }}
          />
          <DropdownV2
            data={branchData?.branches}
            type="Branch"
            keyName="name"
            customClass={styles.branchDropdown}
            selectedItem={selectedBranchItem}
            setSelectedItem={setSelectedBranchItem}
            notShowAllOption={true}
            handleClick={(item) => {
              setSelectedBranchItem({ name: item?.name, _id: item?._id });
              setSelectedItem({ name: "Select All", _id: "" });
            }}
          />
        </div>
        <div className={styles.reloadPaginationComponent}>
          <ReloadButton
            customClass={styles.mobileAppointmentReloadButton}
            handleClick={handleReloadButton}
            reoladDate={reoladDate}
          />
          <PaginationV2
            handleNext={() => handleNext()}
            handlePrevious={() => handlePrevious()}
            handleReset={() => setCurrentPage(1)}
          />
        </div>
      </div>
      {resources?.length > 0 && resources[0]?.dataSource?.length > 0 ? (
        <Scheduler
          ref={scheduler}
          id="scheduler"
          dataSource={dataSource}
          views={views}
          maxEventsPerCell={3}
          hideAllDay={hideAllDay}
          hourStart={hourStartEndTime?.hourStart || 0}
          hourEnd={hourStartEndTime?.hourEnd || 23}
          nonworkingDays={nonworkingDays}
          hideNonworkingWeekdays={hideNonworkingWeekdays}
          firstDayOfWeek={firstDayOfWeek}
          viewSelectorType={viewSelectorType}
          groups={groups}
          timelineDayScale={timelineDayScale}
          resources={doctorResources}
          onEditDialogOpening={(e) => handleCutomPopup(e)}
          disableDrag={true}
          disableDrop={true}
          disableResize={true}
          onItemChanging={(e) => handleItemChanging(e)}
          unfocusable={true}
          onContextMenuOpening={(ev) => {
            ev.preventDefault();
          }}
          onEventMenuOpening={(e) => handleEventMenuOpening(e)}
          onViewChanging={(e) => {
            console.log("event for view change>>", e);
          }}
          /*restrictedHours={[10]} */
          // disableSelection={disableContextMenu}
          // disableContextMenu={true}
          // ** Restrcting available slots ** // onContextMenuOpening={(e) => handleRestricedHours(e)}
          // onEditDialogOpen={(e) => handleEditDialogOpen(e)}
        ></Scheduler>
      ) : (
        <div style={{margin: '10px'}}>
        <img src={noRecordImage} alt="no records found"  style={{width: '100%'}}/>
        </div>
      )}
    </>
  );
};

export default BookingSchedularFunctional;

import { FC, useCallback, useEffect, useState } from "react";
import {
  CloseIcon,
  ExportIcon,
  InfoIcon,
  PrintIcon,
  SearchButton,
  SearchIcon,
} from "../../svg-components";
import styles from "./viewAppointmentPopup.module.scss";
import { colors } from "../../../../constants/color";
import Divider from "../../divider/Divider";
import TableV2 from "../../table/tableV2/TableV2";
import { viewAppointmentPopupData } from "../../../../constants/table-data/viewAppointmentPopupData";
import Button from "../../button/Button";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { requestGenerator } from "../../../../utils/payloadGenerator";
import Loader from "../../spinner/Loader";
import Pagination from "../../pagination/Pagination";
import Search from "../../../common/search/Search";
import { debounce } from "lodash";
import { trimValue } from "../../../../utils/utils";
import Popup from "../../popup/Popup";
import StatusSummaryPopup from "./status-summary-popup/StatusSummaryPopup";
import AppointmentLogPopup from "./appointment-log-popup/AppointmentLogPopup";
import ActionLogPopup from "./action-log-popup/ActionLogPopup";
import { getAllPatientAppointment } from "../../../../redux/features/appointment/appointmentAsyncActions";
import { useLocation } from "react-router-dom";
import InputSearch from "./input-search/InputSearch";

interface IViewAppointment {
  handleStatusSummary?: any;
  handleAppointmentLog?: any;
  handleActionLog?: any;
  handleClose?: any;
  setModelOpenClose?: any;
}

const ViewAppointmentPopup: FC<IViewAppointment> = ({
  handleStatusSummary,
  handleAppointmentLog,
  handleActionLog,
  handleClose,
  setModelOpenClose,
}) => {
  const dispatch = useAppDispatch();
  const { isLoading, appointmentData, appointmentInfo } = useAppSelector(
    (state) => state.appointment
  );
  console.log("appointmentData", appointmentData);
  const [dataPerPage, setDataPerPage] = useState<number>(10);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [searchDoctor, setSearchDoctor] = useState("");
  const [searchPatient, setSearchPatient] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchFile, setSearchFile] = useState("");
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const location = useLocation();
  const [appointmentLog, setAppointmentLog] = useState<boolean>(false);
  const [actionLog, setActionLog] = useState<boolean>(false);
  const [statusSummary, setStatusSummary] = useState<boolean>(false);
  const [id, setId] = useState();
  const [active, setActive] = useState<boolean>(false);
  const [value, setValue] = useState();
  const { patientBranchList } = useAppSelector((state) => state.patient);
  let branche = patientBranchList?.branches;
  let branch_id = branche && branche.length > 0 && branche[0]?._id;
  console.log("branche", patientBranchList?.branches);
  const [branch, setBranch] = useState(branch_id);

  console.log("branch", branch);

  const pageIndexArray = () => {
    let pageIndexOptions = [];
    for (let i = 1; i <= totalPage; i++) {
      pageIndexOptions.push(i);
    }
    return pageIndexOptions;
  };

  const pageIndexOptions = pageIndexArray();

  // Debounce Search String
  const searchPatientText = useCallback(
    debounce(
      (text: string): void => setSearchPatient && setSearchPatient(text),
      500
    ),
    [setSearchPatient]
  );

  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event: any) => {
    setSelectedOption(event.target.value);

    if (event.target.value === "today") {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;
      setSearchDate(formattedDate);
    }
  };

  const dateFormat = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  let checkDate = dateFormat();

  function formatNewDate(dateString: any) {
    const date = new Date(dateString);
    const options: any = {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short",
    };
    const formattedDate = date.toLocaleString("en-US", options);
    return formattedDate;
  }

  function getMonthRange(dateString = "") {
    const date = dateString ? new Date(dateString) : new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0") as any;

    const startOfMonth = `${year}-${month}-01`;
    const endOfMonth = `${year}-${month}-${new Date(year, month, 0).getDate()}`;

    return `${startOfMonth} - ${endOfMonth}`;
  }

  // const getWeekRange = (dateString: any = "") => {
  //   let date;
  //   if (dateString) {
  //     date = new Date(dateString);
  //   } else {
  //     date = new Date();
  //   }
  //   const dayOfWeek = date.getDay();
  //   const diff = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
  //   const startOfWeek = new Date(date.setDate(diff));
  //   const endOfWeek = new Date(date.setDate(date.getDate() + 6));
  //   const startDateString = startOfWeek.toISOString().slice(0, 10);
  //   const endDateString = endOfWeek.toISOString().slice(0, 10);
  //   return `${startDateString} - ${endDateString}`;
  // };
  const getWeekRange = (dateString = "") => {
    let date;
    if (dateString) {
      date = new Date(dateString);
    } else {
      date = new Date();
    }
    const dayOfWeek = date.getDay();

    // Calculate the difference between the selected date and the closest Sunday
    const diff = date.getDate() - dayOfWeek;

    // Set the start of the week as Sunday
    const startOfWeek = new Date(date.setDate(diff));
    console.log("startof week ", startOfWeek);
    // Set the end of the week as Saturday
    const endOfWeek = new Date(date.setDate(date.getDate() + 6));
    console.log("endOfWeek  ", endOfWeek);

    // Format the start and end dates
    const startDateString = startOfWeek.toISOString().slice(0, 10);
    const endDateString = endOfWeek.toISOString().slice(0, 10);

    return `${startDateString} - ${endDateString}`;
  };

  const getDateRange = () => {
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

    switch (selectedOption) {
      case "weekly":
        let we = getWeekRange(searchDate);
        return we;
      case "monthly":
        let mm = getMonthRange(searchDate);
        return mm;
      default:
        return "";
    }
  };

  function formatDate(date: any) {
    const dateObject = new Date(date);

    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();

    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  }

  const dateStrings = getDateRange().split(" - ");
  const newStartDate = dateStrings[0];
  const newEndDate = dateStrings[1];

  useEffect(() => {
    let reqData = {
      fileNo: searchFile,
      patient: searchPatient,
      doctor: searchDoctor,
      date: searchDate,
      branch_id: branch,
      page: pageIndex,
      pageSize: dataPerPage,
      range: {
        fromDate: newStartDate,
        toDate: newEndDate,
      },
    };

    dispatch(getAllPatientAppointment(requestGenerator(reqData))).then(
      (result) => setTotalPage(result.payload.lastPage)
    );
  }, [pageIndex, dataPerPage]);

  const handleSearch = () => {
    setPageIndex(1);
    let reqData = {
      fileNo: searchFile,
      patient: searchPatient,
      doctor: searchDoctor,
      date: searchDate,
      branch_id: branch,
      page: pageIndex,
      pageSize: dataPerPage,
      range: {
        fromDate: newStartDate,
        toDate: newEndDate,
      },
    };

    dispatch(getAllPatientAppointment(requestGenerator(reqData))).then(
      (result) => setTotalPage(result.payload.lastPage)
    );
  };

  const handleViewAll = () => {
    setBranch(branch_id);
    setId(undefined);
    let reqData = {
      fileNo: "",
      patient: "",
      doctor: "",
      date: "",
      branch_id: branch_id,
      page: pageIndex,
      pageSize: dataPerPage,
      range: {
        fromDate: "",
        toDate: "",
      },
    };
    dispatch(getAllPatientAppointment(requestGenerator(reqData))).then(
      (result) => setTotalPage(result.payload.lastPage)
    );
    setSearchDoctor("");
    setSearchFile("");
    setSearchPatient("");
    setSearchDate("");
    setSelectedOption("Select");
  };

  const handlePrint = () => {
    window.print();
  };

  const handleRow = (id: any) => {
    setId(id);
    setValue(id);
    if (value === id) {
      setActive(true);
    } else {
      setActive(false);
    }
  };

  return (
    <>
      <div
        className={styles.popupContainer}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={styles.iconContainer}>
          {/* DO NOT REMOVE THIS DIV BLOCK AS WE MAY BE NEED IN FUTURE */}

          {/* <div style={{ position: "relative" }}>
            <InfoIcon
              fillColor={colors.grey1}
              customClass={styles.closeIconStyle}
              mouseEnter={(e: any) => {
                setShowInfo(true);
                e.stopPropagation();
              }}
              mouseLeave={(e: any) => {
                setShowInfo(false);
                e.stopPropagation();
              }}
            />
            {showInfo && (
              <p className={styles.infoText}>
                It will enable the KPI for respective CRM Agent
              </p>
            )}
          </div> */}
          <CloseIcon
            customClass={styles.closeIconStyle}
            fillColor={colors.green1}
            handleClick={() => handleClose()}
          />
        </div>
        <div className={styles.viewAppointment}>
          <p className={styles.title}>View Appointment</p>
          <Divider customClass={styles.dividerStyle} />
          <div className={styles.mainContent}>
            <div className={styles.searchContainer}>
              <label className={styles.labelText}>File No.:</label>
              <input
                type="text"
                className={styles.inputField}
                value={searchFile}
                onChange={(e) => {
                  trimValue(e);
                  setSearchFile(e.target.value);
                  if (e.target.value === "") {
                    let reqData = {
                      fileNo: "",
                      patient: searchPatient,
                      doctor: searchDoctor,
                      date: searchDate,
                      branch_id: branch,
                      page: pageIndex,
                      pageSize: dataPerPage,
                      range: {
                        fromDate: newStartDate,
                        toDate: newEndDate,
                      },
                    };

                    dispatch(
                      getAllPatientAppointment(requestGenerator(reqData))
                    ).then((result) => setTotalPage(result.payload.lastPage));
                  }
                }}
              />

              <label className={styles.labelText}>Doctor:</label>
              <input
                type="text"
                className={styles.inputField}
                value={searchDoctor}
                onChange={(e) => {
                  trimValue(e);
                  setSearchDoctor(e.target.value);
                  if (e.target.value === "") {
                    let reqData = {
                      fileNo: searchFile,
                      patient: searchPatient,
                      doctor: "",
                      date: searchDate,
                      branch_id: branch,
                      page: pageIndex,
                      pageSize: dataPerPage,
                      range: {
                        fromDate: newStartDate,
                        toDate: newEndDate,
                      },
                    };

                    dispatch(
                      getAllPatientAppointment(requestGenerator(reqData))
                    ).then((result) => setTotalPage(result.payload.lastPage));
                  }
                }}
              />

              <label className={styles.labelText}>Patient:</label>
              <input
                type="text"
                className={styles.inputField}
                value={searchPatient}
                onChange={(e) => {
                  trimValue(e);
                  setSearchPatient(e.target.value);
                  if (e.target.value === "") {
                    let reqData = {
                      fileNo: searchFile,
                      patient: "",
                      doctor: searchDoctor,
                      date: searchDate,
                      branch_id: branch,
                      page: pageIndex,
                      pageSize: dataPerPage,
                      range: {
                        fromDate: newStartDate,
                        toDate: newEndDate,
                      },
                    };

                    dispatch(
                      getAllPatientAppointment(requestGenerator(reqData))
                    ).then((result) => setTotalPage(result.payload.lastPage));
                  }
                }}
              />
            </div>
            <div className={styles.filterContainer}>
              <label className={styles.labelText}>Date:</label>
              <input
                type="date"
                className={styles.DateinputField}
                value={searchDate}
                onChange={(e) => {
                  trimValue(e);
                  setSearchDate(e.target.value);
                  if (e.target.value === "") {
                    let reqData = {
                      fileNo: searchFile,
                      patient: searchPatient,
                      doctor: searchDoctor,
                      date: searchDate,
                      branch_id: branch,
                      page: pageIndex,
                      pageSize: dataPerPage,
                      range: {
                        fromDate: newStartDate,
                        toDate: newEndDate,
                      },
                    };
                    setSelectedOption("Select");
                    dispatch(
                      getAllPatientAppointment(requestGenerator(reqData))
                    ).then((result) => setTotalPage(result.payload.lastPage));
                  }
                  if (e.target.value !== checkDate) {
                    setSelectedOption("Select");
                  }
                }}
              />
              <label className={styles.labelText}>Period:</label>
              <select
                className={styles.daysSelectContainer}
                onChange={handleOptionChange}
                value={selectedOption}
              >
                <option value="Select">Select </option>
                <option value="today">Today</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
              <label className={styles.labelText}>Branch:</label>

              <select
                className={styles.branchsSelectContainer}
                value={branch}
                onChange={(e) => {
                  setBranch(e.target.value);
                  console.log("e.target.value", e.target.value);
                }}
              >
                {branche &&
                  branche.length > 0 &&
                  branche.map((item: any, i: number) => {
                    return (
                      <option value={item?._id} key={i}>
                        {item?.name}
                      </option>
                    );
                  })}
              </select>
              <SearchButton handleClick={() => handleSearch()} />
            </div>
            <div className={styles.btnContainer}>
              <Button
                title="View All"
                customClass={styles.viewBtn}
                handleClick={handleViewAll}
              />
              <Button
                title="Appointment Log"
                customClass={styles.btnStyle}
                handleClick={() => {
                  setAppointmentLog(true);
                }}
                type="button"
                disable={id === undefined ? true : false}
              />
              <Button
                title="Action Log"
                customClass={styles.btnStyle}
                handleClick={() => setActionLog(true)}
                disable={id === undefined ? true : false}
              />
              <Button
                title="Status Summary"
                customClass={styles.btnStyle}
                handleClick={() => setStatusSummary(true)}
              />
              <PrintIcon
                customClass={styles.printIconStyle}
                handleClick={handlePrint}
              />
              <ExportIcon />
            </div>
            <div className={styles.tableContainer}>
              {appointmentData?.length > 0 ? (
                <TableV2
                  tableHeaderData={viewAppointmentPopupData}
                  tableRowData={appointmentData}
                  handleRow={handleRow}
                  setModelOpenClose={setModelOpenClose}
                  setActive={setValue}
                  active={value}
                />
              ) : (
                <p className={styles.noRecord}>No records found</p>
              )}
            </div>

            <Pagination
              setDataPerPage={setDataPerPage}
              pageIndexOptions={pageIndexOptions}
              pageIndex={pageIndex}
              setPageIndex={setPageIndex}
            />
          </div>
        </div>
        {appointmentLog && (
          <Popup
            Children={AppointmentLogPopup}
            handleClose={() => {
              setAppointmentLog(false);
            }}
            popData={id}
          />
        )}
        {actionLog && (
          <Popup
            Children={ActionLogPopup}
            handleClose={() => {
              setActionLog(false);
            }}
            popData={id}
          />
        )}
        {statusSummary && (
          <Popup
            Children={StatusSummaryPopup}
            handleClose={() => setStatusSummary(false)}
            // customClassPopup={styles.popupStyles}
          />
        )}
      </div>
    </>
  );
};

export default ViewAppointmentPopup;

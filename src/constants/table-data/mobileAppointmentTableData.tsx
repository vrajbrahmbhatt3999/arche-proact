import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { DropDownIcon } from "../../components/common/svg-components/index";
import moment from "moment";
import { getPatientEmrById } from "../../redux/features/patient-emr/patient/patientAsyncAction";
import { requestGenerator } from "../../utils/payloadGenerator";
import { useAppDispatch, useAppSelector } from "../../hooks/index";
import { changeMobileAppointmentStatus } from "../../redux/features/mobile-appointment-request/mobileAppointmentRequestAsyncActions";
import { setSingleMobileAppointmentRequestData } from "../../redux/features/mobile-appointment-request/mobileAppointmentRequestSlice";
import Loader from "../../components/common/spinner/Loader";
import styles from "./mobileAppointmentTable.module.scss";

export const mobileAppointmentHeaderData: any = [
  // {
  //   Header: "ID",
  //   accessor: "apt_id",
  // },
  {
    Header: "DATE",
    accessor: "apt_date",
    Cell: ({ row }: any) => {
      const convertDate = moment(row?.original?.apt_date).format("DD-MM-YYYY");
      return <>{row?.original?.apt_date ? <span>{convertDate}</span> : "-"}</>;
    },
  },
  {
    Header: "FILE NO",
    accessor: "patient_emr",
    Cell: ({ row }: any) => {
      // console.log("row", row?.original);
      const dispatch = useAppDispatch();
      const navigate = useNavigate();
      const handleEmrRecord = (item: any) => {
        let dataPayload = {
          id: item,
        };
        dispatch(getPatientEmrById(requestGenerator(dataPayload))).then((e) => {
          if (e.type === "patient/getPatientEmrById/fulfilled") {
            navigate("/patientemr");
          }
        });
      };
      return (
        <span
          onClick={() => {
            handleEmrRecord(row?.original?.patient_id);
          }}
          className={styles.viewEmrLink}
        >
          {row?.original?.patient_emr}
        </span>
      );
    },
  },
  {
    Header: "PATIENT",
    accessor: "patient_name",
  },
  {
    Header: "MOBILE NO.",
    accessor: "patient_phone",
  },
  {
    Header: "APPOINTMENT TYPE",
    accessor: "apt_type",
    Cell: ({ row }: any) => {
      return (
        <>
          {row?.original?.apt_type ? (
            <span>{row?.original?.apt_type.toLowerCase()}</span>
          ) : (
            "-"
          )}
        </>
      );
    },
  },
  {
    Header: "APPOINTMENT TIME",
    accessor: "apt_time",
    Cell: ({ row }: any) => {
      // const time = moment(row?.original?.apt_time, "HH:mm").format("hh:mm a");
      // console.log("time", time);
      return (
        <>
          {row?.original?.apt_time ? (
            <span>{row?.original?.apt_time}</span>
          ) : (
            "-"
          )}
        </>
      );
    },
  },
  {
    Header: "DOCTOR",
    accessor: "doctor_name",
    Cell: ({ row }: any) => {
      return (
        <>
          {row?.original?.doctor_name ? (
            <span>Dr. {row?.original?.doctor_name}</span>
          ) : (
            "-"
          )}
        </>
      );
    },
  },
  {
    Header: "STATUS",
    // accessor: "apt_status",
    Cell: ({ row, onClick, onOpen }: any) => {
      // console.log("onClick", onClick);
      const dispatch = useAppDispatch();
      const [showOption, setShowOption] = useState<boolean>(false);
      const statusRef = useRef<any>();
      const [statusValue, setStatusValue] = useState<any>({
        value: "Pending",
        capitalValue: "PENDING",
        class: "pending",
        color: "#E49E00",
      });

      // Data for status dropdown
      let optionData = [
        {
          value: "Pending",
          capitalValue: "PENDING",
          class: "pending",
          color: "#E49E00",
        },
        {
          value: "Waiting List",
          capitalValue: "WAITINGLIST",
          class: "waitingList",
          color: "#0046FB",
        },
        {
          value: "Confirmed",
          capitalValue: "SCHEDULED",
          class: "confirmed",
          color: "#02BF90",
        },
        {
          value: "Cancel",
          capitalValue: "CANCELLED",
          class: "cancel",
          color: "#B11313",
        },
      ];

      // function for close dropdown
      useEffect(() => {
        const checkIfClickedOutside = (e: any) => {
          if (
            showOption &&
            statusRef.current &&
            !statusRef.current.contains(e.target)
          ) {
            setShowOption(false);
          }
        };

        document.addEventListener("mousedown", checkIfClickedOutside);

        return () => {
          document.removeEventListener("mousedown", checkIfClickedOutside);
        };
      }, [showOption]);

      // show status selected option
      useEffect(() => {
        const selectedOption = optionData.find((option) => {
          return option.capitalValue === row?.original?.apt_status;
        });
        setStatusValue(selectedOption);
      }, [row?.original?.apt_status]);

      // useEffect(() => {
      //   let payloadData = {
      //     appointment_id: "643ceb4d239f4dee401c08fc",
      //     status: statusValue?.capitalValue,
      //   };
      //   console.log("payloadData", payloadData);
      //   dispatch(changeMobileAppointmentStatus(requestGenerator(payloadData)));
      // }, [statusValue?.capitalValue]);

      const handleStatus = (item: any) => {
        window.scrollTo(0, 0);
        // let payloadData = {
        //   appointment_id: row?.original?.apt_id,
        //   status: item?.capitalValue,
        // };
        const mobileBookAppointment = { ...row?.original };
        mobileBookAppointment.apt_status = item?.capitalValue;
        // console.log("row?.original", row?.original);
        // console.log({ mobileBookAppointment });
        if (
          item?.capitalValue === "PENDING" ||
          statusValue?.capitalValue === "SCHEDULED"
        ) {
          setShowOption((prevState) => !prevState);
        } else if (item?.capitalValue === "WAITINGLIST") {
          if (
            statusValue?.capitalValue === "WAITINGLIST" ||
            statusValue?.capitalValue === "CANCELLED"
          ) {
            setShowOption((prevState) => !prevState);
          } else {
            setShowOption((prevState) => !prevState);
            dispatch(
              setSingleMobileAppointmentRequestData(mobileBookAppointment)
            );
            onClick();
          }
        } else if (item?.capitalValue === "SCHEDULED") {
          if (
            statusValue?.capitalValue === "PENDING" ||
            statusValue?.capitalValue === "WAITINGLIST"
          ) {
            setShowOption((prevState) => !prevState);
            mobileBookAppointment.previous_status = statusValue?.capitalValue;
            dispatch(
              setSingleMobileAppointmentRequestData(mobileBookAppointment)
            );
            onClick();
          } else {
            setShowOption((prevState) => !prevState);
          }
        } else if (item?.capitalValue === "CANCELLED") {
          if (statusValue?.capitalValue === "CANCELLED") {
            setShowOption((prevState) => !prevState);
          } else {
            const payload = {
              appointment_id: row?.original?.apt_id,
              status: item?.capitalValue,
            };
            setShowOption((prevState) => !prevState);
            onOpen(payload);
          }
        } else if (statusValue?.capitalValue === "CANCELLED") {
          setShowOption((prevState) => !prevState);
        } else {
          setShowOption((prevState) => !prevState);
          dispatch(
            setSingleMobileAppointmentRequestData(mobileBookAppointment)
          );
          onClick();
        }
      };

      const handleDropdown = () => {
        setShowOption((prevState) => !prevState);
      };

      return (
        <>
          <div className={styles.dropdownContainer} ref={statusRef}>
            <div
              className={styles[`${statusValue?.class}`]}
              onClick={handleDropdown}
            >
              <p>{statusValue?.value}</p>
              <DropDownIcon
                fillColor={statusValue?.color}
                customClass={styles.iconStyle}
              />
            </div>
            {showOption && (
              <div className={styles.optionContainer}>
                {optionData.map((item: any, index) => {
                  return (
                    <div
                      className={styles[`${item.class}`]}
                      onClick={() => handleStatus(item)}
                      key={index}
                    >
                      <p>{item.value}</p>
                      {/* <DropDownIcon
                        fillColor={item.color}
                        customClass={styles.iconStyle}
                      /> */}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </>
      );
    },
  },
  {
    Header: "PRICING",
    accessor: "apt_pricing",
    Cell: ({ row }: any) => {
      return (
        <>
          {row?.original?.apt_pricing ? (
            <span>${row?.original?.apt_pricing}</span>
          ) : (
            "-"
          )}
        </>
      );
    },
  },
  {
    Header: "SESSION TIME(SLOT)",
    accessor: "apt_slot",
    Cell: ({ row }: any) => {
      return (
        <>
          {row?.original?.apt_slot ? (
            <span>{row?.original?.apt_slot} MIN</span>
          ) : (
            "-"
          )}
        </>
      );
    },
  },
];

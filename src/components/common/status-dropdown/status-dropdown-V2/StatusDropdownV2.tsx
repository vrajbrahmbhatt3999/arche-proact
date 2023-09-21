import { FC, useState, useEffect } from "react";
import styles from "./statusDropdownV2.module.scss";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { updateAppointmentStatus } from "../../../../redux/features/appointment/appointmentAsyncActions";
import { requestGenerator } from "../../../../utils/payloadGenerator";
import { DropDownIcon } from "../../svg-components";
import { colors } from "../../../../constants/color";
import { getAllDoctorAppointmentLists } from "../../../../redux/features/doctor-dashboard/doctorDashboardAsyncActions";

interface IStatusDropdownV2 {
  appointmentStatus?: any;
  appointment_id?: any;
}
const StatusDropdownV2: FC<IStatusDropdownV2> = ({
  appointmentStatus,
  appointment_id,
}) => {
  const dispatch = useAppDispatch();
  const [showOption, setShowOption] = useState<boolean>(false);
  const [statusValue, setStatusValue] = useState<any>();

  let optionData = [
    {
      value: "PENDING",
      name: "Pending",
      class: "pending",
    },
    {
      value: "SCHEDULED",
      name: "Scheduled",
      class: "scheduled",
    },
    {
      value: "INPROGRESS",
      name: "In Progress",
      class: "inprogress",
    },
    {
      value: "COMPLETED",
      name: "Completed",
      class: "completed",
    },
    {
      value: "CANCELLED",
      name: "Cancelled",
      class: "cancelled",
    },
    {
      value: "ARRIVED",
      name: "Arrived",
      class: "arrived",
    },
    {
      value: "ARRIVED(CRM)",
      name: "Arrived(CRM)",
      class: "arrivedCrm",
    },
    {
      value: "NOSHOW",
      name: "No Show",
      class: "noshow",
    },
    {
      value: "RESCHEDULED",
      name: "Rescheduled",
      class: "rescheduled",
    },
    {
      value: "WAITINGLIST",
      name: "Waiting List",
      class: "waitinglist",
    },
  ];

  // show status selected option
  useEffect(() => {
    const selectedOption = optionData.find((option) => {
      return option.value === appointmentStatus;
    });
    setStatusValue(selectedOption);
  }, [appointmentStatus]);

  const { patientBranchList } = useAppSelector((state) => state.patient);
  let branche = patientBranchList?.branches;

  let branch_id = branche && branche.length > 0 && branche[0]?._id;

  const arr = statusValue?.value?.split(" ");

  for (var i = 0; i < arr?.length; i++) {
    arr[i] = arr[i]?.charAt(0)?.toUpperCase() + arr[i]?.slice(1).toLowerCase();
  }

  const handleStatus = (item: any) => {
    setStatusValue(item);
    setShowOption(!showOption);
    let reqData = {
      appointment_id: appointment_id,
      status: item?.value,
    };
    dispatch(updateAppointmentStatus(requestGenerator(reqData))).then((e) => {
      if (e.type === "appointment/updateAppointmentStatus/fulfilled") {
        let reqPayload = {
          patient: "",
          doctor: "",
          fileNo: "",
          status: "",
          branch_name: "",
          date: "",
          range: {
            fromDate: "",
            toDate: "",
          },
          page: 0,
          pageSize: 0,
        };
        dispatch(getAllDoctorAppointmentLists(requestGenerator(reqPayload)));
      }
    });
  };

  return (
    <>
      <div className={styles.dropdownContainer}>
        <div
          className={styles[`${statusValue?.class}`]}
          // style={{
          //   display: "flex",
          //   flexDirection: "row",
          //   alignItems: "center",
          // }}
        >
          <p>{statusValue?.name}</p>
          {/* <DropDownIcon
            fillColor={colors.black1}
            handleClick={() => setShowOption(!showOption)}
            customClass={styles.iconStyle}
          /> */}
        </div>
        {showOption && (
          <div className={styles.optionContainer}>
            {optionData?.map((item: any) => {
              if (item?.value !== statusValue?.value) {
                return (
                  <div onClick={() => handleStatus(item)}>
                    <p className={styles[`${item.class}`]}>{item.name}</p>
                  </div>
                );
              }
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default StatusDropdownV2;

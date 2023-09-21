import { FC, useEffect } from "react";
import { useLocation } from "react-router";
import { colors } from "../../../../../constants/color";
import { appointmentLogData } from "../../../../../constants/table-data/appointmentLogPopupData";
import { useAppDispatch, useAppSelector } from "../../../../../hooks";
import { getAppointmentLog } from "../../../../../redux/features/appointment/appointmentAsyncActions";
import { requestGenerator } from "../../../../../utils/payloadGenerator";
import Divider from "../../../divider/Divider";
import { CloseIcon } from "../../../svg-components";
import TableV2 from "../../../table/tableV2/TableV2";
import styles from "./appointmentLogPopup.module.scss";

interface IAppointmentLog {
  handleClick?: any;
  popData?: any;
}

const AppointmentLogPopup: FC<IAppointmentLog> = ({ handleClick, popData }) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { isLoading, appointmentLog } = useAppSelector(
    (state) => state.appointment
  );

  // console.log("popData>>>", popData);

  useEffect(() => {
    let reqData = {
      id: popData,
    };
    dispatch(getAppointmentLog(requestGenerator(reqData)));
  }, []);

  return (
    <>
      <div
        className={styles.popupContainer}
        // onClick={(e) => {
        //   e.stopPropagation();
        // }}
      >
        <CloseIcon
          customClass={styles.closeIconStyle}
          fillColor={colors.green1}
          handleClick={handleClick}
        />
        <div
          className={styles.viewAppointment}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <p className={styles.title}>Appointment Log</p>
          <Divider customClass={styles.dividerStyle} />
          <div
            // style={{
            //   height: "350px",
            //   overflow: "scroll",
            //   width: "100%",
            //   whiteSpace: "nowrap",
            // }}
            className={styles.tableBlock}
          >
            <TableV2
              tableHeaderData={appointmentLogData}
              tableRowData={appointmentLog}
              active={false}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AppointmentLogPopup;

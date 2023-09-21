import { FC, useEffect } from "react";
import { colors } from "../../../../../constants/color";
import { actionLogData } from "../../../../../constants/table-data/actionLogPopupData";
import { useAppDispatch, useAppSelector } from "../../../../../hooks";
import { getAppointmentLog } from "../../../../../redux/features/appointment/appointmentAsyncActions";
import { requestGenerator } from "../../../../../utils/payloadGenerator";
import Divider from "../../../divider/Divider";
import { CloseIcon } from "../../../svg-components";
import TableV2 from "../../../table/tableV2/TableV2";
import styles from "./actionLogPopup.module.scss";

interface IActionLog {
  handleClick?: any;
  popData?: any;
}

const ActionLogPopup: FC<IActionLog> = ({ handleClick, popData }) => {
  const dispatch = useAppDispatch();
  const { isLoading, actionLog } = useAppSelector((state) => state.appointment);

  useEffect(() => {
    let reqData = {
      id: popData,
    };
    dispatch(getAppointmentLog(requestGenerator(reqData)));
  }, [dispatch]);

  return (
    <>
      <div className={styles.popupContainer}>
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
          <p className={styles.title}>Action Log</p>
          <Divider customClass={styles.dividerStyle} />
          <div className={styles.tableBlock}>
            <TableV2
              tableHeaderData={actionLogData}
              tableRowData={actionLog}
              active={false}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ActionLogPopup;

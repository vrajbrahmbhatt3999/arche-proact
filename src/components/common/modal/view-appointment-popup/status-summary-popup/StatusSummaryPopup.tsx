import { FC, useEffect } from "react";
import { colors } from "../../../../../constants/color";
import { statusSummaryData } from "../../../../../constants/table-data/statusSummaryPopupData";
import { useAppDispatch, useAppSelector } from "../../../../../hooks";
import { getAppointmentSummary } from "../../../../../redux/features/appointment/appointmentAsyncActions";
import { requestGenerator } from "../../../../../utils/payloadGenerator";
import Divider from "../../../divider/Divider";
import Loader from "../../../spinner/Loader";
import { CloseIcon } from "../../../svg-components";
import TableV2 from "../../../table/tableV2/TableV2";
import styles from "./statusSummaryPopup.module.scss";

const StatusSummaryPopup: FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, appointmentSummary } = useAppSelector(
    (state) => state.appointment
  );

  useEffect(() => {
    dispatch(getAppointmentSummary(requestGenerator({})));
  }, [dispatch]);

  return (
    <>
      <div className={styles.popupContainer}>
        <CloseIcon
          customClass={styles.closeIconStyle}
          fillColor={colors.green1}
        />
        <div
          className={styles.viewAppointment}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <p className={styles.title}>Status Summary</p>
          <Divider customClass={styles.dividerStyle} />
          <div className={styles.tableBlock}>
            <TableV2
              tableHeaderData={statusSummaryData}
              tableRowData={appointmentSummary}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default StatusSummaryPopup;

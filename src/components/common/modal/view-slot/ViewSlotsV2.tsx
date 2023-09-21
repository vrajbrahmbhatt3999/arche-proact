import { FC, useEffect, useState } from "react";
import styles from "./viewSlots.module.scss";
import { CloseIcon } from "../../svg-components";
import { colors } from "../../../../constants/color";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import TableV2 from "../../table/tableV2/TableV2";
import { viewSlotsTableHeaderDataRecurring } from "../../../../constants/table-data/viewSlotsTableData";
import { setRecurringSelectedSlots } from "../../../../redux/features/appointments/bookingAppointmentsSlice";
import Button from "../../button/Button";
import { getRecurringAvailableSlots } from "../../../../redux/features/appointments/bookingAppointmentAsyncActions";
import { requestGenerator } from "../../../../utils/payloadGenerator";

interface IViewSlotsProps {
  handleClose?: (e?: React.MouseEvent<HTMLElement>) => void;
}

const ViewSlotsV2: FC<IViewSlotsProps> = ({ handleClose }) => {
  const { recurringAvailableSlots, payloadForAvailableSlots } = useAppSelector(
    (state) => state.appointments
  );
  const [slotError, setSlotError] = useState<string>("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      getRecurringAvailableSlots(requestGenerator(payloadForAvailableSlots))
    );
  }, [payloadForAvailableSlots]);
  const checkSelectedSlots = (slotes: string[], duration: number) => {
    try {
      if (slotes?.length === 0) {
        setSlotError("Please select time slots");
      } else {
        setSlotError("");
        dispatch(setRecurringSelectedSlots(slotes));
        handleClose && handleClose();
      }
    } catch (error) {
      setSlotError("Please select time slots");
    }
  };
  const handleSelectedSlots = () => {
    let selctedSlots: any = [];
    selctedSlots = recurringAvailableSlots
      ?.filter((item: any) => item?.selected)
      .map((item: any) => ({
        date: item?.date,
        day: item?.day,
        time: item?.value,
        duration: item?.duration,
      }));
    checkSelectedSlots(
      selctedSlots,
      payloadForAvailableSlots?.recurring_details?.duration ?? 30
    );
  };
  // useEffect(() => {
  //   return () => {
  //     dispatch(clearSlotData())
  //   }
  // }, [])
  return (
    <div
      className={styles.viewSlotsModalContainer}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <CloseIcon
        customClass={styles.closeIconStyle}
        fillColor={colors.green1}
        handleClick={() => {
          handleClose && handleClose();
        }}
      />

      <h1 className={styles.viewSlotsHeading}>View Slots</h1>
      <hr className={styles.viewSlotsModalDivider} />
      <div className={styles.viewSlotsContainer}>
        <TableV2
          tableHeaderData={viewSlotsTableHeaderDataRecurring || []}
          tableRowData={recurringAvailableSlots || []}
          active={false}
          customClassForTd={styles.slotTableColumn}
          customClassForTh={styles.slotTableColumnHead}
          customClasssForViewSlotTrHead={styles.customClasssForViewSlotTrHead}
        />
        <div className={styles.saveButtonContainer}>
          {slotError && <div className="dashboardFormError">{slotError}</div>}
          <Button
            title="Save"
            disable={recurringAvailableSlots?.length > 0 ? false : true}
            handleClick={() =>
              recurringAvailableSlots?.length > 0 && handleSelectedSlots()
            }
          />
        </div>
      </div>
    </div>
  );
};
export default ViewSlotsV2;

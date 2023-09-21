import { FC, useEffect, useState } from "react";
import styles from "./viewSlots.module.scss";
import { CloseIcon } from "../../svg-components";
import { colors } from "../../../../constants/color";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import TableV2 from "../../table/tableV2/TableV2";
import { viewSlotsTableHeaderData } from "../../../../constants/table-data/viewSlotsTableData";
import { setSelectedSlots } from "../../../../redux/features/appointments/bookingAppointmentsSlice";
import Button from "../../button/Button";
import { checkConsecutiveTimeSlots } from "../../../../utils/utils";
import { getAvailableSlots } from "../../../../redux/features/appointments/bookingAppointmentAsyncActions";
import { requestGenerator } from "../../../../utils/payloadGenerator";

interface IViewSlotsProps {
  handleClose?: (e?: React.MouseEvent<HTMLElement>) => void;
}

const ViewSlots: FC<IViewSlotsProps> = ({ handleClose }) => {
  const { availbleSlots, payloadForAvailableSlots } = useAppSelector(
    (state) => state.appointments
  );
  const [slotError, setSlotError] = useState<string>("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAvailableSlots(requestGenerator(payloadForAvailableSlots)));
  }, [payloadForAvailableSlots]);

  const checkSelectedSlots = async (slotes: string[], duration: number) => {
    try {
      const areConsecutive = await checkConsecutiveTimeSlots(slotes, duration);

      console.log("areConsecutive", areConsecutive);
      if (slotes?.length === 0) {
        setSlotError("Please select time slots");
      } else if (slotes?.length > 8) {
        setSlotError("Time slot selection should be less than 2 hrs");
      } else if (!areConsecutive) {
        setSlotError("Time slot selection should be consecutive");
      } else {
        setSlotError("");
        dispatch(setSelectedSlots(slotes));
        handleClose && handleClose();
      }
    } catch (error) {
      setSlotError("Time slot selection should be consecutive");
    }
  };
  const handleSelectedSlots = () => {
    let selctedSlots: any = [];
    selctedSlots = availbleSlots
      ?.filter((item: any) => item?.selected)
      .map((item: any) => item?.value);
    checkSelectedSlots(selctedSlots, 15);
    console.log("selected slots to check", selctedSlots);
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
          tableHeaderData={viewSlotsTableHeaderData || []}
          tableRowData={availbleSlots || []}
          active={false}
          customClassForTd={styles.slotTableColumn}
          customClassForTh={styles.slotTableColumnHead}
          customClasssForViewSlotTrHead={styles.customClasssForViewSlotTrHead}
        />
        <div className={styles.saveButtonContainer}>
          {slotError && <div className="dashboardFormError">{slotError}</div>}
          <Button
            title="Save"
            disable={availbleSlots?.length > 0 ? false : true}
            handleClick={() =>
              availbleSlots?.length > 0 && handleSelectedSlots()
            }
          />
        </div>
      </div>
    </div>
  );
};
export default ViewSlots;

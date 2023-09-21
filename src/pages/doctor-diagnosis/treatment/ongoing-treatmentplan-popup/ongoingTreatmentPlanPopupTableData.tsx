import moment from "moment";
import {
  setOngoingTreatmentPlanPopup,
  setTreatmentStatus,
  updateTreatmentPlansFromtable,
} from "../../../../redux/features/treatmentPlans/treatmentPlansSlice";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import {
  DiagnosCheckIcon,
  DiagnosPauseIcon,
  DiagnosPlayIcon,
} from "../../../../components/common/svg-components";
import styles from "./ongoingtreatmentplsnpopup.module.scss";

export const ongoingTreatmentPlanPopupHeaderData: any = [
  {
    Header: "Date",
    accessor: (row: any) => {
      return moment(row?.date).format("DD-MMM-YYYY") ?? "-";
    },
  },
  {
    Header: "Prescription Plan",
    accessor: (row: any) => {
      return row?.prescription_name ?? "-";
    },
  },
  {
    Header: "Select",
    Cell: (props: any) => {
      console.log(props.row.original, "propssss");
      const filterStatus = props.row.original?.plans?.map((s: any) =>
        s.services.filter((x: any) => x.status === "new")
      );

      const filterAttendedStatus = props.row.original?.plans?.map((s: any) =>
        s.services.filter((x: any) => x.status === "attended")
      );
      console.log(filterAttendedStatus?.flat(), "filters");
      const fetchCondition = filterStatus?.filter((s: any) => s.length > 0);
      const dispatch = useAppDispatch();

      const handleAdd = () => {
        const getSelectedData = props.row.original.plans.map((s: any) =>
          s.services.map((x: any) => x)
        );
        let data = [];
        data = getSelectedData?.flat()?.map((s: any) => {
          return {
            ...s,
            doctor_id: s?.doctor_id?._id,
            service_id: s?.service_id?._id,
            attended_by_id: s?.attended_by_id?._id,
            doctor_name: s?.doctor_id?.doctor_name,
            name: s?.service_id?.name,
            treatmentPlanName: s?.plan_id?.name,
            plan_id: s?.plan_id?._id,
          };
        });

        dispatch(updateTreatmentPlansFromtable(data));
        dispatch(setOngoingTreatmentPlanPopup(false));
      };

      const { TreatmentStatus } = useAppSelector(
        (state) => state.treatmentPlans
      );

      console.log(TreatmentStatus, "TreatmentStatus");

      const handleTestAdd = () => {
        dispatch(setTreatmentStatus(props.row.original._id));
      };

      return (
        <>
          {fetchCondition?.length > 0 ? (
            <>
              <div
                className={styles.addTestPopupAddToJob}
                onClick={handleTestAdd}
              >
                {!TreatmentStatus?.includes(props.row.original._id) ? (
                  <>
                    {!(filterAttendedStatus?.flat()?.length > 0) ? (
                      <DiagnosPlayIcon
                        fillColor="#02BF90"
                        style={{
                          cursor: "pointer",
                        }}
                        handleClick={() => handleAdd()}
                      />
                    ) : (
                      <DiagnosPauseIcon
                        fillColor="#273fad"
                        handleClick={() => handleAdd()}
                      />
                    )}
                  </>
                ) : (
                  <DiagnosPauseIcon fillColor="#FFA009" />
                )}
              </div>
            </>
          ) : (
            <>
             {/* <DiagnosPauseIcon fillColor="#FFA009" /> */}
            <DiagnosCheckIcon fillColor="#02BF90" />
            </>
          )}
        </>
      );
    },
  },
];

import { FC, useEffect } from "react";
import styles from "./ongoingtreatmentplsnpopup.module.scss";
import { CloseIcon } from "../../../../components/common/svg-components";
import Divider from "../../../../components/common/divider/Divider";
import TableV2 from "../../../../components/common/table/tableV2/TableV2";
import { ongoingTreatmentPlanPopupHeaderData } from "./ongoingTreatmentPlanPopupTableData";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { getAllDiagnosisTreatmentPlans } from "../../../../redux/features/treatmentPlans/treatmentPlansAsyncActions";
import { requestGenerator } from "../../../../utils/payloadGenerator";
interface ITreatmentPlanDialog {
  handleClose?: any;
}

const OngoingTreatmentPlanPopup: FC<ITreatmentPlanDialog> = ({
  handleClose,
}) => {
  const { getAllDiagnosisTreatmentPlan } = useAppSelector(
    (state) => state.treatmentPlans
  );

  const { patientFormData } = useAppSelector((state) => state.patientHistory);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let data = {
      patient_id: patientFormData?.patient_id,
      // patient_id: "6454c433ddf2093946625f70",
      page: 1,
      pageSize: 10,
      search: "",
      is_active: true,
    };
    dispatch(getAllDiagnosisTreatmentPlans(requestGenerator(data)));
  }, [dispatch, patientFormData?.patient_id]);

  return (
    <>
      <div
        className={styles.mainContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.iconContainer}>
          <CloseIcon
            customClass={styles.closeIconStyle}
            fillColor="#02BF90"
            handleClick={handleClose}
          />
        </div>

        <header className={styles.headerContainer}>
          <span className={styles.title}>On Going Treatment Plans</span>
          <Divider customClass={styles.dividerStyle} />
        </header>
        <div className={styles.tableContainer}>
          <TableV2
            tableHeaderData={ongoingTreatmentPlanPopupHeaderData}
            tableRowData={
              getAllDiagnosisTreatmentPlan?.length
                ? getAllDiagnosisTreatmentPlan
                : []
            }
            active={false}
          />
        </div>
      </div>
    </>
  );
};

export default OngoingTreatmentPlanPopup;

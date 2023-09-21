import { FC, useEffect } from "react";
import styles from "./styles.module.scss";
import { ViewServicesTableData } from "./viewServicesTableData";
import { useAppDispatch, useAppSelector } from "../../../../../hooks";
import { getAllDiagnosisTreatmentPlans } from "../../../../../redux/features/treatmentPlans/treatmentPlansAsyncActions";
import { CloseIcon } from "../../../../../components/common/svg-components";
import Divider from "../../../../../components/common/divider/Divider";
import TableV2 from "../../../../../components/common/table/tableV2/TableV2";
import { requestGenerator } from "../../../../../utils/payloadGenerator";

interface ITreatmentPlan {
  handleClose?: any;
  popData?: any;
}

const ViewServicesPopup: FC<ITreatmentPlan> = ({ handleClose, popData }) => {
  const { patientFormData } = useAppSelector((state) => state.patientHistory);
  const dispatch = useAppDispatch();
  useEffect(() => {
    let data = {
      patient_id: patientFormData?.patient_id,
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
          <span className={styles.title}>View Services</span>
          <Divider customClass={styles.dividerStyle} />
        </header>
        <div className={styles.tableContainer}>
          <TableV2
            tableHeaderData={ViewServicesTableData}
            tableRowData={popData}
            active={false}
          />
        </div>
      </div>
    </>
  );
};
export default ViewServicesPopup;

import { FC, useEffect } from "react";
import { colors } from "../../../../constants/color";
import { viewSpecialityTableHeaderData } from "../../../../constants/data";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { getAllSpeciality } from "../../../../redux/features/specialities/specialitiesAsyncActions";
import { requestGenerator } from "../../../../utils/payloadGenerator";
import Divider from "../../divider/Divider";
import { CloseIcon } from "../../svg-components";
import Table from "../../table/Table";
import styles from "./viewSpecialitiesPopup.module.scss";

interface IViewSpecialities {
  popData?: any;
}

const ViewSpecialitiesPopup: FC<IViewSpecialities> = ({ popData }) => {
  const dispatch = useAppDispatch();
  const { isLoading, specialityData } = useAppSelector(
    (state) => state.speciality
  );

  useEffect(() => {
    let data = {
      search: "",
      page: 0,
      pageSize: 10,
      department_id: popData,
    };
    dispatch(getAllSpeciality(requestGenerator(data)));
  }, [dispatch]);

  return (
    <>
      <div className={styles.popupContainer}>
        <CloseIcon
          customClass={styles.closeIconStyle}
          fillColor={colors.green1}
        />
        <div className={styles.viewContent}>
          <p className={styles.title}>View Specialty</p>
          <Divider customClass={styles.dividerStyle} />
          <div className={styles.tableContainer}>
            <Table
              tableHeaderData={viewSpecialityTableHeaderData}
              tableRowData={specialityData}
              customClassHeader={styles.customClassHeader}
              showSpeciality={false}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewSpecialitiesPopup;

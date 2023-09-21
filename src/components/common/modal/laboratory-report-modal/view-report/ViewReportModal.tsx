import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../hooks";
import { GetAllAddResultData } from "../../../../../redux/features/jobs/jobsAsyncActions";
import { requestGenerator } from "../../../../../utils/payloadGenerator";
import Loader from "../../../spinner/Loader";
import { CloseIcon } from "../../../svg-components";
import TableV2 from "../../../table/tableV2/TableV2";
import { colors } from "../../../../../constants/color";
import styles from "./viewreportmodal.module.scss";
import { ViewLabReportModal } from "./addResultTableData";
interface IPropsData {
  handleClose?: () => void;
  popData?: any;
  handleOpen?: any;
}
const ViewReportModal: FC<IPropsData> = ({
  handleClose,
  popData,
  handleOpen,
}) => {
  const { getAllAddResultData, isLoading } = useAppSelector(
    (state) => state.labsJob
  );

  const filterData = popData?.profile.map((item: any) => item.tests);
  const flatFilterdData = filterData?.flat();

  const getTestProfileWithComponent = popData?.profile.map((s: any) => {
    const data = s.tests?.map((x: any) => {
      const FilterComonent: any = getAllAddResultData?.filter(
        (item: any) => item._id === x.test_component_id
      );
      return {
        profile_name: s.profile_name ?? "-",
        ...x,
        components: FilterComonent?.[0]?.components,
      };
    });
    return data;
  });

  const flatNestedTestData = getTestProfileWithComponent?.flat();
  const dispatch = useAppDispatch();

  useEffect(() => {
    let reqPayload = {
      testIds: flatFilterdData?.map((x: any) => x.test_component_id),
    };
    dispatch(GetAllAddResultData(requestGenerator(reqPayload)));
  }, [dispatch]);
  return (
    <>
      {isLoading && <Loader />}
      <div
        className={styles.addResultsPopupContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <CloseIcon
          customClass={styles.closeIconStyle}
          fillColor={colors.green1}
          handleClick={handleClose}
        />
          <p className={styles.resultsTitle}>
            Job ID <span className={styles.resultsId}>{popData?.job_no}</span>
          </p>

          <div className={styles.tableContainer}>
            <TableV2
              tableHeaderData={ViewLabReportModal}
              tableRowData={flatNestedTestData}
              active={false}
              handleClick={popData}
              handleRowClick={handleOpen}
            />
          </div>
      </div>
    </>
  );
};

export default ViewReportModal;

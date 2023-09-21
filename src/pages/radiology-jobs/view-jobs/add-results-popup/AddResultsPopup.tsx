import { FC } from "react";
import { colors } from "../../../../constants/color";
import { CloseIcon } from "../../../../components/common/svg-components/index";
import styles from "./addresultsPopup.module.scss";
import Button from "../../../../components/common/button/Button";
import TableV2 from "../../../../components/common/table/tableV2/TableV2";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { requestGenerator } from "../../../../utils/payloadGenerator";
import { useForm, FormProvider } from "react-hook-form";
import { UpdateLabJobsAsyncData, ViewJobsAsyncData } from "../../../../redux/features/radiology-jobs/jobsAsyncActions";
import { setShowAddResultPopup } from "../../../../redux/features/radiology-jobs/jobsSlice";
import Loader from "../../../../components/common/spinner/Loader";
interface IPropsData {
  handleClose?: () => void;
  popData?: any;
  headerData?: any;
  handleOpen?: any;
  setDeleteFlag?: boolean;
  setModelOpenClose?: any;
}
const AddResultsPopup: FC<IPropsData> = ({
  handleClose,
  popData,
  headerData,
  handleOpen,
  setDeleteFlag = true,
  setModelOpenClose,
}) => {

  const { getAllLabViewJobsPayload, isLoading } = useAppSelector((state) => state.radiologyJobs);

  const dispatch = useAppDispatch();

  const methods = useForm();
  
  const onSubmit = (item: any) => {
    const testData = popData.profile.map((i: any) => {
      return {
        ...i,
        tests: i?.tests?.map((e: any) => {
          return {
            ...e,
            remark: item?.[`select${e?._id}`] ?? "",
          };
        }),
      };
    });

    const data = {
      job_id: popData?._id,
      type: "add_result",
      job_type: "RADIOLOGY",
      profile: testData ?? [],
    };
    dispatch(UpdateLabJobsAsyncData(requestGenerator(data))).then((e: any) => {
      if (e.type === "job/UpdateLabJobsAsyncData/fulfilled") {
        let reqPayload = {
          page: getAllLabViewJobsPayload?.page,
          pageSize: getAllLabViewJobsPayload?.pageSize,
          job_type: "RADIOLOGY",
          is_internal: true,
        };
        dispatch(ViewJobsAsyncData(requestGenerator(reqPayload)));
        dispatch(setShowAddResultPopup(false));
      }
    });
  };
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
        <FormProvider {...methods}>
          <form
            className={styles.addResultsContainer}
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <p className={styles.resultsTitle}>
              Job ID <span className={styles.resultsId}>{popData?.job_no}</span>
            </p>

            <div className={styles.tableContainer}>
              <TableV2
                tableHeaderData={headerData}
                tableRowData={popData?.profile}
                active={false}
                handleClick={popData}
                handleRowClick={handleOpen}
                setModelOpenClose={setModelOpenClose}
              />
            </div>
            {setDeleteFlag && 
            <div className={styles.buttonContainer}>
              <Button
                title="Submit"
                type="submit"
                customClass={styles.submitBtn}
              />
            </div>
            }
          </form>
        </FormProvider>
      </div>
    </>
  );
};

export default AddResultsPopup;

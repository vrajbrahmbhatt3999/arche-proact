import { FC } from "react";
import { colors } from "../../../../constants/color";
import Divider from "../../../../components/common/divider/Divider";
import { CloseIcon } from "../../../../components/common/svg-components/index";
import styles from "./addresultsnotesPopup.module.scss";
import Button from "../../../../components/common/button/Button";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { useForm } from "react-hook-form";

import { requestGenerator } from "../../../../utils/payloadGenerator";
import {
  setShowAddResultPopup,
  setShowObservations,
} from "../../../../redux/features/radiology-jobs/jobsSlice";
import {
  UpdateLabJobsAsyncData,
  ViewJobsAsyncData,
} from "../../../../redux/features/radiology-jobs/jobsAsyncActions";
import Loader from "../../../../components/common/spinner/Loader";
interface IPropsData {
  handleClose?: any;
  popData?: any;
  register?: any;
}
const AddObservationsPopup: FC<IPropsData> = ({ handleClose, popData }) => {
  const { handleSubmit, register } = useForm();
  const dispatch: any = useAppDispatch();
  const { getAllLabViewJobsPayload, notesData, isLoading, checkPopupStatusKey } = useAppSelector(
    (state) => state.radiologyJobs
  );

  const submitData = (item: any) => {
    const testData = notesData?.profile?.map((i: any) => {
      return {
        ...i,
        tests: i?.tests?.map((d: any) => {
          if (!!item[`observations${d?._id}`]) {
            return { ...d, result: item?.[`observations${d?._id}`] ?? "" };
          } else {
            return d;
          }
        }),
      };
    });

    const data = {
      job_id: notesData?._id,
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
        dispatch(setShowObservations(false));
        dispatch(setShowAddResultPopup(false));
      }
    });
  };

  return (
    <>
    {isLoading && <Loader />}
    <div
      className={styles.addResultsNotesPopupContainer}
      onClick={(e) => e.stopPropagation()}
    >
      <CloseIcon
        customClass={styles.closeIconStyle}
        fillColor={colors.green1}
        handleClick={() => handleClose()}
      />
      <div className={styles.addResultsNotesContainer}>
        <p className={styles.title}>Observations</p>
        <Divider customClass={styles.dividerStyle} />
        <form onSubmit={handleSubmit(submitData)}>
          <textarea
            className={styles.textContainer}
            placeholder="Please enter Notes"
            {...register(`observations${popData?.sId}`)}
            defaultValue={popData?.s?.result}
          />
            {!checkPopupStatusKey && (

          <div className={styles.btnContainer}>
            <Button title="Submit" type="submit" />
          </div>
            )}
        </form>
      </div>
    </div>
    </>
  );
};

export default AddObservationsPopup;

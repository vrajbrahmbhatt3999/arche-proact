import { FC, useEffect } from "react";
import { colors } from "../../../../constants/color";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { getRecentMedicalHistory } from "../../../../redux/features/patient-emr/patient/patientAsyncAction";
import { requestGenerator } from "../../../../utils/payloadGenerator";
import Divider from "../../divider/Divider";
import Loader from "../../spinner/Loader";
import { CloseIcon } from "../../svg-components";
import styles from "./recentHistoryPopup.module.scss";
import { utcToDate } from "../../../../utils/utils";

const RecentHistoryPopup: FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, medicalHistoryInfo, patientDataObjectById } =
    useAppSelector((state) => state.patient);

  let questionnaire = medicalHistoryInfo?.questionnaire;
  let date = utcToDate(medicalHistoryInfo?.updatedAt);

  console.log("date>>>>", date);

  useEffect(() => {
    let data = {
      patient_id: patientDataObjectById?._id,
    };
    dispatch(getRecentMedicalHistory(requestGenerator(data)));
  }, [dispatch]);

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.popupContainer}>
        <CloseIcon
          customClass={styles.closeIconStyle}
          fillColor={colors.green1}
        />
        <div className={styles.recentHistory}>
          <p className={styles.title}>Recent History</p>
          <Divider customClass={styles.dividerStyle} />
          <div className={styles.recentContent}>
            {questionnaire?.length > 0 ? (
              <p className={styles.date}>Date: {date}</p>
            ) : (
              <p style={{ textAlign: "center", margin: "20px 0" }}>
                No record found
              </p>
            )}
            {questionnaire?.map((item: any, index: number) => {
              return (
                <div className={styles.questionContainer}>
                  <p>{index + 1}</p>
                  <div className={styles.questionContent}>
                    <p className={styles.question}>{item?.question}</p>
                    <p className={styles.answer}>{item?.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default RecentHistoryPopup;

import { FC, useState } from "react";
import {
  ClockIcon,
  DropdownGreen,
  EmailBlue,
  LinkIcon,
  MedicalHistoryIcon,
  NotesIcon,
  ShareIcon,
} from "../../../../components/common/svg-components";
import { colors } from "../../../../constants/color";
import styles from "./medicalHistory.module.scss";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { setMessage } from "../../../../redux/features/toast/toastSlice";
import { success } from "../../../../constants/data";
import { SUBMIT_OTP_URL } from "../../../../constants/constant";

interface IMedicalHistory {
  handleViewHistory?: any;
  handleRecentHistory?: any;
  showOption?: any;
  setShowOption?: any;
}

const MedicalHistory: FC<IMedicalHistory> = ({
  handleViewHistory,
  handleRecentHistory,
  showOption,
  setShowOption,
}) => {
  const [showQuestion, setShowQuestion] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, patientDataObjectById } = useAppSelector(
    (state) => state.patient
  );

  const copyLink = () => {
    if (patientDataObjectById?.email === undefined) {
      let toastData = {
        message: "Please load patient data",
        type: success,
      };
      dispatch(setMessage(toastData));
    } else {
      const textToCopy =
        SUBMIT_OTP_URL +
        "?email=" +
        `${patientDataObjectById?.email}` +
        "&form=form1";
      navigator.clipboard.writeText(textToCopy as any);
      let toastData = {
        message: "Link copied to clipboard",
        type: success,
      };
      dispatch(setMessage(toastData));
    }
  };

  const handleEmailClick = () => {
    // if (patientDataObjectById?.email === undefined) {
    //   let toastData = {
    //     message: "Please load patient data",
    //     type: success,
    //   };
    //   dispatch(setMessage(toastData));
    // } else {
    navigate("/patientemr/sharequestionnaireemail");
    // }
  };

  return (
    <>
      <div
        className={styles.mainContainer}
        onClick={() => {
          setShowOption(!showOption);
        }}
      >
        <div className={styles.medicalHistoryContainer}>
          <div className={styles.titleContainer}>
            <MedicalHistoryIcon />
            <p className={styles.title}>Medical History</p>
          </div>
          <DropdownGreen
            fillColor={colors.green1}
            handleClick={() => {
              setShowOption(!showOption);
              setShowQuestion(false);
            }}
          />
        </div>
        {showOption && (
          <div
            className={styles.optionsContainer}
            onClick={(e: any) => {
              e.stopPropagation();
            }}
          >
            <div className={styles.optionList}>
              <ShareIcon fillColor={colors.black1} />
              <p
                className={styles.content}
                onClick={() => setShowQuestion(!showQuestion)}
              >
                Share Questionnaire
              </p>
              {showQuestion && (
                <div className={styles.showQuestionContainer}>
                  <EmailBlue handleClick={handleEmailClick} />
                  <div className={styles.linkStyle}>
                    <LinkIcon handleClick={() => copyLink()} />
                  </div>
                </div>
              )}
            </div>
            <div className={styles.optionList}>
              <ClockIcon fillColor={colors.black1} />
              <p className={styles.content} onClick={handleRecentHistory}>
                Recent History
              </p>
            </div>
            <div className={styles.optionList}>
              <NotesIcon fillColor={colors.black1} />
              <p className={styles.content} onClick={handleViewHistory}>
                View History
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MedicalHistory;

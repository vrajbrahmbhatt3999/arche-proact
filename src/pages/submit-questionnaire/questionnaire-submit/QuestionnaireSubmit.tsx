import { FC } from "react";
import styles from "./questionnaire.module.scss";
import { Check } from "../../../components/common/svg-components/index";

const QuestionnaireSubmit: FC = () => {
  return (
    <>
      <div className={styles.successContainer}>
        <Check width={140} height={140} />
        <p className={styles.title}>
          Your Questionnaire Successfully Submitted
        </p>
      </div>
    </>
  );
};

export default QuestionnaireSubmit;

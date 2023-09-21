import { FC } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styles from "./submitQuestionnaireLayout.module.scss";
import proactlatestlogo from "../../../assets/images/proactlatestlogo.png";
import {
  CallIcon,
  EmailIcon,
  InfoIcon,
} from "../../../components/common/svg-components/index";
import { colors } from "../../../constants/color";

interface IPatientEmrLayout {}

const SubmitQuestionnaireLayout: FC<IPatientEmrLayout> = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.backContainer}>
          {/* <div className={styles.back} onClick={() => navigate("/")}>
            <p className={styles.backText}>Back</p>
            <InfoIcon fillColor={colors.grey2} />
          </div> */}
        </div>
        <div className={styles.headerContainer}>
          <div className={styles.header}>
            <div className={styles.logoContainer}>
              <img
                src={proactlatestlogo}
                alt="profile_img"
                className={styles.logoStyle}
              />
              <p className={styles.title}>Medical Center</p>
            </div>
            <div className={styles.contactContainer}>
              <CallIcon fillColor={colors.blue2} />
              <p className={styles.phoneNumber}>+971 55 410 2865</p>
              <EmailIcon width={25} height={20} fillColor={colors.blue2} />
              <p className={styles.emailText}>Inquiry@medicalcenter.com</p>
            </div>
          </div>
          <Outlet />
        </div>
        <div className={styles.rightEmpty}></div>
      </div>
    </>
  );
};

export default SubmitQuestionnaireLayout;

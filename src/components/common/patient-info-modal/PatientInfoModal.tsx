import React, { FC } from "react";
import styles from "./patientInfoModal.module.scss";
import SelectImage from "../../../assets/images/Default Image.png";

interface FileList {
  nationalId?: string;
  mobileNo?: string;
  patientImage?: string;
}
const GlobalPatientInfoModal: FC<FileList> = ({ nationalId, mobileNo, patientImage }) => {
  return (
      <section className={styles.patientInfoMainContainer}>
        <div className={styles.patientDetailContainer}>
          <span style={{ display: "flex", alignItems: 'center' }}>
            <label className={styles.labelTextStyle}>National ID :</label>
            <span>{nationalId}</span>
          </span>

          <span style={{ display: "flex", alignItems: 'center' }}>
            <label className={styles.labelTextStyle}>Mobile No :</label>
            <span>{mobileNo}</span>
          </span>
        </div>
        <div className={styles.patientImageContainer}>
          <img
            src={patientImage?.length ? patientImage : SelectImage}
            style={{
              objectFit: "cover",
              width: "90%",
              height: "80px",
              margin: "5px ",
            }}
            alt=""
          />
        </div>
      </section>
  );
};

export default GlobalPatientInfoModal;

import React, { FC, useState } from "react";
import { colors } from "../../../constants/color";
import styles from "./floatingBar.module.scss";

interface IFloatingBarModal {
  floatingBarData: any;
  customClass?: string;
}

const FloatingBar: FC<IFloatingBarModal> = ({
  floatingBarData,
  customClass,
}) => {
  const [formActionValue, setFormActionValue] = useState(-1);

  return (
    <div
      className={[styles.mainContainerFormActionSidebar, customClass].join(" ")}
    >
      {floatingBarData?.map((item: any, index: any) => {
        return (
          <React.Fragment key={index}>
            <button
              // onClick={() => {
              //   trigger(PATIENT_PROFILE_PIC);
              // }}
              className={styles.floatingBarBtn}
            >
              <div className={styles.iconStyleContainer} key={index}>
                <item.icon
                  customClass={styles.iconStyle}
                  fillColor={
                    index !== formActionValue ? colors.grey4 : colors.blue1
                  }
                  mouseEnter={() => setFormActionValue(index)}
                  mouseLeave={() => setFormActionValue(-1)}
                />
                <p className={styles.tooltiptext}>{item.name}</p>
              </div>
            </button>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default FloatingBar;

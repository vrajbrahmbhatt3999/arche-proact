import React, { FC, useState } from "react";
import styles from "./formActionSidebar.module.scss";
import { colors } from "../../../constants/color";
import { NavLink } from "react-router-dom";
import { formActionData } from "../../../constants/data";

interface IFormAction {}

const FormActionSidebar: FC<IFormAction> = () => {
  const [value, setValue] = useState(-1);
  // console.log('value', value)
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.sidebarData}>
          {formActionData.map((item: any, index: any) => {
            return (
              <React.Fragment key={index}>
                <div className={styles.iconStyleContainer} key={index}>
                  <item.icon
                    customClass={styles.iconStyle}
                    fillColor={index !== value ? "#CDD4D8" : "#3D96E7"}
                    mouseEnter={() => setValue(index)}
                    mouseLeave={() => setValue(-1)}
                  />

                  <p className={styles.tooltiptext}>{item.name}</p>

                  {item?.id}
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default FormActionSidebar;

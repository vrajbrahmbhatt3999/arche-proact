import React, { FC } from "react";
import styles from "./adminModuleScreens.module.scss";
import { moduleScreenData } from "../../constants/data";
import { NavLink } from "react-router-dom";
interface IAdminModuleScreens {}

const AdminModuleScreens: FC<IAdminModuleScreens> = () => {
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.container}>
          {moduleScreenData?.map((item: any, index: number) => {
            console.log("item", item);
            return (
              <React.Fragment key={index}>
                <NavLink
                  to={item.navigate}
                  className={({ isActive }) =>
                    isActive ? styles.active : styles.sidebarContent
                  }
                >
                  <div className={styles.moduleBoxContainer}>
                    <p className={styles.moduleNameStyle}>{item?.name}</p>
                  </div>
                </NavLink>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AdminModuleScreens;

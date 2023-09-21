import { FC, useEffect, useState } from "react";
import styles from "./ManageAssignTagModal.module.scss";
import { CloseIcon } from "../../svg-components";
import { colors } from "../../../../constants/color";
import Button from "../../button/Button";
import Divider from "../../divider/Divider";

interface IManageAssignTag {}

const ManageAssignTagModal: FC<IManageAssignTag> = () => {
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.closeIconContainer}>
          <CloseIcon
            customClass={styles.closeIconStyle}
            fillColor={colors.green1}
          />
        </div>
        <p className={styles.title}>Status</p>
        <Divider customClass={styles.dividerStyle} />
        <div
          className={styles.tableContainer}
          onClick={(e) => {
            e.stopPropagation();
          }}
        ></div>
        <span>
          Are you sure you want to change the selected Category status?
        </span>
        <Button
          title="Yes"
          customClass={styles.buttonStyle}
          //   handleClick={() => handleAssignTag()}
        />
        <Button
          title="No"
          customClass={styles.buttonStyle}
          //   handleClick={() => handleAssignTag()}
        />
      </div>
      sd
    </>
  );
};

export default ManageAssignTagModal;

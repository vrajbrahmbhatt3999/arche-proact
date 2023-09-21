import { FC, useState } from "react";
import { colors } from "../../../../constants/color";
import { useAppDispatch } from "../../../../hooks";
import { getDefaultBranch } from "../../../../redux/features/branch/branchAsyncActions";
import { requestGenerator } from "../../../../utils/payloadGenerator";
import Button from "../../button/Button";
import Divider from "../../divider/Divider";
import { CloseIcon } from "../../svg-components";
import styles from "./defaultBranchPopup.module.scss";
interface IStatusConfirm {
  popData?: any;
  setModelOpenClose?: any;
  isDefault?: boolean;
  setIsDefault?: any;
  handleNo?: any;
}

const DefaultBranchPopup: FC<IStatusConfirm> = ({
  popData,
  isDefault,
  setIsDefault,
  handleNo,
}) => {
  const dispatch = useAppDispatch();

  const handleYes = () => {
    let id = popData?.value;
    let data = {
      is_default: true,
    };
    dispatch(getDefaultBranch(requestGenerator({ id, data }))).then((e) => {
      console.log("e>>>>>>> data>>>>", e);
      if (e.type === "branch/getDefaultBranch/fulfilled") {
        setIsDefault(true);
      }
      if (e.payload === "Default branch already exists") {
        setIsDefault(true);
      }
    });
  };

  return (
    <>
      <div className={styles.popupContainer}>
        <CloseIcon
          customClass={styles.closeIconStyle}
          fillColor={colors.green1}
          handleClick={handleNo}
        />
        <div className={styles.statusContainer}>
          <p className={styles.title}>Set Default Branch</p>
          <Divider customClass={styles.dividerStyle} />
          <p className={styles.userText}>
            This is one time change for selecting default branch, this will
            affect file no. sequence of all the branches, are you sure you want
            to change ?
          </p>
          <div className={styles.btnContainer}>
            <Button
              title="Yes"
              customClass={styles.btnStyle}
              handleClick={handleYes}
            />
            <Button
              title="No"
              customClass={styles.yesButton}
              handleClick={handleNo}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DefaultBranchPopup;

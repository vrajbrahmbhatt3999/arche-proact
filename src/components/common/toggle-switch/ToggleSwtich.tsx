import { FC } from "react";
import styles from "./toggleswitch.module.scss";

interface IToggleSwitchProps {
  isToggled?: boolean;
  setIsToggled?: (value: boolean) => void;
  handleToggle?: any;
  id?: any;
}

const ToggleSwitch: FC<IToggleSwitchProps> = ({
  isToggled,
  setIsToggled,
  handleToggle,
}) => {
  return (
    <label className={styles.toggleContainer}>
      <input
        type="checkbox"
        checked
        // onChange={() => {
        //   handleToggle();
        // }}
        onChange={(e) => {
          setIsToggled && setIsToggled(e.target.checked);
        }}
        className={styles.checkbox}
      />
      <span className={isToggled ? styles.toggled : styles.notToggled}>
        <span className={styles.slider}></span>
      </span>
    </label>
  );
};

export default ToggleSwitch;

import { FC } from "react";
import styles from "./inputTextfield.module.scss";
import { colors } from "../../../constants/color";
import { CrossIcon } from "../svg-components";

interface ITextField {
  label?: string;
  value?: any;
  onLabelChange?: any;
  onValueChange?: any;
  handleClick?: any;
  disabledLabelValue?: boolean;
  disabledValue?: boolean;
  isIcon?: boolean;
  customInputFieldClass?: any;
}

const InputTextfield: FC<ITextField> = ({
  label,
  value,
  onLabelChange,
  onValueChange,
  handleClick,
  disabledLabelValue,
  disabledValue,
  isIcon,
  customInputFieldClass,
}) => {
  return (
    <>
      <div className={styles.mainContainer}>
        <input
          className={
            disabledLabelValue
              ? styles.disabledlabelInputField
              : styles.labelInputField
          }
          // className={styles.labelInputField}
          type="text"
          value={label}
          onChange={(e) => {
            onLabelChange && onLabelChange(e);
          }}
          placeholder="Enter label name"
          disabled={disabledLabelValue}
        />
        <input
          // className={styles.inputField}
          className={customInputFieldClass}
          type="text"
          value={value}
          disabled={disabledValue}
        />
        {isIcon && (
          <CrossIcon
            fillColor={colors.white1}
            fillColor1={colors.red1}
            customClass={styles.crossIconStyle}
            handleClick={handleClick}
          />
        )}
      </div>
    </>
  );
};

export default InputTextfield;

import React from "react";
import { colors } from "../../../constants/color";
import { SearchIcon } from "../svg-components";
import styles from "./style.module.scss";

interface IInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  customClass?: string;
  labelText?: string;
  requiredField?: boolean;
  htmlFor?: string;
  labelClass?: string;
  showIcon?: boolean;
  errorMessage?: any;
  showErrors?: any;
  staticText?: string;
  handleIconClick?: () => void;
  inlineClass?: string;
  children?: any;
}

export const Input = React.forwardRef<any, IInputProps>(
  (
    {
      customClass,
      labelText,
      requiredField,
      htmlFor,
      labelClass,
      showIcon,
      errorMessage,
      showErrors,
      staticText,
      handleIconClick,
      inlineClass,
      children,
      ...restInputProps
    },
    ref
  ) => {
    return (
      <>
        <div className={styles.inputFieldContainer}>
          {labelText?.length && (
            <label
              htmlFor={htmlFor}
              className={[styles.labelWrapper, labelClass].join(" ")}
            >
              {labelText}
              {requiredField && <span className={styles.requiredField}>*</span>}
            </label>
          )}
          <div className={[styles.inlineItems, inlineClass].join(" ")}>
            {staticText?.length ? (
              <span className={styles.rdSpan}>{staticText}</span>
            ) : ''}
            <input
              className={[styles.fileInputField, customClass]?.join(" ")}
              ref={ref}
              {...restInputProps}
            />
            {showIcon && (
              <SearchIcon
                fillColor={colors.black1}
                customClass={styles.searchIconStyle}
                handleClick={handleIconClick}
              />
            )}
             {children}
          </div>
        </div>
        {!!showErrors && (
          <div className={styles.errorContainer}>
            <span className={styles.extraSpan} />
            <p className="dashboardFormError">{errorMessage}</p>
          </div>
        )}
      </>
    );
  }
);

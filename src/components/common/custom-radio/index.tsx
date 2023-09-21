import React from "react";
import styles from "./style.module.scss";
interface IInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  customLabel?: string;
  label?: string;
}

export const CustomRadio = React.forwardRef<any, IInputProps>(
  ({ customLabel, label, ...restInputProps }, ref) => {
    return (
      <>
        <label className={[styles.radioLabel, customLabel]?.join(" ")}>
          <input
            type="radio"
            className={styles.radioInput}
            ref={ref}
            {...restInputProps}
          />
          <span className={styles.customRadio} />
          {label}
        </label>
      </>
    );
  }
);

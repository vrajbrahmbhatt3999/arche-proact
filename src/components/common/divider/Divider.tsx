import { FC } from "react";
import styles from "./divider.module.scss";

interface IDivider {
  customClass?: string;
}
const Divider: FC<IDivider> = ({ customClass }) => {
  return (
    <>
      <hr className={[styles.divider, customClass].join(" ")} />
    </>
  );
};

export default Divider;

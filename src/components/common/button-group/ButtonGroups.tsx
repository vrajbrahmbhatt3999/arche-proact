import { FC } from "react";
import Button from "../button/Button";
import styles from "./buttonGroups.module.scss";

interface IButtonGroup {
  titleOne: string;
  titleTwo: string;
  handleClickOne?: any;
  handleClickTwo?: any;
  btnOneCustomClass?: any;
  btnTwoCustomClass?: any;
}

const ButtonGroups: FC<IButtonGroup> = ({
  titleOne,
  titleTwo,
  handleClickOne,
  handleClickTwo,
  btnOneCustomClass,
  btnTwoCustomClass,
}) => {
  return (
    <>
      <div className={styles.buttonContainer}>
        <Button
          title={titleOne}
          handleClick={handleClickOne}
          customClass={btnOneCustomClass}
        />
        <Button
          title={titleTwo}
          handleClick={handleClickTwo}
          customClass={btnTwoCustomClass}
        />
      </div>
    </>
  );
};

export default ButtonGroups;

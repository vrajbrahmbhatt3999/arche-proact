import { FC, useState, useEffect } from "react";
import styles from "./statusdropdownv3.module.scss";
import { useAppDispatch } from "../../../../hooks";
import { DropDownIcon } from "../../svg-components";
import { colors } from "../../../../constants/color";

interface IStatusDropdownV3 {
  appointmentStatus?: any;
  appointment_id?: any;
  optionData?:any
  customDropdownContainer?:any
}
const StatusDropdownV3: FC<IStatusDropdownV3> = ({
  appointmentStatus,
  appointment_id,
  customDropdownContainer
}) => {
  const [showOption, setShowOption] = useState<boolean>(false);
  const [statusValue, setStatusValue] = useState<any>();

  let optionData = [
    {
      value: "INITIATED",
      name: "Initiated",
      class: "initiated",
    },
    {
      value: "PARTIAL",
      name: "Partial",
      class: "partial",
    },
    {
      value: "COMPLETED",
      name: "Completed",
      class: "completed",
    },
  ];

  // show status selected option
  useEffect(() => {
    const selectedOption = optionData.find((option) => {
      return option.value === "INITIATED";
    });
    setStatusValue(selectedOption);
  }, []);



  const arr = statusValue?.value?.split(" ");

  for (var i = 0; i < arr?.length; i++) {
    arr[i] = arr[i]?.charAt(0)?.toUpperCase() + arr[i]?.slice(1).toLowerCase();
  }

  const handleStatus = (item: any) => {
    setStatusValue(item);
    setShowOption(!showOption);
  
  };

  return (
    <>
      <div className={[styles.dropdownContainer,customDropdownContainer].join("")} onClick={()=>setShowOption(!showOption)}>
        <div
          className={styles[`${statusValue?.class}`]}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <p className={styles.text}>{statusValue?.name}</p>
          <DropDownIcon
            fillColor={colors.black1}
            handleClick={() => setShowOption(!showOption)}
            customClass={styles.iconStyle}
          />
        </div>
        {showOption && (
          <div className={styles.optionContainer}>
            {optionData?.map((item: any) => {
              if (item?.value !== statusValue?.value) {
                return (
                  <div onClick={() => handleStatus(item)}>
                    <p className={styles[`${item.class}`]}>{item.name}</p>
                  </div>
                );
              }
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default StatusDropdownV3;

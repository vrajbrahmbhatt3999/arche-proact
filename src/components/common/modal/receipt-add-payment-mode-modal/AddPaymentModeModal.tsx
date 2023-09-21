import { FC, useState, useEffect } from "react";
import { CloseIcon } from "../../../../components/common/svg-components";
import { useAppDispatch, useAppSelector } from "../../../../hooks/index";
import { colors } from "../../../../constants/color";
// import { paymentModeModalData } from "../../../../constants/data";
import styles from "./addPaymentModeModal.module.scss";
import Button from "../../button/Button";

interface IAddPaymentModeModal {
  handleClose: (e?: React.MouseEvent<HTMLElement>) => void;
  handleYes?: any;
  popData?: any;
}

const AddPaymentModeModal: FC<IAddPaymentModeModal> = ({
  handleClose,
  handleYes,
  popData,
}) => {
  const [paymentModeData, setPaymentModeData] = useState<any>({});
  // funtion for handling payment mode
  const handlePaymentMode = (item: any) => {
    if (item?.payment_mode_id === paymentModeData?.payment_mode_id) {
      setPaymentModeData({});
    } else {
      setPaymentModeData(item);
    }
  };

  return (
    <>
      <div
        className={styles.addPaymentModeModalContainer}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <CloseIcon
          customClass={styles.closeIconStyle}
          fillColor={colors.green1}
          handleClick={() => {
            handleClose();
          }}
        />

        <h1 className={styles.addPaymentModeModalHeading}>Payment Mode</h1>
        <hr className={styles.addPaymentModeModalDivider} />
        <div className={styles.addPaymentModeContainer}>
          {popData?.map((item: any, index: any) => (
            <div
              className={
                item?.is_payment_disable === false
                  ? item?.payment_mode_id === paymentModeData?.payment_mode_id
                    ? styles.addPaymentModeActiveCard
                    : styles.addPaymentModeCard
                  : styles.addPaymentModeDisableCard
              }
              onClick={() =>
                item?.is_payment_disable === false && handlePaymentMode(item)
              }
              key={index}
            >
              <div className={styles.addPaymentModeImg}>
                <img src={item?.payment_mode_img} alt="payment-mode-img" />
              </div>
              <p className={styles.addPaymentModeCardText}>
                {item?.payment_mode_label}
              </p>
            </div>
          ))}
        </div>
        <div className={styles.addPaymentModeBtnContaniner}>
          <Button
            title="Add"
            type="button"
            customClass={styles.addPaymentModeBtn}
            handleClick={() => handleYes(paymentModeData)}
            disable={Object.keys(paymentModeData).length > 0 ? false : true}
          />
        </div>
      </div>
    </>
  );
};

export default AddPaymentModeModal;

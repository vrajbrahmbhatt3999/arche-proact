import { FC, useEffect } from "react";
import Select from "react-select";
import { DropdownIndicator } from "../../../components/common/dropdown-indicator/DropdownIndicator";
import { CloseIcon } from "../../../components/common/svg-components";
// import { requestGenerator } from "../../../utils/payloadGenerator";
import { useAppSelector } from "../../../hooks/index";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  RECEIPT_ONLINE_PAYMENT_BRANCH,
  RECEIPT_ONLINE_PAYMENT_CUSTOMER_NAME,
  RECEIPT_ONLINE_PAYMENT_MOBILE_NO,
  RECEIPT_ONLINE_PAYMENT_REF_NO,
  RECEIPT_ONLINE_PAYMENT_AMOUNT,
  RECEIPT_ONLINE_PAYMENT_NOTES,
  RECEIPT_ONLINE_PAYMENT_URL,
} from "../../../constants/receiptPayOnlineConstants";
import { receiptPayOnlineValidators } from "../../../form-validators/receiptPayOnlineValidators";
import { IReceiptPayOnlineForm } from "../../../interfaces/receiptPayOnlineInterfaces";
import PhoneInput from "react-phone-input-2";
import { colors } from "../../../constants/color";
import styles from "./receiptPayOnlineModal.module.scss";
import { trimValue } from "../../../utils/utils";
import Loader from "../../../components/common/spinner/Loader";
import Button from "../../../components/common/button/Button";

interface IReceiptPayOnlineModal {
  handleSubmitData: any;
  handleClose: (e?: React.MouseEvent<HTMLElement>) => void;
  popData: any;
}

const ReceiptPayOnlineModal: FC<IReceiptPayOnlineModal> = ({
  handleClose,
  handleSubmitData,
  popData,
}) => {
  // const dispatch = useAppDispatch();
  const { branchData } = useAppSelector((state) => state.login);
  const {
    upayAmount,
    createReceiptAdvanceData,
    createReceiptOutStandingData,
    entryReceiptAdvanceUpayData,
  } = useAppSelector((state) => state.receipt);
  const { isLoading } = useAppSelector((state) => state.invoice);
  // React Hook form for the form handling
  const {
    register,
    reset,
    handleSubmit,
    watch,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<IReceiptPayOnlineForm>({});

  const onSubmit: SubmitHandler<IReceiptPayOnlineForm> = (data) => {
    console.log("outStandingReceiptNoString :>> ", data);
    const { patient_default_branch_id, ...rest } = data;
    const payload = {
      ...rest,
      patient_default_branch_id: patient_default_branch_id?.value,
      email: popData?.patient_email,
      transaction_id: entryReceiptAdvanceUpayData?.transaction_id,
    };
    handleSubmitData(payload);
  };

  // useeffect for reset form data
  useEffect(() => {
    let receiptNoString = "";
    receiptNoString = entryReceiptAdvanceUpayData?.receipt_no
      ?.toString()
      .padStart(6, "0");
    // if (popData?.receipt_type === "OUTSTANDING") {
    //   receiptNoString = createReceiptOutStandingData?.receipt_no
    //     ?.toString()
    //     .padStart(6, "0");
    // } else if (popData?.receipt_type === "ADVANCE") {
    //   receiptNoString = createReceiptAdvanceData?.receipt_no
    //     ?.toString()
    //     .padStart(6, "0");
    // }
    const findPatientBranch = branchData?.branches?.find(
      (item: any) => item?._id === popData?.branch_type
    );
    const selectedBranch = {
      label: findPatientBranch?.name,
      value: findPatientBranch?._id,
    };

    const resetData = {
      [RECEIPT_ONLINE_PAYMENT_BRANCH]: selectedBranch,
      [RECEIPT_ONLINE_PAYMENT_CUSTOMER_NAME]: popData?.patient_name,
      [RECEIPT_ONLINE_PAYMENT_MOBILE_NO]: popData?.patient_phone,
      [RECEIPT_ONLINE_PAYMENT_REF_NO]: receiptNoString,
      [RECEIPT_ONLINE_PAYMENT_AMOUNT]: upayAmount,
      // [RECEIPT_ONLINE_PAYMENT_AMOUNT]: 10,
      [RECEIPT_ONLINE_PAYMENT_URL]: entryReceiptAdvanceUpayData?.upay_link,
    };
    reset(resetData);
  }, [
    popData,
    createReceiptOutStandingData,
    createReceiptAdvanceData,
    upayAmount,
    branchData,
    entryReceiptAdvanceUpayData,
    reset,
  ]);

  return (
    <>
      {isLoading && <Loader />}

      <div
        className={styles.receiptPayOnlineModalContainer}
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
        <h1 className={styles.receiptPayOnlineModalHeading}>Pay Online</h1>
        <hr className={styles.receiptPayOnlineModalDivider} />
        <form
          className={styles.receiptPayOnlineFormContainer}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={styles.formFieldContainer}>
            <div className={styles.inputFieldContainer}>
              <label
                htmlFor={RECEIPT_ONLINE_PAYMENT_BRANCH}
                className={styles.formLabel}
              >
                Branch
                <span className="asterick">*</span>
              </label>
              <div className={styles.fieldAndErrorTxtContainer}>
                <Select
                  className={styles.selectInputField}
                  placeholder="Select Branch"
                  isDisabled={true}
                  closeMenuOnSelect={true}
                  components={{ DropdownIndicator }}
                  value={watch(RECEIPT_ONLINE_PAYMENT_BRANCH)}
                  //   options={branchDropDownData}
                  {...register(
                    RECEIPT_ONLINE_PAYMENT_BRANCH,
                    receiptPayOnlineValidators[RECEIPT_ONLINE_PAYMENT_BRANCH]
                  )}
                  isSearchable={false}
                  //   onChange={(e: any) => {
                  //     setValue(BRANCH_TYPE, e.value);
                  //     trigger(BRANCH_TYPE);
                  //   }}
                  maxMenuHeight={200}
                />
                {errors[RECEIPT_ONLINE_PAYMENT_BRANCH] && (
                  <p className={styles.formError}>
                    {errors[RECEIPT_ONLINE_PAYMENT_BRANCH].message as any}
                  </p>
                )}
              </div>
            </div>
            <div className={styles.inputFieldContainer}>
              <label
                htmlFor={RECEIPT_ONLINE_PAYMENT_CUSTOMER_NAME}
                className={styles.formLabel}
              >
                Customer Name
                <span className="asterick">*</span>
              </label>
              <div className={styles.fieldAndErrorTxtContainer}>
                <input
                  type="text"
                  placeholder={"Enter Customer Name"}
                  className={styles.inputField}
                  {...register(
                    RECEIPT_ONLINE_PAYMENT_CUSTOMER_NAME,
                    receiptPayOnlineValidators[
                      RECEIPT_ONLINE_PAYMENT_CUSTOMER_NAME
                    ]
                  )}
                  disabled
                />
                {errors[RECEIPT_ONLINE_PAYMENT_CUSTOMER_NAME] && (
                  <p className={styles.formError}>
                    {errors[RECEIPT_ONLINE_PAYMENT_CUSTOMER_NAME].message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className={styles.formFieldContainer}>
            <div className={styles.inputFieldContainer}>
              <label
                htmlFor={RECEIPT_ONLINE_PAYMENT_MOBILE_NO}
                className={styles.formLabel}
              >
                Mobile No.
                <span className="asterick">*</span>
              </label>
              <div className={styles.fieldAndErrorTxtContainer}>
                <PhoneInput
                  country={"kw"}
                  {...register(
                    RECEIPT_ONLINE_PAYMENT_MOBILE_NO,
                    receiptPayOnlineValidators[RECEIPT_ONLINE_PAYMENT_MOBILE_NO]
                  )}
                  value={getValues(RECEIPT_ONLINE_PAYMENT_MOBILE_NO)}
                  onChange={(phone: any) => {
                    const formattedPhone = phone && `+${phone}`;
                    setValue(RECEIPT_ONLINE_PAYMENT_MOBILE_NO, formattedPhone);
                    trigger(RECEIPT_ONLINE_PAYMENT_MOBILE_NO);
                  }}
                  inputClass={styles.phoneNumberInput}
                />
                {errors[RECEIPT_ONLINE_PAYMENT_MOBILE_NO] && (
                  <p className={styles.formError}>
                    {errors[RECEIPT_ONLINE_PAYMENT_MOBILE_NO].message}
                  </p>
                )}
              </div>
            </div>
            <div className={styles.inputFieldContainer}>
              <label
                htmlFor={RECEIPT_ONLINE_PAYMENT_REF_NO}
                className={styles.formLabel}
              >
                Ref No.
                <span className="asterick">*</span>
              </label>
              <div className={styles.fieldAndErrorTxtContainer}>
                <input
                  type="text"
                  placeholder={"Enter Ref No."}
                  className={styles.inputField}
                  {...register(
                    RECEIPT_ONLINE_PAYMENT_REF_NO,
                    receiptPayOnlineValidators[RECEIPT_ONLINE_PAYMENT_REF_NO]
                  )}
                  disabled
                />
                {errors[RECEIPT_ONLINE_PAYMENT_REF_NO] && (
                  <p className={styles.formError}>
                    {errors[RECEIPT_ONLINE_PAYMENT_REF_NO].message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className={styles.formFieldContainer}>
            <div className={styles.inputFieldContainer}>
              <label
                htmlFor={RECEIPT_ONLINE_PAYMENT_AMOUNT}
                className={styles.formLabel}
              >
                Amount
                <span className="asterick">*</span>
              </label>
              <div className={styles.fieldAndErrorTxtContainer}>
                <input
                  type="text"
                  placeholder={"Enter Amount"}
                  className={styles.inputField}
                  {...register(
                    RECEIPT_ONLINE_PAYMENT_AMOUNT,
                    receiptPayOnlineValidators[RECEIPT_ONLINE_PAYMENT_AMOUNT]
                  )}
                  disabled
                />
                {errors[RECEIPT_ONLINE_PAYMENT_AMOUNT] && (
                  <p className={styles.formError}>
                    {errors[RECEIPT_ONLINE_PAYMENT_AMOUNT].message as any}
                  </p>
                )}
              </div>
            </div>
            <div className={styles.inputFieldContainer}>
              <label className={styles.formLabel}></label>
              <div className={styles.fieldAndErrorTxtContainer}>
                <div className={styles.extraInputField}></div>
              </div>
            </div>
          </div>
          <div className={styles.formFieldContainer}>
            <div
              className={[
                styles.inputFieldContainer,
                styles.textAreaFieldContainer,
              ].join(" ")}
            >
              <label
                htmlFor={RECEIPT_ONLINE_PAYMENT_NOTES}
                className={styles.formLabel}
              >
                Notes
                {/* <span className="asterick">*</span> */}
              </label>
              <div className={styles.textAreaContainer}>
                <textarea
                  className={styles.textArea}
                  {...register(RECEIPT_ONLINE_PAYMENT_NOTES)}
                  onChange={(e) => {
                    trimValue(e);
                  }}
                  placeholder="Enter Notes"
                />
                {errors[RECEIPT_ONLINE_PAYMENT_NOTES] && (
                  <p className={styles.formError}>
                    {errors[RECEIPT_ONLINE_PAYMENT_NOTES].message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className={styles.formFieldContainer}>
            <div
              className={[
                styles.inputFieldContainer,
                styles.textAreaFieldContainer,
              ].join(" ")}
            >
              <label
                htmlFor={RECEIPT_ONLINE_PAYMENT_URL}
                className={styles.formLabel}
              >
                URL
                <span className="asterick">*</span>
              </label>
              <div className={styles.textAreaContainer}>
                <textarea
                  className={styles.textArea}
                  {...register(
                    RECEIPT_ONLINE_PAYMENT_URL,
                    receiptPayOnlineValidators[RECEIPT_ONLINE_PAYMENT_URL]
                  )}
                  onChange={(e) => {
                    trimValue(e);
                  }}
                  placeholder="Enter Url"
                  disabled
                />
                {errors[RECEIPT_ONLINE_PAYMENT_URL] && (
                  <p className={styles.formError}>
                    {errors[RECEIPT_ONLINE_PAYMENT_URL].message as any}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className={styles.receiptPayOnlineBtnContainer}>
            <Button
              title="Send Msg"
              type="submit"
              customClass={styles.receiptPaytmentBtn}
            />
            <Button
              title="Cancel"
              type="button"
              customClass={styles.receiptPaytmentBtn}
              handleClick={handleClose}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default ReceiptPayOnlineModal;

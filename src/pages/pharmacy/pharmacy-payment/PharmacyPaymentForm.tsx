import { FC, useState } from "react";
import styles from "../pharmacy-payment/pharmacyPaymentForm.module.scss";
import Button from "../../../components/common/button/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { trimValue } from "../../../utils/utils";
import {
  DropDownArrowIcon,
  DropDownIcon,
  NotificationNewIcon,
  ScanIcon,
  SearchIcon,
} from "../../../components/common/svg-components";
import { useAppSelector } from "../../../hooks";
import Divider from "../../../components/common/divider/Divider";
import { Label } from "../../../components/common/label";
import { colors } from "../../../constants/color";
import PhoneInput from "react-phone-input-2";
import InfoTooltip from "../../../components/common/info-tooltip/InfoTooltip";
import ColorScheme from "../../../components/common/color-scheme/ColorScheme";
import DoubleInfoBookingInfo from "../../../components/common/color-scheme/double-booking-info/DoubleBookingInfo";
import DropdownV2 from "../../../components/common/dropdown/dropdownv2/DropdownV2";
import { referalTypeData } from "../../../constants/data";
import Invoice from "../../doctor-diagnosis/invoice/Invoice";
import { IaddPharmacyPaymentValidators } from "../../../interfaces/interfaces";
import { addPharmacyPaymentValidators } from "../../../form-validators/addPharmacyPaymentValidators";
import {
  PHARMACY_OUTSTANDING_AMOUNT,
  PHARMACY_TAX_1,
  PHARMACY_TOTAL_DISCOUNT,
  PHARMACY_TAX_2,
  PHARMACY_CO_PAY,
  PHARMACY_TOTAL_TAX,
  PHARMACY_CO_PAY_AMOUNT,
} from "../../../constants/constant";
import TableV2 from "../../../components/common/table/tableV2/TableV2";
import { pharmacyPaymentTableDummyData, pharmacyPaymentTableHeaderData } from '../../../constants/table-data/pharmacyPaymentTableData';
import { pharmacyPaymentTableData1HeaderData, pharmacyPaymentTableData1RowDummyData } from "../../../constants/table-data/pharmacyPaymentTableData1";

interface PharmacyPaymentForm {}

const PharmacyPaymentForm: FC<PharmacyPaymentForm> = () => {
  const {
    handleSubmit,
    register,
    getValues,
    watch,
    formState: { errors },
  } = useForm<IaddPharmacyPaymentValidators>();



  const onSubmit: SubmitHandler<IaddPharmacyPaymentValidators> = (data) => {
    const formdata = getValues();
    console.log("first form submitted:", formdata);
  };

  return (
    <>
      <div className={styles.pharmacypaymentFormMainContainer}>
        <div className={styles.pharmacypaymentFormWrapperContainer}>
          <div className={styles.pharmacypaymentFormWrapper}>
            <form>
              <>
                <div className={styles.formFieldRow}>
                  <div className={styles.formFieldContainer}>
                    <div className={styles.inputFieldContainer}>
                      <Label
                        htmlFor={PHARMACY_OUTSTANDING_AMOUNT}
                        labelText="Outstanding Amount"
                        requiredField={false}
                        customClass={styles.customLabel}
                      />
                      <div className={styles.inlineItems}>
                        <input
                          type="number"
                          placeholder="$22.5"
                          className={styles.inputField}
                          {...register(
                            PHARMACY_OUTSTANDING_AMOUNT,
                            addPharmacyPaymentValidators[
                              PHARMACY_OUTSTANDING_AMOUNT
                            ]
                          )}
                          onChange={(e) => trimValue(e)}
                        />
                      </div>
                    </div>
                    {errors[PHARMACY_OUTSTANDING_AMOUNT] && (
                      <div className={styles.errorContainer}>
                        <span className={styles.extraSpan}></span>
                        <p className="dashboardFormError">
                          {errors[PHARMACY_OUTSTANDING_AMOUNT].message}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className={styles.formFieldContainer}>
                    <div className={styles.inputFieldContainer}>
                      <Label
                        htmlFor={PHARMACY_TAX_1}
                        labelText="Tax 1"
                        requiredField={false}
                        customClass={styles.customLabel}
                      />
                      <div className={styles.inlineItems}>
                        <input
                          type="number"
                          placeholder="$22.5"
                          className={styles.inputField}
                          {...register(
                            PHARMACY_TAX_1,
                            addPharmacyPaymentValidators[PHARMACY_TAX_1]
                          )}
                          onChange={(e) => trimValue(e)}
                        />
                      </div>
                    </div>
                    {errors[PHARMACY_TAX_1] && (
                      <div className={styles.errorContainer}>
                        <span className={styles.extraSpan}></span>
                        <p className="dashboardFormError">
                          {errors[PHARMACY_TAX_1].message}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className={styles.formFieldContainer}>
                    <div className={styles.inputFieldContainer}>
                      <Label
                        htmlFor={PHARMACY_TOTAL_DISCOUNT}
                        labelText="Total Discount"
                        requiredField={false}
                        customClass={styles.customLabel}
                      />
                      <div className={styles.inlineItems}>
                        <input
                          type="number"
                          placeholder="0.00%"
                          className={styles.inputField}
                          {...register(
                            PHARMACY_TOTAL_DISCOUNT,
                            addPharmacyPaymentValidators[
                              PHARMACY_TOTAL_DISCOUNT
                            ]
                          )}
                          onChange={(e) => trimValue(e)}
                        />
                      </div>
                    </div>
                    {errors[PHARMACY_TOTAL_DISCOUNT] && (
                      <div className={styles.errorContainer}>
                        <span className={styles.extraSpan}></span>
                        <p className="dashboardFormError">
                          {errors[PHARMACY_TOTAL_DISCOUNT].message}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className={styles.formFieldContainer}>
                    <div className={styles.inputFieldContainer}>
                      <Label
                        htmlFor={PHARMACY_TAX_2}
                        labelText="Tax 2"
                        requiredField={false}
                        customClass={styles.customLabel}
                      />
                      <div className={styles.inlineItems}>
                        <input
                          type="number"
                          placeholder="0.00%"
                          className={styles.inputField}
                          {...register(
                            PHARMACY_TAX_2,
                            addPharmacyPaymentValidators[PHARMACY_TAX_2]
                          )}
                          onChange={(e) => trimValue(e)}
                        />
                      </div>
                    </div>
                    {errors[PHARMACY_TAX_2] && (
                      <div className={styles.errorContainer}>
                        <span className={styles.extraSpan}></span>
                        <p className="dashboardFormError">
                          {errors[PHARMACY_TAX_2].message}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className={styles.formFieldContainer}>
                    <div className={styles.inputFieldContainer}>
                      <Label
                        htmlFor={PHARMACY_CO_PAY}
                        labelText="Co-pay%"
                        requiredField={false}
                        customClass={styles.customLabel}
                      />
                      <div className={styles.inlineItems}>
                        <input
                          type="number"
                          placeholder="0.15%"
                          className={styles.inputField}
                          {...register(
                            PHARMACY_CO_PAY,
                            addPharmacyPaymentValidators[PHARMACY_CO_PAY]
                          )}
                          onChange={(e) => trimValue(e)}
                        />
                      </div>
                    </div>
                    {errors[PHARMACY_CO_PAY] && (
                      <div className={styles.errorContainer}>
                        <span className={styles.extraSpan}></span>
                        <p className="dashboardFormError">
                          {errors[PHARMACY_CO_PAY].message}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className={styles.formFieldContainer}>
                    <div className={styles.inputFieldContainer}>
                      <Label
                        htmlFor={PHARMACY_TOTAL_TAX}
                        labelText="Total Tax"
                        requiredField={false}
                        customClass={styles.customLabel}
                      />
                      <div className={styles.inlineItems}>
                        <input
                          type="number"
                          placeholder="0.15%"
                          className={styles.inputField}
                          {...register(
                            PHARMACY_TOTAL_TAX,
                            addPharmacyPaymentValidators[PHARMACY_TOTAL_TAX]
                          )}
                          onChange={(e) => trimValue(e)}
                        />
                      </div>
                    </div>
                    {errors[PHARMACY_TOTAL_TAX] && (
                      <div className={styles.errorContainer}>
                        <span className={styles.extraSpan}></span>
                        <p className="dashboardFormError">
                          {errors[PHARMACY_TOTAL_TAX].message}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className={styles.formFieldContainer}>
                    <div className={styles.inputFieldContainer}>
                      <Label
                        htmlFor={PHARMACY_CO_PAY_AMOUNT}
                        labelText="Co-pay Amount"
                        requiredField={false}
                        customClass={styles.customLabel}
                      />
                      <div className={styles.inlineItems}>
                        <input
                          type="number"
                          placeholder="0.15%"
                          className={styles.inputField}
                          {...register(
                            PHARMACY_CO_PAY_AMOUNT,
                            addPharmacyPaymentValidators[PHARMACY_CO_PAY_AMOUNT]
                          )}
                          onChange={(e) => trimValue(e)}
                        />
                      </div>
                    </div>
                    {errors[PHARMACY_CO_PAY_AMOUNT] && (
                      <div className={styles.errorContainer}>
                        <span className={styles.extraSpan}></span>
                        <p className="dashboardFormError">
                          {errors[PHARMACY_CO_PAY_AMOUNT].message}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className={styles.pharmacypaymentsubmitbtn}>
                  <div>
                    <Button
                     type="button"
                      title="Add payment Mode"
                      customClass={styles.addPaymentButton}
                    />
                  </div>

                  <div>
                    <a href="">click here to share Upay link</a>
                  </div>
                </div>
              </>
            </form>
          </div>

          <div className={styles.pharmacypaymentTableMainContainer}>
            <div className={styles.pharmacycontentContainer}>
              <div className={styles.pharmacyPersonName}>
                Sales Person
                <span>Will Smith</span>
              </div>
              <div className={styles.pharmacyPersonName}>
                <Button
                  title="Email Invoice"
                  customClass={styles.invoiceButton}
                />
              </div>
            </div>
            
            <div className={styles.pharmacyPaymentModeTableContainer}>
              <div className={styles.tableContainer1}>
                <TableV2
                  tableHeaderData={pharmacyPaymentTableData1HeaderData}
                  tableRowData={pharmacyPaymentTableData1RowDummyData}
                  active={false}
                />
              </div>
              </div>   
          </div>
        </div>


        <div className={styles.tableContainer}>

            <TableV2
              tableHeaderData={pharmacyPaymentTableHeaderData}
              tableRowData={pharmacyPaymentTableDummyData}
              // handleClick={handleDialogOpen}
              active={false}
            />
        </div>

        <div className={styles.formsubmitbuttons}>
              <Button
                type="submit"
                title="Submit & Close"
                customClass={styles.submitButton}
                handleClick={handleSubmit(onSubmit)}
              />
              <Button
                title="Pay Later"
                type="button"
                customClass={styles.inventoryButton}
              />
            </div>

      </div>
    </>
  );
};
export default PharmacyPaymentForm;

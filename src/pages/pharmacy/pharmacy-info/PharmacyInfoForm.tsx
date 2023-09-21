import { FC, useState, useEffect } from "react";
import styles from "./pharmacyInfoForm.module.scss";
import Button from "../../../components/common/button/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  IaddPharmacyCustomerInformation,
  IaddPharmacyCustomerSecondInformation,
} from "../../../interfaces/interfaces";
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
import Popup from "../../../components/common/popup/Popup";
import InfoTooltip from "../../../components/common/info-tooltip/InfoTooltip";
import ColorScheme from "../../../components/common/color-scheme/ColorScheme";
import DoubleInfoBookingInfo from "../../../components/common/color-scheme/double-booking-info/DoubleBookingInfo";
import DropdownV2 from "../../../components/common/dropdown/dropdownv2/DropdownV2";
import {
  referalTypeData,
} from "../../../constants/data";
import MedicineCompositionPopup from "../../../components/common/modal/medicine-composition-popup/MedicineCompositionPopup";
import TableV2 from "../../../components/common/table/tableV2/TableV2";
import { medicinesTableHeaderData ,MedicinesTableDummyData} from "../../../constants/table-data/pharmacycustomerinformationData";

import {
  PHARMACY_PATIENT_NAME,
  PHARMACY_FILE_NO,
  PHARMACY_MOBILE,
  PHARMACY_AGE,
  PHARMACY_NATIONAL_ID_NO,
  PHARMACY_DATE,
  PHARMACY_REFERRAL,
  PHARMACY_GENDER,
  PHARMACY_ITEM_CODE,
  PHARMACY_PRODUCTS,
  PHARMACY_SELL_PRICE,
  PHARMACY_QTY,
  PHARMACY_DISCOUNT,
  PHARMACY_SUB_QTY,
  PHARMACY_EXPIRY_DATE,
} from "../../../constants/constant";
import { trimValue } from "../../../utils/utils";
import { addPharmacyCustomerInformation } from "../../../form-validators/addPharmacyCustomerInformationValidators";
import { addPharmacyCustomerSecondInformation } from "../../../form-validators/addPharmacyCustomerInformationSecondValidators";

interface PharmacyInfoForm {}

const PharmacyInfoForm: FC<PharmacyInfoForm> = () => {
  const {
    handleSubmit: handleSubmitSecondForm,
    register: register1,
    getValues: getValues1,
    watch: watch1,
    setValue,
    trigger,
    formState: { errors: errors1 },
  } = useForm<IaddPharmacyCustomerInformation>();

  const {
    handleSubmit: handleSubmitfirstForm,
    register: register2,
    getValues: getValues2,
    watch: watch2,
    formState: { errors: errors2 },
  } = useForm<IaddPharmacyCustomerSecondInformation>();

  const { userData } = useAppSelector((state) => state.login);
  const [selectedItem, setSelectedItem] = useState(referalTypeData[0]);
  const [infoForm, setInforForm] = useState(false);
  const [medicineComposition, setMedicineComposition] =
    useState<boolean>(false);

  const handleSecondFormSubmit: SubmitHandler<
    IaddPharmacyCustomerInformation
  > = (data) => {
    const formdata = getValues1();
    console.log("first form submitted:", formdata);
  };

  const handlefirstFormSubmit: SubmitHandler<
    IaddPharmacyCustomerSecondInformation
  > = (data) => {
    // e?.preventDefault()
    const formdata2 = getValues2();
    console.log("second form submitted:", formdata2);
  };

  const formData = watch1();
  console.log(formData, "fd");

  const formData2 = watch2();
  console.log(formData2, "fd2");


  return (
    <>
      {medicineComposition && (
        <Popup
          Children={MedicineCompositionPopup}
          handleClose={() => setMedicineComposition(false)}
        />
      )}

      <div className={styles.pharmacyInfoFormMainContainer}>
        <div className={styles.pharnacyFormHeader}>
          <div className={styles.customerInfoTitle}>Customer Information </div>
          <div className={styles.buttonUserInfoContainer}>
            <div className={styles.documentContainer}>
              <span className={styles.docNoText}>Document No.</span>
              <span className={styles.docNo}>1254689</span>
            </div>
            <div className={styles.salesPersonContainer}>
              <span className={styles.salsePersonText}>Sales Person</span>
              <span className={styles.salePersonName}>{userData?.name}</span>
            </div>
            <Button
              title="Search Receipts"
              customClass={styles.receiptButton}
            />
            <Button
              title="Internal Prescriptions"
              customClass={styles.prescriptionButton}
            />
            <NotificationNewIcon
              customClass={styles.notiifcationIconStyle}
              //   handleClick={handleOpenNotificationModal}
            />
          </div>
        </div>
        <div className={styles.pharmacyInfoFormWrapper}>
          <form onSubmit={handleSubmitSecondForm(handleSecondFormSubmit)}>
            {infoForm && (
              <>
                <Divider customClass={styles.divider} />
                <div className={styles.formFieldRow}>
                  <div className={styles.formFieldContainer}>
                    <div className={styles.inputFieldContainer}>
                      <Label
                        htmlFor={PHARMACY_PATIENT_NAME}
                        labelText="Patient Name"
                        requiredField={true}
                        customClass={styles.customLabel}
                      />
                      <div className={styles.inlineItems}>
                        <input
                          type="text"
                          placeholder="Patient Name"
                          className={styles.inputField}
                          // {...register1('Patient_Name')}
                          {...register1(
                            PHARMACY_PATIENT_NAME,
                            addPharmacyCustomerInformation[
                              PHARMACY_PATIENT_NAME
                            ]
                          )}
                          onChange={(e) => trimValue(e)}
                        />
                        {/* <SearchIcon
                        fillColor={colors.black1}
                        customClass={styles.searchIconStyle}
                      /> */}
                      </div>
                    </div>
                    {errors1[PHARMACY_PATIENT_NAME] && (
                      <div className={styles.errorContainer}>
                        <span className={styles.extraSpan}></span>
                        <p className="dashboardFormError">
                          {errors1[PHARMACY_PATIENT_NAME].message}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className={styles.formFieldContainer}>
                    <div className={styles.inputFieldContainer}>
                      <Label
                        htmlFor={PHARMACY_FILE_NO}
                        labelText="File No."
                        requiredField={true}
                        customClass={styles.customLabel}
                      />
                      <div className={styles.inlineItems}>
                        <input
                          type="number"
                          placeholder="File No."
                          className={styles.inputField}
                          // {...register1('File No.')}
                          {...register1(
                            PHARMACY_FILE_NO,
                            addPharmacyCustomerInformation[PHARMACY_FILE_NO]
                          )}
                          onChange={(e) => {
                            trimValue(e);
                            trigger(PHARMACY_MOBILE);
                          }}
                          // disabled
                        />
                        {/* <SearchIcon
                        fillColor={colors.black1}
                        customClass={styles.searchIconStyle}
                      /> */}
                      </div>
                    </div>
                    {errors1[PHARMACY_FILE_NO] && (
                      <div className={styles.errorContainer}>
                        <span className={styles.extraSpan}></span>
                        <p className="dashboardFormError">
                          {errors1[PHARMACY_FILE_NO].message}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className={styles.formFieldContainer}>
                    <div className={styles.inputFieldContainer}>
                      <Label
                        htmlFor={PHARMACY_MOBILE}
                        labelText="Mobile"
                        requiredField={true}
                        customClass={styles.customLabel}
                      />

                      <PhoneInput
                        country={"kw"}
                        placeholder="Enter Mobile No."
                        {...register1(
                          PHARMACY_MOBILE,
                          addPharmacyCustomerInformation[PHARMACY_MOBILE]
                        )}
                        onChange={(phone) => {
                          //  trimValue(e)
                          const formattedPhone: any = phone && `+${phone}`;
                          setValue(PHARMACY_MOBILE, formattedPhone);
                          trigger(PHARMACY_MOBILE);
                        }}
                        inputClass={styles.phoneNumberInput}
                        containerStyle={{ flexBasis: "70%" }}
                      />
                    </div>
                    {errors1[PHARMACY_MOBILE] && (
                      <div className={styles.errorContainer}>
                        <span className={styles.extraSpan}></span>
                        <p className="dashboardFormError">
                          {errors1[PHARMACY_MOBILE].message}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className={styles.formFieldContainer}>
                    <div className={styles.inputFieldContainer}>
                      <Label
                        htmlFor={PHARMACY_AGE}
                        labelText="Age"
                        requiredField={true}
                        customClass={styles.customLabel}
                      />
                      <div className={styles.inlineItems}>
                        <input
                          type="number"
                          placeholder="Age"
                          className={styles.inputField}
                          {...register1(
                            PHARMACY_AGE,
                            addPharmacyCustomerInformation[PHARMACY_AGE]
                          )}
                          onChange={(e) => trimValue(e)}
                        />
                        {/* <SearchIcon
                        fillColor={colors.black1}
                        customClass={styles.searchIconStyle}
                      /> */}
                      </div>
                    </div>
                    {errors1[PHARMACY_AGE] && (
                      <div className={styles.errorContainer}>
                        <span className={styles.extraSpan}></span>
                        <p className="dashboardFormError">
                          {errors1[PHARMACY_AGE].message}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className={styles.formFieldContainer}>
                    <div className={styles.inputFieldContainer}>
                      <Label
                        htmlFor={PHARMACY_NATIONAL_ID_NO}
                        labelText="National ID No."
                        requiredField={true}
                        customClass={styles.customLabel}
                      />
                      <div className={styles.inlineItems}>
                        <input
                          type="number"
                          placeholder="National ID No."
                          className={styles.inputField}
                          {...register1(
                            PHARMACY_NATIONAL_ID_NO,
                            addPharmacyCustomerInformation[PHARMACY_NATIONAL_ID_NO]
                          )}
                        />
                        {/* <SearchIcon
                        fillColor={colors.black1}
                        customClass={styles.searchIconStyle}
                      /> */}
                        <InfoTooltip
                          tooltipData={{
                            message:
                              "To add insurance , national id is required",
                          }}
                          Children={DoubleInfoBookingInfo}
                          title=""
                        />
                      </div>
                    </div>
                    {errors1[PHARMACY_NATIONAL_ID_NO] && (
                      <div className={styles.errorContainer}>
                        <span className={styles.extraSpan}></span>
                        <p className="dashboardFormError">
                          {errors1[PHARMACY_NATIONAL_ID_NO].message}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className={styles.formFieldContainer}>
                    <div className={styles.inputFieldContainer}>
                      <Label
                        htmlFor={PHARMACY_DATE}
                        labelText="Date"
                        requiredField={true}
                        customClass={styles.customLabel}
                      />
                      <div className={styles.inlineItems}>
                        <input
                          type="date"
                          placeholder="Age"
                          className={styles.inputField}
                          {...register1(
                            PHARMACY_DATE,
                            addPharmacyCustomerInformation[PHARMACY_DATE]
                          )}
                          onChange={(e) => trimValue(e)}
                        />
                        {/* <SearchIcon
                        fillColor={colors.black1}
                        customClass={styles.searchIconStyle}
                      /> */}
                      </div>
                    </div>
                    {errors1[PHARMACY_DATE] && (
                      <div className={styles.errorContainer}>
                        <span className={styles.extraSpan}></span>
                        <p className="dashboardFormError">
                          {errors1[PHARMACY_DATE].message}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className={styles.formFieldContainer}>
                    <div className={styles.inputFieldContainer}>
                      <Label
                        htmlFor={PHARMACY_REFERRAL}
                        labelText="Referral"
                        requiredField={true}
                        customClass={styles.customLabel}
                      />
                      <div className={styles.inlineItems}>
                        <DropdownV2
                          data={referalTypeData}
                          keyName="name"
                          selectedItem={selectedItem}
                          setSelectedItem={"setSelectedItem"}
                          handleClick={(item: any) => {
                            setSelectedItem({
                              name: item?.name,
                              _id: item?._id,
                            });
                          }}
                          notShowAllOption={true}
                          customClassBox={styles.dropdownBox}
                          customClassBody={styles.dropdownBody}
                        />
                        <input
                          type="text"
                          // placeholder="Age"
                          className={styles.referalInputField}
                          {...register1(
                            PHARMACY_REFERRAL,
                            addPharmacyCustomerInformation[PHARMACY_REFERRAL]
                          )}
                          onChange={(e) => trimValue(e)}
                        />
                        {/* <SearchIcon
                        fillColor={colors.black1}
                        customClass={styles.searchIconStyle}
                      /> */}
                      </div>
                    </div>
                    {errors1[PHARMACY_REFERRAL] && (
                      <div className={styles.errorContainer}>
                        <span className={styles.extraSpan}></span>
                        <p className="dashboardFormError">
                          {errors1[PHARMACY_REFERRAL].message}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className={styles.formFieldContainer}>
                    <div className={styles.inputFieldContainer}>
                      <label
                        htmlFor={PHARMACY_GENDER}
                        className={styles.customLabel}
                      >
                        Gender
                        <span className="asterick">*</span>
                      </label>
                      <div className={styles.inlineItems}>
                        <div>
                          <label htmlFor="male" className={styles.radioLabel}>
                            <input
                              // disabled={readOnly}
                              className={styles.radioInput}
                              type="radio"
                              id="male"
                              value="MALE"
                              {...register1(
                                PHARMACY_GENDER,
                                addPharmacyCustomerInformation[PHARMACY_GENDER]
                              )}
                            />
                            <span className={styles.customRadio} />
                            Male
                          </label>
                        </div>
                        <div>
                          <label htmlFor="female" className={styles.radioLabel}>
                            <input
                              // disabled={readOnly}
                              className={styles.radioInput}
                              type="radio"
                              id="female"
                              value="FEMALE"
                              {...register1(
                                PHARMACY_GENDER,
                                addPharmacyCustomerInformation[PHARMACY_GENDER]
                              )}
                            />
                            <span className={styles.customRadio} />
                            Female
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className={styles.errorContainer}>
                      <span className={styles.extraSpan}></span>
                      {errors1[PHARMACY_GENDER] && (
                        <p className="dashboardFormError">
                          {errors1[PHARMACY_GENDER].message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className={styles.formFieldRow}>
                  <div className={styles.finanicialRemarkInsuaranceContainer}>
                    <div className={styles.finacialRemark}>
                      <span className={styles.financialRemarkText}>
                        Financial Remark :
                      </span>
                      <span className={styles.viewLink}>View</span>
                    </div>
                    <div className={styles.insuarance}>
                      <span className={styles.insurancePlanText}>
                        Insurance Plan :
                      </span>
                      <div className={styles.buttonContainer}>
                        <Button type="button" title="View" customClass={styles.button} />
                        <Button type="button" title="Add" customClass={styles.button} />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            <div className={styles.moreLessDivider}>
              <Divider customClass={styles.divider1} />
              {infoForm ? (
                <DropDownArrowIcon
                  fillColor={colors.grey2}
                  height={30}
                  width={30}
                  handleClick={() => setInforForm(false)}
                />
              ) : (
                <DropDownIcon
                  fillColor={colors.grey2}
                  height={30}
                  width={30}
                  handleClick={() => setInforForm(true)}
                />
              )}
              <Divider customClass={styles.divider2} />
            </div>
            <div className={styles.pharnacyFormHeader}>
              <div className={styles.customerInfoTitle}>Medicines</div>
              <div className={styles.buttonUserInfoContainer}>
                <Button
                  type="button"
                  title="Medicines Composition"
                  customClass={styles.medicinButton}
                  handleClick={() => setMedicineComposition(true)}
                />
                <Button
                  type="button"
                  title="Item Inventory"
                  customClass={styles.inventoryButton}
                />
              </div>
            </div>

            <form onSubmit={handleSubmitfirstForm(handlefirstFormSubmit)}>
              <div className={styles.medicinFormContainer}>
                <Divider customClass={styles.divider} />
                <div className={styles.formFieldRow}>
                  <div className={styles.formFieldContainer}>
                    <div className={styles.inputFieldContainer}>
                      <Label
                        htmlFor={"SCAN"}
                        labelText="Scan"
                        requiredField={true}
                        customClass={styles.customLabel}
                      />
                      <div className={styles.inlineItems}>
                        <div className={styles.scanContainer}>
                          <ScanIcon fillColor={colors.white1} />
                        </div>
                      </div>
                    </div>
                    {/* {errors[NAME] && (
                    <div className={styles.errorContainer}>
                      <span className={styles.extraSpan}></span>
                      <p className="dashboardFormError">
                        {errors[NAME].message}
                      </p>
                    </div>
                  )} */}
                  </div>
                  <div className={styles.formFieldContainer}>
                    <div className={styles.inputFieldContainer}>
                      <Label
                        htmlFor={PHARMACY_ITEM_CODE}
                        labelText="Item Code"
                        requiredField={true}
                        customClass={styles.customLabel}
                      />
                      <div className={styles.inlineItems}>
                        <input
                          type="number"
                          placeholder="Enter Item Code"
                          className={styles.inputField}
                          // {...register('ItemCode')}
                          {...register2(
                            PHARMACY_ITEM_CODE,
                            addPharmacyCustomerSecondInformation[
                              PHARMACY_ITEM_CODE
                            ]
                          )}
                          onChange={(e) => trimValue(e)}
                        />
                      </div>
                    </div>
                    {errors2[PHARMACY_ITEM_CODE] && (
                      <div className={styles.errorContainer}>
                        <span className={styles.extraSpanRadio} />
                        <p className="dashboardFormError">
                          {errors2[PHARMACY_ITEM_CODE].message}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className={styles.formFieldContainer}>
                    <div className={styles.inputFieldContainer}>
                      <Label
                        htmlFor={PHARMACY_PRODUCTS}
                        labelText="Products"
                        requiredField={true}
                        customClass={styles.customLabel}
                      />
                      <div className={styles.inlineItems}>
                        <input
                          type="text"
                          placeholder="Search Products"
                          className={styles.inputField}
                          {...register2(
                            PHARMACY_PRODUCTS,
                            addPharmacyCustomerSecondInformation[
                              PHARMACY_PRODUCTS
                            ]
                          )}
                          onChange={(e) => trimValue(e)}
                        />
                        {/* <SearchIcon
                        fillColor={colors.black1}
                        customClass={styles.searchIconStyle}
                      /> */}
                      </div>
                    </div>
                    {errors2[PHARMACY_PRODUCTS] && (
                      <div className={styles.errorContainer}>
                        <span className={styles.extraSpan}></span>
                        <p className="dashboardFormError">
                          {errors2[PHARMACY_PRODUCTS].message}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className={styles.formFieldContainer}>
                    <div className={styles.inputFieldContainer}>
                      <Label
                        htmlFor={PHARMACY_SELL_PRICE}
                        labelText="Sell Price"
                        requiredField={true}
                        customClass={styles.customLabel}
                      />
                      <div className={styles.inlineItems}>
                        <input
                          type="number"
                          placeholder="Enter Sell Price"
                          className={styles.inputField}
                          {...register2(
                            PHARMACY_SELL_PRICE,
                            addPharmacyCustomerSecondInformation[
                              PHARMACY_SELL_PRICE
                            ]
                          )}
                          onChange={(e) => trimValue(e)}
                        />
                      </div>
                    </div>
                    {errors2[PHARMACY_SELL_PRICE] && (
                      <div className={styles.errorContainer}>
                        <span className={styles.extraSpan}></span>
                        <p className="dashboardFormError">
                          {errors2[PHARMACY_SELL_PRICE].message}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className={styles.formFieldContainer}>
                    <div className={styles.inputFieldContainer}>
                      <Label
                        htmlFor={PHARMACY_DISCOUNT}
                        labelText="Discount %"
                        requiredField={false}
                        customClass={styles.customLabel}
                      />
                      <div className={styles.inlineItems}>
                        <input
                          type="number"
                          placeholder="Enter Discount"
                          className={styles.inputField}
                          {...register2(
                            PHARMACY_DISCOUNT,
                            addPharmacyCustomerSecondInformation[
                              PHARMACY_DISCOUNT
                            ]
                          )}
                          onChange={(e) => trimValue(e)}
                        />
                      </div>
                    </div>
                    {errors2[PHARMACY_DISCOUNT] && (
                      <div className={styles.errorContainer}>
                        <span className={styles.extraSpan}></span>
                        <p className="dashboardFormError">
                          {errors2[PHARMACY_DISCOUNT].message}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className={styles.formFieldContainer}>
                    <div className={styles.inputFieldContainer}>
                      <Label
                        htmlFor={PHARMACY_QTY}
                        labelText="Qty."
                        requiredField={true}
                        customClass={styles.customLabel}
                      />
                      <div className={styles.inlineItems}>
                        <input
                          type="number"
                          placeholder="Enter Quantity"
                          className={styles.inputField}
                          {...register2(
                            PHARMACY_DISCOUNT,
                            addPharmacyCustomerSecondInformation[
                              PHARMACY_DISCOUNT
                            ]
                          )}
                          onChange={(e) => trimValue(e)}
                        />
                      </div>
                    </div>
                    {errors2[PHARMACY_DISCOUNT] && (
                      <div className={styles.errorContainer}>
                        <span className={styles.extraSpan}></span>
                        <p className="dashboardFormError">
                          {errors2[PHARMACY_DISCOUNT].message}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className={styles.formFieldContainer}>
                    <div className={styles.inputFieldContainer}>
                      <Label
                        htmlFor={PHARMACY_SUB_QTY}
                        labelText="Sub Qty."
                        requiredField={false}
                        customClass={styles.customLabel}
                      />
                      <div className={styles.inlineItems}>
                        <input
                          type="number"
                          placeholder="Enter Sub Quantity"
                          className={styles.inputField}
                          {...register2(
                            PHARMACY_SUB_QTY,
                            addPharmacyCustomerSecondInformation[
                              PHARMACY_SUB_QTY
                            ]
                          )}
                          onChange={(e) => trimValue(e)}
                        />
                      </div>
                    </div>
                    {errors2[PHARMACY_SUB_QTY] && (
                      <div className={styles.errorContainer}>
                        <span className={styles.extraSpan}></span>
                        <p className="dashboardFormError">
                          {errors2[PHARMACY_SUB_QTY].message}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className={styles.formFieldContainer}>
                    <div className={styles.inputFieldContainer}>
                      <Label
                        htmlFor={PHARMACY_EXPIRY_DATE}
                        labelText="Expiry Date"
                        requiredField={true}
                        customClass={styles.customLabel}
                      />
                      <div className={styles.inlineItems}>
                        <input
                          type="date"
                          className={styles.inputField}
                          {...register2(
                            PHARMACY_EXPIRY_DATE,
                            addPharmacyCustomerSecondInformation[
                              PHARMACY_EXPIRY_DATE
                            ]
                          )}
                          onChange={(e) => trimValue(e)}
                        />
                      </div>
                    </div>
                    {errors2[PHARMACY_EXPIRY_DATE] && (
                      <div className={styles.errorContainer}>
                        <span className={styles.extraSpan}></span>
                        <p className="dashboardFormError">
                          {errors2[PHARMACY_EXPIRY_DATE].message}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div className={styles.addItemButton}>
                  <Button
                    type="submit"
                    title="Add Item"
                    handleClick={handleSubmitfirstForm(handlefirstFormSubmit)}
                  />
                </div>
              </div>
            </form>

            <div className={styles.tablestyle}>
              <TableV2
                tableHeaderData={medicinesTableHeaderData}
                tableRowData={MedicinesTableDummyData}
                // handleClick={handleDialogOpen}
                active={false}
              />
            </div>

            <div className={styles.formsubmitbuttons}>
              <Button
                type="button"
                title="Next"
                customClass={styles.nextButton}
                handleClick={handleSubmitSecondForm(handleSecondFormSubmit)}
                // handleClick={() => setMedicineComposition(true)}
              />
              <Button
                title="Pay Later"
                type="button"
                customClass={styles.inventoryButton}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default PharmacyInfoForm;



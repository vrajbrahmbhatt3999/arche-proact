import React, { FC, useEffect, useState } from 'react';
import { IMaterTableInventory } from '../../../interfaces/interfaces';
import { SubmitHandler, useForm } from 'react-hook-form';
import Select from 'react-select';
import PhoneInput from 'react-phone-input-2';
import styles from './addNewSupplier.module.scss';
import Button from '../../../components/common/button/Button';
import {
  INVENTORY_MASTER_ADDRESS_LINE_ONE,
  INVENTORY_MASTER_ADDRESS_LINE_TWO,
  INVENTORY_MASTER_ATTACHMENTS,
  INVENTORY_MASTER_CITY,
  INVENTORY_MASTER_CONTACT_NO,
  INVENTORY_MASTER_CONTACT_PERSON,
  INVENTORY_MASTER_COUNTRY,
  INVENTORY_MASTER_CURRENCY,
  INVENTORY_MASTER_NAME,
  INVENTORY_MASTER_NOTES,
  INVENTORY_MASTER_STATE,
  INVENTORY_MASTER_ZIPCODE,
} from '../../../constants/constant';
import { inventoryMasterTableValidators } from '../../../form-validators/inventoryMasterTableValidators';
import {
  blockInvalidCharacter,
  disableArrowKey,
  trimValue,
} from '../../../utils/utils';
import { useLocation, useNavigate } from 'react-router';
import AttachFiles from '../../../components/common/attach-files/Attachfiles';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { requestGenerator } from '../../../utils/payloadGenerator';
import {
  createInventoryMaster,
  updateInventoryMaster,
} from '../../../redux/features/inventory-master/inventoryMasterAsyncActions';
import Loader from '../../../components/common/spinner/Loader';
import AttachfilesV2 from '../../../components/common/attach-files/AttachfilesV2';
import { getPatientSelectionList } from '../../../redux/features/patient-emr/patient/patientAsyncAction';
interface IAddNewSuplier {}

const AddNewSuplier: FC<IAddNewSuplier> = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { isLoading } = useAppSelector((state) => state.inventoryMaster);
  const { masterValueData } = useAppSelector((state) => state.login);
  // const { nationalityData } = useAppSelector((state) => state.patient);
  // console.log('nationalityData??>>>', nationalityData);
  const supplierDetailsObjectById = location?.state?.supplierDetailData;
  const [attachmentFiles, setAttachmentFiles] = useState<any>([]);
  const [selectCurrency, setSelectCurrency] = useState(null);
  console.log('selectCurrency>>>', selectCurrency);

  let newAttachmentsData = attachmentFiles?.filter(
    (item: any) => item?.id === undefined
  );
  let oldAttachmentsData = attachmentFiles?.filter(
    (item: any) => item?.id !== undefined
  );

  let currencyData = [] as any;

  masterValueData?.map((item: any) => {
    if (item?.category_name === 'CURRENCY') {
      currencyData.push(item?.values);
    } else {
      return;
    }
  });
  console.log('currencyData??>', currencyData);
  // use form
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<IMaterTableInventory>({});
  console.log(
    'watch(INVENTORY_MASTER_CURRENCY)',
    watch(INVENTORY_MASTER_CURRENCY)
  );
  const onSubmit: SubmitHandler<IMaterTableInventory> = (data: any) => {
    // data.currency = selectCurrency;
    data.attachments = newAttachmentsData;
    data.old_attachments = oldAttachmentsData;
    const filteredData = Object?.fromEntries(
      Object.entries(data)?.filter(
        ([_, value]) => value !== undefined && value !== ''
      )
    );

    if (supplierDetailsObjectById?._id) {
      let dataPayload = {
        id: supplierDetailsObjectById?._id,
        ...data,
      };
      dispatch(updateInventoryMaster(requestGenerator(dataPayload))).then(
        (e) => {
          if (e.type === 'inventoryMaster/updateInventoryMaster/fulfilled') {
            navigate('/inventorymastertable');
          }
        }
      );
    } else {
      dispatch(createInventoryMaster(requestGenerator(filteredData))).then(
        (e) => {
          if (e.type === 'inventoryMaster/createInventoryMaster/fulfilled') {
            navigate('/inventorymastertable');
          }
        }
      );
    }
  };

  // set the data on form
  useEffect(() => {
    if (supplierDetailsObjectById) {
      reset(supplierDetailsObjectById);
    }
  }, [reset, supplierDetailsObjectById]);

  useEffect(() => {
    if (supplierDetailsObjectById?._id) {
      let data = supplierDetailsObjectById?.attachments?.map((item: any) => {
        return { name: item?.name, data_uri: item?.data_uri, id: item?._id };
      });
      setAttachmentFiles(data);
    }
  }, [supplierDetailsObjectById?._id]);

  const handleReset = () => {
    reset();
    setValue(INVENTORY_MASTER_NAME, '');
    setValue(INVENTORY_MASTER_NAME, '');
    setValue(INVENTORY_MASTER_CONTACT_PERSON, '');
    setValue(INVENTORY_MASTER_CONTACT_NO, '');
    setValue(INVENTORY_MASTER_CURRENCY, '');
    setValue(INVENTORY_MASTER_ADDRESS_LINE_ONE, '');
    setValue(INVENTORY_MASTER_ADDRESS_LINE_TWO, '');
    setValue(INVENTORY_MASTER_ZIPCODE, '');
    setValue(INVENTORY_MASTER_CITY, '');
    setValue(INVENTORY_MASTER_STATE, '');
    setValue(INVENTORY_MASTER_COUNTRY, '');
    setValue(INVENTORY_MASTER_ATTACHMENTS, []);
    setValue(INVENTORY_MASTER_NOTES, '');
    setAttachmentFiles([]);
    setSelectCurrency(null);
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.manageBranchContainer}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputFieldsContainer}>
            <div className={styles.labelField}>
              <label
                htmlFor={INVENTORY_MASTER_NAME}
                className={styles.labelText}
              >
                Name <span className="asterick">*</span>
              </label>
              <div className={styles.fieldErrorContainer}>
                <input
                  type="text"
                  className={styles.inputField}
                  placeholder="Enter Name"
                  defaultValue={supplierDetailsObjectById?.name}
                  {...register(
                    INVENTORY_MASTER_NAME,
                    inventoryMasterTableValidators[INVENTORY_MASTER_NAME]
                  )}
                  onChange={(e) => trimValue(e)}
                />
                {errors[INVENTORY_MASTER_NAME] && (
                  <p className="dashboardFormError">
                    {errors[INVENTORY_MASTER_NAME].message as any}
                  </p>
                )}
              </div>
            </div>

            <div className={styles.labelField}>
              <label
                htmlFor={INVENTORY_MASTER_CURRENCY}
                className={styles.labelText}
              >
                Currency <span className="asterick">*</span>
              </label>
              <div className={styles.fieldErrorContainer}>
                {/* <Select
                  className={styles.selectInputField}
                  isSearchable={true}
                  isClearable={true}
                  options={currencyData[0]
                    ?.filter((item: any) => item?.is_active)
                    ?.map((item: any) => ({
                      label: item?.value,
                      value: item?._id,
                    }))}
                  value={selectCurrency ?? null}
                  closeMenuOnSelect={false}
                  placeholder="Select Currency"
                  {...register(
                    INVENTORY_MASTER_CURRENCY,
                    inventoryMasterTableValidators[INVENTORY_MASTER_CURRENCY]
                  )}
                  onChange={(e: any) => {
                    const selectValue = e;
                    setValue(INVENTORY_MASTER_CURRENCY, selectValue);
                    trigger(INVENTORY_MASTER_CURRENCY);
                    setSelectCurrency(selectValue);
                  }}
                  maxMenuHeight={200}
                /> */}
                <select
                  className={styles.selectInputField}
                  {...register(
                    INVENTORY_MASTER_CURRENCY,
                    inventoryMasterTableValidators[INVENTORY_MASTER_CURRENCY]
                  )}
                  placeholder="Select Currency"
                >
                  <option value="" selected disabled hidden>
                    Select Currency
                  </option>
                  {currencyData[0]?.map((item: any, i: number) => {
                    return (
                      <React.Fragment key={i}>
                        <option
                          value={item?._id}
                          selected={
                            item?._id === supplierDetailsObjectById?.currency
                          }
                        >
                          {item?.value}
                        </option>
                      </React.Fragment>
                    );
                  })}
                </select>
                {errors[INVENTORY_MASTER_CURRENCY] && (
                  <p className="errorText">
                    {errors[INVENTORY_MASTER_CURRENCY].message as any}
                  </p>
                )}
              </div>
            </div>

            <div className={styles.labelField}>
              <label
                htmlFor={INVENTORY_MASTER_CONTACT_NO}
                className={styles.labelText}
              >
                Contact No. <span className="asterick">*</span>
              </label>
              <div className={styles.fieldErrorContainer}>
                <PhoneInput
                  country={'kw'}
                  {...register(
                    INVENTORY_MASTER_CONTACT_NO,
                    inventoryMasterTableValidators[INVENTORY_MASTER_CONTACT_NO]
                  )}
                  value={getValues(INVENTORY_MASTER_CONTACT_NO)}
                  onChange={(phone: any) => {
                    const formattedPhone = phone && `+${phone}`;
                    setValue(INVENTORY_MASTER_CONTACT_NO, formattedPhone);
                    trigger(INVENTORY_MASTER_CONTACT_NO);
                  }}
                  inputClass={styles.phoneNumberInput}
                />
                {errors[INVENTORY_MASTER_CONTACT_NO] && (
                  <p className="errorText">
                    {errors[INVENTORY_MASTER_CONTACT_NO].message as any}
                  </p>
                )}
              </div>
            </div>

            <div className={styles.labelField}>
              <label
                htmlFor={INVENTORY_MASTER_CONTACT_PERSON}
                className={styles.labelText}
              >
                Contact Person Name <span className="asterick">*</span>
              </label>
              <div className={styles.fieldErrorContainer}>
                <input
                  type="text"
                  className={styles.inputField}
                  placeholder="Enter Contact Person Name"
                  defaultValue={supplierDetailsObjectById?.contact_name}
                  {...register(INVENTORY_MASTER_CONTACT_PERSON)}
                  onChange={(e) => trimValue(e)}
                />
              </div>
            </div>

            <div className={styles.labelField}>
              <label
                htmlFor={INVENTORY_MASTER_ADDRESS_LINE_ONE}
                className={styles.labelText}
              >
                Address Line 1
              </label>
              <div className={styles.fieldErrorContainer}>
                <input
                  type="text"
                  placeholder="Address Line 1"
                  className={styles.inputField}
                  defaultValue={
                    supplierDetailsObjectById?.address?.address_line_1
                  }
                  {...register(INVENTORY_MASTER_ADDRESS_LINE_ONE)}
                  onChange={(e) => trimValue(e)}
                />
              </div>
            </div>

            <div className={styles.labelField}>
              <label
                htmlFor={INVENTORY_MASTER_ADDRESS_LINE_TWO}
                className={styles.labelText}
              >
                Address Line 2
              </label>
              <div className={styles.fieldErrorContainer}>
                <input
                  type="text"
                  placeholder="Address Line 2"
                  className={styles.inputField}
                  defaultValue={
                    supplierDetailsObjectById?.address?.address_line_2
                  }
                  {...register(INVENTORY_MASTER_ADDRESS_LINE_TWO)}
                  onChange={(e) => trimValue(e)}
                />
              </div>
            </div>

            <div className={styles.labelField}>
              <label
                htmlFor={INVENTORY_MASTER_ZIPCODE}
                className={styles.labelText}
              >
                Zipcode
              </label>
              <div className={styles.fieldErrorContainer}>
                <input
                  type="number"
                  className={styles.inputField}
                  placeholder="Enter Zip Code"
                  defaultValue={supplierDetailsObjectById?.address?.zipcode}
                  {...register(INVENTORY_MASTER_ZIPCODE)}
                  onChange={(e) => trimValue(e)}
                />
              </div>
            </div>

            <div className={styles.labelField}>
              <label
                htmlFor={INVENTORY_MASTER_CITY}
                className={styles.labelText}
              >
                City
              </label>
              <div className={styles.fieldErrorContainer}>
                <input
                  type="text"
                  placeholder="Enter City"
                  className={styles.inputField}
                  defaultValue={supplierDetailsObjectById?.address?.city}
                  {...register(INVENTORY_MASTER_CITY)}
                  onChange={(e) => trimValue(e)}
                />
              </div>
            </div>

            <div className={styles.labelField}>
              <label
                htmlFor={INVENTORY_MASTER_STATE}
                className={styles.labelText}
              >
                State
              </label>
              <div className={styles.fieldErrorContainer}>
                <input
                  type="text"
                  className={styles.inputField}
                  placeholder="Enter State"
                  defaultValue={supplierDetailsObjectById?.address?.state}
                  {...register(INVENTORY_MASTER_STATE)}
                  onChange={(e) => trimValue(e)}
                />
              </div>
            </div>

            <div className={styles.labelField}>
              <label
                htmlFor={INVENTORY_MASTER_COUNTRY}
                className={styles.labelText}
              >
                Country
              </label>
              <div className={styles.fieldErrorContainer}>
                <input
                  type="text"
                  className={styles.inputField}
                  placeholder="Enter Country"
                  defaultValue={supplierDetailsObjectById?.address?.country}
                  {...register(INVENTORY_MASTER_COUNTRY)}
                  onChange={(e) => trimValue(e)}
                />
              </div>
            </div>

            <div className={styles.labelField}>
              <label className={styles.labelText}>Notes</label>
              <div className={styles.fieldErrorContainer}>
                <textarea
                  placeholder="Enter notes"
                  className={styles.inputField}
                  {...register(INVENTORY_MASTER_NOTES)}
                  onChange={(e) => trimValue(e)}
                />
              </div>
            </div>

            <div className={styles.labelField}>
              <label className={styles.labelText}>Attachments</label>
              <div className={styles.fieldErrorContainer}>
                <AttachfilesV2
                  fileKey={INVENTORY_MASTER_ATTACHMENTS}
                  isMultiSelect={true}
                  {...register(INVENTORY_MASTER_ATTACHMENTS)}
                  setValue={setValue}
                  attachments={attachmentFiles}
                  setAttachments={setAttachmentFiles}
                  customClassFileName={styles.fileNameStyle}
                />
              </div>
            </div>
          </div>

          <div className={styles.btnContainer}>
            <Button title="Submit" type="submit" />
            <Button
              title="Reset"
              type="button"
              customClass={styles.backBtn}
              handleClick={handleReset}
            />
            <Button
              title="Back"
              customClass={styles.backBtn}
              type="button"
              handleClick={() => {
                navigate('/inventorymastertable');
              }}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default AddNewSuplier;

import { FC, useState, useEffect } from 'react';
import styles from './addMarketPlacePopup.module.scss';
import { CloseIcon } from '../../svg-components';
import { colors } from '../../../../constants/color';
import Divider from '../../divider/Divider';
import { trimValue } from '../../../../utils/utils';
import Select from 'react-select';
import AttachFiles from '../../attach-files/Attachfiles';
import Button from '../../button/Button';
import {
  ADDRESS,
  ATTACHMENTS,
  CLAIM_TYPE,
  COMPANY_NAME,
  MARKETPLACE_CITY,
  MARKETPLACE_REMARKS,
  MARKETPLACE_STATE,
  PHONE,
  PIN_CODE,
  REIMBURSEMENT_TYPE,
} from '../../../../constants/constant';
import { addMarketPlaceValidators } from '../../../../form-validators/addMarketPlaceValidators';
import { useForm } from 'react-hook-form';
import { IAddMarketPlaceForm } from '../../../../interfaces/interfaces';
import {
  claimTypeDropdown,
  reimbursementTypeDropdown,
} from '../../../../constants/data';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { requestGenerator } from '../../../../utils/payloadGenerator';
import {
  addmarketplace,
  deleteMarketplaceAttachment,
  getAllmarketplace,
  updateMarketplace,
} from '../../../../redux/features/insurance/insuranceAsyncActions';
import Loader from '../../spinner/Loader';

interface IAddMarketPlace {
  handleClose?: any;
  setModelOpenClose?: any;
}

const AddMarketPlacePopup: FC<IAddMarketPlace> = ({
  handleClose,
  setModelOpenClose,
}) => {
  const dispatch = useAppDispatch();
  const { isLoading, marketplaceDetail } = useAppSelector(
    (state) => state.insurance
  );

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<IAddMarketPlaceForm>({
    defaultValues: {
      marketplace_name: marketplaceDetail?.marketplace_name,
      address: marketplaceDetail?.address,
      phone: marketplaceDetail?.phone,
      pincode: marketplaceDetail?.pincode,
      state: marketplaceDetail?.state,
      city: marketplaceDetail?.city,
      remarks: marketplaceDetail?.remarks,
    },
  });

  let formData = watch();

  useEffect(() => {
    if (marketplaceDetail[REIMBURSEMENT_TYPE]) {
      const matchingItems = reimbursementTypeDropdown.filter((obj: any) =>
        marketplaceDetail[REIMBURSEMENT_TYPE]?.some(
          (item: any) => item === obj?.label
        )
      );

      let componentsData: any[] = [];
      componentsData =
        matchingItems.length > 0
          ? matchingItems?.map((item: any) => {
              return { label: item?.value, value: item?.label };
            })
          : [];
      setValue(REIMBURSEMENT_TYPE, componentsData || []);
    }
  }, [marketplaceDetail[REIMBURSEMENT_TYPE]]);

  useEffect(() => {
    if (marketplaceDetail[CLAIM_TYPE]) {
      const matchingItems = claimTypeDropdown.filter((obj: any) =>
        marketplaceDetail[CLAIM_TYPE]?.some((item: any) => item === obj?.value)
      );

      let componentsData: any[] = [];
      componentsData =
        matchingItems.length > 0
          ? matchingItems?.map((item: any) => {
              return { label: item?.label, value: item?.value };
            })
          : [];
      setValue(CLAIM_TYPE, componentsData || []);
    }
  }, [marketplaceDetail[CLAIM_TYPE]]);

  useEffect(() => {
    if (marketplaceDetail[ATTACHMENTS]?.length > 0) {
      let data = marketplaceDetail[ATTACHMENTS]?.map((item: any) => {
        return { name: item?.name, data_uri: item?.data_uri, id: item?._id };
      });
      setValue(ATTACHMENTS, data);
    }
  }, [marketplaceDetail[ATTACHMENTS]]);

  const onSubmit = async (data: IAddMarketPlaceForm) => {
    console.log('first', data);
    let reqData = {
      ...data,
      [REIMBURSEMENT_TYPE]: formData[REIMBURSEMENT_TYPE]?.map(
        (item: any) => item?.value
      ),
      [CLAIM_TYPE]: formData[CLAIM_TYPE]?.map((item: any) => item?.value),
    };
    if (marketplaceDetail?._id === undefined) {
      dispatch(addmarketplace(requestGenerator(reqData))).then((e) => {
        if (e.type === 'insurance/addMarketplace/fulfilled') {
          dispatch(getAllmarketplace(requestGenerator({})));
          setTimeout(() => {
            setModelOpenClose(false);
          }, 2000);
        }
      });
    } else {
      dispatch(
        updateMarketplace(
          requestGenerator({
            marketplace_id: marketplaceDetail?._id,
            data: reqData,
          })
        )
      ).then((e) => {
        if (e.type === 'insurance/updateMarketplace/fulfilled') {
          dispatch(getAllmarketplace(requestGenerator({})));
          setTimeout(() => {
            setModelOpenClose(false);
          }, 2000);
        }
      });
    }
  };

  const handleDelete = (item: any) => {
    let data = {
      marketplace_id: marketplaceDetail?._id,
      image_id: item?.id,
    };
    if (marketplaceDetail && marketplaceDetail.hasOwnProperty('_id')) {
      dispatch(deleteMarketplaceAttachment(requestGenerator(data)));
    }
  };

  return (
    <>
      {isLoading && <Loader />}

      <div
        className={styles.popupContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <CloseIcon
          customClass={styles.closeIconStyle}
          fillColor={colors.green1}
          handleClick={handleClose}
        />
        <div className={styles.notesContainer}>
          <p className={styles.title}>
            {marketplaceDetail?._id === undefined ? 'Add' : 'Edit'} Marketplace
            Company
          </p>
          <Divider customClass={styles.dividerStyle} />
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.labelField}>
              <label className={styles.labelText}>
                Company Name <span className="asterick">*</span>
              </label>
              <div className={styles.fieldErrorContainer}>
                <input
                  type="text"
                  className={styles.inputField}
                  placeholder="Enter Company Name"
                  {...register(
                    COMPANY_NAME,
                    addMarketPlaceValidators[COMPANY_NAME]
                  )}
                  onChange={(e) => trimValue(e)}
                />
                {errors[COMPANY_NAME] && (
                  <p className="errorText">{errors[COMPANY_NAME].message}</p>
                )}
              </div>
            </div>
            <div className={styles.labelField}>
              <label className={styles.labelText}>
                Reimbursement Type<span className="asterick">*</span>
              </label>
              <div className={styles.fieldErrorContainer}>
                <Select
                  className={styles.select}
                  placeholder="Reimbursement Type"
                  closeMenuOnSelect={true}
                  isSearchable={true}
                  isMulti
                  {...register(
                    REIMBURSEMENT_TYPE,
                    addMarketPlaceValidators[REIMBURSEMENT_TYPE]
                  )}
                  options={reimbursementTypeDropdown?.map((item: any) => ({
                    label: item?.value,
                    value: item?.label,
                  }))}
                  value={watch(REIMBURSEMENT_TYPE) || []}
                  onChange={(e) => {
                    setValue(
                      REIMBURSEMENT_TYPE,
                      e.map((item: any) => {
                        return item;
                      })
                    );
                    trigger(REIMBURSEMENT_TYPE);
                  }}
                  // onChange={(selectedOptions: any) => {
                  //   const selectedValues = selectedOptions.map(
                  //     (option: any) => option.value
                  //   );
                  //   setValue(REIMBURSEMENT_TYPE, selectedValues);
                  //   trigger(REIMBURSEMENT_TYPE);
                  // }}
                  maxMenuHeight={200}
                />

                {errors[REIMBURSEMENT_TYPE] && (
                  <p className="errorText">
                    {errors[REIMBURSEMENT_TYPE].message as any}
                  </p>
                )}
              </div>
            </div>
            <div className={styles.labelField}>
              <label className={styles.labelText}>
                Claim Type<span className="asterick">*</span>
              </label>
              <div className={styles.fieldErrorContainer}>
                <Select
                  className={styles.select}
                  placeholder="Claim Type"
                  closeMenuOnSelect={true}
                  isSearchable={true}
                  isMulti
                  {...register(
                    CLAIM_TYPE,
                    addMarketPlaceValidators[CLAIM_TYPE]
                  )}
                  options={claimTypeDropdown?.map((item: any) => ({
                    label: item?.label,
                    value: item?.value,
                  }))}
                  value={watch(CLAIM_TYPE) || []}
                  onChange={(e) => {
                    setValue(
                      CLAIM_TYPE,
                      e.map((item: any) => {
                        return item;
                      })
                    );
                    trigger(CLAIM_TYPE);
                  }}
                  maxMenuHeight={200}
                />
                {errors[CLAIM_TYPE] && (
                  <p className="errorText">
                    {errors[CLAIM_TYPE].message as any}
                  </p>
                )}
              </div>
            </div>
            <div className={styles.labelField}>
              <label className={styles.labelText}>Address</label>
              <div className={styles.fieldErrorContainer}>
                <input
                  type="text"
                  className={styles.inputField}
                  placeholder="Enter Address"
                  {...register(ADDRESS)}
                  onChange={(e) => trimValue(e)}
                />
              </div>
            </div>
            <div className={styles.labelField}>
              <label className={styles.labelText}>Phone</label>
              <div className={styles.fieldErrorContainer}>
                <input
                  type="number"
                  className={styles.inputField}
                  placeholder="Enter Phone"
                  {...register(PHONE)}
                  onChange={(e) => trimValue(e)}
                />
              </div>
            </div>
            <div className={styles.labelField}>
              <label className={styles.labelText}>State</label>
              <div className={styles.fieldErrorContainer}>
                <input
                  type="text"
                  className={styles.inputField}
                  placeholder="Enter State"
                  {...register(MARKETPLACE_STATE)}
                  onChange={(e) => trimValue(e)}
                />
              </div>
            </div>
            <div className={styles.labelField}>
              <label className={styles.labelText}>City</label>
              <div className={styles.fieldErrorContainer}>
                <input
                  type="text"
                  className={styles.inputField}
                  placeholder="Enter City"
                  {...register(MARKETPLACE_CITY)}
                  onChange={(e) => trimValue(e)}
                />
              </div>
            </div>
            <div className={styles.labelField}>
              <label className={styles.labelText}>PIN CODE</label>
              <div className={styles.fieldErrorContainer}>
                <input
                  type="number"
                  className={styles.inputField}
                  placeholder="Enter PIN CODE"
                  {...register(PIN_CODE)}
                  onChange={(e) => trimValue(e)}
                />
              </div>
            </div>
            <div className={styles.labelField}>
              <label className={styles.labelText}>Attachments</label>
              <div className={styles.fieldErrorContainer}>
                <AttachFiles
                  fileKey={ATTACHMENTS}
                  isMultiSelect={true}
                  {...register(ATTACHMENTS)}
                  setValue={setValue}
                  customClassFileName={styles.fileNameStyle}
                  attachmentData={marketplaceDetail[ATTACHMENTS]?.map(
                    (item: any) => {
                      return {
                        name: item?.name,
                        data_uri: item?.data_uri,
                        id: item?._id,
                      };
                    }
                  )}
                  handleDelete={handleDelete}
                />
              </div>
            </div>

            <div className={styles.labelField}>
              <label className={styles.labelText}>Remarks</label>
              <div className={styles.fieldErrorContainer}>
                <textarea
                  className={styles.remarksField}
                  placeholder="Enter Remarks"
                  {...register(MARKETPLACE_REMARKS)}
                  onChange={(e) => trimValue(e)}
                />
              </div>
            </div>
            <Button
              title="Save & Exit"
              customClass={styles.btnStyle}
              type="submit"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default AddMarketPlacePopup;

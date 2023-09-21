import { FC, useState, useEffect } from 'react';
import styles from './addInsuranceCompanyPopup.module.scss';
import { trimValue } from '../../../../utils/utils';
import Button from '../../button/Button';
import { CloseIcon } from '../../svg-components';
import Divider from '../../divider/Divider';
import { colors } from '../../../../constants/color';
import Select from 'react-select';
import AttachFiles from '../../attach-files/Attachfiles';
import { IAddInsuranceCompanyForm } from '../../../../interfaces/interfaces';
import { useForm } from 'react-hook-form';
import { addInsuranceCompanyValidators } from '../../../../form-validators/addInsuranceCompanyValidators';
import {
  INSURANCE_ADDRESS,
  INSURANCE_ATTACHMENTS,
  INSURANCE_CITY,
  INSURANCE_CLAIM_TYPE,
  INSURANCE_COMPANY,
  INSURANCE_PHONE,
  INSURANCE_PIN_CODE,
  INSURANCE_REIMBURSEMENT_TYPE,
  INSURANCE_REMARKS,
  INSURANCE_STATE,
  MARKETPLACE,
} from '../../../../constants/constant';
import {
  claimTypeDropdown,
  reimbursementTypeDropdown,
} from '../../../../constants/data';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { requestGenerator } from '../../../../utils/payloadGenerator';
import {
  addInsuarnceCompany,
  deleteInsuranceCompanyAttachment,
  getAllInsuarnceCompany,
  updateInsuranceCompany,
} from '../../../../redux/features/insurance/insuranceAsyncActions';
import Loader from '../../spinner/Loader';

interface IAddInsuranceCompany {
  handleClose?: any;
  setModelOpenClose?: any;
  popData?: any;
}

const AddInsuranceCompanyPopup: FC<IAddInsuranceCompany> = ({
  handleClose,
  setModelOpenClose,
  popData,
}) => {
  const dispatch = useAppDispatch();
  const { isLoading, marketplaceData, insuranceCompanyDetail } = useAppSelector(
    (state) => state.insurance
  );

  console.log('insuranceCompanyDetail', insuranceCompanyDetail);
  console.log('popData', popData);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<IAddInsuranceCompanyForm>({
    defaultValues: {
      insurance_company_name: insuranceCompanyDetail?.insurance_company_name,
      address: insuranceCompanyDetail?.address,
      phone: insuranceCompanyDetail?.phone,
      state: insuranceCompanyDetail?.state,
      city: insuranceCompanyDetail?.city,
      pincode: insuranceCompanyDetail?.pincode,
      remarks: insuranceCompanyDetail?.remarks,
    },
  });

  let formData = watch();

  useEffect(() => {
    if (insuranceCompanyDetail[INSURANCE_REIMBURSEMENT_TYPE]) {
      const matchingItems = reimbursementTypeDropdown.filter((obj: any) =>
        insuranceCompanyDetail[INSURANCE_REIMBURSEMENT_TYPE]?.some(
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
      setValue(INSURANCE_REIMBURSEMENT_TYPE, componentsData || []);
    }
  }, [insuranceCompanyDetail[INSURANCE_REIMBURSEMENT_TYPE]]);

  useEffect(() => {
    if (insuranceCompanyDetail[INSURANCE_ATTACHMENTS]?.length > 0) {
      let data = insuranceCompanyDetail[INSURANCE_ATTACHMENTS]?.map(
        (item: any) => {
          return { name: item?.name, data_uri: item?.data_uri, id: item?._id };
        }
      );
      setValue(INSURANCE_ATTACHMENTS, data);
    }
  }, [insuranceCompanyDetail[INSURANCE_ATTACHMENTS]]);

  useEffect(() => {
    if (insuranceCompanyDetail[INSURANCE_CLAIM_TYPE]) {
      const matchingItems = claimTypeDropdown.filter((obj: any) =>
        insuranceCompanyDetail[INSURANCE_CLAIM_TYPE]?.some(
          (item: any) => item === obj?.value
        )
      );

      let componentsData: any[] = [];
      componentsData =
        matchingItems.length > 0
          ? matchingItems?.map((item: any) => {
              return { label: item?.label, value: item?.value };
            })
          : [];
      setValue(INSURANCE_CLAIM_TYPE, componentsData || []);
    }
  }, [insuranceCompanyDetail[INSURANCE_CLAIM_TYPE]]);

  console.log('INSURANCE_ATTACHMENTS', formData[INSURANCE_ATTACHMENTS]);

  const onSubmit = async (data: IAddInsuranceCompanyForm) => {
    data.marketplace_company_id = popData?.value;
    console.log('first', data);
    let reqData = {
      ...data,
      [INSURANCE_CLAIM_TYPE]: formData[INSURANCE_CLAIM_TYPE]?.map(
        (item: any) => item?.value
      ),
      [INSURANCE_REIMBURSEMENT_TYPE]: formData[
        INSURANCE_REIMBURSEMENT_TYPE
      ]?.map((item: any) => item?.value),
    };
    if (insuranceCompanyDetail?._id !== undefined) {
      dispatch(
        updateInsuranceCompany(
          requestGenerator({
            company_id: insuranceCompanyDetail?._id,
            data: reqData,
          })
        )
      ).then((e) => {
        if (e.type === 'insurance/updateInsuranceCompany/fulfilled') {
          setTimeout(() => {
            setModelOpenClose(false);
          }, 2000);
          let payloadData = {
            marketplace_id: data?.marketplace_company_id,
          };
          dispatch(getAllInsuarnceCompany(requestGenerator(payloadData)));
        }
      });
    } else {
      dispatch(addInsuarnceCompany(requestGenerator(reqData))).then((e) => {
        if (e.type === 'insurance/addInsuranceCompany/fulfilled') {
          setTimeout(() => {
            setModelOpenClose(false);
          }, 2000);
          let payloadData = {
            marketplace_id: data?.marketplace_company_id,
          };
          dispatch(getAllInsuarnceCompany(requestGenerator(payloadData)));
        }
      });
    }
  };

  let selectedPlan = marketplaceData?.map((item: any) => {
    if (item._id == popData?.value) {
      return item;
    }
  });

  let reimbursementTypeData = [] as any;

  selectedPlan?.map((item: any) => {
    return item?.reimbursement_type.map((itemData: any) => {
      if (itemData !== undefined) {
        reimbursementTypeData.push(itemData);
      }
    });
  });

  let selectedPlanReimbursementType = reimbursementTypeData?.map(
    (item: any) => {
      return { label: item.toLowerCase(), value: item };
    }
  );

  let claimTypeData = [] as any;

  selectedPlan?.map((item: any) => {
    return item?.claim_type.map((itemData: any) => {
      if (itemData !== undefined) {
        claimTypeData.push(itemData);
      }
    });
  });

  let selectedPlanClaimType = claimTypeData?.map((item: any) => {
    return { label: item.charAt(0).toUpperCase() + item.slice(1), value: item };
  });

  const handleDelete = (item: any) => {
    let data = {
      company_id: insuranceCompanyDetail?._id,
      image_id: item?.id,
    };
    if (
      insuranceCompanyDetail &&
      insuranceCompanyDetail.hasOwnProperty('_id')
    ) {
      dispatch(deleteInsuranceCompanyAttachment(requestGenerator(data)));
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
            {insuranceCompanyDetail?._id === undefined ? 'Add' : 'Edit'}{' '}
            Insurance Company
          </p>
          <Divider customClass={styles.dividerStyle} />
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.labelField}>
              <label className={styles.labelText}>
                Marketplace Company<span className="asterick">*</span>
              </label>
              <div className={styles.fieldErrorContainer}>
                <Select
                  className={styles.select}
                  placeholder="Marketplace Company"
                  closeMenuOnSelect={true}
                  isSearchable={true}
                  {...register(
                    MARKETPLACE
                    // addInsuranceCompanyValidators[MARKETPLACE]
                  )}
                  value={popData}
                  // options={marketplaceData?.map((item: any) => ({
                  //   label: item?.marketplace_name,
                  //   value: item?._id,
                  // }))}
                  // onChange={(e: any) => {
                  //   setValue(MARKETPLACE, e.value);
                  //   trigger(MARKETPLACE);
                  //   setMarketplaceCompany(e.value)
                  // }}
                  maxMenuHeight={200}
                  isDisabled={true}
                  // styles={customStyles}
                />
                {errors[MARKETPLACE] && (
                  <p className="errorText">
                    {errors[MARKETPLACE].message as any}
                  </p>
                )}
              </div>
            </div>
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
                    INSURANCE_COMPANY,
                    addInsuranceCompanyValidators[INSURANCE_COMPANY]
                  )}
                  onChange={(e) => trimValue(e)}
                />
                {errors[INSURANCE_COMPANY] && (
                  <p className="errorText">
                    {errors[INSURANCE_COMPANY].message}
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
                    INSURANCE_CLAIM_TYPE,
                    addInsuranceCompanyValidators[INSURANCE_CLAIM_TYPE]
                  )}
                  value={watch(INSURANCE_CLAIM_TYPE) || []}
                  onChange={(e) => {
                    setValue(
                      INSURANCE_CLAIM_TYPE,
                      e.map((item: any) => {
                        return item;
                      })
                    );
                    trigger(INSURANCE_CLAIM_TYPE);
                  }}
                  // onChange={(selectedOptions: any) => {
                  //   const selectedValues = selectedOptions.map(
                  //     (option: any) => option.value
                  //   );
                  //   setValue(INSURANCE_CLAIM_TYPE, selectedValues);
                  //   trigger(INSURANCE_CLAIM_TYPE);
                  // }}
                  options={selectedPlanClaimType?.map((item: any) => ({
                    label: item?.value,
                    value: item?.value,
                  }))}
                  maxMenuHeight={200}
                  // styles={customStyles}
                />
                {errors[INSURANCE_CLAIM_TYPE] && (
                  <p className="errorText">
                    {errors[INSURANCE_CLAIM_TYPE].message as any}
                  </p>
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
                    INSURANCE_REIMBURSEMENT_TYPE,
                    addInsuranceCompanyValidators[INSURANCE_REIMBURSEMENT_TYPE]
                  )}
                  value={watch(INSURANCE_REIMBURSEMENT_TYPE) || []}
                  onChange={(e) => {
                    setValue(
                      INSURANCE_REIMBURSEMENT_TYPE,
                      e.map((item: any) => {
                        return item;
                      })
                    );
                    trigger(INSURANCE_REIMBURSEMENT_TYPE);
                  }}
                  // onChange={(selectedOptions: any) => {
                  //   const selectedValues = selectedOptions.map(
                  //     (option: any) => option.value
                  //   );
                  //   setValue(INSURANCE_REIMBURSEMENT_TYPE, selectedValues);
                  //   trigger(INSURANCE_REIMBURSEMENT_TYPE);
                  // }}
                  options={selectedPlanReimbursementType?.map((item: any) => ({
                    label: item?.value,
                    value: item?.value,
                  }))}
                  maxMenuHeight={200}
                  // styles={customStyles}
                />
                {errors[INSURANCE_REIMBURSEMENT_TYPE] && (
                  <p className="errorText">
                    {errors[INSURANCE_REIMBURSEMENT_TYPE].message as any}
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
                  {...register(INSURANCE_ADDRESS)}
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
                  {...register(INSURANCE_PHONE)}
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
                  {...register(INSURANCE_STATE)}
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
                  {...register(INSURANCE_CITY)}
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
                  {...register(INSURANCE_PIN_CODE)}
                  onChange={(e) => trimValue(e)}
                />
              </div>
            </div>
            <div className={styles.labelField}>
              <label className={styles.labelText}>Attachments</label>
              <div className={styles.fieldErrorContainer}>
                {/* <input
                type="text"
                className={styles.inputField}
                placeholder="Enter City"
                onChange={(e) => trimValue(e)}
              /> */}
                <AttachFiles
                  isMultiSelect={true}
                  fileKey={INSURANCE_ATTACHMENTS}
                  setValue={setValue}
                  {...register(INSURANCE_ATTACHMENTS)}
                  customClassFileName={styles.fileNameStyle}
                  attachmentData={insuranceCompanyDetail[
                    INSURANCE_ATTACHMENTS
                  ]?.map((item: any) => {
                    return {
                      name: item?.name,
                      data_uri: item?.data_uri,
                      id: item?._id,
                    };
                  })}
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
                  {...register(INSURANCE_REMARKS)}
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

export default AddInsuranceCompanyPopup;

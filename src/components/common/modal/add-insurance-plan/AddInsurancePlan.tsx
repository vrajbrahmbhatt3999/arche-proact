import { FC, useState, useEffect } from 'react';
import Button from '../../button/Button';
import { dataURI, disableArrowKey, trimValue } from '../../../../utils/utils';
import { AddButtonIcon, CloseIcon } from '../../svg-components';
import { colors } from '../../../../constants/color';
import Divider from '../../divider/Divider';
import styles from './addInsurancePlan.module.scss';
import Select from 'react-select';
import AttachFiles from '../../attach-files/Attachfiles';
import { useForm } from 'react-hook-form';
import {
  IAddInsurancePlanCompanyForm,
  fileType,
} from '../../../../interfaces/interfaces';
import {
  CLAIM_FORM,
  COMMISSION,
  CO_PAY,
  CO_PAY_VALUE,
  DEPARTMENT,
  DISCOUNT,
  INSURANCE_PLAN,
  INSURANCE_PLAN_COMPANY,
  INSURANCE_PLAN_REIMBURSEMENT_TYPE,
  INSURANCE__PLAN_CLAIM_TYPE,
  PLAN_ATTACHMENT,
  PLAN_REMARKS,
  SERVICES,
} from '../../../../constants/constant';
import { addInsurancePlanValidators } from '../../../../form-validators/addInsurancePlanValidators';
import { coPayDropdown, failure } from '../../../../constants/data';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { requestGenerator } from '../../../../utils/payloadGenerator';
import {
  addInsuarncePlan,
  allInsuarncePlan,
  deleteInsurancePlanAttachment,
  getAllInsuarncePlan,
  updateInsurancePlan,
} from '../../../../redux/features/insurance/insuranceAsyncActions';
import { clearDepartmentServiceData } from '../../../../redux/features/insurance/insuranceSlice';
import AttachFilesN from '../../attach-files/single-file/AttachSingleFile';
import { setMessage } from '../../../../redux/features/toast/toastSlice';

interface IAddInsurancePlan {
  handleClose?: any;
  handleDepartment?: any;
  handleDepartmentServiceConfig?: any;
  popData?: any;
  setModelOpenClose?: any;
  headerData?: any;
  branchId?: any;
}

const AddInsurancePlan: FC<IAddInsurancePlan> = ({
  handleClose,
  handleDepartment,
  handleDepartmentServiceConfig,
  popData,
  headerData,
  setModelOpenClose,
  branchId,
}) => {
  const [copay, setCopay] = useState('');
  const {
    isLoading,
    insuranceCompanyData,
    insurancePlanDetail,
    departmentServices,
    palnDepartmentList,
    selDeptSrv,
  } = useAppSelector((state) => state.insurance);
  const { departmentData } = useAppSelector((state) => state.department);
  const [departmentId, setDepartmentId] = useState<any>();
  const [copayValue, setCopayValue] = useState<any>();
  const [isCopay, setIsCopay] = useState<any>(null);
  const [claimAttachment, setClaimAttachment] = useState({
    name: '',
    data_uri: '',
  });

  let serviceName = selDeptSrv?.map((item: any) => {
    return {
      service_id: item?._id,
      service_name: item?.name,
      price: item?.sell_price,
      department_id: item?.department_id,
      department_name: item?.department_name,
      discounted_price: item?.disounted_price,
      service_no: item?.service_no,
    };
  });

  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<IAddInsurancePlanCompanyForm>({
    defaultValues: {
      insurance_plan: insurancePlanDetail?.insurance_plan,
      Co_Pay_percentage: insurancePlanDetail?.Co_Pay_percentage,
      discount: insurancePlanDetail?.discount,
      comission: insurancePlanDetail?.comission,
      remarks: insurancePlanDetail?.remarks,
    },
  });

  const userPhotoField = watch(CLAIM_FORM);
  const fileName = userPhotoField?.[0];
  useEffect(() => {
    const fileList: fileType = { name: '', data_uri: '' };
    const getDataURI = async (fileName: File) => {
      try {
        const result = await dataURI(fileName);
        fileList.data_uri = result;
        fileList.name = fileName.name;
        setClaimAttachment(fileList);
      } catch (error) {
        console.log({ error });
      }
    };
    if (fileName) {
      getDataURI(fileName);
    }
  }, [fileName]);

  useEffect(() => {
    if (insurancePlanDetail[INSURANCE__PLAN_CLAIM_TYPE]) {
      const matchingItems = selectedPlanClaimType.filter((obj: any) =>
        insurancePlanDetail[INSURANCE__PLAN_CLAIM_TYPE]?.some(
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
      setValue(INSURANCE__PLAN_CLAIM_TYPE, componentsData || []);
    }
  }, [insurancePlanDetail[INSURANCE__PLAN_CLAIM_TYPE]]);

  useEffect(() => {
    if (insurancePlanDetail[DEPARTMENT]) {
      const matchingItems = departmentData.filter((obj: any) =>
        insurancePlanDetail[DEPARTMENT]?.some(
          (item: any) => item?.department_name === obj?.name
        )
      );
      let componentsData: any[] = [];
      componentsData =
        matchingItems.length > 0
          ? matchingItems?.map((item: any) => {
              return { label: item?.name, value: item?._id };
            })
          : [];
      setValue(DEPARTMENT, componentsData || []);
    }
  }, [insurancePlanDetail[DEPARTMENT]]);

  useEffect(() => {
    if (insurancePlanDetail[CO_PAY] === true) {
      setValue(CO_PAY, 'Yes');
      setCopay('Yes');
      setIsCopay({ value: 'Yes', label: 'Yes' });
    } else if (insurancePlanDetail[CO_PAY] === false) {
      setValue(CO_PAY, 'No');
      setCopay('No');
      setIsCopay({ value: 'No', label: 'No' });
    } else return;
  }, [insurancePlanDetail]);

  const formData = watch();

  useEffect(() => {
    setValue(SERVICES, popData?.services);
  }, [popData?.services]);

  const filteredData = headerData?.filter((item: any) =>
    departmentId?.includes(item.department_id)
  );

  // useEffect(() => {
  //   if (palnDepartmentList?.length > 0) {
  //     setCopay('No');
  //     setValue(CO_PAY, 'No');
  //     setIsCopay({ value: 'No', label: 'No' });
  //   }
  // }, [palnDepartmentList?.length]);

  useEffect(() => {
    if (formData[CO_PAY] === 'No') {
      setValue(CO_PAY_VALUE, '');
    }
  }, [formData[CO_PAY]]);

  useEffect(() => {
    if (insurancePlanDetail[PLAN_ATTACHMENT]?.length > 0) {
      let data = insurancePlanDetail[PLAN_ATTACHMENT]?.map((item: any) => {
        return { name: item?.name, data_uri: item?.data_uri, id: item?._id };
      });
      setValue(PLAN_ATTACHMENT, data);
    }
  }, [insurancePlanDetail[PLAN_ATTACHMENT]]);

  useEffect(() => {
    if (insurancePlanDetail[CLAIM_FORM]) {
      setClaimAttachment({
        name: insurancePlanDetail?.claim_form?.name,
        data_uri: insurancePlanDetail?.claim_form?.data_uri,
      });
    }
  }, [insurancePlanDetail[CLAIM_FORM]]);

  let matchingItems = palnDepartmentList.filter((obj: any) =>
    serviceName?.some(
      (item: any) => item?.department_name === obj?.department_name
    )
  );

  const onSubmit = async (data: IAddInsurancePlanCompanyForm, e: any) => {
    if (palnDepartmentList?.length === 0) {
      let toastData = {
        message: 'Please select atleast one department',
        type: failure,
      };
      dispatch(setMessage(toastData));
    } else if (serviceName?.length === 0) {
      let toastData = {
        message: 'Please select atleast one service',
        type: failure,
      };
      dispatch(setMessage(toastData));
    } else {
      data.departments = matchingItems?.map((item: any) => {
        return {
          department_name: item?.department_name,
          discount: item?.discount,
          coPay: item?.coPay,
          department_id: item?.department_id,
        };
      });
      data.services = serviceName;
      if (copay === 'Yes') {
        data.Co_Pay = true;
      } else {
        data.Co_Pay = false;
      }
      data.insurance_company_id = branchId?.value;
      let payloadData = {
        ...data,
        [CLAIM_FORM]: claimAttachment?.name?.length > 0 ? claimAttachment : {},
        [INSURANCE__PLAN_CLAIM_TYPE]: formData[INSURANCE__PLAN_CLAIM_TYPE]?.map(
          (item: any) => item?.value
        ),
        [INSURANCE_PLAN_REIMBURSEMENT_TYPE]: formData[
          INSURANCE_PLAN_REIMBURSEMENT_TYPE
        ]?.map((item: any) => item?.value),
      };

      if (insurancePlanDetail?._id === undefined) {
        dispatch(addInsuarncePlan(requestGenerator(payloadData))).then((e) => {
          if (e?.type === 'insurance/addInsurancePlan/fulfilled') {
            // setTimeout(() => {
            setModelOpenClose(false);
            // }, 2000);
            let reqData = {
              plan_name: '',
              company_id: data?.insurance_company_id,
              company_name: '',
              marketplace_id: '',
              marketplace_name: '',
              page: 1,
              pageSize: 10,
            };
            dispatch(getAllInsuarncePlan(requestGenerator(reqData)));
            dispatch(clearDepartmentServiceData());
          }
        });
      } else {
        dispatch(
          updateInsurancePlan(
            requestGenerator({
              plan_id: insurancePlanDetail?._id,
              data: payloadData,
            })
          )
        ).then((e) => {
          if (e?.type === 'insurance/updateInsurancePlan/fulfilled') {
            // setTimeout(() => {
            setModelOpenClose(false);
            // }, 2000);
            let reqData = {
              plan_name: '',
              company_id: data?.insurance_company_id,
              company_name: '',
              marketplace_id: '',
              marketplace_name: '',
              page: 1,
              pageSize: 10,
            };
            dispatch(getAllInsuarncePlan(requestGenerator(reqData)));
            dispatch(
              allInsuarncePlan(requestGenerator({ ...reqData, company_id: '' }))
            );
            dispatch(clearDepartmentServiceData());
          }
        });
      }
    }
  };

  const validateCoPayValue = (value: any) => {
    if (copay === 'Yes' && !value) {
      return 'Co-Pay value is required';
    } else if (copay === 'Yes' && value < 0) {
      return 'Enter only positive value';
    }
    return undefined;
  };

  const validateService = (value: any) => {
    if (filteredData?.length === 0 && value?.length === 0) {
      return 'Please select services';
    }
    return undefined;
  };

  const validateDiscountValue = (value: any) => {
    if (value < 0) {
      return 'Enter only positive value';
    }
    return undefined;
  };

  let selectedPlan = insuranceCompanyData?.data?.map((item: any) => {
    if (item._id == branchId?.value) {
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

  const handleKeyDown = (e: any) => {
    if (e.target.value.length >= 2 && e.key !== 'Backspace') {
      e.preventDefault();
    }
  };

  const handleDelete = (item: any) => {
    let data = {
      plan_id: insurancePlanDetail?._id,
      image_id: item?.id,
    };
    if (insurancePlanDetail && insurancePlanDetail.hasOwnProperty('_id')) {
      dispatch(deleteInsurancePlanAttachment(requestGenerator(data)));
    }
  };

  return (
    <>
      {/* {isLoading && <Loader />} */}
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
            {insurancePlanDetail?._id === undefined ? 'Add' : 'Edit'} Insurance
            Plan
          </p>
          <Divider customClass={styles.dividerStyle} />
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.labelField}>
              <label className={styles.labelText}>
                Insurance Company<span className="asterick">*</span>
              </label>
              <div className={styles.fieldErrorContainer}>
                <Select
                  className={styles.select}
                  placeholder="Insurance Company"
                  closeMenuOnSelect={true}
                  isSearchable={true}
                  {...register(INSURANCE_PLAN_COMPANY)}
                  value={branchId}
                  maxMenuHeight={200}
                  isDisabled={true}
                />
                {errors[INSURANCE_PLAN_COMPANY] && (
                  <p className="errorText">
                    {errors[INSURANCE_PLAN_COMPANY].message as any}
                  </p>
                )}
              </div>
            </div>
            <div className={styles.labelField}>
              <label className={styles.labelText}>
                Insurance Plan <span className="asterick">*</span>
              </label>
              <div className={styles.fieldErrorContainer}>
                <input
                  type="text"
                  className={styles.inputField}
                  placeholder="Enter Insurance Plan"
                  {...register(
                    INSURANCE_PLAN,
                    addInsurancePlanValidators[INSURANCE_PLAN]
                  )}
                  onChange={(e) => trimValue(e)}
                />
                {errors[INSURANCE_PLAN] && (
                  <p className="errorText">{errors[INSURANCE_PLAN].message}</p>
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
                  options={selectedPlanClaimType?.map((item: any) => ({
                    label: item?.value,
                    value: item?.value,
                  }))}
                  {...register(
                    INSURANCE__PLAN_CLAIM_TYPE,
                    addInsurancePlanValidators[INSURANCE__PLAN_CLAIM_TYPE]
                  )}
                  value={watch(INSURANCE__PLAN_CLAIM_TYPE) || []}
                  onChange={(e) => {
                    setValue(
                      INSURANCE__PLAN_CLAIM_TYPE,
                      e.map((item: any) => {
                        return item;
                      })
                    );
                    trigger(INSURANCE__PLAN_CLAIM_TYPE);
                  }}
                  maxMenuHeight={200}
                />
                {errors[INSURANCE__PLAN_CLAIM_TYPE] && (
                  <p className="errorText">
                    {errors[INSURANCE__PLAN_CLAIM_TYPE].message as any}
                  </p>
                )}
              </div>
            </div>
            {/* <div className={styles.labelField}>
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
                  options={selectedPlanReimbursementType?.map((item: any) => ({
                    label: item?.value,
                    value: item?.value,
                  }))}
                  {...register(
                    INSURANCE_PLAN_REIMBURSEMENT_TYPE,
                    addInsurancePlanValidators[
                      INSURANCE_PLAN_REIMBURSEMENT_TYPE
                    ]
                  )}
                  value={watch(INSURANCE_PLAN_REIMBURSEMENT_TYPE) || []}
                  onChange={(e) => {
                    setValue(
                      INSURANCE_PLAN_REIMBURSEMENT_TYPE,
                      e.map((item: any) => {
                        return item;
                      })
                    );
                    trigger(INSURANCE_PLAN_REIMBURSEMENT_TYPE);
                  }}
                  // onChange={(selectedOptions: any) => {
                  //   const selectedValues = selectedOptions.map(
                  //     (option: any) => option.value
                  //   );
                  //   setValue(INSURANCE_PLAN_REIMBURSEMENT_TYPE, selectedValues);
                  //   trigger(INSURANCE_PLAN_REIMBURSEMENT_TYPE);
                  // }}
                  maxMenuHeight={200}
                />
                {errors[INSURANCE_PLAN_REIMBURSEMENT_TYPE] && (
                  <p className="errorText">
                    {errors[INSURANCE_PLAN_REIMBURSEMENT_TYPE].message as any}
                  </p>
                )}
              </div>
            </div> */}
            <div className={styles.labelField}>
              <label className={styles.labelText}>
                Co-Pay<span className="asterick">*</span>
              </label>
              <div className={styles.fieldErrorContainer}>
                <Select
                  className={styles.select}
                  placeholder="Co-pay"
                  closeMenuOnSelect={true}
                  isSearchable={true}
                  options={coPayDropdown?.map((item: any) => ({
                    label: item?.value,
                    value: item?.value,
                  }))}
                  {...register(CO_PAY, addInsurancePlanValidators[CO_PAY])}
                  value={isCopay}
                  onChange={(e: any) => {
                    setValue(CO_PAY, e.label);
                    trigger(CO_PAY);
                    setCopay(e.label);
                    setIsCopay(e);
                  }}
                  maxMenuHeight={200}
                  // isDisabled={palnDepartmentList?.length > 0 ? true : false}
                />
                {errors[CO_PAY] && (
                  <p className="errorText">{errors[CO_PAY].message as any}</p>
                )}
              </div>
            </div>

            <div className={styles.labelField}>
              <label className={styles.labelText}>
                Co-Pay %{' '}
                {copay === 'Yes' && <span className="asterick">*</span>}
              </label>
              <div className={styles.fieldErrorContainer}>
                <input
                  type="number"
                  className={
                    copay === 'No' ? styles.disableField : styles.inputField
                  }
                  placeholder="Enter Co-Pay %"
                  {...register(CO_PAY_VALUE, {
                    validate: validateCoPayValue,
                  })}
                  // value={copay === 'No' ? '' : copayValue}
                  onChange={(e) => {
                    trimValue(e);
                    setCopayValue(e.target.value);
                  }}
                  onKeyDown={(e: any) => {
                    handleKeyDown(e);
                    disableArrowKey(e);
                  }}
                  onWheel={(e: any) => {
                    e.target.blur();
                  }}
                  disabled={copay === 'No' ? true : false}
                />
                {copay === 'Yes' && errors[CO_PAY_VALUE] && (
                  <p className="errorText">{errors[CO_PAY_VALUE].message}</p>
                )}
              </div>
            </div>

            <div className={styles.labelField}>
              <label className={styles.labelText}>Discount %</label>
              <div className={styles.fieldErrorContainer}>
                <input
                  type="number"
                  className={styles.inputField}
                  placeholder="Enter Discount %"
                  {...register(DISCOUNT, {
                    validate: validateDiscountValue,
                  } as any)}
                  onChange={(e) => trimValue(e)}
                  onKeyDown={(e: any) => {
                    handleKeyDown(e);
                    disableArrowKey(e);
                  }}
                  onWheel={(e: any) => {
                    e.target.blur();
                  }}
                />
                {errors[DISCOUNT] && (
                  <p className="errorText">{errors[DISCOUNT].message as any}</p>
                )}
              </div>
            </div>
            <div className={styles.labelField}>
              <label className={styles.labelText}>Commission %</label>
              <div className={styles.fieldErrorContainer}>
                <input
                  type="number"
                  className={styles.inputField}
                  placeholder="Enter Commission %"
                  {...register(COMMISSION, {
                    validate: validateDiscountValue,
                  } as any)}
                  onChange={(e) => trimValue(e)}
                  onKeyDown={(e: any) => {
                    handleKeyDown(e);
                    disableArrowKey(e);
                  }}
                  onWheel={(e: any) => {
                    e.target.blur();
                  }}
                />
                {errors[COMMISSION] && (
                  <p className="errorText">
                    {errors[COMMISSION].message as any}
                  </p>
                )}
              </div>
            </div>

            <div className={styles.labelField}>
              <label className={styles.labelText}>Claim Form</label>
              <div className={styles.fieldErrorContainer}>
                <div className={styles.attachmnentField}>
                  {/* <AttachFiles
                    isMultiSelect={true}
                    fileKey={CLAIM_FORM}
                    setValue={setValue}
                    {...register(CLAIM_FORM)}
                    customClassFileName={styles.fileNameStyle}
                    // attachmentData={insurancePlanDetail[CLAIM_FORM]?.map(
                    //   (item: any) => {
                    //     return { name: item?.name, data_uri: item?.data_uri };
                    //   }
                    // )}
                  /> */}
                  <AttachFilesN
                    register={register}
                    fileKey={CLAIM_FORM}
                    id={CLAIM_FORM}
                    fileList={claimAttachment}
                    isName={true}
                    isDocument={true}
                  />
                </div>
              </div>
            </div>
            <div className={styles.labelField}>
              <label className={styles.labelText}>Attachments</label>
              <div className={styles.fieldErrorContainer}>
                <div className={styles.attachmnentField}>
                  <AttachFiles
                    isMultiSelect={true}
                    fileKey={PLAN_ATTACHMENT}
                    setValue={setValue}
                    {...register(PLAN_ATTACHMENT)}
                    customClassFileName={styles.fileNameStyle}
                    attachmentData={insurancePlanDetail[PLAN_ATTACHMENT]?.map(
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
            </div>
            <div className={styles.labelField} style={{ alignItems: 'center' }}>
              <label className={styles.labelText}>Dept</label>

              <AddButtonIcon
                fillColor={colors.green1}
                handleClick={handleDepartmentServiceConfig}
                customClass={styles.iconStyle}
              />
              {/* <div className={styles.fieldErrorContainer}>
                <Select
                  className={styles.select}
                  placeholder="Select Dept."
                  closeMenuOnSelect={true}
                  isSearchable={true}
                  value={watch(DEPARTMENT) || []}
                  {...register(DEPARTMENT)}
                  isMulti
                  onChange={(selectedOptions, context) => {
                    const selectedValues = selectedOptions.map(
                      (option: any) => option.value
                    );
                    // setValue(DEPARTMENT, selectedValues);
                    handleDepartmentServiceConfig(context);
                    setDepartmentId(selectedValues);
                    setValue(
                      DEPARTMENT,
                      selectedOptions.map((item: any) => {
                        return item;
                      })
                    );
                    trigger(DEPARTMENT);
                  }}
                  maxMenuHeight={200}
                  options={departmentData?.map((item: any) => ({
                    label: item.name,
                    value: item._id,
                  }))}
                />
              </div> */}
            </div>

            <div className={styles.labelField}>
              <label className={styles.labelText}>
                Services
                {/* {(filteredData?.length === 0 ||
                  insurancePlanDetail?.departments?.length === 0) && (
                  <span className="asterick">*</span>
                )} */}
              </label>
              <AddButtonIcon
                fillColor={colors.green1}
                handleClick={handleDepartment}
                customClass={styles.iconStyle}
              />
              {/* <div className={styles.fieldErrorContainer}>
                <div className={styles.filedIconContainer}>
                  <input
                    type="text"
                    className={styles.inputField}
                    placeholder="Enter Services"
                    value={
                      insurancePlanDetail?.services &&
                      popData?.services?.length === 0
                        ? insurancePlanDetail?.services?.map(
                            (item: any) => item?.service_name
                          )
                        : serviceName?.map((item: any) => item)
                    }
                    {...register(
                      SERVICES,
                      {
                        validate: validateService,
                      }
                      // addInsurancePlanValidators[SERVICES]
                    )}
                    onChange={(e) => trimValue(e)}
                  />
                  <SearchIcon
                    customClass={styles.iconStyle}
                    fillColor={colors.grey1}
                    handleClick={() => handleDepartment(departmentId)}
                  />
                </div>
                {filteredData?.length === 0 && errors[SERVICES] && (
                  <p className="errorText">{errors[SERVICES].message as any}</p>
                )}
              </div> */}
            </div>

            <div className={styles.labelField}>
              <label className={styles.labelText}>Remarks</label>
              <div className={styles.fieldErrorContainer}>
                <textarea
                  className={styles.remarksField}
                  placeholder="Enter Remarks"
                  {...register(PLAN_REMARKS)}
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

export default AddInsurancePlan;

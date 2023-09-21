import { FC, useEffect, useState } from 'react';
import { CloseIcon } from '../../svg-components';
import { colors } from '../../../../constants/color';
import Divider from '../../divider/Divider';
import styles from './insurancePlanPopup.module.scss';
import Button from '../../button/Button';
import TableV2 from '../../table/tableV2/TableV2';
import { insurancePlanPopupData } from '../../../../constants/table-data/insurancePlanPopupData';
import Select from 'react-select';
import { trimValue } from '../../../../utils/utils';
import AttachFiles from '../../attach-files/Attachfiles';
import { useForm } from 'react-hook-form';
import {
  EMR_ATTACHMENTS,
  EMR_CLAIM_TYPE,
  EMR_EXPIRY_DATE,
  EMR_INSURANCE_COMPANY,
  EMR_INSURANCE_PLAN,
  EMR_POLICY_NO,
  EMR_REIMBURSEMENT_TYPE,
} from '../../../../constants/constant';
import { insurancePlanValidators } from '../../../../form-validators/insurancePlanValidators';
import {
  IEMRInsurancePlanForm,
  fileType,
} from '../../../../interfaces/interfaces';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { requestGenerator } from '../../../../utils/payloadGenerator';
import {
  createInsurancePlan,
  getAllInsurancePlan,
} from '../../../../redux/features/patient-emr/patient/patientAsyncAction';
import {
  getAllInsuarnceCompany,
  getAllInsuarncePlan,
} from '../../../../redux/features/insurance/insuranceAsyncActions';
import Popup from '../../popup/Popup';
import ViewDocumentPopup from '../view-document-popup/ViewDocumentPopup';
import Pagination from '../../pagination/Pagination';
import DepartmentListPopup from '../department-list-popup/DepartmentListPopup';
import AttachfilesV2 from '../../attach-files/AttachfilesV2';
import InsurancePlanViewDocumentPopup from '../insurance-plan-view-document-popup/InsurancePlanViewDocumentPopup';

interface IInsurancePlan {
  handleClose?: any;
}

const InsurancePlanPopup: FC<IInsurancePlan> = ({ handleClose }) => {
  const [insuranceCompanyId, setInsuranceCompanyId] = useState('');
  const [insurancePlan, setInsurancePlan] = useState();
  const [selectCompany, setSelectCompany] = useState(null);
  const [selectPlan, setSelectPlan] = useState(null);
  const [reimbursementType, setReimbursementType] = useState(null);
  const [claimType, setClaimType] = useState(null);
  const [showDocument, setShowDocument] = useState(false);
  const [documentData, setDocumentData] = useState();
  const [dataPerPage, setDataPerPage] = useState<number>(10);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [department, setDepartment] = useState(false);
  const [departmentData, setDepartmentData] = useState();
  const [attachments, setAttachments] = useState<fileType[]>([]);

  const pageIndexArray = () => {
    let pageIndexOptions = [];
    for (let i = 1; i <= totalPage; i++) {
      pageIndexOptions.push(i);
    }
    return pageIndexOptions;
  };

  const pageIndexOptions = pageIndexArray();

  const dispatch = useAppDispatch();
  const { insuranceCompanyData, insurancePlanData } = useAppSelector(
    (state) => state.insurance
  );
  const { patientDataObjectById, patientInsurancePlan } = useAppSelector(
    (state) => state.patient
  );

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    reset,
    formState: { errors },
  } = useForm<IEMRInsurancePlanForm>();

  useEffect(() => {
    let reqData = {
      patient_id: patientDataObjectById?._id,
      page: pageIndex,
      pageSize: dataPerPage,
    };
    dispatch(getAllInsurancePlan(requestGenerator(reqData))).then((result) => {
      setTotalPage(result.payload.lastPage);
    });
  }, [dispatch, pageIndex, dataPerPage]);

  useEffect(() => {
    dispatch(getAllInsuarnceCompany(requestGenerator({})));
  }, [dispatch]);

  useEffect(() => {
    if (insuranceCompanyId !== '') {
      let payloadData = {
        company_id: insuranceCompanyId,
      };
      dispatch(getAllInsuarncePlan(requestGenerator(payloadData)));
    }
  }, [insuranceCompanyId]);

  const onSubmit = async (data: IEMRInsurancePlanForm) => {
    data.patient_id = patientDataObjectById?._id;
    console.log('first', data);
    dispatch(createInsurancePlan(requestGenerator(data))).then((e) => {
      console.log('e', e);
      if (e.type === 'patient/createInsurancePlan/fulfilled') {
        let reqData = {
          patient_id: patientDataObjectById?._id,
          page: pageIndex,
          pageSize: dataPerPage,
        };
        dispatch(getAllInsurancePlan(requestGenerator(reqData)));
        setSelectCompany(null);
        setSelectPlan(null);
        setReimbursementType(null);
        setClaimType(null);
        reset();
        setAttachments([]);
      }
    });
  };

  let selectedPlan = insurancePlanData?.map((item: any) => {
    if (item._id == insurancePlan) {
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

  const handleDocument = (data: any) => {
    setShowDocument(!showDocument);
    setDocumentData(data);
  };
  const handleDepartment = (data: any) => {
    setDepartment(!department);
    setDepartmentData(data);
  };

  return (
    <>
      <div
        className={styles.popupContainer}
        onClick={(e) => e.stopPropagation()}
      >
        {showDocument && (
          <Popup
            Children={InsurancePlanViewDocumentPopup}
            handleClose={() => setShowDocument(false)}
            popData={documentData}
          />
        )}
        {department && (
          <Popup
            Children={DepartmentListPopup}
            handleClose={() => setDepartment(false)}
            popData={departmentData}
          />
        )}
        <CloseIcon
          customClass={styles.closeIconStyle}
          fillColor={colors.green1}
          handleClick={handleClose}
        />
        <div className={styles.notesContainer}>
          <p className={styles.title}>Insurance Plans</p>
          <Divider customClass={styles.dividerStyle} />
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.formContainer}>
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
                    {...register(
                      EMR_INSURANCE_COMPANY,
                      insurancePlanValidators[EMR_INSURANCE_COMPANY]
                    )}
                    onChange={(e: any) => {
                      setValue(EMR_INSURANCE_COMPANY, e.value);
                      trigger(EMR_INSURANCE_COMPANY);
                      setInsuranceCompanyId(e?.value);
                      setSelectCompany(e);
                      setSelectPlan(null);
                      setReimbursementType(null);
                      setClaimType(null);
                    }}
                    options={insuranceCompanyData?.data?.map((item: any) => ({
                      label: item?.insurance_company_name,
                      value: item?._id,
                    }))}
                    value={selectCompany}
                    maxMenuHeight={200}
                  />
                  {errors[EMR_INSURANCE_COMPANY] && (
                    <p className="errorText">
                      {errors[EMR_INSURANCE_COMPANY].message as any}
                    </p>
                  )}
                </div>
              </div>
              <div className={styles.labelField}>
                <label className={styles.labelText}>
                  Insurance Plan<span className="asterick">*</span>
                </label>
                <div className={styles.fieldErrorContainer}>
                  <Select
                    className={styles.select}
                    placeholder="Insurance Plan"
                    closeMenuOnSelect={true}
                    isSearchable={true}
                    {...register(
                      EMR_INSURANCE_PLAN,
                      insurancePlanValidators[EMR_INSURANCE_PLAN]
                    )}
                    onChange={(e: any) => {
                      setValue(EMR_INSURANCE_PLAN, e.value);
                      trigger(EMR_INSURANCE_PLAN);
                      setInsurancePlan(e.value);
                      setSelectPlan(e);
                      setReimbursementType(null);
                      setClaimType(null);
                    }}
                    options={insurancePlanData?.map((item: any) => ({
                      label: item?.insurance_plan,
                      value: item?._id,
                    }))}
                    value={selectPlan}
                    maxMenuHeight={200}
                  />
                  {errors[EMR_INSURANCE_PLAN] && (
                    <p className="errorText">
                      {errors[EMR_INSURANCE_PLAN].message as any}
                    </p>
                  )}
                </div>
              </div>
              <div className={styles.labelField}>
                <label className={styles.labelText}>
                  Policy No.<span className="asterick">*</span>
                </label>
                <div className={styles.fieldErrorContainer}>
                  <input
                    type="text"
                    className={styles.inputField}
                    placeholder="Enter Policy No."
                    {...register(
                      EMR_POLICY_NO,
                      insurancePlanValidators[EMR_POLICY_NO]
                    )}
                    onChange={(e) => trimValue(e)}
                  />
                  {errors[EMR_POLICY_NO] && (
                    <p className="errorText">{errors[EMR_POLICY_NO].message}</p>
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
                    {...register(
                      EMR_REIMBURSEMENT_TYPE,
                      insurancePlanValidators[EMR_REIMBURSEMENT_TYPE]
                    )}
                    options={selectedPlanReimbursementType?.map(
                      (item: any) => ({
                        label: item?.value,
                        value: item?.label,
                      })
                    )}
                    onChange={(e: any) => {
                      setValue(EMR_REIMBURSEMENT_TYPE, e.value);
                      trigger(EMR_REIMBURSEMENT_TYPE);
                      setReimbursementType(e);
                    }}
                    value={reimbursementType}
                    maxMenuHeight={200}
                  />

                  {errors[EMR_REIMBURSEMENT_TYPE] && (
                    <p className="errorText">
                      {errors[EMR_REIMBURSEMENT_TYPE].message as any}
                    </p>
                  )}
                </div>
              </div> */}
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
                    {...register(
                      EMR_CLAIM_TYPE,
                      insurancePlanValidators[EMR_CLAIM_TYPE]
                    )}
                    options={selectedPlanClaimType?.map((item: any) => ({
                      label: item?.label,
                      value: item?.value,
                    }))}
                    onChange={(e: any) => {
                      setValue(EMR_CLAIM_TYPE, e.value);
                      trigger(EMR_CLAIM_TYPE);
                      setClaimType(e);
                    }}
                    value={claimType}
                    maxMenuHeight={200}
                  />
                  {errors[EMR_CLAIM_TYPE] && (
                    <p className="errorText">
                      {errors[EMR_CLAIM_TYPE].message as any}
                    </p>
                  )}
                </div>
              </div>

              <div className={styles.labelField}>
                <label className={styles.labelText}>
                  Expiry Date<span className="asterick">*</span>
                </label>
                <div className={styles.fieldErrorContainer}>
                  <input
                    type="date"
                    className={styles.inputField}
                    {...register(
                      EMR_EXPIRY_DATE,
                      insurancePlanValidators[EMR_EXPIRY_DATE]
                    )}
                    max="9999-12-31"
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => trimValue(e)}
                  />
                  {errors[EMR_EXPIRY_DATE] && (
                    <p className="errorText">
                      {errors[EMR_EXPIRY_DATE].message as any}
                    </p>
                  )}
                </div>
              </div>
              <div className={styles.labelField}>
                <label className={styles.labelText}>Attachments</label>
                <div className={styles.fieldErrorContainer}>
                  <AttachfilesV2
                    fileKey={EMR_ATTACHMENTS}
                    isMultiSelect={true}
                    {...register(EMR_ATTACHMENTS)}
                    setValue={setValue}
                    attachments={attachments}
                    setAttachments={setAttachments}
                    customClassFileName={styles.fileNameStyle}
                  />
                </div>
              </div>
            </div>
            <div className={styles.btnContainer}>
              <Button title="Add Plan" />
            </div>

            <div className={styles.table}>
              <TableV2
                tableHeaderData={insurancePlanPopupData}
                tableRowData={patientInsurancePlan}
                active={false}
                handleClick={handleDocument}
                setModelOpenClose={handleDepartment}
              />
            </div>
            <Pagination
              setDataPerPage={setDataPerPage}
              pageIndexOptions={pageIndexOptions}
              pageIndex={pageIndex}
              setPageIndex={setPageIndex}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default InsurancePlanPopup;

import { AnyAction } from 'redux';
import {
  BRANCH,
  CONFIRM_NEW_PASSWORD,
  CREATE_PRIMARY_NOTES,
  DEPARTMENT,
  DESIGNATION,
  EMAIL,
  EMAIL_ID,
  EXPIRY_DATE,
  FORGOT_PASSWORD_EMAIL,
  MASTER_TABLE_CATEGORY_NAME,
  MASTER_TABLE_CATEGORY_VALUE,
  MASTER_TABLE_CATEGORY_VALUE_NAME,
  MASTER_TABLE_VALUE,
  NEW_PASSWORD,
  OTP,
  PASSWORD,
  PATIENT_ADDRESS,
  PATIENT_ADDRESS_PINCODE,
  PATIENT_AGE,
  PATIENT_ALLERGIES,
  PATIENT_AREA,
  PATIENT_BLOODGROUP,
  PATIENT_BRANCH_NAME,
  PATIENT_DOB,
  PATIENT_EMAIL,
  PATIENT_FILE_NO,
  PATIENT_FINANCIAL_REMARK,
  PATIENT_GENDER,
  PATIENT_MARITAL_STATUS,
  PATIENT_MEDICAL_REMARK,
  PATIENT_MOBILE_NO,
  PATIENT_MOBILE_NO_1,
  PATIENT_MOBILE_NO_2,
  PATIENT_NAME,
  PATIENT_NATIONALITY,
  PATIENT_NATIONAL_ID,
  PATIENT_NATIONAL_ID_TYPE,
  PATIENT_OPENED_BY,
  PATIENT_OPENED_ON,
  PATIENT_PROFILE_PIC,
  PATIENT_RELATIVE_MOBILE,
  PATIENT_RELATIVE_NAME,
  PATIENT_RELATIVE_RELATION,
  PATIENT_SOURCE,
  PHONE_NO,
  PRIMARY_BRANCH,
  PRIMARY_DEPARTMENT,
  PRIMARY_DESIGNATION,
  PRIMARY_EMAIL_ID,
  PRIMARY_EXPIRY_DATE,
  PRIMARY_FIRST_NAME,
  PRIMARY_LAST_NAME,
  PRIMARY_NOTES,
  PRIMARY_PHONE_NUMBER,
  PRIMARY_ROLE,
  PRIMARY_SPECIALITY,
  PRIMARY_SYSTEM_USER,
  PRIMARY_USER_GROUPS,
  PRIMARY_USER_PHOTO_ATTACHMENT,
  SHIFT1_END_TIME,
  SHIFT1_START_TIME,
  SHIFT2_END_TIME,
  SHIFT2_START_TIME,
  SPECIALITY,
  TODO_TASK_DESCRIPTION,
  TODO_TASK_NAME,
  TODO_TASK_PRIORITY,
  TODO_TASK_STATUS,
  USERGROUP_NAME,
  USERGROUP_NOTES,
  REASON_TEXT,
  IMAGE_CATEGORY,
  IMAGE_NAME,
  UPLOAD_IMAGE,
  DOCUMENT_CATEGORY,
  DOCUMENT_NAME,
  UPLOAD_DOCUMENT,
  TODO_REMINDER,
  DOCTOR,
  REFER_TO_DOCTOR,
  APPOINTMENT_TAGS,
  REMARKS,
  PAYMENT_REMARKS,
  REFFERAL_START_DATE,
  REFER_TO_RECEPTIONIST,
  COMPANY_NAME,
  REIMBURSEMENT_TYPE,
  CLAIM_TYPE,
  MARKETPLACE,
  INSURANCE_COMPANY,
  INSURANCE_CLAIM_TYPE,
  INSURANCE_REIMBURSEMENT_TYPE,
  INSURANCE_PLAN_COMPANY,
  INSURANCE_PLAN,
  INSURANCE__PLAN_CLAIM_TYPE,
  INSURANCE_PLAN_REIMBURSEMENT_TYPE,
  CO_PAY,
  CO_PAY_VALUE,
  SERVICES,
  ADDRESS,
  PHONE,
  MARKETPLACE_STATE,
  PIN_CODE,
  MARKETPLACE_CITY,
  ATTACHMENTS,
  MARKETPLACE_REMARKS,
  INSURANCE_ADDRESS,
  INSURANCE_PHONE,
  INSURANCE_STATE,
  INSURANCE_CITY,
  INSURANCE_PIN_CODE,
  INSURANCE_ATTACHMENTS,
  INSURANCE_REMARKS,
  CLAIM_FORM,
  DISCOUNT,
  COMMISSION,
  PLAN_REMARKS,
  PLAN_ATTACHMENT,
  INVOICE_PATIENT_BRANCH_NAME,
  INVOICE_PATIENT_PROFILE_PIC,
  INVOICE_PATIENT_TYPE,
  INVOICE_PATIENT_FILE_NO,
  INVOICE_PATIENT_NAME,
  INVOICE_PATIENT_PRIMARY_DOCTOR,
  INVOICE_PATIENT_MOBILE_NO,
  INVOICE_PATIENT_NATIONAL_ID,
  APPROVAL_NUM,
  INSURANCE_DEPARTMENT,
  INSURANCE_DISCOUNT,
  INSURANCE_COPAY,
  INSURANCE_DEPARTMENT_NAME,
  INVOICE_DOCTOR_NAME,
  INVOICE_REFER_BY,
  INVOICE_REFERRAL_TYPE,
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
  PHARMACY_DISCOUNT,
  PHARMACY_QTY,
  PHARMACY_SUB_QTY,
  PHARMACY_EXPIRY_DATE,
  PHARMACY_OUTSTANDING_AMOUNT,
  PHARMACY_TAX_1,
  PHARMACY_TOTAL_DISCOUNT,
  PHARMACY_TAX_2,
  PHARMACY_CO_PAY,
  PHARMACY_TOTAL_TAX,
  PHARMACY_CO_PAY_AMOUNT,
  EMR_INSURANCE_PLAN,
  EMR_INSURANCE_COMPANY,
  EMR_POLICY_NO,
  EMR_CLAIM_TYPE,
  EMR_REIMBURSEMENT_TYPE,
  EMR_EXPIRY_DATE,
  EMR_ATTACHMENTS,
  EMR_PATIENT_ID,
  TOTAL_AMOUNT,
  PACKAGE_AMOUNT,
  TEST_PROFILE_NAME,
  TEST_IDS,
  TETS_ID,
  TETS_NAME,
  TETS_CATEGORY,
  TETS_TAT,
  SAMPLE_TYPE,
  SOURCE,
  UNIT,
  RANGE,
  COMPONENT,
  COST_PRICE,
  SELL_PRICE,
  AGE_FROM,
  GENDER_RANGE,
  AGE_TO,
  RANGE_FROM,
  RANGE_TO,
  TEST_ID,
  TEST_NAME,
  TEST_CATEGORY,
  TEST_TAT,
  PROFILE_ID,
  INVOICE_INSURANCE_APPROVAL_NO,
  APPOINTMENT_STATUS,
  APPOINTMENT_COLOR,
  ASSIGN_TAG,
  ASSIGN_TAG_NAME,
  RADIOLOGY_TEST_NAME,
  RADIOLOGY_TEST_CATEGORY,
  RADIOLOGY_TEST_TAT,
  RADIOLOGY_COST_PRICE,
  RADIOLOGY_SELL_PRICE,
  RADIOLOGY_SOURCE,
  RADIOLOGY_TOTAL_AMOUNT,
  RADIOLOGY_PACKAGE_AMOUNT,
  RADIOLOGY_TEST_PROFILE_NAME,
  RADIOLOGY_TEST_IDS,
  RADIOLOGY_PROFILE_ID,
  RADIOLOGY_INVOICE_PATIENT_BRANCH_NAME,
  RADIOLOGY_INVOICE_PATIENT_PROFILE_PIC,
  RADIOLOGY_INVOICE_PATIENT_TYPE,
  RADIOLOGY_INVOICE_PATIENT_FILE_NO,
  RADIOLOGY_INVOICE_PATIENT_NAME,
  RADIOLOGY_INVOICE_PATIENT_PRIMARY_DOCTOR,
  RADIOLOGY_INVOICE_PATIENT_MOBILE_NO,
  RADIOLOGY_INVOICE_PATIENT_NATIONAL_ID,
  RADIOLOGY_INVOICE_DOCTOR_NAME,
  RADIOLOGY_INVOICE_REFER_BY,
  RADIOLOGY_INVOICE_REFERRAL_TYPE,
  INVOICE_PAYMENT_AMOUNT,
  INVOICE_ONLINE_PAYMENT_BRANCH,
  INVOICE_ONLINE_PAYMENT_NAME,
  INVOICE_ONLINE_PAYMENT_MOBILE_NO,
  INVOICE_ONLINE_PAYMENT_REF_NO,
  INVOICE_ONLINE_PAYMENT_AMOUNT,
  INVOICE_ONLINE_PAYMENT_NOTES,
  INVOICE_ONLINE_PAYMENT_URL,
  SHIFT1_DAYS,
  SHIFT2_DAYS,
  LAB_INVOICE_PATIENT_BRANCH_NAME,
  LAB_INVOICE_PATIENT_PROFILE_PIC,
  LAB_INVOICE_PATIENT_TYPE,
  LAB_INVOICE_PATIENT_FILE_NO,
  LAB_INVOICE_PATIENT_NAME,
  LAB_INVOICE_PATIENT_PRIMARY_DOCTOR,
  LAB_INVOICE_PATIENT_MOBILE_NO,
  LAB_INVOICE_PATIENT_NATIONAL_ID,
  LAB_INVOICE_DOCTOR_NAME,
  LAB_INVOICE_REFERRAL_TYPE,
  ITEM_NAME,
  ITEM_QTY,
  ITEM_QTY_TYPE,
  UNIT_TYPE,
  STORE_ID,
  STORE,
  REQUEST_SOURCE,
  _ID,
  QUANTITY,
  AGE_GROUP,
  PROCEDURE,
  SERVICE,
  PROCEDURE_SUBTYPE,
  COMPLAINT,
  NOTE,
  DESCRIPTION,
  DISCOUNT,
  AMOUNT,
  BILLABLE,
  TOOTH_IMAGE,
  SELECTED_TOOTHS,
  MASTER_VALUE,
  MASTER_VALUE_LABEL,
  SOURCE_DEPT,
  SOURCE_ROOM,
  PLAN_TOTAL_AMOUNT,
  PLAN_AMOUNT,
  PLAN_NAME,
  SERVICE_IDS,
  NO_OF_SESSION,
  SERVICE_DEPARTMENT,
  SERVICE_NAME,
  SERVICE_PRICE,
  SERVICE_COST,
  SERVICE_QTY,
  SERVICE_UNIT_TYPE,
  SERVICE_BALANCE,
  SERVICE_SOURCE,
  SERVICE_GROUP,
  SERVICE_LOCATION,
  SERVICE_SESSION,
  SERVICE_STATUS,
  SERVICE_CODE,
  SERVICE_NUMBER_SESSION,
  NEW_COMPONENT,
  PRICE,
  TYPE,
  SECONDARY_ROLE,
  ROLE_TYPE,
  PATIENT_ADDTIONAL_FIELDS,
  PERIOD,
  MASTER_UNIT_TYPE_NAME,
  MASTER_UNIT_TYPE_VALUE,
  MASTER_UNIT_TYPE_QTY,
  INVENTORY_MASTER_NAME,
  INVENTORY_MASTER_CONTACT_PERSON,
  INVENTORY_MASTER_CONTACT_NO,
  INVENTORY_MASTER_CURRENCY,
  INVENTORY_MASTER_ADDRESS_LINE_ONE,
  INVENTORY_MASTER_ADDRESS_LINE_TWO,
  INVENTORY_MASTER_ZIPCODE,
  INVENTORY_MASTER_CITY,
  INVENTORY_MASTER_STATE,
  INVENTORY_MASTER_COUNTRY,
  INVENTORY_MASTER_NOTES,
  INVENTORY_MASTER_ATTACHMENTS,
  UNIT_PRICE,
  SERVICE_PARENT_ID,
  SOURCE_BRANCH,
  INVENTORY_ITEM_NAME,
  INVENTORY_ITEM_CODE,
  INVENTORY_BASE_UNIT_TYPE,
  INVENTORY_GROUP,
  INVENTORY_QUANTITY,
  INVENTORY_CHARGABLE,
  INVENTORY_COST_PRICE,
  INVENTORY_SELL_PRICE,
  INVENTORY_EXPIRY_DAYS
} from '../constants/constant';

import { ReactElement } from 'react';

import {
  FILE_NO,
  NAME,
  FIXED_FILE_NO,
  PATIENT,
  MOBILE_NO,
  AGE,
  GENDER,
  LOCATION_ID,
  RADIOLOGYNAME,
  RADIOLOGYFILE_NO,
  RADILOGYPATIENT,
  RADIOLOGYMOBILE_NO,
  RADIOLOGYAGE,
  RADIOLOGYGENDER,
  RADIOLOGYLOCATION_ID,
} from '../constants/createJobConstants';
import {
  ADD_CLAIM_AMOUNT,
  ADD_CLAIM_DATE,
  ADD_CLAIM_NOTE,
  MARKETPLACE_ADD_CLAIM,
  PENDING_CLAIMS,
} from '../pages/insurance/ongoing-claims/add-claim-popup/addClaimConstants';
import {
  INITIATED_CLAIMS,
  SETTELED_AMOUNT,
  SETTELED_CLAIM_AMOUNT,
  SETTELED_CLAIM_DATE,
  SETTELED_CLAIM_NOTE,
  SETTELED_MARKETPLACE_CLAIM,
} from '../pages/insurance/ongoing-claims/settled-claims-popup/setteledClaimsConstatnts';
import {
  INITIATED_CLAIMS_REJECTED,
  REJECTED_AMOUNT,
  REJECTED_CLAIM_AMOUNT,
  REJECTED_CLAIM_DATE,
  REJECTED_CLAIM_NOTE,
  REJECTED_MARKETPLACE_CLAIM,
} from '../pages/insurance/ongoing-claims/rejected-claims-popup/rejectedClaimsConstants';

export interface ISidebar {
  id: number | string;
  name: string;
  icon: any;
  navigate: string | null;
  activeLocation?: string;
  navigateAfterLogin?: string;
}

export interface IFormActionSidebar {
  id: number;
  name?: string;
  icon?: any;
  handleOnClick?: any;
}
export type passwordType = 'password' | 'text';

export type mobileNumberType = string;

export type fileType = {
  name: string;
  data_uri: any;
};

export interface IToastType {
  id: number;
  title: string;
  crossColor: string;
  icon: ReactElement<any, any>;
}

export interface IForgotPasswordForm {
  [FORGOT_PASSWORD_EMAIL]: string;
}
export interface IVerifyOtpForm {
  [OTP]: string;
}
export interface IRecoveryPasswordInputs {
  [NEW_PASSWORD]: string;
  [CONFIRM_NEW_PASSWORD]: string;
}

export interface ILoginFormInputs {
  [EMAIL]: string;
  [PASSWORD]: string;
}

export interface ITab {
  id: number;
  name: string;
  navigate: string | null;
  activeLocation?: string;
}

export interface IRadiologyTab {
  id: number;
  name: string;
  navigate: string | null;
}

// table interface
export interface Cols {
  readonly mc_id?: string | number;
  mc_name?: string | number;
  poc_email?: string | number;
  expiry_date?: string | number;
  poc_name?: string;
  notes?: string;
  created_users_count?: string | number;
  readonly _id: number;
  name?: string | number;
  initials?: string | number;
  description?: string | number;
  createdAt?: string | number;
  updatedAt?: string | number;
  date?: string | number;
}

export interface IModuleList {
  _id: number;
  module_name: string;
}

export interface MobileConfigCols {
  id?: string | number;
  name?: string | number;
  type?: string | number;
  title?: string | number;
  description?: string | number;
  price_listing?: number;
  icon_img?: string;
  status?: boolean;
  createdAt?: string | number;
  updatedAt?: string | number;
  is_active?: boolean;
}

// manage user-create primary
export interface ICreatePrimaryFormInputs {
  [PRIMARY_FIRST_NAME]: string;
  [PRIMARY_LAST_NAME]: string;
  [PRIMARY_DESIGNATION]: string;
  [PRIMARY_BRANCH]: number | string | MultiValue<unknown>;
  [PRIMARY_SPECIALITY]: number | string | MultiValue<unknown>;
  [PRIMARY_DEPARTMENT]: number | string | MultiValue<unknown>;
  [PRIMARY_PHONE_NUMBER]: string;
  [PRIMARY_EMAIL_ID]: string;
  [PRIMARY_USER_GROUPS]: number | string | MultiValue<unknown>;
  [PRIMARY_ROLE]: any;
  [SECONDARY_ROLE]: any;
  [PRIMARY_EXPIRY_DATE]: string | number | readonly string[] | undefined;
  [PRIMARY_USER_PHOTO_ATTACHMENT]: FileList;
  [PRIMARY_SYSTEM_USER]: boolean;
  [PRIMARY_NOTES]: string;
}

// manage user-create secondary
export interface ICreateSecondaryFormInputs {
  [SHIFT1_START_TIME]: any;
  [SHIFT1_END_TIME]: any;
  [SHIFT2_START_TIME]: any;
  [SHIFT2_END_TIME]: any;
  [SHIFT1_DAYS]: number[];
  [SHIFT2_DAYS]: number[];
}

export interface IRangeData {
  id: number;
  title: string;
  status: boolean;
}

// addcategory modal
export interface IAddCategory {
  [MASTER_TABLE_CATEGORY_NAME]: string;
}

// addcategoryvalue modal
export interface IAddCategoryValue {
  [MASTER_TABLE_CATEGORY_VALUE_NAME]: any | string;
  [MASTER_TABLE_CATEGORY_VALUE]: string;
}

// manage usergroup
export interface IManageUserGroupForm {
  [USERGROUP_NAME]: string;
  [USERGROUP_NOTES]: string;
  [ROLE_TYPE]: any;
}
export interface IAppointmenuHeaderMenu {
  id: number;
  name: string;
  icon: FunctionComponent<ISvgComponent>;
  navigate?: string;
  onPopupOpen?: any;
}

export interface IColorCode {
  title: string;
  label: string;
  colorCode: string;
}
// addtodo modal
export interface IAddTodoList {
  [TODO_TASK_NAME]: string;
  [TODO_TASK_PRIORITY]: string;
  [TODO_TASK_DESCRIPTION]: string;
  [TODO_TASK_STATUS]: string;
}

// addtodo reminder modal
export interface IAddTodoReminder {
  [TODO_REMINDER]: any;
}

// patient emr modal
export interface IPatientEmr {
  data: { name: string; data_uri: string };
  [PATIENT_FILE_NO]: string;
  [PATIENT_PROFILE_PIC]: fileType[] | any | undefined;
  [PATIENT_NATIONAL_ID_TYPE]: string;
  [PATIENT_NATIONAL_ID]: string;
  [PATIENT_NAME]: string;
  [PATIENT_NATIONALITY]: any;
  [PATIENT_DOB]: string;
  [PATIENT_GENDER]: string;
  [PATIENT_ALLERGIES]: string;
  [PATIENT_MOBILE_NO_1]: string | any;
  [PATIENT_BLOODGROUP]: string;
  [PATIENT_OPENED_BY]: string;
  [PATIENT_AGE]: string;
  [PATIENT_SOURCE]: string;
  [PATIENT_OPENED_ON]: string | any;
  [PATIENT_BRANCH_NAME]: string;
  [PATIENT_MOBILE_NO_2]: string | any;
  [PATIENT_AREA]: string;
  [PATIENT_MARITAL_STATUS]: string;
  [PATIENT_EMAIL]: string | any;
  [PATIENT_ADDRESS]: string;
  [PATIENT_ADDRESS_PINCODE]: string | any;
  [PATIENT_MEDICAL_REMARK]: string;
  [PATIENT_FINANCIAL_REMARK]: string;
  [PATIENT_RELATIVE_NAME]: string;
  [PATIENT_RELATIVE_MOBILE]: string | any;
  [PATIENT_RELATIVE_RELATION]: string;
  [PATIENT_ADDTIONAL_FIELDS]: any;
}

export interface IModuleScreen {
  id: number;
  name: string;
  navigate: string;
}
export interface ICancelForm {
  [REASON_TEXT]: string;
  data: any;
}

export interface IImageUploadForm {
  [IMAGE_CATEGORY]: string;
  [IMAGE_NAME]: string;
  [UPLOAD_IMAGE]: FileList;
}
export interface IDocumentUploadForm {
  [DOCUMENT_CATEGORY]: string;
  [DOCUMENT_NAME]: string;
  [UPLOAD_DOCUMENT]: FileList;
}

export interface ISesstionTimeData {
  label: string;
  value: number;
}
export interface IInterval {
  label: string;
  value: number;
}
export interface IOptionData {
  value?: any;
  name?: any;
}

export interface IReferral {
  [DOCTOR]: string;
  [REFER_TO_DOCTOR]: string;
  [APPOINTMENT_TAGS]: string;
  [REMARKS]: string;
  [PAYMENT_REMARKS]: string;
  [REFFERAL_START_DATE]: string;
  [REFER_TO_RECEPTIONIST]: any;
}

export interface INotiificationData {
  icon?: any;
  title?: string;
  description?: string;
  notification_day?: any;
  notification_time?: any;
}

export interface IDiagnosisStatusData {
  value?: any;
  name?: string;
}

export interface ITagData {
  value?: any;
  label?: string;
}

export interface ICreateJobForm {
  [NAME]: string;
  [FILE_NO]: number | string;
  [FIXED_FILE_NO]: string;
  [PATIENT]: string;
  [MOBILE_NO]: string;
  [AGE]: number | string;
  [GENDER]: string;
  [LOCATION_ID]: string;
  patientId: string;
  out_patient_file_no: string;
}

export interface ICreateJobRadiologyForm {
  [RADIOLOGYNAME]: string;
  [RADIOLOGYFILE_NO]: number | string;
  // [FIXED_FILE_NO]: string
  [RADILOGYPATIENT]: string;
  [RADIOLOGYMOBILE_NO]: string;
  [RADIOLOGYAGE]: number | string;
  [RADIOLOGYGENDER]: string;
  [RADIOLOGYLOCATION_ID]: string;
  patientId: string;
  out_patient_file_no: string;
}

export interface IviewJobsTableData {
  _date: Date | number | string;
  job_id: number;
  test_id: number;
  test_Profile: number | string;
  test_name: string;
  results_Status: string;
  _price: number | string;
  add_results: any;
  attachment: any;
  raise_invoice: any;
  view_results: any;
}

export interface IcomparepopupTableData {
  _date: Date | number | string;
  test_group: number | string;
  _test: number | string;
  _results: any;
}
export interface IaddTestPopupTableData {
  test_id: number;
  test_group: number | string;
  test_name: number | string;
  _price: number | string;
  add_to_job: any;
}

export interface IlabRequestTableData {
  _date: Date | number | string;
  doctor_name: string;
  medical_center: string;
  test_name: string;
  test_type: number | string;
  _Priority: number | string;
  _category: number | string;
  job_link: any;
  confirm_request?: number | string;
}

export interface IAddMarketPlaceForm {
  [COMPANY_NAME]: string;
  [REIMBURSEMENT_TYPE]: any;
  [CLAIM_TYPE]: any;
  [ADDRESS]: any;
  [PHONE]: number;
  [MARKETPLACE_STATE]: any;
  [MARKETPLACE_CITY]: any;
  [PIN_CODE]: number;
  [ATTACHMENTS]: any;
  [MARKETPLACE_REMARKS]: any;
}

export interface IAddInsuranceCompanyForm {
  [MARKETPLACE]: any;
  [INSURANCE_COMPANY]: string;
  [INSURANCE_CLAIM_TYPE]: any;
  [INSURANCE_REIMBURSEMENT_TYPE]: any;
  [INSURANCE_ADDRESS]: any;
  [INSURANCE_PHONE]: number;
  [INSURANCE_STATE]: any;
  [INSURANCE_CITY]: any;
  [INSURANCE_PIN_CODE]: number;
  [INSURANCE_ATTACHMENTS]: any;
  [INSURANCE_REMARKS]: any;
}

export interface IAddInsurancePlanCompanyForm {
  [INSURANCE_PLAN_COMPANY]: any;
  [INSURANCE_PLAN]: string;
  [INSURANCE__PLAN_CLAIM_TYPE]: any;
  [INSURANCE_PLAN_REIMBURSEMENT_TYPE]: any;
  [DISCOUNT]: any;
  [COMMISSION]: any;
  [CO_PAY]: any;
  [CO_PAY_VALUE]: string;
  [SERVICES]: any;
  [CLAIM_FORM]: any;
  [PLAN_ATTACHMENT]: any;
  [DEPARTMENT]: any;
  [PLAN_REMARKS]: any;
}

// invoice module
export interface IPatientInvoiceForm {
  data: { name: string; data_uri: string };
  [INVOICE_PATIENT_BRANCH_NAME]: string;
  [INVOICE_PATIENT_PROFILE_PIC]: fileType[] | any | undefined;
  [INVOICE_PATIENT_TYPE]: any | string;
  [INVOICE_PATIENT_FILE_NO]: any;
  [INVOICE_PATIENT_NAME]: string;
  [INVOICE_PATIENT_PRIMARY_DOCTOR]: string;
  [INVOICE_PATIENT_MOBILE_NO]: any | string;
  [INVOICE_PATIENT_NATIONAL_ID]: any | string;
  [INVOICE_DOCTOR_NAME]: string;
  [INVOICE_REFER_BY]: string;
  [INVOICE_REFERRAL_TYPE]: string;
}

// Lab Invoice
export interface ILabInvoiceForm {
  data: { name: string; data_uri: string };
  [LAB_INVOICE_PATIENT_BRANCH_NAME]: string;
  [LAB_INVOICE_PATIENT_PROFILE_PIC]: fileType[] | any | undefined;
  [LAB_INVOICE_PATIENT_TYPE]: any | string;
  [LAB_INVOICE_PATIENT_FILE_NO]: any;
  [LAB_INVOICE_PATIENT_NAME]: string;
  [LAB_INVOICE_PATIENT_PRIMARY_DOCTOR]: any | string;
  [LAB_INVOICE_PATIENT_MOBILE_NO]: any | string;
  [LAB_INVOICE_PATIENT_NATIONAL_ID]: any | string;
  [LAB_INVOICE_DOCTOR_NAME]: string;
  [LAB_INVOICE_REFER_BY]: string;
  [LAB_INVOICE_REFERRAL_TYPE]: string;
}

export interface IDepartmentServiceConfig {
  [INSURANCE_DEPARTMENT]: any;
  [INSURANCE_DISCOUNT]: number;
  [INSURANCE_COPAY]: number;
  [INSURANCE_DEPARTMENT_NAME]: string;
  [DEPARTMENT]: any;
  [DISCOUNT]: string;
  [COPAY]: string;
}

export interface IApprovalNum {
  [APPROVAL_NUM]: any | string;
}
export interface IaddPharmacyCustomerInformation {
  [PHARMACY_PATIENT_NAME]: string;
  [PHARMACY_FILE_NO]: number;
  [PHARMACY_MOBILE]: number;
  [PHARMACY_AGE]: number;
  [PHARMACY_NATIONAL_ID_NO]: number;
  [PHARMACY_DATE]: Date;
  [PHARMACY_REFERRAL]: string;
  [PHARMACY_GENDER]: string;
}

export interface IaddPharmacyPaymentValidators {
  [PHARMACY_OUTSTANDING_AMOUNT]: number;
  [PHARMACY_TAX_1]: number;
  [PHARMACY_TOTAL_DISCOUNT]: number;
  [PHARMACY_TAX_2]: number;
  [PHARMACY_CO_PAY]: number;
  [PHARMACY_TOTAL_TAX]: number;
  [PHARMACY_CO_PAY_AMOUNT]: number;
}
export interface IaddPharmacyCustomerSecondInformation {
  [PHARMACY_ITEM_CODE]: number;
  [PHARMACY_PRODUCTS]: string;
  [PHARMACY_SELL_PRICE]: number;
  [PHARMACY_DISCOUNT]: number;
  [PHARMACY_QTY]: number;
  [PHARMACY_SUB_QTY]: string | number;
  [PHARMACY_EXPIRY_DATE]: Date;
}

export interface IAddClaimForm {
  [MARKETPLACE_ADD_CLAIM]: { label: string; value: string };
  [PENDING_CLAIMS]: { label: string; value: string; amount: any };
  [ADD_CLAIM_DATE]: string;
  [ADD_CLAIM_NOTE]: string;
  [ADD_CLAIM_AMOUNT]: string | number;
}

export interface IEMRInsurancePlanForm {
  [EMR_PATIENT_ID]: string;
  [EMR_INSURANCE_COMPANY]: any;
  [EMR_INSURANCE_PLAN]: any;
  [EMR_POLICY_NO]: number;
  [EMR_CLAIM_TYPE]: any;
  [EMR_REIMBURSEMENT_TYPE]: any;
  [EMR_EXPIRY_DATE]: any;
  [EMR_ATTACHMENTS]: any;
}
export interface ICreateTestProfile {
  [TOTAL_AMOUNT]: any;
  [PACKAGE_AMOUNT]: any;
  [TEST_PROFILE_NAME]: string;
  [TEST_IDS]: any;
  [PROFILE_ID]: any;
}

export interface ICreateNewPlan {
  [PLAN_TOTAL_AMOUNT]: any;
  [PLAN_AMOUNT]: any;
  [PLAN_NAME]: string;
  [SERVICE_IDS]: any;
  [NO_OF_SESSION]: any;
}

export interface ICreateTestForm {
  [TEST_ID]: string;
  [TEST_NAME]: string;
  [TEST_CATEGORY]: any;
  [TEST_TAT]: string;
  [SAMPLE_TYPE]: any;
  [SOURCE]: any;
  [UNIT]: any;
  [RANGE]: [];
  [COMPONENT]: any;
  [COST_PRICE]: number;
  [SELL_PRICE]: number;
  [TOTAL_AMOUNT]: number;
  [PACKAGE_AMOUNT]: any;
  [TEST_PROFILE_NAME]: string;
  [TEST_IDS]: any;
  [PROFILE_ID]: any;
  [NEW_COMPONENT]: any;
}

export interface IRangeForm {
  [GENDER_RANGE]: any;
  [AGE_FROM]: number;
  [AGE_TO]: number;
  [RANGE_FROM]: number;
  [RANGE_TO]: number;
  [PERIOD]: any;
}
// insurance approval
export interface IApprovalNo {
  [INVOICE_INSURANCE_APPROVAL_NO]: any;
}

// master value
export interface IMasterValueData {
  [APPOINTMENT_STATUS]: string;
  [APPOINTMENT_COLOR]: string;
}

// assign tag
export interface IAssignValue {
  [ASSIGN_TAG_NAME]: string;
  [ASSIGN_TAG]: any;
}
export interface IMaterValues {
  [MASTER_VALUE]: any;
  [MASTER_VALUE_LABEL]: any;
}
export interface IRadiologyCreateTestForm {
  [RADIOLOGY_TEST_NAME]: string;
  [RADIOLOGY_TEST_CATEGORY]: any;
  [RADIOLOGY_TEST_TAT]: string;
  [RADIOLOGY_SOURCE]: any;
  [RADIOLOGY_COST_PRICE]: number;
  [RADIOLOGY_SELL_PRICE]: number;
}

export interface IRadiologyCreateTestProfileForm {
  [RADIOLOGY_TOTAL_AMOUNT]: any;
  [RADIOLOGY_PACKAGE_AMOUNT]: any;
  [RADIOLOGY_TEST_PROFILE_NAME]: string;
  [RADIOLOGY_TEST_IDS]: any;
  [RADIOLOGY_PROFILE_ID]: any;
}

// radiology invoice module
export interface IRadiologyPatientInvoiceForm {
  data: { name: string; data_uri: string };
  [RADIOLOGY_INVOICE_PATIENT_BRANCH_NAME]: string;
  [RADIOLOGY_INVOICE_PATIENT_PROFILE_PIC]: fileType[] | any | undefined;
  [RADIOLOGY_INVOICE_PATIENT_TYPE]: any | string;
  [RADIOLOGY_INVOICE_PATIENT_FILE_NO]: any;
  [RADIOLOGY_INVOICE_PATIENT_NAME]: string;
  [RADIOLOGY_INVOICE_PATIENT_PRIMARY_DOCTOR]: string;
  [RADIOLOGY_INVOICE_PATIENT_MOBILE_NO]: any | string;
  [RADIOLOGY_INVOICE_PATIENT_NATIONAL_ID]: any | string;
  [RADIOLOGY_INVOICE_DOCTOR_NAME]: string;
  [RADIOLOGY_INVOICE_REFER_BY]: string;
  [RADIOLOGY_INVOICE_REFERRAL_TYPE]: string;
}

// payment link amount
export interface IPaymentAmountForm {
  [INVOICE_PAYMENT_AMOUNT]: string | any;
}

// online payment form
export interface IOnlinePaymentForm {
  [INVOICE_ONLINE_PAYMENT_BRANCH]: string;
  [INVOICE_ONLINE_PAYMENT_NAME]: string;
  [INVOICE_ONLINE_PAYMENT_MOBILE_NO]: string | any;
  [INVOICE_ONLINE_PAYMENT_REF_NO]: string | any;
  [INVOICE_ONLINE_PAYMENT_AMOUNT]: any;
  [INVOICE_ONLINE_PAYMENT_NOTES]: string;
  [INVOICE_ONLINE_PAYMENT_URL]: any | string;
}

export interface ISetteledClaimForm {
  [SETTELED_MARKETPLACE_CLAIM]: { label: string; value: string };
  [INITIATED_CLAIMS]: { label: string; value: string; amount: any };
  [SETTELED_CLAIM_DATE]: string;
  [SETTELED_CLAIM_NOTE]: string;
  [SETTELED_CLAIM_AMOUNT]: string | number;
  [SETTELED_AMOUNT]: string | number;
}

export interface IRejectedClaimForm {
  [REJECTED_MARKETPLACE_CLAIM]: { label: string; value: string };
  [INITIATED_CLAIMS_REJECTED]: { label: string; value: string; amount: any };
  [REJECTED_CLAIM_DATE]: string;
  [REJECTED_CLAIM_NOTE]: string;
  [REJECTED_CLAIM_AMOUNT]: string | number;
  [REJECTED_AMOUNT]: string | number;
}

export interface ICurrencyValue {
  id: number;
  name: string;
  value: any;
  text?: any;
  icon: any;
  handleOnClick?: any;
}

export interface IInventoryRequestForm {
  [ITEM_NAME]: string;
  [ITEM_QTY]: any;
  [UNIT_TYPE]: any;
  [STORE_ID]: string;
  [STORE]: any;
  [REQUEST_SOURCE]: any;
  [SOURCE_DEPT]: any;
  [SOURCE_ROOM]: any;
  [SOURCE_BRANCH]: any;
}

export interface IToothSelectionForm {
  [_ID]: any;
  [TYPE]: any;
  [AGE_GROUP]: any;
  [PROCEDURE]: any;
  [SERVICE]: any;
  [PROCEDURE_SUBTYPE]: string;
  [COMPLAINT]: any;
  [NOTE]: string;
  [DESCRIPTION]: any;
  [QUANTITY]: string | number;
  [DISCOUNT]: string | number;
  [PRICE]: string | number;
  [UNIT_PRICE]: string | number;
  [TOTAL_AMOUNT]: string | number;
  [BILLABLE]: any;
  [TOOTH_IMAGE]: any;
  [SELECTED_TOOTHS]: any[];
}
export interface IAddService {
  [SERVICE_PARENT_ID]: string | any;
  [SERVICE_DEPARTMENT]: string | any;
  [SERVICE_CODE]: any;
  [SERVICE_NAME]: string;
  [SERVICE_PRICE]: number;
  [SERVICE_COST]: number;
  [SERVICE_QTY]: number;
  [SERVICE_UNIT_TYPE]: any;
  [SERVICE_BALANCE]: number;
  [SERVICE_SOURCE]: any;
  [SERVICE_GROUP]: any;
  [SERVICE_LOCATION]: string;
  [SERVICE_NUMBER_SESSION]: number;
  [SERVICE_SESSION]: number;
  [SERVICE_STATUS]: any;
}

export interface IMaterUnitTypeValues {
  [MASTER_UNIT_TYPE_NAME]: any;
  [MASTER_UNIT_TYPE_VALUE]: any;
  [MASTER_UNIT_TYPE_QTY]: any;
}

export interface IMaterTableInventory {
  [INVENTORY_MASTER_NAME]: string;
  [INVENTORY_MASTER_CURRENCY]: any;
  [INVENTORY_MASTER_CONTACT_NO]: any;
  [INVENTORY_MASTER_CONTACT_PERSON]: string;
  [INVENTORY_MASTER_ADDRESS_LINE_ONE]: string;
  [INVENTORY_MASTER_ADDRESS_LINE_TWO]: string;
  [INVENTORY_MASTER_ZIPCODE]: string;
  [INVENTORY_MASTER_CITY]: string;
  [INVENTORY_MASTER_STATE]: string;
  [INVENTORY_MASTER_COUNTRY]: string;
  [INVENTORY_MASTER_ATTACHMENTS]: any;
  [INVENTORY_MASTER_NOTES]: string;
}
// Unit Type

export interface IUnitTypeValues {
  // data: { name: string; data_uri: string }
  [BASE_UNIT_TYPE]: string;
  [MAPPED_UNIT_TYPE]: string;
}
export interface IItemTableInventory {
  [INVENTORY_ITEM_NAME]: any;
  [INVENTORY_ITEM_CODE]: any;
  [INVENTORY_BASE_UNIT_TYPE]: any;
  [INVENTORY_GROUP]: any;
  [INVENTORY_QUANTITY]: any;
  [INVENTORY_CHARGABLE]: any;
  [INVENTORY_COST_PRICE]: any;
  [INVENTORY_SELL_PRICE]: any;
  [INVENTORY_EXPIRY_DAYS]: any;
}
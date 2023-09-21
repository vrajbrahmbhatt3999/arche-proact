// export const BASE_URL = process.env.REACT_APP_PORTAL_URL;
// export const BASE_URL = 'http://localhost:3000/'
export const BASE_URL = 'https://proact-mc-dev.proactunited.com/';
// export const BASE_URL = 'https://proact-mc-qa.proactunited.com/'
// export const BASE_URL = 'https://uat.proactunited.com/'
// login
export const EMAIL = 'email';
export const PASSWORD = 'password';

// Forgot Password
export const countryCode = 'countryCode';
export const phoneNo = 'phoneNo';

// Recovery Password
export const NEW_PASSWORD = 'new_password';
export const CONFIRM_NEW_PASSWORD = 'confirm_password';

export const RE_DIGIT = new RegExp(/^\d+$/);

// forgot password
export const PHONE_NO = 'phone';
export const FORGOT_PASSWORD_EMAIL = 'email';

// otp
export const OTP = 'otpPin';

// Branch

export const BRANCH_NAME = 'name';
export const BRANCH_INITIALS = 'initials';
export const DEFAULT_SEQUENCE_NO = 'emr_sequence';
export const ADDRESS_ONE = 'address_line_1';
export const ADDRESS_TWO = 'address_line_2';
export const CITY = 'city';
export const COUNTRY = 'country';
export const STATE = 'state';
export const ZIPCODE = 'zipcode';

// Department

export const DEPT_NAME = 'name';
export const NOTES = 'notes';

// manage user-create primary
export const PRIMARY_FIRST_NAME = 'first_name';
export const PRIMARY_LAST_NAME = 'last_name';
export const PRIMARY_DESIGNATION = 'designation';
export const PRIMARY_BRANCH = 'branches';
export const PRIMARY_SPECIALITY = 'specialities';
export const PRIMARY_DEPARTMENT = 'departments';
export const PRIMARY_PHONE_NUMBER = 'phone';
export const PRIMARY_EMAIL_ID = 'email';
export const PRIMARY_USER_GROUPS = 'user_group_ids';
export const PRIMARY_ROLE = 'roleName';
export const SECONDARY_ROLE = 'secondary_roles';
export const PRIMARY_EXPIRY_DATE = 'expiry_date';
export const PRIMARY_USER_PHOTO_ATTACHMENT = 'file';
export const PRIMARY_SYSTEM_USER = 'systemuser';
export const PRIMARY_NOTES = 'notes';

// manage user-create secondary
export const SHIFT1_START_TIME = 'shift_one_start';
export const SHIFT1_END_TIME = 'shift_one_end';
export const SHIFT2_START_TIME = 'shift_two_start';
export const SHIFT2_END_TIME = 'shift_two_end';
export const SHIFT1_DAYS = 'shift_one_days';
export const SHIFT2_DAYS = 'shift_two_days';

// master table management category
export const MASTER_TABLE_CATEGORY_NAME = 'category_name';
// master table management category value
export const MASTER_TABLE_CATEGORY_VALUE_NAME = 'category_id';
export const MASTER_TABLE_CATEGORY_VALUE = 'value';

// manage usergroup

export const USERGROUP_NAME = 'name';
export const ROLE_TYPE = 'type';
export const USERGROUP_NOTES = 'description';

// Speciality
export const SPECIALITY = 'name';
export const DEPT = 'department_id';
export const SPECIALITY_IMG = 'img_url';
export const ADD_ATTACHMENT_ID = 'add_attachments';
// export const ATTACHMENTS =

// share question email

export const TO_MAIL = 'patient_email';
export const CC_MAIL = 'cc';
export const SUBJECT = 'subject';
export const EMAIL_BODY = 'body';
export const PATIENT_NAME_SQ = 'name';
export const PATIENT_NUMBER = 'phone_no';
export const FORM_DATA = 'questionnaire_form';

// Todo: receiptionist module
export const TODO_TASK_NAME = 'title';
export const TODO_TASK_PRIORITY = 'priority';
export const TODO_TASK_DESCRIPTION = 'description';
export const TODO_TASK_STATUS = 'status';

// Todo Reminder: receiptionist module
export const TODO_REMINDER = 'notification_date';

// Patient EMR Form
export const PATIENT_FILE_NO = 'emr_no';
export const PATIENT_PROFILE_PIC = 'patient_pic';
export const PATIENT_NATIONAL_ID_TYPE = 'national_id_type';
export const PATIENT_NATIONAL_ID = 'national_id';
export const PATIENT_NAME = 'name';
export const PATIENT_NATIONALITY = 'nationality';
export const PATIENT_DOB = 'dob';
export const PATIENT_GENDER = 'gender';
export const PATIENT_ALLERGIES = 'allergies';
export const PATIENT_MOBILE_NO_1 = 'phone';
export const PATIENT_BLOODGROUP = 'blood_group';
export const PATIENT_OPENED_BY = 'opened_by';
export const PATIENT_AGE = 'age';
export const PATIENT_SOURCE = 'source';
export const PATIENT_OPENED_ON = 'opened_on';
export const PATIENT_BRANCH_NAME = 'patient_default_branch_id';
export const PATIENT_MOBILE_NO_2 = 'phone_2';
export const PATIENT_AREA = 'area';
export const PATIENT_MARITAL_STATUS = 'marital_status';
export const PATIENT_EMAIL = 'email';
export const PATIENT_ADDRESS = 'address';
export const PATIENT_ADDRESS_PINCODE = 'zip_code';
export const PATIENT_MEDICAL_REMARK = 'medical_remark';
export const PATIENT_FINANCIAL_REMARK = 'financial_remark';
export const PATIENT_RELATIVE_NAME = 'relative_name';
export const PATIENT_RELATIVE_MOBILE = 'relative_phone';
export const PATIENT_RELATIVE_RELATION = 'relative_relation';
export const PATIENT_ADDTIONAL_FIELDS = 'additional_details';

// SUBMIT QUESTION FORM

export const NATIONALITY = 'national_id_type';
export const FILE_NO = 'national_id';

// Cancle Appointment modal form
export const REASON_TEXT = 'reason';

// UPLOAD IMAGE FORM

export const IMAGE_CATEGORY = 'image_category';
export const IMAGE_NAME = 'img_name';
export const UPLOAD_IMAGE = 'img';

// UPLOAD DOCUMENT FORM

export const DOCUMENT_CATEGORY = 'doc_category';
export const DOCUMENT_NAME = 'document_name';
export const UPLOAD_DOCUMENT = 'document';

export const SUBMIT_OTP_URL = `${BASE_URL}submitotp`;

//Referal form
export const DOCTOR = 'doctor';
export const REFER_TO_DOCTOR = 'refer_to_doctor';
export const APPOINTMENT_TAGS = 'appointment_tags';
export const REMARKS = 'remarks';
export const PAYMENT_REMARKS = 'payment_remarks';
export const REFFERAL_START_DATE = 'referral_start_date';
export const REFER_TO_RECEPTIONIST = 'refer_to_receptionist';

// Create New Forms
const MODULE_LABEL_NAME = 'module_name';
const DEPARTMENT_LABEL_NAME = 'department_id';
const FORM_LABEL_NAME = 'name';
export { MODULE_LABEL_NAME, DEPARTMENT_LABEL_NAME, FORM_LABEL_NAME };

// Doctor Diagnosis
const IMAGE_LABEL_NAME = 'imageName';
const CATEGORY_LABEL_NAME = 'category';
const MAIN_COMPLAINT_LABEL_NAME = 'mainComplaint';
const DIAGNOSIS_LABEL_NAME = 'diagnosis';
const SESSIONS_LABEL_NAME = 'sessions';
const SERVICE_LABEL_NAME = 'service';
const DOCTOR_LABEL_NAME = 'doctor';
const PROCEDURE_LABEL_NAME = 'procedure';

export {
  IMAGE_LABEL_NAME,
  CATEGORY_LABEL_NAME,
  MAIN_COMPLAINT_LABEL_NAME,
  DIAGNOSIS_LABEL_NAME,
  SESSIONS_LABEL_NAME,
  SERVICE_LABEL_NAME,
  DOCTOR_LABEL_NAME,
  PROCEDURE_LABEL_NAME,
};

// Add Marketplace

export const COMPANY_NAME = 'marketplace_name';
export const REIMBURSEMENT_TYPE = 'reimbursement_type';
export const CLAIM_TYPE = 'claim_type';
export const ADDRESS = 'address';
export const PHONE = 'phone';
export const MARKETPLACE_STATE = 'state';
export const MARKETPLACE_CITY = 'city';
export const PIN_CODE = 'pincode';
export const ATTACHMENTS = 'attachments';
export const MARKETPLACE_REMARKS = 'remarks';

// Add Insurance Company

export const MARKETPLACE = 'marketplace_company_id';
export const INSURANCE_COMPANY = 'insurance_company_name';
export const INSURANCE_CLAIM_TYPE = 'claim_type';
export const INSURANCE_REIMBURSEMENT_TYPE = 'reimbursement_type';
export const INSURANCE_ADDRESS = 'address';
export const INSURANCE_PHONE = 'phone';
export const INSURANCE_STATE = 'state';
export const INSURANCE_CITY = 'city';
export const INSURANCE_PIN_CODE = 'pincode';
export const INSURANCE_ATTACHMENTS = 'attachments';
export const INSURANCE_REMARKS = 'remarks';

// Add Insurance Plan

export const INSURANCE_PLAN_COMPANY = 'insurance_company_id';
export const INSURANCE_PLAN = 'insurance_plan';
export const INSURANCE__PLAN_CLAIM_TYPE = 'claim_type';
export const INSURANCE_PLAN_REIMBURSEMENT_TYPE = 'reimbursement_type';
export const CO_PAY = 'Co_Pay';
export const CO_PAY_VALUE = 'Co_Pay_percentage';
export const DISCOUNT = 'discount';
export const COMMISSION = 'comission';
export const SERVICES = 'services';
export const CLAIM_FORM = 'claim_form';
export const PLAN_ATTACHMENT = 'attachments';
export const DEPARTMENT = 'departments';
export const PLAN_REMARKS = 'remarks';
export const UNIT_PRICE = 'unit_price';

// invoice Form
export const INVOICE_PATIENT_BRANCH_NAME = 'patient_default_branch_id';
export const INVOICE_PATIENT_TYPE = 'patient_type';
export const INVOICE_PATIENT_FILE_NO = 'emr_no';
export const INVOICE_PATIENT_NAME = 'name';
export const INVOICE_PATIENT_PRIMARY_DOCTOR = 'patient_primary_Doctor';
export const INVOICE_PATIENT_MOBILE_NO = 'phone';
export const INVOICE_PATIENT_PROFILE_PIC = 'profile_pic';
export const INVOICE_PATIENT_NATIONAL_ID = 'national_id';

//Insurance Approval Number

// Lab Invoice Form
export const LAB_INVOICE_PATIENT_BRANCH_NAME = 'patient_default_branch_id';
export const LAB_INVOICE_PATIENT_TYPE = 'patient_type';
export const LAB_INVOICE_PATIENT_FILE_NO = 'emr_no';
export const LAB_INVOICE_PATIENT_NAME = 'name';
export const LAB_INVOICE_PATIENT_MOBILE_NO = 'phone';
export const LAB_INVOICE_PATIENT_PROFILE_PIC = 'profile_pic';
export const LAB_INVOICE_PATIENT_NATIONAL_ID = 'national_id';
export const LAB_INVOICE_DOCTOR_NAME = 'doctor_name';
export const LAB_INVOICE_REFERRAL_TYPE = 'referral_type';
export const LAB_INVOICE_PATIENT_PRIMARY_DOCTOR = 'patient_primary_Doctor_lab';

// export const LAB_INVOICE

//Insurance Approval Number
export const APPROVAL_NUM = 'approvalNum';

// Department insurance config form

export const INSURANCE_DEPARTMENT = 'department_id';
export const INSURANCE_DISCOUNT = 'discount';
export const INSURANCE_COPAY = 'coPay';
export const INSURANCE_DEPARTMENT_NAME = 'department_name';
export const INVOICE_DOCTOR_NAME = 'doctor_name';
export const INVOICE_REFER_BY = 'refer_by';
export const INVOICE_REFERRAL_TYPE = 'referral_type';

//pharmacy customer Form 1

export const PHARMACY_PATIENT_NAME = 'patient_name';
export const PHARMACY_FILE_NO = 'file_no';
export const PHARMACY_MOBILE = 'mobile';
export const PHARMACY_AGE = 'age';
export const PHARMACY_NATIONAL_ID_NO = 'national_id_no ';
export const PHARMACY_DATE = 'date';
export const PHARMACY_REFERRAL = 'referral';
export const PHARMACY_GENDER = 'gender';

//pharmacy customer Form 2

export const PHARMACY_ITEM_CODE = 'item_code';
export const PHARMACY_PRODUCTS = 'products';
export const PHARMACY_SELL_PRICE = 'sell_price';
export const PHARMACY_DISCOUNT = 'discount';
export const PHARMACY_QTY = 'qty';
export const PHARMACY_SUB_QTY = 'sub_qty';
export const PHARMACY_EXPIRY_DATE = 'expiry_date';

//pharmacy payment Form

export const PHARMACY_OUTSTANDING_AMOUNT = 'outstanding_amount';
export const PHARMACY_TAX_1 = 'tax_1';
export const PHARMACY_TOTAL_DISCOUNT = 'total_discount';
export const PHARMACY_TAX_2 = 'tax_2';
export const PHARMACY_CO_PAY = 'co_pay';
export const PHARMACY_TOTAL_TAX = 'total_tax';
export const PHARMACY_CO_PAY_AMOUNT = 'Co_pay_amount';

// Insurance plan patient emr

export const EMR_PATIENT_ID = 'patient_id';
export const EMR_INSURANCE_COMPANY = 'insurance_company_id';
export const EMR_INSURANCE_PLAN = 'plan_id';
export const EMR_POLICY_NO = 'policy_no';
export const EMR_CLAIM_TYPE = 'claim_type';
export const EMR_REIMBURSEMENT_TYPE = 'reimbursement_type';
export const EMR_EXPIRY_DATE = 'expiry_date';
export const EMR_ATTACHMENTS = 'attachments';
// Create Test Profile

export const TOTAL_AMOUNT = 'total_amount';
export const PACKAGE_AMOUNT = 'package_amount';
export const TEST_PROFILE_NAME = 'name';
export const TEST_IDS = 'labtest_ids';
export const PROFILE_ID = 'id';

// create Test

export const TEST_ID = 'string';
export const TEST_NAME = 'name';
export const TEST_CATEGORY = 'category_id';
export const TEST_TAT = 'turn_around_time';
export const SAMPLE_TYPE = 'sample_id';
export const SOURCE = 'source';
export const UNIT = 'unit_id';
export const RANGE = 'ranges';
export const COST_PRICE = 'cost_price';
export const SELL_PRICE = 'sell_price';
export const COMPONENT = 'name';
export const NEW_COMPONENT = 'new';
// export const SELL_PRICE = "sell_price";

// Add Range

export const GENDER_RANGE = 'gender';
export const AGE_FROM = 'age_from';
export const AGE_TO = 'age_to';
export const RANGE_FROM = 'range_from';
export const RANGE_TO = 'range_to';
export const PERIOD = 'age_type';

// master user value
export const APPOINTMENT_STATUS = 'value';
export const APPOINTMENT_COLOR = 'color_code';

// assgin tag
export const ASSIGN_TAG_NAME = 'name';
export const ASSIGN_TAG = 'data_uri';
export const INVOICE_INSURANCE_APPROVAL_NO = 'insurance_approval_no';

// master values
export const MASTER_VALUE_LABEL = 'label';
export const MASTER_VALUE = 'name';

// insurance approval number

// radiology create test

export const RADIOLOGY_TEST_NAME = 'name';
export const RADIOLOGY_TEST_CATEGORY = 'category_id';
export const RADIOLOGY_TEST_TAT = 'turn_around_time';
export const RADIOLOGY_SOURCE = 'source';
export const RADIOLOGY_COST_PRICE = 'cost_price';
export const RADIOLOGY_SELL_PRICE = 'sell_price';

// radiology create test profile

export const RADIOLOGY_TOTAL_AMOUNT = 'total_amount';
export const RADIOLOGY_PACKAGE_AMOUNT = 'package_amount';
export const RADIOLOGY_TEST_PROFILE_NAME = 'name';
export const RADIOLOGY_TEST_IDS = 'radiologytest_ids';
export const RADIOLOGY_PROFILE_ID = 'id';

//radiology invoice Form
export const RADIOLOGY_INVOICE_PATIENT_BRANCH_NAME =
  'patient_default_branch_id';
export const RADIOLOGY_INVOICE_PATIENT_TYPE = 'patient_type';
export const RADIOLOGY_INVOICE_PATIENT_FILE_NO = 'emr_no';
export const RADIOLOGY_INVOICE_PATIENT_NAME = 'name';
export const RADIOLOGY_INVOICE_PATIENT_PRIMARY_DOCTOR =
  'patient_primary_Doctor_radiology';
export const RADIOLOGY_INVOICE_PATIENT_MOBILE_NO = 'phone';
export const RADIOLOGY_INVOICE_PATIENT_PROFILE_PIC = 'profile_pic';
export const RADIOLOGY_INVOICE_PATIENT_NATIONAL_ID = 'national_id';
export const RADIOLOGY_INVOICE_DOCTOR_NAME = 'doctor_name';
export const RADIOLOGY_INVOICE_REFER_BY = 'refer_by';
export const RADIOLOGY_INVOICE_REFERRAL_TYPE = 'referral_type';

//payment link Form
export const INVOICE_PAYMENT_AMOUNT = 'amount';

// online payment form
export const INVOICE_ONLINE_PAYMENT_BRANCH = 'patient_default_branch_id';
export const INVOICE_ONLINE_PAYMENT_NAME = 'name';
export const INVOICE_ONLINE_PAYMENT_MOBILE_NO = 'phone';
export const INVOICE_ONLINE_PAYMENT_REF_NO = 'invoice_no';
export const INVOICE_ONLINE_PAYMENT_AMOUNT = 'amount';
export const INVOICE_ONLINE_PAYMENT_NOTES = 'note';
export const INVOICE_ONLINE_PAYMENT_URL = 'link';

// Inventory Request

export const ITEM_NAME = 'id'
export const ITEM_QTY = 'requested_qty'
export const UNIT_TYPE = 'qty_type'
export const STORE_ID = 'store_id'
export const STORE = 'request_destination'
export const REQUEST_SOURCE = 'request_source_type'
export const SOURCE_DEPT = 'request_source'
export const SOURCE_ROOM = 'request_source'
export const SOURCE_BRANCH = 'request_source_branch'

export const INVENTORY_ITEM_NAME = 'name'
export const INVENTORY_ITEM_CODE = 'item_code'
export const INVENTORY_BASE_UNIT_TYPE = 'base_unit'
export const INVENTORY_GROUP = 'group'
export const INVENTORY_QUANTITY = 'quantity'
export const INVENTORY_CHARGABLE = 'chargable'
export const INVENTORY_COST_PRICE = 'cost_price'
export const INVENTORY_SELL_PRICE = 'sell_price'
export const INVENTORY_EXPIRY_DAYS = 'expiry_days'

// tooth selection form
export const _ID = '_id';
export const AGE_GROUP = 'age_group';
export const PROCEDURE = 'procedure';
export const PROCEDURE_SUBTYPE = 'procedure_subtype';
export const SERVICE = 'service';
export const COMPLAINT = 'complaint';
export const NOTE = 'note';
export const DESCRIPTION = 'description';
export const PRICE = 'price';
export const QUANTITY = 'quantity';
export const BILLABLE = 'billable';
export const TOOTH_IMAGE = 'tooth_image';
export const SELECTED_TOOTHS = 'selected_tooth';
export const TYPE = 'type';

// create new treatment plan for masters

export const PLAN_TOTAL_AMOUNT = 'total_amount';
export const PLAN_AMOUNT = 'plan_amount';
export const PLAN_NAME = 'name';
export const SERVICE_IDS = 'service_ids';
export const NO_OF_SESSION = 'sessions';

//addService Popup
export const SERVICE_DEPARTMENT = 'service_department';
export const SERVICE_PARENT_ID = 'service_parent_id';
export const SERVICE_NAME = 'service_name';
export const SERVICE_CODE = 'service_code';
export const SERVICE_PRICE = 'service_price';
export const SERVICE_COST = 'service_cost';
export const SERVICE_QTY = 'service_qty';
export const SERVICE_UNIT_TYPE = 'service_unit_type';

export const SERVICE_BALANCE = 'service_balance';
export const SERVICE_SOURCE = 'service_source';
export const SERVICE_GROUP = 'service_group';
export const SERVICE_LOCATION = 'service_location';
export const SERVICE_SESSION = 'service_session';
export const SERVICE_STATUS = 'service_status';
export const SERVICE_NUMBER_SESSION = 'service_number_session';

// master values- inventory unit type
export const MASTER_UNIT_TYPE_NAME = 'label';
export const MASTER_UNIT_TYPE_VALUE = 'value';
export const MASTER_UNIT_TYPE_QTY = 'qty';

//Admin-inventory master table
export const INVENTORY_MASTER_NAME = 'name';
export const INVENTORY_MASTER_CONTACT_PERSON = 'contact_name';
export const INVENTORY_MASTER_CONTACT_NO = 'phone';
export const INVENTORY_MASTER_CURRENCY = 'currency';
export const INVENTORY_MASTER_ADDRESS_LINE_ONE = 'address_line_1';
export const INVENTORY_MASTER_ADDRESS_LINE_TWO = 'address_line_2';
export const INVENTORY_MASTER_ZIPCODE = 'zipcode';
export const INVENTORY_MASTER_CITY = 'city';
export const INVENTORY_MASTER_STATE = 'state';
export const INVENTORY_MASTER_COUNTRY = 'country';
export const INVENTORY_MASTER_ATTACHMENTS = 'attachments';
export const INVENTORY_MASTER_NOTES = 'notes';

// Unit Type Master

export const BASE_UNIT_TYPE = 'base_unit_type_id';
export const MAPPED_UNIT_TYPE = 'mapped_unit_type_id';

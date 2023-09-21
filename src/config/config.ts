// const BASE_URL = process.env.REACT_APP_BASE_URL;

//for dev
const BASE_URL_AUTH = 'https://sa-api-dev.proactunited.com/api/';
const BASE_URL = 'https://mc-api-dev.proactunited.com/api/';

// for qa
// const BASE_URL_AUTH = 'https://sa-api-qa.proactunited.com/api/'
// const BASE_URL = 'https://mc-api-qa.proactunited.com/api/'

//for local setup
//const BASE_URL_AUTH = 'http://localhost:5000/api/'
//const BASE_URL = 'http://localhost:5001/api/'

//for uat
// const BASE_URL_AUTH = 'https://sa-api-uat.proactunited.com/api/'
// const BASE_URL = 'https://mc-api-uat.proactunited.com/api/'

const API_VER = 'v1/';
const MASTER_CATEGORY = 'master/';
const MASTER_CATEGORY_VALUE = 'master-value/';
const TODO = 'todo/';

export const baseURI = BASE_URL + API_VER;
export const baseURIAUTH = BASE_URL_AUTH + API_VER; //baseurl for auth

export const baseMasterCategoryURI = BASE_URL + API_VER + MASTER_CATEGORY;
export const baseMasterCategoryValueURI =
  BASE_URL + API_VER + MASTER_CATEGORY_VALUE;

export const baseTodoURI = BASE_URL + API_VER + TODO;

// to get endpoints from env

// const API_VER = 'v1/'
// const MASTER_CATEGORY = 'master/'
// const MASTER_CATEGORY_VALUE = 'master-value/'
// const TODO = 'todo/'

// export const baseURI = process.env.REACT_APP_BASE_URL + API_VER
// export const baseURIAUTH = process.env.REACT_APP_BASE_URL_AUTH + API_VER //baseurl for auth

// export const baseMasterCategoryURI = process.env.REACT_APP_BASE_URL + API_VER + MASTER_CATEGORY
// export const baseMasterCategoryValueURI =
//   process.env.REACT_APP_BASE_URL + API_VER + MASTER_CATEGORY_VALUE

// export const baseTodoURI = process.env.REACT_APP_BASE_URL + API_VER + TODO

//login
export const LOGIN_URL = `${baseURIAUTH}auth/login`;
export const LOGOUT_URL = `${baseURIAUTH}auth/logout`;
export const FORGOT_PASSWORD_URL = `${baseURIAUTH}auth/password/forgot`;
export const RESET_PASSWORD_URL = `${baseURIAUTH}auth/password/reset`;
export const VARIFY_OTP_URL = `${baseURIAUTH}auth/otp/verify`;
export const RESEND_OTP_URL = `${baseURIAUTH}auth/otp/resend`;
export const GET_MASTER_VALUE_URL = `${baseURI}master-value/category-name`;
export const GET_SIDEBAR_URL = `${baseURI}profile/get-sidebar`;

// Branch

export const GET_ALL_BRANCH = `${baseURI}brc/all`;
export const ADD_BRANCH = `${baseURI}brc/create`;
export const GET_BRANCH_BY_ID = `${baseURI}brc/get`;
export const EDIT_BRANCH = `${baseURI}brc/update`;
export const UPDATE_BRANCH_STATUS = `${baseURI}brc/status-update`;
export const USER_LICENSE = `${baseURI}brc/get-lc`;
export const GET_DEFAULT_BRANCH = `${baseURI}brc/mk-dfl`;

//Ward

export const GET_ALL_WARD = `${baseURI}ipd/ward/all`;
export const ADD_WARD = `${baseURI}ipd/ward/create`;
export const GET_WARD_BY_ID = `${baseURI}ipd/ward/get`;
export const EDIT_WARD = `${baseURI}ipd/ward/update`;
export const UPDATE_WARD_STATUS = `${baseURI}ipd/ward/change-status`;

//room

export const GET_ALL_ROOM = `${baseURI}ipd/room/all`;
export const ADD_ROOM = `${baseURI}ipd/room/create`;
export const GET_ROOM_BY_ID = `${baseURI}ipd/room/get`;
export const EDIT_ROOM = `${baseURI}ipd/room/update`;
export const UPDATE_ROOM_STATUS = `${baseURI}ipd/room/change-status`;

//bed

export const GET_ALL_BED = `${baseURI}ipd/bed/all`;
export const ADD_BED = `${baseURI}ipd/bed/create`;
export const GET_BED_BY_ID = `${baseURI}ipd/bed/get`;
export const EDIT_BED = `${baseURI}ipd/bed/update`;
export const UPDATE_BED_STATUS = `${baseURI}ipd/bed/change-status`;

// Department
export const GET_ALL_DEPARTMENT = `${baseURI}dpt/all`;
export const ADD_DEPARTMENT = `${baseURI}dpt/create`;
export const GET_DEPARTMENT_BY_ID = `${baseURI}dpt/get`;
export const EDIT_DEPARTMENT = `${baseURI}dpt/update`;
export const UPDATE_DEPARTMENT_STATUS = `${baseURI}dpt/status-update`;

// SPECIALITIES

export const GET_ALL_SPECIALITIES = `${baseURI}spl/all`;
export const ADD_SPECIALITIES = `${baseURI}spl/create`;
export const GET_SPECIALITIES_BY_ID = `${baseURI}spl/get`;
export const EDIT_SPECIALITIES = `${baseURI}spl/update`;
export const UPDATE_SPECIALITIES_STATUS = `${baseURI}spl/status-update`;

// Mobile App Configuration
// Medical Center News
export const CREATE_MEDICAL_CENTER_NEWS = `${baseURI}news/create`;
export const GET_MEDICAL_CENTER_NEWS = `${baseURI}news/all`;
// Add Appointment
export const GET_ALL_APPOINTMENT = `${baseURI}appointment-mode/all`;
export const CREATE_APPOINTMENT = `${baseURI}appointment-mode/create`;
export const UPDATE_APPOINTMENT = `${baseURI}appointment-mode/update`;
export const UPDATE_STATUS_APPOINTMENT = `${baseURI}appointment-mode/status-update`;

// manage users primary form
export const GET_ALL_MANAGE_USER = `${baseURI}manage-users/all`;
export const UPDATE_STATUS_MANAGE_USER = `${baseURI}manage-users/status-update`;
export const GET_MANAGE_USER_BY_ID = `${baseURI}`;
export const CREATE_MANAGE_USER = `${baseURI}manage-users/create`;
export const EDIT_MANAGE_USER_URL = `${baseURI}manage-users/update`;
export const GET_USER_BY_ID_URL = `${baseURI}manage-users/get`;
export const GET_ALL_MANAGE_USER_BY_ROLE_URL = `${baseURI}manage-users/filter/all`;

// manage user secondary form
export const CREATE_USER_SHIFT_URL = `${baseURI}manage-users/sh/create`;
export const UPDATE_USER_SHIFT_URL = `${baseURI}manage-users/sh/update`;
export const GET_USER_SHIFT_BY_ID_URL = `${baseURI}manage-users/sh/get`;

// master table category
export const GET_ALL_CATEGORY = `${baseMasterCategoryURI}all`;
export const GET_CATEGORY_BY_ID = `${baseMasterCategoryURI}`;
export const ADD_CATEGORY = `${baseMasterCategoryURI}create`;
export const EDIT_CATEGORY = `${baseMasterCategoryURI}update`;
export const UPDATE_STATUS_CATEGORY = `${baseMasterCategoryURI}status-update`;

// master table category value
export const GET_ALL_CATEGORY_VALUE = `${baseMasterCategoryValueURI}all`;
export const GET_CATEGORY_VALUE_BY_ID = `${baseMasterCategoryValueURI}`;
export const ADD_CATEGORY_VALUE = `${baseMasterCategoryValueURI}add`;
export const EDIT_CATEGORY_VALUE = `${baseMasterCategoryValueURI}update`;
export const UPDATE_STATUS_CATEGORY_VALUE = `${baseMasterCategoryValueURI}status-update`;

// manage userGroup

export const CREATE_USERGROUP_URL = `${baseURI}grp/create`;
export const GET_USERGROUP_URL = `${baseURI}grp/all`;
export const UPDATE_USERGROUP_PERMISSIONS_URL = `${baseURI}grp/update-mdl`;
export const GET_USERGROUP_PERMISSION_URL = `${baseURI}grp/get`;
export const UPDATE_USERGROUP_STATUS_BY_ID_URL = `${baseURI}grp/status-update`;

// patient activity log

export const GET_ALL_PATIENT_ACTIVITY_LOG = `${baseURI}patient/activity-logs`;
// ASSIGN TAG

export const GET_ALL_TAG = `${baseURI}tag/all`;

// PATIENT

export const ASSIGN_TAG = `${baseURI}patient/assign-tags`;
export const GET_ALL_TODAY_PATIENT_APPOINTMENT = `${baseURI}apt/today`;
export const GET_ALL_MEDICAL_TIMELINE = `${baseURI}patient/medical-timeline`;
export const CREATE_MEDICAL_HISTORY = `${baseURI}recep/medical-history`;
export const GET_ALL_MEDICAL_HISTORY = `${baseURI}patient/medical-history/all`;
export const GET_RECENT_MEDICAL_HISTORY = `${baseURI}patient/medical-history/recent`;
export const GET_ALL_ASSIGN_TAG = `${baseURI}patient/assign-tags/all`;

// APPOINTMENT

export const GET_ALL_TODAY_PATIENT = `${baseURI}apt/today`;
export const UPDATE_APPOINTMENT_STATUS = `${baseURI}apt/status`;
export const GET_ALL_PATIENT_APPOINTMENT = `${baseURI}apt/all`;
export const GET_APPOINTMENT_LOG = `${baseURI}apt/get-apnt-log`;
export const GET_APPOINTMENT_SUMMARY = `${baseURI}apt/get-apnt-summary`;

// mobile appointment request

export const GET_ALL_MOBILE_APPOINTMENT_REQUEST = `${baseURI}apt/mobileapt`;
export const GET_ALL_MOBILE_APPOINTMENT_REQUEST_CALANDER_URL = `${baseURI}apt/mobileapt/calview`;
export const CHANGE_MOBILE_APPOINTMENT_STATUS = `${baseURI}apt/status`;
export const CANCEL_APPOINTMENT_URL = `${baseURI}apt/cancel`;

// RECEPTIONIST

export const QUESTIONNAIRE_OTP_RESEND = `${baseURI}recep/questionnaire/otp/resend`;
export const GET_ALL_DOCTOR_LIST = `${baseURI}doctor/all`;
export const GET_ALL_DENTIST_LIST = `${baseURI}dentist/all`;
export const PROACT_NEWS = `${baseURI}news/all`;
// export const PROACT_NEWS_BY_ID = `${baseURI}news/get`;
export const PROACT_NEWS_BY_ID = `${baseURI}news/get`;
export const GET_ALL_DOCTOR_BY_ID = `${baseURI}doctor/get`;

// Todo:- receiptionist module
export const GET_ALL_LIST = `${baseTodoURI}all`;
export const GET_ALL_LIST_BY_ID = `${baseTodoURI}`;
export const CREATE_TODO = `${baseTodoURI}create`;
export const UPDATE_TODO = `${baseTodoURI}update`;
export const DELETE_TODO = `${baseTodoURI}status-update`;

// Todo reminder:-
export const GET_ALL_NOTIFICATION = `${baseTodoURI}send-notification`;

// Patient EMR
export const GET_ALL_SELECTION_LIST = `${baseURI}master-value/category-name`;
export const GET_ALL_BRANCH_LIST = `${baseURI}profile/get`;
export const GET_ALL_PATIENT_LIST = `${baseURI}emr/list`;
export const GET_PATIENT_BY_ID = `${baseURI}emr/get`;
export const CREATE_PATIENT = `${baseURI}emr/create`;
export const UPDATE_PATIENT = `${baseURI}emr/update`;
export const DELETE_PATIENT = `${baseURI}emr/status-update`;
export const SHARE_QUESTIONNAIRE_LINK = `${baseURI}recep/questionnaire`;
export const QUESTIONNAIRE_OTP_SEND = `${baseURI}recep/questionnaire/otp/send`;
export const QUESTIONNAIRE_OTP_VERIFY = `${baseURI}recep/questionnaire/otp/verify`;

// add block field api
export const CREATE_ADDTIONAL_PATIENT_FIELDS = `${baseURI}emr/create-additional-fields`;
export const GET_ADDTIONAL_PATIENT_FIELDS = `${baseURI}emr/get-additional-fields`;

//Apointments

export const GET_ALL_DOCTERS_URL = `${baseURI}doctor/get-all`;
export const GET_ALL_DOCTERS_APPOINTMENTS_URL = `${baseURI}apt/get-dct-time-apnt`;
export const GET_ALL_AVAILABLE_SLOTS_URL = `${baseURI}apt/doc/slots`;
export const GET_ALL_RECURRING_AVAILABLE_SLOTS_URL = `${baseURI}apt/doc/recurring/slots`;
export const BOOKING_CONFIRMATION_URL = `${baseURI}apt/booking-cnf`;

// Role
export const GET_USER_ROLE = `${baseURI}role/all`;
export const UPDATE_ROLE_STATUS = `${baseURI}role/update-status`;

// Create New Form
export const GET_ALL_FORMS_URL = `${baseURI}form/all`;
export const ADD_NEW_FORM_URL = `${baseURI}form/create`;
export const GET_FORM_BY_ID_URL = `${baseURI}form/get`;
export const DELETE_FORM_URL = `${baseURI}form/delete`;
export const UPDATE_FORM_URL = `${baseURI}form/update`;
export const UPDATE_STATUS_BY_ID_FORM_URL = `${baseURI}form/status-update`;

// Doctor diagnosis
export const CREATE_DIAGNOSIS_URL = `${baseURI}diagnosis/create`;
export const GET_DIAGNOSIS_SEARCH_TAG_URL = `${baseURI}diagnosis/search-tag`;
export const GET_DIAGNOSIS_TAG = `${baseURI}diagnosis/all-tag`;
export const UPDATE_DIAGNOSIS_URL = `${baseURI}diagnosis/update`;

// Treatment plan
export const GET_ALL_TREATMENT_PLANS_URL = `${baseURI}treatment-plan/all`;
export const GET_ALL_TREATMENT_SERVICES_URL = `${baseURI}treatment-service/all`;
export const GET_ALL_TREATMENT_PLANS_URL_DIAG_URL = `${baseURI}diagnosis/treatment/all`;
export const UPDATE_TREATMENT_PLANS_URL = `${baseURI}diagnosis/treatment/update`;
export const CREATE_TREATMENT_PLAN_URL = `${baseURI}treatment-plan/create`;
export const CREATE_CUSTOM_TREATMENT_PLAN_URL = `${baseURI}treatment-plan/custom/create`;
export const GET_ALL_DIAGNOSIS_TREATMENT_PLAN = `${baseURI}diagnosis/treatment/plan`;
export const DELETE_DIAGNOSIS_TREATMENT_PLAN = `${baseURI}diagnosis/treatment/delete`;
export const GET_ALL_TREATMENT_PLANS_STATUS = `${baseURI}treatment-plan/status-update`;
export const CREATE_NEW_PLAN_URL = `${baseURI}treatment-plan/create`;
export const UPDATE_PLAN_URL = `${baseURI}treatment-plan/update`;
export const GET_ALL_DENTAL_TREATMENT_SERVICES_URL = `${baseURI}dental/services`;
export const GET_ALL_DENTAL_TOOTHS_URL = `${baseURI}/dental/tooths`;
export const CREATE_EXISTING_DENTAL_TREATMENT_URL = `${baseURI}dental/create_existing_treatment`;
export const GET_DENTIST_APPOINTMENT_LIST = `${baseURI}dentist/appointments/all`;

// Modules
export const GET_ALL_MODULES_URL = `${process.env.REACT_APP_BASE_URL_AUTH + API_VER
  }pkg/mdl/all`;

// Doctor-Dashboard API's
export const GET_DOCTOR_APPOINTMENT_LIST = `${baseURI}doctor/appointments/all`;

//Referral

export const ADD_PATIENT_REFERRAL = `${baseURI}diagnosis/add-patient-referral`;
export const GET_OUTSIDE_REFERRAL_DOCTOR = `${baseURI}diagnosis/get-outsider-doctors`;
export const GET_INTERNAL_DOCTOR = `${baseURI}doctor/get-all`;
export const GET_RECEPTIONIST_NAME = `${baseURI}recep/get-all`;

// Diagnosis
export const GET_ALL_MEDICINE_CATEGORY = `${baseURI}diagnosis/get-med-categories`;
export const GET_ALL_MEDICINE = `${baseURI}diagnosis/get-meds`;
export const FIND_MEDICINE = `${baseURI}diagnosis/find-med`;
export const GET_PATIENT_DIAGNOSIS_BY_ID = `${baseURI}diagnosis/getdata`;
export const ADD_PATIENT_PRESCRIPTION = `${baseURI}diagnosis/add-patient-prescription`;
export const ADD_DIAGNOSIS_IMAGE = `${baseURI}diagnosis/add-image`;
export const ADD_DIAGNOSIS_DOCUMENT = `${baseURI}diagnosis/add-doc`;
export const GET_ALL_DIAGNOSIS_SCRIBE_NOTES = `${baseURI}diagnosis/scribenotes/get`;
export const GET_ALL_DIAGNOSIS_SCRIBE_IMAGES = `${baseURI}diagnosis/scribeimages/get`;

// App Notifications
export const CREATE_NOTIFICATION = `${baseURI}notification/create`;
export const GET_ALL_NOTIFICATIONS = `${baseURI}notification/all`;
export const NOTIFICATION_MARKREAD = `${baseURI}notification/markread`;
export const GET_DEVICE_TOKEN_STORE = `${baseURI}notification/store`;

export const GET_PATIENT_INFO_URL = `${baseURI}diagnosis/getdata`;
export const GET_PATIENT_DIAG_ATTACHMENTS_URL = `${baseURI}diagnosis/getall`;
export const PATIENT_DIOG_STATUS_URL = `${baseURI}diagnosis/patient/status`;
export const GET_PATIENT_HISTORY_URL = `${baseURI}diagnosis/patient/history`;
export const GET_PATIENT_DIANGNOSIS_DETAIL_URL = `${baseURI}diagnosis/get`;
export const GET_PATIENT_ATTACHMENTS_URL = `${baseURI}diagnosis/getattachments`;
export const GET_PATIENT_IMAGES_URL = `${baseURI}diagnosis/getimages`;
export const GET_ALL_PATIENT_HISTORY = `${baseURI}diagnosis/pnt-histroy`;
export const GET_COMPARE_DOCUMENTS_URL = `${baseURI}diagnosis/getcompare`;
export const GET_PATIENT_MEDICINE = `${baseURI}diagnosis/pnt-medicine`;
export const MARK_STAGE = `${baseURI}diagnosis/mark-stage`;
export const GET_ALL_PATIENT_HISTORY_YEAR = `${baseURI}diagnosis/pnt-histroy-yr`;

// tagged Patient
export const TAGGED_PATIENT = `${baseURI}patient/pnt-by-symptoms`;
export const TAGGED_PATIENT_FILTER = `${baseURI}`;

//create jobs
export const CREATELABJOB = `${baseURI}lab-jobs/create`;
export const ALL_LAB_JOBS = `${baseURI}lab-jobs/all`;
export const UPDATELABJOBS = `${baseURI}lab-jobs/update`;
export const LABJOBDOCUMENTS = `${baseURI}lab-jobs/document`;
export const ATTACHMENTSAPI = `${baseURI}lab-jobs/attachements`;
export const LOADFILEAPI = `${baseURI}medical-services/load/file`;
export const GETADDRESULT = `${baseURI}lab-jobs/test-component/get`;
export const UPDATEADDRESULT = `${baseURI}lab-jobs/test-component/update`;

//create Radiology Jobs
export const CREATERADIOLOGYJOB = `${baseURI}radiology-jobs/create`;
export const ALL_RADIOLOGY_JOBS = `${baseURI}radiology-jobs/all`;
export const UPDATERADIOLOGYJOBS = `${baseURI}radiology-jobs/update`;
export const RADIOLOGYJOBDOCUMENTS = `${baseURI}radiology-jobs/document`;
export const RADIOLOGYATTACHMENTSAPI = `${baseURI}radiology-jobs/attachements`;

// Insurance

export const GET_ALL_MARKETPLACE = `${baseURI}insurance/marketplace/all`;
export const ADD_MARKETPLACE = `${baseURI}insurance/marketplace/add`;
export const GET_ALL_INSURANCE_COMPANY = `${baseURI}insurance/company/all`;
export const ADD_INSURANCE_COMPANY = `${baseURI}insurance/company/add`;
export const GET_ALL_INSURANCE_PLAN = `${baseURI}insurance/plan/all`;
export const ALL_INSURANCE_PLAN = `${baseURI}insurance/plan/all`;
export const ADD_INSURANCE_PLAN = `${baseURI}insurance/plan/add`;
export const UPDATE_INSURANCE_DEPARTMENT = `${baseURI}insurance/plan/update`;
export const GET_MARKETPLACE = `${baseURI}insurance/marketplace/get`;
export const UPDATE_MARKETPLACE = `${baseURI}insurance/marketplace/update`;
export const GET_INSURANCE_COMPANY = `${baseURI}insurance/company/get`;
export const UPDATE_INSURANCE_COMPANY = `${baseURI}insurance/company/update`;
export const GET_INSURANCE_PLAN = `${baseURI}insurance/plan/get`;
export const UPDATE_INSURANCE_PLAN = `${baseURI}insurance/plan/update`;
export const GET_PLAN_ALL_SERVICE = `${baseURI}insurance/plan/all-srv`;
export const DELETE_MARKETLPLACE_ATTACHMENT = `${baseURI}insurance/marketplace/remove-image`;
export const DELETE_INSURANCE_COMPANY_ATTACHMENT = `${baseURI}insurance/company/remove-image`;
export const DELETE_INSURANCE_PLAN_ATTACHMENT = `${baseURI}insurance/plan/remove-image`;

// Lab-Invoice
export const GET_ALL_PATIENT_INSURANCE = `${baseURI}patient/all-ins`;
export const GET_ALL_SERVICES = `${baseURI}invoice/last`;
export const GET_PATIENT_SEARCH_DATA = `${baseURI}invoice/last`;
export const GET_PATIENT_INVOICE = `${baseURI}invoice`;
export const GET_LAB_TESTS = `${baseURI}lab/test/all`;
export const CREATE_NEW_INVOICE = `${baseURI}invoice`;
export const GET_ALL_DOCTORS = `${baseURI}doctor/get-all`;
export const LAB_SETTLED_INVOICE = `${baseURI}invoice/settled`;
export const LAB_INVOICE_PAYMENT = `${baseURI}invoice/payment`;

//Receiponist Receipt
export const GET_ALL_RECEIPT_PATIENT = `${baseURI}receipt/patient/getall`;
export const GET_ALL_PATIENT_OUTSTANDING_DATA = `${baseURI}receipt/patient/get`;
export const GET_PATIENT_ADVANCE_INVOICE_DATA = `${baseURI}receipt/advance/invoices/get`;
export const GET_PATIENT_REFUND_INVOICE_DATA = `${baseURI}receipt/refund/invoices/get`;
export const CREATE_RECEIPT_REFUND = `${baseURI}receipt/refund/create`;
export const UPDATE_RECEIPT_REFUND = `${baseURI}receipt/refund/update`;
export const CREATE_RECEIPT_ADVANCE = `${baseURI}receipt/advance/create`;
export const UPDATE_RECEIPT_ADVANCE = `${baseURI}receipt/advance/update`;
export const CREATE_RECEIPT_OUTSTANDING = `${baseURI}receipt/outstanding/create`;
export const UPDATE_RECEIPT_OUTSTANDING = `${baseURI}receipt/outstanding/update`;
export const GET_OUTSTANDING_INVOICE_DATA = `${baseURI}invoice/get`;
export const DELETE_OUTSTANDING_INVOICE_DATA = `${baseURI}invoice/delete/return`;

// invoice
export const GET_INVOICE_LAST = `${baseURI}invoice/last`;
export const GET_SETTLED_INVOICE = `${baseURI}invoice/settled`;
export const GENERATE_INVOICE = `${baseURI}invoice`;
export const ADD_PATIENT_INSURANCE_PLAN = `${baseURI}patient/all-ins`;
export const GENERATE_PAYMENT_LINK = `${baseURI}invoice/payment`;
// export const GENERATE_PAYMENT_LINK = `https://mc-api-dev.proactunited.com/api/v1/invoice/payment`;

export const GET_INVOICE_PAYMENT_MOBILE = `${baseURI}invoice/payment/mobile`;

// Request
export const ADD_PATIENT_REQUESTS_DATA = `${baseURI}lab-jobs/request/create`;
export const GET_TEST_NAME_BY_INSURANCE_NAME = `${baseURI}insurance/services/all`;
export const GET_ALL_LAB_TEST_DATA = `${baseURI}lab/test/all`;
export const GET_ALL_RADIOLOGY_TEST_DATA = `${baseURI}radiology/test/all`;

// ongoing claims

export const GET_ALL_ONGOING_CLAIMS_URL = `${baseURI}insurance/claim/all`;
export const CREATE_CLAIM_URL = `${baseURI}insurance/claim/add`;
export const UPDATE_CLAIM_URL = `${baseURI}insurance/claim/update`;

//services
export const GET_ALL_SERVICES_DATA = `${baseURI}medical-services/all`;
//services
export const GET_SERVICES_DATA = `${baseURI}treatment-service/all`;
export const GET_ACTIVE_SERVICES_DATA = `${baseURI}treatment-service/active`;
export const ADD_SERVICE_DATA = `${baseURI}treatment-service/create`;
export const UPDATE_SERVICE_DATA = `${baseURI}treatment-service/update`;
export const UPDATE_STATUS_SERVICE_DATA = `${baseURI}treatment-service/status-update`;

// Lab Request

export const GET_ALL_REQUESTS_DATA = `${baseURI}lab-jobs/request/getall`;
export const REQUEST_STATUS_CHANGE = `${baseURI}lab-jobs/request/status`;

// Insurance Patient EMR

export const CREATE_INSURANCE_PLAN = `${baseURI}patient/add-ins`;
export const GET_ALL_PATIENT_INSURANCE_PLAN = `${baseURI}patient/all-ins`;

// Lab

export const ALL_LAB_CATEGORY = `${baseURI}lab/category/all`;
export const GET_ALL_LAB_TEST_PROFILE = `${baseURI}lab/testprofile/all`;
export const CREATE_LAB_TEST_PROFILE = `${baseURI}lab/testprofile/create`;
export const EDIT_LAB_TEST_PROFILE = `${baseURI}lab/testprofile/update`;
export const GET_LAB_TEST_PROFILE = `${baseURI}lab/testprofile/get`;
export const GET_ALL_LAB_SAMPLE_TYPE = `${baseURI}lab/sample/all`;
export const GET_ALL_LAB_UNIT = `${baseURI}lab/unit/all`;
export const GET_ALL_LAB_COMPONENT = `${baseURI}lab/component/all`;
export const CREATE_LAB_TEST = `${baseURI}lab/test/create`;
export const EDIT_LAB_TEST = `${baseURI}lab/test/update`;
export const GET_LAB_TEST = `${baseURI}lab/test/get`;
export const GET_ALL_LAB_TEST = `${baseURI}lab/test/all`;
export const GET_PANDING_CLAIMS_URL = `${baseURI}insurance/claim/get-all`;
export const CREATE_LAB_COMPONENT = `${baseURI}lab/component/create`;
export const GET_LAB_COMPONENT = `${baseURI}lab/component/get`;
export const UPDATE_LAB_COMPONENT = `${baseURI}lab/component/update`;
export const DELETE_LAB_COMPONENT = `${baseURI}lab/component/status-update`;

// Radiology

export const ALL_RADIOLOGY_CATEGORY = `${baseURI}radiology/category/all`;
export const GET_ALL_RADIOLOGY_TEST = `${baseURI}radiology/test/all`;
export const CREATE_RADIOLOGY_TEST = `${baseURI}radiology/test/create`;
export const EDIT_RADIOLOGY_TEST = `${baseURI}radiology/test/update`;
export const GET_RADIOLOGY_TEST = `${baseURI}radiology/test/get`;
export const GET_ALL_RADIOLOGY_TEST_PROFILE = `${baseURI}radiology/profile/all`;
export const CREATE_RADIOLOGY_TEST_PROFILE = `${baseURI}radiology/profile/create`;
export const EDIT_RADIOLOGY_TEST_PROFILE = `${baseURI}radiology/profile/update`;
export const GET_RADIOLOGY_TEST_PROFILE = `${baseURI}radiology/profile/get`;

// Inventory

export const GET_ALL_INVENTORY_ITEM = `${baseURI}inventory/item/all`;
export const GET_ALL_INVENTORY_REQUEST = `${baseURI}inventory/request/all`;
export const CREATE_INVENTORY_REQUEST = `${baseURI}inventory/request/add`;
export const EDIT_INVENTORY_REQUEST = `${baseURI}inventory/request/update`;
export const DELETE_INVENTORY_REQUEST = `${baseURI}inventory/request/delete`;
export const GET_INVENTORY_REQUEST_BY_ID = `${baseURI}inventory/request/get`;
export const MARK_INVENTORY_REQUEST_AUTHORIZE = `${baseURI}inventory/request/mark`;
export const GET_INVENTORY_REQUEST_PDF = `${baseURI}inventory/request/get-pdf`;
export const EDIT_INVENTORY_REQUEST_ITEM = `${baseURI}inventory/request/update-item`;
export const DELETE_INVENTORY_REQUEST_ITEM = `${baseURI}inventory/request/delete-item`;
export const GET_INVENTORY_STORE = `${baseURI}inventory/store/get`;
export const UPDATE_INVENTORY_PO = `${baseURI}inventory/purchase-order/update`;

//Inventory Main Store

export const ADD_INVENTORY_PURCHASE_ORDER = `${baseURI}inventory/purchase-order/add`;
export const GET_Inventory_PURCHASE_ORDER_ALL = `${baseURI}inventory/purchase-order/all`;
export const ADD_INVENTORY_GRM = `${baseURI}inventory/grm/add`;
export const GET_Inventory_GRM_ALL = `${baseURI}inventory/grm/all`;
export const GET_Inventory_ITEM_WITHSTORE = `${baseURI}inventory/item/getWithStore`;
export const GET_ALL_REQUEST_INVENTORY_DATA = `${baseURI}inventory/request/branchstore/getall`;

export const CREATE_GRN_REQUEST = `${baseURI}inventory/grn/add`;
export const ADD_ISSUE_INVENTORY_DATA = `${baseURI}inventory/issue/add`;

//  Purchase-invoice

export const GET_ALL_SUPPLIER = `${baseURI}inventory/supplier/get`;
export const GET_ALL_GRN = `${baseURI}inventory/grn/all`;
export const CREATE_PURCHASE_INVOICE = `${baseURI}invoice`;
// Dental
export const GET_ALL_DENTAL_TREATMENT_SERVICE_URL = `${baseURI}dental/services`;
export const GET_ALL_DENTAL_TOOTH_URL = `${baseURI}dental/tooths`;

// Dental diagnosis
export const CREATE_DENTAL_DIAGNOSIS_URL = `${baseURI}dental/create`;
export const UPDATE_DENTAL_DIAGNOSIS_URL = `${baseURI}dental/update`;
export const DELETE_DENTAL_DIAGNOSIS_URL = `${baseURI}dental/delete-treatment`;
export const GET_DENTAL_DIAGNOSIS_BY_ID_URL = `${baseURI}dental/get`;
export const GET_PATIENT_DENTAL_DIAGNOSIS_BY_ID = `${baseURI}dental/getdata`;

export const ADD_PATIENT_DENTAL_PRESCRIPTION = `${baseURI}dental/add-patient-prescription`;
export const ADD_DENTAL_DIAGNOSIS_IMAGE = `${baseURI}dental/add-image`;
export const ADD_DENTAL_DIAGNOSIS_DOCUMENT = `${baseURI}dental/add-doc`;
export const GET_ALL_DENTAL_DIAGNOSIS_SCRIBE_NOTES = `${baseURI}dental/scribenotes/get`;
export const GET_ALL_DENTAL_DIAGNOSIS_SCRIBE_IMAGES = `${baseURI}dental/scribeimages/get`;
export const GET_PATIENT_DENTAL_INFO_URL = `${baseURI}dental/getdata`;
export const GET_PATIENT_DENTAL_DIAG_ATTACHMENTS_URL = `${baseURI}dental/getall`;
export const GET_PATIENT_DENTAL_HISTORY_URL = `${baseURI}dental/patient/history`;
export const GET_PATIENT_DENTAL_DIANGNOSIS_DETAIL_URL = `${baseURI}dental/get`;
export const GET_PATIENT_DENTAL_ATTACHMENTS_URL = `${baseURI}dental/getattachments`;
export const GET_PATIENT_DENTAL_IMAGES_URL = `${baseURI}dental/getimages`;
export const GET_ALL_PATIENT_DENTAL_HISTORY = `${baseURI}dental/pnt-histroy`;
export const GET_COMPARE_DENTAL_DOCUMENTS_URL = `${baseURI}dental/getcompare`;
export const GET_PATIENT_DENTAL_MEDICINE = `${baseURI}dental/pnt-medicine`;
export const DENTAL_MARK_STAGE = `${baseURI}dental/mark-stage`;

// master value
export const ADD_MASTER_VALUE = `${baseURI}master-value/add`;
export const GET_ALL_MASTER_VALUE = `${baseURI}master-value/all`;
export const STATUS_UPDATE = `${baseURI}master-value/status-update`;
export const MASTER_VALUE_UPDATE = `${baseURI}master-value/update`;

// inventory master table- admin
export const INVENTORY_MASTER_GET_ALL = `${baseURI}inventory/supplier/get/all`;
export const INVENTORY_MASTER_CREATE = `${baseURI}inventory/supplier`;
export const INVENTORY_MASTER_UPDATE = `${baseURI}inventory/supplier/update`;

// inventory item table- admin
export const INVENTORY_ITEM_GET_ALL = `${baseURI}inventory/item/all`
export const INVENTORY_ITEM_CREATE = `${baseURI}inventory/item/add`
export const INVENTORY_ITEM_UPDATE = `${baseURI}inventory/item/update`
export const INVENTORY_ITEM_UPDATE_STATUS = `${baseURI}inventory/item/update-status`

// Inventory Branch store
export const BRANCH_STORE_ISSUE = `${baseURI}inventory/issue/add`;
export const GET_BRANCH_STORE_ISSUE_DATA = `${baseURI}inventory/issue/all`;
export const GET_BRANCH_STORE_MAIN_STORE_REQUEST_DATA = `${baseURI}inventory/request/mainstore/getall`;
export const GET_MAIN_STORE_REQUEST_ITEMS_DATA = `${baseURI}inventory/request/mainstore/getitems`;
export const UPDATE_MAIN_STORE_REQUEST_ITEMS_DATA = `${baseURI}inventory/request/mainstore/updateitem`;
export const DELETE_MAIN_STORE_REQUEST_ITEMS_DATA = `${baseURI}inventory/request/mainstore/request/delete`;

// new user roles and permisssion

export const GET_USERS_PERMISSIONS_URL = `${baseURI}md/all-per`;
export const CREATE_SECONDARY_ROLE_URL = `${baseURI}role/create`;
export const GET_ALL_ROLE_URL = `${baseURI}role/create`;
export const CREATE_PERMISSIONS_URL = `${baseURI}pr/create`;
export const UPDATE_PERMISSIONS_URL = `${baseURI}pr/update`;
export const GET_PERMISSIONS_BY_ID_URL = `${baseURI}pr/all`;

// Unit Type Master

export const GET_INVENTORY_ITEM_UNITS = `${baseURI}inventory/item-unit/all`;
export const CREATE_INVENTORY_ITEM_UNIT = `${baseURI}inventory/item-unit`;
export const DELETE_INVENTORY_ITEM_UNIT = `${baseURI}inventory/item-unit/delete`;
export const EDIT_INVENTORY_ITEM_UNIT = `${baseURI}inventory/item-unit/update`;

// login
export const USER_LOGIN_TYPE = 'login/userLogin';
export const USER_FORGOT_PASSWORD_TYPE = 'login/userForgotpassword';
export const VERIFY_OTP_TYPE = 'login/userVerifyOtp';
export const RESET_PASSWORD_TYPE = 'login/userResetPassword';
export const RESEND_OTP_TYPE = 'login/userResendOtp';
export const USER_LOGOUT_TYPE = 'login/userLogout';
export const MASTER_VALUR_DATA_TYPE = 'login/getAllMasterValueData';
export const GET_SIDEBAR_TYPE = 'login/getSideBarData';

// branch
export const GET_ALL_BRANCH = 'branch/getAllBranch';
export const GET_ALL_BRANCH_DROPDOWNDATA = 'branch/getAllBranchDropdownData';
export const ADD_BRANCH = 'branch/addBranch';
export const GET_BRANCH_BY_ID = 'branch/getBranchById';
export const EDIT_BRANCH = 'branch/editBranch';
export const UPDATE_BRANCH_STATUS = 'branch/updateBranchStatus';
export const USER_LICENSE = 'branch/userLicense';
export const GET_DEFAULT_BRANCH = 'branch/getDefaultBranch';

//ward
export const GET_ALL_WARD = 'ward/getAllWard';
export const ADD_WARD = 'ward/addWards';
export const GET_WARD_BY_ID = 'ward/getWardById';
export const EDIT_WARD = 'ward/editWard';
export const UPDATE_WARD_STATUS = 'ward/updateWardStatus';

//room
export const GET_ALL_ROOM = 'room/getAllroom';
export const ADD_ROOM = 'room/addRooms';
export const GET_ROOM_BY_ID = 'room/getRoomById';
export const EDIT_ROOM = 'room/editRoom';
export const UPDATE_ROOM_STATUS = 'room/updateRoomStatus';

//bed

export const GET_ALL_BED = 'room/getAllbed';
export const ADD_BED = 'room/addBeds';
export const GET_BED_BY_ID = 'room/getBedById';
export const EDIT_BED = 'room/editBed';
export const UPDATE_BED_STATUS = 'room/updateBedStatus';

// department
export const GET_ALL_DEPARTMENT = 'department/getAllDepartment';
export const GET_ALL_DEPARTMENT_DROPDOWNDATA =
  'department/getAllDepartmentDropdownData';
export const ADD_DEPARTMENT = 'department/addDepartment';
export const GET_DEPARTMENT_BY_ID = 'department/getDepartmentById';
export const EDIT_DEPARTMENT = 'department/editDepartment';
export const UPDATE_DEPARTMENT_STATUS = 'department/updateDepartmentStatus';

// Modules
export const GET_ALL_MODULE = 'module/getAllModule';

// specialities
export const GET_ALL_SPECIALITIES = 'specialities/getAllSpecialities';
export const ADD_SPECIALITIES = 'specialities/addSpecialities';
export const GET_SPECIALITIES_BY_ID = 'specialities/getSpecialitiesById';
export const EDIT_SPECIALITIES = 'specialities/editSpecialities';
export const UPDATE_SPECIALITIES_STATUS =
  'specialities/updateSpecialitiesStatus';

// Mobile App Configuration
// Medical Center News
export const CREATE_MEDICAL_CENTER_NEWS =
  'mobileAppConfigSlice/createMedicalCenterNews';
export const GET_ALL_MEDICAL_CENTER_NEWS =
  'mobileAppConfigSlice/getMedicalCenterNews';
// Appointment Module
export const GET_ALL_APPOINTMENT = 'mobileAppConfigSlice/getallappointment';
export const CREATE_APPOINTMENT = 'mobileAppConfigSlice/createappointment';
export const EDIT_APPOINTMENT = 'mobileAppConfigSlice/editappointment';
export const UPDATE_STATUS_APPOINTMENT =
  'mobileAppConfigSlice/updatestatusappointment';

// Manage user Primary Form
export const GET_ALL_MANAGE_USER = 'manageUser/getAllManageUser';
export const UPDATE_STATUS_MANAGE_USER =
  'manageUser/updateStatusManageUserById';
export const GET_MANAGE_USER_BY_ID = 'manageUser/getManageUserById';
export const ADD_MANAGE_USER = 'manageUser/addManageUser';
export const EDIT_MANAGE_USER_TYPE = 'manageUser/editManageUserById';

// Manage user secondary
export const CREATE_USER_SHIFT_TYPE = 'manageUser/createShift';
export const UPDATE_USER_SHIFT_TYPE = 'manageUser/editShift';
export const GET_USER_SHIFT_BY_ID_TYPE = 'manageUser/getShiftByIds';
export const GET_ALL_MANAGE_USER_BY_ROLE_TYPE = 'manageUser/getAllUsersByRole';

// Master Table Category
export const GET_ALL_CATEGORY = 'masterTableManagementCategory/getALLCategory';
export const GET_CATEGORY_BY_ID =
  'masterTableManagementCategory/getALLCategoryById';
export const ADD_CATEGORY = 'masterTableManagementCategory/addCategory';
export const EDIT_CATEGORY = 'masterTableManagementCategory/editCategory';
export const UPDATE_STATUS_CATEGORY =
  'masterTableManagementCategory/updateStatusCategory';

// Master Table Category value
export const GET_ALL_CATEGORY_VALUE =
  'masterTableManagementCategory/getALLCategoryValue';
export const GET_CATEGORY_VALUE_BY_ID =
  'masterTableManagementCategory/getALLCategoryValueById';
export const ADD_CATEGORY_VALUE =
  'masterTableManagementCategory/addCategoryValue';
export const EDIT_CATEGORY_VALUE =
  'masterTableManagementCategory/editCategoryValue';
export const UPDATE_STATUS_CATEGORY_VALUE =
  'masterTableManagementCategory/updateStatusCategoryValue';

// manage Usergroup

export const CREATE_USERGROUP_TYPE = 'manageusergroup/createUsergroup';
export const GET_USERGROUP_TYPE = 'manageusergroup/getAllUserGroup';
export const UPDATE_USERGROUP_PERMISSION_TYPE =
  'manageusergroup/updateUsergroupPermission';
export const GER_USERGROUP_PERMISSION_TYPE =
  'manageusergroup/getUsergrouppermissionById';

export const UPDATE_USER_GROUP_STATUD_BY_ID_TYPE =
  'manageusergroup/updateStatusUserGroupId';

// patient activity log
export const GET_ALL_PATIENT_ACTIVITY_LOG =
  'patientActivityLog/getAllPatientActivityLog';
// Assign tags

export const GET_ALL_TAG = 'tag/getAllTag';

// patient

export const ASSIGN_TAG = 'patient/assignTag';
export const GET_ALL_ASSIGN_TAG = 'patient/getAllAssignTag';

export const GET_ALL_MEDICAL_TIMELINE = 'patient/getAllMedicalTimeline';
export const CREATE_MEDICAL_HISTORY = 'patient/createMedicalHistory';
export const GET_ALL_MEDICAL_HISTORY = 'patient/getAllMedicalHistory';
export const GET_RECENT_MEDICAL_HISTORY = 'patient/getRecentMedicalHistory';

// appointment

export const GET_ALL_TODAY_PATIENT_APPOINTMENT =
  'appointment/getAllTodayPatientAppointment';
export const GET_ALL_PATIENT_APPOINTMENT =
  'appointment/getAllPatientAppointment';
export const UPDATE_APPOINTMENT_STATUS = 'appointment/updateAppointmentStatus';
export const GET_APPOINTMENT_LOG = 'appointment/appointmentLog';
export const GET_APPOINTMENT_SUMMARY = 'appointment/appointmentSummary';

// mobile appointment request
export const GET_ALL_MOBILE_APPOINTMENT_REQUEST =
  'mobileappointmentrequest/getAllMobileAppointmentRequest';
export const GET_ALL_MOBILE_APPOINTMENT_REQUEST_CAlANDER =
  'mobileappointmentrequest/getAllMobileAppointmentCalander';
export const CHANGE_MOBILE_APPOINTMENT_STATUS =
  'mobileappointmentrequest/changeMobileAppointmentStatus';
export const CANCEL_APPOINTMENT = 'mobileappointmentrequest/cancelAppointment';
// receptionist

// export const SHARE_QUESTIONNAIRE_LINK = `receptionist/shareQuestionnaireLink`;
// export const QUESTIONNAIRE_OTP_SEND = `receptionist/questionnaireOtpSend`;
export const QUESTIONNAIRE_OTP_RESEND = `receptionist/questionnaireOtpReSend`;
// export const QUESTIONNAIRE_OTP_VERIFY = `receptionist/questionnaireOtpVerify`;
// export const SHARE_QUESTIONNAIRE_LINK = `receptionist/shareQuestionnaireLink`;

// MC news
export const GET_All_MC_NEWS = `receptionist/getAllMedicalCenterNews`;
export const GET_All_MC_NEWS_BY_ID = `receptionist/getAllMedicalCenterNewsById`;
// Doctor listst
export const GET_All_LIST_DOCTOR = `receptionist/getAllDoctorList`;
export const GET_All_DOCTOR_LIST_BY_ID = `receptionist/getAllDoctorListById`;
//Todo
export const GET_ALL_TODO_LIST = 'receptionist/getAllTodoList';
export const GET_ALL_TODO_LIST_BY_ID = 'receptionist/getAllTodoListById';
export const CREATE_TODO_LIST = 'receptionist/createTodoList';
export const UPDATE_TODO_LIST = 'receptionist/updateTodoList';
export const DELETE_TODO_LIST = 'receptionist/deleteTodoList';

// Patient EMR
export const GET_ALL_SELECTION_LIST = 'patient/getAllSelectionList';
export const GET_ALL_BRANCH_LIST = 'patient/getAllBranchList';
export const GET_ALL_PATIENT_LIST = 'patient/getAllPatientList';
export const GET_PATIENT_EMR_BY_ID = 'patient/getPatientEmrById';
export const CREATE_PATIENT_EMR = 'patient/createPatientEmr';
export const UPDATE_PATIENT_EMR = 'patient/updatePatientEmr';
export const DELETE_PATIENT_EMR = 'patient/deletePatientEmr';
export const SHARE_QUESTIONNAIRE_LINK = `receptionist/shareQuestionnaireLink`;
export const QUESTIONNAIRE_OTP_SEND = `receptionist/questionnaireOtpSend`;
export const QUESTIONNAIRE_OTP_VERIFY = `receptionist/questionnaireOtpVerify`;
export const CREATE_ADDTIONAL_FIELDS = 'patient/createAddtionalFields';
export const GET_PATIENT_ADDTIONAL_FIELDS = 'patient/getPatientAddtionalFields';

// Appointments
export const GET_ALL_DOCTORS_TYPE = `appoinments/getAllDoctors`;
export const GET_ALL_DOCTORS_APPOINTMENT_TYPE = `appoinments/getAllDoctorAppointments`;
export const GET_AVAILABLE_SLOTS_TYPE = `appoinments/getAvailableSlots`;
export const GET_RECURRING_AVAILABLE_SLOTS_TYPE = `appoinments/getRecurringAvailableSlots`;
export const BOOKING_CONFIRMATION_TYPE = `appoinments/bookingConfirmation`;

// role
export const GET__ROLE__USER = 'role/getUserRole';
export const UPDATE_ROLE_STATUS_TYPE = 'role/updateRoleStatus';

// Create New Form
export const GET_ALL_FORMS = 'createNewForm/getAllForms';
export const ADD_NEW_FORM = 'createNewForm/createNewForm';
export const GET_FORM_BY_ID = 'createNewForm/getFormById';
export const UPDATE_FORM_BY_ID = 'createNewForm/updateFormById';
export const DELETE_FORM_BY_ID = 'createNewForm/deleteFormById';
export const UPDATE_STATUS_FOR_FORM_BY_ID =
  'createNewForm/updateStatusForFormById';

// Doctor diagnosis
export const CREATE_DIAGNOSIS = 'createDiagnosis/createDiagnosis';
export const UPDATE_DIAGNOSIS = 'createDiagnosis/updateDiagnosis';
export const DIAGNOSIS_SEARCH_TAG = 'createDiagnosis/getDiagnosisSearchTag';
export const DIAGNOSIS_All_TAG = 'createDiagnosis/getDiagnosisAllTags';

// Treatment Plan
export const GET_ALL_TREATMENT_PLANS = 'treatmentPlan/getAllTreatmentPlans';
export const GET_ALL_TREATMENT_PLANS_TYPE =
  'treatmentPlan/getAllTreatmentPlansforPatient';
export const UPDATE_TREATMENT_PLANS_TYPE = 'treatmentPlan/updateTreatmentPlan';
export const CREATE_TREATMENT_PLAN = 'treatmentPlan/createTreatmentPlan';
export const GET_DIAGNOSIS_TREATMENT_PLAN =
  'treatmentPlan/getAllDiagnosisTreatmentPlans';
export const DELETE_ALL_DIAGNOSIS_TREATMENT_PLAN =
  'treatmentPlan/deleteDiagnosisTreatmentPlans';

export const GET_ALL_TREATMENT_PLANS_STATUS = `treatment-plan/status-update`;

export const CREATE_CUSTOM_TREATMENT_PLAN =
  'treatmentPlan/createCustomTreatmentPlan';
export const GET_ALL_TREATMENT_SERVICES =
  'treatmentPlan/getAllTreatmentServices';
export const CREATE_MASTER_PLAN_TYPE = 'treatmentPlan/createNewMasterPlan';
export const UPDATE_MASTER_PLAN_TYPE = 'treatmentPlan/updateMasterPlan';

// DOCTOR DASHBOARD
export const GET_ALL_DOCTOR_APPOINTMENT_LIST =
  'doctor/getAllDoctorAppointmentLists';
export const GET_ALL_TODO_REMINDER_LIST = 'doctor/getAllTodoReminderLists';

export const GET_ALL_MEDICINE_CATEGORY = `diagnosis/getAllMedicineCategory`;
export const GET_ALL_MEDICINE = `diagnosis/getAllMedicine`;
export const FIND_MEDICINE = `diagnosis/findMedicine`;
export const PATIENT_DIAGNOSIS_BY_ID = `diagnosis/patientDiagnosisById`;
export const ADD_PATIENT_PRESCRIPTION = `diagnosis/addPatientPrescription`;
export const REFERRAL_DIAGNOSIS = `diagnosis/add-patient-referral`;
export const GET_PATIENT_INFO_TYPE = `patientHistory/getPatientInformationById`;
export const CHANGE_PATIENT_DIAG_STATUS = `patientHistory/changePatientDiaogStatus`;
export const GET_PATIENT_DENTAL_INFO_TYPE = `patientHistory/getPatientDentalInformationById`;

export const ADD_DIAGNOSIS_IMAGE = `diagnosis/addDiagnosisImage`;
export const ADD_DIAGNOSIS_DOCUMENT = `diagnosis/addDiagnosisDocument`;
export const GET_ALL_DIAGNOSIS_SCRIBE_NOTES = `diagnosis/getDiagnosisScribeNotes`;
export const GET_ALL_DIAGNOSIS_SCRIBE_IMAGES = `diagnosis/getDiagnosisScribeImages`;

// App Notification

export const GET_ALL_NOTIFICATIONS_LIST =
  'notification/getAllTNotificationsList';
export const CREATE_APP_NOTIFICATION = 'notification/createAppNotification';
export const MARKREAD_APP_NOTIFICATION = 'notification/markReadAppNotification';
export const GET_TOKEN_STORE = 'notification/storeDeviceTokenNotification';

// Diagnosis
export const GET_PATIENT_HISTORY_TYPE = 'patientHistory/getPatientHistoryById';
export const GET_PATIENT_DIAG_ATTACHMENTS_TYPE =
  'patientHistory/getPatientHistoryDiagAttachments';

export const GET_PATIENT_DIAGNOSIS_DETAIL =
  'patientHistory/getPatientDiagnosisDetailById';
export const GET_PATIENT_ATTACHMENTS =
  'patientHistory/getPatientAttachmentsbyId';

export const GET_PATIENT_IMAGES = 'patientHistory/getPatientImagesbyId';
export const GET_ALL_COMPARE_DOCUMENTS_TYPE = `patientHistory/getCompareDocuments`;
export const GET_ALL_PATIENT_HISTORY = `diagnosis/getPatientHistory`;
export const GET_PATIENT_MEDICINE = `diagnosis/getPatientMedicine`;
export const MARK_STAGE = `diagnosis/markStage`;
export const GET_TAGGED_PATIENT = `diagnosis/taggedPatient`;
export const GET_TAGGED_PATIENT_FILTER_LIST = `diagnosis/taggedPatientFilter`;

export const GET_ALL_PATIENT_HISTORY_YEAR = `diagnosis/getPatientHistoryYear`;

//jobs
export const CREATE_JOBS_LAB_TYPE = 'jobs/createJobsAsyncData';
export const VIEW_JOBS_LAB_TYPE = 'jobs/ViewJobsAsyncData';
export const UPATE_LAB_JOBS_TYPE = 'job/UpdateLabJobsAsyncData';
export const DOCUMENT_LAB_JOBS = 'JOB/DocumentJobsAsyncData';
export const ATTACHMENTS_LAB_JOBS = 'JOB/AttachmentsJobsAsyncData';
export const LOAD_FILES_JOBS = 'JOB/LoadFilesAsyncData';
export const GETADDRESULTJOBS = 'JOB/GetAllAddResultData';
export const UPDATEADDRESULTJOBS = 'JOB/UpdateAllAddResultData';

//Radiology Jobs
export const RADIOLOGY_CREATE_JOBS_TYPE = 'jobs/createJobsAsyncData';
export const RADIOLOGY_VIEW_JOBS_TYPE = 'jobs/ViewJobsAsyncData';
export const RADIOLOGY_UPATE_JOBS_TYPE = 'job/UpdateLabJobsAsyncData';
export const RADIOLOGY_DOCUMENT_JOBS = 'JOB/DocumentJobsAsyncData';
export const RADIOLOGY_ATTACHMENTS_JOBS = 'JOB/AttachmentsJobsAsyncData';
export const RADIOLOGY_LOAD_FILES_JOBS = 'JOB/LoadFilesAsyncData';

// Insurance

export const GET_ALL_MARKETPLACE = 'insurance/getAllMarketplace';
export const ADD_MARKETPLACE = 'insurance/addMarketplace';
export const GET_ALL_INSURANCE_COMPANY = 'insurance/getAllInsuranceCompany';
export const ADD_INSURANCE_COMPANY = 'insurance/addInsuranceCompany';
export const GET_ALL_INSURANCE_PLAN = 'insurance/getAllInsurancePlan';
export const ALL_INSURANCE_PLAN = 'insurance/allInsurancePlan';
export const ADD_INSURANCE_PLAN = 'insurance/addInsurancePlan';
export const UPDATE_INSURANCE_DEPARTMENT =
  'insurance/updateInsurancePlanDepartment';

export const GET_MARKETPLACE = 'insurance/getMarketplace';
export const UPDATE_MARKETPLACE = 'insurance/updateMarketplace';
export const GET_INSURANCE_COMPANY = 'insurance/getInsuranceCompany';
export const UPDATE_INSURANCE_COMPANY = 'insurance/updateInsuranceCompany';
export const GET_INSURANCE_PLAN = 'insurance/getInsurancePlan';
export const UPDATE_INSURANCE_PLAN = 'insurance/updateInsurancePlan';
export const GET_PLAN_ALL_SERVICE = 'insurance/getAllPlanService';
export const DELETE_MARKETLPLACE_ATTACHMENT =
  'insurance/deleteMarketplaceAttachment';
export const DELETE_INSURANCE_COMPANY_ATTACHMENT =
  'insurance/deleteInsuranceCompanyAttachment';
export const DELETE_INSURANCE_PLAN_ATTACHMENT =
  'insurance/deleteInsurancePlanAttachment';

// Lab Invoice

export const GET_ALL_PATIENT_INSURANCE = 'insurance/getAllPatientInsurance';
export const GET_ALL_SERVICES = 'services/getPatientAllServices';
export const GET_ALL_DOCTORS = 'primaryDoctors/getAllPrimaryDoctors';
export const GET_PATIENT_SEARCH_DATA = 'patientInfo/getPatientSearchdata';
export const LAB_SETTLED_INVOICE = `settledInvoice/labSettledInvoice`;
export const GET_PATIENT_INVOICE = 'invoice/getpatientInvoice';
export const GET_LAB_TESTS = 'labTest/getAllLabTestes';
export const CREATE_NEW_INVOICE = 'newInvoice/createAndUpdateInvoice';
export const INVOICE_PAYMENT_DETAILS = 'payment/invoicePaymentDetails';

// Receptionist Receipt
export const GET_ALL_PATIENT_RECEIPT_TYPE = `receipt/getAllReceiptPatient`;
export const GET_RECEIPT_PATIENT_OUTSTANDING_TYPE = `receipt/getAllReceiptPatientOutstandingData`;
export const GET_PATIENT_ADVANCE_INVOICE_TYPE = `receipt/getPatientAdvanceInvoiceData`;
export const GET_PATIENT_REFUND_INVOICE_TYPE = `receipt/getPatientRefundInvoiceData`;
export const GET_ALL_TREATMENT_SERVICES_URL = 'insurance/getDepartmentService';
export const CREATE_RECEIPT_REFUND_TYPE = `receipt/createReceiptRefund`;
export const UPDATE_RECEIPT_REFUND_TYPE = `receipt/updateReceiptRefund`;
export const CREATE_RECEIPT_ADVANCE_TYPE = `receipt/createReceiptAdvance`;
export const UPDATE_RECEIPT_ADVANCE_TYPE = `receipt/updateReceiptAdvance`;
export const CREATE_RECEIPT_OUTSTANDING_TYPE = `receipt/createReceiptOutStanding`;
export const UPDATE_RECEIPT_OUTSTANDING_TYPE = `receipt/updateReceiptOutStanding`;
export const GET_OUTSTANDING_INVOICE_TYPE = `receipt/getOutstandingInvoiceData`;
export const DELETE_OUTSTANDING_INVOICE_TYPE = `receipt/deleteOutstandingInvoiceData`;

// invoice Module
export const GET_INVOICE = 'invoice/getLastInvoice';
export const GET_SETTLED_INVOICE_LIST = 'invoice/getSettledInvoiceList';
export const GENERATE_PATIENT_INVOICE = 'invoice/createInvoice';
export const GET_PATIENT_INSURANCE_PLAN_LIST =
  'invoice/patientInsurancePlanList';
export const GET_GENERATE_UPAY_LINK = 'invoice/getGenerateUpayLink';
export const GET_iNVOICE_ONLINE_PAYMENT = 'invoice/getInvoiceOnlinePayment';

//doctor request
export const ADD_PATIENT_REQUESTS_TYPE = 'request/addPatientReqeusts';
export const GET_LAB_TESTS_TYPE = 'request/getAllLabTests';
export const GET_RADIOLOGY_TESTS_TYPE = 'request/getAllRadiologyTests';
export const GET_PATIENT_INSURANCE_PLANS_TYPE =
  'request/getPatientInsurancePlans';
export const GET_TEST_NAME_BY_INSURANCE_NAME_TYPE =
  'request/getTestNameByInsuranceName';

// onoing claims
export const GET_ALL_ONGOING_CLAIMS_TYPE = 'ongoing-claims/getAllOngoingClaims';
export const GET_CLAIMS_BY_MARKET_PLACE_TYPE =
  'ongoing-claims/getClaimsByMarketPlace';

// services
export const GET_ALL_SERVICES_DATA = 'services/AllServicesData';
export const GET_ALL_ACTIVE_SERVICES_DATA = 'services/AllActiveServicesData';
// lab request
export const GET_ALL_LAB_REQUESTS_TYPE = 'lab-request/getAllLabReqeusts';
export const CHANGE_LAB_REQUESTS_STATUS_TYPE = 'lab-request/changeLabJobStatus';

// radiology request
export const GET_ALL_RADIOLOGY_REQUESTS_TYPE =
  'radiology-request/getAllRadiologyReqeusts';
export const CHANGE_RADIOLOGY_REQUESTS_STATUS_TYPE =
  'radiology-request/changeRadiologyJobStatus';
// Insurance Patient EMR

export const CREATE_INSURANCE_PLAN = 'patient/createInsurancePlan';
export const GET_ALL_PATIENT_INSURANCE_PLAN =
  'patient/getAllPatientInsurancePlan';

// lab

export const ALL_LAB_CATEGORY = 'lab/getAllCategory';
export const GET_ALL_LAB_TEST_PROFILE = 'lab/getAllLabTestProfile';
export const CREATE_LAB_TEST_PROFILE = 'lab/createLabTestProfile';
export const EDIT_LAB_TEST_PROFILE = 'lab/editLabTestProfile';
export const GET_LAB_TEST_PROFILE = 'lab/getLabTestProfile';
export const GET_ALL_LAB_SAMPLE_TYPE = 'lab/getAllLabSampleType';
export const GET_ALL_LAB_UNIT = 'lab/getAllLabUnit';
export const GET_ALL_LAB_COMPONENT = 'lab/getAllLabComponent';
export const CREATE_LAB_TEST = 'lab/createLabTest';
export const EDIT_LAB_TEST = 'lab/editLabTest';
export const GET_LAB_TEST = 'lab/getLabTest';
export const GET_ALL_LAB_TEST = 'lab/getAllLabTest';
export const GET_PANDING_CLAIMS_TYPE = 'ongoing-claims/getPandingClaims';
export const CREATE_LAB_COMPONENT = 'lab/createComponent';
export const GET_LAB_COMPONENT = 'lab/getComponent';
export const UPDATE_LAB_COMPONENT = 'lab/updateComponent';
export const DELETE_LAB_COMPONENT = 'lab/deleteComponent';

// Radiology

export const ALL_RADIOLOGY_CATEGORY = 'radiology/getAllRadiologyCategory';
export const GET_ALL_RADIOLOGY_TEST = 'radiology/getAllRadiologyTest';
export const CREATE_RADIOLOGY_TEST = 'radiology/createRadiologyTest';
export const EDIT_RADIOLOGY_TEST = 'radiology/editRadiologyTest';
export const GET_RADIOLOGY_TEST = 'radiology/getRadiologyTest';
export const GET_ALL_RADIOLOGY_TEST_PROFILE =
  'radiology/getAllRadiologyTestProfile';
export const CREATE_RADIOLOGY_TEST_PROFILE =
  'radiology/createRadiologyTestProfile';
export const EDIT_RADIOLOGY_TEST_PROFILE = 'radiology/editRadiologyTestProfile';
export const GET_RADIOLOGY_TEST_PROFILE = 'radiology/getRadiologyTestProfile';
export const CREATE_CLAIM_TYPE = 'ongoing-claims/createnewclaim';
export const CREATE_SETTLED_CLAIM_TYPE = 'ongoing-claims/createSetteledClaims';

// Dental
export const GET_ALL_LIST_DENTIST = 'receptionist/getAllDentistList';
export const GET_ALL_DENTIST_APPOINTMENT_LIST =
  'dentist/getAllDentistAppointmentLists';
export const GET_ALL_DENTAL_TREATMENT_SERVICES = 'dental/services';
export const GET_ALL_DENTAL_TREATMENT_SERVICES_BY_PARENT_ID =
  'dental/services_by_parent_id';
export const GET_ALL_DENTAL_TOOTH = 'dental/tooths';

// Dental diagnosis
export const CREATE_DENTAL_DIAGNOSIS = 'dentalDiagnosis/createDentalDiagnosis';
export const UPDATE_DENTAL_DIAGNOSIS = 'dentalDiagnosis/updateDentalDiagnosis';
export const DELETE_DENTAL_DIAGNOSIS_ENTRY =
  'dentalDiagnosis/deleteDentalDiagnosis';
export const GET_DENTAL_DIAGNOSIS = 'dentalDiagnosis/getDentalDiagnosis';
export const PATIENT_DENTAL_DIAGNOSIS_BY_ID = `dentalDiagnosis/patientDiagnosisById`;
export const ADD_DENTAL_PATIENT_PRESCRIPTION = `dentalDiagnosis/addPatientPrescription`;
export const REFERRAL_DENTAL_DIAGNOSIS = `dentalDiagnosis/add-patient-referral`;
export const ADD_DENTAL_DIAGNOSIS_IMAGE = `dentalDiagnosis/addDiagnosisImage`;
export const ADD_DENTAL_DIAGNOSIS_DOCUMENT = `dentalDiagnosis/addDiagnosisDocument`;
export const GET_ALL_DENTAL_DIAGNOSIS_SCRIBE_NOTES = `dentalDiagnosis/getDiagnosisScribeNotes`;
export const GET_ALL_DENTAL_DIAGNOSIS_SCRIBE_IMAGES = `dentalDiagnosis/getDiagnosisScribeImages`;
export const DENTAL_MARK_STAGE = `dentalDiagnosis/markStage`;

// master value
export const ADD_MASTER_VALUE_TYPE = 'masterValueSlice/addAllMasterValue';
export const GET_ALL_MASTER_VALUE_TYPE = 'masterValueSlice/getAllMasterValue';
export const UPDATE_STATUS_TYPE = 'masterValueSlice/updateStatusValue';
export const UPDATE_MASTER_VALUE_TYPE = 'masterValueSlice/updatMasterValue';

// addServiceData
export const ALL_SERVICE_DATA = 'services/addServiceData';
export const UPDATE_SERVICE_DATA = 'services/updateServiceData';
export const STATUS_UPDATE_SERVICE_DATA = 'services/updateStatusServiceData';

// roles and permissions new development

export const GET_ALL_PERMISSIONS_TYPE = 'permissions/getAllEmptyPermissions';

export const CREATE_USER_ROLE_TYPE = 'permissions/createUserRole';
export const GET_ALL_USER_ROLES_TYPE = 'permissions/getAllRoles';
export const CREATE_PERMISSIONS_TYPE = 'permissions/createPermissions';
export const UPDATE_PERMISSIONS_TYPE = 'permissions/updatePermissions';
export const GET_PERMISSIONS_BY_ID_TYPE = 'permissions/getAllPermissionsById';

export const GET_ALL_INVENTORY_REQUEST = 'inventory/getAllRequest';
export const CREATE_INVENTORY_REQUEST = 'inventory/createRequest';
export const EDIT_INVENTORY_REQUEST = 'inventory/updateRequest';
export const DELETE_INVENTORY_REQUEST = 'inventory/deleteRequest';
export const GET_INVENTORY_REQUEST_BY_ID = 'inventory/getRequest';
export const MARK_INVENTORY_REQUEST_AUTHORIZE =
  'inventory/markRequestAuthorize';
export const GET_INVENTORY_REQUEST_PDF = 'inventory/getRequestPdf';
export const EDIT_INVENTORY_REQUEST_ITEM = 'inventory/updateRequestItem';
export const DELETE_INVENTORY_REQUEST_ITEM = 'inventory/deleteRequestItem';
export const GET_INVENTORY_STORE = 'inventory/getInventoryStore';

//Inventory MainStore

export const ADD_INVENTORY_PO = 'inventory/addInventoryAddPo';
export const GET_INVENTORY_PO = 'inventory/getInventoryAllPo';
export const GET_ITEM_FROM_STORE = 'inventory/getItemFromStore';
export const GET_INVENTORY_REQUEST_DATA =
  'inventory/getInventoryRequestDataAll';
export const ADD_INVENTORY_ISSUE = 'inventory/addInventoryIssueDataAll';
export const GET_ALL_PO_DATA = 'inventory/purchase-order/all';
export const GET_ALL_SUPPLIERS_DATA = 'inventory/supplier/get';
export const ADD_GRN = 'inventory/grnAdd';
export const UPDATE_PO = 'inventory/poInventoryUpdate';

// Purchase-Invoice

export const GET_ALL_SUPPLIER = 'inventory/getSupplierDetails';
export const GET_ALL_Grn = 'inventory/getGrn';

// master value
// export const ADD_MASTER_VALUE_TYPE = 'masterValueSlice/addAllMasterValue';
// export const GET_ALL_MASTER_VALUE_TYPE = 'masterValueSlice/getAllMasterValue';
// export const UPDATE_STATUS_TYPE = 'masterValueSlice/updateStatusValue';
// export const UPDATE_MASTER_VALUE_TYPE = 'masterValueSlice/updatMasterValue';

//Inventory BranchStore
export const GET_ALL_BRANCH_STORE_REQUEST_DATA =
  'branchStore/getAllBranchStoreRequestData';
export const ADD_BRANCH_STORE_ISSUE_DATA = 'branchStore/branchStoreIssueData';
export const GET_BRANCH_STORE_ISSUE_TYPE =
  'branchStore/getBranchStoreIssueData';

// addServiceData
// export const ALL_SERVICE_DATA = 'services/addServiceData';
// export const UPDATE_SERVICE_DATA = 'services/updateServiceData';
// export const STATUS_UPDATE_SERVICE_DATA = 'services/updateStatusServiceData';

// inventory master table- admin
export const GET_ALL_INVENTORY_MASTER = 'inventoryMaster/getAllInventoryMaster';
export const CREATE_INVENTORY_MASTER_TABLE =
  'inventoryMaster/createInventoryMaster';
export const UPDATE_INVENTORY_MASTER_TABLE =
  'inventoryMaster/updateInventoryMaster';

// inventory item table- admin
export const GET_ALL_INVENTORY_ITEM = 'inventoryItem/getAllInventoryItem';
export const CREATE_INVENTORY_ITEM_TABLE = 'inventoryItem/createInventoryItem';
export const UPDATE_INVENTORY_ITEM_TABLE = 'inventoryItem/updateInventoryItem';
export const UPDATE_STATUS_INVENTORY_ITEM_TABLE = 'inventoryItem/updateStatusInventoryItem';

export const CREATE_PURCHASE_INVOICE = 'inventory/invoice';

export const GET_BRANCH_STORE_MAIN_STORE_REQUEST_TYPE =
  'branchStore/getBranchStoreMainStoreRequestData';
export const GET_MAIN_STORE_REQUEST_ITEMS_TYPE =
  'branchStore/getMainStoreRequestItemsData';
export const UPDATE_MAIN_STORE_REQUEST_ITEMS_TYPE =
  'branchStore/updateMainStoreRequestItemsData';
export const DELETE_MAIN_STORE_REQUEST_ITEMS_TYPE =
  'branchStore/deleteMainStoreRequestItemsData';

export const GET_ALL_UNITS = 'inventory/allUnits';
export const GET_INVENTORY_ITEM_UNIT = 'inventory/addedUnits';
export const CREATE_INVENTORY_ITEM_UNIT = 'inventory/UnitsItem/create';
export const DELETE_INVENTORY_ITEM_UNIT = 'inventory/UnitItem/delete';
export const EDIT_INVENTORY_ITEM_UNIT = 'inventory/UnitItem/edit';

import { combineReducers } from '@reduxjs/toolkit';
import toastReducer, {
  initialState as toastIntialState,
} from '../features/toast/toastSlice';
import loginReducer, {
  initialState as loginIntialState,
} from '../features/login/loginSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import branchReducer, {
  initialState as branchIntialState,
} from '../features/branch/branchSlice';
import departmentReducer, {
  initialState as departmentIntialState,
} from '../features/department/departmentSlice';
import specialityReducer, {
  initialState as specialityIntialState,
} from '../features/specialities/specialitiesSlice';
import mobileAppConfigReducer, {
  initialState as mobileAppConfigIntialState,
} from '../features/mobile_app_configuration/mobileAppConfigurationSlice';
import manageUserReducer, {
  initialState as manageUserIntialState,
} from '../features/manage-user/ManageUserSlice';
import masterTableCategoryReducer, {
  initialState as masterTableCategoryIntialState,
} from '../features/master-table-category/MasterTableCategorySlice';
import manageUsergroupReducer, {
  initialState as manageUsergroupIntialState,
} from '../features/manage-usergroup/mangeUsergroupSlice';
import patinetActivityLogReducer, {
  initialState as patinetActivityIntialState,
} from '../features/patient_activity_log/patientActivityLogSlice';
import tagReducer, {
  initialState as tagIntialState,
} from '../features/patient-emr/tag/tagSlice';
import patientReducer, {
  initialState as patientIntialState,
} from '../features/patient-emr/patient/patientSlice';
import mobileAppointmentRequestReducer, {
  initialState as mobileAppointmentRequestIntialState,
} from '../features/mobile-appointment-request/mobileAppointmentRequestSlice';
import receptionistReducer, {
  initialState as receptionistIntialState,
} from '../features/receptionist/receptionistSlice';
import appointmentReducer, {
  initialState as appointmentIntialState,
} from '../features/appointment/appointmentSlice';
import bookingAppointmentRequestReducer, {
  initialState as bookingAppointmentIntialState,
} from '../features/appointments/bookingAppointmentsSlice';
import chatReducer, {
  initialState as chatIntialState,
} from '../features/chat/chatSlice';
import roleUserReducer, {
  initialState as roleUserIntialState,
} from '../features/role/roleSlice';
import treatmentPlansReducer, {
  initialState as treatmentIntialState,
} from '../features/treatmentPlans/treatmentPlansSlice';
import doctorDashboardReducer, {
  initialState as doctorDashboardIntialState,
} from '../features/doctor-dashboard/doctorDashboardSlice';
import diagnosisReducer, {
  initialState as diagnosisIntialState,
} from '../features/diagnosis/diagnosisSlice';
import createNewFormReducer, {
  initialState as createNewFormIntialState,
} from '../features/create-new-form/createNewFormSlice';
import referralReducer, {
  initialState as referralIntialState,
} from '../features/referral/referralSlice';
import notificationReducer, {
  initialState as notificationIntialState,
} from '../features/app-notifications/appNotificationSlice';
import patientHistoryReducer, {
  initialState as patientHistoryIntialState,
} from '../features/patient-history/patientHistorySlice';
import doctorDiagnosisReducer, {
  initialState as doctorDiagnosisIntialState,
} from '../features/doctor-diagnosis/doctorDiagnosisSlice';
import insuranceReducer, {
  initialState as insuranceIntialState,
} from '../features/insurance/insuranceSlice';
import receiptReducer, {
  initialState as receiptIntialState,
} from '../features/receipt/receiptSlice';
import requestReducer, {
  initialState as requestIntialState,
} from '../features/request/requestSlice';
import invoiceReducer, {
  initialState as invoiceIntialState,
} from '../features/invoice-module/invoiceSlice';
import labRequestReducer, {
  initialState as labRequestIntialState,
} from '../features/lab-request/labRequestSlice';
import radiologyRequestReducer, {
  initialState as radiologyRequestIntialState,
} from '../features/radiology-request/radiologyRequestSlice';
import createLabReducer, {
  initialState as createLabIntialState,
} from '../features/jobs/jobsSlice';
import ongoingClaimsReducer, {
  initialState as ongoingClaimsIntialState,
} from '../features/ongoing-claims/onGoingClaimsSlice';
import labInvoiceReducer, {
  initialState as labInvoiceIntialState,
} from '../features/lab-invoice/labInvoiceSlice';
import labReducer, {
  initialState as labIntialState,
} from '../features/lab/labSlice';
import radiologyJobs, {
  initialState as radiologyJobsIntialState,
} from '../features/radiology-jobs/jobsSlice';
import radiologyReducer, {
  initialState as radiologyIntialState,
} from '../features/radiology/radiologySlice';
import inventoryRequestReducer, {
  initialState as inventoryRequestIntialState,
} from '../features/inventory-request/inventoryRequestSlice';
import inventoryPurchaseInvoice, {
  initialState as inventoryPurchaseInvoiceIntialState,
} from '../features/purchase-invoice/purchaseInvoiceSlice';
import branchStoreReducer, {
  initialState as branchStoreInitialState,
} from '../features/branch-store/branchStoreSlice';
import masterValueReducer, {
  initialState as masterValueInitialState,
} from '../features/master-value/MasterValueSlice';
import serviceReducer, {
  initialState as servicesInitialState,
} from '../features/patientservices/servicesSlice';

import inventoryMasterReducer, {
  initialState as inventoryMasterInitialState,
} from '../features/inventory-master/inventoryMasterSlice';

import inventoryItemReducer, {
  initialState as inventoryItemInitialState,
} from '../features/inventory-item/inventoryItemSlice';

// import branchStoreReducer from '../features/branch-store/branchStoreSlice';
// import masterValueReducer from '../features/master-value/MasterValueSlice'
// import serviceReducer from '../features/patientservices/servicesSlice'
import rolesPermissionsReducer, {
  initialState as permissionsInitialState,
} from '../features/user-roles-permissions/rolesPermissionsSlice';
import dentistDashboardReducer, {
  initialState as dentistDashboardIntialState,
} from '../features/dentist-dashboard/dentistDashboardSlice';
import dentistDiagnosisReducer, {
  initialState as dentistDiagnosisIntialState,
} from '../features/dentist-diagnosis/dentistDiagnosisSlice';
import unitTypeReducer, {
  initialState as unitTypeIntialState,
} from '../features/unit-type/unitTypeSlice';
import wardTypeReducer, {
  initialState as wardInitialState,
} from '../features/ward/wardSlice';
import roomTypeReducer, {
  initialState as roomInitialState,
} from '../features/room/roomSlice';
import bedTypeReducer, {
  initialState as bedInitialState,
} from '../features/bed/bedSlice';

const persistConfig = {
  storage,
  key: 'proact-user',
  whitelist: [
    'userData',
    'encryptionKey',
    'isLoggedin',
    'branchData',
    'firebaseToken',
    'masterValueData',
    'colorSchemeList',
    'activeRole',
    'sidebarData',
  ],
};

const peristedLoginReducer = persistReducer(persistConfig, loginReducer);

const rootReducer: any = (state: any, action: any) => {
  if (action.type === 'RESET_STATE') {
    // Clear the persisted state
    state = {
      toast: toastIntialState,
      // login: loginIntialState,
      branch: branchIntialState,
      department: departmentIntialState,
      speciality: specialityIntialState,
      mobileAppConfig: mobileAppConfigIntialState,
      manageUser: manageUserIntialState,
      usergroup: manageUsergroupIntialState,
      patientActivityLog: patinetActivityIntialState,
      tag: tagIntialState,
      patient: patientIntialState,
      receptionist: receptionistIntialState,
      masterTableCategory: masterTableCategoryIntialState,
      appointment: appointmentIntialState,
      mobileAppointmentRequest: mobileAppointmentRequestIntialState,
      appointments: bookingAppointmentIntialState,
      roleUser: roleUserIntialState,
      chat: chatIntialState,
      treatmentPlans: treatmentIntialState,
      createNewForm: createNewFormIntialState,
      doctor: doctorDashboardIntialState,
      diagnosis: diagnosisIntialState,
      referral: referralIntialState,
      notifications: notificationIntialState,
      patientHistory: patientHistoryIntialState,
      doctorDiagnosis: doctorDiagnosisIntialState,
      labsJob: createLabIntialState,
      insurance: insuranceIntialState,
      labInvoice: labInvoiceIntialState,
      receipt: receiptIntialState,
      invoice: invoiceIntialState,
      request: requestIntialState,
      ongoingClaims: ongoingClaimsIntialState,
      labRequests: labRequestIntialState,
      radiolgyRequests: radiologyRequestIntialState,
      lab: labIntialState,
      radiologyJobs: radiologyJobsIntialState,
      radiology: radiologyIntialState,
      inventoryRequest: inventoryRequestIntialState,
      purchaseInvoice: inventoryPurchaseInvoiceIntialState,
      branchStore: branchStoreInitialState,
      masterValue: masterValueInitialState,
      services: servicesInitialState,
      inventoryMaster: inventoryMasterInitialState,
      inventoryItem: inventoryItemInitialState,
      permission: permissionsInitialState,
      dentist: dentistDashboardIntialState,
      dentistDiagnosis: dentistDiagnosisIntialState,
      unitTypeMaster: unitTypeIntialState,
      ward: wardInitialState,
      room: roomInitialState,
      bed: bedInitialState,
    };
  }

  return combineReducers({
    toast: toastReducer,
    login: peristedLoginReducer,
    branch: branchReducer,
    department: departmentReducer,
    speciality: specialityReducer,
    mobileAppConfig: mobileAppConfigReducer,
    manageUser: manageUserReducer,
    usergroup: manageUsergroupReducer,
    patientActivityLog: patinetActivityLogReducer,
    tag: tagReducer,
    patient: patientReducer,
    receptionist: receptionistReducer,
    masterTableCategory: masterTableCategoryReducer,
    appointment: appointmentReducer,
    mobileAppointmentRequest: mobileAppointmentRequestReducer,
    appointments: bookingAppointmentRequestReducer,
    roleUser: roleUserReducer,
    chat: chatReducer,
    treatmentPlans: treatmentPlansReducer,
    createNewForm: createNewFormReducer,
    doctor: doctorDashboardReducer,
    diagnosis: diagnosisReducer,
    referral: referralReducer,
    notifications: notificationReducer,
    patientHistory: patientHistoryReducer,
    doctorDiagnosis: doctorDiagnosisReducer,
    labsJob: createLabReducer,
    insurance: insuranceReducer,
    labInvoice: labInvoiceReducer,
    receipt: receiptReducer,
    invoice: invoiceReducer,
    request: requestReducer,
    ongoingClaims: ongoingClaimsReducer,
    labRequests: labRequestReducer,
    radiolgyRequests: radiologyRequestReducer,
    lab: labReducer,
    radiologyJobs: radiologyJobs,
    radiology: radiologyReducer,
    inventoryRequest: inventoryRequestReducer,
    purchaseInvoice: inventoryPurchaseInvoice,
    branchStore: branchStoreReducer,
    masterValue: masterValueReducer,
    services: serviceReducer,
    permission: rolesPermissionsReducer,
    dentist: dentistDashboardReducer,
    dentistDiagnosis: dentistDiagnosisReducer,
    unitTypeMaster: unitTypeReducer,
    ward: wardTypeReducer,
    room: roomTypeReducer,
    bed: bedTypeReducer,
    inventoryMaster: inventoryMasterReducer,
    inventoryItem: inventoryItemReducer
  })(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

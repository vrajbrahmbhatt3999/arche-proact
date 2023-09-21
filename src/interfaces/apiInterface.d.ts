import { password, email } from '../constants/constant';
export interface IAPIPayload {
  payloadData?: any;
  sessionId?: string | false;
  appChannelId?: number;
}
export interface IAPIResponse {
  dk: string;
  payloadResponse: {
    sc: number;
    data: any[];
  };
  rc: 0 | 1;
}
export interface ILoginState {
  loading: boolean;
  userData: ILoginPayload;
  encryptionKey: string | null;
  isLoggedin: boolean;
  otpRequestId: string;
  resetPWDToken: string;
  isOtpVerified: boolean;
  otpAttempt: number;
  branchData: [];
  firebaseToken: any;
  error: any;
  masterValueData: any;
  colorSchemeList: any;
  activeRole: any;
  sidebarData: any[];
}

export interface IBranch {
  isLoading: boolean;
  branchData: [];
  allBranchDropDownData: [];
  branchInfo: {};
  branchlistInfo: {};
  userLicenseInfo: {};
  error: any;
}

export interface IWard {
  isLoading: boolean;
  wardData: [];
  wardInfo: {};
  wardlistInfo: {};
  error: any;
}

export interface IRoom {
  isLoading: boolean;
  roomData: [];
  roomInfo: {};
  roomlistInfo: {};
  error: any;
}
export interface IBed {
  isLoading: boolean;
  bedData: [];
  bedInfo: {};
  bedlistInfo: {};
  error: any;
}

export interface IDepartment {
  isLoading: boolean;
  departmentData: [];
  departmentDropdownData: [];
  departmentInfo: {};
  departmentlistInfo: {};
  error: any;
}

export interface ITreatmentPlan {
  isLoading: boolean;
  treatmentPlanTableData: any;
  newTreatmentPlanDialogTableData: any;
  newTreatmentPlanDialogPriceAndDiscountDetails: any;
  error: any;
  isCalculatorDialogOpen: boolean;
  serviceListData: [];
  serviceListObject: {};
  selectedServiceList: [];
  allTreatmentPlanForDiagnosis: any[];
  predefinedPlanData: any[];
  getAllDiagnosisTreatmentPlan: any[];
  ongoingTreatmentPlanPopup: boolean;
  TreatmentStatus: any[];
  selectedServicesForPlan: any[];
  isStatusValueUpdated: boolean;
}

export interface ISpecialities {
  isLoading: boolean;
  specialityData: [];
  specialityInfo: {};
  error: any;
}

export interface IMobileAppConfigSlice {
  isLoading: boolean;
  medicalCenterNewsData: [];
  allAppointmentsData: [];
  getAllAppointPaylod: {};
  error: any;
}

// manage user
export interface IManageUserPrimary {
  isLoading: boolean;
  primaryUserData: {};
  allUsersData: [];
  userDetail: {};
  userId: string;
  shiftData: {};
  shiftEdit: boolean;
  error: any;
  isSecondayActive: boolean;
  isStatusUpdated: boolean;
  editUserData: {};
  userDataByRole: any[];
}

// masterTable category
export interface IMasterTableCategory {
  isLoading: boolean;
  masterCategoryData: [];
  masterCategoryDataById: {};
  masterCategoryValueData: [];
  isStatusUpdated: boolean;
  masterCategoryValueDataById: {};
  error: any;
  isStatusValueUpdated: boolean;
}

export interface ITag {
  loadingTag: boolean;
  tagData: [];
  error: any;
}

export interface IPatient {
  isLoading: boolean;
  assignTagInfo: {};
  assignTagInfoData: [];
  todayAppointmentData: [];
  todayAppointmentDoctorData: [];
  timelineData: [];
  medicalHistoryInfo: {};
  medicalHistoryData: [];
  appointmentData: [];
  patientListData: [];
  patientListDataObject: {};
  patientDataObjectById: {};
  nationalityData: [];
  bloodGroupData: [];
  sourceData: [];
  maritalStatusData: [];
  patientBranchList: {};
  error: any;
  // isLoading: boolean;
  // assignTagInfo: {};
  // todayAppointmentData: [];
  // todayAppointmentDoctorData: [];
  questionnaireData: any;
  // timelineData: [];
  // medicalHistoryInfo: {};
  // medicalHistoryData: [];
  // error: any;
  isLoading: boolean;
  assignTagInfo: {};
  assignTagInfoData: [];
  todayAppointmentData: [];
  todayAppointmentDoctorData: [];
  timelineData: [];
  medicalHistoryInfo: {};
  medicalHistoryData: [];
  appointmentData: [];
  patientListData: [];
  patientListDataObject: {};
  patientDataObjectById: {};
  nationalityData: [];
  bloodGroupData: [];
  sourceData: [];
  maritalStatusData: [];
  patientBranchList: {};
  error: any;
  questionnaireData: any;
  insurancePlanInfo: {};
  insurancePlanInfo: {};
  patientInsurancePlan: [];
  formNameData: string;
  emrLoader?: boolean;
  addtionalFieldData: [];
}

// patient activity log
export interface IPatientActivityLoglice {
  isLoading: boolean;
  patientActivityLogData: [];
  error: any;
}

export interface IReceptionist {
  loading: boolean;
  isLoading: boolean;
  shareQuestionnaireInfo: {};
  questionnaireData: [];
  todoListData: [];
  todoListDataById: {};
  otpInfo: {};
  medicalCenterNewsData: [];
  doctorListData: any[];
  error: any;
  doctorListDataObject: any;
  doctorDataById: any;
  dentistListData: any[];
  dentistListDataObject: any;
  dentistDataById: any;
}
// mobile appointment request
export interface IMobileAppointmentRequest {
  isLoading: boolean;
  mobileAppointmentReqeustData: [];
  singleMobileAppointmentRequestData: {};
  getAllMobileAppointPayloadData: {};
  branch_id: string;
  error: any;
}
export interface IReceptionist {
  loading: boolean;
  isLoading: boolean;
  shareQuestionnaireInfo: {};
  otpInfo: {};
  numberOfotpAttempt: number;
  questionnaireData: [];
  todoListData: [];
  todoListDataById: {};
  error: any;
}

export interface IAppointment {
  isLoading: boolean;
  stsUpdt: boolean;
  todayAppointmentData: [];
  todayAppointmentDoctorData: [];
  appointmentData: [];
  todayAppointmentInfo: {};
  appointmentLog: [];
  actionLog: [];
  appointmentInfo: {};
  appointmentSummary: [];
  isLoading: boolean;
  shareQuestionnaireInfo: {};
  otpInfo: {};
  error: any;
}

// appointment
export interface IAppointmentState {
  loading: boolean;
  doctorData: any[];
  doctorLoading: boolean;
  appointmentsData: any[];
  availbleSlots: any[];
  dataSource: any[];
  resources: any;
  totalCount: number;
  hourStartEndTime: any;
  selectedSlots: any[];
  recurringSelectedSlots: any[];
  payloadForAvailableSlots: any;
  recurringAvailableSlots: any[];
  colorSchemeData: any[];
}

// role
export interface IRoleUser {
  isLoading: boolean;
  userRole: any;
  error: any;
  isStatusUpdated?: boolean;
}

export interface IChat {
  isLoading: boolean;
  chatData: [];
}

// Create New Form interface
export interface ICreateNewFormState {
  isLoading: boolean;
  createFormBuilderHeaderData: {};
  createNewFormData: [];
  createNewFormDepartmentsData: [];
  createNewFormModulesData: [];
  createNewFormByIdData: {};
  updatedCreateNewFormData: {};
  error: any;
  isStatusUpdated: boolean;
  createUserData: [];
  filteredFormData: any[];
}
export interface IDoctorDashboard {
  isLoading: boolean;
  doctorAppointmentList: [];
  doctorListDataObject: {};
  error: any;
}
// Diagnosis

export interface IDiagnosis {
  isLoading: boolean;
  medicineCategory: [];
  medicineData: [];
  medicineCompositionData: [];
  patientDiagnosisDataObject: {};
  patientDiagnosisInfo: {};
  diagnosisImageInfo: {};
  diagnosisDocInfo: {};
  diagnosisScribeNotesData: [];
  diagnosisScribeImagesData: [];
  patientHistoryData: [];
  patientMedicineData: [];
  markStageInfo: {};
  taggedPatientListData: [];
  taggedPatientFilterListData: [];
  taggedPatientListDataObject: {};
  patientHistoryDataYear: [];
  error: any;
}

// lab jobs
export interface ILABS {
  isLoading: boolean;
  createLabJobs: [];
  error: any;
  getSelectesTestData: any;
  getSelectedProfileTestData: any;
  viewJobs: [];
  quantity: any;
  defaultTest: string;
  allTestData: any;
  getAllLabViewJobsPayload: [];
  documentsData: [];
  attachmentsData: any;
  getAttachmentDataApi: [];
  addText: any;
  addTestText: any;
  LoadFiles: any;
  resultsQunatity: number;
  updatedViewJobData: any;
  notesData: any;
  showAddResultPopup: boolean;
  showNotes: boolean;
  getAllAddResultData: [];
}

export interface IRADIOLOGYJOBS {
  isLoading: boolean;
  createLabJobs: [];
  error: any;
  getSelectesTestData: any;
  getSelectedProfileTestData: any;
  viewJobs: [];
  quantity: any;
  defaultTest: string;
  allTestData: any;
  getAllLabViewJobsPayload: [];
  documentsData: [];
  attachmentsData: any;
  getAttachmentDataApi: [];
  addText: any;
  addTestText: any;
  LoadFiles: any;
  notesData: any;
  showAddResultPopup: boolean;
  showNotes: boolean;
  getAllRadiologyTestData: any;
  showObservations: boolean;
  checkPopupStatusKey: boolean;
}
export interface IAppNotification {
  isLoading: boolean;
  notificationListData: [];
  // getNotificationList: [];
  error: any;
}

// patient history
export interface IPatientHistory {
  isLoading: boolean;
  patientFormData: any;
  patientHistoryData: any;
  patientHistoryAttachments: any[];
  patientDiagnosisDetailData: any;
  patientAttachmentsData: any;
  patientImagesData: any;
  selectedDocForCompare: any[];
  patientCompareDocumentsData: any;
}

// Doctor Diagnosis
export interface IDoctorDiagnosis {
  isLoading: boolean;
  scribeImagesArr: any;
  scribeImagesData: [];
  scribeNotesArr: any;
  scribeNotesData: [];
  error: any;
  diagnosisSearchTagData: [];
  createdDiagnosisId: '';
  updateScribeImgArr: any[];
  updateScribeNotesArr: any[];
  allTagDataList: [];
}

export interface IInsurance {
  isLoading: boolean;
  marketplaceData: [];
  marketplaceInfo: {};
  insuranceCompanyData: {};
  insuranceCompanyInfo: {};
  insurancePlanData: [];
  allInsurancePlan: [];
  insurancePlanInfo: {};
  departmentServiceData: [];
  planDepartmentInfo: {};
  deptServiceData: {};
  marketplaceDetail: {};
  insuranceCompanyDetail: {};
  insurancePlanDetail: {};
  palnDepartmentList: [];
  departmentServices: [];
  selectedDepartmentService: {};
  selDeptSrv: [];
  selectedServiceId: [];
  loading: boolean;
  error: any;
}

export interface ILabInvoice {
  PatientInsuranceList: any[];
  insuranceItem: any;
  labInformationData: {};
  insuranceApprovalNumber: any;
  primaryDoctorsList: any[];
  patientSearchObject: {};
  patientInvoice: {};
  labServicesListObject: any;
  labServicesList: any[];
  patientServicesList: any[];
  isLoading: boolean;
  patientPaymentInfo: {};
  paymentDetails: {};
  settledInvoiceObject: {};
  settledInvoiceList: [];
  patientTests: any[];
  addTestText: any;
}
// export interface IInvoiceState {
//   isLoading: boolean;
//   invoiceObjectById: {};
//   patientInvoiceData: {};
//   error: any;
// }

// Receipt
export interface IReceipt {
  isLoading: boolean;
  receiptPatientData: any;
  receiptPatientOutstandingData: any;
  selectedInvoiceData: any;
  patientInvoiceData: any;
  receiptPaymentModeData: any;
  totalOutstandingAmount: number | undefined;
  totalAdvanceAndRefundAmount: number | undefined;
  createReceiptRefundData: any;
  createReceiptAdvanceData: any;
  upayAmount: number | undefined;
  outStandingReceiptData: any;
  entryReceiptAdvanceUpayData: any;
  createReceiptOutStandingData: any;
  existingReceiptOutstandingData: any;
  getOutstandingInoviceListPayload: any;
  selectedReturnInvoiceData: any;
  returnInvoiceData: any;
}

// ongoing claims

export interface IOngoingClaims {
  isLoading: boolean;
  onGoingClaimsData: any[];
  pandingClaimsData: any[];
  claimsByMarketPlace: any[];
}

export interface IRequest {
  isLoading: boolean;
  requestData: any;
  labTestsData: any;
  radiologyTestsData: any;
  patientInsuranceList: any;
  testListByInsuranceNameData: any;
}

export interface ILabRequest {
  isLoading: boolean;
  labRequestData: any;
  getAllLabRequestPayload: any;
}

export interface IRadiologyRequest {
  isLoading: boolean;
  radiologyRequestData: any;
  getAllRadiologyRequestPayload: any;
}

export interface ILab {
  isLoading: boolean;
  categoryData: [];
  testProfileData: [];
  testProfileInfo: {};
  sampleTypeData: [];
  labUnitData: [];
  labComponentData: [];
  labTestData: [];
  testInfo: {};
  profileData: {};
  updatedProfileData: [];
  newTestData: [];
  testData: {};
  updatedTestData: [];
  rangeTableData: [];
  componentInfo: {};
  componentData: {};
  error: any;
}

export interface IInvoiceState {
  isLoading: boolean;
  invoiceObjectById: {};
  patientInvoiceData: {};
  settledInvoiceList: any[];
  settledInvoiceListObject: {};
  generatedInvoiceObject: {};
  addInsurancePlanList: any[];
  patientInvoiceServiceData: any[];
  selectedInsurancePlan: {};
  servicesDataDetails: any[];
  patientDiagnosisServiceData: any[];
  popupServiceData: any[];
  paymentAmount: {};
  paymentModeData: any[];
  upayLinkObject: {};
  onlinePaymentObject: {};
  error: any;
  patientObject: any;
  addTestText: any[];
}

export interface IRadiology {
  isLoading: boolean;
  radiologyCategoryData: [];
  radiologyTestProfileData: [];
  radiologyTestData: [];
  radiologyCategoryDataList: any[];
  radiologyTestDataList: any[];
  radiologyPatientDiagnosisServiceData: any[];
  radiologyTestDataListObject: {};
  popupServiceData: any[];
  radiologyPatientInvoiceData: {};
  radiologyTestInfo: {};
  radiologyTest: {};
  radiologyTestProfileInfo: {};
  radiologyProfile: {};
  updatedRadiologyProfile: [];
  radiologyNewTestData: {};
  error: any;
  patientTests: [];
  addTestText: any;
}

export interface IInventoryRequest {
  isLoading: boolean;
  inventoryItemData: [];
  inventoryRequestData: [];
  requestInfo: {};
  requestDetail: {};
  requestItemInfo: {};
  requestPdfData: {};
  inventoryStoreData: [];
  inventoryReqStore: {};
  inventoryReqSource: string;
  error: any;
  inventoryIssueData: any[];
  issueCheckStatus: any;
  inventoryPoData: any[];
  poCheckStatus: any;
  getAlldirectPoData: any[];
  getItemWithStoreData: any[];
  getAllInventoryRequestData: any[];
  inventoryReqSourceDept: string;
  inventoryReqSourceRoom: string;
  inventoryRequestDataInfo: {};
  getAllInventoryPurchaseOrderData: any[];
  addTestText: any[];
  selectedPurchaseOrderList: any[];
  addGrn: [];
  isLoading: boolean;
  inventoryItemData: [];
  inventoryRequestData: [];
  inventoryReqStore: {};
  raiseDirectPoData: any[];
  directPoStatus: any[];
  poFormData: any[];
  getIssueId: string;
  requestSourceTypeEvent: string;
  requestSourceEvent: string;
  inventoryReqSourceBranch: {};
}

// Inventory Purchase Invoice
export interface IPurChaseInvoice {
  suppliersInfo: [];
  grnListObject: {};
  grnList: [];
  conformPurchaseInvoiceList;
  addTestText: any[];
  generatedInvoiceData: any;
  isLoading: boolean;
  file: any;
}

export interface IMasterValue {
  isLoading: boolean;
  error: any;
  addMasterValue: any;
  getAllMasterValueData: any;
  statusUpdate: any;
  updateMasterValueData: any;
  getAllMasterValueDataReducer: any;
}

// Branch Store
export interface IBranchStore {
  isLoading: boolean;
  brachStoreRequestData: any;
  selectedIssueData: any;
  selectedMainStoreData: any;
  selectedMainStoreUniqueData: any;
  branchStoreIssueData: any;
  branchStoreMainStoreRequestData: any;
  mainStoreRequestItemsData: any;
  getBranchStoreMainStoreRequestPayload: any;
}
export interface IServices {
  isLoading: boolean;
  allServiceData: [];
  addService: [];
  updateService: [];
  updateStatus: [];
  error?: any;
  isStatusValueUpdated?: boolean;
}

export interface IDentistDashboard {
  isLoading: boolean;
  dentistAppointmentList: [];
  dentistListDataObject: {};
  error: any;
}

// Doctor Diagnosis
export interface IDentistDiagnosis {
  isLoading: boolean;
  scribeImagesArr: any;
  scribeImagesData: [];
  scribeNotesArr: any;
  scribeNotesData: [];
  error: any;
  diagnosisSearchTagData: [];
  diagnosisDetails: any;
  createdDiagnosisId: '';
  updateScribeImgArr: any[];
  updateScribeNotesArr: any[];
  allTagDataList: [];
  services: any[];
  child_services: any[];
  tooths: any[];
  formdata: any;
  diagnosis_treatments: any[];
  medicineCategory: [];
  medicineData: [];
  medicineCompositionData: [];
  patientDiagnosisDataObject: {};
  patientDiagnosisInfo: {};
  diagnosisImageInfo: {};
  diagnosisDocInfo: {};
  diagnosisScribeNotesData: [];
  diagnosisScribeImagesData: [];
  patientHistoryData: [];
  patientMedicineData: [];
  markStageInfo: {};
  taggedPatientListData: [];
  taggedPatientFilterListData: [];
  taggedPatientListDataObject: {};
}

export interface IUnitType {
  allCategoriesList: [];
  addedUnitList: [];
  editableItem: {};
  editedItem: {};
  isLoading: boolean;
}

export interface IInventoryMaster {
  isLoading: boolean;
  inventoryDataList: any[];
  error: any;
}

export interface IInventoryItem {
  isLoading: boolean;
  isStatusUpdated: boolean;
  inventoryItemList: any[];
  error: any;
}

import {
  AppConfigIcon,
  ConfigurationIcon,
  DashboardIcon,
  DiagnosisIcon,
  FormBuilderIcon,
  IPDIcon,
  InsuranceClaimsIcon,
  InsuranceMasterIcon,
  InventoryMasterIcon,
  InvoiceIcon,
  JobIcon,
  MainstoreIcon,
  ManageUsersIcon,
  MasterTableManageIcon,
  PatientEMRIcon,
  PurchaseIon,
  ReceiptMenu,
  RequestIcon,
  RequestInventoryIcon,
  ServicesMastersIcons,
  SubstoreIcon,
  UserGroupIcon,
  unitTypeMastersIcons,
} from '../../components/common/svg-components'
import { ISidebar } from '../../interfaces/interfaces'

export const mainSidebarData: ISidebar[] = [
  {
    id: '64ec823efbe2e6b90cbe0119',
    name: 'Manage Medical Center Setup',
    icon: DashboardIcon,
    navigate: '/medicalcenter',
    navigateAfterLogin: '/medicalcenter/branch',
  },
  {
    id: '64dde263bc74631d4f42cb1d',
    name: 'Manage Userroles',
    icon: UserGroupIcon,
    navigate: '/usergroups',
  },
  {
    id: '64dde270bc74631d4f42cb20',
    name: 'Manage Staff',
    icon: ManageUsersIcon,
    navigate: '/manageusers',
  },
  // {
  //   id: 3,
  //   name: 'Manage Master Tables',
  //   icon: MasterTableManageIcon,
  //   navigate: '/mastertablemanage',
  // },
  {
    id: '64ec8294fbe2e6b90cbe011f',
    name: 'Manage Master Tables',
    icon: MasterTableManageIcon,
    navigate: '/mastertablemanagenew',
  },
  {
    id: '64ec82affbe2e6b90cbe0121',
    name: 'Mobile App Configurations',
    icon: AppConfigIcon,
    navigate: '/mobileappconfiguration',
  },

  {
    id: '64ec82c3fbe2e6b90cbe0123',
    name: 'Insurance Masters',
    icon: InsuranceMasterIcon,
    navigate: '/insurancemaster',
  },
  {
    id: '64ec82ddfbe2e6b90cbe0125',
    name: 'Ongoing Claims',
    icon: InsuranceClaimsIcon,
    navigate: null,
    navigateAfterLogin: '/ongoing-claims',
    activeLocation: 'ongoing-claims',
  },
  {
    id: '64ec82f7fbe2e6b90cbe0127',
    name: 'Services Masters',
    icon: ServicesMastersIcons,
    navigate: '/services',
  },
  {
    id: '65092ff2d6c0459b02e12aca',
    name: 'Inventory Master Tables',
    icon: InventoryMasterIcon,
    navigate: '/inventorymastertable',
  },
  {
    id: '64fea6ad2188af776a01978c',
    name: 'Item Unit Type Map',
    icon: unitTypeMastersIcons,
    navigate: '/unitTypeMap',
  },
  {
    id: '650ab220fcec2f5ae2369bb7',
    name: 'Inventory Item Masters',
    icon: unitTypeMastersIcons,
    navigate: '/inventoryitemtable',
  },
  // doctor sidebar data
  {
    id: '64d6044495887b2e44e7dc70',
    name: 'Doctor Dashboard',
    icon: DashboardIcon,
    navigate: '/doctor',
  },
  {
    id: '64d6044d95887b2e44e7dc72',
    name: 'Diagnosis',
    icon: DiagnosisIcon,
    navigate: null,
    activeLocation: 'patientdiagnosis',
    navigateAfterLogin: '/patientdiagnosis',
  },
  {
    id: '64d6046595887b2e44e7dc76',
    name: 'IPD',
    icon: IPDIcon,
    navigate: null,
    activeLocation: 'ipd',
    navigateAfterLogin: '/ipd',
  },

  // lab siderbar
  {
    id: '64ec83c8fbe2e6b90cbe012f',
    name: 'Lab Job',
    icon: JobIcon,
    navigate: '/job',
    navigateAfterLogin: '/job/createjobs',
  },
  {
    id: '64ec83e0fbe2e6b90cbe0131',
    name: 'Lab Request',
    icon: RequestIcon,
    navigate: '/request',
  },
  {
    id: '64ec83fcfbe2e6b90cbe0133',
    name: 'Lab Invoice',
    icon: InvoiceIcon,
    navigate: '/invoice',
  },
  {
    id: '64ec842bfbe2e6b90cbe0135',
    name: 'Lab Configuration',
    icon: ConfigurationIcon,
    navigate: '/configuration',
  },

  // radiology
  {
    id: '64ec844bfbe2e6b90cbe0137',
    name: 'Radiology Job',
    icon: JobIcon,
    navigate: '/radiology-job',
    navigateAfterLogin: '/radiology-job/createjobs',
  },
  {
    id: '64edb9fe537f7a84f0c11fec',
    name: 'Radiology Request',
    icon: RequestIcon,
    navigate: '/radiology-request',
  },
  {
    id: '64ec848afbe2e6b90cbe0139',
    name: 'Radiology Invoice',
    icon: InvoiceIcon,
    navigate: '/radiology-invoice',
  },
  {
    id: '64ec84dafbe2e6b90cbe013b',
    name: 'Radiology Configuration',
    icon: ConfigurationIcon,
    navigate: '/radiology-configuration',
  },

  // dentist

  {
    id: '64f72ac08380cdd3a764cb37',
    name: 'Dentist Dashboard',
    icon: DashboardIcon,
    navigate: '/dentist',
    navigateAfterLogin: '/dentist',
  },
  {
    id: '64f72c068380cdd3a764cb6e',
    name: 'Dental Diagnosis',
    icon: DiagnosisIcon,
    navigate: null,
    navigateAfterLogin: '/patientdentaldiagnosis',
    activeLocation: 'patientdentaldiagnosis',
  },

  // Receptionist Sidebar
  {
    id: '64d603683d33b619b0974b0b',
    name: 'Receptionist Dashboard',
    icon: DashboardIcon,
    navigate: '/receptionist',
  },
  {
    id: '64d603d595887b2e44e7dc6a',
    name: 'Patient EMR',
    icon: PatientEMRIcon,
    navigate: '/patientemr',
    activeLocation: 'patientemr',
  },
  {
    id: '64d603fa95887b2e44e7dc6c',
    name: 'Invoice',
    icon: InvoiceIcon,
    navigate: '/invoice',
  },
  {
    id: '64d6045d95887b2e44e7dc74',
    name: 'Form Builder',
    icon: FormBuilderIcon,
    navigate: '/formBuilder',
    activeLocation: 'formBuilder',
  },
  {
    id: '64d6041c95887b2e44e7dc6e',
    name: 'Receipt',
    icon: ReceiptMenu,
    navigate: '/receipt',
  },

  // inventory sidebar

  {
    id: '64f72e418380cdd3a764cb74',
    name: 'Inventory Request',
    icon: RequestInventoryIcon,
    navigate: '/request',
  },
  {
    id: '64f72f0b8380cdd3a764cb78',
    name: 'Branch Store',
    icon: SubstoreIcon,
    navigate: '/branchstore',
  },
  {
    id: '64f72fa28380cdd3a764cb7c',
    name: 'Main Store',
    icon: MainstoreIcon,
    navigate: '/mainstore',
  },
  {
    id: '64f730008380cdd3a764cb80',
    name: 'Purchase Invoice',
    icon: PurchaseIon,
    navigate: '/purchaseinvoice',
  },
]

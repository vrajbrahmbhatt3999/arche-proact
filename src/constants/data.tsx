import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
  AppConfigIcon,
  Check,
  DashboardIcon,
  Error,
  Warning,
  UserGroupIcon,
  ManageUsersIcon,
  MasterTableManageIcon,
  PatientEMRIcon,
  AddIcon,
  SaveIcon,
  DeleteIcon,
  NationalIdCardIcon,
  LabelIcon,
  VipIcon,
  DiabetesIcon,
  BloodPressureIcon,
  PrintFormIcon,
  ReceiptMenu,
  InvoiceMenu,
  CalanderIcon,
  // EditIcon,
  RatingStarIcon,
  // DropDownArrowIcon,
  // DropDownIcon,
  DropDownIconForDataTable,
  DoctorIcon,
  DiagnosisIcon,
  FormBuilderIcon,
  IPDIcon,
  CalculatorIcon,
  JobIcon,
  InsuranceMasterIcon,
  InsuranceClaimsIcon,
  ExitIcon,
  RequestIcon,
  InvoiceIcon,
  ConfigurationIcon,
  SubstoreIcon,
  MainstoreIcon,
  PurchaseIon,
  UsDollarCurrencyIcon,
  KuwaitDinarCurrencyIcon,
  EmiratiDirhamCurrencyIcon,
  RequestInventoryIcon,
  EditIcon,
  ServicesMastersIcons,
  ReportsIcons,
  InventoryMasterIcon,
} from '../components/common/svg-components';

import {
  IAppointmenuHeaderMenu,
  IColorCode,
  ICurrencyValue,
  IDiagnosisStatusData,
  IFormActionSidebar,
  IInterval,
  IModuleList,
  IModuleScreen,
  INotiificationData,
  IRadiologyTab,
  IRangeData,
  ISesstionTimeData,
  ISidebar,
  ITab,
  ITagData,
} from '../interfaces/interfaces';
import { colors } from './color';
import { useAppDispatch, useAppSelector } from '../hooks';
// import { getPatientEmrById } from "../redux/features/patient-emr/patient/patientAsyncAction";
import { components } from 'react-select';
import {
  setCalculatorDialog,
  updateTreatmentPlanTableData,
} from '../redux/features/treatmentPlans/treatmentPlansSlice';
import {
  handleAddSearchableSelectStyle,
  // searchableSelectStyleForDataTable,
} from '../utils/utils';
import Select from 'react-select';
import { IOptionData } from '../interfaces/interfaces';
import { TodoAlaramIcon } from '../components/common/svg-components/index';
import { allowedNumberOfDigitsAfterDecimal } from '../utils/utils';
import paymentCash from '../assets/images/paymentCash.png';
import paymentKnet from '../assets/images/paymentKnet.png';
import paymentDebit from '../assets/images/paymentDebit.png';
import paymentCredit from '../assets/images/paymentCredit.png';
import paymentLoyaltyPoints from '../assets/images/paymentLoyaltyPoints.png';
import ToggleSwitchV2 from '../components/common/toggle-switch/ToggleSwitchV2';
import { getAllMasterValuePayloadData } from '../redux/features/master-value/MasterValueSlice';
import styles from '../constants/table-data/tableData.module.scss';

export const DropdownIndicator = (props: any) => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <DropDownIconForDataTable />
      </components.DropdownIndicator>
    )
  );
};
export const sidebarData: ISidebar[] = [
  {
    id: 0,
    name: 'Manage Medical Center Setup',
    icon: DashboardIcon,
    navigate: '/medicalcenter',
  },
  {
    id: 1,
    name: 'Manage Userroles',
    icon: UserGroupIcon,
    navigate: '/usergroups',
  },
  {
    id: 2,
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
    id: 4,
    name: 'Manage Master Tables',
    icon: MasterTableManageIcon,
    navigate: '/mastertablemanagenew',
  },
  {
    id: 5,
    name: 'Mobile App Configurations',
    icon: AppConfigIcon,
    navigate: '/mobileappconfiguration',
  },

  {
    id: 6,
    name: 'Insurance Masters',
    icon: InsuranceMasterIcon,
    navigate: '/insurancemaster',
  },
  {
    id: 7,
    name: 'Ongoing Claims',
    icon: InsuranceClaimsIcon,
    navigate: null,
    // navigate: '/ongoing-claims',
    activeLocation: 'ongoing-claims',
  },
  {
    id: 7,
    name: 'Services Masters',
    icon: ServicesMastersIcons,
    navigate: '/services',
  },

  {
    id: 8,
    name: 'Inventory Master Tables',
    icon: InventoryMasterIcon,
    navigate: '/inventorymastertable',
  },
];

/* Options array for searchable select - Yes/No */
export const optionsArrayForYesOrNo = [
  {
    value: true,
    label: 'Yes',
  },
  {
    value: false,
    label: 'No',
  },
];
/* Options array for searchable select - Yes/No */

/* Options array for searchable select - Billed / Not Billed / To Be Billed */
export const optionsArrayForBilledStatus = [
  {
    value: 'BILLED',
    label: 'Billed',
  },
  {
    value: 'NOTBILLED',
    label: 'Not Billed',
  },
  {
    value: 'TOBEBILLED',
    label: 'To Be Billed',
  },
];
/* Options array for searchable select - Billed / Not Billed / To Be Billed */

/* Options array for searchable select - Attended/New */
export const optionsArrayForStatus = [
  {
    name: 'New',
    _id: 'new',
  },
  {
    name: 'Attended',
    _id: 'attended',
  },
];
export const billableDropdownData = [
  {
    name: 'Yes',
    _id: true,
  },
  {
    name: 'No',
    _id: false,
  },
];
export const billedStatusDropdown = [
  {
    name: 'Billed',
    _id: 'billed',
  },
  {
    name: 'Not Billed',
    _id: 'not-billed',
  },
  {
    name: 'To Be Billed',
    _id: 'to-be-billed',
  },
];

export const receptionistSidebarData: ISidebar[] = [
  {
    id: 0,
    name: 'Receptionist',
    icon: DashboardIcon,
    navigate: '/receptionist',
  },
  {
    id: 1,
    name: 'Patient EMR',
    icon: PatientEMRIcon,
    navigate: '/patientemr',
  },
  {
    id: 2,
    name: 'Invoice',
    icon: InvoiceIcon,
    navigate: '/invoice',
  },
  // {
  //   id: 3,
  //   name: "Form Builder",
  //   icon: FormBuilderIcon,
  //   navigate: "/formBuilder",
  // },
  {
    id: 3,
    name: 'Receipt',
    icon: ReceiptMenu,
    navigate: '/receipt',
  },
];

// Doctor Sidebar Data
export const doctorSidebarData: ISidebar[] = [
  {
    id: 0,
    name: 'Doctor',
    icon: DashboardIcon,
    navigate: '/doctor',
  },
  {
    id: 1,
    name: 'Diagnosis',
    icon: DiagnosisIcon,
    navigate: null,
    activeLocation: 'patientdiagnosis',
  },
  {
    id: 2,
    name: 'Form Builder',
    icon: FormBuilderIcon,
    navigate: null,
    activeLocation: 'formBuilder',
    // navigate: "/formBuilder",
  },
  {
    id: 3,
    name: 'IPD',
    icon: IPDIcon,
    navigate: null,
    activeLocation: 'ipd',
    // navigate: "/ipd",
  },
  {
    id: 4,
    name: 'Patient EMR',
    icon: PatientEMRIcon,
    navigate: null,
    activeLocation: 'patientemr',
  },
];

// Lab Sidebar Data
export const labSidebarData: ISidebar[] = [
  {
    id: 0,
    name: 'Job',
    icon: JobIcon,
    navigate: '/job',
  },
  {
    id: 1,
    name: 'Request',
    icon: RequestIcon,
    navigate: '/request',
  },
  {
    id: 2,
    name: 'Invoice',
    icon: InvoiceIcon,
    navigate: '/invoice',
  },
  {
    id: 3,
    name: 'Configuration',
    icon: ConfigurationIcon,
    navigate: '/configuration',
  },
];

// Radiology Sidebar Data
export const radiologySidebarData: ISidebar[] = [
  {
    id: 0,
    name: 'Job',
    icon: JobIcon,
    navigate: '/job',
  },
  {
    id: 1,
    name: 'Request',
    icon: RequestIcon,
    navigate: '/request',
  },
  {
    id: 2,
    name: 'Invoice',
    icon: InvoiceIcon,
    navigate: '/invoice',
  },
  {
    id: 3,
    name: 'Configuration',
    icon: ConfigurationIcon,
    navigate: '/radiology-configuration',
  },
];

// Radiology Sidebar Data
export const pharmacySidebarData: ISidebar[] = [
  {
    id: 0,
    name: 'Pharmacy',
    icon: DashboardIcon,
    navigate: 'pharmacy',
  },
  {
    id: 1,
    name: 'Store',
    icon: DashboardIcon,
    navigate: '/store',
  },
  {
    id: 2,
    name: 'Inventory',
    icon: DashboardIcon,
    navigate: '/Inventory',
  },

  {
    id: 3,
    name: 'Request',
    icon: RequestInventoryIcon,
    navigate: '/request',
  },
  {
    id: 4,
    name: 'Branch Store',
    icon: SubstoreIcon,
    navigate: '/branchstore',
  },
  {
    id: 5,
    name: 'Main Store',
    icon: MainstoreIcon,
    navigate: '/mainstore',
  },
  {
    id: 6,
    name: 'Purchase invoice',
    icon: PurchaseIon,
    navigate: '/purchaseinvoice',
  },
];
export const inventorySidebarData: ISidebar[] = [
  {
    id: 0,
    name: 'Request',
    icon: RequestInventoryIcon,
    navigate: '/request',
  },
  {
    id: 1,
    name: 'Branch Store',
    icon: SubstoreIcon,
    navigate: '/branchstore',
  },
  {
    id: 2,
    name: 'Main Store',
    icon: MainstoreIcon,
    navigate: '/mainstore',
  },
  {
    id: 3,
    name: 'Purchase invoice',
    icon: PurchaseIon,
    navigate: '/purchaseinvoice',
  },
];

// Form action sidebar
export const formActionData: IFormActionSidebar[] = [
  {
    id: 0,
    name: 'Add',
    icon: AddIcon,
    handleOnClick: false,
  },
  {
    id: 1,
    name: 'Save',
    icon: SaveIcon,
    handleOnClick: true,
  },
  {
    id: 2,
    name: 'Delete',
    icon: DeleteIcon,
    handleOnClick: true,
  },

  {
    id: 3,
    name: 'Print',
    icon: PrintFormIcon,
    handleOnClick: false,
  },
  {
    id: 4,
    name: 'National ID Card Reader',
    icon: NationalIdCardIcon,
    handleOnClick: false,
  },
  {
    id: 5,
    name: 'Label',
    icon: LabelIcon,
    handleOnClick: false,
  },
];

// Invoice Form action sidebar
export const invoiceFormActionData: IFormActionSidebar[] = [
  {
    id: 0,
    name: 'Add',
    icon: AddIcon,
    handleOnClick: true,
  },
  {
    id: 1,
    name: 'Save',
    icon: SaveIcon,
    handleOnClick: false,
  },
  {
    id: 2,
    name: 'Delete',
    icon: DeleteIcon,
    handleOnClick: false,
  },
  {
    id: 3,
    name: 'Print',
    icon: PrintFormIcon,
    handleOnClick: false,
  },
  {
    id: 4,
    name: 'Exit',
    icon: ExitIcon,
    handleOnClick: false,
  },
];

export const success = {
  id: 1,
  title: 'Success',
  crossColor: colors.green1,
  icon: <Check />,
};

export const failure = {
  id: 2,
  title: 'Danger',
  crossColor: colors.red1,
  icon: <Error />,
};

export const warning = {
  id: 3,
  title: 'Warning',
  crossColor: colors.red1,
  icon: <Warning />,
};

export const globalError: string = 'Somthing Went Wrong';

export const mobileAppConfigurationData: ITab[] = [
  {
    id: 0,
    name: 'Appointment Type Configuration',
    navigate: 'appointment',
  },
  {
    id: 1,
    name: 'Medical Center News  ',
    navigate: 'news',
  },
];

// manage user- create user
export const manageCreateUserData: ITab[] = [
  {
    id: 0,
    name: 'Primary',
    navigate: '/manageusers/createusers/primary',
  },
  {
    id: 1,
    name: 'Secondary',
    navigate: null,
    activeLocation: '/manageusers/createusers/secondary',
  },
];

// manage user- create user
export const masterTableManagementData: ITab[] = [
  {
    id: 0,
    name: 'Manage Category',
    navigate: '/mastertablemanage/managecategory',
  },
  {
    id: 1,
    name: 'Manage Category Value',
    navigate: '/mastertablemanage/managecategoryvalue',
  },
];

export const medicalCenterTabData: ITab[] = [
  {
    id: 0,
    name: 'Branch Setup',
    navigate: 'branch',
  },
  {
    id: 1,
    name: 'Department Setup',
    navigate: 'department',
  },
  // {
  //   id: 2,
  //   name: 'Ward Setup',
  //   navigate: 'ward',
  // },
  // {
  //   id: 3,
  //   name: 'Room Setup',
  //   navigate: 'room',
  // },
  // {
  //   id: 4,
  //   name: 'Bed Setup',
  //   navigate: 'bed',
  // },
];
//Admin:Manageuser table header data
export const manageuserTableHeaderData: any = [
  {
    Header: 'ID',
    accessor: '_id',
  },
  {
    Header: 'NAME',
    accessor: 'name',
  },
  {
    Header: 'BRANCH',
    accessor: 'branches[0].name',
  },
  {
    Header: 'DEPT',
    accessor: 'departments[0].name',
  },
  {
    Header: 'SPECIALITY',
    accessor: 'specialities[0].name',
  },
  {
    Header: 'USERGROUP',
    accessor: 'user_group_id.name',
  },
  {
    Header: 'EMAIL',
    accessor: 'email',
  },
  {
    Header: 'PHONE NO',
    accessor: 'phone',
  },
  {
    Header: 'NOTES',
    accessor: 'notes',
    Cell: () => {
      return React.createElement(
        Link,
        { to: '/', className: 'viewLinkStyle' },
        'View'
      );
    },
  },
  {
    Header: 'STATUS',
  },
  {
    Header: 'ACTIONS',
  },
];

/* tableHeaderColumns definition for treatment plans list module */
export const treatmentPlansTableHeaderData: any = [
  {
    Header: 'PLAN',
    accessor: (row: any) => {
      return row?.treatmentPlanName || '-';
    },
  },
  {
    Header: 'DOCTOR NAME',
    accessor: (row: any) => {
      return row?.doctor_name || '-';
    },
  },
  {
    Header: 'SESSIONS',
    accessor: (row: any) => {
      return row?.sessions || '-';
    },
  },
  {
    Header: 'SERVICES',
    accessor: (row: any) => {
      const commaSeperatedServices = row.services
        .map((service: any) => {
          return service.label;
        })
        .join(',');
      return commaSeperatedServices;
    },
  },
  {
    Header: 'STATUS',
    accessor: 'status',
    Cell: ({ cell }: { cell: any }) => {
      const dispatch = useAppDispatch();
      const handleChange = (event: any) => {
        let dataToBeSent = {
          status: event.value,
          index: cell.row.index,
          _id: cell.row.original._id,
        };
        dispatch(updateTreatmentPlanTableData(dataToBeSent));
      };
      return (
        <div style={{ width: '106px' }}>
          <Select
            options={optionsArrayForStatus}
            onChange={handleChange}
            placeholder="Text"
            components={{ DropdownIndicator }}
            backspaceRemovesValue={true}
            styles={handleAddSearchableSelectStyle({
              width: '106px',
              height: '29px',
            })}
          />
        </div>
      );
    },
  },
  {
    Header: () => {
      const dispatch = useAppDispatch();
      const { isCalculatorDialogOpen } = useAppSelector(
        (state) => state.treatmentPlans
      );
      return (
        <>
          <span>DISCOUNT </span>
          <CalculatorIcon
            handleClick={() =>
              dispatch(setCalculatorDialog(!isCalculatorDialogOpen))
            }
          />
        </>
      );
    },
    accessor: 'discount',
    Cell: ({ cell }: { cell: any }) => {
      const dispatch = useAppDispatch();
      const { treatmentPlanTableData } = useAppSelector(
        (state) => state.treatmentPlans
      );
      const handleChange = (e: any) => {
        const discount = e.target.value || 0;
        const price = cell.row.original.price;
        let dataToBeSent = {
          discount: discount,
          price: price,
          index: cell.row.index,
          _id: cell.row.original._id,
        };
        dispatch(updateTreatmentPlanTableData(dataToBeSent));
      };
      return (
        <input
          value={treatmentPlanTableData[cell.row.index].discount}
          placeholder="Text"
          className="common-input-wrapper__input-for-dataTable"
          onChange={handleChange}
        />
      );
    },
  },
  {
    Header: 'PRICE',
    accessor: (row: any) => {
      return allowedNumberOfDigitsAfterDecimal(row?.price, 3) || '-';
    },
  },
  {
    Header: 'NET PRICE',
    accessor: (row: any) => {
      return allowedNumberOfDigitsAfterDecimal(row?.netPrice, 3) || '-';
    },
  },
  {
    Header: 'BILLABLE',
    accessor: 'billable',
    Cell: ({ cell }: { cell: any }) => {
      const dispatch = useAppDispatch();
      const handleChange = (event: any) => {
        let dataToBeSent = {
          billable: event.value,
          index: cell.row.index,
          _id: cell.row.original._id,
        };
        dispatch(updateTreatmentPlanTableData(dataToBeSent));
      };
      return (
        <div style={{ width: '75px' }}>
          <Select
            options={optionsArrayForYesOrNo}
            onChange={handleChange}
            placeholder="Text"
            components={{ DropdownIndicator }}
            backspaceRemovesValue={true}
            styles={handleAddSearchableSelectStyle({
              width: '75px',
              height: '29px',
            })}
          />
        </div>
      );
    },
  },
  {
    Header: 'BILLED',
    accessor: 'billed',
    Cell: ({ cell }: { cell: any }) => {
      const dispatch = useAppDispatch();
      const handleChange = (event: any) => {
        let dataToBeSent = {
          billed: event.value,
          index: cell.row.index,
          _id: cell.row.original._id,
        };
        dispatch(updateTreatmentPlanTableData(dataToBeSent));
      };
      return (
        <div style={{ width: '106px' }}>
          <Select
            options={optionsArrayForBilledStatus}
            onChange={handleChange}
            placeholder="Text"
            components={{ DropdownIndicator }}
            backspaceRemovesValue={true}
            styles={handleAddSearchableSelectStyle({
              width: '106px',
              height: '29px',
            })}
          />
        </div>
      );
    },
  },
  {
    Header: 'NOTES',
    accessor: 'notes',
    Cell: (props: any) => {
      return (
        <>
          <a
            href="#"
            style={{
              color: '#0E26A3',
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: '12px',
            }}
            onClick={() =>
              props.onClick({
                notes: {
                  isNotesDialogOpen: true,
                  value: props?.row?.original?.services?.map(
                    (elem: any) => elem.note
                  ),
                },
              })
            }
          >
            View
          </a>
        </>
      );
    },
  },
  {
    Header: 'ACTION',
    accessor: 'action',
    Cell: (props: any) => {
      return (
        <>
          <DeleteIcon
            fillColor="#CDD4D8"
            handleClick={() =>
              props.onClick({
                deleteAction: {
                  isDeleteDialogOpen: true,
                  _id: props?.row?.original?._id,
                },
              })
            }
          />
        </>
      );
    },
  },
];
/* tableHeaderColumns definition for treatment plans list module */

/* tableHeaderColumns definition for new treatment plans dialog module */
export const newTreatmentPlansTableHeaderData: any = [
  {
    Header: 'SERVICES NAME',
    accessor: 'label',
  },
  {
    Header: 'PRICE',
    accessor: 'price',
  },
  {
    Header: 'DISCOUNT',
    accessor: 'discount',
  },
  {
    Header: 'NET PRICE',
    accessor: 'netPrice',
  },
  {
    Header: 'NOTES',
    accessor: 'note',
    Cell: () => {
      return React.createElement(
        Link,
        { to: '/', className: 'viewLinkStyle' },
        'View'
      );
    },
  },
  {
    Header: 'ACTION',
    accessor: 'action',
    Cell: (props: any) => {
      return (
        <>
          <DeleteIcon
            fillColor="#CDD4D8"
            handleClick={() =>
              props.onClick({
                deleteAction: {
                  isDeleteDialogOpen: true,
                  _id: props?.row?.original?.value,
                },
              })
            }
          />
        </>
      );
    },
  },
];
/* tableHeaderColumns definition for new treatment plans dialog module */

export const medicalCenterBranchTableHeader: any = [
  // {
  //   Header: 'BRANCH ID',
  //   accessor: '_id',
  // },
  {
    Header: 'BRANCH NAME',
    accessor: 'name',
  },
  {
    Header: 'LOCATION',
    accessor: (row: any) => {
      return <p>{row?.address_id?.city ? row?.address_id?.city : '-'}</p>;
    },
  },
  {
    Header: 'INITIALS',
    accessor: 'initials',
  },
  {
    Header: 'STATUS',
  },
  {
    Header: 'ACTIONS',
  },
];

export const medicalCenterWardTableHeader: any = [
  {
    Header: 'WARD NO',
    accessor: 'ward_no',
  },
  {
    Header: 'WARD NAME',
    accessor: 'ward_name',
  },
  {
    Header: 'DEPARTNMENT NAME',
    accessor: (row: any) => {
      return <p>{row?.department_id?.name ?? '-'}</p>;
    },
  },
  {
    Header: 'NOTES',
    accessor: '',
  },
  {
    Header: 'STATUS',
  },
  {
    Header: 'ACTIONS',
  },
];

export const medicalCenterRoomTableHeader: any = [
  {
    Header: 'ROOM NO',
    accessor: 'room_no',
  },
  {
    Header: 'ROOM NAME',
    accessor: 'room_name',
  },
  {
    Header: 'WARD NAME',
    accessor: (row: any) => {
      return <p>{row?.ward_id?.ward_name ?? '-'}</p>;
    },
  },
  {
    Header: 'NOTES',
    accessor: '',
  },
  {
    Header: 'STATUS',
  },
  {
    Header: 'ACTIONS',
  },
];

export const medicalCenterBedTableHeader: any = [
  {
    Header: 'BED NO',
    accessor: 'bed_no',
  },
  {
    Header: 'BED NAME',
    accessor: 'bed_name',
  },
  {
    Header: 'ROOM NAME',
    accessor: (row: any) => {
      return <p>{row?.room_id?.room_name ?? '-'}</p>;
    },
  },
  {
    Header: 'COST PRICE',
    accessor: 'cost_price',
  },
  {
    Header: 'SELL PRICE',
    accessor: 'sell_price',
  },
  {
    Header: 'NOTES',
    accessor: '',
  },
  {
    Header: 'STATUS',
  },
  {
    Header: 'ACTIONS',
  },
];

export const medicalCenterDepartmentTableHeader: any = [
  // {
  //   Header: "DEPT ID",
  //   accessor: "_id",
  // },
  {
    Header: 'DEPT NAME',
    accessor: 'name',
  },
  {
    Header: 'SPECIALTIES',
    accessor: '',
  },
  {
    Header: 'NOTES',
    accessor: '',
  },
  {
    Header: 'STATUS',
  },
  {
    Header: 'ACTIONS',
  },
];

// range data
export const rangeData = [
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
  'Sun',
  'All',
];

export const rangeData2: IRangeData[] = [
  {
    id: 7,
    title: 'All Days',
    status: false,
  },
  {
    id: 1,
    title: 'Mon',
    status: false,
  },
  {
    id: 2,
    title: 'Tue',
    status: false,
  },
  {
    id: 3,
    title: 'Wed',
    status: false,
  },
  {
    id: 4,
    title: 'Thu',
    status: false,
  },
  {
    id: 5,
    title: 'Fri',
    status: false,
  },
  {
    id: 6,
    title: 'Sat',
    status: false,
  },
  {
    id: 0,
    title: 'Sun',
    status: false,
  },
];

// Mobile Config Medical Center News Array
export const medicalNewsArray: { id: number; name: string }[] = [
  { id: 0, name: 'News 1' },
  { id: 1, name: 'News 2' },
  { id: 2, name: 'News 3' },
  { id: 3, name: 'News 4' },
  { id: 4, name: 'News 5' },
];

export const manageSpecialitiesTableHeaderData: any = [
  {
    Header: 'DEPT.',
    accessor: (row: any) => {
      return row?.department_id?.name;
    },
  },
  {
    Header: 'SPECIALTIES',
    accessor: 'name',
  },
  {
    Header: 'STATUS',
  },
  {
    Header: 'ACTIONS',
  },
];

export const viewSpecialityTableHeaderData: any = [
  {
    Header: 'DEPT',
    accessor: (row: any) => {
      return <p>{row?.department_id?.name}</p>;
    },
  },
  {
    Header: 'SPECIALTIES',
    accessor: 'name',
  },
];

export const manageUserGroupTabData: ITab[] = [
  {
    id: 0,
    name: 'Primary',
    navigate: 'primary',
  },
  {
    id: 1,
    name: 'Secondary',
    // navigate: 'secondary',
    navigate: null,
    activeLocation: '/usergroups/manageusergroups/secondary',
  },
];

export const moduleListData: IModuleList[] = [
  {
    _id: 0,
    module_name: 'Patient EMR',
  },
  {
    _id: 1,
    module_name: 'Receptionist',
  },
  {
    _id: 2,
    module_name: 'Doctor',
  },
  {
    _id: 3,
    module_name: 'Insurance Masters',
  },
  {
    _id: 4,
    module_name: 'Radiology',
  },
  {
    _id: 5,
    module_name: 'Call Center Admin',
  },
  {
    _id: 6,
    module_name: 'Call Center Agents',
  },
];

// Mobile config HeaderData
export const mobileConfigTableHeaderData: any = [
  {
    Header: 'NAME',
    accessor: (row: any) => {
      return `${row?.type?.toLowerCase()}_appointment_${row.name}`;
    },
  },
  {
    Header: 'TYPE',
    accessor: (row: any) => {
      return row?.type?.toLowerCase();
    },
  },
  {
    Header: 'TITLE',
    accessor: 'title',
  },
  {
    Header: 'DESCRIPTION',
  },
  {
    Header: 'PRICE LISTING',
    accessor: 'price',
  },
  {
    Header: 'ICON',
  },
  {
    Header: 'STATUS',
  },
  {
    Header: 'ACTIONS',
  },
];

//Admin:Master table Category Value header data
export const masterTableHeaderData: any = [
  // {
  //   Header: "ID",
  //   accessor: "_id",
  // },
  {
    Header: 'CATEGORY',
    accessor: 'category_name',
  },

  {
    Header: 'STATUS',
  },
  {
    Header: 'ACTIONS',
  },
];
//Admin:Master table Category row data
export const masterTableRowData: any = [
  {
    categoryID: 'C101',
    categoryName: 'B positive',
  },
  {
    categoryID: 'C102',
    categoryName: 'B positive',
  },
  {
    categoryID: 'C103',
    categoryName: 'B positive',
  },
];

//Admin:Master table Category Value header data
export const masterTableCategoryValueHeaderData: any = [
  // {
  //   Header: "ID",
  //   accessor: "_id",
  // },
  {
    Header: 'CATEGORY',
    accessor: (row: any) => {
      return row?.category_id?.category_name;
    },
  },
  {
    Header: 'VALUE',
    accessor: 'value',
  },
  {
    Header: 'STATUS',
  },
  {
    Header: 'ACTIONS',
  },
];

// AppointType Array

export const appointmentTypeArray = ['AUDIO', 'VIDEO', 'CHAT', 'INPERSON'];

//Admin:Master table Category value row data
export const masterTableCategoryValueRowData: any = [
  {
    categoryID: 'C101',
    categoryName: 'B positive',
    categoryValue: 'A positive',
  },
  {
    categoryID: 'C102',
    categoryName: 'B positive',
    categoryValue: 'A positive',
  },
  {
    categoryID: 'C103',
    categoryName: 'B positive',
    categoryValue: 'A positive',
  },
];

// patient EMR: assign tag
// export const assignTagHeaderData: any = [
//   {
//     Header: "LABEL NAME",
//     accessor: "label_name",
//   },
//   {
//     Header: "LABEL ICON",
//     accessor: "label_icon",
//   },

//   {
//     Header: "ACTIVE/INACTIVE",
//   },
// ];
// patient EMR: assign tag row data
export const assignTagRowData: any = [
  {
    label_name: 'VIP',
    label_icon: <VipIcon />,
  },
  {
    label_name: 'Diabetes',
    label_icon: <DiabetesIcon />,
  },
  {
    label_name: 'Blood Pressure',
    label_icon: <BloodPressureIcon />,
  },
  {
    label_name: 'Medical Insurance',
    label_icon: <Error />,
  },
];

// patient EMR: searchModalHeaderData
export const searchModalHeaderData: any = [
  {
    Header: 'FILE NO.',
    accessor: 'emr_no', //file_no
  },
  {
    Header: 'PATIENT NAME',
    accessor: 'patient_name',
  },

  {
    Header: 'NATIONAL ID',
    accessor: 'national_id',
  },
  {
    Header: 'MOBILE',
    accessor: 'phone',
  },
];
// patient EMR: searchModal row data
export const searchModalRowData: any = [
  {
    file_no: '29-11-2022',
    patient_name: 'Andrew Davidson',
    national_id: '987654321',
    mobile: '+971 55 410 2865',
  },
  {
    file_no: '29-11-2022',
    patient_name: 'Andrew Davidson',
    national_id: '987654321',
    mobile: '+971 55 410 2865',
  },
  {
    file_no: '29-11-2022',
    patient_name: 'Andrew Davidson',
    national_id: '987654321',
    mobile: '+971 55 410 2865',
  },
  {
    file_no: '29-11-2022',
    patient_name: 'Andrew Davidson',
    national_id: '987654321',
    mobile: '+971 55 410 2865',
  },
];

export const toDoData1: any = [
  {
    title: 'Andrew Davidson',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,  ",
    isDone: false,
  },
  {
    title: 'Samantha Davidson',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,  ",
    isDone: false,
  },
  {
    title: 'Justin Davidson',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,  ",
    isDone: true,
  },
];

export const appointMenuData: IAppointmenuHeaderMenu[] = [
  {
    id: 0,
    name: 'Book Appointment',
    icon: CalanderIcon,
    navigate: '/bookingappointment',
  },
  {
    id: 1,
    name: 'View Appointment',
    icon: CalanderIcon,
    // navigate: "/viewappointment",
  },
];

export const ReportsMenuData: IAppointmenuHeaderMenu[] = [
  {
    id: 0,
    name: 'Laboratory Reports',
    icon: ReportsIcons,
  },
  {
    id: 1,
    name: 'Radiology Reports',
    icon: ReportsIcons,
    onPopupOpen: 'onPopupOpen',
  },
  {
    id: 2,
    name: 'IPD history',
    icon: ReportsIcons,
  },
  {
    id: 3,
    name: 'Statement History',
    icon: ReportsIcons,
  },
];

export const questionData: any[] = [
  {
    que: 'Are you diabetic?',
    y: 'Yes',
    n: 'No',
    queId: 1,
    isY: false,
    isN: false,
    yesId: 1,
    noId: 1,
  },
  {
    que: 'Are you married?',
    y: 'Yes',
    n: 'No',
    queId: 2,
    isY: false,
    isN: false,
    yesId: 2,
    noId: 2,
  },
  {
    que: 'Are you suffering from chronic disease?',
    y: 'Yes',
    n: 'No',
    queId: 3,
    isY: false,
    isN: false,
    yesId: 3,
    noId: 3,
  },
];
export const medicalCenterUpdateData: any = [
  {
    title: 'Lorem Ipsum is simply dummy',
    description:
      'Established fact that a reader will be distracted by the readable ',
    readMore: 'Read More',
  },
  {
    title: 'Lorem Ipsum is simply dummy',
    description:
      'Established fact that a reader will be distracted by the readable ',
    readMore: 'Read More',
  },
  {
    title: 'Lorem Ipsum is simply dummy',
    description:
      'Established fact that a reader will be distracted by the readable ',
    readMore: 'Read More',
  },
];

export const doctorListData: any = [
  {
    srcImg: '',
    icon: <RatingStarIcon />,
    rating: '4.9 ( 37 Reviews)',
    doctorName: 'Dr. Mahmud Nik Hasan',
    loginTime: '09:00 AM',
  },
  {
    srcImg: '',
    icon: <RatingStarIcon />,
    rating: '4.5 ( 25 Reviews)',
    doctorName: 'Dr. Winston McCaffrey',
    loginTime: '08:25 AM',
  },
  {
    srcImg: '',
    icon: <RatingStarIcon />,
    rating: '4.8 ( 30 Reviews)',
    doctorName: 'Dr. Brycen Bradford',
    loginTime: '09:30 AM',
  },
  {
    srcImg: '',
    icon: <RatingStarIcon />,
    rating: '4.0 ( 20 Reviews)',
    doctorName: 'Dr. Christina Joseph',
    loginTime: '11:00 AM',
  },
];

// Day List

export const daysList: IInterval[] = [
  {
    label: 'Monday',
    value: 1,
  },
  {
    label: 'Tuesday',
    value: 2,
  },
  {
    label: 'Wednesday',
    value: 3,
  },
  {
    label: 'Thursday',
    value: 4,
  },
  {
    label: 'Friday',
    value: 5,
  },
  {
    label: 'Saturday',
    value: 6,
  },
  {
    label: 'Sunday',
    value: 0,
  },
];
export const forSchedule = [
  { value: 'SCHEDULED', label: 'SCHEDULED' },
  { value: 'CANCELLED', label: 'CANCELLED' },
  { value: 'ARRIVED', label: 'ARRIVED' },
  { value: 'NOSHOW', label: 'NOSHOW' },
  { value: 'RESCHEDULED', label: 'RESCHEDULED' },
];
export const forArrived = [
  // { value: 'INPROGRESS', label: 'INPROGRESS' },
  { value: 'CANCELLED', label: 'CANCELLED' },
  { value: 'ARRIVED', label: 'ARRIVED' },
  { value: 'NOSHOW', label: 'NOSHOW' },
  { value: 'RESCHEDULED', label: 'RESCHEDULED' },
];
export const forArrivedNonPatient = [
  // { value: 'INPROGRESS', label: 'INPROGRESS' },
  { value: 'CANCELLED', label: 'CANCELLED' },
  { value: 'ARRIVED', label: 'ARRIVED' },
  { value: 'NOSHOW', label: 'NOSHOW' },
  { value: 'RESCHEDULED', label: 'RESCHEDULED' },
];
export const forReschedule = [
  { value: 'CANCELLED', label: 'CANCELLED' },
  { value: 'ARRIVED', label: 'ARRIVED' },
  { value: 'NOSHOW', label: 'NOSHOW' },
  { value: 'RESCHEDULED', label: 'RESCHEDULED' },
];
export const forInprogress = [{ value: 'COMPLETED', label: 'COMPLETED' }];
export const forCancled = [{ value: 'CANCELLED', label: 'CANCELLED' }];
export const forNOshow = [{ value: 'NOSHOW', label: 'NOSHOW' }];
export const defaultSchedule = [{ value: 'SCHEDULED', label: 'SCHEDULED' }];
export const forCompleted = [{ value: 'COMPLETED', label: 'COMPLETED' }];
export const statusData: any = {
  SCHEDULED: forSchedule,
  RESCHEDULED: forReschedule,
  ARRIVED: forArrived,
  INPROGRESS: forInprogress,
  CANCELLED: forCancled,
  FORNOSHOW: forNOshow,
  COMPLETED: forCompleted,
};
export const colorSchemeData: IColorCode[] = [
  // {
  //   title: "Available",
  //   label: "AVAILABLE",
  //   colorCode: "#02BF90",
  // },
  {
    title: 'Pending',
    label: 'PENDING',
    colorCode: '#797979',
  },
  {
    title: 'Inprogress',
    label: 'INPROGRESS',
    colorCode: '#2d2d2d',
  },
  {
    title: 'Arrived',
    label: 'ARRIVED',
    colorCode: '#408D93',
  },
  {
    title: 'No Show',
    label: 'NOSHOW',
    colorCode: '#868282',
  },
  {
    title: 'Completed',
    label: 'COMPLETED',
    colorCode: '#02BF90',
  },
  {
    title: 'Waitinglist',
    label: 'WAITINGLIST',
    colorCode: '#80b9ea',
  },
  {
    title: 'Rescheduled',
    label: 'RESCHEDULED',
    colorCode: '#FFA009',
  },
  {
    title: 'Cancelled',
    label: 'CANCELLED',
    colorCode: '#B11313',
  },
  {
    title: 'Scheduled',
    label: 'SCHEDULED',
    colorCode: '#5936F1',
  },
];

export const moduleScreenData: IModuleScreen[] = [
  {
    id: 0,
    name: 'Patient EMR',
    navigate: '/patientemr',
  },
];

export const sessionTimeData: ISesstionTimeData[] = [
  {
    label: '30 min',
    value: 30,
  },
  {
    label: '1 hr',
    value: 60,
  },
  {
    label: '1.5 hrs',
    value: 90,
  },
  {
    label: '2 hrs',
    value: 120,
  },
];
export const intervalData: IInterval[] = [
  {
    label: '1',
    value: 1,
  },
  {
    label: '2',
    value: 2,
  },
  {
    label: '3',
    value: 3,
  },
  {
    label: '4',
    value: 4,
  },
  {
    label: '5',
    value: 5,
  },
  {
    label: '6',
    value: 6,
  },
  {
    label: '7',
    value: 7,
  },
  {
    label: '8',
    value: 8,
  },
  {
    label: '9',
    value: 9,
  },
  {
    label: '10',
    value: 10,
  },
];

export const doctorDiagnosisTabData: ITab[] = [
  {
    id: 0,
    name: 'Diagnosis',
    navigate: 'diagnosis',
  },
  {
    id: 1,
    name: 'Treatment',
    navigate: 'treatment',
  },
  {
    id: 2,
    name: 'Medication',
    navigate: 'medication',
  },
  {
    id: 3,
    name: 'Request',
    navigate: 'request',
  },
  {
    id: 4,
    name: 'Referral',
    navigate: 'referral',
  },
  // {
  //   id: 5,
  //   name: 'Invoices',
  //   navigate: 'invoices',
  // },
];

export const optionData: IOptionData[] = [
  // {
  //   value: 'PENDING',
  //   name: 'Pending',
  // },
  {
    value: 'SCHEDULED',
    name: 'Scheduled',
  },
  {
    value: 'INPROGRESS',
    name: 'In Progress',
  },
  {
    value: 'COMPLETED',
    name: 'Completed',
  },
  {
    value: 'CANCELLED',
    name: 'Cancelled',
  },
  {
    value: 'ARRIVED',
    name: 'Arrived',
  },
  {
    value: 'ARRIVED(CRM)',
    name: 'Arrived(Crm)',
  },
  {
    value: 'NOSHOW',
    name: 'No Show',
  },
  {
    value: 'RESCHEDULED',
    name: 'Rescheduled',
  },
  // {
  //   value: 'WAITINGLIST',
  //   name: 'Waiting List',
  // },
];

export const notificationDataList: INotiificationData[] = [
  {
    icon: <TodoAlaramIcon fillColor="#FFA873" />,
    title: 'Appointment alarm',
    description:
      'Your appointment will be start after 15 minutes. Stay with app and take care.',
    notification_day: 'Yesterday  -',
    notification_time: '9:25am',
  },
  {
    icon: <TodoAlaramIcon fillColor="#FFA873" />,
    title: 'Appointment alarm',
    description:
      'Your appointment will be start after 15 minutes. Stay with app and take care.',
    notification_day: 'Yesterday  -',
    notification_time: '9:25am',
  },
  {
    icon: <TodoAlaramIcon fillColor="#FFA873" />,
    title: 'Appointment alarm',
    description:
      'Your appointment will be start after 15 minutes. Stay with app and take care.',
    notification_day: 'Yesterday  -',
    notification_time: '9:25am',
  },
  {
    icon: <TodoAlaramIcon fillColor="#FFA873" />,
    title: 'Appointment alarm',
    description:
      'Your appointment will be start after 15 minutes. Stay with app and take care.',
    notification_day: 'Yesterday  -',
    notification_time: '9:25am',
  },
  {
    icon: <TodoAlaramIcon fillColor="#FFA873" />,
    title: 'Appointment alarm',
    description:
      'Your appointment will be start after 15 minutes. Stay with app and take care.',
    notification_day: 'Yesterday  -',
    notification_time: '9:25am',
  },
  {
    icon: <TodoAlaramIcon fillColor="#FFA873" />,
    title: 'Appointment alarm',
    description:
      'Your appointment will be start after 15 minutes. Stay with app and take care.',
    notification_day: 'Yesterday  -',
    notification_time: '9:25am',
  },
];

export const roleData: any = {
  MC_ADMIN: {
    name: 'Admin',
  },
  RECEPTIONIST: {
    name: 'Receptionist',
  },
  DOCTOR: {
    name: 'Doctor',
  },
  LAB_SUPERVISOR: {
    name: 'Lab Supervisor',
  },
  RADIOLOGY_SUPERVISOR: {
    name: 'Radiology Supervisor',
  },
  PHARMACY_SALESPERSON: {
    name: 'Pharmacy Salesperson',
  },
  INVENTORY_MANAGEMENT: {
    name: 'inventory management',
  },
  DENTIST: {
    name: 'Dentist',
  },
};

export const diagnosisStatusData: IDiagnosisStatusData[] = [
  {
    value: 'NS',
    name: 'Not started',
  },
  {
    value: 'S',
    name: 'On going',
  },
  {
    value: 'E',
    name: 'Completed',
  },
];

export const tagData: ITagData[] = [
  {
    value: 'High',
    label: 'High Fever',
  },
  {
    value: 'Hypertension',
    label: 'Hypertension',
  },
  {
    value: 'Diabetes',
    label: 'Diabetes',
  },
];

export const taggedDataList = [
  {
    PATIENT_FILE_NO: '123',
    PATIENT_NAME: 'Arwa Guriwala',
    LAST_APPOINTMENT: '08 Jun 2023',
  },
  {
    PATIENT_FILE_NO: '456',
    PATIENT_NAME: 'Twinkle Parmar',
    LAST_APPOINTMENT: '09 Jun 2023',
  },
  {
    PATIENT_FILE_NO: '789',
    PATIENT_NAME: 'Harsh Solanki',
    LAST_APPOINTMENT: '10 Jun 2023',
  },
];

export const formListData = [
  'Form 1',
  'Form 2',
  'Form 3',
  'Form 4',
  'Form 5',
  'Form 6',
  'Form 7',
  'Form 8',
  'Form 9',
];

export const labJobTabData: ITab[] = [
  {
    id: 0,
    name: 'Create Jobs',
    navigate: 'createjobs',
  },
  {
    id: 1,
    name: 'View Jobs',
    navigate: 'viewJobs',
  },
];

export const RadiologyJobTabData: IRadiologyTab[] = [
  {
    id: 0,
    name: 'Create Jobs',
    navigate: 'createjobs',
  },
  {
    id: 1,
    name: 'View Jobs',
    navigate: 'viewJobs',
  },
];

export const pharmacyJobData: ITab[] = [
  {
    id: 0,
    name: 'Information',
    navigate: 'pharmacy-info',
  },
  {
    id: 1,
    name: 'Payments',
    navigate: 'pharmacy-payment',
  },
  {
    id: 2,
    name: 'Pending',
    navigate: null,
  },
];

export const referalTypeData = [
  { name: 'Doctor', _id: '0' },
  { name: 'Medical Center', _id: '1' },
];
export const claimTypeDropdown = [
  {
    value: 'medical',
    label: 'Medical',
  },
  {
    value: 'surgical',
    label: 'Surgical',
  },
];

export const reimbursementTypeDropdown = [
  {
    value: 'Medical',
    label: 'medical',
  },
  {
    value: 'Patient',
    label: 'patient',
  },
];

export const coPayDropdown = [
  {
    value: 'Yes',
    label: true,
  },
  {
    value: 'No',
    label: false,
  },
];

export const invoiceTabData: ITab[] = [
  {
    id: 0,
    name: 'Information',
    navigate: null,
    activeLocation: '/invoice/information',
  },
  {
    id: 1,
    name: 'Services',
    navigate: null,
    activeLocation: '/invoice/services',
  },
  {
    id: 2,
    name: 'Payment',
    navigate: null,
    activeLocation: '/invoice/payment',
  },
];

// Lab Invoice Tab Data
export const labInvoiceTabData: ITab[] = [
  {
    id: 0,
    name: 'Lab Information',
    navigate: null,
    activeLocation: '/invoice/labinformation',
  },
  {
    id: 1,
    name: 'Lab Services',
    navigate: null,
    activeLocation: '/invoice/labservices',
  },
  {
    id: 2,
    name: 'Payment',
    navigate: null,
    activeLocation: '/invoice/labpayment',
  },
];

// radiology invoice module
export const radiologyTabData: ITab[] = [
  {
    id: 0,
    name: 'Radiology Information',
    navigate: null,
    activeLocation: '/radiology-invoice/information',
  },
  {
    id: 1,
    name: 'Radiology Services',
    navigate: null,
    activeLocation: '/radiology-invoice/services',
  },
  {
    id: 2,
    name: 'Payment',
    navigate: null,
    activeLocation: '/radiology-invoice/payment',
  },
];

// Lab Request Floating Bar Data
export const labRequestFloatingBarData: IFormActionSidebar[] = [
  {
    id: 0,
    name: 'Add',
    icon: AddIcon,
  },
  {
    id: 1,
    name: 'Save',
    icon: SaveIcon,
  },
  {
    id: 2,
    name: 'Delete',
    icon: DeleteIcon,
  },
  {
    id: 3,
    name: 'Print',
    icon: PrintFormIcon,
  },
  {
    id: 4,
    name: 'Exit',
    icon: ExitIcon,
  },
];

// Receipt Floating Bar Data
export const receiptFloatingBarData: IFormActionSidebar[] = [
  {
    id: 0,
    name: 'Add',
    icon: AddIcon,
  },
  {
    id: 1,
    name: 'Save',
    icon: SaveIcon,
  },
  {
    id: 2,
    name: 'Print',
    icon: PrintFormIcon,
  },
  {
    id: 3,
    name: 'Exit',
    icon: ExitIcon,
  },
];

export const onGoingClaimsTypesData: any = {
  INITIATED: { value: 'INITIATED', status: 'Initiated' },
  SETTLED: { value: 'SETTLED', status: 'Settled' },
  REJECTED: { value: 'REJECTED', status: 'Rejected' },
};

export const sourceData = [
  {
    value: 'internal',
    label: 'Internal',
  },
  {
    value: 'external',
    label: 'External',
  },
];

export const genderData: any = [
  {
    value: 'male',
    label: 'Male',
  },
  {
    value: 'female',
    label: 'Female',
  },
];

// master value data
export const masterTableNewHeaderData: any = [
  // {
  //   Header: "ID",
  //   accessor: "_id",
  // },
  {
    Header: 'STATUS NAME',
    accessor: 'value',
  },

  {
    Header: 'COLOR',
    Cell: (cell: any) => {
      const color = cell?.row?.original?.metadata?.color_code;
      return (
        <>
          <div
            style={{
              backgroundColor: color,
              display: 'flex',
              alignItems: 'center',
              borderRadius: '50%',
              height: '30px',
              width: '30px',
            }}
            className={styles.iconImg}
          ></div>
        </>
      );
    },
    accessor: 'color_code',
  },
  {
    Header: 'ACTIVE STATUS',
    Cell: (props: any) => {
      const is_active = props?.row?.original?.is_active;
      return (
        <ToggleSwitchV2
          isToggled={is_active}
          handleToggle={() => props.onClick(props?.row?.original)}
        />
      );
    },
  },
  {
    Header: 'ACTION',
    Cell: ({ row }: any) => {
      const dispatch = useAppDispatch();
      const handleEdit = (item: any) => {
        dispatch(getAllMasterValuePayloadData(item));
      };
      return (
        <EditIcon
          fillColor={colors.grey4}
          handleClick={() =>
            row?.original?.is_active && handleEdit(row?.original)
          }
        />
      );
    },
  },
];

// asign tag table
export const assignTagData: any = [
  // {
  //   Header: "ID",
  //   accessor: "_id",
  // },
  {
    Header: 'STATUS NAME',
    accessor: 'value',
  },

  {
    Header: 'ICON',
    Cell: (cell: any) => {
      const color = cell?.row?.original?.metadata?.icon;
      return (
        <>
          <img className={styles.iconImg} src={color} alt="" />
        </>
      );
    },
    accessor: 'icon',
  },
  {
    Header: 'ACTIVE STATUS',
    Cell: (props: any) => {
      const is_active = props?.row?.original?.is_active;
      return (
        <ToggleSwitchV2
          isToggled={is_active}
          handleToggle={() => props.onClick(props?.row?.original)}
        />
      );
    },
  },
  {
    Header: 'ACTION',
    Cell: ({ row }: any) => {
      const dispatch = useAppDispatch();
      const handleEdit = (item: any) => {
        console.log('item', item);
        dispatch(getAllMasterValuePayloadData(item));
      };
      return (
        <EditIcon
          fillColor={colors.grey4}
          handleClick={() =>
            row?.original?.is_active && handleEdit(row?.original)
          }
        />
      );
    },
  },
];
export const masterValuesdata: any = [
  // {
  //   Header: "ID",
  //   accessor: "_id",
  // },
  {
    Header: 'Value',
    accessor: 'value',
  },

  {
    Header: 'ACTIVE STATUS',
    Cell: (props: any) => {
      const is_active = props?.row?.original?.is_active;
      return (
        <ToggleSwitchV2
          isToggled={is_active}
          handleToggle={() => props.onClick(props?.row?.original)}
        />
      );
    },
  },
  {
    Header: 'ACTION',
    Cell: ({ row }: any) => {
      const dispatch = useAppDispatch();
      const handleEdit = (item: any) => {
        console.log('item', item);
        dispatch(getAllMasterValuePayloadData(item));
      };
      return (
        <EditIcon
          fillColor={colors.grey4}
          handleClick={() =>
            row?.original?.is_active && handleEdit(row?.original)
          }
        />
      );
    },
  },
];

export const paymentModeModalData = [
  {
    payment_mode_id: 0,
    payment_mode_name: 'cash',
    payment_mode_label: 'Cash',
    payment_mode_img: paymentCash,
    is_payment_disable: false,
  },
  {
    payment_mode_id: 1,
    payment_mode_name: 'knet',
    payment_mode_label: 'KNET',
    payment_mode_img: paymentKnet,
    is_payment_disable: false,
  },
  {
    payment_mode_id: 2,
    payment_mode_name: 'debit',
    payment_mode_label: 'Debit',
    payment_mode_img: paymentDebit,
    is_payment_disable: false,
  },
  {
    payment_mode_id: 3,
    payment_mode_name: 'credit',
    payment_mode_label: 'Credit',
    payment_mode_img: paymentCredit,
    is_payment_disable: false,
  },
  {
    payment_mode_id: 4,
    payment_mode_name: 'pay_with_advance',
    payment_mode_label: 'Pay with Advance',
    payment_mode_img: paymentCash,
    is_payment_disable: false,
  },
  {
    payment_mode_id: 5,
    payment_mode_name: 'loyalty_points',
    payment_mode_label: 'Loyalty points',
    payment_mode_img: paymentLoyaltyPoints,
    is_payment_disable: false,
  },

  // {
  //   payment_mode_id: 6,
  //   payment_mode_name: 'mode_d',
  // payment_mode_label: "Mode D",
  //   payment_mode_img: paymentCash,
  // is_payment_disable: false,
  // },
];

export const subStoreData = [
  {
    id: 0,
    name: 'Issue',
    navigate: '/issue',
  },
  {
    id: 1,
    name: 'MS Request',
    navigate: '/msrequest',
  },
];

export const submittedPoPopupHeaderData: any = [
  {
    Header: 'DATE',
    accessor: '_date',
  },
  {
    Header: 'DOC ID',
    accessor: 'doc_id',
  },
  {
    Header: 'PO NO',
    accessor: 'po_no',
  },
  {
    Header: 'SUPPLIER NAME',
    accessor: '_source',
  },
  {
    Header: 'STATUS',
    accessor: '_status',
  },

  {
    Header: 'AUTHORIZED STATUS',
    accessor: 'auth_status',
  },
];

export const submittedPoPopupData = [
  {
    _date: '10 Jan 2023',
    doc_id: 'INV_REQ_200|2023|530',
    po_no: '#1234',
    _status: 'Initiated',
    _source: 'Powell Supplier',
    auth_status: 'Entered',
  },
  {
    _date: '10 Jan 2023',
    doc_id: 'INV_REQ_200|2023|530',
    po_no: '#4658 ',
    _status: 'Initiated',
    _source: 'Rose Supplier',
    auth_status: 'Entered',
  },
  {
    _date: '10 Jan 2023',
    doc_id: 'INV_REQ_200|2023|530',
    po_no: '#5236',
    _status: 'Initiated',
    _source: 'Powell Supplier',
    auth_status: 'Entered',
  },
  {
    _date: '10 Jan 2023',
    doc_id: 'INV_REQ_200|2023|530',
    po_no: '#4896',
    _status: 'Initiated',
    _source: 'Rose Supplier',
    auth_status: 'Entered',
  },
];

export const poSummaryPopupHeaderData: any = [
  {
    Header: 'DATE',
    accessor: '_date',
  },
  {
    Header: 'SUPPLIER NAME',
    accessor: 'doc_id',
  },
  {
    Header: 'PO NO',
    accessor: 'po_no',
  },

  {
    Header: 'STATUS',
    accessor: '_status',
  },

  {
    Header: 'GRN',
    accessor: '_grn',
  },
  {
    Header: 'NOTES',
    accessor: '_notes',
  },
];

export const poSummaryPopupData = [
  {
    _date: '10 Jan 2023',
    doc_id: 'INV_REQ_200|2023|530',
    po_no: '#1234',
    _status: 'Initiated',
    _source: 'Powell Supplier',
    auth_status: 'Entered',
  },
  {
    _date: '10 Jan 2023',
    doc_id: 'INV_REQ_200|2023|530',
    po_no: '#4658 ',
    _status: 'Initiated',
    _source: 'Rose Supplier',
    auth_status: 'Entered',
  },
  {
    _date: '10 Jan 2023',
    doc_id: 'INV_REQ_200|2023|530',
    po_no: '#5236',
    _status: 'Initiated',
    _source: 'Powell Supplier',
    auth_status: 'Entered',
  },
  {
    _date: '10 Jan 2023',
    doc_id: 'INV_REQ_200|2023|530',
    po_no: '#4896',
    _status: 'Initiated',
    _source: 'Rose Supplier',
    auth_status: 'Entered',
  },
];

export const vfg: ICurrencyValue[] = [
  {
    id: 0,
    name: 'US Dollar (USD)',
    value: 'us_dollar',
    icon: UsDollarCurrencyIcon,
  },
  {
    id: 1,
    name: 'Kuwait Dinar (KD)',
    value: 'kuwait_dinar',
    icon: KuwaitDinarCurrencyIcon,
  },
  {
    id: 2,
    name: 'Emirati Dirham(AED)',
    value: 'emirati_dirham',
    icon: EmiratiDirhamCurrencyIcon,
  },
];

export const poFormCurrencyData: any = [
  {
    value: 1,
    text: 'US Dollar (USD)',
    icon: (
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.49833 0C3.35231 0 0 3.35231 0 7.49833C0 11.6443 3.35231 15 7.49833 15C11.6443 15 15 11.6443 15 7.49833C15 3.35231 11.6443 0 7.49833 0ZM1.41996 4.17281C2.05626 3.01072 3.01741 2.04956 4.1795 1.41326C4.33691 1.34293 4.44407 1.42666 4.48091 1.50368C4.53784 1.61085 4.49766 1.74481 4.39049 1.80174C3.30208 2.39451 2.40455 3.29873 1.80844 4.38714C1.75151 4.49766 1.6142 4.53784 1.50368 4.47756C1.39652 4.41728 1.35968 4.27997 1.41996 4.17281ZM1.58741 7.44809C1.58741 4.17281 4.24983 1.50703 7.52847 1.50703C10.8071 1.50703 13.4662 4.16946 13.4662 7.44809C13.4662 10.7267 10.8038 13.3891 7.52847 13.3891C4.25318 13.3891 1.58741 10.7267 1.58741 7.44809ZM10.8439 13.5733C10.7368 13.6303 10.6028 13.5934 10.5459 13.4863C10.4856 13.3791 10.5258 13.2418 10.633 13.1849C11.7214 12.5854 12.6155 11.6845 13.2083 10.5928C13.2485 10.5224 13.3054 10.4923 13.3657 10.4823C13.4226 10.4722 13.4762 10.4856 13.5097 10.5023C13.6169 10.5593 13.6571 10.6932 13.6001 10.8004C12.9638 11.9658 12.006 12.9337 10.8439 13.5733Z"
          fill="#FFA009"
        />
        <path
          d="M7.50092 2.06641C4.52369 2.06641 2.11914 4.47096 2.11914 7.44819C2.11914 10.4254 4.52369 12.83 7.50092 12.83C10.4781 12.83 12.8827 10.4254 12.8827 7.44819C12.8827 4.47096 10.4748 2.06641 7.50092 2.06641ZM9.09168 9.77237C8.85055 10.0671 8.53575 10.2647 8.16737 10.3651C8.00662 10.4087 7.93294 10.4924 7.94299 10.6598C7.94968 10.8239 7.94299 10.9847 7.93964 11.1521C7.93964 11.2995 7.86596 11.3765 7.72195 11.3799C7.62818 11.3832 7.53441 11.3832 7.44064 11.3832C7.35692 11.3832 7.27654 11.3832 7.19282 11.3799C7.03877 11.3765 6.96509 11.2894 6.96509 11.1387C6.96174 11.0215 6.96174 10.8976 6.96174 10.7804C6.95839 10.5158 6.95169 10.5058 6.69717 10.4656C6.37232 10.412 6.05417 10.3417 5.75611 10.1977C5.52169 10.0838 5.49824 10.0269 5.56522 9.77907C5.61546 9.59487 5.66569 9.41403 5.72262 9.23319C5.76281 9.09923 5.803 9.04229 5.87333 9.04229C5.91351 9.04229 5.9671 9.06239 6.03743 9.09923C6.36562 9.27002 6.71392 9.36714 7.0823 9.41068C7.14258 9.41738 7.20621 9.42073 7.26649 9.42073C7.43729 9.42073 7.60474 9.38724 7.76549 9.31691C8.17406 9.13941 8.23769 8.66721 7.89275 8.38255C7.77554 8.28543 7.64158 8.2151 7.50092 8.15482C7.14258 7.99742 6.77085 7.8802 6.4326 7.67592C5.88337 7.34772 5.53843 6.89896 5.57862 6.22917C5.6255 5.47565 6.05082 5.00679 6.74406 4.75562C7.02872 4.6518 7.03207 4.65515 7.03207 4.3571C7.03207 4.25663 7.02872 4.15616 7.03542 4.05234C7.04211 3.82796 7.07895 3.79112 7.30333 3.78442C7.32678 3.78442 7.35692 3.78442 7.38036 3.78442C7.4239 3.78442 7.46743 3.78442 7.51097 3.78442C7.52771 3.78442 7.54781 3.78442 7.56455 3.78442C7.98987 3.78442 7.98987 3.80117 7.98987 4.25998C7.99322 4.59822 7.99322 4.59822 8.32812 4.6518C8.58599 4.69199 8.83046 4.76902 9.06824 4.87284C9.19885 4.92977 9.24908 5.02019 9.20889 5.16085C9.14861 5.36513 9.09168 5.57277 9.02805 5.77706C8.98786 5.90097 8.94767 5.9579 8.874 5.9579C8.83381 5.9579 8.78357 5.94116 8.71994 5.91101C8.39175 5.75026 8.0468 5.67324 7.68512 5.67324C7.63823 5.67324 7.59134 5.67659 7.54446 5.67659C7.43729 5.68329 7.33347 5.69668 7.23301 5.74022C6.87802 5.89427 6.82108 6.28945 7.12249 6.53057C7.27654 6.65448 7.45069 6.74156 7.63153 6.81523C7.94633 6.94584 8.26114 7.06976 8.55919 7.23385C9.5036 7.76634 9.75812 8.96192 9.09168 9.77237Z"
          fill="#FFA009"
        />
      </svg>
    ),
  },
  {
    value: 2,
    text: 'Kuwait Dinar (KD)',
    icon: (
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_18095_15604)">
          <path
            d="M7.5274 2.06836C4.55119 2.06836 2.14453 4.47502 2.14453 7.45123C2.14453 10.4274 4.55119 12.8341 7.5274 12.8341C10.5036 12.8341 12.9068 10.4274 12.9068 7.45123C12.9068 4.47502 10.5036 2.06836 7.5274 2.06836ZM3.65173 5.1418H4.47132V7.35399L4.92626 6.79139L6.30497 5.13833H7.29472L5.54442 7.22897L7.39543 9.85789H6.42304L5.00266 7.81935L4.46785 8.38542V9.85789H3.64826L3.65173 5.1418ZM7.83301 5.1418H9.22561C9.64235 5.1418 10.0105 5.23557 10.3334 5.41963C10.6564 5.60369 10.9065 5.86762 11.0836 6.21143C11.2919 6.68373 11.3475 7.11436 11.351 7.6214C11.351 8.06939 11.2607 8.46182 11.0801 8.80215C10.903 9.14249 10.6495 9.40295 10.3195 9.58701C9.98963 9.77107 9.61456 9.86136 9.18741 9.86136H7.82954V5.1418H7.83301ZM8.65259 5.80164V9.20153H9.18741C9.61804 9.20153 9.94795 9.06609 10.1772 8.79868C10.4098 8.5278 10.5244 8.14232 10.5314 7.63876C10.5835 7.11089 10.4411 6.51357 10.198 6.20449C9.97574 5.93361 9.65276 5.79817 9.22908 5.79817H8.65259V5.80164Z"
            fill="#FFA009"
          />
          <path
            d="M7.49977 0.00195312C3.35322 0.00195312 0.00195312 3.35322 0.00195312 7.49977C0.00195312 11.6463 3.35322 15.0011 7.49977 15.0011C11.6463 15.0011 15.0011 11.6463 15.0011 7.49977C15.0011 3.35322 11.6428 0.00195312 7.49977 0.00195312ZM4.48189 1.50221C4.53745 1.60987 4.49925 1.74183 4.3916 1.80087C3.30113 2.39472 2.40514 3.29766 1.80782 4.38465C1.74878 4.49578 1.61334 4.53398 1.50568 4.47494C1.39803 4.4159 1.35983 4.27699 1.41886 4.16933C2.05786 3.00594 3.01636 2.04397 4.17975 1.40844C4.33603 1.33899 4.44369 1.42234 4.48189 1.50221ZM7.52755 1.50916C10.8024 1.50916 13.4661 4.17281 13.4661 7.44768C13.4661 10.7225 10.8024 13.3862 7.52755 13.3862C4.25268 13.3862 1.58903 10.7225 1.58903 7.44768C1.58903 4.17281 4.25268 1.50916 7.52755 1.50916ZM13.5077 10.5003C13.6154 10.5593 13.6536 10.6913 13.598 10.7989C12.966 11.9658 12.0075 12.9313 10.8476 13.5703C10.7399 13.6293 10.6079 13.5876 10.5489 13.4834C10.4899 13.3758 10.5281 13.2403 10.6357 13.1813C11.7227 12.5805 12.6187 11.681 13.2126 10.5871C13.2508 10.5176 13.3098 10.4864 13.3688 10.476C13.4209 10.469 13.473 10.4829 13.5077 10.5003Z"
            fill="#FFA009"
          />
        </g>
        <defs>
          <clipPath id="clip0_18095_15604">
            <rect width="15" height="15" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
  },
  {
    value: 3,
    text: 'Emirati Dirham(AED)',
    icon: (
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_18095_15617)">
          <path
            d="M7.52749 2.06836C4.55123 2.06836 2.14453 4.47506 2.14453 7.45131C2.14453 10.4276 4.55123 12.8343 7.52749 12.8343C10.5037 12.8343 12.907 10.4276 12.907 7.45131C12.907 4.47506 10.5037 2.06836 7.52749 2.06836ZM4.78739 4.0479C5.0166 5.38148 5.22497 6.56573 5.26317 7.82291C5.26317 8.06601 5.23539 8.28828 5.17635 8.4897C5.12078 8.68766 5.00618 8.95854 4.84295 9.29541L4.59638 9.19817C4.66236 8.85088 4.69362 8.56611 4.69362 8.34731C4.68667 7.34713 4.23867 5.61764 4.30119 5.21826C4.38106 4.79456 4.61374 4.39866 4.78739 4.0479ZM9.90988 5.1488C10.6947 5.8017 10.8684 6.74285 10.8684 7.70136V9.01411H9.01735C8.58671 9.01758 8.42001 8.73628 8.43043 8.44455C8.42349 8.16325 8.46863 7.89237 8.50336 7.63538L8.65964 7.62843C8.71868 7.87848 8.91664 7.89931 9.07639 7.90279H10.4829C10.3996 7.22558 10.1877 6.74979 9.62163 6.42682L9.90988 5.1488ZM6.74956 8.99674C7.11769 8.99674 7.41983 9.27804 7.41983 9.6288C7.41983 9.97609 7.12116 10.2574 6.75304 10.2574C6.38491 10.2574 6.08624 9.97609 6.08624 9.6288C6.0793 9.27804 6.37796 8.99674 6.74956 8.99674ZM4.90199 9.76772C5.09995 9.7573 5.11384 9.96567 5.06869 10.0664C5.05827 10.0976 5.03396 10.1428 4.99576 10.2053C4.86032 10.1358 4.76655 10.1046 4.71793 10.1046C4.61374 10.0872 4.52692 10.1497 4.48178 10.2053C4.56512 10.3546 4.79086 10.4623 4.96103 10.4797C5.08258 10.4658 5.16246 10.438 5.25623 10.4171C5.24581 10.5873 5.12078 10.6498 5.02007 10.6846L4.13796 10.9554C4.19005 10.7783 4.34286 10.7158 4.49219 10.6394C4.34286 10.5977 4.28729 10.4727 4.27688 10.3789C4.28382 10.0699 4.6068 9.78161 4.90199 9.76772Z"
            fill="#FFA009"
          />
          <path
            d="M7.49989 0.00195312C3.35328 0.00195312 0.00195312 3.35328 0.00195312 7.49989C0.00195312 11.6465 3.35328 15.0013 7.49989 15.0013C11.6465 15.0013 15.0013 11.6465 15.0013 7.49989C15.0013 3.35328 11.643 0.00195312 7.49989 0.00195312ZM4.48196 1.50223C4.53753 1.60989 4.49932 1.74186 4.39167 1.8009C3.30118 2.39476 2.40518 3.29771 1.80785 4.38472C1.74881 4.49585 1.61337 4.53405 1.50571 4.47501C1.39805 4.41598 1.35985 4.27706 1.41889 4.1694C2.05789 3.00599 3.01641 2.044 4.17982 1.40847C4.3361 1.33901 4.44376 1.42236 4.48196 1.50223ZM7.52767 1.50918C10.8026 1.50918 13.4663 4.17287 13.4663 7.44779C13.4663 10.7227 10.8026 13.3864 7.52767 13.3864C4.25275 13.3864 1.58906 10.7227 1.58906 7.44779C1.58906 4.17287 4.25275 1.50918 7.52767 1.50918ZM13.508 10.5004C13.6156 10.5595 13.6538 10.6915 13.5983 10.7991C12.9662 11.966 12.0077 12.9315 10.8477 13.5705C10.7401 13.6295 10.6081 13.5878 10.5491 13.4836C10.49 13.376 10.5282 13.2405 10.6359 13.1815C11.7229 12.5807 12.6189 11.6812 13.2128 10.5873C13.251 10.5178 13.31 10.4866 13.369 10.4761C13.4211 10.4692 13.4732 10.4831 13.508 10.5004Z"
            fill="#FFA009"
          />
        </g>
        <defs>
          <clipPath id="clip0_18095_15617">
            <rect width="15" height="15" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
  },
];
export const receiptOutstandingPaymentModeData = [
  {
    payment_mode_id: 0,
    payment_mode_name: 'cash',
    payment_mode_label: 'Cash',
    payment_mode_img: paymentCash,
    is_payment_disable: false,
  },
  {
    payment_mode_id: 1,
    payment_mode_name: 'knet',
    payment_mode_label: 'KNET',
    payment_mode_img: paymentKnet,
    is_payment_disable: false,
  },
  {
    payment_mode_id: 2,
    payment_mode_name: 'debit',
    payment_mode_label: 'Debit',
    payment_mode_img: paymentDebit,
    is_payment_disable: false,
  },
  {
    payment_mode_id: 3,
    payment_mode_name: 'credit',
    payment_mode_label: 'Credit',
    payment_mode_img: paymentCredit,
    is_payment_disable: false,
  },
  {
    payment_mode_id: 4,
    payment_mode_name: 'pay_with_advance',
    payment_mode_label: 'Pay with Advance',
    payment_mode_img: paymentCash,
    is_payment_disable: false,
  },
  {
    payment_mode_id: 5,
    payment_mode_name: 'loyalty_points',
    payment_mode_label: 'Loyalty points',
    payment_mode_img: paymentLoyaltyPoints,
    is_payment_disable: false,
  },
];

export const receiptAdvancePaymentModeData = [
  {
    payment_mode_id: 0,
    payment_mode_name: 'cash',
    payment_mode_label: 'Cash',
    payment_mode_img: paymentCash,
    is_payment_disable: false,
  },
  {
    payment_mode_id: 1,
    payment_mode_name: 'knet',
    payment_mode_label: 'KNET',
    payment_mode_img: paymentKnet,
    is_payment_disable: false,
  },
  {
    payment_mode_id: 2,
    payment_mode_name: 'debit',
    payment_mode_label: 'Debit',
    payment_mode_img: paymentDebit,
    is_payment_disable: false,
  },
  {
    payment_mode_id: 3,
    payment_mode_name: 'credit',
    payment_mode_label: 'Credit',
    payment_mode_img: paymentCredit,
    is_payment_disable: false,
  },
  {
    payment_mode_id: 4,
    payment_mode_name: 'pay_with_advance',
    payment_mode_label: 'Pay with Advance',
    payment_mode_img: paymentCash,
    is_payment_disable: true,
  },
  {
    payment_mode_id: 5,
    payment_mode_name: 'loyalty_points',
    payment_mode_label: 'Loyalty points',
    payment_mode_img: paymentLoyaltyPoints,
    is_payment_disable: false,
  },
];

export const sourceDestinationdata: any = [
  {
    value: 'DEPARTMENT',
    lable: 'Department',
  },
  {
    value: 'ROOM',
    lable: 'Room',
  },
  {
    value: 'INDIVIDUAL',
    lable: 'Individual',
  },
  {
    value: 'BRANCH_STORE',
    lable: 'Branch Store',
  },
];
export const appointmentTypes = ['CHAT', 'AUDIO', 'VIDEO'];

// Dentist Sidebar Data
export const dentistSidebarData: ISidebar[] = [
  {
    id: 0,
    name: 'Dentist',
    icon: DashboardIcon,
    navigate: '/dentist',
  },
  {
    id: 1,
    name: 'Diagnosis',
    icon: DiagnosisIcon,
    navigate: '/patientdiagnosis',
    activeLocation: 'patientdiagnosis',
  },
  {
    id: 2,
    name: 'Form Builder',
    icon: FormBuilderIcon,
    navigate: '/formBuilder',
  },
  {
    id: 4,
    name: 'Patient EMR',
    icon: PatientEMRIcon,
    navigate: '/patientemr',
    activeLocation: 'patientemr',
  },
];

export const dentistDiagnosisTabData: ITab[] = [
  {
    id: 0,
    name: 'Diagnosis',
    navigate: 'diagnosis',
  },
  {
    id: 1,
    name: 'Treatment',
    navigate: 'treatment',
  },
  {
    id: 2,
    name: 'Medication',
    navigate: 'medication',
  },
  {
    id: 3,
    name: 'Request',
    navigate: 'request',
  },
  {
    id: 4,
    name: 'Referral',
    navigate: 'referral',
  }
];
export const formOneData: any[] = [
  {
    que: 'Are you diabetic?',
    y: 'Yes',
    n: 'No',
    queId: 1,
    isY: false,
    isN: false,
    yesId: 1,
    noId: 1,
  },
  {
    que: 'Are you married?',
    y: 'Yes',
    n: 'No',
    queId: 2,
    isY: false,
    isN: false,
    yesId: 2,
    noId: 2,
  },
  {
    que: 'Are you suffering from chronic disease?',
    y: 'Yes',
    n: 'No',
    queId: 3,
    isY: false,
    isN: false,
    yesId: 3,
    noId: 3,
  },
];

export const formTwoData: any[] = [
  {
    que: 'Do you suffer from indigestion?',
    y: 'Yes',
    n: 'No',
    queId: 1,
    isY: false,
    isN: false,
    yesId: 1,
    noId: 1,
  },
  {
    que: 'Are you often sick to your stomach?',
    y: 'Yes',
    n: 'No',
    queId: 2,
    isY: false,
    isN: false,
    yesId: 2,
    noId: 2,
  },
  {
    que: 'Is your appetite always poor?',
    y: 'Yes',
    n: 'No',
    queId: 3,
    isY: false,
    isN: false,
    yesId: 3,
    noId: 3,
  },
];

export const formThreeData: any[] = [
  {
    que: 'Are your joints often painfully swollen? ',
    y: 'Yes',
    n: 'No',
    queId: 1,
    isY: false,
    isN: false,
    yesId: 1,
    noId: 1,
  },
  {
    que: 'Is your skin very sensitive or tender?',
    y: 'Yes',
    n: 'No',
    queId: 2,
    isY: false,
    isN: false,
    yesId: 2,
    noId: 2,
  },
  {
    que: 'Does your skin often break out in a rash?',
    y: 'Yes',
    n: 'No',
    queId: 3,
    isY: false,
    isN: false,
    yesId: 3,
    noId: 3,
  },
];

export const targetsData = [
  {
    value: 150,
    label: 'Weekly Revenue',
    rise: true,
    kpiIndex: 100,
  },
  {
    value: 300,
    label: 'Monthly Revenue',
    rise: false,
    kpiIndex: 120,
  },
  {
    value: 577,
    label: 'Quarterly Revenue',
    rise: false,
    kpiIndex: 23,
  },
  {
    value: 945,
    label: 'Yearly Revenue',
    rise: true,
    kpiIndex: 55,
  },
]
export const masterUnitTypeData: any = [
  // {
  //   Header: 'ID',
  //   accessor: '_id',
  // },
  {
    Header: 'UNIT TYPE',
    accessor: 'value',
  },

  {
    Header: 'QTY',
    Cell: (cell: any) => {
      const qty = cell?.row?.original?.metadata?.qty;
      return (
        <>
          <p>{qty}</p>
        </>
      );
    },
    accessor: 'qty',
  },
  {
    Header: 'ACTIVE STATUS',
    Cell: (props: any) => {
      const is_active = props?.row?.original?.is_active;
      return (
        <ToggleSwitchV2
          isToggled={is_active}
          handleToggle={() => props.onClick(props?.row?.original)}
        />
      );
    },
  },
  {
    Header: 'ACTION',
    Cell: ({ row }: any) => {
      const dispatch = useAppDispatch();
      const handleEdit = (item: any) => {
        console.log('item', item);
        dispatch(getAllMasterValuePayloadData(item));
      };
      return (
        <EditIcon
          fillColor={colors.grey4}
          handleClick={() =>
            row?.original?.is_active && handleEdit(row?.original)
          }
        />
      );
    },
  },
];

export const roleTypeDropdown = [
  {
    label: 'Primary',
    value: 'primary',
  },
  {
    label: 'Secondary',
    value: 'secondary',
  },
];

import DropdownV2 from '../../components/common/dropdown/dropdownv2/DropdownV2'
import AddNotes from '../../components/common/modal/add-notes/AddNotes'
import Popup from '../../components/common/popup/Popup'
import moment from 'moment'

import {
  CalculatorIcon,
  DeleteIcon,
} from '../../components/common/svg-components'
import { useAppDispatch, useAppSelector } from '../../hooks'
import {
  setCalculatorDialog,
  updateTreatmentPlanTableData,
  updateTreatmentPlansFromtable,
} from '../../redux/features/treatmentPlans/treatmentPlansSlice'
import {
  allowedNumberOfDigitsAfterDecimal,
  disableArrowKey,
  utcToDate,
} from '../../utils/utils'
import {
  billableDropdownData,
  billedStatusDropdown,
  optionsArrayForStatus,
} from '../data'
import styles from './tableData.module.scss'
import { useState, useEffect } from 'react'

export const predefinedPlanHeaderData: any = [
  {
    Header: 'PROCEDURE NAME',
    accessor: 'procedure_name',
  },
  {
    Header: 'SERVICES NAME',
    accessor: 'service_name',
  },
  {
    Header: 'SESSIONS',
    accessor: 'sessions',
  },
  {
    Header: 'SESSION#',
    accessor: 'sessionsIndex',
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
    Cell: (props: any) => {
      const notesObject = {
        noteDetail: props?.row?.original?.note,
        lastUpdateDate: props?.row?.original?.updatedAt
          ? utcToDate(props?.row?.original?.updatedAt)
          : '',
      }
      return (
        <>
          {notesObject?.noteDetail ? (
            <span
              className={styles.view}
              onClick={() => props.onClick(notesObject)}
            >
              View
            </span>
          ) : (
            '-'
          )}
        </>
      )
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
      )
    },
  }
]

const getOptionForTooth=(props:any,procedure_name:string,tooths:any[]=[])=>{
    const no_tooth_selection_procedure:any[]= ['Exam','XRay','Other'];
    if(!no_tooth_selection_procedure.includes(procedure_name)){
     
     if(tooths.length>0){
       return (
        <span
          className={styles.viewPopupLink}
          onClick={() =>
            props.onClick({
              selectToothAction: {
                mode:'EDIT',
                data:props?.row?.original,
                isToothSelectionDialogOpen: true,
                _id: props?.row?.original?._id,
              },
            })
          }
        >
          {tooths.map((t:any)=>(<p>{t.display_tooth_number}</p>))}
        </span>
      )
      }
      else{
        return (
          <span
              className={styles.addNotePopupLink}
              onClick={() =>
                props.onClick({
                  selectToothAction: {
                    mode:'EDIT',
                    data:props?.row?.original,
                    isToothSelectionDialogOpen: true,
                    _id: props?.row?.original?._id,
                  },
                })
              }
            >
              Select Tooth
            </span>
        )
      }
    }else{
      return (
        <span
            className={styles.addNotePopupLink}
            onClick={() =>
              props.onClick({
                selectToothAction: {
                  mode:'EDIT',
                  data:props?.row?.original,
                  isToothSelectionDialogOpen: true,
                  _id: props?.row?.original?._id,
                },
              })
            }
          >
            Edit
          </span>
      )
    }
}

/* tableHeaderColumns definition for treatment plans list module */
export const dentalTreatmentPlansMainTableHeaderData: any = [
 /*  {
    Header: 'PLAN',
    // accessor: 'treatmentPlanName',
    accessor: (row: any) => {
      return row?.treatmentPlanName ?? '-'
    },
  }, */
  {
    Header: 'Date',
    accessor: 'last_treatment_done_at',
    Cell: (props: any) => {
      return(
        <>
          <div>
          { moment(props?.row?.original?.last_treatment_done_at).format('DD/MM/YYYY') }
          </div> 
        </>
        )
      }
  },
  {
    Header: 'DOCTOR NAME',
    accessor: '',
    Cell: (props: any) => {
      const { doctorData } = useAppSelector((state) => state.appointments)
      const { treatmentPlanTableData } = useAppSelector(
        (state) => state.treatmentPlans
      )
      const [selectedItem, setSelectedItem] = useState({
        name: 'Select Doctor',
        _id: '',
      })
      const dispatch = useAppDispatch()
      useEffect(() => {
         if (props?.row?.original?.doctor_id) {
          const doctorItem = doctorData?.find((item: any) => {
            return item?._id === props?.row?.original?.doctor_id
          })
          setSelectedItem({
            name: doctorItem?.doctor_name,
            _id: doctorItem?._id,
          })
        } else {
          setSelectedItem({
            name: 'Select Doctor',
            _id: '',
          })
        }
      }, [props?.row?.original?.doctor_id, doctorData])
      const handleDoctorForTreatment = (doctor: any) => {
        let tempArr: any = []
        tempArr = treatmentPlanTableData.map((item: any, index: number) => {
          try {
            if (item?._id === props?.row?.original?._id) {
              return {
                ...item,
                doctor_id: doctor?._id,
                doctor_name: doctor?.doctor_name,
              }
            } else {
              return item
            }
          } catch (error: any) {
            console.log('error', error)
          }
        })
        dispatch(updateTreatmentPlansFromtable(tempArr))
        setSelectedItem({ name: doctor?.doctor_name, _id: doctor?._id })
      }
      return (
        <>
          <DropdownV2
            data={doctorData}
            keyName="doctor_name"
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            notShowAllOption={true}
            handleClick={(item: any) => handleDoctorForTreatment(item)}
            customClassForItem={styles.customClassForDropdownItem}
            customClassBox={styles.dropdownHeaderBox}
            customClass={styles.dropdownMainContainer}
            customClassBody={styles.dropdownBody}
          />
        </>
      )
    },
  },
  {
    Header: "AGE_GROUP",
    accessor: "age_group",
    Cell: (props: any) => {
      return (
        <>
          {props?.row?.original?.age_group?.label ? props?.row?.original?.age_group?.label:' - '}
        </>
      );
    },
  },
  {
    Header: "PROCEDURE",
    accessor: "procedure",
    Cell: (props: any) => {
      return (
        <>
          {props?.row?.original?.procedure_name ? props?.row?.original?.procedure_name:' - '}
        </>
      );
    },
  },
  {
    Header: "PROCEDURE_SUBTYPE",
    accessor: "procedure_subtype",
    Cell: (props: any) => {
      return (
        <>
          {props?.row?.original?.procedure_subtype ? props?.row?.original?.procedure_subtype:' - '}
        </>
      );
    },
  },
  {
    Header: "SERVICE",
    accessor: "service",
    Cell: (props: any) => {
      return (
        <>
          {props?.row?.original?.service_name ? props?.row?.original?.service_name: ' - '}
        </>
      );
    },
  },
  {
    Header: "SELECTED TOOTHS",
    // accessor: "test_name",
    disableSortBy: true,
    Cell: (props: any) => {
      return (
        <>
          {getOptionForTooth(props,props?.row?.original?.procedure_name,props?.row?.original?.selected_tooths)}
        </>
      );
    },
  },
  /* {
    Header: 'SESSIONS',
    accessor: 'sessions',
  },
  {
    Header: 'SESSION#',
    accessor: 'sessionsIndex',
  }, */
  {
    Header: 'QUANTITY',
    accessor: 'quantity',
    Cell: (props: any) => {
    return  props?.row?.original?.type==='TREATMENT' ? props?.row?.original?.quantity:' - ';
    }
  },
  {
    Header: 'STATUS',
    accessor: 'status',
    Cell: (props: any) => {
      const dispatch = useAppDispatch()
      const { treatmentPlanTableData } = useAppSelector(
        (state) => state.treatmentPlans
      )
      const [selectedItem, setSelectedItem] = useState<any>({
        name: 'Select Status',
        _id: '',
      })

      useEffect(() => {
        if (props?.row?.original?.status) {
          const statusItem = optionsArrayForStatus?.find((item: any) => {
            return item?._id === props?.row?.original?.status
          })
          setSelectedItem({
            name: statusItem?.name,
            _id: statusItem?._id,
          })
        } else {
          setSelectedItem({
            name: 'Select Status',
            _id: '',
          })
        }
      }, [props?.row?.original?.status, optionsArrayForStatus])
      const handleStatusForTreatment = (status: any) => {
        let tempArr: any = []
        tempArr = treatmentPlanTableData.map((item: any, index: number) => {
          try {
            if (item?._id === props?.row?.original?._id) {
              return {
                ...item,
                status: status?._id,
                billed:
                  status?._id === 'attended' ? 'to-be-billed' : item?.billed,
              }
            } else {
              return item
            }
          } catch (error: any) {
            console.log('error', error)
          }
        })
        dispatch(updateTreatmentPlansFromtable(tempArr))
        setSelectedItem({ name: status?.name, _id: status?._id })
      }
      return  props?.row?.original?.type==='TREATMENT' ? (
        <DropdownV2
          data={optionsArrayForStatus}
          keyName="name"
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          notShowAllOption={true}
          handleClick={(item: any) => {
            handleStatusForTreatment(item)
          }}
          customClassForItem={styles.customClassForDropdownItem}
          customClassBox={styles.dropdownHeaderBox}
          customClass={styles.dropdownMainContainer}
        />
      ):''
    },
  },
  {
    Header: 'PRICE',
    accessor: (row: any) => {
      return row?.type==='TREATMENT' ? allowedNumberOfDigitsAfterDecimal(row?.price, 3) || '-':'-';
    },
  },
  {
      Header: 'DISCOUNT',
      accessor: (row: any) => {
        return row?.type==='TREATMENT' ? allowedNumberOfDigitsAfterDecimal(row?.discount, 3) || '-':'-';
      }
  },
  {
      Header: 'TOTAL_AMOUNT',
      accessor: (row: any) => {
        return row?.type==='TREATMENT' ? allowedNumberOfDigitsAfterDecimal(row?.total_amount, 3) || '-':'-';
      }
  },
  {
    Header: 'BILLABLE',
    accessor: 'billable',
    Cell: (props: any) => {
      const dispatch = useAppDispatch()
      const { treatmentPlanTableData } = useAppSelector((state) => state.treatmentPlans)
      const [selectedItem, setSelectedItem] = useState<any>({
        name: 'Select Billable',
        _id: '',
      })
      useEffect(() => {
        if (props?.row?.original?.billable) {
          const billableItem = billableDropdownData?.find((item: any) => {
            return item?._id === props?.row?.original?.billable
          })
          setSelectedItem({
            name: billableItem?.name,
            _id: billableItem?._id,
          })
        } else {
          setSelectedItem({
            name: 'No',
            _id: false,
          })
        }
      }, [props?.row?.original?.billable, billableDropdownData])
      const handleBillableForTreatment = (billable: any) => {
        let tempArr: any = []
        tempArr = treatmentPlanTableData.map((item: any, index: number) => {
          try {
            if (item?._id === props?.row?.original?._id) {
              return {
                ...item,
                billable: billable?._id,
              }
            } else {
              return item
            }
          } catch (error: any) {
            console.log('error', error)
          }
        })
        dispatch(updateTreatmentPlansFromtable(tempArr))
        setSelectedItem({ name: billable?.name, _id: billable?._id })
      }
      return  props?.row?.original?.type==='TREATMENT' ? (
        <DropdownV2
          data={billableDropdownData}
          keyName="name"
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          notShowAllOption={true}
          handleClick={(item: any) => {
            handleBillableForTreatment(item)
          }}
          customClassForItem={styles.customClassForDropdownItem}
          customClassBox={styles.dropdownHeaderBox}
          customClass={styles.dropdownMainContainer}
        />
      ):' - '
    },
  },
  {
    Header: 'BILLED',
    accessor: 'billed',
    Cell: (props: any) => {
      const dispatch = useAppDispatch()
      const { treatmentPlanTableData } = useAppSelector(
        (state) => state.treatmentPlans
      )
      const [selectedItem, setSelectedItem] = useState<any>({
        name: 'Select Billed',
        _id: '',
      })

      useEffect(() => {
        if (props?.row?.original?.billed) {
          const billedItem = billedStatusDropdown?.find((item: any) => {
            return item?._id === props?.row?.original?.billed
          })
          setSelectedItem({
            name: billedItem?.name,
            _id: billedItem?._id,
          })
        } else {
          setSelectedItem({
            name: 'Select Billed',
            _id: '',
          })
        }
      }, [props?.row?.original?.billed, billedStatusDropdown])
      
      const handleBilledForTreatment = (billed: any) => {
        let tempArr: any = []
        tempArr = treatmentPlanTableData.map((item: any, index: number) => {
          try {
            if (item?._id === props?.row?.original?._id) {
              return {
                ...item,
                billed: billed?._id,
              }
            } else {
              return item
            }
          } catch (error: any) {
            console.log('error', error)
          }
        })
        dispatch(updateTreatmentPlansFromtable(tempArr))
        setSelectedItem({ name: billed?.name, _id: billed?._id })
      }
      return props?.row?.original?.type==='TREATMENT' ?(
        <DropdownV2
          data={billedStatusDropdown}
          keyName="name"
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          notShowAllOption={true}
          handleClick={(item: any) => {
            handleBilledForTreatment(item)
          }}
          customClassForItem={styles.customClassForDropdownItem}
          customClassBox={styles.dropdownHeaderBox}
          customClass={styles.dropdownMainContainer}
        />
      ):' - '
    },
  },
  {
    Header: 'ATTENDED BY',
    accessor: '',
    Cell: (props: any) => {
      const { userDataByRole } = useAppSelector((state) => state.manageUser)

      const { treatmentPlanTableData } = useAppSelector(
        (state) => state.treatmentPlans
      )
      const [selectedItem, setSelectedItem] = useState({
        name: 'Select User',
        _id: '',
      })
      const dispatch = useAppDispatch()
      useEffect(() => {
        if (props?.row?.original?.attented_by_id) {

          const userItem = userDataByRole?.find((item: any) => {
            return item?._id === props?.row?.original?.attented_by_id
          })
          setSelectedItem({
            name: userItem?.name ?? 'Select User',
            _id: userItem?._id ?? '',
          })
        } else {
          setSelectedItem({
            name: 'Select User',
            _id: '',
          })
        }
      }, [props?.row?.original?.attented_by_id, userDataByRole])
      const handleUserForTreatment = (user: any) => {
        let tempArr: any = []
        tempArr = treatmentPlanTableData.map((item: any, index: number) => {
          try {
            if (item?._id === props?.row?.original?._id) {
              return {
                ...item,
                attented_by_id: user?._id,
              }
            } else {
              return item
            }
          } catch (error: any) {
            console.log('error', error)
          }
        })
        dispatch(updateTreatmentPlansFromtable(tempArr))
        setSelectedItem({ name: user?.name, _id: user?._id })
      }
      return (
        <>
          <DropdownV2
            data={userDataByRole}
            keyName="name"
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            notShowAllOption={true}
            handleClick={(item: any) => {
              handleUserForTreatment(item)
            }}
            customClassForItem={styles.customClassForDropdownItem}
            customClassBox={styles.dropdownHeaderBox}
            customClass={styles.dropdownMainContainer}
          />
        </>
      )
    },
  },

  // {
  //   Header: 'NET PRICE',
  //   accessor: (row: any) => {
  //     return allowedNumberOfDigitsAfterDecimal(row?.netPrice, 3) || '-'
  //   },
  // },

  {
    Header: 'NOTES',
    accessor: 'notes',
    Cell: (props: any) => {
      return (
        <>
          <span
            className={styles.addNotePopupLink}
            onClick={() =>
              props.onClick({
                notes: {
                  isNotesIcon: true,
                  item: props?.row?.original,
                },
              })
            }
          >
            Add
          </span>
        </>
      )
    },
  },
  {
    Header: 'COMPLAINT',
    accessor: 'complaint',
    Cell: (props: any) => {
      return (
        <>
          <span
            className={styles.addNotePopupLink}
            onClick={() =>
              props.onClick({
                complaint: {
                  isComplaintIcon: true,
                  item: props?.row?.original,
                },
              })
            }
          >
            Add
          </span>
        </>
      )
    },
  },
  {
    Header: 'ACTION',
    accessor: 'action',
    Cell: (props: any) => {
      return (
        <>
          { 
          props.row.original.show_delete_icon ? (
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
          ):(
            '-'
          ) 
        }
        </>
      )
    },
  },
]

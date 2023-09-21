import DropdownV2 from '../../components/common/dropdown/dropdownv2/DropdownV2'
import AddNotes from '../../components/common/modal/add-notes/AddNotes'
import Popup from '../../components/common/popup/Popup'
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
    Header: 'SERVICES NAME',
    accessor: 'name',
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
      // console.log(notesObject);

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
                  _id: props?.row?.original?.sessionId,
                },
              })
            }
          />
        </>
      )
    },
  },
]

/* tableHeaderColumns definition for treatment plans list module */
export const treatmentPlansMainTableHeaderData: any = [
  {
    Header: 'PLAN',
    // accessor: 'treatmentPlanName',
    accessor: (row: any) => {
      return row?.treatmentPlanName ?? '-'
    },
  },
  {
    Header: 'INSURANCE PLAN',
    // accessor: 'treatmentPlanName',
    accessor: (row: any) => {
      return row?.insurance_plan_name ?? '-'
    },
  },
  {
    Header: 'DOCTOR NAME',
    accessor: '',
    Cell: (props: any) => {
      console.log(props.row.original, 'propsrow')
      console.log('..........')
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
            if (item?.sessionId === props?.row?.original?.sessionId) {
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
            isDisable={props?.row?.original?.is_disable ? true : false ?? false}
          />
        </>
      )
    },
  },
  {
    Header: 'SERVICES',
    accessor: 'name',
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
    Header: 'STATUS',
    accessor: 'status',
    Cell: (props: any) => {
      console.log(props.row.original, 'status')
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
            if (item?.sessionId === props?.row?.original?.sessionId) {
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
      return (
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
          isDisable={props?.row?.original?.is_disable ? true : false ?? false}
        />
      )
    },
  },
  {
    Header: 'PRICE',
    accessor: (row: any) => {
      return allowedNumberOfDigitsAfterDecimal(row?.price, 3) || '-'
    },
  },
  {
    Header: () => {
      const dispatch = useAppDispatch()
      const { isCalculatorDialogOpen } = useAppSelector(
        (state) => state.treatmentPlans
      )
      return (
        <>
          <span>DISCOUNT </span>
          <CalculatorIcon
            handleClick={() =>
              dispatch(setCalculatorDialog(!isCalculatorDialogOpen))
            }
          />
        </>
      )
    },
    accessor: 'discount',
    Cell: ({ cell }: { cell: any }) => {
      console.log('cell', cell)
      const dispatch = useAppDispatch()
      const { treatmentPlanTableData } = useAppSelector(
        (state) => state.treatmentPlans
      )
      const handleChange = (e: any) => {
        const discount = e.target.value
        let tempArr: any = []
        tempArr = treatmentPlanTableData.map((item: any, index: number) => {
          try {
            if (item?.sessionId === cell?.row?.original?.sessionId) {
              return {
                ...item,
                discount: discount,
              }
            } else {
              return item
            }
          } catch (error: any) {
            console.log('error', error)
          }
        })
        dispatch(updateTreatmentPlansFromtable(tempArr))
      }
      return (
        <input
          type="number"
          value={treatmentPlanTableData[cell.row.index].discount}
          className="common-input-wrapper__input-for-dataTable"
          onChange={handleChange}
          onKeyDown={(e: any) => disableArrowKey(e)}
          onWheel={(e: any) => {
            e.target.blur()
          }}
          disabled={
            cell?.row?.original?.is_disable ||
            cell?.row?.original?.insurance_plan_id
              ? true
              : false
          }
        />
      )
    },
  },

  {
    Header: 'BILLABLE',
    accessor: 'billable',
    Cell: (props: any) => {
      const dispatch = useAppDispatch()
      const { treatmentPlanTableData } = useAppSelector(
        (state) => state.treatmentPlans
      )
      const [selectedItem, setSelectedItem] = useState<any>({
        name: 'Select Billable',
        _id: '',
      })
      console.log('billable', props)
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
        console.log('itembi', props?.row?.original)
        let tempArr: any = []
        tempArr = treatmentPlanTableData.map((item: any, index: number) => {
          try {
            if (item?.sessionId === props?.row?.original?.sessionId) {
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
      return (
        <DropdownV2
          data={billableDropdownData}
          keyName="name"
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          notShowAllOption={true}
          handleClick={(item: any) => {
            console.log('item>>', item)
            handleBillableForTreatment(item)
          }}
          customClassForItem={styles.customClassForDropdownItem}
          customClassBox={styles.dropdownHeaderBox}
          customClass={styles.dropdownMainContainer}
          isDisable={
            props?.row?.original?.is_disable ||
            props?.row?.original?.insurance_plan_id
              ? true
              : false
          }
        />
      )
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
      }, [props?.row?.original?.billed, billedStatusDropdown]);
      const handleBilledForTreatment = (billed: any) => {
        let tempArr: any = []
        tempArr = treatmentPlanTableData.map((item: any, index: number) => {
          try {
            if (item?.sessionId === props?.row?.original?.sessionId) {
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
      return (
        <DropdownV2
          data={billedStatusDropdown}
          keyName="name"
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          notShowAllOption={true}
          handleClick={(item: any) =>
            item?._id === 'billed' ? {} : handleBilledForTreatment(item)
          }
          customClassForItem={styles.customClassForDropdownItem}
          customClassBox={styles.dropdownHeaderBox}
          customClass={styles.dropdownMainContainer}
          isDisable={
            props?.row?.original?.is_disable ||
            props?.row?.original?.insurance_plan_id
              ? true
              : false ?? false
          }
        />
      )
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
        if (props?.row?.original?.attended_by_id) {
          const userItem = userDataByRole?.find((item: any) => {
            return item?._id === props?.row?.original?.attended_by_id
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
      }, [props?.row?.original?.attended_by_id, userDataByRole])
      const handleUserForTreatment = (user: any) => {
        let tempArr: any = []
        tempArr = treatmentPlanTableData.map((item: any, index: number) => {
          try {
            if (item?.sessionId === props?.row?.original?.sessionId) {
              return {
                ...item,
                attended_by_id: user?._id,
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
            isDisable={props?.row?.original?.is_disable ? true : false ?? false}
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
              props.row.original.is_disable
                ? undefined
                : props.onClick({
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
    Header: 'ACTION',
    accessor: 'action',
    Cell: (props: any) => {
      return (
        <>
          {props.row.original.billed &&
          props.row.original.billed === 'billed' ? (
            '-'
          ) : (
            <DeleteIcon
              fillColor="#CDD4D8"
              handleClick={() =>
                props.row.original.is_disable
                  ? undefined
                  : props.onClick({
                      deleteAction: {
                        isDeleteDialogOpen: true,
                        _id: props?.row?.original?.sessionId,
                      },
                    })
              }
            />
          )}
        </>
      )
    },
  },
]

import { FC, useState, useEffect } from 'react'
import styles from './medication.module.scss'
import Button from '../../../components/common/button/Button'
import TableV2 from '../../../components/common/table/tableV2/TableV2'
import Popup from '../../../components/common/popup/Popup'
import MedicineCompositionPopup from '../../../components/common/modal/medicine-composition-popup/MedicineCompositionPopup'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { requestGenerator } from '../../../utils/payloadGenerator'
import {
  addPatientPrescription,
  getAllMedicine,
  getAllMedicineCategory,
  getPatientMedicine,
  markStage,
} from '../../../redux/features/diagnosis/diagnosisAsyncActions'
import Loader from '../../../components/common/spinner/Loader'
import { DeleteIcon } from '../../../components/common/svg-components'
import { colors } from '../../../constants/color'
import DeleteMedicationPopup from '../../../components/common/modal/delete-medication-popup/DeleteMedicationPopup'
import { useNavigate } from 'react-router-dom'
import { updateAppointmentStatus } from '../../../redux/features/appointment/appointmentAsyncActions'
import { setMessage } from '../../../redux/features/toast/toastSlice'
import { failure, success } from '../../../constants/data'
import EndDiagnosisPopup from '../../../components/common/modal/end-diagnosis-popup/EndDiagnosisPopup'
import { clearDiagnosisId } from '../../../redux/features/doctor-diagnosis/doctorDiagnosisSlice'
import {
  clearMedicineData,
  clearPatientMedicineData,
} from '../../../redux/features/diagnosis/diagnosisSlice'
import Select from 'react-select'
import DropdownV2 from '../../../components/common/dropdown/dropdownv2/DropdownV2'

const Medication: FC = () => {
  const medicationTableData = [] as any
  const { isLoading, medicineCategory, medicineData, patientMedicineData } =
    useAppSelector((state) => state.diagnosis)
  const [medicineRow, setMedicineRow] = useState(medicationTableData)
  const [focusedField, setFocusedField] = useState('')
  const [focusDuration, setfocusDuration] = useState('')
  const [focusFrequnency, setfocusFrequnency] = useState('')
  const [deleteMedication, setDeleteMedication] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const [medicine, setMedicine] = useState('')
  const [category, setCategory] = useState('')
  const [rowId, setRowId] = useState(0)
  const [medicineComposition, setMedicineComposition] = useState<boolean>(false)
  const [deleteId, setDeleteId] = useState('')
  const [endMedication, setEndMedication] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectMedicine, setSelectMedicine] = useState(null)
  const navigate = useNavigate()
  const { patientFormData } = useAppSelector((state) => state.patientHistory)
  const { createdDiagnosisId } = useAppSelector(
    (state) => state.doctorDiagnosis
  )

  useEffect(() => {
    dispatch(getAllMedicineCategory(requestGenerator({})))

    if (patientFormData?.diag_id !== null || createdDiagnosisId?.length > 0) {
      let requestData = {
        diagnosis_id:
          createdDiagnosisId?.length > 0
            ? createdDiagnosisId
            : patientFormData?.diag_id
            ? patientFormData?.diag_id
            : '',
      }
      if (requestData?.diagnosis_id) {
        dispatch(getPatientMedicine(requestGenerator(requestData)))
      }
    }
  }, [])

  useEffect(() => {
    setMedicineRow(patientMedicineData)
  }, [patientMedicineData])

  const handleCategory = (e: any) => {
    setCategory(e.label)
    setSelectedCategory(e)
    let reqData = {
      cat_name: e.label,
    }
    dispatch(getAllMedicine(requestGenerator(reqData)))
  }

  const newRow = {
    _id: rowId,
    medicine_name: medicine,
    qty: '',
    duration: '',
    frequency: '',
    billable: false,
    // stockAvail: "Stock avail.",
  }

  const handleQty = (e: React.ChangeEvent<HTMLInputElement>, _id: any) => {
    const newQty = e.target.value.replace(/\D/g, '').slice(0, 3)
    // const newQty = e.target.value;
    let newId = patientMedicineData?.length > 0 ? _id : parseInt(_id)
    let newData = medicineRow.map((item: any) => {
      if (item?._id === newId) {
        let updateData = { ...item, qty: parseInt(newQty) }
        return updateData
      } else {
        return item
      }
    })

    setMedicineRow(newData)
  }

  const handleKeyDown = (e: any) => {
    if (e.target.value.length >= 2 && e.key !== 'Backspace') {
      e.preventDefault() // Prevent further input when the limit is reached
    }
  }

  const handleFocus = (_id: any) => {
    setFocusedField(_id)
    setfocusDuration('')
    setfocusFrequnency('')
  }
  const handleDurationFocus = (_id: any) => {
    setfocusDuration(_id)
    setFocusedField('')
    setfocusFrequnency('')
  }
  const handleFrequnencyFocus = (_id: any) => {
    setfocusFrequnency(_id)
    setfocusDuration('')
    setFocusedField('')
  }

  const handleDuration = (e: React.ChangeEvent<HTMLInputElement>, _id: any) => {
    const newQty = e.target.value
    let newId = patientMedicineData?.length > 0 ? _id : parseInt(_id)
    let newData = medicineRow.map((item: any) => {
      if (item?._id === newId) {
        let updateData = { ...item, duration: newQty }
        return updateData
      } else {
        return item
      }
    })
    setMedicineRow(newData)
  }

  const handleFreq = (e: React.ChangeEvent<HTMLInputElement>, _id: any) => {
    let newId = patientMedicineData?.length > 0 ? _id : parseInt(_id)
    let newData = medicineRow.map((item: any) => {
      if (item?._id === newId) {
        let updateData = { ...item, frequency: e.target.value }
        return updateData
      } else {
        return item
      }
    })
    setMedicineRow(newData)
  }

  const handleBillable = (e: any, _id: any) => {
    let newId = patientMedicineData?.length > 0 ? _id : parseInt(_id)
    let newData = medicineRow.map((item: any) => {
      if (item?._id === newId) {
        if (e.target.value === 'no') {
          let updateData = { ...item, billable: false }
          return updateData
        } else if (e.target.value === 'yes') {
          let updateData = { ...item, billable: true }
          return updateData
        }
      } else {
        return item
      }
    })
    setMedicineRow(newData)
  }

  const medicationHeaderData: any = [
    {
      Header: 'MEDICINE NAME',
      accessor: 'medicine_name',
    },
    {
      Header: 'QTY',
      Cell: ({ row }: any) => {
        const _id = row?.original?._id
        console.log('_id', _id)

        return (
          <>
            <input
              className={styles.inputField}
              value={parseInt(row?.original?.qty)}
              type="number"
              onChange={(e) => handleQty(e, _id)}
              onKeyDown={handleKeyDown}
              onFocus={() => handleFocus(_id)}
              key={_id}
              autoFocus={focusedField === _id}
              // disabled={patientMedicineData?.length > 0 ? true : false}
            />
          </>
        )
      },
    },
    {
      Header: 'SCHEDULE',
      columns: [
        {
          Header: 'Duration',
          Cell: ({ row }: any) => {
            // const { _id } = row;
            const _id = row?.original?._id

            return (
              <>
                <input
                  className={styles.inputField}
                  value={row?.original?.duration}
                  type="text"
                  onChange={(e) => {
                    handleDuration(e, _id)
                  }}
                  key={_id}
                  onFocus={() => handleDurationFocus(_id)}
                  autoFocus={focusDuration === _id}
                  // disabled={patientMedicineData?.length > 0 ? true : false}
                />
              </>
            )
          },
        },
        {
          Header: 'Frequency',
          Cell: ({ row }: any) => {
            // const { _id } = row;
            const _id = row?.original?._id

            return (
              <>
                <input
                  className={styles.inputField}
                  value={row?.original?.frequency}
                  type="text"
                  onChange={(e) => {
                    handleFreq(e, _id)
                  }}
                  key={_id}
                  onFocus={() => handleFrequnencyFocus(_id)}
                  autoFocus={focusFrequnency === _id}
                  // disabled={patientMedicineData?.length > 0 ? true : false}
                />
              </>
            )
          },
        },
      ],
    },
    {
      Header: 'INTERNAL PHARMACY',
      // accessor: "stockAvail",
      Cell: ({}) => {
        return <p>-</p>
      },
    },
    {
      Header: 'BILLABLE',
      Cell: ({ row }: any) => {
        // const { _id } = row;
        const _id = row?.original?._id

        return (
          <>
            <select
              className={styles.inputField}
              value={row?.original?.billable === true ? 'yes' : 'no'}
              onChange={(e) => handleBillable(e, _id)}
              // disabled={patientMedicineData?.length > 0 ? true : false}
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </>
        )
      },
    },
    {
      Header: 'NOTES',
      Cell: ({}) => {
        return <p>-</p>
      },
    },
    {
      Header: 'ACTIONS',
      Cell: ({ row }: any) => {
        // console.log("row billed", row?.original?.billable);
        return (
          <DeleteIcon
            fillColor={colors.grey4}
            customClass={styles.iconStyle}
            handleClick={() => {
              if (
                // patientMedicineData?.length > 0 ||
                row?.original?.billable === true
              ) {
                setDeleteMedication(false)
              } else {
                setDeleteMedication(true)
                setDeleteId(row?.original?._id)
              }
            }}
          />
        )
      },
    },
  ]

  const addMedicine = () => {
    const updatedRow = {
      ...newRow,
      _id: rowId + 1,
    }

    const isMedicineExist =
      medicineRow?.length > 0 &&
      medicineRow.some(
        (medicine: any) => medicine.medicine_name === updatedRow?.medicine_name
      )

    if (isMedicineExist) {
      let toastData = {
        message: 'Medicine with the same name cannot be added',
        type: failure,
      }
      dispatch(setMessage(toastData))
    } else {
      setMedicineRow((prevDataArray: any) => {
        const newDataArray = Array.isArray(prevDataArray)
          ? [...prevDataArray]
          : []
        newDataArray.push(updatedRow)
        return newDataArray
      })
      setRowId((prevRowId) => prevRowId + 1)
      setMedicine('')
      setCategory('')
      setSelectedCategory(null)
      setSelectMedicine(null)
      dispatch(clearMedicineData())
    }
  }

  const handleSave = () => {
    const meds =
      medicineRow?.length > 0 &&
      medicineRow?.map(({ _id, stockAvail, ...rest }: any) => rest)
    let reqData = {
      diagnosis_id:
        createdDiagnosisId?.length > 0
          ? createdDiagnosisId
          : patientFormData?.diag_id !== null && patientFormData?.diag_id,
      meds: meds,
    }
    if (patientFormData?.diag_id == null && createdDiagnosisId?.length === 0) {
      dispatch(
        setMessage({ message: 'Please do diagnosis first', type: failure })
      )
    } else {
      if (meds?.length > 0) {
        dispatch(addPatientPrescription(requestGenerator(reqData))).then(
          (e) => {
            if (e.type === 'diagnosis/addPatientPrescription/fulfilled') {
              navigate('/patientdiagnosis/request')
            }
          }
        )
      } else {
        navigate('/patientdiagnosis/request')
        // let toastData = {
        //   message: 'Please fill medication data',
        //   type: failure,
        // }
        // dispatch(setMessage(toastData))
      }
    }
  }

  const handleDelete = () => {
    const deletedRow = medicineRow.findIndex((obj: any) => obj._id === deleteId)
    console.log('deletedRow', deletedRow)

    const updatedMedicineRow = [
      ...medicineRow.slice(0, deletedRow),
      ...medicineRow.slice(deletedRow + 1),
    ]

    const updatedMedicineRowWithIds = updatedMedicineRow.map(
      (obj: any, index: number) => ({
        ...obj,
        _id: index + 1,
      })
    )

    setRowId(updatedMedicineRowWithIds.length)
    setDeleteMedication(false)
    setMedicineRow(updatedMedicineRowWithIds)

    return medicineRow
  }

  const handleEndDiagnosis = () => {
    let reqData = {
      // diagnosis_id: "646e0979dafb09722afde19f",
      diagnosis_id:
        createdDiagnosisId?.length > 0
          ? createdDiagnosisId
          : patientFormData?.diag_id
          ? patientFormData?.diag_id
          : '',
      diagnosis_stage: 'E',
    }
    if (reqData?.diagnosis_id) {
      dispatch(markStage(requestGenerator(reqData))).then(() => {
        navigate('/doctor')
      })
      dispatch(clearDiagnosisId())
    }
  }

  const customStyles = {
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? 'white' : 'transparent', // Apply different background color if selected
      color: state.isSelected ? 'black' : 'black', // Apply different text color if selected
    }),
  }

  return (
    <>
      {isLoading && <Loader />}
      {medicineComposition && (
        <Popup
          Children={MedicineCompositionPopup}
          handleClose={() => setMedicineComposition(false)}
        />
      )}
      {deleteMedication && (
        <Popup
          Children={DeleteMedicationPopup}
          handleClose={() => setDeleteMedication(false)}
          handleNo={() => setDeleteMedication(false)}
          handleYes={() => handleDelete()}
        />
      )}
      {endMedication && (
        <Popup
          Children={EndDiagnosisPopup}
          handleClose={() => setEndMedication(false)}
          handleNo={() => setEndMedication(false)}
          handleYes={() => handleEndDiagnosis()}
        />
      )}
      <div className={styles.medicationContainer}>
        <div className={styles.filterDropdown}>
          <div className={styles.dropdownBtnContainer}>
            <div className={styles.filterContainer}>
              <p className={styles.filterText}>Category</p>
              <Select
                className={styles.select}
                placeholder="Select Category"
                closeMenuOnSelect={true}
                isSearchable={true}
                options={medicineCategory?.map((item: any) => ({
                  label: item?.category_name,
                  value: item?.value,
                }))}
                value={selectedCategory}
                onChange={(e: any) => handleCategory(e)}
                maxMenuHeight={200}
                styles={customStyles}
              />
            </div>
            <div className={styles.filterContainer}>
              <p className={styles.filterText}>Medicine</p>
              <Select
                className={styles.select}
                placeholder="Select Medicine"
                closeMenuOnSelect={true}
                isSearchable={true}
                options={medicineData?.map((item: any) => ({
                  label: item?.medicine_name,
                  value: item?.value,
                }))}
                value={selectMedicine}
                onChange={(e: any) => {
                  setMedicine(e.label)
                  setSelectMedicine(e)
                }}
                styles={customStyles}
                maxMenuHeight={200}
              />
            </div>
            <Button
              title="Add"
              customClass={styles.addBtn}
              handleClick={() => addMedicine()}
              disable={medicine !== '' ? false : true}
            />
          </div>
          <Button
            title="Medicines Composition"
            customClass={styles.medicineBtn}
            handleClick={() => setMedicineComposition(true)}
          />
        </div>
        <div style={{ minHeight: '70px' }}>
          {medicineRow && medicineRow?.length > 0 && (
            <TableV2
              tableHeaderData={medicationHeaderData}
              tableRowData={medicineRow}
              active={false}
            />
          )}
        </div>
        <div className={styles.saveBtn}>
          <Button
            title="Save & Next"
            handleClick={() => handleSave()}
            disable={
              createdDiagnosisId
                ? false
                : patientFormData?.diag_id
                ? false
                : true
            }
          />
          <Button
            title="End Diagnosis"
            customClass={styles.endButtonStyle}
            handleClick={() => setEndMedication(!endMedication)}
            disable={
              createdDiagnosisId
                ? false
                : patientFormData?.diag_id
                ? false
                : true
            }
          />
        </div>
      </div>
    </>
  )
}

export default Medication

import { FC, useState, useEffect } from 'react'
import styles from './addInsuranceModal.module.scss'
import { CloseIcon, SearchButton } from '../../svg-components'
import { colors } from '../../../../constants/color'
import Divider from '../../divider/Divider'

import { useAppDispatch, useAppSelector } from '../../../../hooks'
import {
  getAllPatientList,
  getPatientEmrById,
} from '../../../../redux/features/patient-emr/patient/patientAsyncAction'
import { requestGenerator } from '../../../../utils/payloadGenerator'
import Pagination from '../../pagination/Pagination'
import Loader from '../../spinner/Loader'
import TableV3 from '../../table/tableV3/TableV3'
import {
  Column,
  TableOptions,
  useGlobalFilter,
  useSortBy,
  useTable,
} from 'react-table'
import { Cols } from '../../../../interfaces/interfaces'
import {
  addInsuranceHeaderData,
  searchModalHeaderData,
} from '../../../../constants/table-data/userTableData'
import { trimValue } from '../../../../utils/utils'
import { patientInsurancePlanList } from '../../../../redux/features/invoice-module/invoiceAsynActions'
import AddInsuranceApprovalNoModal from '../add-insurance-approvalNo-modal/AddInsuranceApprovalNoModal'
import Popup from '../../popup/Popup'
import { SubmitHandler, useForm } from 'react-hook-form'
import Button from '../../button/Button'
import { setMessage } from '../../../../redux/features/toast/toastSlice'
import { failure } from '../../../../constants/data'
import { INVOICE_INSURANCE_APPROVAL_NO } from '../../../../constants/constant'
import { addSelectedInsurancePlan } from '../../../../redux/features/invoice-module/invoiceSlice'

interface IAddInsuranceModal {
  setModelOpenClose?: any
  handleRowClick?: any
  handleClose?: any
  handleOpen?: any
  handleNotesPreview?: any
  handleInsuranceRowClick?: any
  popData?: any
}
const AddInsuranceModal: FC<IAddInsuranceModal> = ({
  setModelOpenClose,
  handleRowClick,
  handleClose,
  handleOpen,
  handleNotesPreview,
  handleInsuranceRowClick,
  popData,
}) => {
  const dispatch = useAppDispatch()
  console.log('popData>>>>', popData)
  const { patientListData, patientListDataObject } = useAppSelector(
    (state) => state.patient
  )
  const { isLoading, invoiceObjectById, addInsurancePlanList } = useAppSelector(
    (state) => state.invoice
  )

  const [dataPerPage, setDataPerPage] = useState<number>(10)
  const [totalPage, setTotalPage] = useState<number>(0)
  const [pageIndex, setPageIndex] = useState<number>(1)
  const [searchValue, setSearchValue] = useState<string>('')
  const [activateSmartSearch, setActivateSmartSearch] = useState<boolean>(false)
  const [active, setActive] = useState<boolean>(false)
  const [id, setId] = useState()
  const [value, setValue] = useState()
  const [showApprovalNoModal, setShowApprovalNoModal] = useState<boolean>(false)
  const [approvalNoPopupData, setApprovalNoPopupData] = useState<any>({})

  // React Table define
  const data: Cols[] = addInsurancePlanList
  const columns: Column<Cols>[] = addInsuranceHeaderData
  const options: TableOptions<Cols> = {
    data,
    columns,
  }

  const {
    state,
    // @ts-ignore
    setGlobalFilter,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(options, useGlobalFilter, useSortBy)
  // @ts-ignore
  const { globalFilter } = state

  // function for creating Page Index Array
  const pageIndexArray = () => {
    let pageIndexOptions = []
    for (let i = 1; i <= totalPage; i++) {
      pageIndexOptions.push(i)
    }
    return pageIndexOptions
  }
  const pageIndexOptions = pageIndexArray()

  useEffect(() => {
    const requestData = {
      patient_id: popData?.patient_id,
      plan_ids: popData?.insurance_plan_ids,
      search: searchValue,
      page: pageIndex,
      pageSize: dataPerPage,
    }
    dispatch(patientInsurancePlanList(requestGenerator(requestData)))
  }, [dispatch])

  const handleInputSearch = () => {
    setActivateSmartSearch(true)
    const requestData = {
      patient_id: popData?.patient_id,
      plan_ids: popData?.insurance_plan_ids,

      search: searchValue,
      page: pageIndex,
      pageSize: dataPerPage,
    }
    dispatch(patientInsurancePlanList(requestGenerator(requestData))).then(
      (result) => setTotalPage(result.payload.lastPage)
    )
  }

  useEffect(() => {
    if (searchValue === '') {
      setActivateSmartSearch(false)
      setGlobalFilter('')
      const requestData = {
        patient_id: popData?.patient_id,
        plan_ids: popData?.insurance_plan_ids,
        search: searchValue,
        page: pageIndex,
        pageSize: dataPerPage,
      }
      dispatch(patientInsurancePlanList(requestGenerator(requestData))).then(
        (result) => setTotalPage(result.payload.lastPage)
      )
    }
  }, [dispatch, searchValue, dataPerPage, pageIndex])

  // handleApprovalNoPopup
  const handleApprovalNoPopup = () => {
    const payload = {
      ...invoiceObjectById,
      patient_insurance_id: approvalNoPopupData?.insurance_plan_id,
      insurance_plan: approvalNoPopupData?.insurance_plan,
      [INVOICE_INSURANCE_APPROVAL_NO]: '123',
    }

    // setShowApprovalNoModal(!showApprovalNoModal)
    setApprovalNoPopupData(payload)
    dispatch(addSelectedInsurancePlan(payload))
    handleClose()
  }
  //ApprovalNo modal close
  const handleApprovalNoModalClose = () => {
    setShowApprovalNoModal(false)
    setApprovalNoPopupData({})
    handleClose()
  }
  const handleRow = (item: any) => {
    setApprovalNoPopupData(item)
    setId(item?._id)
    setValue(item?._id)
    if (value === item?._id) {
      setActive(true)
    } else {
      setActive(false)
    }
  }

  const handleApprovedInsurance = () => {
    if (approvalNoPopupData?._id) {
      handleApprovalNoPopup()
    } else {
      dispatch(
        setMessage({ message: 'Please select insurance', type: failure })
      )
    }
  }

  return (
    <>
      {isLoading && <Loader />}
      {showApprovalNoModal && (
        <Popup
          Children={AddInsuranceApprovalNoModal}
          handleClose={handleApprovalNoModalClose}
          popData={approvalNoPopupData}
          setModelOpenClose={setShowApprovalNoModal}
        />
      )}
      <form
        className={styles.mainContainer}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <div className={styles.closeIconContainer}>
          <CloseIcon
            customClass={styles.closeIconStyle}
            fillColor={colors.green1}
            handleClick={() => handleClose()}
          />
        </div>
        <p className={styles.title}>Add Insurance</p>
        <Divider customClass={styles.dividerStyle} />
        <div className={styles.searchFieldContainer}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginBottom: '25px',
            }}
          >
            <div
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <input
                type="text"
                className={styles.inputSearchContainer}
                placeholder="Search"
                onChange={(e) => {
                  trimValue(e)
                  setSearchValue(e.target.value)
                  setGlobalFilter('')
                }}
              />

              <SearchButton
                handleClick={() => {
                  if (!!searchValue) {
                    handleInputSearch()
                  }
                }}
                customClass={styles.inputSearchButton}
              />
            </div>

            <div
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'row',
                marginLeft: '18px',
              }}
            >
              <input
                type="text"
                className={
                  !activateSmartSearch
                    ? styles.inputSmartSearchContainer
                    : styles.inputSearchContainer
                }
                placeholder="Smart Search"
                disabled={!activateSmartSearch}
                onChange={(e) => {
                  trimValue(e)
                  setGlobalFilter(e.target.value)
                }}
                value={searchValue === '' ? searchValue : globalFilter}
              />
            </div>
          </div>

          <Divider customClass={styles.dividerStyling} />
          <div className={styles.tableContainer}>
            <TableV3
              // handleRowClick={(item: any) =>
              //   handleRowClick ? handleRowClick(item) : handleEmrRecord(item)
              // }
              setActive={setValue}
              active={value}
              handleRow={handleRow}
              handleOpen={handleOpen}
              getTableProps={getTableProps}
              getTableBodyProps={getTableBodyProps}
              headerGroups={headerGroups}
              rows={rows}
              prepareRow={prepareRow}
              // setModelOpenClose={setModelOpenClose}
              handleRowClick={handleNotesPreview}
            />
          </div>

          {patientListData?.length < 9 &&
          patientListDataObject?.lastPage === 1 &&
          patientListDataObject?.nextPage === 0 &&
          patientListDataObject?.previousPage === 0 ? (
            ' '
          ) : (
            <Pagination
              setDataPerPage={setDataPerPage}
              pageIndexOptions={pageIndexOptions}
              pageIndex={pageIndex}
              setPageIndex={setPageIndex}
            />
          )}
        </div>

        <Button
          title="Submit"
          type="button"
          customClass={styles.submitButtonStyle}
          handleClick={() => handleApprovedInsurance()}
        />
      </form>
    </>
  )
}

export default AddInsuranceModal

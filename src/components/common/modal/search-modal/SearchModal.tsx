import { FC, useState, useEffect } from 'react'
import styles from './searchModal.module.scss'
import { CloseIcon, SearchButton } from '../../svg-components'
import { colors } from '../../../../constants/color'
import Divider from '../../divider/Divider'
// import { searchModalHeaderData } from "../../../../constants/data";
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
import { searchModalHeaderData } from '../../../../constants/table-data/labInvoiceTabledata'
import { trimValue } from '../../../../utils/utils'
import { getLastInvoice } from '../../../../redux/features/invoice-module/invoiceAsynActions'
import { setPatientData } from '../../../../redux/features/invoice-module/invoiceSlice'

import InvoiceConformationModal from '../invoice-conformation-modal/InvoiceConformationModal'
import Popup from '../../popup/Popup'

interface ISearchModal {
  setModelOpenClose?: any
  handleRowClick?: any
  handleClose?: any
  popData?: any
  invoiceFlag?: boolean
  message?: string
  isDefault?: boolean
}
const SearchModal: FC<ISearchModal> = ({
  setModelOpenClose,
  handleRowClick,
  handleClose,
  popData,
  invoiceFlag,
  message,
  isDefault,
}) => {
  const dispatch = useAppDispatch()
  const { isLoading, patientListData, patientListDataObject } = useAppSelector(
    (state) => state.patient
  )
  const [invoiceConformationModal, setinvoiceConformationModal] =
    useState<boolean>(false)
  const [lastInvoiceData, setlastInvoiceData] = useState<any>({})
  const [patientEmrData, setpatientEmrData] = useState<any>({})
  const [getEmr, setGetEmr] = useState<boolean>(false)

  // React Table define
  const data: Cols[] = patientListData
  const columns: Column<Cols>[] = searchModalHeaderData
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
  const [dataPerPage, setDataPerPage] = useState<number>(10)
  const [totalPage, setTotalPage] = useState<number>(0)
  const [pageIndex, setPageIndex] = useState<number>(1)

  // function for creating Page Index Array
  const pageIndexArray = () => {
    let pageIndexOptions = []
    for (let i = 1; i <= totalPage; i++) {
      pageIndexOptions.push(i)
    }
    return pageIndexOptions
  }
  const pageIndexOptions = pageIndexArray()

  // useEffect(() => {
  //   const requestData = {
  //     search: searchMedicalCenter,
  //     page: pageIndex,
  //     pageSize: dataPerPage,
  //   };
  //   dispatch(getAllPatientList(requestGenerator(requestData))).then((result) =>
  //     setTotalPage(result.payload.lastPage)
  //   );
  // }, [dispatch, searchMedicalCenter, dataPerPage, pageIndex]);

  const handleEmrRecord = (item: any) => {
    // console.log('getLastInvoice', item)
    let dataPayload = {
      id: item?._id,
    }
    let invoiceDataPayload = {
      patient_id: item?._id,
      type: message ? message : 'DIAGNOSIS',
    }
    if (invoiceFlag === false) {
      dispatch(getPatientEmrById(requestGenerator(dataPayload))).then((e) => {
        if (e.type === 'patient/getPatientEmrById/fulfilled') {
          setModelOpenClose(false)
        }
      })
    } else {
      dispatch(getLastInvoice(requestGenerator(invoiceDataPayload))).then(
        (e) => {
          if (e.type === 'invoice/getLastInvoice/fulfilled') {
            // setModelOpenClose(false)
            if (!e.payload) {
              // dispatch(clearInvoicePatientData())
              // dispatch(clearRadiologyInvoiceData())
              setpatientEmrData(item)
              handlePatientEmrData(item)
            } else {
              setlastInvoiceData({ ...e.payload, selectedInsurance: {} })
              setpatientEmrData(item)
              setinvoiceConformationModal(!invoiceConformationModal)
              // setModelOpenClose(false)
            }
          }
        }
      )
    }
    // dispatch(getSearchPatientInfo(requestGenerator(invoiceDataPayload)))
    // setModelOpenClose(false)
  }

  const [searchValue, setSearchValue] = useState<string>('')
  const [smartSearchValue, setSmartSearchValue] = useState<string>('')
  const [activateSmartSearch, setActivateSmartSearch] = useState<boolean>(false)

  const handleInputSearch = () => {
    setActivateSmartSearch(true)
    const requestData = {
      search: searchValue,
      page: pageIndex,
      pageSize: dataPerPage,
      is_active: isDefault,
    }
    dispatch(getAllPatientList(requestGenerator(requestData))).then((result) =>
      setTotalPage(result.payload.lastPage)
    )
  }

  useEffect(() => {
    if (searchValue === '') {
      setActivateSmartSearch(false)
      setGlobalFilter('')
      const requestData = {
        search: searchValue,
        page: pageIndex,
        pageSize: dataPerPage,
        is_active: isDefault,
      }
      dispatch(getAllPatientList(requestGenerator(requestData))).then(
        (result) => setTotalPage(result.payload.lastPage)
      )
    }
  }, [dispatch, searchValue, dataPerPage, pageIndex])

  // const handleSmartInputSearch = () => {
  //   const requestData = {
  //     search: smartSearchValue,
  //     page: pageIndex,
  //     pageSize: dataPerPage,
  //   };
  //   dispatch(getAllPatientList(requestGenerator(requestData))).then((result) =>
  //     setTotalPage(result.payload.lastPage)
  //   );
  // };

  // Invoke If patient Continue With Last invoice
  const handlePatientInvoice = () => {
    dispatch(setPatientData(lastInvoiceData))
    setinvoiceConformationModal(!invoiceConformationModal)
    setModelOpenClose(false)
  }

  // console.log('selected patient', patientEmrData)

  // Invoke if not getting Invoice OR Patient Create new Invoice
  const handlePatientEmrData = (item: any) => {
    let dataPayload = {
      id: item?._id,
    }

    dispatch(getPatientEmrById(requestGenerator(dataPayload))).then((e) => {
      if (e.type === 'patient/getPatientEmrById/fulfilled') {
        console.log(e.payload, 'e.payload')

        const patientObject = {
          _id: null,
          status: 'DRAFT',
          diagnosis_services: [],
          patient_id: e?.payload?._id,
          paid_amount: 0,
          total_amount: 0,
          outstanding_amount: 0,
          insurance_plan_ids: [],
          discount: 0,
          insurance_claim_amount: 0,
          lab_tests: [],
          radiology_tests: [],
          pharmacy_services: [],
          patient_default_branch_id: e?.payload?.patient_default_branch_id
            ? e?.payload?.patient_default_branch_id
            : '',
          emr_no: e?.payload?.emr_no,
          name: e?.payload?.name,
          advance_amount: e?.payload?.advance_amount
            ? e?.payload?.advance_amount
            : 0,
          patient_primary_Doctor: '',
          phone: e?.payload?.phone,
          profile_pic: e?.payload?.patient_pic ? e?.payload?.patient_pic : '',
          national_id: e?.payload?.national_id ? e?.payload?.national_id : '',
          email: e?.payload?.email ? e?.payload?.email : '',
          selectedInsurance: {},
        }
        dispatch(setPatientData(patientObject))
        setinvoiceConformationModal(!invoiceConformationModal)
        setModelOpenClose(false)
      }
    })
  }
  useEffect(() => {
    if (patientEmrData && getEmr) {
      handlePatientEmrData(patientEmrData)
    }
  }, [patientEmrData, getEmr])
  return (
    <>
      {isLoading && <Loader />}
      {invoiceConformationModal && (
        <Popup
          Children={InvoiceConformationModal}
          // popData={searchModalData}
          handleClose={() =>
            setinvoiceConformationModal(!invoiceConformationModal)
          }
          handleNo={handlePatientInvoice}
          setModelOpenClose={() => setGetEmr(true)}
          popData={patientEmrData}
        />
      )}
      <div
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
        <p className={styles.title}>Patient Search</p>
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
              handleRowClick={(item: any) =>
                handleRowClick ? handleRowClick(item) : handleEmrRecord(item)
              }
              invoiceFlag={invoiceFlag}
              getTableProps={getTableProps}
              getTableBodyProps={getTableBodyProps}
              headerGroups={headerGroups}
              rows={rows}
              prepareRow={prepareRow}
              setModelOpenClose={setModelOpenClose}
            />
          </div>

          {/* {patientListData && patientListData?.length !== 0 ? (
            <Pagination
              setDataPerPage={setDataPerPage}
              pageIndexOptions={pageIndexOptions}
              pageIndex={pageIndex}
              setPageIndex={setPageIndex}
            />
          ) : null} */}

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
      </div>
    </>
  )
}

export default SearchModal

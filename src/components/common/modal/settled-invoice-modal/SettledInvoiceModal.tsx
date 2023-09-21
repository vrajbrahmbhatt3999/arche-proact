import React, { FC, useEffect, useState } from 'react'
import styles from './settledInvoiceModal.module.scss'
import { CloseIcon, SearchButton } from '../../svg-components'
import { colors } from '../../../../constants/color'
import Divider from '../../divider/Divider'
import { trimValue } from '../../../../utils/utils'
import TableV3 from '../../table/tableV3/TableV3'
import Pagination from '../../pagination/Pagination'
import {
  getAllPatientList,
  getPatientEmrById,
} from '../../../../redux/features/patient-emr/patient/patientAsyncAction'
import { requestGenerator } from '../../../../utils/payloadGenerator'
import { useAppDispatch, useAppSelector } from '../../../../hooks'
import {
  settledInvoiceHeaderData,
} from '../../../../constants/table-data/userTableData'
import { Cols } from '../../../../interfaces/interfaces'
import {
  Column,
  TableOptions,
  useGlobalFilter,
  useSortBy,
  useTable,
} from 'react-table'
import { getSettledInvoiceList } from '../../../../redux/features/invoice-module/invoiceAsynActions'
import Loader from '../../spinner/Loader'

interface ISettledInvoiceModal {
  setModelOpenClose?: any
  handleRowClick?: any
  handleClose?: any
  message: string
  popData: any
}

const SettledInvoiceModal: FC<ISettledInvoiceModal> = ({
  setModelOpenClose,
  handleRowClick,
  handleClose,
  message,
  popData
}) => {
  const dispatch = useAppDispatch()
  const {
    isLoading,
    invoiceObjectById,
    settledInvoiceList,
    settledInvoiceListObject,
  } = useAppSelector((state) => state.invoice)

  console.log(popData ,"popData")
  // React Table define
  const data: Cols[] = settledInvoiceList
  const columns: Column<Cols>[] = settledInvoiceHeaderData
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
  const [searchValue, setSearchValue] = useState<string>('')
  const [activateSmartSearch, setActivateSmartSearch] = useState<boolean>(false)

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
    let payloadData = {
      type: message,
      search: searchValue,
      page: pageIndex,
      pageSize: dataPerPage,
    }

    if (popData?.patient_id) {
      dispatch(getSettledInvoiceList(requestGenerator({ ...payloadData, patient_id: popData?.patient_id }))).then(
        (result) => setTotalPage(result.payload.lastPage)
      )
    } else {
      dispatch(getSettledInvoiceList(requestGenerator(payloadData))).then(
        (result) => setTotalPage(result.payload.lastPage)
      )
    }

  }, [dispatch, pageIndex, dataPerPage])

  const handleInputSearch = () => {
    setActivateSmartSearch(true)
    const requestData = {
      type: message,
      search: searchValue,
      page: 1,
      pageSize: dataPerPage,
    }
    dispatch(getSettledInvoiceList(requestGenerator(requestData))).then(
      (result) => {
        setTotalPage(result.payload.lastPage)
        // if (result.payload.nextPage !== 0) {
        //   setPageIndex(result.payload.nextPage)
        // }
      }
    )
  }


  return (
    <>
      {isLoading && <Loader />}
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
        <p className={styles.title}>Settled Invoices</p>
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
                  if (e.target.value === '') {
                    setActivateSmartSearch(false)
                    setGlobalFilter('')
                    const requestData = {
                      // patient_id: invoiceObjectById?.patient_id,
                      type: message,
                      search: e.target.value,
                      page: 1,
                      pageSize: dataPerPage,
                    }
                    dispatch(
                      getSettledInvoiceList(requestGenerator(requestData))
                    ).then((result) => setTotalPage(result.payload.lastPage))
                  }
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
              getTableProps={getTableProps}
              getTableBodyProps={getTableBodyProps}
              headerGroups={headerGroups}
              rows={rows}
              prepareRow={prepareRow}
              setModelOpenClose={setModelOpenClose}
            />
          </div>

          {settledInvoiceList?.length < 9 &&
            settledInvoiceListObject?.lastPage === 1 &&
            settledInvoiceListObject?.nextPage === 0 &&
            settledInvoiceListObject?.previousPage === 0 ? (
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

export default SettledInvoiceModal

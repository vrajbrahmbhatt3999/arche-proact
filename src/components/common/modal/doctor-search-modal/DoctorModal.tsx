import { FC, useState, useEffect } from 'react'
import styles from './doctorModal.module.scss'
import { CloseIcon, SearchButton } from '../../svg-components'
import { colors } from '../../../../constants/color'
import Divider from '../../divider/Divider'
import Table from '../../table/Table'
import SearchFilter from '../../search-filter/SearchFilter'
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
import { doctorModalHeaderData } from '../../../../constants/table-data/userTableData'
import { trimValue } from '../../../../utils/utils'
import {
  getAllDoctorList,
  getDoctorById,
} from '../../../../redux/features/receptionist/receptionistAsyncActions'
import { getAllDoctors } from '../../../../redux/features/appointments/bookingAppointmentAsyncActions'

interface IDoctorModal {
  setModelOpenClose?: any
  handleRowClick?: any
  handleClose?: any
  popData?: any
}
const DoctorModal: FC<IDoctorModal> = ({
  setModelOpenClose,
  handleRowClick,
  handleClose,
  popData,
}) => {
  const dispatch = useAppDispatch()

  const { loading, doctorListData, doctorListDataObject } = useAppSelector(
    (state) => state.receptionist
  )
  const { doctorData } = useAppSelector((state) => state.appointments)

  // React Table define
  const data: Cols[] = doctorData
  const columns: Column<Cols>[] = doctorModalHeaderData
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
  const [smartSearchValue, setSmartSearchValue] = useState<string>('')
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
    const requestData = {
      search: '',
      page: pageIndex,
      pageSize: dataPerPage,
    }
    dispatch(getAllDoctors(requestGenerator(requestData)))
  }, [dispatch, dataPerPage, pageIndex])

  const handleInputSearch = () => {
    setActivateSmartSearch(true)
    const requestData = {
      search: searchValue,
      page: pageIndex,
      pageSize: dataPerPage,
    }
    dispatch(getAllDoctors(requestGenerator(requestData))).then((result) =>
      setTotalPage(result.payload.lastPage)
    )
  }

  // useEffect(() => {
  //   if (searchValue === '') {
  //     setActivateSmartSearch(false)
  //     setGlobalFilter('')
  //     const requestData = {
  //       search: searchValue,
  //       page: pageIndex,
  //       pageSize: dataPerPage,
  //     }
  //     dispatch(getAllDoctors(requestGenerator(requestData))).then((result) =>
  //       setTotalPage(result.payload.lastPage)
  //     )
  //   }
  // }, [dispatch, searchValue, dataPerPage, pageIndex])

  const handleDoctorName = (item: any) => {
    alert()
  }

  return (
    <>
      {loading && <Loader />}
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
        <p className={styles.title}>Doctor Search</p>
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
                  if (e.target.value === "") {
                    const requestData = {
                      search: '',
                      page: pageIndex,
                      pageSize: dataPerPage,
                    }
                    dispatch(getAllDoctors(requestGenerator(requestData)))
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
              handleRowClick={(item: any) =>
                handleRowClick ? handleRowClick(item) : handleDoctorName(item)
              }
              getTableProps={getTableProps}
              getTableBodyProps={getTableBodyProps}
              headerGroups={headerGroups}
              rows={rows}
              prepareRow={prepareRow}
              setModelOpenClose={setModelOpenClose}
            // handleRow={handleRow}
            // setActive={setValue}
            // active={value}
            />
          </div>

          {doctorListData?.length < 9 &&
            doctorListDataObject?.lastPage === 1 &&
            doctorListDataObject?.nextPage === 0 &&
            doctorListDataObject?.previousPage === 0 ? (
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

export default DoctorModal

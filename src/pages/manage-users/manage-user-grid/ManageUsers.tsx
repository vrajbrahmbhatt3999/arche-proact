import { FC, useState, useEffect } from 'react'
import SearchFilter from '../../../components/common/search-filter/SearchFilter'
import { useNavigate } from 'react-router-dom'
import Popup from '../../../components/common/popup/Popup'
import NotesPopup from '../../../components/common/modal/notes-popup/NotesPopup'
import Pagination from '../../../components/common/pagination/Pagination'
import { useAppDispatch, useAppSelector } from '../../../hooks/index'
import { requestGenerator } from '../../../utils/payloadGenerator'
import { getAllManageUser } from '../../../redux/features/manage-user/ManageUserAsynActions'
import styles from './manageUsers.module.scss'
import { userListTableHeaderData } from '../../../constants/table-data/userTableData'
import DescriptionModal from '../../../components/common/modal/description-modal/DescriptionModal'
import NoRecordFound from '../../../components/common/norecordfound/NoRecordFound'
import Loader from '../../../components/common/spinner/Loader'
import {
  Column,
  TableOptions,
  useGlobalFilter,
  useSortBy,
  useTable,
} from 'react-table'
import { Cols } from '../../../interfaces/interfaces'
import TableV3 from '../../../components/common/table/tableV3/TableV3'
import { clearUserData } from '../../../redux/features/manage-user/ManageUserSlice'
import SmartSearch from '../../../components/common/smart-search/SmartSearch'
import { SearchIcon } from '../../../components/common/svg-components'
import { colors } from '../../../constants/color'
import { trimValue } from '../../../utils/utils'
import Button from '../../../components/common/button/Button'

interface IManageUsers {}

const ManageUsers: FC<IManageUsers> = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { isLoading, allUsersData, isStatusUpdated } = useAppSelector(
    (state) => state.manageUser
  )

  // React Table define
  const data: Cols[] = allUsersData
  const columns: Column<Cols>[] = userListTableHeaderData
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

  // Define state variables
  const [manageUsersSearch, setManageUsersSearch] = useState<string>('')
  const [isSmartSearchDisable, setIsSmartSearchDisable] =
    useState<boolean>(true)
  const [dataPerPage, setDataPerPage] = useState<number>(10)
  const [totalPage, setTotalPage] = useState<number>(0)
  const [pageIndex, setPageIndex] = useState<number>(1)
  const [showNotes, setShowNotes] = useState<boolean>(false)
  const [notesPopData, setNotesPopData] = useState({})
  const [showNotesModal, setShowNotesModal] = useState<boolean>(false)

  const handleNotesCloseModal = () => {
    setShowNotesModal((prevState) => !prevState)
  }

  const handleNotesModal = (notesObject: {}) => {
    setShowNotesModal((prevState) => !prevState)
    setNotesPopData(notesObject)
  }

  // function for creating Page Index Array
  const pageIndexArray = () => {
    let pageIndexOptions = []
    for (let i = 1; i <= totalPage; i++) {
      pageIndexOptions.push(i)
    }
    return pageIndexOptions
  }
  const pageIndexOptions = pageIndexArray()

  // Api call for Get All Users
  useEffect(() => {
    let payloadData = {
      page: pageIndex,
      pageSize: dataPerPage,
      search: manageUsersSearch,
    }

    dispatch(getAllManageUser(requestGenerator(payloadData))).then((result) => {
      setTotalPage(result.payload.lastPage)
    })
  }, [dispatch, dataPerPage, pageIndex, isStatusUpdated])

  // notes modal close
  // const handleModalClose = () => {
  //   setShowNotes(false);
  // };
  // handle MC notes
  // const handleMUNotes = (item: any) => {
  //   setShowNotes(!showNotes);
  //   setNotesPopData(item);
  // };
  useEffect(() => {
    return () => {
      dispatch(clearUserData())
    }
  }, [])

  const handleSearch = () => {
    setPageIndex(1)
    if (manageUsersSearch?.length > 0) {
      let payloadData = {
        page: pageIndex,
        pageSize: dataPerPage,
        search: manageUsersSearch,
      }

      dispatch(getAllManageUser(requestGenerator(payloadData))).then(
        (result) => {
          setIsSmartSearchDisable(false)
          setTotalPage(result.payload.lastPage)
        }
      )
    }
  }

  return (
    <>
      {isLoading && <Loader />}
      {/* {showNotes && (
        <Popup
          Children={NotesPopup}
          popData={notesPopData}
          handleClose={() => handleModalClose()}
        />
      )} */}
      {showNotesModal && (
        <Popup
          Children={DescriptionModal}
          handleClose={handleNotesCloseModal}
          heading={'Notes'}
          popData={notesPopData}
        />
      )}
      <div className={styles.mainContainer}>
        <div className={styles.searchAndBtnContainer}>
          <div className={styles.searchContainer}>
            <div className={styles.searchFieldContainer}>
              <label htmlFor={'name'} className={styles.searchLabel}>
                Name
              </label>
              <input
                className={styles.searchInput}
                type="text"
                placeholder="Search By Name"
                value={manageUsersSearch}
                onChange={(e) => {
                  trimValue(e)
                  setManageUsersSearch(e.target.value)
                  if (e.target.value.length === 0) {
                    setIsSmartSearchDisable(true)
                    setGlobalFilter('')
                    let payloadData = {
                      page: pageIndex,
                      pageSize: dataPerPage,
                      search: '',
                    }
                    dispatch(
                      getAllManageUser(requestGenerator(payloadData))
                    ).then((result) => {
                      setTotalPage(result.payload.lastPage)
                    })
                  }
                }}
              />
            </div>
            <div className={styles.searchButton} onClick={handleSearch}>
              <SearchIcon fillColor={colors.white1} />
            </div>
            <SmartSearch
              placeHolder={'Smart Search'}
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
              isDisable={isSmartSearchDisable}
            />
          </div>
          <Button
            title="Create Staff"
            type="button"
            handleClick={() => {
              navigate('createusers/primary')
            }}
          />
        </div>

        <div className={styles.tableContainer}>
          <TableV3
            // tableHeaderData={userListTableHeaderData}
            // tableRowData={allUsersData}
            handleClick={handleNotesModal}
            getTableProps={getTableProps}
            getTableBodyProps={getTableBodyProps}
            headerGroups={headerGroups}
            rows={rows}
            prepareRow={prepareRow}
          />
        </div>
        {!isLoading && allUsersData && allUsersData.length > 0 && (
          <Pagination
            setDataPerPage={setDataPerPage}
            pageIndexOptions={pageIndexOptions}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
          />
        )}
      </div>
    </>
  )
}

export default ManageUsers

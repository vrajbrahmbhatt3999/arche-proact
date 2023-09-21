import { FC, useEffect, useState } from 'react'
import styles from './userGroupList.module.scss'
import { useNavigate } from 'react-router-dom'
import Pagination from '../../../components/common/pagination/Pagination'
import Button from '../../../components/common/button/Button'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { requestGenerator } from '../../../utils/payloadGenerator'
import TableV2 from '../../../components/common/table/tableV2/TableV2'
import Loader from '../../../components/common/spinner/Loader'
import { userGroupListHeader } from '../../../constants/table-data/userGroupTableData'
import DescriptionModal from '../../../components/common/modal/description-modal/DescriptionModal'
import Popup from '../../../components/common/popup/Popup'
import { SearchIcon } from '../../../components/common/svg-components'
import { colors } from '../../../constants/color'
import { trimValue } from '../../../utils/utils'
import { getUserRole } from '../../../redux/features/role/roleAsynActions'
import { GET__ROLE__USER } from '../../../constants/asyncActionsType'

interface IUserGroupListProps {}

const UserGroupList: FC<IUserGroupListProps> = () => {
  const navigate = useNavigate()
  const [searchString, setSearchString] = useState<string>('')
  const [dataPerPage, setDataPerPage] = useState<number>(10)
  const [totalPage, setTotalPage] = useState<number>(0)
  const [pageIndex, setPageIndex] = useState<number>(1)
  // const [showNotes, setShowNotes] = useState<boolean>(false)
  const [notesPopData, setNotesPopData] = useState({})
  const [showNotesModal, setShowNotesModal] = useState<boolean>(false)

  const handleNotesCloseModal = () => {
    setShowNotesModal((prevState) => !prevState)
  }

  const handleNotesModal = (notesObject: {}) => {
    setShowNotesModal((prevState) => !prevState)
    setNotesPopData(notesObject)
  }

  // console.log(notesPopData);

  // function for creating Page Index Array
  const pageIndexArray = () => {
    let pageIndexOptions = []
    for (let i = 1; i <= totalPage; i++) {
      pageIndexOptions.push(i)
    }
    return pageIndexOptions
  }
  const pageIndexOptions = pageIndexArray()

  const dispatch = useAppDispatch()

  const { userRole, isLoading, isStatusUpdated } = useAppSelector(
    (state) => state.roleUser
  )

  useEffect(() => {
    let payloadData = {
      page: pageIndex,
      pageSize: dataPerPage,
      roleName: searchString,
    }
    dispatch(getUserRole(requestGenerator(payloadData))).then((e) => {
      if (e.type === `${GET__ROLE__USER}/fulfilled`)
        setTotalPage(e.payload.lastPage)
    })
  }, [dispatch, dataPerPage, pageIndex, isStatusUpdated])

  const handleSearch = () => {
    setPageIndex(1)
    if (searchString?.length > 0) {
      let payloadData = {
        page: pageIndex,
        pageSize: dataPerPage,
        roleName: searchString,
      }
      dispatch(getUserRole(requestGenerator(payloadData))).then((e) => {
        if (e.type === `${GET__ROLE__USER}/fulfilled`)
          setTotalPage(e.payload.lastPage)
      })
    }
  }

  return (
    <>
      {isLoading && <Loader />}
      {showNotesModal && (
        <Popup
          Children={DescriptionModal}
          handleClose={handleNotesCloseModal}
          heading={'Notes'}
          popData={notesPopData}
        />
      )}
      <div className={styles.userGroupListMainContainer}>
        <div className={styles.searchbtnContainer}>
          <div className={styles.searchContainer}>
            <div className={styles.searchFieldContainer}>
              <label htmlFor={'usergroupname'} className={styles.searchLabel}>
                User Role Name
              </label>
              <input
                className={styles.searchInput}
                type="text"
                placeholder="Search By User Role Name"
                value={searchString}
                onChange={(e) => {
                  trimValue(e)
                  setSearchString(e.target.value)
                  if (e.target.value.length === 0) {
                    let payloadData = {
                      page: pageIndex,
                      pageSize: dataPerPage,
                      roleName: '',
                    }
                    dispatch(getUserRole(requestGenerator(payloadData))).then(
                      (e) => {
                        if (e.type === `${GET__ROLE__USER}/fulfilled`)
                          setTotalPage(e.payload.lastPage)
                      }
                    )
                  }
                }}
              />
            </div>
            <div className={styles.searchButton} onClick={handleSearch}>
              <SearchIcon fillColor={colors.white1} />
            </div>
          </div>
          <Button
            title="Create Role"
            customClass={styles.createUserGroupButton}
            handleClick={() => {
              navigate('manageusergroups/primary', { state: { getPer: true } })
            }}
          />
        </div>
        <div className={styles.tableContainer}>
          <TableV2
            tableHeaderData={userGroupListHeader}
            tableRowData={userRole}
            handleClick={handleNotesModal}
          />
        </div>
        {/* {!isLoading && userRole && userRole.length > 0 && (
          <Pagination
            setDataPerPage={setDataPerPage}
            pageIndexOptions={pageIndexOptions}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
          />
        )} */}
      </div>
    </>
  )
}
export default UserGroupList

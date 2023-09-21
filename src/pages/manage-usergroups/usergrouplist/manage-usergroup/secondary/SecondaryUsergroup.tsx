import { FC, useEffect } from 'react'
import styles from './secondaryUsergroup.module.scss'
import TableV2 from '../../../../../components/common/table/tableV2/TableV2'
import { userGroupActivityHeader } from '../../../../../constants/table-data/userGroupTableData'
import { useAppDispatch, useAppSelector } from '../../../../../hooks'
import { setActiveActionTab } from '../../../../../redux/features/user-roles-permissions/rolesPermissionsSlice'

interface ISecondaryUsergroupProps {}

const SecondaryUsergroup: FC<ISecondaryUsergroupProps> = () => {
  const { activeActionTab } = useAppSelector((state) => state.permission)
  const dispatch = useAppDispatch()
  useEffect(() => {
    return () => {
      dispatch(setActiveActionTab([]))
    }
  }, [])
  return (
    <div className={styles.tableContainer}>
      <div className={styles.actionTabName}>{activeActionTab?.moduleName}</div>
      <TableV2
        tableHeaderData={userGroupActivityHeader}
        tableCustomClass={styles.secondaryTable}
        tableRowData={
          activeActionTab && activeActionTab?.activity
            ? activeActionTab?.activity
            : []
        }
        active={false}
      />
    </div>
  )
}
export default SecondaryUsergroup

import { FC, useEffect, useState } from 'react'
import styles from './primaryUsergroup.module.scss'
import TableV2 from '../../../../../components/common/table/tableV2/TableV2'
import { useAppDispatch, useAppSelector } from '../../../../../hooks'
import { userGroupActionTabsHeader } from '../../../../../constants/table-data/userGroupTableData'
import { useLocation } from 'react-router-dom'
import { requestGenerator } from '../../../../../utils/payloadGenerator'
import {
  getAllEmptyPermissions,
  getAllPermissionsById,
} from '../../../../../redux/features/user-roles-permissions/rolesPermissionAsyncActions'
import {
  setActiveModule,
  setRoleData,
  setUpdatePermissions,
} from '../../../../../redux/features/user-roles-permissions/rolesPermissionsSlice'
import {
  GET_ALL_PERMISSIONS_TYPE,
  GET_PERMISSIONS_BY_ID_TYPE,
} from '../../../../../constants/asyncActionsType'
import { isArray, mergeWith, unionBy, unionWith } from 'lodash'

interface IPrimaryUserGroupProps {}

const PrimaryUserGroup: FC<IPrimaryUserGroupProps> = () => {
  const { activeModule } = useAppSelector((state) => state.permission)
  const [tableData, setTableData] = useState([])
  const dispatch = useAppDispatch()
  const state = useLocation().state
  useEffect(() => {
    if (state?.role?._id) {
      dispatch(
        getAllPermissionsById(requestGenerator({ role_id: state?.role?._id }))
      ).then((e) => {
        if (e.type === `${GET_PERMISSIONS_BY_ID_TYPE}/fulfilled`) {
          if (e.payload && e.payload?.length > 0) {
            let tempPer: any = []
            tempPer = e.payload?.map((per: any) => {
              if (per?.actionTabs && per?.actionTabs?.length > 0) {
                let tempTabs: any = []
                tempTabs = per?.actionTabs?.map((tab: any) => {
                  if (tab?.activity && tab?.activity?.length > 0) {
                    if (
                      tab?.activity?.some(
                        (actvt: any) => actvt?.hasPermission === true
                      )
                    ) {
                      return {
                        ...tab,
                        isModuleActive: true,
                      }
                    } else {
                      return tab
                    }
                  } else {
                    return tab
                  }
                })
                return {
                  ...per,
                  actionTabs: tempTabs,
                }
              } else {
                return per
              }
            })
            // old //
            // dispatch(setUpdatePermissions(tempPer))
            // dispatch(setActiveModule(tempPer[0]))
            // dispatch(setRoleData({ ...state?.role, isUpdate: true }))
            // new /
            dispatch(getAllEmptyPermissions(requestGenerator({}))).then((e) => {
              if (e.type === `${GET_ALL_PERMISSIONS_TYPE}/fulfilled`) {
                if (e.payload && e.payload?.length > 0) {
                  console.log('data', tempPer, e.payload)
                  let finalPermissions: any[] = []

                  // const mergeDeepWithPriority = (obj1: any, obj2: any) => {
                  //   return mergeWith({}, obj1, obj2, (val1, val2, key) => {
                  //     if (key === 'isModuleActive') {
                  //       console.log('key', val2, val1, key)
                  //       // Prioritize 'isModuleActive' property from obj2
                  //       return val2 !== undefined ? val2 : val1
                  //     }
                  //   })
                  // }

                  const mergeDeepWithPriority = (obj1: any, obj2: any) => {
                    return mergeWith({}, obj1, obj2, (val1, val2, key) => {
                      if (key === 'isModuleActive') {
                        // Prioritize 'isModuleActive' property from obj2
                        return val2 !== undefined ? val2 : val1
                      } else if (key === 'actionTabs') {
                        // Combine and merge actionTabs from both arrays
                        if (Array.isArray(val1) && Array.isArray(val2)) {
                          const mergedTabs: any[] = []

                          // Iterate over actionTabs in val1 and merge with matching tabs in val2
                          val1.forEach((tab1) => {
                            const matchingTab2 = val2.find(
                              (tab2) => tab2.moduleId === tab1.moduleId
                            )
                            if (matchingTab2) {
                              mergedTabs.push(
                                mergeDeepWithPriority(tab1, matchingTab2)
                              )
                            } else {
                              mergedTabs.push(tab1)
                            }
                          })

                          // Include any remaining tabs from val2 that weren't merged
                          const remainingTabs = val2.filter(
                            (tab2) =>
                              !val1.some(
                                (tab1) => tab1.moduleId === tab2.moduleId
                              )
                          )
                          mergedTabs.push(...remainingTabs)

                          return mergedTabs
                        }
                      }
                      return undefined // Default behavior for other properties
                    })
                  }

                  // Combine and merge the arrays deeply
                  const combinedArray = unionWith(
                    e.payload,
                    tempPer,
                    (obj1: any, obj2: any) =>
                      obj1.primaryModuleName === obj2.primaryModuleName
                  )
                  finalPermissions = combinedArray?.map((item) => {
                    const matchingItemArr2 = tempPer.find(
                      (arr2Item: any) =>
                        arr2Item.primaryModuleName === item.primaryModuleName
                    )
                    console.log(
                      'mergedresponse',
                      mergeDeepWithPriority(item, matchingItemArr2)
                    )
                    return matchingItemArr2
                      ? mergeDeepWithPriority(item, matchingItemArr2)
                      : item
                  })
                  console.log('finalPermissions', finalPermissions)

                  dispatch(setUpdatePermissions(finalPermissions))
                  dispatch(setActiveModule(finalPermissions[0]))
                  dispatch(setRoleData({ ...state?.role, isUpdate: true }))
                } else {
                  dispatch(setUpdatePermissions(tempPer))
                  dispatch(setActiveModule(tempPer[0]))
                  dispatch(setRoleData({ ...state?.role, isUpdate: true }))
                }
              }
            })
          } else {
            dispatch(getAllEmptyPermissions(requestGenerator({})))
            dispatch(
              setRoleData({
                ...state?.role,
                isUpdate: true,
                createPermissions: true,
              })
            )
          }
        }
      })
    } else {
      if (state?.getPer) {
        dispatch(getAllEmptyPermissions(requestGenerator({})))
        dispatch(setRoleData({ ...state?.role, isUpdate: false }))
      }
    }
  }, [state?.role?._id])
  useEffect(() => {
    let activeTab =
      activeModule?.actionTabs && activeModule?.actionTabs.length > 0
        ? activeModule?.actionTabs
        : []
    setTableData(activeTab)
  }, [activeModule])
  return (
    <div className={styles.tableContainer}>
      <TableV2
        tableHeaderData={userGroupActionTabsHeader}
        // tableRowData={
        //   activeModule?.actionTabs && activeModule?.actionTabs.length > 0
        //     ? activeModule?.actionTabs
        //     : []
        // }
        tableRowData={tableData}
        active={false}
        customClassForTd={styles.tableColumn}
        customClassForTh={styles.tableHeading}
        customClasssForViewSlotTrHead={styles.customClasssForViewSlotTrHead}
      />
    </div>
  )
}
export default PrimaryUserGroup

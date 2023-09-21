import { useNavigate } from 'react-router-dom'
import ToggleSwitchV2 from '../../components/common/toggle-switch/ToggleSwitchV2'
import { EditIcon } from '../../components/common/svg-components'
import { colors } from '../color'
import { useAppDispatch, useAppSelector } from '../../hooks'

import styles from './tableData.module.scss'
import {
  setActiveActionTab,
  setActiveModule,
  setUpdatePermissions,
} from '../../redux/features/user-roles-permissions/rolesPermissionsSlice'
export const userGroupListHeader: any = [
  {
    Header: 'USER ROLE NAME',
    accessor: 'name',
  },

  // {
  //   Header: 'STATUS',
  //   Cell: ({ row }: any) => {
  //     const is_active = row?.original?.is_active
  //     // console.log('row', row)
  //     const dispatch = useAppDispatch()

  //     const handleToggle = (item: any) => {
  //       // const payload = {
  //       //   id: item._id,
  //       //   data: { is_active: !item.is_active },
  //       // }
  //       // dispatch(updateStatusUserGroupId(requestGenerator(payload)))
  //     }
  //     return (
  //       <ToggleSwitchV2
  //         isToggled={is_active}
  //         handleToggle={() => handleToggle(row?.original)}
  //       />
  //     )
  //   },
  // },
  {
    Header: 'ACTIONS',
    // accessor: '',
    Cell: ({ row }: any) => {
      const navigate = useNavigate()
      const handleEdit = (item: any) => {
        navigate('/usergroups/manageusergroups/primary', {
          state: { role: item },
        })
      }
      return (
        <EditIcon
          fillColor={colors.grey4}
          // handleClick={() =>
          //   row?.original?.is_active && handleEdit(row?.original)
          // }
          handleClick={() => handleEdit(row?.original)}
        />
      )
    },
  },
]

export const userGroupListData: any = [
  {
    _id: '6trelkjdf e09r8ewre',
    name: 'Doctor',
  },
  {
    _id: '6trelkjdf e09r8ewre',
    name: 'Doctor',
  },
  {
    _id: '6trelkjdf e09r8ewre',
    name: 'Doctor',
  },
  {
    _id: '6trelkjdf e09r8ewre',
    name: 'Doctor',
  },
  {
    _id: '6trelkjdf e09r8ewre',
    name: 'Doctor',
  },
]
export const userGroupActionTabsHeader: any = [
  {
    Header: 'ACTION TAB',
    accessor: 'moduleName',
  },
  {
    Header: 'STATUS',
    Cell: ({ row }: any) => {
      const is_active = row?.original?.isModuleActive
      // console.log('row', row)
      const dispatch = useAppDispatch()
      const { activeModule, permissions } = useAppSelector(
        (state) => state.permission
      )
      const handleToggle = (item: any) => {
        let tempPermissionArr: any = []
        tempPermissionArr =
          permissions && permissions?.length > 0
            ? permissions?.map((per: any) => {
                if (
                  per?.primaryModuleName === activeModule?.primaryModuleName
                ) {
                  let tempActionTabsArr: any = []
                  tempActionTabsArr =
                    per?.actionTabs && per?.actionTabs?.length > 0
                      ? per?.actionTabs?.map((tab: any) => {
                          if (tab?.moduleId === item?.moduleId) {
                            let tempActivityArr: any = []
                            tempActivityArr =
                              tab?.activity && tab?.activity?.length > 0
                                ? tab?.activity?.map((activity: any) => {
                                    return {
                                      ...activity,
                                      hasPermission: item?.isModuleActive
                                        ? false
                                        : true,
                                    }
                                  })
                                : []
                            return {
                              ...tab,
                              isModuleActive: !tab?.isModuleActive,
                              activity: tempActivityArr,
                            }
                          } else {
                            return tab
                          }
                        })
                      : []
                  const activePer = {
                    ...per,
                    actionTabs: tempActionTabsArr,
                  }
                  dispatch(setActiveModule(activePer))
                  return activePer
                } else {
                  return per
                }
              })
            : []
        dispatch(setUpdatePermissions(tempPermissionArr))
      }
      return (
        <ToggleSwitchV2
          isToggled={is_active}
          handleToggle={() => handleToggle(row?.original)}
        />
      )
    },
  },
  {
    Header: 'MANAGE ACTIVITIES',
    Cell: ({ row }: any) => {
      const is_active = row?.original?.isModuleActive
      const navigate = useNavigate()
      const dispatch = useAppDispatch()
      const handleNavigate = (item: any) => {
        navigate('/usergroups/manageusergroups/secondary')
        dispatch(setActiveActionTab(item))
      }

      return (
        <span
          className={styles.blueLinkText}
          onClick={() => (is_active ? handleNavigate(row?.original) : {})}
          // onClick={() => handleNavigate(row?.original)}
        >
          View
        </span>
      )
    },
  },
]

export const userGroupActionTabsBody: any = [
  {
    id: 0,
    sub_moudle_name: 'Request',
    status: true,
  },
  {
    id: 1,
    sub_moudle_name: 'Substore',
    status: false,
  },
  {
    id: 3,
    sub_moudle_name: 'Mainstore',
    stauts: false,
  },
  {
    id: 4,
    sub_moudle_name: 'PI',
    status: true,
  },
]
export const userGroupActivityHeader: any = [
  {
    Header: 'ACTIVITY',
    accessor: 'activityName',
  },
  {
    Header: 'STATUS',
    Cell: ({ row }: any) => {
      const is_active = row?.original?.hasPermission
      const dispatch = useAppDispatch()
      const { permissions, activeModule, activeActionTab } = useAppSelector(
        (state) => state.permission
      )

      const handleToggle = (item: any) => {
        let tempPermissionArr: any = []
        tempPermissionArr =
          permissions && permissions?.length > 0
            ? permissions?.map((per: any) => {
                if (
                  per?.primaryModuleName === activeModule?.primaryModuleName
                ) {
                  let tempActionTabsArr: any = []
                  tempActionTabsArr =
                    per?.actionTabs && per?.actionTabs?.length > 0
                      ? per?.actionTabs?.map((tab: any) => {
                          if (tab?.moduleId === activeActionTab?.moduleId) {
                            let tempActivityArr: any = []
                            tempActivityArr =
                              tab?.activity && tab?.activity?.length > 0
                                ? tab?.activity?.map((activity: any) => {
                                    if (
                                      item?.activityId === activity?.activityId
                                    ) {
                                      return {
                                        ...activity,
                                        hasPermission: !activity?.hasPermission,
                                      }
                                    } else {
                                      return activity
                                    }
                                  })
                                : []
                            const isModuleActive: boolean =
                              tempActivityArr?.some(
                                (item: any) => item?.hasPermission
                              )
                            dispatch(
                              setActiveActionTab({
                                ...tab,
                                isModuleActive,
                                activity: tempActivityArr,
                              })
                            )

                            return {
                              ...tab,
                              isModuleActive,
                              activity: tempActivityArr,
                            }
                          } else {
                            return tab
                          }
                        })
                      : []

                  const activePer = {
                    ...per,
                    actionTabs: tempActionTabsArr,
                  }
                  // dispatch(setActiveModule(activePer))
                  // dispatch(setActiveActionTab(tempActionTabsArr))

                  return activePer
                } else {
                  return per
                }
              })
            : []
        const newActiveModule: any = tempPermissionArr?.find(
          (per: any) =>
            per?.primaryModuleName === activeModule?.primaryModuleName
        )
        dispatch(setActiveModule(newActiveModule))
        dispatch(setUpdatePermissions(tempPermissionArr))
      }
      return (
        <ToggleSwitchV2
          isToggled={is_active}
          handleToggle={() => handleToggle(row?.original)}
        />
      )
    },
  },
]

export const userGroupCRUDBody: any = [
  {
    actionTab: 'Request',
    is_active: true,
  },
  {
    actionTab: 'Substore',
    is_active: false,
  },
  {
    actionTab: 'Mainstore',
    is_active: false,
  },
  {
    actionTab: 'PI',
    is_active: true,
  },
]

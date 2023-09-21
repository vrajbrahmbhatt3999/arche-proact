import { FC, useEffect } from 'react'
import styles from './manageUserGroup.module.scss'
import Tabs from '../../../../components/core/tab/Tabs'
import {
  failure,
  manageUserGroupTabData,
  roleTypeDropdown,
} from '../../../../constants/data'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Divider from '../../../../components/common/divider/Divider'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IManageUserGroupForm } from '../../../../interfaces/interfaces'
import { ROLE_TYPE, USERGROUP_NAME } from '../../../../constants/constant'
import { manageUserGroupValidators } from '../../../../form-validators/manageUserGroupFormValidator'
import Button from '../../../../components/common/button/Button'
import { useAppDispatch, useAppSelector } from '../../../../hooks'
import { requestGenerator } from '../../../../utils/payloadGenerator'
import Loader from '../../../../components/common/spinner/Loader'
import {
  CREATE_PERMISSIONS_TYPE,
  CREATE_USER_ROLE_TYPE,
  UPDATE_PERMISSIONS_TYPE,
} from '../../../../constants/asyncActionsType'
import { extractActivitiesPayload, trimValue } from '../../../../utils/utils'
import {
  createPermissions,
  createUserRole,
  getAllEmptyPermissions,
  updatePermissions,
} from '../../../../redux/features/user-roles-permissions/rolesPermissionAsyncActions'
import {
  clearRolePermissions,
  setActiveModule,
} from '../../../../redux/features/user-roles-permissions/rolesPermissionsSlice'
import { setMessage } from '../../../../redux/features/toast/toastSlice'
import Select from 'react-select'

interface IManageUserGroupProps {}

const ManageUserGroup: FC<IManageUserGroupProps> = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    trigger,
    setValue,
    formState: { errors },
  } = useForm<IManageUserGroupForm>()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const path = useLocation().pathname
  const onSubmit: SubmitHandler<IManageUserGroupForm> = (data: any) => {
    const combinePermissions = extractActivitiesPayload(permissions)
    if (combinePermissions?.some((item: any) => item?.has_permission)) {
      if (roleData?.isUpdate) {
        const payload = {
          role_id: roleData?._id,
          permissions: combinePermissions,
        }
        if (roleData?.createPermissions) {
          dispatch(createPermissions(requestGenerator(payload))).then((e) => {
            if (e.type === `${CREATE_PERMISSIONS_TYPE}/fulfilled`) {
              navigate('/usergroups')
            }
          })
        } else {
          dispatch(updatePermissions(requestGenerator(payload))).then((e) => {
            if (e.type === `${UPDATE_PERMISSIONS_TYPE}/fulfilled`) {
              navigate('/usergroups')
            }
          })
        }
      } else {
        const payload = {
          ...data,
          [ROLE_TYPE]: data[ROLE_TYPE]?.value,
        }
        dispatch(createUserRole(requestGenerator(payload))).then((e) => {
          if (e.type === `${CREATE_USER_ROLE_TYPE}/fulfilled`) {
            // reset()
            if (e.payload?._id) {
              const payload = {
                role_id: e.payload?._id,
                permissions: combinePermissions,
              }
              dispatch(createPermissions(requestGenerator(payload))).then(
                (e) => {
                  if (e.type === `${CREATE_PERMISSIONS_TYPE}/fulfilled`) {
                    navigate('/usergroups')
                  }
                }
              )
            }
          }
        })
      }
    } else {
      dispatch(
        setMessage({ message: 'Please select permissions', type: failure })
      )
    }
  }

  useEffect(() => {
    return () => {
      // dispatch(clearActionTableData())
      dispatch(clearRolePermissions())
    }
  }, [])

  //* new development *//

  const { loading, permissions, activeModule, roleData } = useAppSelector(
    (state) => state.permission
  )
  const setForm = (data: any) => {
    setValue(USERGROUP_NAME, data?.name)
    const type = roleTypeDropdown.find(
      (item: any) => item?.value === data?.role_type
    )
    type ? setValue(ROLE_TYPE, type) : setValue(ROLE_TYPE, roleTypeDropdown[0])
  }
  useEffect(() => {
    setForm(roleData)
  }, [roleData])

  return (
    <>
      {loading && <Loader />}
      <form
        className={styles.manageUserGroupContainer}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={styles.manageUserGroupForm}>
          <div className={styles.manageUserGroupFormFiledFlex}>
            <div className={styles.userGroupInputFieldContainer}>
              <label htmlFor={ROLE_TYPE} className={styles.formLabel}>
                Role Type
                <span className="asterick">*</span>
              </label>
              <div className={styles.inputErrorContainer}>
                <Select
                  className={styles.selectInputField}
                  isSearchable={true}
                  // isDisabled={userDetail?.roleName ? true : false}
                  options={roleTypeDropdown}
                  value={watch(ROLE_TYPE)}
                  // components={animatedComponent}
                  placeholder="Select Role"
                  {...register(ROLE_TYPE, manageUserGroupValidators[ROLE_TYPE])}
                  onChange={(e: any) => {
                    setValue(ROLE_TYPE, e)
                    trigger(ROLE_TYPE)
                  }}
                  isDisabled={roleData?.isUpdate}
                />
                {errors[ROLE_TYPE] && (
                  <p className="dashboardFormError">
                    {errors[ROLE_TYPE].message as any}
                  </p>
                )}
              </div>
            </div>
            <div className={styles.userGroupInputFieldContainer}>
              <label htmlFor={USERGROUP_NAME} className={styles.formLabel}>
                Role Name
                <span className="asterick">*</span>
              </label>
              <div className={styles.inputErrorContainer}>
                <input
                  type="text"
                  className={styles.userGroupInputField}
                  placeholder="Enter Role Name"
                  {...register(
                    USERGROUP_NAME,
                    manageUserGroupValidators[USERGROUP_NAME]
                  )}
                  onChange={(e) => trimValue(e)}
                  disabled={roleData?.isUpdate}
                />
                {errors[USERGROUP_NAME] && (
                  <p className="dashboardFormError">
                    {errors[USERGROUP_NAME].message}
                  </p>
                )}
              </div>
            </div>
            {/* <div className={styles.userGroupInputFieldContainer}>
              <label htmlFor={USERGROUP_NOTES} className={styles.formLabel}>
                Notes
              </label>
              <div className={styles.inputErrorContainer}>
                <textarea
                  placeholder="Enter Notes"
                  className={styles.textareaUserGroupInputField}
                  {...register(USERGROUP_NOTES)}
                  onChange={(e) => trimValue(e)}
                />
              </div>
            </div> */}
            {/* <Button
              title="Submit"
              type="submit"
              customClass={styles.submitButton}
            /> */}
          </div>
        </div>
        <div className={styles.childrenPage}>
          <Tabs
            tabData={manageUserGroupTabData}
            customClass={styles.tabContainer}
          />
          <Divider customClass={styles.divider} />
          <div className={styles.primaryUserGroupContainer}>
            <div className={styles.userGroupListflex}>
              <div className={styles.moduleListContainer}>
                <div className={styles.moduleTitleContainer}>
                  <span className={styles.moduleTitle}>Modules</span>
                </div>
                <div className={styles.moduleList}>
                  {permissions &&
                    permissions.length > 0 &&
                    permissions.map((item: any, index: number) => {
                      return (
                        <span
                          className={
                            item.primaryModuleName ===
                            activeModule?.primaryModuleName
                              ? styles.moduleListNameActive
                              : styles.moduleListName
                          }
                          onClick={() => {
                            if (
                              path === '/usergroups/manageusergroups/secondary'
                            )
                              navigate('/usergroups/manageusergroups/primary')
                            dispatch(setActiveModule(item))
                          }}
                          key={`module-${index}`}
                        >
                          {item?.primaryModuleName
                            ? item?.primaryModuleName
                            : '-'}
                        </span>
                      )
                    })}
                </div>
              </div>
              <div className={styles.actionsTabsListContainer}>
                <div className={styles.userGroupName}>
                  <span className={styles.usergroupNameLabel}>Role:</span>
                  <span className={styles.usergroupNameValue}>
                    {roleData?.name}
                  </span>
                </div>
                <Outlet />
              </div>
            </div>
          </div>
          <div className={styles.savePermssionButton}>
            <Button
              title={
                roleData?.isUpdate ? 'Update Permissions' : 'Save Permissions'
              }
              type="submit"
              customClass={styles.updateButton}
              // handleClick={() => handleSavePermissions()}
            />
            <Button
              title="Back"
              type="button"
              customClass={styles.resetButton}
              handleClick={() => {
                if (path === '/usergroups/manageusergroups/secondary') {
                  navigate('/usergroups/manageusergroups/primary')
                } else {
                  navigate('/usergroups')
                }
              }}
            />
          </div>
        </div>
      </form>
    </>
  )
}
export default ManageUserGroup

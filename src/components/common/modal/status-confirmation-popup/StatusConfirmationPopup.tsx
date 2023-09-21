import { FC } from 'react'
import { useLocation } from 'react-router-dom'
import {
  UPDATE_BRANCH_STATUS,
  UPDATE_DEPARTMENT_STATUS,
} from '../../../../config/config'
import { colors } from '../../../../constants/color'
import { useAppDispatch } from '../../../../hooks'
import {
  updateBranchStatus,
  getAllBranch,
} from '../../../../redux/features/branch/branchAsyncActions'
import {
  getAllDepartment,
  updateDepartmentStatus,
} from '../../../../redux/features/department/departmentAsyncActions'
import {
  updateSpeciality,
  getAllSpeciality,
} from '../../../../redux/features/specialities/specialitiesAsyncActions'
// import { updateSpecialitiesStatus } from "../../../../redux/features/specialities/specialitiesCrud";
// import { updateSpecialitiesStatus } from "../../../../redux/features/specialities/specialitiesCrud";
import { requestGenerator } from '../../../../utils/payloadGenerator'
import Button from '../../button/Button'
import Divider from '../../divider/Divider'
import { CloseIcon } from '../../svg-components'
import styles from './statusConfirmationPopup.module.scss'
import {
  getAllMasterTableCategory,
  getAllMasterTableCategoryValue,
  updateStatusMasterTableCategory,
  updateStatusMasterTableCategoryValue,
} from '../../../../redux/features/master-table-category/MasterTableCategoryAsyncActions'

interface IStatusConfirm {
  popData?: any
  setModelOpenClose?: any
}

const StatusConfirmationPopup: FC<IStatusConfirm> = ({
  popData,
  setModelOpenClose,
}) => {
  const dispatch = useAppDispatch()
  // console.log("popup data>>", popData);
  const location = useLocation()
  // console.log("location pop data", location);

  const handleYes = () => {
    const statusPayload = {
      id: popData?._id,
      data: {
        is_active: !popData?.is_active,
      },
    }
    const branchData = {
      search: '',
      page: 0,
      pageSize: 0,
    }

    if (location.pathname === '/medicalcenter/branch') {
      dispatch(updateBranchStatus(requestGenerator(statusPayload))).then(
        (e) => {
          if ((e.type = `${UPDATE_BRANCH_STATUS}/fulfilled`)) {
            dispatch(getAllBranch(requestGenerator(branchData)))
          }
        }
      )
    } else if (location.pathname === '/medicalcenter/department') {
      dispatch(updateDepartmentStatus(requestGenerator(statusPayload))).then(
        (e) => {
          if (e.type === 'department/updateDepartmentStatus/fulfilled') {
            dispatch(getAllDepartment(requestGenerator(branchData)))
          }
        }
      )
    } else if (location.pathname === '/mastertablemanagenew/managemasternew') {
      let payloadData = {
        page: 0,
        pageSize: 0,
        search: '',
        is_active: '',
      }
      dispatch(updateStatusMasterTableCategory(requestGenerator(statusPayload)))
    } else if (location.pathname === '/mastertablemanage/managecategoryvalue') {
      let payloadData = {
        page: 0,
        pageSize: 0,
        search: '',
      }
      dispatch(
        updateStatusMasterTableCategoryValue(requestGenerator(statusPayload))
      )
    } else if (
      location.pathname === '/medicalcenter/department/managespecialities'
    ) {
      dispatch(updateSpeciality(requestGenerator(statusPayload))).then((e) => {
        if (e.type === 'specialities/updateSpecialitiesStatus/fulfilled') {
          dispatch(getAllSpeciality(requestGenerator(branchData)))
        }
      })
    }
  }

  return (
    <>
      <div className={styles.popupContainer}>
        <CloseIcon
          customClass={styles.closeIconStyle}
          fillColor={colors.green1}
        />
        <div className={styles.statusContainer}>
          <p className={styles.title}>Status</p>
          <Divider customClass={styles.dividerStyle} />
          <p className={styles.userText}>
            Are you sure you want to change the selected
            {location.pathname === '/medicalcenter/branch' && " branch's "}
            {location.pathname === '/medicalcenter/department' &&
              " department's "}
            {location.pathname ===
              '/medicalcenter/department/managespecialities' &&
              " speciality's "}
            {location.pathname === '/mastertablemanage/managecategory' &&
              " category's "}
            {location.pathname === '/mastertablemanage/managecategoryvalue' &&
              " category value's "}
            status?
          </p>
          <div className={styles.btnContainer}>
            <Button
              title="Yes"
              customClass={styles.btnStyle}
              handleClick={handleYes}
            />
            <Button
              title="No"
              customClass={styles.yesButton}
              handleClick={() => {}}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default StatusConfirmationPopup

import { FC, useEffect } from 'react'
import { colors } from '../../../../constants/color'
import { useAppDispatch, useAppSelector } from '../../../../hooks'
import { userLicense } from '../../../../redux/features/branch/branchAsyncActions'
import { requestGenerator } from '../../../../utils/payloadGenerator'
import Button from '../../button/Button'
import Divider from '../../divider/Divider'
import Loader from '../../spinner/Loader'
import { CloseIcon } from '../../svg-components'
import styles from './userLicensePopup.module.scss'

interface I {
  handleClose?: any
}

const UserLicensePopup: FC<I> = ({ handleClose }) => {
  const dispatch = useAppDispatch()
  const { isLoading, userLicenseInfo } = useAppSelector((state) => state.branch)

  useEffect(() => {
    let data = {
      search: 0,
      page: 0,
      pageSize: 10,
    }
    dispatch(userLicense(requestGenerator(data)))
  }, [dispatch])

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.popupContainer}>
        <span onClick={() => handleClose()}>
          <CloseIcon
            customClass={styles.closeIconStyle}
            fillColor={colors.green1}
          />
        </span>
        <div className={styles.userLicenseContent}>
          <p className={styles.title}>User License Information </p>
          <Divider customClass={styles.dividerStyle} />
          <p className={styles.userText}>
            Assigned Users:{' '}
            <span className={styles.spanText}>
              {userLicenseInfo?.max_users_limit}
            </span>
          </p>
          <p className={styles.userText}>
            Created Users:{' '}
            <span className={styles.spanText}>
              {' '}
              {userLicenseInfo?.created_users_count}
            </span>
          </p>
          <Button title="Ok" customClass={styles.btnStyle} />
        </div>
      </div>
    </>
  )
}

export default UserLicensePopup

import { FC } from 'react'
import styles from './notfound.module.scss'
import notFoundVector from '../../../assets/images/notFoundVector.png'
import Button from '../button/Button'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { userLogout } from '../../../redux/features/login/loginAsynActions'
import { requestGenerator } from '../../../utils/payloadGenerator'
import usePermissions from '../../../hooks/usePermissions'

const NotFound: FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { userData } = useAppSelector((state) => state.login)
  const { sidebar } = usePermissions()

  const handleNavigateToHome = () => {
    // const { navigateTo } = navigateAfterLogin(userData?.role)
    navigate(sidebar[0]?.navigate ? sidebar[0]?.navigate : '/')
    if (!sidebar[0]?.navigate) {
      dispatch(userLogout(requestGenerator({})))
    }
  }
  return (
    <>
      <div className={styles.notFoundCointainer}>
        <span className={styles.notFoundText404}> 404 </span>
        <p className={styles.notFoundText}>Oops! Sorry page not found</p>
        <img
          src={notFoundVector}
          alt="notFound-Vector"
          className={styles.notFoundVectorStyle}
        />
        <div className={styles.notFoundButtonContainer}>
          <Button
            title="Back to Home"
            type="button"
            handleClick={handleNavigateToHome}
          />
        </div>
      </div>
    </>
  )
}

export default NotFound

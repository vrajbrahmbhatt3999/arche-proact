import { FC } from 'react'
import styles from './landingPage.module.scss'
import loginBackgroundImage from '../../../assets/images/loginImage.png'
import { Outlet } from 'react-router'
import promedLogo from '../../../assets/images/promedLogo.png'
import proactLogo from '../../../assets/images/proactLogo.png'

interface ILandingPage {
  // title: string;
  // Children: React.ReactNode;
}
const LandingPage: FC<ILandingPage> = () => {
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.logoContainer}>
          <img
            src={promedLogo}
            alt="error to display"
            className={styles.logoImg}
          />
        </div>
        <div className={styles.container}>
          <div className={styles.formStyleContainer}>
            <div className={styles.formStyle}>
              <Outlet />
            </div>
          </div>
          <div className={styles.landingPageImageContainer}>
            <img
              src={loginBackgroundImage}
              className={styles.landingPageImageStyle}
              alt="error to display"
            />
          </div>
        </div>
        <div className={styles.proactLogoFooter}>
          <span className={styles.poweredByText}>
            Powered by Proact United, Kuwait
          </span>
          <img
            src={proactLogo}
            alt="proact logo"
            className={styles.proactLogo}
          />
        </div>
      </div>
    </>
  )
}

export default LandingPage

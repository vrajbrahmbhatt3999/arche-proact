import React, { useEffect } from 'react'
import styles from './DentistMedicalNews.module.scss'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import moment from 'moment'
import { getAllMedicalCenterNews } from '../../../redux/features/receptionist/receptionistAsyncActions'
import { requestGenerator } from '../../../utils/payloadGenerator'
import Loader from '../../../components/common/spinner/Loader'

interface IDentistMedicalNews {
  showNewsModal?: any
  setShowNewsModal?: any
  newsModalData?: any
  setNewsModalData?: any
  handleNewsModal?: any
}

const DentistMedicalNews: React.FunctionComponent<IDentistMedicalNews> = ({
  handleNewsModal,
}) => {
  const dispatch = useAppDispatch()
  const { loading, medicalCenterNewsData } = useAppSelector(
    (state) => state.receptionist
  )

  useEffect(() => {
    dispatch(getAllMedicalCenterNews(requestGenerator({})))
  }, [dispatch])

  const handleDate = (formatedDate: any) => {
    const utcFormatDate = moment(formatedDate).format('DD')
    return utcFormatDate
  }
  const handleMonth = (formatedDate: any) => {
    const utcFormatDate = moment(formatedDate).format('MMM')
    return utcFormatDate
  }
  const textWithLinks = (text: any) => {
    const regex = /(https?:\/\/[^\s]+)/g

    if (text.length > 100) {
      text = text.slice(0, 100) + '...'
    }

    const parts = text.split(regex)
    // console.log('parts', parts)
    return parts.map((part: any, index: any) => {
      if (part.match(regex)) {
        return (
          <a key={index} href={part} target="_blank" rel="noopener noreferrer">
            {part}
          </a>
        )
      } else {
        return part
      }
    })
  }
  return (
    <>
      {loading && <Loader />}
      {/* medicalCenter news container  */}
      <div className={styles.medicalCenterContainer}>
        <div className={styles.medicalCenterHeaderContainer}>
          <p className={styles.medicalCenterTitle}>Medical Center News</p>
        </div>
        <div className={styles.medicalCenterMainContainer}>
          <div className={styles.container}>
            {medicalCenterNewsData.length > 0 ? (
              medicalCenterNewsData?.map((item: any, index: number) => {
                return (
                  <React.Fragment key={index}>
                    <div className={styles.mcUpdatecontainer}>
                      <div className={styles.datecontainer}>
                        <div className={styles.dateStyleText}>
                          {handleDate(item?.createdAt)}
                        </div>
                        <h4 className={styles.monthStyleText}>
                          {handleMonth(item?.createdAt)}
                        </h4>
                      </div>
                      <div className={styles.updatenewscontainer}>
                        <p className={styles.title}>{item?.title}</p>
                        <p className={styles.description}>
                          {textWithLinks(item?.description)}
                        </p>
                        <p className={styles.linkStyle}>
                          {item?.description.length > 100 ? (
                            <p
                              onClick={() => {
                                handleNewsModal(item)
                              }}
                              className={styles.linkStyle}
                            >
                              Read More
                            </p>
                          ) : (
                            ''
                          )}
                        </p>
                      </div>
                    </div>
                  </React.Fragment>
                )
              })
            ) : (
              <p className={styles.noRecordTextStyle}>No news found</p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default DentistMedicalNews

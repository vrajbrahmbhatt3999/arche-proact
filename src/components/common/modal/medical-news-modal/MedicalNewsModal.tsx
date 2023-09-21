import React, { FC, useEffect } from 'react'
import styles from './medicalNewsModal.module.scss'
import { CloseIcon } from '../../svg-components'
import { colors } from '../../../../constants/color'
import { useAppDispatch, useAppSelector } from '../../../../hooks'
import Divider from '../../divider/Divider'
import Loader from '../../spinner/Loader'
// import { getAllMedicalCenterNewsByID } from "../../../../redux/features/receptionist/receptionistAsyncActions";
import { requestGenerator } from '../../../../utils/payloadGenerator'
import moment from 'moment'

interface IMedicalNewsModal {
  popData?: any
  setModelOpenClose?: any
}

const MedicalNewsModal: FC<IMedicalNewsModal> = ({ popData }) => {
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

    const parts = text.split(regex)
    console.log('parts', parts)
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
      {/* {loading && <Loader />} */}
      <div className={styles.mainContainer}>
        <CloseIcon
          customClass={styles.closeIconStyle}
          fillColor={colors.green1}
        />
        <div
          className={styles.addCategoryContainer}
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <p className={styles.title}>Medical Center News</p>
          <Divider customClass={styles.dividerStyle} />

          <div className={styles.mcUpdatecontainer}>
            <div className={styles.datecontainer}>
              <div className={styles.dateStyleText}>
                {handleDate(popData?.createdAt)}
              </div>
              <h4 className={styles.monthStyleText}>
                {handleMonth(popData?.createdAt)}
              </h4>
            </div>
            <div className={styles.updatenewscontainer}>
              <p className={styles.title}>{popData?.title}</p>
              <p className={styles.description}>
                {textWithLinks(popData?.description)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MedicalNewsModal

import { FC, useEffect, useState } from 'react'
import {
  AttachmentLightIcon,
  YearNode,
} from '../../../../components/common/svg-components'
import { useAppDispatch, useAppSelector } from '../../../../hooks'
import { requestGenerator } from '../../../../utils/payloadGenerator'
import styles from './timeline.module.scss'
import { utcToDate } from '../../../../utils/utils'
import { getAllPatientHistory } from '../../../../redux/features/diagnosis/diagnosisAsyncActions'

interface ITimeline {
  handleImageUpload?: any
  handleDocumentUpload?: any
  handleScribeNotes?: any
  handleScribeImages?: any
  handleViewAll?: any
  handleDiagnosisLink?: any
  imagePopup?: any
  documentPopup?: any
  scribeNotes?: any
  scribeImages?: any
  handleYearNode?: any
}

const Timeline: FC<ITimeline> = ({
  handleImageUpload,
  handleDocumentUpload,
  handleScribeNotes,
  handleScribeImages,
  handleViewAll,
  handleDiagnosisLink,
  imagePopup,
  documentPopup,
  scribeNotes,
  scribeImages,
  handleYearNode,
}) => {
  const dispatch = useAppDispatch()
  const { patientDataObjectById } = useAppSelector((state) => state.patient)
  const { patientHistoryData } = useAppSelector((state) => state.diagnosis)
  const [showDoctor, setShowDoctor] = useState<boolean>(false)
  const [value, setValue] = useState(-1)
  const [attachment, setAttachment] = useState(false)
  const [showDocument, setShowDocument] = useState(false)
  const [clickValue, setClickValue] = useState(-1)

  useEffect(() => {
    let reqData = {
      patient_id: patientDataObjectById?._id,
    }
    if (reqData.patient_id == undefined) {
      return
    } else {
      dispatch(getAllPatientHistory(requestGenerator(reqData)))
    }
  }, [dispatch, patientDataObjectById])

  const handleClick = (item: number) => {
    setAttachment(!attachment)
    setShowDoctor(false)
    setClickValue(item)
  }

  const handleMouseEnter = (item: number) => {
    setValue(item)
    setShowDoctor(!showDoctor)
  }

  useEffect(() => {
    if (
      imagePopup === true ||
      documentPopup === true ||
      scribeNotes === true ||
      scribeImages === true
    ) {
      setAttachment(false)
      setShowDocument(false)
    }
  }, [imagePopup, documentPopup, scribeNotes, scribeImages])

  return (
    <>
      {patientHistoryData && patientHistoryData.length > 0 && (
        <div
          className={styles.timelineContainer}
          onClick={() => {
            if (showDocument === true) {
              setShowDocument(false)
            }
            if (attachment === true) {
              setAttachment(false)
            }
          }}
        >
          <div className={styles.header}>
            <p className={styles.title}>Medical Timeline</p>
            <p
              className={styles.viewLink}
              onClick={() => {
                if (patientHistoryData && patientHistoryData.length > 0) {
                  handleViewAll()
                } else {
                  return
                }
              }}
            >
              View All
            </p>
          </div>
          {patientHistoryData &&
            patientHistoryData.length > 0 &&
            patientHistoryData.slice(0, 3).map((item: any, index: number) => {
              return (
                <div>
                  <div
                    key={index}
                    id={index + '_' + item?.year}
                    className={styles.timeline}
                    // style={{
                    //   height: `${item.treatments?.slice(0, 4).length * 60}px`,
                    // }}
                  >
                    <div className={styles.yearTimeLine}>
                      <div className={styles.yearNode}>
                        <YearNode />
                        <span
                          style={{
                            marginLeft: '10px',
                            color: '#797979',
                            width: '39px',
                          }}
                        >
                          {item?.year + 1}
                        </span>
                      </div>

                      {item &&
                        item.treatments &&
                        item.treatments.length > 0 &&
                        item.treatments
                          .slice(0, 3)
                          .map((appointment: any, indexId: number) => {
                            return (
                              <div
                                key={indexId}
                                id={indexId + '_' + appointment?._id}
                                className={styles.appointment}
                                onClick={(e) => {
                                  e.stopPropagation()
                                }}
                              >
                                <div
                                  className={
                                    clickValue === appointment?._id &&
                                    attachment
                                      ? styles.appointmentNodeActive
                                      : styles.appointmentNode
                                  }
                                  onClick={() => handleClick(appointment?._id)}
                                  onMouseEnter={() =>
                                    handleMouseEnter(appointment?._id)
                                  }
                                  onMouseLeave={() => setShowDoctor(false)}
                                ></div>
                                {value === appointment?._id && showDoctor && (
                                  <div className={styles.nameStyle}>
                                    <p className={styles.dateStyle}>
                                      {utcToDate(appointment?.createdAt)}
                                    </p>
                                    <p className={styles.doctorName}>
                                      {appointment?.doctor_name}
                                    </p>
                                  </div>
                                )}
                                {clickValue === appointment?._id &&
                                  attachment && (
                                    <>
                                      <div
                                        className={styles.attachmentContainer}
                                      >
                                        <div className={styles.wrapper}></div>
                                        <div className={styles.mainContainer}>
                                          <div
                                            className={
                                              styles.diagnosisContainer
                                            }
                                          >
                                            <div
                                              className={styles.infoContainer}
                                            >
                                              <p className={styles.dateStyle}>
                                                {utcToDate(
                                                  appointment?.createdAt
                                                )}
                                              </p>
                                              <p
                                                className={styles.linkStyle}
                                                onClick={() =>
                                                  handleDiagnosisLink(
                                                    appointment
                                                  )
                                                }
                                              >
                                                <p
                                                  className={styles.spanStyle}
                                                ></p>
                                                <a>Patient history</a>
                                              </p>
                                            </div>
                                            <AttachmentLightIcon
                                              handleClick={() =>
                                                setShowDocument(!showDocument)
                                              }
                                            />
                                          </div>
                                          {value === appointment?._id &&
                                            showDocument && (
                                              <div
                                                className={
                                                  styles.documentContainer
                                                }
                                              >
                                                <p
                                                  className={styles.docText}
                                                  onClick={() =>
                                                    handleImageUpload(
                                                      appointment?._id
                                                    )
                                                  }
                                                >
                                                  Image
                                                </p>
                                                <p
                                                  className={styles.docText}
                                                  onClick={() =>
                                                    handleDocumentUpload(
                                                      appointment?._id
                                                    )
                                                  }
                                                >
                                                  Documents
                                                </p>
                                                <p className={styles.docText}>
                                                  Video
                                                </p>
                                                <p
                                                  className={styles.docText}
                                                  onClick={() =>
                                                    handleScribeNotes(
                                                      appointment?._id
                                                    )
                                                  }
                                                >
                                                  Scribed Notes
                                                </p>
                                                <p
                                                  className={styles.docText}
                                                  onClick={() =>
                                                    handleScribeImages(
                                                      appointment?._id
                                                    )
                                                  }
                                                >
                                                  Scribed Images
                                                </p>
                                              </div>
                                            )}
                                        </div>
                                      </div>
                                    </>
                                  )}
                              </div>
                            )
                          })}
                      {patientHistoryData[patientHistoryData.length - 1]
                        ?.year === item?.year && (
                        <div className={styles.yearNode}>
                          <YearNode
                            customClass={styles.yearNodeStyle}
                            handleClick={() => handleYearNode(index)}
                          />
                          <span
                            style={{
                              marginLeft: '10px',
                              color: '#797979',
                              width: '39px',
                            }}
                          >
                            {item?.year}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
      )}
    </>
  )
}

export default Timeline

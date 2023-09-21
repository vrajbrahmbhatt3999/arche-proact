import React, { FC, useEffect, useState } from 'react'
import styles from './notificationModal.module.scss'
import Divider from '../../divider/Divider'
import { useAppDispatch, useAppSelector } from '../../../../hooks'
import {
  AppointmentIcon,
  RectangleIcon,
  ReferralIcon,
  TodoAlaramIcon,
} from '../../svg-components'
import moment from 'moment'
import { markReadNotification } from '../../../../redux/features/app-notifications/appNotificationAsyncActions'
import { requestGenerator } from '../../../../utils/payloadGenerator'
import { getAllNotificationList } from '../../../../redux/features/app-notifications/appNotificationAsyncActions'

interface INotificationModal {
  setNotificationModalOpen?: any;
  notiRef?:any

}

const NotificationModal: FC<INotificationModal> = ({
  setNotificationModalOpen,
  notiRef
}) => {
  const dispatch = useAppDispatch()
  // const [notificationArrayList, setNotificationArrayList] =
  //   useState<boolean>(false);
  const { notificationListData } = useAppSelector(
    (state) => state.notifications
  )
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const formatDate = (notificationDate: any) => {
    const currentDate = moment().startOf('day')
    const formattedDate = moment(notificationDate)
    if (formattedDate.isSame(currentDate, 'day')) {
      return 'Today'
    }
    const yesterday = moment().subtract(1, 'day').startOf('day')
    if (formattedDate.isSame(yesterday, 'day')) {
      return 'Yesterday'
    }
    return formattedDate.format('DD MMMM YYYY')
  }

  const handleNotificationTime = (timestamp: any) => {
    const time = moment(timestamp).utcOffset(0, true).format('h:mm A')
    return time
  }

  // const handleRemoveNotification = (index: number) => {
  //   const updatedNotifications = [...visibleNotifications];
  //   updatedNotifications.splice(index, 1);
  //   setVisibleNotifications(updatedNotifications);
  // };
  const handleReadNotification = (item: any) => {
    setNotificationModalOpen(true)
    let reqPayload = {
      notification_id: item?._id,
    }
    if (item?.is_read === false) {
      dispatch(markReadNotification(requestGenerator(reqPayload))).then((e) => {
        if ((e.type = 'notification/markReadAppNotification/fulfilled')) {
          dispatch(getAllNotificationList(requestGenerator({})))
        }
      })
    }
  }
  const handleReadMore = (itemId: string) => {
    setExpandedItems((prevItems) => [...prevItems, itemId])
  }
  const handleReadLess = (itemId: string) => {
    setExpandedItems((prevItems) => prevItems.filter((id) => id !== itemId))
  }

  const isItemExpanded = (itemId: string) => {
    return expandedItems.includes(itemId)
  }

  return (
    <>
      <div className={styles.NotificationMainContainer} ref={notiRef}>
        <div className={styles.mainContainer}>
          <RectangleIcon customClass={styles.rectangleIconStyle} />
          <p className={styles.notificationTitle}>Notifications</p>
          <Divider customClass={styles.headerDividerStyle} />
          <div className={styles.container}>
            {notificationListData?.notifications?.length > 0 ? (
              notificationListData?.notifications?.map(
                (item: any, index: number) => {
                  const showReadMore = item?.body.length > 100
                  const notificationBody = showReadMore
                    ? item?.body.slice(0, 100) + '...'
                    : item?.body
                  const isExpanded = isItemExpanded(item?._id)
                  return (
                    <React.Fragment key={index}>
                      <div
                        className={
                          item?.is_read === true
                            ? styles.readNotificationContainer
                            : styles.unReadNotificationContainer
                        }
                        onClick={(e) => {
                          e.stopPropagation()
                          handleReadNotification(item)
                        }}
                      >
                        {/* <div className={styles.actionIconContainer}>
                      <CrossIcon
                        fillColor="#797979"
                        customClass={styles.crossIconStyle}
                        handleClick={(index: any) =>
                          handleRemoveNotification(index)
                        }
                      />
                    </div> */}

                        <div className={styles.notificationBox}>
                          <div className={styles.iconContainer}>
                            {item?.notification_type === 'APPOINTMENT' ? (
                              <AppointmentIcon
                                fillColor={
                                  item?.is_read === true ? '#797979' : '#5554DB'
                                }
                              />
                            ) : item?.notification_type === 'REFERRAL' ? (
                              <ReferralIcon
                                fillColor={
                                  item?.is_read === true ? '#797979' : '#FFA873'
                                }
                              />
                            ) : (
                              // "dasds"
                              <TodoAlaramIcon
                                fillColor={
                                  item?.is_read === true ? '#797979' : '#FFA873'
                                }
                              />
                            )}
                          </div>
                          <div className={styles.notificationContentContainer}>
                            <p
                              className={
                                item?.is_read === true
                                  ? styles.readtitleStyle
                                  : styles.unReadtitleStyle
                              }
                            >
                              {item?.notification_type === 'REFERRAL'
                                ? item?.notification_type
                                : item?.title}
                            </p>
                            <p
                              className={
                                item?.is_read === true
                                  ? styles.readDescriptionStyle
                                  : styles.unReadDescriptionStyle
                              }
                            >
                              {item.notification_type === 'REFERRAL' ? (
                                <p>
                                  Appointment Tags:
                                  {item.title}
                                </p>
                              ) : (
                                ''
                              )}

                              {item.notification_type === 'REFERRAL' ? (
                                <p>Remarks: {item.body}</p>
                              ) : (
                                <p>
                                  {isExpanded ? (
                                    <>
                                      {item?.body}
                                      <span
                                        className={styles.readMoreLink}
                                        onClick={() =>
                                          handleReadLess(item?._id)
                                        }
                                      >
                                        Read Less
                                      </span>
                                    </>
                                  ) : (
                                    <>
                                      {notificationBody}
                                      {showReadMore && (
                                        <span
                                          className={styles.readMoreLink}
                                          onClick={() =>
                                            handleReadMore(item?._id)
                                          }
                                        >
                                          Read More
                                        </span>
                                      )}
                                    </>
                                  )}
                                </p>
                              )}
                            </p>
                            <div className={styles.dateTimeContainer}>
                              <p
                                className={
                                  item?.is_read === true
                                    ? styles.readNotification_dayStyle
                                    : styles.unReadNotification_dayStyle
                                }
                              >
                                {formatDate(item?.notification_date)} -
                              </p>
                              <p
                                className={
                                  item?.is_read === true
                                    ? styles.readNotification_timeStyle
                                    : styles.unReadNotification_timeStyle
                                }
                              >
                                {handleNotificationTime(
                                  item?.notification_date
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {index !==
                        notificationListData?.notifications?.length - 1 && (
                        <Divider customClass={styles.dividerStyle} />
                      )}
                    </React.Fragment>
                  )
                }
              )
            ) : (
              <p className={styles.noRecordTextStyle}>No new notifications</p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default NotificationModal

import { FC, useEffect, useRef, useState } from 'react'
import styles from './staffchatsidebarchat.module.scss'
import { socket } from '../../../../socket'
import moment from 'moment'
import userR from '../../../../assets/images/UserR.png'
import { colors } from '../../../../constants/color'
import {
  NewChatIcon,
  OnlineofflineIcon,
  SearchIcon,
  ThreeDotIcon,
} from '../../../../components/common/svg-components'
import { useAppSelector } from '../../../../hooks'
import NotificationModal from '../notification-modal/NotificationModal'
import Divider from '../../../../components/common/divider/Divider'
import Loader from '../../../../components/common/spinner/Loader'

interface IWhatsapp {
  messageThread?: any

  item?: any
  setItem?: any
  connectionId?: any
  isOnline?: any
}

const StaffchatSidebarChat: FC<IWhatsapp> = ({
  item,
  setItem,
  connectionId,
  isOnline,
}) => {
  const [logoutModal, setLogoutModal] = useState<boolean>(false)
  const [chatMessages, setChatMessages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchInput, setSearchInput] = useState('')
  const { branchData } = useAppSelector((state) => state.login)
  const containerRef = useRef(null);

  const getMessageThreds = async () => {
    socket?.on('msgThreadList', (msgThread: any) => {
      if (msgThread) {
        let data = msgThread.data

        data ? setChatMessages(data) : setChatMessages([])
      }
    })
    await socket.emit(
      'getMessageThread',
      {
        search: searchInput,
        page: 1,
        pageSize: 100,
      },
      (messageThread: any) => {
        if (messageThread) {
          let data = messageThread.msgThreadList?.data
          data ? setChatMessages(data) : setChatMessages([])
          setIsLoading(false)
        }
      }
    )
  }

  const handleChat = (chat: any) => {
    setChatMessages(
      (prevChatMessages: any) =>
        prevChatMessages?.length > 0 &&
        prevChatMessages?.map((chatitem: any) =>
          chatitem._id == chat._id ? { ...chatitem, messageCount: 0 } : chatitem
        )
    )
    setItem(chat)
  }

  const filteredChatMessages =
    chatMessages && chatMessages.length > 0
      ? chatMessages?.filter((chatitem: any) =>
          chatitem?.name.toLowerCase().includes(searchInput.toLowerCase())
        )
      : []

  useEffect(() => {
    if (socket) {
      setIsLoading(false)

      getMessageThreds()
      socket.on('userOnline', (onlineUser: any) => {
        setChatMessages(
          (prevChatMessages: any) =>
            prevChatMessages?.length > 0 &&
            prevChatMessages.map((chatitem: any) =>
              chatitem._id === onlineUser.user_id
                ? { ...chatitem, isOnline: true }
                : chatitem
            )
        )
      })
      socket.on('userOffline', (userOffline: any) => {
        setChatMessages(
          (prevChatMessages: any) =>
            prevChatMessages?.length > 0 &&
            prevChatMessages.map((chatitem: any) =>
              chatitem._id === userOffline.user_id
                ? { ...chatitem, isOnline: false }
                : chatitem
            )
        )
      })

      socket.on('reciveMessage', function (res: any) {
        setChatMessages(
          (prevChatMessages: any) =>
            prevChatMessages?.length > 0 &&
            prevChatMessages.map((chatitem: any) =>
              chatitem._id === res.from_user_id
                ? {
                    ...chatitem,
                    message: res.body,
                    messageCount: chatitem.messageCount + 1,
                  }
                : chatitem
            )
        )
      })
    }
  }, [socket, item?.id])

  return (
    <>
      <div className={styles.sideChatMainContainer}>
        <div className={styles.iconContainer}>
          <img src={branchData?.profile_pic} alt="" className={styles.image} />
          {/* <div className={styles.iconMain}>
            <NewChatIcon customClass={styles.chatIcon} />
            <ThreeDotIcon
              customClass={styles.dotIcon}
              // handleClick={handleOpenModal}
            />
          </div> */}
          
          {/* {notificationModalOpen && <NotificationModal />} */}
        </div>

        <div className={styles.customGlobalFilterSection}>
          <SearchIcon
            fillColor={colors?.green1}
            customClass={styles.searchIconStyle}
          />
          <input
            type="text"
            placeholder="Search"
            className={styles.customClassInput}
            value={searchInput}
            onChange={(e: any) => setSearchInput(e.target.value)}
          />
        </div>

        <Divider customClass={styles.divider} />
        <span className={styles.messageText}>Messages</span>
        <div className={styles.whatsappSidebarChat}>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {filteredChatMessages && filteredChatMessages.length > 0
                ? filteredChatMessages.map((chatitem: any, index: any) => {
                    return (
                      <div
                        className={styles.mainChatData}
                        key={index}
                        onClick={() => handleChat(chatitem)}
                        style={{
                          background:
                            item._id === chatitem._id
                              ? colors.grey6
                              : colors.white1,
                        }}
                      >
                        <div className={styles.imgContainer}>
                          <img
                            src={
                              chatitem.profile_pic
                                ? chatitem.profile_pic
                                : userR
                            }
                            alt="image"
                            className={styles.image}
                          />
                          <div className={styles.onlineofflineContainer}>
                            {chatitem?.isOnline ? (
                              <OnlineofflineIcon fillColor={colors.green1} />
                            ) : (
                              <OnlineofflineIcon fillColor={colors.grey1} />
                            )}
                          </div>
                        </div>

                        <div className={styles.messageContainer}>
                          <div className={styles.timeContainer}>
                            <div className={styles.title}>{chatitem.name}</div>
                            <div className={styles.time}>
                              {chatitem?.createdAt &&
                                moment
                                  .utc(chatitem.createdAt)
                                  .local()
                                  .format('hh:mm A')}
                            </div>
                          </div>
                          <div className={styles.subTitleContainer}>
                            <p className={styles.subTitle}>
                              {chatitem.message ? chatitem.message : ''}
                            </p>

                            <p className={styles.messageCountNumber}>
                              {chatitem.messageCount > 0
                                ? chatitem.messageCount
                                : ' '}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  })
                : ''}
            </>
          )}
        </div>
      </div>
    </>
  )
}
export default StaffchatSidebarChat;

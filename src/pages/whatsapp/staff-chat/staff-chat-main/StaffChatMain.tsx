import React, { FC, useEffect, useRef, useState } from 'react'
import styles from './staffchatmain.module.scss'
import userR from '../../../../assets/images/UserR.png'
import staffchatImg from '../../../../assets/images/staffchatImg.png.png'
import {
  SendIcon,
  ThreeDotIcon,
} from '../../../../components/common/svg-components'
import { colors } from '../../../../constants/color'
import moment from 'moment'
import { socket } from '../../../../socket'
import Divider from '../../../../components/common/divider/Divider'
import { useAppSelector } from '../../../../hooks'
import ChatLoader from '../../../../components/common/chat-loader/ChatLoader'

interface IWhatsapp {
  item?: any
  setItem?: any
  data?: any
  connectionId?: any
}

const StaffChatMain: FC<IWhatsapp> = ({
  item,
  setItem,

  connectionId,
}) => {
  const [chatData, setChatData] = useState<any>([])
  const [messageInput, setMessageInput] = useState<any>('')
  const { userData } = useAppSelector((state) => state.login)
  const { branchData } = useAppSelector((state) => state.login)
  const [isLoading, setIsLoading] = useState(true)

  const lastMessageRef = useRef<any>(null)
  const recieveMessageListenerRef = useRef<any>(null)

  async function getMessageThredsDetails() {
    socket?.on('msgThreadList', (msgThread: any) => {
      if (msgThread) {
        let data = msgThread.data
        data ? setChatData(data) : setChatData([])
        setIsLoading(false)
      }
    })
    await socket.emit(
      'getMessageThreadDetail',
      {
        to_user_id: item._id,
        page: 1,
        pageSize: 10,
      },
      (messageThreadDetails: any) => {
        if (messageThreadDetails) {
          let data = messageThreadDetails.msgThreadDetail?.data

          data ? setChatData(data) : setChatData([])
          setIsLoading(false)
        }
      }
    )
  }
  const sendMessage = async () => {
    if (messageInput.trim() !== '') {
      socket.emit(
        'sendMessage',
        {
          to_user_id: item._id,
          body: messageInput,
        },
        (res: any) => {
          setMessageInput('')
          // setChatData((prevChatMessages: any) => {
          //   console.log("prev", prevChatMessages);
          //   return [res?.data, ...prevChatMessages];
          // });

          setChatData([res?.data, ...chatData])
        }
      )
    }
  }
  const detectEnterPress = (event: any) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      sendMessage()
    }
  }

  useEffect(() => {
    if (lastMessageRef.current) {
      const container = lastMessageRef.current
      container.scrollTop = container.scrollHeight
    }
  }, [chatData])

  useEffect(() => {
    if (socket) {
      getMessageThredsDetails()
      setIsLoading(true)

      socket.on('userOnline', (onlineUser: any) => {
        setChatData((prevChatMessages: any) =>
          prevChatMessages?.length > 0
            ? prevChatMessages?.map((chatitem: any) =>
                chatitem.id === onlineUser.id || chatitem._id === onlineUser._id
                  ? { ...chatitem, isOnline: true }
                  : chatitem
              )
            : []
        )
      })
      socket.on('userOffline', (userOffline: any) => {
        setChatData((prevChatMessages: any) => {
          return prevChatMessages?.length > 0
            ? prevChatMessages?.map((chatitem: any) =>
                chatitem.id === userOffline.id ||
                chatitem._id === userOffline._id
                  ? { ...chatitem, isOnline: false }
                  : chatitem
              )
            : []
        })
      })

      if (!recieveMessageListenerRef.current) {
        recieveMessageListenerRef.current = true
        socket.on('reciveMessage', function (res: any) {
          console.log('receive>>', res)
          setChatData((prevChatMessages: any) => [res, ...prevChatMessages])
        })
      }
    }
  }, [item?._id])

  console.log('chat Data', chatData)
  return (
    <>
      {item ? (
        <>
          <div className={styles.chatHeader}>
            <div className={styles.chatHeaderInfo}>
              <div className={styles.imgContainer}>
                <img
                  // src={userR}
                  src={item?.profile_pic ? item?.profile_pic : userR}
                  alt=""
                  className={styles.img}
                />
              </div>

              <div className={styles.activeStatusContainer}>
                <span className={styles.text}>{item.name} </span>
                <span className={styles.activeStatus}>
                  {item?.isOnline ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>
            {/* <div>
              <ThreeDotIcon
                customClass={styles.dotIcon}
                fillColor={colors.white1}
              />
            </div> */}
          </div>
          {isLoading ? (
            <div className={styles.loader}>
              <ChatLoader />
            </div>
          ) : (
            <div className={styles.chatBody} ref={lastMessageRef}>
              {chatData && chatData.length > 0
                ? chatData
                    .slice()
                    .reverse()
                    .map((data: any, index: any) => {
                      return (
                        <div key={index}>
                          {data?.from_user_id != item._id ? (
                            <div className={styles.messageSentContainer}>
                              <p className={styles.messagesent}>
                                {data.body ? data.body : ''}
                                <span className={styles.timeStamp}>
                                  {moment
                                    .utc(data.createdAt)
                                    .local()
                                    .format('hh:mm A')}
                                </span>
                              </p>
                            </div>
                          ) : (
                            <div className={styles.messageReceivedContainer}>
                              <p className={styles.messagereceived}>
                                {data.body}

                                <span className={styles.timeStamp}>
                                  {moment
                                    .utc(data.createdAt ? data.createdAt : '')
                                    .local()
                                    .format('hh:mm A')}
                                </span>
                              </p>
                            </div>
                          )}
                        </div>
                      )
                    })
                : ''}
            </div>
          )}

          <form className={styles.chatFooter}>
            <Divider customClass={styles.divider} />
            <div className={styles.messageContainer}>
              {/* <EmojiIcon
                  fillColor={colors.black1}
                  customClass={styles.emojiIcon}
                 />
                <Attachments
                fillColor={colors.black1}
                customClass={styles.attachIcon}
                /> */}
              <div className={styles.inputFieldContainer}>
                <input
                  type="text"
                  placeholder="Write a message"
                  className={styles.msg}
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={messageInput ? detectEnterPress : undefined}
                />
                {/* <WhatsappSearchIcon
                  fillColor={colors.black1}
                  customClass={styles.icon}
                 /> */}
              </div>

              <div
                className={styles.iconContainer}
                onClick={messageInput ? sendMessage : undefined}
              >
                <SendIcon
                  fillColor={colors.white1}
                  customClass={styles.sendIcon}
                />
              </div>
            </div>
          </form>

          <div />
        </>
      ) : (
        <div className={styles.mainImageContainer}>
          <div className={styles.mainContainer}>
            <div className={styles.imgContainer}>
              <img
                src={branchData?.profile_pic}
                alt=""
                className={styles.image}
              />
            </div>
            <div className={styles.textContainer}>
              <p className={styles.welcomeText}> Welcome! </p>
              <p className={styles.userName}> {userData?.name}</p>
            </div>
          </div>

          <img src={staffchatImg} alt="" className={styles.img} />
        </div>
      )}
    </>
  )
}
export default StaffChatMain

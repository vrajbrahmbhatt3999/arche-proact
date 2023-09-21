import { FC, useEffect, useState } from "react";
import styles from "./staffchat.module.scss";
import { socket, connectToSocket } from "../../../socket";
import StaffchatSidebarChat from "./staffchat-sidebar-chat/StaffchatSidebarChat";
import StaffChatMain from "./staff-chat-main/StaffChatMain";
import { useAppSelector } from "../../../hooks";
interface IWhatsapp {
  messageThread?: any;

  item?: any;
  setItem?: any;
  connectionId?: any;
  staffChatRef?: React.RefObject<any>;
}

const StaffChat: FC<IWhatsapp> = ({ item, setItem, staffChatRef }) => {
  const [data, setData] = useState("");
  const [socketJoined, setSocketJoined] = useState(false);
  const { isLoggedin } = useAppSelector((state) => state.login);

  useEffect(() => {
    async function connectSocket() {
      if (
        isLoggedin === true &&
        (!socket || !socket.connected) &&
        socketJoined === false
      ) {
        setSocketJoined(true);
        await connectToSocket();
        // await emitMessageCount()
      }
    }
    connectSocket();
  }, [socketJoined]);

   useEffect(() => {
    setData(data);
  }, [data]);

  return (
    <>
      <div className={styles.whatsappMainContainer} ref={staffChatRef}>
        <StaffchatSidebarChat
          item={data}
          setItem={setData}
          connectionId={socketJoined}
        />
        <div className={styles.chatContainer}>
          <StaffChatMain
            item={data}
            setItem={setData}
            connectionId={socketJoined}
          />
        </div>
      </div>
    </>
  );
};

export default StaffChat;

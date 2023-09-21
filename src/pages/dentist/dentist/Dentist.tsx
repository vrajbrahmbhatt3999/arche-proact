import { FC } from "react";
import StaffChat from "../../whatsapp/staff-chat/StaffChat";
import styles from "./dentist.module.scss"
const Dentist: FC = () => {
  return (
    <>
      <div className={styles.chat}>
          <span className={styles.chatText}>Staff Chat</span>
          <StaffChat />
        </div>
    </>
  );
};

export default Dentist;

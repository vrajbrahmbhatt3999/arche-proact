import { FC } from "react";
import StaffChat from "../../whatsapp/staff-chat/StaffChat";
import styles from "./doctor.module.scss"
const Doctor: FC = () => {
  return (
    <>
      <div className={styles.chat}>
          <span className={styles.chatText}>Staff Chat</span>
          <StaffChat />
        </div>
    </>
  );
};

export default Doctor;

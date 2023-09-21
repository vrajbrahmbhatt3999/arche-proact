import React, { FC } from 'react'
import styles from "./invoice.module.scss"
import comingsoon from "../../../assets/images/comingsoon.png.png";

 const Invoice:FC = ()=> {
  return (
    <>
    <div className={styles.requestContainer}>
    <p className={styles.requestTextComingSoon}>Coming Soon</p>
         <p className={styles.requestText}>Hey! We are actively working on it.</p>
         <img
           src={comingsoon}
           alt="request-Vector"
           className={styles.requestVectorStyle}
         />
    </div>    </>
  )
}
export default Invoice
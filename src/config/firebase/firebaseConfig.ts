import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAatjm8_eCL5xgzMdM6v03OqsXBnt7GqAs",
  authDomain: "proact-staff.firebaseapp.com",
  projectId: "proact-staff",
  storageBucket: "proact-staff.appspot.com",
  messagingSenderId: "830055568438",
  appId: "1:830055568438:web:c453cde9f2967418fef497",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging };
// export const firebaseConfig = () => {};

// if (!("Notification" in window)) {
//   console.log("This browser does not support system notifications.");
// } else if (Notification.permission === "granted") {
//   // If it's okay let's create a notification
//   var notification = new Notification(
//     notificationTitle,
//     notificationOptions
//   );
//   notification.onclick = function (event) {
//     event.preventDefault();
//     window.open("https://google.com", "_blank");
//     notification.close();
//   };
// }

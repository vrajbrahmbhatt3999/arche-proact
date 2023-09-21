// import { messaging } from "./firebaseConfig";
// import { getToken } from "firebase/messaging";

// export const createFirebaseToken = async () => {
//   try {
//     const currentToken = await getToken(messaging, {
//       vapidKey:
//         "BACWrOhG2VhPOpW_wnjXLbQVdyIa_S8mGOY_hg5b7-sqTCl9nyoYfRjg6tqp8SfQp-fKgEtkae45dwxP6zcW8Pw",
//     });

//     if (currentToken) {
//       console.log("currentToken", currentToken);
//       return currentToken;
//     } else {
//       // Show permission request UI
//       console.log(
//         "No registration token available. Request permission to generate one."
//       );
//     }
//   } catch (err) {
//     console.log("An error occurred while retrieving token. ", err);
//   }
// };
import { getMessaging, getToken } from "firebase/messaging";
const { REACT_APP_VAPID_KEY } = process.env;
const publicKey = REACT_APP_VAPID_KEY;
export const createFirebaseToken = async () => {
  console.log("inside the firebase token");
  try {
    const messaging = getMessaging();
    const currentToken = await getToken(messaging, {
      vapidKey: publicKey,
    });
    if (currentToken) {
      return currentToken;
    } else {
      // Show permission request UI
      console.log(
        "No registration token available. Request permission to generate one."
      );
      Notification.requestPermission().then(function (result) {
        console.log(result);
      });
    }
  } catch (err) {
    console.log("An error occurred while retrieving token. ", err);
  }
};

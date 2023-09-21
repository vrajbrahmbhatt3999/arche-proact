import { FC, useEffect } from 'react'
import RootRoutes from './routes/RootRoutes'
import { useAppSelector } from '../../hooks/index'
import Toast from '../common/toast/Toast'
import { initializeApp } from 'firebase/app'
import { getMessaging, onMessage } from 'firebase/messaging'
const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyAatjm8_eCL5xgzMdM6v03OqsXBnt7GqAs',
  authDomain: 'proact-staff.firebaseapp.com',
  projectId: 'proact-staff',
  storageBucket: 'proact-staff.appspot.com',
  messagingSenderId: '830055568438',
  appId: '1:830055568438:web:c453cde9f2967418fef497',
}
initializeApp(FIREBASE_CONFIG)

const App: FC = () => {
  const { message, type } = useAppSelector((state) => state.toast)

  /* IT WILL GLOBALLY REMOVE CONSOLE LOGS, If doing development below line */
  // console.log = () => {}

  const listen = () => {
    const messaging = getMessaging()
    onMessage(messaging, (payload: any) => {
      const notificationTitle = payload.notification.title
      const notificationOptions = {
        body: payload.notification.body,
        //icon: payload.notification.icon,
      }

      if (!('Notification' in window)) {
        console.log('This browser does not support system notifications.')
      } else if (Notification.permission === 'granted') {
        // If it's okay let's create a notification
        var notification = new Notification(
          notificationTitle,
          notificationOptions
        )
        notification.onclick = function (event) {
          event.preventDefault()
          window.open('https://google.com', '_blank')
          notification.close()
        }
      }
    })
  }

  listen()
  // useEffect(() => {
  //   if (path == '/' && 'serviceWorker' in navigator && !userData?.role) {
  //     console.log('coming in if for service-worker', path)
  //     // window.addEventListener('load', () => {
  //     try {
  //       navigator.serviceWorker.register('../../firebase-messaging-sw')
  //     } catch (e) {
  //       console.log(e)
  //     }
  //     // })
  //   }
  // }, [])

  // if (window.location.pathname == '/' && 'serviceWorker' in navigator) {
  //   console.log('coming in if for service-worker', window.location.pathname)

  //   navigator.serviceWorker.register('../../firebase-messaging-sw')
  // }
  return (
    <>
      {message && <Toast type={type} message={message} />}
      <RootRoutes />
    </>
  )
}

export default App

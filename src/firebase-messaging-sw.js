if ("undefined" === typeof window) {
    importScripts(
        "https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js"
    );
    importScripts(
        "https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js"
    );
}
const FIREBASE_CONFIG = {
    apiKey: "AIzaSyAatjm8_eCL5xgzMdM6v03OqsXBnt7GqAs",
    authDomain: "proact-staff.firebaseapp.com",
    projectId: "proact-staff",
    storageBucket: "proact-staff.appspot.com",
    messagingSenderId: "830055568438",
    appId: "1:830055568438:web:c453cde9f2967418fef497",
};

self.addEventListener("notificationclick", function (event) {
    var notification = event.notification.data.FCM_MSG.data[
        "gcm.notification.data"
    ]
        ? JSON.parse(event.notification.data.FCM_MSG.data["gcm.notification.data"])
        : null;
    //console.log('notification=',notification);
    var url = null;

    if (notification && notification.click_url) {
        url = notification.click_url;
    }

    if (notification && notification.event_type) {
        switch (notification.event_type) {
            case "PAGE":
                url = "https://google.com/";
                break;
        }
    }
    event.waitUntil(
        clients.matchAll({ type: "window" }).then((windowClients) => {
            // Check if there is already a window/tab open with the target URL
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                // If so, just focus it.
                if (client.url === url && "focus" in client) {
                    return client.focus();
                }
            }
            // If not, then open the target URL in a new window/tab.
            if (clients.openWindow && url) {
                return clients.openWindow(url);
            }
        })
    );
});

//self.addEventListener('notificationclose', function (event) {});

firebase.initializeApp(FIREBASE_CONFIG);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log("Received background message ", payload);
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
});

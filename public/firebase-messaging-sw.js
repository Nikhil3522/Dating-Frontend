// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyDzR07XPZcQmGA93xwTxy7R4Gs9R6kI8HE",
  authDomain: "fir-77add.firebaseapp.com",
  projectId: "https://fir-77add-default-rtdb.asia-southeast1.firebasedatabase.app",
  storageBucket: "fir-77add",
  messagingSenderId: "578008944252",
  appId: "1:578008944252:web:2cbaac4236018103a143f9v",
  measurementId: "G-N5YGG8H9FH",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);
 // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});
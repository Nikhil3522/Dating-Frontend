import './App.css';
import Welcome from './page/Welcome';
import LogoComponent from './component/LogoComponent';
import Navigator from './route/Navigator';

function App() {

  if ("serviceWorker" in navigator) {
    console.log("Registration started");
    const firebaseConfig = encodeURIComponent(
      JSON.stringify({
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
        messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_FIREBASE_API_ID,
      })
    );
    navigator.serviceWorker
      .register(
        `../../../firebase-messaging-sw.js?firebaseConfig=${firebaseConfig}`
      )
      .then(function (registration) {
        console.log("Registration successful, scope is:", registration.scope);
      })
      .catch(function (err) {
        console.log("Service worker registration failed, error:", err);
      });
    }
    
  return (
    <div className="App">
      <LogoComponent />
      <Navigator />
    </div>
  );
}

export default App;

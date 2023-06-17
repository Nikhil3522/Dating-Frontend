import './App.css';
import Welcome from './page/Welcome';
import LogoComponent from './component/LogoComponent';
import Navigator from './route/Navigator';

function App() {
  return (
    <div className="App">
      <LogoComponent />
      <Navigator />
    </div>
  );
}

export default App;

import './App.scss';
import Navbar from './components/Navbar'
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="App">
      <Navbar/>
        <Sidebar/>
    </div>
  );
}

export default App;

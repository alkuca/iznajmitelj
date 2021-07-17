import './App.scss';
import Navbar from './components/Navbar'
import Sidebar from "./components/Sidebar";
import DashboardContent from "./components/DashboardContent";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Sidebar/>
      <DashboardContent/>
    </div>
  );
}

export default App;

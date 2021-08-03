import './App.scss';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/Navbar'
import Sidebar from "./components/Sidebar";
import DashboardContent from "./components/DashboardContent";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import MyItemsPage from "./components/MyItemsPage";
import SearchPage from "./components/SeacthPage";
import ItemPage from "./components/ItemPage";

function App() {
  return (
      <Router>
          <div className="App">
              <Route exact path="/auth/login">
                  <LoginPage/>
              </Route>
              <Route exact path="/auth/register">
                  <RegisterPage/>
              </Route>
              <Route path="/dashboard">
                  <DashboardContent>
                      <Switch>
                          <Route path="/dashboard/items">
                              <MyItemsPage/>
                          </Route>
                          <Route path="/dashboard/search">
                              <SearchPage/>
                          </Route>
                          <Route path="/dashboard/item">
                              <ItemPage/>
                          </Route>
                      </Switch>
                  </DashboardContent>
              </Route>
          </div>
      </Router>
  );
}

export default App;

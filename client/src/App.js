import './App.scss';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import DashboardContent from "./components/DashboardContent";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import ItemsPage from "./components/ItemsPage";
import SearchPage from "./components/SeacthPage";
import ItemPage from "./components/ItemPage";
import SettingsPage from "./components/SettingsPage";
import RentedPage from "./components/RentedPage";
import RentedOutPage from "./components/RentedOutPage";
import HelpPage from "./components/HelpPage";
import ProfilePage from "./components/ProfilePage";
import MessagesPage from "./components/MessagesPage";
import PostsPage from "./components/PostsPage";
import MessagePage from "./components/MessagePage";
import {useEffect, useState} from "react";
import PrivateRoute from "./components/PrivateRoute";
import StatisticsPage from "./components/StatisticsPage";
import Loader from "./components/Loader";
import NotificationsPage from "./components/NotificationsPage";

function App() {


    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const checkAuthenticated = async () => {
        try {
            const res = await fetch("http://localhost:5000/auth/verify", {
                method: "POST",
                headers: { token: localStorage.token }
            });

            const parseRes = await res.json();
            parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
            setLoading(false)
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        checkAuthenticated()
    }, []);

    const setAuth = boolean => {
        setIsAuthenticated(boolean);
    };


  return (
      <Router>
          {!loading ?
          <div className="App">
              <Route exact path="/auth/register"
                  render={props => <RegisterPage {...props} setAuth={setAuth} />}
              />
              <Route exact path="/auth/login"
                  render={props => <LoginPage {...props} setAuth={setAuth} />}
              />
              <PrivateRoute isAuthenticated={isAuthenticated} path="/dashboard">
                  <DashboardContent setAuth={setAuth} >
                      <Switch>
                          <Route path="/dashboard/stvari" component={ItemsPage}/>
                          <Route path="/dashboard/trazi" component={SearchPage}/>
                          <Route path="/dashboard/stvar/:item_id" component={ItemPage}/>
                          <Route path="/dashboard/postavke" component={SettingsPage}/>
                          <Route path="/dashboard/unajmljeno" component={RentedPage}/>
                          <Route path="/dashboard/iznajmljeno" component={RentedOutPage}/>
                          <Route path="/dashboard/pomoc" component={HelpPage}/>
                          <Route path="/dashboard/profil/:user_id" component={ProfilePage}/>
                          <Route path="/dashboard/poruke" component={MessagesPage}/>
                          <Route path="/dashboard/poruka/:message_id" component={MessagePage}/>
                          <Route path="/dashboard/objave" component={PostsPage}/>
                          <Route path="/dashboard/statistika" component={StatisticsPage}/>
                          <Route path="/dashboard/obavijesti" component={NotificationsPage}/>
                      </Switch>
                  </DashboardContent>
              </PrivateRoute>
          </div>
              :
              <Loader/>
          }
      </Router>
  );
}

export default App;

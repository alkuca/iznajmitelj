import './App.scss';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
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

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const checkAuthenticated = async () => {
        try {
            const res = await fetch("http://localhost:5000/authentication/verify", {
                method: "POST",
                headers: { jwt_token: localStorage.token }
            });

            const parseRes = await res.json();

            parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        checkAuthenticated();
    }, []);

    const setAuth = boolean => {
        setIsAuthenticated(boolean);
    };

  return (
      <Router>
          <div className="App">
              <Route
                  exact path="/auth/login"
                  render={props =>
                      !isAuthenticated ? (
                          <LoginPage {...props} setAuth={setAuth} />
                      ) : (
                          <Redirect to="/dashboard/stvari" />
                      )
                  }
              />
              <Route exact path="/auth/register">
                  <RegisterPage/>
              </Route>
              <Route path="/dashboard"
                  render={props =>
                      isAuthenticated ? (
                          <DashboardContent {...props} setAuth={setAuth}>
                              <Switch>
                                  <Route path="/dashboard/stvari">
                                      <ItemsPage/>
                                  </Route>
                                  <Route path="/dashboard/trazi">
                                      <SearchPage/>
                                  </Route>
                                  <Route path="/dashboard/stvar">
                                      <ItemPage/>
                                  </Route>
                                  <Route path="/dashboard/postavke">
                                      <SettingsPage/>
                                  </Route>
                                  <Route path="/dashboard/unajmljeno">
                                      <RentedPage/>
                                  </Route>
                                  <Route path="/dashboard/iznajmljeno">
                                      <RentedOutPage/>
                                  </Route>
                                  <Route path="/dashboard/pomoc">
                                      <HelpPage/>
                                  </Route>
                                  <Route path="/dashboard/profil">
                                      <ProfilePage/>
                                  </Route>
                                  <Route path="/dashboard/poruke">
                                      <MessagesPage/>
                                  </Route>
                                  <Route path="/dashboard/poruka">
                                      <MessagePage/>
                                  </Route>
                                  <Route path="/dashboard/objave">
                                      <PostsPage/>
                                  </Route>
                              </Switch>
                          </DashboardContent>
                      ) : (
                          <Redirect to="/auth/login" />
                      )}>
              </Route>
          </div>
      </Router>
  );
}

export default App;

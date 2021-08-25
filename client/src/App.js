import './App.scss';
import {Route, Switch, withRouter} from 'react-router-dom';
import DashboardContent from "./components/layout/DashboardContent";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import ItemsPage from "./components/pages/ItemsPage";
import SearchPage from "./components/pages/SearchPage";
import ItemPage from "./components/pages/ItemPage";
import RentedPage from "./components/pages/RentedPage";
import RentedOutPage from "./components/pages/RentedOutPage";
import ProfilePage from "./components/pages/ProfilePage";
import MessagesPage from "./components/pages/MessagesPage";
import PostsPage from "./components/pages/PostsPage";
import MessagePage from "./components/pages/MessagePage";
import {useEffect, useState} from "react";
import PrivateRoute from "./components/ui/PrivateRoute";
import StatisticsPage from "./components/pages/StatisticsPage";
import Loader from "./components/ui/Loader";
import NotificationsPage from "./components/pages/NotificationsPage";


function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    const checkAuthenticated = async () => {
        try {
            return await fetch("http://localhost:5000/auth/verify", {
                method: "POST",
                headers: { token: localStorage.token }
            });
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        checkAuthenticated().then(r => {
            if(r.ok){
                setIsAuthenticated(true)
            }else{
                setIsAuthenticated(false);
            }
            setLoading(false)
        })
    }, []);

    const setAuth = boolean => {
        setIsAuthenticated(boolean);
    };

  return (
      <div>
          {!loading ?
          <div className="App">
              <Route path="/auth/register"
                  render={props => <RegisterPage {...props} setAuth={setAuth} />}
              />
              <Route path="/auth/login"
                  render={props => <LoginPage {...props} setAuth={setAuth} />}
              />
              <PrivateRoute isAuthenticated={isAuthenticated} path="/">
                  <DashboardContent setAuth={setAuth} >
                      <Switch>
                          <Route exact path="/dashboard/stvari" component={ItemsPage}/>
                          <Route path="/dashboard/trazi" component={SearchPage}/>
                          <Route path="/dashboard/stvar/:item_id" component={ItemPage}/>
                          <Route path="/dashboard/unajmljeno" component={RentedPage}/>
                          <Route path="/dashboard/iznajmljeno" component={RentedOutPage}/>
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
      </div>
  );
}

export default withRouter(App);

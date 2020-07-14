import React, { useEffect, useState } from "react";
import "./App.scss";
import {
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import Menu from "./Menu/Menu";
import Register from "./Register/Register";
import Login from "./Login/Login";
import PostCreate from "./PostCreate/PostCreate";
import { UserContext } from "./context/userContext";
import Logout from "./Logout/Logout";
import { UserService } from "./services/user-service";
import AppLoader from "./AppLoader/AppLoader";
import Feed from "./Feed/Feed";
import Profile from "./Profile/Profile";

function App() {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    window.document.body.classList.add("init-app-loader-animate-hide");
    // Hiding initial app loader after 1 sec because the "fading" animation takes 1 sec to work
    setTimeout(() => window.document.body.classList.add("init-app-loader-hidden"), 1000);

    async function getUser() {
      try {
        const foundUser = await UserService.get();
        setUser(foundUser);
        if (!foundUser) {
          history.push("/login");
        }
      } catch (error) {
        console.error(error);
        history.push("/login");
      } finally {
        setIsLoading(false);
      }
    }
    getUser();
  }, [history]);

  return (
    <UserContext.Provider value={{ user }}>
      {isLoading && <AppLoader />}
      <div className="app d-flex flex-column">
        <Menu />
        <div className="appBody container-fluid">
          <Switch>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login onUserLogIn={(currentUser) => { setUser(currentUser); }} />
            </Route>
            <Route path="/logout">
              <Logout onUserLogOut={() => { setUser(null); }} />
            </Route>
            <Route path="/post/create">
              <PostCreate />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/">
              <Feed />
            </Route>
          </Switch>
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default App;

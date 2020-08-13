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
import AppLoader from "./AppLoader/AppLoader";
import Feed from "./Feed/Feed";
import Profile from "./Profile/Profile";
import Search from "./Search/Search";
import ProfileEdit from "./ProfileEdit/ProfileEdit";
import PostPage from "./PostPage/PostPage";

function App() {

  const saveUserToLocalstorage = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
  }

  const getUserFromLocalstorage = () => {
    return JSON.parse(localStorage.getItem("user") || "{}");
  }

  const [user, setUser] = useState(getUserFromLocalstorage());
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    window.document.body.classList.add("init-app-loader-animate-hide");
    // Hiding initial app loader after 1 sec because the "fading" animation takes 1 sec to work
    setTimeout(() => window.document.body.classList.add("init-app-loader-hidden"), 1000);
    if (!user._id) {
      history.push("/login");
    }
    setIsLoading(false);
  }, [history, user]);

  return (
    <UserContext.Provider value={{ user, setUser: (user) => setUser(user) }}>
      {isLoading && <AppLoader />}
      <div className="app d-flex flex-column">
        <Menu />
        <div className="appBody container-fluid">
          <Switch>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login onUserLogIn={(currentUser) => { setUser(currentUser); saveUserToLocalstorage(currentUser); }} />
            </Route>
            <Route path="/logout">
              <Logout onUserLogOut={() => { localStorage.clear(); }} />
            </Route>
            <Route path="/post/create">
              <PostCreate />
            </Route>
            <Route path="/posts/:id">
              <PostPage />
            </Route>
            <Route path="/profile/edit">
            <ProfileEdit />
          </Route>
            <Route path="/profile/:id">
              <Profile />
            </Route>
            <Route path="/search">
              <Search />
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

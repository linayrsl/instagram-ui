import React, {useEffect, useState} from 'react';
import './App.scss';
import Header from "./Header/Header";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Register from "./Register/Register";
import Login from "./Login/Login";
import PostCreate from "./PostCreate/PostCreate";
import {UserContext} from "./context/userContext";
import Logout from "./Logout/Logout";
import config from "./config/index";
import {UserService} from "./services/user-service";

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function getUser() {
            const user = await UserService.get()
            setUser(user);
        }
        getUser();
    }, []);

    return (
        <UserContext.Provider value={user}>
            <Router className="App">
                <Header/>
                <div className={"container-fluid"}>
                    <Switch>
                        <Route path={"/register"}>
                            <Register/>
                        </Route>
                        <Route path={"/login"}>
                            <Login onUserLogIn={(user) => {setUser(user)}}/>
                        </Route>
                        <Route path={"/logout"}>
                            <Logout onUserLogOut={() => {setUser(null)}}/>
                        </Route>
                        <Route path={"/post/create"}>
                            <PostCreate/>
                        </Route>
                        <Route path={"/"}>
                            Home page
                        </Route>
                    </Switch>
                </div>
            </Router>
        </UserContext.Provider>
    );
}

export default App;

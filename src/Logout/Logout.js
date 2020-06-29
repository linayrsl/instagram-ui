import React, {useEffect} from 'react';
import {UserContext} from "../context/userContext";
import config from "../config/index";
import { useHistory } from "react-router-dom";

function Logout(props) {

    const history = useHistory();

    useEffect(() => {
        fetch(`${config.apiUrl}/users/logout`, {credentials: "include"})
            .then((res) => {
                if (res.status === 200) {
                    props.onUserLogOut();
                    history.push("/");
                }
            })
    }, []);

    return (
        <UserContext.Consumer>
            {(user) => {
                return (
                    user
                        ? <div>
                            Bye Bye, {user.username}!
                          </div>
                        : null
                );
            }}
        </UserContext.Consumer>
    );
}

export default Logout;
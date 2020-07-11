import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/userContext";
import config from "../config/index";

function Logout(props) {
  const history = useHistory();

  useEffect(() => {
    fetch(`${config.apiUrl}/users/logout`, { credentials: "include" })
      .then((res) => {
        if (res.status === 200) {
          props.onUserLogOut();
          history.push("/login");
        }
      });
  }, []);

  return (
    <UserContext.Consumer>
      {({ user }) => (
        user
          ? (
            <div>
              Bye Bye, {user.username}!
            </div>
          )
          : null
      )}
    </UserContext.Consumer>
  );
}

export default Logout;

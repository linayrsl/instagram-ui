import React, {useContext, useEffect} from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/userContext";
import config from "../config/index";

function Logout(props) {
  const history = useHistory();
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetch(`${config.apiUrl}/users/logout`, {
      credentials: "include",
      headers: {
        "Authorization": "Bearer " + user.token}
    })
      .then((res) => {
        props.onUserLogOut();
        history.push("/login");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history, props]);

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

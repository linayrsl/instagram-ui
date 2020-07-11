import React, { useContext } from "react";
import { UserContext } from "../context/userContext";
import { ReactComponent as Logo } from "./avatar-user-logo.svg";
import "./UserAvatar.scss";


function UserAvatar(props) {
  return (
    <div className="userAvatar d-inline-block ml-3">
      {props.user && props.user.avatar ?
        <img src={props.user.avatar} /> : <Logo style={{fill: props.defaultColor}} />}
    </div>
  );
}


export default UserAvatar;

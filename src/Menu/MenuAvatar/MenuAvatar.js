import React, {useContext} from 'react';
import {UserContext} from "../../context/userContext";
import Avatar from "../../Avatar/Avatar";

function MenuAvatar(props) {
  const { user } = useContext(UserContext);

  return (
    <div className={"menuAvatar"}>
      <Avatar image={user.avatar} />
    </div>
  );
}

export default MenuAvatar;

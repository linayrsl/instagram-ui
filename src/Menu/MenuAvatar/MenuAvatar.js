import React, {useContext} from 'react';
import {UserContext} from "../../context/userContext";
import Avatar from "../../common/Avatar/Avatar";

function MenuAvatar(props) {
  const { user } = useContext(UserContext);

  return (
    <div aria-hidden={true} className={"menuAvatar"}>
      <Avatar size={"sm"} image={user.avatar} />
    </div>
  );
}

export default MenuAvatar;

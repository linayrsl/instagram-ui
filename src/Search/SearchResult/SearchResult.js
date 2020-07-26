import React from 'react';
import { Link } from "react-router-dom";
import "./SearchUser.scss";
import Avatar from "../../common/Avatar/Avatar";

function SearchResult(props) {
  return (
    <div tabIndex={0} className={"searchResult mt-4"}>
      <div className={"searchedUserAvatar ml-2"}>
        <Avatar image={props.user.avatar} size={"sm"} />
      </div>
      <div className={"searchedUserDetails mr-2 ml-2"}>
        <Link to={`/profile/${props.user._id}`}>{props.user.username} </Link>
        {/*{props.user.username}*/}
      </div>
    </div>
  );
}

export default SearchResult;

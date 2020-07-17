import React from 'react';
import "./SearchUser.scss";
import Avatar from "../../Avatar/Avatar";

function SearchResult(props) {
  return (
    <div tabIndex={0} className={"searchResult mt-4"}>
      <div className={"searchedUserAvatar ml-2"}>
        <Avatar image={props.user.avatar} size={"sm"} />
      </div>
      <div className={"searchedUserDetails mr-2 ml-2"}>
        {props.user.username}
      </div>
    </div>
  );
}

export default SearchResult;

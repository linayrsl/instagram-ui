import React from 'react';
import "./Comment.scss";
import Avatar from "../../../common/Avatar/Avatar";
import Date from "../../../common/Date/Date";

function Comment(props) {
  return (
    <div className="comment">
      <div className=" d-flex">
        <div>
          <Avatar size={"sm"} image={props.user && props.user.avatar}/>
        </div>
        <div className="ml-3 flex-grow-1">{props.user ? props.user.username : "Unknown user"}</div>
        <div className="text-muted">
          <Date date={props.commentDate} />
        </div>
      </div>
      <div className="ml-5 mt-2">{props.content}</div>
    </div>
  );
}

export default Comment;

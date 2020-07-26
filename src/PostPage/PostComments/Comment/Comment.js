import React from 'react';
import "./Comment.scss";

function Comment(props) {
  return (
    <li className="comment">
      {props.content}
    </li>
  );
}

export default Comment;

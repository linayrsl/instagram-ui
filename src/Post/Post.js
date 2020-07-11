import React from 'react';
import "./Post.scss";
import Date from "../Date/Date";
import {faHeart, faComment, faPaperPlane} from "@fortawesome/free-regular-svg-icons";
import {
 faEllipsisH
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import UserAvatar from "../UserAvatar/UserAvatar";


function Post(props) {

  return (
    <div className="post" tabIndex={0}>
      <div className="d-flex flex-column">
        <div className={"postBody"}>
          <img src={`${props.post.image}`}/>
        </div>
        <div className={"postFooter ml-1 mr-1"}>
          <div className={"d-flex justify-content-between"}>
            <div className={"dateAndAvatarSection align-items-baseline"}>
              <UserAvatar className={"userAvatar"} defaultColor={"black"} />
              <span className={"postDate"}> <Date date={props.post}/></span>
            </div>
            <div className={"postControls"}>
              <div className={"numOfLikes"}>{props.post.likes.length}</div>
              <button><FontAwesomeIcon className={"heartIcon mr-2"}  icon={faHeart}/></button>
              <button><FontAwesomeIcon className={"commentIcon mr-2"} icon={faComment} /></button>
              <button><FontAwesomeIcon className={"sendIcon"} icon={faPaperPlane} /></button>
            </div>
          </div>
          {props.post.description ? <div className={"postDescription"}>{props.post.description}</div> : <FontAwesomeIcon icon={faEllipsisH} />}
        </div>
      </div>
    </div>
  );
}

export default Post;

import React, {useContext, useState} from 'react';
import "./Post.scss";
import Date from "../Date/Date";
import {faComment, faPaperPlane} from "@fortawesome/free-regular-svg-icons";
import {
 faEllipsisH
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Avatar from "../../common/Avatar/Avatar";
import PostLike from "../../PostLike/PostLike";
import config from "../../config";
import {UserContext} from "../../context/userContext";
import {Link} from "react-router-dom";


function Post(props) {

  const { user } = useContext(UserContext);
  const [post, setPost] = useState(props.post);

  const onLikesChange = (post) => {
    setPost(post);
  }

console.log(post);
  return (
    <div className="post" tabIndex={0}>
      <div className="d-flex flex-column">
        <div className={"postBody"}>
          <Link to={`/posts/${post._id}`}>
            <img alt={post.description} src={`${post.image}`}/>
          </Link>
          {/*<img alt={post.description} src={`${post.image}`}/>*/}
        </div>
        <div className={"postFooter ml-1 mr-1"}>
          <div className={"d-flex justify-content-between"}>
            <div className={"dateAndAvatarSection align-items-baseline"}>
              <Link to={`/profile/${post.user._id}`}>
                <Avatar image={post.user && post.user.avatar} size={"sm"} className={"userAvatar"} defaultColor={"black"} />
              </Link>
              {/*/image={post.user.avatar}*/}
              <span className={"postDate"}> <Date date={post}/></span>
            </div>
            <div className={"postControls"}>
              <div aria-label={"number of likes for post"} className={"numOfLikes"}>{post.likes.length}</div>
              <PostLike onLikesChange={onLikesChange} post={props.post} isLiked={post.likes.includes(user._id)} />
              <button type={"button"} aria-label={"Post comment icon"}>
                <FontAwesomeIcon aria-hidden={true} className={"commentIcon mr-2"} icon={faComment} />
              </button>
              <button type={"button"}>
                <FontAwesomeIcon className={"sendIcon"} icon={faPaperPlane} />
              </button>
            </div>
          </div>
          {post.description ? <div className={"postDescription"}>{post.description}</div> : <FontAwesomeIcon aria-hidden={true} icon={faEllipsisH} />}
        </div>
      </div>
    </div>
  );
}

export default Post;

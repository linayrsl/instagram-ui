import React, {useContext, useEffect, useState} from 'react';
import "./Post.scss";
import Date from "../Date/Date";
import {
 faEllipsisH
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Avatar from "../../common/Avatar/Avatar";
import PostLike from "../../PostLike/PostLike";
import {UserContext} from "../../context/userContext";
import {Link} from "react-router-dom";
import CommentModal from "../../CommentModal/CommentModal";
import config from "../../config/index";


function Post(props) {

  const { user } = useContext(UserContext);
  const [post, setPost] = useState(props.post);
  const [comments, setComments] = useState([]);

  const onLikesChange = (post) => {
    setPost(post);
  }

  useEffect(() => {
    const getComments = async () => {
      try {
        const result = await fetch(`${config.apiUrl}/posts/${post._id}/comment`, {
          credentials: "include",
          headers: {
            "Authorization": "Bearer " + user.token}
        });
        if (result.status === 200) {
          setComments(await result.json());
        }
      } catch (error) {
        console.error(error);
      }
    }
    getComments();
  }, [post._id, user.token])

  return (
    <div className="post" tabIndex={0}>
      <div className="postContainer d-flex flex-column">
        <div className={"postBody"}>
          <Link to={`/posts/${post._id}`}>
            <img alt={post.description} src={`${post.image}`}/>
          </Link>
        </div>
        <div className={"postFooter ml-2 mr-2 mb-2"}>
          <div className={"d-flex justify-content-between"}>
            <div className={"dateAndAvatarSection align-items-baseline"}>
              <Link to={`/profile/${post.user._id}`}>
                <Avatar image={post.user && post.user.avatar} size={"sm"} className={"userAvatar"} defaultColor={"black"} />
              </Link>
              <span className="ml-1">{post.user.username}</span>
              <div className={"postDate text-muted mt-1"}> <Date date={post}/></div>
            </div>
            <div className={"postControls"}>
              <PostLike likesAmount={post.likes.length} onLikesChange={onLikesChange} post={props.post} isLiked={post.likes.includes(user._id)} />
              <CommentModal commentsAmount={comments.length} postId={post._id} />
            </div>
          </div>
          {post.description ?
            <div className={"postDescription mt-1"}>{post.description}</div> :
            <FontAwesomeIcon aria-hidden={true} icon={faEllipsisH} />}
        </div>
      </div>
    </div>
  );
}

export default Post;

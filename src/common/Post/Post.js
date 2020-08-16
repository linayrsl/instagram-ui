import React, {useContext, useEffect, useState} from 'react';
import "./Post.scss";
import Date from "../Date/Date";
import {
 faEllipsisH
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Avatar from "../../common/Avatar/Avatar";
import PostLike from "../../PostLike/PostLike";
import {Link} from "react-router-dom";
import CommentModal from "../../CommentModal/CommentModal";
import {PusherEventsContext} from "../../context/pusherEventsContext";
import {UserContext} from "../../context/userContext";



function Post(props) {

  const { user } = useContext(UserContext);
  const [post, setPost] = useState(props.post);
  const channel = useContext(PusherEventsContext);


  useEffect(() => {
    const postLikeEventHandler = (data) => {
      if (data.userId === user._id) {
        return;
      }
      if (post._id !== data.postId) {
        return;
      }
      const updatedPost = {...post};
      updatedPost.likesCount++;
      setPost(updatedPost);
    }

    const postUnLikeEventHandler = (data) => {
      if (data.userId === user._id) {
        return;
      }
      if (post._id !== data.postId) {
        return;
      }
      const updatedPost = {...post};
      if (post.likesCount >= 1) {
        updatedPost.likesCount--;
      }
      setPost(updatedPost);
    }

    channel.bind("postLike", postLikeEventHandler);
    channel.bind("postUnLike", postUnLikeEventHandler);
    return () => {
      channel.unbind("postLike", postLikeEventHandler);
      channel.unbind("postUnLike", postUnLikeEventHandler);
    }
  }, [channel, post, user._id]);

  useEffect(() => {
    const addCommentEventHandler = (data) => {
      const updatedPost = {...post};
      updatedPost.commentsCount++;
      setPost(updatedPost);
    }
    channel.bind("addComment", addCommentEventHandler);
    return () => {
      channel.unbind("addComment", addCommentEventHandler);
    }
  }, [channel, post]);

  const onLikesChange = (isLiked) => {
    setPost({
      ...post,
      likesCount: isLiked ? post.likesCount + 1 : post.likesCount - 1,
      isLikedByCurrentUser: isLiked,
    });
  }

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
              <PostLike likesAmount={post.likesCount} onLikesChange={onLikesChange} post={props.post} isLiked={post.isLikedByCurrentUser} />
              <CommentModal commentsAmount={post.commentsCount} postId={post._id} />
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
